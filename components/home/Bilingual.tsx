import { Band, BandHead } from "@/components/site/Band";
import type { Dictionary } from "@/dictionaries";

export function Bilingual({ t }: { t: Dictionary }) {
  const c = t.home.bilingual;

  return (
    <Band tinted glow={false}>
      {/* EN and ES set huge and outlined behind the copy: the two languages
          as the picture, since the band is about the language itself. */}
      <div
        aria-hidden="true"
        className="font-display pointer-events-none absolute -right-6 -bottom-24 flex gap-4 text-[clamp(110px,18vw,210px)] leading-none font-extrabold tracking-[-0.06em] text-transparent select-none [-webkit-text-stroke:1.5px_var(--line)] max-[860px]:opacity-60"
      >
        <span>EN</span>
        <span className="bg-[image:var(--hot-text)] bg-clip-text opacity-40 [-webkit-text-stroke:0]">
          ES
        </span>
      </div>
      <div className="reveal relative">
        {/* The other language's own name: "Español" on the English page, and the reverse. */}
        <BandHead eyebrow={t.languageSwitch.to} heading={c.heading} />
        <p className="max-w-[62ch] text-[15.5px] text-ink-muted">{c.body}</p>
      </div>
    </Band>
  );
}
