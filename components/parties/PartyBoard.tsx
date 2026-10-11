import { Photo } from "@/components/media/Photo";
import { galleryImage, type GalleryKey } from "@/data/gallery";

/* Festive sets first; the one makeup look is the star-painted eye, the nearest
   thing in her work to party face painting. Small tiles only: a face is never
   blown up on this site. */
const BOARD: { key: GalleryKey; place: string }[] = [
  { key: "christmasShortSet", place: "-rotate-6" },
  { key: "heartsFrench", place: "rotate-3 translate-y-6" },
  { key: "blueGraphicEyeTurned", place: "rotate-2 -translate-y-2" },
  { key: "pinkFloralArt", place: "-rotate-3 translate-y-4" },
];

/** One of her photos as a taped-up print, the board's single tile. Decorative. */
export function TapedPrint({
  imageKey,
  className = "",
}: {
  imageKey: GalleryKey;
  className?: string;
}) {
  const image = galleryImage(imageKey);
  if (!image) return null;
  return (
    <div
      aria-hidden="true"
      className={`relative rounded-lg bg-surface p-2.5 pb-8 border-2 border-line shadow-[6px_6px_0_var(--shadow)] transition-[rotate] duration-500 ease-out hover:rotate-0 ${className}`}
    >
      <span className="absolute -top-3 left-1/2 z-10 h-6 w-16 -translate-x-1/2 -rotate-3 rounded-sm bg-[color:var(--brand-sticker)] opacity-90" />
      <div className="aspect-[4/5] overflow-hidden rounded-md bg-shot">
        <Photo
          path={image.imagekitPath}
          alt=""
          width={image.width}
          height={image.height}
          sizes="320px"
          className="block h-full w-full object-cover"
        />
      </div>
    </div>
  );
}

/**
 * A mood board of her work, each photo taped up at a slight angle and
 * straightening on hover. Decorative: every photo is in the gallery with its
 * alt text.
 */
export function PartyBoard() {
  return (
    <div aria-hidden="true" className="grid grid-cols-2 gap-5 p-3">
      {BOARD.map(({ key, place }) => {
        const image = galleryImage(key);
        if (!image) return null;
        return (
          <div
            key={key}
            className={`relative rounded-lg bg-surface p-2 pb-6 border-2 border-line shadow-[6px_6px_0_var(--shadow)] transition-[rotate,translate] duration-500 ease-out hover:translate-y-0 hover:rotate-0 ${place}`}
          >
            <span className="absolute -top-2.5 left-1/2 z-10 h-5 w-14 -translate-x-1/2 -rotate-3 rounded-sm bg-[color:var(--brand-sticker)] opacity-90" />
            <div className="aspect-square overflow-hidden rounded-md bg-shot">
              <Photo
                path={image.imagekitPath}
                alt=""
                width={image.width}
                height={image.height}
                sizes="(min-width: 860px) 220px, 45vw"
                className="block h-full w-full object-cover"
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
