import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/ui";
import { renderMarkdown } from "@/lib/markdown";
import { legalDoc, LEGAL_VERSION } from "@/lib/legal";
import { COMPANY } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy — Lenviq",
  description:
    "How Lenviq handles personal data: what we process as a processor for our NBFC customers, what we collect on this website, where data is held, and the rights available under the Digital Personal Data Protection Act, 2023.",
  alternates: { canonical: "/privacy/" },
};

export default function PrivacyPage() {
  const body = legalDoc("privacy");
  return (
    <Section className="pt-s7">
      <h1 className="text-[34px] font-extrabold tracking-display-tight text-ink">Privacy Policy</h1>
      <p className="mt-s2 text-[14px] text-slate-mid">
        {LEGAL_VERSION} &middot; {COMPANY.legalName}. Borrower data held in the platform is processed
        on behalf of the NBFC that licenses it; that lender is the Data Fiduciary and we act on its
        instructions.
      </p>
      <p className="mt-s2 text-[14px] text-slate-mid">
        See also the{" "}
        <Link href="/terms/" className="font-medium text-cta underline underline-offset-4">Terms of Service</Link>.
      </p>
      {body ? (
        <div className="prose-lenviq legal-doc mt-s5 max-w-prose" dangerouslySetInnerHTML={{ __html: renderMarkdown(body) }} />
      ) : (
        <p className="prose-lenviq mt-s5 max-w-prose">
          The policy is being republished. Please write to{" "}
          <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a> for a copy in the meantime.
        </p>
      )}
    </Section>
  );
}
