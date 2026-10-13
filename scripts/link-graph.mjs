/**
 * THE INTERNAL LINK GRAPH, READ FROM THE BUILT OUTPUT (Sprint SEO-3 §2).
 *
 * Search Console reports the ten most-linked pages on this site with **exactly 99 inbound internal
 * links each**. That flat number is the signature of the header and the footer: every page links to
 * those ten, and the figure says nothing at all about whether any page links to anything else. So a
 * single inbound count is useless here, and this classifies every link into one of three kinds:
 *
 *   chrome      emitted on every page or a whole class of them — header, footer, breadcrumbs, and
 *               the repeated call-to-action button, which is site furniture wherever it sits in the
 *               markup
 *   listing     a card in an index, an archive, a related-posts block or a tool's further-reading
 *               block — the link exists because a list was generated, not because a sentence needed it
 *   contextual  inside the body prose of another page, written because that sentence needed it
 *
 * ## How a link is classified, and why by these signatures
 *
 * From the rendered HTML, never from a template: a link a template *would* emit is not a link.
 * The regions are structural — one `<header>`, one `<footer>` and one `<main>` per page — and inside
 * `<main>` the discriminator is the anchor's own class, which in this codebase is unambiguous:
 *
 *   `block h-full`           a card wrapping a whole block — 56 of them on /blog/, 7 on /platform/
 *   `font-display …`         a card's title, inside a related-posts or index card
 *   `inline-flex … rounded-input`  the CTA button, on essentially every page
 *   (no class), or `underline underline-offset-4`  an inline link inside a sentence
 *
 * These were read off the build before the rule was written, and §2.2's negative control is what
 * proves the counter measures what this comment claims: remove one known contextual link, rebuild,
 * and the target's contextual count must fall by exactly one.
 *
 *   node scripts/link-graph.mjs            # the table
 *   node scripts/link-graph.mjs --json     # machine-readable
 *   node scripts/link-graph.mjs --target /blog/foo/   # who links to one page, and how
 */
import { readFileSync, existsSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { pathToFileURL } from "node:url";

const OUT = join(process.cwd(), "out");
const ARGS = process.argv.slice(2);
const flag = (f) => ARGS.includes(f);
const val = (f) => { const i = ARGS.indexOf(f); return i > -1 ? ARGS[i + 1] : undefined; };

/** Every built page, as a pathname -> file map. */
function builtPages() {
  const out = new Map();
  const walk = (dir, prefix) => {
    for (const e of readdirSync(dir, { withFileTypes: true })) {
      if (e.isDirectory()) walk(join(dir, e.name), `${prefix}${e.name}/`);
      else if (e.name === "index.html") out.set(prefix || "/", join(dir, e.name));
    }
  };
  walk(OUT, "/");
  return out;
}

/** The URLs the sitemap offers, as pathnames. */
function sitemapPaths() {
  const xml = readFileSync(join(OUT, "sitemap.xml"), "utf8");
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname);
}

const KIND = { CHROME: "chrome", LISTING: "listing", CONTEXTUAL: "contextual" };

/**
 * Classify every internal link on one page.
 *
 * Returns `{ href, kind }` per anchor. Fragment-only and external hrefs are dropped: a link to
 * `#section` is not an inbound link to anything, and an outbound link to rbi.org.in is not part of
 * this graph.
 */
export function linksOn(html) {
  const headEnd = html.indexOf("</header>");
  const footStart = html.lastIndexOf("<footer");
  const mainStart = html.indexOf("<main");

  /** Breadcrumb and pagination `<nav>` ranges inside main — chrome by §2.1's own definition. */
  const navRanges = [];
  for (const m of html.matchAll(/<nav\b/g)) {
    const close = html.indexOf("</nav>", m.index);
    if (close > -1) navRanges.push([m.index, close]);
  }
  const inNav = (i) => navRanges.some(([a, b]) => i >= a && i <= b);

  const out = [];
  for (const m of html.matchAll(/<a\b([^>]*?)href="(\/[^"]*)"([^>]*?)>/g)) {
    const i = m.index;
    const href = m[2].split("#")[0];
    if (!href || href.startsWith("//")) continue;
    // Not a page: an asset, a feed, the sitemap itself.
    if (/\.(png|jpg|jpeg|svg|webp|ico|xml|txt|pdf|json|webmanifest)$/i.test(href)) continue;

    const attrs = m[1] + m[3];
    const cls = (/class="([^"]*)"/.exec(attrs)?.[1] ?? "");

    let kind;
    if ((headEnd > -1 && i < headEnd) || (footStart > -1 && i > footStart)) kind = KIND.CHROME;
    else if (mainStart > -1 && inNav(i)) kind = KIND.CHROME;
    else if (/\binline-flex\b/.test(cls)) kind = KIND.CHROME; // the repeated CTA button
    else if (/\bblock\b/.test(cls) || /\bfont-display\b/.test(cls)) kind = KIND.LISTING;
    else kind = KIND.CONTEXTUAL;

    out.push({ href, kind });
  }
  return out;
}

