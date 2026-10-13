---
title: "Operations: posting the day's money, and the entries you are not allowed to delete"
description: "Receipts, disbursements, mandates, bounces, corrections. Yours is the role that touches money, which is why almost everything it does is an event record rather than an edit — and why the one thing you cannot do is make a mistake disappear."
metaDescription: "Receipts, disbursements, bounces, corrections. Why an operations role posts events rather than edits, and what that costs on a bad day."
question: "What does an operations team actually do in a loan management system?"
kind: persona
author: "CA Anil Agarwal"
updated: "2026-10-13"
related: "/solutions/|Every solution, nach-mandate-software-nbfc, foreclosure-quote-software-nbfc, reconciliation-off-by-rupees, audit-trail-what-counts, /enterprise/one-chart-of-accounts/|One chart of accounts, penal-charges-software-nbfc, how-to-track-loan-collections-nbfc"
priority: 0.7
draft: true
---

Operations is the role that touches money. A disbursement goes out, receipts come in, a mandate is
presented, an instrument is returned, somebody entered a receipt against the wrong loan and it has to
be put right before the day closes.

Which is why almost nothing this role does is an edit. A financial posting is an event record, and a
correction is another event pointing at the first. That is not bureaucracy — it is the only
arrangement in which "what did we do on the 14th" has an answer a month later, and it has a real cost
on a bad day: the mistake stays visible for ever, with your correction beside it.

## The day's work, as events

| What you do | What it creates | What it does not |
|---|---|---|
| Record acceptance of a sanction | An event with its date | Change the sanction, which is immutable |
| Release a disbursement | A posting, and the loan's activation | Happen alone. Disbursement is four-eyed |
| Post a receipt | A receipt with a **value date** and an entry date, settled in the stated order | Let you choose which instalment it clears |
| Present a mandate | A presentation record, if the limits allow it | Let you present outside them. The check refuses rather than warns |
| Handle a return | A bounce: the receipt leaves the set at every date, the penal recognised on it comes back out, a bounce charge may be levied | Net it at one date, as a correction would |
| Correct a receipt | A dated counter-entry; the original stays posted | Delete anything |
| Produce a foreclosure quote | A figure as at a date, floored to the rupee | Let you adjust it |

The receipt row is worth dwelling on. You do not choose which instalment a receipt clears, and that
is deliberate: the settlement order — costs, then bounce, then penal, then interest, then principal,
oldest demand first — is part of the sanction. If it were yours to choose, two borrowers paying the
same amount in the same month would end up in different places, and neither could reconcile their
own account.

## The value date is the field that causes the most trouble

A receipt has two dates and they are not interchangeable. The **value date** is when the money was
the borrower's no longer. The **entry date** is when somebody typed it in.

A receipt banked on the 2nd against a demand of the 28th belongs to the previous month on one date
and this month on the other. Everything downstream inherits whichever the report used — collection
efficiency, the arrears position, the figure sent to the credit bureaus. Getting it right at entry
costs seconds; getting it wrong costs a month-end conversation in which nobody can reproduce the
other person's number.

## A bounce and a correction look the same and are opposite

This is the distinction that matters most in your role, because you will do both in the same week.

A **correction** means the money arrived and the posting was wrong. The receipt stands, a dated
counter-entry stands beside it, and anything reading history nets the two at their own dates.

A **bounce** means the money never arrived. The receipt did not happen in any economic sense, so it
leaves the set at *every* date — and
[the penal income recognised on it has to come back out](/solutions/nach-mandate-software-nbfc/).

Treat a bounce as a correction and a borrower reads as having paid up to the bounce date for ever.
That error reaches a credit bureau and the bureau keeps it.

## What you cannot do, and why each refusal exists

- **You cannot delete a posting.** Not a wrong one, not a test one, not one from this morning. A
  deleted entry is indistinguishable from one that never happened, which is the state an audit exists
  to rule out.
- **You cannot post into a locked period.** Once a quarter is closed and a return has been filed on
  it, a posting into it makes the filing unexplainable. The correction belongs in the open period.
- **You cannot release your own disbursement.** Maker-checker on disbursement is not configurable
  away, because it is the step where money leaves.
- **You cannot present a mandate outside its limits.** The check refuses, with the reason, rather
  than warning — a warning on a day when collections are behind is a warning somebody clicks past.
- **You cannot renumber a loan with a registered mandate.** The bank's copy quotes the old number as
  its reference and cannot be edited from here.

## The part of the day the system should be doing

The accrual, the classification and the overdue flagging are a scheduled job, not something you
trigger. That matters to you specifically: the figures on the collections list you pick up are last
night's day-end figures, so you are working the same numbers that went into provisioning rather than
a screen's own arithmetic.

And the accounting posts itself. A receipt you enter becomes a voucher into the chart of accounts as
part of the same transaction rather than an export somebody runs at month end — which is what makes
[the loan book tie to the ledger loan by loan](/enterprise/one-chart-of-accounts/) instead of
approximately.

## What the software does not do for you

- **It does not reconcile your bank account.** It knows what you told it was received. Whether that
  matches the bank statement is a reconciliation the lender performs, and no lending system can
  answer it alone.
- **It does not chase.** It can produce who is overdue and since when; the calls are yours.
- **It does not decide a waiver.** You can record one that was granted. Granting it sits with
  somebody else, and a full waiver higher still.
- **It does not make a bad entry go away.** Everything above is a consequence of that one sentence.

## Frequently asked questions

### I posted a receipt to the wrong loan. What now?

A reversal on the first, dated today, and a fresh receipt on the right loan with the correct value
date. Both loans end up right and both carry the evidence of what happened — which is the outcome
you want when the borrower calls in March about a statement from January.

### Why can I not choose which instalment a receipt settles?

Because the order belongs to the sanction, not to the day. Oldest demand first is what keeps days
past due honest: appropriating to the newest instalment leaves the oldest open and reports the
borrower as later than they are.

### Can a receipt be dated in the past?

Within limits, and the limits exist for a reason — a receipt dated into a period that has been locked
and reported would change a figure already filed. Where a genuinely late-entered receipt needs a past
value date, that is a reviewable action rather than a free-text field.

### Does a bounce charge need approval?

Levying it follows the scheme. Waiving it does not sit with the role that levied it, and it is
recorded as a waiver against the charge with a reason rather than by removing the levy — a deleted
levy leaves no evidence the lender gave anything up.

### Where does Lenviq stand on this?

An operations role holds acceptance, disbursement approval, loan activation, repayment posting and
reversal, collections instruments including mandates and post-dated cheques, foreclosure quotes and
the operational reports, scoped to its branch. Every financial posting is an event record: a
correction is a dated counter-entry, nothing is updated or deleted, and a locked period refuses a
posting. A bounce marks the original receipt bounced so it leaves the set at every date and reverses
the penal recognised on it. Receipts carry a value date distinct from the entry date, and settlement
follows the order in the scheme snapshot, oldest demand first. The accrual and classification run in
a scheduled job. What the platform does not do is reconcile your bank account.
