# Overnight block — report

**Ran:** 9 October 2026, 07:41–08:20 IST. **Stopped at:** a section boundary, with §4's *deepening*
of existing pages the one piece not done. Everything before it in the brief's order is complete.

---

## 1. What landed, by section

| § | Work | State |
|---|---|---|
| 2 | Competitor research → `docs/COMPETITOR_MAP.md` | **done** |
| 3 | `docs/VOCABULARY_MAP.md` | **done** |
| 6 | Three compliance pages | **done**, drafts |
| 6.1 | NBFC registration and CoR | **done**, draft |
| 7 | Four specialist posts | **done**, published |
| 5 | Microfinance lender-type page | **done**, published |
| 6.2 | State money lending — **Tamil Nadu only** | **done**, draft |
| 4.1 | The H1 judgement call | **done** |
| 4 | *Deepening* the existing pages | **not done** — the stopping point |
| 8 | Linking, schema, sitemap, phone, verifiability | **done**, with one finding |

**14,540 words across nine posts**, plus one product page and two research documents. Five commits,
all pushed.

**Why §4's deepening was not reached and what I would do first:** it is seventh of eight in the
brief's own order, and everything above it was worth more. The one piece of it I did do was 4.1,
because it was a decision rather than a volume of writing. If I pick it up: `/loan-against-property-software/`
first — position 17.5 on 26 impressions is the worst ratio on the site and the only product page
ranking off the first page.

## 2. The competitor gap

**Where nobody is strong:**

- **Microfinance regulation.** This is the finding that most changes the plan. **allcloud's
  microfinance page — the strongest competitor's — has no regulation in it at all.** No 2022
  Directions, no household income assessment, no collateral-free requirement, no pricing
  disclosure, and it never says JLG. The rest are thinner. §5 was not a crowded entry; it was an
  empty one.
- **State Money-Lenders Acts.** pawnsoftware.in is the only content-led site in the segment and it
  is good — four calculators, licensing guides, a knowledge hub. But it covers the **Pawn Brokers**
  Acts, never the **Money-Lenders** Acts, and the word "registers" does not appear on it.
- **Tools.** Lenviq has ten working calculators. Across the whole competitor set: pawnsoftware has
  four, intelligrow lists some, nobody else has any. An existing advantage nobody was linking into.

**Where somebody is stronger, and how I routed around them:**

- **Lawrbit, Vinod Kothari and incorpx hold the compliance SERP** — not the software vendors. This
  is a correction to the brief, which says of the compliance cluster "nobody else on that competitor
  list can match": true of the list, and the list is not who ranks. Lawrbit's calendar was updated
  May 2026 and is genuinely good. Kothari has the better practice, full stop. **And cloudbankin
  already publishes "Navigating Through The NBFC Compliance Filings & Returns"** — one competitor is
  already here.
- **The route around is currency, not craft.** The authoritative text is the Master Direction — RBI
  (Filing of Supervisory Returns) Directions, **2024**, which repealed the 2016 NBFC Returns
  Directions and harmonised every timeline. Almost nothing ranking is built on it: Kothari's indexed
  checklist is FY 2021-22, one calendar cites 2008–2010 circulars, the RBI annex still surfacing in
  search is dated 2007, and two filing vendors contradict each other on DNBS02 because both describe
  the pre-2024 position. We are not writing a better-phrased checklist than Lawrbit. We are writing
  a current one.
- **allcloud** holds `nbfc software` and every loan-type slug with real certifications and ratings.
  Not contested on features.
- **pawnsoftware.in** owns pawn/girvi/jewel-loan vocabulary. Not contested; the Money-Lenders gap
  taken instead.

## 3. Claims list — every capability claim, with its file

The microfinance page is the only new page making capability claims. Each section of
`src/lib/products/microfinance.ts` carries an `evidence` array; this is the substance of it.

