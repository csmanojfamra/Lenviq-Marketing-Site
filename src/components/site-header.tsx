import Link from "next/link";
import { SITE } from "@/lib/site";

const NAV = [
  { href: "/platform/", label: "Platform" },
  { href: "/compliance/", label: "Compliance" },
  { href: "/reports/", label: "Reports" },
  { href: "/security/", label: "Security" },
  { href: "/pricing/", label: "Pricing" },
  { href: "/blog/", label: "Blog" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-card/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-s4 px-s3">
        <Link href="/" className="flex shrink-0 items-center" aria-label={`${SITE.name} home`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/lockup-horizontal.svg" alt={SITE.name} width={116} height={26} />
        </Link>

        <nav className="hidden flex-1 items-center gap-s3 md:flex" aria-label="Main">
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className="rounded-input px-2 py-1.5 text-[14px] text-slate-mid transition-colors hover:text-ink"
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-s2">
          {/*
            Every "Login" on this site points at the product. The marketing site and the app share
            a registrable domain, so this is the only relationship between them: a link. This site
            sets no cookies at all and nothing it does can touch a session on the subdomain.
          */}
          <a
            href={SITE.appUrl}
            className="rounded-input px-3 py-2 text-[14px] font-medium text-slate-mid transition-colors hover:text-ink"
          >
            Login
          </a>
          <Link
            href="/contact/"
            className="rounded-input bg-cta px-4 py-2 text-[14px] font-medium text-white shadow-e1 transition-colors hover:bg-cta-hover"
          >
            Request a demo
          </Link>
        </div>
      </div>
    </header>
  );
}
