"use client";

import Image from "next/image";
import { useId, useSyncExternalStore, type ReactNode } from "react";

import { findLogoDesign, findOriginalVariant } from "@/data/logoDesigns";

import { LogoArt } from "./LogoArt";
import { logoPreview } from "./previewStore";

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
