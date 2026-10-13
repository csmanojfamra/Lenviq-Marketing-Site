---
title: "Penal charges in a lending system: grace, GST, settlement order and the bounce that undoes it"
description: "The 2023 direction settled what a penal amount is. What it left to implementers is harder: where a grace period may act, whose GST registration decides the tax, which head a short receipt clears first, and what happens to a collected penal amount when the instrument bounces."
metaDescription: "Where a penal grace may act, whose GST registration decides the tax, which head a short receipt clears first, and what a bounce does to penal already collected."
question: "How should penal charges be computed, taxed and settled on a loan?"
date: "2026-10-13"
category: "Operations"
author: "CA Anil Agarwal"
tool: "penal-charge-calculator"
related: "penal-charges-not-interest, how-to-calculate-penal-charges-rbi-2024, kfs-what-goes-in-the-apr, npa-income-reversal, reconciliation-off-by-rupees, audit-trail-what-counts, dcb-reconciliation-why-it-stops-tying, which-rate-goes-on-which-document"
draft: true
---

A penal amount charged for a default is a charge and not interest, which means it does not compound,
is not added to principal, is disclosed among contingent charges rather than in the rate, and is
income when received rather than when levied. That much the Reserve Bank settled in August 2023.

What it left open is everything a lending system actually has to decide: at what point a grace period
may reduce the charge, whose tax registration decides whether GST attaches, which head a part payment
clears first, and what becomes of a collected penal amount when the cheque behind it is returned.
Four questions, and getting any of them wrong produces a figure that is wrong on every delinquent
account at once.

## The rule, and the dates it bit on

