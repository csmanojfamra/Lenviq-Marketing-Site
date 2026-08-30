/**
 * Which supervisory returns an NBFC files, and when.
 *
 * ## Why this is worth building at all
 *
 * The pages that rank for "NBFC compliance calendar" are consultancy articles of three to four
 * thousand words. Two things are wrong with all of them. They do not distinguish by LAYER, so a
 * single-branch Base Layer lender reads the same list as a deposit-taking Middle Layer one and
 * cannot tell which half applies. And several still publish the NBS-1 / NBS-2 / NBS-3 nomenclature
 * from the 2016 Master Direction, which was **repealed** — the framework has been the DNBS series
 * under the Filing of Supervisory Returns Directions, 2024 since 27 February 2024.
 *
 * ## Where this comes from, and what it is not
 *
 * Master Direction – Reserve Bank of India (Filing of Supervisory Returns) Directions, 2024, dated
 * 27 February 2024, which consolidated twenty earlier instructions; read with the Scale Based
 * Regulation Directions, 2023 for what each layer means.
 *
 * It is a guide and not advice. Applicability turns on facts about a particular NBFC — its layer,
 * its category, its asset size on a date, whether it takes deposits — and the entity's own
 * compliance function and auditor decide what it files. Anything here that matters should be
 * checked against the Master Direction itself, which is linked from the page.
 */

export type Layer = "BASE" | "MIDDLE" | "UPPER";

/** The categories whose return obligations genuinely differ. */
export type Category = "ICC" | "MFI" | "FACTOR" | "CIC" | "P2P" | "AA" | "IFC" | "OTHER";

export interface Profile {
  layer: Layer;
  category: Category;
  /** Total assets, in ₹ crore. Drives the ₹100 crore and ₹500 crore thresholds. */
  assetsCrore: number;
  acceptsDeposits: boolean;
  hasOverseasInvestment: boolean;
}

export type Frequency = "WEEKLY" | "MONTHLY" | "QUARTERLY" | "ANNUAL" | "EVENT";

export interface ReturnDef {
  code: string;
  name: string;
  covers: string;
  frequency: Frequency;
  /** In plain words, as the Direction puts it. */
  timeline: string;
  /** Days from the reference date, where the timeline is a fixed count. */
  days?: number;
  applies: (p: Profile) => boolean;
  /**
   * WHO files it, stated the same way whatever profile is on screen.
   *
   * The calendar used to show only the returns that applied, with the condition folded into a
   * contextual note. Two things went wrong with that. A reader could not see a return that did not
   * apply to them — DNBS13 simply vanished unless they ticked the overseas box, so it looked
   * missing rather than inapplicable. And where a return DID apply, the condition read as a remark
   * rather than as the rule, so it was not clear what would change it.
   *
   * Every return is now listed every time, with this condition in its own column.
   */
  appliesTo: string;
  /** What that condition means for the profile currently on screen. */
  why: (p: Profile) => string;
}

const isML_UL = (p: Profile) => p.layer === "MIDDLE" || p.layer === "UPPER";
/** Deposit-taking NBFCs sit in the Middle Layer whatever their size. */
const notCic = (p: Profile) => p.category !== "CIC";

