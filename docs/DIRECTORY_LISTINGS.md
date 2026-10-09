# Directory listings — GoodFirms, Capterra, SoftwareSuggest

**Prepared:** 9 October 2026. **Status: ready to submit, not submitted.** §4 says why.

---

## 1. A correction to `COMPETITIVE_PLAN.md` before anything else

The plan's §3 argued for directory listings on **SEO** grounds — the head term is held by these
sites, so be *in* them rather than try to outrank them.

Checking the terms, that rationale is **substantially weaker than I wrote**:

> **A free Capterra profile does not include a working link to your website.** Gartner's own
> material describes the free tier as a product profile with vendor-portal access; third-party
> reviews are explicit that unpaid profiles carry no active hyperlink, and that the hyperlink is
> one of the things the paid tier buys.

No link means **no link equity**, which was the whole SEO argument. What a free listing still buys
is real but different: **presence where the buyer is already comparing**. Someone shortlisting from
a Capterra category page sees Lenviq or does not. That is a distribution benefit, not an SEO one,
and it should be argued on its own terms.

`COMPETITIVE_PLAN.md` §3 has been corrected accordingly.

## 2. What each platform actually requires

| | Free listing | Verification | Paid tiers | Notes |
|---|---|---|---|---|
| **Capterra** (Gartner Digital Markets) | **Yes** — profile across Capterra, GetApp and Software Advice | Vendor account, approval before publication | Promote (PPC, ~$2K/mo), Grow (per-lead, ~$10K/mo), Excel (custom) | **No active website hyperlink on the free tier.** See §4 for an ownership question |
| **GoodFirms** | **Could not confirm.** Their directory pages say "some listings may involve fees" | "Thorough review and verification", handled through their support | Not published | A user review reports being listed without permission and unable to self-remove. One account, not a verified fact — but worth knowing before engaging |
| **SoftwareSuggest** | A third-party directory says yes | Not published | One aggregator lists Basic $4,000/6mo, Gold $9,000/6mo, Platinum $15,000/12mo — **single unverified source** | Indian-market focus, which is the one most aligned with this buyer |

## 3. The submission pack — accurate, consistent, ready to paste

Everything below is verified against the site's own constants or a named file in `fintrustsuite`.
**Nothing here is a claim this site does not already stand behind.**

### Company

| Field | Value |
|---|---|
| Product name | **Lenviq** |
| Legal entity | FastLegal Technologies Private Limited |
| CIN | U74999RJ2018PTC060472 |
| Registered office | S-226, Time Square, Central Spine, Vidhyadhar Nagar, Jaipur, Rajasthan 302039 |
| Website | https://lenviq.in |
| Contact | hello@lenviq.in · +91 96641 46595 |
| GSTIN | **Deliberately blank.** It is not in the legal documents and `org-jsonld.tsx` records why. Supply it only if it is confirmed |
| Founded | **Needs Manoj.** Not on the site; do not infer it from the CIN year |
| Employees | **Needs Manoj** |

### Categories to select

In order of fit. Pick the Indian-market ones first on SoftwareSuggest.

1. Loan Management Software / Loan Servicing Software
2. Loan Origination Software
3. Lending Software
4. Microfinance Software *(Indian directories usually carry this; it is a genuine differentiator)*
5. Banking Software — only where nothing closer exists

### Short description (≤ 160 characters, for cards)

> Loan origination, servicing and accounting for Indian NBFCs — IRAC classification, penal charges,
> KFS and the RBI returns, built in rather than configured.

*(157 characters.)*

### Medium description (~300 characters)

> Lenviq is loan origination and loan management software for Indian lenders. Asset classification
> runs in the day-end process, penal charges are charges rather than interest, every loan is governed
> by the scheme snapshot taken at sanction, and the accounting sits under all of it.

### Long description

> Lenviq is loan origination and loan management software for Indian NBFCs, NBFC-MFIs and Section 8
> microfinance companies.
>
> It covers the lifecycle: lead to sanction to disbursement, then servicing, collections, charges
> and closure, with double-entry accounting underneath. Personal, business, vehicle, property, gold
> and cash-credit books run on one engine, and product behaviour binds to the asset class rather
> than to a product name, so a new scheme is configuration rather than a release.
>
> What distinguishes it is that the regulation is the product rather than something configured on
> top. Asset classification is computed in the day-end process for the relevant date and an NPA is
> upgraded only on payment of the entire arrears. Interest accrued on an account that turns is
> reversed to suspense. A penal amount is a charge, not interest, and is not capitalised. Every loan
> is governed by the scheme terms snapshotted at sanction rather than by the live master, so a
> change to a scheme cannot reach a loan already written under it. Group lending is one approval for
> a centre and an ordinary loan account for each member.
>
> Lenviq is software licensed to lenders. The lender of record is the lender; every document the
> system generates carries their own letterhead, CIN and registered office.

