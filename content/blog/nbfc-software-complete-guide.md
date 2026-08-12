---
title: "NBFC software: the complete guide to what the stack actually contains"
description: "LOS, LMS, core lending, accounting, collections and reporting — what each layer does, where the seams are, what a modern NBFC stack looks like, and how to decide what to buy as one system and what to integrate."
date: "2026-08-12"
category: "Guide"
author: "FastLegal Technologies"
draft: false
---

"NBFC software" is not one product. It is a stack of five layers — origination, loan management,
accounting, collections and regulatory reporting — plus the external services each layer calls. A
lender can buy all five as one platform or assemble them from specialists, and the decision matters
less than the seams: almost every operational failure in a lending business happens where one system
hands data to another and the two stop agreeing.

This guide describes each layer, what has to be true at the joins, and how to decide what belongs in
one system.

## What are the layers of an NBFC technology stack?

| Layer | What it owns | The question it answers |
|---|---|---|
| Loan origination (LOS) | Lead, party, KYC, appraisal, approval, sanction, documentation, disbursement | Should we lend, on what terms, and is the file complete? |
| Loan management (LMS) | Schedule, receipts, DPD, classification, charges, closure | What is owed, what came in, and what does this account now become? |
| Accounting | Chart of accounts, vouchers, trial balance, financial statements | What do the books say, and does the book tie to them? |
| Collections | Allocation, field agents, follow-ups, recovery, legal | Who is chasing what, and what happened? |
| Regulatory reporting | DNBS, CRILC, bureau, priority sector, board MIS | What do we tell the regulator, and can we trace it back? |

Around those sit the external services: credit bureaus, KYC and CKYC, bank account and PAN
verification, e-signature and e-stamping, NACH and payment rails, and increasingly account
aggregators.

## Where do the seams leak?

**Origination to management.** The sanctioned terms — rate, tenure, charges, appropriation order,
penal quantum — must transfer exactly at disbursement and then stop changing. Where the LMS reads a
live product master instead of a snapshot taken at sanction, editing that master restates loans
already made. The borrower was told something; nine months later the system says something else, and
the agreement in the file is the only evidence of which is right.

**Management to accounting.** Every loan event has a double entry: disbursement, receipt, accrual,
charge collection, waiver, write-off, recovery. Where accounting is a separate package fed by a
monthly journal, the loan book and the trial balance are reconciled rather than identical, and
month-end becomes an exercise in explaining the difference.

**Book to reporting.** A return assembled in a spreadsheet from an extract is a second claim about
the same quarter. It will differ eventually, usually in the quarter somebody checks.

**Collections to management.** A receipt taken in the field must appropriate by the same rules as one
taken at the branch — same order, same treatment of charges — or two borrowers who paid the same
amount end up with different balances.

## What does a modern NBFC stack look like?

Three patterns are common in India, and each is defensible for a different lender.

**One platform.** Origination, management, accounting and reporting from a single vendor, with
external services integrated behind adapters. Fewest seams, one data model, one audit trail. The
trade is dependence on one vendor's roadmap, and the need for that vendor to be genuinely good at all
four rather than good at one and adequate at the rest.

**Platform plus specialist accounting.** Lending in one system, accounting in Tally or an ERP, fed by
a posting integration. Common where the finance team is committed to an existing tool. Works when the
integration posts per event and reconciles automatically; fails when it posts a monthly summary that
nobody can trace back.

**Best-of-breed.** Separate LOS, LMS, collections and BI, integrated. Most flexible, most seams, most
integration engineering, and the pattern that most needs an owner who watches the joins.

For a lender under a few hundred crore of book, the single-platform pattern usually wins on total
cost, because the integration engineering in the other two is a permanent overhead rather than a
one-off.

## Which capabilities are non-negotiable for an Indian NBFC?

Whatever the pattern, these must exist somewhere and must agree with each other.

- **Product configuration as data.** New products are configuration, not development.
- **Terms frozen at sanction.** A loan behaves under the terms it was sanctioned on, permanently.
- **Day-end classification.** DPD, SMA and NPA computed nightly from due events, on one path for
  every product.
