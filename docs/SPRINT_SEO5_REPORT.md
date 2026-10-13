# Sprint SEO-5 — the `/solutions/` layer, the enumeration, and the AI surface

Repo: `lenviq-marketing` (`Lenviq-Marketing-Site`). `fintrustsuite` was **read only** — `git status`
there is clean. Worked 13 October 2026. Baseline `d539daf`, the commit SEO-4 ended on.

**Read §3 first if you read nothing else.** The §7.1 verdict needed action today and the answer was
the bad one: the inbound links were never written, and the 17 October flip would have gone red.

---

## 1. The enumeration (§2.1)

Derived from the product, then ordered by the demand evidence in §2.2 — not from what anybody else
ranks for. Every verdict was reached by the method in §2.1, **after** the negative control in §2 below
corrected how that method reads code.

### How a verdict was reached

Three authoritative tests, because a substring search is worthless here — the control proves it:

1. a **Prisma model** or a named code path, whole-word;
2. an entry in `src/lib/reports/catalogue.ts`, **with its `status`**;
3. an **RBAC permission** that a role actually holds.

The catalogue status is the one that matters most, and it is the state SEO-4 discovered:
`catalogue.ts:51-52` defines it in the product's own words — *"LIVE is navigable. PLANNED and GATED
are specified but not offered."* A capability can be fully written and still be something no
customer can switch on.

### The candidates

| # | Event or artefact | `fintrustsuite` | Verdict | Page? |
|---|---|---|---|---|
| 1 | Days-past-due computation | `src/lib/lms/npa.ts:4-10`, `src/lib/lms/jobs.ts:71`; feeds R-05, R-17 (LIVE) | **implemented** | `/solutions/dpd-calculation-software-nbfc/` |
| 2 | DPD movement matrix report | `catalogue.ts` N-19, `status: "GATED"` | **built but not offered** | named as a limit on the DPD page |
| 3 | SMA classification | `src/lib/lms/npa.ts:4-10`; R-17 SMA Watch List, **LIVE** | **implemented** | `/solutions/sma-classification-software-nbfc/` |
| 4 | NPA income reversal and upgrade | `src/lib/repos/npa.ts:70`, `:95-105`; `financial-statements.ts:163` | **implemented** | `/blog/npa-income-reversal-software-nbfc/` (SEO-4, stays) |
| 5 | Provisioning | `src/lib/repos/npa.ts:203` (`runProvisions`, basis `NET_OF_COLLATERAL`); R-11 Provision Movement, **LIVE** | **implemented** | `/solutions/provisioning-software-nbfc/` |
| 6 | Credit information (CIC) reporting | `src/lib/repos/bureau.ts` (496 lines), `bureau-history.ts`; `model BureauSubmissionBatch`; 3 `BUREAU_*` permissions; R-18 CRILC **LIVE** | **implemented** (generation and tracking) | `/solutions/cic-reporting-software-nbfc/` |
| 7 | Bureau / CKYC **transmission** | no path exists; `markCkycStatus` (`bureau.ts:445`) is called by a human | **absent** | named as a limit on both pages |
| 8 | CKYC registry file | `bureau.ts:427-449`, `model CkycUploadRecord`; Aadhaar masked at `:432` | **implemented** (file + record) | `/solutions/ckyc-software-nbfc/` |
| 9 | CKYC **retrieval** against a KYC Identifier | none. `ckycNumber` typed by hand (`kyc-panel.tsx:54,177`) | **absent** | named as a limit |
| 10 | Key Facts Statement and its APR | `src/lib/finance.ts:93-130` (`kfsNumbers` → `computeApr`); `sanction.ts:86`; `letters.ts:82` | **implemented** | `/solutions/kfs-software-nbfc/` |
| 11 | Penal charges | `src/lib/repos/penal.ts:20-35`, `:82`, `:291`; `repayments.ts:387`; `appropriation.ts:28-58` | **implemented** | `/solutions/penal-charges-software-nbfc/` |
| 12 | NACH mandates and presentation limits | `src/lib/repos/nach.ts:25-60`, `model NachMandate`; R-07, R-08, R-09 **LIVE** | **implemented** | `/solutions/nach-mandate-software-nbfc/` |
| 13 | Bounce handling | `src/lib/repos/bounce.ts:88`; R-08 **LIVE** | **implemented** | covered on the NACH page |
| 14 | Gold auction | `src/lib/repos/auction.ts` — `AUCTION_NOTICE_DAYS = 30`, `SURPLUS_DEADLINE_DAYS = 7`, `generateAuctionNotice`, `recordAuctionResult`, `paySurplus`, `assertDualCustodian`; `model AuctionEvent`, `AuctionNotice`, `EmpanelledAuctioneer`; R-14, R-15 **LIVE** | **implemented** | `/solutions/gold-auction-software-nbfc/` |
| 15 | Foreclosure / payoff quote | `src/lib/repos/foreclosure.ts` (1,028 lines), `floorToRupee`; `prepayment-rules.ts:170,275,316`; 8 `FORECLOSURE_*` permissions; N-09 **LIVE** | **implemented** | `/solutions/foreclosure-quote-software-nbfc/` |
| 16 | RBI supervisory returns | `src/lib/repos/rbi-returns.ts` (579 lines) — `dnbs`, `crilc`, `pslAchievement`, `ensureReturnsCalendar` (`DAYS_TO_FILE = 21`, layer-aware), `lockFinancials`, `markReturnFiled`; 13 files mention DNBS | **implemented** | `/solutions/rbi-returns-software-nbfc/` |
| 17 | DNBS01 and DNBS03 | named in `rbi-returns.ts:486` as what a Middle/Upper Layer NBFC files, **"which this product does not yet produce"** | **absent** | named as a limit on the returns page |
| 18 | Static pool / vintage analysis | `catalogue.ts:444-454` N-18, `status: "GATED"`, "Waiting on the nightly position snapshot" | **built but not offered** | `/blog/static-pool-analysis-software-nbfc/` (SEO-4, stays) |
| 19 | Collection efficiency | `catalogue.ts` N-04, `status: "GATED"` | **built but not offered** | `/solutions/collection-efficiency-software-nbfc/`, written the §2.5 way |
| 20 | Portfolio yield | `catalogue.ts` R-03, `status: "GATED"` | **built but not offered** | no page — nothing in §2.2 shows demand |
| 21 | Board pack | `catalogue.ts` N-16, `status: "PLANNED"` | **absent** | no page; named in `llms-full.txt` |
| 22 | Statutory reserve (s.45-IC) | `catalogue.ts` N-22, `status: "PLANNED"` | **absent** | no page; named in `llms-full.txt` |
| 23 | **DCB statement** | **`dcb`, `DCB` and `demandCollection` match nothing in `src/lib`.** N-01 is "GL to Loan Book Reconciliation", a different reconciliation | **absent** | **dropped.** `/glossary/dcb/` has 14 impressions and there is a blog post, and the product does not produce it |
| 24 | Multi-branch scoping and approvals | `model Branch`; `region` a label on it (`schema.prisma:1821`); approval matrix keyed on (product, scheme, branch/region, amount slab, deviation) at `:2211-2217`; `work-assignments.ts` 697 lines | **implemented** | `/enterprise/many-branches-one-book/` |
| 25 | Several products, one engine | `enum SecurityBehaviourCode` / `FacilityBehaviourCode` (`schema.prisma:298-316`); scheme versioning `@@unique([tenantId, schemeCode, version])`; `scheme_snapshot` | **implemented** | `/enterprise/many-products-one-engine/` |
| 26 | FD lien / machinery / share pledge collateral | `SecurityBehaviourCode` — each marked **"reserved (future)"** | **absent** | named as a limit on that page and in `llms-full.txt` |
| 27 | One chart of accounts, per-loan control ledger | `coa.ts`, `accounting-bridge.ts`; N-01 **LIVE**, catalogue note: "Each live loan carries its own control ledger" | **implemented** | `/enterprise/one-chart-of-accounts/` |
| 28 | Migration of a live book | `loan-import.ts` (753 lines) — preview replays in memory, batch, `undoLoanImport`; `customer-import.ts` (961); each replayed receipt carries its split (`:486-499`) | **implemented** | `/enterprise/migrating-a-live-book/` |
| 29 | Migration posting the ledger | `loan-import.ts:13` — "posts a voucher — **not** for the disbursement, not for the replayed receipts" | **absent** | named as a limit on that page |
| 30 | **State-specific money-lending rate caps** | `model RegulatoryCap` (`schema.prisma:4060-4074`) is keyed on `capType` + amount slab + effective date. **No state dimension.** | **absent** | **dropped.** §4 named "the multi-state book" as a candidate; it would have been a false claim |
| 31 | **Any AI feature** | `\bAI\b` 0 files; `openai`/`anthropic`/`inference`/`gpt-`/`claude` 0; all 32 `llm` hits are `bullmq`; all 5 `embedding` hits are **fonts**; 0 models, 0 catalogue entries, 0 dependencies | **absent** | **no `/ai` page built** (§5(d)) |
| 32 | Role model (for §3) | `src/lib/platform/provision.ts:107-123` — 8 roles with data scopes | **implemented** | four persona pages |

