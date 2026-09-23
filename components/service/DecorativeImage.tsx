import { Photo } from "@/components/media/Photo";
import { decorativeImageFor } from "@/data/decorativeImages";
import type { ServiceId } from "@/data/services";

/**
 * The stock image at the top of a service page that has none of her work yet.
 *
 * Hidden from assistive technology and given no alt text on purpose: it is
 * decoration, and any description of it would be a sentence implying the work
 * in it is hers. The rules for what may go here live in
 * `data/decorativeImages.ts`.
 *
 * Renders nothing once the service has a photograph in the gallery, so her own
 * work replaces the stock without anyone having to remember to remove it.
 *
 * `priority` because on the two pages that have one it is the largest thing
 * above the fold. The width caps at 640px, so `sizes` never asks ImageKit for
 * more than a 2x screen can show at that width.
 */
export function DecorativeImage({ serviceId }: { serviceId: ServiceId }) {
  const image = decorativeImageFor(serviceId);
  if (!image) return null;

  return (
    <div
      aria-hidden="true"
      className="mt-8 max-w-[640px] overflow-hidden rounded-lg border border-line-soft bg-shot"
    >
      <Photo
        path={image.imagekitPath}
        alt=""
        width={image.width}
        height={image.height}
        sizes="(min-width: 700px) 640px, calc(100vw - 2 * var(--gutter))"
        priority
        className="block h-auto w-full"
      />
    </div>
  );
}
