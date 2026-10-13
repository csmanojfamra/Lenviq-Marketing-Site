# Sprint SEO-4 — the artefact+software page type

Repo: `lenviq-marketing` (`Lenviq-Marketing-Site`). `fintrustsuite` was **read only**, for §3.
Worked 13 October 2026. Baseline `40e931d`, the commit Sprint SEO-3 ended on.

**Six pages, not seven, and the missing one is a finding rather than a shortfall.** §2.2's listicle
already exists on this site. Details in §2 and §6 below; nothing else in the sprint was dropped.

---

## 0. Read this first — what the sprint asked for that was already here

Two of the sprint's premises did not survive measurement, and one of its "do not" items was already
done. Taking them on trust would have produced a duplicate page and an unnecessary fix.

### (a) §2.2's page exists, and writing a second one would have been the defect

`content/blog/best-loan-management-software-india.md`, published **12 August 2026**, 1,528 words,
bylined CS Manoj Famra. Measured against what §2.2 asks for:

| §2.2 asks for | The existing page |
|---|---|
| Slug reaches for "best" | `best-loan-management-software-india` |
| H1 does not | "Loan management software in India: the platforms an NBFC actually shortlists" |
| Says plainly it is a guide, not a ranking | Opens: there is no single best, and a numbered ranking "is usually written by one of the vendors on it" |
| Does not rank competitors | H2 "Why none of them is ranked above the others" |
| Says where Lenviq sits | H2 "Where Lenviq fits, honestly" |

Writing `best-loan-management-software-india-2026` beside it would have put two near-identical slugs
on one subject on a domain with one external backlink — which is the cannibalisation SEO-3 spent a
sprint measuring. **I did not write it.**

One thing about that page is worth Manoj's attention and is **not** mine to fix under §5 ("do not
delete, rewrite or redirect existing blog pages"): its H2 "The platforms an Indian NBFC commonly
evaluates" **names competitor products**. §2.2 of this sprint forbids naming competitors, on the
ground that an unverifiable comparative claim about a named company is a legal exposure rather than
an SEO one. The page is careful — it describes each on public positioning and ranks none — but the
instruction and the existing page disagree, and that is a decision above this sprint.

### (b) The page type is new; the subjects are not

§0 says "nobody has written the page in the middle". For the **page shape** that is exactly right —
before today, no page on this site carried a labelled quick answer, a limits column, or a
hand-picked reading list. Measured:

```
"IN THIS ARTICLE"   0 files      "QUICK ANSWER"   0 files
"RELATED READING"   0 files      "must not pretend"  0 files
```

But the site already had artefact pages on five of the six subjects, and in one case already had the
artefact+software pairing: `gold-loan-directions-2025` (the artefact) beside
`gold-loan-management-software-nbfc` (the artefact plus the software question). That pair is the
**site's worst near-duplicate pair at 0.0591 8-gram Jaccard** — which is the useful number, because
it says this pairing has been done here once and did not produce duplicate content.

So the hazard was real and measurable rather than hypothetical, and it was measured before and after.
`scripts/near-duplicate.mjs` is new and does it.

### (c) §5's title-suffix defect is already fixed here

§5's closing note asks me to check that lenviq's title template does not duplicate the brand the way
cosecoffice's does. **It did, it was found, and it was fixed before this sprint** — `src/lib/seo.ts`
lines 12-15 record it: `layout.tsx` set `title.template` to `"%s · Lenviq"` and six pages also ended
their own title with `"— Lenviq"`, shipping as `… — Lenviq · Lenviq`. Verified live today:

```
/                          Lenviq — loan management and origination software for NBFCs
/blog/npa-income-reversal/ What happens to interest already booked … · Lenviq
/loan-management-system/   Loan management system (LMS) for NBFCs · Lenviq
/glossary/sma/             What do SMA-0, SMA-1 and SMA-2 mean? · Lenviq
```

One suffix each. **I changed nothing.**

---

## 1. The claims table (§3)

Every product claim made on the six pages, with the file and line in `fintrustsuite` that establishes
it. Read-only; nothing in that repo was written.

### Implemented — written

