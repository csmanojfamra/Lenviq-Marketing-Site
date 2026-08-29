---
title: Prepare an RBI return
description: Generate the return from the book rather than from a spreadsheet somebody maintains, and see what it was built from.
section: Compliance and reporting
order: 20
audience: Compliance
---

@shot rbi-returns | The RBI returns screen listing each return with its period, status and due date | Each return, its period, and whether it is due.

## Built from the book

A return is generated from the loan book as at the reporting date, not typed into a template. The
figures come from the same materialised views the reports read — so the return, the report and the
dashboard cannot disagree with each other about the same month.

## What the screen shows you

The period it covers, when it is due, and what it was built from. A return that cannot be
reconciled to the book is a return nobody can defend in an inspection, so the trail from the figure
back to the accounts is part of the artefact rather than an exercise afterwards.

@shot reports | The reports screen listing the regulatory and management reports available | The report set, refreshed by the same nightly job the classification runs in.

## Freshness is stated

Reports read materialised views, so they are exactly as fresh as the last rebuild. Every screen that
shows one says when it was last true — a number with no timestamp invites somebody to trust it as
live.
