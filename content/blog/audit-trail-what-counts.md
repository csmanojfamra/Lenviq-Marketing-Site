---
title: "An audit trail is not a log file"
description: "The requirement is that every change be attributable and reversible in evidence. Most systems record that something changed; far fewer record what it was before."
date: "2026-08-11"
category: "Compliance"
author: "FastLegal Technologies"
draft: false
---

Since financial year 2023-24, companies keeping books in electronic form have had to use accounting
software with an audit trail of each and every transaction, creating an edit log of each change with
the date, and with the trail not capable of being disabled. It appears in the auditor's report as a
specific reporting obligation under the Companies (Audit and Auditors) Rules.

Every system claims to satisfy it. Fewer do, and the gap is usually the same one.

## Recording the change is not recording the edit

A row that says *user X updated loan 4471 at 14:32* is an activity log. It answers who and when. It
does not answer **what it was before**, which is the only question that matters when a figure is
disputed.

An edit log records the prior state. Without it, a change from 18% to 14% and a change from 12% to
14% are indistinguishable after the fact — and the borrower asking why their instalment moved cannot
be answered from the system.

## "Not capable of being disabled"

This is a design property, not a setting. If there is an administrative screen that turns the trail
off, or a data path that writes without going through it, then the trail is capable of being
disabled — whatever the policy says.

The realistic failure is not a switch. It is a bulk operation, a migration script, or a back-office
correction tool that writes directly. Those are exactly the paths where something contentious gets
changed.

## The test worth running

Change something consequential — a rate, a sanctioned amount, a due date — and then ask the system
three questions: **who**, **when**, and **what was it before**. Then ask whether that record can be
edited or removed by anyone, including an administrator.

If the third question has no answer, the requirement is not met, and it is not met in a way that
looks compliant from every screen in the product. That is why it is worth testing rather than
assuming.
