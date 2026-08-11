---
title: "How long an NBFC must keep its books, and what that implies for system design"
description: "Retention under the Companies Act, what it means for a lending system's data model, and why soft delete is not a design preference."
date: "2026-08-10"
category: "Regulatory"
author: "FastLegal Technologies"
draft: false
---

Section 128(5) of the Companies Act, 2013 requires a company to keep its books of account, together
with the vouchers relevant to any entry in them, in good order for **not less than eight financial
years** immediately preceding the current one — and, where an investigation has been ordered, for
such longer period as the Central Government may direct. Where the company has existed for less
than eight years, the period is all of them.

Where the books are kept electronically, the back-up is held to the same eight-year standard.

For a lending company that is a longer horizon than it first appears, because the books of account
are not only the general ledger.

## What "books and relevant vouchers" reaches

The vouchers behind a lending entry are the loan documents: the sanction, the agreement, the
disbursement authority, the receipts. An entry in the ledger that cannot be traced to what
authorised it is an entry that cannot be explained to an inspector, which is the practical test
rather than the statutory wording.

## What it implies for the system

**Regulatory records are never hard-deleted.** Not "we soft-delete by convention" — there should be
no code path that removes one. A row a system can delete is a row a bug can delete.

**Corrections are reversals.** An immutable posting plus a reversing entry preserves both what was
recorded and what it was changed to. An UPDATE destroys the first, and the audit question is
usually about the first.

**Historical positions have to be retained rather than recomputed.** Reconstructing a month-end
position from today's data assumes nothing about the past has changed — which is exactly the
assumption an audit is testing.

**The audit trail is part of the record.** Who changed what, when, and to what value. Append-only,
for the same reason as the postings.

## The other clock: PMLA

Retention under the Companies Act is one obligation among several, and the second one runs on a
different trigger. Under section 12 of the Prevention of Money-laundering Act, 2002 and the
Maintenance of Records rules made under it, a reporting entity holds:

- **transaction records** for five years **from the date of the transaction**; and
- **client identification records** — the identity of the client and the beneficial owner, the
  account files and the related business correspondence — for five years **from the end of the
  business relationship or the closure of the account, whichever is later**.

The second is the one that catches systems out. It is not five years from the loan; it is five
years from the end of the relationship, which for a borrower who returns every eighteen months
means the clock keeps restarting. A design that purges KYC on loan closure has purged it early.

The longest applicable period governs in practice, and the two do not run from the same event. A
system that implements one and not the other has implemented neither.

---

*Section 128(5) of the Companies Act, 2013 for the eight-year period; section 12 of the PMLA and
the Maintenance of Records rules for the five-year periods. The directions applicable to a specific
class of NBFC may impose more, and are not enumerated here.*
