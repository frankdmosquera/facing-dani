import { siteConfig } from "@/data/siteConfig";

export function Ticker() {
  const words = siteConfig.marquee;

  return (
    <div
      aria-hidden="true"
      className="overflow-hidden bg-[linear-gradient(90deg,var(--nails),var(--lashes),var(--makeup))] py-2"
    >
      {/* The words render twice and slide exactly -50%, which makes the loop seamless. */}
      <div className="flex w-max animate-ticker motion-reduce:animate-none">
        {[0, 1].map((copy) => (
          <ul key={copy} className="flex shrink-0">
            {words.map((word) => (
              <li
                key={`${copy}-${word}`}
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
