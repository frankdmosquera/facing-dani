import Link from "next/link";

import { Photo } from "@/components/media/Photo";
import { Band, BandHead } from "@/components/site/Band";
import { orderedGallery } from "@/data/gallery";
import { services } from "@/data/services";
import type { Dictionary } from "@/dictionaries";
import { localePath, type Locale } from "@/lib/locale";

const accentText: Record<(typeof services)[number]["id"], string> = {
  nails: "text-nails",
  lashes: "text-lashes",
  makeup: "text-makeup",
};

const accentBar: Record<(typeof services)[number]["id"], string> = {
  nails: "bg-nails",
  lashes: "bg-lashes",
  makeup: "bg-makeup",
};


export function ServiceCards({
  locale,
  t,
}: {
  locale: Locale;
  t: Dictionary;
}) {
  const c = t.home.services;

  const ordered = [...services].sort((a, b) => a.order - b.order);

  // All three covers or none: the grid stretches cards, so one photo leaves big empty gaps in the others.
  const covers = ordered.map((service) =>
    orderedGallery().find((image) => image.serviceId === service.id),
  );
  const everyServiceHasOne = covers.every((cover) => cover !== undefined);

  return (
    <Band tinted glow={false}>
      <BandHead eyebrow={c.eyebrow} heading={c.heading} lede={c.lede} />

      <ul className="grid gap-4 min-[860px]:grid-cols-3 min-[860px]:gap-5">
        {ordered.map((service, index) => {
          const cover = everyServiceHasOne ? covers[index] : undefined;

          return (
            <li
              key={service.id}
              className="flex flex-col overflow-hidden rounded-xl border border-line bg-surface"
            >
              {cover ? (
                <div className="aspect-[4/3] overflow-hidden bg-shot">
                  <Photo
                    path={cover.imagekitPath}
                    alt={t.gallery.images[cover.key]}
                    width={cover.width}
                    height={cover.height}
                    sizes="(min-width: 860px) 380px, 100vw"
                    className="size-full object-cover"
                  />
                </div>
              ) : null}

              <span
                aria-hidden="true"
                className={`block h-1 w-full ${accentBar[service.id]}`}
              />

              <div className="flex flex-1 flex-col p-5">
                <h3 className="mb-2 text-[21px]">
                  {t.services[service.id].name}
                </h3>

                <p className="mb-4 text-[13.5px] text-ink-muted">
                  {t.services[service.id].blurb}
                </p>

                <Link
                  href={localePath(locale, service.href)}
                  className={`mt-auto inline-flex items-center gap-2 text-[13.5px] font-bold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring ${accentText[service.id]}`}
                >
                  {c.more}
                  <span aria-hidden="true">&rarr;</span>
                </Link>
              </div>
            </li>
          );
        })}
      </ul>
    </Band>
  );
}
