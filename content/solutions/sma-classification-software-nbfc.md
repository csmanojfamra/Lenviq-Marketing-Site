---
title: "SMA classification: the boundary is day one, and the number is reported"
description: "SMA-0, SMA-1 and SMA-2 are not internal warning colours — they are a classification the regulator defines, cut by a day-end process on a date the circular fixes, and for reportable exposures they travel into a return. What the ranges actually are, and what a system has to compute to get them right."
metaDescription: "SMA-0, 1 and 2 are a defined classification cut by the day-end process, not an internal warning colour. The ranges, the dates, and what a system must compute."
question: "What do SMA-0, SMA-1 and SMA-2 mean, and when does an account enter each?"
kind: artefact
author: "CA Himanshu Sharma"
updated: "2026-10-13"
related: "sma-classification-what-it-signals, irac-day-end-classification, npa-upgrade-entire-arrears, npa-income-reversal, bucket-movement-and-flow-rates, credit-information-reporting-2025, how-to-automate-npa-classification-nbfc, nbfc-provisioning-worked-examples"
priority: 0.8
draft: true
---

A Special Mention Account is an account that is overdue but not yet non-performing, and the Reserve
Bank defines the sub-categories rather than leaving them to the lender. For a term loan, SMA-0 is
overdue up to 30 days, SMA-1 is more than 30 and up to 60, and SMA-2 is more than 60 and up to 90 —
after which the account is non-performing. The intervals are continuous: there is no gap between them
and no grace in front of the first one.

The first boundary is the one that surprises people. An account is in SMA-0 from the first day an
instalment is unpaid, which means the classification begins on the due date itself and not after a
few days of tolerance.

## The ranges, and where they come from

Paragraph 3 of the Reserve Bank's clarification on IRACP norms ([RBI/2021-2022/125,
DOR.STR.REC.68/21.04.048/2021-22](https://www.rbi.org.in/Scripts/NotificationUser.aspx?Id=12194&Mode=0),
dated 12 November 2021) sets out the sub-categories, and the same paragraph deals separately with
loans in the nature of revolving facilities such as cash credit and overdraft, where the test is not
an unpaid instalment at all.

| Classification | Term loan | Revolving facility (cash credit / overdraft) |
|---|---|---|
| **SMA-0** | Principal or interest overdue up to 30 days | — |
| **SMA-1** | Overdue more than 30 and up to 60 days | Outstanding continuously in excess of the sanctioned limit or drawing power for more than 30 and up to 60 days |
| **SMA-2** | Overdue more than 60 and up to 90 days | The same test, for more than 60 and up to 90 days |
| **NPA** | Overdue more than 90 days | Out of order for more than 90 days |

Two things follow from that table and both catch systems out. A revolving facility has no instalment
to miss, so a system that derives delinquency only from an instalment schedule will report every
[cash credit account](/cash-credit-software/) as regular no matter how long it has sat above its
drawing power. And an SMA-0 bucket does not exist for a revolving facility, so a system that
mechanically applies the term-loan ranges to an overdraft invents a classification the circular does
not have.

## The date is fixed by the day-end process, not by when somebody looked

Paragraph 4 of the same circular requires a borrower account to be flagged as overdue as part of the
lender's day-end process for the due date, irrespective of the time at which that process runs. It
then works the example through: a due date of 31 March 2021 that is not paid before that day's run is
overdue from 31 March; the account is tagged SMA-1 on running the day-end process of 30 April, SMA-2
on 30 May, and becomes non-performing on 29 June 2021.

This is a specification, not a convention. It tells you the classification dates are calendar dates
attached to a daily run, which has three consequences for a lending system:

- **Classification is a job, not a query.** A figure computed when a user opens a screen will differ
  from the figure computed at day end, and the reported one is the day-end one.
- **A missed run is a reporting gap**, not a cosmetic one. If the job did not run on 30 April, no
  account moved to SMA-1 that night, and the lender's own records disagree with the circular.
- **The run has an "as of" date.** Re-running yesterday's day end must produce yesterday's
  classification, which means the engine takes the date as an input rather than reading the clock —
  [the same requirement the classification basis imposes](/blog/irac-day-end-classification/).

