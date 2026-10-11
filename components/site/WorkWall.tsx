import { Photo } from "@/components/media/Photo";
import { orderedGallery, type GalleryImage } from "@/data/gallery";

const NAILS = orderedGallery().filter((image) => image.serviceId === "nails");
const TOP = NAILS.slice(0, 9);
const BOTTOM = NAILS.slice(9);

function Row({
  images,
  reverse,
}: {
  images: GalleryImage[];
  reverse?: boolean;
}) {
  return (
    <div className="overflow-hidden">
      <div
        className={`flex w-max gap-3 ${reverse ? "lift-side-reverse" : "lift-side"}`}
      >
        {[...images, ...images].map((image, index) => (
          <div
            key={`${image.key}-${index}`}
            className="aspect-[4/5] h-[190px] shrink-0 overflow-hidden rounded-xl bg-shot"
          >
            <Photo
              path={image.imagekitPath}
              alt=""
              width={image.width}
              height={image.height}
              sizes="160px"
              className="block h-full w-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Two rows of her nail work drifting in opposite directions, laid behind the
 * closing call to action on every page and dimmed under it. Decorative; every
 * photo is in the gallery with its alt text.
 */
export function WorkWall() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 flex flex-col justify-center gap-3 opacity-25 light:opacity-[0.12] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_75%)]"
    >
      <Row images={TOP} />
      <Row images={BOTTOM} reverse />
    </div>
  );
}
