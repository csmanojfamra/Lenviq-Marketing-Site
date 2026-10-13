# Sprint SEO-3 — report

Measured in `~/Developer/Lenviq-Marketing-Site` on 13 October 2026. Nothing in the product
repository was opened. Baseline before any change: 171 tests passing, build 128 pages, sitemap 123
URLs. After: **176 tests passing**, build 128 pages, sitemap **122** URLs — the one removal is
`/authors/`, which is §5's decision.

Section 3 was first reported as *nothing changed*, because §2.3 says not to fix a cause just
disproved. The author then asked for it anyway as ordinary link hygiene; §4 below is that work, and
it does not change the verdict in §3.

**Two of this sprint's three premises did not survive measurement.** The draft gate did not fail,
and contextual inbound links do not explain the thirteen declined pages. Both are set out below with
the evidence, because §0 asked for disagreement to be stated loudly and §2.3 asked for the hypothesis
to be falsified if that is what the data does.

---

## 1. The draft gate

### 1(a) The mechanism that exists today

| | |
|---|---|
| The one field | `draft:` in each post's own front matter — parsed at `src/lib/content.ts:80`, and `src/lib/help.ts:92` for guides |
| The filter | `publishedPosts()` — `src/lib/content.ts:139`; `publishedHelp()` — `src/lib/help.ts:109` |
| What it governed | the post route, the blog index, the related-posts block, the authors page and the sitemap all loaded that filter, so a draft had **no route, no URL, no sitemap entry and no listing link** |
| The review route | `/preview/[slug]/` — `generateStaticParams` returns nothing outside `NODE_ENV=development`, so in a production build it emits one `not-published` placeholder and no preview HTML |

**Do these seven pages carry a draft marker?** No — all seven carry `draft: false`. So do all
fifty-six files in `content/blog`. Not one carries `draft: true`.

### 1(b) The exact reason the gate did not hold: **it did hold, and then it was opened**

This is the finding, and it contradicts §1.1/§1.2 of the brief.

1. The four compliance pages were committed **as drafts** — `7719f11`, *"content(compliance): the
   compliance cluster and the registration page, as drafts"*. Its diff adds `draft: true` to each.
   The three state licensing pages went in the same way (`015f73d`, `cb17e45`, `dbd6c92`).
2. One commit flipped all seven to `draft: false`: **`0e253ff`**, Fri 9 Oct 2026 10:49 +0530, author
   `blueinsecurities@gmail.com`. `git log -S"draft: false"` on each of the seven files returns that
   same commit and no other.
3. Its message records the decision:

   > *"Manoj's call, and his to make — the brief reserved publishing these to him and he has
   > decided. Seven pages from draft to live: the four NBFC compliance pages and the Tamil Nadu,
   > Kerala and West Bengal money-lending pages."*

   It goes on to list the five items the pages could not verify and states that each says so in its
   own text.

So there was no breach and no defect. The gate was engaged, it worked, and the person it was
reserved for opened it deliberately and recorded why. **Nothing in the repo shows the mechanism
failing.**

Applying the three-way classification to the "missing" claims in §1.2:

| Claim | Classification |
|---|---|
| A draft-gate mechanism | **Present in the codebase**, at the lines above |
| A draft marker on these seven pages | **Absent from the codebase** — removed on purpose by `0e253ff` |
| Evidence of who decided, and on what basis | **Present** — the commit message and its author |
| A record of Manoj's review of the claims themselves | **Outside my access.** The commit asserts the decision was his; whether each claim was checked one by one is not in the repository |

### 1(c) What I built, and why it is not what the brief described

The gate works for content files. What had **no publication state at all** was a hand-written route
page: its presence in the sitemap was a literal array in `src/app/sitemap.ts`, its priority was a
chain of ternaries beside it, and `pageMetadata()` had no way to emit `noindex` — the two pages that
did it hand-wrote `export const metadata = { robots: … }`. That is one truth in two places for every
route page, and §5 could not be implemented without closing it.

New file **`src/lib/publication.ts`** — the single state, two values named for the consequence rather
than the cause (`"published" | "excluded"`, because `/authors/` is not awaiting review and calling it
a draft would say it was):

| Page kind | Where its one field lives |
|---|---|
| blog post | `draft:` in its front matter |
| help guide | `draft:` in its front matter |
| route page | its entry in `ROUTE_PAGES` |

The four consequences, each from that one field and nothing else:

| | How |
|---|---|
| absent from `sitemap.xml` | `publishedRoutes()` / `publishedPosts()` / `publishedHelp()` |
| emits `noindex, nofollow` | `pageMetadata()` reads the same field — `m.excluded` for a content file, `isExcludedRoute(m.path)` for a route page |
| in no index, listing, feed or related-posts block | every listing loads the published filter |
| still reachable at its own URL | the post and guide routes generate a param for **every** file |

**One deliberate reversal, stated plainly.** A draft used to get no page at all, and the repo argued
for that at length — it is stronger against accidental indexing, because there is no HTML to index.
I changed it because §1(c) asked for it by name and because the old design made review impossible:
the only way to read a draft was `next dev` on somebody's laptop. The reasoning, including the
counter-argument, is recorded in `publication.ts` and in the two tests that replaced the ones
asserting the old mechanism.

