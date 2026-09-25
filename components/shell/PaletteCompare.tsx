"use client";

import { useState, useSyncExternalStore } from "react";

// Temporary, for Dani to compare the two palettes. Only appears on a link ending in ?compare. Delete once she picks.

const subscribe = () => () => {};
const getWantsCompare = () => new URLSearchParams(window.location.search).has("compare");
const getServerWantsCompare = () => false;

export function PaletteCompare() {
  const wantsCompare = useSyncExternalStore(subscribe, getWantsCompare, getServerWantsCompare);
  const [party, setParty] = useState(false);

  if (!wantsCompare) return null;

  function toggle() {
    const next = !party;
    document.documentElement.classList.toggle("after-party", next);
    setParty(next);
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className="fixed right-4 bottom-4 z-50 rounded-pill border border-line bg-surface px-4 py-2.5 text-[13px] font-bold text-ink shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
    >
      {party ? "Show black and gold" : "Show purple"}
    </button>
  );
}
