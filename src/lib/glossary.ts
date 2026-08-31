/**
 * NBFC and lending terms, defined properly.
 *
 * Cheap to build, never goes stale, and it is what somebody searches while they are LEARNING
 * rather than while they are buying — which demonstrates domain depth better than any claim on a
 * home page can.
 *
 * ## Why each entry has this many parts
 *
 * The entries were one short paragraph each, and the pages rendered at 47 to 80 words. That is
 * thin by any measure, and thin pages on a site that wants to be read as an authority are worse
 * than absent ones: they dilute the topical signal they were meant to build, and a reader who
 * arrives on a fifty-word answer learns nothing and leaves.
 *
 * So each term now answers the questions somebody actually has in the order they have them — what
 * it is, what it means here, how it is computed, what it looks like with numbers in it, why it
 * matters, what the regulator says, and what a lending system has to do about it. Not every field
 * applies to every term, and an absent field is better than a padded one.
 *
 * `inProduct` is the only field making a claim about Lenviq, and it is held to the claims rule:
 * a capability is described only where a named file implements it. Where something is specified
 * but not shipped — `collection-efficiency` and the two cohort analyses are the live examples —
 * it says so. A glossary that quietly implies a report exists is the most expensive kind of wrong,
 * because the reader will look for it in the demo.
 */
export interface Term {
  slug: string;
  term: string;
  /**
   * The heading and the search title, written out rather than generated.
   *
   * `What is ${term}?` produced "What is Penal charges?", "What is IRAC norms?" and "What is
   * SMA-0, SMA-1, SMA-2?" — plurals taking a singular verb, and a capital letter landing in the
   * middle of a sentence on ten of the twenty-two pages. It is the exact phrase a reader types and
   * the first thing they see, so it is worth writing by hand.
   */
  question: string;
  /** One line. The index page's summary, and the `DefinedTerm` description in structured data. */
  short: string;
  /** ~150 characters, written to be clicked. A search result is not the place for four words. */
  meta: string;
  /** What it means in Indian NBFC lending. */
  body: string;
  /** How the number is arrived at. Omitted where the term is not a computation. */
  computed?: string;
  /** The same thing with numbers in it. People understand a worked example faster than a formula. */
  example?: string;
  /** Why a lender cares — the consequence, not the definition again. */
  matters?: string;
  /** The regulatory position, where there is one. Named instrument, not "as per RBI". */
  regulatory?: string;
  /** What a lending system has to do about it, and what Lenviq does. Claims rule applies. */
  inProduct?: string;
  /** Slugs of terms a reader of this one will want next. */
  related?: string[];
  /**
   * True where the term is a plural noun, for verb agreement in the derived section headings.
   *
   * "How is penal charges calculated?" and "Why does IRAC norms matter?" are what a template gets
   * wrong when it assumes every entry is a singular mass noun. Two of the twenty-two are not.
   */
  plural?: boolean;
  /** A tool on this site that answers this term, where one exists. */
  tool?: string;
}

