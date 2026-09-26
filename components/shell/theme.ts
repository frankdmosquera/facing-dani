import { themePreview, themes } from "@/components/logos/previewStore";
import { createBrowserStore } from "@/lib/browserStore";

// The header button. Dark is the brand, so "light" is the only value ever stored.
export const siteTheme = createBrowserStore("site-theme");

// A /logos pick wins over the button while that page exists.
export function activeTheme(preview: string | null, site: string | null) {
  return preview ?? site;
}

export function applyTheme(active: string | null) {
  const root = document.documentElement;
  for (const theme of themes) if (theme.id) root.classList.toggle(theme.id, theme.id === active);
}

// Runs before paint, so a light visitor never sees a dark first frame. Same rule as activeTheme.
export const themeScript = `try{var t=localStorage.getItem(${JSON.stringify(themePreview.key)})||localStorage.getItem(${JSON.stringify(siteTheme.key)});if(t)document.documentElement.classList.add(t)}catch(e){}`;
