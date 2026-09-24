import { Photo } from "@/components/media/Photo";
import type { DecorativeImage } from "@/data/decorativeImages";

const SIZES = "(min-width: 1000px) 380px, (min-width: 620px) 33vw, 50vw";

// Stock, so no alt text. The tag is always visible so it never reads as her work.
export function InspirationFigure({
  image,
  tag,
  index,
  openLabel,
}: {
  image: DecorativeImage;
  tag: string;
  index: number;
  openLabel: string;
}) {
  return (
    <figure className="relative mb-2.5 break-inside-avoid overflow-hidden rounded-lg border border-line-soft bg-shot min-[620px]:mb-3">
      <button
        type="button"
        data-photo-index={index}
        aria-label={openLabel}
        className="block w-full cursor-zoom-in focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring"
      >
        <Photo
          path={image.imagekitPath}
          alt=""
          width={image.width}
          height={image.height}
          sizes={SIZES}
          className="block h-auto w-full"
        />
      </button>
      <figcaption className="pointer-events-none absolute bottom-2.5 left-2.5 rounded-pill border border-white/15 bg-[rgba(20,15,28,.75)] px-2.5 py-[5px] text-[9.5px] font-semibold tracking-[0.13em] text-ink-muted uppercase">
        {tag}
      </figcaption>
    </figure>
  );
}
