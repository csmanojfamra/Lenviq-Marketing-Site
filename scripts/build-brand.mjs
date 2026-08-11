/**
 * Generate the Lenviq brand asset set from the chosen mark and the self-hosted fonts.
 *
 * ## Why this is a script and not a folder of hand-drawn files
 *
 * The wordmark is "Lenviq" set in Bricolage Grotesque ExtraBold at -0.03em. Drawing that by hand
 * means it drifts from the typeface the site actually uses the first time either changes, and
 * nobody notices because a logo is not something anyone diffs. Here the outlines are pulled from
 * the same woff2 the site loads, so the wordmark cannot disagree with the headline above it.
 *
 * Raster outputs are rendered from the SVGs through Chromium at their real target sizes rather
 * than exported once and scaled, because a 16px favicon that was drawn at 512 and shrunk is the
 * usual reason a favicon is mush.
 *
 *   node scripts/build-brand.mjs
 */
import { mkdirSync, writeFileSync, readFileSync } from "node:fs";
import { join } from "node:path";
import * as fontkit from "fontkit";
import puppeteer from "puppeteer";

const ROOT = process.cwd();
const OUT = join(ROOT, "brand/logo");
mkdirSync(OUT, { recursive: true });

const SLATE = "#1e293b";
const SKY = "#38bdf8";

/**
 * The chosen mark — direction A3, "Ledger" (see brand/README.md for the three directions and why
 * this one). A spine and a base rule form an L; two entry lines sit against it. Drawn on a 32-unit
 * grid with 6-unit strokes, which is what keeps it legible at 16px without a separate drawing.
 */
const markShapes = (structure, accent) => `
  <rect x="6" y="4.5" width="6" height="23" rx="3" fill="${structure}"/>
  <rect x="6" y="21.5" width="20" height="6" rx="3" fill="${structure}"/>
  <rect x="15" y="4.5" width="11" height="6" rx="3" fill="${accent}"/>
  <rect x="15" y="13" width="7" height="6" rx="3" fill="${structure}"/>`;

const markSvg = (structure = SLATE, accent = SKY, size = 32) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="${size}" height="${size}" role="img" aria-label="Lenviq">${markShapes(structure, accent)}
</svg>\n`;

// ---------------------------------------------------------------- wordmark
const FONT = join(ROOT, "node_modules/@fontsource/bricolage-grotesque/files/bricolage-grotesque-latin-800-normal.woff2");
const font = fontkit.openSync(FONT);
const UPM = font.unitsPerEm;
/** -0.03em, the tracking the brief specifies, expressed in font units. */
const TRACKING = -0.03 * UPM;

/**
 * "Lenviq" as outlines, y-flipped into SVG's coordinate space.
 *
 * The box is the typographic cap-height box, not the glyph bounding box: using the ink bounds would
 * make the wordmark's height depend on whether the word happens to contain a descender, so the
 * lockup would shift the day the word changed.
 */
function wordmark(text = "Lenviq") {
  const run = font.layout(text);
  let x = 0;
  const parts = [];
  for (let i = 0; i < run.glyphs.length; i++) {
    const g = run.glyphs[i];
    const p = g.path.translate(x, 0).scale(1, -1); // SVG y grows downward
    if (p.commands.length) parts.push(p.toSVG());
    x += run.positions[i].xAdvance + (i < run.glyphs.length - 1 ? TRACKING : 0);
  }
  const width = x;
  /**
   * Vertical extent from the INK, not from the font's ascent and descent metrics.
   *
   * Using the metrics left the q's tail hanging outside the viewBox: the metric descent is a line
   * the designer drew for the whole typeface, and this word's actual descender sits past it. A
   * logo with a clipped letter is the kind of thing that survives review and then appears on a
   * letterhead.
   */
  const bbox = parts.length ? boundsOf(run, x) : { minY: -font.ascent, maxY: -font.descent };
  return { d: parts.join(" "), width, top: bbox.minY, height: bbox.maxY - bbox.minY };
}

/** Ink bounds of the laid-out run, already flipped into SVG space. */
function boundsOf(run, _advance) {
  let minY = Infinity, maxY = -Infinity, x = 0;
  for (let i = 0; i < run.glyphs.length; i++) {
    const b = run.glyphs[i].path.bbox;
    if (Number.isFinite(b.minY)) { minY = Math.min(minY, -b.maxY); maxY = Math.max(maxY, -b.minY); }
    x += run.positions[i].xAdvance + (i < run.glyphs.length - 1 ? TRACKING : 0);
  }
  return { minY, maxY };
}

const wm = wordmark();
const PAD = 8; // a hair of optical breathing room so no edge sits flush against the viewBox
const wordmarkSvg = (fill = SLATE) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${-PAD} ${Math.round(wm.top - PAD)} ${Math.round(wm.width + PAD * 2)} ${Math.round(wm.height + PAD * 2)}" role="img" aria-label="Lenviq">
  <path d="${wm.d}" fill="${fill}"/>
</svg>\n`;

