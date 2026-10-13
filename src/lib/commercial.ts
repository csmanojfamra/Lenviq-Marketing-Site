import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join } from "node:path";

/**
 * THE COMMERCIAL LAYER — `/solutions/` AND `/enterprise/`.
 *
 * This site has two axes and a lender arrives on whichever one matches how they think about their
 * problem. Both are legitimate and neither replaces the other:
 *
 *   · **by loan type** — the nine product pages (`/gold-loan-software/`, `/vehicle-loan-software/`
 *     and the rest). "I run a gold book."
 *   · **by event or artefact** — `/solutions/`. "I have to run an auction." "I have to file DNBS-2."
 *     "My DPD figure disagrees with the bureau file."
 *
 * A `/solutions/` page is about the EVENT, in a way that holds across every loan type the event
 * touches, and it cross-links to the product pages rather than restating them. If a solutions page
 * and a product page share three paragraphs, the solutions page is wrong — it has drifted onto the
 * other axis.
 *
 * `/enterprise/` is a third thing again: organised by the buyer's SITUATION rather than by event or
 * by loan type. A multi-branch lender and a single-branch lender need the same features and have
 * completely different problems with them.
 *
 * ## Why one loader and not three
 *
 * These are files with front matter, exactly as posts and help pages are, and the publication rule
 * is the same single `draft` field. Three copies of the same parser is the one-truth-in-two-places
 * defect with extra steps. The SECTION is a parameter, so a new section is a directory and a route
 * rather than a new loader.
 *
 * ## What this deliberately does NOT share with `content.ts`
 *
 * Posts have a date, a category, an author byline, a reading-time estimate and an `Article` schema,
 * because a post is a dated piece of writing by a named person. A commercial page is not: it is
 * maintained rather than published, so it has no byline and no publication date on the page. It
 * carries `updated` instead, which is the honest field for a page that gets revised.
 */

export type Section = "solutions" | "enterprise";

/**
 * What KIND of commercial page this is, within a section.
 *
 * `artefact` — one event or artefact the lender has to handle. The §1.1 slug convention.
 * `persona` — one role, and what their day looks like. A different slug shape on purpose.
 * `situation` — `/enterprise/`'s own shape: the shape of the lender rather than the task.
 *
 * It exists so a hub can group its children without parsing their slugs, which is the kind of
 * inference that breaks the first time somebody names a page sensibly.
 */
export type PageKind = "artefact" | "persona" | "situation";

export interface CommercialPage {
  section: Section;
  slug: string;
  /** The H1. Carries the reader's question, never the commercial term — that is the slug's job. */
  title: string;
  description: string;
  metaDescription: string;
  kind: PageKind;
  /** The question the page answers, in the words a person would type. Renders as the quick answer. */
  question: string;
  /** Six to eight destinations for the reading list. Blog slugs, or `/`-prefixed paths. */
  related: string[];
  /** The date of the last substantive revision. A maintained page has no publication date. */
  updated?: string;
  /**
   * A byline, where the page makes regulatory claims — and most of these do.
   *
   * A commercial page would normally carry none; it is maintained copy, not a signed article. But
   * these pages cite circulars by paragraph number and tell a lender what the position is, and a
   * page that does that without saying who stands behind it is asking for trust it has not offered
   * any basis for. Where present it resolves to `/authors/`, exactly as a post's byline does.
   *
   * Optional, because a page about the shape of a lender's branch structure makes no such claim and
   * a byline on it would be decoration.
   */
  author?: string;
  draft: boolean;
  body: string;
  /** Sitemap priority. The hub sets its own; a child defaults to 0.8. */
  priority: number;
}

const DIR = (s: Section) => join(process.cwd(), "content", s);

function parse(section: Section, file: string): CommercialPage {
  const raw = readFileSync(join(DIR(section), file), "utf8");
  const m = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/.exec(raw);
  if (!m) throw new Error(`${section}/${file}: no frontmatter`);
  const meta: Record<string, string> = {};
  for (const line of m[1].split("\n")) {
    const i = line.indexOf(":");
    if (i > 0) meta[line.slice(0, i).trim()] = line.slice(i + 1).trim().replace(/^["']|["']$/g, "");
  }
  const kind = (meta.kind as PageKind) ?? "artefact";
  return {
    section,
    slug: file.replace(/\.md$/, ""),
    title: meta.title ?? file,
    description: meta.description ?? "",
    metaDescription: meta.metaDescription || meta.description || "",
    kind,
    question: meta.question ?? "",
    related: (meta.related ?? "").split(",").map((s) => s.trim()).filter(Boolean),
    updated: meta.updated || undefined,
    author: meta.author || undefined,
    /*
     * Default TRUE, which is the opposite of the blog's default and deliberate.
     *
     * `content.ts` treats a missing `draft` line as published, and a guard insists every post
     * declares one explicitly. Here the whole layer is built unpublished and flipped page by page on
     * a schedule, so an un-declared page is far more likely to be one somebody forgot to finish than
     * one they meant to ship. The guard still requires the line; this is what happens if it is lost.
     */
    draft: meta.draft !== "false",
    body: m[2],
    priority: meta.priority ? Number(meta.priority) : 0.8,
  };
}

function all(section: Section): CommercialPage[] {
  const dir = DIR(section);
  if (!existsSync(dir)) return [];
  return readdirSync(dir)
    .filter((f) => f.endsWith(".md"))
    .map((f) => parse(section, f))
    .sort((a, b) => a.slug.localeCompare(b.slug));
}

/** Every page in a section, draft included — for the page ROUTE and nothing else. */
export const allCommercial = (section: Section): CommercialPage[] => all(section);

/** Published pages only. Every listing, hub and sitemap entry loads this. */
export const publishedCommercial = (section: Section): CommercialPage[] =>
  all(section).filter((p) => !p.draft);

export const commercialBySlug = (section: Section, slug: string): CommercialPage | undefined =>
  all(section).find((p) => p.slug === slug);

/** Count of drafts in a section, for the notice on a hub. The count is public; the content is not. */
export const commercialDraftCount = (section: Section): number =>
  all(section).filter((p) => p.draft).length;

/** Both sections at once — for the sitemap and for the cross-section guards. */
export const everyCommercialPage = (): CommercialPage[] => [
  ...all("solutions"),
  ...all("enterprise"),
];

export const pathOf = (p: CommercialPage): string => `/${p.section}/${p.slug}/`;
