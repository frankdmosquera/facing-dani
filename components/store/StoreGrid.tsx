"use client";

import { useState } from "react";

import type { StoreCategory } from "@/data/store";

// Client state is only the pressed tab. The cards arrive as server-rendered children and hide by CSS,
// so every product is in the HTML whichever tab is open.

type Filter = StoreCategory | "all";

const CHIP =
  "rounded-pill border px-[17px] py-[9px] text-[12.5px] font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring";
const PRESSED = "border-transparent bg-[image:var(--hot)] text-on-hot";
const IDLE = "border-line bg-transparent text-ink-muted hover:text-ink";

export function StoreGrid({
  tabs,
  allLabel,
  tabsLabel,
  children,
}: {
  tabs: { id: StoreCategory; label: string; count: number }[];
  allLabel: string;
  tabsLabel: string;
  children: React.ReactNode;
}) {
  const [active, setActive] = useState<Filter>("all");

  const all = tabs.reduce((sum, tab) => sum + tab.count, 0);
  const options: { id: Filter; label: string; count: number }[] = [
    { id: "all", label: allLabel, count: all },
    ...tabs,
  ];

  return (
    <>
      <div role="group" aria-label={tabsLabel} className="flex flex-wrap gap-2 pb-6">
        {options.map((option) => (
          <button
            key={option.id}
            type="button"
            aria-pressed={active === option.id}
            onClick={() => setActive(option.id)}
            className={`${CHIP} ${active === option.id ? PRESSED : IDLE}`}
          >
            {option.label}
            <span className="ml-2 opacity-70">{option.count}</span>
          </button>
        ))}
      </div>

      <ul
        data-filter={active}
        className="group/store grid gap-4 min-[560px]:grid-cols-2 min-[900px]:grid-cols-3 min-[900px]:gap-5"
      >
        {children}
      </ul>
    </>
  );
}
