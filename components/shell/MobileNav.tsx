"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import type { NavItem } from "@/data/siteConfig";

/**
 * The burger and the panel behind it.
 *
 * Client because it holds open/closed state - that is the whole reason, and
 * nothing else in the shell needs it. The mockup draws a burger that opens
 * nothing, so the panel's behaviour is defined here rather than ported:
 * Escape closes, focus moves into the panel and returns to the burger, Tab
 * cannot reach the page behind it, and the page cannot scroll while it is open.
 */
export function MobileNav({
  items,
  cta,
  label,
}: {
  items: readonly NavItem[];
  cta: NavItem;
  /** Accessible name for the dialog, e.g. the business name. */
  label: string;
}) {
  const [open, setOpen] = useState(false);
  const burgerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const wasOpen = useRef(false);

  useEffect(() => {
    if (!open) return;

    const panel = panelRef.current;
    if (!panel) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusable = () =>
      Array.from(
        panel.querySelectorAll<HTMLElement>("a[href], button:not([disabled])"),
      );

    focusable()[0]?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        return;
      }
      if (event.key !== "Tab") return;

      const nodes = focusable();
      if (nodes.length === 0) return;

      const first = nodes[0];
      const last = nodes[nodes.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  // Send focus back to the burger on close, but not on the first render.
  useEffect(() => {
    if (wasOpen.current && !open) burgerRef.current?.focus();
    wasOpen.current = open;
  }, [open]);

  return (
    <>
      <button
        ref={burgerRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-expanded={open}
        aria-controls="mobile-nav"
        aria-haspopup="dialog"
        className="-mr-1.5 cursor-pointer rounded-lg p-1.5 text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring min-[900px]:hidden"
      >
        <Menu className="size-6" aria-hidden="true" />
        <span className="sr-only">Menu</span>
      </button>

      <div
        id="mobile-nav"
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={label}
        hidden={!open}
        className="fixed inset-0 z-50 flex flex-col overflow-y-auto bg-ground px-5 pt-3.5 pb-10 min-[900px]:hidden"
      >
        <div className="flex items-center justify-end">
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="-mr-1.5 cursor-pointer rounded-lg p-1.5 text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            <X className="size-6" aria-hidden="true" />
            <span className="sr-only">Close menu</span>
          </button>
        </div>

        <nav aria-label="Main" className="mt-6 flex flex-col">
          {items.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              onClick={() => setOpen(false)}
              className="font-display border-b border-line-soft py-4 text-[28px] font-extrabold tracking-[-0.035em] text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link
          href={cta.href}
          onClick={() => setOpen(false)}
          className="mt-8 rounded-pill bg-[image:var(--hot)] px-7 py-4 text-center text-[15px] font-bold text-on-hot focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          {cta.label}
        </Link>
      </div>
    </>
  );
}
