import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Band, Hot } from "@/components/site/Band";
import { PressOnCompare } from "@/components/store/PressOnCompare";
import { PressOnGuide } from "@/components/store/PressOnGuide";
import { StoreCard } from "@/components/store/StoreCard";
import { StoreGrid } from "@/components/store/StoreGrid";
import { SwingTags } from "@/components/store/SwingTags";
import { orderedStoreProducts, type StoreCategory } from "@/data/store";
import { getDictionary } from "@/dictionaries";
import { defaultLocale, isLocale, localePath } from "@/lib/locale";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/store">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getDictionary(locale);

  return {
    title: t.store.meta.title,
    description: t.store.meta.description,
    alternates: {
      canonical: localePath(locale, "/store"),
      languages: {
        en: localePath("en", "/store"),
        es: localePath("es", "/store"),
        "x-default": localePath(defaultLocale, "/store"),
      },
    },
  };
}

// No Product structured data yet: Google wants a real image per product, and there are none until stock is picked.
export default async function Store({ params }: PageProps<"/[locale]/store">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const t = getDictionary(locale);
  const c = t.store;
  const products = orderedStoreProducts();

  const tabs = (Object.keys(c.categories) as StoreCategory[]).map((id) => ({
    id,
    label: c.categories[id],
    count: products.filter((product) => product.category === id).length,
  }));

  return (
    <main id="main">
      <Band className="grain pt-[26px]!">
        <div className="flex flex-col gap-10 min-[1000px]:flex-row min-[1000px]:items-center">
          <div className="min-w-0 flex-1">
            <span className="eyebrow font-body mb-3 text-[11px] font-semibold tracking-[0.18em] text-ink-faint uppercase">
              {c.eyebrow}
            </span>

            <h1 className="mb-4 text-[clamp(40px,8.6vw,78px)]">
              {c.headingLead} <Hot>{c.headingAccent}</Hot>
            </h1>

            <p className="max-w-[54ch] text-base text-ink-muted">{c.lede}</p>
          </div>
          <div className="min-[1000px]:w-[580px] min-[1000px]:shrink-0">
            <SwingTags t={t} />
          </div>
        </div>
      </Band>

      <Band tinted glow={false}>
        <StoreGrid tabs={tabs} allLabel={c.all} tabsLabel={c.tabsLabel}>
          {products.map((product) => (
            <StoreCard key={product.key} product={product} t={t} />
          ))}
        </StoreGrid>
      </Band>

      <PressOnGuide t={t} />

      <PressOnCompare locale={locale} t={t} />

      <Band glow={false} className="tone-hot py-32!">
        <div className="max-w-[54ch]">
          <h2 className="mb-3 text-[clamp(30px,5.6vw,52px)]">{c.buy.heading}</h2>
          <p className="mb-6 text-[15.5px] text-ink-muted">{c.buy.body}</p>
          {/* ?topic=product opens the form on the right option. */}
          <Link
            href={`${localePath(locale, "/contact")}?topic=product`}
            className="hover-glow inline-block rounded-pill bg-[image:var(--hot)] px-7 py-4 text-center text-[15px] font-bold text-on-hot focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            {c.buy.ask}
          </Link>
        </div>
      </Band>
    </main>
  );
}
