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
  /** Who reaches for this — a lender, or a professional advising one. */
  audience: string;
}

export const TOOLS: Tool[] = [
  {
    slug: "apr-calculator",
    name: "APR calculator",
    question: "What annual percentage rate must this loan's Key Facts Statement disclose?",
    title: "APR calculator for the Key Facts Statement",
    description:
      "Work out the annual percentage rate a KFS must disclose, from the amount, rate, tenure and the charges deducted before disbursement.",
    audience: "Credit, compliance, and the CA reviewing a KFS",
  },
  {
    slug: "npa-date-calculator",
    name: "NPA & SMA date calculator",
    question: "An instalment was missed — on which dates does this account become SMA-1, SMA-2 and non-performing?",
    title: "NPA and SMA date calculator for NBFCs",
    description:
      "Enter the date an instalment fell due and see when the account is flagged overdue, reaches each SMA bucket, and becomes non-performing.",
    audience: "Credit heads, statutory auditors, compliance",
  },
  {
    slug: "gold-loan-ltv-calculator",
    name: "Gold loan LTV calculator",
    question: "What is this packet worth, and how much may be advanced against it?",
    title: "Gold loan LTV calculator — mixed purity, RBI cap",
    description:
      "Value a packet across purities, convert to 22-carat equivalent weight, and see eligible value, the maximum advance and LTV against the cap.",
    audience: "Gold lending branches, credit, audit",
  },
];

export const toolBySlug = (slug: string) => TOOLS.find((t) => t.slug === slug);
