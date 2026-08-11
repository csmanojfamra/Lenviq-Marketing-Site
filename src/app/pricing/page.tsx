import type { Metadata } from "next";
import { Section, SectionHead, Card, ButtonLink } from "@/components/ui";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: "Pricing — how Lenviq is licensed",
  description:
    "Licensed per tenant with a component that scales on active loan accounts. What is included, what is not, and why there is no public price list yet.",
  alternates: { canonical: "/pricing/" },
};

export default function PricingPage() {
  return (
    <>
      <Section className="pt-s7">
        <Reveal>
          <p className="text-[13px] font-semibold uppercase tracking-wide text-cta">Pricing</p>
          <h1 className="mt-s2 max-w-4xl text-[34px] font-extrabold leading-[1.1] tracking-display-tight text-ink sm:text-[46px]">
            The model, stated. The number, in conversation.
          </h1>
          <p className="mt-s4 max-w-prose text-[18px] leading-prose text-slate-mid">
            Silence about pricing reads as evasive to a finance buyer, which is a poor first
            impression for a lending product. So here is how it works, even though the figure
            depends on your book.
          </p>
        </Reveal>
      </Section>

      <Section tone="sand">
        <SectionHead eyebrow="The model" title="Per tenant, scaling on active accounts" />
        <div className="mt-s5 grid gap-s3 md:grid-cols-3">
          <Reveal stage={1}><Card title="A platform fee">Per NBFC, annual. Covers the platform, updates, and the regulatory changes that arrive during the year — a direction that changes is not a change request.</Card></Reveal>
          <Reveal stage={2}><Card title="A usage component">Scaling on active loan accounts, in tiers. A lender with four thousand live accounts should not pay what one with four hundred thousand pays.</Card></Reveal>
          <Reveal stage={3}><Card title="Implementation, once">Migration, configuration of your schemes and templates, and training. Quoted against the state of the data you are moving from.</Card></Reveal>
        </div>
      </Section>

      <Section>
        <SectionHead eyebrow="What is not metered" title="Things that should not be a line item" />
        <div className="mt-s5 grid gap-s3 md:grid-cols-2">
          <Reveal stage={1}><Card title="Users and branches">Not charged per seat. Charging per user is how a lending system ends up with three people sharing a login, which is an audit finding waiting to happen.</Card></Reveal>
          <Reveal stage={2}><Card title="Reports and documents">Every report and every document in the pack is included. A report you have to buy is a report you will build in Excel instead.</Card></Reveal>
        </div>
        <Reveal className="mt-s5">
          <p className="max-w-prose text-[15px] leading-prose text-muted">
            Third-party costs pass through at cost and are named — credit bureau enquiries, KYC and
            PAN verification, e-sign, e-NACH, SMS and email.
          </p>
        </Reveal>
      </Section>

      <Section tone="sand">
        <Reveal className="rounded-card border border-sand-border bg-card p-s6">
          <h2 className="text-[26px] font-bold tracking-display text-ink">Why there is no price list here yet</h2>
          <p className="mt-s3 max-w-prose text-[16px] leading-prose text-slate-mid">
            Because a published number that we would then negotiate away is worth less than an
            honest conversation about your book. Tell us your active account count, your product
            mix and your branch count, and you will get a figure — not a discovery call.
          </p>
          <div className="mt-s4"><ButtonLink href="/contact/">Ask for a quote</ButtonLink></div>
        </Reveal>
      </Section>
    </>
  );
}
