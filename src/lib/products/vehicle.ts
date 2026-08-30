import type { ProductSpec } from "./types";

/**
 * Vehicle. The page owns the operational reality nobody writes about properly: the RC endorsement,
 * the dealer and invoice flow on a new case, and insurance that expires while the loan is still
 * running — which is the only one of the four asset classes where the SECURITY has its own
 * calendar independent of the loan's.
 *
 * Vahan is deliberately absent. The provider catalogue lists two Vahan providers and the settings
 * UI will configure them, but no adapter is implemented, so an RC lookup is not something this
 * product does today and is not claimed here.
 */
export const VEHICLE: ProductSpec = {
  slug: "vehicle-loan-software",
  eyebrow: "Vehicle finance",
  title: "Vehicle loan software for NBFCs — RC, insurance, seizure",
  description:
    "Vehicle finance software for NBFCs: the new-versus-used detail form, hypothecation and RC endorsement, insurance expiry tracking, and the repossession trail.",
  h1: "The security drives away, and keeps its own calendar.",
  intro: [
    "This is the origination and loan management software for an NBFC running a vehicle finance book: the Part II vehicle detail form with its new-and-used branches, the dealer and invoice flow, hypothecation and the RC endorsement obligation, insurance tracked to its expiry date, and a repossession trail that survives being asked about.",
    "It is for NBFCs financing two-wheelers, cars, light commercial vehicles and tractors, new or used. Lenviq is licensed to lenders; it does not lend.",
  ],

  lifecycle: {
    head: "How a vehicle loan runs, from invoice to no-objection certificate",
    lead:
      "A vehicle case splits in two at the first question — is the vehicle new or used — and almost every field after that depends on the answer.",
    points: [
      ["Vehicle details, conditionally", "One form, two shapes. A used case asks for the registration number, registration date, RTO, chassis and engine numbers, the owner serial number and whether a prior hypothecation exists with its NOC reference. A new case asks for the dealer, the proforma invoice, the invoice amount, and the ex-showroom and on-road prices."],
      ["Margin and eligible value", "The advance is computed against a declared value basis — invoice, valuation or ex-showroom — so two lenders’ margin policies do not have to mean two different fields."],
      ["Insurance at disbursement", "Insurer, policy number, insured declared value and expiry date, with the hypothecation clause recorded as its own fact rather than assumed."],
      ["Hypothecation and RC", "The agreement carries the endorsement obligation with its thirty-day window, and the NOC reference closes the loop on a used vehicle that had a prior charge."],
      ["Servicing", "EMI, with the insurance and registration expiry dates now running on their own clock alongside the schedule."],
      ["Default", "Repossession as a tracked sequence — notice, delivery, seizure, sale, surplus — or withdrawal, each as its own recorded step."],
      ["Closure", "No-objection certificate, and the release of the charge."],
    ],
    evidence: [
      "src/lib/validation/vehicle.ts — vehicleCreateSchema: used and new field groups, insurance, eligibleValueBasis",
      "src/app/api/applications/[id]/collateral/vehicle",
      "src/app/api/lms/loans/[id]/repossession — notice, delivery, seizure, sale, surplus, release, withdraw",
    ],
  },

  specific: {
    head: "What only a vehicle book has to do",
    lead:
      "The security in a vehicle loan is the only one of the four that depreciates, moves, and carries dates of its own that have nothing to do with the repayment schedule.",
    points: [
      ["New and used are one form with two branches, not two forms", "The condition is a field, and the fields that follow are conditional on it. A used case is asked for its RTO and its owner serial number; a new case is asked for its dealer and its proforma invoice. Splitting this into two forms is how a lender ends up with two half-populated tables and a report that cannot join them."],
      ["Insurance expires while the loan is still running", "This is the one obligation that has no analogue in a gold or property book. A vehicle with a lapsed policy is an unsecured loan that nobody has noticed yet, and the tracker treats a vehicle with no policy on record as the same exposure as a lapsed one — it sorts to the top rather than below every current policy, because an absent policy is the most exposed asset on the report and not the least."],
      ["Prior hypothecation is a fact on the record", "A used vehicle that carried a charge has a NOC reference against it. It is a field, so it is answerable across the book rather than a note in a file."],
      ["Repossession is a sequence, and the trail is the point", "Notice, delivery of that notice, seizure, sale, surplus — and withdrawal, which is what happens when the borrower pays. Each is a recorded step with its own route, because the question a lender is asked afterwards is never *did you repossess* but *what did you do, and when, and can you show it*."],
      ["Electric is derived, never asked twice", "Whether a vehicle is electric comes from its fuel type rather than a separate flag. Two fields free to disagree about the same fact is not a question worth asking twice."],
    ],
    evidence: [
      "src/lib/validation/vehicle.ts — previousHypothecation, hypothecationNocRef, isElectric derived from fuelType",
      "src/lib/reports/catalogue.ts — N-12 Insurance & RC Expiry Tracker, and its note on nullsFirst sorting",
      "src/app/api/lms/loans/[id]/repossession/*",
    ],
  },

  compliance: {
    head: "The regulatory frame around a vehicle loan",
    points: [
      ["Repossession under fair practices", "The trail is the compliance artefact. Notice, delivery mode, seizure, sale and surplus are each recorded events rather than a status field overwritten in place."],
      ["Key Facts Statement", "The APR computed from the actual cash flows, including a fee deducted at disbursement — which on a short-tenor vehicle loan moves the number materially."],
      ["Penal charges", "Charges, not interest: not compounded, not capitalised, not added to principal, and recognised on receipt."],
      ["Classification", "The same day-end DPD engine and IRAC basis as every other product, with SMA buckets ahead of NPA."],
      ["Insurance as a covenant", "The agreement carries comprehensive insurance with the hypothecation clause and the renewal obligation, so the tracker is enforcing something the contract actually says."],
    ],
    evidence: [
      "src/lib/documents/builders.ts — doc07c: hypothecation, RC endorsement within 30 days, comprehensive insurance with hypothecation clause, repossession on default, insurance renewal",
      "CLAUDE.md LMS hard rules 14 and 18",
    ],
  },

  documents: {
    head: "What the system generates for a vehicle file",
    points: [
      ["Part II — Vehicle Details (DOC-04A)", "The vehicle annexure: make, model, variant, year, registration and chassis and engine numbers, and the valuation and insurance position."],
      ["Vehicle loan agreement (DOC-07C)", "With Schedule A describing the vehicle and its registration, chassis and engine numbers, and the vehicle clauses — hypothecation in the lender’s favour, RC endorsement within thirty days, comprehensive insurance carrying the hypothecation clause, no sale without consent, inspection, repossession on default and insurance renewal."],
      ["Key Facts Statement (DOC-06) and sanction letter (DOC-05)", "From the sanctioned terms on the file."],
      ["NACH debit mandate (DOC-10)", "The repayment instrument, with presentation and return handled as their own events."],
      ["No-objection certificate (DOC-11)", "On closure — the document the borrower needs to remove the hypothecation from the RC."],
    ],
    evidence: ["src/lib/documents/builders.ts — doc04a, doc07c, doc06, doc05, doc10, doc11"],
  },

  reports: {
    head: "The reports a vehicle book is actually run from",
    points: [
      ["Insurance & RC Expiry Tracker (N-12)", "Which secured assets have cover or registration lapsing, and when — with the uninsured sorted to the top."],
      ["Collateral Register (N-10)", "Every security on the book, vehicle alongside property and gold, with the loan’s current LTV."],
      ["Bounce Register (R-08) and NACH Presentation (R-07)", "The two reports a mandate-collected book lives on."],
      ["Recovery (R-13)", "What came back after default, and from where."],
      ["SMA Watch List (R-17)", "Stress ahead of NPA, on the day-end position."],
    ],
    evidence: ["src/lib/reports/catalogue.ts — N-12, N-10, R-08, R-07, R-13, R-17 all status LIVE"],
  },

  shots: {
    afterIntro: {
      name: "application-record",
      priority: true,
      alt: "A loan application record in Lenviq showing the captured application data section by section, with the stages it has passed through listed alongside",
      caption: "Part II is part of the application record, so the vehicle’s details and the file’s history are one document.",
    },
    afterSpecific: {
      name: "loan-accounts",
      alt: "The Lenviq loan accounts list showing each account with its status, days past due, outstanding balance and branch, filterable by status",
      caption: "The book by status and days past due — the view a collections desk works from.",
    },
  },

  faqs: [
    {
      q: "Does the system handle new and used vehicles differently?",
      a: "Yes, as one form with two branches. Condition is a field, and the fields that follow depend on it — a used case is asked for its registration number, RTO, chassis and engine numbers, owner serial number and any prior hypothecation with its NOC reference; a new case is asked for the dealer, proforma invoice, invoice amount and the ex-showroom and on-road prices.",
    },
    {
      q: "Does Lenviq pull the RC from Vahan?",
      a: "No. The provider catalogue lists Vahan and the tenant settings will configure it, but no adapter is implemented, so RC details are captured on the vehicle detail form rather than fetched. We would rather say that than describe a lookup that does not run.",
    },
    {
      q: "How is insurance expiry tracked?",
      a: "Insurer, policy number, insured declared value and expiry date are captured against the vehicle, and the Insurance & RC Expiry Tracker reports what is lapsing and when. A vehicle with no policy on record sorts to the top rather than the bottom, because an absent policy is the same exposure as a lapsed one.",
    },
    {
      q: "Is repossession tracked, or is it a status field?",
      a: "It is a sequence of recorded events: notice, delivery of the notice, seizure, sale and surplus, plus withdrawal when the borrower pays. Each has its own route and its own record, because the question afterwards is what was done and when, not merely what the current status is.",
    },
    {
      q: "Does the agreement cover the RC endorsement?",
      a: "Yes. The vehicle agreement carries hypothecation in the lender’s favour, RC endorsement within thirty days, comprehensive insurance carrying the hypothecation clause, no sale or transfer without consent, inspection, repossession on default and the insurance renewal obligation.",
    },
    {
      q: "Are penal charges added to the loan?",
      a: "No. Since April 2024 penal amounts are charges rather than interest: not compounded, not capitalised, never added to principal, and recognised in the general ledger on receipt. They appear on the borrower’s statement when levied, which is why a statement and a trial balance can honestly show different numbers.",
    },
  ],

  related: [
    { href: "/blog/penal-charges-not-interest/", label: "Penal charges are charges, not interest", note: "What the August 2023 direction changed in the ledger." },
    { href: "/loan-against-property-software/", label: "Loan against property software", note: "The other secured book, where the security stays put and the documentation is the risk." },
    { href: "/reports/", label: "NBFC reporting software", note: "Where the expiry tracker and the collateral register sit." },
    { href: "/glossary/dpd/", label: "DPD (days past due)", note: "How the count is computed, and why day-end rather than intra-day." },
  ],
};
