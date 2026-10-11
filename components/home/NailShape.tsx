import { useId } from "react";

/* Each shape's outline, a finger-width nail seen from above, free edge up. */
const PATHS = {
  almond: "M5 64V30C5 13 14 2 20 2s15 11 15 28v34Z",
  coffin: "M5 64V24L11 3h18l6 21v40Z",
  square: "M5 64V9q0-5 5-5h20q5 0 5 5v55Z",
  oval: "M5 64V23a15 17 0 0 1 30 0v41Z",
} as const;

export type NailShapeKind = keyof typeof PATHS;

export function isNailShape(key: string): key is NailShapeKind {
  return key in PATHS;
}

/** A nail silhouette in the hot gradient, for the guide's Shapes column. Decorative. */
export function NailShape({ kind }: { kind: NailShapeKind }) {
  const id = useId();
  return (
    <svg aria-hidden="true" viewBox="0 0 40 66" className="h-12 w-9 shrink-0">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="var(--nails)" />
          <stop offset="1" stopColor="var(--makeup)" />
        </linearGradient>
      </defs>
      <path d={PATHS[kind]} fill={`url(#${id})`} />
      <path d={PATHS[kind]} fill="none" stroke="white" strokeOpacity=".25" />
    </svg>
  );
}
