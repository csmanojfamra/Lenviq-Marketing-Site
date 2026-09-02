---
title: "What is a loan origination system, and what does an NBFC need one to do?"
description: "An LOS is everything before the loan exists — lead, party, KYC, collateral, bureau, underwriting, approval, documentation, disbursement. What each stage owns, what separates one that survives an audit, and where it hands over to the LMS."
metaDescription: "What a loan origination system is, what each stage owns, and what separates an LOS an NBFC can be audited on from one it cannot."
date: "2026-09-02"
category: "Guide"
author: "CS Manoj Famra"
draft: false
---

A loan origination system is the half of lending that happens **before there is a loan**. It takes an
enquiry and turns it into a disbursed facility: the borrower becomes a record, the security is
valued, the bureau is read, somebody approves it against a policy, the pack is generated, and the
money is released. At disbursement it hands over to the loan management system and its work is done.

The distinction matters commercially, because "lending software" is sold as both and an NBFC that
buys only one half runs the other on spreadsheets.

## What is a loan origination system?

An LOS owns the file from lead to disbursement. Concretely, it holds:

| Stage | What it owns | The question it settles |
|---|---|---|
| Lead | Source, assignment, stage, turnaround | Is anyone working this, and for how long? |
| Party | Borrower, co-applicants, guarantors, their KYC | Who are we lending to, and is the file complete for their constitution? |
| Collateral | Valuation, legal check, eligible value | What is the security actually worth to us? |
| Credit | Bureau pull, income, obligations, ratios | Can they repay, and on what evidence? |
| Approval | Deviations, slabs, authority | Who allowed this, and against which policy? |
| Sanction | Terms, snapshotted | What exactly did we agree, and can it change later? |
| Documentation | Agreement, KFS, mandate, declaration | Is the paper enforceable? |
| Disbursement | Maker-checker release, funding instrument | Did the right person release it, and do the books know? |

Everything after that — schedules, interest, days past due, classification, collections, closure —
belongs to the loan management system. A useful test when a vendor demonstrates: **ask which side of
disbursement each screen sits on.** If they cannot say, the two halves are not clearly separated in
the product either.

## Why does an NBFC need one rather than a spreadsheet?

Not for speed, which is what most of this is sold on. For **reconstruction**.

An origination file is read twice: once to approve it, and once — months or years later — to defend
it, to an auditor, an inspection, a bureau dispute or a borrower's complaint. The second reading is
where spreadsheets fail. Not because they are inaccurate, but because they carry no record of who
changed what, and nothing that shows the decision was made on the evidence that was available at the
time rather than on the version of the sheet that survives.

The specific things an NBFC needs and a spreadsheet cannot give:

- **Constitution-aware KYC.** A private limited company needs its directors and beneficial owners
  before the file can move; a HUF needs a karta; a partnership needs partners whose profit shares
  total no more than 100%. These are conditions, not a checklist somebody remembers.
- **The bureau report, not the score.** Attached to the application, so the decision can be re-read
  against what was actually seen.
- **Terms snapshotted at sanction.** A scheme edited next quarter must not reach back into a loan
  booked last quarter.
- **Maker-checker on release.** The person who prepares is never the person who releases.
- **An append-only trail.** Who, when, before and after — with sanction, disbursement and rejection
  as immutable events, corrected by reversal rather than by editing.

## How does an LOS work, step by step?

1. **A lead is captured** with its source and assigned to someone, so turnaround is measurable per
   stage rather than in aggregate.
2. **The borrower becomes a party record** — not fields on this application, but a record a second
   facility can start from. Individuals and entities are different shapes, and the entity's
   directors, partners, karta or trustees are related parties with their own KYC.
3. **The security is valued under its own rules.** Gold by purity and net weight against an approved
   daily rate; property by a technical valuation on a realisable basis with the legal opinion
   recorded against it. The loan is sized against the *eligible* value, not the market value.
4. **Credit is assessed.** The bureau is pulled against the right PAN — the entity's, or the
   proprietor's where the firm has none — and income and obligations are worked into a ratio whose
   arithmetic is stored.
5. **The file is approved** through an approval matrix that routes by amount, with any deviation
   carrying the level of authority it requires.
6. **Sanction snapshots the terms** onto the loan.
7. **The pack is generated** from those terms: agreement, Key Facts Statement with an APR computed
   from the actual cash flows, promissory note, mandate, borrower declaration.
8. **Disbursement is released** under maker-checker, with the accounting entry posted on the
   disbursement date rather than at month end.

## What separates an LOS you can be audited on?

Every vendor will show you a file moving from lead to disbursement. The differences show up at the
edges:

- **Can a sanctioned loan be altered by editing the scheme?** If yes, no historical figure in the
  book can be defended.
- **What happens to a rejected file?** A rejection that can be deleted is not a rejection an
  inspection can review.
- **Is the approval matrix enforced or advisory?** A slab a user can override without a record is a
  slab that does not exist.
- **Where is the bureau report?** Attached to the application, or fetched again when someone asks —
  in which case the file no longer shows what the decision was made on.
- **Does disbursement post to the ledger, or is it re-keyed?** Re-keying moves the reconciliation
  rather than removing it.

## Common mistakes

- **Buying an LOS and calling it a lending system.** It stops at disbursement. Everything the book
  is measured on — interest, classification, provisioning — is the other half.
- **Treating KYC as a document list.** What a constitution *requires* differs; a single checklist
  applied to every borrower produces files that are complete on paper and unenforceable in fact.
- **Configuring the approval matrix after go-live.** It is the control an inspection looks for first,
  and retrofitting it means the first months of the book have no authority trail.
- **Letting the LOS keep its own copy of the borrower.** Two records for one borrower is how exposure
  gets understated, and it is very hard to unpick later.

## Frequently asked questions

**Is a loan origination system the same as a loan management system?**
No. An LOS ends at disbursement; an [LMS](/loan-management-system/) begins there. Some platforms sell
both, which is fine — but ask which side of disbursement each screen sits on, because a product that
cannot separate them cleanly usually has one half bolted onto the other.

**Does an LOS make the credit decision?**
It should not. It holds the evidence, computes the ratios, shows its workings and routes the file to
whoever has authority for that amount. A system that approves on its own, without showing how, is
worth less than the approval.

**Can a small NBFC start with origination only?**
Yes, and many do — but the seam is real. The loan then has to be created a second time in whatever
services it, and the two records will disagree eventually. If both halves are bought at once the
disbursement is a handover rather than a re-entry.

**What does it cost?**
Vendors publish anything from ₹50,000 a year to ₹1 crore, which is not a range that helps. What moves
the number is the count of accounts and users, whether you need origination alone or the servicing
and accounting with it, how many integrations, and migration. The recurring per-transaction costs —
bureau pulls, NACH mandates, e-sign, penny-drop — sit outside most licence quotes and are worth
asking about separately.

## How Lenviq handles this

Origination in Lenviq is the half described above, ending at a maker-checker disbursement that posts
its own accounting entry — and the servicing half runs on the same system, so the loan is not created
twice. The [loan origination software](/loan-origination-software/) page describes what each stage
holds; the [compliance page](/compliance/) names the RBI instrument behind each position it takes.

If you would like to see a file move through it against your own product, [talk to us](/contact/).
