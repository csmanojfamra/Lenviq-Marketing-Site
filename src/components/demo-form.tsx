"use client";

import * as React from "react";
import { COMPANY, SITE } from "@/lib/site";

/**
 * The demo request form.
 *
 * **It never silently discards a submission.** That was the reason this page shipped as a `mailto:`
 * in the first place: a form that swallows what a prospect typed is the same defect as a "Forgot
 * password?" link for a flow that does not exist, except here it costs a real enquiry and nobody
 * ever finds out. So there are exactly two outcomes — the endpoint accepted it, or the reader is
 * told plainly and handed the same content as a pre-filled email they can send themselves.
 *
 * The site is a static export with no server of its own, so the POST goes to the product's API on
 * `app.lenviq.in`. That keeps it first-party: no third-party form service, no script from another
 * origin, and the "this site loads nothing from anyone else" claim on the privacy page stays true.
 * Until that endpoint exists, `DEMO_ENDPOINT` is empty and every submission takes the email path —
 * which works today rather than failing quietly.
 */
const DEMO_ENDPOINT = process.env.NEXT_PUBLIC_DEMO_ENDPOINT ?? "";

const PRODUCTS = [
  "Personal loans",
  "Business loans",
  "Loan against property",
  "Gold loans",
  "Vehicle loans",
  "Microfinance / JLG",
  "Consumer durables",
] as const;

const BOOK_SIZE = ["Under 1,000", "1,000 – 10,000", "10,000 – 50,000", "Over 50,000"] as const;

const RUNNING_ON = [
  "Spreadsheets",
  "An in-house system",
  "Another vendor's software",
  "Nothing yet — we are starting out",
] as const;

/**
 * The questions that make the first call worth having.
 *
 * Deliberately the things a lender is actually examined on rather than a feature checklist. Someone
 * who has sat through an inspection recognises this list, and recognising it is the point: it says
 * the person on the other end knows what the conversation is about before it starts.
 */
const PRESSURES = [
  "IRAC / DPD classification",
  "Penal charges under the 2023 circular",
  "The Key Facts Statement",
  "Gold loan LTV and auction process",
  "DNBS returns",
  "Audit trail and books retention",
  "Co-lending or partnership reporting",
] as const;

type Status = "idle" | "sending" | "sent" | "failed";

const field =
  "mt-1 w-full rounded-lg border border-line bg-card px-3 py-2.5 text-[15px] text-ink " +
  "outline-none transition focus:border-cta focus:ring-2 focus:ring-cta/20";
const label = "text-[14px] font-medium text-ink";
const hint = "mt-1 text-[13px] text-slate-mid";

function Chip({ checked, onChange, children }: { checked: boolean; onChange: () => void; children: React.ReactNode }) {
  return (
    <label
      className={
        "cursor-pointer select-none rounded-full border px-3.5 py-1.5 text-[14px] transition " +
        (checked
          ? "border-cta bg-cta/10 text-cta"
          : "border-sand-border bg-card text-slate-mid hover:border-cta/40")
      }
    >
      <input type="checkbox" checked={checked} onChange={onChange} className="sr-only" />
      {children}
    </label>
  );
}