| Claim | File in `fintrustsuite` |
|---|---|
| One sanction decision becomes N loan accounts | `src/lib/repos/mfi-group-loans.ts` — `proposeGroupLoan` → `groupLoanPreflight` → `submitGroupLoan` → `decideGroupLoan` → `executeGroupLoan` → `releaseGroupDisbursements` |
| Each member gets an ordinary loan account with its own schedule and scheme snapshot | `tests/mfi-group-loan-origination.test.ts` — "and what each member got is an ORDINARY loan account" |
| Preflight names every member-level blocker before a checker sees the list | `mfi-group-loans.ts:348-378` |
| Origination refused where no household income assessment is on file | `mfi-group-loans.ts:371` |
| Bureau enquiry **and** recorded consent required per member | `mfi-group-loans.ts:373-374` |
| KYC verification required before disbursement | `mfi-group-loans.ts:350` |
| Four eyes applies once, to the group, and is not relaxable to self-approval | `src/lib/policy/approval-policy.ts` — `GROUP_LOAN_SANCTION` |
| JLG schemes seeded at provisioning (weekly/50, fortnightly/26, monthly/24, fixed-instalment) | `src/lib/platform/mfi-pack.ts:53-91` |
| Centre → group → member hierarchy with meeting day and officer | `prisma/schema.prisma` — `MfiCentre`, `MfiGroup`, `MfiGroupMember` |
| Failure is per member, not per round | `mfi-group-loans.ts` — `executeGroupLoan` returns `originated` and `failed` |
| Demand sheet for a centre meeting | `src/lib/repos/mfi-demand-sheet.ts` |
| One DPD engine, no per-product branch | `src/lib/lms/dpd.ts`; `CLAUDE.md` LMS hard rule 19 |
| `NBFC_MFI` and `SECTION_8_MFI` are provisioned regimes | `prisma/schema.prisma:289-296` |

**Claimed nowhere, because it is not implemented:** the 50%-of-household-income cap. There is no
repayment-capacity arithmetic against household income anywhere in `src/lib`; the only trace is a
comment explaining why the income figure is collected. `maxFoir`/`maxDbr` exist on the scheme master
and are a general underwriting ratio — conflating them with the Directions' household cap would be
the exact dishonesty §1.1 forbids. The page says so in the compliance section **and** in the FAQ.

**Nothing is unverified.** Both repositories were available and every capability sentence on the new
page names a file.

**One claim left out for lack of verification:** whether centre-meeting *attendance* is captured per
meeting. The centre record carries a meeting day; whether attendance is recorded against each
meeting — which is what a lender would read "centre meetings" to mean — I did not confirm, so the
page does not say it.

## 4. Regulatory statements and their sources

**Read from RBI's own pages:**

| Statement | Source |
|---|---|
| Supervisory returns: scope, repeal of the 2016 Directions, and the full periodicity → timeline table | Master Direction — RBI (Filing of Supervisory Returns) Directions, 2024; RBI/DoS.DSG/2023-24/110 and DoS.DSG.No.10/33.01.001/2023-24; **27 Feb 2024** |
| 50-50 principal business test; NOF ₹10 crore w.e.f. 1 Oct 2022; existing NBFCs to 31 Mar 2027; ₹300 crore IFC, ₹20 crore HFC; PRAVAAH application; exemptions incl. Nidhi, chit companies, SEBI/IRDA entities; Unregistered Type I carve-out | RBI FAQ, *All you wanted to know about NBFCs*, **updated 15 Sep 2026** |
| SBR framework, in supersession of the 2016 NBFC-NSI and NBFC-SI directions | Master Direction — RBI (NBFC — Scale Based Regulation) Directions, 2023; RBI/DoR/2023-24/106, DoR.FIN.REC.No.45/03.10.119/2023-24; **19 Oct 2023**, updated **17 Jul 2025** |
| Microfinance: paras 3.1, 3.3, 4.1, 4.3, 5.1, 5.2, 6.1, 6.2, 6.7, 6A.2, 6A.4, Annexes I and II | Master Direction — RBI (Regulatory Framework for Microfinance Loans) Directions, 2022; RBI/DOR/2021-22/89, DoR.FIN.REC.95/03.10.038/2021-22; **14 Mar 2022**, effective 1 Apr 2022, updated **17 Jul 2025** |
| NBFC KYC Directions, 2025, and the CKYCR amendment to para 63 | RBI/DOR/2025-26/361, **28 Nov 2025**; amended RBI/2025-26/160, **29 Dec 2025** |
| Day-end classification; upgrade only on entire arrears | RBI/2021-2022/125, DOR.STR.REC.68/21.04.048/2021-22, **12 Nov 2021** |

