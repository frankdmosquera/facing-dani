import Link from "next/link";

import { Photo } from "@/components/media/Photo";
import { galleryImage, orderedGallery, type GalleryKey } from "@/data/gallery";

import { BackdropChoice } from "./BackdropChoice";
import { Hot } from "./Band";

/*
 * The hero designs Frank chooses between (siteConfig.hero, or the options
 * panel in dev). Home: b, c, d (a, the framed photo, was dropped 2026-10-11).
 * Parties has its own: e, f. Same words in all:
 *   b  the headline on the page, three of her photos stacked beside it
 *   c  her photo edge to edge, the headline centred and huge
 *   d  the headline centred, a ribbon of her sets drifting underneath
 *   e  a solid block, the headline on it, her sets pinned up as polaroids
 *   f  split screen: her photo on one half, a dark block with the headline
 * Photos are decorative: every one is in the gallery with its alt text.
 */
export type HeroContent = {
  eyebrow: string;
  lead: string;
  accent: string;
  lede: string;
  primary: { href: string; label: string };
  secondary?: { href: string; label: string };
  sticker?: React.ReactNode;
  photos: readonly [GalleryKey, GalleryKey, GalleryKey];
};

export type HeroVariant = "b" | "c" | "d" | "e" | "f";

const ON_PHOTO =
  "rounded-pill border-2 border-[color:var(--brand-ink)] px-7 py-4 text-center text-[15px] font-bold shadow-[4px_4px_0_var(--brand-ink)] transition-[translate,box-shadow] duration-150 hover:-translate-0.5 hover:shadow-[6px_6px_0_var(--brand-ink)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";

function PhotoActions({ content }: { content: HeroContent }) {
  return (
    <div className="flex flex-col gap-3 min-[560px]:flex-row">
      <Link href={content.primary.href} className={`${ON_PHOTO} bg-white text-[color:var(--brand-ink)]`}>
        {content.primary.label}
      </Link>
      {content.secondary ? (
        <Link href={content.secondary.href} className={`${ON_PHOTO} bg-[color:var(--brand-sticker)] text-[color:var(--brand-ink)]`}>
          {content.secondary.label}
        </Link>
      ) : null}
    </div>
  );
}

function Fill({ k, priority = false, sizes }: { k: GalleryKey; priority?: boolean; sizes: string }) {
  const image = galleryImage(k);
  if (!image) return null;
  return (
    <Photo
      path={image.imagekitPath}
      alt=""
      width={image.width}
      height={image.height}
      sizes={sizes}
      priority={priority}
      className="block h-full w-full object-cover"
    />
  );
}

const STACK = [
  "left-0 top-14 w-[56%] -rotate-[8deg]",
  "right-0 top-0 w-[54%] rotate-[7deg]",
  "left-[22%] bottom-0 z-10 w-[56%] -rotate-1",
];

function HeroB({ content }: { content: HeroContent }) {
  return (
    <section className="relative overflow-clip px-[var(--gutter)] pt-10 pb-20">
      <BackdropChoice id="hero-b" label="Hero B" options={["frenchGlitterGems", "peachFrenchGems", "pinkFrenchCrystals"]} strength="medium" />
      <div className="relative mx-auto grid max-w-[var(--site)] items-center gap-12 min-[900px]:grid-cols-[1.1fr_1fr]">
        <div className="min-w-0">
          <span className="lift-rise eyebrow mb-5">{content.eyebrow}</span>
          <h1 className="mb-6 text-[clamp(56px,9vw,132px)] leading-[0.88]">
            <span className="lift-rise inline-block [--i:1]">{content.lead}</span>{" "}
            <span className="lift-rise inline-block [--i:2]">
              <Hot>{content.accent}</Hot>
            </span>
          </h1>
          <p className="lift-rise mb-8 max-w-[50ch] text-[17px] leading-[1.55] text-ink-muted [--i:3]">{content.lede}</p>
          <div className="lift-rise flex flex-col gap-3 [--i:4] min-[560px]:flex-row">
            <Link
              href={content.primary.href}
              className="hover-glow rounded-pill bg-[image:var(--hot)] px-7 py-4 text-center text-[15px] font-bold text-on-hot focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              {content.primary.label}
            </Link>
            {content.secondary ? (
              <Link
                href={content.secondary.href}
                className="hover-fill rounded-pill border px-7 py-4 text-center text-[15px] font-bold text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              >
                {content.secondary.label}
              </Link>
            ) : null}
          </div>
        </div>

        <div aria-hidden="true" className="relative mx-auto aspect-square w-full max-w-[560px]">
          {content.photos.map((k, i) => (
            <div
              key={k}
              className={`absolute aspect-[4/5] overflow-hidden rounded-[24px] border-2 border-line bg-shot shadow-[8px_8px_0_var(--shadow)] ${STACK[i]}`}
            >
              <Fill k={k} priority={i === 2} sizes="(min-width: 900px) 320px, 56vw" />
            </div>
          ))}
          {content.sticker ? (
            <div className="sticker absolute top-[38%] -left-2 z-20 size-28 min-[900px]:size-36">{content.sticker}</div>
          ) : null}
        </div>
      </div>
    </section>
  );
}

