import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join } from "node:path";

/**
 * Help pages are files, the way posts are — and they are a different KIND of page from a post.
 *
 * ## Why not just more blog posts
 *
 * A post is read by somebody who has never heard of us: it argues, it is long, and it earns its
 * traffic from a question about the regulation. A help page is read by somebody who is evaluating
 * the product or already using it: it is short, it is one task, and its job is to get that task
 * done. Mixing them makes the blog too shallow to rank and the help too long to use.
 *
 * The measurements differ too, which is the real tell that they are two things: a post is judged on
 * whether anybody arrives, a help page on whether a trial converts and a support message is never
 * sent.
 *
 * ## Screenshots
 *
 * A help page without one is a paragraph asking the reader to imagine the screen. `shot:` names an
 * image from `public/shots`, which is generated from the running product — see `Shot`.
 */
export interface HelpPage {
  slug: string;
  title: string;
  description: string;
  /**
   * The stage of the lifecycle this belongs to. Also the group on the index.
   *
   * These are not categories — they are a SEQUENCE, and that is the whole point. See `STAGES`.
   */
  section: string;
  /** Ordering within its section. Files with no order sort last, alphabetically. */
  order: number;
  /** Who does this: "Sales officer", "Credit", "Operations", "Field agent". */
  audience: string;
  /**
   * The product screen this guide documents, if it documents one.
   *
   * Declared HERE rather than in the product, because the guide is what knows which screen it opens
   * on — and because a slug renamed on this side has to be able to break a build rather than quietly
   * 404 a link inside somebody's lending system. `scripts/emit-help-map.mjs` writes it across.
   */
  route?: string;
  draft: boolean;
  body: string;
}

/**
 * The lifecycle, in the order somebody actually walks it.
 *
 * The help section was ten pages with no relationship to each other: a reader finished one and the
 * page ended. That is the wrong shape for this subject, because running a loan book IS a sequence —
 * a lead becomes a customer, a customer becomes a file, a file becomes a loan, a loan is serviced
 * and collected, and what happened lands in the books and then in a return.
 *
 * So the guides are a path with a beginning. A new operations person can start at "your first day"
 * and arrive at the RBI returns having been walked through the product in the order the work
 * happens, rather than in the order the pages were written.
 *
 * (This is what Apple's support guides get right, and it is structural rather than editorial: a
 * topic that leads to the next topic. What is deliberately NOT copied is the idea that a manual is
 * an SEO asset — theirs ranks because millions of people already own the product and search for it.
 * These pages exist for a prospect evaluating the system and for a customer using it.)
 */
export const STAGES = [
  "Getting started",
  "Origination",
  "Servicing and collections",
  "The books and the regulator",
] as const;

const DIR = join(process.cwd(), "content/help");

function parse(file: string): HelpPage {
  const raw = readFileSync(join(DIR, file), "utf8");
  const m = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/.exec(raw);
  if (!m) throw new Error(`${file}: no frontmatter`);
  const meta: Record<string, string> = {};
  for (const line of m[1].split("\n")) {
    const i = line.indexOf(":");
    if (i > 0) meta[line.slice(0, i).trim()] = line.slice(i + 1).trim().replace(/^["']|["']$/g, "");
  }
  return {
    slug: file.replace(/\.md$/, ""),
    title: meta.title ?? file,
    description: meta.description ?? "",
    section: meta.section ?? "Using Lenviq",
    order: meta.order ? Number(meta.order) : 999,
    audience: meta.audience ?? "",
    route: meta.route || undefined,
    draft: meta.draft === "true",
    body: m[2],
  };
}

function all(): HelpPage[] {
  if (!existsSync(DIR)) return [];
  return readdirSync(DIR)
    .filter((f) => f.endsWith(".md"))
    .map(parse)
    .sort((a, b) => (a.order !== b.order ? a.order - b.order : a.title.localeCompare(b.title)));
}

/**
 * Published pages only — the same rule the blog runs on. A draft has no route and no sitemap entry,
 * so it cannot be reached by guessing the URL.
 */
export const publishedHelp = (): HelpPage[] => all().filter((p) => !p.draft);

export const helpBySlug = (slug: string): HelpPage | undefined =>
  publishedHelp().find((p) => p.slug === slug);

const stageRank = (s: string) => {
  const i = (STAGES as readonly string[]).indexOf(s);
  return i < 0 ? 99 : i;
};

/**
 * Every guide, flattened into the one order they are meant to be read in.
 *
 * Stage first, then `order` within the stage. This is the single source the index, the step
 * counter and the previous/next links all read, so they cannot disagree about what comes next.
 */
export function helpSequence(): HelpPage[] {
  return publishedHelp().sort((a, b) =>
    stageRank(a.section) - stageRank(b.section) ||
    a.order - b.order ||
    a.title.localeCompare(b.title),
  );
}

/** Where a guide sits in the path, and what surrounds it. */
export function helpNeighbours(slug: string): {
  step: number; total: number; prev?: HelpPage; next?: HelpPage;
} {
  const seq = helpSequence();
  const i = seq.findIndex((p) => p.slug === slug);
  if (i < 0) return { step: 0, total: seq.length };
  return { step: i + 1, total: seq.length, prev: seq[i - 1], next: seq[i + 1] };
}

/** The index, grouped by stage and kept in sequence within each. */
export function helpSections(): { section: string; pages: HelpPage[] }[] {
  const by = new Map<string, HelpPage[]>();
  for (const p of helpSequence()) {
    if (!by.has(p.section)) by.set(p.section, []);
    by.get(p.section)!.push(p);
  }
  return [...by.entries()]
    .sort((a, b) => stageRank(a[0]) - stageRank(b[0]))
    .map(([section, pages]) => ({ section, pages }));
}
