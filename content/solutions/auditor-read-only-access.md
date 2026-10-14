---
title: "An auditor's access: read everything, change nothing, and get the position as at the date you asked for"
description: "The questions an audit asks are about the past, and most systems can only answer about the present. What read-only access should actually include, why an as-at date has to be an input rather than a convenience, and why a change log is not a position."
metaDescription: "Audit questions are about the past; most systems answer about the present. What read-only access should include, and why as-at has to be an input."
question: "What should an auditor be able to see in a lender's loan management system?"
keyword: "auditor access for lending software"
kind: persona
author: "CA Tanmay Saini"
updated: "2026-10-13"
related: "/solutions/|Every solution, audit-trail-what-counts, books-of-account-what-must-be-kept, nbfc-books-retention, provisioning-software-nbfc, /enterprise/one-chart-of-accounts/|One chart of accounts, due-diligence-what-lenders-ask, cic-reporting-software-nbfc"
priority: 0.7
draft: true
---

Almost every question an audit asks is about the past. What was outstanding on 31 March. What was
this account classified as then. What provision was carried, against what valuation. Who approved
this disbursement and on what authority. What was reported to the regulator, and does it agree with
the books it came from.

Almost every lending system is built to answer about the present. That mismatch is the whole of what
makes an audit slow, and it is not fixed by giving an auditor more access. It is fixed by the system
being able to answer about a date.

## Read-only has to mean read everything

An audit scope that cannot reach the accounting, or the audit log, or the reports, is an audit
conducted on extracts somebody else prepared — which is a different exercise and a weaker one. The
useful shape is tenant-wide read across every surface, with no write anywhere:

| What an auditor should reach | Why |
|---|---|
| Parties, leads, applications and schemes | Sampling a file means reading it, not reading a summary of it |
| Loans and the LMS reports | The position, the arrears, the classification |
| The accounting | The vouchers behind the position, not a trial balance somebody exported |
| The audit log | Who did what, when, and what it was before |
| The reports | The same ones management uses, so the figures discussed are the same figures |

And no write at all — not a note, not a flag, not a tick. An auditor who can change something has
become part of the system they are examining.

## The as-at date is the whole requirement

A report that answers "as at today" can be asked about 31 March only by being re-run against
today's data, which produces today's answer to a question about March.

So the date has to be an **input** to the computation. Three consequences, and the third is the one
that takes real design:

- **The position has to be stored or reconstructible for a past date**, rather than derived from
  current balances.
- **The rule that produced it has to be the rule that applied then.** A classification derived live
  by a rule amended in June gives June's answer about March.
- **It has to be reproducible on demand, repeatedly.** An auditor asks the same question twice, in
  two different weeks, and a different answer the second time is a finding on its own.

## A change log is not a position, and this is the common substitution

An audit trail tells you *what changed*. A position tells you *what it was*. These are not the same
record and one cannot be derived from the other at any reasonable cost.

Reconstructing the 31 March classification of four thousand accounts by replaying a change log is an
exercise nobody wants to begin during an inspection — and it will give an answer that depends on how
the replay handled gaps. What answers the question is a stored position, with the trail available
beside it to explain how it got there.

[What a trail actually has to capture](/blog/audit-trail-what-counts/) is a separate question, and
the short version is: who, when, and the before as well as the after. A log of "updated" without the
previous value is a log that records that something happened.

## The three reconciliations an audit will ask for

**The loan book against the general ledger.** Not whether there is a control account — whether the
subsidiary book adds up to it, and if not, on which loans. A per-loan comparison turns "the book does
not tie" into a list of account numbers;
[one aggregated control line turns it into a quarter](/enterprise/one-chart-of-accounts/).

**The classification against the provision.** Two accounts at the same days past due can carry very
different provisions, correctly, because the base is net of realisable security. What has to be
available is the valuation each provision was computed against, with its own date.

**What was reported against what the books say.** The return as filed, its acknowledgement, and the
locked figures it was built from. A quarter whose numbers moved after filing cannot be reconciled to
anything.

## What read-only access cannot answer, and should not claim to

- **Whether the money reached the bank.** The system knows what it was told was received. A bank
  reconciliation is a separate control and no lending system performs it alone.
- **Whether a valuation is realistic.** It holds the valuation and its date. Whether the security
  will fetch that is a judgement.
- **Whether the provisioning is adequate.** The engine computes the regulatory minimum from rules
  and recorded values. Adequacy is the auditor's and the board's question, which is the point of
  having one.
- **Whether a file should have been sanctioned.** It holds the appraisal, the deviation and the
  approval chain that was applied. The credit view was somebody's and it has their name on it.

## Frequently asked questions

### Should an auditor have tenant-wide scope or branch scope?

Tenant-wide, and this is one of the few roles where that is clearly right. An audit scoped to a
branch cannot test whether a figure rolled up from forty branches is the sum of them, which is one of
the questions worth asking.

### Can an auditor export?

They should be able to, because working papers are a requirement of the engagement rather than a
convenience. What matters is that the export is logged — an extract of a lender's whole book leaving
the system is an event the lender should be able to see.

### Does read-only mean an auditor cannot see personal data?

Not usually, and it should not: sampling a KYC file means reading it. What is reasonable is that
some fields are never in the system in full — a masked identifier cannot be exposed by any role,
because it was never stored.

### What is the difference between this and a regulator's inspection?

Scope and consequence, not mechanism. Both ask about past dates and both need the same two things: a
position that can be produced for a date, and a trail that explains how it got there. A system that
serves an audit well serves an inspection well, which is the practical argument for building for the
harder reader.

### Where does Lenviq stand on this?

There is a read-only auditor role with tenant-wide data scope holding parties, leads, applications,
schemes, loans, the LMS reports, the general reports, the accounting read and the audit log — and no
write permission anywhere. Reports take an as-at date as an input rather than reading the clock, and
the classification each account carried is kept rather than re-derived. Every master and application
mutation writes to an append-only audit log with the before and after. Each live loan carries its own
control ledger, so the loan-book-to-ledger comparison is per loan. An audit and control report set is
available. What the platform does not do is reconcile the bank, judge a valuation, or tell you
whether the provisioning is enough.
