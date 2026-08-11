"use client";

import * as React from "react";

/**
 * Fade and 12px rise, ONCE.
 *
 * Never replayed on scroll-back: a section that re-animates every time it passes the fold is a
 * page that never settles, and a page that never settles is one nobody can read.
 *
 * There is no reduced-motion check in here. The hidden starting state lives in CSS behind
 * `@media (prefers-reduced-motion: no-preference)` and a `.js` class set before paint, so for a
 * reader who asked for less motion — or whose JavaScript never arrived — the element was never
 * hidden and this only adds a class that changes nothing.
 *
 * ## Why an IntersectionObserver alone is not enough
 *
 * IntersectionObserver fires on a CHANGE of intersection state. Scroll smoothly and every element
 * passes through the viewport, so every one fires. **Jump** — an anchor link, the End key, a
 * restored scroll position — and an element can go from "below the viewport" to "above the
 * viewport" between two rendered frames. Its `isIntersecting` was false before and is false after:
 * no change, no callback, and that section stays invisible for the rest of the session.
 *
 * Measured, not theorised: scrolling this page in 500px jumps left ten of twenty-eight sections
 * permanently hidden.
 *
 * So the observer is backed by a sweep that runs at most once per frame while anything is still
 * hidden, and detaches itself the moment nothing is. Content that only appears after an animation
 * is content that does not exist for that reader, and a jump is not an unusual way to move down a
 * page.
 */

type Entry = { el: Element; done: boolean };

let registry: Entry[] = [];
let observer: IntersectionObserver | null = null;
let sweepArmed = false;
let frame = 0;

function markIn(el: Element) {
  el.classList.add("is-in");
  const e = registry.find((r) => r.el === el);
  if (e) e.done = true;
  observer?.unobserve(el);
}

/** Anything whose top has reached the bottom of the viewport has been seen — reveal it. */
function sweep() {
  frame = 0;
  for (const r of registry) {
    if (r.done) continue;
    if (r.el.getBoundingClientRect().top < window.innerHeight) markIn(r.el);
  }
  if (registry.every((r) => r.done)) detach();
}

function onScroll() {
  if (frame) return; // at most once per frame
  frame = requestAnimationFrame(sweep);
}

function detach() {
  if (!sweepArmed) return;
  window.removeEventListener("scroll", onScroll);
  window.removeEventListener("resize", onScroll);
  sweepArmed = false;
}

function attach() {
  if (sweepArmed) return;
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll, { passive: true });
  sweepArmed = true;
}

function register(el: Element) {
  registry.push({ el, done: false });
  observer ??= new IntersectionObserver(
    (entries) => {
      for (const e of entries) if (e.isIntersecting) markIn(e.target);
      if (registry.length && registry.every((r) => r.done)) detach();
    },
    // Threshold 0 rather than a fraction: a section taller than the viewport can never reach 15%
    // of its own area on screen, and would sit there waiting for a state it cannot enter.
    { threshold: 0, rootMargin: "0px 0px -10% 0px" },
  );
  observer.observe(el);
  attach();
  onScroll(); // catch anything already on screen, or already scrolled past, on first mount
}

function unregister(el: Element) {
  observer?.unobserve(el);
  registry = registry.filter((r) => r.el !== el);
  if (!registry.length) detach();
}

export function Reveal({
  children,
  as: Tag = "div",
  stage,
  className = "",
}: {
  children: React.ReactNode;
  as?: React.ElementType;
  /** 1–4: the staged hero entrance, 70ms apart. */
  stage?: 1 | 2 | 3 | 4;
  className?: string;
}) {
  const ref = React.useRef<HTMLElement>(null);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    register(el);
    return () => unregister(el);
  }, []);

  return (
    <Tag ref={ref} className={`reveal ${stage ? `stage-${stage}` : ""} ${className}`}>
      {children}
    </Tag>
  );
}
