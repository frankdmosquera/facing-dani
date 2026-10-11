import type { Metadata } from "next";
import { Eye, PartyPopper, Sparkles, type LucideIcon } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

import { WorkFan } from "@/components/site/WorkFan";
import { PartyBoard, TapedPrint } from "@/components/parties/PartyBoard";
import { PartyConfetti } from "@/components/parties/PartyConfetti";
import { ReadyChecklist } from "@/components/parties/ReadyChecklist";
import { Band, BandHead, Hot } from "@/components/site/Band";
import { FaqList } from "@/components/site/FaqList";
import { StepTimeline } from "@/components/site/StepTimeline";
import { getDictionary } from "@/dictionaries";
import { defaultLocale, isLocale, localePath } from "@/lib/locale";
import { jsonLd, partiesSchema } from "@/lib/schema";

// One icon per "what I do there" point, by its dictionary key.
const WHAT_ICON: Record<string, LucideIcon> = {
  host: PartyPopper,
  nails: Sparkles,
  extras: Eye,
};

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/parties">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getDictionary(locale);

  return {
    title: t.partiesPage.meta.title,
    description: t.partiesPage.meta.description,
    alternates: {
      canonical: localePath(locale, "/parties"),
      languages: {
        en: localePath("en", "/parties"),
        es: localePath("es", "/parties"),
        "x-default": localePath(defaultLocale, "/parties"),
      },
    },
  };
}

// She is a station at someone else's party, never the organiser: copy must not promise more.
export default async function Parties({
  params,
}: PageProps<"/[locale]/parties">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const t = getDictionary(locale);
  const c = t.partiesPage;
  // ?topic=party opens the form with the party fields showing.
  const askHref = `${localePath(locale, "/contact")}?topic=party`;

  return (
    <main id="main">
      <Band className="pt-[26px]!">
        <PartyConfetti />
        {/* Her work beside the heading, never her (no photo of her on the site). */}
        <div className="flex flex-col gap-12 min-[860px]:flex-row min-[860px]:items-center">
          <div className="min-w-0 flex-1">
            <span className="font-body mb-3 block text-[11px] font-semibold tracking-[0.18em] text-ink-faint uppercase">
              {c.eyebrow}
            </span>

            <h1 className="mb-4 text-[clamp(36px,9vw,62px)]">
              {c.headingLead} <Hot>{c.headingAccent}</Hot>
            </h1>

            <p className="mb-[26px] max-w-[54ch] text-base text-ink-muted">
              {c.lede}
            </p>

            <Link
              href={askHref}
              className="hover-glow inline-block rounded-pill bg-[image:var(--hot)] px-7 py-4 text-center text-[15px] font-bold text-on-hot focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              {c.ask}
            </Link>
          </div>
          <WorkFan
            keys={["pinkFloralArt", "blueGraphicEyeTurned", "pastelFrenchTips"]}
            className="min-[860px]:w-[400px] min-[860px]:shrink-0"
          />
        </div>
      </Band>

      <Band tinted glow={false}>
        <BandHead eyebrow={c.what.eyebrow} heading={c.what.heading} />

        <div className="grid items-center gap-12 min-[960px]:grid-cols-[1fr_1fr] min-[960px]:gap-16">
          <ul className="reveal flex flex-col gap-4">
            {Object.entries(c.what.points).map(([key, point]) => {
              const Icon = WHAT_ICON[key] ?? Sparkles;
              return (
                <li
                  key={key}
                  className="card-hot flex items-start gap-5 rounded-xl border border-line bg-surface p-5"
                >
                  <span
                    aria-hidden="true"
                    className="grid size-12 shrink-0 place-items-center rounded-full bg-[image:var(--hot)] text-on-hot"
                  >
                    <Icon className="size-[22px]" strokeWidth={2} />
                  </span>
                  <div>
                    <h3 className="mb-1.5 text-[19px]">{point.title}</h3>
                    <p className="text-[14.5px] text-ink-muted">{point.body}</p>
                  </div>
                </li>
              );
            })}
          </ul>
          <PartyBoard />
        </div>
      </Band>

      <Band glow={false}>
        <BandHead
          eyebrow={c.ready.eyebrow}
          heading={c.ready.heading}
          lede={c.ready.lede}
        />

        <div className="reveal grid items-center gap-12 min-[960px]:grid-cols-[1.5fr_1fr] min-[960px]:gap-16">
          <ReadyChecklist
            items={Object.entries(c.ready.items).map(([key, item]) => ({
              key,
              ...item,
            }))}
          />
          <TapedPrint
            imageKey="whiteGlitterSquare"
            className="mx-auto w-full max-w-[300px] rotate-3 max-[960px]:hidden"
          />
        </div>
      </Band>

      <Band tinted glow={false}>
        <BandHead eyebrow={c.how.eyebrow} heading={c.how.heading} />

        <StepTimeline
          steps={Object.entries(c.how.steps).map(([key, step]) => ({
            key,
            ...step,
          }))}
          tinted
        />
      </Band>

      <Band glow={false}>
        <BandHead eyebrow={c.faq.eyebrow} heading={c.faq.heading} />
        <FaqList
          items={Object.entries(c.faq.items).map(([key, item]) => ({
            key,
            ...item,
          }))}
        />
      </Band>

      <Band>
        <BandHead
          eyebrow={c.closing.eyebrow}
          heading={
            <>
              {c.closing.headingLead} <Hot>{c.closing.headingAccent}</Hot>
            </>
          }
          lede={c.closing.lede}
        />

        <Link
          href={askHref}
          className="hover-glow inline-block rounded-pill bg-[image:var(--hot)] px-7 py-4 text-center text-[15px] font-bold text-on-hot focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          {c.ask}
        </Link>
      </Band>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(partiesSchema(t)) }}
      />
    </main>
  );
}
