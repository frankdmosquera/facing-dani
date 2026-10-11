/* Each tip's paint and the angle it swings out to. Written out so Tailwind sees every class. */
const TIPS = [
  { paint: "swatch-cat-eye", angle: "[--a:-52deg] [--i:0]" },
  { paint: "swatch-chrome", angle: "[--a:-26deg] [--i:1]" },
  { paint: "bg-[image:var(--hot)]", angle: "[--a:0deg] [--i:2]" },
  { paint: "swatch-french", angle: "[--a:26deg] [--i:3]" },
  { paint: "swatch-sparkle", angle: "[--a:52deg] [--i:4]" },
];

/**
 * A salon colour fan: painted nail tips on sticks, pinned at the foot and
 * swinging open when the page loads. The finishes are the nail guide's own
 * swatches. Decorative.
 */
export function SwatchFan({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden="true" className={`relative h-[150px] w-[200px] ${className}`}>
      {TIPS.map(({ paint, angle }) => (
        <div
          key={paint}
          className={`lift-fan absolute bottom-3 left-1/2 -ml-[18px] flex w-9 flex-col items-center ${angle}`}
        >
          <span
            className={`nail-almond block h-[50px] w-9 shadow-[0_10px_20px_-8px_rgba(0,0,0,0.6)] ${paint}`}
          />
          <span className="block h-[82px] w-1.5 rounded-b-full bg-[linear-gradient(#f6f2fa,#cbbfd8)]" />
        </div>
      ))}
      {/* The rivet the sticks turn on. */}
      <span className="absolute bottom-1 left-1/2 size-5 -translate-x-1/2 rounded-full bg-[image:var(--hot)] ring-4 ring-ground" />
    </div>
  );
}
