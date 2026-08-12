---
title: "Spreadsheets vs loan management software: when an NBFC has to move"
description: "The honest comparison — what spreadsheets do well for a small loan book, the five specific points at which they stop working for an NBFC, what breaks first, and how to migrate without losing the history."
date: "2026-08-12"
category: "How-to"
author: "FastLegal Technologies"
draft: false
---

A spreadsheet runs a small loan book perfectly well, and an NBFC that says otherwise is usually
selling something. What a spreadsheet cannot do is compute asset classification every night from due
events, keep an audit trail nobody can edit, post double-entry accounting from loan movements, or
produce a return that reconciles to the ledger. Those four requirements are what eventually force the
move — not the size of the book.

This is the honest version of the comparison, including where spreadsheets win.

## What do spreadsheets actually do well?

- **They are free, and everybody already knows them.** No implementation, no training, no vendor.
- **They are infinitely flexible.** A new product is a new column. A one-off calculation is a
  one-off calculation.
- **They are transparent.** Every formula is visible. Nobody has to trust a black box.
- **They are fast to change.** A policy change lands in minutes.

For a lender with fifty accounts, one product and one person doing the books, a well-built workbook
is a rational choice. The problems below are real but they are not urgent at that scale.

## Where do they stop working?

**1. Classification cannot be a nightly computation.**

The RBI's November 2021 clarification requires an account to be flagged overdue in the day-end
process for the due date itself. A workbook computes when somebody opens it. That means the
days-past-due reported to a credit bureau depends on when the file was last touched, and two people
opening it on different days get different answers to the same question.

**2. There is no audit trail.**

An append-only record of who changed what, when, and what it was before is not something a
spreadsheet can provide. Version history is not the same thing: it records the file, not the field,
and anybody with the file can alter both. When an inspection asks who changed a sanctioned rate and
when, "we would have to look at the email" is the answer.

**3. Accounting is downstream and therefore different.**

Loan movements get summarised into a monthly journal. The loan book and the trial balance become two
statements about the same money, reconciled by hand. The reconciliation grows with the book, and the
month it stops balancing is the month somebody spends a week finding out why.

**4. Concurrency.**

Two branches cannot both take receipts at once. The workarounds — a file per branch, consolidated
weekly — mean the consolidated position is always stale and the branch positions are always
authoritative for different periods.

**5. Nobody can check the arithmetic at scale.**

A formula error in row 400 of a 2,000-row sheet is invisible. Copy-paste of a formula down a column
that has one exception in it is the classic, and its effect is a systematically wrong number that
looks perfectly plausible.

| | Spreadsheet | Loan management system |
|---|---|---|
| Set-up cost | Nil | Licence plus implementation |
| Classification | When opened | Nightly, automatic |
| Audit trail | File versions | Field-level, append-only |
| Accounting | Monthly journal | Posted per event |
| Multiple users | Serialised or split files | Concurrent, scoped |
| New product | A new column | Configuration |
| RBI returns | Assembled by hand | Generated from the book |
| Error visibility | Low | Traceable to the posting |
| Good for | Small, single-product, single-user | Everything past that |

## What breaks first?

In practice, in this order:

1. **Reconciliation time.** The month-end close stretches from a day to a week.
2. **Bureau reporting.** The fortnightly submission needs DPD as at a date, and the file's DPD is as
   at whenever it was opened.
3. **An audit question nobody can answer.** Usually about a changed rate or a waived charge.
4. **A second branch.** The moment two people need to write at once.
5. **A regulatory change.** Penal charges moving from interest to charges in April 2024 required
   every affected workbook to be re-modelled, and the ones that were not are still wrong.

## When is the right time to move?

Three practical triggers, any one of which is sufficient:

- **The book is being examined.** An inspection, a bank line, a co-lending partner or a rating agency
  will ask questions the spreadsheet cannot answer.