/** Inbound counts for every sitemap URL, by kind, plus the distinct pages a contextual link came from. */
export function buildGraph() {
  const pages = builtPages();
  const inbound = new Map();
  const ensure = (p) => {
    if (!inbound.has(p)) inbound.set(p, { chrome: 0, listing: 0, contextual: 0, from: new Set() });
    return inbound.get(p);
  };
  for (const p of sitemapPaths()) ensure(p);

  for (const [from, file] of pages) {
    for (const { href, kind } of linksOn(readFileSync(file, "utf8"))) {
      if (href === from) continue; // a page linking to itself is not an inbound link
      const row = inbound.get(href);
      if (!row) continue; // not a sitemap URL — noindexed, or an asset route
      row[kind]++;
      if (kind === KIND.CONTEXTUAL) row.from.add(from);
    }
  }
  return inbound;
}

/**
 * The thirteen URLs Search Console crawled or discovered and did not index, as at 13 October 2026.
 * Transcribed from the report, and carried here so the table can put the measurement beside it.
 */
export const NOT_INDEXED = new Set([
  "/loan-management-system/", "/cash-credit-software/", "/authors/",
  "/blog/nbfc-compliance-checklist/", "/blog/nbfc-compliance-calendar/",
  "/blog/nbfc-registration-and-cor/", "/blog/kerala-money-lending-licence/",
  "/blog/tamil-nadu-money-lending-licence/", "/blog/west-bengal-money-lending-licence/",
  "/blog/bucket-movement-and-flow-rates/",
  "/blog/what-is-a-loan-origination-system/", "/blog/outsourcing-what-cannot-be-outsourced/",
  "/glossary/foreclosure/",
]);

/**
 * THE CLI RUNS ONLY WHEN THIS FILE IS THE ENTRY POINT.
 *
 * Everything above is exported so a test can assert the graph, and the guard in
 * `tests/site.test.ts` does. Without this check, importing `buildGraph` printed the whole
 * 122-row table and called `process.exit` — which is exactly what happened the first time
 * another script imported it.
 */
const IS_CLI = process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href;
if (!IS_CLI) {
  // Imported: nothing runs, nothing prints.
} else {
if (!existsSync(OUT)) {
  console.error("no out/ — run `npm run build` first");
  process.exit(1);
}

const graph = buildGraph();
const target = val("--target");

if (target) {
  const row = graph.get(target);
  if (!row) { console.error(`${target} is not a sitemap URL`); process.exit(1); }
  console.log(`${target}  chrome ${row.chrome} · listing ${row.listing} · contextual ${row.contextual}`);
  console.log("contextual links come from:");
  for (const f of [...row.from].sort()) console.log(`  ${f}`);
  process.exit(0);
}

const rows = [...graph.entries()]
  .map(([url, r]) => ({ url, ...r, sources: r.from.size, indexed: !NOT_INDEXED.has(url) }))
  .sort((a, b) => a.sources - b.sources || a.contextual - b.contextual || a.url.localeCompare(b.url));

if (flag("--json")) {
  console.log(JSON.stringify(rows.map(({ from, ...r }) => r), null, 2));
  process.exit(0);
}

console.log(`${rows.length} sitemap URLs, measured from out/\n`);
console.log("chrome  listing  ctx  src  idx  url");
for (const r of rows) {
  console.log(
    `${String(r.chrome).padStart(6)}${String(r.listing).padStart(9)}${String(r.contextual).padStart(5)}` +
    `${String(r.sources).padStart(5)}  ${r.indexed ? " ✓ " : " ✗ "}  ${r.url}`,
  );
}

const orphans = rows.filter((r) => r.sources === 0);
const thin = rows.filter((r) => r.sources > 0 && r.sources < 3);
console.log(`\nno contextual inbound link at all: ${orphans.length}`);
console.log(`fewer than three contextual sources: ${thin.length}`);
const nd = rows.filter((r) => !r.indexed);
console.log(`\nof the ${nd.length} URLs Search Console declined, contextual sources: ` +
  nd.map((r) => `${r.url}=${r.sources}`).join(", "));
}
