---
title: "Migrating a live book: the position is the easy half, and the payment history is the other one"
description: "Any system can take an opening balance. What decides whether a migration worked is whether the arrears, the days past due and the twenty-four months of history a credit bureau will be told are the same afterwards as they were before — and those are rebuilt from dated receipts, not from a balance."
metaDescription: "Any system can take an opening balance. Whether the arrears, the DPD and the bureau history survive a migration is the real test."
question: "What has to come across when a lender moves a live loan book to a new system?"
keyword: "loan book migration software"
kind: situation
updated: "2026-10-13"
related: "spreadsheets-vs-loan-management-software-nbfc, credit-information-reporting-2025, reconciliation-off-by-rupees, irac-day-end-classification, frozen-terms-at-sanction, books-of-account-what-must-be-kept, audit-trail-what-counts, nbfc-books-retention"
priority: 0.8
draft: true
---

Moving a live book is two jobs that get quoted as one. The first is the **position**: for every
loan, what is outstanding, what the terms are, what is overdue today. That part is a spreadsheet
with a lot of columns, and any system can take it.

The second is the **payment history**, and it is the one that decides whether the migration worked.
Days past due is measured from the oldest unpaid demand. Classification follows from days past due.
What a credit bureau is told is a trailing run of monthly positions. All three are rebuilt from
**dated receipts** — not from a balance — so a migration that carries the balance and not the
receipts produces a book that is arithmetically correct today and wrong about every borrower's past.

## The specific way it goes wrong, because it is not obvious

A reasonable migration builds each loan's schedule from the terms and then replays the payments
against it, so that the right instalments end up marked paid. That is the correct approach and it is
one step short of enough.

The receipts the replay creates have to carry **their own split** — how much of each receipt went to
interest and how much to principal — because that is what a historical reading sums. Write the
receipts without it and every field is plausible: the dates are right, the amounts are right, the
instalments are marked paid, today's days-past-due figure is correct. Only the reconstruction of a
past month is wrong, and it is wrong in one direction: it reports a borrower who never paid a rupee,
with days past due climbing by one for every day since their first instalment.

That figure then goes into a bureau submission, because a submission carries a trailing run of
months. A borrower who has paid on time for two years is filed as two years delinquent, on a file
nobody at the lender will ever see.

The lesson generalises past this one bug: **a migration has to be tested against a past date, not
against today.** Today's balance ties up easily, which is exactly why it is the wrong test.

## What has to come across, and what cannot

| What | Can it come across? |
|---|---|
| Outstanding principal, terms, tenure, rate | Yes, and it is the part everybody checks |
| The frozen terms the loan was sanctioned on | Yes — and it must, because servicing reads the snapshot and not the live scheme, so a loan migrated against today's master is a loan whose terms quietly changed |
| Dated receipts with their interest and principal split | Yes, and this is the half that gets dropped |
| The instalment schedule as it stood | Yes, rebuilt from the terms and reconciled against what was paid |
| Collateral records | Yes, to the extent the old system held them in a shape worth keeping |
| The old account number | **It must be kept and stay searchable.** A posted voucher, a receipt and a statement already issued all quote it, and renaming without keeping it makes that history unreachable rather than wrong — which is worse, because it is silent |
| The general ledger history | **No.** The accounting of the old system belongs to the periods it was filed for. A migration brings opening balances; it does not re-post five years of vouchers |
| An audit trail from before the migration | **No.** The trail starts when the system starts. What can be kept is the record of the import itself — who ran it, with what file, and what it created |

## The three things to insist on before anybody commits a file

**A dry run that shows you the loan, not a row count.** The useful preview is not "4,312 rows
valid"; it is this loan, with its schedule built and its payments replayed, as it would stand on the
book's date. Errors in a migration are not usually format errors. They are a tenure read as months
when it was weeks, on four hundred loans.

**A batch, with an undo.** A migration happens more than once — a pilot branch, then a product, then
the rest — and the second run always follows a problem found in the first. If the only way back is a
database restore, the first run has to be perfect, and it will not be.

**A reconciliation against the old system's own trial balance**, not against the new system's. The
question is whether the new book agrees with what was previously reported, and only one of those two
numbers is already in a filed return.

## What a system has to do, and what it must not pretend to do

| Need | What good software does | What it must not pretend to do |
|---|---|---|
| The preview | Build the schedule and replay the payments in memory, and show the resulting loan | Validate column formats and call it a preview |
| Receipts | Write each one with its own interest and principal split | Mark instalments paid and leave the split empty, which is correct today and wrong about every past month |
| Terms | Snapshot the scheme the loan was actually written on | Attach today's master to a loan sanctioned two years ago |
| The old number | Keep it, searchable, for ever | Overwrite it, making every document that quotes it unreachable |
| Batches | One batch per run, with an undo while nothing has consumed it | A single irreversible load |
| The ledger | Take opening balances | Re-post the old system's vouchers into a period already filed |
| Testing | Compare a **past** date | Tie up today's balance and declare success |
| Your old data | Nothing | Improve it. A migration that silently cleans up what it was given has destroyed the only evidence of what the book actually was |

## Frequently asked questions

### Can a migration be undone after go-live?

A batch can be undone while nothing outside it has consumed what it created — before receipts have
been posted against the loans, before a return has been filed on them, before a bureau submission
has gone. After that the answer is no, and it should be no: an undo at that point would remove rows
other records depend on.

### What about loans that are already closed?

They are history rather than position, and whether to bring them is a decision about what the lender
wants to be able to answer later. A closed loan carries no balance and does carry a borrower's
record of having repaid — which matters for the next application from the same borrower.

### Do the opening balances need to match to the rupee?

Yes, and the difference is more informative than the match. A discrepancy of a few rupees per loan is
usually a rounding convention; a discrepancy on some loans and not others is usually a product the
old system treated differently, and that is worth finding before go-live rather than after.

### Where does Lenviq stand on this?

Both the customer import and the loan import run as a preview that builds each loan's schedule and
replays its payments in memory before anything is written, commit as a named batch, and can be
undone while nothing outside the batch has consumed what it created. Each replayed receipt is written
with its own interest and principal split, which is what a historical reading sums — that was a real
defect, found and fixed, and the description of it above is drawn from it. A loan's old account number
is kept and stays searchable, and uniqueness covers former numbers so no loan may take a number
another loan used to have. What the import does **not** do is post the accounting: it creates no
voucher for the migrated disbursement or the replayed receipts, so the general ledger side of a
migration is a separate, deliberate step.
