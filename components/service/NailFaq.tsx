import { Band, BandHead, Hot } from "@/components/site/Band";
import type { Dictionary } from "@/dictionaries";
import { jsonLd, nailFaqSchema } from "@/lib/schema";

// Nails page only. Same markup as the home FAQ, with its own questions and its own FAQPage data.
export function NailFaq({ t }: { t: Dictionary }) {
  const c = t.services.nails.faq;

  return (
    <Band tinted glow={false}>
      <BandHead
        eyebrow={c.eyebrow}
        heading={
          <>
            {c.headingLead} <Hot>{c.headingAccent}</Hot>
          </>
        }
      />

      <div className="max-w-[70ch]">
        {Object.entries(c.items).map(([key, item]) => (
          <details
            key={key}
            className="group border-b border-line-soft last:border-b-0"
          >
            <summary className="flex cursor-pointer items-center justify-between gap-4 py-4 text-[16.5px] font-medium text-ink marker:content-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring [&::-webkit-details-marker]:hidden">
              {item.q}
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
            <p className="pb-5 text-[15px] text-ink-muted">{item.a}</p>
          </details>
        ))}
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(nailFaqSchema(t)) }}
      />
    </Band>
  );
}