**Read from the Act itself** (PDF obtained, text decompressed from its streams and read directly):
Tamil Nadu Money-Lenders Act, 1957 (TN Act XXVI of 1957) — ss. 3(1), 3(2), 3(3), 5, 6, 7(1) as
substituted by s.4 of TN Act 41 of 1979, 7(2), 7(3), 9(1)(a)–(d), 9(2), 14, 14(2-A), 14(3), 15, 16,
17.

**Read from a verbatim reproduction rather than RBI's own PDF — flagged on every page that uses it:**
Annex III of the 2024 Directions, i.e. the return list, its coverage descriptions and the
applicability thresholds. It agrees with the primary page everywhere the two overlap. Each page tells
the reader to open Annex III before relying on a threshold.

### Flagged as unverified or possibly stale — and this list is the point

1. **The interim NOF milestone** (₹5 crore by 31 Mar 2025 for NBFC-ICCs). Secondary sources disagree
   on the NBFC-Factors equivalent. The ₹10 crore endpoint and the March 2027 date **are** from RBI's
   FAQ; the interim step is not.
2. **Whether the 2025 NBFC KYC Directions expressly repealed the 2016 NBFC KYC direction.** The
   equivalent commercial-bank repeal on the same date is clearly documented; the NBFC one I could not
   confirm from primary text.
3. **The CIC reporting cadence.** Tightened by RBI in 2024; not verified here, so no date is printed
   on either page. This is the line most often stale in circulating calendars.
4. **CoR processing timeline.** RBI publishes none. None is stated.
5. **NOF / CRAR / layer-placement criteria** are deliberately **absent** from the checklist. They are
   in the SBR Directions PDF, which I did not read. A wrong capital figure in a compliance checklist
   is worse than an absent one.
6. **The Tamil Nadu Act text carries amendments only to the early 1980s.** Later amendments, the
   current notification fixing the rate under s.7(1), and the Money-Lenders Rules 1959 (which hold
   every prescribed form, the pass-book and the return timing) all need checking.

**And the Tamil Nadu finding worth knowing even if the page never ships:** the interest ceiling is
**not in the Act**. s.7(1) says the Government fixes it by notification, correlated to RBI's bank
rates. Every guide quoting a percentage "under the Act" is quoting a notification without its date,
or the pre-1979 position.

## 5. The §4.1 decision

**Keep the literary H1; add a plain confirming sub-head — but only on the pages whose H1 does not
already confirm.**

The brief treats the literary H1 as a property of "the product pages". Reading them, it is a
property of **four of the six**. `business` opens "Business loan software, for borrowers that are not
people" and `cashcredit` opens "Cash credit and overdraft, where there is no instalment to miss" —
both name the thing in their first three words. Putting a confirming line under a confirming H1 is
duplication a reader notices.

So `subhead` is optional, set on vehicle, LAP, gold, personal and the new microfinance page, unset on
the other two. Titles and meta descriptions untouched, per §0.

**Not oversold:** this affects bounce, not CTR, and the evidence that it is needed is an inference
about reading behaviour rather than a measurement. It is the smallest change that answers "am I in
the right place".

## 6. Pages written

