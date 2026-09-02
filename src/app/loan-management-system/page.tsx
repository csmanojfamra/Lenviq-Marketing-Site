import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { Section, SectionHead, Spec, ButtonLink } from "@/components/ui";
import { Reveal } from "@/components/reveal";
import { Shot } from "@/components/shot";

/**
 * Loan management, as its own page — the other half of the pair, and under the same doorway risk.
 *
 * Every sentence here belongs to the half AFTER the money has left. A sentence about KYC, bureau or
 * approval slabs belongs on the origination page. What this page has that neither `/platform` nor
 * the origination page does is the arithmetic: what accrues nightly, what turns on day 91, what is
 * reversed, what is provided, and where each of those lands in the ledger.
 */
export const metadata: Metadata = pageMetadata({
  title: "Loan management system (LMS) for NBFCs",
  description:
    "Loan management software for NBFCs: nightly accrual, day-end DPD and NPA, income reversal, provisioning at the NBFC rates, and the accounting under it.",
  path: "/loan-management-system/",
});

/** After the money has left. Each of these is a line on the Platform page, opened up. */
const SERVICING: [string, string][] = [
  ["Schedules and repayment shapes", "Seven of them, because a gold loan repaid in one bullet and a twenty-year mortgage on a reducing balance do not amortise alike. The schedule is generated from the sanctioned terms and the EMI is rounded to the rupee, with the difference carried to the last instalment."],
  ["Interest, nightly", "Accrued on the balance actually outstanding that day. A gold loan is priced by the age slab it has reached, with the day-0 rate held for a borrower who is servicing; a cash credit accrues on what was drawn, actual over 365. Both are written to the books monthly rather than as a voucher a day."],
  ["Charges, and penal charges as charges", "A default charge is a charge, not interest — never compounded, never added to principal, and posted to the ledger when it is received rather than when it is levied, which is what the April 2024 rules require."],
  ["Receipts and appropriation", "Applied in the order the scheme sets, with part payment and foreclosure handled as their own events. A receipt that the network retries does not post twice."],
  ["Collections", "Allocation and follow-up, and a field app that works without a signal — a collection taken at the gate queues on the phone and posts once when it reconnects, because money that changed hands cannot be un-taken."],
  ["Day-end classification", "DPD, SMA-0/1/2 and NPA computed in the day-end batch for a named date, never on request. A report run at 11am and one run at 6pm describe the same day."],
  ["What happens on day 91", "Interest accrued but not collected is reversed out of income into suspense, and from then it reaches the profit and loss only when it is actually received. Classification is borrower-wise: a borrower's other facilities turn with it."],
  ["Provisioning", "At the NBFC rates rather than the bank ones — 10% on a sub-standard asset, and a doubtful exposure split with the secured portion at 20, 30 or 50% by age and everything above it at 100%. The standard-asset rate follows the layer your NBFC is in."],
  ["Closure", "Foreclosure, full closure and the no-dues letter, with the security released and the charge satisfaction recorded — the last thing a borrower remembers about a lender."],
];

const FAQS = [
  {
    q: "What is a loan management system, and where does it start?",
    a: "It starts at disbursement. Everything before that — lead, KYC, collateral, bureau, approval — is loan origination. An LMS services what already exists: schedules, receipts, interest, charges, collections, classification, provisioning and closure.",
  },
  {
    q: "Does it do the accounting, or feed a separate ledger?",
    a: "It does the accounting. Loan events generate double-entry vouchers into a chart of accounts an Indian accountant recognises, dated on the day the event happened rather than the day the batch ran. A trial balance that foots is the test — a system whose figures have to be re-keyed has moved the reconciliation, not removed it.",
  },
  {
    q: "How is NPA classification computed?",
    a: "In the day-end batch, for the calendar date the batch is run for, from the due events the loan actually generated. One engine serves every product: gold, term and cash credit differ by the dues they raise, not by having their own classification path — two paths is how two answers appear.",
  },
  {
    q: "What happens to interest already booked when an account turns bad?",
    a: "It is reversed out of income into interest suspense on the day of classification, and only what has actually been recognised is reversed — a product that accrues daily and posts monthly has run ahead of its own books, and reversing the whole accrued balance would take back more than income ever held.",
  },
  {
    q: "Can it run more than one product on one engine?",
    a: "Yes, and that is the design. Products differ by the due events they generate and the behaviour codes they bind to, not by having their own servicing code. A gold loan, a cash credit limit and a twenty-year mortgage share one accrual sweep, one DPD engine and one ledger.",
  },
];

