import type { Metadata } from "next";
import { Section, SectionHead, Spec, Card } from "@/components/ui";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: "Security, tenant isolation and audit — Lenviq",
  description:
    "How data isolation, role-based access, two-factor authentication and the audit trail actually work, in specifics rather than adjectives.",
  alternates: { canonical: "/security/" },
};

const SPECS = [
  ["Tenant isolation", "Every table that holds tenant data carries a tenant key with a foreign key to the tenant, and every query path is scoped by it at the data layer rather than by each caller remembering. No option exposed anywhere disables that predicate. Row-level security is enabled underneath as a second line."],
  ["Data scope within a tenant", "A role carries a scope — own, branch, region or the whole tenant. Lists, reports and exports are filtered by the acting user's scope, so a branch manager's export contains their branch."],
  ["Role-based access", "Permissions are granted to roles and roles to users; every route checks a named permission before it does anything. Screens that a role cannot use are not in its menu, and the underlying route refuses independently — a hidden menu item is not a control."],
  ["Two-factor authentication", "Time-based one-time passwords, per account. Sessions carry an idle timeout and an absolute lifetime."],
  ["Audit trail", "Every mutation writes an append-only record: who, when, and the before and after state. Sanction, disbursement and rejection are immutable events — a correction is a reversing entry, never an edit."],
  ["Personal data", "Aadhaar is stored masked to the last four digits; the full number is never persisted. Report exports mask personal identifiers by default, and the two places that emit a full PAN — the credit bureau submission file and the DNBS-2 large-borrower schedule — do so because the recipient cannot match the record without it, each behind its own permission."],
  ["Financial records", "Postings are immutable. There is no code path that updates or deletes a financial transaction; corrections are reversals, which is what makes the ledger auditable at all."],
];

export default function SecurityPage() {
  return (
    <>
      <Section className="pt-s7">
        <Reveal>
          <p className="text-[13px] font-semibold uppercase tracking-wide text-cta">Security</p>
          <h1 className="mt-s2 max-w-4xl text-[34px] font-extrabold leading-[1.1] tracking-display-tight text-ink sm:text-[46px]">
            Specifics, because &ldquo;bank-grade&rdquo; means nothing.
          </h1>
          <p className="mt-s4 max-w-prose text-[18px] leading-prose text-slate-mid">
            You are being asked to put your borrowers&rsquo; records into somebody else&rsquo;s
            system. These are the mechanisms, described precisely enough that your IT reviewer can
            argue with them.
          </p>
        </Reveal>
      </Section>

      <Section tone="sand">
        <dl className="border-b border-line">
          {SPECS.map(([t, b]) => <Reveal key={t}><Spec term={t}>{b}</Spec></Reveal>)}
        </dl>
      </Section>

      <Section>
        <SectionHead
          eyebrow="Hosting and continuity"
          title="Where it runs, and what we will confirm in writing"
          lead="Hosting region, backup frequency, retention and the recovery objectives are settled per engagement and stated in the agreement. We would rather write them into your contract than publish a figure here that your reviewer cannot hold us to."
        />
        <div className="mt-s5 grid gap-s3 md:grid-cols-2">
          <Reveal stage={1}><Card title="Data location">Deployed in an Indian region. The specific provider and region are confirmed at contracting.</Card></Reveal>
          <Reveal stage={2}><Card title="Retention">Regulatory records are never hard-deleted. Retention periods follow the Companies Act and the RBI directions applicable to your class of NBFC.</Card></Reveal>
        </div>
      </Section>
    </>
  );
}
