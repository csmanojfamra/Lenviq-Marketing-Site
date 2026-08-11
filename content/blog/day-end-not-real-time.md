---
title: "Classification is a day-end position, and the difference is a whole day"
description: "A DPD computed at 05:30 IST is computed against yesterday's UTC date. On month-end that moves a transaction into the wrong month, in numbers reported to the board."
date: "2026-08-11"
category: "Engineering"
author: "FastLegal Technologies"
draft: false
---

The Reserve Bank's clarification of November 2021 settled that an account is flagged as overdue in
the **day-end process** of the due date. Most lending systems agree with that in principle. Rather
fewer agree with it in the timezone they actually run in.

## The failure

India is UTC+05:30. A nightly job that runs at 01:00 IST and compares against `new Date()` in UTC is
comparing against a date that, for another four and a half hours, is still *yesterday*.

The consequences are small and constant:

- A repayment posted at 02:00 IST is dated to the previous day.
- A loan disbursed at 02:00 IST gets a schedule seeded from the previous day, so every due date for
  the life of the loan is one day early — and the account reads DPD 1 on the day its instalment is
  actually due.
- On the **last day of the month**, business done after 00:00 IST falls into the next month. A
  month-end position struck at 05:30 IST is struck eighteen and a half hours before that day's
  business has finished.

That last one reaches the board pack and the regulator.

## The fix, and why it is not "add 5.5 hours"

Adding an offset works until it does not — the point is not to shift the instant but to stop using
an instant at all. Classification is a question about a **business date**: what position did this
book stand in at the close of a named day.

So the operations become:

- Snap every date the schedule is seeded from to the **business calendar day**, not the wall-clock
  instant it was booked at.
- Compute days-past-due between two business dates, not two timestamps.
- Strike the month-end position on the business month end.

## The test

Book a loan at 02:00 IST and check that its first due date matches one booked at 14:00 IST the same
day. If they differ by a day, every downstream figure on that loan differs too — quietly, and for
its whole life.
