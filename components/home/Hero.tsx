import { Hero as PageHero } from "@/components/site/Hero";
import { treatmentsFor } from "@/data/treatments";
import type { Dictionary } from "@/dictionaries";
import { localePath, type Locale } from "@/lib/locale";

// The cheapest full appointment, for the sticker. Add-ons are not an appointment on their own.
function startingPrice() {
  return Math.min(...treatmentsFor("nails").filter((row) => !row.addOn && row.key !== "removal").map((row) => row.priceCad));
}

export function Hero({ locale, t }: { locale: Locale; t: Dictionary }) {
  const c = t.home.hero;

  return (
    <PageHero
      page="home"
      content={{
        eyebrow: c.eyebrow,
        lead: c.headingLead,
        accent: c.headingAccent,
        lede: c.sell,
        primary: { href: "#menu", label: c.nails },
        secondary: { href: localePath(locale, "/parties"), label: c.party },
        photos: ["pinkBlackStars", "burgundyCatEye", "almondBowFrench"],
        sticker: (
          <span className="font-display leading-none font-extrabold tracking-[-0.04em] lowercase">
            <span className="block text-[14px] min-[760px]:text-[18px]">{t.treatmentList.priceFrom}</span>
            <span className="block text-[38px] min-[760px]:text-[56px]">${startingPrice()}</span>
          </span>
        ),
      }}
    />
  );
}
