import { BandHead } from "@/components/site/Band";
import { PhotoBand } from "@/components/site/PhotoBand";
import type { Dictionary } from "@/dictionaries";

export function Bilingual({ t }: { t: Dictionary }) {
  const c = t.home.bilingual;

  return (
    <PhotoBand imageKey="frenchGlitterGems">
      {/* EN and ES set huge and outlined behind the copy: the two languages
          as the picture, since the band is about the language itself. */}
      <div
        aria-hidden="true"
        className="font-display pointer-events-none absolute -right-6 -bottom-40 flex gap-4 text-[clamp(110px,22vw,280px)] leading-none font-extrabold tracking-[-0.06em] text-transparent select-none [-webkit-text-stroke:1.5px_rgb(255_255_255/0.35)] max-[860px]:opacity-60"
      >
        <span>EN</span>
        <span className="bg-[image:var(--hot-text)] bg-clip-text opacity-80 [-webkit-text-stroke:0]">
          ES
        </span>
      </div>
      <div className="reveal relative py-10">
        {/* The other language's own name: "Español" on the English page, and the reverse. */}
        <BandHead eyebrow={t.languageSwitch.to} heading={c.heading} />
        <p className="max-w-[62ch] text-[16.5px] text-ink-muted">{c.body}</p>
      </div>
    </PhotoBand>
  );
}
