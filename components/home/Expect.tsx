import { Band, BandHead } from "@/components/site/Band";
import { StoryScroll } from "@/components/site/StoryScroll";
import { galleryImage, type GalleryKey } from "@/data/gallery";
import type { Dictionary } from "@/dictionaries";

// One of her sets per step, in order. Nail work only.
const SHOTS: GalleryKey[] = ["lilacSquare", "clearCoffinLinework", "whiteGlitterSquare"];

export function Expect({ t }: { t: Dictionary }) {
  const c = t.home.expect;
  const shots = SHOTS.map(galleryImage).flatMap((image) =>
    image ? [{ path: image.imagekitPath, width: image.width, height: image.height }] : [],
  );

  return (
    <Band tone="blush">
      <BandHead eyebrow={c.eyebrow} heading={c.heading} />

      <StoryScroll
        steps={Object.entries(c.steps).map(([key, step]) => ({ key, ...step }))}
        shots={shots}
      />
    </Band>
  );
}
