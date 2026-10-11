import { createBrowserStore } from "@/lib/browserStore";

// The options panel's hero picks, per page. Dev only.
export const heroChoice = {
  home: createBrowserStore("hero-home"),
  parties: createBrowserStore("hero-parties"),
};
