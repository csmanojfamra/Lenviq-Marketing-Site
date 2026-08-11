import type { Metadata } from "next";
import Link from "next/link";
import { Section, SectionHead, Spec, Card, ButtonLink } from "@/components/ui";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: "RBI compliance in a lending system — what Lenviq implements",
  description:
    "The Key Facts Statement, penal charges as charges, day-end IRAC classification, SMA buckets, CKYC and bureau reporting — each with the direction it comes from and its date.",
  alternates: { canonical: "/compliance/" },
};

/**
 * The strongest page on the site, and the one a prospect will check line by line.
 *
 * Every entry names the direction and its date, so it CAN be checked — which is the whole reason
 * this works. Where the product implements part of a requirement, it says which part. Where a
 * position is a matter of the lender's own board policy rather than something software decides, it
 * says that instead of claiming it.
 *
 * The claims list in bugs/REPORT4_STATUS_AUDIT.md carries what backs each line.
 */
const POSITIONS = [
  {
    term: "Key Facts Statement",
    cite: "RBI/2024-25/18 DOR.STR.REC.13/13.03.00/2024-25, 15 April 2024 — applies to new retail and MSME term loans sanctioned on or after 1 October 2024",
    body: (
      <>
        The KFS is generated from the loan&rsquo;s own sanctioned terms rather than typed, and the{" "}
        <strong className="font-semibold text-ink">annual percentage rate is computed from the
        actual cash flows including fees</strong> — not restated from the nominal rate. It carries
        the loan type, the disbursal schedule, when repayment commences, the split of charges
        between the lender and third parties — which form part of the APR and are disclosed separately
        — the switching charge, the recovery-agent and
        grievance clauses, the nodal officer&rsquo;s contact, and the answers on transfer,
        securitisation and co-lending.
      </>
    ),
  },
  {
    term: "Penal charges, not penal interest",
    cite: "RBI/2023-24/53 DoR.MCS.REC.28/01.01.001/2023-24, 18 August 2023, as extended by RBI/2023-24/102 of 29 December 2023 — fresh loans from 1 April 2024, existing loans by 30 June 2024",
    body: (
      <>
        Penal amounts are levied as <strong className="font-semibold text-ink">charges</strong>. They
        do not compound, they are never added to principal, and no interest accrues on them. They
        post to the general ledger on a receipt basis and settle first-in-first-out. The distinction
        is structural rather than a label: there is no code path that can capitalise one.
      </>
    ),
  },
  {
    term: "IRAC classification at day-end",
    cite: "RBI/2021-2022/125 DOR.STR.REC.68/21.04.048/2021-22, 12 November 2021",
    body: (
      <>
        Days-past-due and asset classification are computed from the{" "}
        <strong className="font-semibold text-ink">day-end position</strong>, in a scheduled batch —
        never on a user&rsquo;s request. A report run at 11am and one run at 6pm describe the same
        day, which is the point of the clarification and the thing an intra-day computation quietly
        breaks.
      </>
    ),
  },
  {
    term: "Upgrade only on full clearance",
    cite: "RBI/2021-2022/125, 12 November 2021",
    body: (
      <>
        An account classified as non-performing is upgraded to standard only when{" "}
        <strong className="font-semibold text-ink">the entire arrears of interest and principal are
        paid</strong> — not on part payment, and not on the borrower merely resuming instalments.
      </>
    ),
  },
  {
    term: "SMA buckets",
    cite: "RBI/2021-2022/125, 12 November 2021",
    body: (
      <>
        SMA-0, SMA-1 and SMA-2 are derived from the same day-end DPD, and the watch list is a report
        rather than a spreadsheet somebody maintains. The bucket boundaries follow the circular.
      </>
    ),
  },
  {
    term: "Income reversal on NPA",
    cite: "Master Circular — income recognition",
    body: (
      <>
        On classification as non-performing, interest accrued but not collected is reversed to a
        suspense account, and income is recognised on a receipt basis from that date. The reversal
        is a posting, not an adjustment: it is visible in the ledger with its own entry.
      </>
    ),
  },
  {
    term: "Pre-payment charges",
    cite: "RBI/2025-26/64 — Reserve Bank of India (Pre-payment Charges on Loans) Directions, 2025, 2 July 2025, applying to all loans and advances sanctioned or renewed on or after 1 January 2026",
    body: (
      <>
        No pre-payment charge is levied on a loan to an individual for a purpose other than
        business — in part or in full, with or without a lock-in, irrespective of the source of
        funds, and <strong className="font-semibold text-ink">whatever the rate type</strong>. On
        business-purpose loans to individuals and micro and small enterprises the bar is tiered by
        named lists: an Upper Layer NBFC is barred outright, a Middle Layer NBFC up to a sanctioned
        limit of ₹50 lakh. A Base Layer NBFC is named in neither, and a medium enterprise is not a
        micro or small one — both fall to paragraph 6, where the charge is the lender&rsquo;s own
        board-approved policy.{" "}
        <strong className="font-semibold text-ink">We do not read the omission as a prohibition</strong>,
        because enforcing a rule the regulator did not make is its own kind of wrong. The system
        decides all of this from the borrower&rsquo;s constitution and MSME classification, the
        purpose, the sanction date and the lender&rsquo;s own layer —{" "}
        <strong className="font-semibold text-ink">not from what the scheme was configured to
        charge</strong> — and the reason travels with the quote, so a borrower quoted nil can see
        why.
      </>
    ),
  },
  {
    term: "CKYC",
    cite: "Prevention of Money-laundering Act, 2002 s.12 and the Maintenance of Records rules; CERSAI",
    body: (
      <>
        CKYC records are assembled and exported for upload, with the status of each record tracked.
        Aadhaar is stored masked to the last four digits and the full number is never persisted.
      </>
    ),
  },
  {
    term: "Credit information reporting",
    cite: "RBI/DoR/2024-25/125 — Master Direction (Credit Information Reporting) Directions, 2025, 6 January 2025, which repealed the August 2024 circular on reporting frequency",
    body: (
      <>
        Submission files are assembled for CIBIL, CRIF High Mark, Experian and Equifax, each record
        carrying the twenty-four month payment history the formats require. Rejections come back
        into the system, are resolved against the underlying account and are resubmitted.{" "}
        <strong className="font-semibold text-ink">Reporting is fortnightly by default</strong> — as
        on the 15th and the last day of each month, with the due date computed as seven calendar
        days from the reporting date, which is what the Master Direction requires. Each fortnight is
        assembled as its own batch and the 24-month history it carries stays monthly, because that
        is what the bureau formats define. A monthly cycle remains selectable for a lender not yet
        filing twice a month, and the screen says which of the two is compliant rather than leaving
        it to be discovered.
      </>
    ),
  },
  {
    term: "RBI returns",
    cite: "DNBS filing requirements",
    body: (
      <>
        DNBS-2, DNBS-10, DNBS-13, CRILC and the priority-sector statement are produced from the
        book, with the quarterly financials entered once and drawn from the general ledger rather
        than retyped. Each return says whether its loan figures are the month-end position or
        today&rsquo;s.
      </>
    ),
  },
] as const;

