import { SITE, COMPANY, absolute } from "@/lib/site";

/**
 * Organization and SoftwareApplication, once, in the root layout.
 *
 * The registration numbers are omitted while they are unconfirmed rather than filled with a
 * plausible value — structured data is read by machines that will not notice a wrong CIN, which
 * makes a wrong one worse here than on a page a person reads.
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

  const app = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(app) }} />
    </>
  );
}
