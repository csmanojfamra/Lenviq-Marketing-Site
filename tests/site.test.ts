import { describe, it, expect } from "vitest";
import { readFileSync, existsSync, readdirSync } from "node:fs";
import { createHash } from "node:crypto";
import { join, sep, resolve } from "node:path";
import { execSync } from "node:child_process";
import { stripComments } from "./helpers/every-match";
import { intentMap } from "../src/lib/seo-intent";
import sitemap from "../src/app/sitemap";
import { COMPANY } from "../src/lib/site";
import { TOOLS, toolsMenu } from "../src/lib/tools";
import { autolinkGlossary } from "../src/lib/autolink";

/**
 * The marketing site, checked from the product's suite because that is the gate that runs.
 *
 * Two properties carry the risk here and get the attention: **a draft must not ship**, and **there
 * is no .com**. The first because one wrong regulatory claim published under a practising CA and
 * CS's company name costs more credibility than five correct posts earn. The second because "we
 * all know that" is exactly how a wrong domain reaches a prospect's browser bar.
 */
const SITE = join(__dirname, "..");
const src = (p: string) => readFileSync(join(SITE, p), "utf8");

describe("the site is its own application", () => {
  it("is its own package, reaching into no other repository", () => {
    const pkg = JSON.parse(src("package.json"));
    expect(pkg.name).toBe("lenviq-marketing-site");
    // The whole point of the split: the build must not climb out of this checkout.
    expect(pkg.scripts.prebuild).not.toMatch(/cd \.\./);
  });

  it("statically exports, and ships no authentication or database access", () => {
    expect(src("next.config.mjs")).toMatch(/output: "export"/);
    const pkg = JSON.parse(src("package.json"));
    for (const dep of ["@prisma/client", "prisma", "bcrypt", "ioredis", "bullmq"]) {
      expect(pkg.dependencies?.[dep], `${dep} must not be a site dependency`).toBeUndefined();
    }
  });

  it("carries its own brand sources, so a fresh clone builds with nothing else", () => {
    // This is why the repository is independent rather than a folder: `npm ci && npm run build`
    // from a clean checkout has to work. brand/ is what the prebuild syncs from.
    for (const f of ["brand/public/favicon.svg", "brand/tokens.css", "brand/fonts/fonts.css"]) {
      expect(existsSync(join(SITE, f)), f + " missing — the build is not standalone without it").toBe(true);
    }
  });
});

describe("the domain is written down once", () => {
  const site = src("src/lib/site.ts");

  it("there is one constant and it is lenviq.in", () => {
    expect(site).toMatch(/url: "https:\/\/lenviq\.in"/);
    expect(site).toMatch(/appUrl: "https:\/\/app\.lenviq\.in"/);
  });

  it("no page hard-codes a domain", () => {
    // Canonical URLs, OG URLs and the sitemap all read from the constant, so a future change is
    // one value rather than twenty — and the sitemap cannot disagree with the canonical tag.
    for (const f of walk(join(SITE, "src"))) {
      const text = stripComments(readFileSync(f, "utf8"));
      if (f.endsWith("lib/site.ts")) continue;
      expect(text, `${f} hard-codes a domain`).not.toMatch(/https:\/\/(www\.)?lenviq\./);
    }
  });

  it("there is no .com, anywhere", () => {
    for (const f of [...walk(join(SITE, "src")), ...walk(join(SITE, "content"))]) {
      expect(readFileSync(f, "utf8"), `${f} references a .com`).not.toMatch(/lenviq\.com/i);
    }
  });

  it("every Login affordance points at the product", () => {
    const header = src("src/components/site-header.tsx");
    expect(header).toMatch(/href=\{SITE\.appUrl\}/);
    expect(src("src/components/site-footer.tsx")).toMatch(/href=\{SITE\.appUrl\}/);
  });
});