**Two candidates were dropped because the method returned absent** (rows 23 and 30), and one of them —
the multi-state book — was named as a candidate by the sprint itself. Both would have been pages
promising something a reader cannot have.

---

## 2. The three negative controls

### (a) The invented capability (§2.1) — **card issuance and ATM switch authorisation**

Chosen as a feature of a core-banking or card-management system, which a lending platform has no
business having. Run through steps 2 and 3 exactly as written.

**The first pass nearly fooled the method**, which is the useful part:

```
card issuance  0 files      atmSwitch  0      iso8583  0      debitCard  0
atm           71 files   <-- !
```

Seventy-one files. Inspected:

```
52 treatment   27 flatMap   25 moratoriumInterestTreatment   23 brokenPeriodTreatment
18 processingFeeTreatment   17 gstTreatment   16 taxTreatment   11 outstandingAtMonthEndPaise
```

Every hit a substring. The authoritative tests then settled it:

```
prisma models for card/ATM:    0
report catalogue entries:      0
RBAC permissions:              0
whole-word "ATM" in src:       0
```

**Verdict returned: absent.** Correct. And the control changed the method for every real candidate
after it — whole-word matching plus model, catalogue and permission, never a substring grep. Had I
trusted the 71, I would have "found evidence" for a capability that does not exist.

### (b) The conditional link (§7.1)

Target `/solutions/sma-classification-software-nbfc/` (`draft: true`), with inbound links written into
three live posts.

| State | What I did | What the built HTML showed |
|---|---|---|
| **1, first run** | Built with the target as a draft | **FAILED.** `href="/solutions/sma-classification-software-nbfc/"` present on all three live posts — a live anchor into a `noindex` page |
| — | Fixed `held-back.ts` (see §3) | — |
| **1, retest** | Rebuilt | anchor **0** on all three; the sentences' words **present** (2, 1, 2 matches) — they read correctly without the link |
| **2** | Flipped the target to `draft: false`, rebuilt | anchor **1** on all three; sitemap **124 → 125**; the page emits `index, follow`; it appears on the `/solutions/` hub |
| **restore** | Flipped back, rebuilt | sitemap 124, anchor 0 |

One field moved the anchor, the sitemap entry, the robots tag and the hub listing together.

**The first run is the finding.** The control caught a real bug in my own mechanism, and the only way
to see it was to build the site and grep the output — it typechecked and looked right in the source.

### (c) The charset fetch (§5(a))

**Before**, live, 13 October:

```
$ curl -sD - https://lenviq.in/llms.txt
content-type: text/plain                      <- no charset
x-content-type-options: nosniff

bytes around "IRAC":
  b'he regulatory positions an Indian lender is examined on \xe2\x80\x94 IRAC day-e'
  decoded as utf-8  : ... examined on — IRAC day-e
  decoded as latin-1: ... examined on â IRAC day-e
  em dashes in the file (e2 80 94): 46
```

The bytes are **correct UTF-8**. The header is what is missing, and a client with nothing to go on
defaults to Latin-1.

