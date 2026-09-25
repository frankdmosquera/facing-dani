import type { ServiceId } from "@/data/services";
import { treatmentLabel, treatmentsFor } from "@/data/treatments";
import type { Dictionary } from "@/dictionaries";
import { bookingHref, bookingTrigger, eventSlug } from "@/lib/bookingConfig";
import { formatDuration, formatPrice } from "@/lib/format";

// Generic so row.key is typed to this service's own treatments.
export function TreatmentList<S extends ServiceId>({
  serviceId,
  t,
}: {
  serviceId: S;
  t: Dictionary;
}) {
  const rows = treatmentsFor(serviceId);
  const copy = t.services[serviceId];

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

          <dd className="flex shrink-0 items-center gap-4">
            <span className="font-display text-[17px] font-extrabold tracking-[-0.03em] text-ink">
              {/* The {" "} is needed, or screen readers read "From$5". */}
              {row.from ? (
                <>
                  <span className="font-body text-[12.5px] font-semibold text-ink-faint">
                    {t.treatmentList.priceFrom}
                  </span>{" "}
                </>
              ) : null}
              {formatPrice(row.priceCad)}
            </span>

            {/* Add-ons are chosen inside a booking. The spacer keeps their price in line with the rows that have a button. */}
            {row.addOn ? (
              <span aria-hidden="true" className="w-[92px]" />
            ) : (
              <a
                href={bookingHref(eventSlug(serviceId, String(row.key)))}
                {...bookingTrigger(eventSlug(serviceId, String(row.key)))}
                aria-label={`${t.treatmentList.book}: ${treatmentLabel(t, serviceId, row.key)}`}
                className="hover-fill min-w-[92px] rounded-pill border border-line px-4 py-2 text-center text-[13.5px] font-bold text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              >
                {t.treatmentList.book}
              </a>
            )}
          </dd>
        </div>
      ))}
    </dl>
  );
}
