"use client";

import * as React from "react";

/**
 * The hero's one piece of motion: an ageing-bucket breakdown whose bars draw in once.
 *
 * ## Why this and not a floating shape
 *
 * It is literally what the product produces. A compliance head reads an ageing bucket every month;
 * seeing one tells them what this is in about a second, without a word of copy, and it is honest
 * in a way an abstract animation is not.
 *
 * ## Why the numbers are labelled illustrative
 *
 * Because they are. Nothing here is a measurement of anything, and a plausible-looking portfolio
 * on a landing page is an implied claim about scale and adoption — which is the thing the brief
 * forbids outright, and the thing this buyer has been burned by. The same reasoning rules out a
 * counting-up number: a counter is that claim with more emphasis.
 *
 * ## The motion
 *
 * `transform: scaleX` on an inner element with `transform-origin: left`, so nothing lays out and
 * nothing shifts. The percentage labels sit OUTSIDE the scaled element — scaling text stretches
 * the glyphs for the duration of the animation, which reads as a rendering fault.
 *
 * 560ms, ease-out, 70ms apart. It runs once, on mount, and never again.
 *
 * With `prefers-reduced-motion` the bars are simply drawn. No delay, no transition, nothing to
 * wait for — and the panel is complete, which is the point: content that only exists after an
 * animation does not exist for that reader.
 */
const BUCKETS = [
  { label: "Current", pct: 62, tone: "bg-success" },
  { label: "1–30 DPD", pct: 18, tone: "bg-accent" },
  { label: "31–60 DPD", pct: 9, tone: "bg-warning" },
  { label: "61–90 DPD", pct: 6, tone: "bg-[color:var(--color-cta)]" },
  { label: "90+ DPD (NPA)", pct: 5, tone: "bg-danger" },
] as const;

export function HeroPortfolioCard() {
  const [drawn, setDrawn] = React.useState(false);

  React.useEffect(() => {
    // A frame's delay, so the browser has painted the zero state before the transition starts.
    const id = requestAnimationFrame(() => setDrawn(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <div className="w-full rounded-card border border-line bg-card p-5 shadow-e2">
      <div className="flex items-baseline justify-between">
        <h2 className="font-display text-[15px] font-bold tracking-display text-ink">
          Portfolio ageing
        </h2>
        <span className="text-[11px] text-muted">as at day-end</span>
      </div>

      <div className="mt-4 space-y-3">
        {BUCKETS.map((b, i) => (
          <div key={b.label}>
            <div className="flex items-baseline justify-between text-[12px]">
              <span className="text-slate-mid">{b.label}</span>
              {/* Outside the scaled element, and tabular, so the digits do not shift as the row
                  above or below renders. */}
              <span className="tabular font-medium text-ink">{b.pct}%</span>
            </div>
            {/* The track reserves the full width from first paint, so nothing here can shift. */}
            <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-subtle">
              <div
                className={`h-full w-full origin-left rounded-full ${b.tone} motion-safe:transition-transform`}
                style={{
                  transform: `scaleX(${drawn ? b.pct / 100 : 0})`,
                  transitionDuration: "560ms",
                  transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
                  transitionDelay: `${i * 70}ms`,
                }}
              />
            </div>
          </div>
        ))}
      </div>

      <p className="mt-4 border-t border-line pt-3 text-[11px] leading-relaxed text-muted">
        Illustrative figures. Lenviq computes DPD and IRAC classification from the day-end position,
        not intra-day.
      </p>
    </div>
  );
}
