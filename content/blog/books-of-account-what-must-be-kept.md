---
title: "Books of account: what has to exist, in what form, and for how long"
description: "The Companies Act sets the floor for every NBFC. Electronic records carry conditions that are easy to fail without noticing, and eight years is longer than most systems are designed for."
date: "2026-08-11"
category: "Compliance"
author: "FastLegal Technologies"
draft: false
---

An NBFC must keep its books of account and the vouchers relevant to every entry for **not less than
eight financial years**, in a form that can still be produced and read at the end of that period. For
a lender the books are not only the general ledger — they include the vouchers behind every posting,
which means loan events, receipts and the documents supporting them.

An NBFC's record-keeping obligations start with the Companies Act, 2013 and are added to by the
Reserve Bank's directions and by tax law. The Companies Act floor is the one that decides system
design, because it is the longest and the most specific about form.

## The floor

Books of account and relevant papers must be kept for **not less than eight financial years**
immediately preceding the current one — and where an investigation has been ordered, for as long as
the Registrar or the Central Government directs.

Eight years is longer than most software is designed to think about. It is longer than a typical
vendor contract, and considerably longer than a typical migration cycle.

## Electronic records carry conditions

Keeping books electronically is permitted, and the permission is conditional. The records must
remain **accessible in India** and usable for subsequent reference; they must be retained in the
format in which they were originally generated, sent or received, or in a format that presents the
information accurately; and there must be a proper system for **storage, retrieval, display or
printout** such that the records are not disposed of or rendered unusable.

Two of those conditions fail quietly.

**"In the format originally generated."** A ledger that is regenerated on demand from live master
data is not the record that was created — it is today's answer to yesterday's question. If a scheme
parameter has been edited since, the regenerated document differs from the one the borrower
received, and nothing in the system says so.

**"Not rendered unusable."** A record you can produce but cannot read without a version of software
that no longer runs is retained in name.

## What that argues for

**Immutability where the record is the event.** A sanction letter, a disbursement voucher, a receipt
— generated once, stored as generated, never re-rendered from current data.

**Snapshots, not references.** A loan that quotes its scheme by identifier is only as stable as the
scheme master. A loan carrying a frozen copy of the terms it was sanctioned on can still answer for
itself in year seven.

**Corrections as reversals.** An amended entry cannot be recovered; a reversal and a fresh entry
leave both facts on the record, which is what "relevant papers" means in practice.

## What counts as a book of account for a lender?

More than the ledger. The statutory phrase is books of account **together with the vouchers relevant
to any entry in them**, which for a lending business reaches:

| Record | Why it is in scope |
|---|---|
| General ledger and trial balance | The books proper |
| Loan account ledgers | The subsidiary book behind the loan asset |
| Receipts and their appropriation | The voucher behind every collection entry |
| Disbursement records | The voucher behind the asset |
| Charge levies, waivers and collections | Entries and the authority for them |
| Provisioning and write-off computations | Entries derived from classification |
| The classification history behind them | What the derivation was based on |

That last row is the one usually missed. A provision entry is only explicable if the classification
that produced it is still retrievable as at that date.

## What does eight years mean for system design?

Three things, none of which is storage cost:

**Nothing regulatory is hard-deleted.** Soft deletion with a status, or nothing. A row removed cannot
be produced.

**Historical positions are stored, not recomputed.** Recomputing a past position from a book that has
moved gives a different answer, and the answer you filed is the one you must be able to produce.

**Documents outlive the software that produced them.** A statement generated from today's masters is
not the statement that was issued. Store the generated document, or store enough to regenerate it
identically — which in practice means the terms frozen onto the loan.

## Common mistakes

- **Hard-deleting anything regulatory.** Including "test" records that turn out not to be.
- **Recomputing history instead of storing positions.** Different answer, same question.
- **Retention measured on the loan rather than the book.** A loan closed in year one still has
  vouchers that must survive eight financial years.
- **Documents regenerated from current masters.** Produces a document nobody was ever given.
- **Archival that loses the audit trail.** The trail is part of the record.
- **No plan for reading the archive.** Eight years is longer than most file formats stay convenient.

## Frequently asked questions

### How long must an NBFC keep its books of account?

Not less than eight financial years immediately preceding the current one, and longer where an
investigation has been ordered and the Registrar or the Central Government so directs. Where the
company is younger than eight years, all of them.

### Do the vouchers have to be kept as well as the ledger?

Yes. The requirement is the books together with the vouchers relevant to any entry, which for a
lender means the receipts, disbursement records and charge authorities behind the postings — not the
summary alone.

### Can books be kept only in electronic form?

Yes, subject to the conditions on electronic records, including that the back-up is retained to the
same standard and that the records remain accessible and legible for the retention period.

### Does a closed loan's history still have to be retained?

Yes. Retention runs on the books, not on the life of the account. A loan closed in year one leaves
entries in that year's books, and those books are retained for eight financial years like any other.

### What is the audit trail requirement's relationship to retention?

The audit trail is part of the record, so it is retained with the books it describes. A retention
policy that archives the ledger and drops the trail has kept the figure and lost the explanation.

---

**Related reading:** [How long records must be retained](/blog/nbfc-books-retention/) ·
[What counts as an audit trail](/blog/audit-trail-what-counts/) ·
[Terms are frozen at sanction](/blog/frozen-terms-at-sanction/) ·
[How to generate RBI returns](/blog/how-to-generate-rbi-returns-nbfc/)

[Ask for a walk-through](/contact/) — ask for a statement of account as it was issued three years ago.
