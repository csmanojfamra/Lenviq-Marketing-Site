---
title: "The Key Facts Statement: what an NBFC must disclose, and what it costs to get wrong"
description: "What goes into a KFS, how the annual percentage rate is computed and what it must include, the clause that stops a lender recovering an undisclosed charge, the vernacular requirement, and why a typed APR eventually contradicts the schedule beside it."
date: "2026-08-12"
category: "How-to"
author: "FastLegal Technologies"
draft: false
---

The Key Facts Statement is a standardised, one-page summary of a loan given to the borrower **before**
they sign, in a language they understand. It carries the all-in annual percentage rate, every charge
recoverable under the loan, the repayment schedule and the grievance route. Its most consequential
line is not a number: **a charge that does not appear in the KFS cannot be recovered from the
borrower later**.

That single clause turns the KFS from a summary of intentions into a limit on the lender, and it is
why the document has to be generated from the loan's own sanctioned terms rather than assembled from
a template.

## What has to be in a KFS?

Under the RBI's guidelines on the Key Facts Statement for loans and advances ([RBI/2024-25/18](https://www.rbi.org.in/Scripts/NotificationUser.aspx?Id=12663&Mode=0), dated
15 April 2024, applying to retail and MSME term loans), the statement covers:

| Block | What it carries |
|---|---|
| Loan particulars | Sanctioned amount, tenor, instalment amount and frequency, disbursal schedule |
| Interest | Rate, whether fixed or floating, the benchmark and spread if floating, and the reset cycle |
| Fees and charges | Every fee recoverable — processing, documentation, insurance financed, valuation, legal, penal quantum and the circumstances of levy |
| Annual percentage rate | The all-in annualised cost, computed |
| Contingent charges | Prepayment, foreclosure, bounce, late payment, and what triggers each |
| Amortisation schedule | The instalments, split into interest and principal |
| Recovery and grievance | The recovery mechanism, the grievance officer, the escalation route |
| Third-party services | Insurance or any service, its cost, and the fact that it is optional where it is |

Two structural requirements sit alongside the content: the statement must be in a language the
borrower understands, and it must carry a **unique proposal number** and a validity period, so the
borrower can compare offers and the lender cannot substitute terms afterwards.

## How is the annual percentage rate computed?

The APR is the total annualised cost of the loan to the borrower — interest plus every charge
recovered by the lender — expressed as a rate.

What goes in:

- The contracted interest.
- Fees the lender recovers: processing, documentation, administration.
- Insurance premium where it is financed by the lender or is a condition of the loan.
- Any other cost the borrower bears to obtain the credit.

What stays out:

- Amounts genuinely collected on behalf of a third party and paid over, disclosed as such — statutory
  levies, for instance.
- Contingent charges that arise only on a future event: penal charges, bounce charges, foreclosure
  charges. These are disclosed in their own block, but they are not in the APR, because the APR
  prices the loan as contracted rather than as defaulted.

The mechanics are an internal rate of return over the actual cash flows: the net amount the borrower
receives at disbursement — after upfront deductions — against the instalments they pay. That is why
an upfront fee raises the APR while a fee spread across instalments raises it less: the borrower had
less money for the same repayment.

**This is why a typed APR fails.** If the fee is deducted at disbursement, the APR must reflect a
smaller net disbursal. Somebody typing a number into a template will type the interest rate plus a
rounding, and the schedule printed on the same page will contradict it. A borrower's counsel reads
both.

## The clause with teeth

Charges not disclosed in the KFS cannot be recovered at any later stage.

The operational consequences are worth stating plainly:

- A charge introduced after sanction cannot be applied to that loan.
- A charge in the agreement but absent from the KFS is not recoverable.
- A charge described vaguely — "other charges as applicable" — is not disclosed.

This makes the KFS a **completeness** problem rather than a formatting one. The question to ask of
your own process is not "does the KFS look right" but "is there any charge this system can levy that
is not on it?"

## When must it be given?

Before execution. It is a pre-execution disclosure, so the borrower can read the terms and compare
them before committing. Producing it afterwards — at disbursement, or with the welcome pack —
inverts its purpose and forfeits the protection the non-recovery clause gives the lender against a
dispute.

