"use client";

import * as React from "react";
import {
  prepaymentEligibility, LENDER_LABEL, BORROWER_LABEL, MSE_CAP_PAISE, EFFECTIVE_FROM,
  type LenderKind, type BorrowerKind, type Purpose, type RateKind,
} from "@/lib/tools/prepayment";
import { Field, DateField, rupees } from "./field";

export function PrepaymentEligibility() {
  const [lender, setLender] = React.useState<LenderKind>("NBFC_ML");
  const [borrower, setBorrower] = React.useState<BorrowerKind>("INDIVIDUAL");
  const [purpose, setPurpose] = React.useState<Purpose>("NON_BUSINESS");
  const [rate, setRate] = React.useState<RateKind>("FLOATING");
  const [sanctionedRs, setSanctionedRs] = React.useState(2_500_000);
  const [on, setOn] = React.useState("2026-04-01");

  const r = prepaymentEligibility({
    lender, borrower, purpose, rateAtPrepayment: rate,
    sanctionedPaise: (sanctionedRs || 0) * 100,
    sanctionedOn: on,
  });

  const amountMatters = purpose === "BUSINESS" && rate === "FLOATING" && borrower !== "OTHER";

  return (
    <div className="mt-s5 grid gap-s5 lg:grid-cols-[minmax(0,22rem)_1fr]">
      <div className="grid gap-s4 self-start rounded-card border border-line bg-subtle p-s4">
        <label className="block">
          <span className="block text-[14px] font-medium text-ink">Who is the lender?</span>
          <select value={lender} onChange={(e) => setLender(e.target.value as LenderKind)}
            className="mt-1 w-full rounded-input border border-line-strong bg-card px-3 py-2.5 text-[15px] text-ink outline-none focus:border-cta">
            {(Object.keys(LENDER_LABEL) as LenderKind[]).map((l) => (
              <option key={l} value={l}>{LENDER_LABEL[l]}</option>
            ))}
          </select>
          <span className="mt-1 block text-[13px] leading-snug text-muted">
            A payments bank is outside these Directions altogether.
          </span>
        </label>

        <label className="block">
          <span className="block text-[14px] font-medium text-ink">Who is the borrower?</span>
          <select value={borrower} onChange={(e) => setBorrower(e.target.value as BorrowerKind)}
            className="mt-1 w-full rounded-input border border-line-strong bg-card px-3 py-2.5 text-[15px] text-ink outline-none focus:border-cta">
            {(Object.keys(BORROWER_LABEL) as BorrowerKind[]).map((b) => (
              <option key={b} value={b}>{BORROWER_LABEL[b]}</option>
            ))}
          </select>
        </label>

        <fieldset>
          <legend className="block text-[14px] font-medium text-ink">What was the loan for?</legend>
          <div className="mt-1 grid gap-1.5">
            {([["NON_BUSINESS", "A purpose other than business"], ["BUSINESS", "Business"]] as const).map(([v, l]) => (
              <label key={v} className="flex items-start gap-2 text-[15px] text-ink">
                <input type="radio" name="purpose" checked={purpose === v}
                  onChange={() => setPurpose(v)} className="mt-1" />
                <span>{l}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className="block text-[14px] font-medium text-ink">
            What rate is it on <em>when the borrower pre-pays</em>?
          </legend>
          <div className="mt-1 grid gap-1.5">
            {([["FLOATING", "Floating"], ["FIXED", "Fixed"]] as const).map(([v, l]) => (
              <label key={v} className="flex items-start gap-2 text-[15px] text-ink">
                <input type="radio" name="rate" checked={rate === v}
                  onChange={() => setRate(v)} className="mt-1" />
                <span>{l}</span>
              </label>
            ))}
          </div>
          <p className="mt-1 text-[13px] leading-snug text-muted">
            Not the rate at sanction. On a dual-rate loan that has since reset, this is the reset rate.
          </p>
        </fieldset>

        <Field id="pp-amt" label="Sanctioned amount" value={sanctionedRs} onChange={setSanctionedRs}
          unit="₹" step={100_000}
          hint={amountMatters
            ? `The ₹${(MSE_CAP_PAISE / 100 / 100000).toFixed(0)} lakh line matters here. It is the amount sanctioned, not the amount outstanding.`
            : "Recorded for your working. At this combination the amount does not change the answer."} />

        <DateField id="pp-on" label="Sanctioned or last renewed on" value={on} onChange={setOn}
          hint={`The Directions reach loans sanctioned or renewed on or after ${EFFECTIVE_FROM}. A renewal counts as a fresh sanction.`} />
      </div>

      <div className="grid gap-s3">
        <div className={`rounded-card border border-line border-l-[3px] bg-card p-s5 ${
          r.barred ? "border-l-[color:var(--color-success)]" : "border-l-[color:var(--color-warning)]"
        }`}>
          <p className="text-[13px] uppercase tracking-wide text-muted">The answer</p>
          <p className="mt-1 font-display text-[28px] font-extrabold leading-tight tracking-display-tight text-ink">
            {r.headline}
          </p>
          <p className="mt-s3 max-w-prose text-[16px] leading-relaxed text-slate-mid">{r.because}</p>
          {r.notes.map((n) => (
            <p key={n} className="mt-s3 max-w-prose text-[15px] leading-relaxed text-muted">{n}</p>
          ))}
          <p className="mt-s4 text-[13px] tracking-wide text-muted">{r.clause}</p>
        </div>

        {/*
          * The tier table, in the answer column rather than a footnote.
          *
          * It is the part of these Directions that is genuinely hard to hold in the head: on a
          * business-purpose loan the answer turns on WHICH lender is asking, and the same loan to
          * the same borrower comes out differently at three lenders in a row.
          */}
        <div className="rounded-card border border-line bg-card p-s5">
          <h2 className="font-display text-[19px] font-bold tracking-display text-ink">
            On a business-purpose loan, the lender decides the answer
          </h2>
          <p className="mt-s3 max-w-prose text-[16px] leading-relaxed text-slate-mid">
            For a floating-rate loan to an individual or a micro or small enterprise, taken for
            business. A loan to an individual for anything <em>other</em> than business is barred
            everywhere on this list, at any amount — that rule has no tiers.
          </p>
          <div className="mt-s4 overflow-x-auto">
            <table className="w-full min-w-[30rem] border-collapse text-[15px]">
              <thead>
                <tr className="border-b border-line text-left text-[13px] uppercase tracking-wide text-muted">
                  <th className="pb-2 pr-4 font-medium">Lender</th>
                  <th className="pb-2 font-medium">May it charge?</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Commercial bank, Tier-4 UCB, NBFC-Upper Layer", "No — at any sanctioned amount."],
                  ["SFB, RRB, LAB, Tier-3 UCB, State or Central co-op, NBFC-Middle Layer", `No, up to ${rupees(MSE_CAP_PAISE)} sanctioned. Above that, its own policy.`],
                  ["NBFC-Base Layer, Tier-1 and Tier-2 UCB", "Its own board-approved policy — the bar does not name it."],
                ].map(([who, what]) => (
                  <tr key={who} className="border-b border-line/60 align-top">
                    <td className="py-3 pr-4 text-ink">{who}</td>
                    <td className="py-3 text-slate-mid">{what}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-card border border-line bg-subtle p-s4 text-[15px] leading-relaxed text-slate-mid">
          <p>
            <strong className="text-ink">Where the bar applies, it applies completely.</strong> The
            source of the money makes no difference — a borrower refinancing with a competitor is
            still protected. It covers a part pre-payment as much as a full foreclosure. And no
            minimum lock-in may be imposed to reach the same result by another route.
          </p>
          <p className="mt-s3">
            <strong className="text-ink">Where it does not apply, disclosure still does.</strong> A
            charge has to sit in the board-approved policy and be stated in the sanction letter, the
            loan agreement and the Key Facts Statement. One that was never disclosed cannot be
            recovered, whatever the policy says.
          </p>
        </div>
      </div>
    </div>
  );
}