| URL | Title | Meta description | H1 | Target vocabulary | Words | State |
|---|---|---|---|---|---|---|
| `/blog/nbfc-compliance-checklist/` | NBFC compliance checklist: what is required, by how often it is required | NBFC compliance checklist by frequency — weekly, monthly, quarterly, annual. Each item with its RBI direction and date, built on the 2024 Returns Directions. (157) | *(title)* | nbfc compliance checklist | 2,033 | **draft** |
| `/blog/nbfc-compliance-calendar/` | NBFC compliance calendar: what falls due in each month, and where the date comes from | NBFC compliance calendar: month-by-month DNBS filing dates, derived from the 21-day quarterly rule in the RBI Supervisory Returns Directions, 2024. (147) | *(title)* | nbfc compliance calendar | 1,561 | **draft** |
| `/blog/rbi-returns-for-nbfcs/` | RBI returns for NBFCs: which return, who files it, and what each one is built from | DNBS01 to DNBS14, FMR and SAC returns: who files each one, the layer and asset-size thresholds, and the due dates under the 2024 Returns Directions. (148) | *(title)* | rbi returns for nbfc | 1,574 | **draft** |
| `/blog/nbfc-registration-and-cor/` | NBFC registration and the Certificate of Registration: what RBI requires, and what changes the day it arrives | NBFC registration under section 45-IA: the 50-50 test, the Rs 10 crore Net Owned Fund, the PRAVAAH application, who is exempt, and what the CoR starts. (151) | *(title)* | nbfc registration, nbfc cor | 1,699 | **draft** |
| `/blog/tamil-nadu-money-lending-licence/` | The Tamil Nadu money lending licence: what the Act requires, and where the interest ceiling actually lives | Tamil Nadu Money-Lenders Act 1957: who needs a licence, the records and returns required by section 9, and why the interest ceiling is set by notification. (155) | *(title)* | money lending licence tamil nadu | 1,846 | **draft** |
| `/blog/static-pool-analysis-how-to-build/` | How to build a static pool, and the three choices that change the answer | How to build a static pool analysis for a loan book: choosing the cohort, the numerator and the measurement point, and reading the resulting curve. (147) | *(title)* | static pool analysis, static pool in nbfc | 1,705 | live |
| `/blog/dcb-reconciliation-why-it-stops-tying/` | DCB reconciliation: the seven reasons demand, collection and balance stop tying | DCB reconciliation for a loan book: why opening + demand - collection does not equal closing, and the seven postings that break the identity. (141) | *(title)* | dcb reconciliation | 1,531 | live |
| `/blog/collection-efficiency-how-to-compute/` | Collection efficiency: how one book gives four different numbers, all of them honest | Collection efficiency computation: current, cumulative, billing and gross definitions, why they differ by twenty points, and which one to report. (145) | *(title)* | collection efficiency meaning | 1,302 | live |
| `/blog/bucket-movement-and-flow-rates/` | Bucket movement and flow rates: reading a delinquency matrix instead of a bucket chart | Bucket movement matrix and flow rates: how to build one from month-end positions, computing roll and cure rates, and why a bucket chart cannot predict NPA. (155) | *(title)* | flow rate, delinquency bucket movement | 1,289 | live |
| `/microfinance-software/` | Microfinance software for NBFC-MFI and Section 8 lenders | JLG and group loan software built to the 2022 Microfinance Directions: one sanction becomes N loan accounts, with the household income assessment and the bureau consent enforced per member. | One approval for the centre. An ordinary loan account for each member. | microfinance software, JLG, group loan | ~2,170 | live |

Blog posts use the post title as the `<h1>`; the table marks that *(title)*.

## 7. Drafts, sitemap and the phone number — confirmed from a build

`npm run build` → **114 pages**.

- **All five drafts:** no `index.html` built, and `grep` of `out/sitemap.xml` returns **0** for each.
  `draft: true` works by filtering in `publishedPosts()`, which is the only loader the post route and
  `sitemap.ts` use. Published count unchanged at 41 before and after.
- **`/microfinance-software/`** is built and is in the sitemap.
- **The phone number `+91 96641 46595` appears on all 114 built pages — zero missing.** The footer
  occurrence carries no responsive-hiding class, so it is on mobile too.
- The suite's build-dependent tests had been running against a **stale** `out/`; they now run against
  current output. **171/171 pass.**

**Verifiability — one finding.** Legal name, CIN and registered office are in the footer and
guarded by tests (the CIN must be well-formed *and* match the legal documents). **GSTIN is
deliberately absent**: `org-jsonld.tsx` records that the CIN and registered office are confirmed in
the legal documents and the GSTIN is not, so `taxID` stays out, and a test asserts the About page
does not carry it. The brief asks me to confirm GSTIN is present. It is absent by design — your call,
not mine.

