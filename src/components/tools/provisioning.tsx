"use client";

import * as React from "react";
import Link from "next/link";
import {
  provisionFor, CLASSIFICATION_LABEL, CLASSIFICATION_PATH, DOUBTFUL_AGE_LABEL,
  DOUBTFUL_SECURED, BANK_DOUBTFUL_SECURED, STANDARD_RATE, STANDARD_KIND_LABEL,
  type Classification, type DoubtfulAge, type StandardKind,
} from "@/lib/tools/provision";
import { LAYER_LABEL, type Layer } from "@/lib/tools/returns";
import { Field, Result, rupees } from "./field";

const CLASSIFICATIONS: Classification[] = ["STANDARD", "SUB_STANDARD", "DOUBTFUL", "LOSS"];
const AGES: DoubtfulAge[] = ["UPTO_1Y", "1_TO_3Y", "OVER_3Y"];

export function ProvisioningCalculator() {
  const [layer, setLayer] = React.useState<Layer>("BASE");
  const [classification, setClassification] = React.useState<Classification>("SUB_STANDARD");
  const [standardKind, setStandardKind] = React.useState<StandardKind>("GENERAL");
  const [doubtfulAge, setDoubtfulAge] = React.useState<DoubtfulAge>("UPTO_1Y");
  const [outstandingRs, setOutstandingRs] = React.useState(1_000_000);
  const [securedRs, setSecuredRs] = React.useState(600_000);

  const r = provisionFor({
    layer, classification, standardKind, doubtfulAge,
    outstandingPaise: (outstandingRs || 0) * 100,
    securedPaise: (securedRs || 0) * 100,
  });

  const securityMatters = classification === "DOUBTFUL";
  const kindMatters = classification === "STANDARD" && layer === "UPPER";

  return (
    <div className="mt-s5 grid gap-s5 lg:grid-cols-[minmax(0,21rem)_1fr]">
      <div className="grid gap-s4 self-start rounded-card border border-line bg-subtle p-s4">
        <label className="block">
          <span className="block text-[14px] font-medium text-ink">Which layer is the NBFC in?</span>
          <select
            value={layer}
            onChange={(e) => setLayer(e.target.value as Layer)}
            className="mt-1 w-full rounded-input border border-line-strong bg-card px-3 py-2.5 text-[15px] text-ink outline-none focus:border-cta"
          >
            {(["BASE", "MIDDLE", "UPPER"] as Layer[]).map((l) => (
              <option key={l} value={l}>{LAYER_LABEL[l]}</option>
            ))}
          </select>
          <span className="mt-1 block text-[13px] leading-snug text-muted">
            It changes the standard-asset rate, and how long an account stays sub-standard.{" "}
            <Link href="/tools/nbfc-layer-finder/" className="text-cta underline underline-offset-2">
              Not sure which layer
            </Link>
            ?
          </span>
        </label>

        <label className="block">
          <span className="block text-[14px] font-medium text-ink">How is the account classified?</span>
          <select
            value={classification}
            onChange={(e) => setClassification(e.target.value as Classification)}
            className="mt-1 w-full rounded-input border border-line-strong bg-card px-3 py-2.5 text-[15px] text-ink outline-none focus:border-cta"
          >
            {CLASSIFICATIONS.map((c) => (
              <option key={c} value={c}>{CLASSIFICATION_LABEL[c]}</option>
            ))}
          </select>
        </label>

        {kindMatters && (
          <label className="block">
            <span className="block text-[14px] font-medium text-ink">What kind of exposure?</span>
            <select
              value={standardKind}
              onChange={(e) => setStandardKind(e.target.value as StandardKind)}
              className="mt-1 w-full rounded-input border border-line-strong bg-card px-3 py-2.5 text-[15px] text-ink outline-none focus:border-cta"
            >
              {(Object.keys(STANDARD_KIND_LABEL) as StandardKind[]).map((k) => (
                <option key={k} value={k}>{STANDARD_KIND_LABEL[k]}</option>
              ))}
            </select>
            <span className="mt-1 block text-[13px] leading-snug text-muted">
              Only the Upper Layer splits the standard rate by exposure type.
            </span>
          </label>
        )}

        {classification === "DOUBTFUL" && (
          <label className="block">
            <span className="block text-[14px] font-medium text-ink">How long has it been doubtful?</span>
            <select
              value={doubtfulAge}
              onChange={(e) => setDoubtfulAge(e.target.value as DoubtfulAge)}
              className="mt-1 w-full rounded-input border border-line-strong bg-card px-3 py-2.5 text-[15px] text-ink outline-none focus:border-cta"
            >
              {AGES.map((a) => (
                <option key={a} value={a}>{DOUBTFUL_AGE_LABEL[a]}</option>
              ))}
            </select>
            <span className="mt-1 block text-[13px] leading-snug text-muted">
              Time in the doubtful category — not time since the account first went overdue.
            </span>
          </label>
        )}

        <Field id="p-out" label="Total outstanding" value={outstandingRs}
          onChange={setOutstandingRs} unit="₹" step={50_000} />

        <Field id="p-sec" label="Covered by realisable security" value={securedRs}
          onChange={setSecuredRs} unit="₹" step={50_000}
          hint={securityMatters
            ? "The realisable value of what is held, not what it was valued at on day one."
            : "Recorded for your own working. At this classification it does not change the provision."} />
      </div>

      <div className="grid gap-s3">
        <div className="grid gap-s3 sm:grid-cols-2">
          <Result
            label="Provision required"
            value={rupees(r.totalPaise)}
            tone={r.effectivePct >= 50 ? "bad" : r.effectivePct >= 10 ? "warn" : "good"}
            sub={`${r.effectivePct}% of the outstanding, on a ${CLASSIFICATION_LABEL[classification].toLowerCase()} asset.`}
          />
          <Result
            label="Carrying value after provision"
            value={rupees((outstandingRs || 0) * 100 - r.totalPaise)}
            sub="What the asset is worth on the balance sheet once the provision is made."
          />
        </div>

        <div className="rounded-card border border-line bg-card p-s5">
          <h2 className="font-display text-[19px] font-bold tracking-display text-ink">How it is built up</h2>
          <div className="mt-s3 overflow-x-auto">
            <table className="w-full min-w-[34rem] border-collapse text-[15px]">
              <thead>
                <tr className="border-b border-line text-left text-[13px] uppercase tracking-wide text-muted">
                  <th className="pb-2 pr-4 font-medium">On</th>
                  <th className="pb-2 pr-4 text-right font-medium">Amount</th>
                  <th className="pb-2 pr-4 text-right font-medium">Rate</th>
                  <th className="pb-2 text-right font-medium">Provision</th>
                </tr>
              </thead>
              <tbody>
                {r.lines.map((l) => (
                  <tr key={l.label} className="border-b border-line/60 align-top">
                    <td className="py-3 pr-4 text-ink">
                      {l.label}
                      <span className="mt-1 block text-[14px] leading-snug text-muted">{l.note}</span>
                    </td>
                    <td className="py-3 pr-4 text-right tabular-nums text-slate-mid">{rupees(l.basePaise)}</td>
                    <td className="py-3 pr-4 text-right tabular-nums text-slate-mid">{l.ratePct}%</td>
                    <td className="py-3 text-right font-medium tabular-nums text-ink">{rupees(l.provisionPaise)}</td>
                  </tr>
                ))}
                <tr>
                  <td className="pt-3 pr-4 font-medium text-ink" colSpan={3}>Total</td>
                  <td className="pt-3 text-right font-display text-[18px] font-bold tabular-nums text-ink">
                    {rupees(r.totalPaise)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/*
          * The single most consequential thing on the page, so it sits in the answer column and not
          * in a footnote. Publishing the bank table under an NBFC heading is a live error on other
          * sites — one of the sources checked while building this did exactly that.
          */}
        <div className="rounded-card border border-line border-l-[3px] border-l-[color:var(--color-warning)] bg-card p-s5">
          <h2 className="font-display text-[19px] font-bold tracking-display text-ink">
            An NBFC does not provide what a bank provides
          </h2>
          <p className="mt-s3 max-w-prose text-[16px] leading-relaxed text-slate-mid">
            On the secured portion of a doubtful asset the two tables differ, and they differ most
            where the amounts are largest. Take the wrong one and a book more than three years into
            the doubtful category is provided at twice the required rate.
          </p>
          <div className="mt-s4 overflow-x-auto">
            <table className="w-full min-w-[26rem] border-collapse text-[15px]">
              <thead>
                <tr className="border-b border-line text-left text-[13px] uppercase tracking-wide text-muted">
                  <th className="pb-2 pr-4 font-medium">Time as doubtful</th>
                  <th className="pb-2 pr-4 text-right font-medium">NBFC</th>
                  <th className="pb-2 text-right font-medium">Bank</th>
                </tr>
              </thead>
              <tbody>
                {AGES.map((a) => (
                  <tr key={a} className="border-b border-line/60">
                    <td className="py-2.5 pr-4 text-slate-mid">{DOUBTFUL_AGE_LABEL[a]}</td>
                    <td className="py-2.5 pr-4 text-right font-medium tabular-nums text-ink">{DOUBTFUL_SECURED[a]}%</td>
                    <td className="py-2.5 text-right tabular-nums text-muted">{BANK_DOUBTFUL_SECURED[a]}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-s3 max-w-prose text-[15px] leading-relaxed text-muted">
            The unsecured portion is provided in full under both. So is a loss asset.
          </p>
        </div>

        <div className="rounded-card border border-line bg-card p-s5">
          <h2 className="font-display text-[19px] font-bold tracking-display text-ink">
            How an account gets to each classification
          </h2>
          <ol className="mt-s3 grid gap-s3">
            {CLASSIFICATION_PATH.map((c, i) => (
              <li key={c.id} className="grid grid-cols-[1.6rem_1fr] gap-s3">
                <span className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-subtle text-[13px] font-bold tabular-nums text-ink">
                  {i + 1}
                </span>
                <span className="text-[15px] leading-relaxed text-slate-mid">
                  <strong className="text-ink">{CLASSIFICATION_LABEL[c.id]}.</strong> {c.when}
                </span>
              </li>
            ))}
          </ol>
          <p className="mt-s4 max-w-prose text-[15px] leading-relaxed text-slate-mid">
            Classification follows the account, not the borrower&rsquo;s intention, and it only ever
            moves in one direction while the arrears stand. Working out the date an account turns
            non-performing in the first place is{" "}
            <Link href="/tools/npa-date-calculator/" className="font-medium text-cta underline underline-offset-2 hover:text-cta-hover">
              a separate question, with its own calculator
            </Link>
            .
          </p>
        </div>

        <div className="rounded-card border border-line bg-subtle p-s4 text-[15px] leading-relaxed text-slate-mid">
          <p>
            <strong className="text-ink">The standard-asset rate this uses.</strong>{" "}
            {LAYER_LABEL[layer]} — {STANDARD_RATE[layer][standardKind] ?? STANDARD_RATE[layer].GENERAL}% of
            the outstanding. A standard provision is a general one: it is made against the performing
            book as a whole, and it is not deducted in arriving at net non-performing assets.
          </p>
          <p className="mt-s3">
            <strong className="text-ink">Ninety days, for everyone.</strong> The Base Layer used to
            recognise a non-performing asset at a longer period. That glide path ended on 31 March
            2026, so every NBFC now classifies on the same ninety-day basis.
          </p>
        </div>
      </div>
    </div>
  );
}
