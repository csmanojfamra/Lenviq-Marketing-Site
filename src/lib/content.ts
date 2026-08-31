import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join } from "node:path";

/**
 * Posts are files. No CMS, no database, no build ceremony — adding one is one file.
 *
 * ## Drafts do not exist to the build
 *
 * `draft: true` is not a badge on a page that ships anyway. A draft is filtered out here, which is
 * the only loader either the index or the post route uses, so a draft has no route, no entry in
 * the sitemap and no way to be reached by guessing the URL.
 *
 * That is the whole point of the rule: one wrong regulatory claim on a page a lender might act on
 * costs more credibility than five correct posts earn. `noindex` would have left the page reachable
 * and indexable-by-mistake; not building it cannot fail that way.
 */
export interface Post {
  slug: string;
  title: string;
  /**
   * The standfirst. Shown on the blog index under the title, so it is written to be READ and is
   * often longer than a search result can display.
   */
  description: string;
  /**
   * The search-result line, capped near 155 characters — a separate field because the two jobs
   * genuinely differ. Thirty-three posts shipped a `description` between 162 and 301 characters,
   * every one of which Google cut off mid-clause. A meta description is not a ranking factor; it is
   * the only sales copy in the result, so it has to finish its sentence.
   *
   * Falls back to `description` where the standfirst is already short enough to serve as both.
   */
  metaDescription: string;
  /**
   * The date of the last SUBSTANTIVE revision, from an optional `updated:` in the front matter.
   *
   * Absent on a post that has not been revised, and then `dateModified` in the structured data is
   * the publication date — which is the truthful answer. Stamping today's date on every build to
   * look fresh is the freshness signal everybody tries, and it is worthless: it claims a revision
   * that did not happen, on every article at once, which is exactly the pattern it would be
   * discounted for. A regulatory post that has genuinely been revised gets a real date here.
   */
  updated?: string;
  date: string;
  category: string;
  author: string;
  /**
   * The slug of the tool this post's subject has one of, from an optional `tool:` in the front
   * matter. Used by the in-article card, which follows the practice on the sites this competes
   * with: mid-article points at the free tool, not at the product.
   */
  tool?: string;
  draft: boolean;
  body: string;
  readingMinutes: number;
}

const DIR = join(process.cwd(), "content/blog");

function parse(file: string): Post {
  const raw = readFileSync(join(DIR, file), "utf8");
  const m = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/.exec(raw);
  if (!m) throw new Error(`${file}: no frontmatter`);
  const meta: Record<string, string> = {};
  for (const line of m[1].split("\n")) {
    const i = line.indexOf(":");
    if (i > 0) meta[line.slice(0, i).trim()] = line.slice(i + 1).trim().replace(/^["']|["']$/g, "");
  }
  const body = m[2];
  return {
    slug: file.replace(/\.md$/, ""),
    title: meta.title ?? file,
    description: meta.description ?? "",
    metaDescription: meta.metaDescription || meta.description || "",
    updated: meta.updated || undefined,
    date: meta.date ?? "",
    tool: meta.tool || undefined,
    category: meta.category ?? "Regulatory",
    author: meta.author ?? "Lenviq",
    draft: meta.draft === "true",
    body,
    // 200 words a minute, rounded up. An estimate, and labelled as one on the page.
    readingMinutes: Math.max(1, Math.round(body.split(/\s+/).length / 200)),
  };
}

function all(): Post[] {
  if (!existsSync(DIR)) return [];
  return readdirSync(DIR)
    .filter((f) => f.endsWith(".md"))
    .map(parse)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

/** Published posts only. Every caller uses this; nothing anywhere loads a draft. */
export const publishedPosts = (): Post[] => all().filter((p) => !p.draft);

/** Count of drafts, for the notice on the index. The COUNT is public; the content is not. */
export const draftCount = (): number => all().filter((p) => p.draft).length;

export const postBySlug = (slug: string): Post | undefined =>
  publishedPosts().find((p) => p.slug === slug);

/**
 * The FAQ pairs out of a post body, for FAQPage structured data.
 *
 * Read from the prose rather than duplicated in frontmatter, so the questions a reader sees and the
 * questions a search engine is told about cannot differ — the failure mode of hand-maintained
 * structured data is that it slowly stops describing the page it sits on, and Google treats that as
 * a reason to ignore all of it.
 *
 * The convention is a `## Frequently asked questions` heading followed by `### question` blocks.
 */
export function postFaqs(body: string): { q: string; a: string }[] {
  const i = body.search(/^##\s+Frequently asked questions\s*$/im);
  if (i < 0) return [];
  // Past the heading line before splitting: slicing FROM the heading and then splitting on the
  // heading pattern makes the first piece the empty string before it, and the section is lost.
  const after = body.slice(i).replace(/^[^\n]*\n/, "");
  const section = after.split(/^##\s+(?!#)/m)[0];
  const out: { q: string; a: string }[] = [];
  const parts = section.split(/^###\s+/m).slice(1);
  for (const part of parts) {
    const [head, ...rest] = part.split("\n");
    const answer = rest.join(" ").replace(/\s+/g, " ").trim();
    if (head?.trim() && answer) out.push({ q: head.trim(), a: answer });
  }
  return out;
}

/**
 * Up to three posts to read next.
 *
 * Category first, because on this site the category IS the topic — a reader on a penal-charges
 * post wants the other Regulatory pieces, not the most recent thing published. Topped up with
 * recent posts only when a category is too small to fill three, so a one-post category still gets
 * a block rather than a gap.
 *
 * Never itself, and the order is stable across builds: `publishedPosts()` is already sorted by
 * date, so two builds of the same content link to the same three articles.
 */
export function relatedPosts(slug: string, limit = 3): Post[] {
  const all = publishedPosts();
  const self = all.find((p) => p.slug === slug);
  if (!self) return [];
  const others = all.filter((p) => p.slug !== slug);
  const sameTopic = others.filter((p) => p.category === self.category);
  const rest = others.filter((p) => p.category !== self.category);
  return [...sameTopic, ...rest].slice(0, limit);
}