**After: not yet measurable, and that is the finding — §5(a) is not a code fix.** The route already
returns `Content-Type: text/plain; charset=utf-8` from its own code. The site is `output: "export"`,
so a route handler is written to disk as a file at build time and the Response headers go with the
server that would have sent them; nginx then types the file from its extension, and its default for
`.txt` carries no charset. Confirmed: `out/llms.txt` is a 25,256-byte file containing 38 em dashes.

So the fix is a server directive and it is now in `deploy/nginx-cache.conf` with the measurement
above beside it, together with the two commands to verify after reloading. **That file has never been
applied** — it is an open item from an earlier sprint — so the "after" bytes cannot be reported
honestly yet, and I am not going to report them as though they could.

---

## 3. The link-suppression verdict (§7.1) — the answer needed action today

**Both halves were the bad answer.**

**The source links were never written.** Measured:

```
sma-classification-software-nbfc   source files linking to it: 0
ckyc-software-nbfc                 0
kfs-software-nbfc                  0
penal-charges-software-nbfc         0
```

Zero. **So the 17 October flip would have gone red** on the CI inbound-link guard, on a page with no
sentence anywhere pointing at it. SEO-4's report listed *candidate* sources for each and I never
turned them into links — my gap, from last sprint.

**No suppression existed.** `renderMarkdown` (`src/lib/markdown.ts:21-24`) emits `<a href>` for any
site-relative href and knows nothing about publication state. The only draft-aware filter was
`publishedPosts` / `readingList`, which covers *listings* and not prose.

### What was built

`src/lib/held-back.ts` — reads the same `draft` field and adds no state of its own, so there is
nothing to keep in step. On a live page the anchor is dropped and the words stay; `markdown.ts` is
left dependency-free because it also renders `/privacy/` and `/terms/`.

**A draft page keeps its links**, deliberately: it is `noindex` and in no listing, so it creates no
crawl path, and a reviewer reading one page of a new layer should be able to follow it to the next.

`/authors/` is deliberately **not** in the held-back set, although it carries the same robots tag.
It is held back permanently and on purpose, and SEO-3 §5 decided it stays linked — the fifty-six
bylines are the point of it. A draft is held back *until a date*; `/authors/` is held back for ever.
Suppressing those links would leave every byline pointing nowhere.

### And the bug the control found

The module was written before `/solutions/` existed. The four pages moved there, and the suppression
silently stopped covering them — every inbound link rendered as a live anchor into a `noindex` page on
three live posts. Fixed, and the guard now asserts the **invariant** rather than the fix: every draft
page in the commercial layer is in the held-back set, so a new section added without teaching the
module about it fails a test rather than shipping dead links. Control: removing that one line made the
guard fail, naming all twenty.

---

## 4. What happened to SEO-4's six pages

| Page | Where it is now |
|---|---|
| `/blog/static-pool-analysis-software-nbfc/` | **unchanged.** Published, in the sitemap, `index, follow` |
| `/blog/npa-income-reversal-software-nbfc/` | **unchanged.** Published, in the sitemap, `index, follow` |
| `/blog/sma-classification-software-nbfc/` | → `/solutions/sma-classification-software-nbfc/` |
| `/blog/ckyc-software-nbfc/` | → `/solutions/ckyc-software-nbfc/` |
| `/blog/kfs-software-nbfc/` | → `/solutions/kfs-software-nbfc/` |
| `/blog/penal-charges-software-nbfc/` | → `/solutions/penal-charges-software-nbfc/` |

Moved with `git mv`, so the history follows. None had ever been published, so no URL that Google has
seen has changed and nothing was redirected. The two published pages were **not** moved and the
`/blog/`-versus-`/solutions/` split is left as it is, per §1.2.

Front matter reshaped to the commercial layer's own fields: `date`, `category` and `tool` out; `kind`,
`updated` and `priority` in. `question`, `related` and `draft` carried across unchanged. **The byline
stayed** — added as an optional field on the layer, because these pages cite circulars by paragraph
number and a page that does that without saying who stands behind it is asking for unearned trust.

**Inbound links re-pointed:** written for the first time rather than re-pointed, since none existed.
Twelve links across twelve live posts, each inside a sentence that already made the point:

| Target | Live sources |
|---|---|
| `/solutions/sma-classification-software-nbfc/` | `sma-classification-what-it-signals`, `irac-day-end-classification`, `day-end-not-real-time` |
| `/solutions/ckyc-software-nbfc/` | `credit-information-reporting-2025`, `nbfc-digital-lending-guide`, `due-diligence-what-lenders-ask` |
| `/solutions/kfs-software-nbfc/` | `rbi-key-facts-statement`, `kfs-what-goes-in-the-apr`, `which-rate-goes-on-which-document` |
| `/solutions/penal-charges-software-nbfc/` | `penal-charges-not-interest`, `how-to-calculate-penal-charges-rbi-2024`, `reconciliation-off-by-rupees` |

**`nbfc-compliance-checklist` was not used**, although it was the natural third source for CKYC. It is
in `REVIEW_PENDING_MANOJ.md`, and §7 forbids adding a clause to a review-pending page. SEO-4 hit the
same wall on the same page.

**Flip dates travelled unchanged: 17, 21, 24 and 28 October.**

---

## 5. The listicle edit (§1.3), verbatim

One section replaced, under the sprint's named exception. Front matter, slug, H1 and every other
section untouched — verified: `git diff` shows no change to any front-matter line.

### Removed, in full

> ## The platforms an Indian NBFC commonly evaluates
>
> Described from each vendor's own public positioning. We have not run these systems, and nothing here
> is a comparative claim about capability — see the disclosure at the foot.
>
> **Finflux (part of M2P).** Positioned as an integrated origination and loan management platform with
> RBI-aligned workflows, and commonly shortlisted by smaller NBFCs looking for quick deployment. Its
> place within M2P's wider fintech infrastructure means pre-built connections to payment and banking
> services are part of the pitch.
>
> **CloudBankin.** A cloud-native loan management system aimed at NBFCs and fintechs, covering
> application through underwriting, disbursement and repayment, with API-led integration and built-in
> KYC and compliance tooling in its positioning.
>
> **Finezza.** Positions itself around native co-lending architecture and Account Aggregator
> connectivity across the lending lifecycle — a distinctive emphasis if partnership lending is central
> to your model.
>
> **Jocata, Lentra and similar enterprise platforms.** Generally positioned at the bank and large-NBFC
> end, with origination and decisioning depth, and correspondingly larger implementations.
>
> **Core banking vendors with a lending module.** Several established Indian core banking providers
> offer lending alongside deposits. Worth evaluating where an NBFC is part of a group that already runs
> one, and worth checking specifically how the lending module handles the regulatory positions below.
>
> **Lenviq.** Ours. Origination, loan management, double-entry accounting and RBI reporting in one
> system, built around the regulatory positions an Indian lender is examined on. More below.