export const RETURNS: ReturnDef[] = [
  {
    code: "DNBS01",
    name: "Financial parameters",
    covers: "Assets, liabilities, profit and loss.",
    frequency: "QUARTERLY",
    timeline: "21 days from the quarter end",
    days: 21,
    appliesTo: "Middle and Upper Layer, except core investment companies",
    applies: (p) => isML_UL(p) && notCic(p),
    why: (p) =>
      p.category === "CIC"
        ? "A core investment company files DNBS11 and DNBS12 instead."
        : isML_UL(p)
          ? "Middle and Upper Layer NBFCs file the financial parameters return."
          : "Base Layer NBFCs file DNBS02 instead, which combines financial and prudential data.",
  },
  {
    code: "DNBS02",
    name: "Financial and prudential parameters",
    covers: "The Base Layer's combined return — financials together with prudential compliance.",
    frequency: "QUARTERLY",
    timeline: "21 days from the quarter end",
    days: 21,
    appliesTo: "Base Layer, except peer-to-peer platforms",
    applies: (p) => p.layer === "BASE" && p.category !== "P2P",
    why: (p) =>
      p.category === "P2P"
        ? "A peer-to-peer platform files DNBS14 instead."
        : p.layer === "BASE"
          ? "The Base Layer return. Its frequency moved from annual to QUARTERLY under the 2024 Directions — the change most often missed."
          : "Middle and Upper Layer NBFCs file DNBS01 and DNBS03 separately.",
  },
  {
    code: "DNBS03",
    name: "Prudential compliance",
    covers: "Capital adequacy, asset classification and provisioning.",
    frequency: "QUARTERLY",
    timeline: "21 days from the quarter end",
    days: 21,
    appliesTo: "Middle and Upper Layer, except core investment companies",
    applies: (p) => isML_UL(p) && notCic(p),
    why: (p) =>
      p.category === "CIC"
        ? "Covered by DNBS12 for a core investment company."
        : isML_UL(p)
          ? "Prudential norms are reported separately above the Base Layer."
          : "Base Layer prudential data is inside DNBS02.",
  },
  {
    code: "DNBS04A",
    name: "Short-term dynamic liquidity",
    covers: "The near-term liquidity position.",
    frequency: "QUARTERLY",
    timeline: "21 days from the quarter end",
    days: 21,
    appliesTo: "Middle and Upper Layer — and Base Layer at ₹100 crore of assets or more",
    applies: (p) => isML_UL(p) || p.assetsCrore >= 100,
    why: (p) =>
      isML_UL(p)
        ? "Asset-liability reporting applies from the Middle Layer up."
        : p.assetsCrore >= 100
          ? "A Base Layer NBFC at ₹100 crore of assets or more reports liquidity."
          : "Below ₹100 crore of assets in the Base Layer, this does not apply.",
  },
  {
    code: "DNBS04B",
    name: "Structural liquidity and interest rate sensitivity",
    covers: "The maturity ladder and the sensitivity of the book to a rate move.",
    frequency: "MONTHLY",
    timeline: "15 days from the month end",
    days: 15,
    appliesTo: "Middle and Upper Layer — and Base Layer at ₹100 crore of assets or more",
    applies: (p) => isML_UL(p) || p.assetsCrore >= 100,
    why: (p) =>
      isML_UL(p) || p.assetsCrore >= 100
        ? "MONTHLY, not quarterly — the one people diarise wrongly."
        : "Below ₹100 crore of assets in the Base Layer, this does not apply.",
  },
  {
    code: "DNBS08",
    name: "CRILC — main return",
    covers: "Every borrower with an aggregate exposure of ₹5 crore or more.",
    frequency: "MONTHLY",
    timeline: "15 days from the month end",
    days: 15,
    appliesTo: "Middle and Upper Layer (not CICs) — and Base Layer ICC, MFI or Factor at ₹500 crore or more",
    applies: (p) =>
      (isML_UL(p) && notCic(p)) ||
      (p.layer === "BASE" && ["ICC", "MFI", "FACTOR"].includes(p.category) && p.assetsCrore >= 500),
    why: (p) =>
      p.category === "CIC"
        ? "Core investment companies are outside CRILC reporting."
        : isML_UL(p)
          ? "CRILC applies from the Middle Layer up."
          : ["ICC", "MFI", "FACTOR"].includes(p.category)
            ? p.assetsCrore >= 500
              ? "A Base Layer ICC, MFI or Factor at ₹500 crore or more reports to CRILC."
              : "Below ₹500 crore of assets, a Base Layer NBFC does not report to CRILC."
            : "This category does not report to CRILC in the Base Layer.",
  },
  {
    code: "DNBS09",
    name: "CRILC — SMA reporting",
    covers: "Accounts in SMA-0 against the same ₹5 crore exposures.",
    frequency: "WEEKLY",
    timeline: "Every Friday of the reporting week",
    appliesTo: "Middle and Upper Layer (not CICs) — and Base Layer ICC, MFI or Factor at ₹500 crore or more",
    applies: (p) =>
      (isML_UL(p) && notCic(p)) ||
      (p.layer === "BASE" && ["ICC", "MFI", "FACTOR"].includes(p.category) && p.assetsCrore >= 500),
    why: () =>
      "WEEKLY. It is derived from the same day-end days-past-due figure that decides classification — so if the two ever disagree, one of them is wrong.",
  },
  {
    code: "DNBS10",
    name: "Statutory auditor certificate",
    covers: "The auditor's certificate on continued eligibility and compliance.",
    frequency: "ANNUAL",
    timeline: "Within 5 working days of the audit report being signed, and by 31 December",
    appliesTo: "Every NBFC, in every layer",
    applies: () => true,
    why: () => "Every NBFC files it, in every layer.",
  },
  {
    code: "DNBS11",
    name: "CIC financial parameters",
    covers: "The core investment company equivalent of DNBS01.",
    frequency: "QUARTERLY",
    timeline: "21 days from the quarter end",
    days: 21,
    appliesTo: "Core investment companies only",
    applies: (p) => p.category === "CIC",
    why: (p) => (p.category === "CIC" ? "Core investment companies file their own pair of returns." : "Only for core investment companies."),
  },
  {
    code: "DNBS12",
    name: "CIC prudential parameters",
    covers: "The core investment company equivalent of DNBS03.",
    frequency: "QUARTERLY",
    timeline: "21 days from the quarter end",
    days: 21,
    appliesTo: "Core investment companies only",
    applies: (p) => p.category === "CIC",
    why: (p) => (p.category === "CIC" ? "Filed alongside DNBS11." : "Only for core investment companies."),
  },
  {
    code: "DNBS13",
    name: "Overseas investment",
    covers: "Subsidiaries and joint ventures held outside India.",
    frequency: "QUARTERLY",
    timeline: "21 days from the quarter end",
    days: 21,
    appliesTo: "Any NBFC holding a subsidiary or joint venture outside India",
    applies: (p) => p.hasOverseasInvestment,
    why: (p) =>
      p.hasOverseasInvestment
        ? "Filed because the NBFC holds an investment outside India."
        : "Only where the NBFC has an overseas subsidiary or joint venture.",
  },
  {
    code: "DNBS14",
    name: "P2P financial and prudential parameters",
    covers: "The peer-to-peer platform's own return.",
    frequency: "QUARTERLY",
    timeline: "21 days from the quarter end",
    days: 21,
    appliesTo: "Peer-to-peer lending platforms only",
    applies: (p) => p.category === "P2P",
    why: (p) => (p.category === "P2P" ? "Peer-to-peer platforms file this instead of DNBS02." : "Only for peer-to-peer lending platforms."),
  },
  {
    code: "FMR-I",
    name: "Fraud report",
    covers: "Each fraud of ₹1 lakh or more.",
    frequency: "EVENT",
    timeline: "Within 3 weeks of detection",
    appliesTo: "Middle and Upper Layer — and Base Layer ICC, MFI or Factor at ₹500 crore or more",
    applies: (p) =>
      isML_UL(p) || (p.layer === "BASE" && ["ICC", "MFI", "FACTOR"].includes(p.category) && p.assetsCrore >= 500),
    why: () => "Event-based: the clock starts on detection, not on a quarter end.",
  },
];

