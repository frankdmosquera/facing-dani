import { Photo } from "@/components/media/Photo";
import { orderedGallery, type GalleryImage } from "@/data/gallery";

/* Nail sets only: a face is never part of a wall this size. */
const NAILS = orderedGallery().filter((image) => image.serviceId === "nails");

/* Four columns, each its own slice of the sets, direction and pace, so no two
   neighbours move together. Written out so Tailwind sees every class. */
const COLUMNS = [
  { offset: 0, motion: "lift-up [animation-duration:56s]" },
  { offset: 1, motion: "lift-down [animation-duration:44s]" },
  { offset: 2, motion: "lift-up [animation-duration:38s]" },
  { offset: 3, motion: "lift-down [animation-duration:62s]" },
];

function column(offset: number): GalleryImage[] {
  return NAILS.filter((_, index) => index % COLUMNS.length === offset);
}

/**
 * The gallery hero's wall of her work, tipped back in perspective with its
 * columns sliding past each other. Decorative: every photo is in the grid
 * right below, with its alt text. Each track holds its set twice so moving it
 * half its length loops cleanly. Hovering pauses it.
 */
export function PhotoWall({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`group relative overflow-hidden [perspective:1100px] [mask-image:radial-gradient(ellipse_at_center,black_45%,transparent_78%)] ${className}`}
    >
      <div className="absolute -inset-x-[20%] -inset-y-[30%] grid grid-cols-4 gap-3 [transform:rotateX(24deg)_rotateZ(-12deg)]">
        {COLUMNS.map(({ offset, motion }) => {
          const images = column(offset);
          return (
            <div
              key={offset}
              className={`flex flex-col gap-3 group-hover:[animation-play-state:paused] ${motion}`}
            >
              {[...images, ...images, ...images, ...images].map(
                (image, index) => (
                  <div
                    key={`${image.key}-${index}`}
                    className="aspect-[4/5] shrink-0 overflow-hidden rounded-xl bg-shot shadow-[0_20px_40px_-20px_rgba(0,0,0,0.7)]"
                  >
                    <Photo
                      path={image.imagekitPath}
                      alt=""
                      width={image.width}
                      height={image.height}
                      sizes="160px"
                      priority={index < 2}
                      className="block h-full w-full object-cover"
                    />
                  </div>
                ),
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
