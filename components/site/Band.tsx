/* Each tone re-declares the colour tokens (globals.css), so a band can change
   mood without its children knowing. base follows the theme; blush and ink look
   the same in both. */
export type Tone = "base" | "blush" | "ink";

const TONE: Record<Tone, string> = {
  base: "",
  blush: "tone-blush bg-surface-2 text-ink",
  ink: "tone-ink grain bg-ground text-ink",
};

export function Band({
  children,
  glow = true,
  tinted = false,
  tone,
  className,
  id,
}: {
  children: React.ReactNode;
  glow?: boolean;
  // The old flag for the second ground; now the blush band.
  tinted?: boolean;
  tone?: Tone;
  className?: string;
  // For in-page links such as /#faq.
  id?: string;
}) {
  const resolved = tone ?? (tinted ? "blush" : "base");
  return (
    <section
      id={id}
      className={`relative overflow-hidden py-24 ${TONE[resolved]} ${className ?? ""}`}
    >
      {glow ? (
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <i className="absolute -top-24 -left-24 block size-[420px] rounded-full bg-[var(--glow-a)] blur-[var(--glow-blur)]" />
          <i className="absolute top-1/3 -right-32 block size-[380px] rounded-full bg-[var(--glow-b)] blur-[var(--glow-blur)]" />
          <i className="absolute -bottom-32 left-1/4 block size-[320px] rounded-full bg-[var(--glow-c)] blur-[var(--glow-blur)]" />
        </div>
      ) : null}

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
      <span className="font-body mb-3 block text-[11px] font-semibold tracking-[0.18em] text-ink-faint uppercase">
        {eyebrow}
      </span>
      <h2 className="mb-3.5 text-[clamp(34px,6.2vw,60px)]">{heading}</h2>
      {lede ? (
        <p className="max-w-[54ch] text-[15.5px] text-ink-muted">{lede}</p>
      ) : null}
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
