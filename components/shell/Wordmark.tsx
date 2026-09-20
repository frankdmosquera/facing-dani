import Link from "next/link";

import { siteConfig } from "@/data/siteConfig";

/**
 * The header and footer mark. Deliberately not the business name: the mark is
 * tight, the name is what has to match the Google Business Profile exactly.
 */
export function Wordmark({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={`font-display text-[19px] font-extrabold tracking-[-0.04em] text-ink ${className ?? ""}`}
    >
      {siteConfig.business.wordmark}
      <span className="text-nails">{siteConfig.business.wordmarkAccent}</span>
      <span className="sr-only"> - {siteConfig.business.name}, home</span>
    </Link>
  );
}
