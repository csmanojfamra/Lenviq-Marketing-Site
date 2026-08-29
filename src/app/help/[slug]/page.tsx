import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Section } from "@/components/ui";
import { Shot, PhoneShot } from "@/components/shot";
import { publishedHelp, helpBySlug } from "@/lib/help";
import { absolute, COMPANY } from "@/lib/site";
import { renderMarkdown } from "@/lib/markdown";

export function generateStaticParams() {
  return publishedHelp().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = helpBySlug(slug);
  if (!p) return {};
  return {
    title: p.title,
    description: p.description,
    alternates: { canonical: `/help/${p.slug}/` },
  };
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

function blocks(body: string) {
  const out: ({ kind: "md"; text: string } | { kind: "shot" | "phone"; name: string; alt: string; caption?: string })[] = [];
  let buffer: string[] = [];
  const flush = () => {
    const text = buffer.join("\n").trim();
    if (text) out.push({ kind: "md", text });
    buffer = [];
  };
  for (const line of body.split("\n")) {
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
      {p.audience && <p className="mt-s3 text-[13px] uppercase tracking-wide text-muted">Who does this: {p.audience}</p>}

      <div className="mt-s5 max-w-prose">
        {blocks(p.body).map((b, i) =>
          b.kind === "md" ? (
            <div key={i} className="prose-lenviq" dangerouslySetInnerHTML={{ __html: renderMarkdown(b.text) }} />
          ) : b.kind === "phone" ? (
            <PhoneShot key={i} name={b.name} alt={b.alt} caption={b.caption} />
          ) : (
            <Shot key={i} name={b.name} alt={b.alt} caption={b.caption} />
          ),
        )}
      </div>

      <p className="mt-s7 max-w-prose border-t border-line pt-s4 text-[15px] text-slate-mid">
        The rules behind this screen are explained on the{" "}
        <Link href="/blog/" className="text-cta underline underline-offset-2 hover:text-cta-hover">blog</Link>
        {" "}and the terms are defined in the{" "}
        <Link href="/glossary/" className="text-cta underline underline-offset-2 hover:text-cta-hover">glossary</Link>.
      </p>
    </Section>
  );
}
