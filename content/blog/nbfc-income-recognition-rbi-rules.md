---
title: "NBFC income recognition: what the RBI rules require once an account turns bad"
description: "Income recognition on non-performing assets — why accrued interest is reversed to suspense at classification, what receipt-basis recognition means in the ledger, how a later payment should be applied, and the half of the rule most systems never implement."
date: "2026-08-12"
category: "How-to"
author: "FastLegal Technologies"
draft: false
---

An NBFC recognises interest income on an accrual basis while an account is standard, and on a
**receipt basis** from the date it becomes non-performing. At classification, interest that has
accrued but not been collected is reversed out of income to a suspense account. From that date,
income is recognised only as money actually arrives.

Both halves are the rule. The first is almost always implemented, because it shows up in the profit
and loss statement and somebody notices. The second frequently is not — and its absence understates
income permanently while a suspense balance grows that nobody can clear.

## Why is accrued interest reversed at classification?

Because it was recognised as income and, on the evidence, it should not have been. An account ninety
days past due is one where the lender's expectation of collection has failed the test the norms set.
Income already taken to the profit and loss statement on that account has to come back out.

The entry, in substance:

```
Dr  Interest income
    Cr  Interest suspense
```

The suspense account is a contra-asset: the interest is still owed by the borrower, it is simply not
income until it arrives. Reversing it does not forgive it, and this distinction matters when the
account is later litigated — a claim filed in court states what the borrower owes, including
interest the lender has written back in its own books.

## What does receipt-basis recognition mean in practice?

From the NPA date, when the borrower pays, the payment must **meet the suspended interest before it
touches principal**, and the amount so met is recognised as income on the date of receipt.

```
Dr  Bank
    Cr  Interest suspense          (the money arrives against the suspended interest)

Dr  Interest suspense
    Cr  Interest income            (and is now recognised)
```

This is the half that goes missing. The failure is easy to describe: after classification, the
account's accrued-interest field is zero — the reversal emptied it — so a payment finds no interest
to apply and reduces principal instead. The suspense balance sits untouched. The symptoms are an
understated income line, an overstated principal recovery, and a suspense account that only grows.

The test takes two minutes. Find an NPA account with a suspense balance. Post a payment. Check three
things: did the suspense balance fall, was income recognised for that amount on that date, and did
principal stay where it was until the suspended interest was exhausted?

## What happens when the account is upgraded?

If the borrower clears the entire arrears of interest and principal, the account returns to standard
and accrual recognition resumes. Any interest still sitting in suspense at that point is brought back
into the accrued position — it is once again expected to be collected.

Note the ordering trap: upgrade requires arrears **cleared in full**. A part-payment that reduces
days-past-due below ninety does not upgrade the account, so it does not resume accrual either.

## What if the loan is written off?

Write-off closes the position: the suspense balance is cleared against the write-off expense, not
released to income. Recovery afterwards is recognised when it arrives, in a recovery-of-written-off
account rather than as ordinary interest income, because the asset it related to is no longer on the
books.

## How does this interact with penal charges?

The two rules point the same way and are often confused.