- **Income recognition rules.** Accrual until NPA, receipt basis after it, with reversal to suspense
  at classification.
- **Charges treated as charges.** Penal amounts not capitalised, not compounded, in the books on
  receipt.
- **Double-entry accounting from loan events**, not from a monthly journal.
- **Maker-checker** on master activation and on disbursement.
- **An append-only audit trail** recording who changed what, when, and what it was before.
- **Data scope enforcement** — a branch manager's report shows their branch, without a toggle that
  ignores it.
- **Masked exports** — personal identifiers masked by default, exceptions named and permissioned.

## How do you decide what to buy as one system?

A practical rule: **anything that shares a number should share a system.**

The loan's outstanding appears in the LMS, the accounting, the statement and the return. It is one
number. Every boundary it crosses is a place it can become two numbers, and the cost of that is not
the integration — it is the person who spends the last week of every month explaining the difference.

Conversely, anything that does not share a number integrates cleanly: bureau pulls, KYC checks,
e-sign, payment rails. These are request-and-response services with clear boundaries, and specialists
do them better than a lending platform will.

## Common mistakes

- **Choosing on module count.** Every vendor has a long list. Ask what each module does at the edges.
- **Treating accounting as a downstream export.** If it is downstream, it will disagree.
- **Buying an LOS first and an LMS later.** The seam between them is the hardest one, and choosing
  the halves separately guarantees you own it.
- **Assuming migration is a data-loading exercise.** It is a reconciliation exercise. Budget a
  parallel run.
- **No exit plan.** Ask what your data looks like when you leave, in the evaluation, not later.

## How Lenviq fits

Lenviq is the single-platform pattern: origination, loan management, double-entry accounting and RBI
reporting in one system, with external services behind adapter interfaces so a bureau or a KYC
provider can be swapped without touching the lending engine.

The reason it is built that way is the seam problem above. A loan event posts to the books as it
happens, so the loan book and the trial balance are the same set of facts rather than two that get
reconciled. Classification is computed from the same due events the statement is built from. The
scheme a loan was sanctioned on is snapshotted onto it, so the master can change without the loan
changing.

It is not the right answer for every lender. An NBFC with a large existing investment in a specialist
origination system, or one whose finance function will not move off an ERP, is buying a different
shape of problem. The [platform page](/platform/) sets out module by module what is included.

## Frequently asked questions

### What is the difference between core lending software and a loan management system?

In Indian usage they overlap heavily. "Core lending" usually implies the whole lifecycle including
origination and accounting; "loan management system" usually means servicing onwards. What matters
more than the label is which layers a given product actually owns — ask which of origination,
servicing, accounting and reporting it does itself and which it expects you to integrate.

### Can an NBFC run on Tally plus a loan management system?

Yes, and many do. It works when the lending system posts to Tally per event rather than as a monthly
summary, so each voucher traces back to a loan movement. It becomes painful when the integration
posts aggregates: the trial balance is then a total that cannot be explained back to the accounts
that produced it.

### How many systems does a small NBFC need?

Fewer than it thinks. A single-branch lender with two products needs one platform and its
integrations. The stack complexity that larger lenders carry usually reflects history — systems
bought at different times for different reasons — rather than a requirement.

### What should be integrated rather than built in?

Anything with a clean request-and-response boundary and a specialist market: credit bureaus, KYC and
CKYC, PAN and bank account verification, e-sign and e-stamp, NACH and payment rails, account
aggregators. These are better bought than built and better integrated than absorbed.

### How long does migrating an existing loan book take?

The loading is quick; the reconciliation is not. Every account's outstanding, schedule,
classification, charge history and accrued interest must be reproduced exactly and then proved
against the old system, usually with a parallel run over at least one full month-end and ideally a
quarter-end.

---

**Related reading:** [Loan management software for an NBFC](/blog/loan-management-software-for-nbfc/) ·
[RBI compliance for NBFCs](/blog/rbi-compliance-for-nbfcs-guide/) ·
[Terms are frozen at sanction](/blog/frozen-terms-at-sanction/) ·
[What must be kept in the books](/blog/books-of-account-what-must-be-kept/)

[Ask for a demonstration](/contact/) against your own product mix.
