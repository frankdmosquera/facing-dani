import { jsonLd, questionsSchema } from "@/lib/schema";

// Home, nails and parties. Each list carries its own FAQPage data, built from the same items it renders.
export function FaqList({
  items,
}: {
  items: { key: string; q: string; a: string }[];
}) {
  return (
    <>
      <div className="flex max-w-[70ch] flex-col gap-3">
        {items.map((item) => (
          <details
            key={item.key}
            className="group rounded-xl border border-line bg-surface px-5 transition-[box-shadow,border-color] duration-300 open:border-transparent open:shadow-[0_24px_50px_-28px_rgba(255,61,143,0.55)] min-[560px]:px-6"
          >
            <summary className="flex cursor-pointer items-center justify-between gap-4 py-5 text-[16.5px] font-medium text-ink transition-colors hover:text-nails marker:content-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring [&::-webkit-details-marker]:hidden">
              {item.q}
              {/* One plus that turns into a cross as the answer opens. */}
              <span
                aria-hidden="true"
                className="grid size-8 shrink-0 place-items-center rounded-full border border-line text-[20px] leading-none text-nails transition-[rotate,background-color,color,border-color] duration-300 group-open:rotate-45 group-open:border-transparent group-open:bg-[image:var(--hot)] group-open:text-on-hot"
              >
                +
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
