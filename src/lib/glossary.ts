/**
 * NBFC and lending terms, defined properly.
 *
 * Cheap to build, never goes stale, and it is what somebody searches while they are learning
 * rather than while they are buying — which demonstrates domain depth better than any claim on a
 * home page can. Each entry is a `DefinedTerm` in the page's structured data.
 */
export interface Term {
  slug: string;
  term: string;
  short: string;
  body: string;
}

export const TERMS: Term[] = [
  { slug: "dpd", term: "DPD (days past due)", short: "How many days an instalment has been overdue.",
    body: "The count of days since the oldest unpaid instalment fell due. DPD drives SMA classification and, past 90 days, the move to non-performing. It matters that DPD is computed from the day-end position rather than intra-day: a receipt banked at 4pm changes the answer, and two people running the same report at different hours should not get different numbers." },
  { slug: "dcb", term: "DCB (demand, collection, balance)",
    short: "What was due, what came in, what is left.",
    body: "For a period: the demand raised, the collection received against it, and the closing balance outstanding. A lender's diligence pack almost always asks for DCB because it exposes whether collections are keeping pace with demand, which a portfolio total does not." },
  { slug: "irac", term: "IRAC norms", short: "Income recognition, asset classification and provisioning.",
    body: "The Reserve Bank's framework for when a lender may recognise income on an account, how the account is classified as it deteriorates, and how much must be provided against it. Once an account is non-performing, interest is recognised on receipt rather than on accrual, and interest already accrued is reversed." },
  { slug: "sma", term: "SMA-0, SMA-1, SMA-2", short: "Special mention accounts — the stages before NPA.",
    body: "Buckets that flag stress before an account becomes non-performing, based on how long a payment has been overdue. They exist so a lender and the regulator can see deterioration early, rather than discovering it at the 90-day boundary." },
  { slug: "npa", term: "NPA (non-performing asset)", short: "An account where payment is overdue beyond the prescribed period.",
    body: "For most term loans, an account where interest or principal has remained overdue for more than 90 days. Classification is computed at day-end. Upgrading back to standard requires the entire arrears of interest and principal to be paid — not part of them." },
  { slug: "provisioning", term: "Provisioning", short: "The amount set aside against expected loss.",
    body: "A charge to the profit and loss account against loans that may not be recovered in full, at rates that step up as an account moves through the classification stages. Provision held against gross NPA gives the provision coverage ratio." },
  { slug: "ltv", term: "LTV (loan to value)", short: "The loan as a percentage of the security's value.",
    body: "For a gold loan, the outstanding against the value of the pledged gold at the applicable rate; for a property loan, against the assessed value. LTV is a ceiling at sanction and a monitored figure afterwards, because the value of the security moves." },
  { slug: "kfs", term: "KFS (Key Facts Statement)", short: "A standard-format summary of what a loan actually costs.",
    body: "A disclosure the Reserve Bank requires lenders to give a borrower before sanction, in a prescribed format, stating the all-in cost including fees as an annual percentage rate. The APR is computed from the actual cash flows, which is why it is usually higher than the headline interest rate." },
  { slug: "cic", term: "CIC (credit information company)", short: "A credit bureau.",
    body: "CIBIL TransUnion, CRIF High Mark, Experian and Equifax. Lenders both pull credit reports from them and submit the performance of their own borrowers to them, on a prescribed format and cadence." },
  { slug: "ckyc", term: "CKYC", short: "The central KYC records registry.",
    body: "A central repository of KYC records maintained by CERSAI, so a customer verified once by one regulated entity need not be re-verified from scratch by the next. A lender both searches it and uploads records to it." },
  { slug: "static-pool", term: "Static pool analysis", short: "How one cohort of loans performed over time.",
    body: "Take every loan disbursed in a given month or quarter, then track that fixed set — its delinquency and loss — as it ages. Because the set never changes, growth cannot flatter it: a rapidly growing book can show a falling overall NPA percentage while every individual cohort performs worse than the last." },
  { slug: "vintage-analysis", term: "Vintage analysis", short: "Delinquency by months-on-book across cohorts.",
    body: "The same idea as a static pool, arranged to compare cohorts at the same age — how each month's disbursement looked at six months on book, at twelve, at eighteen. It answers whether underwriting is getting better or worse, which a portfolio-level number cannot." },
  { slug: "collection-efficiency", term: "Collection efficiency", short: "Collections as a percentage of what was due.",
    body: "Usually collections in a month over the demand raised for that month. Definitions vary — whether arrears collected are counted, whether prepayments are, whether foreclosures are — so the figure is only comparable when the definition travels with it." },
  { slug: "foreclosure", term: "Foreclosure", short: "Closing a loan by paying the whole outstanding early.",
    body: "Distinct from part payment, which reduces the outstanding without closing the account. Whether a charge may be levied on either is now a regulatory question rather than only a contractual one, and turns on the rate type, the borrower's constitution and the purpose of the loan." },
  { slug: "moratorium", term: "Moratorium", short: "A period where repayment is deferred.",
    body: "A stated period at the start of a loan during which instalments do not fall due. Interest usually continues to accrue, so a moratorium changes the schedule, not the cost — a distinction that belongs in the Key Facts Statement." },
];

export const termBySlug = (slug: string) => TERMS.find((t) => t.slug === slug);
