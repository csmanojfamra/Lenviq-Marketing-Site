import type { ProductSpec } from "./types";
import { PERSONAL } from "./personal";
import { VEHICLE } from "./vehicle";
import { LAP } from "./lap";
import { GOLD } from "./gold";
import { BUSINESS } from "./business";
import { CASH_CREDIT } from "./cashcredit";
import { MICROFINANCE } from "./microfinance";

export type { ProductSpec } from "./types";

/**
 * The order the Platform page links them in: term lending to individuals first, then the three
 * secured books by how much of the work happens before disbursement, then the two where the
 * borrower is a business — a term facility and a limit, which is the pair such a borrower usually
 * runs together.
 *
 * MICROFINANCE IS LAST AND IS NOT AN ASSET CLASS, which is worth saying because every other entry
 * here is one. It is a LENDER TYPE: the door a Section 8 or NBFC-MFI lender comes through, in their
 * own vocabulary, proving itself on the Directions that apply to them (`docs/VOCABULARY_MAP.md`).
 * It shares this list because it shares the page shape and because the list is what feeds the
 * sitemap and the Platform page — not because the taxonomy is the same. If a second lender-type
 * page is ever written, the two taxonomies should be separated rather than grown together.
 */
export const PRODUCTS: readonly ProductSpec[] = [PERSONAL, VEHICLE, LAP, GOLD, BUSINESS, CASH_CREDIT, MICROFINANCE];

export const productBySlug = (slug: string) => PRODUCTS.find((p) => p.slug === slug);
