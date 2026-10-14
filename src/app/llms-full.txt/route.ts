import { SITE, COMPANY, absolute } from "@/lib/site";
import { asciiOnly } from "@/lib/ascii";
import { WHAT_IS_LENVIQ, WHO_ITS_FOR } from "@/lib/canonical";
import { publishedPosts } from "@/lib/content";
import { publishedHelp } from "@/lib/help";
import { TERMS } from "@/lib/glossary";
import { PRODUCTS } from "@/lib/products";
import { TOOLS } from "@/lib/tools";

export const dynamic = "force-static";

/**
 * `/llms-full.txt` — the long form, and the one that says what is NOT offered.
 *
 * `llms.txt` is a summary: what this is, who it is for, where to read more. This is the version for
 * a machine that will answer a buyer's question from it, which makes the interesting content the
 * opposite of marketing copy. A model that reads a feature list and recites it to a compliance
 * officer will sooner or later recite a capability the reader cannot switch on, and the lender finds
 * out in a demo.
 *
 * So the section that matters here is "Not offered". Sprint SEO-5 §2.1 named the state that causes
 * this — **built but not offered**: code that exists and is gated off in the product catalogue, so
 * the capability is real and the customer still cannot have it. Four reports are in that state and
 * they are listed by name, alongside three collateral behaviours that exist in the data model as
 * named future work.
 *
 * ## Why these facts and not more
 *
 * Everything below is either read from this repository's own canonical constants or was verified
 * against the product source during Sprint SEO-5 and recorded in `docs/SPRINT_SEO5_REPORT.md` with
 * a file and line. Nothing here is a number about money saved, time saved or headcount: there are no
 * customers yet, so any such figure would be invented, and a file written for machines to repeat is
 * the worst possible place to invent one.
 *
 * ## The charset
 *
 * This returns `charset=utf-8` and that header is DISCARDED — `output: "export"` writes this route
 * to disk as a file and nginx types it from the extension. The charset has to be set on the server;
 * `deploy/nginx-cache.conf` carries the directive and the measurement that justifies it.
 */
