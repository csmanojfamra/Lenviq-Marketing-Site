/**
 * Can this lender levy a pre-payment charge on this loan?
 *
 * Source: Reserve Bank of India (Pre-payment Charges on Loans) Directions, 2025 — issued 2 July
 * 2025, applying to loans and advances **sanctioned or renewed on or after 1 January 2026**.
 * They reach all commercial banks other than payments banks, co-operative banks, NBFCs including
 * HFCs, and All India Financial Institutions.
 *
 * The shape of the rule, which no summary states in one place:
 *
 *  1. **Floating rate, individual, not for business.** No charge, by any covered lender, at any
 *     amount — irrespective of the source of the money used to repay, on a part payment as much as
 *     a foreclosure, and with no minimum lock-in permitted.
 *  2. **Floating rate, business purpose, individual or MSE.** No charge — but WHICH lender decides
 *     whether the bar is unlimited or stops at ₹50 lakh of sanctioned amount, and one tier of
 *     lender is left to its own policy entirely.
 *  3. **Fixed rate at the moment of pre-payment.** Outside the bar. Board-approved policy governs,
 *     and the charge must have been disclosed.
 *
 * On a dual or special-rate loan the test is what the rate IS when the borrower pre-pays, not what
 * it was at sanction — a loan that has reset to floating by then is a floating-rate loan for this
 * purpose.
 */

export type LenderKind =
  | "COMMERCIAL_BANK" | "SFB" | "RRB" | "LAB"
  | "UCB_TIER_4" | "UCB_TIER_3" | "UCB_TIER_1_2" | "COOP_STATE_CENTRAL"
  | "NBFC_UL" | "NBFC_ML" | "NBFC_BL" | "AIFI";

export type BorrowerKind = "INDIVIDUAL" | "MSE" | "OTHER";
export type Purpose = "BUSINESS" | "NON_BUSINESS";
export type RateKind = "FLOATING" | "FIXED";

export const LENDER_LABEL: Record<LenderKind, string> = {
  COMMERCIAL_BANK: "Commercial bank (not an SFB, RRB or LAB)",
  SFB: "Small Finance Bank",
  RRB: "Regional Rural Bank",
  LAB: "Local Area Bank",
  UCB_TIER_4: "Urban Co-operative Bank — Tier 4",
  UCB_TIER_3: "Urban Co-operative Bank — Tier 3",
  UCB_TIER_1_2: "Urban Co-operative Bank — Tier 1 or 2",
  COOP_STATE_CENTRAL: "State or Central Co-operative Bank",
  NBFC_UL: "NBFC — Upper Layer",
  NBFC_ML: "NBFC — Middle Layer",
  NBFC_BL: "NBFC — Base Layer",
  AIFI: "All India Financial Institution",
};

export const BORROWER_LABEL: Record<BorrowerKind, string> = {
  INDIVIDUAL: "An individual",
  MSE: "A micro or small enterprise",
  OTHER: "Something else — a company, a partnership, a medium enterprise",
};

/** The Directions reach every one of these. A payments bank is out of scope entirely. */
export const COVERED: LenderKind[] = Object.keys(LENDER_LABEL) as LenderKind[];

/** Barred from charging on a business-purpose floating-rate loan, whatever the sanctioned amount. */
const UNLIMITED_BAR: LenderKind[] = ["COMMERCIAL_BANK", "UCB_TIER_4", "NBFC_UL"];

/** Barred only up to ₹50 lakh of sanctioned amount on the same loan. */
const CAPPED_BAR: LenderKind[] = ["SFB", "RRB", "LAB", "UCB_TIER_3", "COOP_STATE_CENTRAL", "NBFC_ML"];

export const MSE_CAP_PAISE = 50_00_000_00; // ₹50 lakh

export const EFFECTIVE_FROM = "2026-01-01";

export interface PrepaymentInput {
  lender: LenderKind;
  borrower: BorrowerKind;
  purpose: Purpose;
  /** The rate the loan is on WHEN the borrower pre-pays, not at sanction. */
  rateAtPrepayment: RateKind;
  sanctionedPaise: number;
  /** ISO date. Renewal counts as a fresh sanction for this test. */
  sanctionedOn: string;
}

export interface PrepaymentResult {
  /** True when the Directions bar the charge outright. */
  barred: boolean;
  headline: string;
  because: string;
  notes: string[];
  /** The clause the answer rests on, so it can be read rather than taken on trust. */
  clause: string;
}

const POLICY_NOTE =
  "The Directions do not bar a charge here, which is not the same as permitting whatever the lender likes: it has to sit in the board-approved policy, and it has to have been disclosed in the sanction letter, the loan agreement and the Key Facts Statement. A charge that was never disclosed cannot be recovered.";

