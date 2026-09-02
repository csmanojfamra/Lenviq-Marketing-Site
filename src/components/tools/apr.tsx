"use client";

import * as React from "react";
import { computeEmi, computeApr } from "@/lib/tools/finance";
import { Field, Result, rupees } from "./field";

const R = (r: number) => BigInt(Math.round((Number.isFinite(r) ? r : 0) * 100));

/**
 * The APR a Key Facts Statement has to disclose — which is not the interest rate, and is the number
 * lenders most often get wrong because it cannot be typed, only solved for.
 */
export function AprCalculator() {
  const [principal, setPrincipal] = React.useState(500000);
  const [rate, setRate] = React.useState(18);
  const [months, setMonths] = React.useState(24);
  const [processingPct, setProcessingPct] = React.useState(2);
  const [otherUpfront, setOtherUpfront] = React.useState(0);

  const ok = principal > 0 && months > 0 && rate >= 0;
  const processing = ok ? Math.round(principal * (processingPct / 100)) : 0;
  const upfront = processing + (Number.isFinite(otherUpfront) ? otherUpfront : 0);
  const emi = ok ? computeEmi(R(principal), rate, months) : 0n;
  const apr = ok ? computeApr(R(principal), R(upfront), emi, months) : 0;
  const totalPaid = Number(emi) * months;
  const received = principal * 100 - upfront * 100;
  const gap = ok ? Math.round((apr - rate) * 100) / 100 : 0;

  return (
    <div className="mt-s5 grid gap-s5 [&>*]:min-w-0 lg:grid-cols-[minmax(0,20rem)_1fr]">
      <div className="grid gap-s4 self-start rounded-card border border-line bg-subtle p-s4">
        <Field id="apr-p" label="Sanctioned amount" value={principal} onChange={setPrincipal} unit="₹" step={10000} />
        <Field id="apr-r" label="Interest rate" value={rate} onChange={setRate} unit="% p.a." step={0.25} />
        <Field id="apr-m" label="Tenure" value={months} onChange={setMonths} unit="months" step={1} min={1} />
        <Field
          id="apr-f" label="Processing fee" value={processingPct} onChange={setProcessingPct} unit="%" step={0.25}
          hint={ok ? `${rupees(processing * 100)}, deducted at disbursement` : undefined}
        />
        <Field
          id="apr-o" label="Other upfront charges" value={otherUpfront} onChange={setOtherUpfront} unit="₹" step={500}
          hint="Documentation, insurance premium, anything recovered before the money reaches the borrower."
        />
      </div>

      <div className="grid gap-s3 sm:grid-cols-2">
        <Result label="Annual percentage rate" value={ok ? `${apr.toFixed(2)}%` : "—"}
          tone={gap >= 3 ? "warn" : "good"}
          sub={ok ? `${gap.toFixed(2)} points above the ${rate}% quoted` : undefined} />
        <Result label="Instalment" value={ok ? rupees(emi) : "—"} sub={ok ? `× ${months} months` : undefined} />
        <Result label="Borrower actually receives" value={ok ? rupees(received) : "—"}
          sub={ok ? `${rupees(upfront * 100)} deducted before disbursement` : undefined} />
        <Result label="Total repaid" value={ok ? rupees(totalPaid) : "—"}
          sub={ok ? `${rupees(totalPaid - received)} more than was received` : undefined} />

        <div className="sm:col-span-2 rounded-card border border-line bg-card p-s4 text-[15px] leading-relaxed text-slate-mid">
          <p>
            <strong className="text-ink">Why the two rates differ.</strong> The borrower repays as though
            they received {ok ? rupees(principal * 100) : "the full amount"}, but{" "}
            {ok ? rupees(upfront * 100) : "the upfront charges"} never reached them. The APR prices what
            actually happened; the interest rate prices only the money.
          </p>
          <p className="mt-s3">
            Shorten the tenure and the gap widens — the same fee is spread over fewer instalments. That is
            why a short-tenure loan with a flat fee can disclose an APR far above its headline rate.
          </p>
        </div>
      </div>
    </div>
  );
}
