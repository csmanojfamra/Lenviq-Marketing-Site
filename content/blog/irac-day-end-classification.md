---
title: "Why an intra-day NPA number is not the same number"
description: "IRAC classification is computed on the day-end position. What that means for a report run at 11am, and what it does to a month-end close."
date: "2026-08-10"
category: "Regulatory"
author: "FastLegal Technologies"
draft: false
---

Asset classification is computed **in the day-end process for the relevant date**, and an account
classified as non-performing is upgraded only when the **entire arrears of interest and principal**
are paid. Those two sentences are the whole of the November 2021 clarification's operational effect,
and between them they decide the architecture of the classification engine: a scheduled job, and a
one-way gate.

The Reserve Bank's clarification on income recognition, asset classification and provisioning
([RBI/2021-2022/125, DOR.STR.REC.68/21.04.048/2021-22](https://www.rbi.org.in/Scripts/NotificationUser.aspx?Id=12194&Mode=0),
dated 12 November 2021) settled two things that lending systems had been implementing
inconsistently: when classification is computed, and what it takes to reverse it.

## Day-end, not on demand

The circular is specific: borrower accounts are flagged as overdue as part of the day-end process,
and *"classification of borrower accounts as SMA as well as NPA shall be done as part of the
day-end process for the relevant date."* That sounds like an implementation detail and is not one.

Consider an account 90 days overdue. At 11am it is non-performing. At 2pm the borrower pays. If
classification is computed whenever somebody opens a report, the same account is non-performing in
the morning's report and standard in the evening's — and the two reports were both correct at the
moment they ran. A board pack assembled at 4pm and a submission assembled at 6pm then disagree, and
nobody can say which is wrong.

Computing at day-end removes the question. Every consumer of the classification during a day sees
the same answer, and that answer is anchored to a stated date.

The practical consequence for a system is that classification must be a scheduled job and never a
side effect of a user's request. A report that recomputes what it displays is a report that can
disagree with itself.

## Upgrade requires the whole arrears

The second point: an account classified as non-performing is upgraded to standard only when the
**entire arrears of interest and principal** are paid. Not part of them, and not the borrower
merely resuming instalments while older dues remain outstanding.

The circular records why it had to say so: some lending institutions were upgrading accounts on
payment of only the interest overdues, or of part of them. This is worth checking in any system
that has a "regularise" action, because the intuitive implementation — the borrower has paid this
month, so mark them current — is exactly the one the clarification was issued to stop.

## What it does to a month-end close

Because classification is a day-end position, the month-end classification is the position at the
close of the last day of the month, and it does not change afterwards because somebody paid on the
2nd. Reports drawn later that quietly reflect today's DPD against last month's balance sheet are
the most common way two people arrive at a meeting with different asset-quality numbers.

## Why is it a one-way gate?

Because downgrade and upgrade have different tests.

| | Test | Computed from |
|---|---|---|
| Downgrade | Days past due crossing a boundary | The oldest unpaid due event |
| Upgrade | Entire arrears of interest and principal paid | Every unpaid due event |

A system that implements classification as a pure function of days-past-due implements both with the
same test, and therefore upgrades an account the moment a part-payment moves the oldest unpaid due
forward. That is the wrong answer, and it is wrong in the direction that flatters the book.

## What has to be true of the job?

- **It runs every night**, whether or not anybody is looking.
- **It runs before penal levy**, so an account that turned non-performing overnight is handled on its
  new basis in the same run.
- **It runs after advances are applied**, so a borrower who paid ahead is not marked overdue on a due
  their own money covers.
- **It writes a position**, so the classification as at a past date is a record rather than a
  recomputation.
- **It takes no per-product branch.** Products differ in the due events they generate, never in how
  the days are counted.

That last one is worth dwelling on. Two classification paths — one for gold, one for term loans —
will diverge, because each will be maintained by whoever is working on that product. The divergence
is silent, and what diverges is NPA classification.

## Common mistakes

- **Classifying at request time.** Two reports, two answers, both correct when they ran.
- **Upgrading on days-past-due.** The error the clarification was issued to stop.
- **A "regularise" button.** The intuitive implementation, and the prohibited one.
- **Penal grace reducing the days-past-due figure.** Moves every downstream date later.
- **Reports that recompute rather than read a stored position.** Today's DPD against last month's
  balance sheet.
- **A product whose due events are never generated.** It can never be overdue, so it can never be
  non-performing.

## Frequently asked questions

### When exactly does an account become NPA?

In the day-end process for the date on which it passes ninety days overdue. Not at a month end, not
when a report is run, and not the following morning — the clarification puts the flag in the day-end
process for the relevant date itself.

### Can an account be upgraded once the borrower resumes paying instalments?

No. The entire arrears of interest and principal must be paid. Resuming instalments while older dues
remain outstanding does not upgrade the account, and neither does a part-payment that brings the
days-past-due below ninety.

### Does classification differ by product?

The ninety-day basis is general. What differs is what falls due and when — instalments for a term
loan, servicing dates and a maturity for a gold loan, an out-of-order test for a cash credit or
overdraft. Feed all of them into one engine as due events and the classification is consistent by
construction.

### What is the effect on the month-end close?

The month-end classification is the position at the close of the last day of the month and does not
change because somebody paid on the 2nd. A report drawn later that reflects today's days-past-due
against last month's balance sheet is the commonest way two people arrive at a meeting with different
asset-quality numbers.

### Should the day-end job run on the business calendar?

Yes. An Indian lending day ends at close of business, not at UTC midnight. A job that compares
timestamps in UTC attributes the first five and a half hours of each Indian day to the previous one,
which at a month end moves a day's business into the wrong period.

---

*The day-end and full-clearance points are quoted from the clarification linked above. The 90-day
boundary is the general position for term loans; specific asset classes and facility types carry
their own rules, and this post does not enumerate them.*

**Related reading:** [How to automate NPA classification](/blog/how-to-automate-npa-classification-nbfc/) ·
[SMA-0, 1 and 2](/blog/sma-classification-what-it-signals/) ·
[Income reversal on NPA](/blog/npa-income-reversal/) ·
[Day-end is a business date](/blog/day-end-not-real-time/)

[Ask for a walk-through](/contact/) — part-pay an NPA account and see whether it upgrades.
