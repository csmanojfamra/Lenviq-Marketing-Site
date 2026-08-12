---
title: "Money is an integer: why a lending ledger holds paise, not rupees"
description: "Floating-point arithmetic cannot represent a tenth exactly. In a loan book that becomes a reconciliation that is off by rupees with every transaction matching. Why integer paise is the only workable representation, and what it looks like when it was not done."
date: "2026-08-11"
category: "Engineering"
author: "FastLegal Technologies"
draft: false
---

Store money as an **integer number of paise**, never as a decimal or a floating-point rupee value.
₹1,00,000 is `10000000`. Every arithmetic operation is then exact, and rounding becomes a single
explicit decision — usually the last instalment absorbing the remainder — rather than an emergent
property of the arithmetic that shows up as a reconciliation nobody can close.

This is not a regulatory requirement. It is the design decision that decides whether a lending
system's books can be closed at all, it is made once, early, and it is close to impossible to change
afterwards.

## What is the problem with floating-point money?

A binary floating-point number cannot represent 0.1 exactly, for the same reason a decimal cannot
represent a third exactly. Add ₹0.10 ten times in a `float` and you do not get ₹1.00 — you get
something a hair off, and which side of the decimal the hair falls on depends on the values.

```
0.1 + 0.2  =  0.30000000000000004
```

On a single instalment nobody notices. On a hundred thousand instalments, each split into principal
and interest, aggregated into a trial balance and reconciled against a bank statement, the residue is
a number somebody has to explain to an auditor.

The failure has a signature: **every transaction matches and the totals do not.** That is what tells
you it is representation rather than a missing entry.

## Why doesn't rounding fix it?

The instinct is to round at display time. That moves the problem rather than solving it.

The stored value is still slightly wrong. The next computation compounds it. And now the displayed
figure and the stored figure disagree — so a report and a ledger built from the same data produce
different totals, which is worse than either being wrong on its own, because there is no longer a
single answer to check.

Rounding at every step is worse still: each rounding introduces its own error, and the errors do not
cancel because they are not random — they are biased by the direction of the values.

## What does the integer rule mean in practice?

| Concern | With floats | With integer paise |
|---|---|---|
| ₹1,00,000 stored as | `100000.0` | `10000000` |
| Adding a schedule | Drifts | Exact |
| Splitting an EMI | Two values that may not sum to it | Two values that sum to it by construction |
| Rounding | Everywhere, implicitly | One place, deliberately |
| Reconciliation | Off by paise, source unclear | Off only if an entry is missing |

Three consequences follow in the code:

**Interest is computed and then rounded once, deliberately.** A daily accrual of principal × rate ÷
365 produces a fraction. Round it to paise at that point, store the integer, and the account's
accrued interest is the sum of exactly the amounts that were booked.

**The schedule closes to zero.** The instalments are computed, the components are rounded, and the
final instalment takes the remainder so the sum of the principal components equals the principal.
That is a rule, written down, rather than an accident.

**Percentages are held in basis points.** 12.75% is `1275`. Same reason: a rate stored as a float
reintroduces the problem at the top of the computation.

## What does it look like when it was not done?

Three symptoms, and they arrive in this order:

**A reconciliation that is off by rupees, not by transactions.** Every entry matches; the totals do
not. Somebody posts a rounding-difference journal, and it grows every month.

**A schedule whose instalments do not sum to the loan.** Off by a few paise, adjusted by hand at
sanction. Now the agreement and the system differ, and the agreement is what the borrower has.

**Interest that differs between the statement and the ledger** for the same period, because one
recomputed from the rate and the other summed what was stored.

By the time the third symptom appears the fix is not a code change — it is a migration of every
balance in the book, with a reconciliation against the old values that will not close, because the
old values were never exactly right.

## Isn't a decimal type good enough?

