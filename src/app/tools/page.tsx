import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { Section } from "@/components/ui";
import { Reveal } from "@/components/reveal";
import { TOOLS } from "@/lib/tools";

export const metadata: Metadata = pageMetadata({
  title: "Free lending calculators for NBFCs and lenders",
  description:
    "Free calculators for everyday lending work: EMI and repayment schedules, the APR for a Key Facts Statement, NPA and SMA dates, gold LTV and returns due.",
  path: "/tools/",
});

/**
 * An index, not an article.
 *
 * This page read like a blog post — a headline, three paragraphs of argument, then the cards, then
 * more prose. That is the wrong shape for a page whose entire job is to get somebody into a tool:
 * a reader arriving from a search for "EMI calculator" wants the list, and every paragraph above it
 * is a paragraph between them and the thing they came for.
 *
 * So: one line of what this is, then the tools. The explaining moves onto the tool pages, where it
 * is next to the thing being explained.
 */
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
            The calculations a lending team does by hand, done in seconds with the workings
            shown. No sign-up, and nothing you type leaves your browser.
          </p>
        </Reveal>

        <ul className="mt-s6 grid gap-s3 md:grid-cols-2 xl:grid-cols-3">
          {TOOLS.map((t, i) => (
            <li key={t.slug}>
              <Reveal stage={((i % 3) + 1) as 1 | 2 | 3}>
                <Link
                  href={`/tools/${t.slug}/`}
                  className="group flex h-full flex-col rounded-card border border-line bg-card p-s5 transition-colors hover:border-cta"
                >
                  <span className="font-display text-[19px] font-bold tracking-display text-ink group-hover:text-cta">
                    {t.name}
                  </span>
                  <span className="mt-s2 flex-1 text-[15px] leading-relaxed text-slate-mid">{t.helps}</span>
                  <span className="mt-s4 text-[14px] font-medium text-cta">
                    Open
                    <span aria-hidden="true"> →</span>
                  </span>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="sand">
        <div className="grid gap-s5 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-[22px] font-bold tracking-display text-ink">
              The answers match the software
            </h2>
            <p className="mt-s3 max-w-prose text-[16px] leading-prose text-slate-mid">
              Each calculator runs the same computation the Lenviq platform performs on a live loan
              book, and is held to it: the platform emits worked cases from its own code and a test
              here fails the build if any page reproduces one differently.
            </p>
          </div>
          <div>
            <h2 className="font-display text-[22px] font-bold tracking-display text-ink">
              Free to use and to share
            </h2>
            <p className="mt-s3 max-w-prose text-[16px] leading-prose text-slate-mid">
              No gate, no email capture, no watermark. If a calculation here settles a question in a
              meeting, an audit or a conversation with a borrower, send the link on.
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}
