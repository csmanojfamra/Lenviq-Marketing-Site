import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

/**
 * The legal documents, read from the files the converter produces.
 *
 * `scripts/import-legal.mjs` turns the signed Word documents into these; nothing here is typed by
 * hand. That matters more for a contract than for a blog post: a page that has drifted from the
 * document it purports to reproduce is worse than no page, because a customer relies on it.
 */
const DIR = join(process.cwd(), "content/legal");

export function legalDoc(name: "terms" | "privacy" | "subscription-agreement"): string | null {
  const p = join(DIR, `${name}.md`);
  return existsSync(p) ? readFileSync(p, "utf8") : null;
}

/** The date the source documents carry, shown so a reader knows which version they are reading. */
export const LEGAL_VERSION = "v2";
