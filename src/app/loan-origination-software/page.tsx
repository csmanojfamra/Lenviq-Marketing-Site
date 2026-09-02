import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { Section, SectionHead, Spec, ButtonLink } from "@/components/ui";
import { Reveal } from "@/components/reveal";
import { Shot } from "@/components/shot";

/**
 * Loan origination, as its own page — and the risk this page carries is the doorway pattern.
 *
 * `/platform` describes the whole lifecycle and gives origination one line per stage. This page is
 * only worth existing if it says what that line compresses. The test applied to every sentence:
 * does it belong to the half BEFORE the loan exists? A sentence about accrual, classification or
 * collections belongs on the loan management page, not here, however well it reads.
 *
 * Where the two halves meet is disbursement, and both pages say so rather than each quietly
 * claiming it.
 */
export const metadata: Metadata = pageMetadata({
  title: "Loan origination software (LOS) for NBFCs",
  description:
    "Loan origination software for NBFCs: lead to disbursement, with the parties, collateral, bureau and approval behind every decision on the file.",
  path: "/loan-origination-software/",
});

/** Before the loan exists. Each of these is a line on the Platform page, opened up. */
const STAGES: [string, string][] = [
  ["Lead and enquiry", "Captured with a source, assigned to someone, and carried forward — so the application that follows starts from what was already said rather than from a blank form. Turnaround is visible per stage, which is the only way to know where files actually sit."],
  ["The borrower as a party", "A party record, not fields on an application. Individuals and entities, co-applicants and guarantors, each with the KYC their constitution actually requires — a company needs its directors and beneficial owners, a HUF its karta, a proprietorship the proprietor whose PAN the bureau is pulled against."],
  ["Collateral", "Valued under its own rules before it can support a sanction. Gold by purity and net weight against an approved daily rate with a thirty-day look-back; property by a technical valuation on a realisable basis with the legal check recorded against it. The eligible value, not the market value, is what the loan is sized against."],
  ["Credit and bureau", "The pull is recorded against the application with the report attached, so the decision can be re-read later against what was actually seen. Income and obligations are assessed into a ratio whose workings are stored rather than a number someone typed."],
  ["Deviations and approval", "A deviation carries the level of approval it needs, and an approval matrix routes by sanctioned amount through its slabs. What was waived, by whom, and against which policy is part of the file."],
  ["Sanction", "The scheme's terms are snapshotted onto the loan at sanction. A later change to the scheme master cannot reach back and alter a loan already sanctioned — which is the difference between a system that can be audited and one that cannot."],
  ["Documentation", "The pack generated from the loan's own terms: application, the agreement for that asset class, the Key Facts Statement with an APR computed from the actual cash flows, promissory note, mandate — on your letterhead, with the borrower declaration in fourteen languages."],
  ["Disbursement", "Maker-checker: the person who prepares is never the person who releases. The funding instrument is recorded, and the accounting entry posts as it happens rather than at month end. This is where origination ends."],
];

const FAQS = [
  {
    q: "What is a loan origination system, and where does it stop?",
    a: "It is everything before the loan exists — lead, application, KYC, collateral, bureau, underwriting, approval, documentation — ending at disbursement. What happens afterwards, from the first instalment to closure, is loan management. The handover is disbursement, and a system that does one half leaves the other in spreadsheets.",
  },
  {
    q: "Does it decide the credit, or does a person?",
    a: "A person. The system holds the bureau report against the file, computes the ratios and shows its workings, routes the file by amount through the approval slabs, and records what was deviated and who allowed it. It does not approve anything on its own — an origination system that hides how a decision was reached is worth less than the decision.",
  },
  {
    q: "Can the scheme change after a loan is sanctioned?",
    a: "The master can change; the sanctioned loan cannot. Terms are snapshotted onto the loan at sanction, so a rate band edited next quarter does not reach back into a loan booked last quarter. Without that, no historical figure in the book can be defended.",
  },
  {
    q: "What does it produce at disbursement?",
    a: "The sanction and disbursement pack from the loan's own terms, a maker-checker release, and the accounting entry — the loan asset and the bank credit posted on the disbursement date rather than at month end.",
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
        <p className="text-[13px] font-semibold uppercase tracking-eyebrow text-slate-mid">Loan origination</p>
        <h1 className="mt-s2 max-w-4xl text-[34px] font-extrabold leading-[1.1] tracking-display-tight text-ink sm:text-[46px]">
          Loan origination software, from the enquiry to the release.
        </h1>
        <p className="mt-s4 max-w-prose text-[18px] leading-prose text-slate-mid">
          Origination is the half of lending that happens before there is a loan. A lead becomes an
          application, the people behind it become party records, the security is valued, the bureau
          is read, someone approves it against a policy, and the pack is generated — and every one of
          those has to be reconstructable afterwards, because that is what an auditor asks for.
        </p>
        <p className="mt-s3 max-w-prose text-[17px] leading-prose text-slate-mid">
          This page is the origination half. What happens after the money leaves is on the{" "}
          <Link href="/loan-management-system/" className="underline decoration-line underline-offset-4 hover:text-ink">
            loan management system
          </Link>{" "}
          page, and the two meet at disbursement.
        </p>
        <div className="mt-s5 flex flex-wrap gap-s3">
          <ButtonLink href="/contact/">Talk to us about your file flow</ButtonLink>
          <ButtonLink href="/platform/" variant="secondary">The whole system</ButtonLink>
        </div>
      </Section>

      <Section id="stages">
        <SectionHead eyebrow="The file" title="Lead to disbursement, stage by stage" />
        <div className="mt-s5 grid gap-s4 sm:grid-cols-2">
          {STAGES.map(([t, b]) => <Reveal key={t}><Spec term={t}>{b}</Spec></Reveal>)}
        </div>
        <Shot
          name="application-stages"
          alt="An application record in Lenviq showing the stages it has passed through and where it currently sits"
          caption="Turnaround per stage is the number that tells you where files actually sit, and it is not one anybody types in."
          priority
        />
      </Section>

      <Section id="evidence" tone="sand">
        <SectionHead
          eyebrow="Why it holds up later"
          title="An origination file is read twice: once to approve, once to defend"
        />
        <div className="mt-s5 grid gap-s4 sm:grid-cols-2">
          <Reveal><Spec term="Every mutation is written down">Who, when, and the before and after. Sanction, disbursement and rejection are immutable events — a correction is a reversing entry, never an edit.</Spec></Reveal>
          <Reveal><Spec term="Maker-checker where it matters">Master activation and disbursement both. The person who prepares is never the person who releases, which is the control an inspection looks for first.</Spec></Reveal>
          <Reveal><Spec term="The bureau report, not a score">Attached to the application, so the decision can be re-read against what was seen rather than against what was remembered.</Spec></Reveal>
          <Reveal><Spec term="The terms as sanctioned">Snapshotted onto the loan, so a figure from two years ago can still be explained by the terms that produced it.</Spec></Reveal>
        </div>
      </Section>

      <Section id="questions">
        <SectionHead eyebrow="Questions" title="What lenders ask about origination" />
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
