#!/usr/bin/env python3
"""
Subset the two brand faces to what these two applications actually render, and write the CSS.

## The rupee sign is not in anybody's `latin` subset

It lives in `latin-ext`, and the digits it sits next to live in `latin` — no single file published
for either family contains both. Ship `latin` alone and every `₹1,00,000` on every screen falls
back to a system face for that one glyph: a different weight and width welded to the digits, on
every money figure in the product. Ship all of `latin-ext` to fix it and you pay for three hundred
accented characters neither application will ever draw.

So each face ships as **two files with a `unicode-range` between them**: the stock Latin subset for
ASCII, and a hand-cut subset of `latin-ext` holding only the non-ASCII characters this codebase
genuinely renders. The browser fetches the second only when one of those characters is on the page.

## The CSS is generated here too

`unicode-range` and the subset have to agree. Written by hand they agree until somebody adds a
character to one of them — and the failure is silent, because a browser given a range that
overstates its file simply renders nothing for the missing glyph. Both come out of the same list
below.

    python3 scripts/subset-fonts.py
"""
import pathlib
import sys

from fontTools import subset

ROOT = pathlib.Path(__file__).resolve().parent.parent
OUT = ROOT / "brand" / "fonts"
OUT.mkdir(parents=True, exist_ok=True)

# Basic Latin — the alphabet, the digits and ASCII punctuation.
ASCII_CHARS = [chr(c) for c in range(0x20, 0x7F)]

# Everything past ASCII that these applications actually draw. Each is here because something
# renders it. tests/fonts.test.ts asserts this list against the real formatters and UI copy, so a
# character that starts being rendered without being added here fails a test rather than silently
# falling back to a system face.
EXT_CHARS = list(
    "₹"        # money, everywhere in the product
    "–—"       # en and em dash, used throughout the UI copy and the document text
    "‘’“”"     # typographic quotes
    "…"        # ellipsis — truncation, "Loading…"
    "•·"       # bullet separators in list metadata
    "×"        # close affordances, dimension separators
    "§"        # clause references in compliance copy and document text
    "©"        # footer
    "°±"       # degrees, tolerance in reconciliation copy
    "†"        # footnote mark in the document pack
    " "   # non-breaking space — keeps "₹ 1,00,000" from wrapping
)

# Characters Plus Jakarta Sans simply does not contain. Listed so the check below stays
# meaningful: a standing "!!" on every build is noise that gets ignored, and silence would
# hide a real gap.
#
# Two user-visible strings use an arrow — the status transition on the tenant detail page
# and the "ROLE → permission" line on the RBAC console. Both fall back to the system face
# for that one glyph. Arrows are geometric and a single one among Latin text does not read
# as broken; a rupee sign welded to a row of digits does, which is why THAT one was worth
# a second file.
KNOWN_UNSUPPORTED = set("→←≤≥≠‡‑")

FACES = [
    ("Bricolage Grotesque", "bricolage-grotesque", ["700", "800"]),
    ("Plus Jakarta Sans", "plus-jakarta-sans", ["400", "500", "600"]),
]


def unicode_range(chars):
    """`U+20-7e` style ranges, collapsed — exactly the characters in the file and no more."""
    cps = sorted({ord(c) for c in chars})
    out, start, prev = [], cps[0], cps[0]
    for cp in cps[1:] + [None]:
        if cp is not None and cp == prev + 1:
            prev = cp
            continue
        out.append(f"U+{start:X}" if start == prev else f"U+{start:X}-{prev:X}")
        if cp is not None:
            start = prev = cp
    return ", ".join(out)


def supported(path: pathlib.Path, chars):
    """Which of `chars` this file can actually draw."""
    from fontTools.ttLib import TTFont
    f = TTFont(str(path))
    cmap = f.getBestCmap()
    f.close()
    return [c for c in chars if ord(c) in cmap]


