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
    name: "EMI calculator",
    question: "Work out the monthly instalment, the full repayment schedule, and what a flat rate really costs.",
    title: "EMI calculator with repayment schedule and flat rate",
    description:
      "Calculate your monthly instalment and see the full repayment schedule — plus what a flat rate works out to on a reducing balance, which is usually far higher.",
    helps: "See the instalment, the schedule and the true cost — including what a flat rate actually works out to.",
  },
  {
    slug: "nbfc-returns-calendar",
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
