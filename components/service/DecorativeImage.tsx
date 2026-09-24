import { Photo } from "@/components/media/Photo";
import { decorativeImageFor } from "@/data/decorativeImages";
import type { ServiceId } from "@/data/services";

// Stock, so no alt text. Disappears on its own once the service has her own photos.
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
