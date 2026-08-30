import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { Section, SectionHead } from "@/components/ui";
import { Reveal } from "@/components/reveal";
import { TOOLS } from "@/lib/tools";

export const metadata: Metadata = pageMetadata({
  title: "Free lending calculators for NBFCs and lenders",
  description:
    "Free calculators for everyday lending work: EMI and repayment schedules, the APR for a Key Facts Statement, NPA and SMA dates, gold LTV and returns due.",
  path: "/tools/",
});

export default function ToolsIndex() {
  return (
    <>
      <Section className="pt-s7">
        <Reveal>
          <p className="text-[13px] font-semibold uppercase tracking-wide text-cta">Tools</p>
          <h1 className="mt-s2 max-w-4xl text-[34px] font-extrabold leading-[1.1] tracking-display-tight text-ink sm:text-[46px]">
            Free calculators for everyday lending work.
          </h1>
          <p className="mt-s4 max-w-prose text-[18px] leading-prose text-slate-mid">
            These tools take the calculations a lending team does by hand — the instalment and its
            schedule, the true cost of a loan once fees are counted, the dates an overdue account
            changes classification, the value of a gold packet, the returns due this quarter — and do
            them in a few seconds, with the workings shown.
          </p>
          <p className="mt-s3 max-w-prose text-[16px] leading-prose text-slate-mid">
            They are free and need no sign-up, and nothing you type leaves your browser. Each one
            runs the same calculation the Lenviq platform performs on a live loan book, so the answer
            here is the answer the software gives.
          </p>
        </Reveal>
      </Section>

      <Section tone="sand">
        <ul className="grid gap-s3 md:grid-cols-2">
          {TOOLS.map((t, i) => (
            <li key={t.slug}>
              <Reveal stage={((i % 3) + 1) as 1 | 2 | 3}>
                <Link
                  href={`/tools/${t.slug}/`}
                  className="block h-full rounded-card border border-line bg-card p-s5 transition-colors hover:border-cta"
                >
                  <span className="block font-display text-[19px] font-bold tracking-display text-ink">
                    {t.name}
                  </span>
                  <span className="mt-s2 block text-[16px] leading-relaxed text-slate-mid">{t.question}</span>
                  <span className="mt-s3 block text-[14px] leading-relaxed text-muted">{t.helps}</span>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </Section>

      <Section>
        <SectionHead
          eyebrow="Free to use and to share"
          title="Send them to anyone"
          lead="There is no gate, no email capture and no watermark. If a calculation here settles a question in a meeting, an audit or a conversation with a borrower, that is what it is for — send the link on."
        />
      </Section>
    </>
  );
}
