import type { ProductSpec } from "./types";
import { PERSONAL } from "./personal";
import { VEHICLE } from "./vehicle";
import { LAP } from "./lap";
import { GOLD } from "./gold";

export type { ProductSpec } from "./types";

/**
 * The order the Platform page links them in: unsecured first, then the three secured books by how
 * much of the work happens before disbursement.
 */
export const PRODUCTS: readonly ProductSpec[] = [PERSONAL, VEHICLE, LAP, GOLD];

export const productBySlug = (slug: string) => PRODUCTS.find((p) => p.slug === slug);
