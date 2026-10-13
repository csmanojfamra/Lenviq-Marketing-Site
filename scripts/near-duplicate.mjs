/**
 * HOW CLOSE IS THIS PAGE TO ONE THIS SITE ALREADY HAS? (Sprint SEO-4)
 *
 * Sprint SEO-4 asks for six "artefact + software" pages on subjects this blog already has artefact
 * pages for — static pool, NPA, SMA, CKYC, KFS, penal charges. That is the sprint's own hazard:
 * SEO-3 measured near-duplicate body content as one of the things that independently suppresses
 * indexing, and SEO-4 §0 says in its own words that publishing volume into a domain with one
 * external backlink is what got thirteen pages declined on 10 October. A new page that restates an
 * existing one is therefore not a neutral addition — it is the failure mode, twice.
 *
 * So the overlap gets MEASURED rather than asserted, before and after writing, with the same
 * method SEO-3 used on the ten commercial pages: shingled 8-gram Jaccard over the body prose.
 *
 *   J(A,B) = |shingles(A) ∩ shingles(B)| / |shingles(A) ∪ shingles(B)|
 *
 * ## Why 8-grams of the MARKDOWN BODY, and not the rendered page
 *
 * The rendered page carries the header, the footer, the contents list and two product panels —
 * which are identical on all fifty-six posts, so measuring the HTML would report every pair as
 * similar and tell us nothing. The body is the part a reader and a crawler judge as the page's own
 * content. Front matter is dropped with it: two posts on one subject SHOULD share vocabulary in
 * their titles, and that is not duplication.
 *
 * Eight words is long enough that ordinary shared terminology does not collide — "the ninety-day
 * past-due basis" appears on a dozen pages here and is three words — and short enough to catch a
 * paraphrased paragraph.
 *
 *   node scripts/near-duplicate.mjs                 # the worst pairs on the site, as a baseline
 *   node scripts/near-duplicate.mjs --of <slug>     # one page against every other
 *   node scripts/near-duplicate.mjs --max 0.15      # exit 1 if any pair is above the threshold
 */
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { pathToFileURL } from "node:url";

const DIR = join(process.cwd(), "content/blog");
const N = 8;

/** Front matter off, markup off, lower case, words only. */
function words(raw) {
  return raw
    .replace(/^---\n[\s\S]*?\n---\n/, "")
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/[|#>*_`~\-]+/g, " ")
    .toLowerCase()
    .match(/[a-z0-9]+/g) ?? [];
}

export function shingles(raw) {
  const w = words(raw);
  const s = new Set();
  for (let i = 0; i + N <= w.length; i++) s.add(w.slice(i, i + N).join(" "));
  return s;
}

export function jaccard(a, b) {
  if (!a.size || !b.size) return 0;
  let inter = 0;
  for (const s of a) if (b.has(s)) inter++;
  return inter / (a.size + b.size - inter);
}

export function loadPosts() {
  return readdirSync(DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => ({ slug: f.replace(/\.md$/, ""), shingles: shingles(readFileSync(join(DIR, f), "utf8")) }));
}

/** Every pair, worst first. */
export function pairs(posts = loadPosts()) {
  const out = [];
  for (let i = 0; i < posts.length; i++)
    for (let j = i + 1; j < posts.length; j++)
      out.push({ a: posts[i].slug, b: posts[j].slug, j: jaccard(posts[i].shingles, posts[j].shingles) });
  return out.sort((x, y) => y.j - x.j);
}

const IS_CLI = process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href;
if (IS_CLI) {
  const args = process.argv.slice(2);
  const val = (f) => { const i = args.indexOf(f); return i > -1 ? args[i + 1] : undefined; };
  const posts = loadPosts();
  const of = val("--of");
  const max = val("--max");

  if (of) {
    const one = posts.find((p) => p.slug === of);
    if (!one) { console.error(`no such post: ${of}`); process.exit(1); }
    const rows = posts
      .filter((p) => p.slug !== of)
      .map((p) => ({ slug: p.slug, j: jaccard(one.shingles, p.shingles) }))
      .sort((a, b) => b.j - a.j)
      .slice(0, 10);
    console.log(`${of} — ${one.shingles.size} shingles — closest ten:\n`);
    for (const r of rows) console.log(`  ${r.j.toFixed(4)}  ${r.slug}`);
    process.exit(0);
  }

  const all = pairs(posts);
  console.log(`${posts.length} posts, ${all.length} pairs, 8-gram Jaccard\n`);
  for (const p of all.slice(0, 15)) console.log(`  ${p.j.toFixed(4)}  ${p.a}  ·  ${p.b}`);
  const worst = all[0];
  console.log(`\nworst pair: ${worst.j.toFixed(4)}`);
  const above = (t) => all.filter((p) => p.j > t).length;
  console.log(`pairs above 0.05: ${above(0.05)} · above 0.10: ${above(0.1)} · above 0.15: ${above(0.15)}`);

  if (max !== undefined) {
    const t = Number(max);
    const bad = all.filter((p) => p.j > t);
    if (bad.length) {
      console.error(`\n${bad.length} pair(s) above ${t}:`);
      for (const p of bad) console.error(`  ${p.j.toFixed(4)}  ${p.a}  ·  ${p.b}`);
      process.exit(1);
    }
    console.log(`\nno pair above ${t}`);
  }
}
