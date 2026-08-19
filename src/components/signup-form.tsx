"use client";

import * as React from "react";
import { COMPANY, SITE } from "@/lib/site";

/**
 * Self-serve signup: the details, a code sent to the address, and then it is with the team.
 *
 * **Why a code at all.** The other end of this form is a queue a person works through, and
 * approving a request creates a live tenant and emails a temporary password to whatever address
 * was typed. Without proof that the sender can read that mailbox, anyone could put any NBFC's name
 * — or any competitor's address — into that queue. One code removes the entire class.
 *
 * **The site has no server**, so both calls go to the product's API. That keeps it first-party:
 * no third-party form service, no script from another origin, and the privacy page's "this site
 * loads nothing from anyone else" stays true. The domain is never written here — `SITE.appUrl` is
 * the one place a domain lives in this repository.
 *
 * **Nothing typed is ever discarded.** If the API cannot be reached, the reader is told plainly and
 * handed the same content as a pre-filled email. That is the same rule the demo form follows, for
 * the same reason: a form that swallows a submission costs a real prospect and nobody finds out.
 */
const API = process.env.NEXT_PUBLIC_SIGNUP_API || `${SITE.appUrl}/api/public/signup`;

const PRODUCTS = [
  "Personal loans",
  "Business loans",
  "Loan against property",
  "Gold loans",
  "Vehicle loans",
  "Microfinance / JLG",
] as const;

const field =
  "mt-1 w-full rounded-lg border border-line bg-card px-3 py-2.5 text-[15px] text-ink " +
  "outline-none transition focus:border-cta focus:ring-2 focus:ring-cta/20";
const label = "text-[14px] font-medium text-ink";

/**
 * Which of the two steps this is.
 *
 * The page's own heading does not change between them — it is a server component and cannot know —
 * so without this the second step looks like the first one with different fields in it. Two steps
 * is a short enough journey that a bar would be overkill; naming the step is enough.
 */
function StepBadge({ step }: { step: 1 | 2 }) {
  const steps = ["Your details", "Confirm your email"] as const;
  return (
    <ol className="flex flex-wrap items-center gap-s2 text-[13px]" aria-label={`Step ${step} of 2`}>
      {steps.map((title, i) => {
        const n = (i + 1) as 1 | 2;
        const done = n < step;
        const now = n === step;
        return (
          <li key={title} className="flex items-center gap-s2">
            <span
              aria-current={now ? "step" : undefined}
              className={
                "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-medium " +
                (now ? "bg-cta text-white" : done ? "bg-sand text-ink" : "bg-sand text-slate-mid")
              }
            >
              <span className={"inline-flex h-4 w-4 items-center justify-center rounded-full text-[11px] font-semibold " +
                (now ? "bg-white/25 text-white" : "bg-white text-slate-mid")}>
                {done ? "\u2713" : n}
              </span>
              {title}
            </span>
            {n === 1 && <span aria-hidden className="text-sand-border">&rarr;</span>}
          </li>
        );
      })}
    </ol>
  );
}
const hint = "mt-1 text-[13px] text-slate-mid";

type Step = "details" | "code" | "done";

interface Details {
  companyName: string; contactName: string; email: string; mobile: string;
  cin: string; city: string; state: string; designation: string;
}

const EMPTY: Details = {
  companyName: "", contactName: "", email: "", mobile: "",
  cin: "", city: "", state: "", designation: "",
};

