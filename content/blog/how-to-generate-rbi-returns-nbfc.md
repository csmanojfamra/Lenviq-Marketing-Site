---
title: "How to generate RBI returns for an NBFC without re-keying the book"
description: "Which returns an NBFC files, what each one is built from, why a return assembled in a spreadsheet will eventually disagree with the ledger, and how to make every figure traceable back to the accounts that produced it."
date: "2026-08-12"
category: "How-to"
author: "FastLegal Technologies"
draft: false
---

Generate RBI returns from the loan book itself, not from an extract of it. Every figure in a DNBS
return, a CRILC submission or a bureau file already exists somewhere in the ledger; the moment it is
re-typed into a workbook it becomes a second claim about the same quarter, and the two will
eventually differ. The work of return preparation should be **checking**, not assembling.

This guide covers which returns apply, what each is built from, and how to tell whether your
reporting is traceable.

## Which returns does an NBFC file?

What applies depends on your layer under scale-based regulation and on what you do. The common set:

| Return | Broadly | Cadence |
|---|---|---|
| DNBS-2 | Prudential and financial position | Quarterly |
| DNBS-10 | Statutory auditor's certificate | Annual |
| DNBS-13 | Overseas investment, where applicable | Quarterly |
| CRILC | Large borrower exposures, including SMA status | Quarterly, with weekly SMA-2 reporting for defaulting accounts |
| Credit information | Borrower-level submissions to the four credit information companies | Fortnightly |
| Priority sector | Classification of advances, where applicable | As prescribed |

The list is not the point. The point is that every one of them draws on the same three underlying
facts — what is outstanding, what is overdue, and how each account is classified — and if those
three are computed once and read by everything, the returns agree by construction.

## What is each return actually built from?

Trace any return back and you land on the same handful of primitives:

- **Outstanding principal** per account, as at a date.
- **Days past due**, computed at day-end from the account's due events.
- **Asset classification** derived from that DPD, plus the upgrade rule.
- **Interest** — accrued, in suspense, or recognised.
- **Charges** — levied, collected, waived.
- **Provisions** — computed from classification and the applicable rates.
- **Borrower identity and exposure**, aggregated where a borrower has several accounts.

If those exist as computed facts on the system, a return is a query. If any of them is a judgement
somebody enters at reporting time, the return is an assembly job that has to be redone and
re-checked every period.

## Why a spreadsheet return eventually disagrees with the ledger

Not because anybody is careless. Because of four mechanical drifts:

**As-at drift.** The extract was taken on the 3rd; a receipt was back-dated to the 31st on the 4th.
The return says one thing, the book another, and both are internally consistent.

**Classification drift.** The workbook applies ninety days as a subtraction of dates. The system
applies it at day-end with the upgrade rule. Accounts near the boundary land differently.

**Charge treatment drift.** Since April 2024 penal amounts are charges recognised on receipt. A
workbook that still adds them to outstanding reports a different exposure.

**Aggregation drift.** A borrower with three loans is one exposure for CRILC and three accounts in
the book. Whichever way the workbook aggregates, it is a rule that lives only in the workbook.

Each is small. Together they are why the reconciliation between the return and the trial balance
takes a week, and why the answer to "which is right?" is usually "neither, exactly".

## How do you make a return traceable?

One test: **pick a number in a filed return and get back to the accounts that produced it, in the
system, without asking anybody.**

That requires three things:

**1. A dated position, stored.** The book as at a date must be recoverable, not recomputed. A
month-end position computed today from a book that has moved since is not the position that was
reported. Store the snapshot; report from the snapshot.

**2. One computation, many readers.** DPD used by the return is the same DPD on the account screen
and in the statement. Where the return computes its own, it is a second engine and it will diverge.

**3. Drill-down that survives.** From the aggregate to the accounts to the events. A figure you can
only verify by re-running the extract is not traceable, it is reproducible — and those are different
things when somebody asks why it changed.

## What about the timing of the day-end?

Reports get this wrong more often than the arithmetic.

An Indian lending day ends at close of business, not at UTC midnight. A month-end position struck on
a UTC boundary is taken at 05:30 IST on the last day of the month — eighteen and a half hours before
that day's business has finished. Transactions after it fall into the next month, in figures that go
to the board and the regulator.

