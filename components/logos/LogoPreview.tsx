"use client";

import Image from "next/image";
import { useEffect, useId, useSyncExternalStore, type ReactNode } from "react";

import { findLogoDesign, findOriginalVariant } from "@/data/logoDesigns";

import { LogoArt } from "./LogoArt";
import { logoPreview, themePreview, themes } from "./previewStore";

// Shows the logo picked on /logos in place of the real one. Renders the real one until something is picked.
export function LogoPreview({ className, children }: { className?: string; children: ReactNode }) {
  const picked = useSyncExternalStore(logoPreview.subscribe, logoPreview.read, logoPreview.server);
  const uid = useId().replace(/[^\w-]/g, "");
  const design = findLogoDesign(picked);
  const variant = findOriginalVariant(picked);

  if (variant) return <Image src={variant.src} alt="" width={128} height={128} className={`rounded-full ${className ?? ""}`} />;
  if (!design) return children;
  return <LogoArt design={design} uid={uid} className={className} />;
}

// Puts the theme picked on /logos on <html>. Applied after hydration, so a hard reload flashes purple first.
export function ThemePreview() {
  const picked = useSyncExternalStore(themePreview.subscribe, themePreview.read, themePreview.server);

  useEffect(() => {
    const root = document.documentElement;
    for (const theme of themes) if (theme.id) root.classList.toggle(theme.id, theme.id === picked);
  }, [picked]);

  return null;
}
