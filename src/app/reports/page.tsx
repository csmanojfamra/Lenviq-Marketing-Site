import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { Section, SectionHead, Card, ButtonLink } from "@/components/ui";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = pageMetadata({
  title: "NBFC reporting software — portfolio, collections, NPA",
  description:
    "Portfolio, collections, asset quality, gold and operations reporting. Each report answers one question, names its as-at date, and exports to Excel.",
  path: "/reports/",
});

/**
 * Each report carries THE QUESTION IT ANSWERS, not just its name.
 *
 * The page used to list twenty titles. A title tells a reader nothing they could act on — "SMA
 * Watch List" and "NPA Ageing" both sound like reports about bad loans, and only one of them is
 * about loans that are still recoverable. The question is the actual product: it is the field the
 * report catalogue holds against every entry, it is why the catalogue exists, and it is what a
 * credit head is deciding between when they choose which report to open.
 *
 * Every question below is the one recorded against that report in the product, not a marketing
 * restatement of it.
 */
const GROUPS: { name: string; items: [string, string][] }[] = [
  {
    name: "Portfolio",
    items: [
      ["AUM and loan portfolio", "What is the book worth right now, and how does it split by branch and product?"],
      ["Loan portfolio detail", "Everything held on each live loan, on one row."],
      ["Origination and disbursement", "How many applications were taken, approved and disbursed, how long did each take, and why were the rest rejected?"],
    ],
  },
  {
    name: "Collections",
    items: [
      ["Overdue collection", "Who is overdue, how much do they owe, and who do I call?"],
      ["Daily collection", "How much came in yesterday, by whom, and through which channel?"],
      ["NACH presentation", "What was presented to the banks, and what came back?"],
      ["Bounce register", "Which mandates and cheques dishonoured, for what reason, and who bounces repeatedly?"],
      ["PDC register", "Which post-dated cheques are held, and which are due for presentation?"],
      ["Recovery", "What was recovered from written-off and NPA accounts, through which channel?"],
    ],
  },
  {
    name: "Asset quality",
    items: [
      ["SMA watch list", "Which accounts are sliding towards NPA and are still recoverable?"],
      ["NPA ageing", "Which accounts are non-performing, in which bucket, and for how long?"],
      ["Provision movement", "What provision is required, what is held, and how did it move?"],
      ["Write-off register", "What was written off, when, and how much has come back since?"],
      ["Large borrower (CRILC)", "Which borrowers cross the CRILC threshold, and what is the aggregate exposure to each?"],
    ],
  },
  {
    name: "Gold and OD/CC",
    items: [
      ["Gold holdings", "What gold is held, at what LTV, and against how much lending?"],
      ["Gold renewal pipeline", "Which gold loans are approaching maturity and need renewal or auction?"],
      ["OD/CC portfolio", "How are the overdraft and cash-credit limits being used, and which are out of order?"],
    ],
  },
  {
    name: "Operations",
    items: [
      ["Penal charges", "What was levied, collected, waived or deferred — and by whom?"],
      ["Sanction condition (PDD) register", "Which post-disbursement documents are still outstanding, and for how long?"],
      ["Disbursement register", "What was disbursed, to whom, and through which instrument?"],
    ],
  },
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
              <Card title={g.name} as="h2">
                <ul className="space-y-s2">
                  {g.items.map(([name, question]) => (
                    <li key={name}>
                      <span className="font-medium text-ink">{name}</span>
                      <span className="block text-[14px] leading-relaxed text-muted">{question}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHead
          eyebrow="Why it is built this way"
          title="A report is only worth what its date is worth"
          lead="Reporting in a lending business is not a dashboard problem. It is the question of whether two people asking the same thing on the same afternoon get the same answer — and whether either of them can say what that answer is as at."
        />
        <div className="mt-s4 max-w-prose space-y-s3 text-[16px] leading-prose text-slate-mid">
          <p>
            Most NBFC reporting is assembled rather than produced: figures pulled from the loan
            system into a spreadsheet, adjusted for what the accountant knows the system does not
            handle, and circulated. It works until somebody asks how a number was arrived at, or
            until the same report is run twice and disagrees with itself.
          </p>
          <p>
            The alternative is not more reports. It is that every figure traces back to the postings
            that produced it, that the position a report was built on is stated on its face, and
            that the report is served from a prepared view rather than by querying the live
            transactional tables — which is what keeps a month-end close from being slowed down by
            the person running the board pack.
          </p>
          <p>
            That is also why the regulatory returns are not a separate exercise here. A return
            assembled by hand will eventually disagree with the ledger, and the disagreement
            surfaces in front of the regulator rather than before.
          </p>
        </div>
      </Section>

      <Section tone="sand">
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
