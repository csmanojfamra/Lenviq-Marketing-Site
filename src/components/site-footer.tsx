import Link from "next/link";
import { SITE, COMPANY } from "@/lib/site";

const COLUMNS = [
  {
    title: "Product",
    links: [
      // Same words as the navigation's own first item — the page has one name on this site.
      { href: "/platform/", label: "Everything it does" },
      { href: "/reports/", label: "Reports" },
      { href: "/security/", label: "Security" },
    ],
  },
  /**
   * By loan product, in the footer rather than the top nav.
   *
   * Four more items across the header would crowd a row that already has to survive a phone, and
   * these are not how a returning visitor navigates. They are here because a page with no
   * site-wide inbound link is discoverable only through the sitemap, which is the weakest form of
   * discovery there is — the footer gives each one a link from all seventy-eight pages.
   */
  {
    title: "By loan product",
    links: [
      { href: "/personal-loan-software/", label: "Personal loan software" },
      { href: "/vehicle-loan-software/", label: "Vehicle loan software" },
      { href: "/loan-against-property-software/", label: "Loan against property software" },
      { href: "/gold-loan-software/", label: "Gold loan software" },
    ],
  },
  {
    // "Regulatory" of these five, only Compliance was. Help is about running the product,
    // Glossary is lending vocabulary and Free tools are calculators — the column had become
    // whatever was left over. Six of the nine comparable sites call this one Resources.
    title: "Resources",
    links: [
      { href: "/tools/", label: "Free tools" },
      { href: "/compliance/", label: "Compliance" },
      { href: "/help/", label: "Help" },
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
      <div className="mx-auto max-w-7xl px-s3 py-s7">
        <div className="grid gap-s5 md:grid-cols-[1.6fr_repeat(2,1fr)] lg:grid-cols-[1.6fr_repeat(4,1fr)]">
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
            Entity, CIN and registered office, on every page.
            
            This is where every comparable Indian company puts them — Razorpay, Clear and Khatabook
            all carry the entity and address in the footer and none of them makes a section of it.
            They were briefly a "Registration details" block on the About page instead, which no
            competitor does, and which reached a reader on one page out of forty. A lender running
            vendor diligence finds them faster here.
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
          {COMPANY.registeredOffice && <p className="mt-1">{COMPANY.registeredOffice}</p>}
          <p className="mt-1">
            © {new Date().getFullYear()} {COMPANY.shortName}. Lenviq is a product of{" "}
            {COMPANY.shortName}.
          </p>
        </div>
      </div>
    </footer>
  );
}
