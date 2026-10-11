import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { TapedPrint } from "@/components/parties/PartyBoard";
import { WorkFan } from "@/components/site/WorkFan";
import type { GalleryKey } from "@/data/gallery";
import { Band, Hot } from "@/components/site/Band";
import { siteConfig } from "@/data/siteConfig";
import { getDictionary } from "@/dictionaries";
import { defaultLocale, isLocale, localePath } from "@/lib/locale";

// Her sets beside the about sections, in turn. Nail work only.
const ABOUT_PRINTS: GalleryKey[] = [
  "palePinkGloss",
  "almondBowFrench",
  "peachFrenchGems",
  "spiderAccentFrench",
];

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/about">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getDictionary(locale);

  return {
    title: t.about.meta.title,
    description: t.about.meta.description,
    alternates: {
      canonical: localePath(locale, "/about"),
      languages: {
        en: localePath("en", "/about"),
        es: localePath("es", "/about"),
        "x-default": localePath(defaultLocale, "/about"),
      },
    },
  };
}

// No age and no photo of her, on purpose. Person data stays on the home page.
export default async function About({ params }: PageProps<"/[locale]/about">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const t = getDictionary(locale);
  const c = t.about;

  return (
    <main id="main">
      <Band className="pt-[26px]!">
        {/* Her work beside the heading, never her (no photo of her on the site). */}
        <div className="flex flex-col gap-12 min-[860px]:flex-row min-[860px]:items-center">
          <div className="min-w-0 flex-1">
            <span className="font-body mb-3 block text-[11px] font-semibold tracking-[0.18em] text-ink-faint uppercase">
              {c.eyebrow}
            </span>

            <h1 className="mb-4 text-[clamp(36px,9vw,62px)]">
              {c.headingLead} <Hot>{c.headingAccent}</Hot>
            </h1>

            <p className="max-w-[54ch] text-base text-ink-muted">{c.lede}</p>
          </div>
          <WorkFan
            keys={[
              "whiteFlowerGoldFrench",
              "colourSwatchArm",
              "frenchGlitterGems",
            ]}
            className="min-[860px]:w-[400px] min-[860px]:shrink-0"
          />
        </div>
      </Band>

      <Band tinted glow={false}>
        {/* Numbered, each beside one of her sets taped up, alternating sides. */}
        <div className="flex flex-col gap-16 min-[860px]:gap-20">
          {Object.entries(c.sections).map(([key, section], index) => (
            <section
              key={key}
              className={`reveal grid items-center gap-8 min-[860px]:gap-16 ${index % 2 === 1 ? "min-[860px]:grid-cols-[280px_1fr]" : "min-[860px]:grid-cols-[1fr_280px]"}`}
            >
              <div className={index % 2 === 1 ? "min-[860px]:order-2" : ""}>
                <span
                  aria-hidden="true"
                  className="font-display mb-3 block bg-[image:var(--hot-text)] bg-clip-text text-[56px] leading-none font-extrabold text-transparent"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h2 className="mb-3 text-[clamp(24px,5vw,34px)]">
                  {section.heading}
                </h2>
                <p className="max-w-[56ch] text-[15.5px] text-ink-muted">
                  {section.body}
                </p>
              </div>
              <TapedPrint
                imageKey={ABOUT_PRINTS[index % ABOUT_PRINTS.length]}
                className={`mx-auto w-full max-w-[260px] max-[860px]:hidden ${index % 2 === 1 ? "-rotate-3 min-[860px]:order-1" : "rotate-3"}`}
              />
            </section>
          ))}
        </div>
      </Band>

      <Band>
        <p className="mb-2 max-w-[54ch] text-[clamp(20px,4.5vw,26px)] font-medium text-ink">
          {c.feeling}
        </p>

        <p className="font-display mb-8 text-[19px] font-extrabold tracking-[-0.04em] text-ink">
          {siteConfig.business.ownerName.toLowerCase()}
          <span className="text-nails">
            {siteConfig.business.wordmarkAccent}
          </span>
        </p>

        <div className="flex flex-col gap-3 min-[560px]:flex-row">
          <Link
            href={localePath(locale, "/nails")}
            className="hover-glow rounded-pill bg-[image:var(--hot)] px-7 py-4 text-center text-[15px] font-bold text-on-hot focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            {c.nails}
          </Link>
          <Link
            href={localePath(locale, "/parties")}
            className="hover-fill rounded-pill border border-line px-7 py-4 text-center text-[15px] font-bold text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            {c.party}
          </Link>
        </div>
      </Band>
    </main>
  );
}