| Claim | `fintrustsuite` | Verdict |
|---|---|---|
| SMA bucket derived from one days-past-due figure: 0 → standard, 1-30 → SMA-0, 31-60 → SMA-1, 61-90 → SMA-2, >90 → NPA | `src/lib/lms/npa.ts:4-10` (`smaClass`) | Implemented |
| The same DPD figure feeds the bureau file, so classification and the submission cannot diverge | `src/lib/lms/bureau.ts:82-84` | Implemented |
| Classification runs in a scheduled day-end job, not on user request, and takes the business date as an input | `src/lib/lms/jobs.ts:3` (BullMQ scheduler / `scripts/lms-daily.mjs`), `:71` (`sweepTenantDpd(t.id, asOf)`) | Implemented |
| SMA watch list available as at a chosen date, with branch and region filters | `src/lib/reports/catalogue.ts:675-683` — R-17, `status: "LIVE"`, `periodType: "AS_ON"`, `mv_sma_watchlist` | Implemented |
| On NPA classification, accrued uncollected interest is debited out of income and credited to interest suspense | `src/lib/repos/npa.ts:70` | Implemented |
| After classification, a receipt passes bank → suspense → income, so recognition is on receipt | `src/lib/repos/npa.ts:95-105` | Implemented |
| Interest suspense presented as a **contra-asset** against interest receivable, not as a liability | `src/lib/repos/financial-statements.ts:163`, `src/lib/accounting/statement-lines.ts:103` | Implemented |
| Upgrade applies the entire-arrears test, not a days-past-due threshold | `src/lib/repos/npa.ts` (upgrade path), CLAUDE.md rule 15 | Implemented |
| Penal computed from the snapshotted collection terms; the levy posts nothing to the general ledger | `src/lib/repos/penal.ts:20-33` (`penalFor`), header: "Never posts GL (rule 14)" | Implemented |
| Penal grace reduces **chargeable days only** — the days beyond the grace, not all of them — and is never applied to DPD | `src/lib/repos/penal.ts:33-35` | Implemented |
| Penal income recognised on collection: Dr bank, Cr penal income, tied to the receipt | `src/lib/repos/repayments.ts:387` | Implemented |
| Penal is its own settlement bucket ahead of interest and principal; never added to principal | `src/lib/lms/appropriation.ts:28-43`, default order `src/lib/lms/snapshot.ts:40` | Implemented |
| Interest and principal applied **oldest demand first** | `src/lib/lms/appropriation.ts:45-58` | Implemented |
| Settlement order is part of the scheme snapshot | `src/lib/repos/sanction.ts:268` (`appropriationOrder`) | Implemented |
| A bounce reverses the penal recognised on the original receipt | `src/lib/repos/bounce.ts:88` | Implemented |
| A waiver posts as an expense against the outstanding charge, with a reason | `src/lib/repos/penal.ts:291` | Implemented |
| GST on penal read from the lender's **current** registration rather than the sanction snapshot | `src/lib/repos/penal.ts` (gst block, citing CGST s.32) | Implemented |
| New penal levy stopped on a classified account; existing pending penal suspended | `src/lib/repos/penal.ts:82` | Implemented |
| APR computed from the cash-flow, with upfront charges **and the GST on them** as deductions at t=0 | `src/lib/finance.ts:93-130` (`kfsNumbers` → `computeApr`) | Implemented |
| An instalment collected at disbursement modelled as both a deduction and a shortening of the remaining stream | `src/lib/finance.ts:93-125` (`advanceInstalments`) | Implemented |
| Periods per year is an input, so a weekly or daily schedule is not priced as monthly | `src/lib/finance.ts` (`opts.periodsPerYear`) | Implemented |
| Where a scheme fixes the instalment, the rate is derived from the agreed instalment | `src/lib/finance.ts` (`opts.contractedEmiPaise`) | Implemented |
| KFS generated from the application's own pricing, available before sanction | `src/app/api/applications/[id]/kfs/route.ts`, `src/lib/repos/sanction.ts:86` (`kfsPreview`), `src/lib/documents/html/templates/letters.ts:82` (`kfsHtml`) | Implemented |
| CKYC file built for individual **and** non-individual customers, and for a new record as distinct from an update | `src/lib/repos/bureau.ts:427-439` | Implemented |
| The generated file is stored and a dated upload record kept per customer, with status and the identifier allotted | `src/lib/repos/bureau.ts:440-449`, status report `:491-496` | Implemented |
| Aadhaar masked before it reaches the CKYC file; the full number is not persisted | `src/lib/repos/bureau.ts:432` (`maskAadhaarForBureau`), CLAUDE.md rule 5 | Implemented |
| Static pool inputs: first disbursement as a dated event, classification appended rather than overwritten, DPD from dated due events and dated receipts | CLAUDE.md rule 9 (immutability), rule 19 (`computeHistoricalDpd` from dated receipts) | Implemented |