## Grace does not move the classification

This is the single most common implementation error in this area, and it is expensive because it is
invisible.

A lender may legitimately decide not to *levy* a penal charge for the first few days after a due
date. That is a commercial choice about a charge. It has no bearing on whether the amount is overdue,
because overdue means it was not paid on the date the lender fixed. A system that applies the grace
period to the days-past-due figure — rather than to the chargeable days of the levy — delays
overdue flagging, delays SMA, delays NPA, and understates the days past due reported to the credit
bureaus. All four from one misplaced subtraction.

Two settings, never one doing both work: a penal grace that reduces what may be charged, and nothing
at all in front of the classification.

## SMA is a reported position, not a dashboard colour

Three places the number leaves the building:

- **The credit bureaus.** The days-past-due figure reported monthly for each account is the same
  figure the SMA bucket is cut from, so an account shown as SMA-1 internally and 15 days past due in
  the submission is a contradiction somebody will eventually ask about. The history matters as much as
  the current month: a bureau submission carries a trailing run of monthly positions, and
  [reconstructing those correctly](/blog/credit-information-reporting-2025/) is a different
  computation from reading today's status.
- **CRILC**, where the exposure falls within the reporting perimeter. The SMA status of large
  borrowers is part of what that return carries.
- **The lender's own provisioning and management reporting**, where SMA-2 is the population most
  worth acting on because it is the last bucket before the classification that triggers income
  reversal.

## What a system must do, and what it must not pretend to do

| Need | What good software does | What it must not pretend to do |
|---|---|---|
| The bucket | Derive it from one days-past-due figure that every consumer reads, so classification, provisioning and the bureau file cannot disagree | Hold a separate SMA field that somebody can set by hand |
| The date | Take the business date as an input to a daily job and stamp the classification with it | Compute from the system clock at the moment a report is opened |
| Revolving facilities | Apply the out-of-order test against sanctioned limit and drawing power | Report an overdraft as regular because no instalment is unpaid |
| Grace | Apply it to chargeable days on the levy only | Subtract it from days past due |
| The watch list | Produce the SMA population as at a chosen date, so the position can be re-read for a past date | Present today's list as though it were the position on a quarter end |
| Prediction | Nothing — it is a classification of what has happened | Describe a bucket list as an early-warning model. SMA says an account is already late |

## Frequently asked questions

### Is there any grace period before SMA-0 begins?

No. The classification runs from the due date, in that date's day-end process. A lender may choose not
to charge for the first few days; the account is overdue regardless.

### Does a part payment move an account back down a bucket?

It moves the days-past-due figure, and the bucket follows the figure, so yes — but only to the extent
the oldest unpaid demand is cleared. Days past due is measured from the oldest unpaid instalment, so a
payment appropriated to it can shorten the number substantially while leaving later instalments
unpaid. Coming back from NPA is a different and stricter test: the
[entire arrears must be paid](/blog/npa-upgrade-entire-arrears/).

### Do the same ranges apply to every NBFC?

The sub-categories themselves are as above. The point at which an account becomes non-performing
followed a glide path for the layers that were previously on a longer overdue period, under paragraph
14.2 of the Master Direction – Reserve Bank of India (Non-Banking Financial Company – Scale Based
Regulation) Directions, 2023 (RBI/DoR/2023-24/106, DoR.FIN.REC.No.45/03.10.119/2023-24, dated
19 October 2023), with the final step to more than 90 days due by 31 March 2026. A lender should
confirm its own position against the current consolidated text of those Directions rather than against
any summary, including this one.

### Where does Lenviq stand on this?

The bucket is derived from a single days-past-due figure computed in the scheduled day-end run, which
takes the business date as an input, and the same figure feeds classification and the bureau file so
the two cannot diverge. Penal grace reduces chargeable days on the levy only and is not applied to
days past due. The SMA watch list is available as at a chosen date with branch and region filters.
What it does not do is predict anything — an SMA list is a record of accounts that are already late.