export function prepaymentEligibility(i: PrepaymentInput): PrepaymentResult {
  const notes: string[] = [];

  if (i.sanctionedOn && i.sanctionedOn < EFFECTIVE_FROM) {
    return {
      barred: false,
      headline: "These Directions do not reach this loan",
      because:
        "They apply to loans sanctioned or renewed on or after 1 January 2026, and this one was sanctioned before that.",
      notes: [
        "The earlier position still stands: a lender may not levy foreclosure or pre-payment charges on a floating-rate term loan to an individual borrower for a purpose other than business.",
        "A renewal counts as a fresh sanction. If this loan is renewed on or after 1 January 2026, run it again on the renewal date — the answer can change.",
      ],
      clause: "Paragraph 3 — applicability",
    };
  }

  if (i.rateAtPrepayment === "FIXED") {
    return {
      barred: false,
      headline: "Not barred — a charge may be levied",
      because:
        "The bar reaches floating-rate loans. This loan is on a fixed rate at the point the borrower pre-pays, so it falls outside it.",
      notes: [
        POLICY_NOTE,
        "On a dual or special-rate loan the test is the rate in force when the borrower actually pre-pays. A loan that has reset to floating by then is a floating-rate loan for this purpose, however it started.",
      ],
      clause: "Paragraph 5 — floating-rate loans; paragraph 6 — all other cases",
    };
  }

  if (i.borrower === "INDIVIDUAL" && i.purpose === "NON_BUSINESS") {
    return {
      barred: true,
      headline: "No pre-payment charge may be levied",
      because:
        "A floating-rate loan to an individual for a purpose other than business. Every lender the Directions reach is barred, at any sanctioned amount.",
      notes: [
        "It makes no difference where the money came from. The borrower may refinance with another lender and the charge is still barred.",
        "It applies to a part pre-payment as much as to a full foreclosure.",
        "No minimum lock-in period may be imposed as a way of reaching the same result.",
      ],
      clause: "Paragraph 5(i)",
    };
  }

  const businessCovered = i.purpose === "BUSINESS" && (i.borrower === "INDIVIDUAL" || i.borrower === "MSE");

  if (!businessCovered) {
    return {
      barred: false,
      headline: "Not barred — a charge may be levied",
      because:
        i.borrower === "OTHER"
          ? "The bar covers individuals and micro and small enterprises. This borrower is neither, so the loan falls outside it."
          : "The bar on business-purpose loans reaches individuals and micro and small enterprises only.",
      notes: [POLICY_NOTE],
      clause: "Paragraph 6",
    };
  }

  if (UNLIMITED_BAR.includes(i.lender)) {
    return {
      barred: true,
      headline: "No pre-payment charge may be levied",
      because: `A floating-rate loan for a business purpose to ${
        i.borrower === "MSE" ? "a micro or small enterprise" : "an individual"
      }. A ${LENDER_LABEL[i.lender].toLowerCase()} is barred whatever the sanctioned amount.`,
      notes: [
        "There is no ₹50 lakh ceiling on this one. The ceiling applies to a different tier of lender.",
        "Part pre-payment and foreclosure both, irrespective of the source of funds, with no minimum lock-in.",
      ],
      clause: "Paragraph 5(ii)",
    };
  }

  if (CAPPED_BAR.includes(i.lender)) {
    const within = i.sanctionedPaise <= MSE_CAP_PAISE;
    return {
      barred: within,
      headline: within ? "No pre-payment charge may be levied" : "Not barred — a charge may be levied",
      because: within
        ? `A ${LENDER_LABEL[i.lender]} is barred on a business-purpose floating-rate loan up to ₹50 lakh of sanctioned amount, and this one is inside that.`
        : `A ${LENDER_LABEL[i.lender]} is barred only up to ₹50 lakh of sanctioned amount on a business-purpose loan. This one is above it.`,
      notes: within
        ? ["The test is the amount SANCTIONED, not the amount outstanding when the borrower pre-pays. A loan sanctioned at ₹48 lakh stays inside the bar for its whole life."]
        : [
            "The test is the amount SANCTIONED, not the amount outstanding. Paying a loan down below ₹50 lakh does not bring it inside the bar.",
            POLICY_NOTE,
          ],
      clause: "Paragraph 5(ii)",
    };
  }

  // NBFC-BL, and the UCB tiers the Directions leave out of the business-purpose bar.
  return {
    barred: false,
    headline: "Not barred — a charge may be levied",
    because: `The business-purpose bar does not name a ${LENDER_LABEL[i.lender].toLowerCase()}. Its own board-approved policy governs.`,
    notes: [
      POLICY_NOTE,
      "This is the one place where the answer turns on the lender rather than the loan. The same loan, to the same borrower, at the same rate, is barred at a larger lender.",
    ],
    clause: "Paragraph 6",
  };
}
