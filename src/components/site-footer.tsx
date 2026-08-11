import Link from "next/link";
import { SITE, COMPANY } from "@/lib/site";

const COLUMNS = [
  {
    title: "Product",
    links: [
      { href: "/platform/", label: "Platform" },
      { href: "/reports/", label: "Reports" },
      { href: "/security/", label: "Security" },
      { href: "/pricing/", label: "Pricing" },
    ],
  },
  {
    title: "Regulatory",
    links: [
      { href: "/compliance/", label: "Compliance" },
      { href: "/glossary/", label: "Glossary" },
      { href: "/blog/", label: "Blog" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about/", label: "About" },
      { href: "/contact/", label: "Contact" },
      { href: "/privacy/", label: "Privacy policy" },
      { href: "/terms/", label: "Terms" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="mt-s9 border-t border-line bg-sand">
      <div className="mx-auto max-w-6xl px-s3 py-s7">
        <div className="grid gap-s5 md:grid-cols-[1.6fr_repeat(3,1fr)]">
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/brand/lockup-horizontal.svg" alt={SITE.name} width={116} height={26} />
            <p className="mt-s3 max-w-xs text-[14px] leading-relaxed text-slate-mid">{SITE.tagline}</p>
            <a
              href={SITE.appUrl}
              className="mt-s3 inline-block text-[14px] font-medium text-cta hover:text-cta-hover"
            >
              Login to Lenviq
            </a>
          </div>

          {COLUMNS.map((c) => (
            <div key={c.title}>
              <h2 className="text-[13px] font-semibold uppercase tracking-wide text-muted">{c.title}</h2>
              <ul className="mt-s2 space-y-1.5">
                {c.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-[14px] text-slate-mid transition-colors hover:text-ink">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-s6 border-t border-sand-border pt-s4 text-[13px] leading-relaxed text-muted">
          {/*
            The number and address are here because they are real and monitored. The registered
            office is still absent for the same reason it was: it has not been confirmed, and a
            wrong one on a lender's vendor page is worse than none.
          */}
          <p>
            <a href={`tel:${COMPANY.phone}`} className="hover:text-ink">{COMPANY.phoneDisplay}</a>
            {" · "}
            <a href={`https://wa.me/${COMPANY.phone.replace("+", "")}`} rel="noopener" className="hover:text-ink">WhatsApp</a>
            {" · "}
            <a href={`mailto:${COMPANY.email}`} className="hover:text-ink">{COMPANY.email}</a>
          </p>
          <p className="mt-1">
            {COMPANY.legalName}
            {COMPANY.cin ? ` · CIN ${COMPANY.cin}` : ""}
            {COMPANY.gstin ? ` · GSTIN ${COMPANY.gstin}` : ""}
          </p>
          <p className="mt-1">
            © {new Date().getFullYear()} {COMPANY.shortName}. Lenviq is a product of{" "}
            {COMPANY.shortName}.
          </p>
        </div>
      </div>
    </footer>
  );
}
