import { allPostsIncludingDrafts } from "./content";
import { allHelpIncludingDrafts } from "./help";
import { everyCommercialPage, pathOf } from "./commercial";

/**
 * A LINK WRITTEN TODAY FOR A PAGE THAT GOES LIVE ON THE 21st.
 *
 * Two rules that look compatible and are not:
 *
 *   · Before a page may be flipped to `draft: false` it needs **three contextual inbound links**
 *     from the body prose of related pages, and a CI guard refuses the flip without them. So the
 *     links must be written now, while somebody has the content in front of them — nobody comes
 *     back on the day to add them.
 *   · A **live page must not render a link to a held-back one.** The target carries
 *     `noindex, nofollow`, so for a crawler the link is a dead end, and for a reader it is a page
 *     carrying a banner saying it has not been signed off.
 *
 * The resolution is that the link lives in the SOURCE, where the guard counts it, and is removed at
 * RENDER while the target is held back. One field still governs everything: flipping `draft` both
 * publishes the page and lights up every inbound link pointing at it, in the same move.
 *
 * ## Why this is not a second publication mechanism
 *
 * It reads the same `draft` field and adds no state of its own. There is nothing to keep in step —
 * no list of pending links, no per-link flag, no second place to look. `publication.ts` remains the
 * one truth; this is a consequence of it, like the sitemap filter and the robots tag.
 *
 * ## Why a string pass and not a renderer change
 *
 * `markdown.ts` is deliberately dependency-free and standalone: it renders the legal documents on
 * `/privacy/` and `/terms/` as well as post bodies, and it must not learn to read the filesystem to
 * do it. So the suppression is a separate pass over the rendered HTML, applied where a body is
 * composed. `tests/site.test.ts` asserts every such call site applies it, which is the same shape
 * as the guard SEO-3 wrote for `noindex` — a chokepoint enforced by a test rather than by a type.
 *
 * ## The sentence has to work both ways
 *
 * This removes the anchor and keeps the label, so the prose is unchanged either way. That is a
 * constraint on how the sentence is written, not something the code can fix: "see
 * [the CKYC page](/solutions/ckyc-software-nbfc/)" renders as "see the CKYC page", which is a
 * dangling reference. The link has to sit inside a phrase that already says something —
 * "the upload obligation has two halves" — so that losing the anchor costs a link and not a
 * meaning.
 */

/**
 * Every page awaiting a flip — blog drafts and help drafts.
 *
 * **`/authors/` is deliberately NOT here**, although it carries the same `noindex, nofollow`. It is
 * `state: "excluded"` in `ROUTE_PAGES` for a different reason: it is not awaiting review, it is a
 * byline target that should never compete for a search result, and Sprint SEO-3 §5 decided it stays
 * served *and stays linked* — the fifty-six bylines are the whole point of it existing. Suppressing
 * those links would leave every byline pointing nowhere.
 *
 * The distinction worth keeping hold of: a draft is held back **until a date**, so a link to it is
 * written early and lit later. `/authors/` is held back **permanently and on purpose**, so a link to
 * it is a link, now and always.
 */
export function heldBackPaths(): Set<string> {
  const out = new Set<string>();
  for (const p of allPostsIncludingDrafts()) if (p.draft) out.add(`/blog/${p.slug}/`);
  for (const h of allHelpIncludingDrafts()) if (h.draft) out.add(`/help/${h.slug}/`);
  /*
   * THE COMMERCIAL LAYER, AND THE REASON THIS LINE IS COMMENTED.
   *
   * It was missing, and the §7.1 negative control is what found it. This module was written before
   * `/solutions/` existed, when every held-back page was a blog or help draft; the four pages then
   * moved out of `/blog/` and into `/solutions/`, and the suppression silently stopped covering
   * them. Every inbound link written for them rendered as a live anchor to a `noindex` page on
   * three live posts, which is the exact thing the mechanism exists to prevent.
   *
   * It looked correct in the source, it typechecked, and the only way to see it was to build the
   * site and grep the output for an anchor that should not have been there. Any new section of this
   * site has to be added here, and the guard in `tests/site.test.ts` asserts that every section the
   * sitemap knows about is a section this function knows about — so the next one fails a test
   * rather than shipping a dead link.
   */
  for (const c of everyCommercialPage()) if (c.draft) out.add(pathOf(c));
  return out;
}

/** Is this path a page that exists but should not be linked to from a live page? */
export const isHeldBack = (path: string): boolean => heldBackPaths().has(path);

/**
 * Unwrap every anchor pointing at a held-back page, keeping its text.
 *
 * Anchors only — a bare mention of the path in prose is not a link and is left alone. The pattern
 * is deliberately narrow: `href` with no other attribute before it, which is what `renderMarkdown`
 * emits, and `autolinkGlossary` likewise. An anchor this does not recognise is a call site that has
 * started emitting something else, and the guard in `tests/site.test.ts` is what notices.
 */
export function suppressHeldBackLinks(html: string, held = heldBackPaths()): string {
  if (held.size === 0) return html;
  return html.replace(
    /<a\s+href="(\/[^"]*)"[^>]*>([\s\S]*?)<\/a>/g,
    (whole, href: string, text: string) => (held.has(href.split("#")[0]) ? text : whole),
  );
}