describe("a draft does not ship", () => {
  const posts = readdirSync(join(SITE, "content/blog")).filter((f) => f.endsWith(".md"));

  it("every post is explicitly one or the other — never silent", () => {
    // A post with no `draft` line would be loaded as published by default, which is the wrong
    // default for regulatory writing.
    expect(posts.length).toBeGreaterThanOrEqual(5);
    for (const f of posts) {
      expect(src(`content/blog/${f}`), `${f} does not declare draft:`).toMatch(/^draft: (true|false)$/m);
    }
  });

  it("every published post cites a source that can be opened", () => {
    // The five were verified against the RBI notifications before publication, and two of them
    // were WRONG at draft stage: the KFS circular was cited as RBI/2023-24/122 when it is
    // RBI/2024-25/18, and the penal-charge transition dates had been extended by a later circular.
    // A citation nobody can click is a citation nobody checks.
    for (const f of posts) {
      const text = src(`content/blog/${f}`);
      if (/^draft: true$/m.test(text)) continue;
      const regulatory = /Companies Act|PMLA|RBI\/|DOR\.|DoR\./.test(text);
      if (!regulatory) continue;
      expect(text, `${f} makes a regulatory claim with no linked source`)
        .toMatch(/\]\(https:\/\/(www\.)?rbi(docs)?\.org\.in\/|Companies Act, 2013|Prevention of Money-laundering Act, 2002/);
    }
  });

  it("no published post still carries its unreviewed banner", () => {
    for (const f of posts) {
      const text = src(`content/blog/${f}`);
      if (/^draft: false$/m.test(text)) {
        expect(text, `${f} is published but still says it is not`).not.toMatch(/not reviewed, not published/);
      }
    }
  });

  it("only published posts are loaded, by the only loader there is", () => {
    const content = stripComments(src("src/lib/content.ts"));
    expect(content).toMatch(/publishedPosts = \(\): Post\[\] => all\(\)\.filter\(\(p\) => !p\.draft\)/);
    // The sitemap and the post route both go through it — nothing loads `all()` directly.
    expect(stripComments(src("src/app/sitemap.ts"))).toMatch(/publishedPosts\(\)/);
    expect(stripComments(src("src/app/blog/[slug]/page.tsx"))).toMatch(/publishedPosts\(\)/);
  });

  it("a draft would still not be built, whatever else is", () => {
    // The route generates params from `publishedPosts()` alone, so marking a post `draft: true`
    // removes its page entirely — no URL to guess, nothing to link, nothing for a crawler that
    // ignores `noindex` to find. That is the mechanism; the current contents are not the test.
    const route = stripComments(src("src/app/blog/[slug]/page.tsx"));
    expect(route).toMatch(/generateStaticParams\(\)[\s\S]{0,120}publishedPosts\(\)/);
    expect(route).not.toMatch(/\ball\(\)/);
  });

  it("the legal pages carry the reviewed documents, not a transcription of them", () => {
    /**
     * These two used to assert the opposite: a draft notice, a `noindex`, and an entry in the
     * robots disallow list. That was right while nothing had been reviewed, and both were removed
     * together when the reviewed Terms of Service and Privacy Policy were published — lifting a
     * `noindex` while leaving a `Disallow` behind would have left the URLs indexable but
     * unreadable, since a crawler that obeys the disallow never fetches the page and so never
     * reads the tag.
     *
     * What is asserted now is the property that replaced it: the pages RENDER the converted
     * documents rather than a hand-written summary, because a page that has drifted from the
     * document it purports to reproduce is worse than no page at all — a customer relies on it.
     */
    for (const p of ["privacy", "terms"]) {
      const page = src(`src/app/${p}/page.tsx`);
      expect(page, `${p} should render the converted document`).toMatch(/legalDoc\(/);
      const shipped = stripComments(page);
      expect(shipped, `${p} should no longer be marked a draft`).not.toMatch(/Draft — pending legal review/);
      expect(shipped, `${p} should no longer be noindex`).not.toMatch(/robots: \{ index: false/);
    }
    // Generated, never typed: the next revision arrives as a .docx and is re-imported.
    expect(existsSync(join(SITE, "content/legal/terms.md")), "run node scripts/import-legal.mjs").toBe(true);
    expect(existsSync(join(SITE, "content/legal/privacy.md"))).toBe(true);
  });

  it("the site is indexable, and nothing is excluded any more", () => {
    expect(src("src/app/layout.tsx")).toMatch(/robots: \{ index: true, follow: true \}/);
    const robots = src("src/app/robots.ts");
    expect(robots, "the blanket disallow should be gone").not.toMatch(/disallow: \["\/"/);
    expect(robots, "the two drafts became real documents").not.toMatch(/disallow: \["\/privacy\/", "\/terms\/"\]/);
    // And they are now offered to search, which is the other half of the same change.
    expect(src("src/app/sitemap.ts")).toMatch(/"\/privacy\/", "\/terms\/"/);
  });
});

describe("nothing is claimed that cannot be checked", () => {
  /**
   * The built HTML — what actually reaches a reader — not the source.
   *
   * Scanning source flagged the comments that EXPLAIN why counters and testimonials are forbidden,
   * which is the check failing on its own rationale. The output has no comments and no rationale;
   * it has only what ships.
   */
  const OUT = join(SITE, "out");
  /**
   * The MARKETING output — the legal pages are excluded, and the reason is the same one that made
   * this read output rather than source.
   *
   * Scanning source flagged the comments that EXPLAIN why counters and testimonials are forbidden.
   * Scanning the legal pages flags the contract clauses that FORBID them: clause 19.5 says neither
   * party may use the other's name in a case study without consent, and Schedule B says Fastlegal
   * gives no uptime commitment. Both are the opposite of the claim being guarded against, and both
   * are quotations from a reviewed document that this repository must not be editing to satisfy a
   * regex.
   *
   * The guard is about what the site CLAIMS. A contract disclaiming a claim is not one.
   */
  const LEGAL = ["/privacy/", "/terms/"];
  const html = existsSync(OUT)
    ? walkExt(OUT, /\.html$/)
        .filter((f) => !LEGAL.some((l) => f.includes(l.replace(/\//g, sep))))
        .map((f) => readFileSync(f, "utf8"))
        .join("\n")
    : null;

  it("no counters, no adoption claims", () => {
    // "trusted by 50+ NBFCs", "₹X crore processed", an uptime figure — none of it is measured, so
    // none of it appears. An animated counter is the same claim with more emphasis.
    expect(html, "run `npm run build` in site/ — this checks the OUTPUT").not.toBeNull();
    expect(html!).not.toMatch(/trusted by\s*\d|\d+\+\s*(NBFC|lender|customer)|uptime|crore (processed|disbursed)/i);
  });

  it("no testimonials, logos or case studies", () => {
    expect(html!).not.toMatch(/testimonial|case stud|as featured in|our customers include/i);
  });

  it("the registration numbers are blank rather than invented", () => {
    // A CIN is checked against the MCA register. A wrong one is worse than an absent one.
    const site = src("src/lib/site.ts");
    expect(site).toMatch(/cin: ""/);
    expect(site).toMatch(/gstin: ""/);
  });

  it("the contact CTA delivers somewhere, rather than discarding what it is given", () => {
    // A form posting nowhere is the same defect as a "Forgot password?" link for a flow that does
    // not exist, except that here it costs a real prospect.
    const contact = src("src/app/contact/page.tsx");
    expect(contact).toMatch(/mailto:\$\{COMPANY\.email\}/);
    expect(stripComments(contact)).not.toMatch(/<form/);
  });
});

describe("signup asks for a code, and never swallows what was typed", () => {
  const form = src("src/components/signup-form.tsx");
  const page = src("src/app/signup/page.tsx");

  it("posts to the product's API through the one constant that holds a domain", () => {
    // The site is a static export with no server, so the form calls the product cross-origin. The
    // domain still may not be written here — `SITE.appUrl` is the single place it lives.
    expect(form).toMatch(/SITE\.appUrl.*api\/public\/signup/);
    expect(stripComments(form)).not.toMatch(/https:\/\/(www\.)?lenviq\./);
  });

  it("there are three steps and the middle one is the code", () => {
    // A signup that creates the account before the address is proved is a queue anybody can fill
    // with somebody else's company name.
    expect(form).toMatch(/"details" \| "code" \| "done"/);
    for (const path of ["start", "verify", "resend"]) {
      expect(form, `the ${path} call is missing`).toContain(`post("${path}"`);
    }
  });

  it("a failed call hands the reader their content back rather than losing it", () => {
    // The same rule the demo form follows: a form that discards a submission costs a real prospect
    // and nobody ever finds out.
    expect(form).toMatch(/sendByEmail/);
    expect(form).toMatch(/mailto:\$\{COMPANY\.email\}/);
    expect(form).toMatch(/Nothing you typed is lost/);
  });

  it("carries a honeypot that a person cannot fill", () => {
    expect(form).toMatch(/name="website"/);
    expect(form).toMatch(/tabIndex=\{-1\}/);
  });

  it("the page delegates the form, as the contact page does", () => {
    // Pages stay server components; only the form is a client one. Same shape as /contact/.
    expect(stripComments(page)).not.toMatch(/<form/);
    expect(page).toMatch(/<SignupForm \/>/);
  });

  it("it is reachable and indexed", () => {
    expect(src("src/app/sitemap.ts")).toContain('"/signup/"');
    expect(src("src/components/site-header.tsx")).toMatch(/href="\/signup\/"/);
    expect(src("src/components/site-nav.tsx")).toMatch(/href="\/signup\/"/);
  });
});

describe("the forms do not assume the visitor is an NBFC", () => {
  const signup = src("src/components/signup-form.tsx");
  const demo = src("src/components/demo-form.tsx");

  /**
   * A lending platform's customer is not always an NBFC — an HFC, a co-operative society, a Nidhi
   * company or a fintech running a book are all people this is built for. Asking for "NBFC name"
   * at the first question, and for an RBI Certificate of Registration further down, tells every
   * one of them the software is not for them before they have typed anything.
   */
  it("asks for a company or institution, not an NBFC", () => {
    // Comments stripped: the code must not ASK it. The comments above each field explain why the
    // wording changed, and asserting on prose would forbid recording the decision.
    for (const [name, form] of [["signup", signup], ["demo", demo]] as const) {
      const code = stripComments(form);
      expect(code, `${name} form still asks for an NBFC name`).not.toMatch(/NBFC name/);
      expect(code, `${name} form still says "registered with the RBI"`).not.toMatch(/registered with the RBI/);
      expect(code).toMatch(/Company \/ institution name/);
    }
  });

  it("does not ask for a registration only one kind of lender holds", () => {
    // The RBI CoR. Whatever registration an applicant has is a question for the review call.
    expect(stripComments(signup)).not.toMatch(/rbiCorNumber|RBI CoR/);
  });

  it("the signup form asks four required things and no book size", () => {
    // Four required fields is already the most a first request should ask for. Scale is a
    // question for the conversation, not a gate on getting an account.
    expect(stripComments(signup)).not.toMatch(/portfolioSizeRange|Active loan accounts/);
    const required = [...stripComments(signup).matchAll(/<span className="text-cta">\*<\/span>/g)];
    expect(required).toHaveLength(4);
  });
});

describe("motion has an off switch that leaves the page complete", () => {
  const css = src("src/app/globals.css");

  it("the hidden starting state is gated on reduced-motion AND on JavaScript having run", () => {
    // Content that only appears after an animation is content that does not exist for that reader.
    expect(css).toMatch(/@media \(prefers-reduced-motion: no-preference\)/);
    expect(css).toMatch(/\.js \.reveal \{/);
    expect(src("src/app/layout.tsx")).toMatch(/classList\.add\("js"\)/);
  });

  it("transform and opacity only — nothing that triggers layout", () => {
    const transitions = [...css.matchAll(/transition:\s*([^;]+);/g)].map((m) => m[1]);
    for (const t of transitions) {
      expect(t, `animates a layout property: ${t}`).not.toMatch(/\b(width|height|top|left|margin|padding)\b/);
    }
  });

  it("nothing loops", () => {
    expect(css).not.toMatch(/animation-iteration-count:\s*infinite|infinite/);
  });

  it("a jump down the page still reveals what it skipped", () => {
    // Measured: scrolling in 500px jumps left ten of twenty-eight sections permanently hidden,
    // because IntersectionObserver fires on a CHANGE of state and an element can go from below the
    // viewport to above it between two frames.
    const reveal = stripComments(src("src/components/reveal.tsx"));
    expect(reveal).toMatch(/getBoundingClientRect\(\)\.top < window\.innerHeight/);
    expect(reveal).toMatch(/threshold: 0,/);
  });

  it("a reveal never replays", () => {
    const reveal = stripComments(src("src/components/reveal.tsx"));
    expect(reveal).toMatch(/observer\?\.unobserve\(el\)/);
  });
});

/** Every .ts/.tsx/.md under a directory. */
const walk = (dir: string) => walkExt(dir, /\.(ts|tsx|md)$/);

function walkExt(dir: string, re: RegExp): string[] {
  if (!existsSync(dir)) return [];
  return readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = join(dir, e.name);
    if (e.isDirectory()) return walkExt(p, re);
    return re.test(e.name) ? [p] : [];
  });
}

/**
 * The build stamp.
 *
 * Added after three commits sat undeployed while the site served an earlier one with nothing
 * anywhere saying so. A stale site is not a broken site — it is an older correct site — which is
 * exactly why it goes unnoticed, and why the stamp has to be asserted rather than assumed present.
 */
describe("a running site can say which version it is", () => {
  it("the stamp is generated before every build and dev run", () => {
    const pkg = JSON.parse(src("package.json"));
    expect(pkg.scripts.prebuild).toMatch(/build-stamp/);
    expect(pkg.scripts.predev, "dev would break on the missing import without this").toMatch(/build-stamp/);
  });

  it("it degrades rather than failing the build", () => {
    // A deploy from a tarball has no git history. A stamp that breaks that build would be worse
    // than no stamp at all.
    const stamp = src("scripts/build-stamp.mjs");
    expect(stamp).toMatch(/catch \{\s*return fallback;/);
    expect(stamp).toMatch(/"unknown"/);
  });

  it("it records a build from a dirty tree as dirty", () => {
    // Such a build is not the commit it claims to be, and the stamp saying so is the whole point.
    expect(src("scripts/build-stamp.mjs")).toMatch(/dirty = git\("status --porcelain", ""\) !== ""/);
  });

  it("and reaches the page as well as the file", () => {
    // The JSON answers curl; the meta tag answers "which version is this tab showing".
    expect(src("src/app/layout.tsx")).toMatch(/<meta name="build-commit" content=\{BUILD\.shortCommit\}/);
    expect(src("scripts/build-stamp.mjs")).toMatch(/public\/build-info\.json/);
  });

  it("every entry point generates the stamp before it needs it", () => {
    /**
     * This broke CI, and it passed locally for the reason such things always do: a previous build
     * had left the generated file lying around, so the missing-module error only appeared on a
     * clean checkout. The layout imports the stamp, the stamp is gitignored, and anything that
     * typechecks or tests must therefore produce it first.
     */
    const pkg = JSON.parse(src("package.json"));
    for (const s of ["prebuild", "predev", "pretest", "typecheck"]) {
      expect(pkg.scripts[s], `${s} must generate the stamp`).toMatch(/build-stamp/);
    }
    // And CI must go through the script rather than calling tsc directly.
    const ci = src(".github/workflows/ci.yml");
    expect(ci).toMatch(/run: npm run typecheck/);
    expect(ci, "a bare tsc runs before the stamp exists").not.toMatch(/run: npx tsc --noEmit/);
  });

  it("NEGATIVE CONTROL — the generated file is never committed", () => {
    // It changes on every build. Committed, it would make every tree dirty and every stamp lie.
    const ignore = src(".gitignore");
    expect(ignore).toMatch(/build-info\.generated\.ts/);
    expect(ignore).toMatch(/build-info\.json/);
  });
});

/**
 * The one-line descriptor, pinned at this end too.
 *
 * It lives in two repositories because the site is a standalone static export (SITE-2), so nothing
 * can enforce that both copies agree — except a test at each end that names the same string. If
 * somebody changes one, this fails and says which.
 */
describe("one descriptor, and the product uses the same words", () => {
  const EXPECTED = "Loan origination, servicing and accounting for NBFCs";
  // `SITE` in this file is the repository path, so the config is read the way everything else here
  // reads source: as text.
  const config = src("src/lib/site.ts");
  const tagline = config.match(/\n\s*tagline:\s*"([^"]+)"/)?.[1] ?? "";

  it("is the string the product's email shell also uses", () => {
    expect(tagline).toBe(EXPECTED);
  });

  it("says nothing twice, and nothing the reader already knows", () => {
    const t = tagline.toLowerCase();
    // The old line was "Lending platform for Indian NBFCs — …": lending/lenders repeated,
    // "platform" said nothing, and "Indian" told an Indian NBFC something it knew.
    expect(t).not.toContain("platform");
    expect(t).not.toContain("indian");
    expect((t.match(/lend/g) ?? []).length).toBeLessThanOrEqual(1);
  });

  it("reaches the meta description and the share card from that one constant", () => {
    expect(src("src/app/layout.tsx")).toContain("SITE.tagline");
    // The OG card is generated from the same string, not typed again.
    const brand = src("scripts/build-brand.mjs");
    expect(brand).toContain("SITE.tagline from src/lib/site.ts");
    expect(brand).not.toMatch(/Lending platform for Indian NBFCs\s*\n\s*<\/p>/);
  });
});

/**
 * A page's title, its canonical and its `og:url` are one fact, so one function states them.
 *
 * All three had drifted, and none of it was visible without reading the built HTML:
 *
 * - Six pages ended their own title with `— Lenviq` while `layout.tsx` was already appending
 *   `· Lenviq`, so they shipped as `… — Lenviq · Lenviq`.
 * - Forty pages inherited `openGraph.url` from the root layout and told every crawler they were the
 *   home page. A canonical and an `og:url` that disagree is a duplicate-content signal.
 * - Thirty-eight pages overrode `openGraph` and lost `images` with it, because Next merges metadata
 *   per key rather than per field. Every share of a blog post rendered a blank card.
 *
 * These tests do not re-check the HTML — they check that no page can state those facts any way
 * except through `pageMetadata`, which is the property that makes the HTML right.
 */
describe("one page, one identity", () => {
  /**
   * `/preview/` is excluded, and only this one exclusion exists.
   *
   * `pageMetadata()` states a page's canonical URL and its `og:url`. A preview has neither — it is
   * never built, never in the sitemap and has no live address — so putting it through the helper
   * would have it declare a canonical for a URL that does not resolve. It carries `noindex`
   * instead, and the preceding describe block asserts it never reaches the build at all.
   */
  const pages = walkExt(join(SITE, "src/app"), /^page\.tsx$/).filter(
    (f) => !f.includes(`${sep}preview${sep}`),
  );

  it("finds the pages at all", () => {
    expect(pages.length).toBeGreaterThan(10);
  });

  it("every page builds its metadata through the one helper", () => {
    for (const f of pages) {
      const text = stripComments(readFileSync(f, "utf8"));
      if (!/\bmetadata\b|generateMetadata/.test(text)) continue;
      expect(text, `${f} declares metadata without pageMetadata()`).toContain("pageMetadata(");
    }
  });

  it("no page hand-writes a canonical or an og:url beside it", () => {
    for (const f of pages) {
      const text = stripComments(readFileSync(f, "utf8"));
      expect(text, `${f} sets alternates directly — pageMetadata owns that`).not.toMatch(/alternates:\s*\{/);
      expect(text, `${f} sets openGraph directly — pageMetadata owns that`).not.toMatch(/openGraph:\s*\{/);
    }
  });

  it("no title appends the brand the template is already appending", () => {
    // `layout.tsx` holds `template: "%s · Lenviq"`. A page that also names the product doubles it.
    // The home page is exempt: a title template does not apply to its own segment, only to
    // children, so `app/page.tsx` has to carry the brand itself.
    for (const f of pages) {
      if (f.endsWith(join("src", "app", "page.tsx"))) continue;
      const text = stripComments(readFileSync(f, "utf8"));
      const title = text.match(/\n\s*title:\s*"([^"]+)"/)?.[1];
      if (!title) continue;
      expect(title, `${f} title already says Lenviq; the template appends it again`).not.toMatch(/Lenviq/);
    }
  });

  it("the template is still the thing that appends it", () => {
    expect(src("src/app/layout.tsx")).toMatch(/template:\s*`%s · \$\{SITE\.name\}`/);
  });
});

/**
 * A meta description is not a ranking factor. It is the only sales copy in a search result, which
 * is why it has to finish its sentence: thirty-three posts shipped between 162 and 301 characters
 * and every one was cut off mid-clause.
 *
 * `metaDescription` exists separately from `description` because the two have different jobs — the
 * standfirst on the index page is written to be read, and is allowed to be longer.
 */
describe("every description fits in a search result", () => {
  const LIMIT = 160;

  it("no blog post's search line overruns", () => {
    const dir = join(SITE, "content/blog");
    for (const file of readdirSync(dir).filter((f) => f.endsWith(".md"))) {
      const raw = readFileSync(join(dir, file), "utf8");
      const meta = raw.match(/\nmetaDescription: "([^"]+)"/)?.[1]
        ?? raw.match(/\ndescription: "([^"]+)"/)?.[1]
        ?? "";
      expect(meta.length, `${file}: ${meta.length} characters`).toBeLessThanOrEqual(LIMIT);
    }
  });

  it("no page's description overruns either", () => {
    for (const f of walkExt(join(SITE, "src/app"), /^page\.tsx$/)) {
      const text = stripComments(readFileSync(f, "utf8"));
      for (const m of text.matchAll(/\n\s*description:\s*\n?\s*"([^"]+)"/g)) {
        expect(m[1].length, `${f}: ${m[1].length} characters`).toBeLessThanOrEqual(LIMIT);
      }
    }
  });
});

/**
 * The tokens are one file in two repositories, and until now nothing watched the seam.
 *
 * `brand/tokens.css` is the single source WITHIN each repository — `design-tokens.test.ts` in the
 * product and the brand test here both assert that no application stylesheet declares a colour of
 * its own. Neither asserts the thing that actually matters across the split: that the product's
 * copy and the site's copy are the SAME FILE. They are identical today because somebody kept them
 * so by hand, which is the arrangement this codebase has been bitten by six times — role code
 * versus name, the permission string, three copies of `scopeSql()`, two money formatters that
 * genuinely disagreed. Every time, all copies were correct until one changed.
 *
 * A published package for eleven kilobytes of custom properties needs versioning, publishing and a
 * resolution story in two build systems; a submodule needs everyone to remember `--recurse`. The
 * lightest thing that FAILS LOUDLY is a digest pinned at both ends — the same pattern this suite
 * already uses for the one-line descriptor, which is shared across the same seam for the same
 * reason.
 *
 * When the palette legitimately changes: edit `brand/tokens.css`, copy it to the other repository,
 * run either suite, and paste the digest it prints into BOTH files. The failure is the point — it
 * makes a one-sided change impossible to land quietly.
 */
describe("the palette is the same file in both repositories", () => {
  /** sha256 of brand/tokens.css. The identical constant lives in fintrustsuite's design-tokens.test.ts. */
  const TOKENS_SHA256 = "6794fa90b17d30cadf4660458cb9011591e6695c88112a5b39495e78c734490a";

  it("matches the digest the product also pins", () => {
    const actual = createHash("sha256").update(readFileSync(join(SITE, "brand/tokens.css"))).digest("hex");
    expect(
      actual,
      "brand/tokens.css changed. Copy it to the other repository and update TOKENS_SHA256 in BOTH test files — " +
        `the new digest is ${actual}`,
    ).toBe(TOKENS_SHA256);
  });

  it("and the site's stylesheet still declares no colour of its own", () => {
    // The within-repo half of the same rule: a stylesheet allowed one exception acquires a second.
    const generated = readFileSync(join(SITE, "src/styles/tokens.generated.css"), "utf8");
    expect(generated).toMatch(/GENERATED by scripts\/sync-brand\.mjs/);
    const own = [...stripComments(src("src/app/globals.css")).matchAll(/^\s*(--color-[\w-]+)\s*:/gm)].map((m) => m[1]);
    expect(own, "a token crept into globals.css — put it in brand/tokens.css").toEqual([]);
  });
});

/**
 * The intent map is the thing that stops two pages answering the same query.
 *
 * A keyword map kept in a document is correct the day it is written and wrong by the third new
 * page, because nothing connects it to the routes. These two tests are the connection: a page with
 * no stated intent fails the suite, and two pages claiming the same primary keyword fail it by
 * name. Cannibalisation is not hypothetical here — the home page, the platform page and four
 * product pages all sit inside one topic, and one careless title is all it takes for two of them to
 * start splitting their own signal.
 */
describe("no two pages compete for the same query", () => {
  const map = intentMap();

  it("covers every URL the sitemap offers", () => {
    const mapped = new Set(map.map((e) => e.url));
    const listed = sitemap().map((e) => new URL(e.url).pathname);
    for (const url of listed) {
      expect(mapped.has(url), `${url} is in the sitemap with no stated search intent — add it to seo-intent.ts`).toBe(true);
    }
  });

  it("offers nothing the sitemap does not", () => {
    // The other direction: an entry for a page that no longer exists is a map describing a site
    // that is not this one.
    const listed = new Set(sitemap().map((e) => new URL(e.url).pathname));
    for (const e of map) {
      expect(listed.has(e.url), `${e.url} has an intent but is not in the sitemap`).toBe(true);
    }
  });

  it("gives each page a primary keyword nothing else claims", () => {
    const seen = new Map<string, string>();
    for (const e of map) {
      const key = e.primary.toLowerCase().trim();
      const already = seen.get(key);
      expect(already, `"${e.primary}" is claimed by both ${already} and ${e.url} — differentiate or consolidate`).toBeUndefined();
      seen.set(key, e.url);
    }
  });

  it("puts the commercial pages at the top of the queue", () => {
    // Priority 1 is what gets submitted to Search Console first, so it must be the pages the site
    // exists to be found through — not whatever was published most recently.
    const top = map.filter((e) => e.priority === 1).map((e) => e.url).sort();
    expect(top).toEqual([
      "/", "/compliance/", "/gold-loan-software/", "/loan-against-property-software/",
      "/personal-loan-software/", "/platform/", "/vehicle-loan-software/",
    ]);
  });
});

/**
 * Every page a stranger lands on from a search result says who is behind it and how to reach them.
 *
 * These pages are written well enough to be mistaken for a consultancy's, which is the failure this
 * guards: a reader agrees with a worked provisioning example, leaves, and never learns that the
 * people who wrote it sell the software that does it. The listing hubs count too — they rank in
 * their own right.
 */
describe("a search visitor can always find the product and a person", () => {
  const OUT = resolve(__dirname, "../out");
  const pages = existsSync(OUT)
    ? execSync(`find ${OUT} -name index.html`, { encoding: "utf8" }).trim().split("\n")
    : [];

  /** Legal and utility pages are not conversion surfaces and are excluded on purpose. */
  const EXEMPT = /\/(privacy|terms|security|contact|signup|404|_not-found)\/index\.html$/;

  const seoPages = pages.filter((f) => !EXEMPT.test(f) && !f.endsWith("out/index.html"));

  it.runIf(pages.length > 0)("carries a demo ask and a reachable number", () => {
    const missing = seoPages.filter((f) => {
      const html = readFileSync(f, "utf8");
      const asks = /Book a demo|Request a demo|See it on your own book/.test(html);
      return !(asks && html.includes(COMPANY.phoneDisplay));
    });
    expect(missing.map((f) => f.replace(`${OUT}/`, ""))).toEqual([]);
  });

  /**
   * One interruption in the reading column, never two. A second card partway down a page that
   * already carries one is the point at which a content page starts reading as an advertisement.
   */
  it.runIf(pages.length > 0)("interrupts the reading column at most once", () => {
    const noisy = seoPages.filter((f) => {
      const body = readFileSync(f, "utf8").split("<!--$")[0];
      return (body.match(/While you are here/g) ?? []).length > 2;
    });
    expect(noisy.map((f) => f.replace(`${OUT}/`, ""))).toEqual([]);
  });
});

/**
 * A preview is for review, and review is not publication.
 *
 * The gate is `generateStaticParams` returning a placeholder outside development, which is only
 * as good as the assertion that nothing leaked past it — a mistake here does not fail a build,
 * it quietly publishes an unreviewed page.
 */
describe("a preview page never reaches the build", () => {
  const OUT = resolve(__dirname, "../out");

  it.runIf(existsSync(OUT))("emits no preview content and no preview URL", () => {
    const previewOnly = readFileSync(
      resolve(__dirname, "../src/app/preview/[slug]/page.tsx"),
      "utf8",
    ).includes("Preview — not published");
    expect(previewOnly).toBe(true);

    const files = execSync(`find ${OUT} -type f`, { encoding: "utf8" }).trim().split("\n");
    const leaked = files.filter((f) => readFileSync(f, "utf8").includes("Preview — not published"));
    expect(leaked).toEqual([]);

    const sitemapXml = readFileSync(join(OUT, "sitemap.xml"), "utf8");
    expect(sitemapXml).not.toContain("/preview/");
  });
});

/**
 * `.prose-lenviq > * + *` is what puts a gap between two paragraphs, and the `>` is load-bearing.
 *
 * Wrapping the article HTML in one more `<div>` — which is the obvious way to insert anything into
 * the middle of it — makes every paragraph a grandchild, the rule stops matching, and every post on
 * the site loses its paragraph spacing. Nothing errors and nothing looks broken in a diff; it is
 * visible only in a screenshot of a rendered page. That is exactly the class of regression a test
 * has to hold, so this one asserts the relationship the CSS depends on.
 */
describe("article paragraphs are spaced", () => {
  const OUT = resolve(__dirname, "../out");

  it.runIf(existsSync(OUT))("keeps prose as a direct child of the element that styles it", () => {
    const posts = execSync(`find ${OUT}/blog -name index.html`, { encoding: "utf8" })
      .trim().split("\n").filter((f) => !f.endsWith("blog/index.html"));
    expect(posts.length).toBeGreaterThan(5);

    const broken = posts.filter((f) => {
      const html = readFileSync(f, "utf8");
      // The opening tag that carries the class, then whatever it contains first.
      const m = html.match(/class="prose-lenviq[^"]*"[^>]*>\s*(<[a-z0-9]+)/i);
      return !m || /^<div$/i.test(m[1]);
    });
    expect(broken.map((f) => f.replace(`${OUT}/`, ""))).toEqual([]);
  });
});

/**
 * A fenced block reaches the page as a block.
 *
 * The renderer had no block form at all until it was needed for worked arithmetic, and two posts
 * had been written with fences on the assumption that it did. Their journal entries shipped as
 * run-on paragraphs with the fence characters visible — for months, on pages whose whole point was
 * the entries. Nothing errors when this breaks, which is why it is asserted here.
 */
describe("worked examples are laid out as written", () => {
  const OUT = resolve(__dirname, "../out");

  it.runIf(existsSync(OUT))("renders every fence as a block and leaves none visible", () => {
    const posts = execSync(`find ${OUT}/blog -name index.html`, { encoding: "utf8" })
      .trim().split("\n").filter((f) => !f.endsWith("blog/index.html"));

    const wrong = posts.filter((f) => readFileSync(f, "utf8").includes("```"));
    expect(wrong.map((f) => f.replace(`${OUT}/`, ""))).toEqual([]);

    // Every post whose source is fenced must actually emit a <pre>.
    const SRC = resolve(__dirname, "../content/blog");
    const fenced = readdirSync(SRC)
      .filter((n) => n.endsWith(".md") && readFileSync(join(SRC, n), "utf8").includes("\n```"))
      .map((n) => n.replace(/\.md$/, ""));
    expect(fenced.length).toBeGreaterThan(0);

    const missing = fenced.filter((slug) => {
      const f = join(OUT, "blog", slug, "index.html");
      return existsSync(f) && !readFileSync(f, "utf8").includes("<pre>");
    });
    expect(missing).toEqual([]);
  });
});

/**
 * The navigation cannot omit a tool, and cannot miscount them.
 *
 * The menu was a hand-written list that also announced how many tools there were. Adding the ninth
 * left the menu showing eight and the label reading "Eight free calculators" — a live page with no
 * route into it from the navigation, beside a number that was simply wrong. The list is derived
 * now; this asserts that it stays derived.
 */
describe("every tool is reachable from the navigation", () => {
  it("lists all of them, and counts them correctly", () => {
    const menu = toolsMenu();
    for (const t of TOOLS) {
      expect(menu.map((m) => m.href)).toContain(`/tools/${t.slug}/`);
    }
    expect(menu[0].note).toContain(String(TOOLS.length));
  });

  it("keeps the nav list out of the component that renders it", () => {
    const nav = readFileSync(resolve(__dirname, "../src/components/site-nav.tsx"), "utf8");
    const hardcoded = nav.match(/href: "\/tools\/[a-z-]+\//g) ?? [];
    expect(hardcoded).toEqual([]);
  });
});

/**
 * The autolinker never writes a link inside a link.
 *
 * It rewrites HTML it is itself producing, which is the whole difficulty: the protected regions
 * have to be recomputed after every insertion, or a later phrase matches text inside an anchor the
 * previous phrase just wrote. One post shipped `href="/glossary/<a href="/glossary/dcb/">collection`
 * for exactly that reason, and neither the build nor the type-checker had anything to say about it.
 */
describe("glossary links are well formed", () => {
  const OUT = resolve(__dirname, "../out");

  it("produces no nested anchor and no anchor inside an attribute", () => {
    const html = autolinkGlossary(
      "<p>Collection efficiency against demand, collection and balance, with days past due.</p>",
    );
    expect(html).not.toMatch(/href="[^"]*<a\b/);
    expect(html).not.toMatch(/<a\b[^>]*>[^<]*<a\b/);
  });

  it.runIf(existsSync(OUT))("ships none across the whole site", () => {
    const pages = execSync(`find ${OUT} -name index.html`, { encoding: "utf8" }).trim().split("\n");
    const broken = pages.filter((f) => /href="[^"]*<a\b/.test(readFileSync(f, "utf8")));
    expect(broken.map((f) => f.replace(`${OUT}/`, ""))).toEqual([]);
  });
});

/**
 * A menu that renders its links only after a click gives those pages nothing in the markup.
 *
 * The dropdowns were `{open && …}`, so the built HTML carried no link from the site-wide navigation
 * to any of the nine tool pages or the four product pages. They were reachable through their hubs,
 * but the strongest internal signal a page gets was missing from every page on the site.
 */
describe("navigation links exist in the HTML, not just after a click", () => {
  const OUT = resolve(__dirname, "../out");

  it.runIf(existsSync(OUT))("links every tool from the home page markup", () => {
    const home = readFileSync(join(OUT, "index.html"), "utf8");
    for (const t of TOOLS) {
      expect(home, `no nav link to ${t.slug}`).toContain(`href="/tools/${t.slug}/"`);
    }
  });
});
