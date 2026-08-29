---
title: Disburse a loan
description: Raise a tranche, have somebody else release it, and see the money reach the borrower and the books at the same moment.
section: Origination
order: 40
audience: Operations
---

Disbursement is **maker-checker**: the person who raises it is not the person who releases it. That
is not a setting somebody remembered to switch on — it is how the screen works.

@shot approvals-inbox | The Lenviq approvals inbox, showing the files waiting for a decision with the amount on each and how long it has been waiting | Four eyes on the money: the person who raises a tranche is not the person who releases it.

## What is checked before the money moves

- **The account can fund it.** The payout account's balance is read from the books; an account that
  has not been funded refuses the payout rather than going overdrawn quietly.
- **The sanction bounds it.** A tranche larger than what is left of the sanction is refused.
- **The product's tranche count.** Most products are disbursed once. Stage-wise release belongs to
  construction-linked lending, and it is a setting on the scheme — a gold loan is weighed, valued
  and handed over once, and a vehicle loan pays a dealer against one invoice.

## Releasing it

The checker confirms the amount and **the day the money actually left**, which is not always the day
they are looking at the screen: a transfer sent on Friday and approved on Monday is dated Friday, and
the EMI schedule, the DPD clock and every repayment's floor follow that date.

Approving the same request twice releases the money once. The request is claimed the moment it is
opened for release, so a double tap cannot produce two payments.

@shot disbursement-register | The Lenviq disbursement register listing every payout with its date, application number, borrower, branch, amount and instrument | Every rupee that left, by date, instrument and branch — the register an inspection asks for.

## What happens next

The loan account is created on the first tranche, the schedule is generated from the sanctioned
terms, and the accounting entries post as it happens — there is no month-end reconciliation between
an origination system and a ledger, because there is one set of facts.
