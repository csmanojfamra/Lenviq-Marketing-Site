---
title: "What happens to interest already booked when an account turns NPA"
description: "Recognition switches to receipt basis, and income already taken on the account has to come back out. The mechanics are simple; the timing and the audit trail are where it goes wrong."
date: "2026-08-11"
category: "Accounting"
author: "FastLegal Technologies"
draft: false
---

Income recognition on a performing advance is on accrual. On a non-performing one it is on receipt.
The rule that trips systems is the transition between the two: **income recognised before the asset
became non-performing has to be reversed in the financial year in which it becomes non-performing.**

## The three movements

**Stop accruing to income.** From the NPA date, interest continues to be computed — the borrower
still owes it — but it goes to a suspense head rather than to the profit and loss account.

**Reverse what was already taken.** Interest accrued and unrealised on that account is reversed out
of income. Not written off; moved.

**Recognise on receipt.** When money actually arrives, the portion attributable to interest is taken
to income then, out of suspense.

## Where implementations go wrong

**The reversal is skipped because the interest was never posted.** If interest accrues onto the loan
account daily but only reaches the general ledger monthly, an account that turns NPA mid-month has
accrued interest that was never recognised. There is nothing to reverse — but the pre-NPA portion of
that month still had to be recognised, and then reversed. Both halves get missed together, and the
books balance, which is why nobody notices.

**Impairment is treated as a status rather than a history.** An account that is written off, settled
or partly recovered from a security auction got there *through* impairment. Interest attributable to
it belongs in suspense, not income — but a check written as `status == NPA` returns false for all
three of those, and books the interest as income on the way out.

**The reversal is dated when it was run.** It belongs in the period the asset became non-performing.
A job that runs on the 3rd and stamps the 3rd has moved income between two financial years if the
classification date fell on the 31st.

## The check

Take an account that turned NPA mid-period and ask the ledger three questions: what income did this
account contribute before the NPA date, what was reversed, and what is sitting in suspense. If the
answer requires opening the loan account screen rather than the general ledger, the reversal has not
really happened — it has been recorded somewhere that no financial statement reads.