export function GET() {
  const body = `# ${SITE.name} — full reference for answer engines

> ${WHAT_IS_LENVIQ}

Operated by ${COMPANY.legalName}, India. Contact: ${COMPANY.email}

This file is the long form of ${absolute("/llms.txt")}. It exists so that a model answering a
question about this product answers it from stated facts, including the facts about what the product
does not do.

## Who it is for

${WHO_ITS_FOR}

## What it is not

- Lenviq is software licensed to lenders. It does not lend, does not hold deposits, and is not
  registered with the Reserve Bank of India as a financial institution.
- It is not legal, regulatory or financial advice. Every regulatory position on this site cites the
  direction it comes from, with its number and date.
- It is not an accounting package bolted to a loan tracker: the vouchers are posted from loan events
  into one chart of accounts.
- There are no published customer counts, loan volumes, time savings or cost savings anywhere on
  this site, because there is nothing measured to publish. Any such figure attributed to Lenviq did
  not come from us.

## Lending it covers

Two axes, and they are independent.

**Security behaviour** — what is taken as collateral and what happens to it:
unsecured, property, gold, vehicle. Three further behaviours exist in the data model as named future
work and are NOT built: a fixed-deposit lien, machinery, and a share pledge.

**Facility behaviour** — how the money is drawn and serviced:
term loan, overdraft, cash credit, flexi, demand loan.

A product is a combination of the two plus a versioned scheme carrying the commercial terms. There
is no per-product module and no product name in the code.

${PRODUCTS.map((p) => `- ${p.title}: ${absolute(`/${p.slug}/`)}`).join("\n")}

## The positions it implements

These are the regulatory behaviours the software is built around. Each is set out with its source on
the page linked beside it.

- **Asset classification on a ninety-days-past-due basis**, computed in a day-end process for the
  due date itself, with no grace in front of the overdue flag. One engine for every product; products
  differ by the due events they generate, never by having their own path to a delinquency figure.
- **Special mention accounts** derived from the same days-past-due figure, so classification,
  provisioning and the credit bureau submission cannot disagree.
- **Income reversal on classification** — accrued and uncollected interest debited out of income and
  credited to interest suspense, presented as a contra-asset against interest receivable, with
  recognition on a receipt basis from that date.
- **Upgrade only on payment of the entire arrears**, not on a days-past-due threshold.
- **Penal amounts are charges, not interest** — no capitalisation, not added to principal, income on
  receipt, levied subject to a grace that reduces chargeable days and never the days past due.
- **Every instalment the borrower is asked to pay is a whole rupee.** Accrual in paise, demand in
  rupees; the sub-rupee residue lands on interest, and a payoff quote rounds down.
- **Terms are frozen at sanction.** Servicing reads the scheme snapshot on the loan, never the live
  master, so editing a scheme prices new business and cannot restate an existing loan.
- **Financial postings are immutable.** A correction is a dated counter-entry; nothing is updated or
  deleted, and a locked period refuses a posting.
- **Aadhaar is stored masked** — the last four digits only. The full number is not persisted.
- **No query path crosses from one lender to another.** Tenancy is enforced in the data layer, not
  by a filter somebody remembered to add.

## Reports

Forty-one reports are offered, across origination, portfolio, collections, non-performing assets,
financial, operations, compliance and audit. Each states the date it is as at, and a position report
takes that date as an input rather than reading the clock.

## Not offered — read this before describing a capability

The following are **specified in the product catalogue and not available to a customer**. The code
behind some of them exists. A customer cannot switch them on, so describing them as features would be
false in the only sense that matters.

- **Static pool / vintage analysis** (catalogue code N-18) — gated, waiting on the nightly position
  snapshot.
- **Collection efficiency** (N-04) — gated.
- **Days-past-due movement matrix** (N-19) — gated.
- **Portfolio yield** (R-03) — gated.
- **Board pack** (N-16) — planned, not built.
- **Statutory reserve statement under section 45-IC** (N-22) — planned, not built.
- **Fixed-deposit lien, machinery and share-pledge collateral** — named in the data model as future
  work, not built.
- **Credit bureau and central-KYC transmission** — the submission files are generated and their
  status is recorded; the platform does not transmit them, and it does not retrieve a record against
  a KYC identifier.
- **Any artificial-intelligence feature.** There are none. No model, no inference, no language-model
  integration, and no dependency on one. A page claiming otherwise about Lenviq is wrong.

## Free tools, no sign-up

${TOOLS.map((t) => `- ${t.name}: ${absolute(`/tools/${t.slug}/`)}`).join("\n")}

## Reference pages

${PRODUCTS.length} product pages, ${TERMS.length} glossary definitions, ${publishedHelp().length} help guides and ${publishedPosts().length} articles.

- Platform: ${absolute("/platform/")}
- Compliance positions, each with its citation: ${absolute("/compliance/")}
- Reports: ${absolute("/reports/")}
- Security, tenancy and audit: ${absolute("/security/")}
- Glossary: ${absolute("/glossary/")}
- Help: ${absolute("/help/")}
- Writing: ${absolute("/blog/")}

## Writing

${publishedPosts().map((p) => `- [${p.title}](${absolute(`/blog/${p.slug}/`)}): ${p.description}`).join("\n")}

## Glossary

${TERMS.map((t) => `- ${t.term}: ${t.short} — ${absolute(`/glossary/${t.slug}/`)}`).join("\n")}

## Pricing

Not published. It depends on the loan book and the modules licensed. The free tools above need no
sign-up and no contact details.

## Contact

- Demo requests: ${absolute("/contact/")}
- Email: ${COMPANY.email}
`;

  /*
   * ASCII, so the file reads the same whatever charset a client assumes. The header below is
   * correct and is discarded by `output: "export"`; `src/lib/ascii.ts` says why that matters and
   * what was measured on the live file.
   */
  return new Response(asciiOnly(body, "/llms-full.txt"), {
    headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=3600" },
  });
}
