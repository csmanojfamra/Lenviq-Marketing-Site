---
title: "DCB reconciliation: the seven reasons demand, collection and balance stop tying"
description: "Opening plus demand minus collection should equal closing. When it does not, the break is almost always one of seven things — and six of them are not errors but postings the identity was never written to accommodate."
metaDescription: "DCB reconciliation for a loan book: why opening + demand - collection does not equal closing, and the seven postings that break the identity."
date: "2026-10-09"
category: "Accounting"
author: "CA Anil Agarwal"
tool: "penal-charge-calculator"
draft: false
---

The DCB statement rests on one identity:

> **Opening balance + demand raised − collection = closing balance**

It is the most useful reconciliation a lending operation has, because unlike a trial balance it ties
the *borrower's* position to the *lender's* ledger, and a break in it means one of the two is
describing a loan that does not exist.

It also breaks constantly. And the instinct — look for a posting error — is usually wrong. **Six of
the seven common causes are correct postings that the identity, as written above, simply does not
have a term for.** The fix is to write the identity properly, not to hunt for a mistake.

## What each letter actually means, because this is where it starts

**Demand** is what the lender *called for* in the period. Not what accrued, and not what was due in
some abstract sense — what was **demanded**, on a date the lender fixed.

That distinction does the most work in this whole subject. Interest accrues daily; it becomes demand
on the instalment date. A DCB built from accrual will never tie to a DCB built from demand, and both
are defensible statements about the same book.

**Collection** is what was received *and appropriated*, in the period, against that demand.

**Balance** is what remains demanded and unpaid — the arrears — **not** the outstanding principal.
This is the second most common confusion: a DCB closing balance is an *overdue* figure. A statement
whose closing balance equals total outstanding is not a DCB.

So the identity, stated honestly, is about **arrears**:

> Opening arrears + demand raised − collection against demand = closing arrears

## The seven things that break the identity

### 1. Interest accrued but not yet demanded

The accrual is in the ledger from the day it happened; the demand is raised on the instalment date.
Between those two dates the general ledger and the DCB disagree by exactly the accrued-not-demanded
amount, and both are right.

**Not a break — a missing term.** A DCB that reconciles to the GL needs an *accrued but not demanded*
line, or it needs to state that it is a demand-basis statement and the GL is an accrual-basis one.

### 2. A receipt appropriated to something the demand did not include

A payment settles charges, then penal, then interest, then principal — whatever the appropriation
order is. If a borrower pays ₹10,000 against a demand of ₹9,000 and ₹1,000 lands on a penal charge
that was never raised as demand, collection exceeds demand and the arrears go negative.

**The identity needs collection split by what it settled**, against demand and outside it. One
collection figure cannot reconcile against a demand that has a different composition.

### 3. Penal charges, which are not interest and not principal

A penal amount is a **charge**, levied on receipt basis for GL purposes, non-compounding, and **not
added to principal** — see [penal charges are not interest](/blog/penal-charges-not-interest/). So a
penal levy appears on the borrower's statement as something owed and does not increase the principal
demand.

A DCB that adds penal into the demand column and then nets collections against it will tie. A DCB
that shows penal as a shadow entry and collects against it in the same column will not. **Both
designs exist and they produce different closing balances from the same facts.**

### 4. A reversal

Reverse a receipt and you must reverse what it settled. The collection column reduces — that part is
easy — and the **arrears it had cleared come back**, which means an instalment that was PAID is now
PENDING and the period's closing balance moves retrospectively.

If the reversal is dated into a period you have already reported, the DCB for that period changes
after the fact. That is correct behaviour and it is the single most common reason a re-run of last
month's DCB does not match the one you circulated.

### 5. A backdated receipt landing under entries already posted

The borrower paid on the 3rd; it was keyed on the 8th. Every accrual between those dates was computed
on a principal the receipt has since changed. The receipt is right and the accruals are stale.

The DCB will tie for the *period* and the arrears ageing inside it will be wrong, because the DPD on
which the demand ageing rests was derived from a position the payment has altered. **Reprocessing is
what restates it**, and a book that never reprocesses accumulates these silently.