// ── Dates ────────────────────────────────────────────────────────────────────

/** Indian financial year: 1 April to 31 March. `2026` means FY 2026-27. */
export const quarterEnds = (fyStart: number): Date[] => [
  new Date(Date.UTC(fyStart, 5, 30)),
  new Date(Date.UTC(fyStart, 8, 30)),
  new Date(Date.UTC(fyStart, 11, 31)),
  new Date(Date.UTC(fyStart + 1, 2, 31)),
];

export const monthEnds = (fyStart: number): Date[] =>
  Array.from({ length: 12 }, (_, i) => new Date(Date.UTC(fyStart, 3 + i + 1, 0)));

export const addDays = (d: Date, n: number): Date =>
  new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate() + n));

export const applicable = (p: Profile): ReturnDef[] => RETURNS.filter((r) => r.applies(p));

export const LAYER_LABEL: Record<Layer, string> = {
  BASE: "Base Layer",
  MIDDLE: "Middle Layer",
  UPPER: "Upper Layer",
};

export const LAYER_HELP: Record<Layer, string> = {
  BASE: "Non-deposit-taking and below ₹1,000 crore of assets. Also where P2P platforms and account aggregators sit, whatever their size.",
  MIDDLE: "Every deposit-taking NBFC whatever its size, and non-deposit-taking NBFCs at ₹1,000 crore of assets or more.",
  UPPER: "Specifically identified by the Reserve Bank and named in a list it publishes.",
};

export const CATEGORY_LABEL: Record<Category, string> = {
  ICC: "Investment and Credit Company (ICC)",
  MFI: "Microfinance (NBFC-MFI)",
  FACTOR: "Factor (NBFC-Factor)",
  CIC: "Core Investment Company (CIC)",
  P2P: "Peer-to-peer platform (NBFC-P2P)",
  AA: "Account Aggregator (NBFC-AA)",
  IFC: "Infrastructure Finance Company (IFC)",
  OTHER: "Other",
};
