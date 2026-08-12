---
title: "How to automate loan origination in an NBFC without losing the credit decision"
description: "What to automate between lead and disbursement — deduplication, KYC, bureau, eligibility, the approval matrix, documentation — and what must remain a judgement. The stages, the controls, and where automation quietly removes a check nobody meant to remove."
date: "2026-08-12"
category: "How-to"
author: "FastLegal Technologies"
draft: false
---

Automate the **gathering, checking and routing** in loan origination; keep the **credit decision** a
judgement made by a person with authority to make it. Everything between a lead and a disbursement is
either evidence collection, a rule that can be stated, or a decision — and the productivity comes
from making the first two automatic so the third gets the attention.

## What are the stages, and what can be automated in each?

| Stage | Automate | Keep human |
|---|---|---|
| Lead | Capture, dedupe against existing customers, assignment | Qualification conversation |
| Party & KYC | OVD checks, PAN, CKYC pull, address validation | Judgement on a document that looks wrong |
| Bureau | Pull, parse, obligation extraction | Reading the report |
| Eligibility | FOIR, LTV, exposure and policy checks | Whether a deviation is acceptable |
| Appraisal | Income computation, ratio derivation | The assessment |
| Approval | Routing by the matrix, escalation on deviation | The approval itself |
| Documentation | Generation from sanctioned terms, checklist, e-sign | Verification of what was executed |
| Disbursement | Beneficiary validation, maker-checker, posting | Release authorisation |

The pattern: automation removes the typing and the routing, not the deciding.

## Where does automation quietly remove a check?

This is the failure worth designing against, because it does not look like a failure.

**Deduplication that only runs on exact matches.** A borrower already on the book, entered with a
slightly different name spelling, becomes a second customer with a second exposure — and the
concentration limit that would have caught it never fires. Dedupe should be fuzzy across PAN, mobile
and date of birth, and it should run at the lead stage, before anyone has typed a full file.

**A checklist that can be ticked without the document.** If the checklist is a set of boolean fields
rather than a set of uploaded and verified documents, it becomes a formality. The gate should be the
document's existence and its verification status, not a tick.

**Auto-approval inside limits.** Defensible for small-ticket, high-volume lending, and a hole
otherwise. The question to ask is what happens to an application that is *just* inside every limit —
because that is the shape of a file constructed to fit.

**A deviation that routes to the same person who raised it.** The matrix has to route upward, and it
has to be impossible to approve your own deviation.

**Verification recorded as "API" when no API exists.** If a system lets an operator mark a document
electronically verified whether or not an integration is configured, the KYC file records a check
that no system ever ran.

## What has to be true of the approval matrix?

- **It routes by the facts of the file**, not by who is available: amount, product, deviation
  severity, borrower category.
- **It escalates on deviation**, and the deviation is recorded with the reason and the approver.
- **Maker and checker are different people**, enforced rather than expected.
- **The matrix in force at sanction is recorded**, so a later change to it does not make a past
  approval look wrong or right.

## What about documentation?

Two rules carry most of the value.

**Generate from the sanctioned terms, never from a template somebody edits.** The agreement, the Key
Facts Statement and the schedule must all be produced from the same snapshotted terms, so they cannot
contradict each other. A KFS with a typed APR beside a computed schedule is the standard example.

**The document set follows the file, not a folder convention.** A guarantor on the application means
a guarantee deed in the set; property security means the mortgage instruments. Where the set is
chosen by hand, it is chosen wrongly at some point, and the missing instrument is discovered when it
is needed.

## Common mistakes

- **Exact-match deduplication.** Creates second customers and defeats concentration limits.
- **A boolean checklist.** Ticked without the document.
- **Auto-approval with no review of near-limit files.** The shape of a constructed application.
- **Self-approved deviations.** The matrix must route upward.
- **Documents from templates rather than from terms.** They will contradict each other.
- **KYC verification mode as a free choice.** Records a check nobody performed.
- **Sanction terms that read a live master.** They change under loans already made.
- **No record of which matrix version approved a file.** Later changes make past decisions
  unexplainable.

## A worked example

An NBFC automates its gold loan origination to reduce turnaround from two hours to twenty minutes.
Six months later the audit finds four accounts where the pledgor was already a borrower and the
combined exposure exceeded the single-borrower limit.

The cause was not the automation of the valuation or the documentation. It was that dedupe matched on
PAN only, and three of the four had been entered without a PAN because a gold loan under the
threshold did not require one. The fourth had a PAN entered with a transposed character.

The fix was not to slow the process down. It was to dedupe on mobile and date of birth as well as
PAN, at lead capture, and to surface a possible match to the operator rather than blocking — the
operator then had ten seconds of work instead of the audit having four accounts.

## How Lenviq handles this

Origination runs lead → party → application, in that order, because an application is built from a
party and the party is what carries KYC, exposure and history. A lead cannot convert until a party is
linked, and the party form opens pre-filled from the lead's own details so nothing is typed twice.
Fuzzy deduplication on PAN, mobile and date of birth runs at the lead stage and offers matches rather
than blocking.

Documents are generated from the terms snapshotted onto the loan, and the applicable set is derived
from the file — a guarantor produces a guarantee deed, gold security produces a pledge
acknowledgment. The approval matrix routes by amount, product and deviation, with maker-checker on
disbursement enforced in the engine. KYC verification mode offers an electronic option only where a
live integration can actually perform the check, and the server refuses it otherwise.

## Frequently asked questions

### What parts of loan origination should not be automated?

The credit decision, the acceptance of a deviation, and the verification of a document that looks
wrong. Automation should present a complete, checked file to a person with authority — it should not
replace the person.

### How much of KYC can be automated?

The retrieval and the checking: CKYC pull, PAN validation, bank account verification, address
validation against the pincode master, and video KYC where used. What cannot be automated is the
judgement when something does not reconcile, and a system that records "verified" for a check no
integration performed is worse than one that records nothing.

### Does automating origination speed up disbursement?

Usually, but the constraint is often not the system. Turnaround is typically lost waiting for a
document, a valuation or an approver — so the largest gains come from making the gate visible (what
exactly is this file waiting for, and with whom) rather than from making a form faster to fill.

### What is a deviation, and how should it be handled?

An approved departure from credit policy — an FOIR above the norm, an LTV above the standard cap, a
missing document accepted with a condition. It should be recorded as such, with the reason, routed
upward in the approval matrix, and reportable, because the deviation rate is one of the earliest
indicators of a book about to deteriorate.

### Should small loans be auto-approved?

It is defensible for small-ticket, high-volume lending with a tight policy. The control that matters
is a review of files that sit just inside every limit, because that is the shape an application takes
when it has been constructed to pass rather than assessed to lend.

---

**Related reading:** [Loan management software for an NBFC](/blog/loan-management-software-for-nbfc/) ·
[The Key Facts Statement requirement](/blog/kfs-key-facts-statement-nbfc-requirement/) ·
[Terms are frozen at sanction](/blog/frozen-terms-at-sanction/) ·
[What lenders ask in due diligence](/blog/due-diligence-what-lenders-ask/)

[Ask for a demonstration](/contact/) of the origination flow against your own product mix.
