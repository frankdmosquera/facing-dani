"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

import { cn } from "@/lib/utils";

// Client because it listens to scroll; the header markup it wraps stays on the server.
export function HeaderScrollHider({ children }: { children: ReactNode }) {
  const [visible, setVisible] = useState(true);
  const lastY = useRef(0);

  useEffect(() => {
    lastY.current = window.scrollY;

    function onScroll() {
      const y = window.scrollY;
      setVisible(y < 10 || y < lastY.current);
      lastY.current = y;
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      // Keyboard focus landing in a hidden header brings it back, so Tab never targets an invisible link.
      onFocus={() => setVisible(true)}
      className={cn(
        "sticky top-0 z-40 border-b border-line-soft transition-transform duration-300 motion-reduce:transition-none",
        // translate-none, not translate-y-0: any translate value traps MobileNav's fixed panel inside the header.
        visible ? "translate-none" : "-translate-y-full",
      )}
    >
      {children}
    </header>
  );
}
