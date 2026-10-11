import type { GalleryKey } from "@/data/gallery";
import { siteConfig, type SiteConfig } from "@/data/siteConfig";

import { BandPhoto } from "./BandPhoto";

type Backdrop = SiteConfig["backdrops"][string];
export type BackdropEffect = NonNullable<Backdrop["effect"]>;
export type BackdropStrength = NonNullable<Backdrop["strength"]>;

/**
 * A band's background photo while Frank picks one: off, or one of a few of
 * her photos, faded under the band's colour or dark under black (the band's
 * words then turn light), at five strengths (globals.css, .band-shade).
 * Production renders siteConfig.backdrops[id] (or nothing). In dev every
 * candidate renders, hidden, and the options panel shows one and sets the
 * wrapper's data-fx and data-strength.
 */
export function BackdropChoice({
  id,
  label,
  options,
  effect = "faded",
  strength = "faint",
}: {
  id: string;
  // What the options panel calls it.
  label: string;
  options: GalleryKey[];
  effect?: BackdropEffect;
  strength?: BackdropStrength;
}) {
  const picked = (siteConfig.backdrops as Record<string, Backdrop | undefined>)[id];
  const fx = picked?.effect ?? effect;
  const st = picked?.strength ?? strength;
  if (process.env.NODE_ENV === "production") {
    return picked ? (
      <div data-fx={fx} data-strength={st} className="contents">
        <BandPhoto imageKey={picked.photo as GalleryKey} />
      </div>
    ) : null;
  }
  return (
    <div
      data-backdrop={id}
      data-label={label}
      data-default={picked?.photo ?? "off"}
      data-default-fx={fx}
      data-default-strength={st}
      data-fx={picked ? fx : ""}
      data-strength={st}
      className="contents"
    >
      {options.map((key) => (
        <div key={key} data-pick={key} className={key === picked?.photo ? "contents" : "hidden"}>
          <BandPhoto imageKey={key} />
        </div>
      ))}
    </div>
  );
}