## 8. Decisions taken under Decision Authority

1. **One state page, not three.** Tamil Nadu, from the Act itself. Kerala and West Bengal skipped —
   not for time, but because I could not obtain and verify their primary text, and a state page
   published under your name built from secondary summaries is the thing the brief warns about. One
   verified beats three inferred.
2. **The four specialist posts were chosen on a finding**: the terms already winning (`static pool`
   2.7, `collection efficiency` 10.8) are *mentions* inside one omnibus post. Three of the four give
   a winning term its own page; the fourth takes `flow rate`, which the site does not contain.
3. **Compliance pages are blog markdown, not bespoke routes** — it is reference content, and it gets
   the draft mechanism for free.
4. **§4.1 as above** — subhead on five pages, not seven.
5. **`ProductSpec.shots` made optional, and the microfinance page ships without screenshots.** The
   capture set has no group-loan screen. `approvals-inbox` shows Loan Against Property files of
   ₹66–97 lakh — wrong asset class on a microfinance page. `field-collect` carries a borrower name, a
   ward-level address and a phone number. Reusing either would cost more credibility than the missing
   image does. `docs/SHOTS_WANTED.md` records what the page wants.
6. **Microfinance registered in `PRODUCTS`** so the sitemap and Platform page pick it up, with a note
   that it is a **lender type** and not an asset class, and that the taxonomies should be separated if
   a second lender-type page is written.
7. **FAQ blocks added to the four compliance drafts** although nothing tests them while they are
   drafts — the structural test runs on published posts, so the suite would have gone red the day you
   published them.
8. **The priority-1 list in the suite was extended, not relaxed**, for the new commercial page.

## 9. Honesty

**Things I got wrong and the repo caught:** the test suite found **six** real defects in my work
across two sections — three meta descriptions over 160 characters, three section headings of four
words that named nothing, and all four new posts missing the FAQ block that emits `FAQPage`. I would
have shipped all six.

**A claim of yours that turned out wrong.** §5 says the microfinance page proves itself on "the
2022 Directions and the 50%-of-household-income cap". The product does not compute or enforce that
cap. The page says the assessment is *required and origination refused without it*, which is true and
smaller.

**A claim of yours that was incomplete rather than wrong.** §6's "nobody else on that competitor list
can match" is true of the list and the list is not who ranks for those terms. The real incumbents are
compliance-service sites, one of them good and one of them a better practice than any vendor's. The
plan survives; its justification changed from *nobody can write this* to *nobody has updated it since
February 2024*.

**And one of yours that was exactly right, against my prior:** §0's instruction not to spend the
night on title tags. I would have started there.

**Worked around:** the RBI Master Directions page does not reproduce Annex III, so the return list
came from a verbatim reproduction. Flagged on all three pages rather than quietly used.

**An environment limit, not a product one:** no microfinance screenshots, because the product UI is
behind host routing and TOTP from here and there is no capture script in this repo. The screens
exist.

**Two pre-existing things I did not touch and you should look at:** the `field-collect` screenshot
carries a phone number (`9863627094`) on a public marketing site, and loan numbers in the shots carry
a `UDR/` prefix that reads like a tenant code. Also `shots.json` records a route but not the tenant
or state, so no shot can be reproduced exactly — the stale-screenshot failure the brief names.

## 10. What I would have asked

1. **`/nbfc-software` does not exist.** Five competitors have a page at that slug; it is the most
   contested term in the segment and the one the site is already nearest to ranking for. It is
   outside the brief's section list and it is the most obvious missing door. Build it?
2. **Does `UDR` name a live tenant?** It decides whether the existing screenshots need recapturing or
   just a glance.
3. **GSTIN** — absent by design because it is not in the legal documents. Add it, or leave the
   design as it is?
4. **Kerala and West Bengal** — worth the time to obtain the Acts properly, or is Tamil Nadu enough
   to test whether this content converts at all?
5. **The specialist posts went live without your review.** The compliance cluster ships as drafts by
   instruction; §7's posts carry no regulatory claim that was not already sourced on the site, so I
   published them. If you would rather all new writing waited for you, say so and I will flip them.
