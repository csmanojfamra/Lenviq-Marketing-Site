import Link from "next/link";
import { Section as Band } from "@/components/ui";
import { ProductCta, ProductCtaCompact } from "@/components/product-cta";
import { renderMarkdown, outline, splitAtMidHeading } from "@/lib/markdown";
import { autolinkGlossary } from "@/lib/autolink";
import { suppressHeldBackLinks } from "@/lib/held-back";
import { postBySlug } from "@/lib/content";
import type { CommercialPage } from "@/lib/commercial";

/**
 * ONE RENDERER FOR THE COMMERCIAL LAYER.
 *
 * `/solutions/` and `/enterprise/` pages carry the same twelve blocks, taken in Sprint SEO-4 from
 * two pages that rank, so they get one component rather than two routes with the same JSX in both.
 *
 * ## Why the blog route was NOT refactored to use this
 *
 * It renders the same twelve blocks and the duplication is real. It also renders two pages that are
 * live, indexed and carrying a crawl Google has already spent, and it carries `Article` and
 * `FAQPage` structured data, a byline that must resolve to `/authors/`, a reading-time estimate and
 * a draft banner — none of which a maintained commercial page has. Merging them would mean touching
 * the one route whose output is already in the index, to save about eighty lines. The duplication
 * that remains is presentational; the things that must not disagree — publication state, the
 * held-back link rule, the reading list's published-only filter — are shared modules, not copies.
 *
 * If a third section ever needs this shape, merge then.
 */

/** A reading-list entry: a blog slug, or any site path with a label after a pipe. */
function readingHref(entry: string): { href: string; label: string } | null {
  if (entry.startsWith("/")) {
    const [href, label] = entry.split("|");
    return label ? { href: href.trim(), label: label.trim() } : null;
  }
  const p = postBySlug(entry);
  return p ? { href: `/blog/${p.slug}/`, label: p.title } : null;
}

export function CommercialArticle({ page, crumb }: { page: CommercialPage; crumb: { href: string; label: string } }) {
  const contents = outline(page.body);
  /*
   * A draft keeps its outbound links to other drafts; a live page does not. `held-back.ts` carries
   * the argument — this page is `noindex` and in no listing, so it creates no crawl path, and a
   * reviewer reading one page of a new layer should be able to follow it to the next.
   */
  const rendered = autolinkGlossary(renderMarkdown(page.body));
  const body = page.draft ? rendered : suppressHeldBackLinks(rendered);
  const mid = splitAtMidHeading(body);

  const head = mid ? mid[0] : body;
  const firstHeading = head.search(/<h2\b/);
  const opening = firstHeading > 0 ? head.slice(0, firstHeading) : head;
  const rest = firstHeading > 0 ? head.slice(firstHeading) : "";

  const reading = page.related.map(readingHref).filter((x): x is { href: string; label: string } => x !== null);

  return (
    <Band className="pt-s7">
      {page.draft && (
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
        <Link href={crumb.href} className="hover:text-ink">{crumb.label}</Link>
      </nav>

      <p className="mt-s4 text-[12px] font-semibold uppercase tracking-[0.08em] text-cta">
        {page.kind === "persona" ? "For your role" : page.kind === "situation" ? "At scale" : "Solution"}
      </p>
      <h1 className="mt-s2 max-w-3xl text-[32px] font-extrabold leading-[1.12] tracking-display-tight text-ink sm:text-[42px]">
        {page.title}
      </h1>
      {(page.author || page.updated) && (
        <p className="mt-s3 text-[13px] text-muted">
          {page.author && (
            <Link
              href={`/authors/#${page.author.toLowerCase().replace(/[^a-z]+/g, "-")}`}
              className="font-medium text-ink underline decoration-line-strong underline-offset-4 hover:text-cta"
            >
              {page.author}
            </Link>
          )}
          {page.author && page.updated ? " · " : ""}
          {page.updated ? `updated ${page.updated}` : ""}
        </p>
      )}

      <div className="mt-s5 grid gap-s6 [&>*]:min-w-0 xl:grid-cols-[minmax(0,1fr)_18rem] xl:items-start">
        <div>
          {page.question ? (
            <section
              aria-labelledby="quick-answer"
              className="max-w-prose rounded-card border border-line border-l-[3px] border-l-[color:var(--color-cta)] bg-subtle p-s4"
            >
              <p className="text-[12px] font-semibold uppercase tracking-[0.08em] text-muted">Quick answer</p>
              <h2 id="quick-answer" className="mt-s2 font-display text-[20px] font-bold leading-snug tracking-display text-ink">
                {page.question}
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
                    <a href={`#${c.id}`} className="text-cta underline-offset-2 hover:underline">{c.text}</a>
                  </li>
                ))}
              </ol>
            </nav>
          )}

          <div className="prose-lenviq mt-s5 max-w-prose" dangerouslySetInnerHTML={{ __html: rest }} />
          {mid && (
            <>
              <div className="max-w-prose xl:hidden">
                <ProductCtaCompact variant="inline" line="Lending teams use Lenviq to run origination, servicing and the accounting behind them on one system." />
              </div>
              <div className="prose-lenviq max-w-prose" dangerouslySetInnerHTML={{ __html: mid[1] }} />
            </>
          )}
        </div>

        <div className="hidden xl:block xl:sticky xl:top-24">
          <ProductCtaCompact line="Lending teams use Lenviq to run origination, servicing and the accounting behind them on one system." />
        </div>
      </div>

      {reading.length > 0 && (
        <section className="mt-s6 border-t border-line pt-s4">
          <h2 className="font-display text-[19px] font-bold tracking-display text-ink">Related reading</h2>
          <ul className="mt-s3 grid gap-s3 sm:grid-cols-2 sm:gap-x-s5">
            {reading.map((r) => (
              <li key={r.href}>
                <Link
                  href={r.href}
                  className="text-[15px] leading-snug text-cta underline decoration-line-strong underline-offset-4 hover:text-ink"
                >
                  {r.label}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <ProductCta line="Seeing it run on your own book is faster than reading about it — a demo works through your products, your schemes and your classification rules, not a generic tour." />
    </Band>
  );
}
