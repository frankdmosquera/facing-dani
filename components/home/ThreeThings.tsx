import Link from "next/link";

import { Photo } from "@/components/media/Photo";
import { galleryImage, type GalleryKey } from "@/data/gallery";
import type { Dictionary } from "@/dictionaries";
import { localePath, type Locale } from "@/lib/locale";

// The three things she does, as one small strip: home stays about nails, the other two get a door each.
const THINGS: { key: "nails" | "parties" | "store"; href: string; photo: GalleryKey }[] = [
  { key: "nails", href: "#menu", photo: "frenchGlitterGems" },
  { key: "parties", href: "/parties", photo: "heartsFrench" },
  { key: "store", href: "/store", photo: "pastelFrenchTips" },
];

export function ThreeThings({ locale, t }: { locale: Locale; t: Dictionary }) {
  return (
    <section className="px-[var(--gutter)] py-16">
      <ul className="mx-auto grid max-w-[var(--site)] gap-5 min-[700px]:grid-cols-3">
        {THINGS.map((thing, index) => {
          const image = galleryImage(thing.photo);
          const href = thing.href.startsWith("#") ? thing.href : localePath(locale, thing.href);
          return (
            <li key={thing.key}>
              <Link
                href={href}
                className={`card-hot group flex items-center gap-4 rounded-[22px] bg-surface p-3 pr-5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring ${index === 1 ? "min-[700px]:rotate-1" : "min-[700px]:-rotate-1"}`}
              >
                {image ? (
                  <span aria-hidden="true" className="block size-20 shrink-0 overflow-hidden rounded-[14px] border-2 border-line bg-shot">
                    <Photo
                      path={image.imagekitPath}
                      alt=""
                      width={image.width}
                      height={image.height}
                      sizes="80px"
                      className="block h-full w-full object-cover transition-[scale] duration-500 group-hover:scale-110"
                    />
                  </span>
                ) : null}
                <span className="font-display flex-1 text-[30px] leading-none font-extrabold tracking-[-0.04em] text-ink lowercase">
                  {t.nav[thing.key]}
                </span>
                <span aria-hidden="true" className="font-display text-[28px] font-extrabold text-nails transition-[translate] duration-200 group-hover:translate-x-1">
                  &rarr;
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
