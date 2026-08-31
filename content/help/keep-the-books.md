---
title: See the accounting behind a loan
description: Every loan event posts a voucher as it happens, so the books are not a month-end reconciliation exercise.
section: The books and the regulator
route: "/accounting"
order: 10
audience: Accounts
---

@shot accounting | The accounting overview showing the consolidated trial balance and whether it is balanced, any open reconciliation alerts, and the books, statements and tax registers available | The trial balance says whether it foots before anybody opens a ledger.
@mark 30.5,16.8 | The trial balance, consolidated. It says how many ledgers it balanced across.
@mark 57,16.8 | Reconciliation alerts, named. An unexplained difference is surfaced rather than absorbed.
@mark 77.5,16.8 | Vouchers are posted by the loan engine as events happen. Manual entries are journals only.
@mark 26,29.6 | The books of entry a Tally-trained accountant expects, by name.

Most lenders run an origination system, a servicing system and an accounting package, and spend the
last week of every month making the three agree. Here a disbursement, a receipt, an accrual, a penal
levy and a provision each post their own voucher at the moment they happen.

## What that means in practice

- A trial balance that is current, not one that is assembled.
- Every figure traceable to the loan event that produced it.
- **Immutable postings** — a financial entry is never updated or deleted. A correction is a reversal
  entry, so the history of what was believed and when survives.

## Rounding lands in one place

Interest is rounded once, when it is booked, and the last instalment of a schedule carries whatever
remainder is left — so the principal components add up to the sanctioned amount exactly, not nearly.

That is the check worth running on any lending system: add a loan's posted interest and see whether
it equals the accrued figure on the account, to the rupee. If it is close rather than exact, the
difference will turn up later as a rounding journal nobody can explain.