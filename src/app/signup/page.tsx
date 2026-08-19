import type { Metadata } from "next";
import { Section, Card } from "@/components/ui";
import { Reveal } from "@/components/reveal";
import { COMPANY, SITE } from "@/lib/site";
import { SignupForm } from "@/components/signup-form";

export const metadata: Metadata = {
  title: "Create an account — Lenviq",
  description:
    "Ask for a Lenviq account for your NBFC. Confirm your email, and our team sets up the tenant, the administrator login and the subscription.",
  alternates: { canonical: "/signup/" },
};

/**
 * The signup page.
 *
 * It says what actually happens next, in the order it happens, because the thing this page is
 * really selling is that a real person reviews the request — an NBFC handing its book to a new
 * system does not want an instant self-provisioned tenant, and pretending otherwise would set the
 * wrong expectation on both sides.
 */
export default function SignupPage() {
  return (
    <Section className="pt-s7">
      <Reveal>
        <p className="text-[13px] font-semibold uppercase tracking-wide text-cta">Get started</p>
        <h1 className="mt-s2 max-w-3xl text-[34px] font-extrabold leading-[1.1] tracking-display-tight text-ink sm:text-[44px]">
          Create your account
        </h1>
        <p className="mt-s4 max-w-prose text-[18px] leading-prose text-slate-mid">
          Tell us who you are, confirm your email, and our team sets up your tenant — the chart of
          accounts, the roles, the numbering series and your administrator login. You will hear back
          within one working day.
        </p>
      </Reveal>

      {/*
        Form left, what-happens-next beside it.
        
        The card is held to a form's width on purpose — an input stretched across 1,150px reads as a
        banner with a line under it, not as a field to fill in. But that left the rest of a desktop
        page empty, with the three steps pushed below the fold, so the form floated in a void and
        the one thing that answers "what am I actually signing up for" was somewhere the reader had
        to go looking. Putting them alongside fills the column with the thing that belongs there.
      */}
      <div className="mt-s6 grid items-start gap-s5 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
        <Reveal className="rounded-2xl border border-sand-border bg-card p-s4 sm:p-s5">
          <SignupForm />
        </Reveal>

        <Reveal className="grid gap-s3">
        <Card title="1. Confirm your email">
          <p>
            A six-digit code, valid for ten minutes. It proves the address is yours before anything
            is created in your name.
          </p>
        </Card>
        <Card title="2. We review it">
          <p>
            A person checks the details and calls if anything needs clarifying. Nothing is
            provisioned automatically.
          </p>
        </Card>
        <Card title="3. You are set up">
          <p>
            You get your sign-in details and what the subscription covers, in one email. First
            sign-in asks you to set your own password and enrol two-factor authentication.
          </p>
        </Card>
        </Reveal>
      </div>

      <Reveal className="mt-s6 grid gap-s3 md:grid-cols-2">
        <Card title="Want to look first?">
          <p>
            A demo runs on your own product mix rather than a canned dataset. Ask for one on the{" "}
            <a href="/contact/" className="font-medium text-cta underline underline-offset-4">contact page</a>,
            or say so in the form above and we will set the account up as a trial.
          </p>
        </Card>
        <Card title="Already a customer?">
          <p>
            Sign in at{" "}
            <a href={SITE.appUrl} className="font-medium text-cta underline underline-offset-4 hover:text-cta-hover">
              app.lenviq.in
            </a>
            , or email{" "}
            <a href={`mailto:${COMPANY.email}`} className="font-medium text-cta underline underline-offset-4">
              {COMPANY.email}
            </a>
            .
          </p>
        </Card>
      </Reveal>
    </Section>
  );
}
