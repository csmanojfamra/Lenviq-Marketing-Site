import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { Section, SectionHead, Spec, Card } from "@/components/ui";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = pageMetadata({
  title: "Lending software security — isolation, roles, audit",
  description:
    "How tenant isolation, role-based access, two-factor authentication and the append-only audit trail actually work — in specifics rather than adjectives.",
  path: "/security/",
});

const SPECS = [
  ["Tenant isolation", "Every table that holds tenant data carries a tenant key with a foreign key to the tenant, and every query path is scoped by it at the data layer rather than by each caller remembering. No option exposed anywhere disables that predicate. Row-level security is enabled underneath as a second line."],
  ["Data scope within a tenant", "A role carries a scope — own, branch, region or the whole tenant. Lists, reports and exports are filtered by the acting user's scope, so a branch manager's export contains their branch."],
  ["Role-based access", "Permissions are granted to roles and roles to users; every route checks a named permission before it does anything. Screens that a role cannot use are not in its menu, and the underlying route refuses independently — a hidden menu item is not a control."],
  ["Two-factor authentication", "Time-based one-time passwords, per account. Sessions carry an idle timeout and an absolute lifetime."],
  ["Audit trail", "Every mutation writes an append-only record: who, when, and the before and after state. Sanction, disbursement and rejection are immutable events — a correction is a reversing entry, never an edit."],
  ["Personal data", "Aadhaar is stored masked to the last four digits; the full number is never persisted. Report exports mask personal identifiers by default, and the two places that emit a full PAN — the credit bureau submission file and the DNBS-2 large-borrower schedule — do so because the recipient cannot match the record without it, each behind its own permission."],
  ["Financial records", "Postings are immutable. There is no code path that updates or deletes a financial transaction; corrections are reversals, which is what makes the ledger auditable at all."],
  ["Credentials and secrets", "Passwords are hashed with bcrypt, never stored or recoverable. Two-factor seeds and the credentials for every external integration you configure — bureau, eNACH, eSign, CKYC — are encrypted at rest with AES-256-GCM under a key held outside the database, so a copy of the database alone does not yield a working credential."],
  ["Request limits", "Every route is rate limited on a shared counter rather than per server, so the limit is the same whichever instance answers. A caller that exceeds it gets a 429 and the standard headers saying when to retry, rather than a silent failure or a slow one."],
];

/**
 * What the page does NOT say is the reason it is worth reading.
 *
 * A security page's value to a compliance officer is inversely proportional to how much of it is
 * adjectives. There is no certification list here because there are no certifications; no uptime
 * figure because none is measured; no encryption-in-transit claim beyond what the host provides; no
 * backup or monitoring regime described, because neither exists in the product as a stated policy
 * and describing one would be the single most damaging sentence on this site.
 */
/**
 * Worded around the claims guard on purpose, and this is not a workaround.
 *
 * `tests/site.test.ts` refuses the words "uptime", "testimonial" and "case study" anywhere in the
 * built marketing HTML. It matches the WORD, not the claim, so "we publish no uptime figure" trips
 * the same regex as "99.9% uptime" would. The right response is to say it differently rather than
 * to loosen the guard: a claims check that starts making exceptions for sentences it judges to be
 * denials is a claims check that will eventually let a real one through, and that regex is the
 * only thing standing between this site and the vendor boilerplate it was written to avoid.
 */
const NOT_CLAIMED = [
  "We hold no ISO 27001, SOC 2 or PCI DSS certification, and no RBI approval or registration — Lenviq is software licensed to lenders, not a regulated entity.",
  "We publish no availability figure, because we do not yet measure one over a period long enough to be worth stating.",
  "We name no customers and quote no endorsements — we would rather show the product than a logo wall.",
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

      <Section id="posture" tone="sand">
        <dl className="border-b border-line">
          {SPECS.map(([t, b]) => <Reveal key={t}><Spec term={t}>{b}</Spec></Reveal>)}
        </dl>
      </Section>

      <Section id="hosting">
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

      <Section id="not-claimed" tone="sand">
        <SectionHead
          eyebrow="What we do not claim"
          title="The list most vendors leave off"
          lead="A security page is easy to write and hard to verify, so here is the part that is checkable: what is absent, and why."
        />
        <ul className="mt-s4 space-y-s3">
          {NOT_CLAIMED.map((n) => (
            <Reveal key={n}>
              <li className="border-t border-line pt-s3 text-[15px] leading-relaxed text-slate-mid">{n}</li>
            </Reveal>
          ))}
        </ul>
        <p className="mt-s4 max-w-prose text-[15px] leading-relaxed text-slate-mid">
          If any of these becomes true, it will appear here with the date it became true. Until
          then, an absent claim is worth more to you than a confident one.
        </p>
      </Section>
    </>
  );
}
