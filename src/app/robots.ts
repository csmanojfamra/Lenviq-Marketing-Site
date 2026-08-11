import type { MetadataRoute } from "next";
import { absolute } from "@/lib/site";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    /**
     * Everything disallowed until launch (Sprint SITE-LIVE §5), alongside the `noindex` in
     * layout.tsx so the position does not rest on one mechanism.
     *
     * Note the interaction, because it is the opposite of intuitive: a crawler that obeys
     * `Disallow: /` never fetches the page, so it never reads the `noindex` either. Blocking the
     * crawl is therefore the WEAKER of the two for de-indexing something already known — it works
     * here only because nothing links to this site yet, so there is nothing to discover. When the
     * site opens, `noindex` comes off FIRST and crawling is allowed in the same change; leaving
     * `Disallow: /` behind a removed `noindex` would leave URLs indexable-but-unreadable, which is
     * the worst of both.
     */
    rules: [
      /**
       * `/` is the launch gate; the two after it are permanent and outlive it.
       *
       * Redundant today — `/` already covers them — and deliberately so. When the site opens, `/`
       * comes out of this list, and if the specific exclusions had been folded into it the privacy
       * and terms drafts would become indexable in the same edit, silently. Listing them
       * separately means removing the gate removes only the gate.
       */
      { userAgent: "*", disallow: ["/", "/privacy/", "/terms/"] },
    ],
    sitemap: absolute("/sitemap.xml"),
  };
}
