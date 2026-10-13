/**
 * Types for `link-graph.mjs`, so `tests/site.test.ts` can assert the graph without `any`.
 *
 * Hand-written rather than generated: the script is plain ESM run with `node` and must stay runnable
 * without a build step, which is the whole reason it is `.mjs` and not `.ts`.
 */
export type LinkKind = "chrome" | "listing" | "contextual";

export interface InboundCounts {
  chrome: number;
  listing: number;
  contextual: number;
  /** The distinct pages a CONTEXTUAL link came from — the measure §3.1's rule is written in. */
  from: Set<string>;
}

/** Every internal link on one built page, classified. */
export function linksOn(html: string): { href: string; kind: LinkKind }[];

/** Inbound counts for every sitemap URL, keyed by pathname. */
export function buildGraph(): Map<string, InboundCounts>;

/** The thirteen URLs Search Console declined on 13 Oct 2026. */
export const NOT_INDEXED: Set<string>;
