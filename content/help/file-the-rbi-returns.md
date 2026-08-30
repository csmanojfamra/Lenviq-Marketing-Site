---
title: Prepare an RBI return
description: Generate the return from the book rather than from a spreadsheet somebody maintains, and see what it was built from.
section: The books and the regulator
order: 20
audience: Compliance
---

@shot rbi-returns | The RBI returns screen listing each return with its period, status and due date | Each return, its period, and whether it is due.
@mark 44,13.9 | The filing position in one line: on the calendar, overdue, filed.
@mark 27.5,19.6 | The calendar itself — five returns per quarter, with what is due when.
@mark 94,24.5 | Overdue is computed against today rather than stored, so a return one day late shows immediately.
@mark 71,33.2 | The status of each filing, with the reference it was submitted under.

## Built from the book

A return is generated from the loan book as at the reporting date, not typed into a template. The
figures come from the same materialised views the reports read — so the return, the report and the
dashboard cannot disagree with each other about the same month.

## What the screen shows you

The period it covers, when it is due, and what it was built from. A return that cannot be
reconciled to the book is a return nobody can defend in an inspection, so the trail from the figure
back to the accounts is part of the artefact rather than an exercise afterwards.

@shot reports | The reports screen listing the regulatory and management reports available | The report set, refreshed by the same nightly job the classification runs in.
@mark 29,11.5 | How many reports your role and scope actually reach.
@mark 47,16.2 | Search by the QUESTION you need answered, not only by a report name.
@mark 24.5,22.5 | Grouped the way the work is: origination, portfolio, collections, NPA, financial.
@mark 30,36.1 | Each report's code, and whether it is a position as on a date or a flow over a period.

## Freshness is stated

Reports read materialised views, so they are exactly as fresh as the last rebuild. Every screen that
shows one says when it was last true — a number with no timestamp invites somebody to trust it as
live.
