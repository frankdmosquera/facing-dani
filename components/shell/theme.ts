import { siteConfig } from "@/data/siteConfig";
import { createBrowserStore } from "@/lib/browserStore";

// The header button. Light is the default, so "dark" is the only value ever stored.
export const siteTheme = createBrowserStore("site-theme");

// The options panel's theme pick (dev only, components/shell/OptionsPanel). Wins over siteConfig.theme while it exists.
export const themeChoice = createBrowserStore("theme-choice");

export const THEMES = ["pop", "purple", "gold"] as const;
export type ThemeName = (typeof THEMES)[number];

function themeName(choice: string | null): ThemeName {
  return (THEMES as readonly string[]).includes(choice ?? "") ? (choice as ThemeName) : siteConfig.theme;
}

// Pop is the bare :root; the others add a class. Class names match the blocks in globals.css.
export function applyTheme(stored: string | null, choice: string | null) {
  const root = document.documentElement;
  const name = themeName(choice);
  root.classList.toggle("light", stored !== "dark");
  for (const theme of THEMES) root.classList.toggle(`theme-${theme}`, theme !== "pop" && theme === name);
}

// Runs before paint, so a visitor never sees the wrong first frame. Same rule as applyTheme.
export const themeScript = `try{var d=document.documentElement;if(localStorage.getItem(${JSON.stringify(siteTheme.key)})!=="dark")d.classList.add("light");var c=localStorage.getItem(${JSON.stringify(themeChoice.key)})||${JSON.stringify(siteConfig.theme)};if(c==="purple"||c==="gold")d.classList.add("theme-"+c)}catch(e){}`;
