---
title: "Collection efficiency: how one book gives four different numbers, all of them honest"
description: "Current-month, cumulative, billing and gross collection efficiency are computed from the same book and routinely differ by twenty points. Which denominator you chose is the whole of the difference, and nobody states it."
metaDescription: "Collection efficiency computation: current, cumulative, billing and gross definitions, why they differ by twenty points, and which one to report."
date: "2026-10-09"
category: "Operations"
author: "CS Sushil Choudhary"
draft: false
---

"Collection efficiency was 97% this month" is not a statement until you know what was in the
denominator. The same book, in the same month, routinely yields four figures twenty points apart —
and all four are defensible. The number is not the finding; **the definition is**.

This is the most-quoted metric in Indian lending and the least-specified. What follows is the four
computations, where each one flatters, and which to report to whom.

## The four computations, on one month's figures

Take a small book for a single month. Current demand ₹10,00,000. Arrears brought forward
₹2,00,000. Total received ₹10,40,000, of which ₹9,30,000 settled current demand, ₹80,000 settled
arrears, and ₹30,000 arrived as advance against next month.

### 1. Current-month collection efficiency

> collection against current demand ÷ current demand

₹9,30,000 ÷ ₹10,00,000 = **93.0%**

What it answers: *did this month's borrowers pay this month's instalment.* It is the cleanest
measure of current behaviour and it ignores the past entirely — which is the point and also the
limitation.

### 2. Cumulative (or "total") collection efficiency

> total collection ÷ current demand

₹10,40,000 ÷ ₹10,00,000 = **104.0%**

What it answers: *did we bring in more than we billed.* Note it exceeds 100%, which is why this
definition is popular in investor material: arrears recovery and advances both land in the
numerator while the denominator stays at current demand.

**It is not wrong. It is just not about current performance.** A book in run-off with aggressive
recovery can show 104% while current-month efficiency falls every month.

### 3. Billing efficiency

> collection against current demand ÷ current demand, **counting only accounts billed in the month**

The difference from (1) is the denominator's population, not its formula. Accounts on moratorium,
accounts whose instalment date falls outside the month, loans disbursed mid-month with no instalment
yet — each is in the book and was not billed.

If 40 of 400 accounts were not billed, (1) and (3) differ by whatever those 40 would have owed. On
a book with a long moratorium product, that gap is large and it moves every month as cohorts mature.

### 4. Gross collection efficiency

> total collection ÷ (current demand + opening arrears)

₹10,40,000 ÷ ₹12,00,000 = **86.7%**

What it answers: *of everything owed to us, how much came in.* This is the strictest of the four and
the one a credit committee usually wants, because it is the only one where arrears sit in the
denominator and therefore cannot be ignored by not collecting them.

**Same book, same month: 93.0%, 104.0%, and 86.7%.** No arithmetic error anywhere.

## The three composition choices that move it further

Beyond the denominator, three inclusion decisions change the answer and are almost never stated.

**Does the numerator include advance?** In the example, ₹30,000 arrived against a demand that does
not exist yet. Including it in a *current-month* figure credits this month with next month's money.
Excluding it understates cash received. Either is defensible; silently switching between them
produces a trend that is purely definitional.

**Does the numerator include waivers and write-offs?** It must not. A waived charge reduces arrears
without a rupee arriving, so counting it as collection makes efficiency rise as a direct consequence
of giving up on money — see [DCB reconciliation](/blog/dcb-reconciliation-why-it-stops-tying/),
where the waiver needs its own column for exactly this reason.

**Does the denominator include penal charges?** A penal amount is a **charge**, not interest, and is
not added to principal ([penal charges are not
interest](/blog/penal-charges-not-interest/)). If levied penal sits in demand, then a month with
many defaults inflates the denominator and efficiency falls for a reason that is not about
collection at all. Most lenders exclude penal from the demand base. Few say so.

## Where each one flatters, stated plainly

| Definition | Flattered by | Use it for |
|---|---|---|
| Current-month | a book with new disbursements not yet billed | month-on-month collections performance |
| Cumulative | arrears recovery, advances, a shrinking book | cash management, and nothing else |
| Billing | a large unbilled population | comparing branches with different product mixes |
| Gross | nothing much — it is the hardest to flatter | credit committee, diligence, provisioning discussion |

**Growth flatters three of the four.** A book disbursing heavily has accounts that are in the
portfolio and not yet in the demand base, so the denominator lags the exposure. This is the same
dilution a static pool exists to defeat —
[how to build one](/blog/static-pool-analysis-how-to-build/).

## The reporting convention worth adopting

One line, every time:

> *Collection efficiency 93.0% (current-month demand basis; excludes advance, penal and waivers;
> 412 of 440 accounts billed).*

It takes a sentence and it makes the figure comparable with its own history, which is the only
comparison that matters. A percentage with no definition attached cannot be compared with last
month's percentage with no definition attached, and the difference between them gets read as
performance.

## Two computations that are not collection efficiency

**Recovery rate** is collection against *written-off* accounts over the written-off pool. Different
population, different purpose.

**Resolution rate** is accounts that cured ÷ accounts that were delinquent at period start. It is
about accounts, not money, and it answers the question collection efficiency cannot: *did the
delinquent ones come back.* That is bucket flow, and it is the right companion metric —
[bucket movement and flow rates](/blog/bucket-movement-and-flow-rates/).

## What it cannot tell you, however it is computed

Collection efficiency is a **period** measure and credit is a **cohort** phenomenon. A month at 97%
tells you nothing about whether the loans written last quarter are worse than the ones written the
quarter before, because every cohort is mixed into one denominator.

It is also silent on **concentration**. One large borrower paying on the 31st instead of the 1st
moves a value-based figure several points. Running a count-based efficiency alongside the value-based
one is the cheapest way to see that, and almost nobody does it.

And it says nothing about **where in the ageing** the misses are. 95% with the 5% sitting in 0–30
days is a different book from 95% with the 5% sitting at 90+, and the single number is identical.


## Frequently asked questions

### Which collection efficiency definition should be reported to a credit committee?

Gross — total collection over current demand plus opening arrears. It is the only one of the four
where arrears sit in the denominator, so it cannot be improved by declining to pursue them. It is
also the hardest to flatter, which is usually why it is not the one quoted.

### How can collection efficiency exceed 100%?

On the cumulative definition, arrears recovery and advances land in the numerator while the
denominator stays at current demand. It is arithmetically sound and it is not a statement about
current performance; a book in run-off with aggressive recovery can show above 100% while
current-month efficiency falls every month.

### Should advance receipts count as collection?

Only if the definition says so and says so consistently. Counting advance in a current-month figure
credits this month with next month's money; excluding it understates cash received. Switching
between the two silently produces a trend that is purely definitional.

### Does a high collection efficiency mean the book is healthy?

Not on its own. It is a period measure and credit is a cohort phenomenon, so every cohort is mixed
into one denominator. It is also silent on where in the ageing the misses sit — 95% with the gap at
0-30 days and 95% with the gap at 90+ are the same number and different books.

---

**Related:** [What diligence asks for, and what each defeats](/blog/due-diligence-what-lenders-ask/) ·
[How to build a static pool](/blog/static-pool-analysis-how-to-build/) ·
[Bucket movement and flow rates](/blog/bucket-movement-and-flow-rates/) ·
[DCB reconciliation](/blog/dcb-reconciliation-why-it-stops-tying/) ·
[How to track loan collections](/blog/how-to-track-loan-collections-nbfc/)