export default function Page() {
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

      <Section className="pt-s7">
        <p className="text-[13px] font-semibold uppercase tracking-eyebrow text-slate-mid">Loan management</p>
        <h1 className="mt-s2 max-w-4xl text-[34px] font-extrabold leading-[1.1] tracking-display-tight text-ink sm:text-[46px]">
          Loan management, from the disbursement to the no-dues letter.
        </h1>
        <p className="mt-s4 max-w-prose text-[18px] leading-prose text-slate-mid">
          Once the money has left, lending becomes arithmetic that runs whether anyone opens the
          system or not. Interest accrues nightly, days past due count themselves, an account turns
          on the ninety-first day, income already booked has to come back out, and a provision has to
          stand against what is left. A loan management system is the thing that gets all of that
          right on a night nobody was watching.
        </p>
        <p className="mt-s3 max-w-prose text-[17px] leading-prose text-slate-mid">
          This page is the servicing half. What happens before the money leaves is on the{" "}
          <Link href="/loan-origination-software/" className="underline decoration-line underline-offset-4 hover:text-ink">
            loan origination
          </Link>{" "}
          page, and the two meet at disbursement.
        </p>
        <div className="mt-s5 flex flex-wrap gap-s3">
          <ButtonLink href="/contact/">Talk to us about your book</ButtonLink>
          <ButtonLink href="/platform/" variant="secondary">The whole system</ButtonLink>
        </div>
      </Section>

      <Section id="servicing">
        <SectionHead eyebrow="The book" title="Disbursement to closure" />
        <div className="mt-s5 grid gap-s4 sm:grid-cols-2">
          {SERVICING.map(([t, b]) => <Reveal key={t}><Spec term={t}>{b}</Spec></Reveal>)}
        </div>
        <Shot
          name="loan-account"
          alt="A loan account in Lenviq showing the outstanding position, the schedule and the account's history"
          caption="The position, the schedule and what has happened to the account are one record — not three reports that have to be reconciled."
          priority
        />
      </Section>

      <Section id="nightly" tone="sand">
        <SectionHead
          eyebrow="The night batch"
          title="What runs while nobody is looking"
          lead="These are scheduled jobs, not screens. A lender who has to remember to press something has a book that is wrong on the days they forget."
        />
        <div className="mt-s5 grid gap-s4 sm:grid-cols-2">
          <Reveal><Spec term="Accrual">Interest for the day, on every product, on the balance outstanding that day.</Spec></Reveal>
          <Reveal><Spec term="DPD and classification">Days past due, the SMA bucket, and NPA on the ninety-first — computed for the date the batch is run for.</Spec></Reveal>
          <Reveal><Spec term="Income reversal">On classification, accrued but uncollected interest leaves income for suspense, and returns only on receipt.</Spec></Reveal>
          <Reveal><Spec term="Provisioning">At each quarter end, against the requirement that stands — a provision is a balance, not a fresh entry every quarter.</Spec></Reveal>
        </div>
        <Shot
          name="accounting"
          alt="The accounting section in Lenviq showing vouchers generated from loan events"
          caption="Every one of those jobs leaves a voucher dated on the day the event happened, not the day the batch ran."
        />
      </Section>

      <Section id="questions">
        <SectionHead eyebrow="Questions" title="What lenders ask about servicing" />
        <dl className="mt-s5 max-w-prose">
          {FAQS.map((f) => (
            <Reveal key={f.q}>
              <div className="border-b border-line py-s4">
                <dt className="font-display text-[18px] font-bold tracking-display text-ink">{f.q}</dt>
                <dd className="mt-s2 text-[16px] leading-prose text-slate-mid">{f.a}</dd>
              </div>
            </Reveal>
          ))}
        </dl>
      </Section>
    </>
  );
}