function HeroC({ content }: { content: HeroContent }) {
  return (
    <section className="on-dark relative flex min-h-[min(92svh,900px)] flex-col justify-end overflow-hidden border-b-2 border-[color:var(--brand-ink)] bg-[color:var(--brand-ink)]">
      <div aria-hidden="true" className="absolute inset-0">
        <Fill k={content.photos[0]} priority sizes="100vw" />
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(to_top,var(--brand-ink)_4%,color-mix(in_oklab,var(--brand-ink)_55%,transparent)_45%,color-mix(in_oklab,var(--brand-ink)_20%,transparent))]"
      />
      <div className="relative mx-auto w-full max-w-[1400px] px-[var(--gutter)] pt-48 pb-14 text-center text-[color:var(--brand-cream)]">
        <span className="lift-rise eyebrow mb-6">{content.eyebrow}</span>
        <h1 className="mx-auto mb-7 text-[clamp(64px,13vw,220px)] leading-[0.82]">
          <span className="lift-rise inline-block [--i:1]">{content.lead}</span>{" "}
          <span className="lift-rise inline-block text-[color:var(--brand-accent)] [--i:2]">{content.accent}</span>
        </h1>
        <p className="lift-rise mx-auto mb-9 max-w-[52ch] text-[16px] leading-[1.55] opacity-90 [--i:3]">{content.lede}</p>
        <div className="lift-rise flex justify-center [--i:4]">
          <PhotoActions content={content} />
        </div>
      </div>
      {content.sticker ? (
        <div className="sticker absolute top-8 right-8 size-28 min-[760px]:size-40">{content.sticker}</div>
      ) : null}
    </section>
  );
}

function GroundActions({ content }: { content: HeroContent }) {
  return (
    <div className="flex flex-col gap-3 min-[560px]:flex-row">
      <Link
        href={content.primary.href}
        className="hover-glow rounded-pill bg-[image:var(--hot)] px-7 py-4 text-center text-[15px] font-bold text-on-hot focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
      >
        {content.primary.label}
      </Link>
      {content.secondary ? (
        <Link
          href={content.secondary.href}
          className="hover-fill rounded-pill border px-7 py-4 text-center text-[15px] font-bold text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          {content.secondary.label}
        </Link>
      ) : null}
    </div>
  );
}

