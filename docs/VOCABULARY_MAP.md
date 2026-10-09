# Vocabulary map — the words each lender type uses for itself

**Built:** 9 October 2026, from `docs/COMPETITOR_MAP.md` plus the Search Console evidence in the
brief. **Companion rule:** *enter in the reader's vocabulary, prove in the regulation that applies to
them.*

**A vocabulary entry is not permission to claim.** The right-hand column is the binding one, and it
was verified by reading `fintrustsuite`, not by reading the existing marketing site.

---

## 1. The regime the product actually knows about

Verified in `fintrustsuite/prisma/schema.prisma:289-296`:

```
enum RegulatoryRegime { NBFC, NBFC_MFI, SECTION_8_MFI }
```

Three values. That is the whole set, and provisioning, module gating, scheme seeding and the
approval policy all branch on it (`src/lib/platform/provision.ts`, `tenant-modules.ts`,
`repos/schemes.ts`, `policy/approval-policy.ts`, `reports/catalogue.ts`).

`STATE_MONEY_LENDER` and `NIDHI` exist **only** on `ProposalEntityType`
(`prisma/schema.prisma:1285-1298`) — the sales-proposal enum — and are referenced in exactly two
files, `src/lib/proposal/catalogue.ts` and `src/lib/validation/proposal.ts`. **They provision
nothing and no lending code branches on them.** The brief's §1.1 is accurate as written; I checked
rather than took it.

## 2. The map

| Lender type | Their words for themselves | Their words for what they need | What Lenviq may say |
|---|---|---|---|
| **NBFC** | NBFC, NBFC-ICC, Base Layer / Middle Layer | NBFC software, LOS, LMS, IRAC, KFS, DNBS returns, COSMOS, provisioning, SMA/NPA | **Everything.** `NBFC` is the default regime and the whole product is built on it |
| **NBFC-MFI** | NBFC-MFI, microfinance institution | microfinance software, JLG, group loan, centre, household income, collateral-free | **Everything, including the regulatory handling.** `NBFC_MFI` is provisioned; see §3 for the exact limits |
| **Section 8 microfinance** | Section 8 company, not-for-profit MFI | microfinance software, SHG, JLG, group loan | **Everything, with one difference the schema itself records:** "Exempt from RBI registration, so no returns" (`schema.prisma:295`). Do not offer them a returns module |
| **Gold lender** | gold loan company, jewel loan | gold loan software, LTV, appraisal, auction, repledge, part-release | **Product capability, yes.** Governed by the gold Directions, which the product implements — and there is a `/gold-loan-software` page already |
| **Nidhi** | Nidhi company, members | Nidhi company software, members, deposits, pigmy | **Nothing. Ruled out and it stays ruled out.** A Nidhi funds itself from members' deposits; Lenviq has no deposit side. Four competitors serve this segment; we are not one of them |
| **Co-operative credit society** | credit co-operative, MACS, credit union | co-operative society software, members, deposits, share capital | **Assess only.** Governed by **state** co-operative acts, not RBI, so none of the compliance proof transfers. finsta and intelligrow hold this segment with named clients |
| **Pawn broker (South)** | pawn broker, girvi, jewel loan | pawn broking software, pawn ticket, repledge, girvi software | **No product page** (ruled out). The *licensing content* in §6.2 is in scope. The market price is ~₹5,000 and the completions say "free download with crack" |
| **State money lender** | money lender, licensed money lender | money lending licence, registers, receipts, interest ceiling | **Content only, and the honest framing is advisory.** The regime is not provisioned and **Lenviq does not produce the state-prescribed registers or returns** |

## 3. Microfinance — what is verified, and one correction to the brief

The brief says the microfinance page "proves itself on the 2022 Directions and the
**50%-of-household-income cap**." The first half is right. The second needs care, because the
product does less than that sentence implies and the page must not imply it either.

**Verified, with the file:**

| Claim | Where it is implemented |
|---|---|
| A group loan cannot be originated for a member with no household income assessment on file | `src/lib/repos/mfi-group-loans.ts:371` — preflight refuses: *"No income recorded — the household income assessment is missing."* |
| An income figure cannot be recorded without an occupation behind it | `addIncome`, noted at `mfi-group-loans.ts:252-256` |
| A credit bureau enquiry, with recorded borrower consent, is required per member | `mfi-group-loans.ts:373-374` — refuses *"No credit bureau enquiry recorded"* and *"The bureau enquiry has no recorded consent"* |
| One sanction approval becomes N loan accounts, with four eyes applied once to the group | `src/lib/repos/mfi-group-loans.ts` — `proposeGroupLoan` → `groupLoanPreflight` → `submitGroupLoan` → `decideGroupLoan` → `executeGroupLoan` → `releaseGroupDisbursements` |
| Each member's loan is an ordinary loan account with its own schedule and scheme snapshot | `tests/mfi-group-loan-origination.test.ts` — *"and what each member got is an ORDINARY loan account"* |
| JLG schemes seeded on provisioning: weekly/50, fortnightly/26, monthly/24, and fixed-instalment variants | `src/lib/platform/mfi-pack.ts:53-91` |
| Centre → group → member hierarchy, with meeting day and officer | `prisma` models `MfiCentre`, `MfiGroup`, `MfiGroupMember` |
| KYC verification is required before disbursement | `mfi-group-loans.ts:350` |

**NOT verified, and therefore not claimable:**

- **The 50% cap is not computed or enforced anywhere.** Searched for it directly: no
  repayment-capacity, FOIR-style or obligation-ratio arithmetic against household income exists in
  `src/lib`. The only mention of the cap is a *comment* explaining why the income figure matters
  (`mfi-group-loans.ts:254-255`). `maxFoir` and `maxDbr` exist on the scheme master
  (`repos/sanction.ts:231`) and are a general underwriting ratio — **not** the Directions' household
  cap, and conflating the two would be the exact dishonesty §1.1 forbids.
- So the page may say: *the assessment is required and origination is refused without it.* It may
  **not** say: *the cap is enforced,* or *the system caps repayments at half of household income.*
- **Centre meetings** exist as a scheduled day on the centre record. Whether attendance is captured
  per meeting — which is what a lender would read "centre meetings" to mean — I did not verify.
  Left out rather than written vaguely.

## 4. Where the words go, mechanically

Per the brief: where a word is theirs, it goes in the title, the H1 and the first paragraph.

- The site today contains **the NBFC row and nothing else**. `JLG`, `SHG`, `group loan`, `household
  income`, `centre` appear nowhere in `src/app` or `content/`.
- The microfinance page therefore opens on **JLG and group loans** and proves on the 2022
  Directions — exactly inverting allcloud, whose microfinance page says "Group Loans" and names no
  regulation at all (`COMPETITOR_MAP.md` §4.1).
- **`/nbfc-software` does not exist as a page.** Five competitors have one at that slug. Recorded as
  the most obvious missing door; not built tonight, because it is a positioning decision rather than
  one of the brief's sections.
