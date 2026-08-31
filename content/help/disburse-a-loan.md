---
title: Disburse a loan
description: Raise a tranche, have somebody else release it, and see the money reach the borrower and the books at the same moment.
section: Origination
route: "/approvals-inbox"
order: 40
audience: Operations
---

Disbursement is **maker-checker**: the person who raises it is not the person who releases it. That
is not a setting somebody remembered to switch on — it is how the screen works.

@shot approvals-inbox | The Lenviq approvals inbox, showing the files waiting for a decision with the amount on each and how long it has been waiting | Four eyes on the money: the person who raises a tranche is not the person who releases it.
@mark 46,20.4 | Only files whose current step matches one of your roles, inside your data scope.
@mark 55,34.1 | How long it has waited. Oldest first, because that is the one going stale.
@mark 64.5,34.1 | Which approval step it has reached — the matrix routed it here on the amount.
@mark 13.5,96 | Signed in as a Credit Head. This menu is shorter than an administrator's because the role does not reach those screens.

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
@mark 43.5,11.5 | Every report names the one question it answers.
@mark 30,19.5 | Filters, row count and the columns shown — the report is a view, not a fixed page.
@mark 91,16.8 | The date the figures are as at. A report built on a day-end position says which day.
@mark 90.5,25.9 | The instrument the money actually moved on.

## What happens next

The loan account is created on the first tranche, the schedule is generated from the sanctioned
terms, and the accounting entries post as it happens — there is no month-end reconciliation between
an origination system and a ledger, because there is one set of facts.
