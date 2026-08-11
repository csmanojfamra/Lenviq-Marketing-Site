import type { Metadata } from "next";
import { Section } from "@/components/ui";

export const metadata: Metadata = {
  title: "Privacy policy (draft)",
  description: "How this website and the Lenviq platform handle personal data. Draft, pending legal review.",
  alternates: { canonical: "/privacy/" },
  robots: { index: false, follow: true },
};

export default function PrivacyPage() {
  return (
    <Section className="pt-s7">
      <p className="inline-block rounded-badge bg-[color:var(--color-warning-bg)] px-2 py-1 text-[12px] font-semibold text-[color:var(--color-warning-fg)]">
        Draft — pending legal review
      </p>
      <h1 className="mt-s3 text-[34px] font-extrabold tracking-display-tight text-ink">Privacy policy</h1>
      <div className="prose-lenviq mt-s4 max-w-prose">
        <p>
          This draft describes the intended position. It has not been reviewed and should not be
          relied on. It is excluded from search indexing until it has been.
        </p>
        <h2>This website</h2>
        <p>
          lenviq.in is a static site. It sets no cookies, runs no analytics and embeds nothing from a
          third party — including fonts, which are served from this domain. Nothing you do here is
          recorded by us beyond the ordinary access logs of the host serving the files.
        </p>
        <p>
          If you email us from the address on the contact page, we hold that correspondence in order
          to reply to it.
        </p>
        <h2>The Lenviq platform</h2>
        <p>
          The platform at app.lenviq.in processes personal data of borrowers on behalf of the NBFC
          that licenses it. In that relationship the NBFC determines the purposes and means of
          processing and Lenviq acts on its instructions; the specific terms are set out in the
          agreement with each lender rather than here.
        </p>
        <p>
          Aadhaar numbers are stored masked to the last four digits and the full number is not
          retained. Personal identifiers are masked in report exports by default.
        </p>
        <h2>Retention</h2>
        <p>
          Records of lending are retained for the periods required by the Companies Act, 2013 and the
          directions applicable to the lender, and regulatory records are not deleted.
        </p>
        <h2>Contact</h2>
        <p>
          Questions about this policy: the address on the contact page. A named grievance officer and
          the statutory contact details will be published here before this draft is finalised.
        </p>
      </div>
    </Section>
  );
}
