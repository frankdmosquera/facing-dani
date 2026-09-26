import { Band, BandHead, Hot } from "@/components/site/Band";
import { FaqList } from "@/components/site/FaqList";
import type { Dictionary } from "@/dictionaries";

// Nails page only, with questions the home FAQ does not ask.
export function NailFaq({ t }: { t: Dictionary }) {
  const c = t.services.nails.faq;

  return (
    <Band tinted glow={false}>
      <BandHead
        eyebrow={c.eyebrow}
        heading={
          <>
            {c.headingLead} <Hot>{c.headingAccent}</Hot>
          </>
        }
      />

      <FaqList
        items={Object.entries(c.items).map(([key, item]) => ({ key, ...item }))}
      />
    </Band>
  );
}
