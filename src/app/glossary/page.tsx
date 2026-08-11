import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/ui";
import { Reveal } from "@/components/reveal";
import { TERMS } from "@/lib/glossary";
import { absolute } from "@/lib/site";

export const metadata: Metadata = {
  title: "NBFC and lending glossary — DPD, DCB, IRAC, SMA, LTV, KFS",
  description:
    "Plain definitions of the terms used in Indian NBFC lending: DPD, DCB, IRAC, SMA classification, LTV, the Key Facts Statement, CKYC, static pool and vintage analysis.",
  alternates: { canonical: "/glossary/" },
};

/** Each entry is a DefinedTerm in a DefinedTermSet — the schema that fits a glossary. */
const JSONLD = {
  "@context": "https://schema.org",
  "@type": "DefinedTermSet",
  name: "Lenviq NBFC lending glossary",
  url: absolute("/glossary/"),
  hasDefinedTerm: TERMS.map((t) => ({
    "@type": "DefinedTerm",
    "@id": absolute(`/glossary/${t.slug}/`),
    name: t.term,
    description: t.short,
    url: absolute(`/glossary/${t.slug}/`),
  })),
};

export default function GlossaryIndex() {
  return (
    <Section className="pt-s7">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSONLD) }} />
      <Reveal>
        <p className="text-[13px] font-semibold uppercase tracking-wide text-cta">Glossary</p>
        <h1 className="mt-s2 max-w-3xl text-[34px] font-extrabold leading-[1.1] tracking-display-tight text-ink sm:text-[44px]">
          The vocabulary, defined
        </h1>
        <p className="mt-s4 max-w-prose text-[18px] leading-prose text-slate-mid">
          Terms as they are used in Indian NBFC lending. Where a definition varies in practice, the
          entry says so rather than picking one and presenting it as the definition.
        </p>
      </Reveal>

      <dl className="mt-s6 border-t border-line">
        {TERMS.map((t) => (
          <Reveal key={t.slug}>
            <div className="border-b border-line py-s3 md:grid md:grid-cols-[minmax(0,17rem)_1fr] md:gap-s4">
              <dt className="font-display text-[16px] font-bold tracking-display text-ink">
                <Link href={`/glossary/${t.slug}/`} className="hover:text-cta">{t.term}</Link>
              </dt>
              <dd className="mt-1 max-w-prose text-[15px] leading-prose text-slate-mid md:mt-0">{t.body}</dd>
            </div>
          </Reveal>
        ))}
      </dl>
    </Section>
  );
}
