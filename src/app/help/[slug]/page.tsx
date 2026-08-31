import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Section } from "@/components/ui";
import { Shot, PhoneShot, type ShotMark } from "@/components/shot";
import { publishedHelp, helpBySlug, helpNeighbours } from "@/lib/help";
import { absolute, COMPANY } from "@/lib/site";
import { renderMarkdown } from "@/lib/markdown";
import { ProductCta } from "@/components/product-cta";

export function generateStaticParams() {
  return publishedHelp().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = helpBySlug(slug);
  if (!p) return {};
  return pageMetadata({
    title: p.title,
    description: p.description,
    path: `/help/${p.slug}/`,
    type: "article",
  });
}

/**
 * A screenshot inside the prose, written as one line in the markdown.
 *
 *     @shot name | what is on the screen | an optional caption
 *     @phone name | what is on the screen | an optional caption
 *
 * Parsed here rather than taught to `renderMarkdown`, which is deliberately a small string-to-HTML
 * function with no concept of components. Splitting the body means the image is a real `<Image>` —
 * with the dimensions from the generator, so nothing shifts as it loads — instead of an `<img>` tag
 * smuggled through a renderer that escapes HTML on purpose.
 */
const SHOT_LINE = /^@(shot|phone)\s+([a-z0-9-]+)\s*\|\s*([^|]+?)\s*(?:\|\s*(.*?))?\s*$/;

/**
 * `@mark x,y | what this part of the screen is` — a numbered pointer on the shot above it.
 *
 *     @shot dashboard | what is on screen | a caption
 *     @mark 7.6,10.5 | The branch you are scoped to
 *     @mark 85,9.5   | Every figure is as at the previous day-end
 *
 * Percentages of the image, so a re-shoot at a different width leaves them in place; only a change
 * to the product's own layout moves one. They attach to the most recent shot, which keeps the
 * markdown readable — the pointer sits directly under the picture it points at.
 */
const MARK_LINE = /^@mark\s+([\d.]+)\s*,\s*([\d.]+)\s*\|\s*(.+?)\s*$/;

function blocks(body: string) {
  const out: (
    | { kind: "md"; text: string }
    | { kind: "shot" | "phone"; name: string; alt: string; caption?: string; marks?: ShotMark[] }
  )[] = [];
  let buffer: string[] = [];
  const flush = () => {
    const text = buffer.join("\n").trim();
    if (text) out.push({ kind: "md", text });
    buffer = [];
  };
  for (const line of body.split("\n")) {
    const mark = MARK_LINE.exec(line.trim());
    if (mark) {
      // Attaches to the shot above it. A mark with no shot before it is dropped rather than
      // rendered somewhere arbitrary.
      const last = out[out.length - 1];
      if (last && last.kind === "shot") {
        (last.marks ??= []).push({ x: Number(mark[1]), y: Number(mark[2]), text: mark[3] });
      }
      continue;
    }
    const m = SHOT_LINE.exec(line.trim());
    if (m) {
      flush();
      out.push({ kind: m[1] as "shot" | "phone", name: m[2], alt: m[3], caption: m[4] || undefined });
    } else {
      buffer.push(line);
    }
  }
  flush();
  return out;
}

