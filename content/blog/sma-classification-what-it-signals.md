---
title: "SMA-0, 1 and 2 are not warnings — they are a reported position"
description: "The special mention buckets are derived from the same day-end DPD that drives NPA classification, and they are reported to the regulator. What each bucket means, why the first boundary is day one, and why the transition dates matter more than the balances."
date: "2026-08-11"
category: "Regulatory"
author: "FastLegal Technologies"
draft: false
---

Special Mention Account buckets are a **reported classification**, not an internal early-warning
flag. SMA-0, SMA-1 and SMA-2 are derived from the same days-past-due figure that decides whether an
account is non-performing, and for large exposures they travel into the CRILC submission. A lender
who treats them as a dashboard colour is reporting a number they have not checked.

## What are the SMA buckets?

| Bucket | Overdue | What it means |
|---|---|---|
| SMA-0 | 1–30 days | Principal or interest overdue, no impairment |
| SMA-1 | 31–60 days | |
| SMA-2 | 61–90 days | The last stage before the account becomes non-performing |
| NPA | Over 90 days | Sub-standard, with the income and provisioning consequences that follow |

The buckets apply to term loans. For cash credit and overdraft facilities the trigger is different —
an account is SMA-1 or SMA-2 by reference to how long it has remained continuously **out of order**,
which is its own definition involving the drawing power and the credits in the account, not a simple
overdue count.

## Why is the first boundary day one, not day two?

Because an amount is overdue on the date it was not paid, and the Reserve Bank's clarification of
15 November 2021 on prudential norms has accounts flagged as overdue **in the day-end process of the
due date itself**.

So an instalment due on the 12th and unpaid is one day overdue at the end of the 12th, and the
account is SMA-0 that night. Not on the 13th. Not after a grace period.

That last point is where commercial practice leaks into classification. A lender may reasonably
decide not to *levy* a penal charge for the first few days of a default — that is a pricing decision,
and a common one. If the same setting also reduces the days-past-due figure, it has quietly moved SMA
and NPA dates for the entire book, and moved them **later**, which is the direction nobody catches
because the numbers look calmer.

Two settings, two names, two purposes. The classification one is always zero.

## What does SMA-2 oblige a lender to do?

For accounts above the CRILC threshold, SMA-2 status is reportable — and the reporting of default in
such accounts is on a weekly cycle rather than the quarterly CRILC return. The practical effect is
that the day an account crosses sixty days past due, a reporting obligation begins that did not exist
the day before.

This is why the boundary arithmetic is not a cosmetic question. An account misclassified as SMA-1
when it is SMA-2 is not a mis-coloured row on a dashboard; it is a reporting failure.

## Why do the transition dates matter more than the balances?

An account that crosses from SMA-1 to SMA-2 has not changed in amount. What has changed is what the
lender is obliged to say about it, and when it knew.

A system that recomputes the bucket nightly but keeps no record of **when** each transition happened
cannot answer the question an examiner actually asks: when did you know, and what did the position
look like on that date. Balances alone will not reconstruct it — an account that went SMA-0 → SMA-1 →
paid → SMA-0 again looks identical today to one that has never moved.

A transition log costs almost nothing to write and cannot be recovered afterwards.

## What should be true in the system?

- **One DPD.** The figure driving SMA is the figure driving NPA is the figure on the account screen.
  Where SMA is computed separately "for the dashboard", it will diverge.
- **Computed nightly, from due events.** Not on demand, and not from a balance.
- **No grace in the classification path.** Penal grace is a separate, clearly named setting.
- **A transition record.** Date in, date out, for every bucket.
- **The same treatment for every product.** A gold loan sixty-five days past its servicing date is
  SMA-2, exactly as a term loan is.

## Common mistakes

- **Treating SMA as internal.** It is reported, and for large exposures it is reported weekly at
  SMA-2.
- **Starting the count on day two.** Contrary to the 2021 clarification, and it shifts every
  downstream date.
- **One grace setting doing two jobs.** Penal grace must not touch classification.
- **Recomputing without recording.** No answer to "when did you know?"
- **A separate SMA calculation for reporting.** Two engines, and the divergence surfaces in a
  submission rather than on a screen.
- **Applying the term-loan buckets to an overdraft.** Out-of-order has its own definition.

## A worked example

An instalment of ₹1,33,273 falls due on 12 July and is not paid.

- **12 July, day-end** — DPD 1. The account is SMA-0.
- **11 August** — DPD 31. SMA-1. Nothing about the loan has changed except the date.
- **10 September** — DPD 61. SMA-2. If this borrower is above the CRILC threshold, weekly reporting of
  the default begins.
- **10 October** — DPD 91. The account is sub-standard. Accrued interest is reversed to suspense, and
  from this date interest is recognised only on receipt.
- **Late October** — the borrower pays one instalment. The DPD falls, and the bucket falls with it.
  The transition log now shows five movements, which is the account's actual history. The balance
  today shows one.

Now suppose the lender had configured a seven-day grace that reduced DPD. Every date above moves
seven days later, the CRILC obligation starts a week after it should have, and the NPA date — the
date from which income recognition changes — is wrong in the accounts.

## How Lenviq handles this

SMA staging is derived from the same day-end days-past-due that drives NPA classification, from the
same due events, on one engine that takes no per-product branch. Penal grace exists as its own
setting and cannot touch the classification path. Each classification movement is written to a log
with its date, so the position as at any past date is a record rather than a reconstruction, and the
watch list is a report over that record rather than a separate calculation.

The position and its citation are on the [compliance page](/compliance/).

## Frequently asked questions

### Is SMA classification reported to the RBI?

Yes. SMA status forms part of supervisory reporting, and for borrowers above the CRILC threshold the
default in an account classified SMA-2 is reported on a weekly cycle, separately from the quarterly
CRILC return. It is not an internal flag.

### Does SMA classification affect provisioning?

Not directly — SMA accounts remain standard assets, and standard-asset provisioning applies. What SMA
does is oblige reporting and signal the trajectory. The provisioning consequence arrives at ninety
days, when the account becomes non-performing.

### When does an account become SMA-0?

At the day-end of the due date on which an amount went unpaid, so one day overdue. The RBI's
November 2021 clarification puts the overdue flag in the day-end process for the due date itself,
which is what makes day one the first day rather than the second.

### Can a grace period delay SMA classification?

No. A grace period is a commercial decision about when to levy a penal charge. The date an amount
became overdue is fixed by the sanction, and SMA staging, NPA classification and bureau reporting all
run from that date.

### How are cash credit and overdraft accounts classified?

By reference to the account being continuously out of order rather than to a simple overdue count —
which involves the outstanding against the drawing power and the credits into the account over a
period. Applying the term-loan buckets to a running account will give the wrong answer.

---

**Related reading:** [Classification is a day-end event](/blog/irac-day-end-classification/) ·
[How to automate NPA classification](/blog/how-to-automate-npa-classification-nbfc/) ·
[Income reversal on NPA](/blog/npa-income-reversal/) ·
[RBI compliance for NBFCs](/blog/rbi-compliance-for-nbfcs-guide/)

[Ask for a walk-through](/contact/) if you want to see a transition log rather than a balance.
