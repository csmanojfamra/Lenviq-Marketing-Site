---
title: "The quarter, from a compliance officer's desk: twenty-one days and four things that must agree"
description: "The quarter ends and a clock starts. The returns you owe depend on your layer, the figures have to be as at the quarter end rather than as at today, the quarter has to stop moving once you have filed on it, and nothing counts as filed without an acknowledgement."
metaDescription: "The quarter ends and a clock starts. Which returns you owe, as at which date, and why a filing without an acknowledgement is not evidence."
question: "What does a compliance officer at an NBFC have to produce each quarter?"
keyword: "NBFC compliance officer software"
kind: persona
author: "CS Manoj Famra"
updated: "2026-10-13"
related: "/solutions/rbi-returns-software-nbfc/|RBI supervisory returns, nbfc-compliance-calendar, cic-reporting-software-nbfc, provisioning-software-nbfc, nbfc-category-and-layer, audit-trail-what-counts, /compliance/|Compliance positions and their citations, books-of-account-what-must-be-kept"
priority: 0.7
draft: true
---

The quarter ends and a clock starts. Twenty-one days to file, and most of that time is not spent
filing — it is spent getting four things to agree: the loan book, the general ledger, the
classification, and the figures you are about to put a name to.

The returns themselves are the easy part. What makes a quarter difficult is that each of those four
is maintained by a different process, and a difference between any two of them is yours to explain.

## What you owe depends on your layer, and a wrong calendar is worse than none

A circulating calendar that lists every DNBS return for every NBFC is wrong twice. It schedules a
return you do not file, and by looking complete it hides the ones you do.

The annex to the Filing of Supervisory Returns Directions, 2024 names the filer for each return
precisely — DNBS02 is for Base Layer NBFCs excluding peer-to-peer platforms, and a Middle or Upper
Layer NBFC files DNBS01 and DNBS03 instead. So the first thing to check is not the calendar. It is
[which layer the lender is actually in](/blog/nbfc-category-and-layer/), because the calendar is a
consequence of it.

The useful behaviour from a system is therefore to **name what it is skipping and why**, rather than
to show a tidy list. A row that is absent reads as "nothing due". A row that says *not applicable to
your layer, and the returns you do owe are not produced here* is the one that saves a quarter.

## The four things that have to agree, and who maintains each

| What | Maintained by | What a difference against the others means |
|---|---|---|
| **The loan book** | Operations, as receipts and disbursements are posted | Usually a value date entered on the wrong side of a month end |
| **The general ledger** | The same postings, into the chart of accounts | A reconciling item that is legitimate — an uncollected levy on the statement and not in income — or a genuine break |
| **The classification** | A scheduled day-end job, from days past due | A grace period applied to the wrong field, which moves the whole book later at once |
| **The figures you sign** | You, from the three above, as at the quarter end | That one of them was read as at today |

The last row is the one worth building the quarter around: three of those four can be read for a past
date if the system was built to, and the fourth is only as good as the three.

## As at the quarter end, not as at today

A return filed on the 18th carrying the 18th's numbers is a return filed wrong on time, and it is the
commonest avoidable error in the whole exercise.

Every figure has to be a position **as at the quarter-end date**, which means the system has to be
able to answer about a past date rather than recompute from today's balances. Three things follow:

- **The classification has to be the one each account carried then**, not the one a current rule
  returns. A rule amended since gives a different answer and silently restates the quarter.
- **The provision has to be the one computed then**, against the valuation that was current then.
- **Closures have to land in the period they happened in**, not the period somebody noticed.

## Then the quarter has to stop moving

Once you have filed on a set of numbers, those numbers are what was reported. A posting into that
quarter afterwards makes the filing unexplainable — not wrong exactly, but no longer reproducible,
which is the same thing in an inspection.

Locking the quarter is what prevents it, and the discipline it imposes is real: it means the quarter
has to be *right* before it is closed rather than closed and tidied later. A system that offers an
edit into a reported period has handed somebody the ability to change a figure that is already
outside the building.

## Nothing is filed without an acknowledgement

This is the smallest requirement and the one that decides whether a quarter can be evidenced at all.

A return marked submitted with no acknowledgement reference is a note that somebody believes they
filed something. In an inspection it is worth nothing, and the person who would remember has usually
moved on. The reference and the submission date belong to the record, and a system that lets
"submitted" be ticked without them has made its own compliance file useless at the one moment it
matters.

## The monthly obligation that is not a return

Worth separating, because the two get planned as one and share nothing:

- **The supervisory returns** are about the *lender* — quarterly, on a deadline from the quarter
  end, filed by you.
- **Credit information reporting** is about *borrowers* — monthly, carrying a trailing run of each
  account's history, and
  [a materially harder computation than it looks](/solutions/cic-reporting-software-nbfc/) because
  a status field has no date on it.

A quarter that goes well and twelve monthly submissions that quietly misreport two years of a
borrower's conduct is not a compliant year.

## What the software does not do for you

- **It does not certify your figures.** A return is produced from the lender's books and signed by
  the lender. No system can take that on and none should offer to.
- **It does not transmit.** The return is produced in the regulator's form; sending it is a step
  outside the system, and a generated file is not a filing.
- **It does not tell you your layer.** That follows from asset size and activity, it is a
  determination the lender makes, and the system records it. Record it wrongly and every calendar
  after it is wrong in the quiet direction.
- **It does not judge whether your provisioning is adequate.** It computes the regulatory minimum
  from rules and recorded values. Whether a security will fetch what the valuation says is a
  judgement you sign.

## Frequently asked questions

### What if the figures change after we have filed?

A revision is a new filing with its own reference, and the original stays part of the record. Which
is the argument for locking: a revision explains itself, whereas a quarter whose numbers moved after
filing cannot be explained at all.

### Do the returns come from the loan book or the accounts?

Both, which is the difficulty. A return asks for figures on **its own** basis and that basis maps
cleanly onto neither — the mapping is where errors live. What makes the position defensible is being
able to show which accounts a figure came from, not just the figure.

### How do I evidence a quarter two years later?

From what was stored at the time: the return as filed, its acknowledgement reference and submission
date, the locked financials it was built from, and the classification each account carried then. Any
of those recomputed rather than stored is evidence of today's rules, not of that quarter.

### Is the audit trail enough on its own?

For who did what, yes. For what the figure *was*, no — a trail of changes is not the same as a stored
position, and reconstructing a quarter from a change log is an exercise nobody wants to begin during
an inspection.

### Where does Lenviq stand on this?

The returns calendar is generated per quarter with the due date derived as quarter end plus
twenty-one days, and it is layer-aware: DNBS-2 is scheduled only for a Base Layer tenant, and where
it does not apply both facts are stated — that it is not applicable, and that DNBS01 and DNBS03 are
**not produced by this product**. DNBS-2 comes out in the regulator's own form; CRILC and the
priority-sector statement are produced. Quarterly financials can be locked, and marking a return
submitted requires the acknowledgement reference — the system refuses it otherwise. Reports take an
as-at date as an input, and the classification history is kept rather than re-derived. What it does
not do is transmit the return, certify the figures, or decide your layer.