- **More than one person needs to write.** A second branch, or a collections team.
- **More than one product.** The moment gold and term loans are in the same workbook, the formulas
  fork and the fork is where errors live.

A weaker trigger, but a common one: the person who built the workbook is leaving. A model only one
person understands is a risk with a resignation date.

## How do you migrate without losing history?

The loading is quick. The reconciliation is the work.

**1. Freeze the definition of correct.** Take a date and produce, from the spreadsheet, the
outstanding, schedule, classification, charge history and accrued interest for every account. That
file is the thing the migration has to reproduce.

**2. Migrate to that date.** Load the accounts and let the new system compute forward.

**3. Reconcile account by account, not in total.** A matching total can hide two offsetting errors.
The differences you find will mostly be interest-day-count conventions and charge treatment, and both
are worth understanding rather than adjusting away.

**4. Run in parallel through a month-end.** Ideally a quarter-end, because that is when the reporting
differences show.

**5. Cut over, and keep the workbook read-only.** Not as a fallback to update — as the historical
record for the period before the system.

The failure mode is migrating balances but not history: the new system knows what each account owes
but not how it got there, so the first statement of account a borrower asks for begins at the
migration date and cannot explain anything before it.

## Common mistakes

- **Migrating balances without the charge and classification history.**
- **Reconciling in total instead of account by account.**
- **Cutting over at a quarter-end.** Cut over after one, not into one.
- **Treating differences as data errors.** Some of them are the spreadsheet being wrong, and finding
  out which is the point of the exercise.
- **Keeping the workbook live "just in case".** Two systems of record is worse than either.

## How Lenviq handles this

Migration is a reconciliation exercise, and the platform is built to make the comparison possible: an
account's outstanding, schedule and classification each trace back to the events that produced them,
so a difference against the old workbook can be explained rather than adjusted. Every mutation
carries an append-only audit record from day one, which is usually the first thing a lender moving
off spreadsheets actually notices — not a feature, but the end of a class of question that used to
have no answer.

The [platform page](/platform/) sets out what is included; migration scope is a conversation about
your data rather than a line on a page.

## Frequently asked questions

### Is it legal for an NBFC to run its loan book on spreadsheets?

There is no rule naming spreadsheets. There are rules — on day-end classification, on audit trails,
on books of account and their retention — that a spreadsheet cannot readily satisfy, and an inspection
will test the outcome rather than the tool. Small lenders do run on spreadsheets; the exposure grows
with the book and with the number of people touching it.

### How many loan accounts before a system is needed?

There is no threshold, and vendors who quote one are guessing. The triggers are structural rather than
numeric: more than one writer, more than one product, or an external party about to examine the book.

### How long does migration from spreadsheets take?

Weeks rather than months for the loading and configuration, plus a parallel run through at least one
month-end. The variable is data quality: books with a clean history migrate quickly, and books where
charge treatment has changed over time take longer because those differences have to be understood
before they are resolved.

### Can we keep using Tally for accounting?

Yes, if the lending system posts to it per event rather than as a monthly summary — each voucher
traceable back to a loan movement. Where the integration posts aggregates, the trial balance becomes
a total that cannot be explained back to the accounts that produced it, which is the spreadsheet
problem with extra steps.

### What is the biggest risk in moving off spreadsheets?

Losing the history. Migrating balances is straightforward; migrating how each balance came to be is
what lets you produce a statement of account for a borrower whose loan predates the move. Insist on
it in the scope.

---

**Related reading:** [Loan management software for an NBFC](/blog/loan-management-software-for-nbfc/) ·
[NBFC software: the complete guide](/blog/nbfc-software-complete-guide/) ·
[What must be kept in the books](/blog/books-of-account-what-must-be-kept/) ·
[What counts as an audit trail](/blog/audit-trail-what-counts/)

[Ask for a demonstration](/contact/) — bring your workbook and we will talk about what migrating it
actually involves.
