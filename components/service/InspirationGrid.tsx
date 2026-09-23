import { Photo } from "@/components/media/Photo";
import { inspirationFor } from "@/data/decorativeImages";
import type { ServiceId } from "@/data/services";
import type { Dictionary } from "@/dictionaries";

/**
 * Stock photos of styles a client might bring in, under a heading and a line
 * that say plainly they are not her work.
 *
 * The heading and note are the whole point, so they are never hidden and the
 * grid never renders without them. The images themselves are decoration: no
 * alt text and hidden from assistive technology, because any description of
 * one would be a sentence implying it is hers. The rules for what may go in
 * live in `data/decorativeImages.ts`.
 *
 * Same masonry columns as the work strip, so the two read as one family when
 * both are on the nails page. Nothing here is `priority`: the opening image or
 * the menu is already the largest thing above the fold.
 *
 * Renders nothing for a service with no records, which is why the page only
 * draws the band around it when `inspirationFor` returns something.
 */
export function InspirationGrid({
  serviceId,
  t,
}: {
  serviceId: ServiceId;
  t: Dictionary;
}) {
  const images = inspirationFor(serviceId);
  if (images.length === 0) return null;

  return (
    <>
      <div className="mb-[26px]">
        <h2 className="mb-2 text-[clamp(24px,5.5vw,34px)]">
          {t.inspiration.heading}
        </h2>
        <p className="max-w-[54ch] text-[14.5px] text-ink-muted">
          {t.inspiration.note}
        </p>
      </div>

      <div
        aria-hidden="true"
        className="columns-2 gap-2.5 min-[620px]:columns-3 min-[620px]:gap-3"
      >
        {images.map((image) => (
          <div
            key={image.imagekitPath}
            className="mb-2.5 break-inside-avoid overflow-hidden rounded-lg border border-line-soft bg-shot min-[620px]:mb-3"
          >
            <Photo
              path={image.imagekitPath}
              alt=""
              width={image.width}
              height={image.height}
              sizes="(min-width: 1180px) 360px, (min-width: 620px) 31vw, 48vw"
              className="block h-auto w-full"
            />
          </div>
        ))}
      </div>
    </>
  );
}
