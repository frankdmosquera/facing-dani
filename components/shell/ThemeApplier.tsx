"use client";

import { useEffect, useSyncExternalStore } from "react";

import { applyTheme, siteTheme, themeChoice } from "./theme";

// Keeps the classes on <html> in step with the header button and the options panel after the first paint.
export function ThemeApplier() {
  const stored = useSyncExternalStore(siteTheme.subscribe, siteTheme.read, siteTheme.server);
  const choice = useSyncExternalStore(themeChoice.subscribe, themeChoice.read, themeChoice.server);

  useEffect(() => {
    applyTheme(stored, choice);
  }, [stored, choice]);

  return null;
}