### 6. Waivers and write-offs

A waived penal charge, a written-off balance: demand was raised and will never be collected, and the
arrears have to come down without a collection. **That needs its own column.** Netting a waiver into
collection makes collection efficiency look better than it was, which is the exact distortion the
next page is about — [collection efficiency](/blog/collection-efficiency-how-to-compute/).

### 7. Advance money, held and not yet applied

A borrower pays before the demand exists. The cash is in the bank, the demand is not raised, and the
money cannot be collection against a demand that has not happened.

If it is netted into collection, the period shows collection exceeding demand and the next period
shows a demand with no collection against it. **Advance is a liability until the demand it will meet
is raised**, and it needs to sit in its own line until then.

## The identity that actually reconciles

Put the six missing terms in and it ties:

> **Opening arrears**
> **+** demand raised in the period
> **−** collection appropriated against that demand
> **−** waivers and write-offs
> **±** reversals of prior-period collections
> **+** penal and charges levied, where the design treats them as demand
> **=** **Closing arrears**

with two figures carried alongside rather than inside it:

- **accrued but not demanded** — the bridge to the general ledger
- **advance held, unapplied** — cash received against no demand

A DCB with those eight lines reconciles against both the borrower's statement and the ledger. A DCB
with three columns reconciles against neither, and the daily hunt for the difference is a search for
a term rather than an error.

## How to tell which of the seven it is, quickly

Work from the sign and the size.

| Symptom | Look at first |
|---|---|
| Closing arrears **negative** | collection appropriated outside demand (2), or advance netted in (7) |
| Break equals an exact instalment | a reversal (4) |
| Break is small and grows daily | accrued-not-demanded (1) |
| Break appears only on overdue accounts | penal treatment (3) |
| Last month's DCB no longer reproduces | a reversal (4) or a backdated receipt (5) |
| Break equals a round number | a waiver (6) |

**"Last month no longer reproduces" is the one to take seriously**, because it is the only symptom
on that list that says something about your records rather than your statement design. The others
are reconcilable once the identity has the right terms. That one means the position you reported was
derived rather than retained, and a derived position is not evidence.

## The one design decision worth making once

Decide whether your DCB is **demand basis** or **accrual basis**, write it on the statement, and never
produce both without labelling them.

Demand basis is what a collections team needs and what matches the borrower's passbook. Accrual basis
is what ties to the general ledger. Each is correct for its purpose, and a lender who produces one
and reconciles it against the other will spend a long time looking for a difference that is not an
error at all.


## Frequently asked questions

### Is the DCB closing balance the outstanding principal?

No. It is the arrears — what was demanded and remains unpaid. A statement whose closing balance
equals total outstanding is not a DCB, and the confusion is the second most common cause of a break
that is not a break.

### Should a DCB be prepared on demand basis or accrual basis?

Either, consistently, and labelled. Demand basis matches the borrower's passbook and is what a
collections team needs. Accrual basis ties to the general ledger. The difference between them is the
accrued-but-not-yet-demanded interest, and reconciling one against the other is a search for a term
rather than an error.

### Why does last month's DCB no longer reproduce?

Almost always a reversal or a backdated receipt. Both change a prior period's position after it was
reported, and both are correct behaviour. If neither has occurred and it still does not reproduce,
the positions are being derived rather than retained — which is a records problem rather than a
statement-design one.

### Should a waived charge be shown as collection?

Never. Demand was raised and no money arrived. Netting a waiver into collection makes collection
efficiency improve as a direct result of giving up on money, so a waiver needs its own column.

---

**Related:** [What diligence asks for](/blog/due-diligence-what-lenders-ask/) ·
[Collection efficiency: four numbers from one book](/blog/collection-efficiency-how-to-compute/) ·
[Penal charges are not interest](/blog/penal-charges-not-interest/) ·
[When reconciliation is off by rupees](/blog/reconciliation-off-by-rupees/) ·
[Classification is a day-end event](/blog/irac-day-end-classification/) ·
[Where demand, collection and arrears are kept](/loan-management-system/)