export function SignupForm() {
  const [step, setStep] = React.useState<Step>("details");
  const [d, setD] = React.useState<Details>(EMPTY);
  const [products, setProducts] = React.useState<string[]>([]);
  const [code, setCode] = React.useState("");
  const [busy, setBusy] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  /** Set only when the API itself could not be reached — the email fallback, never a dead end. */
  const [unreachable, setUnreachable] = React.useState(false);
  const [cooldown, setCooldown] = React.useState(0);

  const set = <K extends keyof Details>(k: K, v: Details[K]) => setD((p) => ({ ...p, [k]: v }));
  const toggle = (v: string) => setProducts((p) => (p.includes(v) ? p.filter((x) => x !== v) : [...p, v]));

  /** The resend countdown. One second at a time, cleared on unmount. */
  React.useEffect(() => {
    if (cooldown <= 0) return;
    const t = setTimeout(() => setCooldown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [cooldown]);

  /** The same content the API would have had, so the email fallback loses nothing. */
  function compose() {
    const line = (k: string, v: string) => (v.trim() ? `${k}: ${v}\n` : "");
    return (
      line("NBFC", d.companyName) + line("Contact", d.contactName) + line("Designation", d.designation) +
      line("Email", d.email) + line("Mobile", d.mobile) + line("CIN", d.cin) +
      line("City", d.city) + line("State", d.state) + line("Products", products.join(", "))
    );
  }

  function sendByEmail() {
    const subject = encodeURIComponent("Lenviq — account request");
    window.location.href = `mailto:${COMPANY.email}?subject=${subject}&body=${encodeURIComponent(compose())}`;
  }

  async function post(path: string, body: unknown): Promise<{ ok: boolean; data: Record<string, unknown> }> {
    const res = await fetch(`${API}/${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = (await res.json().catch(() => ({}))) as Record<string, unknown>;
    return { ok: res.ok, data };
  }

  async function submitDetails(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setBusy(true); setError(null); setUnreachable(false);
    try {
      const { ok, data } = await post("start", {
        ...d,
        productsInterested: products,
        referralSource: SITE.url,
        website: (new FormData(form).get("website") as string) ?? "",
      });
      if (!ok) { setError(String(data.error ?? "That did not go through.")); return; }
      setStep("code");
      setCooldown(60);
    } catch {
      setUnreachable(true);
    } finally {
      setBusy(false);
    }
  }

  async function submitCode(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true); setError(null);
    try {
      const { ok, data } = await post("verify", { email: d.email, code });
      if (!ok) { setError(String(data.error ?? "That code is not right.")); return; }
      setStep("done");
    } catch {
      setUnreachable(true);
    } finally {
      setBusy(false);
    }
  }

  async function resend() {
    setBusy(true); setError(null);
    try {
      const { ok, data } = await post("resend", { email: d.email });
      if (!ok) { setError(String(data.error ?? "Could not send another code.")); return; }
      setCooldown(60);
    } catch {
      setUnreachable(true);
    } finally {
      setBusy(false);
    }
  }

  // ---------------------------------------------------------------- done
  if (step === "done") {
    return (
      <div className="rounded-xl border border-cta/30 bg-cta/5 p-s4">
        <p className="text-[17px] font-semibold text-ink">Your address is confirmed — the request is with our team.</p>
        <p className="mt-2 text-[15px] leading-prose text-slate-mid">
          Someone will review it and set the account up, usually within one working day. You will get
          an email with your sign-in details and what the subscription covers. If anything needs
          clarifying we will call {d.mobile} first.
        </p>
        <p className="mt-3 text-[14px] text-slate-mid">
          Anything urgent: WhatsApp{" "}
          <a
            href={`https://wa.me/${COMPANY.phone.replace("+", "")}`}
            className="font-medium text-cta underline underline-offset-4"
            target="_blank"
            rel="noopener noreferrer"
          >
            {COMPANY.phoneDisplay}
          </a>
          .
        </p>
      </div>
    );
  }

  // ---------------------------------------------------------------- the code
  /**
   * The code step has to read as somewhere NEW.
   *
   * It did not. The page keeps its own heading — "Create your account" at 44px — and its intro
   * paragraph, and this step replaced the fields inside the card with a 17px line saying "Check
   * your email". So the loudest thing on the screen still described step one, the state change was
   * whispered, and the six-dot placeholder in a 12rem box did not look like anywhere to type a
   * code. Somebody who had just been sent one could reasonably not see where it went.
   *
   * Three changes, all about making the state obvious: the card announces which step this is, the
   * "we sent it" line is a confirmation rather than a caption, and the input is unmistakably a
   * six-digit code field.
   */
  if (step === "code") {
    return (
      <form onSubmit={submitCode} className="grid gap-s4">
        <StepBadge step={2} />

        {/* A tick, because something HAPPENED and the screen should say so. */}
        <div className="flex items-start gap-s3 rounded-xl border border-sand-border bg-sand p-s3">
          <svg viewBox="0 0 20 20" aria-hidden className="mt-0.5 h-5 w-5 shrink-0 text-cta" fill="currentColor">
            <path d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.7-9.3-4.5 4.5a1 1 0 0 1-1.4 0l-2-2a1 1 0 1 1 1.4-1.4l1.3 1.3 3.8-3.8a1 1 0 0 1 1.4 1.4Z" />
          </svg>
          <div>
            <p className="text-[17px] font-semibold text-ink">Code sent</p>
            <p className="mt-0.5 text-[14px] leading-relaxed text-slate-mid">
              Six digits, to <span className="font-medium text-ink">{d.email}</span>. It is good for
              ten minutes and can be used once.
            </p>
          </div>
        </div>

        <div>
          <label className={`${label} block`} htmlFor="code">Enter the six-digit code</label>
          <p className={hint}>Check the spam folder if it has not arrived in a minute.</p>
          {/*
            Wide, boxed and letter-spaced so it reads as a code field at a glance. One input rather
            than six boxes: paste, autofill and `one-time-code` all work on an ordinary input, and
            six separate boxes break every one of them for a look.
          */}
          <input
            id="code"
            name="code"
            value={code}
            onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
            inputMode="numeric"
            autoComplete="one-time-code"
            autoFocus
            required
            aria-describedby="code-hint"
            className="mt-s2 block w-full max-w-[20rem] rounded-xl border-2 border-cta/30 bg-card px-4 py-3 text-center font-mono text-[28px] font-semibold tracking-[0.5em] text-ink caret-cta outline-none transition placeholder:text-slate-mid/35 focus:border-cta focus:ring-4 focus:ring-cta/15"
            /* Dots, not zeros: at this size and letter-spacing a placeholder of "000000" reads as
               six digits somebody has already typed. */
            placeholder={"·".repeat(6)}
          />
          <p id="code-hint" className="mt-s2 text-[13px] text-slate-mid">
            {code.length}/6 entered
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-s3">
          <button
            type="submit"
            disabled={busy || code.length !== 6}
            className="rounded-lg bg-cta px-5 py-3 text-[16px] font-semibold text-white transition hover:bg-cta-hover disabled:opacity-60"
          >
            {busy ? "Checking…" : "Confirm"}
          </button>
          <button
            type="button"
            onClick={resend}
            disabled={busy || cooldown > 0}
            className="text-[14px] font-medium text-cta underline underline-offset-4 disabled:text-slate-mid disabled:no-underline"
          >
            {cooldown > 0 ? `Send it again in ${cooldown}s` : "Send it again"}
          </button>
          <button
            type="button"
            onClick={() => { setStep("details"); setError(null); setCode(""); }}
            className="text-[14px] text-slate-mid underline underline-offset-4"
          >
            Use a different address
          </button>
        </div>

        <p className="text-[13px] text-slate-mid">
          Nothing has been created yet. The account is set up only after our team reviews the request.
        </p>
      </form>
    );
  }

  // ---------------------------------------------------------------- the details
  return (
    <form onSubmit={submitDetails} className="relative grid gap-s4">
      <StepBadge step={1} />
      <div className="grid gap-s3 sm:grid-cols-2">
        <div>
          {/*
            Not "NBFC name".

            The product is a lending platform, and a lender is not always an NBFC — an HFC, a
            co-operative society, a Nidhi company or a fintech running a book are all people this
            is built for. A field that asks for an NBFC's name tells everyone else the software is
            not for them, at the first question on the form.
          */}
          <label className={label} htmlFor="companyName">Company / institution name <span className="text-cta">*</span></label>
          <input id="companyName" required value={d.companyName} onChange={(e) => set("companyName", e.target.value)}
            className={field} placeholder="As registered" />
        </div>
        <div>
          <label className={label} htmlFor="contactName">Your name <span className="text-cta">*</span></label>
          <input id="contactName" required autoComplete="name" value={d.contactName}
            onChange={(e) => set("contactName", e.target.value)} className={field} />
        </div>
        <div>
          <label className={label} htmlFor="email">Work email <span className="text-cta">*</span></label>
          <input id="email" type="email" required autoComplete="email" value={d.email}
            onChange={(e) => set("email", e.target.value)} className={field} />
          {/* Said before they type it, not after: this address becomes the administrator login,
              and finding that out at the code step is finding it out too late. */}
          <p className={hint}>We send a code here, and it becomes your administrator sign-in.</p>
        </div>
        <div>
          <label className={label} htmlFor="mobile">Mobile <span className="text-cta">*</span></label>
          <input id="mobile" type="tel" required inputMode="tel" pattern="[6-9][0-9]{9}" autoComplete="tel"
            value={d.mobile} onChange={(e) => set("mobile", e.target.value.replace(/\D/g, "").slice(0, 10))}
            className={field} placeholder="10 digits" />
          <p className={hint}>Same number on WhatsApp, if that is easier.</p>
        </div>
      </div>

      {/* Everything below is optional. Four required fields is already the most a first request
          should ask for; the rest exists so the review can start at the second question. */}
      <div className="grid gap-s3 sm:grid-cols-2">
        {/* The RBI Certificate of Registration was here and is deliberately not: only an NBFC has
            one, so asking for it is the same exclusion as the field above, further down the page.
            Whatever registration an applicant holds is a question for the review call. */}
        <div>
          <label className={label} htmlFor="cin">CIN</label>
          <input id="cin" value={d.cin} onChange={(e) => set("cin", e.target.value)} className={field} />
        </div>
        <div>
          <label className={label} htmlFor="city">City</label>
          <input id="city" value={d.city} onChange={(e) => set("city", e.target.value)} className={field} />
        </div>
        <div>
          <label className={label} htmlFor="state">State</label>
          <input id="state" value={d.state} onChange={(e) => set("state", e.target.value)} className={field} />
        </div>
        <div>
          <label className={label} htmlFor="designation">Your role</label>
          <input id="designation" value={d.designation} onChange={(e) => set("designation", e.target.value)}
            className={field} placeholder="Director, Operations Head…" />
        </div>
      </div>

      <fieldset>
        <legend className={label}>Which of these do you lend against?</legend>
        <p className={hint}>Optional — it decides which parts of the product are set up for you.</p>
        <div className="mt-2 grid gap-x-s3 gap-y-0.5 sm:grid-cols-2">
          {PRODUCTS.map((p) => (
            <label key={p} className="flex cursor-pointer select-none items-center gap-2.5 rounded-lg px-1 py-1.5 text-[15px] text-ink transition hover:text-cta">
              <input type="checkbox" checked={products.includes(p)} onChange={() => toggle(p)}
                className="h-4 w-4 shrink-0 rounded border-sand-border text-cta accent-[#C2410C]" />
              <span className={products.includes(p) ? "font-medium text-cta" : ""}>{p}</span>
            </label>
          ))}
        </div>
      </fieldset>

      {/* Honeypot. Never shown, never focusable, no autofill — a person cannot fill it and a bot
          that fills every input does. The endpoint answers a filled one with the same 200 a human
          gets, so a scraper learns nothing from the response. */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="website">Leave this empty</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {error && (
        <p className="rounded-lg border border-sand-border bg-sand p-s3 text-[14px] text-ink">{error}</p>
      )}

      {unreachable && (
        <div className="rounded-lg border border-sand-border bg-sand p-s3">
          <p className="text-[15px] font-medium text-ink">That did not send.</p>
          <p className="mt-1 text-[14px] leading-prose text-slate-mid">
            Nothing you typed is lost.{" "}
            <button type="button" onClick={sendByEmail} className="font-medium text-cta underline underline-offset-4">
              Send it as an email instead
            </button>{" "}
            — it opens pre-filled — or WhatsApp {COMPANY.phoneDisplay}.
          </p>
        </div>
      )}

      <div className="flex flex-wrap items-center gap-s3">
        <button
          type="submit"
          disabled={busy}
          className="rounded-lg bg-cta px-5 py-3 text-[16px] font-semibold text-white transition hover:bg-cta-hover disabled:opacity-60"
        >
          {busy ? "Sending the code…" : "Create account"}
        </button>
        <p className="text-[13px] text-slate-mid">
          No card, no commitment. We confirm the address, then a person reviews it.
        </p>
      </div>
    </form>
  );
}
