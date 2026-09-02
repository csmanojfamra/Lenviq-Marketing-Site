"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SITE } from "@/lib/site";
import { toolsMenu } from "@/lib/tools";

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
 * They sit UNDER Product rather than as four more top-level items, because five entries across a
 * row that already has to survive a phone would crowd it, and because that is the real
 * relationship: one product, and these are what it does for one kind of book. The menu says so
 * with a heading rather than leaving a reader to infer that four of the five are not products.
 */
export interface NavItem {
  href: string;
  label: string;
  children?: NavChild[];
}

export interface NavChild {
  href: string;
  label: string;
  note: string;
  /**
   * A small heading printed above this item, where the list changes subject.
   *
   * The Product menu holds two different kinds of thing: the product itself, and the loan types it
   * is used for. Without the break they read as one list of five products, which is how the menu
   * came to be called "Platform" — a word chosen to cover a mixture rather than to name anything.
   */
  groupBefore?: string;
}

export const NAV: NavItem[] = [
  {
    href: "/platform/",
    /*
     * "Product", not "Platform".
     *
     * Checked what comparable companies call this. Zoho, Clear, Lentra and M2P all say "Products" —
     * but each of them HAS several, and Lenviq is one. The single-product answer is different:
     * Linear says "Product", and Tally — whose buyer is closest to this one — puts the product's own
     * name in the bar and "Features" under it. "Platform" appears once in seven, at Nucleus, and
     * there it is plural because they have two named platforms.
     *
     * The site had already settled this without the navigation noticing: the footer's columns are
     * "Product" and "By loan product", the pages are `/personal-loan-software/`, and the built HTML
     * says "software" 3,878 times against "platform" 1,665 — of which only 203 are body copy, and
     * 73 of those are the legal pages where "the Platform" is a defined term and stays.
     *
     * The URL does not move. The label is what a reader reads; the URL is what Google remembers.
     */
    label: "Product",
    children: [
      { href: "/platform/", label: "Everything it does", note: "Lead to closure, in one system" },
      /*
       * The two halves of the lifecycle, each its own page — because the market searches for them
       * separately and one page cannot answer both queries. They sit under the whole system rather
       * than beside the loan types, which are a different kind of thing.
       */
      { href: "/loan-origination-software/", label: "Loan origination", note: "Lead to disbursement", groupBefore: "By stage" },
      { href: "/loan-management-system/", label: "Loan management", note: "Disbursement to closure" },
      { href: "/personal-loan-software/", label: "Personal loans", note: "Unsecured — bureau, FOIR, NACH", groupBefore: "By loan product" },
      { href: "/vehicle-loan-software/", label: "Vehicle finance", note: "RC, insurance, repossession" },
      { href: "/loan-against-property-software/", label: "Loans against property", note: "Legal opinion, valuation, mortgage" },
      { href: "/gold-loan-software/", label: "Gold loans", note: "LTV, renewal, auction" },
      { href: "/business-loan-software/", label: "Business loans", note: "Eleven constitutions, promoter guarantees" },
      { href: "/cash-credit-software/", label: "Cash credit and overdraft", note: "Drawing power, stock statements, renewal" },
    ],
  },
  /**
   * Tools gets a menu, and Platform's argument for one does not apply here.
   *
   * Platform's children are pages you read; a reader arrives wanting "the platform" and the menu
   * offers narrower versions of it. Tools are different — nobody wants "tools", they want the EMI
   * calculator. The hub is a way of finding one, not a destination, so putting six names one hover
   * away skips a page that exists only to be clicked through.
   *
   * The trigger stays a real link to the hub, for the reader who does want to browse.
   */
  {
    href: "/tools/",
    label: "Tools",
    children: toolsMenu(),
  },
  { href: "/compliance/", label: "Compliance" },
  { href: "/reports/", label: "Reports" },
  { href: "/security/", label: "Security" },
  { href: "/blog/", label: "Blog" },
  /*
   * About, in the bar.
   *
   * Seven of the nine comparable sites carry a Company or About item; this one had it in the
   * phone menu and the footer but nowhere in the desktop bar. That is the page holding the CIN,
   * the registered office and what this company has shipped since 2018 — the trust artefact a
   * small vendor selling to a regulated buyer has, reachable only from the foot of the page.
   */
  { href: "/about/", label: "About" },
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

      {/*
        * Always in the DOM, hidden when closed — not conditionally rendered.
        *
        * `{open && …}` meant the menu's links existed only after a click, so the built HTML carried
        * no link to any of the nine tool pages or the four product pages from the site-wide
        * navigation. They were reachable through their hubs, but a nav link is the strongest
        * internal signal a page gets and these had none of it in the markup.
        *
        * The `hidden` attribute rather than a class: it takes the panel out of the accessibility
        * tree and the tab order too, which `display:none` alone through a utility class is easy to
        * get wrong.
        */}
      <div hidden={!open} className="absolute left-0 top-full z-50 pt-2">
          <ul className="w-[21rem] overflow-hidden rounded-card border border-line bg-card p-1.5 shadow-e2">
            {children.map((c) => {
              const on = pathname === c.href;
              return (
                <li key={c.href}>
                  {c.groupBefore && (
                    <p className="mt-1.5 border-t border-line px-3 pb-1 pt-2.5 text-[12px] font-semibold uppercase tracking-wide text-muted">
                      {c.groupBefore}
                    </p>
                  )}
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
        /*
         * A bounded height and its own scroll — and NOT `bottom-0`, which is the trap here.
         *
         * The panel was `fixed top-16` with no height bound and no scroll container, while the
         * effect above locks `body` scroll so the page cannot move underneath it. Anything past the
         * fold was therefore unreachable: not clipped visibly, simply gone. It went unnoticed while
         * the panel was short and stopped being short when Product grew to ten entries and Tools to
         * twelve.
         *
         * The obvious fix is `top-16 bottom-0`, and it collapses the panel to one pixel. The header
         * this lives inside carries `backdrop-blur`, and `backdrop-filter` establishes a containing
         * block for fixed descendants — so `bottom-0` resolves to the bottom of a 65px header
         * rather than of the viewport. `top-16` survives only because the header is itself at the
         * top of the page, which is luck rather than design. Measured, after shipping the wrong fix
         * to a build and looking at the box: height 1px, scrollHeight 1140.
         *
         * So the height is bounded by `max-height` against the viewport directly, which no
         * containing block can reinterpret. `dvh` rather than `vh` because a phone's address bar
         * changes the viewport and `vh` is measured against the larger of the two, which would put
         * the last row under the browser chrome. `overscroll-contain` stops a flick at the end of
         * the list from scrolling the page behind it.
         */
        <div
          id="site-menu"
          className="fixed inset-x-0 top-16 z-40 overflow-y-auto overscroll-contain border-b border-line bg-card shadow-e1"
          style={{ maxHeight: "calc(100dvh - 4rem)" }}
        >
          <nav className="mx-auto max-w-7xl px-s3 pb-s5 pt-s3" aria-label="Main">
            {/*
              * The submenus COLLAPSE, and the group you are inside opens itself.
              *
              * They used to be expanded, on the reasoning that a phone panel is "a full-width list
              * with room to spare" and that collapsing four product pages behind a second tap cost
              * more than it saved. That was true of four. Product now holds ten entries and Tools
              * twelve, and an expanded panel pushed Contact and About some twenty rows down — a
              * reader looking for either scrolled past the entire catalogue to reach them.
              *
              * `<details>` rather than React state: it is a disclosure, the browser already knows
              * how to be one, and it works before hydration. `open` is set from the current path, so
              * arriving on a tools page and opening the menu shows the tools.
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
                      <details open={current} className="group">
                        <summary className="flex cursor-pointer list-none items-center justify-between rounded-lg px-3 py-2 text-[13px] font-semibold uppercase tracking-wide text-muted marker:content-['']">
                          {kids.length} pages
                          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" className="transition-transform group-open:rotate-90">
                            <path d="M9 6l6 6-6 6" />
                          </svg>
                        </summary>
                      <ul className="ml-3 mt-1 grid gap-0.5 border-l border-line pl-3">
                        {kids.map((c) => {
                          const on = pathname === c.href;
                          return (
                            <li key={c.href}>
                              {c.groupBefore && (
                                <p className="px-3 pb-0.5 pt-2 text-[12px] font-semibold uppercase tracking-wide text-muted">
                                  {c.groupBefore}
                                </p>
                              )}
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
                      </details>
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
