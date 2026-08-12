---
title: "Credit reporting moved to a fortnight, and then moved again"
description: "The Credit Information Reporting Directions, 2025 set a fortnightly cycle. For NBFCs an amendment goes further from July 2026 — four reference dates a month plus a full file."
date: "2026-08-11"
category: "Reporting"
author: "FastLegal Technologies"
draft: false
---

Credit information is reported **fortnightly** — as at the 15th and the last day of each month,
submitted within seven calendar days of the reference date. For NBFCs specifically it tightens again
from 1 July 2026 to **four fixed reference dates a month** with a full-file submission by the 5th of
the following month. The operational consequence is not more work per cycle; it is far less room to
repair a cycle by hand before it goes out.

The Master Direction — [Reserve Bank of India (Credit Information Reporting) Directions,
2025](https://www.rbi.org.in/Scripts/BS_ViewMasDirections.aspx), dated 6 January 2025, consolidated
credit reporting under section 11 of the Credit Information Companies (Regulation) Act, 2005 into one
instrument covering banks, financial institutions and NBFCs alike.

## The cycle

Credit information is updated **fortnightly** — on the 15th and on the last day of each month — and
submitted to the credit information companies **within seven calendar days** of the reference date.

Monthly reporting had a slack the fortnightly cycle removes. A borrower who cleared arrears on the
2nd could previously wait most of a month for the bureaus to know. Under a fortnightly cycle the
same borrower waits a fortnight at most, and the lender's window to produce a clean file halves.

## And for NBFCs specifically, it tightens again

The Non-Banking Financial Companies — Credit Information Reporting (Amendment) Directions, 2025,
effective **1 July 2026**, move NBFCs to **four fixed reference dates each month** — the 9th, 16th,
23rd and the last day — with a **full-file submission by the 5th** of the following month.

Four cycles a month is a different operational shape from two. It is not more work per cycle; it is
less room for a cycle to be repaired by hand before it goes out.

## What that asks of a loan system

The reporting file is derived, not typed. What it derives from has to be right on the reference date
itself:

- **DPD as at the day-end position of the reference date**, not as at whenever the file was built.
- **Amount overdue and current balance** consistent with that same position.
- **Closures and settlements reflected in the period they happened**, not the period they were
  noticed.

The practical test is whether a file for a past reference date can be regenerated today and come out
identical. If it cannot, the file was a snapshot of a moving system rather than of a stated
position — and the difference surfaces as disputes, one borrower at a time.

## Why does the cadence change what the system must do?

A monthly cycle can be survived with a manual file. Four cycles a month cannot — there is no week in
which nothing is due, and a correction made after submission has to be carried into the next file
rather than fixed in place.

That pushes three requirements from "desirable" to "necessary":

**The day-end position must be stored.** The file reports DPD as at the reference date. If the
position is recomputed when the file is built — two days later, on a book that has moved — the
figures reported are not the figures as at the date claimed.

**Data quality has to be enforced at capture.** A missing PAN or a malformed address rejected by the
bureau is a rejection you have days, not weeks, to resolve. The place to catch it is the party
record, at the point somebody types it.

**Corrections have to be traceable.** When a borrower disputes a report, you need to say what was
submitted, on what date, and from what position — not regenerate today's answer and hope it matches.

## What does a borrower dispute look like operationally?

A borrower says their credit report shows a default they do not recognise. Three things have to be
producible:

1. **What was submitted, and when.** The file as sent, not a reconstruction.
2. **The account position as at that reference date.** From the stored day-end position.
3. **The due events behind the DPD.** Which instalment was unpaid, and from when.

If the answer to any of those is "we would have to re-run it", the dispute is being answered from
today's data about a claim made months ago.

Under the Credit Information Reporting Directions the lender also carries obligations on the dispute
itself — acknowledging it, resolving it within the prescribed period, and compensating the borrower
where resolution is delayed beyond it. That turns file accuracy from a reporting hygiene question
into a cost.

## Common mistakes

- **Building the file from the live book.** Reports today's DPD as at a past date.
- **Data quality checked at submission.** Too late in a fortnightly cycle, and far too late in a
  four-cycle month.
- **No record of what was submitted.** Nothing to answer a dispute with.
- **Reporting a classification that a screen can override.** The bureau file and the ledger then
  disagree about the same account.
- **Treating the amendment date as distant.** Four reference dates a month is an operating change,
  not a configuration change.
- **Closing an account without reporting the closure.** A settled loan still showing outstanding is
  the commonest dispute of all.

## Frequently asked questions

### How often must an NBFC report to credit bureaus?

Fortnightly under the 2025 Directions — as at the 15th and the last day of each month, submitted
within seven calendar days. From 1 July 2026 NBFCs move to four fixed reference dates a month, with a
full-file submission by the 5th of the following month.

### What happens if a submission is rejected by the bureau?

It has to be corrected and resubmitted within the cycle, which is why data quality belongs at capture
rather than at submission. In a fortnightly cadence the window to fix a rejection by hand is days.

### How should a borrower's dispute about a credit report be handled?

By producing what was actually submitted and the account position as at that reference date, rather
than regenerating today's figures. The Directions also impose timelines on resolution and
compensation for delay, so the record has to be retrievable quickly.

### Does a closed loan need to be reported?

Yes, and failing to report the closure is one of the most common causes of a dispute — a borrower
whose loan was settled months ago still shows an outstanding balance. Closure is a reportable event,
not the absence of one.

### Where should the DPD in a bureau file come from?

From the stored day-end position as at the reference date, which is the same figure the
classification and the statement read. A separate computation for the file is a second engine, and it
will eventually disagree with the account it describes.

---

**Related reading:** [How to generate RBI returns](/blog/how-to-generate-rbi-returns-nbfc/) ·
[Classification is a day-end event](/blog/irac-day-end-classification/) ·
[Day-end is a business date](/blog/day-end-not-real-time/) ·
[SMA-0, 1 and 2](/blog/sma-classification-what-it-signals/)

[Ask for a walk-through](/contact/) — ask what was submitted on a past reference date.
