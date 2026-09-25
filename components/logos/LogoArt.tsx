import { Cinzel, Great_Vibes } from "next/font/google";

import { foils, type Foil, type LogoDesign } from "@/data/logoDesigns";

// preload off: the header imports this for the /logos preview, and every other visitor would download both fonts for nothing.
const script = Great_Vibes({ subsets: ["latin"], weight: "400", display: "block", preload: false });
const caps = Cinzel({ subsets: ["latin"], weight: ["500", "600"], display: "block", preload: false });

const wing = {
  pointed: {
    up: "M1,-3 C4,-22 22,-48 50,-46 C61,-44 57,-27 45,-16 C34,-6 14,-1 1,-3 Z",
    low: "M1,2 C12,4 30,10 32,26 C33,38 20,40 13,30 C7,22 3,12 1,2 Z",
    veins: "M3,-4 C16,-18 30,-32 46,-42 M3,-3 C18,-10 32,-14 46,-18 M3,3 C12,10 20,18 25,30",
  },
  round: {
    up: "M1,-2 C6,-26 30,-46 46,-40 C58,-35 52,-14 38,-6 C28,0 12,1 1,-2 Z",
    low: "M1,2 C14,2 32,8 34,22 C36,34 22,38 14,30 C8,24 3,14 1,2 Z",
    veins: "M3,-3 C16,-14 30,-26 42,-35 M3,-2 C18,-8 30,-10 42,-10 M3,3 C12,10 20,18 25,28",
  },
};

const stars: [number, number, number, number][] = [
  [70, 240, 1.4, 0.7], [408, 96, 1.3, 0.8], [152, 92, 0.8, 0.5], [330, 120, 0.8, 0.4],
  [420, 300, 1.1, 0.6], [78, 330, 0.9, 0.5], [350, 402, 1.4, 0.7], [128, 420, 0.8, 0.45],
  [252, 58, 0.9, 0.5], [60, 170, 0.7, 0.45],
];

// Glitter trail along the right edge, like the swirl in the original. Seeded, so server and client draw the same dots.
const trail = (() => {
  let seed = 7;
  const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
  return Array.from({ length: 140 }, () => {
    const t = rnd();
    const angle = ((-70 + t * 150) * Math.PI) / 180;
    const radius = 200 + (rnd() - 0.5) * 26 * (1 - Math.abs(t - 0.5));
    return {
      x: +(240 + radius * Math.cos(angle)).toFixed(1),
      y: +(240 + radius * Math.sin(angle)).toFixed(1),
      r: +(0.5 + rnd() * 1.6).toFixed(2),
      o: +(0.25 + rnd() * 0.7).toFixed(2),
    };
  });
})();

function Butterfly({
  x, y, rotate, scale, fill, body, style,
}: {
  x: number; y: number; rotate: number; scale: number; fill: string; body: string; style: LogoDesign["wingStyle"];
}) {
  const w = wing[style];
  const half = (
    <>
      <path d={w.up} fill={fill} />
      <path d={w.low} fill={fill} />
      {style === "round" ? <path d={w.up} transform="translate(16,-12) scale(.5)" fill="#fff" opacity={0.35} /> : null}
      <path d={w.veins} fill="none" stroke="#fff" strokeWidth={1.1} opacity={0.5} />
    </>
  );
  return (
    <g transform={`translate(${x},${y}) rotate(${rotate}) scale(${scale})`}>
      <g>{half}</g>
      <g transform="scale(-1,1)">{half}</g>
      <ellipse rx={2.5} ry={15} fill={body} />
      <circle cy={-17} r={3} fill={body} />
      <path d="M-1,-19 C-4,-29 -9,-34 -15,-36 M1,-19 C4,-29 9,-34 15,-36" fill="none" stroke={body} strokeWidth={1.2} strokeLinecap="round" />
    </g>
  );
}

// uid keeps gradient ids unique when several logos share a page.
export function LogoArt({ design, uid, className }: { design: LogoDesign; uid: string; className?: string }) {
  const id = (name: string) => `${name}-${design.id}-${uid}`;
  const url = (name: string) => `url(#${id(name)})`;
  const used = new Set<Foil>([design.ring, design.gb, ...design.wings]);
  if (typeof design.title !== "string") used.add(design.title.foil);
  const title = typeof design.title === "string" ? design.title : url(design.title.foil);

  return (
    <svg viewBox="0 0 480 480" className={className} aria-hidden="true">
      <defs>
        <radialGradient id={id("bg")} cx=".42" cy=".36" r=".75">
          <stop offset="0" stopColor={design.bg[0]} />
          <stop offset="1" stopColor={design.bg[1]} />
        </radialGradient>
        {[...used].map((name) => (
          <linearGradient key={name} id={id(name)} x1="0" y1="0" x2="1" y2="1">
            {foils[name].map((color, i, all) => (
              <stop key={i} offset={i / (all.length - 1)} stopColor={color} />
            ))}
          </linearGradient>
        ))}
      </defs>

      <circle cx={240} cy={240} r={232} fill={url("bg")} />
      <circle cx={240} cy={240} r={231} fill="none" stroke={url(design.ring)} strokeWidth={8} />
      <circle cx={240} cy={240} r={217} fill="none" stroke={url(design.ring)} strokeWidth={1.2} opacity={0.6} />

      {design.trail
        ? trail.map((dot, i) => <circle key={i} cx={dot.x} cy={dot.y} r={dot.r} fill={design.trail} opacity={dot.o} />)
        : null}
      {stars.map(([x, y, s, o], i) => (
        <path key={i} transform={`translate(${x},${y}) scale(${s})`} d="M0,-7 L1,-1 L7,0 L1,1 L0,7 L-1,1 L-7,0 L-1,-1 Z" fill={design.star} opacity={o} />
      ))}

      <text x={240} y={184} textAnchor="middle" fontSize={128} fill={url(design.gb)} style={{ fontFamily: script.style.fontFamily }}>
        GB
      </text>
      <text x={240} y={282} textAnchor="middle" fontSize={56} fontWeight={600} letterSpacing={3} fill={title} style={{ fontFamily: caps.style.fontFamily }}>
        GLAMMED
      </text>
      <line x1={112} y1={314} x2={160} y2={314} stroke={design.sub} strokeWidth={1.2} opacity={0.8} />
      <line x1={320} y1={314} x2={368} y2={314} stroke={design.sub} strokeWidth={1.2} opacity={0.8} />
      <text x={244} y={321} textAnchor="middle" fontSize={20} fontWeight={500} letterSpacing={8} fill={design.sub} style={{ fontFamily: caps.style.fontFamily }}>
        BEAUTY
      </text>
      <path transform="translate(240,348) scale(.9)" d="M0,6 C-9,-1 -9,-9 -4,-9 C-2,-9 -1,-8 0,-6 C1,-8 2,-9 4,-9 C9,-9 9,-1 0,6 Z" fill={url(design.gb)} />

      <Butterfly x={104} y={150} rotate={-22} scale={0.72} fill={url(design.wings[0])} body={design.body} style={design.wingStyle} />
      <Butterfly x={378} y={156} rotate={20} scale={0.78} fill={url(design.wings[1])} body={design.body} style={design.wingStyle} />
      <Butterfly x={240} y={408} rotate={-6} scale={1} fill={url(design.wings[2])} body={design.body} style={design.wingStyle} />
    </svg>
  );
}
