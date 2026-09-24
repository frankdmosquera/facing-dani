import { Band, BandHead } from "@/components/site/Band";
import type { Dictionary } from "@/dictionaries";

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