### Absent — not written as a capability, and named as a limit instead

| Claim | Evidence | What the page says |
|---|---|---|
| **Static pool / vintage analysis report** | `src/lib/reports/catalogue.ts:444-454` — N-18 "Static Pool / Vintage Analysis", `status: "GATED"`, note "Waiting on the nightly position snapshot". `:51-52` defines the status: *"LIVE is navigable. PLANNED and GATED are specified but not offered."* | The page states the report is specified and **not yet offered**, and names the snapshot it waits on |
| **Transmission of a CKYC file to the registry** | `generateCkyc` ends at a stored file and a `PENDING` record; `markCkycStatus` (`bureau.ts:445`) is called by a human | "it does not transmit to the registry, so submission and the status that follows are recorded rather than performed" |
| **Retrieval of a record against a KYC Identifier** | No retrieval path exists. `ckycNumber` is typed in by hand (`src/components/admin/parties/kyc-panel.tsx:54,177`); `ckycStatusReport` is a count by status | "it does not retrieve a record against a KYC Identifier, so the retrieval half of the obligation above is outside what the platform does today" |
| Field-by-field content of the rendered KFS | Not read. §3's own second trap: charge naming reaches four consumers | The page declines the claim in terms: "What this page does not claim is a field-by-field account of that document" |
| Recoverability / prediction | No such code, and there should not be | Both pages say so — "no engine should be sold as one"; "an SMA list is a record of accounts that are already late" |

**The one thing worth escalating.** §2.1 ranks static pool **first** by evidence of demand, and §4
says publish the strongest two. Static pool is also the one subject where the product has the least
to offer — the report is gated. So the highest-demand page on the list is the page whose software half
is mostly a limit. I followed §4 and published it, because §1.4 is explicit that naming a limit is
more persuasive to this audience than hiding it, and because the page's substance is the
*requirements* a system must meet rather than a feature tour. But if the intent was to lead with
strength, the swap to make is static pool for SMA, and that is Manoj's call, not mine.

---

## 2. The pages

Blocks are numbered as in §1.2. Every row below was read from the **rendered HTML in `out/`**, not
from the markdown.

| # | Slug | H1 | Words | Blocks | Contextual inbound |
|---|---|---|---|---|---|
| 1 | `static-pool-analysis-software-nbfc` | Static pool analysis: the fields a lending system has to freeze before the table can exist | 2,481 | 1-7, 9-12 | **5** |
| 2 | `npa-income-reversal-software-nbfc` | NPA income reversal and upgrade: the entries both ways, and the two a system double-counts | 2,580 | 1-7, 9-12 | **5** |
| 3 | `sma-classification-software-nbfc` | SMA classification: the boundary is day one, and the number is reported | 2,194 | 1-7, 9-12 | 0 — draft |
| 4 | `ckyc-software-nbfc` | CKYC for an NBFC: the upload obligation, the identifier, and the record you have to keep | 2,231 | 1-7, 9-12 | 0 — draft |
| 5 | `kfs-software-nbfc` | The APR on a Key Facts Statement is a cash-flow, and three things systems leave out of it | 2,283 | 1-7, 9-12 | 0 — draft |
| 6 | `penal-charges-software-nbfc` | Penal charges in a lending system: grace, GST, settlement order and the bounce that undoes it | 2,435 | 1-7, 9-12 | 0 — draft |
| 7 | — | **not written.** §2.2's page already exists — see §0(a) | — | — | — |

Word counts are of the rendered `<main>`, so they include the tables and the quick answer. Block 8
("the substance") is the H2 set and is listed per page at the end of this section.

A draft has **zero** inbound links by construction and that is correct: consequence 3 of
`publication.ts` is that no listing links to one. Inbound links are what has to be added **before**
each is flipped — see §3.

### The slug convention, and the §1.1 split

One convention, held across all six: **`<artefact>-software-nbfc`**. It matches what this repo
already uses (`gold-loan-management-software-nbfc`, `how-to-automate-npa-classification-nbfc`).

