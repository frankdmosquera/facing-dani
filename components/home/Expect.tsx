import { Band, BandHead } from "@/components/site/Band";
import { StepTimeline } from "@/components/site/StepTimeline";
import type { Dictionary } from "@/dictionaries";

export function Expect({ t }: { t: Dictionary }) {
  const c = t.home.expect;

  return (
    <Band glow={false}>
      <BandHead eyebrow={c.eyebrow} heading={c.heading} />

      <StepTimeline
        steps={Object.entries(c.steps).map(([key, step]) => ({ key, ...step }))}
      />
    </Band>
  );
}
