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

## Not indexable yet — deliberately

Every page carries `noindex, nofollow` and `robots.txt` is `Disallow: /`. CI **fails** if a build
loses either.

It comes off in its own deliberate commit, once these have been read:

1. **Privacy Policy and Terms** — generated, marked draft, never read.
2. **The claims list** — every feature claim and what backs it.
3. **The Compliance page** — the one a prospect checks line by line.
4. **Contact details and the demo form** — a number appears only if it is real and monitored, and
   the form must deliver rather than discard.

When it opens, `noindex` comes off **first** and crawling is allowed in the same change. Removing
`Disallow: /` while leaving `noindex` — or the reverse — leaves URLs indexable but unreadable, the
worst of both. The privacy and terms exclusions stay regardless; they are listed separately in
`src/app/robots.ts` precisely so that lifting the gate does not take them with it.

## Deployment

aaPanel + nginx serves the static export at `lenviq.in` and `www.lenviq.in`. `app.lenviq.in` and
`admin.lenviq.in` are the product and are served separately — nothing here touches them.
