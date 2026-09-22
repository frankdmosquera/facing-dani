import type { ServiceId } from "@/data/services";
import { treatmentLabel, treatmentsFor } from "@/data/treatments";
import type { Dictionary } from "@/dictionaries";
import { formatDuration, formatPrice } from "@/lib/format";

/**
 * What a service costs, as a list rather than a table.
 *
 * A `<table>` would be the semantically tidy choice for three columns, but this
 * is one row of prose per treatment - a name, how long it takes, what it costs -
 * and a two-column price list collapses far better on a phone, which is the
 * product. A definition list keeps the label/value pairing without pretending
 * there is a grid.
 *
 * Generic over the service so the label lookup stays checked: `row.key` is
 * constrained to that service's own treatment keys, so this cannot render a
 * lash label against a nails price.
 */
export function TreatmentList<S extends ServiceId>({
  serviceId,
  t,
}: {
  serviceId: S;
  t: Dictionary;
}) {
  const rows = treatmentsFor(serviceId);
  const copy = t.services[serviceId];

  /**
   * Not a stub. Until Dani sets her prices this is what the page shows, and it
   * has to read as a new artist still pricing her work rather than as a broken
   * page. It also keeps a route that the header already links to from being a
   * dead end.
   */
  if (rows.length === 0) {
    return (
      <div className="mx-auto max-w-[56ch] rounded-xl border border-line bg-surface p-7 text-center">
        <h2 className="mb-3 text-[clamp(20px,4.5vw,26px)]">
          {copy.empty.heading}
        </h2>
        <p className="text-[15px] text-ink-muted">{copy.empty.body}</p>
      </div>
    );
  }

  return (
    <dl className="max-w-[70ch]">
      {rows.map((row) => (
        <div
          key={String(row.key)}
          className="flex items-baseline justify-between gap-6 border-b border-line-soft py-4 last:border-b-0"
        >
          <div>
            <dt className="text-[16.5px] font-medium text-ink">
              {treatmentLabel(t, serviceId, row.key)}
            </dt>
            <dd className="mt-1 text-[13.5px] text-ink-faint">
              {t.treatmentList.durationLabel}{" "}
              {formatDuration(row.durationMinutes)}
            </dd>
          </div>

          {/* The price is the one number a visitor is looking for, so it gets
              the display face and its own column. Not the service accent: at
              this size the accent fills fail contrast, and colour on this site
              means navigation rather than emphasis. */}
          <dd className="font-display shrink-0 text-[17px] font-extrabold tracking-[-0.03em] text-ink">
            {/* The space is a real character, not just the margin. Without it
                the text content reads "From$5" to a screen reader and to
                anyone who copies the line. */}
            {row.from ? (
              <>
                <span className="font-body text-[12.5px] font-semibold text-ink-faint">
                  {t.treatmentList.priceFrom}
                </span>{" "}
              </>
            ) : null}
            {formatPrice(row.priceCad)}
          </dd>
        </div>
      ))}
    </dl>
  );
}
