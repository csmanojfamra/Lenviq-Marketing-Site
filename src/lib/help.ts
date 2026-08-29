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
  /** The group it appears under on the index — "Origination", "Collections", "Compliance"… */
  section: string;
  /** Ordering within its section. Files with no order sort last, alphabetically. */
  order: number;
  /** Who does this: "Sales officer", "Credit", "Operations", "Field agent". */
  audience: string;
  draft: boolean;
  body: string;
}

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

/** The index, grouped the way the app's own navigation is. */
export function helpSections(): { section: string; pages: HelpPage[] }[] {
  const order = ["Origination", "Loan management", "Collections", "Compliance and reporting"];
  const by = new Map<string, HelpPage[]>();
  for (const p of publishedHelp()) {
    if (!by.has(p.section)) by.set(p.section, []);
    by.get(p.section)!.push(p);
  }
  return [...by.entries()]
    .sort((a, b) => {
      const ia = order.indexOf(a[0]);
      const ib = order.indexOf(b[0]);
      return (ia < 0 ? 99 : ia) - (ib < 0 ? 99 : ib);
    })
    .map(([section, pages]) => ({ section, pages }));
}
