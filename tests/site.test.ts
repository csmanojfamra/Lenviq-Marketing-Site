import { describe, it, expect } from "vitest";
import { readFileSync, existsSync, readdirSync } from "node:fs";
import { join, sep } from "node:path";
import { stripComments } from "./helpers/every-match";

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
