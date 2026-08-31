import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Section } from "@/components/ui";
import { publishedPosts, postBySlug, postFaqs, relatedPosts } from "@/lib/content";
import { absolute, COMPANY } from "@/lib/site";
import { renderMarkdown, outline, splitAtMidHeading } from "@/lib/markdown";
import { autolinkGlossary } from "@/lib/autolink";
import { ProductCta, ProductCtaCompact } from "@/components/product-cta";

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
  const contents = outline(p.body);
  const body = autolinkGlossary(renderMarkdown(p.body));
  const mid = splitAtMidHeading(body);
  /**
   * The card's line names the post's own subject rather than the product's features. A generic
   * "book a demo" beside a piece on provisioning is an advertisement; "this arithmetic, on every
   * account, at day-end" is the reason the reader is on the page.
   */
  const ctaLine = `${p.category === "Regulatory" || p.category === "Compliance" || p.category === "Supervision"
    ? "The positions in this article are implemented in the product, against the direction each one comes from."
    : "What this article works through by hand, the platform does on every account on the book, at day-end."}`;

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
    /**
     * A PERSON, not the company.
     *
     * Every post carried `Organization` as its author, which is the weakest possible answer to
     * "who says so" on regulatory writing. These are named professionals — a Company Secretary on
     * company law, governance and supervision; a Chartered Accountant on accounting, income
     * recognition and classification — and the byline matches the subject rather than rotating at
     * random, because a byline that does not match what it is signing is worse than none.
     */
    author: { "@type": "Person", name: p.author },
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
        <span className="font-medium text-ink">{p.author}</span>
        {" · "}{p.category} · {p.date}
        {p.updated ? ` · updated ${p.updated}` : ""} · {p.readingMinutes} min read (estimated)
      </p>
      {/*
        * A contents list, on anything long enough to need one.
        *
        * These run 1,000 to 2,200 words with eight headings on average, and the reader is usually
        * looking for one of them rather than reading start to finish — a compliance officer wants
        * the bit about the upgrade rule, not the introduction. Four headings is the threshold:
        * below that a list is longer than the scrolling it saves.
        *
        * Plain anchors to real `id`s, both derived from the heading text by the same function, so a
        * link here cannot point at a heading that is not there.
        */}
      {contents.length >= 4 && (
        <nav className="mt-s5 max-w-prose rounded-card border border-line bg-subtle p-s4" aria-label="On this page">
          <p className="text-[13px] font-semibold uppercase tracking-wide text-muted">On this page</p>
          <ol className="mt-s2 grid gap-1.5">
            {contents.map((c, i) => (
              <li key={c.id} className="grid grid-cols-[1.4rem_1fr] text-[15px] leading-snug">
                <span className="tabular-nums text-muted">{i + 1}.</span>
                <a href={`#${c.id}`} className="text-cta underline-offset-2 hover:underline">
                  {c.text}
                </a>
              </li>
            ))}
          </ol>
        </nav>
      )}

      {/*
        * The article, and a rail that stays with it.
        *
        * The ask used to sit only under the "read next" list at the very bottom, which converts the
        * readers who finish and nobody else — and these run to eight or nine headings. Two
        * placements answer that without turning the page into an advertisement: a quiet card in a
        * rail that stays in view on a wide screen, and, where the piece is long enough to warrant
        * it, ONE card in the reading column at its midpoint for the phones and tablets a rail
        * cannot serve.
        *
        * No sticky bar at the foot of the viewport. The WhatsApp button already occupies that
        * corner, and two fixed elements competing for a phone screen is how a reader loses the
        * paragraph they were on.
        */}
      <div className="mt-s5 grid gap-s6 xl:grid-cols-[minmax(0,1fr)_18rem] xl:items-start">
        <div className="max-w-prose">
          <div className="prose-lenviq" dangerouslySetInnerHTML={{ __html: mid ? mid[0] : body }} />
          {mid && (
            <>
              <div className="xl:hidden">
                <ProductCtaCompact variant="inline" line={ctaLine} />
              </div>
              <div className="prose-lenviq" dangerouslySetInnerHTML={{ __html: mid[1] }} />
            </>
          )}
        </div>

        <div className="hidden xl:block xl:sticky xl:top-24">
          <ProductCtaCompact line={ctaLine} />
        </div>
      </div>

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

      <ProductCta line="Seeing it run on your own book is faster than reading about it — a demo works through your products, your schemes and your classification rules, not a generic tour." />
    </Section>
  );
}
