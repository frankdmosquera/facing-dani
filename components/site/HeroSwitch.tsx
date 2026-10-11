"use client";

import { useSyncExternalStore } from "react";

import { heroChoice } from "./heroChoice";

/**
 * Dev only: shows the hero design picked in the options panel, from the
 * page's server-rendered options. Production renders siteConfig.hero
 * directly and never ships this.
 */
export function HeroSwitch({
  page,
  fallback,
  options,
}: {
  page: "home" | "parties";
  fallback: string;
  options: Record<string, React.ReactNode>;
}) {
  const store = heroChoice[page];
  const picked = useSyncExternalStore(store.subscribe, store.read, store.server);
  return <>{options[picked && picked in options ? picked : fallback]}</>;
}
