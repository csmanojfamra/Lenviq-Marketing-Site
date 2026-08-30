---
title: Open a loan application
description: Turn a customer into a loan file, choose the scheme, and see what is blocking the next stage before you press anything.
section: Origination
order: 30
audience: Credit officer
---

An application is opened **for a customer**, from their own record or from the lead they came in on.

@shot applications | The applications list, showing each file's stage, product, amount and how long it has been where it is | Every file, and how long it has been sitting where it is.
@mark 47,19.2 | Filter by stage. This is the pipeline view a credit desk works from each morning.
@mark 60,29 | The scheme, by code and name. It decides the bounds, the caps and the approvals for this file.
@mark 84.5,29 | The stage the file is at, in the words the workflow uses.
@mark 88.5,46.8 | Forwarded for approval — above the slab, so it has routed to an approver rather than being sanctioned here.

## Choosing the scheme

The scheme decides the product's rules — its rate band, its approval slab, whether a field
investigation is required, whether a guarantor is. Pick it and the form applies its bounds
immediately: an amount outside the scheme's range is refused as you type, not at Save.

## The stage rail

Every file shows where it is and what the next step needs. The blockers are listed before you press
anything, so "cannot forward for approval" is never the first you hear of a missing document.

@shot application-stages | A loan application showing the workflow header with its stage, the approval status, and the amount and tenure | The next step, and what is blocking it, above everything else.
@mark 41.5,9.1 | Where the file is now. Every stage before it is dated and named.
@mark 82,17.2 | How long the file has taken end to end, and how many stages are done.
@mark 24,37.5 | The next step, what it does, and which role does it — before you press anything.
@mark 28,82.2 | Disbursement is maker-checker: the person who raises a tranche is never the one who releases it.

## What happens at sanction

The scheme's terms are **snapshotted** onto the sanction. A later change to the scheme cannot alter
a loan already sanctioned — the loan reads its own copy for the rest of its life.

## After the decision, the file is closed

Once the credit decision is made, the origination record becomes read-only for everybody. A sanction
has to evidence what was sanctioned; if something in it is wrong, raise a query and return the file
for rework, and the correction carries a reason.

@shot application-record | The application record page, showing parties, bureau, verification, assessment, collateral and appraisal as a read-only file | Past the decision the record has its own address, and nothing on it can be typed into.
@mark 34,11.7 | From Disbursed onwards the record is read-only. A sanction has to evidence what was sanctioned.
@mark 65,31.1 | Where a stage was passed without something it asks for, the record says so rather than hiding it. On this demonstration file several were.
@mark 35,49.9 | A stage that was completed with its artefacts reads like this instead.
