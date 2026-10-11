import { Photo } from "@/components/media/Photo";
import { galleryImage, type GalleryKey } from "@/data/gallery";

/* Back left, back right, front: each print's tilt and place. */
const PLACE = [
  "left-0 top-10 -rotate-[10deg]",
  "right-0 top-10 rotate-[9deg]",
  "left-1/2 top-0 z-10 -translate-x-1/2 -rotate-1",
];

/**
 * Three of her photos fanned like prints on a table, the two behind spreading
 * a little on hover. Her work only (gallery.ts), never her: the site shows no
 * photo of her. Decorative, since every photo is in the gallery with its alt
 * text. Pick nail sets for the front: a face is never the one in front.
 */
export function WorkFan({
  keys,
  className = "",
}: {
  keys: readonly [GalleryKey, GalleryKey, GalleryKey];
  className?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={`group relative mx-auto h-[360px] w-full max-w-[400px] ${className}`}
    >
      {keys.map((key, index) => {
        const image = galleryImage(key);
        if (!image) return null;
        return (
          <div
            key={key}
            className={`absolute aspect-[4/5] w-[52%] overflow-hidden rounded-xl bg-shot border-2 border-line shadow-[6px_6px_0_var(--shadow)] transition-[rotate,translate] duration-500 ease-out ${PLACE[index]} ${index === 0 ? "group-hover:-translate-x-3 group-hover:-rotate-[13deg]" : ""} ${index === 1 ? "group-hover:translate-x-3 group-hover:rotate-[12deg]" : ""}`}
          >
            <Photo
              path={image.imagekitPath}
              alt=""
              width={image.width}
              height={image.height}
              sizes="220px"
              className="block h-full w-full object-cover"
            />
          </div>
        );
      })}
    </div>
  );
}