The §1.1 split is the mechanic I was most careful about. The slug reaches for the commercial query;
the H1 promises what the reader came for. Not one H1 above reads as "Best NBFC … Software India 2026",
and none of them contains the word "software" except where the sentence genuinely needed it.

### What was built to make blocks 5 and 11 exist

Three of the twelve blocks had no mechanism on this site. Two are now mechanisms, not conventions:

- **`question:` in front matter** → the route labels the opening as **Quick answer** and puts the
  question above it, as an `<h2>` with `aria-labelledby`. The answer is not new text: the route has
  always split the body at the first `##` and rendered what precedes it first. What was missing was
  the question. `src/lib/content.ts` (the field), `src/app/blog/[slug]/page.tsx` (the block).
- **`related:` in front matter** → a hand-picked **Related reading** list of six to eight, resolved
  through `readingList()`, which goes via `postBySlug` — the **published** loader. That is deliberate
  and it is the same leak class SEO-3 found in the tools' further-reading block: a hand-written list
  naming a draft would be a crawl path into unreviewed content. A draft named there drops out.
  The automatic three-item "Read next" does not render beside it; one list, not two.
- **The category as an eyebrow above the H1** (block 1). Same string, moved one place earlier from
  the byline run beneath the title, which now drops it. Nothing is duplicated.

### Two deliberate departures from the reference pages

1. **The contents list comes after the quick answer, not before it.** Both cosecoffice pages put the
   list first. This site's route comment records why it was moved: on a phone that is 311px of
   navigation before a single word, and the opening paragraph — the whole point of answering the
   query in line one — started at y=766 on an 844px screen. A guard asserts the order.
2. **The mid-article panel sits in the reading column**, not inside the comparison table as
   cosecoffice's does. Exactly one of them, plus the closing panel — two in total, which is what both
   reference pages carry.

### Block 8, per page

<details>
<summary>The H2 sets</summary>

**1. static pool** — What a static pool answers that an NPA ratio does not · The three fields, and
what must be true of each · How the cohort table is laid out · Static pool is not a flow rate, and
not a bucket movement report · The day the arithmetic starts from · FAQ

**2. NPA** — The two directions, as entries · Where the double credit comes from · The arrears test on
the way up, and how strict it is · Why the statement and the trial balance legitimately differ · What
a system has to do, and what it must not pretend to do · Income reversal is not a provision, and not a
write-off · FAQ

**3. SMA** — The ranges, and where they come from · The date is fixed by the day-end process, not by
when somebody looked · Grace does not move the classification · SMA is a reported position, not a
dashboard colour · What a system must do, and what it must not pretend to do · FAQ

**4. CKYC** — What the Direction requires, and from when · The part a lending system usually gets
wrong · Aadhaar is the field to be careful with · CKYC is not credit bureau reporting, and not a KYC
check · What a system has to do, and what it must not pretend to do · FAQ

**5. KFS** — What the circular requires · The three omissions, with the arithmetic · Where the number
has to agree with itself · What an APR is not · What a system has to do, and what it must not pretend
to do · FAQ

**6. penal** — The rule, and the dates it bit on · Grace may reduce the charge. It may not move the
classification · Whose GST registration, and read as at when · Settlement order decides the outcome,
so it has to be a stated policy · The bounce, and why it is not a reversal · What a system has to do,
and what it must not pretend to do · FAQ

</details>

### Near-duplicate measurement — the reason these six were safe to write

`scripts/near-duplicate.mjs`, 8-gram Jaccard over the markdown body (front matter, fences and link
targets stripped), which is the same method SEO-3 used on the ten commercial pages.

**Baseline before writing**, 56 posts, 1,540 pairs:

```
worst pair: 0.0591   gold-loan-directions-2025 · gold-loan-management-software-nbfc
pairs above 0.05: 1 · above 0.10: 0 · above 0.15: 0
```

**After**, 62 posts, each new page against its closest neighbour anywhere on the site:

| New page | Closest neighbour | Jaccard |
|---|---|---|
| penal-charges-software-nbfc | penal-charges-not-interest | **0.0295** |
| sma-classification-software-nbfc | penal-charges-software-nbfc | 0.0139 |
| static-pool-analysis-software-nbfc | sma-classification-software-nbfc | 0.0134 |
| npa-income-reversal-software-nbfc | sma-classification-software-nbfc | 0.0107 |
| kfs-software-nbfc | penal-charges-software-nbfc | 0.0077 |
| ckyc-software-nbfc | kfs-software-nbfc | 0.0071 |

