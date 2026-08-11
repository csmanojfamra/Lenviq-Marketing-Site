---
title: "Which layer are you in, and what actually changes"
description: "Scale-Based Regulation put every NBFC in one of four layers. The layer is not a label — it decides governance, disclosure and, since 2025, whether you may levy a prepayment charge at all."
date: "2026-08-11"
category: "Regulatory"
author: "FastLegal Technologies"
draft: false
---

Scale-Based Regulation ([RBI/2021-22/112](https://rbi.org.in/Scripts/NotificationUser.aspx?Id=12179&Mode=0),
22 October 2021, effective 1 October 2022) replaced a single rulebook with four layers. Most NBFCs
read it once, established they were in the Base Layer, and moved on. That was reasonable in 2022 and
is no longer enough, because later instruments have started keying off the layer directly.

## The four layers

**Base Layer** — asset size below ₹1,000 crore, plus P2P platforms, account aggregators, NOFHCs, and
NBFCs with neither public funds nor public interface.

**Middle Layer** — all deposit-taking NBFCs regardless of size, and non-deposit-taking NBFCs at
₹1,000 crore and above. Standalone primary dealers, infrastructure debt funds, core investment
companies, housing finance companies and infrastructure finance companies sit here whatever their
size.

**Upper Layer** — identified by name by the Reserve Bank, on a scoring methodology. You do not
arrive here by growth alone; you are told.

**Top Layer** — empty by design, and populated only if systemic risk from a specific company rises.

## Why the layer stopped being trivia

The Pre-payment Charges Directions, 2025 are the clearest example. They bar prepayment charges on
business loans by naming entity classes — NBFC-UL outright, NBFC-ML up to ₹50 lakh — and say nothing
about the Base Layer, which therefore falls to the residual paragraph and its own board policy.

The strings "NBFC-BL" and "Base Layer" do not appear in that instrument at all. A Base Layer NBFC
that assumed the stricter reading applied to it would be refusing itself a charge it is lawfully
entitled to levy; one that crosses into the Middle Layer and does not notice would be levying one it
is not.

## What that means operationally

Two things worth having written down rather than remembered.

**The layer is a fact about the company on a date**, and asset size moves. A company approaching
₹1,000 crore should know which of its rules change on the day it crosses, not discover it at the
next inspection.

**Systems that encode a regulatory test have to encode the layer**, not a constant. A prepayment
rule hard-coded to one answer is correct for exactly one class of lender and silently wrong for the
others — and the failure is invisible, because a charge that should have been levied and was not
produces no error anywhere.
