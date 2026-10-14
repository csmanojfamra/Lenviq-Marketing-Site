/**
 * THE MACHINE-READABLE FILES ARE WRITTEN IN ASCII, AND THAT IS THE FIX.
 *
 * `/llms.txt` and `/llms-full.txt` are route handlers that each return
 * `Content-Type: text/plain; charset=utf-8` from their own code. The site is `output: "export"`, so
 * a route handler is written to disk as a plain file at build time and those Response headers are
 * thrown away with the server that would have sent them. nginx then types the file from its
 * extension, and its default for `.txt` carries no charset.
 *
 * Measured live on 13 October 2026: `content-type: text/plain`, no charset, over bytes that are
 * correct UTF-8 -- forty-six em dashes in `llms.txt` alone. A client with no charset to go on may
 * decode as Latin-1, and every one of them becomes three mojibake characters in the middle of a
 * sentence written for a machine to read.
 *
 * `deploy/nginx-cache.conf` carries a `charset utf-8` directive that fixes it at the header, and it
 * is still the right thing to apply. But that file has never been applied on the host, and a fix
 * that depends on somebody else's config change is not in force -- so these files stop depending on
 * the header at all. **US-ASCII is a subset of UTF-8, Latin-1 and Windows-1252 alike**, so a file
 * with no byte above 0x7F reads identically whatever a client guesses. There is nothing to get
 * wrong.
 *
 * It costs typography in two files written for machines, which is the cheapest thing on the site to
 * spend. The HTML pages are unaffected: they carry `<meta charset>` in their own bytes and keep
 * their em dashes.
 *
 * ## Why this throws instead of passing an unknown character through
 *
 * The table below is every non-ASCII character these files actually contain, and a replacement that
 * means the same thing. Anything else is new -- somebody wrote a character into a page description
 * that this has not been asked about -- and passing it through would reintroduce the exact defect
 * silently, in a file nobody reads with their eyes. So it fails the build and names the character.
 * `tests/site.test.ts` asserts the built files over every byte, which is the other half.
 */
const REPLACEMENTS: Record<string, string> = {
  "\u2014": "--", // em dash: 46 of them in llms.txt, 82 in llms-full.txt: 46 of them in llms.txt, 82 in llms-full.txt
  "\u2013": "-", // en dash
  "\u2018": "'", // curly quotes, either way round
  "\u2019": "'",
  "\u201c": '"',
  "\u201d": '"',
  "\u2026": "...", // ellipsis
  "\u20b9": "Rs ", // the rupee sign, the one of these that carries meaning rather than style
  "\u00a0": " ", // a non-breaking space is a space in a plain-text file
  "\u00b7": "-", // middle dot
  "\u2022": "-", // bullet
  "\u00d7": "x", // multiplication sign
  "\u2192": "->", // arrow
};

/** Fold a plain-text body to US-ASCII, or throw naming the character that has no mapping. */
export function asciiOnly(text: string, what: string): string {
  let out = text;
  for (const [from, to] of Object.entries(REPLACEMENTS)) out = out.split(from).join(to);
  const stray = [...out].find((ch) => ch.codePointAt(0)! > 0x7f);
  if (stray !== undefined) {
    const code = stray.codePointAt(0)!.toString(16).toUpperCase().padStart(4, "0");
    const at = out.indexOf(stray);
    throw new Error(
      `${what}: U+${code} ${JSON.stringify(stray)} has no ASCII mapping -- add one to src/lib/ascii.ts. ` +
        `Context: ${JSON.stringify(out.slice(Math.max(0, at - 60), at + 60))}`,
    );
  }
  return out;
}
