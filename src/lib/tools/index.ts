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
    navLabel: "EMI calculator",
    navNote: "Instalment, schedule, and what a flat rate really costs",
    name: "EMI calculator",
    question: "Work out the monthly instalment, the full repayment schedule, and what a flat rate really costs.",
    title: "EMI calculator with repayment schedule and flat rate",
    description:
      "Calculate your monthly instalment and see the full repayment schedule — plus what a flat rate works out to on a reducing balance, which is usually far higher.",
    helps: "See the instalment, the schedule and the true cost — including what a flat rate actually works out to.",
  },
  {
    slug: "nbfc-provisioning-calculator",
    navLabel: "Provisioning calculator",
    navNote: "What to provide at each classification",
    name: "Provisioning calculator",
    question: "Work out the provision on a loan once it is classified — standard, sub-standard, doubtful or loss.",
    title: "NBFC provisioning calculator by asset classification",
    description:
      "Work out the provision required on a loan at each asset classification, with the secured and unsecured portions split — using the NBFC rates, which are not the bank rates.",
    helps: "Provide the right amount on each account, and see exactly which rate produced it.",
    source:
      "Master Direction — Reserve Bank of India (Non-Banking Financial Companies — Income Recognition, Asset Classification and Provisioning) Directions, 2025, effective 28 November 2025. The ninety-day non-performing basis applies to every NBFC including the Base Layer, whose glide path ended on 31 March 2026.",
    sourceUrl: "https://www.rbi.org.in/Scripts/BS_ViewMasDirections.aspx",
  },
  {
    slug: "penal-charge-calculator",
    navLabel: "Penal charges",
    navNote: "The charge, and the 2024 rules around it",
    name: "Penal charge calculator",
    question: "Work out the penal charge on an overdue amount, and check it against the 2024 rules.",
    title: "Penal charge calculator for overdue loan accounts",
    description:
      "Calculate the penal charge on an overdue instalment and check it against the rules in force since April 2024, including the cap that applies to consumer loans.",
    helps: "Charge the right amount, and see at a glance whether it meets the rules that came in during 2024.",
    source:
      "RBI/2023-24/53, DoR.MCS.REC.28/01.01.001/2023-24, 18 August 2023 — Fair Lending Practice, Penal Charges in Loan Accounts. In force for new loans from 1 April 2024. Penal charges collected by banks and NBFCs are not taxable under GST, per the 55th GST Council. The circular does not reach credit cards, external commercial borrowings, trade credits or structured obligations.",
    sourceUrl: "https://www.rbi.org.in/Scripts/BS_CircularIndexDisplay.aspx",
  },
  {
    slug: "kfs-checklist",
    navLabel: "KFS checklist",
    navNote: "What the prescribed format requires",
    name: "Key Facts Statement checklist",
    question: "Check a Key Facts Statement against everything the prescribed format requires.",
    title: "Key Facts Statement checklist for lenders",
    description:
      "Go through a Key Facts Statement item by item against the format the RBI prescribed, and see what a template written before October 2024 is missing.",
    helps: "Find out what your KFS template is missing before a borrower or an auditor does.",
    source:
      "RBI/2024-25/18, DOR.STR.REC.13/13.03.00/2024-25, 15 April 2024 — Key Facts Statement for Loans and Advances, and its Annex A. Applies to every retail and MSME term loan sanctioned on or after 1 October 2024, including to existing customers; credit card receivables are outside it.",
    sourceUrl: "https://www.rbi.org.in/Scripts/BS_CircularIndexDisplay.aspx",
  },
  {
    slug: "nbfc-layer-finder",
    navLabel: "NBFC layer finder",
    navNote: "Base, Middle or Upper — and what changes",
    name: "NBFC layer finder",
    question: "Work out which layer of the scale-based framework your NBFC is in, and what that changes.",
    title: "NBFC layer finder — Base, Middle or Upper",
    description:
      "Find which layer of the RBI scale-based framework your NBFC is in, why, and what changes there — from its category, size and whether it takes deposits.",
    helps: "Settle which layer you are in, and stop applying rules meant for a different one.",
    source:
      "Master Direction — Reserve Bank of India (Non-Banking Financial Company — Scale Based Regulation) Directions, 2023. The Upper Layer is identified by the Reserve Bank and published as a named list; it cannot be worked out from a company's own figures. A flat ₹1 lakh crore test for that layer was proposed in April 2026 and is not applied here, because it is a proposal.",
    sourceUrl: "https://www.rbi.org.in/Scripts/BS_ViewMasDirections.aspx",
  },
  {
    slug: "nbfc-returns-calendar",
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
    source:
      "Master Direction — Reserve Bank of India (Filing of Supervisory Returns) Directions, 2024, dated 27 February 2024, which consolidated twenty earlier instructions and replaced the 2016 NBFC Returns Directions; read with the Scale Based Regulation Directions, 2023 for what each layer means. Several published compliance calendars still list the older NBS-1, NBS-2 and NBS-3 returns, which that repeal removed.",
    sourceUrl: "https://www.rbi.org.in/Scripts/BS_ViewMasDirections.aspx",
  },
  {
    slug: "apr-calculator",
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
  },
  {
    slug: "npa-date-calculator",
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
  },
  {
    slug: "gold-loan-ltv-calculator",
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
