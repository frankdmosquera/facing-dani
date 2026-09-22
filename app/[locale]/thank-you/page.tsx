import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Band, Hot } from "@/components/site/Band";
import { getDictionary } from "@/dictionaries";
import { defaultLocale, isLocale, localePath } from "@/lib/locale";

/**
 * Where a successful submit lands, so a sent form is unambiguous.
 *
 * Deliberately a real page rather than an inline "thanks" swapped into the
 * form: the plan asks for a page, and a URL change is the clearest possible
 * signal that something happened - it survives a back button, a refresh and a
 * screen reader.
 */
export async function generateMetadata({
  params,
}: PageProps<"/[locale]/thank-you">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getDictionary(locale);

  return {
    title: t.thankYou.meta.title,
    description: t.thankYou.meta.description,
    /**
     * Kept out of search. A thank-you page ranks for nothing useful, and
     * landing on it from Google tells someone their message was sent when it
     * was not. `follow` stays on so the links out of it still count.
     */
    robots: { index: false, follow: true },
    alternates: {
      canonical: localePath(locale, "/thank-you"),
      languages: {
        en: localePath("en", "/thank-you"),
        es: localePath("es", "/thank-you"),
        "x-default": localePath(defaultLocale, "/thank-you"),
      },
    },
  };
}

export default async function ThankYou({
  params,
}: PageProps<"/[locale]/thank-you">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const t = getDictionary(locale);
  const c = t.thankYou;

  return (
    <main id="main">
      <Band className="pt-[26px]!">
        <span className="font-body mb-3 block text-[11px] font-semibold tracking-[0.18em] text-ink-faint uppercase">
          {c.eyebrow}
        </span>

        <h1 className="mb-4 text-[clamp(36px,9vw,62px)]">
          {c.headingLead} <Hot>{c.headingAccent}</Hot>
        </h1>

        <p className="mb-8 max-w-[54ch] text-base text-ink-muted">{c.lede}</p>

        <p className="mb-5 text-[15px] text-ink-muted">{c.next}</p>

        <div className="flex flex-col gap-3 min-[560px]:flex-row">
          <Link
            href={localePath(locale, "/gallery")}
            className="rounded-pill bg-[image:var(--hot)] px-7 py-4 text-center text-[15px] font-bold text-on-hot focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            {c.gallery}
          </Link>
          <Link
            href={localePath(locale, "/")}
            className="rounded-pill border border-line px-7 py-4 text-center text-[15px] font-bold text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            {c.home}
          </Link>
        </div>
      </Band>
    </main>
  );
}
