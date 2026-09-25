"use client";

import Image from "next/image";
import { useSyncExternalStore } from "react";

import { logoDesigns, originalVariants } from "@/data/logoDesigns";

import { LogoArt } from "./LogoArt";
import { logoPreview, themePreview, themes } from "./previewStore";

const card =
  "flex cursor-pointer flex-col items-center gap-4 rounded-[var(--radius-card)] border bg-surface p-6 text-center transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring";
const state = (on: boolean) => (on ? "border-nails" : "border-line hover:border-ink-faint");

export function ThemePicker() {
  const picked = useSyncExternalStore(themePreview.subscribe, themePreview.read, themePreview.server);

  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {themes.map((theme) => (
        <button
          key={theme.name}
          type="button"
          onClick={() => themePreview.write(theme.id)}
          aria-pressed={picked === theme.id}
          className={`${card} items-start! gap-1! p-5! text-left! ${state(picked === theme.id)}`}
        >
          <span className="font-display text-[17px] font-extrabold text-ink">{theme.name}</span>
          <span className="text-[14px] text-ink-muted">{theme.note}</span>
        </button>
      ))}
    </div>
  );
}

export function LogoPicker() {
  const picked = useSyncExternalStore(logoPreview.subscribe, logoPreview.read, logoPreview.server);

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <button
        type="button"
        onClick={() => logoPreview.write(null)}
        aria-pressed={picked === null}
        className={`${card} ${state(picked === null)}`}
      >
        <Image src="/logo.png" alt="" width={480} height={480} className="aspect-square w-full max-w-[260px] rounded-full" />
        <span className="font-display text-[17px] font-extrabold text-ink">Current logo</span>
        <span className="text-[14px] text-ink-muted">Her original black and gold, what visitors see</span>
      </button>

      {originalVariants.map((variant) => (
        <button
          key={variant.id}
          type="button"
          onClick={() => logoPreview.write(variant.id)}
          aria-pressed={picked === variant.id}
          className={`${card} ${state(picked === variant.id)}`}
        >
          <Image src={variant.src} alt="" width={480} height={480} className="aspect-square w-full max-w-[260px] rounded-full" />
          <span className="font-display text-[17px] font-extrabold text-ink">{variant.name}</span>
          <span className="text-[14px] text-ink-muted">{variant.note}</span>
        </button>
      ))}

      {logoDesigns.map((design) => (
        <button
          key={design.id}
          type="button"
          onClick={() => logoPreview.write(design.id)}
          aria-pressed={picked === design.id}
          className={`${card} ${state(picked === design.id)}`}
        >
          <LogoArt design={design} uid="pick" className="aspect-square w-full max-w-[260px]" />
          <span className="font-display text-[17px] font-extrabold text-ink">{design.name}</span>
          <span className="text-[14px] text-ink-muted">{design.note}</span>
        </button>
      ))}
    </div>
  );
}
