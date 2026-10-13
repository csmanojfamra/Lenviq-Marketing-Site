import type { MetadataRoute } from "next";
import { absolute } from "@/lib/site";
import { publishedPosts } from "@/lib/content";
import { publishedHelp } from "@/lib/help";
import { TERMS } from "@/lib/glossary";
import { PRODUCTS } from "@/lib/products";
import { TOOLS } from "@/lib/tools";
import { publishedRoutes } from "@/lib/publication";
import { publishedCommercial, pathOf } from "@/lib/commercial";

/**
 * Every URL comes from the same constant the canonical tags do, so the sitemap and the canonical
 * cannot disagree about what this site is called.
 *
 * Drafts are absent because `publishedPosts()` is the only loader — the same filter that stops
 * them being built. Privacy and terms are present now that they carry the reviewed documents.
 */
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  /**
   * The hand-written pages come from `ROUTE_PAGES` (`publication.ts`), which is also what decides
   * whether each one emits `noindex`. This used to be a literal array of paths here with the
   * priorities worked out by a chain of ternaries beside it — two decisions about one page, in two
   * files, with nothing keeping them in step. `/authors/` is the page that proves it: it is held out
   * of the index now, and it leaves this list as a consequence rather than by a second edit.
   */
  const pages = publishedRoutes();
  return [
    ...pages.map((p) => ({
      url: absolute(p.path),
      lastModified: now,
      changeFrequency: p.changeFrequency,
      priority: p.priority,
    })),
    ...PRODUCTS.map((p) => ({
      url: absolute(`/${p.slug}/`), lastModified: now,
      changeFrequency: "monthly" as const, priority: 0.9,
    })),
    { url: absolute("/tools/"), lastModified: now, changeFrequency: "monthly" as const, priority: 0.7 },
    /**
     * THE MACHINE-READABLE FILES, listed on purpose (Sprint SEO-5 §5(b)).
     *
     * A sitemap usually lists pages, and these are not pages — they are plain text and JSON written
     * for an answer engine to fetch. Listing them is what makes them discoverable at all: nothing
     * on the site links to them, by design, because a link to `llms-full.txt` in a footer is a link
     * no reader wants. A crawler that reads the sitemap finds them; one that only follows anchors
     * never would.
     *
     * Low priority deliberately. They are reference material rather than destinations, and a
     * sitemap priority is a statement about this site's own pages relative to each other.
     *
     * `/ai` is NOT here, and that is a finding rather than an omission: the product has no
     * artificial-intelligence features, so §5(d) of the sprint said to build nothing. The report
     * carries the evidence.
     */
    { url: absolute("/llms.txt"), lastModified: now, changeFrequency: "weekly" as const, priority: 0.4 },
    { url: absolute("/llms-full.txt"), lastModified: now, changeFrequency: "weekly" as const, priority: 0.4 },
    { url: absolute("/ai-products.json"), lastModified: now, changeFrequency: "weekly" as const, priority: 0.4 },
    ...TOOLS.map((t) => ({
      url: absolute(`/tools/${t.slug}/`), lastModified: now,
      changeFrequency: "monthly" as const, priority: 0.7,
    })),
    ...TERMS.map((t) => ({ url: absolute(`/glossary/${t.slug}/`), lastModified: now, priority: 0.5 })),
    ...publishedPosts().map((p) => ({ url: absolute(`/blog/${p.slug}/`), lastModified: new Date(p.date), priority: 0.6 })),
    /**
     * Help sits with the glossary rather than with the posts. It is not what brings somebody to the
     * site; it is what they read once they are here, and once they are a customer.
     */
    ...publishedHelp().map((p) => ({ url: absolute(`/help/${p.slug}/`), lastModified: now, priority: 0.5 })),
    /**
     * The commercial layer — `/solutions/` and `/enterprise/`, each page's priority from its own
     * front matter. Published pages only, which is the same `draft` field that decides the robots
     * tag and whether the hub links to it. Sprint SEO-5 builds the whole layer unpublished, so this
     * contributes nothing until somebody starts flipping pages.
     */
    ...publishedCommercial("solutions").map((p) => ({
      url: absolute(pathOf(p)), lastModified: now,
      changeFrequency: "monthly" as const, priority: p.priority,
    })),
    ...publishedCommercial("enterprise").map((p) => ({
      url: absolute(pathOf(p)), lastModified: now,
      changeFrequency: "monthly" as const, priority: p.priority,
    })),
  ];
}