// ---------------------------------------------------------------- lockups
/**
 * Mark and wordmark together.
 *
 * The mark is set to the wordmark's cap height rather than its full em box, so the two optically
 * align on the baseline instead of the mark floating above a row of lowercase.
 */
function lockupHorizontal(structure = SLATE, accent = SKY) {
  const capH = font.capHeight;
  const markSize = capH * 1.24; // the mark's ink is inset within its 32-unit box
  const gap = capH * 0.42;
  const scale = markSize / 32;
  const totalW = markSize + gap + wm.width;
  const markTop = -capH - (markSize - capH) / 2;
  // Whichever reaches higher and whichever reaches lower — the mark or the word.
  const top = Math.min(markTop, wm.top);
  const bottom = Math.max(markTop + markSize, wm.top + wm.height);
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 ${Math.round(top)} ${Math.round(totalW)} ${Math.round(bottom - top)}" role="img" aria-label="Lenviq">
  <g transform="translate(0 ${markTop.toFixed(1)}) scale(${scale.toFixed(4)})">${markShapes(structure, accent)}
  </g>
  <path transform="translate(${(markSize + gap).toFixed(1)} 0)" d="${wm.d}" fill="${structure}"/>
</svg>\n`;
}

function lockupStacked(structure = SLATE, accent = SKY) {
  const capH = font.capHeight;
  const markSize = wm.width * 0.36;
  const gap = capH * 0.5;
  const scale = markSize / 32;
  // The word is placed with its baseline at markSize + gap + capH; its ink runs from `wm.top`
  // (relative to that baseline) to `wm.top + wm.height`, and the descender is inside that.
  const baseline = markSize + gap + capH;
  const totalH = baseline + (wm.top + wm.height);
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${Math.round(wm.width)} ${Math.round(totalH)}" role="img" aria-label="Lenviq">
  <g transform="translate(${((wm.width - markSize) / 2).toFixed(1)} 0) scale(${scale.toFixed(4)})">${markShapes(structure, accent)}
  </g>
  <path transform="translate(0 ${baseline.toFixed(1)})" d="${wm.d}" fill="${structure}"/>
</svg>\n`;
}

const files = {
  "mark.svg": markSvg(),
  // One colour throughout — for a letterhead, a generated PDF header and an email signature, all
  // three of which a two-tone mark survives and a gradient one does not.
  "mark-mono-dark.svg": markSvg(SLATE, SLATE),
  "mark-mono-light.svg": markSvg("#ffffff", "#ffffff"),
  "wordmark.svg": wordmarkSvg(),
  "wordmark-mono-light.svg": wordmarkSvg("#ffffff"),
  "lockup-horizontal.svg": lockupHorizontal(),
  "lockup-horizontal-mono-dark.svg": lockupHorizontal(SLATE, SLATE),
  "lockup-horizontal-mono-light.svg": lockupHorizontal("#ffffff", "#ffffff"),
  "lockup-stacked.svg": lockupStacked(),
};
for (const [name, body] of Object.entries(files)) writeFileSync(join(OUT, name), body);

// ---------------------------------------------------------------- rasters
const browser = await puppeteer.launch({ headless: "new" });

/** Render an SVG at exactly `size` device pixels — not drawn large and shrunk. */
async function png(svg, size, { pad = 0, bg = "transparent", radius = 0 } = {}) {
  const page = await browser.newPage();
  await page.setViewport({ width: size, height: size, deviceScaleFactor: 1 });
  const inner = size - pad * 2;
  await page.setContent(
    `<body style="margin:0;width:${size}px;height:${size}px;background:${bg};border-radius:${radius}px;overflow:hidden">
       <div style="position:absolute;left:${pad}px;top:${pad}px;width:${inner}px;height:${inner}px">
         ${svg.replace(/width="\d+" height="\d+"/, `width="${inner}" height="${inner}"`)}
       </div></body>`,
    { waitUntil: "networkidle0" },
  );
  const buf = await page.screenshot({ omitBackground: bg === "transparent", type: "png" });
  await page.close();
  return Buffer.from(buf);
}

