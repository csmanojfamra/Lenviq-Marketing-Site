/**
 * Is the live site being DELIVERED well — separate from whether it is current.
 *
 * `check-live.mjs` answers "is this the build we pushed". This answers "and is it reaching an
 * Indian reader quickly", which turned out to be the more expensive question: the site measured
 * an LCP of 6–11 SECONDS from a Jio connection in Rajasthan while the identical build served from
 * localhost measured about one second. Nothing was wrong with the pages. The origin was in
 * Strasbourg, ~204ms away, with no CDN in front and no cache headers.
 *
 * Every check here is a property of the SERVER, not of this repository — which is exactly why it
 * needs a script. Move to a new host and the geography may fix itself, but gzip, HTTP/2 and
 * `Cache-Control` are configuration that does not travel. A fresh nginx commonly ships with gzip
 * off, so a move can silently make delivery worse while the page source is unchanged.
 *
 *   node scripts/check-delivery.mjs            # against https://lenviq.in
 *   SITE_URL=https://staging.example node scripts/check-delivery.mjs
 *
 * Exit 0 when everything passes, 1 when something a reader would feel is wrong.
 */
import { execSync } from "node:child_process";

const SITE = (process.env.SITE_URL || "https://lenviq.in").replace(/\/$/, "");
const host = new URL(SITE).host;

/** curl, because Node's fetch exposes neither the negotiated protocol nor per-phase timings. */
function probe(path, extra = "") {
  const fmt = "%{http_code}|%{http_version}|%{time_connect}|%{time_starttransfer}|%{time_total}|%{size_download}|%{content_type}";
  try {
    const out = execSync(
      `curl -sS -o /dev/null --max-time 30 -H "Accept-Encoding: gzip, br" ${extra} -w "${fmt}" "${SITE}${path}"`,
      { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] },
    );
    const [code, ver, connect, ttfb, total, size, type] = out.trim().split("|");
    return { code: +code, ver, connect: +connect, ttfb: +ttfb, total: +total, size: +size, type };
  } catch {
    return null;
  }
}

function header(path, name) {
  try {
    const out = execSync(
      `curl -sSI --max-time 30 -H "Accept-Encoding: gzip, br" "${SITE}${path}"`,
      { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] },
    );
    const line = out.split("\n").find((l) => l.toLowerCase().startsWith(name.toLowerCase() + ":"));
    return line ? line.slice(line.indexOf(":") + 1).trim() : null;
  } catch {
    return null;
  }
}

const results = [];
const check = (ok, label, detail) => { results.push({ ok, label, detail }); };

console.log(`checking delivery of ${SITE}\n`);

// ── Reachability and latency ───────────────────────────────────────────────────
const home = probe("/");
if (!home || home.code !== 200) {
  console.error(`  ✗ ${SITE}/ did not return 200 — nothing else can be measured.`);
  process.exit(1);
}

/**
 * TCP connect is one round trip, so it is the cleanest proxy for distance available without a
 * traceroute. From India: ~20-40ms to an Indian origin, ~200ms to western Europe.
 */
const rtt = Math.round(home.connect * 1000);
check(rtt < 80, "round trip to the origin", `${rtt}ms connect${rtt >= 80 ? " — an Indian origin or a CDN edge should be under 80ms" : ""}`);

const ttfb = Math.round(home.ttfb * 1000);
check(ttfb < 600, "time to first byte on HTML", `${ttfb}ms${ttfb >= 600 ? " — a static file should not take this long" : ""}`);

// ── Transport ──────────────────────────────────────────────────────────────────
check(home.ver === "2" || home.ver === "3", "HTTP/2 or HTTP/3", `negotiated HTTP/${home.ver}`);

const enc = header("/", "content-encoding");
check(!!enc, "HTML is compressed", enc ? `content-encoding: ${enc}` : "NOT compressed — check gzip/brotli in the server config");

// ── Caching. The reason a reader once saw a screenshot several deploys old. ────
const cacheRules = [
  ["/", "HTML", (v) => !!v, "HTML should revalidate — e.g. public, max-age=0, must-revalidate"],
  ["/shots/dashboard-sm.webp", "screenshots", (v) => /max-age=\d+/.test(v || ""), "screenshots carry ?v=<hash>, so they can be cached for a week"],
];
for (const [path, label, ok, hint] of cacheRules) {
  const v = header(path, "cache-control");
  check(ok(v), `Cache-Control on ${label}`, v ? v : `absent — ${hint}`);
}

// ── Canonical host. One address, or the same page competes with itself. ────────
const redirects = [
  [`http://${host}/`, "https"],
  [`https://www.${host}/`, "apex"],
];
for (const [from, what] of redirects) {
  try {
    const out = execSync(`curl -sS -o /dev/null --max-time 20 -w "%{http_code}|%{redirect_url}" "${from}"`, { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] });
    const [code, to] = out.trim().split("|");
    check(code.startsWith("30") && (to || "").startsWith(SITE), `${what} redirect`, `${from} → ${code} ${to || "(none)"}`);
  } catch {
    check(false, `${what} redirect`, `${from} unreachable`);
  }
}

// ── Report ────────────────────────────────────────────────────────────────────
let failed = 0;
for (const r of results) {
  if (!r.ok) failed++;
  console.log(`  ${r.ok ? "✓" : "✗"} ${r.label.padEnd(30)} ${r.detail}`);
}
console.log(
  `\n${results.length - failed}/${results.length} passed.` +
  (failed ? "\n\nThe failures above are server configuration, not anything in this repository." : ""),
);
process.exit(failed ? 1 : 0);
