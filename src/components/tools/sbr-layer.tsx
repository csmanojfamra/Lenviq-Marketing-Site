"use client";

import * as React from "react";
import Link from "next/link";
import {
  findLayer, SBR_CATEGORY_LABEL, LAYER_MEANS, THRESHOLD_CRORE,
  type SbrAnswers, type SbrCategory,
} from "@/lib/tools/sbr";
import { LAYER_LABEL } from "@/lib/tools/returns";
import { Field } from "./field";

/** The returns calendar takes the same category names, so the answer can carry across. */
const TO_RETURNS_CATEGORY: Partial<Record<SbrCategory, string>> = {
  ICC: "ICC", MFI: "MFI", FACTOR: "FACTOR", CIC: "CIC", P2P: "P2P", AA: "AA", IFC: "IFC",
};

export function SbrLayerFinder() {
  const [a, setA] = React.useState<SbrAnswers>({
    category: "ICC", acceptsDeposits: false, assetsCrore: 250,
    noPublicFunds: false, noCustomerInterface: false, namedInUpperLayerList: false,
  });
  const set = (patch: Partial<SbrAnswers>) => setA((x) => ({ ...x, ...patch }));

  const result = findLayer(a);
  const means = LAYER_MEANS[result.layer];
  const carry = new URLSearchParams({
    layer: result.layer,
    category: TO_RETURNS_CATEGORY[a.category] ?? "OTHER",
    assets: String(a.assetsCrore),
    deposits: a.acceptsDeposits ? "1" : "0",
  }).toString();

  return (
    <div className="mt-s5 grid gap-s5 lg:grid-cols-[minmax(0,21rem)_1fr]">
      <div className="grid gap-s4 self-start rounded-card border border-line bg-subtle p-s4">
        <label className="block">
          <span className="block text-[14px] font-medium text-ink">What kind of NBFC is it?</span>
          <select
            value={a.category}
            onChange={(e) => set({ category: e.target.value as SbrCategory })}
            className="mt-1 w-full rounded-input border border-line-strong bg-card px-3 py-2.5 text-[15px] text-ink outline-none focus:border-cta"
          >
            {(Object.keys(SBR_CATEGORY_LABEL) as SbrCategory[]).map((c) => (
              <option key={c} value={c}>{SBR_CATEGORY_LABEL[c]}</option>
            ))}
          </select>
        </label>

        <Field id="s-assets" label="Total assets" value={a.assetsCrore}
          onChange={(n) => set({ assetsCrore: n })} unit="₹ cr" step={50}
          hint={`The threshold is ₹${THRESHOLD_CRORE.toLocaleString("en-IN")} crore — but only for the categories where size decides.`} />

        <label className="flex items-start gap-2 text-[15px] text-ink">
          <input type="checkbox" checked={a.acceptsDeposits}
            onChange={(e) => set({ acceptsDeposits: e.target.checked })} className="mt-1" />
          <span>Accepts public deposits</span>
        </label>
        <label className="flex items-start gap-2 text-[15px] text-ink">
          <input type="checkbox" checked={a.noPublicFunds}
            onChange={(e) => set({ noPublicFunds: e.target.checked })} className="mt-1" />
          <span>Does not avail public funds</span>
        </label>
        <label className="flex items-start gap-2 text-[15px] text-ink">
          <input type="checkbox" checked={a.noCustomerInterface}
            onChange={(e) => set({ noCustomerInterface: e.target.checked })} className="mt-1" />
          <span>Has no customer interface</span>
        </label>

        <div className="rounded-input border border-line-strong bg-card p-s3">
          <label className="flex items-start gap-2 text-[15px] text-ink">
            <input type="checkbox" checked={a.namedInUpperLayerList}
              onChange={(e) => set({ namedInUpperLayerList: e.target.checked })} className="mt-1" />
            <span>Named in the RBI’s Upper Layer list</span>
          </label>
          <p className="mt-1 text-[13px] leading-snug text-muted">
            See the answer panel — this one is not something you can work out.
          </p>
        </div>
      </div>

      <div className="grid gap-s3">
        <div className="rounded-card border border-line border-l-[3px] border-l-cta bg-card p-s5">
          <p className="text-[13px] uppercase tracking-wide text-muted">This NBFC is in the</p>
          <p className="mt-1 font-display text-[32px] font-extrabold tracking-display-tight text-ink">
            {LAYER_LABEL[result.layer]}
          </p>
          <p className="mt-s3 max-w-prose text-[16px] leading-relaxed text-slate-mid">{result.because}</p>
          {result.notes.map((n) => (
            <p key={n} className="mt-s2 max-w-prose text-[15px] leading-relaxed text-muted">{n}</p>
          ))}
        </div>

        <div className="rounded-card border border-line bg-card p-s5">
          <h2 className="font-display text-[19px] font-bold tracking-display text-ink">
            What the layer changes
          </h2>
          <p className="mt-1 text-[16px] leading-relaxed text-slate-mid">{means.headline}</p>
          <ul className="mt-s3 grid gap-s2">
            {means.points.map((p) => (
              <li key={p} className="grid grid-cols-[0.6rem_1fr] gap-s2 text-[15px] leading-relaxed text-slate-mid">
                <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 rounded-full bg-cta" />
                <span>{p}</span>
              </li>
            ))}
          </ul>
          <p className="mt-s4 text-[15px] leading-relaxed text-slate-mid">
            The prudential detail behind each of these is in the Scale Based Regulation Directions.
            What this site can show you exactly is the filing side —{" "}
            <Link href={`/tools/nbfc-returns-calendar/?${carry}`}
              className="font-medium text-cta underline underline-offset-2 hover:text-cta-hover">
              see the returns a {LAYER_LABEL[result.layer]} NBFC like this files
            </Link>
            .
          </p>
        </div>

        {/*
          * The point of the whole tool, in the answer column.
          *
          * It was a note under a checkbox in the controls — the least noticeable place on the page
          * for the one thing that separates this from every article on the subject.
          */}
        <div className="rounded-card border border-line border-l-[3px] border-l-[color:var(--color-warning)] bg-card p-s5">
          <h2 className="font-display text-[19px] font-bold tracking-display text-ink">
            Three of the four layers you can work out. The Upper Layer you cannot.
          </h2>
          <p className="mt-s3 max-w-prose text-[16px] leading-relaxed text-slate-mid">
            Base and Middle follow from facts about the company — its category, its size, whether it
            takes deposits. The <strong className="text-ink">Upper Layer is a designation</strong>:
            the Reserve Bank identifies those NBFCs and publishes their names, seventeen on the
            current list. No company puts itself there and none can compute its way in, so this asks
            you instead.
          </p>
          <p className="mt-s3 max-w-prose text-[16px] leading-relaxed text-slate-mid">
            Being named brings enhanced regulation for at least five years, including a requirement
            to list within three.
          </p>
        </div>

        <div className="rounded-card border border-line bg-subtle p-s4 text-[15px] leading-relaxed text-slate-mid">
          <p>
            <strong className="text-ink">The Top Layer is empty, by design.</strong> It exists so the
            Reserve Bank can move a single Upper Layer NBFC into it if the systemic risk from that one
            company rises substantially. No NBFC is in it, and none can put itself there.
          </p>
          <p className="mt-s3">
            <strong className="text-ink">One change to watch.</strong> In April 2026 the Bank proposed
            replacing the Upper Layer scoring model with a flat ₹1 lakh crore asset test. That is a
            proposal, so this tool does not apply it — the answer above still comes from the published
            list.
          </p>
        </div>
      </div>
    </div>
  );
}
