import type { NextConfig } from "next";

import { defaultLocale } from "./lib/locale";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // /en is never a second URL for a page. Redirects run before proxy.ts, so its /en rewrite cannot loop.
      { source: `/${defaultLocale}`, destination: "/", permanent: true },
      {
        source: `/${defaultLocale}/:path*`,
        destination: "/:path*",
        permanent: true,
      },
    ];
  },

  // English is served from the root by proxy.ts, not by rewrites here.
};

export default nextConfig;
