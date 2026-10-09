---
title: "Bucket movement and flow rates: reading a delinquency matrix instead of a bucket chart"
description: "A bucket chart says how many accounts are in each ageing band. A movement matrix says where they came from, which is the only version that predicts anything. How to build one, and the roll rate it produces."
metaDescription: "Bucket movement matrix and flow rates: how to build one from month-end positions, computing roll and cure rates, and why a bucket chart cannot predict NPA."
date: "2026-10-09"
category: "Operations"
author: "CS Sushil Choudhary"
tool: "npa-date-calculator"
draft: false
---

Almost every lending MIS carries a bucket chart: so many accounts in 0–30, so many in 31–60, so many
at 90+. It is a **stock** statement, and it has a specific blind spot — two books with identical
bucket charts can be heading in opposite directions, and the chart cannot tell them apart.

What distinguishes them is **flow**: not how many accounts are in 31–60, but how many *arrived* there
from 0–30 versus how many *fell back* from 61–90, and how many left for current. That is a movement
matrix, and it is the only form of this analysis that forecasts.

## Why the stock view cannot work

Two books, same month-end chart:

| Bucket | Book A | Book B |
|---|---|---|
| Current | 900 | 900 |
| 1–30 | 60 | 60 |
| 31–60 | 25 | 25 |
| 61–90 | 10 | 10 |
| 90+ | 5 | 5 |

Identical. Now the movement:

- **Book A**: of last month's 1–30, 45 cured to current and 15 worsened. The 31–60 bucket filled from
  a smaller inflow than last month.
- **Book B**: of last month's 1–30, 10 cured and 50 worsened. The bucket is the same size because a
  fresh wave of current accounts fell into it.

Book A is improving. Book B is in the early part of a deterioration that will reach 90+ in three
months. **The chart is the same. The books are not.**

## Building the matrix

You need each account's bucket at **two consecutive month ends** and nothing else. Rows are the
starting bucket, columns the ending bucket, cells the count or value that moved.

|  From ↓ / To → | Current | 1–30 | 31–60 | 61–90 | 90+ | Closed |
|---|---|---|---|---|---|---|
| **Current** | 880 | 55 | — | — | — | 15 |
| **1–30** | 45 | 8 | 15 | — | — | 2 |
| **31–60** | 6 | 4 | 7 | 12 | — | 1 |
| **61–90** | 1 | — | 2 | 3 | 8 | — |
| **90+** | — | — | — | — | 14 | 3 |

Four properties this has that the chart does not:

- **Everything above the diagonal is deterioration**, everything below is cure, the diagonal is
  stasis.
- **Rows sum to last month's bucket**, columns sum to this month's. If they do not, something left
  the book without being recorded as closed, and that is a data question not a credit one.
- **Skips are visible.** An account cannot go from Current to 31–60 in one month if the buckets are
  monthly — if a cell above the first off-diagonal is populated, your bucketing and your month-end
  spacing disagree.
- **Closure is a column, not a disappearance.** Foreclosed, written-off and settled accounts leave,
  and lumping them with cures is the most common way a matrix flatters.

## Roll rate, cure rate, and the forward estimate

**Roll rate** — the share of a bucket that worsened:

> roll rate (1–30) = moved to 31–60 or beyond ÷ opening 1–30

Here: 15 ÷ 70 = **21.4%**

**Cure rate** — the share that improved:

> cure rate (1–30) = moved to Current ÷ opening 1–30

Here: 45 ÷ 70 = **64.3%**

**Net flow into 90+** — the number that actually matters, because 90+ is where classification bites:

> inflow to 90+ − outflow from 90+

Here 8 in, 0 cured out, 3 closed = net **+5**.

**And the forward estimate.** Chain the roll rates and you get an expectation of 90+ three months
out:

> 1–30 → 31–60 → 61–90 → 90+

