import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/ui";
import { renderMarkdown } from "@/lib/markdown";
import { legalDoc, LEGAL_VERSION } from "@/lib/legal";
import { COMPANY } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Service — Lenviq",
  description:
    "The terms governing use of the Lenviq platform: the nature of the arrangement, the regulatory responsibilities that remain the lender's, data ownership and localisation, and the limitation of liability.",
  alternates: { canonical: "/terms/" },
};

/**
 * The real Terms of Service, replacing the draft.
 *
 * The page was a short summary marked "Draft — pending legal review" and excluded from indexing,
 * because that was honest while nothing had been reviewed. The reviewed documents now exist, so the
 * summary goes: a prospective customer's counsel reads the terms, not a description of them.
 */
export default function TermsPage() {
  const body = legalDoc("terms");
  return (
    <Section className="pt-s7">
      <h1 className="text-[34px] font-extrabold tracking-display-tight text-ink">Terms of Service</h1>
      <p className="mt-s2 text-[14px] text-slate-mid">
        {LEGAL_VERSION} &middot; {COMPANY.legalName}. These terms govern use of the Lenviq platform.
        Where a signed Subscription Agreement exists between us, it takes precedence over anything
        on this page.
      </p>
      <p className="mt-s2 text-[14px] text-slate-mid">
        See also the{" "}
        <Link href="/privacy/" className="font-medium text-cta underline underline-offset-4">Privacy Policy</Link>.
      </p>
      {body ? (
        <div className="prose-lenviq legal-doc mt-s5 max-w-prose" dangerouslySetInnerHTML={{ __html: renderMarkdown(body) }} />
      ) : (
        <p className="prose-lenviq mt-s5 max-w-prose">
          The terms are being republished. Please write to{" "}
          <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a> for a copy in the meantime.
        </p>
      )}
    </Section>
  );
}
