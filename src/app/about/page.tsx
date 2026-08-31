import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { Section, SectionHead, Card } from "@/components/ui";
import { Reveal } from "@/components/reveal";
import { COMPANY, SITE } from "@/lib/site";
import { SISTER_PRODUCTS, SINCE } from "@/lib/sister-products";

export const metadata: Metadata = pageMetadata({
  title: "About FastLegal Technologies",
  description:
    "Built by FastLegal Technologies, which has made compliance software for Indian regulated entities since 2018. Registration details, and what else we build.",
  path: "/about/",
});

/**
 * ## Why this page changed
 *
 * It said the registration details were "to be published" while the Privacy Policy and the Terms
 * printed the CIN and the registered office on the same site. And it argued domain expertise with
 * two things nobody can check: "professionals whose domain is Indian lending", and "an engineering
 * team with more than a decade on systems of this kind".
 *
 * What is checkable is that this company has shipped four compliance products for Indian regulated
 * entities since 2018, and that its CIN says so. That is the evidence the adjectives were standing
 * in for, and it also answers the question an NBFC actually has about a small vendor — whether it
 * will still be here in three years.
 *
 * The voice is first person plural, which is what Zoho, Clear and Razorpay all use on this page and
 * what the product cards on this site already use. No counters and no scale claims: the guard in
 * `tests/site.test.ts` forbids them, and Zoho's version of this page manages without any.
 *
 * The registration details are NOT here. They were, as a "Registration details" definition list
 * with a sentence explaining why it was not in the footer — and checking six comparable companies
 * (Zoho, Clear, Razorpay, Chargebee, Freshworks, Khatabook) found that none of them puts them in an
 * About page body and none of them explains why it is showing them. Explaining your own editorial
 * decision to a reader undercuts the thing you are showing. They are in the footer now, on every
 * page, which is where Razorpay, Clear and Khatabook keep theirs and where somebody running vendor
 * diligence will actually look. The legal entity is still named in the opening line.
 */
export default function AboutPage() {
  return (
    <>
      <Section className="pt-s7">
        <Reveal>
          <p className="text-[13px] font-semibold uppercase tracking-wide text-cta">About</p>
          <h1 className="mt-s2 max-w-4xl text-[34px] font-extrabold leading-[1.1] tracking-display-tight text-ink sm:text-[46px]">
            A lending system written by people who have had to defend the numbers.
          </h1>
          <p className="mt-s4 max-w-prose text-[18px] leading-prose text-slate-mid">
            We are {COMPANY.legalName}, and we have been building compliance software for Indian
            regulated entities since {SINCE}. {SITE.name} is that work applied to NBFC lending —
            which is why the compliance pages carry citations rather than adjectives, and why the
            ledger is a real double-entry ledger rather than a reporting table.
          </p>
        </Reveal>
      </Section>

      <Section tone="sand">
        <SectionHead eyebrow="Why it exists" title="The gap this was built into" />
        <div className="mt-s5 grid gap-s3 md:grid-cols-2">
          <Reveal stage={1}><Card title="Compliance treated as reporting">Most lending software computes what it likes and assembles a compliance view at quarter-end. That works until a position has to be defended, at which point the number in the return and the number in the ledger are two different numbers.</Card></Reveal>
          <Reveal stage={2}><Card title="Books kept somewhere else">A loan system that hands a summary to an accounting package leaves the reconciliation to a person. Here the posting is the loan event.</Card></Reveal>
        </div>
      </Section>

      <Section>
        <SectionHead
          eyebrow="What else we build"
          title={`Compliance software for Indian regulated entities, since ${SINCE}`}
          lead="Every one of these exists because a rulebook makes something hard to get right by hand. Lenviq is the same problem in NBFC lending, which is a larger one than the rest."
        />
        <ul className="mt-s5 grid gap-s3 sm:grid-cols-2">
          {SISTER_PRODUCTS.map((p, i) => (
            <Reveal key={p.name} stage={((i % 4) + 1) as 1 | 2 | 3 | 4}>
              <li className="h-full rounded-card border border-line bg-card p-s4">
                <p className="font-display text-[17px] font-bold tracking-display text-ink">
                  {p.url ? (
                    <a
                      href={p.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline decoration-line-strong underline-offset-4 hover:text-cta"
                    >
                      {p.name}
                    </a>
                  ) : (
                    p.name
                  )}
                </p>
                <p className="mt-s2 text-[15px] leading-relaxed text-slate-mid">{p.what}</p>
              </li>
            </Reveal>
          ))}
        </ul>
      </Section>

    </>
  );
}
