"use client";

import * as React from "react";
import { smaForDpd, statusForDpd, dateAtDpd, daysPastDue } from "@/lib/tools/finance";
import { DateField, Result } from "./field";

const fmt = (d: Date) =>
  d.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric", timeZone: "UTC" });

const iso = (d: Date) => d.toISOString().slice(0, 10);

/**
 * Given a missed instalment, when does the account become each thing?
 *
 * The tool a credit head and their auditor actually argue about, because the answer decides which
 * QUARTER a provision and an income reversal land in. Day 90 is still SMA-2; day 91 is
 * non-performing. A system that classifies a day early reports every provision, every reversal and
 * every bureau submission a day early, all year.
 */
export function NpaDateCalculator() {
  const today = React.useMemo(() => new Date(), []);
  const [due, setDue] = React.useState(() => {
    const d = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth() - 3, 5));
    return iso(d);
  });

  const dueDate = React.useMemo(() => new Date(due + "T00:00:00Z"), [due]);
  const valid = !Number.isNaN(dueDate.getTime());
  const dpdToday = valid ? daysPastDue(dueDate, today) : 0;
  const status = statusForDpd(dpdToday);
  const sma = smaForDpd(dpdToday);

  const milestones = [
    { dpd: 1, label: "Flagged overdue · SMA-0", note: "The day after the due date, in that night's day-end process. There is no grace on flagging." },
    { dpd: 31, label: "SMA-1", note: "More than 30 days past due." },
    { dpd: 61, label: "SMA-2", note: "More than 60 days. For large exposures this travels into the CRILC submission." },
    { dpd: 91, label: "Non-performing", note: "MORE than 90 days — so day 91, not day 90. Day 90 is still SMA-2." },
    { dpd: 91 + 365, label: "Doubtful", note: "One year as a sub-standard asset." },
  ];

  const tone = status === "NPA" ? "bad" : status === "OVERDUE" ? "warn" : "good";
  const label = status === "NPA" ? "Non-performing" : status === "OVERDUE" ? sma.replace("_", "-") : "Standard";

  return (
    <div className="mt-s5 grid gap-s5 [&>*]:min-w-0 lg:grid-cols-[minmax(0,20rem)_1fr]">
      <div className="grid gap-s4 self-start rounded-card border border-line bg-subtle p-s4">
        <DateField
          id="npa-due" label="Date the instalment fell due" value={due} onChange={setDue}
          hint="The oldest instalment that is demanded and still unpaid — not the date interest accrued."
        />
      </div>

      <div className="grid gap-s3 [&>*]:min-w-0">
        <div className="grid gap-s3 sm:grid-cols-2">
          <Result label="Days past due today" value={valid ? String(dpdToday) : "—"} tone={tone}
            sub={valid ? `As at ${fmt(today)}` : undefined} />
          <Result label="Classification today" value={valid ? label : "—"} tone={tone}
            sub="Assuming the instalment is still unpaid. A part payment moves the count only if it settles the oldest unpaid instalment in full." />
        </div>

        <div className="min-w-0 overflow-x-auto rounded-card border border-line bg-card">
          <table className="w-full text-[15px]">
            <thead>
              <tr className="border-b border-line bg-subtle text-[13px] uppercase tracking-wide text-muted">
                <th className="px-s4 py-s2 text-left font-semibold">Becomes</th>
                <th className="px-s4 py-s2 text-left font-semibold">On</th>
                <th className="px-s4 py-s2 text-left font-semibold">Why</th>
              </tr>
            </thead>
            <tbody>
              {milestones.map((m) => {
                const on = valid ? dateAtDpd(dueDate, m.dpd) : null;
                const reached = valid && dpdToday >= m.dpd;
                return (
                  <tr key={m.dpd} className="border-b border-line last:border-0">
                    <td className={`px-s4 py-s3 font-medium ${reached ? "text-ink" : "text-slate-mid"}`}>
                      {m.label}
                    </td>
                    <td className="whitespace-nowrap px-s4 py-s3 tabular-nums text-ink">
                      {on ? fmt(on) : "—"}
                    </td>
                    <td className="px-s4 py-s3 text-[14px] leading-snug text-slate-mid">{m.note}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <p className="text-[15px] leading-relaxed text-slate-mid">
          <strong className="text-ink">How this is counted.</strong> Whole days from the due date, on
          the day-end position — no time of day and no time zone, because a business date is a date
          rather than an instant. A system that compares timestamps in UTC gets every date on an
          Indian book wrong by five and a half hours, which at a month end is a whole day.
        </p>
        <p className="text-[15px] leading-relaxed text-slate-mid">
          <strong className="text-ink">Upgrading back to standard</strong> needs the{" "}
          <strong className="text-ink">entire</strong> arrears of interest and principal cleared — not
          part of them. Part payment moves the days-past-due count only if it settles the oldest unpaid
          instalment in full.
        </p>
      </div>
    </div>
  );
}
