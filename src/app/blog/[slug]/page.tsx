import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Section } from "@/components/ui";
import { allPostsIncludingDrafts, anyPostBySlug, postFaqs, readingList, relatedPosts } from "@/lib/content";
import { toolBySlug } from "@/lib/tools";
import { absolute, COMPANY } from "@/lib/site";
import { renderMarkdown, outline, splitAtMidHeading } from "@/lib/markdown";
import { autolinkGlossary } from "@/lib/autolink";
import { suppressHeldBackLinks } from "@/lib/held-back";
import { ProductCta, ProductCtaCompact } from "@/components/product-cta";

/**
 * EVERY post gets a route — a draft included, at its own URL, carrying `noindex, nofollow`.
 *
 * This is the reversal `publication.ts` records. A draft used to get no static param, so it had no
 * HTML and no URL, which is stronger against accidental indexing and useless for review: reading one
 * meant running `next dev`, so the person whose name goes on a regulatory claim could not read it
 * before it shipped. Seven pages went live unreviewed through exactly that gap.
 *
 * The three other consequences are what keep a draft out of the index, and they are structural rather
 * than advisory: no sitemap entry (`publishedPosts` feeds it), and no link from any listing or
 * related-posts block (same filter), so a crawler has no path to discover it at all.
 */
export function generateStaticParams() {
  return allPostsIncludingDrafts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = anyPostBySlug(slug);
  if (!p) return {};
  return pageMetadata({
    title: p.title,
    description: p.metaDescription,
    path: `/blog/${p.slug}/`,
    type: "article",
    publishedTime: p.date,
    // The front matter is the one field; this is the tag it produces (`publication.ts`).
    excluded: p.draft,
  });
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = anyPostBySlug(slug);
  if (!p) notFound();

  const related = relatedPosts(p.slug);
  /**
   * The hand-picked list wins where a post has one, and the automatic three serve the rest.
   *
   * Not both: two reading lists on one page is two lists a reader scrolls past. `readingList`
   * resolves through the published loader, so a draft named in front matter is absent here.
   */
  const picked = readingList(p);
  const contents = outline(p.body);
  /**
   * A LINK TO A PAGE THAT IS NOT LIVE YET IS REMOVED HERE, AND ONLY ON A LIVE PAGE.
   *
   * The inbound links a held-back page needs before it may be flipped are written now, into the
   * body prose of pages like this one, because nobody comes back on the flip date to add them.
   * `held-back.ts` records the whole argument. On a live page the anchor is dropped and the words
   * stay, so the sentence reads the same either way.
   *
   * **A draft page keeps them.** The rule is about what a LIVE page renders: this page is itself
   * `noindex, nofollow` and absent from every listing, so it creates no crawl path, and a reviewer
   * reading one draft should be able to follow it to the next. Suppressing here would make the
   * review harder for no gain.
   */
  const body = p.draft
    ? autolinkGlossary(renderMarkdown(p.body))
    : suppressHeldBackLinks(autolinkGlossary(renderMarkdown(p.body)));
  const mid = splitAtMidHeading(body);

  /**
   * The opening answer, and everything from the first heading on.
   *
   * Split here rather than in the markdown so a post does not have to carry a marker: the answer is
   * by definition whatever comes before the first `##`, which is the shape every post on this site
   * already has.
   */
  const firstHeading = (mid ? mid[0] : body).search(/<h2\b/);
  const head = mid ? mid[0] : body;
  const opening = firstHeading > 0 ? head.slice(0, firstHeading) : head;
  const rest = firstHeading > 0 ? head.slice(firstHeading) : "";

  /**
   * The in-article card offers a free tool where the subject has one, and says nothing about the
   * product where it does not.
   *
   * It used to read "what this article works through by hand, the platform does on every account"
   * beside every post — an assertion that whatever the page happened to explain was a feature,
   * made without anyone checking. None of the Indian products this sits beside write it that way:
   * ClearTax's mid-article block points at its own calculator, Zoho Books closes with an
   * invitation, Tally with a trial. Pointing at a tool on this same site claims nothing and is
   * more useful anyway.
   */
  const relatedTool = p.tool ? toolBySlug(p.tool) : undefined;
  const ctaTool = relatedTool
    ? { href: `/tools/${relatedTool.slug}/`, name: relatedTool.name }
    : null;
  const ctaLine = relatedTool
    ? relatedTool.helps
    : "Lending teams use Lenviq to run origination, servicing and the accounting behind them on one system.";

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
    /*
     * ...and the Person now RESOLVES. It named an individual and pointed nowhere, which asserts an
     * identity the site could not support. `/authors/` says who each byline is and what they cover.
     */
    author: {
      "@type": "Person",
      name: p.author,
      url: absolute(`/authors/#${p.author.toLowerCase().replace(/[^a-z]+/g, "-")}`),
    },
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
      {/*
        * A reviewer has to be able to tell. The page is otherwise identical to a published one, and
        * somebody sent this URL should not have to read the page source to find out whether what they
        * are reading has been signed off.
        */}
      {p.draft && (
        <div className="mb-s5 rounded-card border border-line border-l-[3px] border-l-[color:var(--color-warning)] bg-subtle p-s4">
          <p className="text-[13px] font-semibold uppercase tracking-wide text-muted">Draft — pending review</p>
          <p className="mt-s2 max-w-prose text-[15px] leading-relaxed text-slate-mid">
            This page is not published. It is absent from the sitemap and from every index on this
            site, and it asks search engines not to list it. It is here so it can be read and checked
            before it goes live.
          </p>
        </div>
      )}
      <nav className="text-[13px] text-muted">
        <Link href="/blog/" className="hover:text-ink">Blog</Link>
      </nav>
      {/*
        * The category, as a label above the title.
        *
        * It was already on the page, in the byline run beneath the H1 between the author and the
        * date, where it reads as one more piece of metadata. A reader scanning a search result they
        * have just clicked wants to know what KIND of page this is before they commit to the
        * headline, which is why both of the pages Sprint SEO-4 takes its structure from carry it
        * there. Same string, one place earlier; nothing is duplicated, because the byline below
        * drops it.
        */}
      <p className="mt-s4 text-[12px] font-semibold uppercase tracking-[0.08em] text-cta">{p.category}</p>
      <h1 className="mt-s2 max-w-3xl text-[32px] font-extrabold leading-[1.12] tracking-display-tight text-ink sm:text-[42px]">
        {p.title}
      </h1>
      <p className="mt-s3 text-[13px] text-muted">
        <Link
          href={`/authors/#${p.author.toLowerCase().replace(/[^a-z]+/g, "-")}`}
          className="font-medium text-ink underline decoration-line-strong underline-offset-4 hover:text-cta"
        >
          {p.author}
        </Link>
        {" · "}{p.date}
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
      {/*
        * The grid opens HERE, above the contents list, so the rail starts level with it.
        *
        * It used to open at the body, which put the card a full screen down on a laptop: past the
        * title, the byline and a nine-item contents list. A rail that only appears after a scroll
        * is a rail most readers never see, which defeats having one.
        */}
      <div className="mt-s5 grid gap-s6 [&>*]:min-w-0 xl:grid-cols-[minmax(0,1fr)_18rem] xl:items-start">
        <div>

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
          {/*
            * The answer first, THEN the contents list.
            *
            * It used to sit above the article. On a phone that is 311px of navigation before a
            * single word — the opening paragraph, which is the whole point of answering the query
            * in line one, started at y=766 on an 844px screen and nobody saw it without scrolling.
            *
            * Two columns from `sm` up, because nine items in one column is a list you scroll past
            * rather than read.
            */}
          {/*
            * QUICK ANSWER — the question, then the opening, where the post declares a question.
            *
            * The answer is not a second copy of anything: it is the same opening paragraphs this
            * route has always rendered first, wrapped and labelled. What the front matter adds is
            * the question, which is the half that was missing — an answer engine lifts a question
            * joined to its answer, and will not infer the question from a paragraph that happens to
            * be responsive to it.
            *
            * `<h2>` so it is a real heading in the document outline rather than styled text, and
            * `aria-labelledby` so the region announces as what it is. It is deliberately NOT in the
            * contents list: `outline` reads the markdown body and this heading is not in it, which
            * is right — a contents list should not offer a link to the thing directly above it.
            */}
          {p.question ? (
            <section
              aria-labelledby="quick-answer"
              className="max-w-prose rounded-card border border-line border-l-[3px] border-l-[color:var(--color-cta)] bg-subtle p-s4"
            >
              <p className="text-[12px] font-semibold uppercase tracking-[0.08em] text-muted">Quick answer</p>
              <h2 id="quick-answer" className="mt-s2 font-display text-[20px] font-bold leading-snug tracking-display text-ink">
                {p.question}
              </h2>
              <div className="prose-lenviq mt-s3" dangerouslySetInnerHTML={{ __html: opening }} />
            </section>
          ) : (
            <div className="prose-lenviq max-w-prose" dangerouslySetInnerHTML={{ __html: opening }} />
          )}
          {contents.length >= 4 && (
          <nav className="mt-s5 max-w-prose rounded-card border border-line bg-subtle p-s4" aria-label="On this page">
            <p className="text-[13px] font-semibold uppercase tracking-wide text-muted">On this page</p>
            <ol className="mt-s2 grid gap-1.5 sm:grid-cols-2 sm:gap-x-s4">
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
          <div className="prose-lenviq mt-s5 max-w-prose" dangerouslySetInnerHTML={{ __html: rest }} />
          {mid && (
            <>
              <div className="max-w-prose xl:hidden">
                <ProductCtaCompact variant="inline" line={ctaLine} tool={ctaTool} />
              </div>
              <div className="prose-lenviq max-w-prose" dangerouslySetInnerHTML={{ __html: mid[1] }} />
            </>
          )}
        </div>

        <div className="hidden xl:block xl:sticky xl:top-24">
          <ProductCtaCompact line={ctaLine} tool={ctaTool} />
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
      {/*
        * RELATED READING — the hand-picked list, six to eight entries, where the post declares one.
        *
        * Titles only and two columns, because eight standfirsts is a page of its own; the automatic
        * three below keep theirs, which is what makes a short list worth reading. The resolver is
        * the published loader, so a draft named in front matter is simply not here.
        */}
      {picked.length > 0 && (
        <section className="mt-s6 border-t border-line pt-s4">
          <h2 className="font-display text-[19px] font-bold tracking-display text-ink">Related reading</h2>
          {/* `data-listing`: this list exists because it was generated, not because a sentence
              needed it, so `scripts/link-graph.mjs` must not count it as a contextual link. */}
          <ul data-listing className="mt-s3 grid gap-s3 sm:grid-cols-2 sm:gap-x-s5">
            {picked.map((r) => (
              <li key={r.slug}>
                <Link
                  href={`/blog/${r.slug}/`}
                  className="text-[15px] leading-snug text-cta underline decoration-line-strong underline-offset-4 hover:text-ink"
                >
                  {r.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {picked.length === 0 && related.length > 0 && (
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
