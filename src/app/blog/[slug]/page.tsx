import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Section, ButtonLink } from "@/components/ui";
import { publishedPosts, postBySlug, postFaqs, relatedPosts } from "@/lib/content";
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
  return pageMetadata({
    title: p.title,
    description: p.metaDescription,
    path: `/blog/${p.slug}/`,
    type: "article",
    publishedTime: p.date,
  });
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = postBySlug(slug);
  if (!p) notFound();

  const related = relatedPosts(p.slug);

  const article = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: p.title,
    description: p.description,
    datePublished: p.date,
    /**
     * The publication date unless the post was genuinely revised. Not the build date: stamping
     * every article as modified on every deploy claims a revision that did not happen.
     */
    dateModified: p.updated ?? p.date,
    author: { "@type": "Organization", name: COMPANY.legalName },
    publisher: { "@type": "Organization", name: COMPANY.legalName },
    mainEntityOfPage: absolute(`/blog/${p.slug}/`),
  };

  /**
   * FAQPage and BreadcrumbList alongside the Article.
   *
   * An answer engine lifts a self-contained question-and-answer far more readily than a paragraph
   * in the middle of an argument, and a breadcrumb is what lets it place the page in a site rather
   * than treat it as an orphan. Both are generated from the page's own content — the FAQ from the
   * prose the reader sees — so neither can describe a page that has since changed.
   */
  const faqs = postFaqs(p.body);
  const faqLd = faqs.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      }
    : null;
  const crumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absolute("/") },
      { "@type": "ListItem", position: 2, name: "Blog", item: absolute("/blog/") },
      { "@type": "ListItem", position: 3, name: p.title, item: absolute(`/blog/${p.slug}/`) },
    ],
  };

  return (
    <Section className="pt-s7">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(article) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbs) }} />
      {faqLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />}
      <nav className="text-[13px] text-muted">
        <Link href="/blog/" className="hover:text-ink">Blog</Link>
      </nav>
      <h1 className="mt-s2 max-w-3xl text-[32px] font-extrabold leading-[1.12] tracking-display-tight text-ink sm:text-[42px]">
        {p.title}
      </h1>
      <p className="mt-s3 text-[13px] text-muted">
        {p.category} · {p.date}
        {p.updated ? ` · updated ${p.updated}` : ""} · {p.author} · {p.readingMinutes} min read
        (estimated)
      </p>
      <div
        className="prose-lenviq mt-s5 max-w-prose"
        dangerouslySetInnerHTML={{ __html: renderMarkdown(p.body) }}
      />
      <p className="mt-s7 border-t border-line pt-s4 text-[15px] leading-relaxed text-slate-mid">
        Lenviq implements the positions described here — see{" "}
        <Link href="/compliance/" className="text-cta underline underline-offset-2 hover:text-cta-hover">
          what it implements and the direction each one comes from
        </Link>
        .
      </p>

      {/*
        * Read next, then the ask — in that order.
        *
        * A reader who has finished a two-thousand-word regulatory piece is either done or wants
        * more of the same, and offering the demo first answers a question they have not asked yet.
        * Three related posts also give every article outbound links to its own topic cluster,
        * which the blog had none of: each post was a leaf.
        */}
      {related.length > 0 && (
        <section className="mt-s6 border-t border-line pt-s4">
          <h2 className="font-display text-[19px] font-bold tracking-display text-ink">Read next</h2>
          <ul className="mt-s3 space-y-s3">
            {related.map((r) => (
              <li key={r.slug}>
                <Link
                  href={`/blog/${r.slug}/`}
                  className="font-display text-[16px] font-bold tracking-display text-ink underline decoration-line-strong underline-offset-4 hover:text-cta"
                >
                  {r.title}
                </Link>
                <p className="mt-1 text-[14px] leading-relaxed text-slate-mid">{r.metaDescription}</p>
              </li>
            ))}
          </ul>
        </section>
      )}

      <div className="mt-s6 flex flex-wrap items-center justify-between gap-s3 rounded-card border border-line bg-subtle p-s5">
        <p className="max-w-prose text-[15px] leading-relaxed text-slate-mid">
          Seeing how this works in a running system is faster than reading about it.
        </p>
        <ButtonLink href="/contact/">Request a demo</ButtonLink>
      </div>
    </Section>
  );
}
