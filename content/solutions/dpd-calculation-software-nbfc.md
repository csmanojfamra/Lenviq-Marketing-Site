---
title: "Days past due: one number, two questions, and the one a status field cannot answer"
description: "Every delinquency figure a lender reports comes from days past due — classification, provisioning, the bureau file. It is measured from the oldest unpaid demand, cut by a day-end process, and it has two readings that must agree for today and are computed completely differently."
metaDescription: "Days past due is measured from the oldest unpaid demand and cut at day end. Why it has two readings, and why only one can answer about the past."
question: "How are days past due calculated on a loan, and from which date?"
kind: artefact
author: "CA Himanshu Sharma"
updated: "2026-10-13"
related: "irac-day-end-classification, day-end-not-real-time, sma-classification-software-nbfc, bucket-movement-and-flow-rates, cic-reporting-software-nbfc, npa-upgrade-entire-arrears, collection-efficiency-how-to-compute, how-to-automate-npa-classification-nbfc"
priority: 0.8
draft: true
---

Days past due is the number almost everything else is derived from. The special mention bucket, the
asset classification, the provision, the figure sent to the credit bureaus and the arrears a
collector is given all come from it, which means an error in it is not one wrong report — it is
every report wrong by the same amount, consistently, in a way that no total will reveal.

It is measured from the **oldest unpaid demand**, not from the most recent one, and it is cut by the
**day-end process for the due date itself**. Both halves of that sentence are load-bearing and both
are implemented wrongly often enough to be worth stating separately.

## Measured from the oldest unpaid demand

An account with four instalments overdue is as late as its oldest one. That has a consequence people
find counter-intuitive: a payment can reduce days past due a great deal while leaving most of the
arrears outstanding, because clearing the oldest instalment moves the measurement point forward to
the next.

Which is why a days-past-due threshold is the wrong test for an upgrade out of non-performing
status. A borrower with four instalments overdue who pays two has an account that may now read under
ninety days and still has two instalments unpaid.
[The upgrade rule asks for the entire arrears](/blog/npa-upgrade-entire-arrears/), and a system
implementing it as `dpd <= 90` will upgrade accounts it is not permitted to — silently, and in
volume.

## Cut by the day-end process, on a date supplied to it

Paragraph 4 of the Reserve Bank's clarification on IRACP norms ([RBI/2021-2022/125,
DOR.STR.REC.68/21.04.048/2021-22](https://www.rbi.org.in/Scripts/NotificationUser.aspx?Id=12194&Mode=0),
dated 12 November 2021) requires a borrower account to be flagged as overdue as part of the lender's
day-end process for the due date, irrespective of the time at which that process runs. The same
paragraph works an example through: a due date of 31 March 2021 unpaid at that day's end is overdue
from 31 March, is tagged SMA-1 on running the day-end process of 30 April, SMA-2 on 30 May, and
becomes non-performing on 29 June 2021.

Three consequences for a lending system, and the third is the one that gets missed:

- **It is a job, not a query.** A figure computed when somebody opens a screen is not the reported
  figure, and the two will differ by the time of day.
- **A missed run is a reporting gap.** If the job did not run on 30 April, nothing moved to SMA-1
  that night, and the lender's records disagree with the circular rather than with a convention.
- **The run takes the date as an input.** Re-running 30 April has to produce 30 April's answer, which
  means the engine is handed a business date rather than reading the clock. A system that reads the
  clock cannot reproduce yesterday, and cannot be tested against anything.

## The due events, and why gold loans are not an exception

A system that derives delinquency only from an instalment schedule reports every loan without
instalments as perfectly regular. That is wrong for two whole product families.

The rule that resolves it: **maturity is not optional; periodic servicing is.** Every loan falls
wholly due at maturity whatever else its scheme demands, so every loan generates a maturity due
event. A gold loan with no monthly instalment still has a date on which the whole of it is demanded,
and it is overdue the day after. A revolving facility is different again — there is no instalment to
miss, and the test is whether the outstanding has stayed above the sanctioned limit or drawing power.

So products differ by the **due events they generate**, never by having their own path to a
delinquency figure. Two paths to one number is the arrangement that diverges quietly, and what
diverges is the classification.

## One engine, two readings, and they answer different questions

This is the distinction that matters most and is least often made.

| Reading | The question | Built from |
|---|---|---|
| **Live** | How late is this loan *today*? | The schedule rows' current statuses |
| **Historical** | How late was it on *31 July*? | The frozen schedule plus the **dated receipts** |

The second cannot be computed from the first, because a status field has no date on it. A row that
says an instalment was paid does not say whether it was paid on time, late, or two years late. Only a
dated receipt does.

Both readings are necessary — the first decides provisioning and today's collections, the second
decides [what a credit bureau is told](/solutions/cic-reporting-software-nbfc/) across a trailing run
of months. And they must agree **for the same date**, which is a testable property and worth testing,
because comparing a quarter-end reconstruction against today's live figure is not a disagreement
between the readings. It is two different dates, and it reads exactly like a bug.

## What a system has to do, and what it must not pretend to do

| Need | What good software does | What it must not pretend to do |
|---|---|---|
| The measurement point | Take the oldest unpaid demand | Take the most recent, which reports a four-instalment arrear as one |
| The date | Accept a business date as an input to a daily job | Read the system clock, which makes yesterday unreproducible |
| Grace | Apply it to a penal levy's chargeable days only | Subtract it from days past due, which delays overdue flagging, SMA, NPA and the bureau figure from one line of code |
| Products | Differ by the due events generated | Give a product its own delinquency path |
| Loans without instalments | Generate a maturity due event, because every loan has one | Report them regular because no instalment is unpaid |
| Revolving facilities | Test continuous excess over limit or drawing power | Apply the instalment ranges to an overdraft |
| The past | Rebuild from dated receipts | Read it off a status field |
| Agreement | Compare the two readings for the *same* date | Compare a quarter-end reconstruction with today and call the gap a defect |
| Prediction | Nothing | Describe a days-past-due figure as early warning. It is a record of lateness that has already happened |

## Frequently asked questions

### Is there a grace period before an account is overdue?

Not for classification. A lender may decline to *levy* a penal charge for the first few days, which
is a pricing decision about a charge; the amount is overdue from the date it was not paid regardless.
Two settings, and the classification one is always zero.

### What date does days past due count from — the due date or the day after?

From the due date itself, flagged in that date's day-end process. An instalment due on the 12th and
unpaid is overdue at the end of the 12th, not from the 13th.

### Can days past due exceed the age of the loan?

No, and a figure that does is the signature of a specific defect: a historical reading summing
receipts that carry no interest and principal split, so the reconstruction sees a borrower who never
paid and counts from the first instalment forward. If a migrated loan shows days past due roughly
equal to its age, that is where to look.

### Does a part payment reduce days past due?

Only to the extent it clears the oldest unpaid demand. A payment appropriated to the newest
instalment leaves the oldest open and the figure unchanged, which is one reason the settlement order
belongs in the sanction rather than in whatever the code happened to do.

### Where does Lenviq stand on this?

One engine serves every product and takes no per-product branch; products differ only by the due
events they generate, and every loan generates a maturity event. It runs in a scheduled day-end job
that is handed the business date rather than reading the clock. Grace reduces a penal levy's
chargeable days only. A second reader rebuilds a past month from the frozen schedule and the dated
receipts, netting reversals at their own value date, and an audit script compares the two readings for
the same date rather than assuming they agree. The days-past-due movement matrix — the report that
shows accounts travelling between buckets between two dates — is **specified in the catalogue and not
offered**; the figure itself is live everywhere, the movement report is not.
