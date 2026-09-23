import { Band, BandHead } from "@/components/site/Band";
import type { Dictionary } from "@/dictionaries";

/**
 * What actually happens in the chair, in three steps.
 *
 * This is the trust content the plan describes for "her mother, paying for a
 * grad set": arriving from Google, needing the business to look legitimate in
 * about four seconds. There are no reviews and will not be until item 11, so
 * this section earns trust by being specific instead.
 *
 * Deliberately not a second FAQ. The FAQ below owns booking, duration,
 * location and cancellation, and none of those answers are repeated here.
 *
 * An ordered list, because the order is the content: she looks at your hands
 * before anything else, and most of the appointment happens before any colour.
 * The numbers are `aria-hidden` because `<ol>` already conveys sequence to a
 * screen reader, and reading "one" twice is noise.
 */
export function Expect({ t }: { t: Dictionary }) {
  const c = t.home.expect;

  return (
    <Band glow={false}>
      <BandHead eyebrow={c.eyebrow} heading={c.heading} />

      <ol className="max-w-[66ch]">
        {Object.entries(c.steps).map(([key, step], index) => (
          <li
            key={key}
            className="flex gap-5 border-b border-line-soft py-5 last:border-b-0"
          >
            <span
              aria-hidden="true"
              className="font-display w-7 shrink-0 text-[19px] font-extrabold text-nails"
            >
              {index + 1}
            </span>
            <div>
              <h3 className="mb-1.5 text-[17px]">{step.title}</h3>
              <p className="text-[15px] text-ink-muted">{step.body}</p>
            </div>
          </li>
        ))}
      </ol>
    </Band>
  );
}
