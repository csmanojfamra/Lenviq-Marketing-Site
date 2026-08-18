# Lenviq Marketing Site

The public site at **lenviq.in**. Standalone: its own brand sources, its own guards, and no product
code — it ships no authentication and no database access, by design.

```bash
npm ci
npm run build        # → out/   (static export, no server)
npm run dev          # → localhost:3100
npm test             # the guards
```

`npm run build` from a fresh clone is all it takes. `prebuild` syncs the brand assets out of
`brand/` into `public/`, so nothing outside this checkout is needed.

## Running against a local product

The signup form posts cross-origin to the product's API, because this site is a static export with
no server of its own. In production that is `app.lenviq.in`, resolved from `SITE.appUrl` — the one
place a domain is written down.

Locally the site is on `:3100` and the product on `:3000`, which are different origins. Point the
form at the local product:

```bash
# .env.development.local  (gitignored)
NEXT_PUBLIC_SIGNUP_API=http://localhost:3000/api/public/signup
```

The product allows a `localhost` origin only outside production (`src/lib/api/public-cors.ts`), so
this works locally and cannot be used to reach the live API from anywhere else. **Without it the
local form posts at production**, which is not what anybody testing wants — and it fails visibly
rather than quietly, because production's CORS list does not include localhost.

## What is generated and what is source

`brand/` is the source. `public/` and `src/styles/*.generated.css` are **copies**, made at build
time and gitignored — Next can only serve what sits in `public/`, and a second set of files kept by
hand is how a favicon ends up a revision behind a logo with nobody noticing.

To change the logo, the colours or the fonts, edit `brand/` and run `node scripts/build-brand.mjs`
(needs `sharp` and a headless browser for the OG image) or `python3 scripts/subset-fonts.py` for the
font subsets. Day to day neither is needed: the generated outputs in `brand/public` and
`brand/fonts` are committed.

## The guards, and why they matter more than the tests usually do

`npm test` checks what the site **says**, not just that it builds:

- **No draft ships.** Every post declares `draft:` explicitly — a missing line would default to
  published, which is the wrong default for regulatory writing.
- **Every regulatory claim carries a source that can be opened.** Two posts were wrong at draft
  stage: a circular cited by the wrong number, and penal-charge dates that a later circular had
  extended. A citation nobody can click is a citation nobody checks.
- **Nothing is claimed that cannot be checked** — no counters, no adoption figures, no uptime
  numbers, no testimonials.
- **The domain is written down once**, and there is no `.com` anywhere.

One wrong regulatory claim published under a practising CA and CS's company name costs more
credibility than five correct posts earn. That is what these are for.

## Indexable — except the two legal drafts

The site-wide gate came off on 11 August 2026. **Privacy and Terms are still excluded**, because
they are still the generated drafts and say so on the page. Three independent mechanisms hold them
out, and CI fails if any one of them slips:

1. `robots: { index: false }` on each page
2. `Disallow:` for both in `robots.ts`
3. Absent from the sitemap

When the reviewed versions land, all three come off together — that is the whole change.

A note on the ordering, because it is the opposite of intuitive: the `noindex` was lifted and
crawling allowed in **one** change. A crawler that obeys `Disallow: /` never fetches the page and so
never reads the `noindex` on it — lifting one without the other leaves URLs indexable but
unreadable, which is worse than either state alone.

## Deployment

aaPanel + nginx serves the static export at `lenviq.in` and `www.lenviq.in`. `app.lenviq.in` and
`admin.lenviq.in` are the product and are served separately — nothing here touches them.
