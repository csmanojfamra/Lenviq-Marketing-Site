---
title: "An audit trail is not a log file"
description: "The statutory requirement is an edit log of every change, with the prior value, not capable of being disabled. Most systems record that something changed; far fewer record what it was before. How to test yours in ten minutes."
date: "2026-08-11"
category: "Compliance"
author: "FastLegal Technologies"
draft: false
---

An audit trail, in the statutory sense, is an **edit log recording what each value was before it
changed** — not a list of things that happened. Since financial year 2023-24, companies keeping books
in electronic form must use accounting software with an audit trail of each and every transaction,
creating an edit log of each change with the date, with the trail not capable of being disabled. It
appears in the auditor's report as a specific reporting obligation.

Every system claims to satisfy it. Fewer do, and the gap is almost always the same one.

## What does the requirement actually say?

Three properties, and each is testable:

| Property | The test |
|---|---|
| Every transaction | Is there any write path that does not produce a record? |
| An edit log of each change, with the date | Does the record carry the **prior value**, or only the fact of a change? |
| Not capable of being disabled | Can an administrator turn it off, or write around it? |

The obligation sits under the Companies (Accounts) Rules, with the auditor required to report on it
under the Companies (Audit and Auditors) Rules. For an NBFC it compounds with the RBI's own
expectations about records: a regulated lender is asked not only whether a figure is right but how it
came to be that figure.

## Why is a change log not an edit log?

A row that says *user X updated loan 4471 at 14:32* answers **who** and **when**. It does not answer
**what it was before**, which is the only question that matters when a figure is disputed.

Without the prior value, a change from 18% to 14% and a change from 12% to 14% are indistinguishable
after the fact. The borrower asking why their instalment moved cannot be answered from the system;
neither can the auditor asking whether a rate was reduced before or after the sanction.

The distinction has a practical shape. An activity log is written for operations — who is doing what
today. An edit log is written for evidence — what this record used to say. Systems built for the
first rarely satisfy the second, because storing the prior state of every field costs space that an
operations log does not need.

## What does "not capable of being disabled" mean in practice?

It is a design property, not a setting.

If there is an administrative screen that turns the trail off, the requirement is not met — whatever
the policy says about who has access to it. But the realistic failure is not a switch. It is:

- **A bulk operation.** A month-end job that updates ten thousand rows through a direct query.
- **A migration script.** Run once, at the point where the data is most consequential.
- **A back-office correction tool.** Built to fix things quickly, which is exactly the circumstance
  in which something contentious gets changed.
- **Direct database access.** The trail is at the application layer; the database is not.

Each of these writes without passing through the trail. None of them looks like disabling it.

## What should an audit record contain?

- **Who** — the acting user, and where the action was on behalf of another, both.
- **When** — a timestamp with a time zone, on the business calendar the books use.
- **What** — the entity and the field.
- **Before and after** — the values, not a description of them.
- **Why, where it applies** — a reason on actions that require one: waivers, deviations, overrides.
- **Immutably** — append-only. A trail whose rows can be edited is a document, not evidence.

For a lender there is a fourth category worth separating: some events are not edits at all but
**immutable financial postings** — a disbursement, a receipt, a sanction. Those should not be
editable in the first place. A correction is a reversal entry with its own record, not an update to
the original. The audit trail then records the reversal, and the original stands as it was made.

## The test worth running

Ten minutes, on any system you are evaluating or already own.

1. Change something consequential — a sanctioned rate, an approved amount, a due date.
2. Ask the system three questions: **who**, **when**, **what was it before**.
3. Ask whether that record can be edited or deleted by anyone, including an administrator.
4. Now do a **bulk** change — a rate revision across a scheme, a batch upload — and repeat.
5. Try to reverse a posted receipt. Does the original survive, with the reversal recorded against it?
6. Ask what happens if somebody with database access changes a row directly. (The honest answer is
   that no application can prevent it. The useful answer is what would show.)

If step 3 has no answer, the requirement is not met — and it is not met in a way that looks compliant
from every screen in the product, which is why it is worth testing rather than assuming.

## Common mistakes

- **An activity log presented as an audit trail.** Records the event, not the prior state.
- **Trail at the screen, not at the data layer.** Anything not going through that screen is invisible.
- **Bulk jobs bypassing it.** The largest changes leave the smallest record.
- **Editable audit rows.** Evidence that can be edited is not evidence.
- **Corrections by update rather than reversal.** The original figure disappears, and with it the
  question of why it was wrong.
- **No reason captured on discretionary actions.** "Waived" without why tells an auditor nothing.
- **Timestamps in UTC on an Indian book.** A change at 05:00 IST lands on the previous day, which
  matters when the question is whether it was before or after a cut-off.

## A worked example

A borrower disputes their instalment. It was ₹44,424 and is now ₹32,750.

**With an activity log:** the system shows that a user opened the loan on 3 August and saved it. The
instalment today is ₹32,750. Whether it was reduced by a rate change, a part-prepayment or a data
correction is not recoverable from the system, and the answer will come from asking the person who
was there.

**With an edit log:** the record shows a part-prepayment of ₹1,00,000 on 3 August, the adjustment
type recorded as REDUCE_EMI, the prior instalment ₹44,424, the prior tenure 12 months and the new
tenure 9, the acting user, and the receipt number. The dispute is answered in one screen, and the
answer is evidence rather than recollection.

## How Lenviq handles this

Every master and application mutation writes to an append-only audit log carrying who, when, before
and after — at the data layer, so a bulk operation and a screen edit produce the same record.
Financial postings are immutable events: a disbursement, a receipt, a sanction cannot be updated, and
a correction is a reversal entry that leaves the original intact and records itself. Database triggers
enforce that immutability rather than relying on application discipline, which is what makes it
survive a script somebody wrote in a hurry.

The [security page](/security/) covers access control and retention alongside this.

## Frequently asked questions

### Does the audit trail requirement apply to NBFCs?

It applies to companies that keep their books of account in electronic form, which includes NBFCs.
The auditor reports on it specifically, so it is tested annually rather than only when something goes
wrong.

### Is a database transaction log an audit trail?

No. A transaction log is an operational artefact for recovery and replication; it is not attributable
to a user, not readable as evidence, and typically retained for days rather than years. The
requirement is a business-level edit log with the prior value and the acting user.

### Can an audit trail be turned off for a migration?

If it can be turned off, the requirement is not met. A migration is exactly the moment when the
largest and least visible changes are made, so a design that exempts it exempts the changes that
matter most. The workable pattern is to record migration writes as what they are — attributed to a
migration, with the source — rather than to suppress them.

### How long must audit records be kept?

At least as long as the books they relate to. For an NBFC that means aligning with the retention
applicable to the underlying records under the Companies Act and the relevant RBI directions, and
treating regulatory records as never hard-deleted.

### What is the difference between an audit trail and an immutable event record?

An audit trail records that a value changed and what it was before. An immutable event record is a
transaction that cannot change at all — a receipt, a disbursement, a sanction. A well-built lending
system uses both: events for money, an edit log for everything configurable around it.

---

**Related reading:** [What must be kept in the books](/blog/books-of-account-what-must-be-kept/) ·
[How long records must be retained](/blog/nbfc-books-retention/) ·
[Terms are frozen at sanction](/blog/frozen-terms-at-sanction/) ·
[RBI compliance for NBFCs](/blog/rbi-compliance-for-nbfcs-guide/)

[Ask for a walk-through](/contact/) — change something and ask the system what it used to be.
