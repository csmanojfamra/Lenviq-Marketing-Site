import type { Metadata } from "next";
import { Section, Card } from "@/components/ui";
import { Reveal } from "@/components/reveal";
import { COMPANY, SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Request a demo — Lenviq",
  description: "Ask for a demonstration of Lenviq against your own product mix, or send a question.",
  alternates: { canonical: "/contact/" },
};

/**
 * A mailto, not a form.
 *
 * This is a static site with no server. The options were a third-party form service, a small
 * endpoint, or an email link — and shipping a form that silently discards submissions is the same
 * defect as a "Forgot password?" link for a flow that does not exist, except that here it costs a
 * real prospect. No delivery mechanism has been settled, so the CTA is an email link that
 * demonstrably works. Recorded in DECISIONS_PENDING.md; when a service is chosen this becomes a
 * form and the address stays as the fallback.
 */
const SUBJECT = encodeURIComponent("Lenviq — demo request");
const BODY = encodeURIComponent(
  [
    "A few lines make the first call useful:",
    "",
    "NBFC name:",
    "Products (personal / business / vehicle / property / gold):",
    "Approximate active loan accounts:",
    "Number of branches:",
    "Currently using:",
    "",
  ].join("\n"),
);

export default function ContactPage() {
  return (
    <Section className="pt-s7">
      <Reveal>
        <p className="text-[13px] font-semibold uppercase tracking-wide text-cta">Contact</p>
        <h1 className="mt-s2 max-w-3xl text-[34px] font-extrabold leading-[1.1] tracking-display-tight text-ink sm:text-[44px]">
          Request a demo
        </h1>
        <p className="mt-s4 max-w-prose text-[18px] leading-prose text-slate-mid">
          A demo runs on your product mix and your scheme terms rather than a canned dataset. Send
          the note below and you will get a reply from a person who can answer technical questions,
          not a calendar link.
        </p>
      </Reveal>

      <Reveal className="mt-s6 grid gap-s3 md:grid-cols-2">
        <Card title="Email">
          <p>
            <a
              href={`mailto:${COMPANY.email}?subject=${SUBJECT}&body=${BODY}`}
              className="text-[17px] font-medium text-cta underline underline-offset-4 hover:text-cta-hover"
            >
              {COMPANY.email}
            </a>
          </p>
          <p className="mt-s2 text-[14px] text-muted">
            The link pre-fills the few details that make a first call useful. Nothing on this site
            collects anything — there is no form, no analytics and no cookie.
          </p>
        </Card>
        <Card title="Already a customer?">
          <p>
            Sign in to the platform at{" "}
            <a href={SITE.appUrl} className="font-medium text-cta underline underline-offset-4 hover:text-cta-hover">
              app.lenviq.in
            </a>
            . Support requests raised from inside the product reach us with the context attached.
          </p>
        </Card>
      </Reveal>

      <Reveal className="mt-s3 grid gap-s3 md:grid-cols-2">
        <Card title="Phone and WhatsApp">
          <p>
            <a href={`tel:${COMPANY.phone}`} className="text-[17px] font-medium text-cta underline underline-offset-4 hover:text-cta-hover">
              {COMPANY.phoneDisplay}
            </a>
          </p>
          <p className="mt-s2">
            The same number is on{" "}
            <a
              href={`https://wa.me/${COMPANY.phone.replace("+", "")}`}
              className="font-medium text-cta underline underline-offset-4 hover:text-cta-hover"
              rel="noopener"
            >
              WhatsApp
            </a>
            .
          </p>
        </Card>
        <Card title="What happens next">
          <p>
            A reply from someone who can answer technical questions, and a demo scheduled at a time
            that suits you. No discovery call before the demo.
          </p>
        </Card>
      </Reveal>
    </Section>
  );
}
