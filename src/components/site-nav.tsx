"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SITE } from "@/lib/site";

/**
 * The site navigation — and, below `md`, the fact that there was any.
 *
 * The links were `hidden md:flex`, with nothing behind them on a smaller screen. So on a phone the
 * header carried a logo, a WhatsApp icon and a demo button, and Platform, Compliance, Reports,
 * Security and Blog could not be reached at all. Most of this audience opens a link from WhatsApp
 * on a phone; they were being shown a site with no way through it.
 *
 * On the desktop the links read as body text — one grey, one weight, no indication of where you
 * are. They now carry a rule that draws under the item on hover and stays under the current
 * section, which is the smallest thing that makes a row of words read as a menu.
 */
/**
 * `children` turns an item into a menu.
 *
 * The four product pages had no route into them from the header at all — only the footer, the
 * home page chips and a section on /platform/. That is the weakest discovery a set of commercial
 * pages can have, and they are the pages the site exists to be found through.
 *
 * They sit UNDER Platform rather than as four more top-level items, because five product entries
 * across a row that already has to survive a phone would crowd it, and because that is the real
 * relationship: the platform is the system, and these are what it does for one kind of book.
 */
export interface NavItem {
  href: string;
  label: string;
  children?: { href: string; label: string; note: string }[];
}

export const NAV: NavItem[] = [
  {
    href: "/platform/",
    label: "Platform",
    children: [
      { href: "/platform/", label: "The whole platform", note: "Lead to closure, in one system" },
      { href: "/personal-loan-software/", label: "Personal loans", note: "Unsecured — bureau, FOIR, NACH" },
      { href: "/vehicle-loan-software/", label: "Vehicle finance", note: "RC, insurance, repossession" },
      { href: "/loan-against-property-software/", label: "Loans against property", note: "Legal opinion, valuation, mortgage" },
      { href: "/gold-loan-software/", label: "Gold loans", note: "LTV, renewal, auction" },
    ],
  },
  { href: "/compliance/", label: "Compliance" },
  { href: "/reports/", label: "Reports" },
  { href: "/security/", label: "Security" },
  { href: "/blog/", label: "Blog" },
];

const isCurrent = (pathname: string | null, href: string) =>
  !!pathname && (pathname === href || pathname.startsWith(href));

/** The 2px rule under an item. Shared so a menu trigger and a plain link cannot drift apart. */
function Underline({ on }: { on: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={
        "pointer-events-none absolute inset-x-2.5 -bottom-0.5 h-[2px] origin-center rounded-full bg-cta transition-transform duration-200 " +
        (on ? "scale-x-100" : "scale-x-0")
      }
    />
  );
}

/**
 * The Platform menu.
 *
 * A link that is ALSO a menu, which is the case most dropdown implementations get wrong in one of
 * two ways: either the parent stops being clickable — so /platform/ becomes unreachable by anyone
 * who navigates with a keyboard — or the panel opens on hover only, so it never opens at all on a
 * device without a pointer.
 *
 * Here the trigger is a real link with a separate disclosure button beside it. Hover opens it for a
 * mouse; the button opens it for everything else and reports `aria-expanded`. Escape closes and
 * returns focus, a click outside closes, and moving focus out of the group closes — the three exits
 * a hand-built menu usually forgets.
 *
 * There is a close DELAY on pointer-leave. Without it the panel vanishes while the pointer is
 * crossing the few pixels between the trigger and the panel, which reads as the menu refusing to
 * be used.
 */
