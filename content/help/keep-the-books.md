---
title: See the accounting behind a loan
description: Every loan event posts a voucher as it happens, so the books are not a month-end reconciliation exercise.
section: Loan management
order: 10
audience: Accounts
---

@shot accounting | The accounting overview showing the ledgers, their balances and the vouchers behind them | The books, posted by the loan events themselves.

Most lenders run an origination system, a servicing system and an accounting package, and spend the
last week of every month making the three agree. Here a disbursement, a receipt, an accrual, a penal
levy and a provision each post their own voucher at the moment they happen.

## What that means in practice

- A trial balance that is current, not one that is assembled.
- Every figure traceable to the loan event that produced it.
- **Immutable postings** — a financial entry is never updated or deleted. A correction is a reversal
  entry, so the history of what was believed and when survives.

## Money is in paise

Every amount — interest, penal, bounce, provision — is held as an integer in paise, never as a
floating point number. Rounding lands on the last instalment, which is where a lender's own
documents put it.