export function DemoForm() {
  const [status, setStatus] = React.useState<Status>("idle");
  const [error, setError] = React.useState<string | null>(null);
  const [products, setProducts] = React.useState<string[]>([]);
  const [pressures, setPressures] = React.useState<string[]>([]);

  const toggle = (list: string[], set: (v: string[]) => void, v: string) =>
    set(list.includes(v) ? list.filter((x) => x !== v) : [...list, v]);

  /** The same content either way, so the email fallback loses nothing the endpoint would have had. */
  function compose(f: FormData) {
    const line = (k: string, v: unknown) => (v && String(v).length ? `${k}: ${v}\n` : "");
    return (
      line("NBFC", f.get("company")) +
      line("Name", f.get("name")) +
      line("Email", f.get("email")) +
      line("Mobile", f.get("mobile")) +
      line("Products", products.join(", ")) +
      line("Active loan accounts", f.get("bookSize")) +
      line("Branches", f.get("branches")) +
      line("Running on", f.get("runningOn")) +
      line("Where the pressure is", pressures.join(", ")) +
      line("Anything else", f.get("notes"))
    );
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const f = new FormData(form);
    const body = compose(f);

    if (!DEMO_ENDPOINT) return sendByEmail(body);

    setStatus("sending");
    setError(null);
    try {
      const res = await fetch(DEMO_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          website: f.get("website"),
          company: f.get("company"),
          name: f.get("name"),
          email: f.get("email"),
          mobile: f.get("mobile"),
          products,
          bookSize: f.get("bookSize"),
          branches: f.get("branches"),
          runningOn: f.get("runningOn"),
          pressures,
          notes: f.get("notes"),
          source: SITE.url,
        }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("sent");
      form.reset();
      setProducts([]);
      setPressures([]);
    } catch {
      // Not "something went wrong". The reader is told what to do next, and the content they
      // typed is carried into it so nothing has to be re-entered.
      setStatus("failed");
      setError(body);
    }
  }

  function sendByEmail(body: string) {
    const subject = encodeURIComponent("Lenviq — demo request");
    window.location.href = `mailto:${COMPANY.email}?subject=${subject}&body=${encodeURIComponent(body)}`;
  }

  if (status === "sent") {
    return (
      <div className="rounded-xl border border-cta/30 bg-cta/5 p-s4">
        <p className="text-[17px] font-semibold text-ink">Received — thank you.</p>
        <p className="mt-2 text-[15px] leading-prose text-slate-mid">
          Someone who can answer technical questions will reply, usually within one working day. If
          it is urgent, WhatsApp is faster:{" "}
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

  return (
    <form onSubmit={onSubmit} className="relative grid gap-s4">
      <div className="grid gap-s3 sm:grid-cols-2">
        <div>
          <label className={label} htmlFor="company">
            NBFC name <span className="text-cta">*</span>
          </label>
          <input id="company" name="company" required className={field} placeholder="As registered with the RBI" />
        </div>
        <div>
          <label className={label} htmlFor="name">
            Your name <span className="text-cta">*</span>
          </label>
          <input id="name" name="name" required className={field} autoComplete="name" />
        </div>
        <div>
          <label className={label} htmlFor="email">
            Email <span className="text-cta">*</span>
          </label>
          <input id="email" name="email" type="email" required className={field} autoComplete="email" />
        </div>
        <div>
          <label className={label} htmlFor="mobile">
            Mobile <span className="text-cta">*</span>
          </label>
          <input
            id="mobile"
            name="mobile"
            type="tel"
            required
            inputMode="tel"
            pattern="[0-9+ ]{10,15}"
            className={field}
            autoComplete="tel"
            placeholder="+91"
          />
          <p className={hint}>Same number on WhatsApp, if that is easier.</p>
        </div>
      </div>

      {/* Everything below is optional. Four required fields is already the most a first enquiry
          should be asked for; the rest exists so the first call can start at the second question
          instead of the first. */}
      <fieldset>
        <legend className={label}>What do you lend against?</legend>
        <p className={hint}>Optional. It decides which parts of the demo are worth showing.</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {PRODUCTS.map((p) => (
            <Chip key={p} checked={products.includes(p)} onChange={() => toggle(products, setProducts, p)}>
              {p}
            </Chip>
          ))}
        </div>
      </fieldset>

      <div className="grid gap-s3 sm:grid-cols-3">
        <div>
          <label className={label} htmlFor="bookSize">Active loan accounts</label>
          <select id="bookSize" name="bookSize" className={field} defaultValue="">
            <option value="">Prefer not to say</option>
            {BOOK_SIZE.map((b) => <option key={b} value={b}>{b}</option>)}
          </select>
        </div>
        <div>
          <label className={label} htmlFor="branches">Branches</label>
          <input id="branches" name="branches" inputMode="numeric" className={field} placeholder="e.g. 4" />
        </div>
        <div>
          <label className={label} htmlFor="runningOn">Running on today</label>
          <select id="runningOn" name="runningOn" className={field} defaultValue="">
            <option value="">Prefer not to say</option>
            {RUNNING_ON.map((r) => <option key={r} value={r}>{r}</option>)}
          </select>
        </div>
      </div>

      <fieldset>
        <legend className={label}>Where is the pressure right now?</legend>
        <p className={hint}>
          Optional, and the most useful thing on this form. Pick what is actually being asked of you.
        </p>
        <div className="mt-2 flex flex-wrap gap-2">
          {PRESSURES.map((p) => (
            <Chip key={p} checked={pressures.includes(p)} onChange={() => toggle(pressures, setPressures, p)}>
              {p}
            </Chip>
          ))}
        </div>
      </fieldset>

      <div>
        <label className={label} htmlFor="notes">Anything else</label>
        <textarea id="notes" name="notes" rows={3} className={field} />
      </div>

      {/* Honeypot. Never shown, never focusable, and no autofill — a person cannot fill it, and a
          bot that fills every input does. The endpoint answers a filled one with the same 200 a
          human gets, so a scraper learns nothing from the response. */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="website">Leave this empty</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {status === "failed" && (
        <div className="rounded-lg border border-sand-border bg-sand p-s3">
          <p className="text-[15px] font-medium text-ink">That did not send.</p>
          <p className="mt-1 text-[14px] leading-prose text-slate-mid">
            Nothing you typed is lost.{" "}
            <button
              type="button"
              onClick={() => error && sendByEmail(error)}
              className="font-medium text-cta underline underline-offset-4"
            >
              Send it as an email instead
            </button>{" "}
            — it opens pre-filled — or WhatsApp {COMPANY.phoneDisplay}.
          </p>
        </div>
      )}

      <div className="flex flex-wrap items-center gap-s3">
        <button
          type="submit"
          disabled={status === "sending"}
          className="rounded-lg bg-cta px-5 py-3 text-[16px] font-semibold text-white transition hover:bg-cta-hover disabled:opacity-60"
        >
          {status === "sending" ? "Sending…" : "Request a demo"}
        </button>
        <p className="text-[13px] text-slate-mid">
          No newsletter, no drip sequence. One reply from a person.
        </p>
      </div>
    </form>
  );
}
