---
title: "How to manage an NBFC loan portfolio: the five views you actually need"
description: "Managing a loan book means being able to answer five questions at any moment — what is out, what is due, what is deteriorating, what is concentrated, and what it is earning. How to build each view so they agree with each other."
date: "2026-08-12"
category: "How-to"
author: "FastLegal Technologies"
draft: false
---

Managing an NBFC loan portfolio means being able to answer five questions on any given day: **what is
outstanding, what is due, what is deteriorating, where is it concentrated, and what is it earning**.
Everything else — the dashboards, the reviews, the board pack — is a presentation of those five. The
work is making sure all five are computed from the same book, as at the same date, so that two people
asking on the same morning get the same answer.

## What are the five views?

| View | The question | Computed from |
|---|---|---|
| Exposure | What is outstanding, by product, branch, scheme, borrower | Loan accounts, as at a date |
| Demand | What falls due in the next cycle, and what fell due and was not paid | Due events |
| Quality | Days past due, SMA staging, NPA, provision | Day-end classification |
| Concentration | Largest borrowers, largest groups, product and geography mix | Aggregated exposure |
| Yield | Interest earned, charges collected, cost of funds against it | Postings, not projections |

The mistake is to build them separately. A collections dashboard that computes its own overdue
figure, a board pack assembled in a spreadsheet and a return drawn from an extract are three answers
to the same question, and reconciling them is a permanent tax.

## How do you keep them agreeing?

**One computation of days past due.** The figure driving collections is the figure driving
classification is the figure in the return. Where a screen computes its own "overdue" from balances,
it will disagree with the engine — usually by a day, sometimes by more.

**One as-at date, stated on every view.** A month-end number and a today number are different
answers. A report that does not say which it is invites the meeting where two people are both right.

**A stored day-end position.** Reporting reads what the book *was*, not what it is now recomputed to
have been. Without it, a figure filed last quarter cannot be reproduced this quarter.

**Scope enforced, not toggled.** A branch manager's portfolio view shows their branch because the
system filters it, not because they remembered to set a filter.

## What should be reviewed, and how often?

**Daily** — yesterday's collections against demand, new overdues, accounts crossing a bucket
boundary, cheque and mandate returns.

**Weekly** — the SMA-2 population and what is being done about each, exceptions and deviations
approved, disbursement pipeline against sanctions.

**Monthly** — portfolio movement (opened, closed, written off), asset quality by product and branch,
provision movement, yield against cost of funds, top exposures.

**Quarterly** — concentration against internal limits, restructuring, the returns, and a look back at
whether last quarter's watch list behaved as expected.

The last of those is the one most lenders skip, and it is the one that tells you whether your early
warning actually warns.

## What concentration should be watched?

Not only the obvious single-borrower limit.

- **Borrower and group.** A borrower with three loans is one exposure. If the system aggregates only
  at report time, the aggregation rule lives in a spreadsheet.
- **Product.** A book that has drifted to 70% gold has a gold-price exposure it did not choose.
- **Geography.** A single district's crop failure is a correlated default.
- **Sourcing channel.** Loans from one DSA behaving differently from the rest is a leading
  indicator, and it is only visible if the channel is on the account.
- **Vintage.** Loans sanctioned in one quarter behaving worse than adjacent quarters points at a
  policy change, not at borrowers.

Vintage analysis — cohorts by month of disbursement, tracked at 3, 6 and 12 months on book — is the
single most useful portfolio view a growing lender can build, and it needs nothing more than the
disbursement date and the classification history.

## Common mistakes

- **Dashboards that recompute.** Every view its own arithmetic, and eventually its own answer.
- **No stored day-end position.** Last quarter's figure cannot be reproduced.
- **Aggregating exposure in the report.** The rule leaves when its author does.
- **Watching balances rather than transitions.** An account that moved SMA-0 → SMA-2 → paid looks
  identical today to one that never moved.
- **Yield from projections rather than postings.** Contractual interest is not collected interest.
- **A portfolio review with no cohort view.** You cannot tell a deteriorating book from a growing one.
- **Provisioning computed outside the system.** It will disagree with the classification it was
  supposedly derived from.

## A worked example

A lender with ₹40 crore across gold, LAP and business loans reviews the book monthly. Gross NPA is
2.1%, flat for three months. Comfortable.

The cohort view says otherwise. Loans disbursed in April are at 4.8% NPA at six months on book; those
disbursed in January are at 1.9% at the same age. The overall figure is flat only because the book
grew — the new, better-behaved loans are diluting the older ones' deterioration, and the April cohort
is the one to look at.

What changed in April? The deviation report says approvals outside policy rose from 3% to 11% that
month. The portfolio number could not have shown that. The cohort plus the deviation record did.

## How Lenviq handles this

Days past due, classification and provisioning are computed once by the day-end job, and every
view — the account screen, the collections list, the portfolio report, the return — reads the same
figures. Each report states the date its figures are as at, and reports built on a day-end position
say so rather than silently mixing it with the live book. A position snapshot is written every night
before anything derived from it runs, so last quarter's figure is a record rather than a
reconstruction. Every list, report and export is filtered by the acting user's data scope; there is
no "all branches" toggle that quietly ignores it.

The [reports page](/reports/) sets out what is produced.

## Frequently asked questions

### What is the most useful portfolio report for a growing NBFC?

A vintage or cohort view: accounts grouped by month of disbursement, with asset quality tracked at
three, six and twelve months on book. A growing book dilutes its own bad news, so a flat headline NPA
can hide a cohort that is deteriorating sharply.

### How often should a loan portfolio be reviewed?

Daily for collections and new overdues, weekly for the SMA-2 population, monthly for portfolio
movement and asset quality, quarterly for concentration and a look back at whether the previous
watch list behaved as expected. The quarterly look back is the one usually skipped and the one that
tests whether the early warning works.

### Why do two reports show different NPA figures?

Almost always because they were computed as at different dates, or because one recomputed
days-past-due rather than reading the classification the day-end job produced. Both are avoidable by
having one computation and stating the as-at date on every view.

### Should provisioning be computed in the lending system or in accounting?

In the lending system, from the classification it produced, and posted to accounting. Computing it
separately in a spreadsheet guarantees it will eventually disagree with the classification it was
supposedly derived from.

### How do you aggregate exposure for a borrower with several loans?

In the system, on the borrower record, not in the report. The rule for what constitutes one exposure
— same borrower, same group, guarantor overlap — is a credit policy decision, and it should live
where it can be applied consistently rather than in whichever spreadsheet was used last.

---

**Related reading:** [How to generate RBI returns](/blog/how-to-generate-rbi-returns-nbfc/) ·
[How to automate NPA classification](/blog/how-to-automate-npa-classification-nbfc/) ·
[SMA-0, 1 and 2](/blog/sma-classification-what-it-signals/) ·
[Loan management software for an NBFC](/blog/loan-management-software-for-nbfc/)

[Ask for a walk-through](/contact/) of the portfolio views against your own book shape.
