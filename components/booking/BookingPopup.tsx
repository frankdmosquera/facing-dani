"use client";

import { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";

import { CALCOM_USERNAME } from "@/lib/bookingConfig";

// Mounted once in the layout, renders nothing. Arms every Book link on the site to open Cal.com as a popup.
// Ported from face-and-body: Cal's small script loads when the browser is idle, the heavy booker only on hover, focus or touch.
export function BookingPopup() {
  useEffect(() => {
    let cancelled = false;
    let warmed = false;
    let ready = false;

    // Safari only recently shipped requestIdleCallback, so the timeout is a real branch.
    const hasIdle = typeof window.requestIdleCallback === "function";
    const idle = hasIdle
      ? window.requestIdleCallback(() => void configure())
      : window.setTimeout(() => void configure(), 2000);

    async function configure() {
      const cal = await getCalApi();
      if (cancelled) return;
      // Read at runtime so the /logos theme preview gets a matching booker.
      const root = document.documentElement;
      const light = root.classList.contains("light") || root.classList.contains("gold-light");
      const brand = getComputedStyle(root).getPropertyValue("--nails").trim();
      cal("ui", {
        theme: light ? "light" : "dark",
        layout: "month_view",
        cssVarsPerTheme: { light: { "cal-brand": brand }, dark: { "cal-brand": brand } },
      });
      ready = true;
    }

    // Cal does not cancel the click on an anchor, so without this the page also navigates to cal.com under the popup.
    // Only once Cal is ready, and never for modified clicks: until then, or with ctrl or middle click, it stays a plain link.
    function stopNavigation(event: MouseEvent) {
      if (!ready || event.defaultPrevented) return;
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      if (!(event.target instanceof Element) || !event.target.closest("a[data-cal-link]")) return;
      event.preventDefault();
    }

    // The booker is a whole hidden iframe, so it loads only on a sign of intent. The account page warms the shell all three events share.
    async function warm(event: Event) {
      if (warmed) return;
      if (!(event.target instanceof Element) || !event.target.closest("[data-cal-link]")) return;
      warmed = true;
      const cal = await getCalApi();
      if (cancelled) return;
      cal("preload", { calLink: CALCOM_USERNAME });
    }

    // Capture: pointerenter does not bubble, and the click must be cancelled before anything else handles it.
    const options = { capture: true, passive: true } as const;
    document.addEventListener("pointerenter", warm, options);
    document.addEventListener("focusin", warm, options);
    document.addEventListener("touchstart", warm, options);
    document.addEventListener("click", stopNavigation, true);

    return () => {
      cancelled = true;
      if (hasIdle) window.cancelIdleCallback(idle as number);
      else window.clearTimeout(idle as number);
      document.removeEventListener("pointerenter", warm, options);
      document.removeEventListener("focusin", warm, options);
      document.removeEventListener("touchstart", warm, options);
      document.removeEventListener("click", stopNavigation, true);
    };
  }, []);

  return null;
}