export default function CompliancePage() {
  return (
    <>
      <Section className="pt-s7">
        <Reveal>
          <p className="text-[13px] font-semibold uppercase tracking-wide text-cta">Compliance</p>
          <h1 className="mt-s2 max-w-4xl text-[34px] font-extrabold leading-[1.1] tracking-display-tight text-ink sm:text-[46px]">
            Every position below names the direction it comes from.
          </h1>
          <p className="mt-s4 max-w-prose text-[18px] leading-prose text-slate-mid">
            That is deliberate. A compliance head can check each line against the circular rather
            than take it on trust — and a vendor who is willing to be checked is telling you
            something a page of adjectives cannot.
          </p>
        </Reveal>
      </Section>

      <Section tone="sand">
        <dl className="border-b border-line">
          {POSITIONS.map((p) => (
            <Reveal key={p.term}>
              <Spec term={p.term}>
                {p.body}
                <p className="mt-s2 text-[13px] text-muted">{p.cite}</p>
              </Spec>
            </Reveal>
          ))}
        </dl>
      </Section>

      {/*
        What is NOT claimed. An empty section beats a fabricated one, and a page that only lists
        wins is a page a compliance professional discounts entirely.
      */}
      <Section>
        <SectionHead
          eyebrow="What this page does not claim"
          title="The boundaries, stated"
          lead="Software implements a position; it does not make a lender compliant. These are the lines we do not cross in describing it."
        />
        <div className="mt-s5 grid gap-s3 md:grid-cols-3">
          <Reveal stage={1}>
            <Card title="Board policy is yours">
              Rate structures, the penal charge quantum, waiver authority and the fair practices code
              are the lender&rsquo;s decisions. The system enforces what you configure and records
              who configured it.
            </Card>
          </Reveal>
          <Reveal stage={2}>
            <Card title="Not a certification">
              Nothing here is a legal opinion or an assurance that a filing will be accepted. Your
              statutory auditor and your compliance officer remain the people who sign.
            </Card>
          </Reveal>
          <Reveal stage={3}>
            <Card title="Regulation moves">
              These citations are current as at the dates shown. Where a direction changes, the
              change lands in the product before it lands on this page — and this page is corrected,
              not quietly reworded.
            </Card>
          </Reveal>
        </div>
      </Section>

      <Section tone="sand">
        <Reveal className="rounded-card border border-sand-border bg-card p-s6">
          <h2 className="text-[26px] font-bold tracking-display text-ink">
            Read the longer pieces
          </h2>
          <p className="mt-s3 max-w-prose text-[16px] leading-prose text-slate-mid">
            The blog goes into the two positions lenders most often get wrong — how the Key Facts
            Statement computes its APR, and what treating penal amounts as charges actually changes
            in the ledger.
          </p>
          <div className="mt-s4 flex flex-wrap gap-s2">
            <ButtonLink href="/blog/">Read the blog</ButtonLink>
            <ButtonLink href="/contact/" variant="secondary">
              Request a demo
            </ButtonLink>
          </div>
          <p className="mt-s4 text-[14px] text-muted">
            Terms used above are defined in the{" "}
            <Link href="/glossary/" className="text-cta underline underline-offset-2 hover:text-cta-hover">
              glossary
            </Link>
            .
          </p>
        </Reveal>
      </Section>
    </>
  );
}