export default async function HelpPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = helpBySlug(slug);
  if (!p) notFound();

  const { step, total, prev, next } = helpNeighbours(slug);

  /**
   * `Article`, not `HowTo`.
   *
   * Google retired HowTo rich results in 2023, so marking these up as HowTo buys nothing and
   * commits the page to a shape that no longer earns anything. Breadcrumbs still place the page in
   * the site, which is what an answer engine needs to treat it as part of something rather than as
   * an orphan.
   */
  const article = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: p.title,
    description: p.description,
    author: { "@type": "Organization", name: COMPANY.legalName },
    publisher: { "@type": "Organization", name: COMPANY.legalName },
    mainEntityOfPage: absolute(`/help/${p.slug}/`),
  };
  const crumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absolute("/") },
      { "@type": "ListItem", position: 2, name: "Help", item: absolute("/help/") },
      { "@type": "ListItem", position: 3, name: p.title, item: absolute(`/help/${p.slug}/`) },
    ],
  };

  return (
    <Section className="pt-s7">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(article) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbs) }} />
      <nav className="text-[13px] text-muted">
        <Link href="/help/" className="hover:text-ink">Help</Link>
        <span className="px-1 text-line">/</span>
        <span>{p.section}</span>
      </nav>
      <h1 className="mt-s2 max-w-3xl text-[32px] font-extrabold leading-[1.12] tracking-display-tight text-ink sm:text-[42px]">
        {p.title}
      </h1>
      <p className="mt-s3 max-w-prose text-[18px] leading-prose text-slate-mid">{p.description}</p>
      <p className="mt-s3 text-[13px] uppercase tracking-wide text-muted">
        Step {step} of {total}
        {p.audience ? ` · ${p.audience}` : ""}
      </p>

      <div className="mt-s5 max-w-prose">
        {blocks(p.body).map((b, i) =>
          b.kind === "md" ? (
            <div key={i} className="prose-lenviq" dangerouslySetInnerHTML={{ __html: renderMarkdown(b.text) }} />
          ) : b.kind === "phone" ? (
            <PhoneShot key={i} name={b.name} alt={b.alt} caption={b.caption} />
          ) : (
            <Shot key={i} name={b.name} alt={b.alt} caption={b.caption} marks={b.marks} />
          ),
        )}
      </div>

      {/*
        * Previous and next, because these guides are a PATH and not a set.
        *
        * Ten pages that each ended were ten dead ends: a reader finished one and had to go back to
        * an index to guess what followed. Running a loan book is a sequence — lead, customer, file,
        * disbursement, servicing, collection, books, return — and the guides now follow it, so
        * somebody learning the system is walked through in the order the work actually happens.
        */}
      <nav className="mt-s7 grid gap-s3 border-t border-line pt-s4 sm:grid-cols-2" aria-label="Guide sequence">
        {prev ? (
          <Link href={`/help/${prev.slug}/`} className="group rounded-card border border-line p-s4 transition-colors hover:border-cta">
            <span className="text-[12px] uppercase tracking-wide text-muted">Previous</span>
            <span className="mt-1 block font-display text-[16px] font-bold tracking-display text-ink group-hover:text-cta">
              {prev.title}
            </span>
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link href={`/help/${next.slug}/`} className="group rounded-card border border-line p-s4 transition-colors hover:border-cta sm:text-right">
            <span className="text-[12px] uppercase tracking-wide text-muted">Next</span>
            <span className="mt-1 block font-display text-[16px] font-bold tracking-display text-ink group-hover:text-cta">
              {next.title}
            </span>
          </Link>
        ) : (
          <div className="rounded-card border border-line bg-subtle p-s4 sm:text-right">
            <span className="text-[12px] uppercase tracking-wide text-muted">That is the path</span>
            <span className="mt-1 block text-[15px] leading-relaxed text-slate-mid">
              Lead to return, end to end.{" "}
              <Link href="/contact/" className="text-cta underline underline-offset-2 hover:text-cta-hover">
                See it on your own book
              </Link>
              .
            </span>
          </div>
        )}
      </nav>

      <p className="mt-s5 max-w-prose text-[15px] leading-relaxed text-slate-mid">
        The rules behind this screen are explained on the{" "}
        <Link href="/blog/" className="text-cta underline underline-offset-2 hover:text-cta-hover">blog</Link>
        {" "}and the terms are defined in the{" "}
        <Link href="/glossary/" className="text-cta underline underline-offset-2 hover:text-cta-hover">glossary</Link>.
      </p>

      <ProductCta
        line="Every screenshot on this page is the running product, taken from a demo tenant. A demo walks the same path with your own products and schemes in it."
        secondary={{ href: "/help/", label: "The rest of the path" }}
      />
    </Section>
  );
}
