"use client";

import { ArrowUpRight, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { siteConfig } from "@/data/siteConfig";
import type { Dictionary } from "@/dictionaries";
import { bookingHref, bookingTrigger } from "@/lib/bookingConfig";
import { localePath, stripLocale, type Locale } from "@/lib/locale";

import { LanguageSwitch } from "./LanguageSwitch";
import { ThemeToggle } from "./ThemeToggle";
import { Wordmark } from "./Wordmark";

// The three main pages as big edged cards, each in its own band tone; everything else in a smaller group.
const MAIN_TONE: Record<string, string> = {
  nails: "tone-blush",
  parties: "tone-butter",
  store: "tone-hot",
};
const MAIN = siteConfig.nav.filter((item) => item.key in MAIN_TONE);
const REST = siteConfig.nav.filter((item) => !(item.key in MAIN_TONE));

// Takes t as a prop: importing the dictionaries here would ship both languages to the client.
export function MobileNav({ locale, t }: { locale: Locale; t: Dictionary }) {
  const [open, setOpen] = useState(false);
  const burgerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const wasOpen = useRef(false);
  const current = stripLocale(usePathname() ?? "/");

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
        className="-mr-1.5 cursor-pointer rounded-lg p-1.5 text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring min-[1100px]:hidden"
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
        className="grain fixed inset-0 z-50 flex flex-col overflow-y-auto bg-ground px-5 pt-3.5 pb-10 text-ink min-[1100px]:hidden"
      >
        {/* Same row as the header, so opening the menu does not move the logo. Links close the panel as they go. */}
        <div className="flex items-center justify-between gap-3">
          <span onClick={() => setOpen(false)}>
            <Wordmark locale={locale} t={t} />
          </span>
          <div className="flex items-center gap-3">
            <ThemeToggle t={t} className="-mx-2" />
            <span onClick={() => setOpen(false)}>
              <LanguageSwitch locale={locale} t={t} className="-mx-2 px-2 py-3" />
            </span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="grid size-11 cursor-pointer place-items-center rounded-full border-2 border-line bg-surface text-ink shadow-[3px_3px_0_var(--shadow)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              <X className="size-5" aria-hidden="true" />
              <span className="sr-only">{t.a11y.closeMenu}</span>
            </button>
          </div>
        </div>

        <nav aria-label={t.a11y.mainNav} className="mt-8 flex flex-col gap-4">
          {MAIN.map((item, index) => (
            <Link
              key={item.key}
              href={localePath(locale, item.href)}
              onClick={() => setOpen(false)}
              aria-current={current === item.href ? "page" : undefined}
              style={{ "--i": index } as React.CSSProperties}
              className={`${MAIN_TONE[item.key]} edge lift-rise flex items-center justify-between gap-4 rounded-2xl bg-ground px-5 py-4 text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring aria-[current=page]:translate-x-1 ${index % 2 ? "rotate-1" : "-rotate-1"}`}
            >
              <span>
                <span className="font-display block text-[34px] leading-none font-extrabold tracking-[-0.04em] lowercase">
                  {t.nav[item.key]}
                </span>
                <span className="mt-1.5 block text-[13.5px] text-ink-muted">
                  {t.mobileNav.blurbs[item.key as keyof typeof t.mobileNav.blurbs]}
                </span>
              </span>
              <span className="grid size-10 shrink-0 place-items-center rounded-full border-2 border-line bg-surface">
                <ArrowUpRight className="size-5" aria-hidden="true" />
              </span>
            </Link>
          ))}

          <span className="eyebrow mt-4 self-start">{t.nav.more}</span>
          <div className="flex flex-wrap gap-2">
            {REST.map((item) => (
              <Link
                key={item.key}
                href={localePath(locale, item.href)}
                onClick={() => setOpen(false)}
                aria-current={current === item.href ? "page" : undefined}
                className="hover-fill rounded-pill border px-4 py-2.5 text-[15px] font-bold text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring aria-[current=page]:bg-[color:var(--brand-sticker)] aria-[current=page]:text-[color:var(--brand-ink)]"
              >
                {t.nav[item.key]}
              </Link>
            ))}
          </div>
        </nav>

        <a
          href={bookingHref()}
          {...bookingTrigger()}
          onClick={() => setOpen(false)}
          className="mt-10 hover-glow rounded-pill bg-[image:var(--hot)] px-7 py-4 text-center text-[16px] font-bold text-on-hot focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          {t.cta.book}
        </a>
      </div>
    </>
  );
}
