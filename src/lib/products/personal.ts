import type { ProductSpec } from "./types";

/**
 * Personal. The hardest of the four to differentiate, because unsecured lending is the plainest
 * case — which is exactly why the page leans on the one thing that is genuinely harder without
 * security: the assessment arithmetic, and what happens when it breaches.
 *
 * The FOIR section is the page. It is specific enough to be checked in a demo (the haircut is a
 * scheme field, the workings are stored, a breach records a deviation with an approval level), and
 * none of it is true of a gold loan decided on weight.
 */
export const PERSONAL: ProductSpec = {
  slug: "personal-loan-software",
  eyebrow: "Unsecured lending",
  title: "Personal loan software for NBFCs — FOIR, bureau, NACH",
  description:
    "Personal loan software for NBFCs: bureau pulls on the file, FOIR with its workings stored, deviations that route by level, and NACH collection.",
  h1: "With no security, the file is the underwriting.",
  intro: [
    "This is the loan origination and management software for an NBFC running an unsecured personal loan book: bureau reports pulled against the application and kept with it, income and obligations assessed into a fixed-obligation-to-income ratio whose workings are stored rather than trusted, deviations that route to the approval level they require, and collection through NACH with the arrears position visible from the day it starts.",
    "It is for NBFCs lending to individuals without security. Lenviq is licensed to lenders; it is not itself a lender and does not make credit decisions.",
  ],

  lifecycle: {
    head: "How an unsecured loan runs, from lead to closure",
    lead:
      "Without a security to fall back on, everything that would otherwise be reassurance has to be a record: what was pulled, what was counted, who allowed the exception.",
    points: [
      ["Lead and deduplication", "Captured in branch or in the field, checked against what is already known about the person before a file is opened."],
      ["KYC on the customer, not the loan", "Identity, address and the customer risk category live on the party record, so a second loan starts from what has already been verified rather than repeating it."],
      ["Bureau", "The pull is recorded against the application with the report attached, and the score band is a fact on the file rather than a number somebody remembers."],
      ["Income and obligations", "Income per party, with the parties whose income is actually considered marked as such; existing obligations per party, with the ones actually counted marked as such."],
      ["Assessment", "FOIR and DBR computed from those, against the scheme’s ceilings — see below."],
      ["Approval", "The matrix routes by sanctioned amount through its slabs, and any deviation raises the level required."],
      ["Sanction and disbursement", "Sanction snapshots the scheme’s terms; disbursement is maker-checker."],
      ["Servicing and collections", "NACH presentation and returns, a bounce register, and field collection when it comes to that."],
    ],
    evidence: [
      "src/lib/repos/applications.ts — computeAssessment",
      "src/lib/repos/bureau.ts, src/lib/repos/bureau-history.ts",
      "src/lib/repos/approval-matrix.ts, src/lib/repos/appraisal.ts",
      "src/app/api/lms/nach — mandates, present, result, returns",
    ],
  },

  specific: {
    head: "What an unsecured book has to get right",
    lead:
      "A gold loan is underwritten on a weight anyone can re-measure. A personal loan is underwritten on an arithmetic that has to be reproducible months later, in front of somebody who did not do it.",
    points: [
      ["The FOIR is stored with its workings, not just its answer", "The ratio is computed from the income of the parties whose income is considered and the obligations actually counted, plus the proposed instalment — and what it was made of is kept alongside it. A number a credit committee cannot take apart is a number they have to trust, and trust is not a control."],
      ["Other income is haircut, and the haircut is a product decision", "Net monthly income counts in full because documents stand behind it. Other income carries no income type and no document trail, so it counts at a percentage set on the scheme — a credit-policy choice per product, not a constant in the code. The arithmetic runs in basis points on integers throughout, so the ratio does not drift through a float."],
      ["The proposed EMI is priced at the ceiling and booked at the floor", "Assessment computes the instalment at the top of the scheme’s rate band, deliberately, so a file is not approved on a rate the borrower may not get. The sanction then books the floor. Underwriting on the best case is how a marginal file becomes an approved one."],
      ["A breach is a deviation, and a deviation has a level", "Exceeding the scheme’s FOIR or DBR ceiling does not silently pass and does not simply block. It records a deviation, and each deviation carries the approval level its master says it requires — so the file rises to the person entitled to allow it, and the fact that it was an exception is on the record permanently."],
      ["Collections without a security", "The instrument is the mandate, so the reports that matter are presentation and returns. A bounce is an event with its own register, and the arrears position drives the same day-end DPD, SMA and IRAC classification as every secured product."],
    ],
    evidence: [
      "src/lib/repos/applications.ts — computeAssessment: otherIncomeHaircutPct on the scheme, BigInt/bps arithmetic, stored workings, foirBreach/dbrBreach",
      "src/lib/repos/scheme-roi.ts — underwritingRoiPct (ceiling) versus the rate booked at sanction",
      "src/lib/repos/appraisal.ts — deviations enriched with the level from Deviation Master",
    ],
  },

  compliance: {
    head: "The regulatory frame around unsecured lending",
    points: [
      ["Key Facts Statement", "The all-in cost as an annual percentage rate, computed from the actual cash flows. A processing fee deducted at disbursement belongs in it, and on a short unsecured tenor it moves the number more than anywhere else."],
      ["Penal charges", "Charges, not interest, since April 2024: not compounded, not capitalised, never added to principal, recognised on receipt."],
      ["IRAC and SMA", "Day-end classification on the same engine as every other product, with the SMA buckets ahead of the ninety-day boundary and the upgrade rule requiring the entire arrears to be cleared, not part of them."],
      ["Income recognition on NPA", "Interest already accrued on an account that turns non-performing is reversed at classification, and recognition switches to receipt basis from that date."],
      ["Bureau reporting", "Submission on the prescribed format and cadence, alongside the pulls — the obligation that runs in the opposite direction and is easier to forget."],
    ],
    evidence: ["CLAUDE.md LMS hard rules 14, 15, 17 and 18", "src/lib/lms/bureau.ts, src/lib/lms/bureau-maps.ts"],
  },

  documents: {
    head: "What the system generates for an unsecured file",
    points: [
      ["Loan application form (DOC-01)", "With the co-applicant annexure (DOC-02) and the guarantor declaration (DOC-03) where the file carries them."],
      ["Key Facts Statement (DOC-06)", "In the prescribed format, with the APR computed rather than entered."],
      ["Personal loan agreement (DOC-07A)", "The base agreement, without a security schedule — which is what makes the demand promissory note matter more here."],
      ["Demand promissory note (DOC-08) and deed of guarantee (DOC-09)", "The instruments an unsecured lender actually enforces on."],
      ["NACH debit mandate (DOC-10)", "And, on closure, the no-dues certificate (DOC-11)."],
    ],
    evidence: ["src/lib/documents/builders.ts — doc01, doc02, doc03, doc06, doc07a, doc08, doc09, doc10, doc11"],
  },

  reports: {
    head: "The reports an unsecured book is actually run from",
    points: [
      ["NACH Presentation (R-07) and Bounce Register (R-08)", "The two that decide whether a mandate-collected book is working."],
      ["Overdue Collection (R-05) and Daily Collection (R-06)", "What is out, and what came in today."],
      ["SMA Watch List (R-17)", "Stress ahead of NPA, on the day-end position rather than a live read."],
      ["NPA Ageing (R-10) and Provision Movement (R-11)", "The bad book and what has been set aside against it."],
      ["Portfolio Cuts (N-02)", "The book sliced the way a credit head asks for it."],
    ],
    evidence: ["src/lib/reports/catalogue.ts — R-07, R-08, R-05, R-06, R-17, R-10, R-11, N-02 all status LIVE"],
  },

  shots: {
    afterIntro: {
      name: "applications",
      priority: true,
      alt: "The Lenviq applications list showing each file with its applicant, product, requested amount, current stage and the days it has been at that stage",
      caption: "The pipeline by stage and age, so a file that has stopped moving is visible without asking.",
    },
    afterSpecific: {
      name: "dashboard",
      alt: "The Lenviq dashboard showing portfolio value, active and overdue accounts, collections against demand and the asset quality position",
      caption: "The book’s position, computed from the same day-end figures the reports and the classification use.",
    },
  },

  faqs: [
    {
      q: "How is FOIR calculated, and can the calculation be inspected?",
      a: "From the income of the parties whose income is marked as considered, plus other income at the scheme’s haircut, against the obligations marked as counted plus the proposed instalment. What the ratio was made of is stored alongside the answer, so a credit committee can take it apart months later rather than having to trust it.",
    },
    {
      q: "Is the haircut on other income configurable?",
      a: "Yes — it is a field on the scheme, because how much undocumented income to count is a credit-policy choice per product rather than a constant. Net monthly income counts in full; other income counts at that percentage, and the arithmetic runs in basis points on integers so the ratio cannot drift through floating-point.",
    },
    {
      q: "What happens when a file breaches the FOIR ceiling?",
      a: "It records a deviation rather than silently passing or simply blocking. Each deviation carries the approval level its master requires, so the file rises to the person entitled to allow the exception — and the fact that it was an exception stays on the record.",
    },
    {
      q: "Which rate is the assessment run at?",
      a: "The ceiling of the scheme’s band, deliberately, so a file is not approved on the best rate the borrower might get. Sanction then books the floor. Underwriting at the ceiling and booking at the floor is the conservative direction.",
    },
    {
      q: "Are bureau reports kept with the application?",
      a: "Yes. The pull is recorded against the file with the report attached and the score band held as a fact on the record, so what was seen at the time of the decision is still there at the time of the audit.",
    },
    {
      q: "How does an unsecured account get upgraded after it turns NPA?",
      a: "Only when the entire arrears of interest and principal are cleared — not part of them. That is the February 2021 clarification, and it is applied on the same day-end classification engine that every other product uses.",
    },
  ],

  related: [
    { href: "/blog/kfs-what-goes-in-the-apr/", label: "What goes into the APR on a Key Facts Statement", note: "Every charge recovered from the borrower, including the two that get missed." },
    { href: "/blog/sma-classification-what-it-signals/", label: "SMA-0, 1 and 2 are a reported position", note: "Why the first boundary is day one, and what the transition dates mean." },
    { href: "/glossary/foir/", label: "FOIR (fixed obligation to income ratio)", note: "What it measures, how it is computed, and where lenders differ." },
    { href: "/compliance/", label: "NBFC compliance software", note: "Each regulatory position with the direction it comes from." },
  ],
};