**A new guard: there is exactly one place a `noindex` is emitted.** `tests/site.test.ts` walks
`src/`, finds every file writing a `robots: {` object, and fails on anything outside an allow-list of
five. A gate a page can opt out of by hand is not a gate.

### 1(c) negative control — what I broke on purpose

Flipped `content/blog/write-off-what-it-does.md` to `draft: true` and rebuilt. Before the flip the
slug appeared in **9 built HTML files** and **1 sitemap entry**.

| Consequence | First run | What it looked like |
|---|---|---|
| 1 — absent from sitemap | **pass** | 0 occurrences; sitemap 122 → 121 locs |
| 2 — emits the tag | **pass** | `<meta name="robots" content="noindex, nofollow"/>` |
| 3 — in no listing | **FAILED** | 9 files → **2**. The blog index, the authors page and five related-posts blocks all dropped it. `out/tools/nbfc-provisioning-calculator/index.html` **went on linking to it** |
| 4 — reachable at its URL | **pass** | page present, 90,940 bytes, `<h1>` intact, draft banner rendered |

**The leak was real and it was the second instance of the class this sprint set out not to add to.**
`src/lib/tools/index.ts` carries a curated `reading` list per tool — about thirty literal
`/blog/<slug>/` hrefs that knew nothing about the posts they point at. A further-reading block is a
listing, and it was a crawl path into unreviewed content. Fixed in
`src/components/tools/tool-page.tsx`: the block now filters through `postBySlug` (the published-only
loader), so a draft — or a renamed or deleted post — leaves the block instead of becoming a link to a
page nobody signed off.

Second run after the fix: consequence 3 passed — **the only HTML file mentioning the slug was its own
page**. Then flipped back: 9 files, 1 sitemap entry, `<meta name="robots" content="index, follow"/>`,
and `git status content/` reports nothing, so the file is byte-identical to `HEAD`.

### 1(d) `REVIEW_PENDING_MANOJ.md`

Written. Seven pages, each with title, URL, word count and every regulatory claim beside the citation
it gives — roughly 150 claim rows, plus a nine-item list of what the pages themselves say they could
not verify. Not summarised and not graded.

---

## 2. The link graph

`scripts/link-graph.mjs`, read from `out/` after a build. Classification is structural for chrome
(one `<header>`, one `<footer>`, breadcrumb `<nav>`) and by the anchor's own class inside `<main>` —
those signatures were read off the build before the rule was written:

| Signature | Kind |
|---|---|
| in `<header>` / `<footer>` / a breadcrumb `<nav>` | chrome |
| `inline-flex … rounded-input` | chrome — the CTA button, on essentially every page |
| `block h-full` | listing — a card wrapping a whole block (56 on `/blog/`, 7 on `/platform/`) |
| `font-display …` | listing — a card's title |
| no class, or `underline underline-offset-4` | contextual — an inline link inside a sentence |

**`src` is the number of distinct pages a contextual link came from**, which is the measure §3.1's
rule is written in. `ctx` is link instances.

### 2.2 Negative control — mandatory, and it passed

Target `/blog/irac-day-end-classification/`: **chrome 0 · listing 4 · contextual 18**, from 16
distinct sources, one of which was `/blog/nbfc-compliance-checklist/`.

Removed exactly one anchor — line 166 of `content/blog/nbfc-compliance-checklist.md`, the inline link
`[why an NPA figure run at 11am differs from the same figure at day-end](/blog/irac-day-end-classification/)`
— leaving the sentence intact as plain text. Rebuilt, re-ran:

| | before | after |
|---|---|---|
| contextual | 18 | **17** |
| distinct sources | 16 | **15** — and `nbfc-compliance-checklist` was gone from the list |
| listing | 4 | 4 |
| chrome | 0 | 0 |

Dropped by exactly one, with the other two kinds unmoved. Restored from a copy; re-measured at 18;
`git status content/` clean.

### 2.1 The table

122 current sitemap URLs. `/authors/` left the sitemap under §5 and so is not a row — measured
separately it has **chrome 0 · listing 1 · contextual 56 · 56 distinct sources · depth 3**, which
matters to the verdict below.

`idx` is whether Search Console reported it indexed on 13 Oct 2026 (§0.1).