The same applies to the fortnightly bureau cycle and to any "as at" date in a return. The business
calendar has to be the one the reporting uses.

## Common mistakes

- **Assembling returns from an extract.** Guarantees a reconciliation every period.
- **Computing the as-at position at report time.** The book has moved; the reported position has
  not.
- **A second DPD computation for reporting.** Two engines, one truth, eventually two answers.
- **Aggregating exposures in the return rather than in the system.** The rule lives in the workbook,
  and leaves when its author does.
- **UTC month-end.** Silently shifts a day's business into the wrong period.
- **No stored history.** When a filed figure is questioned six months later, "we would have to
  re-run it" is not an answer.
- **Manual adjustment entries in the return.** If the return needs an adjustment the book does not
  have, one of them is wrong, and it is usually not the return.

## A worked example

A quarterly DNBS-2 asks for gross NPA as at 30 June.

**The assembled way.** Extract the book on 2 July, filter accounts with DPD over 90, sum the
outstanding, adjust for two accounts the collections team says have since paid, submit. The figure is
defensible on 2 July and unverifiable on 2 October, because the book has moved and the adjustments
lived in an email.

**The traceable way.** The day-end job on 30 June wrote the position: every account's outstanding,
DPD and classification as at that date. The return reads that snapshot. Any account can be opened and
its DPD traced back to the unpaid due events it was computed from. If a receipt is later back-dated
into June, the snapshot does not silently change — a correction is a visible act with a date on it.

The second way takes longer to build once and no time at all every quarter.

## How Lenviq handles this

The day-end job writes a position snapshot before anything derived from it runs, because that
snapshot is the immutable record of where the book stood and is the only step whose absence is
permanent — a missed night is a month-end position that cannot be reconstructed. Reporting reads the
snapshot rather than recomputing.

Classification, DPD and provisioning are computed once by the same engine the account screens and the
statements read, so a return cannot disagree with the account it came from. Month-end is struck on
the business calendar, not on a UTC boundary. Reports run through materialised views over the
transactional tables rather than querying them directly, and each states the date its figures are as
at — because a month-end number and a today number are different answers, and mixing them silently
is how two people bring different figures to the same meeting.

## Frequently asked questions

### Which RBI returns does a Base Layer NBFC have to file?

The applicable set depends on your layer under scale-based regulation and your activities; DNBS-2 and
the statutory auditor's certificate are common to most, with CRILC applying where large exposures
exist and credit information reporting applying to all lenders. Your compliance officer's return
calendar is the authority — what a system should do is produce each one from the book rather than
change what has to be filed.

### How often must credit information be reported?

Fortnightly, following the RBI's 2023 direction moving submissions from monthly to a fifteen-day
cycle. The operational consequence is that DPD has to be correct as at each cycle date, which means
it has to be computed nightly rather than at reporting time.

### Can returns be generated automatically?

The figures can. The filing is still a compliance act with a sign-off. What automation removes is the
assembly and the reconciliation — the return becomes something you check rather than something you
build, and the check is fast because every figure opens onto the accounts behind it.

### Why do the return and the trial balance disagree?

Usually one of four drifts: an extract taken on a different date from the position reported, a
different classification rule in the workbook, penal charges included in outstanding when they should
not be, or exposures aggregated by a rule that exists only in the workbook. Each is small; together
they account for most reconciliation time.

### What is a position snapshot and why does it matter?

A stored record of where the book stood at a day-end — every account's outstanding, days past due and
classification as at that date. It matters because it cannot be reconstructed later: recomputing a
past position from a book that has moved gives you a different answer, and the figure you filed is no
longer defensible.

---

**Related reading:** [RBI compliance for NBFCs](/blog/rbi-compliance-for-nbfcs-guide/) ·
[Classification is a day-end event](/blog/irac-day-end-classification/) ·
[Day-end, not real time](/blog/day-end-not-real-time/) ·
[Credit information reporting](/blog/credit-information-reporting-2025/)

[Ask for a walk-through](/contact/) if you want to see a return figure opened back to the accounts
behind it.
