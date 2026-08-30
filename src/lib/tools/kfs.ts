/**
 * What a Key Facts Statement has to contain.
 *
 * The circular is short and the format is an annexure, so the usual failure is not disagreement
 * about the rules — it is a template written before October 2024 that is missing four of them and
 * nobody has read against the annexure since.
 *
 * Sources, cross-checked: RBI/2024-25/18, DOR.STR.REC.13/13.03.00/2024-25, 15 April 2024, "Key Facts
 * Statement (KFS) for Loans and Advances" and its Annex A; read with the Digital Lending Directions
 * for the cooling-off period and the recovery-agent disclosure.
 *
 * Applies to all retail and MSME **term loans** by every regulated entity, for loans sanctioned on
 * or after 1 October 2024, including to existing customers. Credit card receivables are outside it.
 */

export interface KfsField {
  id: string;
  label: string;
  /** Why it is there — the thing a template misses when it drops the field. */
  detail: string;
  group: "Loan" | "Cost" | "Conduct" | "Annexed";
  /** Only required in some cases; the condition is stated. */
  onlyIf?: string;
}

export const KFS_FIELDS: KfsField[] = [
  { id: "proposal", group: "Loan", label: "Unique proposal number and type of loan",
    detail: "The number ties the statement to the application, and the KFS content forms part of the loan agreement." },
  { id: "amount", group: "Loan", label: "Sanctioned amount",
    detail: "The amount sanctioned, before anything deducted at disbursement." },
  { id: "disbursal", group: "Loan", label: "Disbursal schedule",
    detail: "Whether it goes out in one payment or in stages, and when." },
  { id: "tenor", group: "Loan", label: "Loan term",
    detail: "The tenor, in the units the instalments are collected in." },
  { id: "instalments", group: "Loan", label: "Instalment details",
    detail: "The type of instalment, how many, the amount of each, and the date the first one falls due." },
  { id: "rate", group: "Cost", label: "Interest rate and its type",
    detail: "The rate, and whether it is fixed, floating or hybrid." },
  { id: "floating", group: "Cost", label: "Floating-rate particulars", onlyIf: "the rate is floating or hybrid",
    detail: "The reference benchmark, the spread over it, how often it resets, and what a change does to the instalment or the tenor." },
  { id: "fees", group: "Cost", label: "Fees and charges",
    detail: "Everything payable, separating what the lender keeps from what it recovers on behalf of a third party, and which are one-time." },
  { id: "apr", group: "Cost", label: "Annual percentage rate",
    detail: "The all-in annual cost — interest plus every charge, including those collected for a third party." },
  { id: "contingent", group: "Cost", label: "Contingent charges",
    detail: "Penal charges, foreclosure and pre-payment charges, and the charge for switching between fixed and floating." },
  { id: "cooling", group: "Conduct", label: "Cooling-off or look-up period",
    detail: "The window in which the borrower may exit without a pre-payment penalty." },
  { id: "grievance", group: "Conduct", label: "Nodal grievance redressal officer",
    detail: "Name, telephone number and email. A generic mailbox has to be answered within one working day." },
  { id: "lsp", group: "Conduct", label: "Recovery agent details", onlyIf: "a loan service provider will act as recovery agent",
    detail: "Named in the statement, before the loan is taken, rather than met for the first time at the door." },
  { id: "transfer", group: "Conduct", label: "Whether the loan may be transferred or securitised",
    detail: "If it is not disclosed here, a later transfer needs the borrower's express consent." },
  { id: "colending", group: "Conduct", label: "Co-lending particulars", onlyIf: "the loan is co-lent",
    detail: "Both regulated entities named, the proportion each holds, and the blended rate." },
  { id: "validity", group: "Conduct", label: "Validity of the statement",
    detail: "At least three working days for a tenor of seven days or more; one working day below that." },
  { id: "language", group: "Conduct", label: "In a language the borrower understands",
    detail: "Not merely available in translation — issued in one they read." },
  { id: "apr-sheet", group: "Annexed", label: "APR computation sheet",
    detail: "The workings, not just the figure. A typed APR eventually contradicts the schedule printed beside it." },
  { id: "schedule", group: "Annexed", label: "Amortisation schedule over the full tenor",
    detail: "Every instalment, split into principal and interest, closing on the sanctioned amount." },
];

export const KFS_RULES = [
  "A charge that is not in the Key Facts Statement cannot be levied without the borrower's explicit consent.",
  "The APR must include charges the lender recovers on behalf of a third party, not only its own.",
  "The content of the statement forms part of the loan agreement.",
  "It applies to every retail and MSME term loan sanctioned on or after 1 October 2024, including to existing customers. Credit card receivables are outside it.",
];

export const KFS_GROUPS = ["Loan", "Cost", "Conduct", "Annexed"] as const;

export const GROUP_LABEL: Record<KfsField["group"], string> = {
  Loan: "The loan itself",
  Cost: "What it costs",
  Conduct: "Conduct and recourse",
  Annexed: "Annexed to the statement",
};

/** Fields still missing, given what is ticked and which conditions apply. */
export function kfsGaps(
  ticked: Set<string>,
  applicable: { floating: boolean; lsp: boolean; colending: boolean },
): KfsField[] {
  return KFS_FIELDS.filter((f) => {
    if (f.id === "floating" && !applicable.floating) return false;
    if (f.id === "lsp" && !applicable.lsp) return false;
    if (f.id === "colending" && !applicable.colending) return false;
    return !ticked.has(f.id);
  });
}