| URL | chrome | listing | ctx | src | idx |
|---|---|---|---|---|---|
| `/` | 125 | 0 | 0 | 0 | ✓ |
| `/blog/best-loan-management-software-india/` | 0 | 6 | 0 | 0 | ✓ |
| `/blog/how-to-automate-loan-origination-nbfc/` | 0 | 13 | 0 | 0 | ✓ |
| `/blog/how-to-scale-nbfc-lending-operations/` | 0 | 1 | 0 | 0 | ✓ |
| `/blog/what-is-a-loan-origination-system/` | 0 | 6 | 0 | 0 | ✗ |
| `/cash-credit-software/` | 125 | 2 | 0 | 0 | ✗ |
| `/help/` | 147 | 0 | 0 | 0 | ✓ |
| `/help/collect-a-payment-in-the-field/` | 13 | 1 | 0 | 0 | ✓ |
| `/help/complete-kyc-on-a-customer/` | 12 | 1 | 0 | 0 | ✓ |
| `/help/disburse-a-loan/` | 12 | 1 | 0 | 0 | ✓ |
| `/help/file-the-rbi-returns/` | 11 | 1 | 0 | 0 | ✓ |
| `/help/keep-the-books/` | 12 | 1 | 0 | 0 | ✓ |
| `/help/open-a-loan-file/` | 12 | 1 | 0 | 0 | ✓ |
| `/help/see-asset-quality/` | 13 | 1 | 0 | 0 | ✓ |
| `/help/set-up-a-product/` | 12 | 1 | 0 | 0 | ✓ |
| `/help/take-a-lead-in-the-field/` | 12 | 1 | 0 | 0 | ✓ |
| `/help/watch-the-collection-book/` | 12 | 1 | 0 | 0 | ✓ |
| `/signup/` | 125 | 0 | 0 | 0 | ✓ |
| `/tools/` | 385 | 0 | 0 | 0 | ✓ |
| `/about/` | 250 | 0 | 1 | 1 | ✓ |
| `/blog/credit-information-reporting-2025/` | 0 | 2 | 1 | 1 | ✓ |
| `/blog/how-to-manage-multiple-loan-products-nbfc/` | 0 | 2 | 1 | 1 | ✓ |
| `/blog/nbfc-income-recognition-rbi-rules/` | 0 | 1 | 1 | 1 | ✓ |
| `/blog/rbi-key-facts-statement/` | 0 | 1 | 1 | 1 | ✓ |
| `/blog/which-rate-goes-on-which-document/` | 0 | 3 | 2 | 1 | ✓ |
| `/blog/write-off-what-it-does/` | 0 | 7 | 1 | 1 | ✓ |
| `/business-loan-software/` | 125 | 2 | 1 | 1 | ✓ |
| `/gold-loan-software/` | 250 | 1 | 1 | 1 | ✓ |
| `/help/your-first-day/` | 11 | 1 | 1 | 1 | ✓ |
| `/loan-against-property-software/` | 250 | 3 | 1 | 1 | ✓ |
| `/personal-loan-software/` | 250 | 1 | 1 | 1 | ✓ |
| `/privacy/` | 125 | 0 | 1 | 1 | ✓ |
| `/terms/` | 125 | 0 | 1 | 1 | ✓ |
| `/tools/gold-loan-ltv-calculator/` | 132 | 9 | 1 | 1 | ✓ |
| `/tools/kfs-checklist/` | 132 | 9 | 1 | 1 | ✓ |
| `/tools/penal-charge-calculator/` | 132 | 9 | 1 | 1 | ✓ |
| `/vehicle-loan-software/` | 250 | 2 | 1 | 1 | ✓ |
| `/blog/co-lending-what-each-side-owns/` | 0 | 4 | 2 | 2 | ✓ |
| `/blog/flat-rate-vs-reducing-balance/` | 0 | 13 | 3 | 2 | ✓ |
| `/blog/how-to-choose-loan-management-software-nbfc/` | 0 | 1 | 2 | 2 | ✓ |
| `/blog/how-to-track-loan-collections-nbfc/` | 0 | 1 | 2 | 2 | ✓ |
| `/blog/nbfc-books-retention/` | 0 | 1 | 2 | 2 | ✓ |
| `/blog/nbfc-digital-lending-guide/` | 0 | 4 | 2 | 2 | ✓ |
| `/blog/nbfc-provisioning-worked-examples/` | 0 | 5 | 2 | 2 | ✓ |
| `/blog/prepayment-charges-2025/` | 0 | 3 | 2 | 2 | ✓ |
| `/blog/rbi-returns-for-nbfcs/` | 0 | 3 | 3 | 2 | ✓ |
| `/blog/tamil-nadu-money-lending-licence/` | 0 | 1 | 4 | 2 | ✗ |
| `/blog/west-bengal-money-lending-licence/` | 0 | 1 | 4 | 2 | ✗ |
| `/glossary/foir/` | 0 | 1 | 2 | 2 | ✓ |
| `/loan-origination-software/` | 125 | 1 | 2 | 2 | ✓ |
| `/microfinance-software/` | 125 | 1 | 2 | 2 | ✓ |
| `/security/` | 250 | 0 | 2 | 2 | ✓ |
| `/tools/apr-calculator/` | 129 | 9 | 2 | 2 | ✓ |
| `/tools/emi-calculator/` | 128 | 9 | 2 | 2 | ✓ |
| `/tools/prepayment-charge-checker/` | 129 | 9 | 2 | 2 | ✓ |
| `/blog/day-end-not-real-time/` | 0 | 2 | 3 | 3 | ✓ |
| `/blog/gold-loan-directions-2025/` | 0 | 13 | 3 | 3 | ✓ |
| `/blog/how-to-manage-nbfc-loan-portfolio/` | 0 | 1 | 3 | 3 | ✓ |
| `/blog/kerala-money-lending-licence/` | 0 | 10 | 5 | 3 | ✗ |
| `/blog/nbfc-compliance-calendar/` | 0 | 11 | 3 | 3 | ✗ |
| `/blog/nbfc-registration-and-cor/` | 0 | 5 | 5 | 3 | ✗ |
| `/blog/npa-upgrade-entire-arrears/` | 0 | 12 | 3 | 3 | ✓ |
| `/blog/reconciliation-off-by-rupees/` | 0 | 2 | 3 | 3 | ✓ |
| `/blog/spreadsheets-vs-loan-management-software-nbfc/` | 0 | 1 | 3 | 3 | ✓ |
| `/blog/what-the-2024-gold-review-found/` | 0 | 3 | 3 | 3 | ✓ |
| `/glossary/static-pool/` | 0 | 0 | 3 | 3 | ✓ |
| `/blog/bucket-movement-and-flow-rates/` | 0 | 5 | 6 | 4 | ✗ |
| `/blog/dcb-reconciliation-why-it-stops-tying/` | 0 | 7 | 5 | 4 | ✓ |
| `/blog/gold-loan-management-software-nbfc/` | 0 | 13 | 4 | 4 | ✓ |
| `/blog/how-to-calculate-penal-charges-rbi-2024/` | 0 | 4 | 4 | 4 | ✓ |
| `/blog/outsourcing-what-cannot-be-outsourced/` | 0 | 1 | 4 | 4 | ✗ |
| `/blog/scale-based-regulation-layers/` | 0 | 2 | 4 | 4 | ✓ |
| `/blog/static-pool-analysis-how-to-build/` | 0 | 6 | 5 | 4 | ✓ |
| `/glossary/cic/` | 0 | 0 | 4 | 4 | ✓ |
| `/glossary/ckyc/` | 0 | 0 | 4 | 4 | ✓ |
| `/glossary/vintage-analysis/` | 0 | 0 | 4 | 4 | ✓ |
| `/tools/nbfc-returns-calendar/` | 135 | 9 | 4 | 4 | ✓ |
| `/blog/audit-trail-what-counts/` | 0 | 2 | 5 | 5 | ✓ |
| `/blog/books-of-account-what-must-be-kept/` | 0 | 1 | 5 | 5 | ✓ |
| `/blog/collection-efficiency-how-to-compute/` | 0 | 11 | 6 | 5 | ✓ |
| `/blog/nbfc-category-and-layer/` | 0 | 12 | 5 | 5 | ✓ |
| `/blog/nbfc-compliance-checklist/` | 0 | 10 | 5 | 5 | ✗ |
| `/loan-management-system/` | 125 | 1 | 5 | 5 | ✗ |
| `/platform/` | 476 | 2 | 5 | 5 | ✓ |
| `/tools/nbfc-provisioning-calculator/` | 132 | 9 | 5 | 5 | ✓ |
| `/tools/npa-date-calculator/` | 149 | 10 | 5 | 5 | ✓ |
| `/blog/due-diligence-what-lenders-ask/` | 0 | 1 | 7 | 6 | ✓ |
| `/blog/nbfc-software-complete-guide/` | 0 | 1 | 6 | 6 | ✓ |
| `/glossary/interest-accrual/` | 0 | 0 | 6 | 6 | ✓ |
| `/glossary/irac/` | 0 | 0 | 6 | 6 | ✓ |
| `/glossary/moratorium/` | 0 | 0 | 6 | 6 | ✓ |
| `/glossary/sma/` | 0 | 0 | 6 | 6 | ✓ |
| `/blog/loan-management-software-for-nbfc/` | 0 | 6 | 7 | 7 | ✓ |
| `/blog/npa-income-reversal/` | 0 | 2 | 9 | 7 | ✓ |
| `/tools/nbfc-layer-finder/` | 131 | 9 | 7 | 7 | ✓ |
| `/blog/penal-charges-not-interest/` | 0 | 3 | 9 | 8 | ✓ |
| `/glossary/collection-efficiency/` | 0 | 0 | 8 | 8 | ✓ |
| `/glossary/ltv/` | 0 | 1 | 8 | 8 | ✓ |
| `/blog/how-to-generate-rbi-returns-nbfc/` | 0 | 1 | 9 | 9 | ✓ |
| `/blog/sma-classification-what-it-signals/` | 0 | 3 | 9 | 9 | ✓ |
| `/blog/kfs-key-facts-statement-nbfc-requirement/` | 0 | 3 | 11 | 10 | ✓ |
| `/blog/kfs-what-goes-in-the-apr/` | 0 | 7 | 12 | 10 | ✓ |
| `/glossary/emi/` | 0 | 0 | 10 | 10 | ✓ |
| `/reports/` | 250 | 1 | 10 | 10 | ✓ |
| `/glossary/prepayment/` | 0 | 0 | 11 | 11 | ✓ |
| `/blog/` | 307 | 0 | 12 | 12 | ✓ |
| `/glossary/` | 147 | 0 | 12 | 12 | ✓ |
| `/blog/frozen-terms-at-sanction/` | 0 | 4 | 14 | 13 | ✓ |
| `/blog/how-to-automate-npa-classification-nbfc/` | 0 | 13 | 14 | 14 | ✓ |
| `/blog/irac-day-end-classification/` | 0 | 4 | 18 | 16 | ✓ |
| `/glossary/foreclosure/` | 0 | 0 | 17 | 17 | ✗ |
| `/glossary/apr/` | 0 | 0 | 18 | 18 | ✓ |
| `/blog/rbi-compliance-for-nbfcs-guide/` | 0 | 2 | 19 | 19 | ✓ |
| `/glossary/provisioning/` | 0 | 0 | 20 | 20 | ✓ |
| `/glossary/penal-charges/` | 0 | 0 | 21 | 21 | ✓ |
| `/glossary/kfs/` | 0 | 0 | 25 | 25 | ✓ |
| `/glossary/overdue/` | 0 | 0 | 31 | 31 | ✓ |
| `/glossary/dpd/` | 0 | 1 | 32 | 32 | ✓ |
| `/glossary/npa/` | 0 | 0 | 38 | 38 | ✓ |
| `/contact/` | 478 | 0 | 39 | 39 | ✓ |
| `/glossary/dcb/` | 0 | 0 | 40 | 40 | ✓ |
| `/compliance/` | 251 | 3 | 120 | 111 | ✓ |

