/**
 * Assert on EVERY occurrence, not the first one.
 *
 * The defect this exists to prevent, in its own words: a check greps a source file for a pattern,
 * takes `indexOf` or a non-global `match`, asserts something about that one hit, and passes — while
 * a second, third and fourth occurrence go unexamined. The sweep in REPORT-5K fixed every instance
 * that existed. The very next block wrote the 5L smoke-guard test with the same defect, and this
 * session hit it three more times:
 *
 *  - `smoke-account.test.ts` matched the import line and asserted against that.
 *  - the "no storage-key text box" check matched the module's own comment quoting the old wording.
 *  - the "no second toLocaleString" check matched the doc comment naming it.
 *
 * That is the evidence for a helper rather than another sweep: a sweep fixes what exists without
 * changing how the next check gets written.
 *
 * Three things it does that a hand-written `indexOf` does not:
 *
 *  1. Finds every occurrence and asserts on all of them.
 *  2. Fails when there are NO occurrences, so a check cannot pass by matching nothing — the
 *     vacuity that makes a green test worthless.
 *  3. Strips comments first, so a comment explaining what the code used to do is not mistaken for
 *     the code still doing it.
 */

export interface Occurrence {
  /** 1-based line number in the original source, so a failure points at something openable. */
  line: number;
  /** The line's text, trimmed. */
  text: string;
}

/**
 * Source with comments removed, positions preserved.
 *
 * Block and line comments become spaces rather than disappearing, so every line number and column
 * still matches the original file. Replacing them with nothing would shift the line numbers a
 * failure message quotes, which is how a helpful message becomes a misleading one.
 */
export function stripComments(src: string): string {
  return src
    .replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, " "))
    .replace(/(^|[^:])\/\/[^\n]*/g, (m, p1) => p1 + " ".repeat(m.length - p1.length));
}

/** Every line of `src` matching `pattern`, with comments ignored. */
export function occurrences(src: string, pattern: RegExp): Occurrence[] {
  const code = stripComments(src);
  const re = new RegExp(pattern.source, pattern.flags.includes("g") ? pattern.flags : pattern.flags + "g");
  const out: Occurrence[] = [];
  const lines = code.split("\n");
  const original = src.split("\n");
  for (let i = 0; i < lines.length; i++) {
    re.lastIndex = 0;
    if (re.test(lines[i])) out.push({ line: i + 1, text: original[i].trim() });
  }
  return out;
}

export interface EveryMatchResult {
  ok: boolean;
  /** Human-readable, naming the file and the offending lines. */
  message: string;
  count: number;
  failures: Occurrence[];
}

/**
 * `predicate` must hold for every occurrence of `pattern`, and there must be at least `minCount`.
 *
 * The `minCount` guard is the point as much as the predicate is: a check that finds nothing and
 * passes tells you the file is clean when it may only mean the pattern was wrong.
 */
export function everyMatch(
  file: string,
  src: string,
  pattern: RegExp,
  predicate: (o: Occurrence) => boolean,
  minCount = 1,
): EveryMatchResult {
  const found = occurrences(src, pattern);
  if (found.length < minCount) {
    return {
      ok: false,
      count: found.length,
      failures: [],
      message: `${file}: expected at least ${minCount} occurrence(s) of ${pattern}, found ${found.length}. A check that matches nothing passes for the wrong reason.`,
    };
  }
  const failures = found.filter((o) => !predicate(o));
  return {
    ok: failures.length === 0,
    count: found.length,
    failures,
    message: failures.length
      ? `${file}: ${failures.length} of ${found.length} occurrence(s) failed:\n` +
        failures.map((f) => `  ${file}:${f.line}  ${f.text}`).join("\n")
      : `${file}: all ${found.length} occurrence(s) hold.`,
  };
}

/** No occurrence of `pattern` may survive — the "this must be gone everywhere" case. */
export function noMatch(file: string, src: string, pattern: RegExp): EveryMatchResult {
  const found = occurrences(src, pattern);
  return {
    ok: found.length === 0,
    count: found.length,
    failures: found,
    message: found.length
      ? `${file}: ${found.length} occurrence(s) of ${pattern} remain:\n` +
        found.map((f) => `  ${file}:${f.line}  ${f.text}`).join("\n")
      : `${file}: none remain.`,
  };
}
