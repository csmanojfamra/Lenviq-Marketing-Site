---
title: "CKYC for an NBFC: the upload obligation, the identifier, and the record you have to keep"
description: "The Central KYC Records Registry is an obligation with two halves — push your customers' records up, and pull an existing record down when a customer gives you an identifier. What the 2025 NBFC KYC Directions require of a non-bank lender, and which half most lending systems skip."
metaDescription: "CKYC has two halves: uploading your customers' records and retrieving an existing one against a KYC Identifier. What the 2025 NBFC KYC Directions require."
question: "What does an NBFC have to do about CKYC, and when?"
keyword: "CKYC software for NBFCs"
kind: artefact
author: "CA Tanmay Saini"
updated: "2026-10-13"
related: "credit-information-reporting-2025, nbfc-digital-lending-guide, due-diligence-what-lenders-ask, audit-trail-what-counts, nbfc-compliance-checklist, outsourcing-what-cannot-be-outsourced, nbfc-books-retention, rbi-compliance-for-nbfcs-guide"
priority: 0.8
draft: true
---

The Central KYC Records Registry obligation has two halves, and they point in opposite directions. A
regulated entity must **upload** the KYC records of its customers so that other regulated entities can
rely on them, and it must **retrieve** an existing record from the registry when a customer offers a
KYC Identifier instead of fresh documents. A lender that does the first and not the second has met
half an obligation and thrown away the whole benefit, because the point of a central registry is that
nobody re-collects what is already there.

For a non-bank lender the upload duty attaches at account opening and it has a clock on it: the
records are captured and uploaded **within ten days of the account-based relationship commencing**.
That is a deadline per customer rather than a monthly cycle, which is the thing that decides how a
lending system has to carry it — the record it produces is itself something to be kept and
reconciled, not a file that is generated, sent and forgotten.

## What the Directions require, and from when

**The governing text changed, and most KYC policies have not caught up.** For a non-bank lender it is
no longer the 2016 Master Direction that applies to every regulated entity. It is the
[Reserve Bank of India (Non-Banking Financial Companies – Know Your Customer) Directions,
2025](https://rbi.org.in/scripts/NotificationUser.aspx?Mode=0&Id=12943) (RBI/DOR/2025-26/361,
DOR.AML.REC.No.280/14.01.003/2025-26, dated 28 November 2025, updated as on 29 December 2025) — and
paragraph 73 of those Directions is explicit: with their issue, the existing KYC directions,
instructions and guidelines *as applicable to* NBFCs **stand repealed**, as communicated by circular
DOR.RRC.REC.302/33-01-010/2025-26 of the same date. Anything already done under the repealed text
stays governed by it; everything from here is governed by these.

The substance of the CKYC obligation did not move with the renumbering — the ten days, the seven
days, the templates and the commencement dates are the same — but the citation did. An NBFC's KYC
policy, and any page or vendor document quoting the 2016 paragraph numbers at it, is now citing an
instrument that has been repealed for its own sector.

In the 2025 Directions the CKYCR provisions are **paragraph 63**, in Chapter X:

| Obligation | What it says |
|---|---|
| The upload, and the clock on it | **63(1)**: in terms of Rule 9(1A) of the PML Rules, the NBFC captures the customer's KYC records and uploads them onto CKYCR **within 10 days of commencement of an account-based relationship** with the customer |
| New individual accounts | **63(4)**: the registry's live run began 15 July 2016 in phases; an NBFC uploads for all new individual accounts opened on or after **1 April 2017** |
| Non-individual borrowers | **63(5)**: accounts of legal entities opened on or after **1 April 2021**, on the legal-entity template released by CERSAI |
| Accounts opened before those dates | **63(7)**: upload or update at the time of periodic updation under paragraph 42, or earlier, when updated KYC information is obtained from the customer |
| An update to an existing record | Also **63(7)**: the NBFC furnishes the updated information to CKYCR **within seven days**, or such period as the Central Government may notify. The registry then informs every reporting entity that has dealt with that customer, and on being informed the NBFC retrieves the update and applies it to its own record |
| The KYC Identifier | **63(6)**: once CKYCR generates an identifier, the NBFC must ensure it is communicated to the individual or legal entity |
| Retrieval | **63(9)**: the NBFC **seeks the identifier from the customer, or retrieves the identifier from CKYCR**, obtains the records online with it, and *shall not* require the same records again — unless the information has changed, what came back is incomplete or not to current norms, the validity period of the downloaded documents has lapsed, or the NBFC considers it necessary to verify identity or address, perform enhanced due diligence or build a risk profile |
| Who is answerable for a downloaded record | The **explanation added on 29 December 2025**: the entity that *last uploaded or updated* the record is responsible for verifying identity and address, so an NBFC downloading and relying on a record that is current and PML-compliant need not re-verify — while remaining responsible for every other aspect of customer due diligence |
| Periodic updation | **42(1)**: at least once every two years for high-risk customers, eight years for medium risk and ten years for low risk, counted from account opening or the last updation |

The legal plumbing underneath is worth knowing because it is what reaches a non-bank at all: the
obligation itself is Rule 9 of the Prevention of Money-laundering (Maintenance of Records) Rules,
2005 — 9(1A) for the upload, 9(1C) for an update — and the Directions are the Reserve Bank's
instrument for binding an NBFC to it. Which is why the repeal above changes the citation and not the
duty: the Rules did not move.

