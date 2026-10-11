import { Photo } from "@/components/media/Photo";
import { galleryImage, type GalleryKey } from "@/data/gallery";

/**
 * The pop look's hero: her photo fills an edged frame, a fade in the page's
 * accent rises from the foot, and the headline sits on it in white. Used by
 * home and /parties. The photo is decorative here: every one is in the work
 * gallery with its alt text.
 */
export function PhotoHero({
  imageKey,
  fade = "nails",
  sticker,
  children,
}: {
  imageKey: GalleryKey;
  // Which colour the fade rises in: pink for nails, ink for parties.
  fade?: "nails" | "ink";
  sticker?: React.ReactNode;
  children: React.ReactNode;
}) {
  const image = galleryImage(imageKey);

  return (
    <section className="px-3 pt-4 pb-12 min-[760px]:px-5">
      <div className="on-dark relative mx-auto flex min-h-[min(84svh,820px)] max-w-[1400px] flex-col justify-end overflow-hidden rounded-[32px] border-2 border-[color:var(--brand-ink)] bg-[color:var(--brand-ink)] shadow-[10px_10px_0_var(--brand-ink)]">
        {image ? (
          <div aria-hidden="true" className="absolute inset-0">
            <Photo
              path={image.imagekitPath}
              alt=""
              width={image.width}
              height={image.height}
              sizes="100vw"
              priority // The LCP image.
              className="block h-full w-full object-cover"
            />
          </div>
        ) : null}
        <div
          aria-hidden="true"
          // Theme colours, mixed with transparency so the fade follows the theme picked.
          className={`absolute inset-0 ${fade === "nails" ? "bg-[linear-gradient(to_top,color-mix(in_oklab,var(--brand-accent-deep)_92%,transparent)_0%,color-mix(in_oklab,var(--brand-accent-deep)_55%,transparent)_38%,color-mix(in_oklab,var(--brand-ink)_15%,transparent)_70%)]" : "bg-[linear-gradient(to_top,color-mix(in_oklab,var(--brand-ink)_94%,transparent)_0%,color-mix(in_oklab,var(--brand-ink)_60%,transparent)_40%,color-mix(in_oklab,var(--brand-ink)_10%,transparent)_72%)]"}`}
        />

        <div className="relative p-6 pt-40 text-[color:var(--brand-cream)] min-[760px]:p-12 min-[760px]:pt-56">{children}</div>

        {sticker ? (
          <div className="sticker absolute top-5 right-5 size-28 min-[760px]:top-8 min-[760px]:right-8 min-[760px]:size-40">
            {sticker}
          </div>
        ) : null}
      </div>
    </section>
  );
}
