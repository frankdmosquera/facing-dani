import { TapedPrint } from "@/components/parties/PartyBoard";
import type { Dictionary } from "@/dictionaries";

/* Each sticker's place around the print and its float offset. */
const STICKERS = [
  { topic: "party", place: "-left-6 top-10 -rotate-6 [--d:0s]" },
  { topic: "question", place: "-right-4 top-1/2 rotate-3 [--d:-1.6s]" },
  { topic: "product", place: "left-2 -bottom-4 -rotate-2 [--d:-3s]" },
] as const;

/**
 * Beside the form: one of her sets taped up, with the things people write
 * about stuck around it. Fills the column the form leaves empty on wide
 * screens. Decorative: the form's own topic picker says the same thing.
 */
export function ContactNote({ t }: { t: Dictionary }) {
  return (
    <div aria-hidden="true" className="relative mx-auto w-[300px] pt-4">
      <TapedPrint imageKey="heartsFrench" className="rotate-3" />
      {STICKERS.map(({ topic, place }, index) => (
        <span
          key={topic}
          className={`lift-float absolute [animation-delay:var(--d)] rounded-pill px-4 py-2 text-[13px] font-bold whitespace-nowrap shadow-[0_18px_30px_-14px_rgba(0,0,0,0.7)] ${index === 1 ? "bg-[image:var(--hot)] text-on-hot" : "border border-line bg-surface text-ink"} ${place}`}
        >
          {t.contact.topics[topic]}
        </span>
      ))}
    </div>
  );
}
