import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import Link from "next/link";
import { Section, SectionHead, Spec, Card, ButtonLink } from "@/components/ui";
import { Reveal } from "@/components/reveal";
import { Shot } from "@/components/shot";

export const metadata: Metadata = pageMetadata({
  title: "NBFC compliance software for RBI lending rules",
  description:
    "The Key Facts Statement, penal charges as charges, day-end IRAC classification, SMA buckets, CKYC and bureau reporting — each with the direction it comes from.",
  path: "/compliance/",
});

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
    id: "kfs",
    short: "Every retail and MSME term loan gets a prescribed one-page statement, with an APR computed from the actual cash flows.",
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
    id: "penal",
    short: "A default charge is a charge, not interest — no compounding, no capitalisation, recognised on receipt.",
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
    term: "NBFC provisioning rates, not bank rates",
    id: "provisioning-rates",
    short: "A sub-standard asset takes 10% of the whole outstanding; a doubtful one is split, and the secured portion takes 20, 30 or 50% by age.",
    cite: "RBI/DOR/2025-26/356 — IRACP Directions, 2025",
    body: (
      <>
        The two tables are confused constantly, including by pages that publish one under the
        other&rsquo;s heading. A bank provides 25, 40 and 100% on the secured portion of a doubtful
        asset; an NBFC provides{" "}
        <strong className="font-semibold text-ink">20, 30 and 50%</strong>. Sub-standard is 10% of
        the whole outstanding whatever security is held — the split belongs to doubtful, where the
        secured portion takes the rate above and everything beyond the realisable value of the
        security takes 100%. That is a split, not a netting: security worth more than the loan does
        not reduce the provision to nothing.{" "}
        <Link href="/tools/nbfc-provisioning-calculator" className="underline decoration-line underline-offset-4 hover:text-ink">
          The calculator
        </Link>{" "}
        works an example either way.
      </>
    ),
  },
  {
    term: "The standard-asset rate follows the layer",
    id: "standard-provision-layer",
    short: "0.25% in the Base Layer and 0.40% in the Middle and Upper, with finer rates above the Base Layer for particular exposures.",
    cite: "RBI/DOR/2025-26/356 — IRACP Directions, 2025, read with the Scale Based Regulation Directions",
    body: (
      <>
        The standard book is the largest number an NBFC carries, so the rate against it is the
        largest provision on the balance sheet — and it is{" "}
        <strong className="font-semibold text-ink">not one rate</strong>. A Middle Layer lender
        holding the Base Layer&rsquo;s 0.25% is short by nearly two fifths. Lenviq applies the rate
        the tenant&rsquo;s layer carries. Above the Base Layer the Directions distinguish exposures
        further still — individual housing and SME at 0.25%, CRE residential housing at 0.75%, other
        CRE at 1.00%, teaser-rate housing at 2.00% in its first year — and that finer split needs an
        exposure classification the product does not yet record, so those rates are on the roadmap
        rather than in the engine.{" "}
        <Link href="/tools/nbfc-layer-finder" className="underline decoration-line underline-offset-4 hover:text-ink">
          Which layer applies
        </Link>{" "}
        is worked from the balance sheet, not chosen.
      </>
    ),
  },
  {
    term: "Classification is borrower-wise",
    id: "borrower-wise",
    short: "If one facility of a borrower is non-performing, every facility of that borrower is.",
    cite: "RBI/DOR/2025-26/356 — IRACP Directions, 2025",
    body: (
      <>
        The Directions are explicit that asset classification is{" "}
        <strong className="font-semibold text-ink">borrower-wise and not facility-wise</strong>. A
        borrower with a defaulted personal loan and a vehicle loan paid to the day has two
        non-performing assets, not one — and the second is provided for accordingly rather than
        sitting at the standard rate. It does not run the other way: a facility is not rescued
        because a sibling was repaid, since an upgrade needs the entire arrears across all of the
        borrower&rsquo;s facilities.
      </>
    ),
  },
  {
    term: "IRAC classification at day-end",
    id: "irac",
    short: "Classification is the position at the close of a named day, not a figure recomputed on demand.",
    cite: "RBI/DOR/2025-26/356 — RBI (Non-Banking Financial Companies — Income Recognition, Asset Classification and Provisioning) Directions, 2025, effective 28 November 2025, which consolidated the NBFC prudential norms and carries forward the day-end rule first clarified in RBI/2021-2022/125 of 12 November 2021",
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
    id: "upgrade",
    short: "An NPA returns to standard only when the entire arrears of interest and principal are paid.",
    cite: "RBI/DOR/2025-26/356 — IRACP Directions, 2025, restating the upgrade rule clarified in RBI/2021-2022/125 of 12 November 2021",
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
    id: "sma",
    short: "SMA-0, 1 and 2 are a reported position with day-one boundaries, not an internal early warning.",
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
    id: "income-reversal",
    short: "Interest already booked on an account that turns is reversed, and income moves to a receipt basis.",
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
    id: "prepayment",
    short: "Barred on floating-rate loans to individuals, and on business-purpose loans by lender tier.",
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
    id: "ckyc",
    short: "KYC records are filed with the Central Registry and fetched back on an existing identifier.",
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
    id: "cir",
    short: "Fortnightly submission, with the dispute and correction path the Directions require.",
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
    id: "returns",
    short: "DNBS returns built from the book itself rather than re-keyed from an extract.",
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

/**
 * Asked before a shortlist, every time — and answered here rather than in a call.
 *
 * Plain strings, because they also become the `FAQPage` block below and a JSX fragment cannot be
 * serialised into structured data.
 */
const FAQS = [
  {
    q: "Is Lenviq certified or approved by the RBI?",
    a: "No, and no lending software is. The Reserve Bank regulates lenders, not the software they buy. What a vendor can be held to is whether each position it implements matches the instrument it names, which is what this page is for.",
  },
  {
    q: "Does this make our NBFC compliant?",
    a: "It implements the positions above. Your board-approved policy, your scheme terms and the people who sign your returns are what make an NBFC compliant — a system can make the numbers right and can evidence how they were arrived at, and that is the part it is responsible for.",
  },
  {
    q: "What happens when a circular changes?",
    a: "The position changes with it and this page names the instrument that changed it — the penal charges row carries the December 2023 extension, and the credit information row carries the 2025 Directions that repealed the August 2024 circular. A page that quietly reworded itself would be worth less than one that says what moved.",
  },
  {
    q: "Can we see the classification a figure came from?",
    a: "Yes. Days past due, the classification it produced and the day it was computed on are held against the account, so a figure in a return can be opened back to the position it came from rather than recomputed and hoped to match.",
  },
  {
    q: "Which of these are configurable?",
    a: "The commercial choices — rate bands, charge amounts, penal grace, approval slabs. The regulatory positions are not: an SMA boundary or a ninety-day trigger that a tenant could move is a setting that produces a wrong return.",
  },
  {
    q: "Do you hold ISO 27001, SOC 2 or PCI DSS?",
    a: "No. The security page states what is and is not in place rather than implying a certification we do not hold.",
  },
] as const;

export default function CompliancePage() {
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
        {/*
          * The heading answers the question; it used to describe the page.
          *
          * "Every position below names the direction it comes from" is a sentence about this page's
          * editorial habit, which is not what somebody searching for NBFC compliance software wants
          * from a first line. The nearest comparable vendor, LendSphere, heads the same page "RBI
          * audit-ready operations and compliance controls" — an outcome. The citation discipline is
          * still the differentiator here, so it keeps the sentence under the heading rather than
          * the heading itself.
          *
          * The count is derived. A hand-typed "ten" is a number that goes stale the first time an
          * eleventh position is added.
          */}
        <Reveal>
          <p className="text-[13px] font-semibold uppercase tracking-wide text-cta">Compliance</p>
          <h1 className="mt-s2 max-w-4xl text-[34px] font-extrabold leading-[1.1] tracking-display-tight text-ink sm:text-[46px]">
            {POSITIONS.length} RBI positions, and the direction each one comes from.
          </h1>
          <p className="mt-s4 max-w-prose text-[18px] leading-prose text-slate-mid">
            A compliance head can check every line below against the circular rather than take it on
            trust. Each one names the instrument, its number and its date — and where a rule changed,
            the circular that changed it.
          </p>
        </Reveal>

        {/*
          * The whole page in one table, before the detail.
          *
          * It was ten definition rows of prose, so somebody who came to find out one thing — does it
          * do SMA, does it handle the prepayment Directions — had to read the other nine to get
          * there. The table answers that in a scan and links into the row that explains it.
          */}
        <Reveal>
          <div className="mt-s6 overflow-x-auto">
            <table className="w-full min-w-[40rem] border-collapse text-[15px]">
              <caption className="sr-only">The RBI positions this software implements</caption>
              <thead>
                <tr className="border-b border-line text-left text-[13px] uppercase tracking-wide text-muted">
                  <th className="pb-2 pr-4 font-medium">Position</th>
                  <th className="pb-2 pr-4 font-medium">What it requires</th>
                  <th className="pb-2 font-medium">Instrument</th>
                </tr>
              </thead>
              <tbody>
                {POSITIONS.map((p) => (
                  <tr key={p.id} className="border-b border-line/60 align-top">
                    <td className="py-3 pr-4">
                      <a
                        href={`#${p.id}`}
                        className="font-medium text-cta underline-offset-4 hover:underline"
                      >
                        {p.term}
                      </a>
                    </td>
                    <td className="py-3 pr-4 leading-relaxed text-slate-mid">{p.short}</td>
                    <td className="py-3 text-[14px] leading-relaxed text-muted">
                      {p.cite.split("—")[0].trim()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
      </Section>

      <Section id="positions" tone="sand">
        <dl className="border-b border-line">
          {POSITIONS.map((p) => (
            <Reveal key={p.term}>
              <div id={p.id} className="scroll-mt-24">
              <Spec term={p.term}>
                {p.body}
                <p className="mt-s2 text-[13px] text-muted">{p.cite}</p>
              </Spec>
              </div>
            </Reveal>
          ))}
        </dl>
      </Section>

      {/*
        These three were disclaimers — "board policy is yours", "not a certification", "regulation
        moves". Each said something true, but three cards of what the product is NOT is a lot of
        negative space on the page a compliance head reads to decide whether to shortlist us, and
        the third ("this page is corrected, not quietly reworded") was a promise about how we edit
        our own website: our internal discipline, not their concern.
        
        Every comparable vendor page states capabilities and no caveats at all. Going the other way
        entirely would cost the honesty this page is built on, so the boundaries stay — stated as
        the capability that implements each one. The legal reservation is a line at the foot, where
        it belongs, rather than a third of the section.
      */}
      {/*
        * The evidence, shown rather than described.
        *
        * A compliance page is a page of claims, and a claim about software is worth what the screen
        * behind it is worth. These are generated from the running product against a demonstration
        * book, so the picture and the paragraph cannot drift apart.
        */}
      <Section id="classification" tone="sand">
        <SectionHead
          eyebrow="What it looks like"
          title="The classification, and what it was computed from"
          lead="DPD, SMA staging and NPA are produced by a scheduled day-end job — never by somebody pressing something — and every figure traces back to the due events it came from."
        />
        <Shot
          name="loan-accounts"
          alt="The Lenviq loan accounts screen showing each account with its status, days past due, outstanding balance and asset classification"
          caption="Every live account with the classification the regulatory return will report — one engine, and no per-product branch."
        />
        <Shot
          name="rbi-returns"
          alt="The Lenviq RBI returns screen listing each return with the period it covers, its status and its due date"
          caption="Returns are generated from the book as at the reporting date, not typed into a template."
        />
        <p className="mt-s4 max-w-prose text-[16px] leading-prose text-slate-mid">
          Every screen that shows a figure from a materialised view says when it was last rebuilt. A
          number with no timestamp invites the reader to treat it as live, which is how a stale
          figure ends up in a decision.
        </p>
        <p className="mt-s4">
          <ButtonLink href="/help/see-asset-quality/" variant="secondary">
            How classification is produced
          </ButtonLink>
        </p>
      </Section>

      <Section id="controls">
        <SectionHead
          eyebrow="How the positions are held"
          title="Configured by you, enforced by the system, evidenced afterwards"
          lead="A regulatory position is only worth as much as the record that it was applied. These are the three mechanisms every line above depends on."
        />
        <div className="mt-s5 grid gap-s3 md:grid-cols-3">
          <Reveal stage={1}>
            <Card title="Your policy, enforced as configured">
              Rate structures, the penal charge quantum, waiver authority and the fair practices
              code are the lender&rsquo;s decisions, taken by the lender&rsquo;s board. The system
              holds what you configure, applies it to every account without exception, and records
              who configured it and when.
            </Card>
          </Reveal>
          <Reveal stage={2}>
            <Card title="Terms frozen at sanction">
              A scheme is versioned, and a loan carries the version it was sanctioned on. Changing
              the master next quarter cannot restate what an existing borrower was told — so the
              agreement, the Key Facts Statement and the schedule keep saying the same thing years
              later.
            </Card>
          </Reveal>
          <Reveal stage={3}>
            <Card title="Every position dated to its direction">
              Each line above names the circular it comes from and the date it carries. When a
              direction is superseded the citation changes with it, so a compliance officer can
              check the page against the source rather than take it on trust.
            </Card>
          </Reveal>
        </div>
        <Reveal className="mt-s4">
          <p className="max-w-prose text-[14px] leading-prose text-slate-mid">
            Software implements a position; it does not make a lender compliant. Nothing on this
            page is a legal opinion or an assurance that any filing will be accepted &mdash; your
            statutory auditor and your compliance officer remain the people who sign.
          </p>
        </Reveal>
      </Section>

      {/*
        * The questions a compliance head actually asks before a shortlist.
        *
        * The blog posts carry an FAQ and this page did not, though it is the page those questions
        * get asked on. It also emits FAQPage, which is the shape an answer engine lifts.
        */}
      <Section id="questions">
        <SectionHead eyebrow="Questions" title="What a compliance head asks first" />
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

      <Section id="reading" tone="sand">
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