- **Interest** is accrual-based until NPA, then receipt-based.
- **Penal charges** are receipt-based from the start, because they are charges rather than interest
  ([RBI/2023-24/53](https://rbi.org.in/Scripts/NotificationUser.aspx?Id=12527&Mode=0)).

So an NBFC running both correctly has two different reasons for the same treatment on the same
account, and one of them — penal — applies whether or not the account is impaired.

| | Standard account | NPA account |
|---|---|---|
| Interest | Accrued to income | Reversed to suspense; recognised on receipt |
| Penal charges | Shadow entry; income on receipt | Levy stops; existing charges suspended |
| Principal | Reduced by receipts after charges and interest | Same order, after suspended interest |

## Common mistakes

- **Reversing but never recognising.** The single most common defect. Suspense only grows.
- **Payments reducing principal while interest sits in suspense.** The mechanical cause of the above.
- **Recognising suspense as income on upgrade.** Upgrade restores accrual; it does not convert
  uncollected interest into collected interest.
- **Releasing suspense to income on write-off.** It goes to the write-off expense.
- **Applying a receipt to interest *and* leaving suspense untouched.** Double-counts: the receivable
  was already written back, so crediting it again on receipt books the same interest twice.
- **A separate suspense treatment per product.** The same defect as per-product classification, one
  layer down.

## A worked example

A gold loan of ₹3,00,000 at 1% a month, disbursed 15 January, serviced monthly, unpaid throughout.

- **16 May** — the account crosses ninety days past due on the first unpaid servicing date and is
  classified sub-standard. Interest accrued to date, ₹23,350, is reversed:
  `Dr Interest income 23,350 / Cr Interest suspense 23,350`.
  The account's accrued-interest field is now zero. Its suspense balance is ₹23,350. The borrower
  still owes ₹3,23,350.
- **June** — the borrower pays ₹23,350. Correct handling: the payment meets the suspended interest
  first. Suspense falls to nil; ₹23,350 is recognised as income in June; principal is untouched at
  ₹3,00,000. The arrears of interest are now cleared in full, so the account upgrades.
- **The incorrect handling**, and what it looks like: the payment finds accrued interest of zero,
  reduces principal to ₹2,76,650, leaves suspense at ₹23,350, and recognises no income. The book now
  shows a smaller loan than the borrower owes and a suspense balance with nothing to clear it.

## How Lenviq handles this

On classification the accrual is reversed to suspense and an income event is recorded. From that
date, a receipt on the account meets suspended interest before current interest and before principal,
clears the suspense by exactly that amount, and recognises the income on the date the money arrived —
one pair of entries, `Dr Bank / Cr Suspense` then `Dr Suspense / Cr Income`. The interest leg to
interest receivable is reduced by the suspended portion, so the same interest is never booked twice.
The borrower's receipt shows the interest they paid, whichever bucket it came from, because from
their side there is only one.

The statement of account is produced in three versions for this reason: what the borrower owes, what
the books say, and — for a recovery proceeding — what is claimable, which includes interest the
lender has reversed in its own books but the borrower has not been forgiven.

## Frequently asked questions

### Why is interest reversed when an account becomes NPA?

Because it was recognised as income on the expectation of collection, and ninety days past due is the
point at which the norms treat that expectation as failed. The reversal takes the income back out;
it does not reduce what the borrower owes.

### Does reversing interest to suspense mean the borrower no longer owes it?

No. Suspense is an accounting position about the lender's books, not a waiver. The borrower remains
liable, and a claim in a recovery proceeding includes it — which is why a statement prepared for
court and a statement prepared for the books legitimately show different totals.

### When is interest on an NPA account recognised as income?

On the date the money is actually received, and only to the extent received. A payment should meet
the suspended interest before it reduces principal, and the amount so met is what gets recognised.

### What happens to interest in suspense if the account is upgraded?

It returns to the accrued position and accrual recognition resumes, because the account is once again
one where collection is expected. Upgrade itself requires the entire arrears of interest and
principal to have been paid.

### How are penal charges treated differently from interest?

Penal amounts are charges rather than interest, so they are recognised on receipt from the outset —
not only after classification. On an account that turns NPA, new levy stops and outstanding charges
are suspended, but what has been levied remains owed by the borrower.

---

**Related reading:** [Income reversal on NPA](/blog/npa-income-reversal/) ·
[RBI compliance for NBFCs](/blog/rbi-compliance-for-nbfcs-guide/) ·
[How to automate NPA classification](/blog/how-to-automate-npa-classification-nbfc/) ·
[How to calculate penal charges](/blog/how-to-calculate-penal-charges-rbi-2024/)

[Ask for a walk-through](/contact/) if you want to see a receipt on an NPA account followed through
the ledger.