The validity period matters too: the KFS states how long the offer holds. Terms that change after it
lapses require a fresh statement.

## The vernacular requirement

The KFS must be in a language the borrower understands. In practice that means the lender needs the
statement, and the declaration alongside it, available in the languages its borrowers actually use,
with a record of which one was used.

The practical implementation is a declaration block in each supported language with a signature
against the one in which the terms were explained. The record of *which* language was signed against
is the evidence that the requirement was met.

## Common mistakes

- **A typed APR.** It will eventually disagree with the schedule beside it.
- **Charges in the agreement but not in the KFS.** Not recoverable.
- **"Other charges as applicable".** Not a disclosure.
- **KFS produced at disbursement.** Too late to serve its purpose.
- **Penal charges inside the APR.** They are contingent and belong in their own block.
- **A template that is edited per loan.** Every manual edit is a chance for the document and the loan
  to differ.
- **No record of the language used.** The requirement is not just to offer the vernacular version.
- **A KFS that cannot be reproduced.** When a dispute arises two years later, you need the statement
  that was actually given, not one regenerated from today's masters.

## A worked example

A personal loan of ₹5,00,000 for 12 months at 12% a year, with a 2% processing fee and GST on it.

- Processing fee ₹10,000 plus GST ₹1,800 — deducted at disbursement.
- Net disbursal to the borrower: ₹4,88,200.
- Instalments computed on ₹5,00,000 at 12%: ₹44,424 a month for twelve months.

The **interest rate** is 12%. The **APR** is the rate that equates ₹4,88,200 received today with
twelve payments of ₹44,424 — materially above 12%, because the borrower is repaying on a principal
larger than they received.

A KFS that prints "APR: 12%" is wrong on its face, and the amortisation schedule three inches below
it is the proof.

Note what is *not* in the APR: the penal charge quantum, the foreclosure charge, the bounce charge.
Each is disclosed in the contingent-charges block with the circumstances that trigger it, because
none of them arises unless something happens.

## How Lenviq handles this

The KFS is generated from the loan's own sanctioned terms — the same terms snapshotted onto the loan
at sanction — with the APR computed from the actual cash flows rather than entered. The charge blocks
are driven by the charge configuration the loan carries, so a charge the system can levy is a charge
that appears on the statement: the completeness question is answered by construction rather than by
review.

The declaration is available in fourteen languages with a signature cell against each, and the
language the borrower signed against is part of the record. Because terms are frozen at sanction, the
statement can be reproduced years later as it was given, not as today's masters would produce it.

The [compliance page](/compliance/) states the position with its citation.

## Frequently asked questions

### What is the difference between the interest rate and the APR in a KFS?

The interest rate is what is charged on the principal. The APR is the total annualised cost including
fees the lender recovers, computed on the cash the borrower actually received. Where a fee is
deducted at disbursement the APR is higher than the interest rate, and the gap is the point of the
disclosure.

### Are penal charges included in the APR?

No. Penal charges are contingent — they arise only on default — so they are disclosed separately with
the circumstances of levy rather than priced into the APR, which represents the cost of the loan as
contracted.

### Can an NBFC recover a charge that is not in the KFS?

No. The guidelines state that charges not disclosed in the Key Facts Statement cannot be recovered at
any later stage. This is why the practical test of a KFS process is completeness — whether any charge
the system can levy is missing from the statement — rather than presentation.

### When must the KFS be given to the borrower?

Before execution of the loan contract, so the borrower can read and compare the terms before
committing. It also carries a validity period, and terms that change after it lapses require a fresh
statement.

### Does the KFS have to be in a regional language?

It must be in a language the borrower understands. For most Indian NBFCs that means maintaining the
statement and its declaration in the languages their borrowers actually use, and recording which one
the borrower signed against — the record is what evidences compliance.

---

**Related reading:** [What goes into the KFS APR](/blog/kfs-what-goes-in-the-apr/) ·
[The KFS requirement](/blog/rbi-key-facts-statement/) ·
[RBI compliance for NBFCs](/blog/rbi-compliance-for-nbfcs-guide/) ·
[Terms are frozen at sanction](/blog/frozen-terms-at-sanction/)

[Ask for a demonstration](/contact/) — bring a live loan's terms and we will generate the statement
from them.
