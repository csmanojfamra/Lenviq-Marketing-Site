import type { Metadata } from "next";
import Link from "next/link";
import { Section, Card } from "@/components/ui";
import { Reveal } from "@/components/reveal";
import { publishedPosts, draftCount } from "@/lib/content";

export const metadata: Metadata = {
  title: "Notes on NBFC lending and RBI compliance",
  description:
    "Long-form notes on the regulatory positions a lending system has to implement — the Key Facts Statement, penal charges, IRAC classification and what diligence asks for.",
  alternates: { canonical: "/blog/" },
};

export default function BlogIndex() {
  const posts = publishedPosts();
  const drafts = draftCount();
  return (
    <Section className="pt-s7">
      <Reveal>
        <p className="text-[13px] font-semibold uppercase tracking-wide text-cta">Blog</p>
        <h1 className="mt-s2 max-w-3xl text-[34px] font-extrabold leading-[1.1] tracking-display-tight text-ink sm:text-[44px]">
          Notes on lending and compliance
        </h1>
        <p className="mt-s4 max-w-prose text-[18px] leading-prose text-slate-mid">
          Written for people who have to implement the rule, not for people being sold to. Every
          regulatory statement carries the circular it comes from and its date.
        </p>
      </Reveal>

      {posts.length > 0 ? (
        <div className="mt-s6 grid gap-s3 md:grid-cols-2">
          {posts.map((p) => (
            <Reveal key={p.slug}>
              <Card href={`/blog/${p.slug}/`} title={p.title}>
                <p>{p.description}</p>
                <p className="mt-s2 text-[13px] text-muted">
                  {p.category} · {p.date} · {p.readingMinutes} min read
                </p>
              </Card>
            </Reveal>
          ))}
        </div>
      ) : (
        <Reveal className="mt-s6">
          <Card title="Nothing published yet">
            <p>
              {drafts > 0
                ? `${drafts} pieces are written and in review.`
                : "The first pieces are being written."}{" "}
              They are not published, and they are not built into this site, because a wrong
              regulatory claim under a practising Chartered Accountant&rsquo;s company name costs
              more than an empty page does.
            </p>
            <p className="mt-s2">
              In the meantime the{" "}
              <Link href="/compliance/" className="text-cta underline underline-offset-2 hover:text-cta-hover">
                compliance page
              </Link>{" "}
              sets out each position with its citation, and the{" "}
              <Link href="/glossary/" className="text-cta underline underline-offset-2 hover:text-cta-hover">
                glossary
              </Link>{" "}
              defines the terms.
            </p>
          </Card>
        </Reveal>
      )}
    </Section>
  );
}
