---
title: "SMA-0, 1 and 2 are not warnings — they are a reported position"
description: "The special mention buckets are derived from the same day-end DPD that drives classification, and they are reported. Getting the boundary wrong moves a number somebody else reads."
date: "2026-08-11"
category: "Regulatory"
author: "FastLegal Technologies"
draft: false
---

Special Mention Accounts sit between standard and non-performing, and lenders often treat them as an
internal early-warning flag. They are not internal. They are a classification, derived from the same
days-past-due the NPA test uses, and they travel — into supervisory reporting and, for large
exposures, into the CRILC submission.

## The buckets

- **SMA-0** — principal or interest overdue between 1 and 30 days.
- **SMA-1** — between 31 and 60 days.
- **SMA-2** — between 61 and 90 days.

Past 90, the account is non-performing.

## Day one, not day two

The boundary that gets implemented wrongly is the first one. An account is overdue from the **due
date itself** — the Reserve Bank's clarification of November 2021 has accounts flagged as overdue in
the day-end process of the due date. It does not begin the day after, and it does not begin after a
grace period.

That last point is where commercial practice leaks into classification. A lender may reasonably
decide not to *levy* a penal charge for the first few days. That is a pricing decision. If the same
setting also reduces the days-past-due figure, it has quietly moved SMA and NPA dates for the whole
book — and pushed them later, which is the direction nobody catches, because the numbers look
calmer.

Two settings, two names, and the classification one is always zero.

## Why the transitions matter more than the balances

An account that crosses from SMA-1 to SMA-2 has not changed in amount. What has changed is what the
lender is obliged to say about it. A system that recomputes the bucket nightly but keeps no record
of *when* the transition happened cannot answer the question an examiner actually asks: when did you
know, and what did the position look like on that date.

A transition log costs almost nothing to write and cannot be reconstructed afterwards from balances
alone.
