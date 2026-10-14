---
title: "Collection efficiency: four defensible definitions, four different answers, one number on the slide"
description: "Collected over demanded, which sounds like one calculation. It is at least four, they diverge by double digits on the same book in the same month, and a figure quoted without its definition is not a figure. What a system has to store before any of them can be computed."
metaDescription: "Collected over demanded is at least four calculations that diverge on the same book. What a system must store before any of them is computable."
question: "How is collection efficiency calculated, and why do two systems give different answers?"
keyword: "collection efficiency software"
kind: artefact
author: "CS Sushil Choudhary"
updated: "2026-10-13"
related: "collection-efficiency-how-to-compute, bucket-movement-and-flow-rates, static-pool-analysis-software-nbfc, dcb-reconciliation-why-it-stops-tying, due-diligence-what-lenders-ask, dpd-calculation-software-nbfc, how-to-track-loan-collections-nbfc, reconciliation-off-by-rupees"
priority: 0.8
draft: true
---

Collection efficiency is what was collected divided by what was demanded, over a period. It sounds
like one calculation and it is at least four, because both the numerator and the denominator admit
more than one defensible choice — and on a real book the four answers diverge by enough that a
lender quoting one of them to a rating agency and another to a board is not being evasive, just
inconsistent.

The number is also the one most often asked for in a diligence pack and most often supplied without
its definition, which makes it unusable by the person who asked.

## The four, and where they diverge

| Definition | Numerator | Denominator | What it answers |
|---|---|---|---|
| **Current demand** | Collections against this month's demand | This month's demand only | Is the book being serviced *now* |
| **Total collections** | Everything received, arrears included | This month's demand only | Cash performance — and it can exceed 100% |
| **Billing efficiency** | Collections against demand | Demand plus opening arrears | How much of everything owed came in |
| **Cumulative** | Collections since inception | Demand since inception | Lifetime performance of a cohort |

The second and third are the pair that catches people out. Total collections over current demand can
print above 100% in a month when arrears recovery was good, which reads as excellent and tells you
nothing about whether current borrowers paid. Billing efficiency on the same book in the same month
can print in the seventies, because the denominator carries every rupee still owed from before.

Both are correct. They are answers to different questions, and the distance between them is itself
information: a wide gap means the book is being carried by arrears recovery rather than by current
servicing.

## Growth flatters three of the four

A book disbursing heavily has accounts that are in the portfolio and not yet in the demand base —
disbursed this month, first instalment next month. The denominator therefore lags the exposure, and
the ratio improves while nothing about credit quality has changed.

This is the same dilution that
[a static pool exists to defeat](/blog/static-pool-analysis-software-nbfc/), and it is why collection
efficiency should never be read as a credit measure. It is a **period** measure and credit is a
**cohort** phenomenon; a month at 97% on a fast-growing book is consistent with every cohort
performing worse than the one before it.

## What has to be stored before any of it is computable

This is the part that decides whether a lender can produce the figure at all, and it is unglamorous.

- **A demand register with dates.** What was demanded, from whom, on which date — as records, not as
  a derivation from the schedule at report time. A schedule tells you what is due; it does not tell
  you what was *demanded* in a month after a restructuring moved the dates.
- **Receipts with value dates**, distinct from the date they were entered. A receipt banked on the
  2nd for a demand of the 28th belongs to a different month depending on which date the report uses,
  and the choice has to be stated.
- **The arrears position at the opening of the period**, kept rather than recomputed. Billing
  efficiency's denominator is an opening balance, and an opening balance recomputed from today's data
  is not an opening balance.
- **Which demand each receipt settled.** Without it, "collections against current demand" cannot be
  separated from "collections against arrears", and two of the four definitions become uncomputable.

A system that holds only a running outstanding balance can compute none of the four honestly. It can
compute something, and it will.

## It is not DCB, and not a flow rate

Three collections measures that answer different questions and get quoted interchangeably:

- **Collection efficiency** is a ratio over a period. *Did the money come in?*
- **A demand–collection–balance statement** is a reconciliation, not a ratio: demand, collection and
  the balance that must equal the difference.
  [It stops tying for specific and findable reasons](/blog/dcb-reconciliation-why-it-stops-tying/).
- **A flow rate or bucket movement matrix** follows accounts between delinquency buckets between two
  dates. *Where is the leak?* —
  [and it is a different report entirely](/blog/bucket-movement-and-flow-rates/).

A lender with good collection efficiency and worsening flow rates has a collections problem that the
ratio is hiding, because the ratio is dominated by the performing majority.

## What a system has to do, and what it must not pretend to do

| Need | What good software does | What it must not pretend to do |
|---|---|---|
| The definition | Make it explicit on the report, and offer more than one | Print a percentage with no definition, which is not a figure |
| The demand base | Keep a dated demand register | Derive demand from the schedule at report time, which loses every restructuring |
| Receipts | Keep the value date distinct from the entry date, and state which the report uses | Use whichever is convenient |
| Opening arrears | Store the position at the period opening | Recompute it from today, which is not an opening balance |
| Settlement | Record which demand each receipt cleared | Hold a net balance, which makes two of the four definitions uncomputable |
| Growth | Report disbursement alongside, so dilution is visible | Present the ratio alone on a growing book |
| Credit quality | Nothing | Present collection efficiency as a credit measure. It is a period measure; credit is a cohort phenomenon |

## Frequently asked questions

### Can collection efficiency exceed 100%?

On the total-collections definition, yes, routinely — arrears recovered in the month land in the
numerator while the denominator is current demand only. It is not an error and it is not good news on
its own; it usually means the previous months were worse than reported.

### Which definition should a lender publish?

Whichever it will keep publishing, with the definition stated beside it. The damage is not in
choosing the wrong one; it is in changing silently, so a series that looks like improvement is a
change of denominator.

### Does a part payment count?

In the numerator, to the amount received — the question is what the denominator did with the rest. On
current demand it stays in the denominator and drags the ratio down for that month only; on billing
efficiency it carries forward into the next period's denominator as arrears. The two treatments
diverge from the second month onward.

### Where does Lenviq stand on this?

Honestly: **the collection efficiency report is specified in the product catalogue and is not
offered.** The inputs it needs are there — a dated demand register, receipts carrying value dates
distinct from entry dates, and the record of which demand each receipt settled through a stated
settlement order — and several live reports read them, including the overdue, daily collection and
expected-inflow reports. The ratio itself is not a report you can run today, and naming it as a
feature because the data exists is the thing this page argues against. What the platform does not do,
and should not, is present the figure as a measure of credit quality.
