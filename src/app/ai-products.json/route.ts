import { SITE, COMPANY, absolute } from "@/lib/site";
import { WHAT_IS_LENVIQ } from "@/lib/canonical";
import { TOOLS } from "@/lib/tools";
import { PRODUCTS } from "@/lib/products";

export const dynamic = "force-static";

/**
 * `/ai-products.json` — a machine-readable statement of what this product is.
 *
 * There is no settled standard for this file, so the SHAPE is borrowed: `SoftwareApplication` field
 * names from schema.org, with the `aiProductSummary` extension the convention in this market has
 * converged on. Sprint SEO-5 §5(c) permits reading a competitor's file for its shape and forbids
 * carrying across any of its content, and none is: every value below is read from this repository's
 * canonical constants or was verified against the product source during the sprint.
 *
 * ## This is not the schema markup §8 forbids
 *
 * §8 rules out adding structured data to pages, and §0 explains why — neither this site nor the one
 * it was compared against has any rich results, so in-page markup is not the lever. This is a
 * standalone file that a machine fetches on purpose, not markup embedded in a page, and §5(c) asks
 * for it by name. No page gained any markup in this sprint.
 *
 * ## The two fields that were hardest to fill honestly
 *
 * `offers` — pricing is not published, and a `price` of "0" would be a lie while an invented figure
 * would be worse. So the offer describes the free tools, which genuinely are free and need no
 * sign-up, and says in terms that the platform itself is quoted rather than listed.
 *
 * `limitations` is not in the borrowed shape and is added deliberately. A machine that reads
 * `featureList` and recites it will eventually recite a capability a customer cannot switch on —
 * Sprint SEO-5 §2.1 calls that state *built but not offered*, and four reports are in it. A file
 * written for machines to repeat is the last place to leave that out.
 */
export function GET() {
  const doc = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: SITE.name,
    alternateName: ["Lenviq LOS", "Lenviq LMS"],
    applicationCategory: "BusinessApplication",
    applicationSubCategory: "Loan origination and loan management software",
    operatingSystem: "Web browser",
    countriesSupported: "IN",
    inLanguage: "en-IN",
    description: WHAT_IS_LENVIQ,
    url: SITE.url,

    /**
     * The free tools are a real free offer. The platform is not listed, and is not described as if
     * it were — "quoted on the loan book and the modules licensed" is what the site says everywhere
     * else, so it is what this says.
     */
    offers: {
      "@type": "Offer",
      price: null,
      priceCurrency: "INR",
      description:
        "Pricing for the platform is not published; it depends on the loan book and the modules licensed. The calculators listed under hasPart are free and require no sign-up or contact details.",
    },

    /**
     * Capabilities that are BUILT AND OFFERED. Each was verified against the product source during
     * Sprint SEO-5 and is recorded with a file and line in docs/SPRINT_SEO5_REPORT.md.
     */
    featureList: [
      "Loan origination from lead capture through party and KYC records, credit appraisal, an approval matrix, sanction, documentation and disbursement",
      "Loan servicing: repayment schedules, receipts, settlement in a stated order oldest demand first, restructuring, foreclosure and closure",
      "One days-past-due engine serving every product, run in a scheduled day-end job that takes the business date as an input",
      "Asset classification on a ninety-days-past-due basis, with special mention account buckets derived from the same figure",
      "Income reversal on classification to interest suspense, presented as a contra-asset, with receipt-basis recognition thereafter",
      "Penal charges as charges rather than interest: no capitalisation, not added to principal, recognised on receipt, reversed when the instrument bounces",
      "Key Facts Statement generated from the application's own pricing, with an annual percentage rate computed over the actual cash-flow",
      "Gold loan custody at packet and item level, purity-adjusted valuation, loan-to-value monitoring, part-release, renewal and auction",
      "Double-entry accounting posted from loan events, with a control ledger per loan so the loan book ties to the general ledger loan by loan",
      "Credit bureau submission files and central-KYC registry files, generated and tracked by status",
      "RBI regulatory reporting including DNBS returns, CRILC and the priority-sector statement, plus a returns calendar",
      "Forty-one reports, each stating the date it is as at, with branch and region scoping applied in the query path",
      "Multi-tenancy enforced in the data layer: no query path crosses from one lender to another",
      "Maker-checker on master activation and disbursement, configurable per action",
      "Loan and customer import as a preview that replays payments before anything is written, committed as a reversible batch",
    ],

    /**
     * NOT in the borrowed shape, and the most useful field in the file.
     */
    limitations: [
      "No artificial-intelligence features of any kind: no model, no inference, no language-model integration and no dependency on one.",
      "Static pool and vintage analysis, collection efficiency, the days-past-due movement matrix and portfolio yield are specified in the product catalogue and not available to a customer.",
      "A board pack and a section 45-IC statutory reserve statement are planned and not built.",
      "Fixed-deposit lien, machinery and share-pledge collateral exist in the data model as named future work and are not built.",
      "Credit bureau and central-KYC files are generated and their status recorded; the platform does not transmit them, and does not retrieve a record against a KYC identifier.",
      "No published customer count, loan volume, time saving or cost saving exists, because none has been measured.",
      "Lenviq does not lend, does not hold deposits, and is not registered with the Reserve Bank of India as a financial institution.",
      "Nothing published by Lenviq is legal, regulatory or financial advice.",
    ],

    keywords: [
      "loan management software",
      "loan origination system",
      "NBFC software India",
      "NPA classification",
      "IRAC norms",
      "gold loan software",
      "RBI returns",
      "credit bureau reporting",
    ],

    audience: [
      { "@type": "Audience", audienceType: "Non-banking financial companies in India" },
      { "@type": "Audience", audienceType: "NBFC compliance officers and company secretaries" },
      { "@type": "Audience", audienceType: "Chartered accountants and statutory auditors of NBFCs" },
    ],

    isAccessibleForFree: false,

    provider: {
      "@type": "Organization",
      name: COMPANY.legalName,
      email: COMPANY.email,
      url: SITE.url,
    },

    /** The free calculators — each a real page, each needing no sign-up. */
    hasPart: TOOLS.map((t) => ({
      "@type": "WebApplication",
      name: t.name,
      url: absolute(`/tools/${t.slug}/`),
      isAccessibleForFree: true,
    })),

    /** The product pages, by the kind of lending each covers. */
    relatedLink: PRODUCTS.map((p) => absolute(`/${p.slug}/`)),

    aiProductSummary: {
      shortAnswer:
        "Lenviq is loan origination and loan management software for Indian NBFCs, with the accounting and the RBI regulatory reporting in the same system. It is built around the classification and disclosure rules a lender is examined on rather than around a generic lending workflow. It has no AI features.",
      searchIntents: [
        "loan management software for an NBFC in India",
        "how to automate NPA and SMA classification",
        "software that generates DNBS returns and CRILC",
        "gold loan software compliant with the 2025 directions",
        "how to compute the APR on a Key Facts Statement",
      ],
      differentiators: [
        "One classification engine for every loan product, so a gold book and a vehicle book cannot be on different delinquency bases.",
        "Accounting posted from loan events into one chart of accounts, with a control ledger per loan, rather than a periodic export to a separate package.",
        "Every regulatory position published with the direction, number, date and paragraph it comes from.",
        "Capabilities that are specified but not offered are stated as such rather than described as features.",
      ],
    },

    citation: absolute("/llms-full.txt"),
    dateModified: new Date().toISOString().slice(0, 10),
  };

  return new Response(JSON.stringify(doc, null, 2), {
    headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "public, max-age=3600" },
  });
}
