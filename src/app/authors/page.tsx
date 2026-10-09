import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { Section, SectionHead } from "@/components/ui";
import { Reveal } from "@/components/reveal";
import { publishedPosts } from "@/lib/content";
import { COMPANY } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Who writes the regulatory writing on this site",
  description:
    "The named professionals behind the posts — what each one writes about here, and what this page deliberately does not claim about them.",
  path: "/authors/",
});

/**
 * WHO SAYS SO.
 *
 * Every post emits `author: { "@type": "Person", name }` — a named individual rather than the
 * company, which was a deliberate choice and the right one for regulatory writing. But the Person
 * resolved to nothing: there was no page on the site saying who any of them were, so the schema
 * asserted an identity it could not support, and a reader who wanted to know whether the byline on
 * an IRAC post belongs to somebody who would know had nowhere to look.
 *
 * WHAT THIS PAGE WILL NOT DO. It states the qualification already printed on every byline, and the
 * subjects each person actually writes on here — both verifiable from the posts themselves. It does
 * **not** carry firms, membership numbers, years of practice or biographies. Those are claims about
 * real people in regulated professions, and inventing one to fill a page would be worse than the
 * empty space it filled. They are for each author to supply.
 */
const SUBJECTS: Record<string, string> = {
  "CS Manoj Famra":
    "Company law and the supervisory side — registration and the certificate of registration, the compliance calendar, the returns an NBFC files, and state money lending licensing.",
  "CS Sushil Choudhary":
    "Operations and portfolio reading — collection efficiency, static pool and cohort analysis, bucket movement, and what diligence asks a lending book for.",
  "CA Tanmay Saini":
    "Reporting and the systems under it — how a figure gets from the ledger to a return without being re-keyed.",
  "CA Anil Agarwal":
    "Accounting — reconciliation, the books an NBFC must keep, write-offs, and where a ledger and a borrower statement legitimately disagree.",
  "CA Himanshu Sharma":
    "Income recognition and classification — the day-end position, interest reversal on an account that turns, and provisioning.",
};

export default function Page() {
  const posts = publishedPosts();
  const authors = Object.keys(SUBJECTS)
    .map((name) => ({ name, posts: posts.filter((p) => p.author === name) }))
    .filter((a) => a.posts.length > 0)
    .sort((a, b) => b.posts.length - a.posts.length);

  return (
    <>
      <Section className="pt-s7">
        <Reveal>
          <h1 className="max-w-4xl text-[34px] font-extrabold leading-[1.1] tracking-display-tight text-ink sm:text-[46px]">
            Who writes this, and on what.
          </h1>
          <p className="mt-s4 max-w-prose text-[18px] leading-prose text-slate-mid">
            The regulatory writing here is signed by named professionals rather than by{" "}
            {COMPANY.legalName}, and the byline matches the subject rather than rotating. This page
            says who they are and what each one covers, so the name on a post resolves to something.
          </p>
          <p className="mt-s3 max-w-prose text-[16px] leading-prose text-slate-mid">
            It carries the qualification printed on every byline and the subjects each person
            actually writes on. It does not carry firms, membership numbers or years of practice —
            those are claims about real people in regulated professions, and this page would rather
            be short than fill itself in.
          </p>
        </Reveal>
      </Section>

      <Section tone="sand">
        <SectionHead
          eyebrow="Bylines"
          title="Five names, and what each one signs"
          lead="Counts are of published posts. Each links to the most recent."
        />
        <div className="mt-s5 grid gap-s4 md:grid-cols-2">
          {authors.map((a) => (
            <Reveal key={a.name}>
              <div
                id={a.name.toLowerCase().replace(/[^a-z]+/g, "-")}
                className="h-full rounded-card border border-line bg-card p-s5"
              >
                <h2 className="font-display text-[20px] font-bold tracking-display text-ink">{a.name}</h2>
                <p className="mt-s1 text-[14px] text-muted">
                  {a.posts.length} post{a.posts.length === 1 ? "" : "s"}
                </p>
                <p className="mt-s3 text-[16px] leading-prose text-slate-mid">{SUBJECTS[a.name]}</p>
                <ul className="mt-s4 space-y-s2">
                  {a.posts.slice(0, 3).map((p) => (
                    <li key={p.slug}>
                      <Link
                        href={`/blog/${p.slug}/`}
                        className="text-[15px] leading-snug text-ink underline decoration-line-strong underline-offset-4 hover:text-cta"
                      >
                        {p.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section>
        <p className="max-w-prose text-[16px] leading-prose text-slate-mid">
          Every regulatory statement on this site carries the circular, direction or Act it comes
          from, with its date, so a reader can check the source rather than the byline. Where
          something could not be verified from primary text, the page says so instead of writing
          around it. The{" "}
          <Link href="/blog/" className="underline decoration-line-strong underline-offset-4 hover:text-cta">
            writing is here
          </Link>
          .
        </p>
      </Section>
    </>
  );
}