## The part a lending system usually gets wrong

Not the file format. The format is a published specification and generating it is mechanical.

What goes wrong is that the upload is treated as an **event** rather than a **record**. A file is
built, somebody uploads it, and nothing in the lender's system knows what happened next. Then the
registry rejects a batch for a mandatory field, or allots an identifier that nobody writes back, and
six months later the compliance officer is asked how many customers are on the registry and has no way
to answer except by counting files in a folder.

A CKYC upload has a lifecycle, and each state is a fact somebody will ask about:

- **built** — the file exists, for this party, as at this date, in this version
- **submitted** — it went to the registry, on this date
- **accepted**, and the identifier the registry allotted, written back against the party
- **rejected**, and the reason, so the same record is not resubmitted unchanged

Without the fourth state a lender cannot distinguish "not yet uploaded" from "uploaded and refused",
which are very different answers to a supervisor. Without the third, the identifier lives in somebody's
email and the retrieval half of the obligation can never be performed.

## Aadhaar is the field to be careful with

A CKYC record carries identity documents, and for Indian customers that often includes Aadhaar. The
constraint is not about the registry; it is about what the lender's own database is allowed to hold.

The safe design is that the full number is never persisted at all — the lender stores the last four
digits and no more, and anything that needs an Aadhaar reference reads the masked form. That has one
consequence worth stating plainly: a system built this way cannot regenerate a file that requires the
full number from its own records. That is the correct trade, and a system that keeps the full number
"so the file can be rebuilt" has created a liability to avoid an inconvenience.

## CKYC is not credit bureau reporting, and not a KYC check

Three obligations get run together in conversation and they share almost nothing.

- **CKYC** is an identity record uploaded once and updated on change, to a registry operated for the
  purpose, so that other lenders need not re-collect documents.
- **Credit information reporting** is a monthly submission of each borrower's account position and
  days past due to the credit information companies. It is about *conduct*, it recurs every month, and
  it carries history — which is a
  [materially harder computation than it looks](/blog/credit-information-reporting-2025/).
- **Verification** — PAN validation, document checks, video identification — is how the lender
  satisfies itself about the customer in the first place. It happens before either submission, and
  passing it is not the same as having filed anything.

A system that offers "KYC" as one feature is describing one of these three and leaving the reader to
guess which.

## What a system has to do, and what it must not pretend to do

| Need | What good software does | What it must not pretend to do |
|---|---|---|
| The file | Build the registry's format for both individual and non-individual customers, and for a new record as distinct from an update | Produce one shape and call it both. A legal entity's record carries constitution, incorporation date and signatories; an individual's does not |
| The record | Keep every upload as a dated record per customer, with its status and the identifier allotted | Treat the upload as a one-off action with no trace |
| Aadhaar | Hold the masked form only | Keep the full number anywhere |
| Rejections | Record the reason and keep the record resubmittable after correction | Count a rejected upload as filed |
| Retrieval | Accept a KYC Identifier and pull the existing record | Describe storing an identifier as retrieval. Writing a number into a field is not a registry lookup |
| Submission | Be honest about whether the system transmits or only prepares | Call a generated file a filing |

## Frequently asked questions

### Does an NBFC have to upload records for customers it onboarded years ago?

For accounts opened before the commencement dates above, paragraph 63(7) ties the upload to periodic
updation — or earlier, if updated KYC information is received in the meantime. So it is not a one-off
back-file exercise with a deadline; it is something that happens as the existing book comes up for
updation on its own risk-based cycle.

### How often does KYC have to be updated?

At least once every two years for high-risk customers, eight years for medium risk and ten years for
low risk. The risk category is the lender's own classification, which means the cadence is a
consequence of a judgement the lender has to be able to evidence.

### If a customer gives us a KYC Identifier, can we skip document collection?

That is the purpose of the registry, and paragraph 63(9) puts it more strongly than a permission: the
lender *shall not* require the same records again, subject to the four exceptions in the table above.
A lender relying on a retrieved record should keep what it retrieved and when — the retrieval is the
evidence of the diligence, and without a stored copy the lender has relied on something it cannot
produce.

### Does the ten days run from sanction, from disbursement, or from onboarding?

Paragraph 63(1) says from the commencement of the **account-based relationship**, which is a
relationship with the customer rather than an event in a loan's life. Where in its own process a
lender treats that as having commenced is a determination the lender makes and should be able to
evidence — and the practical consequence is that a system triggering the upload off disbursement is
working from a later date than the Directions name, on a book where onboarding and disbursement can
be weeks apart. The seven-day limit on an update is separate and shorter, and it is the easier one
to miss: a change of address recorded in the ordinary course does not feel like a filing.

### Is CKYC the same as the CKYC number printed on a customer's document?

The identifier is the registry's reference to the record. A customer quoting it is telling you a
record exists; it is not itself a verification, and nothing about it tells you whether the record is
current.

### Where does Lenviq stand on this?

The platform builds the registry file for both individual and non-individual customers and for new
records as distinct from updates, stores the generated file, and keeps a dated upload record per
customer with its status — pending, submitted, accepted or rejected — and the identifier allotted
against the party. Aadhaar is masked before it reaches the file, because the full number is not
persisted at all. Two things it does **not** do: it does not transmit to the registry, so submission
and the status that follows are recorded rather than performed; and it does not retrieve a record
against a KYC Identifier, so the retrieval half of the obligation above is outside what the platform
does today.