**The site's worst pair is still 0.0591 — the gold pair that was already there.** The six new pages
did not become this site's near-duplicate problem; the worst of them is at half that figure. Notably
`npa-income-reversal-software-nbfc` against the existing `npa-income-reversal` does not reach the top
of its own list, which is the pair I was most worried about.

---

## 3. What was published, and when the rest should go

**Published today, 13 October 2026:** the strongest two from §2.1 —
`static-pool-analysis-software-nbfc` and `npa-income-reversal-software-nbfc`. Both are in
`sitemap.xml`, both emit `index, follow`, and both have five contextual inbound sources.

**Held back, `draft: true`:** the remaining four. Verified in the build — out of the sitemap,
`noindex, nofollow`, still reachable at their own URL, and **zero** other HTML file in `out/`
mentions any of them.

### Proposed live dates — somebody has to flip these; nothing does it automatically

| Date | Page | What has to happen first |
|---|---|---|
| **Fri 17 Oct 2026** | `sma-classification-software-nbfc` | Three contextual inbound links. Candidates: `sma-classification-what-it-signals`, `irac-day-end-classification`, `bucket-movement-and-flow-rates`, `credit-information-reporting-2025` |
| **Tue 21 Oct 2026** | `ckyc-software-nbfc` | Three contextual inbound links. Candidates: `credit-information-reporting-2025`, `nbfc-digital-lending-guide`, `nbfc-compliance-checklist` (the last is itself in review — see below) |
| **Sat 24 Oct 2026** | `kfs-software-nbfc` | Three contextual inbound links. Candidates: `kfs-what-goes-in-the-apr`, `rbi-key-facts-statement`, `which-rate-goes-on-which-document`, `flat-rate-vs-reducing-balance` |
| **Wed 28 Oct 2026** | `penal-charges-software-nbfc` | Three contextual inbound links. Candidates: `penal-charges-not-interest`, `how-to-calculate-penal-charges-rbi-2024`, `dcb-reconciliation-why-it-stops-tying` |

Flipping one is editing `draft: true` to `draft: false` in its front matter. Everything else follows
from that one field — the sitemap entry, the robots tag, the listings — which is the §1(c) mechanism
SEO-3 built and which this sprint used rather than reimplemented.

**The guard will stop a premature flip.** `tests/site.test.ts` asserts that every **published** page
of this type has at least three distinct contextual inbound sources, so flipping one before its
inbound links exist turns CI red rather than quietly publishing an orphan. That is deliberate: SEO-4
§0's own evidence is that thirteen pages published into a domain with one external backlink were
crawled and declined.

**One dependency worth naming.** `nbfc-compliance-checklist` and the rest of the compliance cluster
are the seven pages awaiting Manoj's claim-level review (`REVIEW_PENDING_MANOJ.md`, from SEO-3). I
have **not** added a sentence to any of those seven, for the same reason as last sprint: inserting a
new claim into a page queued for review defeats the queue. If CKYC's third inbound link has to come
from the checklist, that link waits on the review.

---

## 4. Every regulatory citation used

Flat list, as §6.4 asks. This is the list to read rather than the pages.

