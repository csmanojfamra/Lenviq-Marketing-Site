import { SITE, COMPANY, absolute } from "@/lib/site";

/**
 * Organization and SoftwareApplication, once, in the root layout.
 *
 * A registration number appears only where it is confirmed, never filled with a plausible value —
 * structured data is read by machines that will not notice a wrong CIN, which makes a wrong one
 * worse here than on a page a person reads. The CIN and the registered office are confirmed and
 * stated in the legal documents; the GSTIN is not, so `taxID` stays absent.
 */
export function OrgJsonLd() {
  const org: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: COMPANY.legalName,
    alternateName: COMPANY.shortName,
    url: SITE.url,
    logo: absolute("/brand/lockup-horizontal.svg"),
    email: COMPANY.email,
  };
  if (COMPANY.cin) org.identifier = COMPANY.cin;
  if (COMPANY.gstin) org.taxID = COMPANY.gstin;
  /*
   * The registered office, as a real `PostalAddress` rather than one string.
   *
   * It is what lets a search engine resolve this company to a place, and it is the same address the
   * footer prints and the legal documents state. Parsed from the one value in `site.ts` so there is
   * still only one address on this site — a second copy here is a second thing to get wrong.
   */
  if (COMPANY.registeredOffice) {
    const parts = COMPANY.registeredOffice.split(",").map((x) => x.trim());
    const last = parts[parts.length - 1] ?? "";
    const postal = /(\d{6})$/.exec(last)?.[1];
    org.address = {
      "@type": "PostalAddress",
      streetAddress: parts.slice(0, -1).join(", "),
      addressRegion: postal ? last.replace(postal, "").trim() : last,
      ...(postal ? { postalCode: postal } : {}),
      addressCountry: "IN",
    };
  }

  /**
   * `WebSite`, so the site itself is an entity and not only the company and the product.
   *
   * **No `potentialAction` / `SearchAction`.** For a decade that was how a site asked for the
   * Sitelinks Search Box; Google retired the feature globally on 21 November 2024, and the markup
   * has been inert since. Adding it now would be cargo cult — it describes a search endpoint this
   * static site does not have, which is exactly the kind of structured data that says something
   * untrue about the page.
   */
  const site = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE.name,
    url: SITE.url,
    inLanguage: SITE.locale,
    description: SITE.tagline,
    publisher: { "@type": "Organization", name: COMPANY.legalName },
  };

  /**
   * `@id` so the product pages can add to this node rather than declaring a second application.
   * See `src/components/product-page.tsx`.
   */
  const app = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": `${SITE.url}/#software`,
    name: SITE.name,
    applicationCategory: "BusinessApplication",
    applicationSubCategory: "Loan management software",
    operatingSystem: "Web",
    description: SITE.tagline,
    url: SITE.url,
    publisher: { "@type": "Organization", name: COMPANY.legalName },
    audience: { "@type": "Audience", audienceType: "Non-Banking Financial Companies in India" },
    /* No aggregateRating and no review. Both would be fabricated. */
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(org) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(site) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(app) }} />
    </>
  );
}
