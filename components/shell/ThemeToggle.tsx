"use client";

import { Moon, Sun } from "lucide-react";
import { useSyncExternalStore } from "react";

import type { Dictionary } from "@/dictionaries";

import { siteTheme } from "./theme";

export function ThemeToggle({ t, className }: { t: Dictionary; className?: string }) {
  const light = useSyncExternalStore(siteTheme.subscribe, siteTheme.read, siteTheme.server) === "light";

  return (
    <button
      type="button"
      onClick={() => siteTheme.write(light ? null : "light")}
      aria-label={light ? t.a11y.darkMode : t.a11y.lightMode}
      className={`grid size-11 place-items-center rounded-full text-ink-muted transition-colors hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring ${className ?? ""}`}
    >
      {light ? <Moon aria-hidden="true" className="size-[18px]" /> : <Sun aria-hidden="true" className="size-[18px]" />}
    </button>
  );
}