| # | Claim | Source | Number | Date | Paragraph |
|---|---|---|---|---|---|
| 1 | An account is flagged overdue in the day-end process for the due date, whatever time that process runs | RBI clarification on IRACP norms | RBI/2021-2022/125, DOR.STR.REC.68/21.04.048/2021-22 | 12 Nov 2021 | **4** |
| 2 | Worked example: due 31 Mar 2021 → SMA-1 on day-end of 30 Apr → SMA-2 on 30 May → NPA on 29 Jun 2021 | same | same | same | **4** |
| 3 | SMA sub-categories: SMA-0 overdue up to 30 days; SMA-1 >30 and ≤60; SMA-2 >60 and ≤90 | same | same | same | **3** |
| 4 | For revolving facilities (cash credit / overdraft) the test is continuous excess over sanctioned limit or drawing power, and there is no SMA-0 | same | same | same | **3** |
| 5 | An NPA may be upgraded to 'standard' only if the **entire** arrears of interest and principal are paid | same | same | same | **10** |
| 6 | Penal charges are charges, not interest; "There shall be no capitalisation of penal charges i.e., no further interest computed on such charges" | RBI circular on fair lending practice — penal charges in loan accounts | RBI/2023-24/53, DoR.MCS.REC.28/01.01.001/2023-24 | 18 Aug 2023 | quoted in body |
| 7 | Commencement extended; fresh loans from 1 Apr 2024, existing loans at next review or renewal on or after 1 Apr 2024 and not later than 30 Jun 2024 | RBI circular extending the above | RBI/2023-24/102 | 29 Dec 2023 | — |
| 8 | The KFS must carry an APR computation sheet and a loan amortisation schedule; APR includes all charges levied by the regulated entity | RBI circular, Key Facts Statement (KFS) for Loans & Advances | RBI/2024-25/18, DOR.STR.REC.13/13.03.00/2024-25 | 15 Apr 2024 | **6** |
| 9 | Charges recovered on behalf of third parties are part of the APR and are additionally disclosed separately; receipts to be given for each payment within a reasonable time | same | same | same | **7** |
| 10 | Annex B's illustration on a hypothetical ₹20,000 retail loan gives an effective annualised rate of 17.07% | same | same | same | Annex B |
| 11 | APR is the annual cost of credit to the borrower, taking in the interest rate and all other charges | same | same | same | definition |
| 12 | NPA norm for applicable NBFCs stands changed to overdue more than 90 days, with a glide path whose final step was due by 31 Mar 2026 | Master Direction – RBI (Non-Banking Financial Company – Scale Based Regulation) Directions, 2023 | RBI/DoR/2023-24/106, DoR.FIN.REC.No.45/03.10.119/2023-24 | 19 Oct 2023 (updated 10 Oct 2024) | **14.2** |
| 13 | Regulated entities other than scheduled commercial banks upload CKYC data for all new individual accounts opened on or after 1 Apr 2017 (SCBs: 1 Jan 2017) | Master Direction – Know Your Customer (KYC) Direction, 2016 | RBI/DBR/2015-16/18, DBR.AML.BC.No.81/14.01.001/2015-16 | 25 Feb 2016, as amended | CKYCR provisions |
| 14 | Individual accounts opened before 1 Jan 2017 are uploaded at periodic updation, or earlier where updated KYC is received | same | same | same | same |
| 15 | Once the registry generates a KYC Identifier, the regulated entity must ensure it is communicated to the individual or legal entity | same | same | same | same |
| 16 | Where a customer supplies a KYC Identifier, the regulated entity retrieves the records online from the registry | same | same | same | **56** |
| 17 | Periodic updation at least once every two years (high risk), eight years (medium), ten years (low) | same | same | same | periodic updation |
| 18 | The CKYC amendments are issued under s.35A read with s.56 of the Banking Regulation Act, 1949 and Rule 9(14) of the PML (Maintenance of Records) Rules, 2005 | same | same | same | legal basis |
| 19 | An unregistered person may not collect GST on a supply | Central Goods and Services Tax Act, 2017 | — | — | **s.32** |
| 20 | The 2021 Directions govern transfer of standard assets and require ongoing risk disclosure to investors; a static pool is **not** a format they prescribe | Master Direction – RBI (Securitisation of Standard Assets) Directions, 2021 | RBI/DOR/2021-22/85, DOR.STR.REC.54/21.04.177/2021-22 | 24 Sep 2021 (updated 5 Dec 2022) | cited for what it does **not** require |

Items 1-5 and 8-11 were confirmed against the RBI's own notification pages today, including the
paragraph numbers. Items 12-18 were confirmed from RBI sources but see §5.

Row 20 is the one I want read carefully: the page cites those Directions **in order to say that
static pool reporting is not a requirement under them**. Writing it the other way round is the kind of
claim that is easy to make and expensive to defend, and the page says so in terms.

---

## 5. What I could not verify

Three categories, and nothing outside them.

### Absent from the codebase

| Item |
|---|
| A static pool / vintage report that can be run. N-18 exists in the catalogue as `GATED` with the reason recorded; the page says it is not offered |
| Any CKYC transmission to the registry, and any retrieval against a KYC Identifier. Both named as limits on the page |
| A `relatedLine`-style field for the §1.2 blocks on **product** pages. Not needed — this sprint added no product pages, and SEO-3 recorded why such a field is the forbidden paragraph in data form |