The circular on fair lending practice and penal charges in loan accounts
([RBI/2023-24/53, DoR.MCS.REC.28/01.01.001/2023-24](https://rbi.org.in/Scripts/NotificationUser.aspx?Id=12527&Mode=0),
dated 18 August 2023) is unambiguous on compounding: *"There shall be no capitalisation of penal
charges i.e., no further interest computed on such charges."* Its commencement was then extended by
[RBI/2023-24/102](https://www.rbi.org.in/Scripts/NotificationUser.aspx?Id=12585&Mode=0) dated
29 December 2023, leaving two operative dates — fresh loans availed from **1 April 2024**, and
existing loans at their next review or renewal falling on or after 1 April 2024 and **not later than
30 June 2024**.

A lender with a long book therefore ran two regimes for a quarter, and a system that applied the new
treatment to every account on one date has restated accounts whose switchover had not arrived.

## Grace may reduce the charge. It may not move the classification

This is the error worth the most money, because it is one subtraction in the wrong place.

A lender may choose not to levy for the first few days after a due date. That is a commercial
decision about a charge. It says nothing about whether the amount is overdue, because overdue means
it was not paid on the date the lender fixed — and overdue is what drives
[the SMA and NPA classification](/blog/sma-classification-what-it-signals/), the provisioning and the
days past due reported to the credit bureaus.

So there are two settings and they must never be one:

- **Penal-levy grace.** Reduces the chargeable days. On a five-day grace and a payment six days late,
  one day is chargeable — not six. Charging all six the moment the grace expires makes the charge jump
  discontinuously at day six, which is not a grace; it is a cliff.
- **Classification grace: none.** The account is flagged overdue in the day-end process for the due
  date itself.

## Whose GST registration, and read as at when

A penal charge is a supply, and the tax on it is the lender's to collect — if the lender is
registered. That makes the registration a fact about the lender *now*, not a term of the loan.

This matters because a lending system is otherwise built to read the scheme as it was frozen at
sanction, which is the right instinct and the wrong answer here. Whether penal is flat or annualised,
at what rate, with what grace — all of that belongs to the sanction and should be read from the
snapshot. Whether tax may be collected at all does not: an unregistered person may not collect GST on
a supply whatever a sanction written last year said, and section 32 of the Central Goods and Services
Tax Act, 2017 says so in terms.

The practical test: a lender who surrenders registration should stop charging tax on penal amounts
from that date, on every existing loan, without anybody editing a scheme.

## Settlement order decides the outcome, so it has to be a stated policy

Where a receipt is less than the total due, which head it clears first changes both the borrower's
outstanding and the lender's income. A conventional order runs costs, then bounce charges, then penal,
then interest, then principal — and within interest and principal, oldest demand first.

Two properties matter more than the particular order chosen:

**It is stated and snapshotted.** A borrower whose ₹10,000 cleared penal in March and interest in
April cannot reconcile their own account, and neither can the lender. The order belongs to the
sanction.

**Penal is its own bucket.** It is settled from the receipt, not added to the outstanding, which is
the mechanical consequence of it not being interest. A system that nets penal into principal has
re-created compounding by a different route: the next period's interest is then computed on a balance
that includes a penalty.

The oldest-first part is what keeps days past due honest. Days past due is measured from the oldest
unpaid demand, so appropriating a receipt to the newest instalment leaves the oldest one open and
reports a borrower as later than they are — and
[the arrears picture stops tying to the demand register](/blog/dcb-reconciliation-why-it-stops-tying/).

## The bounce, and why it is not a reversal

A returned instrument and a corrected receipt look similar in a ledger and are opposite in substance.

- A **reversal** is a correction. The money arrived and the posting was wrong, so a dated
  counter-entry is written and both entries stand for ever. The original receipt keeps its status;
  anything reading the history has to net the two at their own dates.
- A **bounce** is a failure. The money never arrived. The original receipt did not happen in any
  economic sense, the penal income recognised on it has to come back out, and a bounce charge may be
  levied in its own right.

Both are postings rather than edits, and neither may be implemented by deleting a row — but a system
that treats them identically will either leave income on the books for money it never had, or will
net out a receipt that genuinely cleared.

## What a system has to do, and what it must not pretend to do

| Need | What good software does | What it must not pretend to do |
|---|---|---|
| The charge | Compute from the snapshotted scheme — flat or annualised, rate, grace | Read the live master, so a rate change restates a delinquent borrower's history |
| Grace | Reduce chargeable days on the levy only | Subtract it from days past due |
| Compounding | Keep penal in its own bucket, outside the interest-bearing balance | Add it to the outstanding |
| GST | Read the lender's registration as at today | Take it from the sanction snapshot |
| Recognition | Post to income on receipt | Accrue the levy into income, which overstates income on exactly the accounts that will not pay |
| The statement | Show the levy to the borrower when it is levied | Hide it until collection, leaving the borrower an account they cannot reconcile |
| Settlement | Apply a stated order, oldest demand first | Let the order be whatever the code happened to do |
| A bounce | Reverse the recognised penal and levy the bounce charge | Treat it as a correction to the receipt |
| Waiver | Post it as an expense against the outstanding charge, with a reason and an approver | Delete the levy |

That last row is the one auditors ask about. A waived charge that was deleted leaves no evidence the
lender ever gave anything up, which is both an audit problem and a commercial one — nobody can tell
how much was waived or by whom.

## Frequently asked questions

### Can penal charges be levied on an account that is already non-performing?

Levy is a commercial decision and most lenders stop new levy on a classified account, while what was
already levied stays on the borrower's statement. The recognition basis does not change: penal is
income on receipt in either case, so a recovery on a non-performing account is recognised when it
arrives.

### Does the borrower's statement showing penal mean it is in the lender's income?

No, and the gap between the two is intentional. The borrower owes the charge from the date it was
levied; the lender recognises it when it is received. One number cannot serve both dates, and a
statement that showed only recognised income would be unreconcilable.

### Is a bounce charge a penal charge?

They are separate heads with separate triggers — a bounce charge is for a returned instrument, a
penal charge is for the overdue amount — and keeping them separate is what lets a lender show a
borrower what they are being charged for. Both are charges rather than interest.

### Does penal go into the APR?

No. It is a contingent charge for a default that may never occur, so it is disclosed among the
contingent charges on the Key Facts Statement rather than built into the
[annual percentage rate](/blog/kfs-what-goes-in-the-apr/).

### Where does Lenviq stand on this?

Penal is computed from the snapshotted collection terms and the levy posts nothing to the general
ledger; income is recognised on receipt, as a bank debit against a penal income account tied to the
receipt. Grace reduces chargeable days only — the days beyond the grace, not all of them — and is
never applied to days past due. GST on penal is read from the lender's current registration rather
than the sanction snapshot. Penal is its own settlement bucket ahead of interest and principal, which
are then applied oldest demand first, and the order is part of the scheme snapshot. A bounce reverses
the penal recognised on the original receipt; a waiver posts as an expense against the outstanding
charge with a reason recorded, rather than removing the levy.