### Replaced with

A section headed **"What to demand of any lending system"**, which states in its own first paragraph
that the descriptions were removed and why, then carries a ten-row table in the §1.4 shape — *what
you need / what a system has to do / what it must not be allowed to pretend* — covering one
delinquency figure, classification you can re-read, terms frozen at sanction, postings that cannot be
edited, whole-rupee demands, documents from the loan's own terms, a reconciliation that names the
loan, a migration tested against a past date, scoping in the query, and an honest catalogue. It closes
by naming the question to put to every vendor including Lenviq: *what is in the product catalogue that
we cannot actually turn on?*

### Three consequential edits, because the removal left three dangling references

§1.3 says change nothing else, and these are not "something else" — they are the rest of removing the
section. Left alone, the page promised a disclosure about descriptions that no longer existed.

1. **The intro** said "read the disclosure about how the rest were described" → now describes the
   demands section instead.
2. **The foot disclosure**, headed "How the other platforms were described", → replaced with "Why no
   competitor is named on this page", which states that the descriptions were removed in October 2026
   and why.
3. **The FAQ answer** to "Can I trust a comparison written by a vendor?" referred to "the descriptions
   are each vendor's own public positioning" → now says the page names no competitor at all, "which is
   the only version of that test a vendor can pass".

**No competitor name remains anywhere on the page** — verified by grep for all five.

---

## 6. The pages

Every row read from the rendered HTML in `out/`, not from the markdown. **All twenty children and both
hubs are `draft`** — out of the sitemap, `noindex, nofollow`, and reachable at their own URL at
85–93 KB.

### `/solutions/` artefact pages — twelve (§2.3)

| Slug | H1 | Words | Live inbound |
|---|---|---|---|
| `sma-classification-software-nbfc` | SMA classification: the boundary is day one, and the number is reported | 1,574 | **3** |
| `ckyc-software-nbfc` | CKYC for an NBFC: the upload obligation, the identifier, and the record you have to keep | 1,595 | **4** |
| `kfs-software-nbfc` | The APR on a Key Facts Statement is a cash-flow, and three things systems leave out of it | 1,616 | **3** |
| `penal-charges-software-nbfc` | Penal charges in a lending system: grace, GST, settlement order and the bounce that undoes it | 1,744 | **3** |
| `cic-reporting-software-nbfc` | Reporting to the credit bureaus: the month is easy, the twenty-four months behind it are not | 1,645 | **4** |
| `provisioning-software-nbfc` | Provisioning: the classification decides the rate, and the security decides the base | 1,414 | **4** |
| `dpd-calculation-software-nbfc` | Days past due: one number, two questions, and the one a status field cannot answer | 1,558 | **3** |
| `collection-efficiency-software-nbfc` | Collection efficiency: four defensible definitions, four different answers, one number on the slide | 1,346 | **3** |
| `nach-mandate-software-nbfc` | NACH mandates: the presentation you are allowed to make, and the bounce that undoes a receipt | 1,516 | **3** |
| `gold-auction-software-nbfc` | Auctioning pledged gold: thirty days' notice, two custodians, and the surplus you owe back | 1,529 | **3** |
| `foreclosure-quote-software-nbfc` | A payoff quote is an arithmetic promise with a date on it, and most of them double-count | 1,559 | **3** |
| `rbi-returns-software-nbfc` | RBI supervisory returns: which ones you owe depends on your layer, and most calendars get that wrong | 1,514 | **3** |

Four relocated plus eight new, as §2.3 specifies. Convention held without exception:
`/solutions/<artefact>-software-nbfc`. The §1.1 split holds too — the slug reaches for the commercial
term and **no H1 above reads as "Best NBFC … Software India 2026"**.

### `/solutions/` persona pages — four (§3)

| Slug | H1 | Words | Live inbound |
|---|---|---|---|
| `branch-manager-closing-the-day` | A branch manager's day: the files on your desk, the ones that are not, and day end | 1,403 | **0** |
| `operations-posting-the-days-money` | Operations: posting the day's money, and the entries you are not allowed to delete | 1,480 | **0** |
| `compliance-officer-the-quarter` | The quarter, from a compliance officer's desk: twenty-one days and four things that must agree | 1,512 | **0** |
| `auditor-read-only-access` | An auditor's access: read everything, change nothing, and get the position as at the date you asked for | 1,322 | **0** |

Roles taken from `provision.ts:107-123` — Branch Manager (`BM`, BRANCH scope), Operations (`OPS`,
BRANCH), Credit Head (`CREDIT_HEAD`, TENANT — the role holding `RBI_RETURNS_MANAGE` and
`BUREAU_MANAGE`), and Auditor (`AUDITOR`, TENANT, read-only).

**Not one number about money saved, time saved, payback, headcount or percentage improvement appears
on any of them.** There are no customers, so there is nothing measured, and each page instead
describes the day and what the software does and does not do in it.

### `/enterprise/` pages — four (§4)

| Slug | H1 | Words | Live inbound |
|---|---|---|---|
| `many-branches-one-book` | Forty branches, one book: who sees which borrower, and whose approval a file needs | 1,386 | **1** |
| `many-products-one-engine` | Seven kinds of lending on one system: where the behaviour differs, and where it must not | 1,345 | **0** |
| `one-chart-of-accounts` | One chart of accounts under a multi-product book, and the reconciliation that proves it | 1,257 | **1** |
| `migrating-a-live-book` | Migrating a live book: the position is the easy half, and the payment history is the other one | 1,490 | **1** |