---

## 3. Verdict on the hypothesis — **falsified**

> *Hypothesis: the 13 pages Google declined are the pages with zero or near-zero contextual inbound
> links, and the correlation is strong enough to be the explanation.*

It is not. The contextual counts of the declined pages are indistinguishable from the rest of the
site, and the clearest counter-examples run in both directions at once.

| | declined (13) | indexed (110) |
|---|---|---|
| contextual inbound **sources**, median | **3** | **3** |
| range | 0 – 56 | 0 – 111 |

- **19 pages have zero contextual inbound links. Seventeen of them are indexed.** Only two are
  declined (`/cash-credit-software/`, `/blog/what-is-a-loan-origination-system/`). Among the indexed
  zeros: `/`, `/help/`, `/signup/`, `/tools/` and ten of the eleven help guides.
- **`/authors/` has 56 contextual inbound sources** — one from every post's byline — and was
  declined.
- **`/glossary/foreclosure/` has 17**, fourth-highest on the site, and was declined.
- `/blog/nbfc-compliance-checklist/` has 5, the same as `/platform/`, which is indexed.

A property that is present in 17 indexed pages and absent in 11 of the 13 declined ones explains
nothing. The identical medians settle it.

### The independent suppressors §2.3 named — all ruled out, live

Fetched all thirteen live URLs on 13 Oct 2026, not the local build:

| Check | Result across all 13 |
|---|---|
| HTTP status | **200** every one |
| `<meta name="robots">` | **`index, follow`** every one — no `noindex` |
| `X-Robots-Tag` header | **absent** every one |
| canonical | **self-referencing** every one — none points elsewhere |
| redirect | none |

| Check | Result |
|---|---|
| orphan / unreachable by crawl | **None.** BFS from `/` over the built graph reaches every page; depth is 1–3 site-wide, max depth 3, **zero unreachable**. The thirteen sit at depth 1 (×2), 2 (×10) and 3 (×1) |
| near-duplicate body content | **None.** Pairwise 8-gram Jaccard overlap across the ten commercial pages is **below 0.15 for every pair** — the highest did not clear the threshold |

### What actually distinguishes the thirteen

**They are two groups with two different causes, and the brief's single list merged them.**

**Group A — three pages never fetched ("Discovered – currently not indexed", Last crawled N/A).**
`/blog/what-is-a-loan-origination-system/` (0 contextual sources), `/blog/outsourcing-what-cannot-be-outsourced/`
(4) and `/glossary/foreclosure/` (17). Nothing link-related unites them; one of the three is in the
site's top five for contextual inbound links. Google knows the URLs from the sitemap and has not
spent the budget to fetch them.

**Group B — ten pages crawled 10 Oct and not indexed.** Seven of the ten are blog posts dated
**9 October 2026** — crawled the day after publication, and the report was read on **13 October**,
three days later. The other three are `/loan-management-system/`, `/cash-credit-software/` and
`/authors/`.

Publication date does not fully discriminate either, and the measurement says so: **fifteen posts
carry the date 2026-10-09; seven were declined and eight were indexed.** Roughly half of one day's
batch still sitting in the queue three days on is not a defect class — it is a queue.

**The one fact that fits both groups is already in §0.3: external links, total 1.** One referring
domain, one anchor, pointing at the homepage. Average position 21.7, and 42 of 59 clicks from the
brand query `lenviq`. A domain with a single backlink gets very little crawl budget and very little
indexing priority; new URLs are crawled, queued and deferred, and "Crawled – currently not indexed"
three days after publication is the expected state rather than a diagnosis.

That points at off-site authority, which this sprint does not scope and I have not acted on.

**One weak signal, labelled as weak.** Of the ten commercial pages, the two declined ones are the
second and third shortest by main-content word count — `/loan-management-system/` 939 and
`/cash-credit-software/` 1,133, against 1,162–1,853 for the rest. But the **shortest of the ten**,
`/loan-origination-software/` at 849 words, is indexed. So thinness does not discriminate either, and
I am recording the observation rather than treating it as a cause.

---

## 4. Section 3 — done as hygiene, on instruction, after the hypothesis was falsified

**This section was first reported as "0 files changed", and that was right at the time.** §2.3 says
not to fix a cause just disproved, so I stopped and said so. The author then asked for it anyway, as
ordinary link hygiene rather than as an indexing fix. It is done on that basis, and nothing below
should be read as a claim that it will change what Google indexes — §3 above still stands.

**23 files changed, against a cap of 40.**

### What the measurement said before

| | |
|---|---|
| sitemap URLs with fewer than three contextual inbound sources | **55 of 122** |
| contextual outbound links from each of the seven product pages | `/compliance/` and `/reports/`, **and nothing else** |
| contextual outbound links from `/platform/` | **none at all** |
| contextual outbound links from each pillar | the other pillar, and nothing else |

The cause was structural rather than editorial: a product page is **data** (`ProductSpec` is the
prose, `components/product-page.tsx` is a skeleton — `lib/products/types.ts` argues why at length),
and every prose field rendered as `{p}`, which is plain text. **There was no way to put a link inside
a product page's own sentence**, so the only links on one came from the template. That is why all
seven were identical.