/* d: the headline centred on the page, a ribbon of her sets drifting underneath, tilted in turn. */
function HeroD({ content }: { content: HeroContent }) {
  const strip = orderedGallery()
    .filter((image) => image.serviceId === "nails")
    .slice(0, 8)
    .map((image) => image.key);
  return (
    <section className="relative overflow-clip pt-12 pb-16">
      <BackdropChoice id="hero-d" label="Hero D" options={["goldLeafFrench", "palePinkGloss", "pinkBlackStars"]} strength="medium" />
      <div className="relative mx-auto max-w-[var(--site)] px-[var(--gutter)] text-center">
        <span className="lift-rise eyebrow mb-6">{content.eyebrow}</span>
        <h1 className="mx-auto mb-6 max-w-[12ch] text-[clamp(60px,11vw,170px)] leading-[0.84]">
          <span className="lift-rise inline-block [--i:1]">{content.lead}</span>{" "}
          <span className="lift-rise inline-block [--i:2]">
            <Hot>{content.accent}</Hot>
          </span>
        </h1>
        <p className="lift-rise mx-auto mb-8 max-w-[52ch] text-[17px] leading-[1.55] text-ink-muted [--i:3]">{content.lede}</p>
        <div className="lift-rise flex justify-center [--i:4]">
          <GroundActions content={content} />
        </div>
        {content.sticker ? (
          <div className="sticker absolute top-0 right-[var(--gutter)] size-28 max-[760px]:hidden min-[1000px]:size-36">
            {content.sticker}
          </div>
        ) : null}
      </div>

      <div aria-hidden="true" className="relative mt-14 overflow-hidden py-4">
        <div className="lift-side flex w-max gap-6 [animation-duration:60s]">
          {[...strip, ...strip].map((k, i) => (
            <div
              key={`${k}-${i}`}
              className={`aspect-[4/5] w-[200px] shrink-0 overflow-hidden rounded-[20px] border-2 border-line bg-shot shadow-[6px_6px_0_var(--shadow)] min-[760px]:w-[240px] ${i % 2 ? "rotate-2" : "-rotate-2"}`}
            >
              <Fill k={k} sizes="240px" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* e (parties): a solid sticker-colour block, the headline on it, her sets pinned up like polaroids. */
const PINNED = ["left-[4%] top-[6%] -rotate-6", "right-[2%] top-0 rotate-6", "left-[26%] bottom-0 z-10 rotate-1"];

function HeroE({ content }: { content: HeroContent }) {
  return (
    <section className="tone-butter relative overflow-clip border-b-2 border-[color:var(--brand-ink)] bg-ground px-[var(--gutter)] pt-12 pb-20 text-ink">
      <div className="mx-auto grid max-w-[var(--site)] items-center gap-12 min-[900px]:grid-cols-[1.1fr_1fr]">
        <div className="min-w-0">
          <span className="lift-rise eyebrow mb-5 bg-white!">{content.eyebrow}</span>
          <h1 className="mb-6 text-[clamp(56px,9vw,132px)] leading-[0.88]">
            <span className="lift-rise inline-block [--i:1]">{content.lead}</span>{" "}
            <span className="lift-rise inline-block [--i:2]">
              <Hot>{content.accent}</Hot>
            </span>
          </h1>
          <p className="lift-rise mb-8 max-w-[50ch] text-[17px] leading-[1.55] text-ink-muted [--i:3]">{content.lede}</p>
          <div className="lift-rise [--i:4]">
            <GroundActions content={content} />
          </div>
        </div>

        <div aria-hidden="true" className="relative mx-auto aspect-square w-full max-w-[520px]">
          {content.photos.map((k, i) => (
            <div
              key={k}
              className={`absolute w-[52%] rounded-lg border-2 border-line bg-white p-2.5 pb-9 shadow-[8px_8px_0_var(--shadow)] ${PINNED[i]}`}
            >
              <span className="absolute -top-3 left-1/2 z-10 h-6 w-16 -translate-x-1/2 -rotate-3 rounded-sm bg-[color:var(--brand-hot)] opacity-90" />
              <div className="aspect-[4/5] overflow-hidden rounded-md bg-shot">
                <Fill k={k} priority={i === 2} sizes="(min-width: 900px) 280px, 52vw" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* f (parties): split screen, her photo edge to edge on one half, a dark block with the headline on the other. */
function HeroF({ content }: { content: HeroContent }) {
  return (
    <section className="grid border-b-2 border-[color:var(--brand-ink)] min-[900px]:min-h-[min(84svh,820px)] min-[900px]:grid-cols-2">
      <div aria-hidden="true" className="relative min-h-[320px] overflow-hidden border-[color:var(--brand-ink)] bg-shot max-[900px]:border-b-2 min-[900px]:border-r-2">
        <div className="absolute inset-0">
          <Fill k={content.photos[0]} priority sizes="(min-width: 900px) 50vw, 100vw" />
        </div>
      </div>
      <div className="tone-ink flex flex-col justify-center bg-ground px-[var(--gutter)] py-16 text-ink min-[900px]:px-14">
        <span className="lift-rise eyebrow mb-5 self-start">{content.eyebrow}</span>
        <h1 className="mb-6 text-[clamp(52px,7vw,112px)] leading-[0.88]">
          <span className="lift-rise inline-block [--i:1]">{content.lead}</span>{" "}
          <span className="lift-rise inline-block [--i:2]">
            <Hot>{content.accent}</Hot>
          </span>
        </h1>
        <p className="lift-rise mb-8 max-w-[46ch] text-[17px] leading-[1.55] text-ink-muted [--i:3]">{content.lede}</p>
        <div className="lift-rise [--i:4]">
          <GroundActions content={content} />
        </div>
      </div>
    </section>
  );
}

export function HeroVariantView({ variant, content }: { variant: HeroVariant; content: HeroContent }) {
  if (variant === "b") return <HeroB content={content} />;
  if (variant === "d") return <HeroD content={content} />;
  if (variant === "e") return <HeroE content={content} />;
  if (variant === "f") return <HeroF content={content} />;
  return <HeroC content={content} />;
}
