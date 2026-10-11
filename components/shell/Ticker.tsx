// One copy must be wider than the widest screen, or the strip shows a gap: 3 words are ~290px.
// The animation's duration in globals.css is tied to this count; change both together.
const REPEATS = 8;

export function Ticker({ words }: { words: string[] }) {
  const row = Array.from({ length: REPEATS }, () => words).flat();

  return (
    <div
      aria-hidden="true"
      className="overflow-hidden border-b-2 border-[color:var(--brand-ink)] bg-[color:var(--brand-ink)] py-2"
    >
      {/* The words render twice and slide exactly -50%, which makes the loop seamless. */}
      <div className="flex w-max animate-ticker motion-reduce:animate-none">
        {[0, 1].map((copy) => (
          <ul key={copy} className="flex shrink-0">
            {row.map((word, i) => (
              <li
                key={`${copy}-${i}`}
                className="px-3.5 text-[10px] font-bold tracking-[0.18em] whitespace-nowrap text-[color:var(--brand-cream)] uppercase before:mr-3.5 before:text-[color:var(--brand-accent)] before:content-['✦']"
              >
                {word}
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
