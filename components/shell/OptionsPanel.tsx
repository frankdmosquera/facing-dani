"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState, useSyncExternalStore } from "react";

import { heroChoice } from "@/components/site/heroChoice";
import { siteConfig } from "@/data/siteConfig";
import { createBrowserStore } from "@/lib/browserStore";
import { stripLocale } from "@/lib/locale";

import { siteTheme, themeChoice } from "./theme";

/**
 * Dev only (the layout never renders it in production): a floating panel for
 * Frank to flip the theme, the mode, the page's hero and its optional
 * sections, and compare them on the real site. Picks live in this browser.
 * Once he chooses, the winners go into siteConfig (theme, hero, sections)
 * and this panel, HeroSwitch, heroChoice and Optional's dev markup go.
 */
type Store = ReturnType<typeof createBrowserStore>;

// Sections switched by hand, as JSON { id: on }. Unset ids keep their default.
const sectionPicks = createBrowserStore("section-picks");
// Band background photos, as JSON { id: galleryKey | "off" }.
const backdropPicks = createBrowserStore("backdrop-picks");
const panelOpen = createBrowserStore("options-open");

// Mirrors HERO_OPTIONS in components/site/Hero.tsx; parties shows its own two as 1 and 2.
const HEROES = {
  home: [
    { value: "a", label: "A" },
    { value: "b", label: "B" },
    { value: "c", label: "C" },
    { value: "d", label: "D" },
  ],
  parties: [
    { value: "e", label: "1" },
    { value: "f", label: "2" },
  ],
};

function useStore(store: Store) {
  return useSyncExternalStore(store.subscribe, store.read, store.server);
}

function readPicks<T = boolean>(raw: string | null): Record<string, T> {
  try {
    return raw ? (JSON.parse(raw) as Record<string, T>) : {};
  } catch {
    return {};
  }
}

function Row({
  label,
  options,
  value,
  onPick,
}: {
  label: string;
  options: { value: string; label: string }[];
  value: string;
  onPick: (value: string) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-2">
      <span className="text-[11px] font-bold tracking-[0.06em] uppercase opacity-70">{label}</span>
      <div className="flex gap-1">
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            aria-pressed={option.value === value}
            onClick={() => onPick(option.value)}
            className={`rounded-full px-2.5 py-1 text-[12px] font-bold ${option.value === value ? "bg-white text-black" : "bg-white/10 hover:bg-white/20"}`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export function OptionsPanel() {
  const open = useStore(panelOpen) === "1";
  const [sections, setSections] = useState<{ id: string; label: string; on: boolean }[]>([]);
  const [backdrops, setBackdrops] = useState<{ id: string; label: string; options: string[]; value: string }[]>([]);
  const pathname = stripLocale(usePathname());
  const page = pathname === "/" ? "home" : pathname === "/parties" ? "parties" : null;

  const mode = useStore(siteTheme) === "dark" ? "dark" : "light";
  const theme = useStore(themeChoice) ?? siteConfig.theme;
  const heroHome = useStore(heroChoice.home) ?? siteConfig.hero.home;
  const heroParties = useStore(heroChoice.parties) ?? siteConfig.hero.parties;
  const picksRaw = useStore(sectionPicks);
  const backdropRaw = useStore(backdropPicks);

  // Show or hide every optional block on this page, and list them for the panel.
  useEffect(() => {
    const picks = readPicks(picksRaw);
    const found = [...document.querySelectorAll<HTMLElement>("[data-optional]")].map((el) => {
      const id = el.dataset.optional ?? "";
      const on = picks[id] ?? el.dataset.default === "on";
      el.classList.toggle("contents", on);
      el.classList.toggle("hidden", !on);
      return { id, label: el.dataset.label ?? id, on };
    });
    // The list comes from the rendered page, an outside system, so it can only be read after render.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSections(found);
  }, [picksRaw, pathname]);

  // Same for band background photos: show the picked candidate, hide the rest.
  useEffect(() => {
    const picks = readPicks<string>(backdropRaw);
    const found = [...document.querySelectorAll<HTMLElement>("[data-backdrop]")].map((el) => {
      const id = el.dataset.backdrop ?? "";
      const value = picks[id] ?? el.dataset.default ?? "off";
      const children = [...el.querySelectorAll<HTMLElement>("[data-pick]")];
      for (const child of children) {
        const on = child.dataset.pick === value;
        child.classList.toggle("contents", on);
        child.classList.toggle("hidden", !on);
      }
      return { id, label: el.dataset.label ?? id, options: children.map((c) => c.dataset.pick ?? ""), value };
    });
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setBackdrops(found);
  }, [backdropRaw, pathname]);

  function toggle(id: string, on: boolean) {
    sectionPicks.write(JSON.stringify({ ...readPicks(picksRaw), [id]: on }));
  }

  return (
    <div
      className={`fixed bottom-3 left-3 z-[80] max-h-[75vh] overflow-y-auto rounded-2xl border-2 border-black bg-[#111] font-body text-white shadow-[3px_3px_0_#000] ${open ? "w-[250px] p-2.5" : "px-3 py-1.5"}`}
    >
      <button
        type="button"
        onClick={() => panelOpen.write(open ? null : "1")}
        className="flex w-full items-center justify-between gap-2 text-[12px] font-bold"
        aria-expanded={open}
      >
        Options
        <span aria-hidden="true">{open ? "–" : "+"}</span>
      </button>
      {open ? (
        <div className="mt-2.5 flex flex-col gap-2">
          <Row
            label="Theme"
            options={[
              { value: "pop", label: "Pop" },
              { value: "purple", label: "Lilac" },
              { value: "gold", label: "Gold" },
            ]}
            value={theme}
            onPick={(v) => themeChoice.write(v)}
          />
          <Row
            label="Mode"
            options={[
              { value: "light", label: "Light" },
              { value: "dark", label: "Dark" },
            ]}
            value={mode}
            onPick={(v) => siteTheme.write(v === "dark" ? "dark" : null)}
          />
          {page === "home" ? (
            <Row label="Hero" options={HEROES.home} value={heroHome} onPick={(v) => heroChoice.home.write(v)} />
          ) : null}
          {page === "parties" ? (
            <Row label="Hero" options={HEROES.parties} value={heroParties} onPick={(v) => heroChoice.parties.write(v)} />
          ) : null}

          {backdrops.length > 0 ? (
            <div className="mt-1 flex flex-col gap-1.5 border-t border-white/15 pt-2">
              <span className="block text-[11px] font-bold tracking-[0.06em] uppercase opacity-70">Background photos</span>
              {backdrops.map((backdrop) => (
                <Row
                  key={backdrop.id}
                  label={backdrop.label}
                  options={[
                    { value: "off", label: "Off" },
                    ...backdrop.options.map((key, index) => ({ value: key, label: String(index + 1) })),
                  ]}
                  value={backdrop.value}
                  onPick={(v) => backdropPicks.write(JSON.stringify({ ...readPicks<string>(backdropRaw), [backdrop.id]: v }))}
                />
              ))}
            </div>
          ) : null}

          {sections.length > 0 ? (
            <div className="mt-1 border-t border-white/15 pt-2">
              <span className="mb-1 block text-[11px] font-bold tracking-[0.06em] uppercase opacity-70">On this page</span>
              {sections.map((section) => (
                <label key={section.id} className="flex cursor-pointer items-center justify-between gap-3 py-0.5 text-[12.5px]">
                  {section.label}
                  <input
                    type="checkbox"
                    checked={section.on}
                    onChange={(event) => toggle(section.id, event.target.checked)}
                    className="size-4 accent-white"
                  />
                </label>
              ))}
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
