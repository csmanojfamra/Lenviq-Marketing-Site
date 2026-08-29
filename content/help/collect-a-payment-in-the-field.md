---
title: Collect a payment at the door
description: Record a collection on a phone — with the amount explained, a photograph, a location and a receipt the borrower can see reach their loan.
section: Collections
order: 10
audience: Field agent
---

The round lists the doors for today, worst account first. Opening one shows what the borrower will
ask about before they ask it.

@phone field-account-summary | An account summary on the phone showing the borrower, the SMA classification badge, the overdue position with the total payable, and the account's status | The overdue position first, and the largest number on the screen.

## Why the amount is what it is

Every borrower asks. The breakup is the order the money is actually applied in — charges, then
interest, then principal — so the figure quoted at the door is the figure that lands on the loan.

@phone field-collect | The collection screen showing the amount, the payment mode, a promise-to-pay and a visit remark | Three outcomes, and the two things a visit produces that nothing used to record.

## The three outcomes

- **Collected** — in full, or partially.
- **Not collected** — with the reason, from the same list the reports group on.
- **A promise to pay** — an amount and a date. The commonest outcome of a visit, and the next agent
  at that door sees it.

## Cash, and how much of it

An agent may carry only so much of the lender's cash. Past the limit the app stops offering cash and
asks them to bank what they hold — checked **before** the money is taken, because that is the only
moment a limit helps.

@phone field-day-end | The day-end reconciliation screen showing what was collected and what is being handed in | What was collected against what is being handed in.

## With no signal

Everything above works offline. A collection is held on the phone with its photograph and its
location, and sent the moment there is a tower — the receipt is idempotent, so a retry cannot post a
second payment against the borrower's loan.
