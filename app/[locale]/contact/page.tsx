import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ContactForm } from "@/components/contact/ContactForm";
import { ContactNote } from "@/components/contact/ContactNote";
import { TapedPrint } from "@/components/parties/PartyBoard";
import { Band, BandHead, Hot } from "@/components/site/Band";
import { LitText } from "@/components/site/LitText";
import { Optional } from "@/components/site/Optional";
import { PhotoBand } from "@/components/site/PhotoBand";
import { WorkFan } from "@/components/site/WorkFan";
import type { GalleryKey } from "@/data/gallery";
import { siteConfig } from "@/data/siteConfig";
import { getDictionary } from "@/dictionaries";
import { defaultLocale, isLocale, localePath } from "@/lib/locale";
import { contactPageSchema, jsonLd } from "@/lib/schema";

// Her sets beside the about sections, in turn. Nail work only.
const ABOUT_PRINTS: GalleryKey[] = [
  "palePinkGloss",
  "almondBowFrench",
  "peachFrenchGems",
  "spiderAccentFrench",
];

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

// About and contact on one page (2026-10-11): who she is first, then the form. /about redirects here.
// No age and no photo of her, on purpose. Person data stays on the home page.
export default async function Contact({
  params,
}: PageProps<"/[locale]/contact">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const t = getDictionary(locale);
  const a = t.about;
  const c = t.contact;
  const instagram = siteConfig.social.instagram;

  return (
    <main id="main">
      <Optional id="contact-intro" label="About: intro">
      <Band className="pt-[26px]!">
        {/* Her work beside the heading, never her (no photo of her on the site). */}
        <div className="flex flex-col gap-12 min-[860px]:flex-row min-[860px]:items-center">
          <div className="min-w-0 flex-1">
            <span className="eyebrow mb-5">{a.eyebrow}</span>

            <h1 className="mb-5 text-[clamp(52px,9vw,120px)] leading-[0.9]">
              {a.headingLead} <Hot>{a.headingAccent}</Hot>
            </h1>

            <p className="mb-8 max-w-[54ch] text-[17px] leading-[1.55] text-ink-muted">{a.lede}</p>

            <a
              href="#message"
              className="hover-glow inline-block rounded-pill bg-[image:var(--hot)] px-7 py-4 text-center text-[15px] font-bold text-on-hot focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              {c.eyebrow}
            </a>
          </div>
          <WorkFan
            keys={["whiteFlowerGoldFrench", "colourSwatchArm", "frenchGlitterGems"]}
            className="min-[860px]:w-[400px] min-[860px]:shrink-0"
          />
        </div>
      </Band>
      </Optional>

      <Optional id="contact-story" label="About: story">
      <Band tinted>
        {/* Numbered, each beside one of her sets taped up, alternating sides. */}
        <div className="flex flex-col gap-16 min-[860px]:gap-20">
          {Object.entries(a.sections).map(([key, section], index) => (
            <section
              key={key}
              className={`reveal grid items-center gap-8 min-[860px]:gap-16 ${index % 2 === 1 ? "min-[860px]:grid-cols-[280px_1fr]" : "min-[860px]:grid-cols-[1fr_280px]"}`}
            >
              <div className={index % 2 === 1 ? "min-[860px]:order-2" : ""}>
                <span
                  aria-hidden="true"
                  className="font-display mb-3 block text-[64px] leading-none font-extrabold text-nails"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h2 className="mb-3 text-[clamp(30px,5vw,44px)]">{section.heading}</h2>
                <p className="max-w-[56ch] text-[16px] text-ink-muted">{section.body}</p>
              </div>
              <TapedPrint
                imageKey={ABOUT_PRINTS[index % ABOUT_PRINTS.length]}
                className={`mx-auto w-full max-w-[260px] max-[860px]:hidden ${index % 2 === 1 ? "-rotate-3 min-[860px]:order-1" : "rotate-3"}`}
              />
            </section>
          ))}
        </div>
      </Band>
      </Optional>

      <Optional id="contact-quote" label="About: quote band">
      <PhotoBand imageKey="pinkBlackStars" className="py-40!">
        <LitText
          text={a.feeling}
          className="mb-6 max-w-[30ch] text-[clamp(26px,4.2vw,44px)] leading-[1.2] font-medium tracking-[-0.02em] text-ink"
        />

        <p className="font-display mb-10 text-[clamp(56px,9vw,110px)] leading-none font-extrabold tracking-[-0.06em] text-nails">
          {siteConfig.business.ownerName.toLowerCase()}
          {siteConfig.business.wordmarkAccent}
        </p>

        <div className="flex flex-col gap-3 min-[560px]:flex-row">
          <Link
            href={`${localePath(locale, "/")}#menu`}
            className="hover-glow rounded-pill bg-[image:var(--hot)] px-7 py-4 text-center text-[15px] font-bold text-on-hot focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            {a.nails}
          </Link>
          <Link
            href={localePath(locale, "/parties")}
            className="hover-fill rounded-pill border border-line px-7 py-4 text-center text-[15px] font-bold text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            {a.party}
          </Link>
        </div>
      </PhotoBand>
      </Optional>

      <Band id="message" tone="butter">
        <BandHead
          eyebrow={c.eyebrow}
          heading={
            <>
              {c.headingLead} <Hot>{c.headingAccent}</Hot>
            </>
          }
          lede={c.lede}
        />
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
        <Band>
          <div className="max-w-[54ch]">
            <h2 className="mb-3 text-[clamp(22px,5vw,30px)]">{c.direct.heading}</h2>
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
