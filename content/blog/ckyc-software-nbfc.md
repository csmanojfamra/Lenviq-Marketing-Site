---
title: "CKYC for an NBFC: the upload obligation, the identifier, and the record you have to keep"
description: "The Central KYC Records Registry is an obligation with two halves — push your customers' records up, and pull an existing record down when a customer gives you an identifier. What the KYC Direction actually requires of a non-bank lender, and which half most lending systems skip."
metaDescription: "CKYC has two halves: uploading your customers' records and retrieving an existing one against a KYC Identifier. What the KYC Direction requires of an NBFC."
question: "What does an NBFC have to do about CKYC, and when?"
date: "2026-10-13"
category: "Compliance"
author: "CA Tanmay Saini"
related: "credit-information-reporting-2025, nbfc-digital-lending-guide, due-diligence-what-lenders-ask, audit-trail-what-counts, nbfc-compliance-checklist, outsourcing-what-cannot-be-outsourced, nbfc-books-retention, rbi-compliance-for-nbfcs-guide"
draft: true
---

The Central KYC Records Registry obligation has two halves, and they point in opposite directions. A
regulated entity must **upload** the KYC records of its customers so that other regulated entities can
rely on them, and it must **retrieve** an existing record from the registry when a customer offers a
KYC Identifier instead of fresh documents. A lender that does the first and not the second has met
half an obligation and thrown away the whole benefit, because the point of a central registry is that
nobody re-collects what is already there.

For a non-bank lender the upload duty attaches at account opening, and the record it produces is
itself something that has to be kept and reconciled — not a file that is generated, sent and
forgotten.

## What the Direction requires, and from when

The governing text is the Reserve Bank's [Master Direction – Know Your Customer (KYC) Direction,
2016](https://www.rbi.org.in/Scripts/BS_ViewMasDirections.aspx?id=11566) (RBI/DBR/2015-16/18, Master
Direction DBR.AML.BC.No.81/14.01.001/2015-16, dated 25 February 2016 and amended many times since —
read the consolidated version, not a summary). Its CKYC provisions were brought in by amendment and
the commencement dates differ by the kind of entity:

| Obligation | What it says |
|---|---|
| New individual accounts | Scheduled commercial banks upload KYC data for all new individual accounts opened on or after **1 January 2017**; regulated entities other than scheduled commercial banks — which is where an NBFC sits — from **1 April 2017** |
| Individual accounts opened before 1 January 2017 | Upload at the time of periodic updation, or earlier where updated KYC information is received |
| The KYC Identifier | Once the registry generates an identifier, the regulated entity must ensure it is communicated to the individual or legal entity |
| Retrieval | Where a customer supplies a KYC Identifier, the regulated entity retrieves the records online from the registry, in accordance with **paragraph 56** of the Direction |
| Periodic updation | At least once every two years for high-risk customers, eight years for medium risk and ten years for low risk |

The legal plumbing underneath is worth knowing because it decides who the obligation binds: the
amendments are issued under section 35A read with section 56 of the Banking Regulation Act, 1949,
together with Rule 9(14) of the Prevention of Money-laundering (Maintenance of Records) Rules, 2005.
The Rules are what reach a non-bank.

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

For individual accounts opened before 1 January 2017, the Direction ties the upload to periodic
updation — or earlier, if updated KYC information is received in the meantime. So it is not a one-off
back-file exercise with a deadline; it is something that happens as the existing book comes up for
updation on its own risk-based cycle.

### How often does KYC have to be updated?

At least once every two years for high-risk customers, eight years for medium risk and ten years for
low risk. The risk category is the lender's own classification, which means the cadence is a
consequence of a judgement the lender has to be able to evidence.

### If a customer gives us a KYC Identifier, can we skip document collection?

That is the purpose of the registry. Paragraph 56 of the Direction governs the retrieval, and a
lender relying on a retrieved record should keep what it retrieved and when — the retrieval is the
evidence of the diligence, and without a stored copy the lender has relied on something it cannot
produce.

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
