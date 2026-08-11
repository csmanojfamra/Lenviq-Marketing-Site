import type { Metadata } from "next";
import { Section } from "@/components/ui";

export const metadata: Metadata = {
  title: "Terms of use (draft)",
  description: "Terms governing use of this website. Draft, pending legal review.",
  alternates: { canonical: "/terms/" },
  robots: { index: false, follow: true },
};

export default function TermsPage() {
  return (
    <Section className="pt-s7">
      <p className="inline-block rounded-badge bg-[color:var(--color-warning-bg)] px-2 py-1 text-[12px] font-semibold text-[color:var(--color-warning-fg)]">
        Draft — pending legal review
      </p>
      <h1 className="mt-s3 text-[34px] font-extrabold tracking-display-tight text-ink">Terms of use</h1>
      <div className="prose-lenviq mt-s4 max-w-prose">
        <p>
          This draft describes the intended position. It has not been reviewed and should not be
          relied on. It is excluded from search indexing until it has been.
        </p>
        <h2>This website</h2>
        <p>
          The material here describes a software product. It is not financial, legal or regulatory
          advice, and nothing on it is an offer to lend. Lenviq is not a lender: the lender of record
          in any transaction processed through the platform is the NBFC that licenses it.
        </p>
        <h2>Regulatory statements</h2>
        <p>
          Where this site cites a circular or a direction, the citation is given so that it can be
          read in the original. The original governs. Regulation changes, and a page that was correct
          when written may not be correct when read.
        </p>
        <h2>Use of the platform</h2>
        <p>
          Access to app.lenviq.in is governed by the licence agreement between Lenviq and the
          licensee NBFC, not by these terms.
        </p>
        <h2>Governing law</h2>
        <p>
          To be completed before this draft is finalised, along with the jurisdiction clause and the
          limitation of liability.
        </p>
      </div>
    </Section>
  );
}
