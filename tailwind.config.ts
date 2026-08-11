import type { Config } from "tailwindcss";

/**
 * The site's Tailwind maps onto the SHARED tokens — every colour here is `var(--…)` from
 * `src/styles/tokens.generated.css`, which is a copy of `brand/tokens.css`. No hex values.
 *
 * A landing page in a different palette from the app it sells is the most avoidable branding
 * failure there is, and two hand-maintained copies of a palette is how it happens.
 */
export default {
  content: ["./src/**/*.{ts,tsx,mdx}", "./content/**/*.{md,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-body)"],
        display: ["var(--font-display)"],
      },
      colors: {
        ink: "var(--color-text)",
        muted: "var(--color-muted)",
        line: "var(--color-border)",
        "line-strong": "var(--color-border-strong)",
        card: "var(--color-card)",
        "page-bg": "var(--color-page-bg)",
        subtle: "var(--color-subtle)",
        slate: {
          deep: "var(--color-slate-deep)",
          mid: "var(--color-slate-mid)",
          DEFAULT: "var(--color-sidebar)",
        },
        accent: "var(--color-accent)",
        "accent-tint": "var(--color-accent-tint)",
        cta: {
          DEFAULT: "var(--color-cta)",
          hover: "var(--color-cta-hover)",
          tint: "var(--color-cta-tint)",
          "tint-strong": "var(--color-cta-tint-strong)",
        },
        sand: { DEFAULT: "var(--color-sand)", border: "var(--color-sand-border)" },
        success: "var(--color-success)",
        warning: "var(--color-warning)",
        danger: "var(--color-danger)",
      },
      spacing: {
        s1: "var(--space-1)", s2: "var(--space-2)", s3: "var(--space-3)", s4: "var(--space-4)",
        s5: "var(--space-5)", s6: "var(--space-6)", s7: "var(--space-7)", s8: "var(--space-8)",
        s9: "var(--space-9)",
      },
      borderRadius: { card: "var(--radius-card)", input: "var(--radius-input)", badge: "var(--radius-badge)" },
      boxShadow: { e1: "var(--shadow-1)", e2: "var(--shadow-2)", e3: "var(--shadow-3)" },
      letterSpacing: { display: "var(--tracking-display)", "display-tight": "var(--tracking-display-tight)" },
      lineHeight: { prose: "var(--leading-prose)", ui: "var(--leading-ui)" },
      maxWidth: {
        /** 65–75 characters, the long-form measure the brief asks for. */
        prose: "68ch",
      },
    },
  },
  plugins: [],
} satisfies Config;