### Absent from this environment

| Item |
|---|
| **The exact CKYC upload timeline in days.** I searched RBI's site twice, including an extended search, and could not retrieve the text that fixes it. Per §1.3 the figure therefore **does not appear on the page** — the page gives the commencement dates and the periodic-updation cadence, which I did confirm. Worth Manoj confirming against the consolidated Master Direction before the page goes live on 21 Oct |
| **The current consolidated text of the SBR Directions 2023.** Search returned paragraph 14.2 (>90 days, with the glide path) and also a paragraph 14.3 still reading 180 days — almost certainly transitional text, but I could not reconcile them against the October 2024 consolidation. The SMA page therefore states the glide path and its 31 Mar 2026 final step and **tells the reader to confirm their own position against the current text rather than against this page** |
| **The verbatim text of RBI/2021-2022/125's paragraphs.** The notification page gave me the paragraph numbers and the substance; the PDF is behind an image-code challenge, which I did not attempt. Paragraph numbers 3, 4 and 10 and the worked example come from the HTML notification page |
| **Whether `deploy/nginx-cache.conf` is applied on the live host.** Unchanged from SEO-3; not touched here |

### Outside my own access

| Item |
|---|
| Search Console for either property. Every figure in §0 of the sprint is taken as given; I re-derived what the repo can re-derive and nothing more |
| Whether the two published pages get indexed. That is Google's queue, and §6 of SEO-3 forbids requesting indexing in any case |
| cosecoffice.com's repository or analytics. I read the two live pages for structure only |
| The decision on whether `best-loan-management-software-india` should keep naming competitors — above this sprint |

---

## 6. Anything in Section 0 my own measurement contradicted

**Three contradictions, and one of them changed the deliverable.**

### (1) §2.2's page already exists — load-bearing

Set out in §0(a). §2.2 reads as though the listicle has to be written; it was written on 12 August
2026 and it already does what §2.2 asks, including the "not a ranking" disclaimer. **This is why six
pages were delivered rather than seven**, and writing the seventh would have created the exact
cannibalisation SEO-3 measured. The sprint's own instruction — "If you finish early, improve the
seven; do not add an eighth" — is what I have followed in spirit by not adding a duplicate.

### (2) §1.2 block 9 describes a section the reference page does not have

§1.2 item 9 says "A disambiguation section. The MBP-1 page has 'DIR-8 is not DIR-2 and is not DIR-3
KYC.'" Reading the live page, that distinction is a **paragraph under the "What is DIR-8?" heading**,
not a section of its own. The sentence is there; the section is not.

I built it as a section anyway, on all six pages, because a named section is better for the purpose
and it is what §1.2 asks for in terms. Reporting it because §0 asks me to report disagreements, and
because somebody comparing my pages against the reference will notice.

### (3) §0's "nobody has written the page in the middle" is right about the shape and wrong about the pairing

The **page type** is genuinely new here — zero files carried any of its three new blocks. But the
site already had the artefact-plus-software pairing once, in the gold pages, and that pair is this
site's worst near-duplicate at 0.0591. §0 reads as though the middle ground is empty; it had one
occupant, and that occupant is the best available evidence that the six new pages were safe to write.
Set out with the numbers in §0(b) and §2.

### Confirmed, not contradicted

- **§0.1's "Blocked by robots.txt: `app.lenviq.in`" is correct and intended.** Verified live today:
  `https://app.lenviq.in/robots.txt` returns `User-agent: * / Disallow: /`. Nothing in this sprint
  touched `src/app/robots.ts`, so nothing here can have affected it.
- **§0.1's four "Redirect error" URLs are each exactly one 301 to the trailing-slash URL.** Re-checked
  live today on `/platform`, `/security`, `/compliance`, `/reports`. Unchanged, per SEO-3 §4.
- **§5's title-suffix defect does not exist on this site.** Already found and fixed; verified live.
  §0(c).

---

## 7. The gate, as run

Everything below was executed. Nothing in this report asserts behaviour I did not run.

