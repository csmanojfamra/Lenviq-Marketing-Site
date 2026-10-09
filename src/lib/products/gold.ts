import type { ProductSpec } from "./types";

/**
 * Gold. The strongest of the four pages and the one with the thinnest competition, because the
 * questions a gold NBFC actually has after June 2025 — the valuation reference, the seven working
 * day return clock, what renewal may and may not do — are barely written about by anyone selling
 * software.
 *
 * It is also the page where a wrong sentence costs most, because a gold lender knows this ground
 * exactly. Every capability below names its file, and the two things the product does NOT do are
 * stated rather than omitted.
 */
export const GOLD: ProductSpec = {
  slug: "gold-loan-software",
  eyebrow: "Gold loans",
  title: "Gold loan software for NBFCs — LTV, renewal, auction",
  description:
    "Gold loan software built to the RBI’s 2025 Directions: appraisal, ongoing LTV, renewal eligibility, the auction clock and the return-of-collateral deadline.",
  h1: "A gold book is priced by the day and released by the clock.",
  subhead:
    "Gold loan software for NBFCs — appraisal, ongoing LTV, renewal, part-release and auction.",
  intro: [
    "This is the loan management software an NBFC runs a gold book on: appraisal and packet custody at pledge, a loan-to-value figure that is recomputed against the day’s rate rather than frozen at sanction, and the renewal, part-release and auction paths that the Reserve Bank of India (Lending Against Gold and Silver Collateral) Directions, 2025 now govern in detail.",
    "It is built for NBFCs lending against ornaments — a single-branch lender or a multi-state book. It is not a gold loan, and we are not a lender; this is the system the lender runs.",
  ],

  lifecycle: {
    head: "How a gold loan runs, from counter to release",
    lead:
      "A gold loan is the shortest lifecycle of the four and the most operationally dense, because almost all of it happens at a branch counter with the borrower present and the security in the room.",
    points: [
      ["Appraisal", "Each ornament is recorded separately — description, count, gross weight, net weight after stone and wastage deduction, and purity in karat. The appraiser is named on the record and the certificate carries that name."],
      ["Eligible value", "Net weights are converted to a 22-karat equivalent and priced against the tenant’s current rate, so an 18-karat bangle and a 24-karat coin in the same packet are valued on one basis rather than three."],
      ["Sanction and LTV cap", "The advance is capped by the scheme’s LTV against that eligible value, and by the regulatory cap held at platform level — whichever binds first."],
      ["Packet and custody", "The ornaments become a numbered packet held under two named custodians. No release path anywhere accepts one."],
      ["Servicing", "Interest servicing or bullet, depending on the scheme. Accrual runs nightly and writes the rate it used that day."],
      ["Part-release, top-up, renewal", "Each has its own eligibility check against the live LTV and the account’s classification, and each is refused with the reason rather than silently allowed."],
      ["Closure and return", "On closure the seven working day return clock starts. On default, the thirty-day auction notice does."],
    ],
    evidence: [
      "src/lib/lms/gold.ts — goldEligibleValuePaise, ltvPct, maxLendablePaise, assertDualCustodian",
      "src/lib/repos/gold-common.ts — latestGoldRate22kPaise, currentEligibleValuePaise, effectiveLtvCapPct",
      "src/app/api/applications/[id]/collateral/gold — appraisal capture",
    ],
  },

  specific: {
    head: "What only a gold book has to do",
    lead:
      "Three of these have no equivalent in any other loan type, and the fourth is the one most systems get wrong in the same way.",
    points: [
      ["LTV moves, so it is recomputed and not remembered", "The value of the security changes every day the gold price does. The eligible value is recalculated from the packet’s items against the current rate whenever it is asked for — at part-release, at top-up, at renewal — rather than read from a number written at sanction. A cap tested once at sanction is not a monitored LTV, and after the 2025 Directions it is not enough."],
      ["Renewal is a guard, not a button", "Paragraph 11 permits renewal only within the permissible LTV, only on a standard account, and — for a bullet loan — only after accrued interest is paid. All three are tested. The standard test reads the same unpaid due rows the DPD engine reads, so the renewal guard and the classification cannot disagree; a renewal granted on an overdue loan writes a fresh maturity date and buries the arrears, which is evergreening and the first thing an inspection looks for."],
      ["The rate slab is a rebate, not a penalty", "Gold schemes are priced in age slabs that rise with tenure. A borrower who services on time is held at the rate they started on; one in arrears stops earning that concession and reverts to the standing price for the loan’s age. Nothing is charged above the contracted rate, so this is not a penal charge — and each day is priced at the rate that applied on that day, never restated backwards."],
      ["The return clock is a liability, and it is counted in working days", "The 2025 Directions make ornaments returnable within seven working days of closure, with ₹5,000 a day payable to the borrower after that. A daily job counts the deadline over weekends and raises the packet as overdue with the compensation accrued so far, to the staff who can act on it. A deadline nobody is told about is the same as no deadline."],
      ["Part-release is priced before it is allowed", "Releasing an ornament from a live pledge reduces the security. Eligibility is computed by revaluing the packet without that item and testing the resulting LTV, so the answer is the post-release position rather than the pre-release one."],
    ],
    evidence: [
      "src/lib/repos/gold-renewal.ts — renewalEligibility: LTV, standard status from emi_schedule rows, accrued interest",
      "src/lib/repos/gold-release.ts — seven working day clock, ₹5,000/day compensation, dual-custody release",
      "src/lib/repos/gold-common.ts — currentEligibleValuePaise(excludeItemIds) for part-release",
      "src/lib/lms/gold.ts — goldRateForAccrual(status, originalRateBps, loanAgeDays, slabs)",
      "CLAUDE.md LMS hard rule 13 — the rebate analysis and its disclosure condition",
    ],
  },

  compliance: {
    head: "The 2025 Directions, where they land in the software",
    lead:
      "RBI/2025-26/47 of 6 June 2025 consolidated three decades of scattered circulars. These are the provisions that stop being policy and start being code.",
    points: [
      ["Ongoing LTV", "Maintained through the life of the loan, not tested once at sanction."],
      ["Auction notice", "At least thirty days between the notice and the auction date. The date is computed from the notice, so it cannot be set earlier by hand."],
      ["Surplus", "Any surplus on sale returns to the borrower within seven days, tracked as its own obligation rather than left to a manual step."],
      ["Return of collateral", "Seven working days from closure, with the statutory compensation accruing after that."],
      ["Dual custody", "Enforced on the release path itself, not only in the branch procedure manual."],
      ["Classification", "Gold follows the same DPD engine and the same IRAC ninety-day basis as every other product. The gold Directions contain no asset-classification rule, and a gold-only classification path is how a book quietly ends up with two answers."],
    ],
    evidence: [
      "src/lib/repos/auction.ts — AUCTION_NOTICE_DAYS = 30, SURPLUS_DEADLINE_DAYS = 7",
      "src/lib/repos/gold-release.ts — addBusinessDays, assertDualCustodian",
      "CLAUDE.md LMS hard rule 18 — one DPD engine, no per-product branch",
    ],
  },

  documents: {
    head: "What the system generates for a gold file",
    points: [
      ["Gold loan agreement (DOC-07D)", "Carries the pledge, both named custodians, the thirty-day sale notice, the part-release and renewal clauses, the LTV basis, and the interest slab table as a schedule — so the agreement discloses the standing price and the concession together."],
      ["Appraiser certificate", "Item-level: description, count, gross and net weight, purity, and the eligible value certified by the named appraiser."],
      ["Key Facts Statement (DOC-06)", "The all-in cost as an annual percentage rate, computed from the actual cash flows rather than typed in."],
      ["Auction notice", "Generated as a stored PDF with its delivery mode recorded, and the auction date fixed thirty days out by computation."],
      ["No-dues certificate (DOC-11)", "On closure, alongside the release of the packet under dual custody."],
    ],
    evidence: ["src/lib/documents/builders.ts — doc07d, doc06, doc11", "src/lib/repos/auction.ts — generateAuctionNotice"],
  },

  reports: {
    head: "The reports a gold book is actually run from",
    points: [
      ["Gold Holdings (R-14)", "What is in the vault, by branch, with weight and eligible value against outstanding."],
      ["Gold Renewal Pipeline (R-15)", "What is coming up for renewal and what is eligible — the operational answer to the guard above."],
      ["SMA Watch List (R-17)", "The stress buckets ahead of NPA, on the same day-end position the classification uses."],
      ["Collateral Register (N-10)", "Every security on the book with its charge and valuation state."],
      ["Penal Charges (R-PEN)", "Levied, collected and outstanding, on a receipt basis."],
    ],
    evidence: ["src/lib/reports/catalogue.ts — R-14, R-15, R-17, N-10, R-PEN all status LIVE"],
  },

  shots: {
    afterIntro: {
      name: "loan-account",
      priority: true,
      alt: "A live loan account in Lenviq showing its status and days past due, the sanctioned terms, the outstanding principal and penal balance, and tabs for the schedule, transactions, statement and charges",
      caption: "The position at the top of the account, and every figure behind it one tab away.",
    },
    afterSpecific: {
      name: "gold-loan-ltv",
      alt: "The gold panel on a live loan in Lenviq, showing the pledged packet valued at the reference rate, its items with their purity and 22-karat equivalent weight, the current loan-to-value against the cap, and a renewal eligibility check listing each condition with a tick or a cross",
      caption:
        "The renewal check, refusing. Three of paragraph 11’s conditions fail and each says why — not standard, ₹137.19 of accrued interest outstanding, and LTV at 77.95% against a 75% cap.",
    },
  },

  faqs: [
    {
      q: "Does the system monitor LTV after the loan is disbursed, or only at sanction?",
      a: "After. The eligible value is recomputed from the packet’s items against the current rate every time it is needed — at part-release, top-up and renewal — rather than read from a figure stored at sanction. The 2025 Directions require LTV to be maintained on an ongoing basis, and a cap tested once is not that.",
    },
    {
      q: "Can a gold loan be renewed while it is overdue?",
      a: "No. Renewal tests three things from paragraph 11: the resulting LTV is within the permissible cap, the account is standard, and for a bullet loan the accrued interest has been paid. The standard test reads the same unpaid instalment rows the DPD engine reads, so renewal cannot disagree with classification about whether the borrower is in arrears.",
    },
    {
      q: "How is the rising interest slab treated — is it a penal charge?",
      a: "No, and the distinction matters. The slab is the contracted rate the agreement and the Key Facts Statement disclose; a borrower who services on time is held at the rate they started on. Nothing is ever charged above contract, so there is no rate to re-characterise as penal. Each day is priced at the rate that applied that day and nothing already accrued is restated.",
    },
    {
      q: "What happens if the ornaments are not returned on time after closure?",
      a: "A daily job counts seven working days from closure, skipping weekends, and raises the packet to staff with the ₹5,000-per-day compensation accrued so far under the 2025 Directions. The release itself requires two named custodians.",
    },
    {
      q: "How does the auction process work in the system?",
      a: "The notice is generated as a stored PDF with its delivery mode recorded, and the auction date is computed as at least thirty days after it rather than entered. After sale, any surplus to the borrower is tracked as its own obligation with a seven-day deadline.",
    },
    {
      q: "Is NPA classification different for gold loans?",
      a: "No, and deliberately so. One DPD engine serves every product and takes no per-product branch; products differ by the due events they generate, not by having their own classification path. The gold Directions contain no asset-classification rule, so gold follows the same IRAC ninety-days-past-due basis as the rest of the book.",
    },
    {
      q: "Where does the gold rate come from?",
      a: "From a rate master the tenant maintains, dated and versioned, with the reference source recorded on each rate. Valuation reads the rate effective on the day it is asked about, so a revaluation run for a past date uses that day’s price rather than today’s.",
    },
  ],

  related: [
    { href: "/blog/gold-loan-directions-2025/", label: "What the 2025 gold loan Directions say, and what they deliberately do not", note: "The four provisions with operational consequences, and the subject the Directions never address." },
    { href: "/blog/what-the-2024-gold-review-found/", label: "What the RBI found when it looked at gold loan books", note: "The September 2024 review, and the two findings a lender’s own system either prevents or permits." },
    { href: "/glossary/ltv/", label: "LTV (loan to value)", note: "A ceiling at sanction and a monitored figure afterwards." },
    { href: "/compliance/", label: "NBFC compliance software", note: "Every regulatory position in the platform, with the direction it comes from." },
  ],
};
