---
title: "Static pool analysis: the fields a lending system has to freeze before the table can exist"
description: "A cohort table is arithmetic, and the arithmetic is the easy half. What decides whether an NBFC can produce a static pool at all is whether three things were recorded at disbursement and never rewritten — and most systems rewrite at least one of them."
metaDescription: "A static pool is only as good as what the system froze at disbursement. The three fields it needs, and why month-end position is the one that breaks."
question: "What is static pool analysis, and what does an NBFC need to produce one?"
date: "2026-10-13"
category: "Reporting"
author: "CS Sushil Choudhary"
related: "static-pool-analysis-how-to-build, collection-efficiency-how-to-compute, bucket-movement-and-flow-rates, dcb-reconciliation-why-it-stops-tying, irac-day-end-classification, sma-classification-what-it-signals, due-diligence-what-lenders-ask, nbfc-provisioning-worked-examples"
draft: false
---

Static pool analysis fixes a group of loans at the moment they were disbursed and then follows only
that group as it ages — month one, month two, month twelve — without ever letting a later
disbursement into it. It answers a question a portfolio NPA ratio cannot: *is the lending we are
doing now better or worse than the lending we did last year?* A growing book hides deteriorating
credit, because fresh loans are not yet overdue and they enlarge the denominator. A static pool has
no denominator to grow.

The arithmetic is simple enough to do in a spreadsheet. What decides whether an NBFC can produce the
table at all is whether three things were written down at disbursement and never rewritten since.
Most lending systems rewrite at least one of them, and the rewrite is silent.

## What a static pool answers that an NPA ratio does not

Take a lender who disbursed ₹50 crore in FY 2024-25 and ₹120 crore in FY 2025-26, and whose gross
NPA has held steady at 3%. The steady ratio is consistent with two completely different stories: the
new book is performing exactly like the old one, or the new book is much worse and is being masked by
its own size. Only a cohort view separates them, because it asks how the 2024-25 loans were doing at
twelve months on book and compares that with how the 2025-26 loans are doing at twelve months on
book — the same age, measured twice.

