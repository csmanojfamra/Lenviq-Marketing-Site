---
title: "RBI supervisory returns: which ones you owe depends on your layer, and most calendars get that wrong"
description: "A returns calendar that lists every DNBS return for every NBFC is wrong twice over — it schedules a return you do not file and hides the ones you do. Which return follows from which layer, where the twenty-one days run from, and why a filing without an acknowledgement reference is not evidence."
metaDescription: "Which DNBS return you owe follows from your layer. Where the 21 days run from, and why a filing without an acknowledgement is not evidence."
question: "Which RBI returns does an NBFC have to file, and by when?"
kind: artefact
author: "CS Manoj Famra"
updated: "2026-10-13"
related: "how-to-generate-rbi-returns-nbfc, nbfc-category-and-layer, scale-based-regulation-layers, cic-reporting-software-nbfc, books-of-account-what-must-be-kept, provisioning-software-nbfc, audit-trail-what-counts, /compliance/|Compliance positions and their citations"
priority: 0.8
draft: true
---

A supervisory return is a quarterly statement of a lender's own position, filed to a deadline that
runs from the quarter end. Two things about the obligation are routinely got wrong, and a circulating
calendar usually gets both.

**Which returns you owe follows from your layer.** A calendar that lists every DNBS return for every
NBFC is wrong in both directions at once: it schedules a return you do not file, and by looking
complete it hides the ones you do.

**The clock runs from the quarter end, not from when the books closed.** Twenty-one days is not long,
and a lender whose accounts are not ready by day fourteen is not going to file on time by working
harder on day twenty.

## The layer decides the return

Annex III to the Master Direction – Reserve Bank of India (Filing of Supervisory Returns)
Directions, 2024 names the filer for each return precisely. For the one most Base Layer NBFCs are
concerned with:

> DNBS02 — Important Financial Parameters (NBFCs – BL) | Quarterly | 31st March / 30th June /
> 30th September / 31st December | NBFCs in Base Layer [except Peer-to-Peer Lending platform
> Companies (NBFC – P2Ps)]

Read it as a specification rather than a heading. **A Middle or Upper Layer NBFC does not file
DNBS02.** It files DNBS01 and DNBS03 instead. So a system that schedules DNBS-2 for every tenant has
given a Middle Layer lender an obligation it does not have, while saying nothing about the two it
does — and the compliance officer has no way to tell from an absence.

The honest behaviour is to **name the skip**: this return is not applicable to you, *and* the returns
you do owe are not produced here. Dropping the row silently reads as "nothing is due", which is true
of that return and misleading about the quarter.

[Which layer a lender is in](/blog/nbfc-category-and-layer/) is therefore not a classification
exercise for a board paper. It decides the filing calendar.

## Twenty-one days, from the quarter end

The quarterly timeline is twenty-one days from the quarter-end date. Four consequences a system can
act on and a spreadsheet cannot:

- **The due date is derived, not typed.** Quarter end plus twenty-one days, computed, so a calendar
  cannot drift.
- **The figures have to be as at the quarter end**, which means a position readable for a past date
  rather than recomputed from today's balances. A return filed on the 18th carrying the 18th's
  numbers is a return filed wrong on time.
- **The quarter's figures have to stop moving.** Once a return is filed on a set of numbers, those
  numbers are what was reported; a later posting into that quarter makes the filing unexplainable.
  Locking the quarter is what prevents it.
- **The deadline is the same for everyone**, which means the whole sector's accounts teams are busy
  in the same three weeks, and a lender relying on an external accountant is queuing.

## A filing is not filed until it has an acknowledgement

This is the smallest requirement on the page and the one that decides whether a quarter can be
evidenced.

A return marked submitted with no acknowledgement reference is a note that somebody believes they
filed something. It is not evidence, it cannot be produced in an inspection, and the person who
would remember has usually left. So the reference is **required** rather than optional — a system
that lets "submitted" be ticked without one has made its own compliance record worthless at exactly
the moment it is needed.

The same applies to the date. "Submitted" with no submission date cannot be checked against a
deadline, which is the only question anybody will ask about it.

## The returns are not the same thing as bureau reporting

Two obligations that both involve sending files to an institution and share nothing else:

- **Supervisory returns** are about the *lender* — its financial parameters, its exposures, its
  priority-sector achievement. Quarterly, to a deadline from the quarter end, filed by the lender.
- **Credit information reporting** is about *borrowers* — each account's position and days past due,
  monthly, carrying a trailing run of history.
  [That is a materially harder computation](/solutions/cic-reporting-software-nbfc/) and a completely
  different file.

**CRILC** sits between them and is the one that gets miscategorised: it is a supervisory return about
large exposures, on its own threshold, and it carries the special mention status of those borrowers
rather than every borrower's days past due.

## What a system has to do, and what it must not pretend to do

| Need | What good software does | What it must not pretend to do |
|---|---|---|
| Which returns | Schedule from the lender's layer, and name what is skipped and why | List every DNBS return for every NBFC |
| Unproduced returns | Say which obligations exist and are not generated here | Imply completeness by omission |
| The due date | Derive it from the quarter end | Let it be typed, so a calendar drifts |
| The figures | Read a position as at the quarter end | Recompute from today's balances and label it with the quarter |
| The quarter | Lock it once filed | Accept a posting into a quarter already reported |
| The acknowledgement | Require the reference before a return may be marked submitted | Allow a tick with nothing behind it |
| The form | Produce the return in the shape the regulator asks for | Produce a spreadsheet of the right numbers in the wrong form |
| Filing | Be explicit about whether the system submits or prepares | Call a generated return a filing |
| Whether your figures are right | Nothing | Certify them. A return is produced from the lender's own books and signed by the lender |

## Frequently asked questions

### What happens if the layer is recorded wrongly?

The calendar is wrong for every quarter until it is corrected, in the quiet direction — a lender
recorded as Base Layer when it is Middle gets a DNBS-2 obligation it does not have and no prompt for
the ones it does. Which makes the layer field one worth checking before the calendar is trusted.

### Can a filed return be revised?

The practical answer is that a revision is a new filing with its own reference, and the original
remains part of the record. Which is the argument for locking the quarter: a revision explains
itself, whereas a quarter whose figures moved after filing cannot be explained at all.

### Do the returns come from the loan book or from the accounts?

From both, and that is the difficulty. A return asks for figures on **its own** basis, which maps
cleanly onto neither the loan book nor the chart of accounts, and the mapping is where errors live.
A system that can produce the figure and show which accounts it came from is answerable; one that
produces the figure alone is not.

### Is the twenty-one day timeline the same for every return?

No — the cadence and the deadline are stated per return in the Directions' own annex, which is the
document to read rather than a summary of it, including this one. The quarterly returns a Base Layer
NBFC is most concerned with run on the twenty-one day timeline.

### Where does Lenviq stand on this?

The returns calendar is generated per quarter, with the due date derived as quarter end plus
twenty-one days, and it is **layer-aware**: DNBS-2 is scheduled only for a Base Layer tenant, and
where it does not apply the skip is named rather than dropped — along with the fact that DNBS01 and
DNBS03, which a Middle or Upper Layer NBFC owes instead, are **not produced by this product**.
DNBS-2 itself is generated in the regulator's own form. CRILC and the priority-sector statement are
produced. Quarterly financials can be locked, and marking a return submitted **requires** the
acknowledgement reference — a return recorded without one cannot be evidenced, so the system refuses
it. What the platform does not do is transmit the return or certify the figures: both are the
lender's.
