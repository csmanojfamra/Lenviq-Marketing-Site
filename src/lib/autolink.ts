import { TERMS } from "./glossary";

/**
 * Link the first mention of a glossary term, once per document.
 *
 * Internal linking was the thinnest part of this site's content: a post carried three or four
 * links, where the pages it competes with carry forty. Doing that by hand across thirty-eight
 * posts is a job nobody finishes and nobody maintains — a term renamed in the glossary leaves a
 * dead anchor in a post written a year earlier.
 *
 * Derived instead. The phrases come from the glossary itself, so a link can only ever point at a
 * term that exists, and a term added tomorrow starts being linked in everything written before it.
 *
 * ## The three rules that stop it becoming spam
 *
 * 1. **First occurrence only.** A post that says "overdue" forty times links it once. Repeating the
 *    same link is the single clearest signal of automated over-optimisation.
 * 2. **A cap per document.** Eight, which is roughly one every two hundred words at the length
 *    these run. Past that the prose reads as a link farm rather than an argument.
 * 3. **Never inside a heading, an existing link, or code.** A heading that is half hyperlink looks
 *    broken, and a link inside a link is invalid HTML.
 *
 * The anchor is the phrase as the author wrote it — never an exact-match keyword swapped in — so
 * the sentence still reads as a sentence.
 */
const MAX_PER_DOC = 8;

/** Longest first, so "days past due" wins over "due" and "Key Facts Statement" over "Statement". */
const PHRASES: { re: RegExp; slug: string }[] = TERMS.flatMap((t) => {
  const bare = t.term.replace(/\s*\([^)]*\)\s*/g, " ").trim();
  const inBrackets = /\(([^)]+)\)/.exec(t.term)?.[1] ?? "";
  const raw = [bare, inBrackets]
    .flatMap((x) => x.split(/,\s*/))
    .map((x) => x.trim())
    .filter((x) => x.length >= 3 && !/^SMA-\d$/.test(x));
  return raw.map((phrase) => ({ phrase, slug: t.slug }));
})
  .sort((a, b) => b.phrase.length - a.phrase.length)
  .map(({ phrase, slug }) => ({
    // Word-bounded and case-insensitive; the matched text is kept exactly as written.
    re: new RegExp(`\\b(${phrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})\\b`, "i"),
    slug,
  }));

/**
 * Split the HTML on the regions a link must not enter, and rewrite only the rest.
 *
 * A regex over the whole string would happily put an anchor inside an `href`, inside a heading, or
 * inside another anchor. Splitting on those regions first means the replacement never sees them.
 */
const PROTECTED = /(<a\b[^>]*>[\s\S]*?<\/a>|<h[1-6]\b[^>]*>[\s\S]*?<\/h[1-6]>|<code\b[^>]*>[\s\S]*?<\/code>|<pre\b[^>]*>[\s\S]*?<\/pre>|<[^>]+>)/gi;

export function autolinkGlossary(html: string, opts: { skipSlug?: string } = {}): string {
  const used = new Set<string>();
  let count = 0;
  let out = html;

  /*
   * Re-split before every phrase, not once at the start.
   *
   * Splitting once looks equivalent and is not: each replacement writes a new `<a href="...">` into
   * the part it just edited, and that anchor is not in the protected list, because the list was
   * computed before it existed. A later phrase then matches text inside it — including inside the
   * `href` — and the page ships an anchor nested in an attribute.
   *
   * That is not theoretical. "Collection efficiency" was linked, then "collection" (a bracketed
   * word from "DCB (demand, collection, balance)") matched inside the href it had just written, and
   * one post went live with `href="/glossary/<a href="/glossary/dcb/">collection`.
   */
  for (const { re, slug } of PHRASES) {
    if (count >= MAX_PER_DOC) break;
    if (used.has(slug) || slug === opts.skipSlug) continue;

    const parts = out.split(PROTECTED);
    let done = false;
    for (let i = 0; i < parts.length && !done; i += 2) {
      if (!re.test(parts[i])) continue;
      parts[i] = parts[i].replace(re, (m) => `<a href="/glossary/${slug}/">${m}</a>`);
      done = true;
    }
    if (!done) continue;

    out = parts.join("");
    used.add(slug);
    count++;
  }
  return out;
}
