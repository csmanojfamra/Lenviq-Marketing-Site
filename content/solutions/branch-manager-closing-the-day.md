---
title: "A branch manager's day: the files on your desk, the ones that are not, and day end"
description: "You approve what the matrix routes to you, chase what is overdue, decide what to defer, and at some point the day has to close. What the software puts in front of you, what it keeps away from you, and what it will not let you do alone."
metaDescription: "What the approval matrix routes to a branch manager, what the scope keeps away, and what day end actually does."
question: "What does a loan management system actually do for a branch manager?"
keyword: "loan management software for a branch manager"
kind: persona
author: "CS Sushil Choudhary"
updated: "2026-10-13"
related: "/solutions/|Every solution, how-to-scale-nbfc-lending-operations, /enterprise/many-branches-one-book/|Forty branches, one book, how-to-track-loan-collections-nbfc, dpd-calculation-software-nbfc, nach-mandate-software-nbfc, gold-auction-software-nbfc, collection-efficiency-how-to-compute"
priority: 0.7
draft: true
---

A branch manager's day is made of other people's decisions arriving and having to be turned into
your own. A file comes up from sourcing and needs a view. A borrower wants a few days on a penal
charge. Three accounts crossed into a bucket overnight and somebody has to call them. A gold loan is
past its renewal and the packet is still in your vault.

What a lending system is for, in that day, is not reporting. It is making sure the right things reach
you, the wrong things do not, and the day can be closed with a record of what happened.

## What reaches your desk, and why

An approval chain on a real book is not "the branch manager signs up to a limit". It is resolved
from several things at once — the product, the scheme, the branch, the amount slab, and whether the
file needs a deviation — so a file inside policy at a given amount lands with you, and the same
amount asking for a deviation does not.

That is the behaviour a credit policy actually describes, and it has a consequence worth stating: a
file you were not shown was not hidden from you, it was routed past you, and the chain that routed it
is inspectable. "Why did I not see this" has an answer.

## What you cannot see, and why that is the point

Your data scope is your branch. Not as a screen that hides rows — as a query that cannot return
them. The distinction shows up the first time somebody exports a report or types another branch's
loan account number into a URL, which is exactly when a hidden row would have been found.

It cuts both ways and the second way is the useful one: a figure you are shown is a figure for your
branch, so you are never comparing your collections against a tenant-wide number by accident.

## The decisions that are yours

| What arrives | What you can do | What you cannot |
|---|---|---|
| A file within your chain | Decide it, with the reason recorded | Decide one you sourced yourself — maker and checker are different people |
| A borrower asking for time on a penal charge | Defer the levy, which is a commercial decision about a charge | Change the days past due. Grace moves what may be charged, never the classification |
| A gold loan at renewal, or past it | Manage the renewal, and where it comes to it, the auction | Shorten the thirty days' notice. It is a floor |
| An account sliding into arrears | Work it, assign it, record what was said | Move it out of a bucket. The bucket is arithmetic on dates |
| A foreclosure request | Produce the quote | Change the figure. It is computed as at a date |
| A full penal waiver | — | Grant it. A partial waiver sits higher up the chain and a full one higher still |

The last row is the one people push back on, and it is the right design. A charge the lender levied
and then forgave is a commercial concession, and the authority to give one away should not sit with
the person under the most pressure to collect.

## Day end is not a button you press

The classification, the accrual and the overdue flagging run in a scheduled day-end job, not when
somebody opens a screen. For you that means two things.

The figures you see in the morning are **the reported figures** — the same ones that went into
provisioning and the same ones that will go to the credit bureaus. Not a screen's own arithmetic that
happens to be close.

And an account that crossed a boundary overnight crossed it **on last night's date**, not on the
morning you noticed. Which is why the collections list you pick up is already correct rather than
needing to be re-run, and why
[the date it was cut on is fixed by a circular rather than by convenience](/solutions/dpd-calculation-software-nbfc/).

## The two things that will make your week harder

**A mandate whose ceiling is below the instalment.** After a rate revision or a restructuring the
instalment changes in the system and the mandate at the borrower's bank does not. The presentation
then fails for a reason that had nothing to do with the borrower's balance, and
[the presentation limits mean you may not simply try again tomorrow](/solutions/nach-mandate-software-nbfc/).

**A receipt entered on the wrong date.** A value date and an entry date are different things, and a
receipt banked on the 2nd against a demand of the 28th belongs to a different month depending on
which one a report uses. Getting it right at entry is a great deal cheaper than explaining it at
month end.

## What the software does not do for you

- **It does not rank you.** There is no branch-manager league table in it, deliberately. A
  collections figure is a function of the book a branch was given as much as of how it was worked,
  and a ranking that ignores that measures the wrong thing confidently.
- **It does not decide who to call.** It can tell you who is overdue, how much, since when and what
  was said last time. The judgement about which conversation is worth having today is yours.
- **It does not predict.** A bucket list is a record of accounts that are already late. Nothing in it
  is an early warning, however it is coloured.
- **It does not tell you whether a file is good.** It routes it, records the decision and holds the
  appraisal. The view is yours and it has your name on it.

## Frequently asked questions

### Can I approve a file I brought in myself?

No. Sourcing and deciding are separated at permission level rather than by policy, which means it is
not a matter of remembering. A sourcing role holds its own data scope and does not hold the approval
permission at all.

### Why can I see the trial balance for my branch but not for the lender?

Because the accounting read is scoped the same way everything else is, and a branch-level figure is
one you can act on. The tenant-level surfaces — the consolidated statements, the tax registers, the
year-end — need a tenant-level role, which is a different job rather than a bigger version of yours.

### If I defer a penal charge, does the account stop being overdue?

No, and this is the single most important thing on this page. A deferral is about what may be
*charged*. Whether the amount is overdue was settled by the date it was not paid, and it continues to
drive the bucket, the classification and what the bureaus are told.

### Where does Lenviq stand on this?

The approval matrix resolves from product, scheme, branch or region, amount slab and deviation level
together, and a branch-scoped role's data scope is applied in the query path rather than in the
interface. Penal deferral sits with the branch manager; a partial waiver and a full waiver sit
higher. Gold management and auction, foreclosure quotes, moratorium and recovery are available at
branch level, and the branch-level accounting read is intersected with your own scope rather than
trusted — which it was not always, and the comment recording why is in the code. Classification,
accrual and overdue flagging run in a scheduled day-end job. There is no branch ranking, and there is
no early-warning model.