With roll rates of 21.4%, then (12 ÷ 29) = 41.4%, then (8 ÷ 11) = 72.7%, today's 1–30 population of
63 projects roughly 63 × 0.214 × 0.414 × 0.727 ≈ **4 accounts** reaching 90+ in three months, before
any new inflow.

That is a forecast a bucket chart cannot produce at all, and it is built from two month-end
snapshots.

## The three ways a matrix misleads

**Rates computed on a tiny bucket.** A 61–90 bucket with 11 accounts gives a roll rate quantised in
9-point steps. Report the denominator next to every rate or the precision is fictional.

**Value and count disagreeing.** Run both. If the count roll rate is 20% and the value roll rate is
45%, the deteriorating accounts are the large ones — a different problem with a different response,
and the count-only matrix hides it entirely.

**Restructuring and re-ageing.** An account restructured in the month may move to Current without a
rupee arriving, and it will sit in the cure column looking like a collections success. Tag them and
show them as their own column. A matrix where restructuring is invisible overstates cure by exactly
the restructured population.

## The retention requirement, which is the actual obstacle

A movement matrix needs each account's bucket **as it stood at each month end**, retained. Not
recomputed.

Asset classification and overdue status are computed in the **day-end process** for the relevant
date ([RBI/2021-2022/125](https://www.rbi.org.in/Scripts/NotificationUser.aspx?Id=12194&Mode=0),
12 November 2021), and an NPA upgrade requires the **entire arrears** to be cleared. So a bucket
re-derived today from current balances will not reproduce the bucket that existed then —
particularly on any account that took a backdated receipt, where the position was computed on a
principal the receipt has since changed.

**The practical test:** re-run last month's matrix. If the row sums no longer match the bucket chart
you circulated last month, your positions are being derived and not retained, and every rate above
is being computed against a denominator that moves. [Why that happens](/blog/irac-day-end-classification/).

## Where it sits among the other three

- **Collection efficiency** is a period cash measure — [four definitions, four
  answers](/blog/collection-efficiency-how-to-compute/).
- **Static pool** is a cohort credit measure — [how to build
  one](/blog/static-pool-analysis-how-to-build/).
- **DCB** ties the borrower's arrears to the ledger — [why it stops
  tying](/blog/dcb-reconciliation-why-it-stops-tying/).
- **Bucket movement** is the only one of the four that is **predictive**, and the only one that
  answers "what happens next quarter if nothing changes".

Diligence asks for all four because each defeats a different flattery —
[what each request is designed to catch](/blog/due-diligence-what-lenders-ask/).


## Frequently asked questions

### What does a movement matrix show that a bucket chart does not?

Direction. Two books with identical bucket charts can be moving opposite ways: one where most of the
1-30 population cured and one where it was replaced by a fresh wave falling out of current. The
stock view cannot distinguish them; the matrix shows cure below the diagonal and deterioration above
it.

### How is a roll rate computed?

The share of a bucket's opening population that worsened — accounts that moved to the next bucket or
beyond, divided by the opening population of the bucket. Report the denominator alongside it: a roll
rate on a bucket of eleven accounts is quantised in nine-point steps, and the decimal places are
fictional.

### Can roll rates be used to forecast NPA?

Chained across consecutive buckets, they give an expectation of how much of today's early
delinquency reaches 90+ in three months, before any new inflow. That is the one genuinely predictive
output of the four standard portfolio analyses.

### Why must restructured accounts be shown separately?

A restructured account can move to current without a rupee arriving, and it then sits in the cure
column looking like a collections success. A matrix where restructuring is invisible overstates cure
by exactly the restructured population.

---

**Related:** [SMA classification and what it signals](/blog/sma-classification-what-it-signals/) ·
[How to build a static pool](/blog/static-pool-analysis-how-to-build/) ·
[Collection efficiency](/blog/collection-efficiency-how-to-compute/) ·
[DCB reconciliation](/blog/dcb-reconciliation-why-it-stops-tying/) ·
[NPA date calculator](/tools/npa-date-calculator/) ·
[Microfinance and JLG, where bucket flow is read per centre](/microfinance-software/)
