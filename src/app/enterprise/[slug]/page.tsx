import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { pageMetadata } from "@/lib/seo";
import { allCommercial, commercialBySlug } from "@/lib/commercial";
import { CommercialArticle } from "@/components/commercial-page";

/**
 * EVERY page gets a route, a draft included — the reversal `publication.ts` records.
 *
 * The whole of `/enterprise/` is built unpublished and flipped page by page on a schedule, so this
 * route exists almost entirely to serve pages nobody may link to yet. That is the point: a reviewer
 * reads a real URL, and `noindex, nofollow` plus absence from the sitemap and from the hub is what
 * keeps a crawler away from it.
 */
export function generateStaticParams() {
  return allCommercial("enterprise").map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = commercialBySlug("enterprise", slug);
  if (!p) return {};
  return pageMetadata({
    title: p.title,
    description: p.metaDescription,
    path: `/enterprise/${p.slug}/`,
    // The front matter is the one field; this is the tag it produces (`publication.ts`).
    excluded: p.draft,
  });
}

export default async function EnterprisePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = commercialBySlug("enterprise", slug);
  if (!p) notFound();
  return <CommercialArticle page={p} crumb={{ href: "/enterprise/", label: "Enterprise" }} />;
}
