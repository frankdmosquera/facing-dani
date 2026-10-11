import { orderedStoreProducts } from "@/data/store";
import type { Dictionary } from "@/dictionaries";
import { formatPrice } from "@/lib/format";

/* Each tag's string length, swing offset and look. Written out so Tailwind
   sees every class. From the fourth on they hide on phones, to keep the row short. */
const HANG = [
  { string: "h-16", tag: "[--d:0s]" },
  { string: "h-32", tag: "[--d:-1.4s]" },
  { string: "h-8", tag: "[--d:-0.7s]" },
  { string: "h-24", tag: "[--d:-2.1s] max-[860px]:hidden" },
  { string: "h-12", tag: "[--d:-1s] max-[860px]:hidden" },
  { string: "h-28", tag: "[--d:-2.6s] max-[860px]:hidden" },
];

/**
 * The store's products as price tags hanging from a rail, each swinging a
 * little out of step. Real names and prices from store.ts, so nothing here can
 * drift from the cards. Decorative: the grid below says the same thing.
 */
export function SwingTags({ t }: { t: Dictionary }) {
  const products = orderedStoreProducts();

  return (
    <div aria-hidden="true" className="relative pt-1">
      <span className="absolute inset-x-0 top-0 h-1 rounded-full bg-[image:var(--hot)] opacity-80" />
      <ul className="flex justify-between gap-2.5">
        {products.map((product, index) => (
          <li
            key={product.key}
            className={`lift-swing flex flex-col items-center ${HANG[index]?.tag ?? ""}`}
          >
            <span
              className={`w-px bg-ink-faint ${HANG[index]?.string ?? "h-12"}`}
            />
            <div
              className={`relative flex w-[88px] flex-col items-center rounded-lg px-3 pt-5 pb-4 text-center shadow-[0_24px_40px_-20px_rgba(0,0,0,0.7)] ${index % 2 === 0 ? "bg-[image:var(--hot)] text-on-hot" : "border border-line bg-surface text-ink"}`}
            >
              <span className="absolute top-2 size-2 rounded-full bg-ground ring-1 ring-line" />
              <span className="mb-1.5 text-[11.5px] leading-tight font-semibold">
                {t.store.products[product.key].name}
              </span>
              <span className="font-display text-[24px] leading-none font-extrabold tracking-[-0.03em]">
                {formatPrice(product.priceCad)}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
