import { Band, BandHead, Split } from "@/components/site/Band";
import { TapedPrint } from "@/components/parties/PartyBoard";
import { FaqList } from "@/components/site/FaqList";
import { siteWideFaq } from "@/data/faq";
import type { Dictionary } from "@/dictionaries";

export function Faq({ t }: { t: Dictionary }) {
  const c = t.home.faq;

  return (
    <Band id="faq" tinted>
      <Split
        head={
          <>
            <BandHead eyebrow={c.eyebrow} heading={c.heading} />
            <TapedPrint
              imageKey="pastelFrenchTips"
              className="w-[240px] -rotate-6 max-[960px]:hidden"
            />
          </>
        }
      >
        <FaqList
          items={[
            // Nail questions first, then the general ones: one list instead of two bands.
            ...Object.entries(t.services.nails.faq.items).map(([key, item]) => ({ key, ...item })),
            ...siteWideFaq().map((item) => ({ key: item.key, ...t.faq[item.key] })),
          ]}
        />
      </Split>
    </Band>
  );
}
