import type { Metadata } from "next";
import { Inter, Unbounded } from "next/font/google";

import { SiteFooter } from "@/components/shell/SiteFooter";
import { SiteHeader } from "@/components/shell/SiteHeader";
import { Ticker } from "@/components/shell/Ticker";
import { siteConfig } from "@/data/siteConfig";

import "./globals.css";

/**
 * Unbounded is geometric and wide, confident at size, round enough to stay
 * friendly. Anton read as a gym poster and Fredoka as a cereal box.
 */
const unbounded = Unbounded({
  variable: "--font-unbounded",
  subsets: ["latin"],
  weight: ["800"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: siteConfig.meta.titleDefault,
    template: siteConfig.meta.titleTemplate,
  },
  description: siteConfig.meta.description,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${unbounded.variable} ${inter.variable} h-full`}
    >
      <body className="flex min-h-full flex-col">
        <a
          href="#main"
          className="sr-only rounded-lg bg-surface px-4 py-2 text-ink focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-60 focus:outline-2 focus:outline-offset-2 focus:outline-ring"
        >
          Skip to content
        </a>
        <Ticker />
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
