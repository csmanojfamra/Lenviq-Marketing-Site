---
title: Set up a loan product
description: Define a scheme — its rate band, its caps, its approval slab and what it requires — without anybody writing code.
section: Getting started
order: 20
audience: Product / Credit head
---

@shot schemes | The schemes list showing each product's version, status, amount and tenure range | Products are data. A new one is a scheme, not a release.

A product here is a **scheme**: an amount range, a tenure range, an interest method and rate band,
the caps that govern it (LTV, FOIR, DBR), the approval slab that routes it, and what a file on it
must carry — a field investigation, a guarantor, a legal opinion.

## Versioned, and frozen once live

A scheme is versioned and becomes immutable once ACTIVE. Changing a live product creates a new
version; loans already sanctioned keep the terms they were sanctioned on, because the sanction holds
its own snapshot.

That is what makes a mid-year pricing change safe: it applies to what is written after it, and to
nothing that was written before.

## Approvals route on the amount

@shot approvals-inbox | The approvals inbox showing files waiting for a decision, with the amount and who they are with | Who has it, for how long, and at what amount.

The approval matrix says who sanctions up to how much — and which amounts need no approver at all.
A file is routed by its own figures rather than by somebody choosing a name from a list.
