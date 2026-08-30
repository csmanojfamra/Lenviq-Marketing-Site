import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { Section, SectionHead } from "@/components/ui";
import { Reveal } from "@/components/reveal";
import { TOOLS } from "@/lib/tools";

export const metadata: Metadata = pageMetadata({
  title: "Free tools for NBFC lending — APR, NPA dates, gold LTV",
  description:
    "Free calculators for the questions the regulation asks: the APR a Key Facts Statement discloses, the date an account turns NPA, and gold LTV across purities.",
  path: "/tools/",
});

export default function ToolsIndex() {
  return (
    <>
      <Section className="pt-s7">
        <Reveal>
          <p className="text-[13px] font-semibold uppercase tracking-wide text-cta">Tools</p>
          <h1 className="mt-s2 max-w-4xl text-[34px] font-extrabold leading-[1.1] tracking-display-tight text-ink sm:text-[46px]">
            The questions the regulation asks, answered in a browser.
          </h1>
          <p className="mt-s4 max-w-prose text-[18px] leading-prose text-slate-mid">
            Every lending site has an EMI calculator. What an NBFC — or the Chartered Accountant and
            Company Secretary advising three of them — cannot find anywhere is a tool for the
            questions that carry a consequence: what a Key Facts Statement must disclose, which date
            an account turns non-performing, whether a gold packet is still inside the cap after the
            rate moved.
          </p>
          <p className="mt-s3 max-w-prose text-[16px] leading-prose text-slate-mid">
            Free, no sign-up, and nothing you type is sent anywhere — the arithmetic runs in your own
            browser. Each one is held to the same computation the platform performs on a real book.
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
                  <span className="mt-s3 block text-[13px] uppercase tracking-wide text-muted">{t.audience}</span>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </Section>

      <Section>
        <SectionHead
          eyebrow="A note for advisers"
          title="Use them with your clients"
          lead="These pages are meant to be sent. There is no gate, no email capture and no watermark — if a calculation here settles an argument in a board meeting or an audit, that is the whole point of it being here."
        />
      </Section>
    </>
  );
}