### How the links were made possible

`src/lib/prose-links.tsx` — `[label](/path/)` inside a spec string becomes a `<Link>`. Deliberately
tiny: internal paths only, React nodes rather than `dangerouslySetInnerHTML`, no emphasis or code
spans. §3.3 forbids a paragraph whose only purpose is holding links, which rules out adding a
`relatedLine` field — **a field like that is the forbidden paragraph in data form**. So the sentences
stayed where they were and a phrase inside one of them became the link.

### Files changed, and what each carries

| File | What |
|---|---|
| `src/lib/prose-links.tsx` | **new** — the inline-link resolver |
| `src/components/ui.tsx` | `SectionHead`'s `lead` takes a node, so a lead can carry a link |
| `src/components/product-page.tsx` | intro, section leads and point bodies render through the resolver |
| `src/lib/products/gold.ts` | "This is the **[loan management software]**…"; lifecycle lead now reaches the **[origination path]** — and "of the four" became "of the seven", which was stale |
| `src/lib/products/lap.ts` | intro "**[origination]** and **[loan management]** software"; "Where **[a gold loan]** is decided at a counter in an hour" |
| `src/lib/products/microfinance.ts` | intro "**[loan origination]** and **[loan management]** software" |
| `src/lib/products/personal.ts` | the same intro pattern; "**[A gold loan]** is underwritten on a weight anyone can re-measure" |
| `src/lib/products/vehicle.ts` | the same intro pattern; "no analogue in a **[gold]** or **[property]** book" |
| `src/lib/products/business.ts` | lifecycle lead reaches both pillars; "a term loan and the **[working-capital limit]** beside it" |
| `src/lib/products/cashcredit.ts` | lifecycle lead reaches the **[origination workflow]** and **[a term loan]**; intro reaches **[loan management]** |
| `src/app/loan-origination-software/page.tsx` | the Collateral point already named both: "**[Gold]** by purity and net weight… **[property]** by a technical valuation" |
| `src/app/loan-management-system/page.tsx` | "**[a gold loan]** repaid in one bullet and **[a twenty-year mortgage]**…"; "**[a cash credit]** accrues on what was drawn" |
| `src/app/platform/page.tsx` | the intro already named both halves — "an **[origination system]**, a **[servicing system]** and an accounting package"; the books lead reaches **[gold]** and a **[twenty-year mortgage]**, and "Four books" became "Seven books" (PRODUCTS has held seven since the business and cash-credit pages shipped) |
| `content/blog/how-to-manage-multiple-loan-products-nbfc.md` | "adds **[gold lending]** to an existing **[LAP]** and **[unsecured]** book"; "**[a vehicle loan]** and **[an unsecured business loan]**" |
| `content/blog/loan-management-software-for-nbfc.md` | "A **[loan origination system (LOS)]**…"; "gold, property and **[vehicles]**" |
| `content/blog/nbfc-software-complete-guide.md` | "**[A loan origination system]** is not a loan management system" |
| `content/blog/how-to-automate-loan-origination-nbfc.md` | "the gathering, checking and routing in **[loan origination]**" |
| `content/blog/sma-classification-what-it-signals.md` | "For **[cash credit and overdraft facilities]** the trigger is different" |
| `content/blog/nbfc-category-and-layer.md` | the NBFC-MFI row: "**[Microfinance]**. Collateral-free lending to low-income households" |
| `content/blog/prepayment-charges-2025.md` | "an individual with a ₹5,00,000 **[personal loan]** for a wedding" |
| `tests/site.test.ts` | three new guards, below |
| `scripts/link-graph.mjs` | the CLI now runs only as an entry point, so the graph can be imported and asserted |
| `scripts/link-graph.d.mts` | **new** — types for that import, so the guard is not written against `any` |

**Every link sits inside a sentence that already said the thing.** No paragraph was added to hold
links, no "You may also like" strip exists, and no sentence asserts a capability — the two places a
claim could have crept in are `business.ts`'s "and then the same loan management once it is
disbursed" and `cashcredit.ts`'s "reaches the book through the same origination workflow as a term
loan", and both restate what `/platform/` and `business.ts` already published, which follows from
products binding by behaviour code rather than having their own code paths.

### The result

| | before | after |
|---|---|---|
| sitemap URLs with fewer than three contextual sources | 55 | **46** |
| the two pillars | 2 and 5 sources | **10 and 13** |
| the seven product pages | 0–2 sources | **3–8, every one at or above three** |
| `/platform/` | 5 | 5, and now with **4 contextual outbound** where it had none |
| the 13 Search Console declined | 4 below three | **2 below three** |

Every product page now links contextually to **both** pillars, which was §3.2's firm requirement and
was met nowhere before this.

### Three new guards, and the negative control on them

`tests/site.test.ts`, asserted against the built output and skipped when `out/` is absent, the way
the conversion-surface guards already are:

1. every pillar, product page and `/platform/` has **three distinct contextual inbound sources** —
   distinct pages, not three anchors, because §3.1's rule is about related pages;
2. **each product page reaches both pillars**;
3. the links are in prose — no "You may also like" strip, and no bare anchors in a card grid.

