import { Sparkle } from "lucide-react";
import { useId } from "react";

/**
 * A round seal with a line of text running around its edge, turning slowly,
 * a sparkle still at its centre. Decorative: the text is the page's own
 * eyebrow, already on the page.
 */
export function SpinSeal({ text, className = "" }: { text: string; className?: string }) {
  const id = useId();
  const ring = `${text} · ${text} · `;

  return (
    <div
      aria-hidden="true"
      className={`grid size-36 place-items-center rounded-full bg-[image:var(--hot)] text-on-hot shadow-[0_24px_50px_-18px_rgba(255,61,143,0.7)] ${className}`}
    >
      <svg viewBox="0 0 100 100" className="lift-spin col-start-1 row-start-1 size-full">
        <defs>
          <path id={id} d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" />
        </defs>
        <text className="fill-current text-[8.4px] font-bold tracking-[0.18em] uppercase">
          <textPath href={`#${id}`} textLength="236" lengthAdjust="spacing">
            {ring}
          </textPath>
        </text>
      </svg>
      <Sparkle className="col-start-1 row-start-1 size-8 fill-current" />
    </div>
  );
}