**"The multi-state book" was one of §4's four named candidates and was dropped**, because
`model RegulatoryCap` has no state dimension — the product does not enforce state money-lending rate
caps. Replaced with "several products, one engine", which the behaviour-code model does support.

### Hubs — two

`/solutions/` and `/enterprise/`, both `excluded` in `ROUTE_PAGES`. The hub routes deliberately do
**not** pass `excluded` themselves: that would be the same decision in two files.

### Against the cap — and what remains unbuilt

**60 files changed, which is exactly the cap.** This report is excluded, as the required §9
deliverable rather than a change to the site.

So, per §2.3 — *"finish the pages you have started, report what links remain unbuilt, and stop"*:

**Twelve of twenty pages have three or more live inbound sources. Eight do not, and cannot be
flipped until they do:**

| Page | Live inbound | Needs |
|---|---|---|
| `/enterprise/many-branches-one-book/` | 1 | 2 more |
| `/enterprise/one-chart-of-accounts/` | 1 | 2 more |
| `/enterprise/migrating-a-live-book/` | 1 | 2 more |
| `/enterprise/many-products-one-engine/` | 0 | 3 |
| `/solutions/branch-manager-closing-the-day/` | 0 | 3 |
| `/solutions/operations-posting-the-days-money/` | 0 | 3 |
| `/solutions/compliance-officer-the-quarter/` | 0 | 3 |
| `/solutions/auditor-read-only-access/` | 0 | 3 |

Twenty links across roughly twenty files. **The CI guard will refuse each flip until they exist**,
which is the behaviour I want rather than something to work around.

**A weakness in that guard, found while measuring and worth knowing:** `buildGraph` walks every built
page as a potential source, and a draft page is built. So once a page is flipped, a link to it from a
page that is *still a draft* counts toward its three — which overstates, because a page nobody can
reach passes no weight. Every count in the tables above is therefore from **live sources only**,
measured separately. Tightening the guard to exclude draft sources would make more pages fail, which
is correct; it is not done here because it is past the cap.

---

## 7. The glossary pairs (§2.4)

Nine of the twelve artefact pages have a glossary counterpart. No glossary entry was created, edited,
deleted or redirected, and **neither side carries a canonical tag pointing at the other**.

| Pair | What distinguishes them, in one line |
|---|---|
| `/glossary/sma/` ↔ `sma-classification-software-nbfc` | The glossary gives the three buckets and their ranges; the page gives the day-end date they are cut on, the revolving-facility test, and why grace must not touch them |
| `/glossary/ckyc/` ↔ `ckyc-software-nbfc` | The glossary defines the registry; the page is the upload *and* retrieval obligation, the commencement dates and the record lifecycle |
| `/glossary/kfs/` ↔ `kfs-software-nbfc` | The glossary says what a Key Facts Statement is; the page is the APR as a cash-flow computation and the three deductions that get left out of it |
| `/glossary/penal-charges/` ↔ `penal-charges-software-nbfc` | The glossary states that a penal amount is a charge; the page is grace, whose GST registration applies, settlement order, and the bounce |
| `/glossary/cic/` ↔ `cic-reporting-software-nbfc` | The glossary identifies the credit information companies; the page is the trailing history and the two defects that misfile an honest borrower |
| `/glossary/provisioning/` ↔ `provisioning-software-nbfc` | The glossary gives the rates by classification; the page is that the rate is only half of it — the base is net of realisable security |
| `/glossary/dpd/` ↔ `dpd-calculation-software-nbfc` | The glossary defines days past due; the page is that it has two readings, and only one of them can answer about a past month |
| `/glossary/collection-efficiency/` ↔ `collection-efficiency-software-nbfc` | The glossary gives the ratio; the page is that there are four of them, they diverge, and the data to compute any has to be stored first |
| `/glossary/foreclosure/` and `/glossary/prepayment/` ↔ `foreclosure-quote-software-nbfc` | The glossary defines the events; the page is the quote's arithmetic — the date, the double-count, the floor, and who the charge applies to |

**Three have no counterpart and need no comparison:** `nach-mandate-software-nbfc`,
`gold-auction-software-nbfc`, `rbi-returns-software-nbfc`. No glossary entry was added for them, per
§8.

The four persona and four `/enterprise/` pages have no glossary counterpart by construction — a role
and a lender's shape are not defined terms.

---

## 8. `ROLE_SPEC` versus the code (§3)

The roles were read from `src/lib/platform/provision.ts`, not from `ROLE_SPEC`. **Three divergences
are recorded in the code itself, all found and fixed before this sprint.** The product also carries a
"ROLE_SPEC divergence test", which is what caught the second.

| Divergence | Where | What it was |
|---|---|---|
| `ACCOUNTING_VIEW` withheld from `BM` and `RCM` | `provision.ts:70-77` | `books.ts` took a single optional `branchId` and could not express a branch *set*, so a REGION-scoped Regional Credit Manager asking for a trial balance **would silently have received the consolidated one** — every branch in the tenant. Closed by AC-1: every accounting read now takes a scope derived from the principal's own, and a requested branch is **intersected** with it rather than trusted |
| `APPLICATION_SOURCE` granted too widely | `permissions.ts:88-90` | Granting it to Credit and the approvers as well "made four roles look, at grant level, as though they could upload a bureau report the spec gives only to Credit". Caught by the divergence test |
| Stage TAT report scoped tenant-wide | `reports.ts:57` | "an RCM saw tenant-wide stage TAT despite `ROLE_SPEC` §2 giving them a REGION scope". Fixed by migration `20260805110000`, which added region and branch to the materialised view |

