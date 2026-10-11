import { Band, BandHead, Hot } from "@/components/site/Band";
import { StepTimeline } from "@/components/site/StepTimeline";
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

      <StepTimeline
        steps={Object.entries(c.items).map(([key, step]) => ({ key, ...step }))}
        tinted
      />
    </Band>
  );
}
