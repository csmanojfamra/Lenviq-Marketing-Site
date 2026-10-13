import Link from "next/link";
import { Section as Band } from "@/components/ui";
import { ProductCta } from "@/components/product-cta";
import { publishedCommercial, commercialDraftCount, type Section, type PageKind } from "@/lib/commercial";

/**
 * A HUB IS ONLY A HUB ONCE IT HAS SOMETHING TO BE A HUB OF.
 *
 * The whole content of this page is links to its children, and a live page may not link to a
 * held-back one, so a hub published on day one is a page with a heading and nothing under it —
 * thin, linking nowhere, and precisely the shape Google declines. Sprint SEO-5 §7 therefore holds
 * both hubs back until at least three of their children are live, and the release order is
 * children first, hub third.
 *
 * `publishedCommercial` rather than `allCommercial`, so this cannot accidentally become the crawl
 * path into an unreviewed page. The draft COUNT is shown, because a reader arriving early should
 * know the layer is being built rather than think it is empty; the titles are not, because a title
 * is content.
 */
const GROUPS: { kind: PageKind; heading: string; blurb: string }[] = [
  {
    kind: "artefact",
    heading: "By what you have to do",
    blurb: "One page per event or artefact — the thing itself, what goes wrong with it, and what a lending system has to do about it.",
  },
  {
    kind: "persona",
    heading: "By your role",
    blurb: "What the day looks like, and where the software sits in it.",
  },
  {
    kind: "situation",
    heading: "By the shape of your lending",
    blurb: "The same features, and the different problems a larger or more scattered book has with them.",
  },
];

export function CommercialHub({
  section, eyebrow, title, intro, closing,
}: {
  section: Section;
  eyebrow: string;
  title: string;
  intro: React.ReactNode;
  closing: string;
}) {
  const pages = publishedCommercial(section);
  const drafts = commercialDraftCount(section);

  return (
    <Band className="pt-s7">
      <p className="text-[13px] font-semibold uppercase tracking-wide text-cta">{eyebrow}</p>
      <h1 className="mt-s2 max-w-3xl text-[34px] font-extrabold leading-[1.1] tracking-display-tight text-ink sm:text-[44px]">
        {title}
      </h1>
      <div className="mt-s4 max-w-prose text-[18px] leading-prose text-slate-mid">{intro}</div>

      {GROUPS.map((g) => {
        const inGroup = pages.filter((p) => p.kind === g.kind);
        if (inGroup.length === 0) return null;
        return (
          <section key={g.kind} className="mt-s6">
            <h2 className="font-display text-[22px] font-bold tracking-display text-ink">{g.heading}</h2>
            <p className="mt-s2 max-w-prose text-[15px] leading-relaxed text-slate-mid">{g.blurb}</p>
            <ul className="mt-s4 grid gap-s3 md:grid-cols-2">
              {inGroup.map((p) => (
                <li key={p.slug} className="rounded-card border border-line bg-subtle p-s4">
                  <Link
                    href={`/${section}/${p.slug}/`}
                    className="font-display text-[17px] font-bold leading-snug tracking-display text-ink underline decoration-line-strong underline-offset-4 hover:text-cta"
                  >
                    {p.title}
                  </Link>
                  <p className="mt-s2 text-[14px] leading-relaxed text-slate-mid">{p.metaDescription}</p>
                </li>
              ))}
            </ul>
          </section>
        );
      })}

      {pages.length === 0 && (
        <div className="mt-s6 max-w-prose rounded-card border border-line bg-subtle p-s4">
          <p className="text-[15px] leading-relaxed text-slate-mid">
            {drafts > 0
              ? `${drafts} pages are written and in review.`
              : "The first pages are being written."}{" "}
            They are not published: absent from this list, from the sitemap and from every other
            index on this site, and asking search engines not to list them. A page that asserts
            something a lending system cannot actually do costs more than a page that is not there
            yet.
          </p>
        </div>
      )}

      <ProductCta line={closing} />
    </Band>
  );
}
