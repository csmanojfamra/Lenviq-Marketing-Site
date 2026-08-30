import Link from "next/link";
import { Section, ButtonLink } from "@/components/ui";
import { Reveal } from "@/components/reveal";
import { absolute, COMPANY, SITE } from "@/lib/site";
import { TOOLS, type Tool } from "@/lib/tools";

/**
 * The frame every tool sits in.
 *
 * Two decisions worth stating, because both are the opposite of what a lead-generation page does.
 *
 * **No email gate, no sign-up, nothing sent anywhere.** The whole calculation runs in the reader's
 * browser. A gate would collect a few addresses and cost the thing these pages exist for — being
 * the page a consultant keeps open in a tab and sends to a client.
 *
 * **The product is mentioned once, at the end, and only for what it actually does differently.**
 * A tool answers one loan; the software answers the book. That is a real distinction and it does not
 * need a banner.
 */
export function ToolPage({ tool, children }: { tool: Tool; children: React.ReactNode }) {
  const url = absolute(`/tools/${tool.slug}/`);

  /**
   * `SoftwareApplication` with a free `offer`, because that is what this is: a free web utility.
   * Distinct from the product's own node, which describes the licensed platform.
   */
  const app = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: tool.name,
    applicationCategory: "FinanceApplication",
    operatingSystem: "Web",
    description: tool.description,
    url,
    isAccessibleForFree: true,
    offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
    publisher: { "@type": "Organization", name: COMPANY.legalName },
  };
  const crumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absolute("/") },
      { "@type": "ListItem", position: 2, name: "Tools", item: absolute("/tools/") },
      { "@type": "ListItem", position: 3, name: tool.name, item: url },
    ],
  };

  const others = TOOLS.filter((t) => t.slug !== tool.slug);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(app) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbs) }} />

      <Section className="pt-s7">
        <Reveal>
          <nav className="text-[13px] text-muted">
            <Link href="/tools/" className="hover:text-ink">Tools</Link>
          </nav>
          <h1 className="mt-s2 max-w-4xl text-[32px] font-extrabold leading-[1.12] tracking-display-tight text-ink sm:text-[42px]">
            {tool.name}
          </h1>
          <p className="mt-s3 max-w-prose text-[18px] leading-prose text-slate-mid">{tool.question}</p>
          <p className="mt-s3 text-[13px] uppercase tracking-wide text-muted">
            Free · nothing is sent anywhere · {tool.audience}
          </p>
        </Reveal>

        {children}
      </Section>

      <Section tone="sand">
        <div className="grid gap-s5 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <h2 className="font-display text-[22px] font-bold tracking-display text-ink">
              Where these numbers come from
            </h2>
            <p className="mt-s3 max-w-prose text-[16px] leading-prose text-slate-mid">
              This runs the same arithmetic as the {SITE.name} platform, and it is held to it: the
              platform emits a table of worked cases from its own code, and a test here fails the
              build if this page reproduces any of them differently. A calculator that quietly
              disagreed with the software it advertises would be worse than no calculator.
            </p>
            <p className="mt-s3 max-w-prose text-[16px] leading-prose text-slate-mid">
              It is a guide, not advice. Your own board-approved policy, your scheme terms and your
              auditor decide what applies to a particular account.
            </p>
            {tool.source && (
              <p className="mt-s3 max-w-prose text-[15px] leading-relaxed text-slate-mid">
                <strong className="text-ink">Source.</strong> {tool.source}{" "}
                {tool.sourceUrl && (
                  <a href={tool.sourceUrl} target="_blank" rel="noopener noreferrer"
                     className="text-cta underline underline-offset-2 hover:text-cta-hover">
                    Read the Master Direction
                  </a>
                )}
              </p>
            )}
          </div>
          <div className="rounded-card border border-line bg-card p-s5">
            <p className="text-[16px] leading-prose text-slate-mid">
              This answers one loan. {SITE.name} answers the book — every account, computed at day-end,
              with the classification, the provisioning and the returns that follow from it.
            </p>
            <div className="mt-s4 flex flex-wrap gap-s3">
              <ButtonLink href="/contact/">See it on your own book</ButtonLink>
              <ButtonLink href="/platform/" variant="secondary">What it covers</ButtonLink>
            </div>
          </div>
        </div>
      </Section>

      <Section>
        <h2 className="font-display text-[22px] font-bold tracking-display text-ink">Other tools</h2>
        <ul className="mt-s4 grid gap-s3 sm:grid-cols-2">
          {others.map((t) => (
            <li key={t.slug}>
              <Link
                href={`/tools/${t.slug}/`}
                className="block h-full rounded-card border border-line bg-card p-s4 transition-colors hover:border-cta"
              >
                <span className="block font-display text-[17px] font-bold tracking-display text-ink">
                  {t.name}
                </span>
                <span className="mt-s2 block text-[15px] leading-relaxed text-slate-mid">{t.question}</span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
