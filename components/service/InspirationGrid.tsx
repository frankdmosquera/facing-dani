import { Photo } from "@/components/media/Photo";
import { inspirationFor } from "@/data/decorativeImages";
import type { ServiceId } from "@/data/services";
import type { Dictionary } from "@/dictionaries";

// Stock, not her work. The note saying so must always render with the images.
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

      {/* No alt text on purpose: describing a stock photo would imply it is hers. */}
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
