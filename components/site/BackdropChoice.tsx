import type { GalleryKey } from "@/data/gallery";
import { siteConfig } from "@/data/siteConfig";

import { BandPhoto } from "./BandPhoto";

/**
 * A band's background photo while Frank picks one: off, or one of a few of
 * her photos. Production renders siteConfig.backdrops[id] (or nothing). In
 * dev every candidate renders, hidden, and the options panel shows one.
 */
export function BackdropChoice({
  id,
  label,
  options,
  strength = 76,
}: {
  id: string;
  // What the options panel calls it.
  label: string;
  options: GalleryKey[];
  strength?: number;
}) {
  const picked = (siteConfig.backdrops as Record<string, GalleryKey | undefined>)[id];
  if (process.env.NODE_ENV === "production") {
    return picked ? <BandPhoto imageKey={picked} strength={strength} /> : null;
  }
  return (
    <div data-backdrop={id} data-label={label} data-default={picked ?? "off"} className="contents">
      {options.map((key) => (
        <div key={key} data-pick={key} className={key === picked ? "contents" : "hidden"}>
          <BandPhoto imageKey={key} strength={strength} />
        </div>
      ))}
    </div>
  );
}