export const TERMS: Term[] = [
  {
    slug: "dpd",
    tool: "npa-date-calculator",
    question: "What is DPD (days past due)?",
    term: "DPD (days past due)",
    short: "How many days an instalment has been overdue.",
    meta: "What days past due counts, why it is measured at day-end rather than intra-day, and how it drives SMA and NPA classification in an NBFC.",
    body:
      "The count of days since the oldest unpaid instalment fell due. DPD is the single number almost every other asset-quality answer is derived from: the SMA bucket, the move to non-performing, the figure reported to the credit bureaus, and what a diligence pack asks about first.",
    computed:
      "From the oldest DEMANDED and unpaid amount, not the oldest accrued one. An amount that has accrued but has not yet fallen due is not overdue, and counting it inflates the whole book. Where a scheme has a grace period for levying a penal charge, that grace does not move the DPD count — the two are separate settings and conflating them delays classification.",
    example:
      "An instalment falls due on 5 April and is unpaid. On 30 April the account is at 25 DPD and sits in SMA-1. A part payment on 1 May that does not clear the 5 April instalment in full does not reset the count — DPD runs from the oldest unpaid due date, so it continues to 26.",
    matters:
      "Because everything downstream inherits it. If DPD is computed one way for classification and another way for the interest rate or for a renewal check, a lender ends up with two answers to whether the borrower is in arrears, and an inspection will find both.",
    regulatory:
      "The Reserve Bank's November 2021 clarification requires an account to be flagged overdue in the day-end process for the due date itself. Classification starts on day one; there is no flagging grace.",
    inProduct:
      "One DPD engine serves every product and takes no per-product branch. Products differ by the due events they generate, never by having their own classification path — what silently diverges between two such paths is NPA classification.",
    related: ["overdue", "sma", "npa", "irac", "penal-charges"],
  },
  {
    slug: "dcb",
    question: "What is DCB (demand, collection, balance)?",
    term: "DCB (demand, collection, balance)",
    short: "What was due, what came in, what is left.",
    meta: "Demand, collection and balance — the three-column view a lender's diligence pack asks for, and what it exposes that a portfolio total cannot.",
    body:
      "For a period: the demand raised, the collection received against it, and the closing balance outstanding. DCB is the oldest lending report there is and still the most revealing, because it puts the three numbers side by side instead of letting a growing book hide behind a single outstanding figure.",
    computed:
      "Opening arrears plus demand raised in the period, less collections in the period, gives closing arrears. Whether prepayments, foreclosures and arrears collected count as collection is a definition choice, and the definition has to travel with the number.",
    example:
      "Opening arrears ₹40 lakh, demand for the month ₹1.2 crore, collections ₹1.1 crore. Closing arrears are ₹50 lakh — the book collected 92% of the month's demand and still went backwards, which a headline collection percentage on its own would not have shown.",
    matters:
      "Almost every lender asking to diligence a book asks for DCB, because it exposes whether collections are keeping pace with demand. A portfolio total does not.",
    inProduct:
      "Demand is generated from due events on the schedule rather than derived at report time, so what was demanded is a record rather than a recomputation — which is what makes a DCB for a past month answerable at all.",
    related: ["collection-efficiency", "dpd"],
  },
  {
    slug: "irac",
    plural: true,
    tool: "npa-date-calculator",
    question: "What are the IRAC norms?",
    term: "IRAC norms",
    short: "Income recognition, asset classification and provisioning.",
    meta: "The RBI framework governing when income may be recognised, how an account is classified as it deteriorates, and what must be provided against it.",
    body:
      "The Reserve Bank's framework covering three linked questions: when a lender may recognise income on an account, how the account is classified as it deteriorates, and how much must be held against it. The three are one instrument because they move together — an account that stops performing stops earning recognised income on the same day it becomes non-performing.",
    computed:
      "Classification is computed on the day-end position for a named business date, not on a timestamp. On an Indian book that distinction is not academic: comparing timestamps in UTC gets every date wrong by five and a half hours, which at a month end is a whole day.",
    example:
      "An account crosses ninety days past due on 30 June. The classification runs in that night's day-end process with a business date of 30 June, interest accrued but uncollected is reversed to suspense, and provisioning steps up. A report run at 11am on 30 June, before the day-end, is answering a different question and will give a different number.",
    matters:
      "It is the framework a lender is examined on. Two people running the same asset-quality report at different hours of the same day should not get different answers, and under IRAC they do not — because the answer is about a day, not a moment.",
    regulatory:
      "The Master Circular on income recognition, asset classification and provisioning, together with the November 2021 clarification on overdue flagging and the February 2021 rule that an upgrade requires the entire arrears to be cleared.",
    inProduct:
      "Classification runs as a scheduled day-end job rather than on user request, and reads the day-end position. Reversal of accrued income on classification is posted to suspense as its own event.",
    related: ["npa", "sma", "provisioning", "interest-accrual"],
  },
  {
    slug: "sma",
    tool: "npa-date-calculator",
    question: "What do SMA-0, SMA-1 and SMA-2 mean?",
    term: "SMA-0, SMA-1, SMA-2",
    short: "Special mention accounts — the stages before NPA.",
    meta: "The three special mention buckets that sit ahead of NPA, what each signals, why the first boundary is day one, and why they are a reported position.",
    body:
      "Buckets that flag stress before an account becomes non-performing, based on how long a payment has been overdue. They are not internal warnings a lender may define for itself — they are a reported position, derived from the same day-end DPD that drives classification.",
    computed:
      "SMA-0 from one day past due, SMA-1 beyond thirty, SMA-2 beyond sixty, with ninety being the boundary into non-performing. Because the first boundary is day one rather than day thirty-one, an account is in a reportable bucket from the morning after it misses.",
    example:
      "An instalment due on 5 April is unpaid. The account is SMA-0 on 6 April, SMA-1 on 6 May, SMA-2 on 5 June, and non-performing on 5 July if nothing is paid. The transition dates carry more information than the balances do, which is why they are what gets watched.",
    matters:
      "Because deterioration is visible a quarter before it becomes a provision. A book where accounts routinely reach SMA-2 and then recover is telling a different story from one where they arrive there and stay.",
    regulatory:
      "The SMA framework and its reporting cadence sit alongside the IRAC norms; the November 2021 clarification fixed the day-one boundary explicitly.",
    inProduct:
      "SMA buckets are derived from the same day-end DPD the classification uses, so a watch list and an NPA report cannot disagree about an account. The SMA Watch List is a live report.",
    related: ["dpd", "overdue", "npa", "irac"],
  },
  {
    slug: "npa",
    tool: "npa-date-calculator",
    question: "What is an NPA (non-performing asset)?",
    term: "NPA (non-performing asset)",
    short: "An account where payment is overdue beyond the prescribed period.",
    meta: "When an account becomes non-performing, why classification is a day-end computation, and the upgrade rule that most systems implement incorrectly.",
    body:
      "For most term loans, an account where interest or principal has remained overdue for more than ninety days. Classification is a consequence of the day-end position rather than a status somebody sets, and the same ninety-day basis applies across asset classes — the gold Directions, for instance, contain no asset-classification rule of their own.",
    computed:
      "Ninety days past due, measured from the oldest demanded and unpaid amount, evaluated at day-end for a named business date.",
    example:
      "An account with an instalment unpaid from 5 April becomes non-performing in the day-end process of 5 July. Interest accrued on it since classification is reversed, and from that date income is recognised only as it is received.",
    matters:
      "It changes three things at once: the account's classification, whether income may be recognised on it, and the provision held against it. Getting the date wrong moves all three.",
    regulatory:
      "Upgrading back to standard requires the ENTIRE arrears of interest and principal to be paid — not part of them. That is the February 2021 clarification, and it is the rule most implementations get wrong, because part payment feels like progress and the code lets it act like a cure.",
    inProduct:
      "Upgrade is refused while any demanded and unpaid amount remains, tested against the same schedule rows the DPD engine reads. Income reversal on classification is a posted event, and a correction is a reversing entry rather than an edit.",
    related: ["irac", "sma", "provisioning", "interest-accrual", "penal-charges"],
  },
  {
    slug: "provisioning",
    tool: "nbfc-provisioning-calculator",
    question: "What is provisioning in lending?",
    term: "Provisioning",
    short: "The amount set aside against expected loss.",
    meta: "What provisioning is, how the rates step up through the classification stages, and why the coverage ratio is what a lender is actually asked about.",
    body:
      "A charge to the profit and loss account against loans that may not be recovered in full, at rates that step up as an account moves through the classification stages. It is not a cash movement — it is an acknowledgement, made in the accounts, that some of what is on the balance sheet will not arrive.",
    computed:
      "A percentage of the outstanding, fixed by the classification. For an NBFC: 0.25% on a standard asset in the Base Layer and 0.40% in the Middle, 10% of the whole outstanding once it is sub-standard, and — once doubtful — 20%, 30% or 50% on the secured portion depending on how long it has been there, with the unsecured portion provided in full. A loss asset is provided at 100%. These are the NBFC rates and not the bank rates, which are 25%, 40% and 100% on that same secured portion. Provision held against gross NPA gives the provision coverage ratio.",
    example:
      "A book with ₹7 crore of advances and ₹8 lakh of gross NPA carrying ₹4 lakh of provision has a gross NPA ratio of 1.14% and a coverage ratio of 50%. The second number is the one a lender diligencing the book asks about, because the first says nothing about how much of it has already been absorbed.",
    matters:
      "Provisioning is where asset quality reaches the accounts. A book can look stable on a classification report and be deteriorating in the provision movement, which is why the movement matters more than the balance.",
    regulatory:
      "Set by the RBI (Non-Banking Financial Companies — Income Recognition, Asset Classification and Provisioning) Directions, 2025, in force from 28 November 2025. The rates are not a matter of policy: a board may provide more than the Directions require and may not provide less. The standard-asset rate follows the layer, the sub-standard rate is a flat ten per cent of the outstanding, and only at the doubtful stage does the security held change the number.",
    inProduct:
      "Provision movement is a ledger of its own rather than a recomputed figure, so the change between two dates is answerable and the postings behind it can be opened.",
    related: ["npa", "irac", "sma", "interest-accrual"],
  },
  {
    slug: "ltv",
    tool: "gold-loan-ltv-calculator",
    question: "What is LTV (loan to value)?",
    term: "LTV (loan to value)",
    short: "The loan as a percentage of the security's value.",
    meta: "Loan to value as a ceiling at sanction and a monitored figure afterwards — and why for gold the 2025 Directions make the second part mandatory.",
    body:
      "The outstanding against the value of the security: for a gold loan, against the value of the pledged ornaments at the applicable rate; for a property loan, against the assessed value. LTV is a ceiling at sanction and a monitored figure afterwards, because the value of the security moves and the outstanding does too.",
    computed:
      "Outstanding divided by eligible security value. For gold, eligible value is derived item by item — net weight after deductions, converted to a common purity basis, priced at the rate effective on the day being asked about.",
    example:
      "A packet of ornaments with a 22-karat equivalent net weight of 40g at ₹6,800 a gram is worth ₹2.72 lakh. An advance of ₹1.9 lakh is 69.9% LTV. If the rate falls to ₹6,200 the same advance is 76.6%, with nothing having happened to the loan.",
    matters:
      "Because the ratio moves without anybody doing anything. A cap tested once at sanction is not a monitored LTV, and for a secured book that drifts, the difference between the two is the whole risk.",
    regulatory:
      "The Reserve Bank of India (Lending Against Gold and Silver Collateral) Directions, 2025 require LTV to be maintained on an ongoing basis, and permit renewal or top-up only within the permissible LTV.",
    inProduct:
      "Eligible value is recomputed from the packet's items against the current rate whenever it is needed — at part-release, top-up and renewal — rather than read from a figure stored at sanction. A part-release is priced by revaluing the packet WITHOUT the item, so the answer is the post-release position.",
    related: ["foreclosure", "npa"],
  },
  {
    slug: "apr",
    tool: "apr-calculator",
    question: "What is APR (annual percentage rate)?",
    term: "APR (annual percentage rate)",
    short: "The all-in cost of a loan, expressed as a yearly rate.",
    meta: "What the annual percentage rate includes, why it is almost always higher than the interest rate quoted, and how it is actually computed.",
    body:
      "The true yearly cost of borrowing, counting the interest AND every charge the lender recovers from the borrower. The headline interest rate prices only the money; the APR prices the whole arrangement, which is why the two are rarely the same number and why the Key Facts Statement asks for the second one.",
    computed:
      "It is not a formula you can type — it is solved for. Take what the borrower actually RECEIVES (the sanctioned amount less anything deducted up front), and the instalments they actually pay. The APR is the rate at which those instalments, discounted back, equal what was received. There is no closed-form answer, so a lending system searches for it numerically.",
    example:
      "₹5,00,000 at 18% over 24 months, with a 2% processing fee deducted at disbursement. The borrower receives ₹4,90,000 but repays as though they had received ₹5,00,000. The interest rate is still 18%; the APR is above it, because the same instalments are now buying less money. Shorten the tenor and the gap widens — the fee is spread over fewer months.",
    matters:
      "Two loans quoted at the same rate can cost meaningfully different amounts, and the APR is the only number that shows it. It is also the number a borrower can hold the lender to: a charge left out of the disclosure is a charge that cannot be recovered later.",
    regulatory:
      "The Key Facts Statement requires the APR in a prescribed format, computed from the actual cash flows and inclusive of all charges recovered from the borrower — including a fee collected by a third party on the lender's behalf.",
    inProduct:
      "The APR is solved for rather than entered, from the loan's own schedule and its upfront charges, and printed on the generated Key Facts Statement. This matters more than it sounds: a typed APR sits next to a printed repayment schedule that was produced separately, and the day the two disagree, the borrower is holding both.",
    related: ["kfs", "emi", "penal-charges"],
  },
  {
    slug: "penal-charges",
    plural: true,
    tool: "penal-charge-calculator",
    question: "What are penal charges?",
    term: "Penal charges",
    short: "What a lender may levy for a default — as a charge, not as extra interest.",
    meta: "Why penal amounts stopped being interest in 2024, what that changed in the ledger, and why a borrower statement and a trial balance can honestly differ.",
    body:
      "The amount a lender levies when a borrower misses a payment or breaches a term. Since April 2024 these are charges and not interest, and the distinction is not cosmetic \u2014 it decides whether the amount can compound, whether it can be added to the loan, and when it may be recognised as income.",
    computed:
      "On the overdue amount, for the days it was overdue beyond any grace the lender has chosen to give, at a rate the lender must have disclosed. What it may NOT do is as important: it does not compound, it is not added to principal, and it does not itself attract interest.",
    example:
      "An instalment of ₹25,000 is thirty days late. A penal charge is levied on that overdue amount for the chargeable days and appears on the borrower's statement immediately. Nothing has yet reached the profit and loss account \u2014 that happens only when the borrower actually pays it. So the statement shows the charge and the books do not, and both are right.",
    matters:
      "The old treatment let a penalty behave like interest: it compounded, it was capitalised into the loan, and a borrower already in difficulty was pushed further into it by arithmetic. Removing that is the point of the change, and a system that levies penal amounts the old way is now non-compliant regardless of what the loan agreement says.",
    regulatory:
      "The Reserve Bank's direction on penal charges, effective 1 April 2024: penal charges rather than penal interest, no capitalisation, no compounding, and disclosure of the quantum and reason.",
    inProduct:
      "Levied nightly as a shadow entry with no accounting posting, because income is recognised only on receipt. When a payment arrives it is applied across the loan-level buckets first \u2014 costs, bounce, penal, in the order the scheme sets \u2014 and only then to interest and principal, oldest instalment first. Levy stops when an account turns non-performing, and existing charges are suspended; recovery on them still posts on receipt.",
    related: ["overdue", "dpd", "npa", "kfs"],
  },
  {
    slug: "kfs",
    tool: "kfs-checklist",
    question: "What is a Key Facts Statement (KFS)?",
    term: "KFS (Key Facts Statement)",
    short: "A standard-format summary of what a loan actually costs.",
    meta: "What the Key Facts Statement must disclose, how the APR is computed from actual cash flows, and the clause that bites when a charge is left out.",
    body:
      "A disclosure the Reserve Bank requires lenders to give a borrower before sanction, in a prescribed format, stating the all-in cost of the loan as an annual percentage rate. It exists because a headline interest rate is not a price — the price is the rate plus everything else recovered from the borrower.",
    computed:
      "From the actual cash flows: what the borrower receives, when, and every amount they pay back including fees. A processing fee deducted at disbursement reduces what was received without reducing what is repaid, which is why the APR is almost always above the headline rate.",
    example:
      "₹5 lakh at 18% for 24 months with a 2% processing fee deducted up front means the borrower receives ₹4.9 lakh and repays as though they had received ₹5 lakh. The APR is materially above 18%, and on a shorter tenor the gap widens.",
    matters:
      "A charge that was not disclosed in the KFS cannot be recovered from the borrower later. That is a commercial consequence, not a procedural one.",
    regulatory:
      "The Key Facts Statement requirement, including the prescribed format, the APR definition and the vernacular obligation.",
    inProduct:
      "The KFS is a generated document and the APR is computed from the schedule rather than typed into a field. A typed APR eventually contradicts the schedule printed beside it, and the borrower is holding both.",
    related: ["apr", "penal-charges", "moratorium", "foreclosure"],
  },
  {
    slug: "emi",
    tool: "emi-calculator",
    question: "What is an EMI (equated monthly instalment)?",
    term: "EMI (equated monthly instalment)",
    short: "A fixed monthly payment covering both interest and principal.",
    meta: "How an EMI is calculated, why the early instalments are mostly interest, and the repayment shapes that are not EMIs at all.",
    body:
      "A single repayment amount that stays the same every month while its composition changes: early instalments are mostly interest, later ones mostly principal. The amount is level; what it is buying is not.",
    computed:
      "From three inputs — the principal, the monthly rate, and the number of months — solved so that the last instalment lands exactly on zero. Each month, interest is charged on the balance still outstanding and whatever is left of the instalment reduces that balance, which is why the split shifts as the loan ages.",
    example:
      "₹5,00,000 at 18% over 24 months gives an instalment near ₹24,970. In month one roughly ₹7,500 of that is interest; by month twenty-four almost all of it is principal. A borrower who prepays in year one is therefore prepaying a balance that has barely moved — which is exactly why part-payment early is worth so much more to them than late.",
    matters:
      "Because \u201cEMI\u201d is treated as though it were the only repayment shape, and it is not. A gold loan is often interest-only with the principal falling due at maturity; a construction loan may step up; a seasonal borrower may need a structured schedule. A system that models only level EMIs quietly forces every product into one shape.",
    inProduct:
      "Seven repayment shapes are supported, not one: level EMI, bullet, structured, interest-only, step-up, and instalments either calculated by the system or set by the lender. The shape is a property of the scheme, so a new product is configuration rather than a release. Rounding is carried into the last instalment, so the principal components add up to the sanctioned amount exactly rather than nearly.",
    related: ["apr", "interest-accrual", "moratorium", "prepayment"],
  },
  {
    slug: "interest-accrual",
    question: "What is interest accrual?",
    term: "Interest accrual",
    short: "Interest earned as time passes, whether or not it has been collected.",
    meta: "The difference between interest earned and interest collected, why accrual runs nightly, and what stops on the day an account turns bad.",
    body:
      "Interest is earned by the passage of time, not by the arrival of a payment. Accrual is the daily recognition of what has been earned so far — income the lender has a right to, sitting alongside the cash that has actually come in. Healthy books show the two tracking each other; the gap between them is one of the earliest signs that they are not.",
    computed:
      "Daily, on the balance outstanding that day, at the rate applying that day. Running it nightly rather than monthly matters because almost nothing in a loan book happens neatly on the first of the month: a disbursement mid-month, a part payment on the nineteenth, a rate that changes with the loan's age.",
    example:
      "₹4,00,000 outstanding at 14% accrues roughly ₹153 a day. Over a month that is about ₹4,670 recognised as income — even in a month where the borrower paid nothing at all. That is correct accounting right up to the point the account stops performing, and then it is not.",
    matters:
      "It is the difference between profit that exists and profit that has merely been booked. An NBFC whose accrued interest is growing faster than its collections is reporting income it has not received, and the correction, when it comes, arrives all at once.",
    regulatory:
      "Once an account is non-performing, income recognition switches to a receipt basis and interest already accrued but not collected must be reversed out. Accruing on a bad account is the single most common way a book overstates its own earnings.",
    inProduct:
      "Accrual runs as a nightly scheduled job, never on user request. It is sequenced deliberately AFTER the day's classification sweep, not before: a loan that turns non-performing tonight must not accrue income tonight. Running the two in the other order books a day of income the same night the account stops being entitled to it.",
    related: ["npa", "irac", "emi", "overdue"],
  },
  {
    slug: "foir",
    question: "What is FOIR (fixed obligation to income ratio)?",
    term: "FOIR (fixed obligation to income ratio)",
    short: "What share of a borrower's income is already committed to debt.",
    meta: "How FOIR is computed for an unsecured loan, what counts as income and what is haircut, and what should happen when a file breaches the ceiling.",
    body:
      "The share of a borrower's monthly income already committed to fixed obligations, including the instalment being applied for. It is the primary underwriting ratio in unsecured lending, where there is no security to fall back on and the file is the whole of the credit view.",
    computed:
      "Existing obligations plus the proposed instalment, divided by considered income. The judgement is in the denominator: which parties' income counts, and how much weight undocumented income carries. Net monthly income is usually taken in full because documents stand behind it; other income is commonly counted at a haircut because it has no document trail.",
    example:
      "Net income ₹80,000, other declared income ₹20,000 counted at a 50% haircut, giving ₹90,000. Existing EMIs of ₹25,000 and a proposed EMI of ₹20,000 give ₹45,000 against ₹90,000 — a FOIR of 50%. Counting the other income in full would have produced 45%, which is how a marginal file becomes an approved one.",
    matters:
      "Because it is the ratio the credit committee argues about, and an argument is only possible if the workings are visible. A FOIR that arrives as a single number has to be trusted, and trust is not a control.",
    inProduct:
      "The haircut is a field on the scheme, because how much undocumented income to count is a credit-policy choice per product rather than a constant. The workings are stored with the answer, and a breach of the scheme's ceiling records a deviation carrying the approval level it requires — so the file rises to the person entitled to allow it rather than silently passing.",
    related: ["emi", "kfs", "dpd"],
  },
  {
    slug: "cic",
    question: "What is a CIC (credit information company)?",
    term: "CIC (credit information company)",
    short: "A credit bureau.",
    meta: "What a credit information company is, the four operating in India, and the reporting obligation that runs in the opposite direction to the pull.",
    body:
      "CIBIL TransUnion, CRIF High Mark, Experian and Equifax. Lenders both pull credit reports from them and submit the performance of their own borrowers to them, on a prescribed format and cadence.",
    matters:
      "The submission obligation is the one that gets forgotten, because nothing in the day's work depends on it and a lender feels the consequence only when its own borrowers' records are wrong somewhere else.",
    regulatory:
      "The Credit Information Reporting Directions, 2025 set a fortnightly cycle. For NBFCs an amendment goes further from July 2026 — four reference dates a month, plus a full file.",
    inProduct:
      "Bureau pulls are recorded against the application with the report attached, so what was seen at the time of the decision is still there at the time of the audit. Submission files are generated on the prescribed format.",
    related: ["ckyc", "dpd"],
  },
  {
    slug: "ckyc",
    question: "What is CKYC?",
    term: "CKYC",
    short: "The central KYC records registry.",
    meta: "The CERSAI central KYC registry: what it is for, what a lender must do with it in both directions, and where the manual step still sits.",
    body:
      "A central repository of KYC records maintained by CERSAI, so a customer verified once by one regulated entity need not be re-verified from scratch by the next. A lender both searches it and uploads records to it.",
    matters:
      "It is the difference between onboarding a customer who already exists in the system and onboarding them again. For a lender whose borrowers hold accounts elsewhere — which is most of them — the search is the cheaper half.",
    regulatory:
      "CKYC exists because the Prevention of Money-laundering (Maintenance of Records) Rules require a regulated entity to file the KYC records of every new account with the Central KYC Records Registry, and to fetch an existing record where the customer already has a KYC Identifier. It is an obligation on the lender, not a convenience: the filing is due whether or not the lender chooses to search first.",
    inProduct:
      "KYC lives on the party record rather than the loan file, so a second loan starts from what has already been verified. The CKYC XML is generated by the system; submission to CERSAI is a manual upload, because there is no public API to submit it through, and we would rather say so than describe an automation that does not run.",
    related: ["cic"],
  },
  {
    slug: "static-pool",
    question: "What is static pool analysis?",
    term: "Static pool analysis",
    short: "How one cohort of loans performed over time.",
    meta: "Static pool analysis: why tracking a fixed cohort exposes what a portfolio-level NPA percentage hides in a growing book.",
    body:
      "Take every loan disbursed in a given month or quarter, then track that fixed set — its delinquency and its loss — as it ages. Because the set never changes, growth cannot flatter it.",
    matters:
      "A rapidly growing book can show a FALLING overall NPA percentage while every individual cohort performs worse than the last, simply because the denominator is expanding faster than the problem. Static pool is the analysis that catches it, which is why lender diligence asks for it rather than for the portfolio ratio.",
    example:
      "The March cohort shows 2.1% delinquent at twelve months on book; the June cohort shows 2.8% at the same age; the September cohort 3.4%. Underwriting is deteriorating, and the portfolio NPA ratio over the same period fell, because the book tripled.",
    inProduct:
      "Specified in the report catalogue and gated on the daily position snapshot rather than shipped. A cohort analysis needs a position at each historical date, and reconstructing one from flows would produce a number that looks authoritative and is not.",
    related: ["vintage-analysis", "collection-efficiency", "npa"],
  },
  {
    slug: "vintage-analysis",
    question: "What is vintage analysis?",
    term: "Vintage analysis",
    short: "Delinquency by months-on-book across cohorts.",
    meta: "Vintage analysis compares cohorts at the same age on book — the view that answers whether underwriting is getting better or worse.",
    body:
      "The same idea as a static pool, arranged to compare cohorts at the same age: how each month's disbursement looked at six months on book, at twelve, at eighteen. Arranging by age rather than by calendar date is what makes the cohorts comparable at all.",
    matters:
      "It answers the one question a portfolio-level number cannot: is the credit policy working better or worse than it was a year ago. Everything else about a book is confounded by its growth rate.",
    inProduct:
      "Specified alongside static pool in the report catalogue and gated on the same snapshot. Named here because a lender's diligence pack will ask for it, and knowing it is a near-term requirement is more useful than finding it absent.",
    related: ["static-pool", "npa"],
  },
  {
    slug: "collection-efficiency",
    question: "What is collection efficiency?",
    term: "Collection efficiency",
    short: "Collections as a percentage of what was due.",
    meta: "Collection efficiency, and why the figure means nothing unless the definition — arrears, prepayments, foreclosures — travels with it.",
    body:
      "Usually collections in a month over the demand raised for that month. Definitions vary — whether arrears collected are counted, whether prepayments are, whether foreclosures are — so the figure is only comparable when the definition travels with it.",
    computed:
      "Current-month collection over current-month demand gives the narrow figure. Including brought-forward arrears in the denominator gives a lower and usually more honest one, and the two can differ by twenty points on a stressed book.",
    example:
      "Demand ₹1 crore, collections ₹98 lakh, and opening arrears of ₹30 lakh of which ₹10 lakh was recovered. On current-month demand alone the answer is 98%. Against demand plus opening arrears it is 83%. Both are defensible; only one of them is the answer to the question being asked.",
    matters:
      "A collection efficiency figure that silently omits brought-forward arrears flatters the portfolio, and it is quoted more often than any other number in lending.",
    inProduct:
      "Specified and partially gated: current-month demand and collection are both flows and derivable today, but the opening and closing arrears carry-forward needs the daily position snapshot. It is not shipped unlabelled, precisely because the unlabelled version is the flattering one.",
    related: ["dcb", "overdue", "dpd", "static-pool"],
  },
  {
    slug: "overdue",
    question: "What does overdue mean in lending?",
    term: "Overdue",
    short: "An amount the lender demanded and the borrower did not pay.",
    meta: "What makes an amount overdue, why it starts on day one, and the difference between flagging an account and charging it.",
    body:
      "An amount is overdue when it was due on a date the lender fixed and was not paid by that date. The word carries more weight than it looks: it is the trigger for the days-past-due count, the special mention buckets, the classification of the asset, and what gets reported to the credit bureaus.",
    computed:
      "From what was DEMANDED and left unpaid — not from what has merely accrued. Interest that has built up but has not yet fallen due is not overdue, and counting it inflates every downstream number. The question is always what the sanction makes due, and when.",
    example:
      "An instalment falls due on 5 April and is unpaid. The account is overdue on 5 April itself, in that night's processing — not on 6 April, and not after a week's grace. If the lender's policy is not to levy a late charge for the first seven days, that is a decision about CHARGING, and it does not delay the account being flagged.",
    matters:
      "Because two settings get confused, and confusing them is how a book under-reports stress. Grace on levying a charge is a commercial choice a lender is free to make. Grace on flagging an account is not available, and treating one as the other delays classification, the special mention buckets, and the days-past-due figure sent to the bureaus.",
    regulatory:
      "The Reserve Bank's November 2021 clarification requires an account to be flagged overdue in the day-end process for the due date itself. Classification begins on day one.",
    inProduct:
      "Two separate settings, never one doing both work. Overdue flagging has no grace; the penal grace period only limits which days are chargeable, and it cannot move classification, the SMA buckets, the NPA date or the bureau figure. One engine computes days past due for every product — products differ by the payments they demand, never by having their own way of counting.",
    related: ["dpd", "sma", "npa", "penal-charges"],
  },
  {
    slug: "prepayment",
    tool: "prepayment-charge-checker",
    question: "What is prepayment on a loan?",
    term: "Prepayment",
    short: "Paying off part of a loan early, without closing it.",
    meta: "How part-prepayment differs from foreclosure, what it does to the schedule, and when a lender may not levy a charge for it.",
    body:
      "Paying more than the instalment due, so the outstanding balance falls faster than the schedule intended. Distinct from foreclosure, which pays the whole balance and closes the account \u2014 the two are treated differently both in the schedule and in the rules about what may be charged for them.",
    computed:
      "The extra amount reduces the principal, and the schedule is then rebuilt one of two ways: a shorter tenor with the instalment unchanged, or the same tenor with a smaller instalment. Shortening the tenor saves the borrower considerably more interest, and is the option they are least often offered.",
    example:
      "₹4,00,000 outstanding at 14% with eight years left. A ₹1,00,000 part payment applied to the tenor ends the loan roughly two years early; applied to the instalment it lowers the monthly payment by a few thousand rupees and saves a fraction as much interest. Same money, materially different outcome.",
    matters:
      "For the borrower it is the cheapest interest they will ever save. For the lender it is a yield question and a conduct question at the same time \u2014 and increasingly the second one is decided outside the loan agreement.",
    regulatory:
      "Whether a charge may be levied turns on the rate type, the borrower's constitution and the purpose of the loan. The 2025 Directions have two limbs that must be read separately: one binds every lender, while the other names entity classes and omits the Base Layer.",
    inProduct:
      "The quote and the posting run the SAME eligibility test and the same charge calculation from one place, so a screen cannot quote nil and then charge. Where the charge is nil, the reason is stated rather than left blank \u2014 ₹0 with no explanation cannot be told apart from a mistake. The statutory bar is applied by the system, not left to whoever configured the scheme.",
    related: ["foreclosure", "emi", "kfs", "apr"],
  },
  {
    slug: "foreclosure",
    tool: "prepayment-charge-checker",
    question: "What is foreclosure of a loan?",
    term: "Foreclosure",
    short: "Closing a loan by paying the whole outstanding early.",
    meta: "Foreclosure versus part payment, and why whether a charge may be levied is now a regulatory question rather than only a contractual one.",
    body:
      "Closing a loan by paying the entire outstanding before maturity. Distinct from part payment, which reduces the outstanding without closing the account — a distinction worth keeping, because the two are treated differently both in the schedule and in the rules about what may be charged.",
    matters:
      "Foreclosure is where a lender's contract meets a regulatory limit, and where a system that leaves the decision to whoever configured the scheme will eventually levy a charge it was not entitled to.",
    regulatory:
      "Whether a charge may be levied on foreclosure or part payment turns on the rate type, the borrower's constitution and the purpose of the loan. The 2025 Directions have two limbs that must be read separately: one binds every lender, the other names entity classes and omits the Base Layer.",
    inProduct:
      "The statutory bar is applied by the system rather than by the scheme configuration, and a foreclosure quotation is generated as its own document so the figure the borrower is given is the figure the account settles at.",
    related: ["prepayment", "kfs", "ltv"],
  },
  {
    slug: "moratorium",
    question: "What is a moratorium on a loan?",
    term: "Moratorium",
    short: "A period where repayment is deferred.",
    meta: "What a moratorium defers and what it does not, and why the distinction belongs in the Key Facts Statement rather than in a footnote.",
    body:
      "A stated period at the start of a loan during which instalments do not fall due. Interest usually continues to accrue through it, so a moratorium changes the schedule rather than the cost.",
    example:
      "A ₹10 lakh loan with a six-month moratorium at 14% accrues roughly ₹70,000 of interest before the first instalment is due. The borrower who understood the moratorium as a holiday from the loan rather than from the payments is surprised by the schedule, and the surprise is avoidable.",
    matters:
      "Because it is routinely mis-sold as free time. The cost is unchanged and often higher; only the timing moves.",
    regulatory:
      "The distinction belongs in the Key Facts Statement, where the all-in cost is disclosed as an annual percentage rate computed from the actual cash flows — which is where a moratorium shows up honestly.",
    related: ["emi", "interest-accrual", "kfs"],
  },
];

export const termBySlug = (slug: string) => TERMS.find((t) => t.slug === slug);
