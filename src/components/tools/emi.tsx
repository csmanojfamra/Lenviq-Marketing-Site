"use client";

import * as React from "react";
import { computeEmi, computeApr, amortise, flatRate } from "@/lib/tools/finance";
import { Field, Result, rupees } from "./field";

const R = (r: number) => BigInt(Math.round((Number.isFinite(r) ? r : 0) * 100));

/**
 * An EMI calculator that answers the three things the ordinary ones leave out.
 *
 * Everyone has an EMI calculator, and they all stop at the instalment. What a borrower or a lender
 * still cannot see is: what a FLAT rate really costs in reducing-balance terms, whether the
 * schedule actually closes on the amount sanctioned, and what is still owed part-way through.
 */
export function EmiCalculator() {
  const [principal, setPrincipal] = React.useState(500000);
  const [rate, setRate] = React.useState(12);
  const [months, setMonths] = React.useState(24);
  const [basis, setBasis] = React.useState<"REDUCING" | "FLAT">("REDUCING");
  const [showAll, setShowAll] = React.useState(false);

  const ok = principal > 0 && months > 0 && rate >= 0;
  const flat = ok ? flatRate(R(principal), rate, months) : null;

  // On a flat quote the borrower's real cost is the reducing rate behind it — so the schedule is
  // built on that, which is what the loan actually behaves like.
  const effectiveRate = basis === "FLAT" ? (flat?.effectiveReducingPct ?? 0) : rate;
  const emi = basis === "FLAT" ? (flat?.emiPaise ?? 0n) : ok ? computeEmi(R(principal), rate, months) : 0n;
  const rows = ok ? amortise(R(principal), effectiveRate, months) : [];
  const totalInterest = rows.reduce((s, r) => s + r.interestPaise, 0n);
  const apr = ok ? computeApr(R(principal), 0n, emi, months) : 0;
  const shown = showAll ? rows : rows.slice(0, 6);
  const halfway = rows[Math.floor(rows.length / 2) - 1];

  return (
    <div className="mt-s5 grid gap-s5 lg:grid-cols-[minmax(0,20rem)_1fr]">
      <div className="grid gap-s4 self-start rounded-card border border-line bg-subtle p-s4">
        <Field id="e-p" label="Loan amount" value={principal} onChange={setPrincipal} unit="₹" step={10000} />
        <fieldset>
          <legend className="text-[14px] font-medium text-ink">How the rate is quoted</legend>
          <div className="mt-1 grid grid-cols-2 gap-2">
            {(["REDUCING", "FLAT"] as const).map((b) => (
              <button
                key={b} type="button" onClick={() => setBasis(b)} aria-pressed={basis === b}
                className={
                  "rounded-input border px-3 py-2 text-[14px] font-medium transition-colors " +
                  (basis === b ? "border-cta bg-cta text-white" : "border-line-strong bg-card text-ink hover:border-cta")
                }
              >
                {b === "REDUCING" ? "Reducing" : "Flat"}
              </button>
            ))}
          </div>
          <p className="mt-1 text-[13px] leading-snug text-muted">
            {basis === "REDUCING"
              ? "Interest on the balance still outstanding — how most loans are quoted."
              : "Interest on the whole original amount for the whole tenure, even after most of it is repaid."}
          </p>
        </fieldset>
        <Field id="e-r" label={basis === "FLAT" ? "Flat rate" : "Interest rate"} value={rate} onChange={setRate} unit="% p.a." step={0.25} />
        <Field id="e-m" label="Tenure" value={months} onChange={setMonths} unit="months" step={1} min={1} />
      </div>

      <div className="grid gap-s3">
        <div className="grid gap-s3 sm:grid-cols-3">
          <Result label="Monthly instalment" value={ok ? rupees(emi) : "—"} sub={ok ? `× ${months} months` : undefined} />
          <Result label="Total interest" value={ok ? rupees(totalInterest) : "—"}
            sub={ok ? `${((Number(totalInterest) / (principal * 100)) * 100).toFixed(1)}% of the amount borrowed` : undefined} />
          <Result label="Total repayment" value={ok ? rupees(R(principal) + totalInterest) : "—"} />
        </div>

        {basis === "FLAT" && flat && ok && (
          <div className="rounded-card border-l-[3px] border-l-[color:var(--color-warning)] border border-line bg-card p-s4">
            <p className="text-[13px] uppercase tracking-wide text-muted">What this flat rate really is</p>
            <p className="mt-1 font-display text-[28px] font-extrabold tabular-nums tracking-display-tight text-ink">
              {flat.effectiveReducingPct.toFixed(2)}% reducing
            </p>
            <p className="mt-s2 max-w-prose text-[15px] leading-relaxed text-slate-mid">
              A {rate}% flat rate over {months} months costs the same as{" "}
              <strong className="text-ink">{flat.effectiveReducingPct.toFixed(2)}% on a reducing balance</strong> —
              nearly {(flat.effectiveReducingPct / rate).toFixed(1)} times the number quoted. Interest is
              charged on the full {rupees(principal * 100)} for all {months} months, even though most of it
              has been repaid long before the end. This is the figure a Key Facts Statement has to disclose.
            </p>
          </div>
        )}

        {ok && halfway && (
          <div className="grid gap-s3 sm:grid-cols-2">
            <Result label={`Still owed after ${halfway.n} of ${months}`} value={rupees(halfway.closingPaise)}
              sub={`${((Number(halfway.closingPaise) / (principal * 100)) * 100).toFixed(0)}% of the loan still outstanding at the halfway point`} />
            <Result label="Annual percentage rate" value={`${apr.toFixed(2)}%`}
              sub="Before any fee. Add processing charges in the APR calculator." />
          </div>
        )}

        {rows.length > 0 && (
          <div>
            <h2 className="font-display text-[19px] font-bold tracking-display text-ink">
              Repayment schedule
            </h2>
            <p className="mt-1 max-w-prose text-[15px] leading-relaxed text-slate-mid">
              The last instalment carries the rounding, so the principal columns add up to{" "}
              {rupees(principal * 100)} exactly and the balance closes at zero — not near it.
            </p>
            <div className="mt-s3 overflow-x-auto rounded-card border border-line bg-card">
              <table className="w-full min-w-[34rem] text-[15px] tabular-nums">
                <thead>
                  <tr className="border-b border-line bg-subtle text-[13px] uppercase tracking-wide text-muted">
                    <th className="px-s3 py-s2 text-left font-semibold">#</th>
                    <th className="px-s3 py-s2 text-right font-semibold">Instalment</th>
                    <th className="px-s3 py-s2 text-right font-semibold">Principal</th>
                    <th className="px-s3 py-s2 text-right font-semibold">Interest</th>
                    <th className="px-s3 py-s2 text-right font-semibold">Balance</th>
                  </tr>
                </thead>
                <tbody>
                  {shown.map((r) => (
                    <tr key={r.n} className="border-b border-line last:border-0">
                      <td className="px-s3 py-s2 text-muted">{r.n}</td>
                      <td className="px-s3 py-s2 text-right text-ink">{rupees(r.emiPaise)}</td>
                      <td className="px-s3 py-s2 text-right text-ink">{rupees(r.principalPaise)}</td>
                      <td className="px-s3 py-s2 text-right text-slate-mid">{rupees(r.interestPaise)}</td>
                      <td className="px-s3 py-s2 text-right text-ink">{rupees(r.closingPaise)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {rows.length > 6 && (
              <button type="button" onClick={() => setShowAll((v) => !v)}
                className="mt-s3 text-[15px] font-medium text-cta underline-offset-2 hover:underline">
                {showAll ? "Show the first six only" : `Show all ${rows.length} instalments`}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
