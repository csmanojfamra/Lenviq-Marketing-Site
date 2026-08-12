---
title: "What happens to interest already booked when an account turns NPA"
description: "Recognition switches to receipt basis, and income already taken on the account has to come back out in the year of classification. The mechanics are simple; the timing, the status check and the audit trail are where implementations go wrong."
date: "2026-08-11"
category: "Accounting"
author: "FastLegal Technologies"
draft: false
---

When an account becomes non-performing, interest already recognised as income on it must be
**reversed in the financial year in which the account becomes non-performing**, and from that date
income on the account is recognised only when money is actually received. Income recognition on a
performing advance is on accrual; on a non-performing one it is on receipt. The rule that trips
systems is the transition between the two.

## What are the three movements?

**Stop accruing to income.** From the NPA date, interest continues to be computed — the borrower
still owes it — but it goes to a suspense head rather than to the profit and loss account.

**Reverse what was already taken.** Interest accrued and unrealised on that account is reversed out
of income. Not written off; moved.

```
Dr  Interest income
    Cr  Interest suspense
```

**Recognise on receipt.** When money arrives, the portion attributable to interest comes out of
suspense into income, on the date it arrived.

```
Dr  Bank
    Cr  Interest suspense

Dr  Interest suspense
    Cr  Interest income
```

| | Before NPA | After NPA |
|---|---|---|
| Basis | Accrual | Receipt |
| Interest computed? | Yes, to income | Yes, to suspense |
| Interest already taken | Stays | Reversed, in the year of classification |
| Borrower's liability | Unchanged | **Unchanged** |

That last row is the one to hold on to. Reversal is an accounting act about the lender's books. It
forgives nothing, and a claim in a recovery proceeding still includes it.

## Where do implementations go wrong?

**The reversal is skipped because the interest was never posted.** If interest accrues onto the loan
account daily but only reaches the general ledger monthly, an account that turns NPA mid-month has
accrued interest that was never recognised. There is nothing to reverse — but the pre-NPA portion of
that month still had to be recognised, and then reversed. Both halves get missed together, and the
books balance, which is why nobody notices.

**Impairment is treated as a status rather than a history.** An account that is written off, settled
or partly recovered from a security auction got there *through* impairment. Interest attributable to
it belongs in suspense, not income — but a check written as `status == NPA` returns false for all
three of those, and books the interest as income on the way out.

**The reversal happens and the receipt-basis recognition never does.** The commonest failure of all,
and the one with a permanent effect. After classification the account's accrued-interest figure is
zero, because the reversal emptied it. A later payment finds no interest to apply and reduces
principal instead. Suspense sits untouched and grows; income is understated; the principal recovery
is overstated.

**Suspense is released to income on upgrade.** Upgrading restores accrual recognition. It does not
convert uncollected interest into collected interest. The suspense balance returns to the accrued
position — still owed, still not yet income.

**Suspense is released to income on write-off.** It goes to the write-off expense. Releasing it to
income books revenue at the moment the asset is being given up.

## How do you check your own system?

1. Find an NPA account with a suspense balance.
2. Post a payment.
3. Did the payment meet the **suspended interest before principal**?
4. Did the suspense balance fall by that amount?
5. Was income recognised, for that amount, on the date of receipt?
6. Now upgrade an account by clearing its arrears. Did suspense move back to accrued, or to income?

Steps 3 to 5 fail together in most systems that have only implemented the reversal.

## A worked example

A term loan of ₹4,00,000. Interest accrues at ₹4,000 a month. The borrower stops paying after
March.

- **April to June** — interest of ₹12,000 accrues and is recognised as income. The account is
  standard until the ninety-day mark.
- **Late June** — the account crosses ninety days past due and is classified sub-standard. The
  ₹12,000 already recognised is reversed: `Dr Interest income 12,000 / Cr Interest suspense 12,000`.
  The account's accrued interest is now nil; suspense is ₹12,000; the borrower owes ₹4,12,000.
- **July onwards** — interest continues to be computed at ₹4,000 a month and added to suspense. None
  of it is income.
- **October** — the borrower pays ₹20,000. It meets the suspended interest first: suspense falls from
  ₹24,000 to ₹4,000, and ₹20,000 is recognised as income in October. Principal is untouched.
- **The account does not upgrade**, because the arrears are not cleared in full — ₹4,000 of interest
  remains outstanding.

Now the incorrect version, which is what a system that stopped at the reversal produces: the ₹20,000
finds no accrued interest, reduces principal to ₹3,80,000, recognises no income, and leaves suspense
at ₹24,000. The book shows a smaller loan than the borrower owes, no income for the quarter, and a
suspense balance nothing will ever clear.

## Common mistakes

- **Reversing without ever recognising on receipt.** Understates income permanently.
- **`status == NPA` as the test.** Misses written-off, settled and auction-recovered accounts.
- **Monthly posting with mid-month classification.** Both the recognition and its reversal go
  missing.
- **Releasing suspense to income on upgrade.** Upgrade restores accrual; it does not collect.
- **Releasing suspense to income on write-off.** It belongs to the write-off expense.
- **No audit record of the reversal.** The single largest movement on the account, and the one an
  auditor will ask about first.
- **Treating suspense as forgiven.** A claim in court includes it; a statement for the books does
  not. Both are right, which is why they need to be two statements.

## How Lenviq handles this

Classification writes the reversal as an event with its own record, and the account's accrued
interest moves to suspense in the same transaction. From that date a receipt on the account meets
suspended interest before current interest and before principal, clears suspense by exactly that
amount, and recognises income on the date of receipt — `Dr Bank / Cr Suspense` then
`Dr Suspense / Cr Income`, with the interest-receivable leg reduced by the suspended portion so the
same interest is never booked twice. The borrower's receipt shows the interest they paid, whichever
bucket it came from, because from their side there is only one.

## Frequently asked questions

### Does reversing interest to suspense reduce what the borrower owes?

No. Suspense is a position in the lender's books; it is not a waiver. The borrower remains liable for
every rupee, which is why a statement of account prepared for a recovery proceeding and one prepared
for the books legitimately show different totals.

### In which year must the reversal be made?

In the financial year in which the account becomes non-performing. That is what makes mid-year
classification a live issue for the accounts rather than a note for next year.

### What happens to suspense when the account is upgraded?

It returns to the accrued position, because collection is once again expected. It does not become
income — the interest has still not been received. Upgrade itself requires the entire arrears of
interest and principal to have been paid.

### What happens to suspense on write-off?

It is cleared against the write-off expense, not released to income. Recovery afterwards is
recognised when it arrives, in a recovery-of-written-off account, because the asset it related to is
no longer on the books.

### How should a payment on an NPA account be applied?

Charges first if the appropriation order says so, then the suspended interest, then current interest,
then principal. The point is that suspended interest is the *oldest* interest on the account and must
be met before principal — a system that skips it because the accrued field is zero is reducing
principal with money that was interest.

---

**Related reading:** [NBFC income recognition rules](/blog/nbfc-income-recognition-rbi-rules/) ·
[How to automate NPA classification](/blog/how-to-automate-npa-classification-nbfc/) ·
[Classification is a day-end event](/blog/irac-day-end-classification/) ·
[RBI compliance for NBFCs](/blog/rbi-compliance-for-nbfcs-guide/)

[Ask for a walk-through](/contact/) — post a receipt on an NPA account and follow it through the
ledger.
