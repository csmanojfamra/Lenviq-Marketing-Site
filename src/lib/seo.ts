import type { Metadata } from "next";
import { SITE, absolute } from "@/lib/site";

/**
 * One place a page's identity is written down: the title, the description, and the URL it claims
 * to be.
 *
 * It exists because those three had drifted apart in three separate ways, none of them visible
 * without reading the built HTML:
 *
 * 1. **The brand was appended twice.** `layout.tsx` sets `title.template` to `"%s · Lenviq"`, and
 *    six pages also ended their own title with `"— Lenviq"`. They shipped as
 *    `Security, tenant isolation and audit — Lenviq · Lenviq`. Here the title is the page's own
 *    words and nothing else; the template is the only thing that names the product.
 *
 * 2. **Every page told a social crawler it was the home page.** The root layout sets
 *    `openGraph.url` to `SITE.url`, and a page that does not override it inherits that value
 *    verbatim rather than its own address — so forty pages published `og:url = https://lenviq.in/`.
 *    A canonical and an `og:url` that disagree are a genuine duplicate-content signal. `path` is
 *    used for both here, so they cannot.
 *
 * 3. **Overriding `openGraph` silently dropped the image.** Next merges metadata per-key, not
 *    per-field: a page that declared `openGraph: { title, description }` replaced the whole
 *    inherited object, losing `images`, `siteName`, `locale` and `type` with it. Thirty-eight blog,
 *    glossary and help pages had no `og:image` at all, so every share of them rendered blank.
 *
 * The fix for all three is the same: pages state facts, not tags, and this builds the tags.
 */
export interface PageMeta {
  /**
   * The page's own title, WITHOUT the brand — `layout.tsx` appends `· Lenviq`.
   * Aim for 50–60 characters once the 9-character suffix is counted.
   */
  title: string;
  /**
   * Around 155 characters. Google truncates near there, and a description is not a ranking
   * factor — it is the sales line in the result, so it must finish its sentence.
   */
  description: string;
  /** Absolute path with a trailing slash, e.g. `/security/`. Canonical and `og:url` both use it. */
  path: string;
  /** Page-specific share card. Defaults to the site card. */
  ogImage?: string;
  /** `article` for blog and help posts, so the published date is carried on the card. */
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
}

/** The site-wide share card, used wherever a page has not earned its own. */
const DEFAULT_OG = { url: "/og.png", width: 1200, height: 630 };

export function pageMetadata(m: PageMeta): Metadata {
  const image = m.ogImage
    ? { url: m.ogImage, width: 1200, height: 630 }
    : DEFAULT_OG;

  return {
    title: m.title,
    description: m.description,
    alternates: { canonical: m.path },
    openGraph: {
      type: m.type ?? "website",
      locale: "en_IN",
      siteName: SITE.name,
      url: absolute(m.path),
      title: m.title,
      description: m.description,
      images: [{ ...image, alt: m.title }],
      ...(m.publishedTime ? { publishedTime: m.publishedTime } : {}),
      ...(m.modifiedTime ? { modifiedTime: m.modifiedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: m.title,
      description: m.description,
      images: [image.url],
    },
  };
}
