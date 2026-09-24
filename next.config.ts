import type { NextConfig } from "next";

import { defaultLocale, routes } from "./lib/locale";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // /en is never a second URL for a page. Redirects run before rewrites, so this cannot loop.
      { source: `/${defaultLocale}`, destination: "/", permanent: true },
      {
        source: `/${defaultLocale}/:path*`,
        destination: "/:path*",
        permanent: true,
      },

      // /about was merged into the home page.
      { source: "/about", destination: "/", permanent: true },
      { source: "/es/about", destination: "/es", permanent: true },
    ];
  },

  async rewrites() {
    return {
      // Serves English from the root. One rule per route, not a catch-all that could swallow /_next or /es.
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
