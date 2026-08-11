import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

/**
 * The site's guards, and nothing else.
 *
 * These tests read source and built output as text — no database, no request context, no server.
 * The product's vitest config carries a setup file for all of that; carrying it across would have
 * meant importing infrastructure this repository deliberately does not have.
 */
export default defineConfig({
  resolve: {
    alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) },
  },
  test: {
    environment: "node",
    globals: true,
    include: ["tests/**/*.test.ts"],
  },
});
