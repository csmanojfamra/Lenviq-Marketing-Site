---
title: "Why a reconciliation is off by a few rupees when every entry matches"
description: "Every transaction ties, the totals do not, and somebody posts a rounding-difference journal that grows every month. What actually causes it, how to test for it in an afternoon, and what it costs if it is left alone."
metaDescription: "Every transaction ties and the totals do not. What causes that gap in a loan book, how to test for it in an afternoon, and what it costs."
date: "2026-08-11"
category: "Accounting"
author: "CA Himanshu Sharma"
draft: false
---

If your reconciliation is off by a few rupees and every individual entry matches, the difference is
almost never a missing entry. It is the arithmetic itself. The system is storing money in a form
that cannot hold an exact amount, so every calculation loses a fraction of a paisa, and a hundred
thousand of those become a figure somebody has to explain.

The tell is precise, and it is worth knowing because it saves a week of looking in the wrong place:
**every transaction matches and the totals do not.** A missing entry breaks a transaction. This
breaks only the sum.

## What causes it

Computers store fractions in binary, and binary cannot hold one-tenth exactly — for the same reason
a decimal cannot hold one-third exactly. Ten paise added ten times does not come to one rupee. It
comes to a hair more, or a hair less, and which way it falls depends on the numbers.

On one instalment nobody sees it. On a book of fifty thousand instalments, each split into principal
and interest, added into a trial balance and matched against a bank statement, the residue is a
number in your accounts with no document behind it.

## Why rounding the display does not fix it

The instinct is to show a rounded figure. That hides the difference rather than removing it.

The stored value is still slightly wrong, the next calculation builds on it, and now the figure on
the report and the figure in the ledger disagree. That is worse than either being wrong on its own,
because there is no longer one answer to check against.

Rounding at every step is worse still. Each rounding adds its own small error, and the errors do not
cancel out — they lean the same way, because the amounts do.

## What it costs if it is left alone

Three things happen, in this order.

**A rounding-difference journal appears, and grows.** Somebody posts the gap to a suspense head to
close the month. Next month it is bigger. Within a year it is a line an auditor asks about, and
nobody can produce the entries that made it.

**A repayment schedule stops summing to the loan.** The instalments are off by a few paise against
the sanctioned amount, so somebody adjusts the last one by hand. Now the schedule in the agreement
and the schedule in the system are different documents — and the borrower is holding the first one.

**Interest certificates and the ledger disagree.** A borrower asks for a certificate under section
80C or for a tax filing. The figure is computed fresh, the ledger figure was accumulated, and the
two are not the same. That conversation is expensive.

## How to test your own system in an afternoon

You do not need access to the code. Four checks, all from reports you already have:

1. **Take one loan and add up its posted interest.** Does the total equal the accrued interest shown
   on the account? It should be exact.
2. **Add the principal components of a full repayment schedule.** Does the sum equal the sanctioned
   amount to the rupee, with the last instalment carrying any remainder?
3. **Look for a rounding-difference or suspense head in the trial balance.** Is there a balance in
   it? Has it grown over the last four quarters?
4. **Ask for the same figure twice from two places** — a report and the ledger. Do they agree
   exactly, or nearly?

Three exact answers and an empty suspense head means the arithmetic is sound. A "nearly" anywhere is
the signature above.

## How it should be built

The amounts are held as whole paise rather than as decimal rupees, so nothing is lost in the
arithmetic to begin with. Rates are held the same way, in hundredths of a percent, because a rate
that drifts reintroduces the problem at the very first calculation.

Rounding then happens **once, deliberately, in one place**: interest is computed and rounded when it
is booked, and the last instalment of a schedule carries whatever remainder is left so the schedule
closes on the sanctioned amount exactly. That is a written rule rather than something the arithmetic
does on its own.

None of this is a regulatory requirement. It is the decision that determines whether the books can
be closed at all, it is taken once and early, and it is close to impossible to change afterwards —
which is why it is worth asking about before you buy, not after.

## What it looks like with numbers

A book of 50,000 live instalments, each split into principal and interest, loses a fraction of a
paisa on each of the two components. At around half a paisa a component that is roughly ₹500 a month
of unexplained difference — small enough that the first month is absorbed without comment, and
₹6,000 by the end of the year sitting in a suspense head with no entries behind it.

The figure itself is never the problem. The problem is that nobody can produce the transactions that
made it, so it cannot be written off and it cannot be explained.