def cut(src: pathlib.Path, dest: pathlib.Path, chars):
    if not src.exists():
        sys.exit(f"missing source font: {src}")
    options = subset.Options()
    options.flavor = "woff2"
    # `tnum` and `lnum` are load-bearing: every numeric column in the product is tabular, so
    # dropping the tabular-figures feature would make digits jitter down a column.
    options.layout_features = ["kern", "liga", "calt", "tnum", "lnum"]
    options.desubroutinize = True
    options.hinting = False
    options.notdef_outline = False
    # Keep the name table — the OFL requires the copyright and licence to travel with the file.
    options.name_IDs = ["*"]
    options.name_legacy = True
    options.name_languages = ["*"]
    font = subset.load_font(str(src), options)
    s = subset.Subsetter(options=options)
    s.populate(text="".join(chars))
    s.subset(font)
    subset.save_font(font, str(dest), options)
    font.close()
    return src.stat().st_size, dest.stat().st_size


css = [
    "/*",
    " * Self-hosted brand faces. GENERATED by scripts/subset-fonts.py — do not edit.",
    " *",
    " * No third-party CDN: for a financial product an external font request on every page load is",
    " * a performance cost and a privacy one, and it puts a dependency the tenant never agreed to",
    " * in front of their dashboard.",
    " *",
    " * Two files per weight with a unicode-range between them. The rupee sign is not in anybody's",
    " * `latin` subset and the digits it sits beside are not in `latin-ext`, so the second file is",
    " * fetched only when a page draws one of the characters listed in the subsetter.",
    " *",
    " * `font-display: swap` throughout, with a metric-matched fallback declared alongside each",
    " * family in the token file, so a slow font swap costs no layout shift.",
    " */",
    "",
]
rows, total_before, total_after = [], 0, 0

for family, pkg, weights in FACES:
    for w in weights:
        base = ROOT / "node_modules" / "@fontsource" / pkg / "files"
        latin_src = base / f"{pkg}-latin-{w}-normal.woff2"
        ext_src = base / f"{pkg}-latin-ext-{w}-normal.woff2"

        # Which file holds which character is decided by ASKING the files, not by assuming.
        # Assuming put the em dash and the arrows nowhere: they are in `latin`, an ASCII-only cut
        # dropped them, and `latin-ext` does not carry them either — so they would have fallen back
        # to a system face with nothing to reveal it.
        wanted = ASCII_CHARS + EXT_CHARS
        latin_chars = supported(latin_src, wanted)
        remaining = [c for c in wanted if c not in latin_chars]
        ext_chars = supported(ext_src, remaining)
        missing = [c for c in remaining if c not in ext_chars and c not in KNOWN_UNSUPPORTED]
        if missing:
            # Loud, and fatal. A character neither file can draw is a fallback glyph on a real
            # screen, and the only reason to keep going would be to ship one.
            sys.exit(f"  !! {pkg} {w}: neither subset supplies {' '.join(repr(c) for c in missing)}")

        for tag, srcname, chars in (
            ("latin", latin_src.name, latin_chars),
            ("ext", ext_src.name, ext_chars),
        ):
            dest = OUT / f"{pkg}-{w}-{tag}.woff2"
            before, after = cut(base / srcname, dest, chars)
            total_before += before
            total_after += after
            rows.append((dest.name, before, after))
            css.append(
                f"@font-face {{\n"
                f"  font-family: '{family}';\n"
                f"  font-style: normal;\n"
                f"  font-weight: {w};\n"
                f"  font-display: swap;\n"
                f"  src: url('/fonts/{dest.name}') format('woff2');\n"
                f"  unicode-range: {unicode_range(chars)};\n"
                f"}}\n"
            )

(OUT / "fonts.css").write_text("\n".join(css))

for name, before, after in rows:
    print(f"  {name:<40} {before/1024:6.1f} KB → {after/1024:5.1f} KB")
print(f"  {'TOTAL':<40} {total_before/1024:6.1f} KB → {total_after/1024:5.1f} KB "
      f"({100 - total_after * 100 / total_before:.0f}% smaller)")
