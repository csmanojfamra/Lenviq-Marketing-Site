# Screenshots a page wants and does not have

**Why this file exists.** `ProductSpec.shots` is optional, and the reason is a refusal rather than a
convenience: a page ships without a screenshot when no *honest* one exists for it. This records
which, so the gap is a queue rather than an omission nobody remembers.

---

## `/microfinance-software/` — two wanted, zero available

The capture set (`public/shots/shots.json`, 23 shots) contains no group-loan or JLG screen. The two
nearest candidates were both rejected, and the reasons are the point:

| Candidate | Why not |
|---|---|
| `approvals-inbox` (`/approvals-inbox`) | Shows **Loan Against Property** applications of ₹66–97 lakh. On a microfinance page that is the wrong asset class in the illustration, which is exactly the doorway pattern `src/lib/products/types.ts` warns about — and a microfinance lender would notice in a second |
| `field-collect` (`/mobile/collections/{id}`) | Operationally right — a field collection screen is what an officer uses at a centre meeting — but it carries a borrower name, a ward-level address and **a phone number** (`9863627094`), plus a `UDR/` loan-number prefix. See the note below; this needs a decision before it is reused anywhere, let alone extended to a new page |

**The two shots now exist as definitions, and the capture is one command away.**

`scripts/marketing-shots.mjs` in the product repo gained them (commit `008c386`), plus the
`--only name,name` filter that lets the set reach a second tenant at all — the microfinance screens
live in `Udaan Jan Vikas Foundation` and the script's named SUBJECTS are Ridgeline's loan and
application numbers, so without a filter it dies on a subject check for shots it was never going to
take.

| Shot | Route | The claim it carries |
|---|---|---|
| `mfi-group-proposal` | `/microfinance/group-loans/{PENDING proposal}` | every member checked and every failure **named**, before a checker sees the list |
| `mfi-group-executed` | `/microfinance/group-loans/{EXECUTED proposal}` | one approval becoming N ordinary loan accounts |

Subjects are picked by **status, oldest-first**, so the same rows are captured every run and a diff
between two shoots means the UI changed rather than the subject did. `--audit` confirms both resolve.

**What is still missing is a credential, not code.** Every user in that tenant either has TOTP
(`sec8.admin`) or a password that is neither of the two the tooling knows (`sec8.manager`,
`newstaff-…`). Creating a demo login for it was refused in this session as a security-weakening
action, which is the right refusal — it is Manoj's to make. Once a non-TOTP login exists:

```
SHOTS_TENANT="Udaan Jan Vikas" SHOTS_USER=<that user> SHOTS_PASSWORD=... \
  npx tsx scripts/marketing-shots.mjs --only mfi-group-proposal,mfi-group-executed \
  --out ../Lenviq-Marketing-Site/public/shots
```

Then add the two entries to `shots.json` and set `MICROFINANCE.shots` in
`src/lib/products/microfinance.ts`.

## The two concerns I raised, both now resolved by checking

**1. `UDR` is not a tenant. It is a branch code — Udaipur**, seeded at `prisma/seed.ts:233`
alongside `JAI` for Jaipur. No live tenant is named in any screenshot, and nothing needs
recapturing on that ground.

**2. The phone number is generated, not leaked.** `9863627094` belongs to "Pankaj Sharma", created
by `scripts/seed-pilot-book.mjs`, whose names come from a fixed list and whose mobiles are random:
`` `98${between(10000000, 99999999)}` ``. It is not a borrower's number and there is no data-protection
incident here.

**One real point survives, and it is smaller and different from what I first said.** A *randomly
generated* number in the 98xxxxxxxx range is not an unassignable number — it is very likely to be
somebody's live subscription. Publishing it on a marketing site means a stranger could take calls
meant for a demo. The fix is a reserved range rather than a sweep: India's 99999xxxxx-style ranges,
or the fictional-number convention, would make the generator safe by construction. A decision for
Manoj, and a small one.

**And the recipe is recorded after all.** I said `shots.json` keeps only the route and that no shot
could be reproduced exactly. Wrong: `marketing-shots.mjs` names the **subject record** for every
shot — `--audit` prints them, e.g. `loan UDR/LN/2025-26/000021 — Pankaj Sharma`,
`gold JAI/LN/2025-26/000003` — which is the recipe the brief asks for. It lives in the script rather
than in `shots.json`, which is arguably the better place, since that is also what reruns it.
