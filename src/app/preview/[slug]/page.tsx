import { notFound } from "next/navigation";
import { Section } from "@/components/ui";

/**
 * Pages that exist for review and are not published.
 *
 * ## How the gate works
 *
 * `generateStaticParams` returns nothing outside development, and this site is a static export —
 * so in a production build the route emits no HTML, gets no URL, and appears in no sitemap. It
 * cannot be reached by guessing, because there is nothing there to reach. `next dev` does not
 * consult this list, so the same page renders locally at once.
 *
 * That is a stronger guarantee than a `draft` flag or a `noindex` tag, both of which leave a live
 * page behind. It also means a preview can be committed without any risk of shipping it, which
 * matters more than it sounds: the alternative is holding uncommitted work on one machine.
 *
 * To promote one of these, move it to its own route under `/tools/` and register it in `TOOLS`.
 */
const PREVIEWS: Record<string, { title: string; blurb: string; render: () => React.ReactNode }> = {
  // Empty on purpose. The first occupant — a prepayment charge checker — was reviewed here and
  // promoted to /tools/prepayment-charge-checker/. The route stays because the next page that needs
  // reviewing before it is published should not have to rebuild the gate.
};

/**
 * In development, every preview. In a production build, one placeholder slug that is not a preview
 * — so the route resolves to `notFound()` and the export emits a 404 page there and nothing else.
 *
 * The placeholder exists only because a static export refuses a dynamic segment that generates no
 * routes at all. It carries no preview content, and `tests/site.test.ts` asserts that no string
 * from a preview reaches the build.
 */
export function generateStaticParams() {
  return process.env.NODE_ENV === "development"
    ? Object.keys(PREVIEWS).map((slug) => ({ slug }))
    : [{ slug: "not-published" }];
}

export const metadata = { robots: { index: false, follow: false } };

export default async function PreviewPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = PREVIEWS[slug];
  if (!p) notFound();

  return (
    <Section className="pt-s7">
      <div className="rounded-card border border-line border-l-[3px] border-l-[color:var(--color-warning)] bg-subtle p-s4">
        <p className="text-[13px] font-semibold uppercase tracking-wide text-muted">Preview — not published</p>
        <p className="mt-s2 max-w-prose text-[15px] leading-relaxed text-slate-mid">
          This page exists only on a development server. It is not in the build, not in the sitemap
          and has no live URL. Nothing here is visible to anyone but you.
        </p>
      </div>

      <h1 className="mt-s5 max-w-4xl text-[32px] font-extrabold leading-[1.12] tracking-display-tight text-ink sm:text-[42px]">
        {p.title}
      </h1>
      <p className="mt-s3 max-w-prose text-[18px] leading-prose text-slate-mid">{p.blurb}</p>

      {p.render()}
    </Section>
  );
}
