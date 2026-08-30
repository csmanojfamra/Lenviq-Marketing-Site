import type { MetadataRoute } from "next";
import { SITE, absolute } from "@/lib/site";
import { publishedPosts } from "@/lib/content";
import { publishedHelp } from "@/lib/help";
import { TERMS } from "@/lib/glossary";
import { PRODUCTS } from "@/lib/products";

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
  const pages = ["/", "/platform/", "/compliance/", "/reports/", "/security/",
                 "/about/", "/contact/", "/signup/", "/blog/", "/glossary/", "/help/", "/privacy/", "/terms/",
                 ...PRODUCTS.map((p) => `/${p.slug}/`)];
  return [
    ...pages.map((p) => ({
      url: absolute(p),
      lastModified: now,
      changeFrequency: (p === "/blog/" ? "weekly" : "monthly") as "weekly" | "monthly",
      // Signup ranks with compliance rather than with the ordinary pages: it and the home page
      // are the two the site exists to get somebody to.
      /**
       * The product pages rank with compliance and signup rather than with the ordinary pages:
       * they are the four the site exists to be found through, after the home page.
       */
      priority:
        p === "/" ? 1
        : p === "/compliance/" || p === "/signup/" || PRODUCTS.some((x) => `/${x.slug}/` === p) ? 0.9
        : 0.7,
    })),
    ...TERMS.map((t) => ({ url: absolute(`/glossary/${t.slug}/`), lastModified: now, priority: 0.5 })),
    ...publishedPosts().map((p) => ({ url: absolute(`/blog/${p.slug}/`), lastModified: new Date(p.date), priority: 0.6 })),
    /**
     * Help sits with the glossary rather than with the posts. It is not what brings somebody to the
     * site; it is what they read once they are here, and once they are a customer.
     */
    ...publishedHelp().map((p) => ({ url: absolute(`/help/${p.slug}/`), lastModified: now, priority: 0.5 })),
  ].map((e) => ({ ...e, url: e.url.replace(SITE.url, SITE.url) }));
}
