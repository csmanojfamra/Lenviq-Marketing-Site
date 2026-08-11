import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Section } from "@/components/ui";
import { TERMS, termBySlug } from "@/lib/glossary";
import { absolute } from "@/lib/site";

export function generateStaticParams() {
  return TERMS.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const t = termBySlug(slug);
  if (!t) return {};
  return {
    title: `${t.term} — what it means in NBFC lending`,
    description: t.short,
    alternates: { canonical: `/glossary/${t.slug}/` },
  };
}

export default async function TermPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const t = termBySlug(slug);
  if (!t) notFound();

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
      { "@type": "ListItem", position: 1, name: "Glossary", item: absolute("/glossary/") },
      { "@type": "ListItem", position: 2, name: t.term, item: absolute(`/glossary/${t.slug}/`) },
    ],
  };

  return (
    <Section className="pt-s7">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonld) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbs) }} />
      <nav className="text-[13px] text-muted">
        <Link href="/glossary/" className="hover:text-ink">Glossary</Link>
      </nav>
      <h1 className="mt-s2 max-w-3xl text-[32px] font-extrabold leading-[1.12] tracking-display-tight text-ink sm:text-[40px]">
        {t.term}
      </h1>
      <p className="mt-s3 max-w-prose text-[18px] font-medium leading-prose text-ink">{t.short}</p>
      <div className="prose-lenviq mt-s4 max-w-prose"><p>{t.body}</p></div>
      <p className="mt-s6 text-[15px] text-slate-mid">
        Related:{" "}
        <Link href="/compliance/" className="text-cta underline underline-offset-2 hover:text-cta-hover">
          how Lenviq implements the RBI positions
        </Link>
        .
      </p>
    </Section>
  );
}
