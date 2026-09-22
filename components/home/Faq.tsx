import { Band, BandHead } from "@/components/site/Band";
import { siteWideFaq } from "@/data/faq";
import type { Dictionary } from "@/dictionaries";
import { faqPageSchema, jsonLd } from "@/lib/schema";

/**
 * Native `<details>`. No JavaScript, no client component, works with JS off -
 * and the browser gives the keyboard and screen reader behaviour for free.
 *
 * The structured data below is generated from the same data and dictionary, so
 * what Google reads and what a visitor reads are the same sentences.
 */
export function Faq({ t }: { t: Dictionary }) {
  const c = t.home.faq;

  return (
    <Band tinted glow={false}>
      <BandHead eyebrow={c.eyebrow} heading={c.heading} />

      <div className="max-w-[70ch]">
        {siteWideFaq().map((item) => (
          <details
            key={item.key}
            className="group border-b border-line-soft last:border-b-0"
          >
            <summary className="flex cursor-pointer items-center justify-between gap-4 py-4 text-[16.5px] font-medium text-ink marker:content-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring [&::-webkit-details-marker]:hidden">
              {t.faq[item.key].q}
              <span
                aria-hidden="true"
                className="text-nails shrink-0 text-[20px] leading-none group-open:hidden"
              >
                +
              </span>
              <span
                aria-hidden="true"
                className="hidden shrink-0 text-[20px] leading-none text-nails group-open:block"
              >
                &minus;
              </span>
            </summary>
            <p className="pb-5 text-[15px] text-ink-muted">
              {t.faq[item.key].a}
            </p>
          </details>
        ))}
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(faqPageSchema(t)) }}
      />
    </Band>
  );
}
