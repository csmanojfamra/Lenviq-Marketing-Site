import type { ProductSpec } from "./types";
import { PERSONAL } from "./personal";
import { VEHICLE } from "./vehicle";
import { LAP } from "./lap";
import { GOLD } from "./gold";
import { BUSINESS } from "./business";
import { CASH_CREDIT } from "./cashcredit";

export type { ProductSpec } from "./types";

/**
 * The order the Platform page links them in: term lending to individuals first, then the three
 * secured books by how much of the work happens before disbursement, then the two where the
 * borrower is a business — a term facility and a limit, which is the pair such a borrower usually
 * runs together.
 */
export const PRODUCTS: readonly ProductSpec[] = [PERSONAL, VEHICLE, LAP, GOLD, BUSINESS, CASH_CREDIT];

export const productBySlug = (slug: string) => PRODUCTS.find((p) => p.slug === slug);