A fixed-point decimal — `NUMERIC(18,2)` in Postgres, `BigDecimal` in Java — is genuinely better than
a float and is a defensible choice. It represents 0.1 exactly and does not drift on addition.

Two things still favour integers. First, decimals do not remove the rounding decision on division;
they only make it visible, so the discipline about *where* to round is still required. Second, the
representation crosses boundaries badly: a decimal serialised to JSON becomes a string or a float
depending on the library, and the float path silently reintroduces the original bug at the edge of
the system. An integer survives every boundary it crosses.

## Common mistakes

- **Floats anywhere in the money path**, including in a report that "just displays" a figure.
- **Rounding at each step** rather than once at a named point.
- **A rate held as a float.** The error starts before the money is touched.
- **Different rounding in the schedule and the accrual.** They will disagree for the same period.
- **A rounding-difference account that grows.** It is a symptom being managed rather than a problem
  being fixed.
- **Integer paise internally, floats at the API.** The boundary undoes the discipline.
- **Percentages of percentages** — a penal rate applied to an interest amount already rounded — done
  without deciding the order.

## A worked example

A loan of ₹5,00,000 for 12 months at 12%, reducing balance.

The instalment is ₹44,424.39. Twelve of them is ₹5,33,092.68. The principal components, each rounded
to paise, sum to ₹4,99,999.97 — three paise short of the loan.

**With floats:** the shortfall is invisible until the loan closes with a residual balance of ₹0.03
that nobody can collect and nobody can write off without an entry. Multiply by a book of ten
thousand loans.

**With integer paise:** the schedule generator knows the sum of the components must equal
`50000000`. It computes eleven instalments, sums their principal components, and the twelfth takes
`50000000` minus that sum. The final instalment is three paise larger than the others, the schedule
closes exactly, and the loan reaches zero on its last payment.

The second version required a decision — that the last instalment absorbs the remainder — and that
decision is now written down where an auditor can read it.

## How Lenviq handles this

Every monetary amount in the platform is an integer number of paise, held as a 64-bit integer end to
end — in the database, in the engine and across the API. Rates are basis points. Interest is rounded
to paise at the point it is booked, once. Schedules close to exactly the principal, with the final
instalment absorbing the remainder as a stated rule. There is no rounding-difference account, because
there is nothing for it to hold.

## Frequently asked questions

### Why not just use a decimal type in the database?

A fixed-point decimal is a reasonable choice and avoids the addition drift. What it does not avoid is
the rounding decision on division, and it travels badly across API boundaries where a serialiser may
turn it into a float. An integer is unambiguous everywhere it goes.

### Where should rounding happen in a loan system?

At named points, decided deliberately: when interest is booked for a period, and when a schedule's
final instalment absorbs the remainder so the components sum to the principal. Rounding anywhere else
— particularly at display time, on a value that will be used again — creates two versions of the same
figure.

### How do you handle GST and other percentages of an amount?

The same way: compute on integers, round once to paise, store the result. The order matters when a
percentage is applied to an already-rounded figure, so it should be fixed by rule rather than left to
whichever code path runs first.

### Can this be fixed later?

Technically yes, practically it is a migration of every balance in the book with a reconciliation that
will not close — because the values you are migrating from were never exactly right. It is far
cheaper to be right at the start, which is why it is worth asking a vendor how money is represented
before anything else about the ledger.

### Does this matter for a small NBFC?

The error scales with the number of computations, not the size of the book, and a small lender does
the same arithmetic per loan as a large one. What differs is only how long it takes before somebody
has to explain the difference.

---

**Related reading:** [Day-end is a business date](/blog/day-end-not-real-time/) ·
[What must be kept in the books](/blog/books-of-account-what-must-be-kept/) ·
[NBFC software: the complete guide](/blog/nbfc-software-complete-guide/) ·
[What counts as an audit trail](/blog/audit-trail-what-counts/)

[Ask for a walk-through](/contact/) — take a schedule and add up the components.
