import { siteConfig } from "@/data/siteConfig";
import { showOptions } from "@/lib/showOptions";

/**
 * A section (or a decoration) Frank can switch on and off while choosing.
 * Production renders it only when siteConfig.sections[id] (or defaultOn)
 * says so. In dev it always renders, marked up for the options panel, which
 * hides or shows it from this browser's picks.
 */
export function Optional({
  id,
  label,
  defaultOn = true,
  children,
}: {
  id: string;
  // What the options panel calls it.
  label: string;
  defaultOn?: boolean;
  children: React.ReactNode;
}) {
  const on = siteConfig.sections[id] ?? defaultOn;
  if (!showOptions) return on ? children : null;
  return (
    <div data-optional={id} data-label={label} data-default={on ? "on" : "off"} className={on ? "contents" : "hidden"}>
      {children}
    </div>
  );
}