**Negative control:** removed the `[loan management software](/loan-management-system/)` link from
`gold.ts`, rebuilt, and guard 2 failed with exactly one missing pair. Restored, 176/176. Worth noting
what the counter did *not* do: `out/gold-loan-software/index.html` still carried one
`href="/loan-management-system/"` from the related-links **card**, and the guard still failed —
because a card is a listing and the rule is about sentences.

**The control also caught a defect in the guard itself before that.** The first run reported 176
passing with the link removed, which was wrong: the test imported a `.mjs` module with no
declarations, `npm run build` failed on three TS errors, and the suite was therefore reading a
**stale `out/`**. `scripts/link-graph.d.mts` fixes it. A guard that reads build output can pass on
yesterday's build, and that is the failure mode to watch for in the two other tests that read `out/`.

### §3.2's remaining gaps, reported rather than manufactured

§3.3: *"If a page genuinely has nothing to say about any other page, report that rather than
manufacturing a link."* Three places where that applied:

| Gap | Why it was not filled |
|---|---|
| **Sibling links: 2 of 7 product pages have two, 4 have one, 1 has none.** vehicle has gold and property; lap, personal, business and cashcredit have one each; **gold and microfinance have none** | §3.2 asks for two "where the prose genuinely supports it". Measured: the only cross-product references in the specs are the ones linked. gold's and microfinance's prose names no other asset class, and business's one reference to property sits in a **FAQ answer**, which feeds the page's `FAQPage` JSON-LD — markup there would put `[label](/path/)` into structured data |
| **`/platform/` reaches 2 of 7 product pages contextually**, the other five by card only | Its prose names gold and property. The sentence that names all seven is a FAQ answer, same JSON-LD problem |
| **`/blog/tamil-nadu-money-lending-licence/` and `/blog/west-bengal-money-lending-licence/` stay at two sources** | The only pages whose subject genuinely concerns state money-lending are the three state pages themselves, and they already link to each other. The natural third source would be `nbfc-registration-and-cor` — and **I will not add a regulatory sentence to one of the seven pages pending Manoj's claim review** (§1(d)). That is inserting an unreviewed claim into a page queued for review |

### What remains under three, and it is mostly not the commercial tree

46 URLs, and §3.2's fourth bullet — *every* blog post and glossary entry linking to the one page its
subject most nearly concerns — is 80-odd files on its own, past the cap. §3.4 says to do the thirteen
and the pillars first and then stop, so this is the list rather than the work:

| Group | Count | Note |
|---|---|---|
| blog posts | 20 | the bulk of §3.2's fourth bullet; three at zero (`best-loan-management-software-india`, `how-to-automate-loan-origination-nbfc`, `how-to-scale-nbfc-lending-operations`) |
| help guides | 12 | eleven at zero. These are a numbered sequence read in order, linked from `/help/` and from each other by previous/next — which the counter classifies as chrome, correctly. Nothing on the marketing side has a sentence about "how to disburse a loan", and inventing one would be manufacturing |
| tools | 7 | each already carries listing links from `/tools/` and from the posts' in-article cards |
| utility and legal pages | 5 | `/signup/`, `/about/`, `/privacy/`, `/terms/`, `/security/`. Three contextual inbound links to a privacy policy would be three sentences written to hold links. Left alone deliberately |
| `/` | 1 | the home page is reached by every header on the site; a contextual link to it from body prose would be odd |
| `/glossary/foir/` | 1 | at two sources, one short |

## 5. Section 4 verdict — clean today, changed nothing

Live, 13 Oct 2026:

| URL | chain |
|---|---|
| `https://lenviq.in/platform` | `301` → `/platform/` → `200` |
| `https://lenviq.in/security` | `301` → `/security/` → `200` |
| `https://lenviq.in/compliance` | `301` → `/compliance/` → `200` |
| `https://lenviq.in/reports` | `301` → `/reports/` → `200` |

**Exactly one 301 to the trailing-slash URL on all four, then 200.** No chain, no loop, no empty
redirect, no extra hop. This is the behaviour §4 names as correct, so per §4 I changed nothing —
Search Console last crawled these on 29 Aug 2026 and is showing stale data.

One thing measured that §4 mentions and the report did not: over **`http://`** it is two hops —
`http://lenviq.in/platform` → `https://lenviq.in/platform` → `https://lenviq.in/platform/`. Search
Console reported the `https://` URLs, which are one hop, so this is not the reported defect; it
affects only a visitor who types `http` without a trailing slash. Collapsing it would mean the plain
`http` vhost redirecting straight to the slashed `https` URL. **I did not change it**: it is nginx
configuration on the aaPanel host, I cannot reach that host from here, and I will not edit a server
config whose effect I cannot verify.

---

## 6. Section 5 decision — `/authors/` is held out of the index

**Decision: `noindex, nofollow`, dropped from the sitemap, kept served and kept linked.**

**Reason, in one line:** it exists so that the `Person` in every post's `Article` schema resolves to
something, which is a job that does not need a search result — and its own intent entry said exactly
that before anybody acted on it: *"its job is not search traffic."*

It flows from the one field, as §5 required: a single `state: "excluded"` in `ROUTE_PAGES` produced
both consequences, verified in the build — `<meta name="robots" content="noindex, nofollow"/>` on
`out/authors/index.html`, and the sitemap down from 123 to 122 locs with no `authors` occurrence. No
special case in `sitemap.ts`.

Two consequences I followed rather than left dangling:

