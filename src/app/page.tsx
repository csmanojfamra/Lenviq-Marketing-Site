import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/site";
import { Container, Section, SectionHead, Card, ButtonLink } from "@/components/ui";
import { Reveal } from "@/components/reveal";
import { HeroPortfolioCard } from "@/components/hero-portfolio-card";

export const metadata: Metadata = {
  title: "Lenviq — lending platform for Indian NBFCs",
  description:
    "Origination, loan management, accounting and RBI reporting for NBFCs. Built around the regulatory positions a lender is actually examined on.",
  alternates: { canonical: "/" },
};

/**
 * Every claim on this page corresponds to something that works in the product today.
 *
 * The claims list in `bugs/REPORT4_STATUS_AUDIT.md` sets out what backs each one. Nothing here is a
 * roadmap item described as shipped, and there are no counters, testimonials, customer logos or
 * uptime figures — not because the section would look empty, but because this buyer is a
 * compliance professional who will check, and an unverifiable claim costs more than an absent one.
 */
const MODULES = [
  {
    title: "Origination",
    body: "Lead to disbursement. Applications, co-applicants and guarantors, collateral, credit bureau pulls, sanction and the disbursement authority — with maker-checker where the money moves.",
  },
  {
    title: "Loan management",
    body: "Servicing, repayments, penal charges on a receipt basis, DPD and IRAC classification computed at day-end, provisioning and NPA movement.",
  },
  {
    title: "Accounting",
    body: "A Tally-compatible chart of accounts, double-entry postings from the loan events themselves, GST and TDS, trial balance, P&L and balance sheet.",
  },
  {
    title: "Documents",
    body: "The sanction and disbursement pack, generated from the loan's own terms — including the borrower declaration in fourteen languages.",
  },
];

const PRODUCT_LINES = [
  "Personal loans",
  "Business loans",
  "Vehicle loans",
  "Loans against property",
  "Gold loans",
];