```
typecheck                 clean
build                     0 errors, 133 HTML pages (was 127)
tests                     183 passed (was 176; +7 new guards)
sitemap                   124 locs (was 122; +2 published, 0 drafts)
draft leak                0 — no HTML file outside its own route mentions any of the four drafts
CI export check           no "not reviewed, not published", no lenviq.com
near-duplicate            worst pair on the site 0.0591, unchanged; worst new page 0.0295
src/app/robots.ts         untouched — app.lenviq.in unaffected
fintrustsuite             read only; `git status` there is clean
```

### The seven new guards, and the negative control on three of them

A guard nobody has watched fail is not a guard. Three of the seven were deliberately broken:

| Control | What I broke | What the guard did |
|---|---|---|
| Reading list resolves whole | Misspelt one slug in `kfs-software-nbfc`'s `related:` — `rbi-key-facts-statment` | **Failed**, naming it: "rbi-key-facts-statment did not resolve: expected 8, got 7" |
| No reading list names a draft | Put `ckyc-software-nbfc` (a draft) into a published page's `related:` | **Failed**: "name the page after it is published, not before" |
| Three contextual inbound sources | Removed three of the four inbound links to `static-pool-analysis-software-nbfc` and rebuilt | **Failed**, naming `/blog/static-pool-analysis-software-nbfc/` exactly |

All three restored; `content/` byte-identical afterwards; 183 passing again, and the inbound count
back to 5.

The fourth guard — that each page names what the software must not pretend to do — **failed on first
run without being broken on purpose**, on `npa-income-reversal-software-nbfc`. That page's first table
had a "What it must not do" column about the *ledger entries*, which is not the same device: it had no
column about what the software must not pretend. I added one (and the limits boundary on
recoverability) rather than loosening the guard. That is the correct direction for a guard that caught
a real gap, and it is the §1.4 device the sprint calls a house rule rather than a preference.

### One defect of my own, fixed on the way

`src/lib/content.ts`'s header comment still said a draft "has no route … and no way to be reached by
guessing the URL". That was true before SEO-3 reversed it and false afterwards — prose asserting
behaviour the code does not have, which is the defect this project has found three times, written by
me last sprint. The comment now states the current mechanism and records what it used to say and why
it changed.

**And a second instance of the same thing, found while reading the rendered output.** The blog
index's empty-state copy told the reader that drafts "are not built into this site". Same reversal,
same staleness. It is unreachable today — the branch renders only when nothing is published — but
unreachable wrong prose is still wrong prose, and it would have been read the first time somebody
emptied the index. It now says what is actually true: absent from the index, the sitemap and every
listing, and asking search engines not to list them.

---

## 8. Files changed

| File | What |
|---|---|
| `content/blog/static-pool-analysis-software-nbfc.md` | new, published |
| `content/blog/npa-income-reversal-software-nbfc.md` | new, published |
| `content/blog/sma-classification-software-nbfc.md` | new, `draft: true` |
| `content/blog/ckyc-software-nbfc.md` | new, `draft: true` |
| `content/blog/kfs-software-nbfc.md` | new, `draft: true` |
| `content/blog/penal-charges-software-nbfc.md` | new, `draft: true` |
| `src/lib/content.ts` | `question` and `related` fields, `readingList()`, stale header comment corrected |
| `src/app/blog/[slug]/page.tsx` | category eyebrow, Quick answer block, Related reading list |
| `scripts/near-duplicate.mjs` | new — 8-gram Jaccard over post bodies |
| `tests/site.test.ts` | seven new guards for the page type |
| `content/blog/bucket-movement-and-flow-rates.md` | one contextual link, inside an existing sentence |
| `content/blog/collection-efficiency-how-to-compute.md` | same |
| `content/blog/due-diligence-what-lenders-ask.md` | same |
| `content/blog/static-pool-analysis-how-to-build.md` | same |
| `content/blog/irac-day-end-classification.md` | same |
| `content/blog/nbfc-income-recognition-rbi-rules.md` | same |
| `content/blog/npa-income-reversal.md` | same |
| `content/blog/npa-upgrade-entire-arrears.md` | same |
| `docs/SPRINT_SEO4_REPORT.md` | this |

Eight existing posts were touched — **18 insertions, 8 deletions in total** — each by one link
inside a sentence that already made the point —
the §3.3 rule from SEO-3, which is also this sprint's §5 ("do not rewrite existing pages … link to
them"). No existing page's title, description or argument changed.

Nothing was written to `fintrustsuite`.
