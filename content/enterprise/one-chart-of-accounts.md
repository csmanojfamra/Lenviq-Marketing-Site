---
title: "One chart of accounts under a multi-product book, and the reconciliation that proves it"
description: "The question an auditor asks is not what the loan book says or what the general ledger says. It is whether they agree, and if not, by how much and on which loan. A book spread across products and branches makes that question harder and the answer more necessary."
metaDescription: "Does the loan book tie to the control account in the general ledger, and if not, on which loan? What a multi-product chart of accounts has to hold."
question: "How should a lender's loan book tie to its general ledger?"
keyword: "loan book to general ledger reconciliation software"
kind: situation
updated: "2026-10-13"
related: "reconciliation-off-by-rupees, dcb-reconciliation-why-it-stops-tying, books-of-account-what-must-be-kept, nbfc-income-recognition-rbi-rules, audit-trail-what-counts, /reports/|Reports and MIS, npa-income-reversal, nbfc-books-retention"
priority: 0.8
draft: true
---

Two systems hold the same money. The loan book knows what each borrower owes; the general ledger
knows what the lender's balance sheet says it is owed. They are built from the same events and they
are maintained by different code paths, so the only interesting question about them is whether they
agree — and when they do not, which loan accounts for the difference.

On a single-product book the answer is usually "near enough, and we will find it". Across several
products, branches and a year of postings, "we will find it" stops being true, because a difference
of a few thousand rupees spread over four thousand loans is not findable by inspection.

## The difference between a control account and a reconciliation

A **control account** is one ledger line carrying the total of a subsidiary book. A
**reconciliation** is the comparison that proves the subsidiary book adds up to it. Having the first
without the second is the common arrangement, and it is worth nothing: a control account that is
wrong is still a number.

The arrangement that makes a reconciliation exact rather than approximate is a control ledger **per
loan** rather than one aggregated line per product. With a per-loan control ledger, "the book does
not tie" becomes a list of loan account numbers with a difference against each, and the
investigation is a morning rather than a quarter.

The cost of that design is more ledger accounts — a lot more. The benefit is that the reconciliation
is a report rather than an exercise.

## What breaks a reconciliation, in order of how often

**Rounding.** Interest accrued in paise and demanded in whole rupees produces a sub-rupee residue on
every instalment, and a book of ten thousand instalments produces a residue nobody budgeted for. The
answer is not to round the accrual — that collects above contract — but to post the adjustment
somewhere named, so it appears as a round-off line rather than as an unexplained difference.
[The rupee-level arithmetic is worth reading on its own](/blog/reconciliation-off-by-rupees/).

**An event posted to the loan and not to the ledger, or the reverse.** The commonest version is a
charge levied on the borrower's statement with no ledger entry because it is recognised on receipt —
which is correct, and which means the two documents are *supposed* to differ by that amount. A
reconciliation that does not know the rule reports it as a break every month.

**A period that was closed and then reopened.** Once a period is locked, a correction belongs in the
current period as a dated counter-entry. A system that permits an edit to a locked period has made
every figure already reported from it unreliable, including the ones in a filed return.

**A migration.** Opening balances brought in from a previous system are the single largest source of
differences, because they were correct in the old system's terms. More on this in
the migration page.

## Several products, one chart

The temptation with a multi-product book is a parallel chart per product, which looks tidy and makes
a consolidated balance sheet an exercise in mapping. The alternative is one chart with the product
expressed as a dimension rather than as a branch of the tree — so interest income is interest income,
and the gold book's share of it is a cut rather than a different account.

This matters for three things a lender actually has to produce:

- **The financial statements**, which are the lender's and not the product's. Interest suspense sits
  as a contra-asset against interest receivable whatever book the loan came from.
- **The regulatory returns**, which ask for figures on their own basis, not on the chart's. A return
  that can only be filled by hand-mapping forty accounts gets filled wrong eventually.
- **GST output**, which follows the charge rather than the loan type, and which has to reach the
  output register or it is invisible to the return.

## What a system has to do, and what it must not pretend to do

| Need | What good software does | What it must not pretend to do |
|---|---|---|
| The tie-up | A control ledger per loan, so a difference names the loan | One aggregated control line, where a difference names nothing |
| Rounding | Post the sub-rupee adjustment to a named round-off head | Round the accrual, which collects above the contracted rate |
| Receipt-basis heads | Know that the statement and the ledger are *meant* to differ by the uncollected levy | Report that difference as a break every month |
| A closed period | Refuse the edit; take a dated counter-entry in the open period | Offer an edit button on a locked period |
| Products | One chart, product as a dimension | A parallel chart per product, consolidated by hand |
| Corrections | A reversal that stands alongside the original for ever | Delete or amend a posting |
| Your accounting policy | Nothing | Choose it for you. The software should post what you have decided, and make the decision visible |

## Frequently asked questions

### Should the loan book or the general ledger be the source of truth?

Neither, and treating one as authoritative is how the other stops being maintained. They are two
views of the same events; the events are the source of truth, and the reconciliation is what proves
both views were built from them.

### How often should the reconciliation run?

Often enough that a difference is traceable to the week it arose. A quarterly reconciliation on an
active book is an archaeology project; the same report run nightly is a short list.

### What about a difference that is genuinely explainable?

Then it should be explained **in the report**, as a named line, rather than carried in somebody's
head. "Interest levied and not collected" is a legitimate reconciling item. An unlabelled difference
of the same amount is not, even though the number is identical.

### Where does Lenviq stand on this?

Each live loan carries its own control ledger, so the comparison between the loan book and the
general ledger is per loan and a difference names the accounts that cause it; the reconciliation is
one of the reports rather than a procedure. Every financial posting is an event record — a correction
is a dated counter-entry and nothing is updated or deleted — and a locked period refuses a posting
rather than accepting a backdated one. Sub-rupee residue from accruing in paise and demanding in
whole rupees lands on a named round-off head. Interest suspense is presented as a contra-asset
against interest receivable. What the platform does not do is choose an accounting policy for you.
