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
export const NAV = [
  { href: "/platform/", label: "Platform" },
  { href: "/compliance/", label: "Compliance" },
  { href: "/reports/", label: "Reports" },
  { href: "/security/", label: "Security" },
  { href: "/blog/", label: "Blog" },
];

const isCurrent = (pathname: string | null, href: string) =>
  !!pathname && (pathname === href || pathname.startsWith(href));

export function DesktopNav() {
  const pathname = usePathname();
  return (
    <nav className="hidden flex-1 items-center gap-s1 md:flex" aria-label="Main">
      {NAV.map((n) => {
        const current = isCurrent(pathname, n.href);
        return (
          <Link
            key={n.href}
            href={n.href}
            aria-current={current ? "page" : undefined}
            className={
              "relative rounded-input px-2.5 py-1.5 text-[14px] font-medium transition-colors " +
              (current ? "text-ink" : "text-slate-mid hover:text-ink")
            }
          >
            {n.label}
            {/* The rule sits below the text rather than under the padded box, so the row reads as a
                menu and not as a set of buttons. Scaled from the centre so it does not jump. */}
            <span
              aria-hidden="true"
              className={
                "pointer-events-none absolute inset-x-2.5 -bottom-0.5 h-[2px] origin-center rounded-full bg-cta transition-transform duration-200 " +
                (current ? "scale-x-100" : "scale-x-0")
              }
            />
          </Link>
        );
      })}
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
          <nav className="mx-auto max-w-6xl px-s3 py-s3" aria-label="Main">
            <ul className="grid gap-1">
              {NAV.map((n) => {
                const current = isCurrent(pathname, n.href);
                return (
                  <li key={n.href}>
                    <Link
                      href={n.href}
                      aria-current={current ? "page" : undefined}
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
