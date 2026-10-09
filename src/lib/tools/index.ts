/**
 * The tools, as data — so the hub, the sitemap, the intent map and the footer all read one list.
 *
 * ## Why these and not an EMI calculator first
 *
 * Every lending site has an EMI calculator and it ranks for nobody. What an NBFC — and the CA or CS
 * advising three of them — cannot find anywhere is a tool that answers a question the REGULATION
 * asks: what APR must this Key Facts Statement disclose, which date does this account turn
 * non-performing, is this gold packet still inside the cap after the rate moved.
 *
 * Those are also the questions where being wrong is expensive, which is why each one is computed by
 * the same arithmetic the product runs and pinned to it by a test.
 */
export interface Tool {
  slug: string;
  name: string;
  /** The question, in the words somebody would ask it. Used as the H1's subtitle and the card. */
  question: string;
  title: string;
  description: string;
  /**
   * One line on what using it gets you. Benefit, in plain words.
   *
   * This used to name the professions the tool was for — "credit, compliance, and the CA reviewing
   * a KFS". Telling a reader which job title should be reading a page is not a reason to use it,
   * and it excludes everyone else on the page's own masthead.
   */
  helps: string;
  /**
   * The writing that explains the rule this tool applies — rendered under the calculator.
   *
   * A tool page was a DEAD END: it answered one question and offered only other tools. That costs
   * twice. The reader who wants to know *why* the answer is what it is leaves to find out, and the
   * page passes none of its relevance to the posts that already rank on the same subject — which is
   * the opposite of what an asset nobody else in this segment has should be doing
   * (`docs/COMPETITIVE_PLAN.md` §3, Phase 3).
   *
   * Only where a post genuinely answers a question the tool raises. A near-miss link here reads as
   * a house ad, which is the same test the `tool:` card on a post is held to.
   */
  reading?: readonly { href: string; label: string; note: string }[];
  /**
   * Where this tool's answer actually comes from. Three honest categories, because the page used to
   * tell all ten of them the same story — "this runs the same arithmetic as the platform, and a
   * test fails the build if it differs" — which is true of four.
   *
   * `pinned`   the product emits worked cases from its own code and a test asserts this page
   *            reproduces every one. EMI, APR, gold LTV, the classification dates.
   * `computed` the arithmetic is this page's own, applied to a rate published in the instrument
   *            named on the page. Provisioning, penal charges.
   * `stated`   no arithmetic at all. It applies a Direction to the facts you enter and names the
   *            clause. The checklist, the layer finder, the returns calendar, the prepayment checker.
   */
  provenance: "pinned" | "computed" | "stated";
  /** Short enough for a navigation menu, where `name` and `question` are both too long. */
  navLabel: string;
  navNote: string;
  /**
   * The instrument this is built from, where the tool states a regulatory position rather than
   * doing arithmetic. Shown ON the page: a reader checking their own filing list is entitled to
   * know which Direction the answer came from, and to go and read it.
   */
  source?: string;
  sourceUrl?: string;
}

