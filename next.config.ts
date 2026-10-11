import type { NextConfig } from "next";

import { defaultLocale } from "./lib/locale";

const nextConfig: NextConfig = {
  // Without this, a phone on the Wi-Fi address gets the HTML but no scripts, so nothing on the page responds.
  allowedDevOrigins: ["10.0.0.235"],

  async redirects() {
    return [
      // Pages folded into others on 2026-10-11. The live site was indexed with them, so they stay permanent.
      ...["/nails", "/logos"].flatMap((path) => [
        { source: path, destination: "/", permanent: true },
        { source: `/es${path}`, destination: "/es", permanent: true },
      ]),
      { source: "/about", destination: "/contact", permanent: true },
      { source: "/es/about", destination: "/es/contact", permanent: true },
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
