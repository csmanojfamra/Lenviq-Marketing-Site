---
title: "NPA income reversal and upgrade: the entries both ways, and the two a system double-counts"
description: "Classification moves an account. The ledger has to move with it — accrued interest out of income into suspense on the way down, suspense into income on receipt, and nothing at all on the way back up except the arrears test. Where systems post twice, and why the statement and the trial balance are meant to differ."
metaDescription: "Interest out of income into suspense on classification, suspense into income on receipt. Where systems post it twice, and the arrears test on the way up."
question: "What happens to interest already booked when a loan is classified NPA?"
date: "2026-10-13"
category: "Accounting"
author: "CA Himanshu Sharma"
tool: "npa-date-calculator"
related: "npa-income-reversal, npa-upgrade-entire-arrears, irac-day-end-classification, nbfc-income-recognition-rbi-rules, sma-classification-what-it-signals, nbfc-provisioning-worked-examples, how-to-automate-npa-classification-nbfc, write-off-what-it-does"
draft: false
---

When an account is classified non-performing, interest that was accrued into income and never
collected stops being income. It is reversed out and parked — conventionally in an interest suspense
account — and from that date the lender recognises interest on this account only when money actually
arrives. On the way back up, nothing is reversed again: an upgrade is a classification event with an
arrears test in front of it, and the suspense balance clears through receipts, not through the
upgrade.

That is three postings and one test. Systems get two of the postings wrong in the same way, and they
get the test wrong by being generous with it.

## The two directions, as entries

| Event | The entry | What it must not do |
|---|---|---|
| **Classification as NPA** | Debit interest income, credit interest suspense, with the whole accrued-and-uncollected interest on this account | Touch principal. Principal is what was lent less what was repaid against it; classification does not change it, and provisioning is a separate credit against a separate head |
| **A receipt on an NPA account** | Debit bank, credit interest suspense for the interest portion; then debit interest suspense, credit interest income for the same amount — suspense cleared, income recognised | Recognise income on the levy. From the classification date the basis is receipt, so a demand raised and not met is not income |
| **Upgrade to standard** | No reversal, no re-recognition of what was reversed. The account's classification changes and accrual resumes prospectively | Write back the suspense balance. Interest that was never collected does not become income because the borrower cleared the arrears — the arrears payment itself is the receipt, and it was recognised when it arrived |
| **Period already closed** | Nothing | Restate it. A correction to a posted period is a dated reversal entry in the current period, not an edit to the old one |

The fourth row is the one that is an accounting principle rather than a preference. A financial
posting is an event record; a correction is a counter-entry carrying its own date. A system that
offers an "edit voucher" button on a closed period has given somebody the ability to change a figure
that has already been reported.

## Where the double credit comes from

This is the specific failure, and it is worth describing precisely because it looks correct in both
halves.

A lending system typically does two separate things with accrued interest. At classification, it
reverses the account's accrued-and-uncollected interest to suspense. Separately, at month end, it
posts the month's accrual — and for an account already classified, it correctly sends that month's
accrual to suspense rather than to income, because the basis is now receipt.

If the classification routine reverses the *whole* accrued balance, including the part the month-end
job has not posted yet, and the month-end job then posts its own share to suspense as well, suspense
is credited twice for the same interest. The symptom is an account whose interest shows in both the
accrued column and the suspense column, and a suspense credit larger than anything the loan ever
accrued — income debited 3,750 against suspense credited 16,850 on a loan that had accrued 13,100 is
the shape of it.

The fix is not to reverse less. The borrower's accrued balance genuinely is the whole of it, and the
loan record should move all of it; what must not happen twice is the *posting*. The classification
routine posts only what has already reached the ledger, and the month-end run carries the remainder
straight to suspense, which is where it was going anyway.

The same hazard has a second form: running the classification routine twice on one account on one day
and producing two vouchers with the same date, the same amount and the same legs. An idempotent
routine — one that checks whether the posting for this account and this event already exists before
writing it — is the only reliable answer, because a daily job will be re-run.

## The arrears test on the way up, and how strict it is

Paragraph 10 of the Reserve Bank's clarification on IRACP norms ([RBI/2021-2022/125,
DOR.STR.REC.68/21.04.048/2021-22](https://www.rbi.org.in/Scripts/NotificationUser.aspx?Id=12194&Mode=0),
dated 12 November 2021) is explicit that a loan account classified as NPA may be upgraded to
'standard' only if the entire arrears of interest and principal are paid by the borrower.

*Entire* is the operative word, and it is where systems are generous. A part payment that brings the
account under ninety days past due does not upgrade it. An account with four instalments overdue that
pays two is an NPA with two instalments overdue, not a standard asset. The test is the whole arrears
position, not the days-past-due figure that would result from the payment —
[which is the distinction the upgrade rule turns on](/blog/npa-upgrade-entire-arrears/).

