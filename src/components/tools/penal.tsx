"use client";

import * as React from "react";
import { penalCharge, PENAL_DISCLOSURE, type PenalBasis } from "@/lib/tools/penal";
import { Field, Result } from "./field";

const inr = (n: number) =>
  "₹" + n.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const BASIS: { id: PenalBasis; label: string; unit: string }[] = [
  { id: "PCT_PER_MONTH", label: "% a month", unit: "%" },
  { id: "PCT_PER_ANNUM", label: "% a year", unit: "%" },
  { id: "FLAT_PER_INSTANCE", label: "Flat amount", unit: "₹" },
];

export function PenalCalculator() {
  const [overdueRupees, setOverdue] = React.useState(25000);
  const [daysOverdue, setDays] = React.useState(45);
  const [basis, setBasis] = React.useState<PenalBasis>("PCT_PER_MONTH");
  const [rate, setRate] = React.useState(2);
  const [graceDays, setGrace] = React.useState(0);
  const [consumerLoan, setConsumer] = React.useState(true);
  const [comparableNonIndividualRate, setComparable] = React.useState(2);

  const r = penalCharge({
    overdueRupees, daysOverdue, basis, rate, graceDays, consumerLoan, comparableNonIndividualRate,
  });
  const unit = BASIS.find((b) => b.id === basis)!.unit;
  const failed = r.checks.filter((c) => !c.ok);

  return (
    <div className="mt-s5 grid gap-s5 lg:grid-cols-[minmax(0,20rem)_1fr]">
      <div className="grid gap-s4 self-start rounded-card border border-line bg-subtle p-s4">
        <Field id="p-amt" label="Amount in default" value={overdueRupees} onChange={setOverdue} unit="₹" step={1000}
          hint="The instalment or amount that was not paid — not the outstanding principal." />
        <Field id="p-days" label="Days overdue" value={daysOverdue} onChange={setDays} unit="days" step={1} />
        <fieldset>
          <legend className="text-[14px] font-medium text-ink">How the charge is set</legend>
          <div className="mt-1 grid gap-2">
            {BASIS.map((b) => (
              <button key={b.id} type="button" onClick={() => setBasis(b.id)} aria-pressed={basis === b.id}
                className={
                  "rounded-input border px-3 py-2 text-left text-[14px] font-medium transition-colors " +
                  (basis === b.id ? "border-cta bg-cta text-white" : "border-line-strong bg-card text-ink hover:border-cta")
                }>
                {b.label}
              </button>
            ))}
          </div>
        </fieldset>
        <Field id="p-rate" label="Your penal charge" value={rate} onChange={setRate} unit={unit} step={0.25} />
        <Field id="p-grace" label="Grace before charging" value={graceDays} onChange={setGrace} unit="days" step={1}
          hint="A commercial choice. It reduces the charge; it never delays the account being flagged overdue." />
        <label className="flex items-start gap-2 text-[15px] text-ink">
          <input type="checkbox" checked={consumerLoan} onChange={(e) => setConsumer(e.target.checked)} className="mt-1" />
          <span>A loan to an individual for a purpose other than business</span>
        </label>
        {consumerLoan && (
          <Field id="p-cmp" label="What a business borrower pays for the same breach" value={comparableNonIndividualRate}
            onChange={setComparable} unit={unit} step={0.25} />
        )}
      </div>

      <div className="grid gap-s3">
        <div className="grid gap-s3 sm:grid-cols-3">
          <Result label="Penal charge" value={inr(r.chargeRupees)} tone={failed.length ? "warn" : "good"}
            sub={basis === "FLAT_PER_INSTANCE" ? "Per instance" : `over ${r.chargeableDays} chargeable days`} />
          <Result label="Chargeable days" value={String(r.chargeableDays)}
            sub={graceDays > 0 ? `${daysOverdue} overdue, less ${graceDays} of grace` : "No grace applied"} />
          <Result label="Still overdue for" value={`${daysOverdue} days`}
            sub="Grace reduces the charge, not the days past due" />
        </div>

        <div className="rounded-card border border-line bg-card p-s5">
          <h2 className="font-display text-[19px] font-bold tracking-display text-ink">
            What the 2024 rules require of this charge
          </h2>
          <ul className="mt-s3 grid gap-s3">
            {r.checks.map((c) => (
              <li key={c.label} className="grid grid-cols-[1.2rem_1fr] gap-s2">
                <span aria-hidden="true" className={"mt-1 text-[15px] font-bold " + (c.ok ? "text-[color:var(--color-success)]" : "text-[color:var(--color-warning-fg)]")}>
                  {c.ok ? "✓" : "!"}
                </span>
                <span>
                  <span className="block text-[15px] font-medium text-ink">{c.label}</span>
                  <span className="mt-0.5 block text-[14px] leading-relaxed text-slate-mid">{c.detail}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-card border border-line bg-subtle p-s4">
          <h2 className="font-display text-[17px] font-bold tracking-display text-ink">
            Where the quantum and the reason have to appear
          </h2>
          <ul className="mt-s2 grid gap-1.5">
            {PENAL_DISCLOSURE.map((d) => (
              <li key={d} className="grid grid-cols-[0.6rem_1fr] gap-s2 text-[15px] leading-relaxed text-slate-mid">
                <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 rounded-full bg-cta" />
                <span>{d}</span>
              </li>
            ))}
          </ul>
          <p className="mt-s3 max-w-prose text-[15px] leading-relaxed text-slate-mid">
            The circular does not reach credit cards, external commercial borrowings, trade credits or
            structured obligations.
          </p>
        </div>
      </div>
    </div>
  );
}
