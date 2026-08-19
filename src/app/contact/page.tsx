import type { Metadata } from "next";
import { Section, Card } from "@/components/ui";
import { Reveal } from "@/components/reveal";
import { COMPANY, SITE } from "@/lib/site";
import { DemoForm } from "@/components/demo-form";

export const metadata: Metadata = {
  title: "Request a demo — Lenviq",
  description: "Ask for a demonstration of Lenviq against your own product mix, or send a question.",
  alternates: { canonical: "/contact/" },
};

/**
 * A real form, with the email link kept as the fallback rather than replaced by it.
 *
 * The page shipped as a `mailto:` because a form with nowhere to POST discards submissions
 * silently, and that costs a real enquiry with nobody ever finding out. `DemoForm` resolves that
 * without reintroducing it: when no endpoint is configured, or when the POST fails, it hands the
 * reader the same content as a pre-filled email. There is no path where what somebody typed
 * disappears.
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

      {/*
        Held to a form's width, not the page's.
        
        The card sat in the 6xl section, so every input stretched to about 1,150px. A text box that
        wide does not read as a field to fill in — it reads as a banner with a line under it, and
        the eye has no idea where one answer ends and the next begins. A form is filled in one
        column at a time.
      */}
      {/*
        Form left, the other ways to reach us beside it.
        
        The card stays at a form's width for the reason above, which on a desktop left the rest of
        the page empty and pushed "here is our email and our number" below the fold — the two things
        somebody who does not want to fill in a form is looking for.
      */}
      <div className="mt-s6 grid items-start gap-s5 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
        <Reveal className="rounded-2xl border border-sand-border bg-card p-s4 sm:p-s5">
          <DemoForm />
        </Reveal>

        <Reveal className="grid gap-s3">
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
            If you would rather not use the form, the link pre-fills the same details. Either way it
            reaches the same inbox — and this site still runs no analytics and sets no cookie.
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
      </div>

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
