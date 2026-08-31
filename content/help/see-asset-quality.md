---
title: See where the book stands
description: DPD, SMA and NPA computed at day-end from the same due events, with the provisioning that follows from them.
section: Servicing and collections
route: "/lms/loans"
order: 30
audience: Credit head / Operations
---

@shot loan-accounts | The loan accounts list showing each account's status, DPD, outstanding and classification | Every live account, with the classification the returns will report.
@mark 36,13.9 | The book in one line: total, active, overdue and non-performing.
@mark 44,18.8 | The same split as tabs. Overdue and NPA are counts you can open, not just numbers.
@mark 36,24.5 | Search by loan number, borrower or mobile.
@mark 87.5,72 | Days past due, and the status that follows from it. The two cannot disagree — both come from the same day-end computation.

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
@mark 44.5,11.1 | The account's status and its days past due, together at the top.
@mark 65,20.6 | The schedule, every transaction, the statement and the charges — each one tab away.
@mark 68.5,38 | Penal charges are held separately from interest. They are never added to principal.
@mark 64.5,50.9 | Disbursement, first instalment and maturity — the dates every other figure is computed from.

## When an account turns NPA

Accrued but uncollected interest is reversed to a suspense ledger, and income is recognised on a
receipt basis from that date. The reversal is an accounting entry like any other — it is on the
statement, and it can be traced.
