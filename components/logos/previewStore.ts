import { createBrowserStore } from "@/lib/browserStore";

// Picks made on /logos, kept in this browser only. No visitor ever has one set.
export const logoPreview = createBrowserStore("logo-preview");
export const themePreview = createBrowserStore("theme-preview");

// Class names match the blocks in globals.css.
export const themes = [
  { id: null, name: "Purple" },
  { id: "light", name: "Light purple" },
  { id: "gold", name: "Black and gold" },
  { id: "gold-light", name: "Light gold" },
] as const;
