import { jsonLd, questionsSchema } from "@/lib/schema";

// Home, nails and parties. Each list carries its own FAQPage data, built from the same items it renders.
export function FaqList({
  items,
}: {
  items: { key: string; q: string; a: string }[];
}) {
  return (
    <>
      <div className="max-w-[70ch]">
        {items.map((item) => (
          <details
            key={item.key}
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
        dangerouslySetInnerHTML={{ __html: jsonLd(questionsSchema(items)) }}
      />
    </>
  );
}