function NavMenu({ item, pathname }: { item: NavItem; pathname: string | null }) {
  const [open, setOpen] = React.useState(false);
  const group = React.useRef<HTMLDivElement>(null);
  const timer = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const children = item.children ?? [];
  const current = children.some((c) => isCurrent(pathname, c.href)) || isCurrent(pathname, item.href);

  const cancelClose = () => { if (timer.current) clearTimeout(timer.current); timer.current = null; };
  const scheduleClose = () => { cancelClose(); timer.current = setTimeout(() => setOpen(false), 140); };
  React.useEffect(() => cancelClose, []);

  // The route changed — the panel must not survive the navigation it caused.
  React.useEffect(() => { setOpen(false); }, [pathname]);

  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      // Focus goes back to the control that opened it, or it lands nowhere and the keyboard user
      // is returned to the top of the document.
      group.current?.querySelector<HTMLButtonElement>("button")?.focus();
    };
    const onClick = (e: MouseEvent) => {
      if (!group.current?.contains(e.target as Node)) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => { window.removeEventListener("keydown", onKey); document.removeEventListener("mousedown", onClick); };
  }, [open]);

  return (
    <div
      ref={group}
      className="relative"
      onMouseEnter={() => { cancelClose(); setOpen(true); }}
      onMouseLeave={scheduleClose}
      onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget as Node)) setOpen(false); }}
    >
      <div className="flex items-center">
        <Link
          href={item.href}
          aria-current={current ? "page" : undefined}
          className={
            "relative rounded-input py-1.5 pl-2.5 pr-1 text-[14px] font-medium transition-colors " +
            (current ? "text-ink" : "text-slate-mid hover:text-ink")
          }
        >
          {item.label}
          <Underline on={current} />
        </Link>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={`${item.label} menu`}
          className="rounded-input p-1 text-slate-mid transition-colors hover:text-ink"
        >
          <svg
            viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor"
            strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"
            className={"transition-transform duration-200 " + (open ? "rotate-180" : "")}
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </button>
      </div>

      {open && (
        <div className="absolute left-0 top-full z-50 pt-2">
          <ul className="w-80 overflow-hidden rounded-card border border-line bg-card p-1.5 shadow-e2">
            {children.map((c) => {
              const on = pathname === c.href;
              return (
                <li key={c.href}>
                  <Link
                    href={c.href}
                    aria-current={on ? "page" : undefined}
                    className={
                      "block rounded-lg px-3 py-2.5 transition-colors " +
                      (on ? "bg-cta/10" : "hover:bg-subtle")
                    }
                  >
                    <span className={"block text-[14px] font-medium " + (on ? "text-cta" : "text-ink")}>
                      {c.label}
                    </span>
                    <span className="mt-0.5 block text-[13px] leading-snug text-muted">{c.note}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}

export function DesktopNav() {
  const pathname = usePathname();
  return (
    <nav className="hidden flex-1 items-center gap-s1 md:flex" aria-label="Main">
      {NAV.map((n) =>
        n.children ? (
          <NavMenu key={n.href} item={n} pathname={pathname} />
        ) : (
          <Link
            key={n.href}
            href={n.href}
            aria-current={isCurrent(pathname, n.href) ? "page" : undefined}
            className={
              "relative rounded-input px-2.5 py-1.5 text-[14px] font-medium transition-colors " +
              (isCurrent(pathname, n.href) ? "text-ink" : "text-slate-mid hover:text-ink")
            }
          >
            {n.label}
            {/* The rule sits below the text rather than under the padded box, so the row reads as a
                menu and not as a set of buttons. Scaled from the centre so it does not jump. */}
            <Underline on={isCurrent(pathname, n.href)} />
          </Link>
        ),
      )}
    </nav>
  );
}

export function MobileNav() {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);

  // Route changed: the panel must not survive the navigation it caused.
  React.useEffect(() => { setOpen(false); }, [pathname]);

  // A panel over the page must not leave the page scrolling underneath it, and Escape must close
  // it — the two things a hand-built menu usually forgets.
  React.useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = prev; window.removeEventListener("keydown", onKey); };
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="site-menu"
        aria-label={open ? "Close menu" : "Open menu"}
        className="inline-flex items-center justify-center rounded-input p-2 text-slate-mid transition-colors hover:text-ink"
      >
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
          {open ? <><path d="M6 6l12 12" /><path d="M18 6L6 18" /></> : <><path d="M4 7h16" /><path d="M4 12h16" /><path d="M4 17h16" /></>}
        </svg>
      </button>

      {open && (
        <div id="site-menu" className="fixed inset-x-0 top-16 z-40 border-b border-line bg-card shadow-e1">
          <nav className="mx-auto max-w-7xl px-s3 py-s3" aria-label="Main">
            {/*
              * The submenu is EXPANDED here, not a second tap.
              *
              * On a phone the panel is already a full-width list with room to spare, so collapsing
              * four product pages behind another disclosure buys nothing and costs a tap on the
              * four pages the site most wants found. They are indented under Platform with a rule,
              * which is enough to show the relationship without an accordion to operate.
              */}
            <ul className="grid gap-1">
              {NAV.map((n) => {
                const current = isCurrent(pathname, n.href);
                const kids = (n.children ?? []).filter((c) => c.href !== n.href);
                return (
                  <li key={n.href}>
                    <Link
                      href={n.href}
                      aria-current={current && !kids.some((c) => pathname === c.href) ? "page" : undefined}
                      className={
                        "flex items-center justify-between rounded-lg px-3 py-3 text-[16px] font-medium transition-colors " +
                        (current ? "bg-cta/10 text-cta" : "text-ink hover:bg-sand")
                      }
                    >
                      {n.label}
                      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                        <path d="M9 6l6 6-6 6" />
                      </svg>
                    </Link>
                    {kids.length > 0 && (
                      <ul className="ml-3 mt-1 grid gap-0.5 border-l border-line pl-3">
                        {kids.map((c) => {
                          const on = pathname === c.href;
                          return (
                            <li key={c.href}>
                              <Link
                                href={c.href}
                                aria-current={on ? "page" : undefined}
                                className={
                                  "block rounded-lg px-3 py-2.5 text-[15px] transition-colors " +
                                  (on ? "bg-cta/10 font-medium text-cta" : "text-slate-mid hover:bg-sand hover:text-ink")
                                }
                              >
                                {c.label}
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </li>
                );
              })}
            </ul>
            {/* The two actions the header keeps at every width, repeated where a thumb can reach
                them without scrolling back up. */}
            <div className="mt-s3 grid gap-2 border-t border-line pt-s3">
              <Link href="/contact/" className="rounded-input bg-cta px-4 py-3 text-center text-[15px] font-medium text-white">
                Request a demo
              </Link>
              <Link href="/signup/" className="rounded-input border border-cta px-4 py-3 text-center text-[15px] font-medium text-cta">
                Create an account
              </Link>
              <a href={SITE.appUrl} className="rounded-input border border-line px-4 py-3 text-center text-[15px] font-medium text-ink">
                Login
              </a>
              <Link href="/about/" className="rounded-input px-4 py-3 text-center text-[15px] font-medium text-slate-mid hover:text-ink">
                About Lenviq
              </Link>
            </div>
          </nav>
        </div>
      )}
    </div>
  );
}
