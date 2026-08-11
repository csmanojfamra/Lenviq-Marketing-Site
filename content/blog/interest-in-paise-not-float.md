---
title: "Money in a lending system belongs in paise, and the reason is not tidiness"
description: "A floating-point rupee is wrong by a fraction on every computation. On a loan book that fraction compounds into a reconciliation nobody can close."
date: "2026-08-11"
category: "Engineering"
author: "FastLegal Technologies"
draft: false
---

This one is not regulatory. It is the single design decision that decides whether a lending system's
books can be closed, and it is made once, early, and is almost impossible to change afterwards.

## The problem in one line

A binary floating-point number cannot represent 0.1 exactly. Add ₹0.10 ten times in a `float` and you
do not get ₹1.00 — you get something a hair off, and the hair is on the wrong side of the decimal
depending on the values.

On a single EMI nobody notices. On a hundred thousand instalments, split into principal and interest
components, aggregated into a trial balance and reconciled against a bank statement, the residue is a
number somebody has to explain.

## Why rounding does not fix it

The instinct is to round at display time. That moves the problem rather than solving it: the stored
value is still slightly wrong, the next computation compounds it, and now the displayed figure and
the stored figure disagree — so a report and a ledger built from the same data produce different
totals.

## The rule

**Store money as an integer number of paise.** ₹1,00,000 is `10000000`. Every arithmetic operation
is integer arithmetic, and every result is exact.

Rounding then becomes an explicit decision at exactly one point — usually the last instalment, which
absorbs the remainder so that the schedule sums to the principal — rather than an emergent property
of the arithmetic.

## What it looks like when it was not done

Three symptoms, and they arrive in this order:

**A reconciliation that is off by rupees, not by transactions.** Every entry matches; the totals do
not.

**A schedule whose instalments do not sum to the loan.** Off by a few paise, "adjusted" by hand.

**Interest that differs between the statement and the ledger** for the same period, because one
recomputed and the other stored.

None of them is a bug you can find, because there is no single wrong line. That is what makes it a
decision to get right at the beginning rather than a defect to fix later.
