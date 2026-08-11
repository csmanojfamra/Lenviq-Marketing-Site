import type { Metadata } from "next";
import { Section, SectionHead, Card, ButtonLink } from "@/components/ui";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: "NBFC MIS reports — portfolio, collections, asset quality",
  description:
    "Nineteen reports covering portfolio, collections, asset quality, gold and operations. Each answers one question, exports to Excel, and masks personal identifiers by default.",
  alternates: { canonical: "/reports/" },
};

const GROUPS = [
  { name: "Portfolio", items: ["AUM and loan portfolio", "Loan portfolio detail", "Origination and disbursement"] },
  { name: "Collections", items: ["Overdue collection", "Daily collection", "NACH presentation", "Bounce register", "PDC register", "Recovery"] },
  { name: "Asset quality", items: ["NPA ageing", "Provision movement", "Write-off register", "SMA watch list", "Large borrower (CRILC)"] },
  { name: "Gold and OD/CC", items: ["Gold holdings", "Gold renewal pipeline", "OD/CC portfolio"] },
  { name: "Operations", items: ["Penal charges", "Sanction condition (PDD) register", "Disbursement register"] },
];

export default function ReportsPage() {
  return (
    <>
      <Section className="pt-s7">
        <Reveal>
          <p className="text-[13px] font-semibold uppercase tracking-wide text-cta">Reports</p>
          <h1 className="mt-s2 max-w-4xl text-[34px] font-extrabold leading-[1.1] tracking-display-tight text-ink sm:text-[46px]">
            The reports you are asked for, already built.
          </h1>
          <p className="mt-s4 max-w-prose text-[18px] leading-prose text-slate-mid">
            Not a chart builder. Each report answers one question a lender, an auditor or the board
            actually asks, and each one names the date its figures are as at — because a
            month-end number and a today number are different answers.
          </p>
        </Reveal>
      </Section>

      <Section tone="sand">
        <div className="grid gap-s3 md:grid-cols-2 lg:grid-cols-3">
          {GROUPS.map((g, i) => (
            <Reveal key={g.name} stage={((i % 4) + 1) as 1 | 2 | 3 | 4}>
              <Card title={g.name}>
                <ul className="space-y-1">
                  {g.items.map((x) => <li key={x}>{x}</li>)}
                </ul>
              </Card>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHead
          eyebrow="How they behave"
          title="The parts that matter once you rely on them"
        />
        <div className="mt-s5 grid gap-s3 md:grid-cols-3">
          <Reveal stage={1}><Card title="As-at, stated">A report built on the day-end position says so. One built on the live book says that instead. Mixing the two silently is how two people bring different numbers to the same meeting.</Card></Reveal>
          <Reveal stage={2}><Card title="Scoped">Every report is filtered by the acting user's data scope. There is no &ldquo;all branches&rdquo; toggle that quietly ignores it.</Card></Reveal>
          <Reveal stage={3}><Card title="Masked on export">Personal identifiers are masked in exports by default. The exceptions are named, each behind its own permission.</Card></Reveal>
        </div>
        <Reveal className="mt-s5">
          <ButtonLink href="/contact/">Ask for a walk-through</ButtonLink>
        </Reveal>
      </Section>
    </>
  );
}
