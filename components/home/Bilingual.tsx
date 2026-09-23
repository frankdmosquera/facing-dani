import { Band, BandHead } from "@/components/site/Band";
import type { Dictionary } from "@/dictionaries";

/**
 * The bilingual promise, said out loud.
 *
 * A locked contract in `blueprint/project-plan.md`: a translated site tells a
 * visitor she can read it, a fluent artist tells her she can have the whole
 * appointment in Spanish - the consultation, the aftercare questions, the part
 * where she changes her mind about the shape halfway through. Leaving it
 * implied by the existence of a `/es` URL is exactly what this section exists
 * to prevent.
 *
 * It lived on `/about` until feature 14. The plan always said it belonged on
 * the home page; the page it was actually on was one almost nobody reached.
 *
 * The eyebrow reuses `languageSwitch.to`, which is the other language's own
 * name in its own language - so a Spanish reader meets the word "Español" on
 * the English page and vice versa.
 */
export function Bilingual({ t }: { t: Dictionary }) {
  const c = t.home.bilingual;

  return (
    <Band tinted glow={false}>
      <BandHead eyebrow={t.languageSwitch.to} heading={c.heading} />
      <p className="max-w-[62ch] text-[15.5px] text-ink-muted">{c.body}</p>
    </Band>
  );
}
