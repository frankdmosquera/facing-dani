import {
  Armchair,
  CakeSlice,
  Check,
  ClipboardList,
  SunMedium,
  type LucideIcon,
} from "lucide-react";

const ICON: Record<string, LucideIcon> = {
  table: Armchair,
  light: SunMedium,
  space: CakeSlice,
  list: ClipboardList,
};

/**
 * "What to have ready" as a checklist card: an icon per item, and a tick that
 * fills in as each row scrolls into view (CSS only; without scroll timelines
 * the ticks simply show filled).
 */
export function ReadyChecklist({
  items,
}: {
  items: { key: string; title: string; body: string }[];
}) {
  return (
    <ul className="card-hot divide-y divide-line-soft rounded-xl border border-line bg-surface">
      {items.map((item) => {
        const Icon = ICON[item.key] ?? ClipboardList;
        return (
          <li
            key={item.key}
            className="flex items-start gap-5 p-5 min-[640px]:p-6"
          >
            <span
              aria-hidden="true"
              className="grid size-12 shrink-0 place-items-center rounded-full bg-surface-2 text-nails"
            >
              <Icon className="size-[22px]" strokeWidth={1.8} />
            </span>
            <div className="min-w-0 flex-1">
              <h3 className="mb-1.5 text-[18px]">{item.title}</h3>
              <p className="text-[14.5px] text-ink-muted">{item.body}</p>
            </div>
            <span
              aria-hidden="true"
              className="relative mt-1 grid size-8 shrink-0 place-items-center rounded-full border border-line"
            >
              <span className="check-fill absolute inset-0 grid place-items-center rounded-full bg-[image:var(--hot)] text-on-hot">
                <Check className="size-4" strokeWidth={3} />
              </span>
            </span>
          </li>
        );
      })}
    </ul>
  );
}
