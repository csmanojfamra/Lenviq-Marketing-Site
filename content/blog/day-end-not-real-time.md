---
title: "Day-end is a business date, not a timestamp"
description: "Classification is a question about the close of a named day. A lending system that compares timestamps in UTC gets every date on an Indian book wrong by up to five and a half hours — which is a whole day at the month end."
date: "2026-08-11"
category: "Engineering"
author: "FastLegal Technologies"
draft: false
---

Asset classification asks what position a book stood in **at the close of a named day**. That is a
business date, not an instant — and a lending system that compares timestamps in UTC will get every
date on an Indian book wrong for the first five and a half hours of it. Most of the time that is
invisible. At a month end it moves a day's business into the wrong period, in figures that go to the
board and the regulator.

## Where does the error come from?

The Reserve Bank's clarification of 15 November 2021 settled that an account is flagged as overdue in
the **day-end process** of the due date. Most lending systems agree with that in principle. Rather
fewer agree with it in the time zone they actually run in.

India is UTC+05:30. A nightly job that runs at 01:00 IST and compares against `new Date()` in UTC is
comparing against a date that, for another four and a half hours, is still *yesterday*.

| Event, in IST | UTC instant | UTC date | Business date |
|---|---|---|---|
| 31 Jul, 14:00 | 31 Jul 08:30 | 31 Jul | 31 Jul ✓ |
| 31 Jul, 23:00 | 31 Jul 17:30 | 31 Jul | 31 Jul ✓ |
| **1 Aug, 02:00** | **31 Jul 20:30** | **31 Jul ✗** | **1 Aug** |
| 1 Aug, 06:00 | 1 Aug 00:30 | 1 Aug | 1 Aug ✓ |

Every row in that window is a transaction dated to the previous day.

## What actually breaks?

**A repayment posted at 02:00 IST is dated to the previous day.** In the middle of a month, harmless.
On the 1st, it lands in the wrong month.

**A loan disbursed at 02:00 IST gets a schedule seeded from the previous day.** Every due date for the
life of that loan is one day early, and the account reads one day past due on the morning its
instalment is actually due. Nobody notices, because the amount is right and the borrower pays.

**A month-end position struck at 05:30 IST** is struck eighteen and a half hours before that day's
business has finished. Everything transacted at branches that day falls into the next month.

**Interest day counts drift.** A daily accrual that computes the number of days between two
timestamps rather than two dates will occasionally count one too many or one too few, and the error
does not cancel out — it accumulates in the direction the booking times happen to lean.

## Why is "add 5.5 hours" the wrong fix?

Because it shifts the instant rather than removing it, and an instant is the wrong kind of thing.

An offset works until something changes: a server moved to a different region, a library that
localises differently, a report run from a laptop. Each of those is a place where the offset is
applied twice or not at all, and the failure is silent because the numbers stay plausible.

The correct move is to stop asking "when did this happen" and start asking "**which business day did
this belong to**". Then:

- **Snap every date the schedule is seeded from** to the business calendar day, not the wall-clock
  instant it was booked at.
- **Compute days-past-due between two business dates**, not two timestamps.
- **Strike the month-end position on the business month end** — the close of the last day in India,
  not the UTC boundary.
- **Store the business date** alongside the instant where the distinction matters, so a later report
  does not have to re-derive it.

## Where else does the same error hide?

- **Financial year boundaries.** A disbursement on 31 March booked at 02:00 IST on 1 April lands in
  the wrong financial year, and the year-end closing carries it.
- **Bureau submission cut-offs.** A fortnightly cycle with a UTC boundary reports a DPD as at the
  wrong day.
- **Report titles.** A report headed "as at 31 July" built from a UTC comparison is describing a
  different set of facts from one built on the business calendar. Two people, two reports, one
  meeting.
- **Date formatting for the borrower.** A maturity date near midnight rendered from a UTC instant
  shows the borrower the previous day. That is a communication error rather than an accounting one,
  but it is the kind that produces a complaint.

## The test

Book a loan at 02:00 IST and check that its first due date matches one booked at 14:00 IST the same
day. If they differ by a day, every downstream figure on that loan differs too — quietly, and for its
whole life.

A second test, at the boundary that matters most: post a receipt at 02:00 IST on the 1st of a month
and check which month's collection report it appears in.

## Common mistakes

- **`new Date().toISOString().slice(0, 10)` on a named instant.** The most common single form of this
  bug in a JavaScript codebase. It is correct only when the value is already a pure date.
- **Adding an offset instead of using a calendar.** Works until it is applied twice.
- **Day counts between timestamps.** Off by one whenever the times of day differ.
- **A UTC month-end.** Eighteen and a half hours of business in the wrong period.
- **Trusting the database's default time zone.** It is usually UTC, and usually not what the report
  assumed.

## How Lenviq handles this

Dates that belong to the book are held and compared as business dates on the Indian calendar. The
day-end job is anchored to the business day end rather than to a UTC boundary; month-end positions,
including the snapshot that reporting reads, are struck on the business month end. Day counts for
accrual and days-past-due are computed between business dates.

There is also a guard in the test suite that counts the places where an instant is sliced into a date
string, so the number cannot grow unnoticed — it has caught the error twice, once in a maturity date
being formatted for a customer message.

## Frequently asked questions

### Why does the time zone matter for NPA classification?

Because classification is a day-end event and the ninety-day count runs between dates. If the system
decides which date an event belongs to using a UTC instant, transactions in the first five and a half
hours of an Indian day are attributed to the previous one — which shifts due dates, days-past-due and
the NPA date itself.

### What is a business date?

The calendar day a transaction belongs to for the lender's books, in the lender's own time zone,
running to the close of business rather than to midnight UTC. It is a date, not an instant, which is
what makes it comparable across systems that may run anywhere.

### Is it enough to set the server time zone to IST?

It helps and it is not sufficient. A report run from a laptop, a library that converts internally, or
a database column stored without a zone will each reintroduce the problem. The durable fix is to make
the business date explicit in the data and in the comparisons, so no component has to be configured
correctly for the answer to be right.

### How does this affect the financial year end?

A transaction booked in the early hours of 1 April, IST, resolves to 31 March in UTC — the previous
financial year. Year-end closing then carries it, and reopening a closed year to correct it is not a
small operation. It is the same bug as the month end, with larger consequences.

### How do you test for this?

Book identical transactions at 02:00 and 14:00 IST on the same day and compare every derived date. If
the schedule, the due dates or the report period differ, the system is deriving dates from instants
somewhere.

---

**Related reading:** [Classification is a day-end event](/blog/irac-day-end-classification/) ·
[How to automate NPA classification](/blog/how-to-automate-npa-classification-nbfc/) ·
[How to generate RBI returns](/blog/how-to-generate-rbi-returns-nbfc/) ·
[Interest in paise, not float](/blog/interest-in-paise-not-float/)

[Ask for a walk-through](/contact/) — book one at 2am and see what it does.
