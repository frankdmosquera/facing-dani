/* Each piece: where it sits, its shape and colour, and how far out of step it
   drifts. Written out so Tailwind sees every class. Kept to the edges and the
   picture side, clear of the heading. */
const PIECES = [
  "left-[2%] top-[8%] h-4 w-2 rounded-sm bg-nails rotate-12",
  "right-[24%] top-[44%] size-2.5 rounded-full bg-makeup [--d:1.2s]",
  "left-[44%] top-[4%] h-3 w-1.5 rounded-sm bg-lashes -rotate-12 [--d:0.6s]",
  "left-[52%] bottom-[6%] size-2 rounded-full bg-nails [--d:2s]",
  "right-[34%] top-[60%] h-4 w-2 rounded-sm bg-makeup rotate-45 [--d:1.6s] max-[860px]:hidden",
  "right-[30%] top-[2%] size-3 rounded-full bg-lashes [--d:0.3s]",
  "right-[4%] top-[14%] h-5 w-2 rounded-sm bg-nails -rotate-[30deg] [--d:2.4s]",
  "right-[2%] top-[52%] size-2.5 rounded-full bg-makeup [--d:0.9s]",
  "right-[18%] bottom-[4%] h-4 w-2 rounded-sm bg-lashes rotate-[20deg] [--d:1.8s]",
  "right-[38%] bottom-[16%] size-2 rounded-full bg-nails [--d:2.8s] max-[860px]:hidden",
  "right-[10%] top-[34%] h-3 w-1.5 rounded-sm bg-makeup -rotate-45 [--d:0.5s]",
  "right-[12%] bottom-[14%] h-3 w-1.5 rounded-sm bg-makeup rotate-[60deg] [--d:2.2s]",
];

/** Confetti drifting around a party band. Decorative; sits behind the content. */
export function PartyConfetti() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      {PIECES.map((piece) => (
        <i
          key={piece}
          className={`lift-confetti absolute block opacity-80 ${piece}`}
        />
      ))}
    </div>
  );
}
