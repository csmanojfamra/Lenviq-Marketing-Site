---
title: Complete a customer's KYC
description: Fill in what a doorstep capture could not, attach the identity documents, and get the record to a state a loan file can be opened on.
section: Origination
route: "/parties"
order: 20
audience: Credit / Operations
---

A customer created in the field arrives with a name, a mobile, an address and whatever the officer
could ask standing at a gate. This is the screen where it becomes a KYC record.

@shot party-kyc | The customer screen, showing the profile and the KYC and customer-risk panel, with the risk category the software suggested from the file beside the one the officer chose | Everything about the borrower lives here — not on the loan file.
@mark 32,9 | The party record, and whether it is an individual or an entity. KYC lives here, not on the loan file.
@mark 31,11.6 | PAN and mobile. A second loan for this customer starts from what is already verified.
@mark 28,47.7 | Money-laundering risk under the KYC Master Direction — not credit risk. It sets the re-KYC cycle.
@mark 24,55.7 | KYC status. A loan file cannot be opened on a record that has not reached verified.

## Fill in what is missing, one field at a time

You do not have to complete the record in one sitting. An edit is checked against what the record
already was: filling one of several missing fields is progress and is saved, and only blanking a
field that was already filled is refused.

## Identity documents

Each document is its own row, with the number and the file. Two rules the screen applies for you:

- **Aadhaar is masked.** Type all twelve digits; only the last four are transmitted and stored.
- **A PAN and a Form 60 are alternatives.** A customer may hold one or the other, never both — Rule
  114C gives Form 60 to a person who does not hold a PAN.

An issue date is not asked for on a PAN or an Aadhaar, because neither carries one worth recording;
a passport and a driving licence still ask, because both print one.

## Addresses

The pincode is entered first and fills the state, district and city. A present address and a
permanent address are two rows — the bureau submission and the KYC file read them separately, and an
OVD is checked against a specific one.

A previous address is kept rather than overwritten: an address history is what a verifier reads to
judge how settled a borrower is.