This is also why the upgrade test cannot be implemented as a DPD threshold. Days past due is derived
from the oldest unpaid demand, so a payment appropriated to the oldest instalment reduces DPD while
leaving three instalments unpaid. A system that upgrades on `dpd <= 90` will upgrade accounts the
circular does not permit it to, and it will do so silently and in volume.

## Why the statement and the trial balance legitimately differ

The borrower's liability and the lender's income are two different questions with two different
dates, and one number cannot serve both.

The **borrower owes** the interest from the date it was demanded. A statement of account that hides
the interest until it is collected is a statement the borrower cannot reconcile against their own
records, and a lender who issues one will spend the next quarter explaining it.

The **lender's income** arises on receipt from the classification date onwards. So the statement shows
the demand and the profit and loss account does not, and the bridge between them is the suspense
balance. Shown properly, interest suspense is a contra-asset netted against interest receivable
rather than a liability — park it on the wrong side and the balance sheet is out by exactly the
suspense balance, which is a satisfying bug to find and an awkward one to have reported.

## What a system has to do, and what it must not pretend to do

| Need | What good software does | What it must not pretend to do |
|---|---|---|
| The classification date | Hold it as a fact, stamped by the day-end run that decided it | Derive it on demand. "Whatever the rule returns when run today" is not an answer to an auditor, and a rule since amended returns something else |
| The suspense balance | Keep it per account, so it can be reconciled, explained on one loan and cleared on closure | Hold a pooled figure. A total nobody can decompose is a total nobody can defend |
| The reversal | Post it as its own entry, linked to the classification event that caused it, traceable from either end | Net it into the accrual, which leaves no record that income was ever taken |
| The receipt | Keep it dated, with its appropriation, since the income recognised is the interest portion and that portion is decided by the settlement order on the oldest demand first | Recognise the whole receipt as interest |
| Idempotence | Check whether the posting for this account and this event exists before writing it | Assume the daily job runs once. It will be re-run |
| Recoverability | Nothing | Decide it. Classification is arithmetic on dates; what is recoverable is a judgement, and no engine should be sold as one |

## Income reversal is not a provision, and not a write-off

Three things happen to a non-performing account and they are routinely run together, which overstates
the hit on the first one and understates it on the third.

- **Income reversal** removes interest that was recognised and never collected. It touches the
  *income* side, the amount is whatever was accrued and uncollected, and the borrower still owes it.
- **A provision** is a charge against profit for expected loss on the *principal*. It is computed
  from the classification and the security, it does not depend on what interest was accrued, and
  [the worked examples](/blog/nbfc-provisioning-worked-examples/) show why two accounts at the same
  days past due can carry very different provisions.
- **A write-off** removes the asset from the books. It is not forgiveness, the lender may still
  pursue recovery, and it is
  [a different decision with different consequences](/blog/write-off-what-it-does/) — including for
  what the borrower's credit record shows.

An account can incur all three, in that order, over two or three years. A system that models them as
one status field has collapsed three decisions, three dates and three sets of entries into one, and
cannot answer any of the questions an auditor asks about them.

## Frequently asked questions

### Is the reversal a provision?

No, and conflating them overstates the hit. Income reversal removes income that was never earned in
cash. A provision is a charge against profit for expected loss on the principal. They are different
heads, they are computed differently, and an account incurs both.

### What happens to penal charges on an account that turns NPA?

They follow the same receipt basis, but for a different reason: penal amounts are
[charges rather than interest](/blog/penal-charges-not-interest/) and are income when received in any
case, classified or not. New levy on a non-performing account is usually suspended as a commercial
matter; what has already been levied stays on the borrower's statement.

### Does an upgrade restore the interest that was reversed?

No. It resumes accrual prospectively. The reversed interest is recognised only to the extent cash
arrives against it, and the arrears payment that triggered the upgrade is itself such cash — already
recognised when it was received.

### How soon after the arrears are cleared can the account be upgraded?

As at the day-end process on which the test is satisfied. Paragraph 4 of the same circular fixes
classification to the day-end run for the date in question, so an account whose arrears clear on
20 October is upgraded in that date's run and not at month end.

### Where does Lenviq stand on this?

The reversal, the receipt-basis recognition and the suspense presentation are implemented: accrued
uncollected interest is debited out of income and credited to suspense on classification, a receipt on
a classified account passes through suspense into income, and suspense appears in the financial
statements as a contra-asset against interest receivable rather than as a liability. Classification
itself runs in a scheduled day-end job rather than on request, and the upgrade applies the entire
arrears test rather than a days-past-due threshold. The last row of the table above is the honest
boundary: the platform computes the classification and posts the entries, and it does **not** decide
what is recoverable.
