---
title: "NACH mandates: the presentation you are allowed to make, and the bounce that undoes a receipt"
description: "A mandate is not permission to debit whenever you like. There are limits on how often and how soon, and a presentation made outside them is refused by the system that should have stopped it. Then there is the harder half: what a returned instrument does to a receipt already posted."
metaDescription: "A mandate has limits on how often and how soon you may present. And a returned instrument undoes a receipt that was already posted."
question: "How often can an NBFC present a NACH mandate, and what happens when it bounces?"
keyword: "NACH mandate management software"
kind: artefact
author: "CA Anil Agarwal"
updated: "2026-10-13"
related: "penal-charges-software-nbfc, how-to-track-loan-collections-nbfc, dcb-reconciliation-why-it-stops-tying, reconciliation-off-by-rupees, audit-trail-what-counts, dpd-calculation-software-nbfc, how-to-calculate-penal-charges-rbi-2024, collection-efficiency-how-to-compute"
priority: 0.8
draft: true
---

A National Automated Clearing House mandate is a standing authority a borrower gives their bank to
let a lender debit their account. It carries a unique reference number, a ceiling amount and a
frequency, and the lender presents against it on the due date.

Two things about it are harder than they look. A mandate is **not** permission to present whenever
convenient — there are limits on how many presentations a month and how soon after the last one, and
a lender exceeding them is making a presentation it was not entitled to make. And when a
presentation fails, the lender has to undo a receipt it has already recognised, which is a different
operation from correcting one.

## The mandate is a record with a ceiling, not a switch

| What the mandate carries | Why it matters |
|---|---|
| **The unique reference number** | The bank's own handle on the mandate. It quotes the loan account number as a reference, which is why a loan whose account number changes cannot simply be renumbered once a mandate is registered — the bank's copy cannot be edited from the lender's side |
| **A ceiling amount** | The maximum any single presentation may be for. A presentation above it is rejected, and a lender who raised an instalment without re-registering the mandate finds out on the due date |
| **A frequency** | Monthly, quarterly and so on. It bounds what the mandate is for |
| **An effective-from date and a status** | A mandate that is registered is not necessarily active, and an inactive one is not a collection channel |

The ceiling is the one that bites after a rate revision or a restructuring. The instalment changes
in the lending system; the mandate at the bank does not. A system that presents the new instalment
against the old ceiling has generated a failure that was entirely predictable.

## The presentation limits, and why the system has to refuse

There are two constraints and they are independent: a **maximum number of presentations per month**,
and a **minimum number of days since the last one**. A re-presentation made two days after a failure
may satisfy the first and breach the second.

The important design point is where that check lives. If it is advisory — a warning somebody can
click past — it will be clicked past, on a day when collections are behind and somebody is trying to
help. The check belongs at the point of presentation, refusing it with the reason stated, so the
record of what was attempted is accurate and the lender is not relying on a convention.

## A bounce is not a reversal, and the difference is the whole of it

These two look almost identical in a ledger and are opposite in substance. Getting them the same way
round is the single most consequential thing on this page, because it reaches
[what a credit bureau is told](/solutions/cic-reporting-software-nbfc/).

**A reversal is a correction.** The money arrived; the posting was wrong. A dated counter-entry is
written and both entries stand for ever, so anything reading history has to net the two **at their
own value dates**. The original keeps its posted status permanently, because a posting is never
edited.

**A bounce is a failure.** The money never arrived. The original receipt did not happen in any
economic sense, so it has to leave the set **at every date**, not be netted at one — and the penal
income recognised on it has to come back out, and a bounce charge may be levied in its own right.

A system that treats them identically is wrong about one of them. Treat a bounce as a reversal and a
borrower reads as having paid up to the bounce date for ever; treat a reversal as a bounce and a
genuine payment vanishes from history.

## The bounce charge is its own head

Separate trigger, separate head, separate disclosure: a bounce charge is for the returned instrument,
a penal charge is for the overdue amount. A borrower whose instalment bounced and then stayed unpaid
owes both, for two different reasons, and a statement that merges them into one line is one they
cannot check.

Both are **charges rather than interest**, so neither compounds and neither is added to principal —
and both are income on receipt rather than on levy, which means
[the settlement order decides which one a short payment clears first](/solutions/penal-charges-software-nbfc/).

## What a system has to do, and what it must not pretend to do

| Need | What good software does | What it must not pretend to do |
|---|---|---|
| The mandate | Hold the reference, ceiling, frequency, effective date and status as a record | Treat it as a flag meaning "auto-debit on" |
| The ceiling | Check the presentation amount against it before presenting | Present a revised instalment against an unrevised mandate |
| Presentation limits | Refuse at the point of presentation, with the reason | Warn, which is the same as not checking |
| A failure | Record it with its return reason, and keep the repeat-bounce history per borrower | Retry and overwrite, which loses the pattern that mattered |
| A bounce | Remove the receipt at every date and reverse the penal recognised on it | Net it at one date, as though the money had arrived and come back |
| A reversal | Net it at its own value date; leave the original posted | Delete the original |
| The bounce charge | Levy it as its own head, on receipt basis | Merge it with penal on the statement |
| Renumbering | Refuse a loan renumber while a mandate is registered | Rename the loan, leaving the bank's reference pointing at a number that no longer exists |
| Collection certainty | Nothing | Describe a registered mandate as collection. It is a channel, and its failure rate is a fact about the borrower |

## Frequently asked questions

### Can a failed presentation be retried the next day?

Only if that satisfies the minimum interval, and usually it does not. The constraint is days since
the last presentation, not days since the failure, so a lender who presented on the due date and
failed has to wait out the interval before presenting again — which is the gap a collections team
plans around rather than discovers.

### What if the borrower's instalment changes?

The mandate has to be re-registered for the new amount if it exceeds the ceiling. The lending system
can detect that the instalment now exceeds the registered maximum; it cannot raise the bank's
ceiling, and a system implying otherwise is describing a feature it does not have.

### Does a bounce affect days past due?

It does, and correctly so — the instalment is unpaid, so the arrears position is what it would have
been had no presentation been made. That is the practical consequence of removing the receipt at
every date rather than netting it at one.

### Can a bounce charge be waived?

Commercially, yes, and it should be recorded as a waiver — an entry against the outstanding charge
with a reason and an approver — rather than by deleting the levy. A deleted levy leaves no evidence
the lender gave anything up, which is both an audit problem and a commercial one.

### Where does Lenviq stand on this?

Mandates are records carrying the reference number, ceiling, frequency, effective date and status.
The presentation check enforces both limits — a maximum per month and a minimum interval since the
last — and **refuses** the presentation with the reason rather than warning. A bounce marks the
original receipt as bounced so it leaves the set at every date, and reverses the penal income
recognised on it; a reversal is a dated counter-entry netted at its own value date, with the original
left posted. Bounce and penal are separate settlement buckets. A registered mandate refuses a loan
account renumber outright, because the bank's copy quotes the old number and cannot be edited from
here. Presentation, bounce and post-dated cheque registers are reports. What the platform cannot do
is make a mandate collect.