### Feature list — each backed by a file

| Feature | Evidence |
|---|---|
| Loan origination — lead to sanction, deviations, maker-checker | `src/lib/repos/applications.ts`, `approval-policy.ts` |
| Day-end IRAC classification and SMA bucketing | `src/lib/lms/dpd.ts`, `src/lib/lms/npa.ts` |
| NPA income reversal to suspense, receipt basis thereafter | `src/lib/repos/npa.ts` |
| Penal charges on receipt basis, non-compounding, not capitalised | `src/lib/lms/charges.ts` |
| Key Facts Statement with APR computation | `src/lib/documents/` |
| Scheme snapshot frozen at sanction | `loan_accounts.scheme_snapshot` |
| Gold: appraisal, ongoing LTV, renewal, part-release, auction, return clock | `src/lib/lms/gold.ts`, `repos/gold-*.ts` |
| Microfinance: centres, groups, JLG proposals, one approval → N accounts | `src/lib/repos/mfi-group-loans.ts` |
| Collections, field app, day-end cash reconciliation | `src/lib/repos/collector.ts` |
| Double-entry accounting, vouchers, GST register | `src/lib/repos/accounting-post.ts` |
| RBI supervisory returns | `src/app/rbi-returns` |
| Credit bureau and CKYC submission | `src/lib/repos/bureau.ts` |
| Multi-tenant, role-based access, TOTP on sensitive roles | `src/lib/rbac/permissions.ts` |

### Screenshots available

From `public/shots/` — already published, captured from the running product, demo data only:
`dashboard`, `loan-accounts`, `loan-account`, `applications`, `application-record`, `parties`,
`reports`, `rbi-returns`, `accounting`, `schemes`, `approvals-inbox`, `mfi-group-proposal`,
`mfi-group-executed`, and five field-app screens.

### What must NOT go in any of these forms

BRAND-1 §5.4, and it applies off-site as much as on:

- **No customer count, no client logos, no testimonials.** Several competitors fill these fields
  with unverifiable numbers; an empty field beats a fabricated one.
- **No uptime percentage** unless it is measured and can be produced.
- **No certifications.** Competitors list SOC 2 and ISO 27001. Claim neither without a certificate.
- **No roadmap described as shipped.**

### Fields that need Manoj

Pricing model and figures, founding year, employee count, free-trial terms, support hours, any
certification, and target-customer-size bands.

## 4. Why this is prepared rather than submitted

Three reasons, and the first two are practical rather than judgements:

1. **Every one requires a vendor account with email verification**, and the verification mail goes
   to an inbox I cannot read.
2. **Submitting means accepting terms of service as FastLegal Technologies Private Limited** — a
   commercial agreement on the company's behalf. The brief reserves commercial terms to Manoj, and
   this is one.
3. **The commercial shape is unsettled.** SoftwareSuggest's paid tiers are reported at $4,000–$15,000
   from a single unverified aggregator; GoodFirms does not publish whether a free listing exists at
   all. Neither should be engaged without knowing what is being agreed to.

**And one thing to check before signing up anywhere:** a review dated **7 October 2026** reports
that **G2 acquired Capterra, GetApp and Software Advice from Gartner**, and that the vendor flow now
runs through G2 rather than Gartner Digital Markets. Gartner's own signup page still presents the
free listing. I could not verify the acquisition from an authoritative source. **Confirm which
portal and whose terms apply before creating an account** — this is exactly the kind of thing that
is tedious to unwind afterwards.

## 5. Recommended order

1. **SoftwareSuggest first.** Indian-market, and the buyer this site converts is Indian.
2. **Capterra second**, on the free tier, understanding it carries no website hyperlink. Resolve the
   G2/Gartner question first.
3. **GoodFirms last**, and only after asking them directly whether a free listing exists and how a
   listing is removed. The one user account of being listed without permission and unable to
   self-remove is worth a question before engaging, not after.
