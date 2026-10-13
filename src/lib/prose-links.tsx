import Link from "next/link";
import type { ReactNode } from "react";

/**
 * AN INLINE LINK INSIDE A SENTENCE THAT IS ALREADY WRITTEN.
 *
 * The product pages are data: `ProductSpec` is prose about one asset class and
 * `components/product-page.tsx` is a skeleton, which is what stops seven pages spun from one
 * template becoming the doorway pattern (`lib/products/types.ts` argues it at length). Every prose
 * field rendered as `{p}` is plain text, so there was no way to put a link inside one — the only
 * links on a product page came from the template itself, which is why all seven linked to exactly
 * `/compliance/` and `/reports/` and to nothing else.
 *
 * Sprint SEO-3 §3.3 requires links to sit **inside existing sentences**, and forbids a paragraph
 * whose only purpose is holding them. That rules out adding a `relatedLine` field — a field like
 * that IS the forbidden paragraph, in data form. So the sentences stay exactly where they are and
 * this makes a phrase inside one of them a link.
 *
 * ## Deliberately tiny
 *
 * `[label](/path/)` and nothing else. No emphasis, no code spans, no external URLs, no raw HTML.
 * The repo already has `renderMarkdown`, and running spec strings through it would be the larger
 * change: it returns an HTML string for `dangerouslySetInnerHTML`, and these strings are editorial
 * prose with curly quotes and em dashes that currently cannot break escaping because they are never
 * treated as markup. This returns React nodes, so escaping stays the renderer's job and a stray
 * bracket renders as a bracket.
 *
 * Internal paths only, asserted rather than assumed: a label pointing anywhere else is left as
 * plain text rather than silently linked, because an off-site link from inside product prose is a
 * decision somebody should make in a review and not a side effect of a syntax.
 */
const LINK = /\[([^\]]+)\]\((\/[^)\s]*)\)/g;

export function proseLinks(text: string): ReactNode {
  if (!text.includes("](/")) return text; // the common case: no link, no array, no keys
  const out: ReactNode[] = [];
  let last = 0;
  for (const m of text.matchAll(LINK)) {
    const i = m.index!;
    if (i > last) out.push(text.slice(last, i));
    out.push(
      <Link
        key={`${m[2]}-${i}`}
        href={m[2]}
        className="underline decoration-line-strong underline-offset-4 hover:text-ink"
      >
        {m[1]}
      </Link>,
    );
    last = i + m[0].length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}
