import type { Layer } from "./returns";

/**
 * How much has to be provided against a loan, by classification.
 *
 * ## The confusion this exists to settle
 *
 * NBFC provisioning is not bank provisioning, and the two are mixed up constantly — including by
 * pages that publish one under the other's heading. A bank provides 25%, 40% and 100% on the
 * secured portion of a doubtful asset. **An NBFC provides 20%, 30% and 50%.** Read the wrong table
 * and a book is over-provided by more than half at the far end.
 *
 * Sources, cross-checked and agreeing on the NBFC figures:
 *   Master Direction — RBI (Non-Banking Financial Companies — Income Recognition, Asset
 *   Classification and Provisioning) Directions, 2025, effective 28 November 2025, which
 *   consolidated the IRACP rules into one instrument.
 *
 * The ninety-day non-performing basis now applies to every NBFC including the Base Layer, which
 * reached it on 31 March 2026 at the end of its glide path.
 */

export type Classification = "STANDARD" | "SUB_STANDARD" | "DOUBTFUL" | "LOSS";
export type DoubtfulAge = "UPTO_1Y" | "1_TO_3Y" | "OVER_3Y";

/** Standard-asset rates differ by layer and, above the Base Layer, by what the exposure is. */
export type StandardKind = "GENERAL" | "HOUSING_INDIVIDUAL_SME" | "CRE_RH" | "CRE_OTHER";

export const STANDARD_RATE: Record<Layer, Partial<Record<StandardKind, number>> & { GENERAL: number }> = {
  BASE: { GENERAL: 0.25 },
  MIDDLE: { GENERAL: 0.4 },
  UPPER: { GENERAL: 0.4, HOUSING_INDIVIDUAL_SME: 0.25, CRE_RH: 0.75, CRE_OTHER: 1.0 },
};

/** Secured portion of a doubtful asset, by how long it has been doubtful. NBFC rates. */
export const DOUBTFUL_SECURED: Record<DoubtfulAge, number> = {
  UPTO_1Y: 20,
  "1_TO_3Y": 30,
  OVER_3Y: 50,
};

export const DOUBTFUL_AGE_LABEL: Record<DoubtfulAge, string> = {
  UPTO_1Y: "Up to one year as doubtful",
  "1_TO_3Y": "One to three years",
  OVER_3Y: "More than three years",
};

/** What a bank would provide on the same doubtful asset — shown to make the difference explicit. */
export const BANK_DOUBTFUL_SECURED: Record<DoubtfulAge, number> = {
  UPTO_1Y: 25,
  "1_TO_3Y": 40,
  OVER_3Y: 100,
};

export interface ProvisionInput {
  layer: Layer;
  classification: Classification;
  standardKind: StandardKind;
  /** Total outstanding, in paise — every amount on this site is paise. */
  outstandingPaise: number;
  /** The part covered by realisable security. The rest is treated as unsecured. */
  securedPaise: number;
  doubtfulAge: DoubtfulAge;
}

export interface ProvisionLine {
  label: string;
  basePaise: number;
  ratePct: number;
  provisionPaise: number;
  note: string;
}

export interface ProvisionResult {
  lines: ProvisionLine[];
  totalPaise: number;
  effectivePct: number;
}

export function provisionFor(i: ProvisionInput): ProvisionResult {
  const outstanding = Math.max(0, i.outstandingPaise);
  const secured = Math.min(Math.max(0, i.securedPaise), outstanding);
  const unsecured = outstanding - secured;
  const lines: ProvisionLine[] = [];

  if (i.classification === "STANDARD") {
    const rate = STANDARD_RATE[i.layer][i.standardKind] ?? STANDARD_RATE[i.layer].GENERAL;
    lines.push({
      label: "Standard asset",
      basePaise: outstanding,
      ratePct: rate,
      provisionPaise: (outstanding * rate) / 100,
      note:
        "A standard asset is not provision-free. The general provision is small but it applies to the whole book, and it is not netted off in arriving at net NPA.",
    });
  } else if (i.classification === "SUB_STANDARD") {
    lines.push({
      label: "Sub-standard — total outstanding",
      basePaise: outstanding,
      ratePct: 10,
      provisionPaise: (outstanding * 10) / 100,
      note: "Ten per cent of the whole outstanding, with no distinction between the secured and unsecured parts.",
    });
  } else if (i.classification === "DOUBTFUL") {
    const rate = DOUBTFUL_SECURED[i.doubtfulAge];
    lines.push({
      label: `Doubtful — secured portion, ${DOUBTFUL_AGE_LABEL[i.doubtfulAge].toLowerCase()}`,
      basePaise: secured,
      ratePct: rate,
      provisionPaise: (secured * rate) / 100,
      note: `An NBFC provides ${rate}% here. A bank on the same asset would provide ${BANK_DOUBTFUL_SECURED[i.doubtfulAge]}% — the two tables are not interchangeable.`,
    });
    lines.push({
      label: "Doubtful — unsecured portion",
      basePaise: unsecured,
      ratePct: 100,
      provisionPaise: unsecured,
      note: "Everything not covered by realisable security is provided in full, from the moment the asset becomes doubtful.",
    });
  } else {
    lines.push({
      label: "Loss asset",
      basePaise: outstanding,
      ratePct: 100,
      provisionPaise: outstanding,
      note: "Provided in full, or written off. Security does not reduce it — a loss asset is one where recovery is not expected whatever is held.",
    });
  }

  const totalPaise = lines.reduce((s, l) => s + l.provisionPaise, 0);
  return {
    lines,
    totalPaise: Math.round(totalPaise),
    effectivePct: outstanding > 0 ? Math.round((totalPaise / outstanding) * 10000) / 100 : 0,
  };
}

export const CLASSIFICATION_LABEL: Record<Classification, string> = {
  STANDARD: "Standard",
  SUB_STANDARD: "Sub-standard",
  DOUBTFUL: "Doubtful",
  LOSS: "Loss",
};

/** How an account moves between them. */
export const CLASSIFICATION_PATH: { id: Classification; when: string }[] = [
  { id: "STANDARD", when: "Not overdue beyond ninety days." },
  { id: "SUB_STANDARD", when: "Non-performing — more than ninety days past due. It stays sub-standard for twelve months in the Middle and Upper Layers, eighteen in the Base Layer." },
  { id: "DOUBTFUL", when: "Sub-standard for longer than that period." },
  { id: "LOSS", when: "Identified as unrecoverable by the NBFC, its auditor or an inspection — regardless of how long it has been doubtful." },
];

export const STANDARD_KIND_LABEL: Record<StandardKind, string> = {
  GENERAL: "Ordinary loan",
  HOUSING_INDIVIDUAL_SME: "Individual housing, or a small enterprise",
  CRE_RH: "Commercial real estate — residential housing",
  CRE_OTHER: "Commercial real estate — other",
};
