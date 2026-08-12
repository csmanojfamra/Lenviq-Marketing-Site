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
    /**
     * Nothing is excluded any more.
     *
     * Privacy and Terms were crawl-excluded, carried their own `noindex` and were absent from the
     * sitemap — three mechanisms, because a page reading "Draft — pending legal review" turning up
     * in a search result is worse than not being found. Both are now the reviewed documents, so all
     * three come off together: leaving a `Disallow` behind a removed `noindex` would leave the URLs
     * indexable but unreadable, since a crawler that obeys the disallow never fetches the page and
     * so never reads the tag.
     */
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: absolute("/sitemap.xml"),
  };
}