const FAQ = [
  {
    q: "Is Lenviq a lender?",
    a: "No. Lenviq is software licensed to NBFCs. The lender of record is the NBFC; every document the system generates carries the NBFC's own letterhead, CIN and registered office.",
  },
  {
    q: "Which loan products does it support?",
    a: "Personal, business, vehicle, property and gold. Product behaviour binds to an asset class rather than to a product name, so a new scheme is configuration rather than a release.",
  },
  {
    q: "Does it handle multiple branches?",
    a: "Yes. Users hold a data scope — own, branch, region or tenant — and every list, report and export is filtered by it. A branch manager sees their branch.",
  },
  {
    q: "Can we get our data out?",
    a: "Yes. Reports export to Excel and CSV, and personal identifiers are masked in exports by default.",
  },
  {
    q: "What does onboarding involve?",
    a: "A pilot on a single branch with a subset of the book, then migration of the live portfolio. See the implementation notes on the Platform page.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* ---------------------------------------------------------------- hero */}
      <Section className="pt-s7 md:pt-s8">
        <div className="grid items-center gap-s6 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            {/*
              The headline addresses the LENDER, not the auditor.

              It read "The lending system your auditor can follow", and that was the same fault the
              product's login page was corrected for: a heading about the one person who never uses
              the thing. The auditor is a consequence of running a loan book, not the buyer of a
              system to run it with — leading with them makes the product sound like a compliance
              chore rather than the platform the business runs on.

              "Can follow" was also the weaker half. It claims the absence of confusion; it does not
              claim anything is there. "Show its working" is the same promise stated as a capability
              the product actually has — every figure traceable to the posting and the rule it came
              from — and it is a phrase every reader here learned in school.
            */}
            <Reveal stage={2} as="h1">
              <span className="mt-s3 block text-[38px] font-extrabold leading-[1.08] tracking-display-tight text-ink sm:text-[52px]">
                The lending system that can show its working.
              </span>
            </Reveal>
            <Reveal stage={3}>
              {/* Justified, with hyphenation on — an unhyphenated justified column at this measure
                  opens rivers of white space between the words. */}
              <p className="mt-s4 max-w-prose text-justify hyphens-auto text-[18px] leading-prose text-slate-mid">
                Origination, servicing, accounting and RBI reporting in one platform. Every posting
                is double-entry, the arithmetic does not drift, and every change records who made it
                and what it was before — so when a figure is questioned, the answer is in the system
                rather than in somebody&rsquo;s memory.
              </p>
            </Reveal>
            <Reveal stage={4}>
              <div className="mt-s5 flex flex-wrap gap-s2">
                <ButtonLink href="/contact/">Request a demo</ButtonLink>
                <ButtonLink href={SITE.appUrl} variant="secondary" external>
                  Login
                </ButtonLink>
              </div>
            </Reveal>
          </div>

          {/* The one deliberate piece of motion on the page: the product's own output. */}
          <Reveal stage={3} className="lg:justify-self-end lg:max-w-sm">
            <HeroPortfolioCard />
          </Reveal>
        </div>
      </Section>

      {/* ---------------------------------------------------------------- who */}
      <Section tone="sand">
        {/*
          This section used to be an exclusion — "one kind of company, not for everyone" — and the
          exclusion was doing no work the argument needed. What made it persuasive was the REASON
          underneath: depth comes from building to one rulebook instead of to a configurable
          abstraction of several. That reason is kept; the door-slamming is not.

          It now describes a SITUATION rather than a licence category. A lender who carries the loan
          on their own book and answers for how they do it recognises themselves in that sentence
          without first checking which schedule they are registered under.
        */}
        <SectionHead
          eyebrow="Who it is for"
          title="Built for India’s NBFCs, and the people who keep them compliant"
          lead="Lenviq is built around the rules an NBFC is examined against — the Master Directions, IRAC classification from the day-end position, the penal-charges regime, the returns. In general-purpose lending software those are things you configure and then defend; here they are the product itself, which is why the compliance work is specific rather than something you assemble."
        />
        <Reveal className="mt-s5 flex flex-wrap gap-s2">
          {PRODUCT_LINES.map((p) => (
            <span
              key={p}
              className="rounded-full border border-sand-border bg-card px-4 py-2 text-[14px] text-slate-mid"
            >
              {p}
            </span>
          ))}
        </Reveal>
      </Section>

      {/* ---------------------------------------------------------------- platform */}
      <Section id="platform">
        <SectionHead
          eyebrow="The platform"
          title="From loan file to final accounts, in one system"
          lead="Every loan event posts to the books as it happens, so the portfolio and the accounts are the same set of facts rather than two systems reconciled monthly."
        />
        <div className="mt-s5 grid gap-s3 md:grid-cols-2">
          {MODULES.map((m, i) => (
            <Reveal key={m.title} stage={((i % 4) + 1) as 1 | 2 | 3 | 4}>
              <Card title={m.title}>{m.body}</Card>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-s4">
          <Link href="/platform/" className="text-[15px] font-medium text-cta hover:text-cta-hover">
            The modules in depth →
          </Link>
        </Reveal>
      </Section>

      {/* ---------------------------------------------------------------- compliance */}
      <Section tone="sand">
        <SectionHead
          eyebrow="Compliance"
          title="The regulatory positions, implemented and citable"
          lead="Most lending software treats compliance as a reporting layer bolted on at the end. Here it is in the engine: the classification, the charge treatment and the disclosure are computed where the money is, not assembled at quarter-end."
        />
        <div className="mt-s5 grid gap-s3 md:grid-cols-3">
          <Reveal stage={1}>
            <Card title="Key Facts Statement">
              Generated from the loan&rsquo;s own terms, with the APR computed from the actual cash
              flows including fees — not from the nominal rate.
            </Card>
          </Reveal>
          <Reveal stage={2}>
            <Card title="Penal charges">
              Treated as charges, never as interest. They do not compound, they are not added to
              principal, and they post to the books on receipt.
            </Card>
          </Reveal>
          <Reveal stage={3}>
            <Card title="IRAC classification">
              DPD and asset classification computed from the day-end position, so a report run at
              11am and one run at 6pm describe the same day.
            </Card>
          </Reveal>
        </div>
        <Reveal className="mt-s4">
          <Link href="/compliance/" className="text-[15px] font-medium text-cta hover:text-cta-hover">
            Every position, with its citation →
          </Link>
        </Reveal>
      </Section>

      {/* ---------------------------------------------------------------- reports */}
      <Section>
        <SectionHead
          eyebrow="Reports"
          title="The reports a lender is asked for, not a chart builder"
          lead="Portfolio, collections, asset quality, gold and operations — each report answering one question, naming the date its figures are as at, exportable, and masking personal identifiers by default."
        />
        <Reveal className="mt-s4">
          <Link href="/reports/" className="text-[15px] font-medium text-cta hover:text-cta-hover">
            The full suite, with screenshots →
          </Link>
        </Reveal>
      </Section>

      {/* ---------------------------------------------------------------- documents */}
      <Section tone="sand">
        <SectionHead
          eyebrow="Documents"
          title="The pack, generated from the loan"
          lead="Sanction letter, agreement, Key Facts Statement, repayment schedule, NACH mandate, statements and certificates — assembled from the loan's own terms, on the lender's letterhead."
        />
        <Reveal className="mt-s4">
          <Card>
            <p>
              The borrower declaration is produced in{" "}
              <strong className="font-semibold text-ink">fourteen languages</strong> — Hindi,
              Bengali, Marathi, Telugu, Tamil, Gujarati, Kannada, Malayalam, Odia, Punjabi, Assamese,
              Urdu, Nepali and English — so a borrower can be given the disclosure in a language
              they read.
            </p>
          </Card>
        </Reveal>
      </Section>

      {/* ---------------------------------------------------------------- security */}
      <Section>
        <SectionHead
          eyebrow="Security and multi-tenancy"
          title="Isolation that is structural, not configured"
          lead="Every query in the system carries a tenant predicate that no option can disable. Roles carry a data scope; two-factor authentication is available on every account; every mutation writes an append-only audit record of who changed what, and to what."
        />
        <Reveal className="mt-s4">
          <Link href="/security/" className="text-[15px] font-medium text-cta hover:text-cta-hover">
            How isolation, access and audit actually work →
          </Link>
        </Reveal>
      </Section>

      {/* ---------------------------------------------------------------- who built it */}
      <Section tone="sand">
        <SectionHead
          eyebrow="Who built it"
          title="FastLegal Technologies"
          lead="Lenviq is built by FastLegal Technologies Private Limited, by people who have worked on NBFC compliance rather than only read about it — which is why the compliance pages carry citations rather than adjectives."
        />
        <Reveal className="mt-s4">
          <Link href="/about/" className="text-[15px] font-medium text-cta hover:text-cta-hover">
            About the company →
          </Link>
        </Reveal>
      </Section>

      {/* ---------------------------------------------------------------- faq */}
      <Section id="faq">
        <SectionHead eyebrow="Questions" title="Straight answers" />
        <div className="mt-s5 divide-y divide-line border-y border-line">
          {FAQ.map((f) => (
            <details key={f.q} className="group py-s3">
              <summary className="cursor-pointer list-none font-display text-[17px] font-bold tracking-display text-ink marker:content-none">
                {f.q}
              </summary>
              <p className="mt-s2 max-w-prose text-[15px] leading-prose text-slate-mid">{f.a}</p>
            </details>
          ))}
        </div>
      </Section>

      {/* ---------------------------------------------------------------- closing */}
      <Section tone="sand">
        <Reveal className="rounded-card border border-sand-border bg-card p-s6 text-center shadow-e2">
          <h2 className="text-[28px] font-bold tracking-display text-ink sm:text-[32px]">
            See it against your own book
          </h2>
          <p className="mx-auto mt-s3 max-w-prose text-[16px] leading-prose text-slate-mid">
            A demo runs on your product mix and your scheme terms, not on a canned dataset. It is
            the fastest way to find out whether this fits how you actually lend.
          </p>
          <div className="mt-s4 flex flex-wrap justify-center gap-s2">
            <ButtonLink href="/contact/">Request a demo</ButtonLink>
            <ButtonLink href="/compliance/" variant="secondary">
              Read the compliance page first
            </ButtonLink>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
