"use client";

import * as React from "react";
import {
  RETURNS, applicable, quarterEnds, monthEnds, addDays,
  LAYER_LABEL, LAYER_HELP, CATEGORY_LABEL,
  type Layer, type Category, type Profile, type ReturnDef,
} from "@/lib/tools/returns";
import { Field } from "./field";

const fmt = (d: Date) =>
  d.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric", timeZone: "UTC" });

const FY_START = 2026;

/** Every due date this return generates across the chosen financial year. */
function dueDates(r: ReturnDef, fy: number): { on: Date; forPeriod: string }[] {
  if (r.frequency === "QUARTERLY" && r.days) {
    return quarterEnds(fy).map((q, i) => ({ on: addDays(q, r.days!), forPeriod: `Q${i + 1} ending ${fmt(q)}` }));
  }
  if (r.frequency === "MONTHLY" && r.days) {
    return monthEnds(fy).map((m) => ({ on: addDays(m, r.days!), forPeriod: `Month ending ${fmt(m)}` }));
  }
  if (r.frequency === "ANNUAL") {
    return [{ on: new Date(Date.UTC(fy, 11, 31)), forPeriod: `FY ${fy}-${String(fy + 1).slice(2)}` }];
  }
  return [];
}

/**
 * The calendar, filtered by the NBFC in front of you.
 *
 * Everything that ranks for this query is an article listing every return an NBFC of any kind might
 * file. That is the wrong shape: a single-branch Base Layer lender reading it cannot tell which half
 * applies to them, and the half that does not is the half that wastes their week.
 *
 * So the first thing this asks is what kind of NBFC you are, and it shows what does NOT apply
 * alongside what does — because "you do not file DNBS01, you file DNBS02" is more useful to somebody
 * checking their own list than silence.
 */