This is why acquirers and rating agencies ask for static pool data in diligence on a portfolio sale
or a co-lending arrangement, and why a lender who cannot produce it is at a disadvantage in that
conversation. It is not, on its own, a regulatory return. The Reserve Bank's
[Master Direction – Reserve Bank of India (Transfer of Loan Exposures) and (Securitisation of
Standard Assets) Directions, 2021](https://www.rbi.org.in/Scripts/NotificationUser.aspx?Id=12165&Mode=0)
(RBI/DOR/2021-22/85, DOR.STR.REC.54/21.04.177/2021-22, dated 24 September 2021, updated
5 December 2022) governs what may be transferred and what must be disclosed to investors on an
ongoing basis; the cohort table is the form in which a buyer's credit team wants the history, not a
format the Directions prescribe. Writing it the other way round — "RBI requires static pool
reporting" — is a claim worth not making.

## The three fields, and what must be true of each

| What the table needs | What the system has to do | What it must not pretend to do |
|---|---|---|
| **A cohort key that never moves** — the disbursement month, fixed at first disbursement | Record the first disbursement date as an event and derive the cohort from it, so a restructuring, a renewal or a top-up cannot silently move a loan into a newer cohort | Treat the sanction date, the agreement date or the account-opening date as the cohort. They differ from first disbursement by days to months, and a cohort built on the wrong one mixes vintages |
| **A position for every loan at every month end**, whether or not anything happened that month | Write a row per loan per month end and keep it — outstanding, overdue, classification, days past due — because a cohort table reads the past and the live record only knows today | Reconstruct the position by replaying transactions at report time. It is slower, it disagrees with itself whenever a rule changes, and it cannot show what the lender actually reported at the time |
| **A classification history that is append-only** | Keep the classification an account carried on each month end as a record of its own, so SMA-1 in April and NPA in June are both still readable in October | Store one current classification and overwrite it. The field a vintage curve plots is precisely the one that gets overwritten |
| **Disbursed amount as at the cohort date** | Hold the amount actually paid out, separately from sanctioned and from current outstanding | Use the sanctioned amount. A part-disbursed loan then enters the pool at a size that never existed |

The third row is the one that catches lenders out. A system that holds `classification = 'NPA'` on
the loan record has thrown away the answer to "what was this account in March?", and no amount of
reporting cleverness recovers it. The same is true of days past due: it is a number that is correct
for one date only, which is why a historical reading of it has to be rebuilt from dated receipts
rather than read off a status field.

## How the cohort table is laid out

One row per cohort, one column per month on book, and one measure in the cells. Conventionally:

| Cohort | Disbursed | MOB 3 | MOB 6 | MOB 12 | MOB 18 |
|---|---|---|---|---|---|
| Apr 2024 | ₹4.2 cr | 0.4% | 1.1% | 2.3% | 2.9% |
| Jul 2024 | ₹5.6 cr | 0.5% | 1.4% | 2.8% | — |
| Oct 2024 | ₹6.1 cr | 0.9% | 2.2% | 4.1% | — |
| Jan 2025 | ₹7.8 cr | 1.3% | 3.0% | — | — |

Read down a column, not across a row. Down MOB 6, the number goes 1.1, 1.4, 2.2, 3.0 — four cohorts
at the same age, each worse than the one before it. That is a credit trend, and it was visible from
the October 2024 cohort onwards, roughly a year before a portfolio ratio would have moved enough to
argue about.

The cells are usually cumulative: the share of the cohort's disbursed value that has been overdue
beyond a chosen threshold at any point up to that age, rather than the share overdue on that date. A
cumulative measure does not fall when a borrower cures, which is the point — a loan that went 90 days
down and recovered still tells you something about the underwriting that approved it.

**The measure has to be stated on the page.** "2.3%" means nothing until the reader knows whether the
denominator is disbursed value or loan count, whether the numerator is 90-plus or 30-plus, and whether
it is cumulative or point-in-time. Three defensible choices, eight combinations, and a table that does
not say which one it used is a table nobody can act on.

## Static pool is not a flow rate, and not a bucket movement report

These three get used interchangeably and they answer different questions.

- A **static pool** follows one disbursement cohort as it ages. The question is *underwriting*:
  did we lend better this quarter than last?
- A **[bucket movement or flow rate](/blog/bucket-movement-and-flow-rates/)** report follows the
  whole book between two dates and asks what share of each delinquency bucket moved forward,
  backward or stayed. The question is *collections*: how leaky is the funnel right now?
- **[Collection efficiency](/blog/collection-efficiency-how-to-compute/)** divides what was
  collected by what was demanded in one period. The question is *this month*.

A lender with deteriorating static pools and stable flow rates has an underwriting problem.
Stable pools and worsening flow rates is a collections problem. The two reports disagreeing is
information, and a system that produces only one of them has thrown that information away.

## The day the arithmetic starts from

A cohort table is built on days past due, and days past due is built on a due date and a day-end
process, not on when somebody looked. Paragraph 4 of the Reserve Bank's clarification on IRACP
norms ([RBI/2021-2022/125,
DOR.STR.REC.68/21.04.048/2021-22](https://www.rbi.org.in/Scripts/NotificationUser.aspx?Id=12194&Mode=0),
dated 12 November 2021) requires a borrower account to be flagged as overdue as part of the day-end
process for the due date itself, whatever time that process runs. The same paragraph works the
example through: a due date of 31 March 2021 unpaid at that day's end is overdue from 31 March, is
tagged SMA-1 on running the day-end process of 30 April, SMA-2 on 30 May, and becomes a
non-performing asset on 29 June 2021.

That matters to a static pool because it fixes the dates the cells are cut on. A system that flags
overdue the next morning, or that classifies on a month-end job rather than a daily one, produces a
cohort table whose every number is a day or more out — consistently, and invisibly. It is the same
day-end basis that
[decides the classification in the first place](/blog/irac-day-end-classification/).

## Frequently asked questions

### How many months on book does a static pool need before it says anything?

Enough for the cohort to have been exposed to the risk being measured. For a 90-plus measure, a
cohort needs at least four or five months on book before a non-zero number is even possible, and
twelve before a comparison across cohorts is worth arguing about. Cohorts younger than that belong in
the table, with blank cells, so that nobody reads an empty cell as a zero.

### Should the cohort be the disbursement month or the sanction month?

Disbursement, and specifically first disbursement. Credit risk begins when money leaves the lender,
not when a committee approves. A sanction that was never drawn carries no risk and should not be in a
pool at all.

### What happens to a loan that is restructured or topped up?

It stays in its original cohort. The whole premise is that a cohort is fixed at origination, so an
event in year two is something that happened *to* the cohort and not a reason to move the loan out of
it. A top-up that is a new loan is a new loan, and enters the cohort of the month it was disbursed in.

### Does a static pool replace the NPA ratio?

No. The NPA ratio is the regulatory and provisioning figure for the book as it stands, and it is what
[provisioning is computed on](/blog/nbfc-provisioning-worked-examples/). A static pool is a
management and diligence view of underwriting quality over time. They are different questions and a
lender needs both.

### Where does Lenviq stand on this?

The data a static pool needs is what the platform records: first disbursement is an event with its own
date, classification changes are appended rather than overwritten, and days past due is derived from
dated due events and dated receipts. The vintage report that assembles those into the cohort table is
specified in the report catalogue and is **not yet offered** — it waits on the nightly position
snapshot described in the second row of the table above. Saying otherwise would be the exact thing
this page argues against.
