import type { Layer } from "./returns";

/**
 * Which layer of the scale-based framework an NBFC sits in.
 *
 * ## The thing almost every article gets wrong
 *
 * Most explainers present all four layers as though you could work yours out from your own numbers.
 * You cannot. The **Upper Layer is identified and NAMED by the Reserve Bank** in a list it
 * publishes — seventeen NBFCs on the current one — and an NBFC is in it because the Bank says so,
 * not because it crossed a threshold. Being named brings enhanced regulation for at least five
 * years, including a listing requirement within three.
 *
 * (A simple ₹1 lakh crore asset test to replace the earlier top-ten scoring model was PROPOSED in
 * April 2026. Proposed. This tool does not apply it, and says so, because a tool that guesses at a
 * consultation paper is worse than one that says where the answer actually comes from.)
 *
 * Base and Middle, by contrast, follow from facts an NBFC knows about itself, and that is what this
 * answers.
 *
 * Source: Master Direction – Reserve Bank of India (Non-Banking Financial Company – Scale Based
 * Regulation) Directions, 2023.
 */

/** Categories that sit in a fixed layer whatever their size. */
export type SbrCategory =
  | "ICC" | "MFI" | "FACTOR"              // size-driven
  | "P2P" | "AA" | "NOFHC"                // always Base
  | "CIC" | "HFC" | "IFC" | "IDF" | "SPD" // always Middle
  | "OTHER";

export interface SbrAnswers {
  category: SbrCategory;
  acceptsDeposits: boolean;
  assetsCrore: number;
  /** The Base Layer carve-out: no public funds AND no customer interface. */
  noPublicFunds: boolean;
  noCustomerInterface: boolean;
  /** Only the RBI can answer this one. */
  namedInUpperLayerList: boolean;
}

export interface SbrResult {
  layer: Layer;
  /** The single fact that decided it. */
  because: string;
  /** Anything true but not decisive, worth knowing. */
  notes: string[];
}

const ALWAYS_BASE: SbrCategory[] = ["P2P", "AA", "NOFHC"];

/**
 * Two different rules, and conflating them overstates the answer.
 *
 * `PINNED_MIDDLE` genuinely cannot be anywhere else. `NEVER_BASE` is the larger group — the
 * framework keeps these out of the Base Layer whatever their size, so they land in the Middle
 * Layer, but the Reserve Bank can and does name one into the Upper Layer. Saying "the Middle Layer
 * whatever its asset size" of a CIC is wrong: three of the seventeen named NBFCs are exactly these
 * categories.
 */
const PINNED_MIDDLE: SbrCategory[] = ["IDF", "SPD"];
const NEVER_BASE: SbrCategory[] = ["CIC", "HFC", "IFC"];

export const SBR_CATEGORY_LABEL: Record<SbrCategory, string> = {
  ICC: "Investment and Credit Company (NBFC-ICC)",
  MFI: "Microfinance (NBFC-MFI)",
  FACTOR: "Factor (NBFC-Factor)",
  P2P: "Peer-to-peer lending platform (NBFC-P2P)",
  AA: "Account Aggregator (NBFC-AA)",
  NOFHC: "Non-Operative Financial Holding Company",
  CIC: "Core Investment Company (CIC)",
  HFC: "Housing Finance Company (HFC)",
  IFC: "Infrastructure Finance Company (NBFC-IFC)",
  IDF: "Infrastructure Debt Fund (IDF-NBFC)",
  SPD: "Standalone Primary Dealer (SPD)",
  OTHER: "Something else",
};

export const THRESHOLD_CRORE = 1000;

