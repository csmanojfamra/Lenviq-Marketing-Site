---
title: "A loan should carry its own terms, not a pointer to them"
description: "Product masters change. Loans sanctioned under the old terms must keep them, and the only reliable way is to freeze a copy at sanction rather than read the live master."
date: "2026-08-11"
category: "Engineering"
author: "FastLegal Technologies"
draft: false
---

Every lending system has a product or scheme master: rate, tenure, charges, penal configuration,
prepayment rules. Every lending system also edits it — rates move, charges are revised, a new
regulation changes a default.

The question is what happens to loans already sanctioned under the previous version.

## Reading the master is the wrong answer

If a loan stores a scheme identifier and reads the live master whenever it needs a term, then editing
the master changes loans already on the book. Not their rate necessarily — the rate is usually
copied — but the parts nobody thought to copy: the penal calculation basis, the prepayment
permission, the appropriation order, the grace period.

The effect is silent. No screen looks wrong. A loan sanctioned in March starts being serviced under
terms agreed in September, and the sanction letter in the borrower's file no longer describes the
loan the system is running.

## Versioning the master is not enough on its own

Making the scheme immutable once active and forking a new version on edit is a real improvement — it
means the old terms still exist. But a loan pointing at "scheme X version 2" is still resolving
through a table, and the resolution is only as good as the discipline that maintains it.

## Freeze a snapshot at sanction

At the moment terms are agreed, copy them onto the loan: rate, tenure, charges as computed, penal
configuration, prepayment and foreclosure rules, appropriation order. From then on, servicing reads
the snapshot and nothing else.

Two properties follow, and both matter more than they sound.

**The loan can answer for itself.** Years later, with the scheme long since retired, the loan still
carries the terms it was sanctioned on — which is what a borrower dispute, an audit and a bureau
correction all need.

**A missing term becomes visible instead of defaulting.** A reader that resolves an absent key to a
sensible default will run happily forever on terms nobody chose. If the snapshot is the only source,
an omission is a gap in the snapshot — findable by comparing what the servicing code reads against
what sanction writes.

That comparison is worth automating. Every key the servicing engine reads should be a key the
sanction process writes, and anything else is a term the product offers and the engine cannot see.
