"use client";

import { useEffect, useSyncExternalStore } from "react";

import { themePreview } from "@/components/logos/previewStore";

import { activeTheme, applyTheme, siteTheme } from "./theme";

// Keeps the class on <html> in step with the header button and the /logos preview after the first paint.
export function ThemeApplier() {
  const preview = useSyncExternalStore(themePreview.subscribe, themePreview.read, themePreview.server);
  const site = useSyncExternalStore(siteTheme.subscribe, siteTheme.read, siteTheme.server);

  useEffect(() => {
    applyTheme(activeTheme(preview, site));
  }, [preview, site]);

  return null;
}
