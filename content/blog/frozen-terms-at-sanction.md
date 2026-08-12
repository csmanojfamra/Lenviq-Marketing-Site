---
title: "A loan should carry its own terms, not a pointer to them"
description: "Product masters change. Loans sanctioned under the old terms must keep them, and the only reliable way is to snapshot the terms onto the loan at sanction rather than resolve them through a table years later."
date: "2026-08-11"
category: "Engineering"
author: "FastLegal Technologies"
draft: false
---

A loan should hold a **copy of the terms it was sanctioned on**, written onto the account at
sanction, rather than a pointer to a master that can be edited afterwards. Every lending system has a
product or scheme master — rate, tenure, charges, penal configuration, prepayment rules — and every
lending system edits it. The question is what happens to loans already on the book when it changes.

## Why is reading the live master the wrong answer?

If a loan stores a scheme identifier and reads the live master whenever it needs a term, then editing
the master changes loans already sanctioned.

Not their rate, necessarily — the rate is usually copied onto the account, because somebody thought
about the rate. It is the parts nobody thought to copy that move: the penal calculation basis, the
appropriation order, the prepayment permission, the grace period, the bounce charge, the broken-period
treatment.

The effect is silent. No screen looks wrong. A loan sanctioned in March starts being serviced under
terms agreed in September, and the sanction letter in the borrower's file no longer describes the
loan the system is running.

It is also the kind of defect that surfaces at the worst moment: in a dispute, where the borrower has
a document and the lender has a system, and they disagree.

## Isn't versioning the master enough?

Making a scheme immutable once active and forking a new version on edit is a real improvement — it
means the old terms still exist somewhere. But a loan pointing at "scheme X version 2" is still
**resolving through a table**, and the resolution is only as good as the discipline that maintains
it.

Three ways that discipline fails:

- **A version is edited "just to fix a typo".** The typo was in the penal description, which is what
  the KFS prints.
- **A migration renumbers versions.** Every loan's pointer now resolves to something else.
- **A field is added later** with a default. Loans sanctioned before it acquire the default
  retrospectively, because they had no value and the code fills one in.

Versioning protects the history. A snapshot protects the loan.

| | Pointer to master | Pointer to a version | Snapshot on the loan |
|---|---|---|---|
| Master edited | Loan changes | Loan unaffected | Loan unaffected |
| Version edited | Loan changes | Loan changes | Loan unaffected |
| New field added with a default | Loan acquires it | Loan acquires it | Loan unaffected |
| Reproducing the KFS in year three | Today's terms | The version's terms, if intact | The terms as given |
| Where the answer lives | A join away | A join away | On the account |

## What should be snapshotted?

Everything the servicing engine will read for the life of the loan:

- Interest rate, method, and the benchmark and spread if floating, with the reset cycle.
- Tenure, instalment type and collection frequency.
- The appropriation order.
- Penal calculation basis, quantum and grace.
- Bounce charge, prepayment and foreclosure permissions and charges, lock-ins.
- Broken-period and moratorium treatment.
- For gold: the slab schedule, the maximum tenure, the servicing frequency, the LTV cap.

The test of completeness is blunt: **if the master were deleted, could the loan still be serviced
correctly?** If the answer needs a lookup, something is missing from the snapshot.

## What about a rate revision on a floating loan?

A snapshot does not prevent contractual change. It records what was agreed, including the mechanism
by which the rate may change.

A floating-rate loan's snapshot holds the benchmark, the spread and the reset cycle. When the
benchmark moves, the rate moves — because that is the term that was agreed. What must not happen is
the **spread** or the **reset cycle** changing on an existing loan because somebody edited the
scheme, since neither was agreed to change.

The same distinction applies to a regulatory change. If a direction requires a treatment to change on
existing loans, that is a deliberate, recorded migration of the affected accounts — not a side effect
of editing a master.

## Common mistakes

- **Copying the rate and nothing else.** The most common partial implementation.
- **Editing an active version.** Defeats versioning entirely.
- **New fields defaulted onto old loans.** They acquire a term nobody agreed.
- **The KFS generated from the master rather than the loan.** Reproducing it years later gives the
  wrong document.
- **The snapshot stored but not read.** The engine still resolves through the master; the snapshot is
  decoration.
- **No record of who changed the master, and when.** Even with snapshots, the master's history is
  part of the answer to why two loans differ.

## A worked example

A gold loan is sanctioned in January. The scheme's appropriation order is charges, then interest,
then principal, and its interest slab schedule starts at 1% a month.

In June the lender revises the scheme: the slab schedule now starts at 1.25%, and the appropriation
order is changed to interest, principal, charges.

**Reading the live master:** the January borrower's next payment is appropriated in the new order —
so a payment that would have cleared their penal charge now clears interest instead, and their penal
balance stays outstanding and attracts more charge. Their accrual, if the slab is read live, moves to
1.25%. Neither change was agreed with them, and neither is visible as a change.

**With a snapshot:** the January loan continues on 1% and the original order. The June scheme applies
to loans sanctioned from June. If the lender wants existing loans moved — for a permitted reason,
with notice — that is an explicit migration with a record, which is exactly what a regulator would
expect to see.

## How Lenviq handles this

A scheme is versioned and immutable once active, and the loan takes a full snapshot of the scheme
parameters at sanction. Servicing, statements, the Key Facts Statement and the agreement all read the
snapshot, so the master can change without any existing loan changing. Because the KFS is generated
from the loan's own snapshotted terms, it can be reproduced years later as it was given rather than
as today's masters would produce it.

There is a test in the suite that fails if a servicing path reads a scheme field from the master
rather than the snapshot, because "snapshot stored but not read" is the failure that looks correct
from every screen.

## Frequently asked questions

### What does it mean for a scheme to be frozen at sanction?

The loan holds its own copy of the scheme's parameters, taken when it was sanctioned. Editing the
scheme afterwards creates a new version for future loans and cannot alter the terms of loans already
made.

### Can a floating rate still change if terms are frozen?

Yes — the snapshot records the benchmark, the spread and the reset cycle, and the rate moves with the
benchmark because that is what was agreed. What cannot change is the spread or the reset mechanism
itself on an existing loan.

### What if a regulation requires existing loans to change?

Then the affected accounts are migrated deliberately, with a record of what changed, when and under
which direction. That is a different act from editing a master and letting the change propagate
silently, and it is the one an inspection can follow.

### How do you test whether a system really snapshots terms?

Change a scheme parameter that is not the rate — the appropriation order, the penal basis, the
prepayment permission — and then examine a loan sanctioned before the change. If any of its behaviour
moved, the snapshot is either incomplete or not being read.

### Does this apply to charges as well as rates?

Particularly to charges. A charge introduced after sanction cannot be applied to an existing loan,
and under the Key Facts Statement guidelines a charge not disclosed in the KFS given to that borrower
cannot be recovered from them at all — so the snapshot is what evidences which charges were in scope.

---

**Related reading:** [The Key Facts Statement requirement](/blog/kfs-key-facts-statement-nbfc-requirement/) ·
[What counts as an audit trail](/blog/audit-trail-what-counts/) ·
[NBFC software: the complete guide](/blog/nbfc-software-complete-guide/) ·
[Loan management software for an NBFC](/blog/loan-management-software-for-nbfc/)

[Ask for a walk-through](/contact/) — change a scheme and then open a loan sanctioned before it.
