/**
 * Is the live site the current one?
 *
 * The question that had no answer. A stale site serves an older correct page, so nothing looks
 * broken and nobody notices — three commits sat undeployed and the only reason it surfaced was
 * somebody remembering a sentence they had changed.
 *
 *   node scripts/check-live.mjs            # against origin/main
 *   node scripts/check-live.mjs <sha>      # against a specific commit
 *
 * Exit code is the point: 0 current, 1 stale, 2 could not tell. Usable from cron.
 */
import { execSync } from "node:child_process";

const SITE = process.env.SITE_URL || "https://lenviq.in";
const expected =
  process.argv[2] ||
  (() => {
    try {
      execSync("git fetch -q origin", { stdio: "ignore" });
      return execSync("git rev-parse origin/main").toString().trim();
    } catch {
      return null;
    }
  })();

let live;
try {
  const res = await fetch(`${SITE}/build-info.json`, { cache: "no-store" });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  live = await res.json();
} catch (e) {
  // A missing stamp is itself the answer: whatever is live predates the stamp being added.
  console.error(`could not read ${SITE}/build-info.json — ${e.message}`);
  console.error("if it 404s, the live build predates the build stamp and is certainly stale.");
  process.exit(2);
}

console.log(`live:     ${live.shortCommit}  ${live.subject || ""}`);
console.log(`built:    ${live.builtAt}${live.dirty ? "  (from a DIRTY tree)" : ""}`);

if (!expected) {
  console.error("could not resolve the expected commit — pass one as an argument.");
  process.exit(2);
}
console.log(`expected: ${expected.slice(0, 7)}`);

if (live.commit === expected) {
  console.log("\n✅ current");
  process.exit(0);
}
console.log("\n❌ STALE — the live site is not the current commit. Rebuild and copy the export.");
process.exit(1);
