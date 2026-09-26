// One localStorage key as a store for useSyncExternalStore. The server always reads null.
export function createBrowserStore(key: string) {
  const event = `${key}-change`;

  return {
    key,
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
        // Private windows can refuse storage; nothing is kept then.
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
