import { siteWideFaq } from "@/data/faq";
import type { Dictionary } from "@/dictionaries/en";

/**
 * FAQPage structured data, built from the same data and dictionary the visible
 * list renders from. One source, two outputs: the markup and the schema cannot
 * disagree, which is the usual way structured data goes stale.
 */
export function faqPageSchema(t: Dictionary) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: siteWideFaq().map((item) => ({
      "@type": "Question",
      name: t.faq[item.key].q,
      acceptedAnswer: {
        "@type": "Answer",
        text: t.faq[item.key].a,
      },
    })),
  };
}

/**
 * Serialise for a `<script type="application/ld+json">`.
 *
 * `<` is escaped because a `</script>` sequence inside the JSON would end the
 * tag early and drop the rest of the page into the document. Nothing in these
 * dictionaries contains one today, but the escape costs nothing and this is
 * the one place where a stray angle bracket breaks a page rather than
 * rendering oddly.
 */
export function jsonLd(value: unknown): string {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}
