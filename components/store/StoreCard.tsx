import { Photo } from "@/components/media/Photo";
import type { StoreCategory, StoreProduct } from "@/data/store";
import type { Dictionary } from "@/dictionaries";
import { formatPrice } from "@/lib/format";

// Literal strings, because Tailwind cannot see runtime-built classes.
const hideWhenOtherTab: Record<StoreCategory, string> = {
  pressOns: "group-data-[filter=nailCare]/store:hidden",
  nailCare: "group-data-[filter=pressOns]/store:hidden",
};

export function StoreCard({ product, t }: { product: StoreProduct; t: Dictionary }) {
  const c = t.store;
  const copy = c.products[product.key];

  return (
    <li
      className={`flex flex-col rounded-xl border border-line bg-surface p-4 ${hideWhenOtherTab[product.category]}`}
    >
      <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-shot">
        {product.image ? (
          <Photo
            path={product.image.imagekitPath}
            alt={copy.name}
            width={product.image.width}
            height={product.image.height}
            sizes="(min-width: 900px) 380px, (min-width: 560px) 50vw, 100vw"
            className="absolute inset-0 size-full object-cover"
          />
        ) : (
          <div
            aria-hidden="true"
            className="absolute inset-0 grid place-items-center bg-[radial-gradient(circle_at_30%_30%,var(--glow-a),transparent_60%),radial-gradient(circle_at_75%_70%,var(--glow-b),transparent_55%)]"
          >
            <span className="font-body text-[11px] font-semibold tracking-[0.18em] text-ink-faint uppercase">
              {c.categories[product.category]}
            </span>
          </div>
        )}
      </div>

      <h3 className="mt-4 text-[19px]">{copy.name}</h3>
      <p className="mt-2 mb-4 text-[14px] text-ink-muted">{copy.body}</p>

      <p className="mt-auto border-t border-line-soft pt-3 font-display text-[22px] font-extrabold tracking-[-0.03em] text-ink">
        {/* The {" "} is needed, or screen readers read "From$40". */}
        {product.from ? (
          <>
            <span className="font-body text-[12.5px] font-semibold text-ink-faint">
              {t.treatmentList.priceFrom}
            </span>{" "}
          </>
        ) : null}
        {formatPrice(product.priceCad)}
      </p>
    </li>
  );
}
