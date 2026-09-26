// One copy must be wider than the widest screen, or the strip shows a gap: 3 words are ~290px.
// The animation's duration in globals.css is tied to this count; change both together.
const REPEATS = 8;

export function Ticker({ words }: { words: string[] }) {
  const row = Array.from({ length: REPEATS }, () => words).flat();

  return (
    <div
      aria-hidden="true"
      className="overflow-hidden bg-[linear-gradient(90deg,var(--nails),var(--lashes),var(--makeup))] py-2"
    >
      {/* The words render twice and slide exactly -50%, which makes the loop seamless. */}
      <div className="flex w-max animate-ticker motion-reduce:animate-none">
        {[0, 1].map((copy) => (
          <ul key={copy} className="flex shrink-0">
            {row.map((word, i) => (
              <li
                key={`${copy}-${i}`}
                className="px-3.5 text-[10px] font-bold tracking-[0.18em] whitespace-nowrap text-on-hot uppercase before:mr-3.5 before:content-['·']"
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
