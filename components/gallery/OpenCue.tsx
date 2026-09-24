import { Maximize2 } from "lucide-react";

// Touch screens only: with no hover there is no zoom cursor, so nothing else says a photo opens.
export function OpenCue() {
  return (
    <span
      aria-hidden="true"
      className="pointer-events-none absolute top-2 right-2 z-[2] hidden size-7 place-items-center rounded-full border border-white/15 bg-[rgba(20,15,28,.7)] text-ink [@media(hover:none)]:grid"
    >
      <Maximize2 className="size-3.5" />
    </span>
  );
}
