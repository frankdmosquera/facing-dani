import { Band, BandHead, Hot } from "@/components/site/Band";
import type { Dictionary } from "@/dictionaries";

export function PressOnGuide({ t }: { t: Dictionary }) {
  const c = t.store.guide;

  return (
    <Band glow={false}>
      <BandHead
        eyebrow={c.eyebrow}
        heading={
          <>
            {c.headingLead} <Hot>{c.headingAccent}</Hot>
          </>
        }
        lede={c.lede}
      />

      <div className="grid gap-8 min-[860px]:grid-cols-3 min-[860px]:gap-10">
        {Object.entries(c.columns).map(([key, column]) => (
          <div key={key}>
            <h3 className="mb-3 text-[19px]">{column.heading}</h3>
            <ul className="flex flex-col gap-2.5">
              {Object.entries(column.items).map(([itemKey, item]) => (
                <li
                  key={itemKey}
                  className="relative pl-5 text-[15px] text-ink-muted before:absolute before:top-[0.6em] before:left-0 before:size-1.5 before:rounded-full before:bg-nails"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Band>
  );
}
