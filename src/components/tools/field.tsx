"use client";

import * as React from "react";

/**
 * The shared controls for every calculator.
 *
 * Deliberately plain: a labelled input, a unit, and a hint. No sliders — a lender types an exact
 * sanctioned amount and a slider makes that harder, not easier. No "calculate" button either; the
 * answer updates as they type, because the question these tools answer is usually "what happens if
 * I change this".
 */
export function Field({
  label, value, onChange, unit, hint, min = 0, max, step = 1, id,
}: {
  label: string;
  value: number;
  onChange: (n: number) => void;
  unit?: string;
  hint?: string;
  min?: number;
  max?: number;
  step?: number;
  id: string;
}) {
  return (
    <label htmlFor={id} className="block">
      <span className="block text-[14px] font-medium text-ink">{label}</span>
      <span className="mt-1 flex items-center gap-2 rounded-input border border-line-strong bg-card focus-within:border-cta focus-within:ring-2 focus-within:ring-cta-ring">
        {unit === "₹" && <span className="pl-3 text-[15px] text-muted">₹</span>}
        <input
          id={id}
          type="number"
          inputMode="decimal"
          value={Number.isFinite(value) ? value : ""}
          min={min}
          max={max}
          step={step}
          onChange={(e) => onChange(e.target.value === "" ? NaN : Number(e.target.value))}
          className={`w-full bg-transparent py-2.5 text-[16px] tabular-nums text-ink outline-none ${unit === "₹" ? "pr-3" : "px-3"}`}
        />
        {unit && unit !== "₹" && (
          <span className="whitespace-nowrap pr-3 text-[15px] text-muted">{unit}</span>
        )}
      </span>
      {hint && <span className="mt-1 block text-[13px] leading-snug text-muted">{hint}</span>}
    </label>
  );
}

/** A date, kept as an ISO string so nothing is ever parsed out of a locale format. */
export function DateField({
  label, value, onChange, hint, id,
}: { label: string; value: string; onChange: (s: string) => void; hint?: string; id: string }) {
  return (
    <label htmlFor={id} className="block">
      <span className="block text-[14px] font-medium text-ink">{label}</span>
      <input
        id={id}
        type="date"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full rounded-input border border-line-strong bg-card px-3 py-2.5 text-[16px] tabular-nums text-ink outline-none focus:border-cta focus:ring-2 focus:ring-cta-ring"
      />
      {hint && <span className="mt-1 block text-[13px] leading-snug text-muted">{hint}</span>}
    </label>
  );
}

/** One answer, with the headline figure large enough to read across a desk. */
export function Result({
  label, value, sub, tone = "plain",
}: { label: string; value: string; sub?: string; tone?: "plain" | "good" | "warn" | "bad" }) {
  const ring =
    tone === "good" ? "border-l-[3px] border-l-[color:var(--color-success)]"
    : tone === "warn" ? "border-l-[3px] border-l-[color:var(--color-warning)]"
    : tone === "bad" ? "border-l-[3px] border-l-[color:var(--color-danger,#dc2626)]"
    : "border-l-[3px] border-l-line-strong";
  return (
    <div className={`rounded-card border border-line bg-card p-s4 ${ring}`}>
      <p className="text-[13px] uppercase tracking-wide text-muted">{label}</p>
      <p className="mt-1 font-display text-[26px] font-extrabold tabular-nums tracking-display-tight text-ink">
        {value}
      </p>
      {sub && <p className="mt-1 text-[14px] leading-snug text-slate-mid">{sub}</p>}
    </div>
  );
}

/**
 * ₹ with Indian digit grouping. The argument is ALWAYS paise.
 *
 * It used to divide only when handed a bigint and take a number as rupees already — an ambiguity
 * that immediately produced what it was always going to produce: four figures on the APR page came
 * out a hundred times too large, because the amounts computed as plain numbers were paise too.
 * One rule, no branch, no way to hold it wrong.
 */
export const rupees = (paise: bigint | number, dp = 0): string => {
  const n = Number(paise) / 100;
  if (!Number.isFinite(n)) return "—";
  return "₹" + n.toLocaleString("en-IN", { minimumFractionDigits: dp, maximumFractionDigits: dp });
};