**Two deliberate exclusions worth reporting, since they look like divergences and are not:**
`ADMIN` holds every permission **except** `APPROVAL_INBOX_VIEW` (the application approval inbox is
scoped to in-chain approvers; an administrator's oversight surface is the maker-checker inbox) and
**except** `LOAN_PURGE` (it removes a loan that took money, along with its ledger entries, so it is
granted by hand to the person who needs it rather than arriving switched on).

The pages describe the code, and the first divergence is written into
`/solutions/branch-manager-closing-the-day/` in terms — "the branch-level accounting read is
intersected with your own scope rather than trusted, which it was not always".

---

## 9. §5 in full

### (a) The charset

Not a code fix. Set out with the before-bytes in §2(c). The directive is in
`deploy/nginx-cache.conf`, in a block that now also covers the two new files, with the measurement and
the two verification commands beside it. **That file has never been applied on the host**, so there is
no honest "after" to report.

### (b) The sitemap additions

Added: `/llms.txt`, `/llms-full.txt`, `/ai-products.json`. Sitemap **124 → 127**, verified in the
build. Low priority (0.4) deliberately — they are reference material, not destinations.

Nothing on the site links to them, by design, which is exactly why they are listed: a crawler
following anchors would never find them. The `seo-intent.ts` guard had to be taught to exempt them —
an intent entry is a commitment that a page should rank for a stated query, and a plain-text file
written for machines has no such query.

### (c) The two new files

**`/llms-full.txt`** (31,531 bytes) leads with **what is not offered**, because a model that reads a
feature list and recites it to a compliance officer will eventually recite a capability the reader
cannot switch on. It names the four gated reports by catalogue code, the two planned ones, the three
reserved collateral behaviours, the absence of transmission to the bureaus and the KYC registry, and
the absence of AI. It also states that there are no published customer counts or savings figures,
and that any such figure attributed to Lenviq did not come from us.

**`/ai-products.json`** takes cosecoffice's field shape — fetched for its field names and nesting
only, with every value replaced by its type before I saw it — and **none of its content**. Fifteen
`featureList` entries, each verified in §1. `offers.price` is `null` with a description saying
pricing is not published and the calculators are free: a price of "0" would be a lie and an invented
figure worse.

It carries a **`limitations` array that the borrowed shape does not have** — eight entries, the first
being the absence of AI. On §8's prohibition: this is a standalone file a machine fetches on purpose,
asked for by name in §5(c), not markup embedded in a page. **No page gained any structured data in
this sprint.**

### (d) `/ai` — not built

The product has no AI features. Measured whole-word, with the authoritative tests:

```
\bAI\b     0 files      openai  0      anthropic  0      inference  0      gpt-  0      claude  0
llm        5 files   -> all 32 occurrences are "bullmq" / "BullMQ" / "bullmqAvailable"
embedding  3 files   -> all 5 occurrences are FONT embedding (fonts.ts, fonts-css.ts, storage.ts)

prisma models (Ai|Ml|Prediction|Embedding):  0
report catalogue entries mentioning AI:      0
package.json AI dependencies:                0
```

§5(d) says to build nothing in that case, so **nothing is built**, `/ai` is not in the sitemap, and
`llms-full.txt` and `ai-products.json` both state the absence in terms. A page about AI that does not
exist is worse than no page.

---

## 10. Proposed release order and dates (§7)

**Children first, hub third.** Nothing here is published; somebody has to flip each one, and the CI
guard will refuse any flip whose three inbound links do not exist.

### Inherited from SEO-4, unchanged

| Date | Page |
|---|---|
| **Fri 17 Oct 2026** | `/solutions/sma-classification-software-nbfc/` |
| **Tue 21 Oct 2026** | `/solutions/ckyc-software-nbfc/` |
| **Sat 24 Oct 2026** | `/solutions/kfs-software-nbfc/` |
| **Wed 28 Oct 2026** | `/solutions/penal-charges-software-nbfc/` |

All four have their three live inbound links as of today, so all four can be flipped on schedule.

### Proposed, after 28 October, roughly two a week, strongest first

| Date | Page | Ready? |
|---|---|---|
| **Sat 31 Oct** | `/solutions/cic-reporting-software-nbfc/` | yes — 4 inbound |
| **Wed 4 Nov** | `/solutions/provisioning-software-nbfc/` | yes — 4 |
| **Sat 7 Nov** | **`/solutions/` hub** | its third child is live on 4 Nov, so the hub has something to be a hub of |
| **Wed 11 Nov** | `/solutions/dpd-calculation-software-nbfc/` | yes — 3 |
| **Sat 14 Nov** | `/solutions/collection-efficiency-software-nbfc/` | yes — 3 |
| **Wed 18 Nov** | `/solutions/rbi-returns-software-nbfc/` | yes — 3 |
| **Sat 21 Nov** | `/solutions/nach-mandate-software-nbfc/` | yes — 3 |
| **Wed 25 Nov** | `/solutions/gold-auction-software-nbfc/` | yes — 3 |
| **Sat 28 Nov** | `/solutions/foreclosure-quote-software-nbfc/` | yes — 3 |
| **Wed 2 Dec** | `/enterprise/many-branches-one-book/` | **no — needs 2 more inbound links first** |
| **Sat 5 Dec** | `/enterprise/one-chart-of-accounts/` | **no — needs 2 more** |
| **Wed 9 Dec** | `/enterprise/migrating-a-live-book/` | **no — needs 2 more** |
| **Sat 12 Dec** | **`/enterprise/` hub** | after its third child |
| **Wed 16 Dec** | `/enterprise/many-products-one-engine/` | **no — needs 3** |
| **Sat 19 Dec** onward | the four persona pages | **no — each needs 3** |

The dates from 2 December are therefore proposals contingent on the twenty links in §6 being written.
They are not blocked by anything else.

**One standing dependency inherited and honoured:** no prose was added to any page in
`REVIEW_PENDING_MANOJ.md`. Taken from the file, not from memory — it reviews seven pages (sections
1–7): the four compliance pages and the three state money-lending pages.
`/blog/penal-charges-not-interest/` appears in that file but **only as a link target mentioned inside
the checklist's claim table**, not as a reviewed page, so it was available as a link source and was
used.

---

## 11. Every regulatory citation used

Flat list. Manoj reads this rather than the pages.

| # | Claim | Source | Number | Date | Paragraph |
|---|---|---|---|---|---|
| 1 | An account is flagged overdue in the day-end process for the due date, whatever time it runs | RBI clarification on IRACP norms | RBI/2021-2022/125, DOR.STR.REC.68/21.04.048/2021-22 | 12 Nov 2021 | **4** |
| 2 | Worked example: due 31 Mar 2021 → SMA-1 on 30 Apr → SMA-2 on 30 May → NPA on 29 Jun 2021 | same | same | same | **4** |
| 3 | SMA-0 overdue up to 30 days; SMA-1 >30 and ≤60; SMA-2 >60 and ≤90 | same | same | same | **3** |
| 4 | For revolving facilities the test is continuous excess over sanctioned limit or drawing power, and there is no SMA-0 | same | same | same | **3** |
| 5 | An NPA may be upgraded to standard only on payment of the **entire** arrears | same | same | same | **10** |
| 6 | Penal charges are charges, not interest; no capitalisation of penal charges | RBI circular on fair lending practice — penal charges in loan accounts | RBI/2023-24/53, DoR.MCS.REC.28/01.01.001/2023-24 | 18 Aug 2023 | quoted in body |
| 7 | Fresh loans from 1 Apr 2024; existing loans at next review or renewal on or after 1 Apr 2024 and not later than 30 Jun 2024 | RBI circular extending the above | RBI/2023-24/102 | 29 Dec 2023 | — |
| 8 | The KFS must carry an APR computation sheet and a loan amortisation schedule; the APR includes all charges levied by the regulated entity | RBI circular, Key Facts Statement for Loans & Advances | RBI/2024-25/18, DOR.STR.REC.13/13.03.00/2024-25 | 15 Apr 2024 | **6** |
| 9 | Third-party charges are part of the APR and are additionally disclosed separately, with receipts given for each payment | same | same | same | **7** |
| 10 | Annex B's illustration on a hypothetical ₹20,000 retail loan gives an effective annualised rate of 17.07% | same | same | same | Annex B |
| 11 | NPA norm for applicable NBFCs changed to overdue more than 90 days, with a glide path whose final step was due by 31 Mar 2026 | Master Direction – RBI (NBFC – Scale Based Regulation) Directions, 2023 | RBI/DoR/2023-24/106, DoR.FIN.REC.No.45/03.10.119/2023-24 | 19 Oct 2023 (updated 10 Oct 2024) | **14.2** |
| 12 | REs other than scheduled commercial banks upload CKYC data for all new individual accounts opened on or after 1 Apr 2017 (SCBs: 1 Jan 2017) | Master Direction – Know Your Customer (KYC) Direction, 2016 | RBI/DBR/2015-16/18, DBR.AML.BC.No.81/14.01.001/2015-16 | 25 Feb 2016, as amended | CKYCR provisions |
| 13 | Individual accounts opened before 1 Jan 2017 are uploaded at periodic updation, or earlier where updated KYC is received | same | same | same | same |
| 14 | A KYC Identifier generated by the registry must be communicated to the individual or legal entity | same | same | same | same |
| 15 | Where a customer supplies a KYC Identifier, the RE retrieves the records online from the registry | same | same | same | **56** |
| 16 | Periodic updation at least every two years (high risk), eight (medium), ten (low) | same | same | same | periodic updation |
| 17 | The CKYC amendments issue under s.35A read with s.56 of the Banking Regulation Act, 1949 and Rule 9(14) of the PML (Maintenance of Records) Rules, 2005 | same | same | same | legal basis |
| 18 | An unregistered person may not collect GST on a supply | Central Goods and Services Tax Act, 2017 | — | — | **s.32** |
| 19 | DNBS02 is filed by NBFCs in the Base Layer except P2P platforms, quarterly | Master Direction – RBI (Filing of Supervisory Returns) Directions, 2024 | — | 2024 | **Annex III** |
| 20 | The quarterly supervisory return timeline is twenty-one days from the quarter end | same | — | 2024 | para 4.4 |
| 21 | The 2021 Directions govern transfer of standard assets and require ongoing risk disclosure to investors; a static pool is **not** a format they prescribe | Master Direction – RBI (Securitisation of Standard Assets) Directions, 2021 | RBI/DOR/2021-22/85, DOR.STR.REC.54/21.04.177/2021-22 | 24 Sep 2021 (updated 5 Dec 2022) | cited for what it does **not** require |
| 22 | A gold auction requires at least thirty days between notice and auction; a surplus is paid to the borrower within seven days | RBI (Lending Against Gold and Silver Collateral) Directions, 2025 | — | 2025 | implemented in `auction.ts` as a non-negotiable minimum |

### Claims left off a page because they could not be sourced

| Claim | What happened |
|---|---|
| **The CKYC upload timeline in days** | Inherited unresolved from SEO-4. Searched RBI's site again, including an extended search, and could not retrieve the text that fixes it. **Still not on the page.** The page gives the commencement dates and the periodic-updation cadence instead, both of which I did confirm. Needs confirming against the consolidated Master Direction before 21 October |
| **The CRILC reporting threshold** | Not stated anywhere. The SMA and CIC pages say "where the exposure falls within the reporting perimeter" rather than naming a figure |
| **The weekly default-reporting cycle for SMA-2 accounts** | Appears on an existing page (`sma-classification-what-it-signals`) and was **not repeated** on the new one, because I could not source the cadence |
| **The exact paragraph of the 2025 gold directions** that fixes thirty days and seven days | The figures are implemented in `auction.ts` as non-negotiable minima with the directions named, and the page states them; I did not read the paragraph number out of the directions themselves |
| **The citation for the 21-day timeline** | Taken as "para 4.4" from this repo's own `REVIEW_PENDING_MANOJ.md`, which flagged it as read from a verbatim reproduction rather than from RBI's PDF. Carried forward with the same caveat rather than upgraded |

---

## 12. §6 — deferred, and why

**Tool sub-pages are not in this sprint.** cosecoffice's board-resolution generator has nine
sub-pages, one per use case, from one tool; this site's eleven tool URLs — ten calculators plus the
`/tools/` hub — are flat with no sub-pages at all. It is the largest untapped multiplier on the site.

Deferred to SEO-6 for the reason §6 gives: a tool sub-page has to reflect what the calculator
actually does, and this sprint already carried the enumeration. Recorded here so it is not lost.

---

## 13. What I could not verify

### Absent from the codebase

| Item |
|---|
| Any AI feature. Measured in §9(d) |
| A DCB statement. `dcb`, `DCB` and `demandCollection` match nothing in `src/lib`; N-01 is a different reconciliation |
| A state dimension on regulatory caps. `model RegulatoryCap` is keyed on cap type, amount slab and effective date |
| DNBS01 and DNBS03. Named in `rbi-returns.ts:486` as not produced |
| Transmission to the credit bureaus or the CKYC registry, and retrieval against a KYC Identifier |
| A ledger posting from the loan import. `loan-import.ts:13` says so in terms |
| Static pool, collection efficiency, DPD movement matrix and portfolio yield as runnable reports — gated. Board pack and the s.45-IC statement — planned |
| FD lien, machinery and share-pledge collateral — reserved, not built |

### Absent from this environment

| Item |
|---|
| **The CKYC upload timeline in days.** Two searches, including an extended one, could not retrieve the text. Not on the page |
| **The "after" bytes for the charset fix.** `deploy/nginx-cache.conf` has never been applied on the host, so there is no corrected header to fetch. Unchanged from earlier sprints |
| **The verbatim paragraph text of RBI/2021-2022/125.** The notification page gives the paragraph numbers and substance; the PDF is behind an image-code challenge, which I did not attempt |
| Whether the twenty remaining inbound links would change any of the counts in §6 — they are not written, so there is nothing to measure |

### Outside my own access

| Item |
|---|
| Search Console for either property. Every figure in §0 is taken as given; I re-derived only what the repo can re-derive |
| Whether any of this gets indexed. Nothing is published, and requesting indexing is not mine to do |
| cosecoffice's repository or analytics. I read one JSON file for its field shape and two pages for structure, in a previous sprint |
| The aaPanel host. No shell from here; ops work goes into `deploy/nginx-cache.conf` |

---

## 14. Anything in Section 0 my own measurement contradicted

**Three contradictions, all small, and one of them changes a sentence in §0 rather than a decision.**

### (1) "Tool count. Both have exactly 11." — this site has **ten tools**

`src/lib/tools/index.ts` defines **ten** calculators. The sitemap carries **eleven** URLs under
`/tools/` because the `/tools/` hub is one of them. §0's sitemap table says "tools 11", which is right
about URLs and wrong about tools, and §0's "do not spend effort here" list says "both have exactly
11", which is a comparison of two numbers that may not be measuring the same thing. It does not change
the conclusion — tool count is not the difference — but if the eleven on the other side is also a hub
plus ten, the two sites are level at ten; if it is eleven tools, this site is one short.

### (2) "glossary 23" — there are **22** glossary entries

`src/lib/glossary.ts` defines 22 terms. The sitemap carries 23 URLs under `/glossary/` including the
index. Same arithmetic as above. The allocation argument in §0 is unaffected: 22 glossary plus 12 help
is 34 of 124 pages, 27%, against §0's 29% — the point stands.

### (3) §0's live checks were right, and one has since changed

Verified today before touching anything:

```
/llms.txt          200   text/plain, NO charset   <- as §0 said
/llms-full.txt     404   -> now built
/ai-products.json  404   -> now built
/ai                404   -> deliberately still 404 (§5(d))
/solutions/        404   -> now built, held back
/enterprise/       404   -> now built, held back
```

### Confirmed, not contradicted

- **§1.2's description of what SEO-4 produced is exactly right** — six pages, two published, four
  drafts, all four serving 200, live sitemap 124. Re-verified from the live site.
- **§0's premise that `/solutions/` and `/enterprise/` are empty on this site** — they were, 404 on
  both.
- **The publication mechanism works as §0 describes it.** One field, four consequences, and the §7.1
  control watched all four move together.

---

## 15. The gate, as run

```
typecheck                     clean
build                         0 errors, 151 HTML pages (was 133)
tests                         192 passed (was 186; +6 commercial-layer guards)
sitemap                       127 locs (124 + 3 machine-readable files; nothing else published)
commercial layer              22 pages, every one noindex,nofollow, absent from the sitemap, 85-93 KB and reachable
live link into a draft page   0 — asserted over every built page, not only the ones with such links
hub leak                      0 — both hubs list published children only
CI export check               no "not reviewed, not published", no lenviq.com
src/app/robots.ts             untouched — app.lenviq.in unaffected
near-duplicate                not re-run; no new blog post was added, and the commercial layer is a different directory
fintrustsuite                 read only; git status there is clean
files changed                 60, exactly the cap (this report excluded)
```

### Guards added, and the controls run on them

Six new guards on the commercial layer. Two were broken on purpose, and two more failed without being
broken:

| Control | What I broke | What the guard did |
|---|---|---|
| `heldBackPaths` knows every section | Removed the commercial layer from it — exactly the original bug | **Failed**, naming all twenty draft pages |
| The conditional link | §7.1's control, in full | **Failed first time without being broken**, which is how the real bug was found (§2(b)) |
| Limits device on every page | nothing | **Failed** on `auditor-read-only-access`, whose limits section is headed differently. The guard now recognises the device's two phrasings, documented |
| Blocks in the rendered output | nothing | **Failed** on `compliance-officer-the-quarter`, which genuinely had **no table** — block 6 was missing. A specification table was added rather than the guard loosened |

Three further guards failed earlier in the sprint and were all fixed rather than loosened: two hub
descriptions over the 160-character search-result limit, the `seo-intent` guard demanding a search
intent for `llms.txt`, and the SEO-4 page-type guard reporting five pages where the relocation had
made twelve.

### One correction to live content, found on the way

Five places across **four live posts** dated the IRAC clarification **15 November 2021**. It is
**12 November 2021** — RBI's own notification page, and this repo's own `REVIEW_PENDING_MANOJ.md`
already said so at line 66. Corrected in `sma-classification-what-it-signals`,
`day-end-not-real-time`, `how-to-automate-npa-classification-nbfc` and `rbi-compliance-for-nbfcs-guide`
(two occurrences). None of the four is review-pending. Thirteen files now agree.

### And one of my own, from SEO-4

`src/app/blog/page.tsx`'s empty-state copy told the reader that drafts "are not built into this site".
SEO-3 reversed that. Unreachable today — the branch renders only when nothing is published — and still
wrong prose. Corrected.
