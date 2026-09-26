import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Band, BandHead, Hot } from "@/components/site/Band";
import { FaqList } from "@/components/site/FaqList";
import { getDictionary } from "@/dictionaries";
import { defaultLocale, isLocale, localePath } from "@/lib/locale";
import { jsonLd, partiesSchema } from "@/lib/schema";

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
      </Band>

      <Band tinted glow={false}>
        <BandHead eyebrow={c.what.eyebrow} heading={c.what.heading} />

        <ul className="grid gap-4 min-[860px]:grid-cols-3 min-[860px]:gap-5">
          {Object.entries(c.what.points).map(([key, point]) => (
            <li key={key} className="rounded-xl border border-line bg-surface p-5">
              <h3 className="mb-2 text-[18px]">{point.title}</h3>
              <p className="text-[14.5px] text-ink-muted">{point.body}</p>
            </li>
          ))}
        </ul>
      </Band>

      <Band glow={false}>
        <BandHead
          eyebrow={c.ready.eyebrow}
          heading={c.ready.heading}
          lede={c.ready.lede}
        />

        <ul className="grid gap-4 min-[640px]:grid-cols-2 min-[1024px]:grid-cols-4 min-[1024px]:gap-5">
          {Object.entries(c.ready.items).map(([key, item]) => (
            <li key={key} className="rounded-xl border border-line bg-surface p-5">
              <h3 className="mb-2 text-[17px]">{item.title}</h3>
              <p className="text-[14.5px] text-ink-muted">{item.body}</p>
            </li>
          ))}
        </ul>
      </Band>

      <Band tinted glow={false}>
        <BandHead eyebrow={c.how.eyebrow} heading={c.how.heading} />

        <ol className="max-w-[66ch]">
          {Object.entries(c.how.steps).map(([key, step], index) => (
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

      <Band glow={false}>
        <BandHead eyebrow={c.faq.eyebrow} heading={c.faq.heading} />
        <FaqList
          items={Object.entries(c.faq.items).map(([key, item]) => ({ key, ...item }))}
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