export const TOOLS: Tool[] = [
  {
    slug: "emi-calculator",
    provenance: "pinned",
    navLabel: "EMI calculator",
    navNote: "Instalment, schedule, and what a flat rate really costs",
    name: "EMI calculator",
    question: "Work out the monthly instalment, the full repayment schedule, and what a flat rate really costs.",
    title: "EMI calculator with repayment schedule and flat rate",
    description:
      "Calculate your monthly instalment and see the full repayment schedule — plus what a flat rate works out to on a reducing balance, which is usually far higher.",
    helps: "See the instalment, the schedule and the true cost — including what a flat rate actually works out to.",
    reading: [
      { href: "/blog/flat-rate-vs-reducing-balance/", label: "Flat rate and reducing balance", note: "Why 10% flat is really about 18%, and the multiple that converts one to the other." },
      { href: "/blog/which-rate-goes-on-which-document/", label: "One loan, four rates", note: "Which number belongs on the sanction letter, the agreement and the KFS." },
    ],
  },
  {
    slug: "nbfc-provisioning-calculator",
    provenance: "computed",
    navLabel: "Provisioning calculator",
    navNote: "What to provide at each classification",
    name: "Provisioning calculator",
    question: "Work out the provision on a loan once it is classified — standard, sub-standard, doubtful or loss.",
    title: "NBFC provisioning calculator by asset classification",
    description:
      "Work out the provision required on a loan at each asset classification, with the secured and unsecured portions split — using the NBFC rates, which are not the bank rates.",
    helps: "Provide the right amount on each account, and see exactly which rate produced it.",
    reading: [
      { href: "/blog/nbfc-provisioning-worked-examples/", label: "Provisioning, with worked examples", note: "The same arithmetic on real cases, and where a rate is applied to the wrong base." },
      { href: "/blog/npa-income-reversal/", label: "What happens to income when an account turns", note: "Accrued interest is reversed to suspense, and the provision is only half the entry." },
      { href: "/blog/write-off-what-it-does/", label: "What a write-off does, and does not do", note: "Where the provision ends up, and why the borrower still owes every rupee." },
    ],
    source:
      "Master Direction — Reserve Bank of India (Non-Banking Financial Companies — Income Recognition, Asset Classification and Provisioning) Directions, 2025, effective 28 November 2025. The ninety-day non-performing basis applies to every NBFC including the Base Layer, whose glide path ended on 31 March 2026.",
    sourceUrl: "https://www.rbi.org.in/Scripts/BS_ViewMasDirections.aspx",
  },
  {
    slug: "prepayment-charge-checker",
    provenance: "stated",
    name: "Prepayment charge checker",
    navLabel: "Prepayment charges",
    navNote: "Whether this loan may be charged at all",
    question: "Check whether a pre-payment or foreclosure charge may be levied on a particular loan.",
    title: "Prepayment and foreclosure charge checker for NBFCs and banks",
    description:
      "Check whether the 2025 Directions bar a pre-payment or foreclosure charge on a loan — the answer turns on the rate, the borrower, the purpose and which tier of lender is asking.",
    helps: "Know before you levy, and see which limb of the Directions produced the answer.",
    reading: [
      { href: "/blog/prepayment-charges-2025/", label: "Prepayment charges after the 2025 Directions", note: "When a charge may be levied at all, and on whom it may not." },
    ],
    source:
      "Reserve Bank of India (Pre-payment Charges on Loans) Directions, 2025 — issued 2 July 2025, applying to loans and advances sanctioned or renewed on or after 1 January 2026. They reach all commercial banks other than payments banks, co-operative banks, NBFCs including HFCs, and All India Financial Institutions.",
    sourceUrl: "https://www.rbi.org.in/scripts/NotificationUser.aspx?Id=12878&Mode=0",
  },
  {
    slug: "penal-charge-calculator",
    provenance: "computed",
    navLabel: "Penal charges",
    navNote: "The charge, and the 2024 rules around it",
    name: "Penal charge calculator",
    question: "Work out the penal charge on an overdue amount, and check it against the 2024 rules.",
    title: "Penal charge calculator for overdue loan accounts",
    description:
      "Calculate the penal charge on an overdue instalment and check it against the rules in force since April 2024, including the cap that applies to consumer loans.",
    helps: "Charge the right amount, and see at a glance whether it meets the rules that came in during 2024.",
    reading: [
      { href: "/blog/penal-charges-not-interest/", label: "A penal amount is a charge, not interest", note: "Why it cannot be capitalised, and what that changes in the ledger." },
      { href: "/blog/dcb-reconciliation-why-it-stops-tying/", label: "Why demand, collection and balance stop tying", note: "Penal is one of the seven breaks, and the one whose treatment two designs disagree on." },
    ],
    source:
      "RBI/2023-24/53, DoR.MCS.REC.28/01.01.001/2023-24, 18 August 2023 — Fair Lending Practice, Penal Charges in Loan Accounts. In force for new loans from 1 April 2024. Penal charges collected by banks and NBFCs are not taxable under GST, per the 55th GST Council. The circular does not reach credit cards, external commercial borrowings, trade credits or structured obligations.",
    sourceUrl: "https://www.rbi.org.in/Scripts/BS_CircularIndexDisplay.aspx",
  },
  {
    slug: "kfs-checklist",
    provenance: "stated",
    navLabel: "KFS checklist",
    navNote: "What the prescribed format requires",
    name: "Key Facts Statement checklist",
    question: "Check a Key Facts Statement against everything the prescribed format requires.",
    title: "Key Facts Statement checklist for lenders",
    description:
      "Go through a Key Facts Statement item by item against the format the RBI prescribed, and see what a template written before October 2024 is missing.",
    helps: "Find out what your KFS template is missing before a borrower or an auditor does.",
    reading: [
      { href: "/blog/kfs-key-facts-statement-nbfc-requirement/", label: "What the Key Facts Statement must contain", note: "The requirement itself, and who it applies to." },
      { href: "/blog/kfs-what-goes-in-the-apr/", label: "What goes into the APR", note: "Which charges belong in the computation and which do not." },
    ],
    source:
      "RBI/2024-25/18, DOR.STR.REC.13/13.03.00/2024-25, 15 April 2024 — Key Facts Statement for Loans and Advances, and its Annex A. Applies to every retail and MSME term loan sanctioned on or after 1 October 2024, including to existing customers; credit card receivables are outside it.",
    sourceUrl: "https://www.rbi.org.in/Scripts/BS_CircularIndexDisplay.aspx",
  },
  {
    slug: "nbfc-layer-finder",
    provenance: "stated",
    navLabel: "NBFC layer finder",
    navNote: "Base, Middle or Upper — and what changes",
    name: "NBFC layer finder",
    question: "Work out which layer of the scale-based framework your NBFC is in, and what that changes.",
    title: "NBFC layer finder — Base, Middle or Upper",
    description:
      "Find which layer of the RBI scale-based framework your NBFC is in, why, and what changes there — from its category, size and whether it takes deposits.",
    helps: "Settle which layer you are in, and stop applying rules meant for a different one.",
    reading: [
      { href: "/blog/scale-based-regulation-layers/", label: "The scale-based regulation layers", note: "What places an NBFC in each layer, and what the layer then obliges." },
      { href: "/blog/nbfc-registration-and-cor/", label: "Registration and the Certificate of Registration", note: "You acquire a layer the day the CoR arrives — and the returns that follow from it." },
    ],
    source:
      "Master Direction — Reserve Bank of India (Non-Banking Financial Company — Scale Based Regulation) Directions, 2023. The Upper Layer is identified by the Reserve Bank and published as a named list; it cannot be worked out from a company's own figures. A flat ₹1 lakh crore test for that layer was proposed in April 2026 and is not applied here, because it is a proposal.",
    sourceUrl: "https://www.rbi.org.in/Scripts/BS_ViewMasDirections.aspx",
  },
  {
    slug: "nbfc-returns-calendar",
    provenance: "stated",
    navLabel: "Returns calendar",
    navNote: "Which returns you file, and when",
    name: "NBFC returns calendar",
    question:
      "Find out which supervisory returns your NBFC has to file, and when each one is due.",
    title:
      "NBFC returns calendar — which returns you file, and when",
    description:
      "Find out which RBI supervisory returns your NBFC must file and when each is due, based on your layer, category, asset size and whether you take deposits.",
    helps: "Know exactly what your NBFC has to file this quarter, without reading a list meant for everybody else.",
    reading: [
      { href: "/blog/rbi-returns-for-nbfcs/", label: "Which return, who files it, and what it is built from", note: "One row per DNBS return, with the layer and asset-size thresholds that decide applicability." },
      { href: "/blog/nbfc-compliance-calendar/", label: "The filing calendar, with its derivation shown", note: "Every date re-derivable from the 21-day rule in the 2024 Supervisory Returns Directions." },
      { href: "/blog/nbfc-category-and-layer/", label: "Category and layer, and why you have both", note: "The layer decides which of these returns you file at all." },
    ],
    source:
      "Master Direction — Reserve Bank of India (Filing of Supervisory Returns) Directions, 2024, dated 27 February 2024, which consolidated twenty earlier instructions and replaced the 2016 NBFC Returns Directions; read with the Scale Based Regulation Directions, 2023 for what each layer means. Several published compliance calendars still list the older NBS-1, NBS-2 and NBS-3 returns, which that repeal removed.",
    sourceUrl: "https://www.rbi.org.in/Scripts/BS_ViewMasDirections.aspx",
  },
  {
    slug: "apr-calculator",
    provenance: "pinned",
    navLabel: "APR calculator",
    navNote: "The rate a Key Facts Statement discloses",
    name: "APR calculator",
    question:
      "Work out the annual percentage rate a loan's Key Facts Statement has to disclose.",
    title:
      "APR calculator — the rate a Key Facts Statement discloses",
    description:
      "Calculate the annual percentage rate for a Key Facts Statement from the loan amount, interest rate, tenure and any charges deducted before disbursement.",
    helps: "See the real cost of a loan once fees are counted, and disclose it correctly the first time.",
    reading: [
      { href: "/blog/kfs-what-goes-in-the-apr/", label: "What goes into the APR", note: "Which charges belong in the computation, and the three that get left out." },
      { href: "/blog/which-rate-goes-on-which-document/", label: "One loan, four rates", note: "Why the APR is higher than the contracted rate, and which document takes which." },
      { href: "/blog/flat-rate-vs-reducing-balance/", label: "Flat rate and reducing balance", note: "The quoting convention that makes the same loan look cheaper than it is." },
    ],
  },
  {
    slug: "npa-date-calculator",
    provenance: "pinned",
    navLabel: "NPA & SMA dates",
    navNote: "When a missed instalment changes classification",
    name: "NPA & SMA date calculator",
    question:
      "Find the exact dates a missed instalment turns an account SMA-1, SMA-2 and non-performing.",
    title:
      "NPA and SMA date calculator for loan accounts",
    description:
      "Enter the date an instalment fell due and get the exact dates the account is flagged overdue, moves through each SMA bucket, and becomes non-performing.",
    helps: "Get the classification dates right, so the provision and the reporting land in the correct quarter.",
    reading: [
      { href: "/blog/irac-day-end-classification/", label: "Classification is a day-end event", note: "Why the same account is non-performing at 11am and standard at 2pm, and which answer counts." },
      { href: "/blog/npa-upgrade-entire-arrears/", label: "Upgrading an NPA: the entire arrears rule", note: "The dates above take an account down. Only full payment of arrears brings it back." },
      { href: "/blog/sma-classification-what-it-signals/", label: "What SMA classification signals", note: "What each bucket obliges a lender to do, and why the first boundary is day one." },
    ],
  },
  {
    slug: "gold-loan-ltv-calculator",
    provenance: "pinned",
    navLabel: "Gold loan LTV",
    navNote: "Value a packet and see the permitted advance",
    name: "Gold loan LTV calculator",
    question:
      "Value a packet of ornaments across purities and see how much can be advanced against it.",
    title:
      "Gold loan LTV calculator — value, advance and cap",
    description:
      "Value gold ornaments across purities, convert them to 22-carat equivalent weight, and see the eligible value, the maximum advance and the loan-to-value.",
    helps: "Value a packet correctly in seconds, and see what happens to the cover if the gold price falls.",
    reading: [
      { href: "/blog/gold-loan-directions-2025/", label: "The 2025 gold Directions", note: "Ongoing LTV, renewal, and the seven working day return clock." },
      { href: "/blog/what-the-2024-gold-review-found/", label: "What the 2024 gold review found", note: "The practices the Reserve Bank named, and what they imply for a gold book." },
    ],
  },
];

export const toolBySlug = (slug: string) => TOOLS.find((t) => t.slug === slug);


/**
 * The menu, derived rather than restated.
 *
 * It used to be a hand-written list in `site-nav.tsx` that also announced how many tools there
 * were. Adding the ninth left the menu showing eight and the count saying "Eight" — a page nobody
 * could reach from the navigation, and a wrong number beside it. Both are now impossible.
 */
export const toolsMenu = () => [
  {
    href: "/tools/",
    label: "All tools",
    note: `${TOOLS.length} free calculators, no sign-up`,
  },
  ...TOOLS.map((t) => ({ href: `/tools/${t.slug}/`, label: t.navLabel, note: t.navNote })),
];
