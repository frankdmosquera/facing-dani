import type { NextConfig } from "next";

import { defaultLocale, routes } from "./lib/locale";

/**
 * English is served from the root while still living under the [locale]
 * segment, so every page exists once rather than twice.
 *
 * The rewrites are written out one route at a time from the manifest in
 * lib/locale.ts rather than as a catch-all with a negative lookahead. A
 * catch-all here runs before the filesystem and would have to exclude _next,
 * static files and /es by regex, which is exactly the kind of rule that looks
 * right and quietly swallows an asset. An explicit list cannot.
 *
 * The redirects exist so /en/... is never a second URL for the same page.
 * Redirects run before rewrites, and a rewrite is internal, so /en -> / -> (en)
 * resolves without looping.
 */
const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: `/${defaultLocale}`, destination: "/", permanent: true },
      {
        source: `/${defaultLocale}/:path*`,
        destination: "/:path*",
        permanent: true,
      },
    ];
  },

  async rewrites() {
    return {
      beforeFiles: routes.map((route) => ({
        source: route,
        destination: route === "/" ? `/${defaultLocale}` : `/${defaultLocale}${route}`,
      })),
      afterFiles: [],
      fallback: [],
    };
  },
};

export default nextConfig;
