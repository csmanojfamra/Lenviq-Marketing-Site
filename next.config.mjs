/** @type {import('next').NextConfig} */
const nextConfig = {
  /**
   * Static export. The site has no server, by design: it must not ship with the product's
   * authentication or database access, it deploys to a different host, and a folder of files is
   * both faster to serve and cheaper than a running process for content that changes weekly.
   */
  output: "export",
  /** A directory per route, so any static host serves it without rewrite rules. */
  trailingSlash: true,
  images: {
    /** No image optimisation server exists in an export; sizes are declared at the call site. */
    unoptimized: true,
  },
};

export default nextConfig;
