import { siteConfig } from "@/data/siteConfig";
import { showOptions } from "@/lib/showOptions";

import { HeroSwitch } from "./HeroSwitch";
import { HeroVariantView, type HeroContent, type HeroVariant } from "./HeroVariants";

// Each page's own set of designs: parties never repeats home's.
export const HERO_OPTIONS = {
  home: ["b", "c", "d"],
  parties: ["e", "f"],
} as const satisfies Record<"home" | "parties", readonly HeroVariant[]>;

// A page's hero: the design in siteConfig.hero, or in dev every option behind the options panel's pick.
export function Hero({ page, content }: { page: "home" | "parties"; content: HeroContent }) {
  const fallback = siteConfig.hero[page];
  if (!showOptions) return <HeroVariantView variant={fallback} content={content} />;
  return (
    <HeroSwitch
      page={page}
      fallback={fallback}
      options={Object.fromEntries(
        HERO_OPTIONS[page].map((variant) => [variant, <HeroVariantView key={variant} variant={variant} content={content} />]),
      )}
    />
  );
}
