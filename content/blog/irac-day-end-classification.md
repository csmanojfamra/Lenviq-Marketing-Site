---
title: "Why an intra-day NPA number is not the same number"
description: "IRAC classification is computed on the day-end position. What that means for a report run at 11am, and what it does to a month-end close."
date: "2026-08-10"
category: "Regulatory"
author: "FastLegal Technologies"
draft: false
---

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

---

*The day-end and full-clearance points are quoted from the clarification linked above. The 90-day
boundary is the general position for term loans; specific asset classes and facility types carry
their own rules, and this post does not enumerate them.*