export function findLayer(a: SbrAnswers): SbrResult {
  const notes: string[] = [];

  // Named by the Bank beats everything else, because it is a designation rather than a test.
  if (a.namedInUpperLayerList) {
    return {
      layer: "UPPER",
      because:
        "The Reserve Bank has named this NBFC in the Upper Layer list. That is a designation, not a threshold — nothing about the company's own numbers changes it.",
      notes: [
        "Enhanced regulation applies for at least five years from identification, including a requirement to list within three.",
        "Everything the Middle Layer requires applies here too.",
      ],
    };
  }

  if (ALWAYS_BASE.includes(a.category)) {
    return {
      layer: "BASE",
      because: `A ${SBR_CATEGORY_LABEL[a.category]} sits in the Base Layer whatever its asset size.`,
      notes: a.assetsCrore >= THRESHOLD_CRORE
        ? [`Assets of ₹${a.assetsCrore.toLocaleString("en-IN")} crore do not move it — the category decides.`]
        : [],
    };
  }

  if (PINNED_MIDDLE.includes(a.category)) {
    return {
      layer: "MIDDLE",
      because: `A ${SBR_CATEGORY_LABEL[a.category]} sits in the Middle Layer whatever its asset size.`,
      notes: a.assetsCrore < THRESHOLD_CRORE
        ? [`Assets of ₹${a.assetsCrore.toLocaleString("en-IN")} crore do not move it — the category decides.`]
        : [],
    };
  }

  if (NEVER_BASE.includes(a.category)) {
    return {
      layer: "MIDDLE",
      because: `A ${SBR_CATEGORY_LABEL[a.category]} is kept out of the Base Layer whatever its asset size, so it sits in the Middle Layer.`,
      notes: [
        "It is not pinned there. These categories can be named into the Upper Layer, and some have been — tick the Upper Layer box above if this one is on the published list.",
        ...(a.assetsCrore < THRESHOLD_CRORE
          ? [`Assets of ₹${a.assetsCrore.toLocaleString("en-IN")} crore do not pull it down to the Base Layer — the category decides that part.`]
          : []),
      ],
    };
  }

  // Deposit-taking is decisive and beats the size test.
  if (a.acceptsDeposits) {
    return {
      layer: "MIDDLE",
      because: "Every deposit-taking NBFC is in the Middle Layer, whatever its asset size.",
      notes: a.assetsCrore < THRESHOLD_CRORE
        ? [`Below the ₹${THRESHOLD_CRORE.toLocaleString("en-IN")} crore threshold, but accepting deposits places it here regardless.`]
        : [],
    };
  }

  if (a.assetsCrore >= THRESHOLD_CRORE) {
    return {
      layer: "MIDDLE",
      because: `A non-deposit-taking NBFC at ₹${THRESHOLD_CRORE.toLocaleString("en-IN")} crore of assets or more is in the Middle Layer.`,
      notes: [],
    };
  }

  if (a.noPublicFunds && a.noCustomerInterface) {
    notes.push(
      "It would be in the Base Layer on size alone in any case — but an NBFC that neither takes public funds nor has a customer interface stays there whatever its size.",
    );
  }

  return {
    layer: "BASE",
    because: `Non-deposit-taking and below ₹${THRESHOLD_CRORE.toLocaleString("en-IN")} crore of assets.`,
    notes,
  };
}

/** What the layer changes, at the level this site can state without guessing at numbers. */
export const LAYER_MEANS: Record<Layer, { headline: string; points: string[] }> = {
  BASE: {
    headline: "The lightest of the three, but not light.",
    points: [
      "Asset classification on the ninety-days-past-due basis, in line with the rest of the sector.",
      "A board-approved policy framework, fair practices, and the KYC and outsourcing directions.",
      "Fewer supervisory returns — and a combined one rather than the split pair the layers above file.",
    ],
  },
  MIDDLE: {
    headline: "Everything the Base Layer does, plus prudential regulation with teeth.",
    points: [
      "Capital adequacy, exposure limits and standard-asset provisioning apply.",
      "Board committees and senior functionaries the Base Layer does not need, with a chief risk officer required above a size threshold.",
      "More returns, and the financial and prudential data reported separately rather than combined.",
    ],
  },
  UPPER: {
    headline: "Everything the Middle Layer does, plus bank-like requirements.",
    points: [
      "Common equity tier 1, differential provisioning and a large exposure framework.",
      "A requirement to list within three years of being identified.",
      "The enhanced regulation continues for at least five years, even if the NBFC would no longer qualify.",
    ],
  },
};
