import { Band, BandHead, Hot } from "@/components/site/Band";
import type { Dictionary } from "@/dictionaries";

// Nails page only. Home's "What actually happens" is the short version; this is the timed one.
export function NailSteps({ t }: { t: Dictionary }) {
  const c = t.services.nails.steps;

  return (
    <Band tinted glow={false}>
      <BandHead
        eyebrow={c.eyebrow}
        heading={
          <>
            {c.headingLead} <Hot>{c.headingAccent}</Hot>
          </>
        }
        lede={c.lede}
      />

      <ol className="max-w-[66ch]">
        {Object.entries(c.items).map(([key, step], index) => (
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
              <div className="mb-1.5 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <h3 className="text-[17px]">{step.title}</h3>
                <span className="text-[13px] font-medium text-ink-faint">
                  {step.time}
                </span>
              </div>
              <p className="text-[15px] text-ink-muted">{step.body}</p>
            </div>
          </li>
        ))}
      </ol>
    </Band>
  );
}
