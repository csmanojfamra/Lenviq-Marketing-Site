/**
 * PUBLICATION STATE — ONE FIELD PER PAGE, FOUR CONSEQUENCES, NO SECOND PLACE TO LOOK.
 *
 * Every page on this site is either published or a draft, and exactly one thing says which:
 *
 *   · a blog post   → `draft:` in its own front matter (`content.ts`)
 *   · a help page   → `draft:` in its own front matter (`help.ts`)
 *   · a route page  → its entry in `ROUTE_PAGES` below
 *
 * A page that is NOT published must, as a consequence of that one field and nothing else:
 *   1. be absent from `sitemap.xml`            — `publishedRoutes()` / `publishedPosts()` / `publishedHelp()`
 *   2. emit `<meta name="robots" content="noindex, nofollow">` — `pageMetadata` reads the same field
 *   3. appear in no index, listing, feed or related-posts block — the listings load the published filter
 *   4. still be reachable at its own URL, so a reviewer can read it
 *
 * ## Why (4) changed, because it reverses an earlier decision in this repo
 *
 * A draft used to get NO ROUTE AT ALL: `generateStaticParams` skipped it, so there was no HTML, no
 * URL and nothing to index. That is genuinely stronger against accidental indexing, and the comment
 * that argued for it was right about `noindex` being a hint rather than a lock.
 *
 * It was wrong about the reviewer. The only way to read an unbuilt draft was `next dev` on somebody's
 * laptop, which means the person whose name goes on a regulatory claim cannot read it before it ships
 * — and a review gate nobody can review through is how seven pages went live unreviewed in the first
 * place. So a draft is built, at its real URL, carrying `noindex, nofollow`.
 *
 * The accidental-indexing risk is answered by the other three consequences rather than by absence:
 * no sitemap entry and no listing link means there is no path for a crawler to discover it, and
 * `tests/site.test.ts` asserts all four against the built output rather than trusting this comment.
 */

/**
 * Two values, named for the CONSEQUENCE rather than the cause.
 *
 * A blog draft and `/authors/` are both held out of the index, for completely different reasons —
 * one is pending review, the other is a byline target nobody searches for. Calling the second one a
 * "draft" would tell the next reader it is waiting for sign-off, which is false. The reason belongs
 * in a comment on the entry; the field says only what happens.
 */
export type PublicationState = "published" | "excluded";

export interface RoutePage {
  /** Absolute path with a trailing slash — the same string the canonical tag and sitemap use. */
  path: string;
  state: PublicationState;
  /** Sitemap priority. Only read for a published page. */
  priority: number;
  changeFrequency: "weekly" | "monthly";
}

/**
 * THE HAND-WRITTEN PAGES, AND THEIR STATE.
 *
 * This list was already in `sitemap.ts` as a bare array of paths with the priorities worked out by a
 * chain of ternaries beside it. Moving it here is what lets a route page have a publication state at
 * all: before this, a page under `src/app/` could only be in the sitemap or absent from it by somebody
 * remembering to edit that array, and nothing connected that to what the page itself emitted.
 *
 * Data-driven pages are NOT listed here — products, tools, glossary terms, blog posts and help pages
 * each come from their own source of truth and the sitemap maps over those directly.
 */
export const ROUTE_PAGES: RoutePage[] = [
  { path: "/", state: "published", priority: 1, changeFrequency: "monthly" },
  { path: "/platform/", state: "published", priority: 0.9, changeFrequency: "monthly" },
  { path: "/loan-origination-software/", state: "published", priority: 0.9, changeFrequency: "monthly" },
  { path: "/loan-management-system/", state: "published", priority: 0.9, changeFrequency: "monthly" },
  { path: "/compliance/", state: "published", priority: 0.9, changeFrequency: "monthly" },
  { path: "/signup/", state: "published", priority: 0.9, changeFrequency: "monthly" },
  { path: "/reports/", state: "published", priority: 0.7, changeFrequency: "monthly" },
  { path: "/security/", state: "published", priority: 0.7, changeFrequency: "monthly" },
  { path: "/about/", state: "published", priority: 0.7, changeFrequency: "monthly" },
  { path: "/contact/", state: "published", priority: 0.7, changeFrequency: "monthly" },
  { path: "/blog/", state: "published", priority: 0.7, changeFrequency: "weekly" },
  { path: "/glossary/", state: "published", priority: 0.7, changeFrequency: "monthly" },
  { path: "/help/", state: "published", priority: 0.7, changeFrequency: "monthly" },
  { path: "/privacy/", state: "published", priority: 0.7, changeFrequency: "monthly" },
  { path: "/terms/", state: "published", priority: 0.7, changeFrequency: "monthly" },
  /**
   * `/authors/` — a byline target, not a destination (Sprint SEO-3 §5).
   *
   * Google crawled it on 10 Oct 2026 and declined it, which is the correct call on its merits: it
   * lists five names, a one-line bio each and a post count, and a reader searching for anything this
   * site is about does not want it. It exists so a byline has somewhere to point, and a page that
   * exists for that reason should not be competing for a search result.
   *
   * `noindex` rather than deleted: the bylines link to it and a reader who follows one should land
   * on something. That it also leaves the sitemap follows from this one field, which is the point —
   * no special case in `sitemap.ts`, no second decision to keep in step.
   */
  { path: "/authors/", state: "excluded", priority: 0.7, changeFrequency: "monthly" },
];

export const publishedRoutes = (): RoutePage[] => ROUTE_PAGES.filter((p) => p.state === "published");

/** `undefined` for a path this list does not govern — a blog post, a product, a tool. */
export function routePageState(path: string): PublicationState | undefined {
  return ROUTE_PAGES.find((p) => p.path === path)?.state;
}

/**
 * Is this path a route page held out of the index?
 *
 * False for a path the list does not know, because a data-driven page's state lives with its data —
 * answering "excluded" for anything unlisted would hide every product page the moment somebody
 * renamed one.
 */
export const isExcludedRoute = (path: string): boolean => routePageState(path) === "excluded";

/**
 * The one `robots` value a held-back page emits.
 *
 * `follow: false` as well as `index: false` because a draft's outbound links should not pass weight
 * from a page nobody has signed off — and because §1(c) of the sprint asked for `noindex, nofollow`
 * by name, which is what Next renders from this pair.
 */
export const HELD_BACK_ROBOTS = { index: false, follow: false } as const;
