import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Band, Hot } from "@/components/site/Band";
import { siteConfig } from "@/data/siteConfig";
import { getDictionary } from "@/dictionaries";
import { defaultLocale, isLocale, localePath } from "@/lib/locale";

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
        <span className="font-body mb-3 block text-[11px] font-semibold tracking-[0.18em] text-ink-faint uppercase">
          {c.eyebrow}
        </span>

        <h1 className="mb-4 text-[clamp(36px,9vw,62px)]">
          {c.headingLead} <Hot>{c.headingAccent}</Hot>
        </h1>

        <p className="max-w-[54ch] text-base text-ink-muted">{c.lede}</p>
      </Band>

      <Band tinted glow={false}>
        <div className="flex max-w-[62ch] flex-col gap-10">
          {Object.entries(c.sections).map(([key, section]) => (
            <section key={key}>
              <h2 className="mb-3 text-[clamp(22px,5vw,30px)]">
                {section.heading}
              </h2>
              <p className="text-[15.5px] text-ink-muted">{section.body}</p>
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
          <span className="text-nails">{siteConfig.business.wordmarkAccent}</span>
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
