"use client";

import * as React from "react";
import { goldEligibleValuePaise, ltvPct, maxLendablePaise, equivalent22k, type GoldItem } from "@/lib/tools/finance";
import { Field, Result, rupees } from "./field";

const R = (r: number) => BigInt(Math.round((Number.isFinite(r) ? r : 0) * 100));

const KARATS = [24, 22, 20, 18, 14];

/**
 * A mixed packet, valued the way a gold book has to value it.
 *
 * The step that gets skipped by hand is the purity conversion: the reference rate is quoted for 22
 * carat, so every item is converted to its 22-carat equivalent weight before it is priced. A
 * 24-carat coin is worth more per gram than the rate; an 18-carat bangle less.
 */
export function GoldLtvCalculator() {
  const [rate, setRate] = React.useState(6800);
  const [cap, setCap] = React.useState(75);
  const [outstanding, setOutstanding] = React.useState(0);
  const [items, setItems] = React.useState<GoldItem[]>([{ karat: 22, netGrams: 40 }]);

  const set = (i: number, patch: Partial<GoldItem>) =>
    setItems((xs) => xs.map((x, n) => (n === i ? { ...x, ...patch } : x)));

  const clean = items.filter((i) => Number.isFinite(i.netGrams) && i.netGrams > 0);
  const eq22 = clean.reduce((s, i) => s + equivalent22k(i), 0);
  const eligible = goldEligibleValuePaise(clean, R(rate));
  const advance = outstanding > 0 ? R(outstanding) : maxLendablePaise(eligible, cap);
  const ltv = ltvPct(advance, eligible);
  const headroom = maxLendablePaise(eligible, cap) - advance;
  const over = ltv > cap;
  /**
   * What the same advance becomes if the rate falls a tenth.
   *
   * The fourth card used to show headroom, which reads "₹0" whenever the advance IS the maximum —
   * true, and useless. The question a gold lender actually has is the one the Directions are about:
   * this is inside the cap today, what happens when the price moves.
   */
  const stressed = goldEligibleValuePaise(clean, R(rate * 0.9));
  const stressedLtv = ltvPct(advance, stressed);

  return (
    <div className="mt-s5 grid gap-s5 lg:grid-cols-[minmax(0,22rem)_1fr]">
      <div className="grid gap-s4 self-start rounded-card border border-line bg-subtle p-s4">
        <div className="grid gap-s3">
          <p className="text-[14px] font-medium text-ink">Ornaments in the packet</p>
          {items.map((it, i) => (
            <div key={i} className="grid grid-cols-[5.5rem_1fr_2rem] items-end gap-2">
              <label className="block">
                <span className="block text-[13px] text-muted">Purity</span>
                <select
                  value={it.karat}
                  onChange={(e) => set(i, { karat: Number(e.target.value) })}
                  className="mt-1 w-full rounded-input border border-line-strong bg-card px-2 py-2.5 text-[15px] text-ink outline-none focus:border-cta"
                >
                  {KARATS.map((k) => <option key={k} value={k}>{k}K</option>)}
                </select>
              </label>
              <Field
                id={`g-${i}`} label="Net weight" value={it.netGrams}
                onChange={(n) => set(i, { netGrams: n })} unit="g" step={0.1}
              />
              <button
                type="button"
                aria-label={`Remove item ${i + 1}`}
                onClick={() => setItems((xs) => xs.filter((_, n) => n !== i))}
                disabled={items.length === 1}
                className="mb-1 rounded-input border border-line-strong px-2 py-2 text-[15px] text-muted transition-colors hover:text-ink disabled:opacity-40"
              >
                ×
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => setItems((xs) => [...xs, { karat: 22, netGrams: 10 }])}
            className="justify-self-start rounded-input border border-line-strong px-3 py-2 text-[14px] font-medium text-ink transition-colors hover:border-cta"
          >
            + Add an item
          </button>
        </div>

        <Field id="g-rate" label="22K reference rate" value={rate} onChange={setRate} unit="₹/g" step={50}
          hint="Net weight only — stones and wastage already deducted." />
        <Field id="g-cap" label="LTV cap" value={cap} onChange={setCap} unit="%" step={1} max={100} />
        <Field id="g-out" label="Outstanding (leave 0 to see the maximum)" value={outstanding} onChange={setOutstanding} unit="₹" step={5000} />
      </div>

      <div className="grid gap-s3 sm:grid-cols-2">
        <Result label="22K equivalent weight" value={`${eq22.toFixed(3)} g`}
          sub={`from ${clean.length} item${clean.length === 1 ? "" : "s"} · net ${clean.reduce((s, i) => s + i.netGrams, 0).toFixed(3)} g`} />
        <Result label="Eligible value" value={rupees(eligible)} sub={`at ₹${rate.toLocaleString("en-IN")} a gram`} />
        <Result label={outstanding > 0 ? "Loan to value" : "Maximum advance"}
          value={outstanding > 0 ? `${ltv.toFixed(2)}%` : rupees(advance)}
          tone={over ? "bad" : "good"}
          sub={outstanding > 0 ? `against a ${cap}% cap` : `${cap}% of eligible value`} />
        {over ? (
          <Result label="Over the cap by" value={rupees(-headroom)} tone="bad"
            sub="A renewal or a top-up is not permitted at this valuation" />
        ) : (
          <Result label="If the rate falls 10%" value={`${stressedLtv.toFixed(2)}%`}
            tone={stressedLtv > cap ? "warn" : "good"}
            sub={stressedLtv > cap
              ? `Crosses the ${cap}% cap with nothing happening to the loan`
              : `Still inside the ${cap}% cap`} />
        )}

        <div className="sm:col-span-2 rounded-card border border-line bg-card p-s4 text-[15px] leading-relaxed text-slate-mid">
          <p>
            <strong className="text-ink">The value moves without the loan moving.</strong> Drop the rate
            and the same advance against the same ornaments crosses the cap on its own. That is why the
            2025 Directions require loan-to-value to be maintained through the life of the loan rather
            than tested once at sanction — and why a renewal or a top-up has to be priced on today’s
            valuation, not the one at pledge.
          </p>
        </div>
      </div>
    </div>
  );
}
