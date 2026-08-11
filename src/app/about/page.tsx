import type { Metadata } from "next";
import { Section, SectionHead, Card, Spec } from "@/components/ui";
import { Reveal } from "@/components/reveal";
import { COMPANY } from "@/lib/site";

export const metadata: Metadata = {
  title: "About FastLegal Technologies — who builds Lenviq",
  description:
    "Lenviq is built by FastLegal Technologies Private Limited, and designed by a practising Chartered Accountant and Company Secretary.",
  alternates: { canonical: "/about/" },
};

export default function AboutPage() {
  return (
    <>
      <Section className="pt-s7">
        <Reveal>
          <p className="text-[13px] font-semibold uppercase tracking-wide text-cta">About</p>
          <h1 className="mt-s2 max-w-4xl text-[34px] font-extrabold leading-[1.1] tracking-display-tight text-ink sm:text-[46px]">
            A lending system written by someone who has filed the returns.
          </h1>
          <p className="mt-s4 max-w-prose text-[18px] leading-prose text-slate-mid">
            Lenviq is built by {COMPANY.legalName}. The product is designed and written by a
            practising Chartered Accountant and Company Secretary — which is why the compliance
            pages carry citations rather than adjectives, and why the ledger is a real double-entry
            ledger rather than a reporting table.
          </p>
        </Reveal>
      </Section>

      <Section tone="sand">
        <SectionHead eyebrow="Why it exists" title="The gap this was built into" />
        <div className="mt-s5 grid gap-s3 md:grid-cols-2">
          <Reveal stage={1}><Card title="Compliance treated as reporting">Most lending software computes what it likes and assembles a compliance view at quarter-end. That works until a position has to be defended, at which point the number in the return and the number in the ledger are two different numbers.</Card></Reveal>
          <Reveal stage={2}><Card title="Books kept somewhere else">A loan system that hands a summary to an accounting package leaves the reconciliation to a person. Here the posting is the loan event.</Card></Reveal>
        </div>
      </Section>

      <Section>
        <SectionHead eyebrow="The company" title="Registration details" lead="A company you can look up is itself a trust signal, which is why these are here rather than in a footer nobody reads." />
        <dl className="mt-s4 border-b border-line">
          <Reveal><Spec term="Legal name">{COMPANY.legalName}</Spec></Reveal>
          <Reveal>
            <Spec term="CIN">
              {COMPANY.cin || (
                <span className="text-muted">
                  To be published. Deliberately blank rather than approximated — this is a number a
                  prospect checks against the MCA register, and a wrong one is worse than an absent one.
                </span>
              )}
            </Spec>
          </Reveal>
          <Reveal>
            <Spec term="GSTIN">
              {COMPANY.gstin || <span className="text-muted">To be published, for the same reason.</span>}
            </Spec>
          </Reveal>
          <Reveal>
            <Spec term="Registered office">
              {COMPANY.registeredOffice || <span className="text-muted">To be published.</span>}
            </Spec>
          </Reveal>
        </dl>
      </Section>
    </>
  );
}
