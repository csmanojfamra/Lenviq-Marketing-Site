---
title: "Reporting to the credit bureaus: the month is easy, the twenty-four months behind it are not"
description: "A credit information submission is not a snapshot. It carries a trailing run of monthly positions, and those cannot be read off a loan's current status because a status field has no date on it. Where the history comes from, and the two defects that file an honest borrower as delinquent."
metaDescription: "A bureau submission carries a trailing run of monthly positions, and a status field has no date. Where that history comes from, and how it goes wrong."
question: "How does an NBFC report a borrower's account to the credit bureaus each month?"
keyword: "credit bureau reporting software"
kind: artefact
author: "CA Tanmay Saini"
updated: "2026-10-13"
related: "credit-information-reporting-2025, irac-day-end-classification, npa-income-reversal-software-nbfc, sma-classification-what-it-signals, nbfc-compliance-calendar, write-off-what-it-does, due-diligence-what-lenders-ask, audit-trail-what-counts"
priority: 0.8
draft: true
---

A credit information submission is a file, sent monthly, carrying for each borrower account the
amount outstanding, the amount overdue, the days past due and the asset classification. The part
that is routinely underestimated is that it carries **history** — a trailing run of monthly
positions, not just this month's — and that history cannot be read off the loan's current record,
because a status field has no date attached to it.

So a lender has two different computations to get right. "How late is this account today" is one
engine reading live schedule rows. "How late was this account on 31 July" is a different question
with a different answer, rebuilt from the frozen schedule and the **dated receipts**. The first
decides the lender's own provisioning. The second decides a borrower's credit record for the next
seven years, which makes it the one worth more scrutiny and the one that usually gets less.

## What has to be right, and as at when

| The field | What it has to be as at | Why it goes wrong |
|---|---|---|
| **Days past due** | The day-end position of the reference date | Computed when the file was built, which is days or weeks later, so a borrower who cured in the gap is reported current for a month they were overdue |
| **Amount overdue and current balance** | The same position, consistently | Taken from today's balance beside a DPD taken from the reference date — two dates in one row |
| **Asset classification** | The classification the account actually carried then | Derived live from a rule that may since have been amended, which silently restates history |
| **Closures and settlements** | The period they happened in | The period somebody noticed, which is how a loan closed in March is reported open until June |
| **The trailing months** | Each month's own position | Reconstructed from the loan's status field, which carries no date and therefore cannot answer |

The last row is the whole of the difficulty. A row that reads `status = PAID` tells you the
instalment was eventually paid; it does not tell you whether it was paid on time, late, or two years
late. Only a dated receipt does.

## The two defects that file an honest borrower as delinquent

Both are real, both reach a credit bureau, and they push in opposite directions — which is why
neither is caught by a total that balances.

**Migrated receipts written without their split.** A historical reading sums each receipt's interest
and principal components. A migration that marks instalments paid without writing those two
components leaves them at zero, so the reconstruction sees a borrower who never paid a rupee, with
days past due climbing by one for every day since their first instalment. Every field looks right.
Today's figure is right. Twenty-four months of history are wrong, in a file the borrower will never
see, and
[a migration is where this is decided](/enterprise/migrating-a-live-book/).

**A reversal counted as a collection for ever.** A reversal is a dated counter-entry: the original
posting is never edited, so it keeps its posted status permanently. A historical reading that sums
posted receipts alone therefore counts returned money as collected from that date onward — holding
an account at ninety days, standard and reportable as such, when it was a hundred and twenty-one and
non-performing.

**A bounce is the opposite case and takes the opposite answer.** The instrument failed and no money
ever arrived, so the original receipt should leave the set at every date rather than be netted at
one. A system that treats a bounce and a reversal identically will be wrong about one of them.

## The cadence, and what it asks of the system

Credit information has to be reported monthly, and for NBFCs the framework has tightened over
successive amendments. What matters for the system is less the exact day than the consequence of the
cadence: **a monthly file means twelve chances a year to file something unexplainable**, and a
correction does not erase what was filed — it supersedes it, leaving both in the bureau's record.

So the useful properties are the dull ones:

- **The file is derived, never typed.** A field somebody can edit before submission is a field that
  will be edited.
- **The submission is a record**, with its own date, its own content and its own status, so "what did
  we tell them in July" has an answer that does not depend on recomputing July.
- **Rejections are kept with their reason**, because a rejected file is not a filed file and the
  difference matters to a supervisor.
- **A dispute can be answered from the system.** A borrower disputing an entry is asking what the
  lender reported and why; without the stored submission the lender is reconstructing its own
  evidence.

## This is not CKYC, and not CRILC

Three obligations that get run together and share almost nothing:

- **Credit information reporting** is about *conduct* — what each borrower owes and how late they
  are — filed monthly, carrying history.
- **The central KYC registry** is about *identity*, filed on onboarding and on change, carrying no
  conduct at all. [The two halves of that obligation](/solutions/ckyc-software-nbfc/) are a different
  page.
- **CRILC** is a return about *large exposures*, on its own threshold and cadence, and it carries the
  special mention status of those borrowers rather than every borrower's days past due.

A system that offers "bureau reporting" as one feature is describing one of these and leaving the
reader to guess which.

## What a system has to do, and what it must not pretend to do

| Need | What good software does | What it must not pretend to do |
|---|---|---|
| This month's figures | Take them from the day-end position of the reference date | Build the file from today's balances and label it with last month's date |
| The trailing months | Rebuild each month from the frozen schedule and the dated receipts | Read history off a status field, which has no date and cannot answer |
| Reversals | Net them at their own value date | Sum posted receipts alone, which counts returned money as collected for the rest of the loan's life |
| Bounces | Remove the receipt at every date — the money never arrived | Treat a bounce as a reversal |
| Migrated receipts | Write each one's interest and principal split | Mark instalments paid and leave the split empty |
| The submission | Keep it as a dated record with its status and any rejection reason | Generate, send, and keep nothing |
| Transmission | Be explicit about whether the system sends the file or prepares it | Call a generated file a filing |
| The borrower's score | Nothing | Influence it, predict it, or offer to improve it. A lender reports facts; the bureau computes |

## Frequently asked questions

### If a borrower's history is wrong in a past submission, can it be fixed?

A later submission can report the corrected position, and that is the mechanism. What it does not do
is remove the earlier filing — the bureau's record carries both, and a lender correcting two years of
history is explaining two years of filings rather than replacing them. Which is the argument for
getting the reconstruction right once.

### Does a written-off account stop being reported?

No, and this is a common and expensive assumption. A write-off is an accounting decision about the
lender's own books; the borrower's obligation and its reported status continue to exist, and
[what a write-off does and does not do](/blog/write-off-what-it-does/) is worth reading before
treating it as a closure.

### Why would today's days past due and the reported figure differ?

They should not, for the same date. They will differ if one is computed from live schedule rows and
the other from dated receipts and the two disagree — which is exactly the condition worth testing
for, because it means one of the two readings is wrong and nothing in a balanced total will reveal
which.

### Where does Lenviq stand on this?

There is one days-past-due engine for every product and a second reader that rebuilds a past month
from the frozen schedule and the dated receipts, and the two are checked against each other for the
same date rather than assumed to agree. Reversals are netted at their own value date and a bounce
removes the receipt at every date. Each migrated receipt is written with its own interest and
principal split — that was a real defect, found and fixed, and both defects described above are drawn
from it. Submissions are kept as dated records with their status, and a report lists them. What the
platform does **not** do is transmit: the file is generated and its status recorded, and sending it
is a step outside the system.
