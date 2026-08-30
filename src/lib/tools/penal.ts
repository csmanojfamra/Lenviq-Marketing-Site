/**
 * Penal charges after 1 April 2024.
 *
 * The August 2023 circular did not adjust a rate — it changed what the amount IS. A penal amount is
 * a charge, not interest, and four consequences follow that a spreadsheet will not enforce for you:
 * it cannot be capitalised, it earns nothing itself, it is capped for a consumer borrower by what
 * the same breach costs a business one, and it is not income until it is received.
 *
 * Sources, both consistent:
 *   RBI/2023-24/53, DoR.MCS.REC.28/01.01.001/2023-24, 18 August 2023 —
 *   "Fair Lending Practice — Penal Charges in Loan Accounts". New loans from 1 April 2024;
 *   existing loans on the next renewal or review and no later than 30 June 2024.
 *   GST: penal charges collected by banks and NBFCs are not taxable — 55th GST Council.
 *
 * Out of scope of the circular: credit cards, external commercial borrowings, trade credits and
 * structured obligations.
 */

export type PenalBasis = "PCT_PER_MONTH" | "PCT_PER_ANNUM" | "FLAT_PER_INSTANCE";

export interface PenalInput {
  /** The amount in default. Not the outstanding principal. */
  overdueRupees: number;
  daysOverdue: number;
  basis: PenalBasis;
  /** Percent, or a flat rupee amount when the basis is per instance. */
  rate: number;
  /** Days the lender chooses not to charge for. A commercial choice, not a regulatory one. */
  graceDays: number;
  /** A loan to an individual for a purpose other than business. */
  consumerLoan: boolean;
  /** What the same breach costs a non-individual borrower, on the same basis. */
  comparableNonIndividualRate: number;
}

export interface PenalResult {
  chargeableDays: number;
  chargeRupees: number;
  /** Rules that are arithmetic, and can therefore be checked here. */
  checks: { ok: boolean; label: string; detail: string }[];
}

export function penalCharge(i: PenalInput): PenalResult {
  const chargeableDays = Math.max(0, Math.floor(i.daysOverdue) - Math.max(0, Math.floor(i.graceDays)));
  const amount = Math.max(0, i.overdueRupees);

  let charge = 0;
  if (i.basis === "FLAT_PER_INSTANCE") charge = chargeableDays > 0 ? i.rate : 0;
  else if (i.basis === "PCT_PER_MONTH") charge = amount * (i.rate / 100) * (chargeableDays / 30);
  else charge = amount * (i.rate / 100) * (chargeableDays / 365);

  const checks: PenalResult["checks"] = [];

  if (i.consumerLoan) {
    const within = i.rate <= i.comparableNonIndividualRate;
    checks.push({
      ok: within,
      label: "Not higher than a business borrower pays",
      detail: within
        ? `${i.rate} against ${i.comparableNonIndividualRate} for the same breach by a non-individual borrower.`
        : `${i.rate} exceeds the ${i.comparableNonIndividualRate} charged to a non-individual borrower for the same breach. For a loan to an individual for a purpose other than business, it may not be higher.`,
    });
  }

  checks.push({
    ok: true,
    label: "Not capitalised, and earns nothing itself",
    detail:
      "The charge is not added to principal and no interest runs on it. It sits as its own balance until it is paid.",
  });
  checks.push({
    ok: true,
    label: "No GST",
    detail: "Penal charges collected by banks and NBFCs are not taxable — 55th GST Council.",
  });
  checks.push({
    ok: true,
    label: "Income when received, not when levied",
    detail:
      "It appears on the borrower's statement on levy but reaches the profit and loss account only on receipt — which is why a statement and a trial balance can honestly differ.",
  });

  return { chargeableDays, chargeRupees: Math.round(charge * 100) / 100, checks };
}

/** Where the quantum and the reason have to appear. All three, not one. */
export const PENAL_DISCLOSURE = [
  "The loan agreement, stating the quantum and the reason.",
  "The Key Facts Statement, or the most important terms and conditions.",
  "The lender's website, under interest rates and service charges.",
  "Every reminder sent for non-compliance must state the penal charge that applies.",
];
