import { Photo } from "@/components/media/Photo";
import { orderedGallery, type GalleryImage } from "@/data/gallery";

/**
 * Her nail work in motion beside the home headline: two columns drifting in
 * opposite directions from 860px, one row sliding sideways below it. Every
 * photo is hers (gallery.ts never holds stock), so the hero is the portfolio
 * rather than a picture of one set.
 *
 * Decorative and hidden from screen readers: the same photographs, with their
 * alt text, are a click away in the gallery and in the work grid further down.
 * Each track holds its set twice so moving it half its length loops cleanly.
 * Hovering pauses it.
 */
const NAILS = orderedGallery().filter((image) => image.serviceId === "nails");
const LEFT = NAILS.filter((_, index) => index % 2 === 0);
const RIGHT = NAILS.filter((_, index) => index % 2 === 1);

function Tile({
  image,
  priority,
  className,
}: {
  image: GalleryImage;
  priority?: boolean;
  className: string;
}) {
  return (
    <div className={`overflow-hidden rounded-xl bg-shot ${className}`}>
      <Photo
        path={image.imagekitPath}
        alt=""
        width={image.width}
        height={image.height}
        sizes="(min-width: 860px) 220px, 180px"
        priority={priority}
        className="block h-full w-full object-cover"
      />
    </div>
  );
}

function Column({
  images,
  direction,
  first,
}: {
  images: GalleryImage[];
  direction: "up" | "down";
  first?: boolean;
}) {
  return (
    <div className="h-full overflow-hidden">
      <div
        className={`flex flex-col gap-3 group-hover:[animation-play-state:paused] ${direction === "up" ? "lift-up" : "lift-down"}`}
      >
        {[...images, ...images].map((image, index) => (
          <Tile
            key={`${image.key}-${index}`}
            image={image}
            priority={first && index < 2}
            className="aspect-[4/5] shrink-0"
          />
        ))}
      </div>
    </div>
  );
}

export function WorkColumns() {
  return (
    <div aria-hidden="true" className="group">
      <div className="hidden h-[560px] w-[460px] grid-cols-2 gap-3 [mask-image:linear-gradient(to_bottom,transparent,black_12%,black_88%,transparent)] min-[860px]:grid">
        <Column images={LEFT} direction="up" first />
        <Column images={RIGHT} direction="down" />
      </div>
      <div className="-mx-[var(--gutter)] overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)] min-[860px]:hidden">
        <div className="lift-side flex w-max gap-3">
          {[...NAILS, ...NAILS].map((image, index) => (
            <Tile
              key={`${image.key}-${index}`}
              image={image}
              priority={index < 2}
              className="aspect-[4/5] h-[200px] shrink-0"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
