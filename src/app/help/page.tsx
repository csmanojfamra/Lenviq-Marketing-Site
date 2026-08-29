import type { Metadata } from "next";
import Link from "next/link";
import { Section, SectionHead } from "@/components/ui";
import { Reveal } from "@/components/reveal";
import { helpSections } from "@/lib/help";

export const metadata: Metadata = {
  title: "Help — how to do it in Lenviq",
  description:
    "Short, screenshot-led guides for the work an NBFC does every day: taking a lead, completing KYC, sanctioning, disbursing, collecting, day-end reconciliation and the RBI returns.",
  alternates: { canonical: "/help/" },
};

/**
 * The help index — a different page from the blog, on purpose.
 *
 * The blog argues about what the regulation requires and is read by somebody who has not heard of
 * us. This is read by somebody deciding whether to buy, or already using it, and it answers "how do
 * I do X" in a few hundred words and a picture of the screen they will be looking at.
 *
 * Grouped the way the application's own navigation is grouped, because somebody who has the product
 * open is looking for the thing where they last saw it.
 */
export default function HelpIndex() {
  const sections = helpSections();

  return (
    <>
      <Section className="pt-s7">
        <Reveal>
          <p className="text-[13px] font-semibold uppercase tracking-wide text-cta">Help</p>
          <h1 className="mt-s2 max-w-4xl text-[34px] font-extrabold leading-[1.1] tracking-display-tight text-ink sm:text-[46px]">
            How the work actually gets done.
          </h1>
          <p className="mt-s4 max-w-prose text-[18px] leading-prose text-slate-mid">
            One task per page, with the screen you will be looking at. Every screenshot is taken
            from the running product against a demonstration book — so what is on this site is what
            is in the software.
          </p>
        </Reveal>
      </Section>

      {sections.map(({ section, pages }, i) => (
        <Section key={section} tone={i % 2 === 0 ? "sand" : "light"}>
          <SectionHead eyebrow={`${pages.length} ${pages.length === 1 ? "guide" : "guides"}`} title={section} />
          <ul className="mt-s4 grid gap-s3 sm:grid-cols-2">
            {pages.map((p) => (
              <li key={p.slug}>
                <Reveal>
                  <Link
                    href={`/help/${p.slug}/`}
                    className="block h-full rounded-xl border border-line bg-card p-s4 transition-colors hover:border-cta"
                  >
                    <p className="text-[17px] font-semibold leading-snug text-ink">{p.title}</p>
                    <p className="mt-s2 text-[15px] leading-relaxed text-slate-mid">{p.description}</p>
                    {p.audience && (
                      <p className="mt-s3 text-[13px] uppercase tracking-wide text-muted">{p.audience}</p>
                    )}
                  </Link>
                </Reveal>
              </li>
            ))}
          </ul>
        </Section>
      ))}

      {sections.length === 0 && (
        <Section tone="sand">
          <p className="text-[16px] text-slate-mid">Guides are being written.</p>
        </Section>
      )}
    </>
  );
}
