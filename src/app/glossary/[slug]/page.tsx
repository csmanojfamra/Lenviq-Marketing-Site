import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Section } from "@/components/ui";
import { TERMS, termBySlug, type Term } from "@/lib/glossary";
import { absolute } from "@/lib/site";
import { ProductCta } from "@/components/product-cta";

export function generateStaticParams() {
  return TERMS.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const t = termBySlug(slug);
  if (!t) return {};
  return pageMetadata({
    /**
     * "What is X?" rather than the bare term.
     *
     * It matches how the question is actually typed, and it stops the title being a duplicate of
     * the `<h1>` for no gain. `t.meta` rather than `t.short`: `short` is a four-to-eight word
     * summary for the index page, and a four-word meta description wastes the only sales copy a
     * search result has.
     */
    title: t.question,
    description: t.meta,
    path: `/glossary/${t.slug}/`,
  });
}

/** One optional part of an entry. Absent means absent — a padded section is worse than a short page. */
/**
 * One section of a definition.
 *
 * ## Why the heading carries the term
 *
 * Every term page used the same five headings — "How it is calculated", "Why it matters", "The
 * regulatory position" — which are labels rather than headings: identical on twenty-two pages, and
 * naming nothing. "How is DPD calculated?" is a question somebody types into a search box and a
 * heading a snippet can be lifted from; "How it is calculated" is neither.
 *
 * The SHAPE stays fixed on purpose. A reference page earns its keep by being the same shape every
 * time, so a reader who has used one knows where the regulatory position sits on all of them. What
 * changes is that each heading now names its own subject.
 *
 * The `id` makes each section addressable, so a post can link to the part of a definition it
 * actually means rather than to the top of the page.
 */
function Part({ id, head, children }: { id: string; head: string; children?: string }) {
  if (!children) return null;
  return (
    <section className="mt-s5">
      <h2 id={id} className="font-display text-[19px] font-bold tracking-display text-ink">
        {head}
      </h2>
      <p className="mt-s2 max-w-prose text-[16px] leading-prose text-slate-mid">{children}</p>
    </section>
  );
}


export default async function TermPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const t = termBySlug(slug);
  if (!t) notFound();

  /** "DPD (days past due)" is the H1's job; the section headings use what people say: "DPD". */
  const short = t.term.replace(/\s*\([^)]*\)\s*/g, " ").trim();

  const related = (t.related ?? []).map(termBySlug).filter(Boolean) as Term[];

  const jsonld = {
    "@context": "https://schema.org",
    "@type": "DefinedTerm",
    name: t.term,
    description: t.short,
    url: absolute(`/glossary/${t.slug}/`),
    inDefinedTermSet: absolute("/glossary/"),
  };
  const crumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absolute("/") },
      { "@type": "ListItem", position: 2, name: "Glossary", item: absolute("/glossary/") },
      { "@type": "ListItem", position: 3, name: t.term, item: absolute(`/glossary/${t.slug}/`) },
    ],
  };

  return (
    <Section className="pt-s7">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonld) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbs) }} />
      <nav className="text-[13px] text-muted">
        <Link href="/glossary/" className="hover:text-ink">
          Glossary
        </Link>
      </nav>
      <h1 className="mt-s2 max-w-3xl text-[32px] font-extrabold leading-[1.12] tracking-display-tight text-ink sm:text-[40px]">
        {t.question}
      </h1>
      <p className="mt-s3 max-w-prose text-[18px] font-medium leading-prose text-ink">{t.short}</p>
      <p className="mt-s4 max-w-prose text-[16px] leading-prose text-slate-mid">{t.body}</p>

      <Part id="how-it-is-calculated" head={`How is ${short} calculated?`}>{t.computed}</Part>
      <Part id="worked-example" head={`${short}: a worked example`}>{t.example}</Part>
      <Part id="why-it-matters" head={`Why does ${short} matter?`}>{t.matters}</Part>
      <Part id="regulatory-position" head={`What the regulations say about ${short}`}>{t.regulatory}</Part>
      <Part id="in-a-lending-system" head={`What a lending system has to do about ${short}`}>{t.inProduct}</Part>

      {related.length > 0 && (
        <section className="mt-s6 border-t border-line pt-s4">
          <h2 className="font-display text-[19px] font-bold tracking-display text-ink">Related terms</h2>
          <ul className="mt-s3 space-y-s2">
            {related.map((r) => (
              <li key={r.slug} className="text-[15px] leading-relaxed text-slate-mid">
                <Link
                  href={`/glossary/${r.slug}/`}
                  className="font-medium text-cta underline underline-offset-2 hover:text-cta-hover"
                >
                  {r.term}
                </Link>
                {" — "}
                {r.short}
              </li>
            ))}
          </ul>
        </section>
      )}

      <ProductCta line="The section above describes what a lending system has to do about this term. Lenviq does it — on every account, computed at day-end, with the direction it comes from recorded against it." />
    </Section>
  );
}
