"use client";

import * as React from "react";
import { KFS_FIELDS, KFS_RULES, KFS_GROUPS, GROUP_LABEL, kfsGaps } from "@/lib/tools/kfs";

export function KfsChecker() {
  const [ticked, setTicked] = React.useState<Set<string>>(new Set());
  const [floating, setFloating] = React.useState(false);
  const [lsp, setLsp] = React.useState(false);
  const [colending, setColending] = React.useState(false);

  const applicable = { floating, lsp, colending };
  const required = KFS_FIELDS.filter(
    (f) => !f.onlyIf || (f.id === "floating" && floating) || (f.id === "lsp" && lsp) || (f.id === "colending" && colending),
  );
  const gaps = kfsGaps(ticked, applicable);
  const done = required.length - gaps.length;

  const toggle = (id: string) =>
    setTicked((s) => {
      const n = new Set(s);
      n.has(id) ? n.delete(id) : n.add(id);
      return n;
    });

  return (
    <div className="mt-s5 grid gap-s5">
      <div className="grid gap-s3 rounded-card border border-line bg-subtle p-s4 sm:grid-cols-3">
        <label className="flex items-start gap-2 text-[15px] text-ink">
          <input type="checkbox" checked={floating} onChange={(e) => setFloating(e.target.checked)} className="mt-1" />
          <span>The rate is floating or hybrid</span>
        </label>
        <label className="flex items-start gap-2 text-[15px] text-ink">
          <input type="checkbox" checked={lsp} onChange={(e) => setLsp(e.target.checked)} className="mt-1" />
          <span>A loan service provider will act as recovery agent</span>
        </label>
        <label className="flex items-start gap-2 text-[15px] text-ink">
          <input type="checkbox" checked={colending} onChange={(e) => setColending(e.target.checked)} className="mt-1" />
          <span>The loan is co-lent</span>
        </label>
      </div>

      <div
        className={
          "rounded-card border border-line bg-card p-s5 border-l-[3px] " +
          (gaps.length === 0 ? "border-l-[color:var(--color-success)]" : "border-l-[color:var(--color-warning)]")
        }
      >
        <p className="text-[13px] uppercase tracking-wide text-muted">Against the annexed format</p>
        <p className="mt-1 font-display text-[30px] font-extrabold tabular-nums tracking-display-tight text-ink">
          {done} of {required.length}
        </p>
        <p className="mt-s2 max-w-prose text-[16px] leading-relaxed text-slate-mid">
          {gaps.length === 0
            ? "Every item the format requires for a loan of this shape is accounted for."
            : `${gaps.length} still missing — ${gaps.map((g) => g.label).join("; ")}.`}
        </p>
      </div>

      {KFS_GROUPS.map((group) => {
        const fields = required.filter((f) => f.group === group);
        if (!fields.length) return null;
        return (
          <section key={group}>
            <h2 className="font-display text-[19px] font-bold tracking-display text-ink">{GROUP_LABEL[group]}</h2>
            <ul className="mt-s3 grid gap-1">
              {fields.map((f) => {
                const on = ticked.has(f.id);
                return (
                  <li key={f.id}>
                    <label className={"flex cursor-pointer items-start gap-s3 rounded-card border p-s3 transition-colors " + (on ? "border-line bg-subtle" : "border-line bg-card hover:border-cta")}>
                      <input type="checkbox" checked={on} onChange={() => toggle(f.id)} className="mt-1.5" />
                      <span>
                        <span className={"block text-[16px] font-medium " + (on ? "text-muted line-through" : "text-ink")}>
                          {f.label}
                          {f.onlyIf && (
                            <span className="ml-2 rounded-full bg-subtle px-2 py-0.5 align-middle text-[12px] font-semibold uppercase tracking-wide text-muted no-underline">
                              only if {f.onlyIf}
                            </span>
                          )}
                        </span>
                        <span className="mt-0.5 block text-[14px] leading-relaxed text-slate-mid">{f.detail}</span>
                      </span>
                    </label>
                  </li>
                );
              })}
            </ul>
          </section>
        );
      })}

      <div className="rounded-card border border-line bg-subtle p-s4">
        <h2 className="font-display text-[17px] font-bold tracking-display text-ink">
          Four rules that are not fields
        </h2>
        <ul className="mt-s2 grid gap-1.5">
          {KFS_RULES.map((r) => (
            <li key={r} className="grid grid-cols-[0.6rem_1fr] gap-s2 text-[15px] leading-relaxed text-slate-mid">
              <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 rounded-full bg-cta" />
              <span>{r}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