- **Its `seo-intent.ts` entry is removed.** An intent entry is a commitment to rank for a query, and
  `tests/site.test.ts` asserts every entry is in the sitemap for that reason — the test caught this,
  I did not spot it by reading. A page held out of the index must not claim a query.
- **The 56 byline links to it stay.** A reader who follows a byline should land on something.

---

## 7. What I could not verify

Each classified one of the three ways, with no fourth category.

### Absent from the codebase

| Item |
|---|
| Any record, in the repository, of the seven pages' claims having been checked one by one. `0e253ff` asserts the publishing decision was Manoj's and names five unverified items; it does not evidence a claim-level review. `REVIEW_PENDING_MANOJ.md` is the list that was missing |
| A publication state for a product, tool or glossary page. `ROUTE_PAGES` governs the sixteen hand-written pages; the data-driven ones take their state from their own source, and none of those sources has such a field. No page needs one today |

### Absent from this environment

| Item |
|---|
| Whether `deploy/nginx-cache.conf` is applied on the live host. The `http`→`https`→slash two-hop above is a server-config question and the host is not reachable from here |
| Google's own reason for declining each page. "Crawled – currently not indexed" is all Search Console exposes; the queue position behind it is not observable from outside |
| `app.lenviq.in`'s `robots.txt`. It is served by the product application on a different host. `src/app/robots.ts` is **untouched** in this change set, so nothing here can have affected it |

### Outside my own access

| Item |
|---|
| Search Console itself — the index-coverage report, the crawl-request queue, and the figures in §0, which I could only re-derive where the repository held the same fact |
| Whether the regulatory claims in the seven pages are correct. I listed each claim beside its citation; checking a claim against the Act or the direction is the review, and it is Manoj's |
| The gazette texts behind the nine flagged items in the review packet — TN and Kerala rate notifications, the Bengal gazette, the interim NOF notification, the 2016 KYC repeal clause |

---

## 8. Where my measurement contradicted Section 0

Not "no contradictions". Three, one of them load-bearing.

**1. §1.1/§1.2's premise is wrong, and this is the significant one.** The brief states the pages
"were required to ship as drafts" and "are live", implying a gate that failed. The gate held: all
seven were committed with `draft: true`, and commit `0e253ff` flipped them deliberately with
*"Manoj's call, and his to make"* in its message. Set out in full in §1(b) above. §1(b)'s ruling —
do not unpublish — is unaffected and is now better supported than when it was written.

**2. The flat 99 inbound internal links.** §0.3 reports exactly 99 for each of the top ten pages. My
count over the built output gives **125** for the same class of page (`/`, `/signup/`,
`/cash-credit-software/`), 250 for pages linked from both header and footer, and up to 478 for
`/contact/`. Not a transcription error on either side: Search Console counted across the 110 pages it
had indexed at an earlier crawl, and this counts link instances across all 128 built pages. The
*interpretation* in §0.3 is confirmed exactly — the flatness is site furniture, and it says nothing
about editorial linking.

**3. The "13 pages" and the five buckets.** §0.1's buckets sum to 19, and the narrative asks about 13.
The 13 are the 10 "Crawled – currently not indexed" plus the 3 "Discovered". Consistent, and worth
stating because the two groups turn out to have different causes (§3 above) and only the sum of them
is 13. The remaining six are the four §4 redirect URLs, `app.lenviq.in` (intended), and one "Page
with redirect" — which is `/blog/interest-in-paise-not-float/`, the renamed-slug shim added in the
previous sprint. It is `noindex`, absent from the sitemap, and "Page with redirect" is the correct
report for it.

**Confirmed against the repository, not contradicted:** §0.2's **123 sitemap URLs** matched the build
exactly before this sprint's one removal.

---

## Files changed

**23 files, against §3.4's cap of 40.** §1's work and §3's are listed in their own sections above —
§1(c) in *What I built*, §3 in its file-by-file table. Summarised:

| Group | Files |
|---|---|
| the publication gate (§1(c)) | `src/lib/publication.ts` (new), `src/lib/seo.ts`, `src/app/sitemap.ts`, `src/lib/content.ts`, `src/lib/help.ts`, `src/app/blog/[slug]/page.tsx`, `src/app/help/[slug]/page.tsx`, `src/components/tools/tool-page.tsx`, `src/lib/seo-intent.ts` |
| the link graph (§2, §3) | `src/lib/prose-links.tsx` (new), `scripts/link-graph.mjs` (new), `scripts/link-graph.d.mts` (new), `src/components/ui.tsx`, `src/components/product-page.tsx`, 7 × `src/lib/products/*.ts`, `src/app/platform/page.tsx`, both pillar pages, 7 × `content/blog/*.md` |
| guards | `tests/site.test.ts` — two rewritten for the new gate, three new on it, three new on the link graph |
| deliverables | `REVIEW_PENDING_MANOJ.md` (new), `docs/SPRINT_SEO3_REPORT.md` (new) |

`src/app/robots.ts` is unchanged, so nothing here can have affected `app.lenviq.in`. The seven pages
pending review stay published per §1(b), and no regulatory prose was added to any of them. Both
negative controls — the draft flip and the removed contextual link — were restored to byte-identical
files, and a third was run on the new link-graph guard.

Nothing in this report asserts behaviour I did not run. Every count came from a build or a live
fetch on 13 October 2026, and all three negative controls are recorded with what they looked like
when they failed — including the one that exposed a defect in my own guard.
