import { Band, BandHead } from "@/components/site/Band";
import type { Dictionary } from "@/dictionaries";

export function Bilingual({ t }: { t: Dictionary }) {
  const c = t.home.bilingual;

  return (
    <Band tinted glow={false}>
      {/* The other language's own name: "Español" on the English page, and the reverse. */}
      <BandHead eyebrow={t.languageSwitch.to} heading={c.heading} />
      <p className="max-w-[62ch] text-[15.5px] text-ink-muted">{c.body}</p>
    </Band>
  );
}
