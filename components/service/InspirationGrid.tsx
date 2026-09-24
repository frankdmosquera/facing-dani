import { PhotoGrid } from "@/components/gallery/PhotoGrid";
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

      <PhotoGrid
        items={images.map((image) => ({ kind: "inspiration", image, serviceId }))}
        t={t}
      />
    </>
  );
}
