---
title: See where the book stands
description: DPD, SMA and NPA computed at day-end from the same due events, with the provisioning that follows from them.
section: Servicing and collections
order: 30
audience: Credit head / Operations
---

@shot loan-accounts | The loan accounts list showing each account's status, DPD, outstanding and classification | Every live account, with the classification the returns will report.

## Classification is not a button

DPD, SMA staging, NPA classification, interest accrual and provisioning all run in a **scheduled
day-end job** — never on somebody pressing something. That is the point: a classification a user can
cause by clicking is one that can be avoided by not clicking.

An account is overdue on the date the lender fixed. There is no grace on the flagging: RBI's
November 2021 clarification flags an account in the day-end process for the due date itself. A
lender may choose not to *levy* for the first few days, which is a commercial decision and never
delays classification, SMA, NPA, or what is reported to the credit bureaus.

## One engine, every product

The same DPD engine serves every product and takes no per-product branch. Products differ by the
**due events** they generate, never by having a classification path of their own — because what
silently diverges between two such paths is NPA classification.

@shot loan-account | A loan account showing its overdue status and days past due, the sanctioned terms and the live balances, with tabs for the schedule, transactions, statement and charges | One account: the position at the top, and the schedule, receipts and charges it was computed from a tab away.

## When an account turns NPA

Accrued but uncollected interest is reversed to a suspense ledger, and income is recognised on a
receipt basis from that date. The reversal is an accounting entry like any other — it is on the
statement, and it can be traced.
