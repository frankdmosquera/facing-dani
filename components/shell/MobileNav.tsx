"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { siteConfig } from "@/data/siteConfig";
import type { Dictionary } from "@/dictionaries";
import { bookingHref, bookingTrigger } from "@/lib/bookingConfig";
import { localePath, type Locale } from "@/lib/locale";

// Takes t as a prop: importing the dictionaries here would ship both languages to the client.
export function MobileNav({ locale, t }: { locale: Locale; t: Dictionary }) {
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
        <span className="sr-only">{t.a11y.openMenu}</span>
      </button>

      <div
        id="mobile-nav"
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={siteConfig.business.name}
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
            <span className="sr-only">{t.a11y.closeMenu}</span>
          </button>
        </div>

        <nav aria-label={t.a11y.mainNav} className="mt-6 flex flex-col">
          {siteConfig.nav.map((item) => (
            <Link
              key={item.key}
              href={localePath(locale, item.href)}
              onClick={() => setOpen(false)}
              className="font-display border-b border-line-soft py-4 text-[28px] font-extrabold tracking-[-0.035em] text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              {t.nav[item.key]}
            </Link>
          ))}
        </nav>

        <a
          href={bookingHref()}
          {...bookingTrigger()}
          onClick={() => setOpen(false)}
          className="mt-8 hover-glow rounded-pill bg-[image:var(--hot)] px-7 py-4 text-center text-[15px] font-bold text-on-hot focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          {t.cta.book}
        </a>

        {/* No language switch here: switching reloads the page and closed the panel mid-tap. */}
      </div>
    </>
  );
}
