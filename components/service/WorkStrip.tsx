import { PhotoGrid } from "@/components/gallery/PhotoGrid";
import { SERVICE_HERO, orderedGallery } from "@/data/gallery";
import type { ServiceId } from "@/data/services";
import type { Dictionary } from "@/dictionaries";

const MAX = 6;

export function WorkStrip({
  serviceId,
  t,
}: {
  serviceId: ServiceId;
  t: Dictionary;
}) {
  const images = orderedGallery()
    .filter(
      (image) =>
        image.serviceId === serviceId && image.key !== SERVICE_HERO[serviceId],
    )
    .slice(0, MAX);

  if (images.length === 0) return null;

  const copy = t.services[serviceId];

  return (
    <>
      <h2 className="mb-[26px] text-[clamp(30px,5.6vw,52px)]">{copy.work.heading}</h2>

      <PhotoGrid items={images.map((image) => ({ kind: "work", image }))} t={t} />
    </>
  );
}
