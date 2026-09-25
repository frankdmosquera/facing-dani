// Picks made on /logos, kept in this browser only. No visitor ever has one set.

function createPreviewStore(key: string) {
  const event = `${key}-change`;

  return {
    read(): string | null {
      try {
        return window.localStorage.getItem(key);
      } catch {
        return null;
      }
    },
    write(value: string | null) {
      try {
        if (value) window.localStorage.setItem(key, value);
        else window.localStorage.removeItem(key);
      } catch {
        // Private windows can refuse storage; the pick then lasts only until the next reload.
      }
      window.dispatchEvent(new Event(event));
    },
    subscribe(onChange: () => void) {
      window.addEventListener(event, onChange);
      window.addEventListener("storage", onChange);
      return () => {
        window.removeEventListener(event, onChange);
        window.removeEventListener("storage", onChange);
      };
    },
    server: () => null,
  };
}

export const logoPreview = createPreviewStore("logo-preview");
export const themePreview = createPreviewStore("theme-preview");

// Class names match the blocks in globals.css.
export const themes = [
  { id: null, name: "Purple", note: "After Party, what visitors see" },
  { id: "light", name: "Light", note: "Never finished, see item 11" },
  { id: "gold", name: "Black and gold", note: "Tried for a day to match her old logo" },
] as const;