export function ReturnsCalendar() {
  const [layer, setLayer] = React.useState<Layer>("BASE");
  const [category, setCategory] = React.useState<Category>("ICC");
  const [assetsCrore, setAssets] = React.useState(250);
  const [acceptsDeposits, setDeposits] = React.useState(false);

  /**
   * Carried over from the layer finder, if the reader came from there.
   *
   * Read on mount rather than during render: this is a static export, so the HTML is built without
   * a URL and reading `location` while rendering would make the server output and the first client
   * render disagree. Answering "which layer am I" and then retyping the same four facts to see the
   * returns is exactly the kind of small friction that stops a tool being used twice.
   */
  React.useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    const l = q.get("layer");
    const c = q.get("category");
    const assets = Number(q.get("assets"));
    if (l && ["BASE", "MIDDLE", "UPPER"].includes(l)) setLayer(l as Layer);
    if (c && c in CATEGORY_LABEL) setCategory(c as Category);
    if (Number.isFinite(assets) && assets > 0) setAssets(assets);
    if (q.get("deposits") === "1") setDeposits(true);
  }, []);
  const [hasOverseasInvestment, setOverseas] = React.useState(false);
  const [showNotApplicable, setShowNa] = React.useState(true);

  const profile: Profile = { layer, category, assetsCrore, acceptsDeposits, hasOverseasInvestment };
  const apply = applicable(profile);
  const notApply = RETURNS.filter((r) => !r.applies(profile));

  // Deposit-taking puts an NBFC in the Middle Layer whatever its size — say so rather than
  // silently overriding what they picked.
  const depositMismatch = acceptsDeposits && layer === "BASE";

  const upcoming = React.useMemo(() => {
    const today = new Date();
    return apply
      .flatMap((r) => dueDates(r, FY_START).map((d) => ({ ...d, r })))
      .filter((x) => x.on >= new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate())))
      .sort((a, b) => a.on.getTime() - b.on.getTime())
      .slice(0, 8);
  }, [apply]);

  return (
    <div className="mt-s5 grid gap-s5 lg:grid-cols-[minmax(0,21rem)_1fr]">
      <div className="grid gap-s4 self-start rounded-card border border-line bg-subtle p-s4">
        <label className="block">
          <span className="block text-[14px] font-medium text-ink">Layer</span>
          <select
            value={layer}
            onChange={(e) => setLayer(e.target.value as Layer)}
            className="mt-1 w-full rounded-input border border-line-strong bg-card px-3 py-2.5 text-[15px] text-ink outline-none focus:border-cta"
          >
            {(Object.keys(LAYER_LABEL) as Layer[]).map((l) => (
              <option key={l} value={l}>{LAYER_LABEL[l]}</option>
            ))}
          </select>
          <span className="mt-1 block text-[13px] leading-snug text-muted">{LAYER_HELP[layer]}</span>
        </label>

        <label className="block">
          <span className="block text-[14px] font-medium text-ink">Category</span>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as Category)}
            className="mt-1 w-full rounded-input border border-line-strong bg-card px-3 py-2.5 text-[15px] text-ink outline-none focus:border-cta"
          >
            {(Object.keys(CATEGORY_LABEL) as Category[]).map((c) => (
              <option key={c} value={c}>{CATEGORY_LABEL[c]}</option>
            ))}
          </select>
        </label>

        <Field id="rc-assets" label="Total assets" value={assetsCrore} onChange={setAssets} unit="₹ cr" step={50}
          hint="The ₹100 crore and ₹500 crore thresholds change what a Base Layer NBFC files." />

        <label className="flex items-start gap-2 text-[15px] text-ink">
          <input type="checkbox" checked={acceptsDeposits} onChange={(e) => setDeposits(e.target.checked)} className="mt-1" />
          <span>Accepts public deposits</span>
        </label>
        <label className="flex items-start gap-2 text-[15px] text-ink">
          <input type="checkbox" checked={hasOverseasInvestment} onChange={(e) => setOverseas(e.target.checked)} className="mt-1" />
          <span>Has an overseas subsidiary or joint venture</span>
        </label>

        {depositMismatch && (
          <p className="rounded-input border-l-[3px] border-l-[color:var(--color-warning)] bg-card p-s3 text-[14px] leading-relaxed text-slate-mid">
            A deposit-taking NBFC sits in the <strong className="text-ink">Middle Layer</strong> whatever
            its asset size. Change the layer above and the list changes with it.
          </p>
        )}
      </div>

      <div className="grid gap-s5">
        <div>
          <div className="flex flex-wrap items-baseline justify-between gap-s2">
            <h2 className="font-display text-[20px] font-bold tracking-display text-ink">
              {apply.length} of {RETURNS.length} returns apply
            </h2>
            <label className="flex items-center gap-2 text-[14px] text-slate-mid">
              <input type="checkbox" checked={!showNotApplicable} onChange={(e) => setShowNa(!e.target.checked)} />
              Hide the ones that do not
            </label>
          </div>

          {/*
            * Every return, every time — with its condition in its own column.
            *
            * Showing only what applied made the tool answer one question and hide another. A
            * compliance officer checking their filing list needs to see the whole set and what
            * excludes them from each; and a return that is simply absent reads as missing rather
            * than as inapplicable. It also makes the inputs discoverable — seeing DNBS13 greyed
            * out with "only where there is an overseas holding" tells a reader there is a box for
            * that, which a hidden row never does.
            */}
          <div className="mt-s3 overflow-x-auto rounded-card border border-line bg-card">
            <table className="w-full min-w-[46rem] text-[15px]">
              <thead>
                <tr className="border-b border-line bg-subtle text-[13px] uppercase tracking-wide text-muted">
                  <th className="px-s4 py-s2 text-left font-semibold">Return</th>
                  <th className="px-s4 py-s2 text-left font-semibold">Who files it</th>
                  <th className="px-s4 py-s2 text-left font-semibold">Frequency</th>
                  <th className="px-s4 py-s2 text-left font-semibold">Due</th>
                </tr>
              </thead>
              <tbody>
                {(showNotApplicable ? RETURNS : apply).map((r) => {
                  const on = r.applies(profile);
                  return (
                    <tr key={r.code} className={"border-b border-line align-top last:border-0 " + (on ? "" : "bg-subtle/60")}>
                      <td className="px-s4 py-s3">
                        <span className="flex items-center gap-2">
                          <span
                            aria-hidden="true"
                            className={"inline-block h-2 w-2 shrink-0 rounded-full " + (on ? "bg-[color:var(--color-success)]" : "bg-line-strong")}
                          />
                          <span className={"font-mono text-[14px] font-semibold " + (on ? "text-ink" : "text-muted")}>
                            {r.code}
                          </span>
                        </span>
                        <span className={"mt-0.5 block text-[14px] " + (on ? "text-slate-mid" : "text-muted")}>
                          {r.name}
                        </span>
                        <span className="sr-only">{on ? "Applies" : "Does not apply"}</span>
                      </td>
                      <td className={"px-s4 py-s3 text-[14px] leading-snug " + (on ? "text-slate-mid" : "text-muted")}>
                        {r.appliesTo}
                        <span className={"mt-1 block " + (on ? "text-muted" : "text-muted")}>{r.why(profile)}</span>
                      </td>
                      <td className="whitespace-nowrap px-s4 py-s3">
                        <span className={
                          "rounded-full px-2 py-0.5 text-[12px] font-semibold uppercase tracking-wide " +
                          (!on
                            ? "bg-subtle text-muted"
                            : r.frequency === "WEEKLY" || r.frequency === "MONTHLY"
                              ? "bg-[color:var(--color-warning-bg)] text-[color:var(--color-warning-fg)]"
                              : "bg-subtle text-slate-mid")
                        }>
                          {r.frequency.toLowerCase()}
                        </span>
                      </td>
                      <td className={"px-s4 py-s3 text-[14px] leading-snug " + (on ? "text-slate-mid" : "text-muted")}>
                        {r.timeline}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {upcoming.length > 0 && (
          <div>
            <h2 className="font-display text-[20px] font-bold tracking-display text-ink">Next eight dates</h2>
            <ul className="mt-s3 grid gap-1.5">
              {upcoming.map((u, i) => (
                <li key={i} className="grid grid-cols-[7.5rem_5.5rem_1fr] items-baseline gap-s2 border-b border-line py-s2 text-[15px] last:border-0">
                  <span className="tabular-nums font-medium text-ink">{fmt(u.on)}</span>
                  <span className="font-mono text-[14px] text-cta">{u.r.code}</span>
                  <span className="text-[14px] text-slate-mid">{u.forPeriod}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

      </div>
    </div>
  );
}
