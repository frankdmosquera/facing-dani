/* Each tone re-declares the colour tokens (globals.css), so a band can change
   mood without its children knowing. base follows the mode; the others are
   solid blocks that look the same in both, edged top and bottom in ink. */
export type Tone = "base" | "blush" | "butter" | "hot" | "ink";

const TONE: Record<Tone, string> = {
  base: "",
  blush: "tone-blush bg-ground text-ink border-y-2 border-[color:var(--brand-ink)]",
  butter: "tone-butter bg-ground text-ink border-y-2 border-[color:var(--brand-ink)]",
  hot: "tone-hot bg-ground text-ink border-y-2 border-[color:var(--brand-ink)]",
  ink: "tone-ink grain bg-ground text-ink border-y-2 border-[color:var(--brand-ink)]",
};

export function Band({
  children,
  tinted = false,
  tone,
  className,
  id,
  backdrop,
}: {
  children: React.ReactNode;
  // The old flag for the second ground; now the blush band.
  tinted?: boolean;
  tone?: Tone;
  className?: string;
  // For in-page links such as /#faq.
  id?: string;
  // Full-bleed layer behind the content, such as BandPhoto.
  backdrop?: React.ReactNode;
}) {
  const resolved = tone ?? (tinted ? "blush" : "base");
  return (
    <section
      id={id}
      /* clip, not hidden: hidden makes the band a scroll box, and sticky children inside it stop sticking. */
      className={`relative overflow-clip py-24 ${TONE[resolved]} ${className ?? ""}`}
    >
      {backdrop}
      <div className="relative mx-auto w-full max-w-[var(--site)] px-[var(--gutter)]">
        {children}
      </div>
    </section>
  );
}

export function BandHead({
  eyebrow,
  heading,
  lede,
}: {
  eyebrow: string;
  heading: React.ReactNode;
  lede?: string;
}) {
  return (
    <div className="mb-[34px]">
      <span className="eyebrow mb-5">{eyebrow}</span>
      <h2 className="mb-4 text-[clamp(44px,8vw,96px)]">{heading}</h2>
      {lede ? (
        <p className="max-w-[54ch] text-[17px] leading-[1.55] text-ink-muted">{lede}</p>
      ) : null}
    </div>
  );
}

/** A band's heading held on the left while its content scrolls past on the right, from 960px. */
export function Split({
  head,
  children,
}: {
  head: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-2 min-[960px]:grid-cols-[minmax(0,400px)_1fr] min-[960px]:gap-16">
      <div className="min-[960px]:sticky min-[960px]:top-28 min-[960px]:self-start min-[960px]:[&_h2]:text-[clamp(40px,4.6vw,60px)]">
        {head}
      </div>
      <div className="min-w-0">{children}</div>
    </div>
  );
}

export function Hot({ children }: { children: React.ReactNode }) {
  return (
    <span className="bg-[image:var(--hot-text)] bg-clip-text text-transparent">
      {children}
    </span>
  );
}
