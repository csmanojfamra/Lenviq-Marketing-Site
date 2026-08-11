import type { Metadata } from "next";
import { Section, SectionHead, Card, Spec, ButtonLink } from "@/components/ui";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: "Loan origination and loan management system for NBFCs",
  description:
    "LOS and LMS in one platform: lead to disbursement, servicing and collections, NPA and provisioning, Tally-compatible accounting, GST and TDS, and the document pack.",
  alternates: { canonical: "/platform/" },
};

const LOS = [
  ["Leads and applications", "Capture, assignment and a stage-by-stage workflow to sanction, with turnaround visible per stage."],
  ["Parties", "Individual and non-individual borrowers, co-applicants and guarantors, with the KYC each constitution actually requires."],
  ["Collateral", "Property and gold today, each valued and tracked under its own rules — gold by purity and net weight, property by valuation and charge."],
  ["Credit", "Bureau pulls recorded against the application with the report attached, scoring bands, and approval slabs that route by amount."],
  ["Sanction and disbursement", "Sanction snapshots the scheme's terms, so a later change to the scheme cannot alter a loan already sanctioned. Disbursement is maker-checker."],
];

const LMS = [
  ["Servicing", "Schedules, repayments, receipts, part payment and foreclosure, with the statutory bar on pre-payment charges applied by the system rather than by the scheme."],
  ["Collections", "Allocation, follow-up, and collection efficiency measured the way a lender's diligence pack asks for it."],
  ["Asset quality", "DPD, SMA buckets, IRAC classification and provisioning, computed at day-end in a scheduled job."],
  ["Gold", "Purity, LTV against the day's rate, renewal pipeline and auction tracking."],
  ["Borrowings", "The liability side: facilities, drawdowns, drawing power from the day-end statement, and the security pool pledged against each."],
];

export default function PlatformPage() {
  return (
    <>
      <Section className="pt-s7">
        <Reveal>
          <p className="text-[13px] font-semibold uppercase tracking-wide text-cta">The platform</p>
          <h1 className="mt-s2 max-w-4xl text-[34px] font-extrabold leading-[1.1] tracking-display-tight text-ink sm:text-[46px]">
            Origination and loan management, on one ledger.
          </h1>
          <p className="mt-s4 max-w-prose text-[18px] leading-prose text-slate-mid">
            Most lenders run an origination system, a servicing system and an accounting package,
            and spend the last week of every month reconciling them. Here the loan event posts to
            the books as it happens, so there is one set of facts.
          </p>
        </Reveal>
      </Section>

      <Section tone="sand">
        <SectionHead eyebrow="Origination" title="Lead to disbursement" />
        <dl className="mt-s4 border-b border-line">
          {LOS.map(([t, b]) => <Reveal key={t}><Spec term={t}>{b}</Spec></Reveal>)}
        </dl>
      </Section>

      <Section>
        <SectionHead eyebrow="Loan management" title="Disbursement to closure" />
        <dl className="mt-s4 border-b border-line">
          {LMS.map(([t, b]) => <Reveal key={t}><Spec term={t}>{b}</Spec></Reveal>)}
        </dl>
      </Section>

      <Section tone="sand">
        <SectionHead
          eyebrow="Accounting"
          title="Double entry, not a summary"
          lead="A chart of accounts a Tally-trained accountant recognises, postings generated from the loan events themselves, and statements that foot."
        />
        <div className="mt-s5 grid gap-s3 md:grid-cols-3">
          <Reveal stage={1}><Card title="Chart of accounts">Groups and ledgers in the shape an Indian accountant expects, with branch-wise cash and bank accounts.</Card></Reveal>
          <Reveal stage={2}><Card title="GST and TDS">Output GST on fees with the CGST/SGST/IGST split, TDS receivable tracked against certificates.</Card></Reveal>
          <Reveal stage={3}><Card title="Statements">Trial balance, profit and loss, and a balance sheet that refuses to render if it does not foot — rather than rendering and being wrong.</Card></Reveal>
        </div>
      </Section>

      <Section>
        <SectionHead
          eyebrow="Implementation"
          title="What a pilot actually looks like"
          lead="Reducing perceived risk moves more decisions in this market than another feature does, so here is the shape of it rather than a promise about it."
        />
        <div className="mt-s5 grid gap-s3 md:grid-cols-3">
          <Reveal stage={1}><Card title="1 · Pilot">One branch, one or two products, a subset of the live book. Your schemes, your rates, your document templates on your letterhead.</Card></Reveal>
          <Reveal stage={2}><Card title="2 · Migration">Borrowers, loans, schedules and outstanding balances come across with their history. Opening balances are entered as an opening trial balance, so the books start reconciled.</Card></Reveal>
          <Reveal stage={3}><Card title="3 · Run">Parallel running for a cycle or two is normal and we plan for it. The point at which you stop is your call, not a project milestone.</Card></Reveal>
        </div>
        <Reveal className="mt-s5">
          <p className="max-w-prose text-[15px] leading-prose text-muted">
            Timelines depend on the state of the data you are migrating from, which is the honest
            answer — we would rather scope that with you than publish a number that turns out to be
            somebody else&rsquo;s.
          </p>
        </Reveal>
      </Section>

      <Section tone="sand">
        <Reveal className="flex flex-wrap items-center justify-between gap-s3 rounded-card border border-sand-border bg-card p-s6">
          <p className="max-w-prose text-[17px] leading-prose text-slate-mid">
            The fastest way to judge fit is to see it against your own product mix.
          </p>
          <ButtonLink href="/contact/">Request a demo</ButtonLink>
        </Reveal>
      </Section>
    </>
  );
}
