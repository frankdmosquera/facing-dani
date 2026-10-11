import type { Dictionary } from "@/dictionaries";

/* The same painted swatches the nail guide uses (globals.css), one per finish. */
const SWATCH: Record<string, string> = {
  chrome: "swatch-chrome",
  french: "swatch-french",
  catEye: "swatch-cat-eye",
  sparkle: "swatch-sparkle",
  art: "swatch-art",
};

/**
 * A slow ribbon of the shapes and finishes she does, set huge, solid and
 * outlined in turn, with a painted nail between each. The words are the nail
 * guide's own, so the ribbon follows its language. Decorative: the guide lists
 * the same terms with what they mean.
 */
export function FinishRibbon({ t }: { t: Dictionary }) {
  const { shapes, finishes } = t.home.guide.columns;
  const words = [
    ...Object.entries(finishes.items),
    ...Object.entries(shapes.items),
  ].map(([key, item], index) => ({
    key,
    term: item.term,
    swatch: SWATCH[key] ?? Object.values(SWATCH)[index % 5],
  }));

  return (
    <div
      aria-hidden="true"
      className="tone-ink grain relative overflow-hidden border-y border-line bg-ground py-7 text-ink [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]"
    >
      <div className="lift-side flex w-max items-center gap-10 [animation-duration:70s] hover:[animation-play-state:paused]">
        {[...words, ...words].map((word, index) => (
          <span key={`${word.key}-${index}`} className="flex items-center gap-10">
            <span
              className={`font-display text-[clamp(40px,6vw,76px)] leading-none font-extrabold tracking-[-0.05em] whitespace-nowrap ${index % 2 === 0 ? "text-ink" : "text-transparent [-webkit-text-stroke:1.5px_var(--nails)]"}`}
            >
              {word.term}
            </span>
            <span
              className={`h-14 w-9 shrink-0 rotate-12 rounded-t-full rounded-b-md ring-1 ring-white/25 ${word.swatch}`}
            />
          </span>
        ))}
      </div>
    </div>
  );
}
