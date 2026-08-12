---
title: "How long an NBFC must keep its books, and what that implies for system design"
description: "Retention under the Companies Act, what it means for a lending system's data model, and why soft delete is not a design preference."
date: "2026-08-10"
category: "Regulatory"
author: "FastLegal Technologies"
draft: false
---

Eight financial years, plus longer if an investigation is ordered — and for a lending company the
records in scope are wider than the ledger. That combination is what makes retention a system design
question rather than a storage policy.

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

## Retention runs on the books, not on the loan

This is the distinction that catches system designers.

A loan closed in year one is done as far as operations are concerned. Its entries, however, are in
that year's books, and those books are retained for eight financial years like any other. An archival
policy keyed to "closed loans older than N years" is measuring the wrong thing.

The same applies to a rejected application, a reversed receipt and a deleted-looking record: if it
produced an entry, the entry and its voucher are in scope.

## What has to survive, and in what form

| Requirement | Design consequence |
|---|---|
| Retrievable for eight years | Nothing regulatory hard-deleted |
| Legible for eight years | Formats that will still open; not a proprietary blob |
| The voucher behind each entry | Receipts, disbursements, charge authorities kept with the ledger |
| Positions as filed | Stored day-end snapshots, not recomputation |
| The audit trail | Retained with the records it describes |
| Back-ups to the same standard | The back-up is not a lesser copy |

## Common mistakes

- **Archiving by loan closure date.** Retention runs on the books.
- **Dropping the audit trail on archival.** Keeps the figure, loses the explanation.
- **Storing documents only as a rendering path.** If regenerating uses today's masters, the archive
  is not the document that was issued.
- **A back-up policy shorter than the retention period.** The back-up is held to the same standard.
- **No test of the archive.** Eight years is long enough for a format or a key to become unreadable,
  and the time to discover that is not during an inspection.

## Frequently asked questions

### How long must an NBFC retain its books?

Not less than eight financial years immediately preceding the current one, and longer where an
investigation has been ordered. For a company younger than eight years, for all of its existence.

### Does the eight-year period apply to electronic records too?

Yes, and the back-up is held to the same standard. Electronic form does not shorten the period; it
changes what has to be true about accessibility and legibility over it.

### Are loan documents part of the books?

The vouchers relevant to entries are, which for a lender reaches receipts, disbursement records and
the authorities behind charges. Loan agreements and security documents are retained under their own
requirements, generally for longer where an enforceable security interest exists.

### Can records be deleted after a borrower requests erasure?

Not where retention is required by law. Data protection obligations are subject to statutory
retention, so the answer to a borrower's erasure request in respect of regulated records is that the
records are retained and used only for the purposes that require them.

### What should be tested about an archive?

That it can be read. Restore something from the oldest period held, open it, and check that the audit
trail came with it. An archive nobody has ever read is an assumption.

---

**Related reading:** [What must be kept in the books](/blog/books-of-account-what-must-be-kept/) ·
[What counts as an audit trail](/blog/audit-trail-what-counts/) ·
[How to generate RBI returns](/blog/how-to-generate-rbi-returns-nbfc/) ·
[RBI compliance for NBFCs](/blog/rbi-compliance-for-nbfcs-guide/)

[Ask for a walk-through](/contact/) — ask to see a document as it was issued, not as it would be
generated today.
