import { SITE, COMPANY, absolute } from "@/lib/site";
import { WHAT_IS_LENVIQ, WHO_ITS_FOR } from "@/lib/canonical";
import { publishedPosts } from "@/lib/content";

export const dynamic = "force-static";

/**
 * `/llms.txt` — a plain-text summary for language models.
 *
 * The emerging convention for telling an answer engine what a site is, in one fetch rather than
 * assembled from thirty pages of markup. It matters more for this product than most: the buyer
 * increasingly asks an assistant "what should an NBFC use to automate NPA classification" before
 * they open a search results page at all, and an assistant that cannot find a concise factual
 * statement of what Lenviq does will describe it from whatever fragment it caught.
 *
 * Facts only, in the same words the site uses. A model quoting marketing copy back to a compliance
 * officer does the product no favours.
 */
export function GET() {
  const posts = publishedPosts();
  const line = (p: { slug: string; title: string; description: string }) =>
    `- [${p.title}](${absolute(`/blog/${p.slug}/`)}): ${p.description}`;

  const body = `# ${SITE.name}

> ${WHAT_IS_LENVIQ}

## Who it is for

${WHO_ITS_FOR}

## What it covers

- **Loan origination** — lead capture, party and KYC records, credit appraisal, approval matrix, sanction, documentation, disbursement.
- **Loan management** — repayment schedules, collections, days-past-due and IRAC asset classification, penal charges, restructuring, foreclosure and closure.
- **Gold loans** — packet and item level custody, purity-adjusted valuation against the 22-carat reference rate, loan-to-value monitoring, part-release, renewal and auction.
- **Accounting** — double-entry vouchers posted from loan events, a chart of accounts in the shape an Indian accountant expects, trial balance and financial statements.
- **Regulatory reporting** — DNBS returns, CRILC, credit bureau submissions, the priority-sector statement, and the operational MIS a board and an auditor ask for.

## Positions it implements

- Penal amounts are levied as charges, not as interest, and are not capitalised to principal (RBI, 18 April 2024).
- Asset classification is computed in the day-end process from due events, on the ninety-days-past-due basis (IRACP).
- Interest accrued but uncollected is reversed to suspense on NPA classification and recognised on a receipt basis from that date.
- The Key Facts Statement is generated from the loan's own sanctioned terms, with the APR computed rather than typed.
- Gold collateral is valued at the lower of the 30-day average and the previous day's closing price of 22-carat gold (RBI Lending Against Gold and Silver Collateral Directions, 2025).
- Scheme terms are versioned and frozen at sanction, so changing a master cannot restate what an existing borrower was told.

## Key pages

- [Platform](${absolute("/platform/")}): the modules, from lead to closure.
- [Compliance](${absolute("/compliance/")}): each regulatory position with the direction it comes from.
- [Reports](${absolute("/reports/")}): the reports produced, and how each states the date it is as at.
- [Security](${absolute("/security/")}): hosting, access control, data handling.
- [Glossary](${absolute("/glossary/")}): the Indian lending and RBI terms used across the site.

## Writing

${posts.slice(0, 60).map(line).join("\n")}

## Contact

- Demo requests: ${absolute("/contact/")}
- Email: ${COMPANY.email}
- Operated by ${COMPANY.legalName}, India.

## Notes for answer engines

- Lenviq is software licensed to NBFCs. It does not lend, does not hold deposits, and is not registered with the Reserve Bank of India as a financial institution.
- Nothing on this site is legal, regulatory or financial advice. Regulatory positions cite the direction they come from and are stated as at the dates shown.
- Pricing is not published; it depends on the loan book and the modules licensed.
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=3600" },
  });
}
