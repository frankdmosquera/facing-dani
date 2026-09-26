import { Band, BandHead } from "@/components/site/Band";
import { FaqList } from "@/components/site/FaqList";
import { siteWideFaq } from "@/data/faq";
import type { Dictionary } from "@/dictionaries";

export function Faq({ t }: { t: Dictionary }) {
  const c = t.home.faq;

  return (
    <Band id="faq" tinted glow={false}>
      <BandHead eyebrow={c.eyebrow} heading={c.heading} />

      <FaqList
        items={siteWideFaq().map((item) => ({ key: item.key, ...t.faq[item.key] }))}
      />
    </Band>
  );
}
