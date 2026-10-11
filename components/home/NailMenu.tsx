import { TapedPrint } from "@/components/parties/PartyBoard";
import { TreatmentList } from "@/components/service/TreatmentList";
import { Band } from "@/components/site/Band";
import type { Dictionary } from "@/dictionaries";

// The menu as a printed card, her set taped beside it. The id is what every "See the nails menu" link scrolls to.
export function NailMenu({ t }: { t: Dictionary }) {
  return (
    <Band id="menu" tinted>
      <div className="grid items-start gap-12 min-[1000px]:grid-cols-[1fr_300px] min-[1000px]:gap-16">
        <div className="min-w-0 rounded-2xl bg-surface p-5 border-2 border-line shadow-[6px_6px_0_var(--shadow)] min-[700px]:p-10">
          <h2 className="mb-[26px] text-[clamp(30px,5.6vw,52px)]">
            {t.services.nails.menuHeading}
          </h2>
          <TreatmentList serviceId="nails" t={t} />
        </div>
        <TapedPrint
          imageKey="pinkFrenchCrystals"
          className="sticky top-28 mx-auto w-full max-w-[280px] -rotate-3 max-[1000px]:hidden"
        />
      </div>
    </Band>
  );
}