const PUB = join(ROOT, "brand/public");
mkdirSync(PUB, { recursive: true });

writeFileSync(join(PUB, "favicon.svg"), markSvg());
// Apple wants an opaque icon with no transparency; iOS masks the corners itself.
writeFileSync(join(PUB, "apple-touch-icon.png"), await png(markSvg("#ffffff", SKY), 180, { pad: 22, bg: SLATE }));
writeFileSync(join(PUB, "icon-192.png"), await png(markSvg(), 192, { pad: 16 }));
writeFileSync(join(PUB, "icon-512.png"), await png(markSvg(), 512, { pad: 44 }));

/**
 * `favicon.ico`, PNG-in-ICO, at the three sizes a browser or a Windows shortcut actually asks for.
 *
 * Each size is RENDERED at that size. The 16px entry is the one that matters and the one that
 * would be mush if a 48px drawing were resampled down to it.
 */
const icoSizes = [16, 32, 48];
const icoPngs = [];
for (const s of icoSizes) icoPngs.push(await png(markSvg(), s));
{
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: icon
  header.writeUInt16LE(icoSizes.length, 4);
  let offset = 6 + 16 * icoSizes.length;
  const dir = [];
  for (let i = 0; i < icoSizes.length; i++) {
    const e = Buffer.alloc(16);
    e.writeUInt8(icoSizes[i] === 256 ? 0 : icoSizes[i], 0); // width
    e.writeUInt8(icoSizes[i] === 256 ? 0 : icoSizes[i], 1); // height
    e.writeUInt8(0, 2); // palette
    e.writeUInt8(0, 3); // reserved
    e.writeUInt16LE(1, 4); // colour planes
    e.writeUInt16LE(32, 6); // bits per pixel
    e.writeUInt32LE(icoPngs[i].length, 8);
    e.writeUInt32LE(offset, 12);
    offset += icoPngs[i].length;
    dir.push(e);
  }
  writeFileSync(join(PUB, "favicon.ico"), Buffer.concat([header, ...dir, ...icoPngs]));
}

/**
 * Open Graph, 1200×630. The wordmark and one line of descriptor — no screenshot, because an OG
 * image is shown at postage-stamp size in a chat client and a shrunk dashboard is grey noise.
 */
{
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 1 });
  const jakarta = readFileSync(join(ROOT, "node_modules/@fontsource/plus-jakarta-sans/files/plus-jakarta-sans-latin-500-normal.woff2")).toString("base64");
  await page.setContent(
    `<style>
       @font-face{font-family:'PJS';src:url(data:font/woff2;base64,${jakarta}) format('woff2');font-weight:500}
       body{margin:0;width:1200px;height:630px;background:${SLATE};display:flex;flex-direction:column;
            justify-content:center;padding:0 96px;box-sizing:border-box;font-family:'PJS',system-ui}
     </style>
     <body>
       <div style="width:640px">${files["lockup-horizontal-mono-light.svg"]}</div>
       <p style="color:#cbd5e1;font-size:34px;line-height:1.5;margin:44px 0 0;max-width:900px">
         Lending platform for Indian NBFCs — origination, servicing, accounting and RBI reporting.
       </p>
       <div style="position:absolute;left:0;right:0;bottom:0;height:8px;background:${SKY}"></div>
     </body>`,
    { waitUntil: "networkidle0" },
  );
  writeFileSync(join(PUB, "og.png"), Buffer.from(await page.screenshot({ type: "png" })));
  await page.close();
}

await browser.close();

writeFileSync(
  join(PUB, "site.webmanifest"),
  JSON.stringify(
    {
      name: "Lenviq",
      short_name: "Lenviq",
      description: "Lending platform for Indian NBFCs.",
      icons: [
        { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
        { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
      ],
      theme_color: SLATE,
      background_color: "#f8fafc",
      display: "standalone",
      start_url: "/",
    },
    null,
    2,
  ) + "\n",
);

console.log("brand assets written to brand/logo and brand/public");
