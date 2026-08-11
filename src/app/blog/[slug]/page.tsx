import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Section } from "@/components/ui";
import { publishedPosts, postBySlug } from "@/lib/content";
import { absolute, COMPANY } from "@/lib/site";
import { renderMarkdown } from "@/lib/markdown";

/**
 * Only PUBLISHED posts get a route.
 *
 * A draft has no static param, so it has no page, no URL and no way in by guessing — which is a
 * stronger guarantee than `noindex` on a page that still exists and can still be linked, shared or
 * indexed by a crawler that ignores the hint.
 */
export function generateStaticParams() {
  return publishedPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = postBySlug(slug);
  if (!p) return {};
  return {
    title: p.title,
    description: p.description,
    alternates: { canonical: `/blog/${p.slug}/` },
    openGraph: { type: "article", title: p.title, description: p.description, publishedTime: p.date },
  };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = postBySlug(slug);
  if (!p) notFound();

  const article = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: p.title,
    description: p.description,
    datePublished: p.date,
    author: { "@type": "Organization", name: COMPANY.legalName },
    publisher: { "@type": "Organization", name: COMPANY.legalName },
    mainEntityOfPage: absolute(`/blog/${p.slug}/`),
  };

  return (
    <Section className="pt-s7">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(article) }} />
      <nav className="text-[13px] text-muted">
        <Link href="/blog/" className="hover:text-ink">Blog</Link>
      </nav>
      <h1 className="mt-s2 max-w-3xl text-[32px] font-extrabold leading-[1.12] tracking-display-tight text-ink sm:text-[42px]">
        {p.title}
      </h1>
      <p className="mt-s3 text-[13px] text-muted">
        {p.category} · {p.date} · {p.author} · {p.readingMinutes} min read (estimated)
      </p>
      <div
        className="prose-lenviq mt-s5 max-w-prose"
        dangerouslySetInnerHTML={{ __html: renderMarkdown(p.body) }}
      />
      <p className="mt-s7 border-t border-line pt-s4 text-[15px] text-slate-mid">
        Lenviq implements the positions described here — see the{" "}
        <Link href="/compliance/" className="text-cta underline underline-offset-2 hover:text-cta-hover">
          compliance page
        </Link>
        .
      </p>
    </Section>
  );
}
