---
title: "Forty branches, one book: who sees which borrower, and whose approval a file needs"
description: "At one branch the questions do not come up. At forty, every figure is a roll-up somebody has to be able to trace back, every approval has a chain, and the hardest part is not reporting — it is making sure a branch manager cannot read another branch's borrower."
metaDescription: "At forty branches every figure is a roll-up and every approval has a chain. What branch and region scoping actually enforces, and where it stops."
question: "How does a lender with many branches control who sees what, and who approves what?"
keyword: "multi-branch loan management software"
kind: situation
updated: "2026-10-13"
related: "/security/|Security, tenant isolation and audit, audit-trail-what-counts, how-to-scale-nbfc-lending-operations, how-to-manage-nbfc-loan-portfolio, due-diligence-what-lenders-ask, /reports/|Reports and MIS, collection-efficiency-how-to-compute"
priority: 0.8
draft: true
---

A lender with one branch has no scoping problem. Everyone sees everything because everything is in
one room, and the approval chain is whoever is sitting at the next desk. At forty branches both
collapse: a figure on a management report is a roll-up of forty numbers that somebody will ask to
have broken back down, a disbursement needs an approver who may be two levels up and in a different
city, and a branch manager who can read another branch's borrowers is a problem whether or not
anybody has yet.

Three mechanisms carry that, and they are separate on purpose.

## Data scope — what a user can read

The branch is a record, and a user's scope is expressed against it rather than against a list of
permissions. A region is a label a branch carries, which is what lets a regional credit manager's
scope be "my region" without anybody maintaining a second hierarchy of which branches are in it.

The important property is that scope is applied **in the query path**, not in the user interface. A
screen that hides a row is a screen; a query that cannot return the row is a control. The difference
shows up the first time somebody exports a report, or guesses a URL with another branch's loan
account number in it.

Underneath that sits the tenancy boundary, which is a stronger thing again and is not configurable:
no query path crosses from one lender to another at all. That is architecture rather than
permission, and
[the security page sets out how it is enforced](/security/).

## The approval matrix — whose sign-off a file needs

An approval chain on a real book is not a role, it is a function of several things at once, and a
system that models it as a role ends up with twenty roles that differ by a rupee threshold.

The chain is resolved from, in combination:

| Dimension | Why it is in the chain |
|---|---|
| **Product** | A gold loan decided at a counter and a property loan with a legal opinion are not the same decision |
| **Scheme** | Two schemes on one product may price and secure differently enough to warrant different authority |
| **Branch or region** | Authority is usually geographic as well as hierarchical |
| **Amount slab** | The commonest dimension, and the one people expect |
| **Deviation level** | A file inside policy and a file requiring a deviation are different asks, even at the same amount |

Because deviation is in the chain, a file that would have been a branch decision becomes a
head-office decision by virtue of what it asks for, which is the behaviour a credit policy actually
describes. A matrix keyed on amount alone cannot express it.

## Maker-checker — the actions that need two people

Distinct from the approval matrix, and often confused with it. The matrix decides **who may
sanction**. Maker-checker decides **which actions one person may not complete alone at all**,
irrespective of amount: activating a master, releasing a disbursement, correcting a receipt,
renumbering a loan account.

The distinction matters at scale because the two scale differently. An approval chain gets longer as
a book grows. Maker-checker does not get longer; it gets harder to staff, because a sole authoriser
at a small branch must not be dead-ended by a control that requires a second pair of eyes nobody is
there to provide. That is a configuration decision, and it should be a conscious one rather than a
consequence of how many people happened to be given a role.

## The roll-up, and tracing it back

Every management figure on a multi-branch book is an aggregate, and the only question that matters
about an aggregate is whether you can get back from it to the rows. Two things make that possible
and both are unglamorous:

- **The aggregate and the detail come from the same source.** A summary computed one way and a
  detail list computed another will disagree eventually, and the disagreement will be discovered by
  a board member rather than by a developer.
- **An "as on" date is an input, not the clock.** A branch comparison for 30 September has to return
  the same numbers in October that it returned on the day, which means the position has to be
  readable for a past date rather than recomputed from today's balances.

## What a system has to do, and what it must not pretend to do

| Need | What good software does | What it must not pretend to do |
|---|---|---|
| Data scope | Apply it in the query, so an out-of-scope row cannot be returned by any route | Hide rows in the interface and call it access control |
| Region | Treat it as a label on a branch, so one hierarchy exists | Keep a second mapping of branches to regions, which goes stale on the first reorganisation |
| Approval chain | Resolve it from product, scheme, branch or region, amount slab and deviation level together | Model it as a role per threshold |
| Maker-checker | Make it configurable per action, so a branch with one authoriser is not dead-ended | Apply one rule everywhere and leave somebody unable to work |
| Roll-ups | Compute summary and detail from one source, for an "as on" date supplied by the caller | Recompute history from today's balances |
| Branch performance | Report what happened | Rank branch managers. A collections figure is a function of the book a branch was given, not only of how it was worked |
| Organisation design | Nothing | Tell you how to structure your branches. The software should express the structure you have, not require a particular one |

## Frequently asked questions

### Can a user be scoped to more than one branch without being scoped to the whole region?

That is what a scope expressed against branch records is for — the question is whose branches, not
how many. Where the answer genuinely is "these three and no others", it should be expressible without
inventing a region that exists only to hold them.

### Does every disbursement need head-office approval?

Only if the matrix says so. The point of having product, scheme, branch, slab and deviation in the
chain is that routine files resolve locally and unusual ones do not, without anybody maintaining two
parallel sets of rules.

### What happens when a branch closes or merges?

The branch record and its loans stay, because the history belongs to the loans and not to the
office. What changes is scope and the approval chain. A system that deletes a branch has made every
figure that branch ever contributed to unexplainable.

### Where does Lenviq stand on this?

Branches are records with a region label, and user scope is expressed against them and applied in
the query path rather than in the interface; the tenancy boundary beneath it is not configurable and
no query path crosses it. The approval matrix resolves from product, scheme, branch or region, amount
slab and deviation level in combination. Maker-checker is separate from the matrix and configurable
per action, so a sole authoriser is not dead-ended. Reports take an "as on" date as an input and
carry branch and region filters. What the platform does not do is tell you how to organise — and
there is no branch-manager ranking in it, deliberately.
