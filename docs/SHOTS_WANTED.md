# Screenshots a page wants and does not have

**Status, 9 October 2026: the microfinance page now has both of its shots.** This file stays as the
record of why they were missing, what was rejected and why, and what the capture needed — because
the second half of that is the part that will be needed again.

---

## `/microfinance-software/` — RESOLVED

Captured from the running product by

```
SHOTS_TENANT="Udaan Jan Vikas" SHOTS_USER=shots@udaan.demo.example \
SHOTS_APPROVER=shots@udaan.demo.example SHOTS_AGENT=shots@udaan.demo.example \
  npx tsx scripts/marketing-shots.mjs --only mfi-group-proposal,mfi-group-executed \
  --out ../Lenviq-Marketing-Site/public/shots
```

| Shot | Subject | The claim it carries |
|---|---|---|
| `mfi-group-proposal` | G-102 Roshni Samooh, awaiting approval | one screen for the whole centre; the Loan account column still empty |
| `mfi-group-executed` | G-101 Sakhi Samooh, disbursed | five separate open loan accounts from one approval |

**Three things the capture needed, none of them obvious:**

1. **`--only`**, because these screens live in a different tenant and the script's named SUBJECTS
   are Ridgeline's loan and application numbers. Added with the subject guard scoped rather than
   weakened.
2. **A login.** Every existing user in that tenant has TOTP or a password the tooling does not
   know. `shots@udaan.demo.example` was created for it — create-only, so no existing account's TOTP
   or password was touched — with roles copied from `sec8.manager`.
3. **`SHOTS_APPROVER` and `SHOTS_AGENT` set too.** The script opens a browser context per role and
   signs each in; left at their defaults they point at Ridgeline users who do not exist in this
   tenant, and the run dies after the subject checks pass.

**And the first capture was thrown away**, which is the part worth remembering. The script's own
PAN/Aadhaar/mobile scan printed ten member mobiles — `8058427120`, `9055961790` and the like —
randomly generated from live, allocated ranges. The demo parties were moved onto the deterministic
`98000…` series first and the shots retaken. **That scan is the control that caught it**, and it
only works because somebody reads the output.

## What was rejected, and why it still matters

| Candidate | Why not |
|---|---|
| `approvals-inbox` | Loan Against Property files of Rs 66–97 lakh. Wrong asset class on a microfinance page — the doorway pattern `src/lib/products/types.ts` warns about |
| `field-collect` | Operationally right, different claim — and it carries a borrower name, a ward-level address and a mobile |

`ProductSpec.shots` stays optional. A page ships without one when no honest shot exists, and that
remains the rule rather than an excuse this one needed.

## The two concerns I raised, both resolved by checking

**1. `UDR` is not a tenant. It is a branch code — Udaipur**, seeded at `prisma/seed.ts:233`
alongside `JAI` for Jaipur. No live tenant is named in any screenshot.

**2. The published phone number was generated, not leaked.** `9863627094` belongs to "Pankaj
Sharma", created by `scripts/seed-pilot-book.mjs`, whose mobiles were random. Not a borrower's
number.

**What survived, and is now fixed at the source:** a randomly generated 98xxxxxxxx is very likely
somebody's live subscription. `seed-pilot-book.mjs` now issues `98000` plus a counter
(fintrustsuite `008c386`), and the microfinance tenant's existing parties were moved onto the same
series before capture. **`field-collect` still shows the old number** — it changes on a recapture of
that shot, which is a one-command job against the Ridgeline tenant.

**And the recipe is recorded after all.** `marketing-shots.mjs` names the subject record for every
shot; `--audit` prints them. That is the recipe, and it lives with the thing that reruns it.
