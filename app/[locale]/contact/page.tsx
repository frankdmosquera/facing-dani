import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ContactForm } from "@/components/contact/ContactForm";
import { ContactNote } from "@/components/contact/ContactNote";
import { WorkFan } from "@/components/site/WorkFan";
import { Band, Hot } from "@/components/site/Band";
import { siteConfig } from "@/data/siteConfig";
import { getDictionary } from "@/dictionaries";
import { defaultLocale, isLocale, localePath } from "@/lib/locale";
import { contactPageSchema, jsonLd } from "@/lib/schema";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/contact">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getDictionary(locale);

  return {
    title: t.contact.meta.title,
    description: t.contact.meta.description,
    alternates: {
      canonical: localePath(locale, "/contact"),
      languages: {
        en: localePath("en", "/contact"),
        es: localePath("es", "/contact"),
        "x-default": localePath(defaultLocale, "/contact"),
      },
    },
  };
}

export default async function Contact({
  params,
}: PageProps<"/[locale]/contact">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const t = getDictionary(locale);
  const c = t.contact;
  const instagram = siteConfig.social.instagram;

  return (
    <main id="main">
      <Band className="grain pt-[26px]!">
        {/* Her work beside the heading, never her (no photo of her on the site). */}
        <div className="flex flex-col gap-12 min-[860px]:flex-row min-[860px]:items-center">
          <div className="min-w-0 flex-1">
            <span className="font-body mb-3 block text-[11px] font-semibold tracking-[0.18em] text-ink-faint uppercase">
              {c.eyebrow}
            </span>

            <h1 className="mb-4 text-[clamp(40px,8.6vw,78px)]">
              {c.headingLead} <Hot>{c.headingAccent}</Hot>
            </h1>

            <p className="max-w-[54ch] text-base text-ink-muted">{c.lede}</p>
          </div>
          <WorkFan
            keys={["lilacSquare", "goldLeafFrench", "pinkFrenchCrystals"]}
            className="min-[860px]:w-[400px] min-[860px]:shrink-0"
          />
        </div>
      </Band>

      <Band tinted glow={false}>
        <div className="flex gap-16 min-[1000px]:items-start">
          <div className="min-w-0 flex-1">
            <ContactForm locale={locale} t={t} />
          </div>
          <div className="hidden shrink-0 min-[1000px]:block min-[1000px]:w-[340px] min-[1000px]:pt-10">
            <ContactNote t={t} />
          </div>
        </div>
      </Band>

      {/* Hidden until an Instagram handle exists. */}
      {instagram ? (
        <Band glow={false}>
          <div className="max-w-[54ch]">
            <h2 className="mb-3 text-[clamp(22px,5vw,30px)]">
              {c.direct.heading}
            </h2>
            <p className="mb-4 text-[15.5px] text-ink-muted">{c.direct.body}</p>
            <a
              href={instagram.url}
              rel="me noopener noreferrer"
              target="_blank"
              className="inline-block hover-fill rounded-pill border border-line px-7 py-4 text-[15px] font-bold text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              {c.direct.link}
            </a>
          </div>
        </Band>
      ) : null}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(contactPageSchema(t)) }}
      />
    </main>
  );
}
