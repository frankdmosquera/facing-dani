import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Photo } from "@/components/media/Photo";
import { Band, BandHead, Hot } from "@/components/site/Band";
import { BookingBand } from "@/components/site/BookingBand";
import { portrait } from "@/data/portrait";
import { getDictionary } from "@/dictionaries";
import { defaultLocale, isLocale, localePath } from "@/lib/locale";
import { jsonLd, personSchema } from "@/lib/schema";

/**
 * The page for the visitor the overview calls "her mother, paying for a grad
 * set": arriving from Google, needing the business to look legitimate in four
 * seconds, and unwilling to DM a teenager.
 *
 * There are no reviews and there will not be until item 10, so everything on
 * this page has to earn trust by being specific instead.
 */
export async function generateMetadata({
  params,
}: PageProps<"/[locale]/about">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getDictionary(locale);

  return {
    title: t.about.meta.title,
    description: t.about.meta.description,
    /**
     * Explicit, because the layout points `canonical` and all three `hreflang`
     * values at "/" and a child's `alternates` replaces rather than merges.
     */
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

export default async function About({ params }: PageProps<"/[locale]/about">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const t = getDictionary(locale);
  const c = t.about;

  return (
    <main id="main">
      <Band className="pt-[26px]!">
        <span className="font-body mb-3 block text-[11px] font-semibold tracking-[0.18em] text-ink-faint uppercase">
          {c.eyebrow}
        </span>

        <h1 className="mb-4 text-[clamp(36px,9vw,62px)]">
          {c.headingLead} <Hot>{c.headingAccent}</Hot>
        </h1>

        <p className="max-w-[54ch] text-base text-ink-muted">{c.lede}</p>

        {/* No portrait yet, and no placeholder box for it either: a missing
            photograph is a content decision rather than a broken build, so the
            page simply renders without one. */}
        {portrait ? (
          <div className="mt-9 max-w-[380px] overflow-hidden rounded-xl border border-line-soft bg-shot">
            <Photo
              path={portrait.imagekitPath}
              alt={c.portraitAlt}
              width={portrait.width}
              height={portrait.height}
              sizes="(min-width: 620px) 380px, 100vw"
              priority
              className="block h-auto w-full"
            />
          </div>
        ) : null}
      </Band>

      {/* The bilingual promise, said out loud rather than implied by a /es URL.
          A locked contract from the overview. */}
      <Band tinted glow={false}>
        <BandHead eyebrow={t.languageSwitch.to} heading={c.bilingual.heading} />
        <p className="max-w-[62ch] text-[15.5px] text-ink-muted">
          {c.bilingual.body}
        </p>
      </Band>

      <Band glow={false}>
        <h2 className="mb-[30px] text-[clamp(24px,5.5vw,34px)]">
          {c.expect.heading}
        </h2>

        <ol className="max-w-[66ch]">
          {Object.entries(c.expect.steps).map(([key, step], index) => (
            <li
              key={key}
              className="flex gap-5 border-b border-line-soft py-5 last:border-b-0"
            >
              <span
                aria-hidden="true"
                className="font-display w-7 shrink-0 text-[19px] font-extrabold text-nails"
              >
                {index + 1}
              </span>
              <div>
                <h3 className="mb-1.5 text-[17px]">{step.title}</h3>
                <p className="text-[15px] text-ink-muted">{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </Band>

      <BookingBand locale={locale} copy={c.cta} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(personSchema(t)) }}
      />
    </main>
  );
}
