/**
 * Numbered steps on a line that draws itself as it scrolls past: the site's one
 * way of telling a sequence (home's "What actually happens", the nails page's
 * steps, the parties page's "How it works"). The number circles are solid
 * cards, so the line runs behind them on any band tone.
 */
export function StepTimeline({
  steps,
}: {
  steps: { key: string; title: string; body: string; time?: string }[];
}) {
  return (
    <ol className="relative max-w-[70ch]">
      <span
        aria-hidden="true"
        className="reveal-draw absolute top-4 bottom-4 left-[27px] w-px bg-[image:linear-gradient(to_bottom,var(--nails),var(--makeup))]"
      />
      {steps.map((step, index) => (
        <li key={step.key} className="reveal relative flex gap-6 py-6">
          <span
            aria-hidden="true"
            className="font-display grid size-14 shrink-0 place-items-center rounded-full border border-line bg-surface text-[22px] font-extrabold"
          >
            <span className="bg-[image:var(--hot-text)] bg-clip-text text-transparent">
              {index + 1}
            </span>
          </span>
          <div className="pt-2">
            <div className="mb-2 flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <h3 className="text-[20px]">{step.title}</h3>
              {step.time ? (
                <span className="rounded-pill border border-line px-2.5 py-0.5 text-[12.5px] font-semibold text-nails">
                  {step.time}
                </span>
              ) : null}
            </div>
            <p className="text-[15px] text-ink-muted">{step.body}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
