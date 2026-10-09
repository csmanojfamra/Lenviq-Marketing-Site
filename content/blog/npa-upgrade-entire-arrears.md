---
title: "Upgrading an NPA: why a borrower who pays a lot is still non-performing"
description: "The upgrade rule is a one-way gate — the entire arrears of interest and principal, not the overdue instalment, not most of it. What that means for a borrower paying down, and for a system that computes classification nightly."
metaDescription: "NPA upgrade rule: why partial payment does not upgrade an account, what entire arrears means, and when the account actually turns standard."
date: "2026-10-09"
category: "Regulatory"
author: "CA Himanshu Sharma"
tool: "npa-date-calculator"
draft: false
---

A borrower three instalments behind pays two of them. The account is no better off. Not a little
better, not partially upgraded — **non-performing, exactly as it was**, and it stays that way until
the third one arrives too.

This is the rule most lenders can state and most systems get wrong, because stating it and
implementing it are different problems. Classification runs downhill on its own and only comes back
up through one gate.

## The rule, and where it comes from

The Reserve Bank's clarification on income recognition, asset classification and provisioning
([RBI/2021-2022/125, DOR.STR.REC.68/21.04.048/2021-22](https://www.rbi.org.in/Scripts/NotificationUser.aspx?Id=12194&Mode=0),
dated **12 November 2021**) settled it: an account classified as non-performing may be upgraded to
standard **only when the entire arrears of interest and principal are paid**.

Three words carry the whole thing.

**"Entire"** — not the oldest overdue instalment, not the amount that would bring days-past-due
under ninety, not a negotiated part. All of it.

**"Arrears"** — what was demanded and is unpaid. Not the outstanding principal; a borrower does not
have to repay the loan to upgrade, only to stop being behind on it.

**"Interest and principal"** — both legs. An account whose principal arrears clear while interest
arrears remain is still non-performing.

## Why this is a one-way gate, and not a threshold

The asymmetry is the point and it is deliberate.

**Going down** is arithmetic: ninety days past due, computed in the day-end process for the relevant
date. Nobody decides it; the calendar does.

**Coming up** is a payment event, and it is all-or-nothing. There is no gradient — no partial
upgrade, no SMA-2 on the way back, no "improving" state between NPA and standard.

So a system that treats classification as a function of current DPD will upgrade an account the
moment arrears fall under ninety days, which is the single commonest implementation defect in this
area. **DPD going down does not upgrade anything.** Only full payment of arrears does.

## What it looks like on a real account

A ₹5,00,000 loan, ₹18,000 a month, three instalments overdue at month end. The account is NPA.

| | Arrears before | Paid | Arrears after | Classification |
|---|---|---|---|---|
| Pays one instalment | ₹54,000 | ₹18,000 | ₹36,000 | **still NPA** |
| Pays two | ₹54,000 | ₹36,000 | ₹18,000 | **still NPA** |
| Pays ₹53,900 | ₹54,000 | ₹53,900 | ₹100 | **still NPA** |
| Pays all three | ₹54,000 | ₹54,000 | nil | **standard** |

The third row is the one worth looking at twice. A hundred rupees of unpaid interest holds a
₹5,00,000 account in NPA, and it is correct that it does — "entire" has no materiality threshold
attached to it.

**And the day it upgrades is a day-end, not the moment the money lands.** Classification is computed
in the day-end process for the relevant date, so an account whose arrears clear at 2pm is standard
from that day's day-end, not from 2pm —
[why that distinction matters](/blog/irac-day-end-classification/).

## The three things that go wrong in systems

**1. Upgrading on DPD.** The account's DPD falls below ninety after a part payment and the status
flips. This is the defect to look for first, and the test is the third row of the table above: pay
all but ₹100 of arrears and see what the account says at day-end.

**2. Appropriating the payment so that "arrears" become something else.** A receipt that settles
charges and penal before interest and principal can reduce the *amount outstanding* without clearing
the *arrears*. Whether an account's arrears are nil depends on which demands the money was applied
to, so the appropriation order and the upgrade test have to be reading the same rows.

**3. Reading a counter rather than the due events.** If "is this account in arrears" is answered by a
flag that something else maintains, the flag and the classification can disagree. They should be
derived from the same place — the demands raised and what has been paid against them.

## What upgrading does not do

**It does not undo the income reversal.** Interest accrued and reversed to suspense at classification
stays reversed; what changes is that income recognition returns to accrual basis from the upgrade.
The reversal is a completed event, not a suspended one —
[what happens to income on classification](/blog/npa-income-reversal/).

**It does not erase the provision retrospectively.** The provision held while the account was
non-performing was correct when it was held.

**It does not reset the history.** The account was non-performing, the credit information companies
were told so, and the upgrade is a new fact rather than a correction of an old one.

## The question worth asking your own system

Take a non-performing account and pay all of its arrears **except one rupee**. Run the day-end.

If it upgrades, the system is testing a threshold rather than the rule, and every account it has
ever upgraded on a part payment was upgraded wrongly — which is a reporting problem, not only a
classification one, because the DPD that went to the bureaus went with it.

---

## Frequently asked questions

### Does paying most of the arrears upgrade an NPA?

No. The Reserve Bank's November 2021 clarification requires the **entire** arrears of interest and
principal to be paid. There is no materiality threshold and no partial upgrade — an account one
rupee short of clear is still non-performing.

### Does the borrower have to repay the whole loan to upgrade?

No. Arrears are what was demanded and remains unpaid, not the outstanding principal. A borrower who
brings every overdue instalment current upgrades while still owing the rest of the loan on schedule.

### If DPD falls below 90, does the account become standard?

Not by itself. Days past due govern the classification downwards; coming back requires payment of
the entire arrears. A system that upgrades on DPD alone is implementing a threshold rather than the
rule.

### When exactly does the upgrade take effect?

At the day-end for the date the arrears were cleared, because classification is computed in the
day-end process for the relevant date rather than at the moment a receipt is posted.

### Does upgrading reverse the income that was moved to suspense?

No. The reversal stands; what changes is that income recognition returns to accrual basis going
forward.

---

**Related:** [Classification is a day-end event](/blog/irac-day-end-classification/) ·
[What happens to income when an account turns](/blog/npa-income-reversal/) ·
[How to automate NPA classification](/blog/how-to-automate-npa-classification-nbfc/) ·
[SMA classification and what it signals](/blog/sma-classification-what-it-signals/) ·
[NPA date calculator](/tools/npa-date-calculator/)
