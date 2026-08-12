---
title: "Penal charges are charges: what the August 2023 direction changed in the ledger"
description: "Why penal amounts stopped being interest, what that means for compounding, capitalisation and the general ledger, and what it implied for existing agreements."
date: "2026-08-10"
category: "Regulatory"
author: "FastLegal Technologies"
draft: false
---

A penal amount charged for a default is a **charge**, not interest. It is not capitalised to
principal, no interest is computed on it, it is disclosed among contingent charges rather than in the
rate, and — following from all three — it is income when received rather than when levied. That is
what changed for fresh loans from 1 April 2024, and for existing loans at their next review.

The Reserve Bank's circular on fair lending practice and penal charges in loan accounts
([RBI/2023-24/53, DoR.MCS.REC.28/01.01.001/2023-24](https://rbi.org.in/Scripts/NotificationUser.aspx?Id=12527&Mode=0),
dated 18 August 2023) drew a line that a lot of
loan systems had been living on the wrong side of: a penalty for non-compliance with a material term
is a **charge**, not a component of the interest rate.

## What follows from the distinction

Once a penal amount is a charge rather than interest, three things follow mechanically.

**It does not compound.** The circular is unambiguous: *"There shall be no capitalisation of penal
charges i.e., no further interest computed on such charges."* A system that added the penal amount
to the outstanding and then computed the next period's interest on the new balance was charging
interest on a penalty.

**It is not added to principal.** The outstanding principal is what the borrower borrowed less what
they have repaid against it. A penal charge sits outside that balance.

**It is disclosed as a charge.** In the Key Facts Statement it appears among contingent charges,
not in the rate.

## What it means in the general ledger

If a penal amount is income only when it is received, then accruing it into income at the moment it
is levied overstates income for every account where it is never collected — which, on a delinquent
book, is a lot of them. The conservative treatment is to show the levy on the borrower's statement
so they can see what has been applied, and to post to income on receipt.

Settlement order matters too. Where a receipt is less than the total due, which head it clears first
changes both the borrower's outstanding and the lender's income. That order should be a stated
policy applied consistently rather than an emergent property of the code.

## The dates, which moved

The original circular set 1 January 2024. It was then extended by
[RBI/2023-24/102](https://www.rbi.org.in/Scripts/NotificationUser.aspx?Id=12585&Mode=0) dated
29 December 2023, and the operative dates are:

- **Fresh loans** — the instructions apply to all loans availed from **1 April 2024** onwards.
- **Existing loans** — the switchover happens on the next review or renewal date falling on or
  after 1 April 2024, and **not later than 30 June 2024**.

A lender with a long book therefore ran two regimes at once for a quarter. That is worth checking
in any system: an account that switched over in April and one that switched in June should not be
treated identically merely because both are delinquent today, and a system that applied the new
treatment retrospectively to closed periods has restated its own books.

## Why the statement and the trial balance legitimately differ

This is the part that confuses implementers, and it is not a contradiction.

The **borrower's liability** arises when the charge is levied — they owe it from that date, and a
statement of account that hides it until collection is one they cannot reconcile. The **lender's
income** arises when it is received. One number cannot serve both.

The workable implementation carries the levy as a shadow entry: recorded against the account, visible
on the statement, part of what is owed, and posted to the general ledger only on collection.

A quick check: levy a charge and look at the trial balance. If it moved, the treatment is
accrual-based and inconsistent with the receipt basis.

## The other direction of error

Most attention goes to over-charging, and the circular is squarely aimed at it. There is an opposite
error worth naming, because it is easy to introduce while fixing the first one.

An instalment that remains unpaid attracts a charge **for the period it stays unpaid**. A system that
levies once per instalment and never opens a second period lets an account sit overdue for a year
having been charged for one day. That is not compliance, it is a bug in the direction of the
borrower — and it will show up as an income line that does not move with the delinquency.

The correct rule is: charge for the days beyond those already charged, never for days already
charged.

## Common mistakes

- **Penal amounts inside the principal outstanding.** Breaks the LTV, the foreclosure quote and the
  provisioning at once, and reintroduces compounding by a side door.
- **Recognising income on levy.** Overstates income on a delinquent book, where much of it is never
  collected.
- **Recomputing the whole charge each night.** Charges the same days repeatedly.
- **Charging once and stopping.** The opposite error, described above.
- **Continuing to levy after NPA.** Inconsistent with receipt-basis recognition on the account.
- **Two charges for one default.** A "late fee" and a "penal charge" on the same missed instalment.
- **"Penal interest" still in the agreement.** The label is what a borrower's counsel will quote.

## Frequently asked questions

### Can penal charges be added to the outstanding principal?

No. The circular prohibits capitalisation and any further interest computed on the charge. Adding it
to principal does both — the balance rises and the next period's interest is computed on it.

### When is a penal charge recognised as income?

On receipt. The borrower's liability arises on levy and belongs on their statement from that date;
the lender's income arises when the money arrives. That is why a correct system's statement of
account and its trial balance show different figures for the same account, and both are right.

### Do the rules apply to loans made before April 2024?

Yes, from the next review or renewal date falling on or after 1 April 2024 and not later than
30 June 2024. A lender with a long book therefore ran two regimes concurrently for a quarter, which
is worth checking: two accounts that are both delinquent today may have switched over on different
dates.

### Is there a prescribed maximum penal charge?

No number is prescribed. The requirement is that the quantum be reasonable and commensurate with the
default, that it not discriminate against individual borrowers taking loans for non-business
purposes, and that it be disclosed in the loan agreement and the Key Facts Statement — and a charge
not disclosed there cannot be recovered at all.

### What should the appropriation order be?

That is a policy decision for the lender, stated in the agreement and applied consistently. What
matters technically is that the order the engine applies is the order the borrower was told, and that
it comes from the terms snapshotted onto that loan rather than from a master somebody can edit.

---

*Both circulars are linked above. The compounding, capitalisation and disclosure points are quoted
from the first; the dates from the second.*

**Related reading:** [How to calculate penal charges](/blog/how-to-calculate-penal-charges-rbi-2024/) ·
[RBI compliance for NBFCs](/blog/rbi-compliance-for-nbfcs-guide/) ·
[The Key Facts Statement requirement](/blog/kfs-key-facts-statement-nbfc-requirement/) ·
[Terms are frozen at sanction](/blog/frozen-terms-at-sanction/)

[Ask for a walk-through](/contact/) — levy a charge and look at the trial balance.
