"use client";

import Image from "next/image";
import { useSyncExternalStore, type ReactNode } from "react";

import { logoDesigns, originalVariants } from "@/data/logoDesigns";

import { LogoArt } from "./LogoArt";
import { logoPreview, themePreview, themes } from "./previewStore";

const ring =
  "cursor-pointer border transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring";
const state = (on: boolean) => (on ? "border-nails" : "border-line hover:border-ink-faint");

export function ThemePicker() {
  const picked = useSyncExternalStore(themePreview.subscribe, themePreview.read, themePreview.server);

  return (
    <div className="flex flex-wrap gap-2.5">
      {themes.map((theme) => (
        <button
          key={theme.name}
          type="button"
          onClick={() => themePreview.write(theme.id)}
          aria-pressed={picked === theme.id}
          className={`${ring} rounded-pill bg-surface px-4 py-2 text-[14px] font-semibold text-ink ${state(picked === theme.id)}`}
        >
          {theme.name}
        </button>
      ))}
    </div>
  );
}

function Card({ id, name, picked, children }: { id: string | null; name: string; picked: string | null; children: ReactNode }) {
  return (
    <button
      type="button"
      onClick={() => logoPreview.write(id)}
      aria-pressed={picked === id}
      className={`${ring} flex flex-col items-center gap-2.5 rounded-[var(--radius-card)] bg-surface p-3 text-center ${state(picked === id)}`}
    >
      {children}
      <span className="text-[13.5px] font-semibold text-ink">{name}</span>
    </button>
  );
}

const art = "aspect-square w-full max-w-[150px]";

export function LogoPicker() {
  const picked = useSyncExternalStore(logoPreview.subscribe, logoPreview.read, logoPreview.server);

  return (
    <div className="grid max-w-[1000px] grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
      <Card id={null} name="Current logo" picked={picked}>
        <Image src="/logo.png" alt="" width={240} height={240} className={`${art} rounded-full`} />
      </Card>

      {originalVariants.map((variant) => (
        <Card key={variant.id} id={variant.id} name={variant.name} picked={picked}>
          <Image src={variant.src} alt="" width={240} height={240} className={`${art} rounded-full`} />
        </Card>
      ))}

      {logoDesigns.map((design) => (
        <Card key={design.id} id={design.id} name={design.name} picked={picked}>
          <LogoArt design={design} uid="pick" className={art} />
        </Card>
      ))}
    </div>
  );
}
