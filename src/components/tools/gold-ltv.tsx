"use client";

import * as React from "react";
import {
  goldEligibleValuePaise, ltvPct, maxLendablePaise, equivalent22k,
  capForAdvance, maxAdvanceBanded, LTV_BANDS, type GoldItem,
} from "@/lib/tools/finance";
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
  /**
  * The cap is derived, not typed.
  *
  * It defaulted to a flat 75%, which has been wrong since 1 April 2026: the Directions set three
  * bands by the SIZE of the advance — 85% up to ₹2.5 lakh, 80% to ₹5 lakh, 75% above. Most gold
  * loans written in India are small, so the old default understated the permitted advance on the
  * majority of them. A lender may still hold itself to a stricter internal cap, so it can be
  * overridden — but the regulatory band is what it starts from, and the page says which one.
  */
  const [override, setOverride] = React.useState<number | null>(null);
  const [outstanding, setOutstanding] = React.useState(0);
  const [items, setItems] = React.useState<GoldItem[]>([{ karat: 22, netGrams: 40 }]);

  const set = (i: number, patch: Partial<GoldItem>) =>
    setItems((xs) => xs.map((x, n) => (n === i ? { ...x, ...patch } : x)));

  const clean = items.filter((i) => Number.isFinite(i.netGrams) && i.netGrams > 0);
  const eq22 = clean.reduce((s, i) => s + equivalent22k(i), 0);
  const eligible = goldEligibleValuePaise(clean, R(rate));

  const banded = maxAdvanceBanded(eligible);
  const advance = outstanding > 0 ? R(outstanding) : banded.advancePaise;
  // The band follows the advance actually being made, not the maximum available.
  const band = capForAdvance(advance);
  const cap = override ?? band.capPct;
  const ltv = ltvPct(advance, eligible);
  const headroom = (outstanding > 0 ? maxLendablePaise(eligible, cap) : banded.advancePaise) - advance;
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
        <div className="rounded-input border border-line-strong bg-card p-s3">
          <p className="text-[14px] font-medium text-ink">
            LTV cap · {cap}%
            {override === null && <span className="ml-1 font-normal text-muted">(set by the band)</span>}
          </p>
          <p className="mt-1 text-[13px] leading-snug text-muted">
            An advance {band.label} is capped at {band.capPct}% under the 2025 Directions, in force
            since 1 April 2026.
          </p>
          <ul className="mt-s2 grid gap-0.5 text-[13px] text-muted">
            {LTV_BANDS.map((b) => (
              <li key={b.label} className={b.capPct === band.capPct && override === null ? "font-medium text-ink" : ""}>
                {b.label} — {b.capPct}%
              </li>
            ))}
          </ul>
          <label className="mt-s2 flex items-center gap-2 text-[13px] text-slate-mid">
            <input
              type="checkbox"
              checked={override !== null}
              onChange={(e) => setOverride(e.target.checked ? band.capPct : null)}
            />
            Use our own stricter cap
          </label>
          {override !== null && (
            <input
              type="number" value={override} min={1} max={100} step={1}
              onChange={(e) => setOverride(Number(e.target.value))}
              className="mt-1 w-full rounded-input border border-line-strong bg-card px-3 py-2 text-[15px] tabular-nums text-ink outline-none focus:border-cta"
            />
          )}
        </div>
        <Field id="g-out" label="Outstanding (leave 0 to see the maximum)" value={outstanding} onChange={setOutstanding} unit="₹" step={5000} />
      </div>

      <div className="grid gap-s3 sm:grid-cols-2">
        <Result label="22K equivalent weight" value={`${eq22.toFixed(3)} g`}
          sub={`from ${clean.length} item${clean.length === 1 ? "" : "s"} · net ${clean.reduce((s, i) => s + i.netGrams, 0).toFixed(3)} g`} />
        <Result label="Eligible value" value={rupees(eligible)} sub={`at ₹${rate.toLocaleString("en-IN")} a gram`} />
        <Result label={outstanding > 0 ? "Loan to value" : "Maximum advance"}
          value={outstanding > 0 ? `${ltv.toFixed(2)}%` : rupees(advance)}
          tone={over ? "bad" : "good"}
          sub={outstanding > 0
            ? `against the ${cap}% cap for an advance ${band.label}`
            : `at ${cap}% — the band for an advance ${band.label}`} />
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
          <p className="mt-s3">
            <strong className="text-ink">And the cap is not one number.</strong> Since 1 April 2026 it
            is banded by the size of the advance — 85% up to ₹2.5 lakh, 80% to ₹5 lakh, 75% above. A
            small packet is permitted a higher ratio than a large one against the same gold.
          </p>
        </div>
      </div>
    </div>
  );
}
