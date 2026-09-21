/**
 * A page section, with the glow treatment from the mockup.
 *
 * The glow is three blurred colour blobs behind the content, sized and blurred
 * from the `--glow-*` tokens. They live in the theme rather than the markup so
 * that changing the theme reskins the page - and so light mode's "glow becomes
 * tint" rule works without touching a component.
 *
 * `aria-hidden` on the glow because it is decoration. No animation, so nothing
 * to stop under reduced motion.
 */
export function Band({
  children,
  glow = true,
  tinted = false,
  className,
}: {
  children: React.ReactNode;
  glow?: boolean;
  /** Alternating band background, for rhythm down the page. */
  tinted?: boolean;
  className?: string;
}) {
  return (
    <section
      className={`relative overflow-hidden py-24 ${tinted ? "bg-surface-2" : ""} ${className ?? ""}`}
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

/** Eyebrow, heading and optional lede, the same shape in every band. */
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
      <h2 className="mb-3.5 text-[clamp(30px,7vw,46px)]">{heading}</h2>
      {lede ? (
        <p className="max-w-[54ch] text-[15.5px] text-ink-muted">{lede}</p>
      ) : null}
    </div>
  );
}

/** The gradient treatment on part of a heading. */
export function Hot({ children }: { children: React.ReactNode }) {
  return (
    <span className="bg-[image:var(--hot)] bg-clip-text text-transparent">
      {children}
    </span>
  );
}
