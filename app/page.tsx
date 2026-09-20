import { siteConfig } from "@/data/siteConfig";

/**
 * Placeholder. Feature 1 builds the frame; feature 3 builds the home page that
 * goes inside it. This exists so the shell has something to frame and so
 * `#main` is a real target for the skip link.
 */
export default function Home() {
  return (
    <main id="main" className="mx-auto w-full max-w-[var(--site)] px-[var(--gutter)] py-24">
      <h1 className="text-[clamp(40px,11vw,74px)]">
        {siteConfig.business.wordmark}
        <span className="text-nails">{siteConfig.business.wordmarkAccent}</span>
      </h1>
      <p className="mt-4 max-w-[46ch] text-base text-ink-muted">
        {siteConfig.business.blurb}
      </p>
    </main>
  );
}
