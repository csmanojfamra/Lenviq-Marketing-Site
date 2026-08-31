import type { ProductSpec } from "./types";

/**
 * Loan against property. The heaviest origination of the four, which is what the page is about:
 * almost everything distinctive happens BEFORE disbursement, and the one genuinely concrete claim
 * — that a file cannot reach credit review without its legal opinion and its valuation on record —
 * is a stage gate that can be pointed at in code.
 *
 * The section on what the system does NOT do (valuation staleness) is deliberate. On a page aimed
 * at a credit head, an honest gap is worth more than a claim they will test in the demo.
 */
export const LAP: ProductSpec = {
  slug: "loan-against-property-software",
  eyebrow: "Loans against property",
  title: "Loan against property software for NBFCs",
  description:
    "LAP software for NBFCs: legal opinion and valuation as stage gates, mortgage and charge documentation, long-tenor servicing, and the collateral register.",
  h1: "Most of a property loan happens before the money moves.",
  intro: [
    "This is the origination and loan management software for an NBFC running a loan-against-property book: the legal opinion, the technical valuation and the title position recorded against each property, mortgage documentation generated from what is on file, and the long-tenor servicing and prepayment behaviour that follows.",
    "It is for NBFCs lending against residential, commercial, industrial or plot security. Lenviq is software licensed to lenders — it is not a lender and does not originate loans.",
  ],

  lifecycle: {
    head: "How a property loan runs, from file to satisfaction of charge",
    lead:
      "Where a gold loan is decided at a counter in an hour, a LAP file is decided over weeks by people who are not in the same building. The workflow is the product.",
    points: [
      ["Property on the file", "Each property is a record in its own right — type and sub-type across residential, commercial, industrial and plot, with address, area and boundaries. A file may carry more than one."],
      ["Legal opinion", "Recorded against the property, by the empanelled advocate, as a document on the file rather than an email in someone’s inbox."],
      ["Technical valuation", "Recorded against the property, by the valuer, with the assessed value that the sanction is then computed from."],
      ["Credit review", "The stage where the two above stop being optional — see below."],
      ["Sanction", "Snapshots the scheme’s terms onto the loan, so a later change to the scheme cannot reach back into a loan already sanctioned."],
      ["Mortgage and charge", "Documentation generated with the property’s own schedule, and the charge-filing and release clauses carried through to the closure letter."],
      ["Servicing", "Long tenors, which changes what matters: the maturity profile, the prepayment and foreclosure position, and how much of an early instalment is interest."],
    ],
    evidence: [
      "src/app/api/applications/[id]/collateral/property/route.ts",
      "src/app/api/applications/[id]/collateral/property/[pid]/legal/route.ts",
      "src/app/api/applications/[id]/collateral/property/[pid]/valuation/route.ts",
      "src/lib/applications/stage-requirements.ts",
    ],
  },

  specific: {
    head: "What only a property book has to do",
    lead:
      "The distinctive risk in LAP is not credit, it is documentation — and documentation risk is only controlled by refusing to move a file that is missing something.",
    points: [
      ["A file cannot reach credit review without its opinion and its valuation", "PROPERTY_LEGAL_OPINION and PROPERTY_VALUATION are requirements on the CREDIT_REVIEW stage, and the stage refuses to advance without them. The requirement counts properties: if a file carries three and two have a valuation, it says so, in those words, and does not pass. This is the difference between a checklist on the rail and a gate."],
      ["The pending stage requires nothing, on purpose", "LEGAL_VALUATION_PENDING is where the opinion and the valuation are obtained, so requiring them to enter it would make the stage unreachable. They are required to LEAVE it. A pipeline that demands an artefact at the stage that produces it is the most common way a workflow ends up bypassed in practice."],
      ["Multiple properties, and the arithmetic that follows", "Security is per property, not per file. Eligible value and the resulting LTV are computed across what is actually mortgaged, so a file secured on two properties is assessed on two."],
      ["Long tenor changes which reports matter", "A twenty-year loan is barely amortising in year two. The maturity profile and the prepayment and foreclosure register carry more information about a LAP book than a portfolio total does, and the prepayment position is now a regulatory question rather than only a contractual one."],
      ["The system does not pretend to know how stale a valuation is", "The collateral register carries the security’s value but not a valuation date, so it does not print a valuation age. Capture valuation dates and the column follows."],
    ],
    evidence: [
      "src/lib/applications/stage-requirements.ts — PROPERTY_LEGAL_OPINION, PROPERTY_VALUATION on CREDIT_REVIEW; LEGAL_VALUATION_PENDING requires: []",
      "src/lib/reports/catalogue.ts — N-10 Collateral Register, and its note on the absent valuation age",
      "src/lib/reports/catalogue.ts — N-07 Maturity Profile, N-09 Prepayment & Foreclosure Register",
    ],
  },

  compliance: {
    head: "The regulatory frame around a property loan",
    points: [
      ["Prepayment charges", "The 2025 Directions are read as separate limbs: one binds every lender, the other names entity classes and omits the Base Layer. The system applies the statutory bar rather than leaving it to whoever configured the scheme."],
      ["Key Facts Statement", "The all-in cost as an annual percentage rate, computed from the actual cash flows — which on a long tenor with a processing fee is materially above the headline rate."],
      ["CERSAI filing fee", "A first-class charge type recovered at cost: no GST, not waivable, posted to its own ledger. A lender cannot forgive a fee it has already paid the registry. Registration itself is filed with CERSAI outside the system; the agreement and the release letter carry the charge-filing and satisfaction clauses."],
      ["SARFAESI", "The property agreement carries the SARFAESI clause for loans above ₹20 lakh, alongside title warranty, insurance, non-alienation and the release-of-mortgage obligation."],
      ["Classification", "Day-end IRAC on the same DPD engine as every other product, with SMA buckets ahead of it and income reversal on classification."],
    ],
    evidence: [
      "src/lib/lms/charge-types.ts — CERSAI Registration Charges: not waivable, no GST, own GL",
      "src/lib/documents/builders.ts — doc07b: SARFAESI (loans > Rs. 20 lakh), title warranty, release of mortgage",
      "src/lib/documents/html/clauses.ts — creation of mortgage, release of mortgage and satisfaction of charge",
    ],
  },

  documents: {
    head: "What the system generates for a LAP file",
    points: [
      ["Part II — Property Details (DOC-04B)", "The property annexure to the application: type, address, area, boundaries, and the valuation and legal position."],
      ["Property / LAP loan agreement (DOC-07B)", "With Schedule A describing the mortgaged property and Schedule B the repayment, plus the property clauses — mortgage creation, title warranty, insurance, non-alienation, inspection, property tax and release."],
      ["Key Facts Statement (DOC-06)", "In the prescribed format, with the APR computed rather than typed."],
      ["Sanction letter (DOC-05) and demand promissory note (DOC-08)", "Generated from the sanctioned terms on the file."],
      ["Release of mortgage letter", "On closure: title documents returned, satisfaction of charge recorded, and the certificate written to be produced before the Sub-Registrar."],
    ],
    evidence: ["src/lib/documents/builders.ts — doc04b, doc07b, doc06, doc05, doc08", "src/lib/documents/html/templates/letters.ts"],
  },

  reports: {
    head: "The reports a property book is actually run from",
    points: [
      ["Collateral Register (N-10)", "Every security on the book with its class, identifier, value and the loan’s current LTV."],
      ["Maturity Profile (N-07)", "What matures when — the view a long-tenor book is managed on and a short-tenor one is not."],
      ["Prepayment & Foreclosure Register (N-09)", "What closed early, and on what terms."],
      ["Concentration & Top Exposures (N-08)", "Where a property book’s real risk sits, which a portfolio total hides."],
      ["PDD Register (O-03)", "Sanction conditions still outstanding after disbursement — the document that has not come back yet."],
    ],
    evidence: ["src/lib/reports/catalogue.ts — N-10, N-07, N-09, N-08, O-03 all status LIVE"],
  },

  shots: {
    afterIntro: {
      name: "application-stages",
      priority: true,
      alt: "A loan application in Lenviq showing the workflow header with the current stage, what is blocking the next one, the approval status and the sanctioned amount",
      caption: "The stage rail states what is blocking the next step, so a file missing its valuation cannot be moved by not looking.",
    },
    afterSpecific: {
      name: "approvals-inbox",
      alt: "The Lenviq approvals inbox showing files awaiting a credit head’s decision, with the amount, the days waiting and the approval level each one has reached",
      caption: "Above the slab, a file routes to the credit head and waits there visibly rather than in an inbox.",
    },
  },

  faqs: [
    {
      q: "Can a LAP file be sanctioned without a legal opinion or a valuation on record?",
      a: "No. Both are requirements on the credit review stage, and the stage will not advance without them. The valuation requirement counts properties rather than files, so an application secured on three properties with two valuations is refused and told which count is short.",
    },
    {
      q: "Does the system handle more than one property on a single loan?",
      a: "Yes. Security is recorded per property, and eligible value and LTV are computed across what is actually mortgaged.",
    },
    {
      q: "Does Lenviq file the charge with CERSAI?",
      a: "No, and it does not claim to. The CERSAI registration fee is a first-class charge type — recovered at cost, no GST, not waivable, posted to its own ledger — and the loan agreement and the release letter carry the charge-filing and satisfaction-of-charge clauses. The filing itself is done with the registry outside the system.",
    },
    {
      q: "How are prepayment and foreclosure charges handled?",
      a: "The statutory bar is applied by the system rather than by whoever configured the scheme, with the two limbs of the 2025 Directions read separately: one binds every lender, and the other names entity classes and omits the Base Layer. A foreclosure quotation is generated as its own document.",
    },
    {
      q: "Does the collateral register show how old a valuation is?",
      a: "No. The security records carry an eligible value but no valuation date, so there is nothing to compute an age from. Once valuation dates are captured, the column follows.",
    },
    {
      q: "Does a change to the product scheme affect loans already sanctioned?",
      a: "No. Sanction snapshots the scheme’s terms onto the loan, and servicing reads that snapshot rather than the live master. A scheme is versioned and immutable once active.",
    },
  ],

  related: [
    { href: "/blog/prepayment-charges-2025/", label: "Prepayment charges after the 2025 Directions", note: "Why the two limbs have to be read separately, and what MSE does not mean." },
    { href: "/blog/frozen-terms-at-sanction/", label: "Why a loan should carry its own terms", note: "Snapshotting scheme parameters at sanction, and what goes wrong without it." },
    { href: "/vehicle-loan-software/", label: "Vehicle loan software", note: "The other secured book, where the security moves and carries its own expiry dates." },
    { href: "/platform/", label: "The loan origination and management system", note: "The whole workflow, lead to closure." },
  ],
};
