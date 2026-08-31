/**
 * A small markdown renderer for post bodies.
 *
 * Deliberately not a dependency. The posts are written in this repo by one author, the subset of
 * markdown they use is known, and a parser plus a sanitiser plus their transitive tree is a lot of
 * supply chain for headings, paragraphs, lists and links.
 *
 * HTML in a post body is ESCAPED, not passed through — the output goes into
 * `dangerouslySetInnerHTML`, so anything that reaches it unescaped is an injection waiting for the
 * day somebody pastes something into a draft.
 */
const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/** Inline: `code`, **bold**, *italic*, [text](href). Applied AFTER escaping. */
function inline(s: string): string {
  return esc(s)
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/(^|[^*])\*([^*\n]+)\*/g, "$1<em>$2</em>")
    .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_m, text, href) =>
      // Only http(s) and site-relative links. A `javascript:` href in a post body is the one thing
      // this renderer must not emit.
      /^(https?:\/\/|\/)/.test(href) ? `<a href="${href}">${text}</a>` : `${text}`,
    );
}

/**
 * A stable, readable anchor from a heading's own words.
 *
 * Derived rather than stored, so the id and the heading cannot drift apart — and the same function
 * builds the contents list, so a link there always points at a heading that exists.
 */
export function headingId(text: string): string {
  return text
    .replace(/[*_`]/g, "")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 60);
}

/** The `## headings` of a document, for a contents list. */
export function outline(src: string): { text: string; id: string }[] {
  return src
    .split("\n")
    .map((l) => /^##\s+(.*)$/.exec(l.trim()))
    .filter((m): m is RegExpExecArray => !!m)
    .map((m) => ({ text: m[1].replace(/[*_`]/g, ""), id: headingId(m[1]) }));
}

export function renderMarkdown(src: string): string {
  const out: string[] = [];
  const lines = src.split("\n");
  let list: "ul" | "ol" | null = null;

  const closeList = () => {
    if (list) { out.push(`</${list}>`); list = null; }
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (!line.trim()) { closeList(); continue; }

    /*
     * A fenced block, held exactly as written.
     *
     * Added for worked arithmetic — a provisioning calculation laid out over four aligned lines is
     * the clearest way to show it, and before this the renderer had no block form at all: an
     * indented block silently became one run-on paragraph, so a worked example read as
     * "₹28,00,000 × 50% = ₹14,00,000 ₹12,00,000 × 100% = ₹12,00,000 ₹26,00,000". Wrong on a page
     * whose whole point is the arithmetic.
     *
     * Everything inside is escaped and nothing in it is parsed, including the fence's own
     * info string, which is read but not emitted.
     */
    /*
     * A pipe table.
     *
     * A header row, a `| --- | --- |` separator, then body rows until a blank line. Added because
     * the restructured provisioning post needs six of them — a timeline, what the layer changes,
     * when security counts — and without a parser they render as a wall of pipe characters in one
     * paragraph. The stylesheet had `.prose-lenviq table` rules all along, written for the JSX
     * tables on the tool pages, which made it look supported when it never was.
     *
     * Wrapped in a scroller: a six-column table has to move sideways inside its own box on a
     * phone rather than push the article off the screen.
     */
    if (/^\s*\|/.test(line) && /^\s*\|[\s:|-]+\|\s*$/.test(lines[i + 1] ?? "")) {
      closeList();
      const cells = (row: string) =>
        row.trim().replace(/^\||\|$/g, "").split("|").map((c) => c.trim());
      const head = cells(line);
      i += 2;
      const body: string[][] = [];
      while (i < lines.length && /^\s*\|/.test(lines[i])) body.push(cells(lines[i++]));
      i--;
      out.push(
        '<div class="table-scroll"><table><thead><tr>' +
          head.map((c) => `<th>${inline(c)}</th>`).join("") +
          "</tr></thead><tbody>" +
          body
            .map((r) => "<tr>" + r.map((c) => `<td>${inline(c)}</td>`).join("") + "</tr>")
            .join("") +
          "</tbody></table></div>",
      );
      continue;
    }

    if (/^```/.test(line)) {
      closeList();
      const body: string[] = [];
      i++;
      while (i < lines.length && !/^```/.test(lines[i])) body.push(lines[i++]);
      out.push(`<pre><code>${esc(body.join("\n"))}</code></pre>`);
      continue;
    }

    if (/^---+$/.test(line.trim())) { closeList(); out.push("<hr>"); continue; }

    const h = /^(#{2,4})\s+(.*)$/.exec(line);
    if (h) {
      closeList();
      const n = h[1].length;
      // An `id` on every heading, so a contents list can link to it and so a reader can share a
      // link to the part of a two-thousand-word post they were actually reading.
      out.push(`<h${n} id="${headingId(h[2])}">${inline(h[2])}</h${n}>`);
      continue;
    }

    const q = /^>\s?(.*)$/.exec(line);
    if (q) { closeList(); out.push(`<blockquote><p>${inline(q[1])}</p></blockquote>`); continue; }

    const ul = /^[-*]\s+(.*)$/.exec(line);
    if (ul) {
      if (list !== "ul") { closeList(); out.push("<ul>"); list = "ul"; }
      out.push(`<li>${inline(ul[1])}</li>`);
      continue;
    }

    const ol = /^\d+\.\s+(.*)$/.exec(line);
    if (ol) {
      if (list !== "ol") { closeList(); out.push("<ol>"); list = "ol"; }
      out.push(`<li>${inline(ol[1])}</li>`);
      continue;
    }

    // A paragraph runs until a blank line, so a wrapped sentence stays one paragraph.
    closeList();
    const para = [line];
    while (i + 1 < lines.length && lines[i + 1].trim() && !/^(#{2,4}\s|[-*]\s|\d+\.\s|>|---+$)/.test(lines[i + 1])) {
      para.push(lines[++i]);
    }
    out.push(`<p>${inline(para.join(" "))}</p>`);
  }
  closeList();
  return out.join("\n");
}

/**
 * Split rendered HTML at a heading near its middle, so one card can be placed in the reading column
 * without a hand-placed marker in every article.
 *
 * The split point is the `<h2>` closest to the halfway mark by character count, never the first and
 * never the last — a card immediately under the introduction interrupts before the reader has been
 * given anything, and one just above the closing block is two asks in a row.
 *
 * Returns `null` when the piece is too short to carry an interruption at all, which is the honest
 * answer for a 600-word note: the end of it is already in view.
 */
export function splitAtMidHeading(html: string, minHeadings = 6): [string, string] | null {
  const positions: number[] = [];
  const re = /<h2\b/gi;
  let m: RegExpExecArray | null;
  while ((m = re.exec(html)) !== null) positions.push(m.index);
  if (positions.length < minHeadings) return null;

  const candidates = positions.slice(1, -1);
  if (candidates.length === 0) return null;

  const target = html.length / 2;
  const at = candidates.reduce((best, p) =>
    Math.abs(p - target) < Math.abs(best - target) ? p : best,
  );
  return [html.slice(0, at), html.slice(at)];
}
