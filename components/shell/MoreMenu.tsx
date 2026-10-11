"use client";

import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

/**
 * The header's "More" drawer: Gallery, Questions and Contact under one item.
 * Opens on click (and on hover where there is a mouse); closes on a second
 * click, Escape, a click outside, or moving to another page.
 */
export function MoreMenu({
  label,
  links,
  linkClass,
}: {
  label: string;
  links: { key: string; href: string; label: string }[];
  linkClass: string;
}) {
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const hoverOpened = useRef(false);
  const pathname = usePathname();

  // A new page closes the drawer.
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    const onDown = (event: PointerEvent) => {
      if (!root.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div
      ref={root}
      className="relative"
      // Hover opens it only for a mouse; a tap goes through the button's click.
      onPointerEnter={(event) => {
        if (event.pointerType !== "mouse") return;
        hoverOpened.current = true;
        setOpen(true);
      }}
      onPointerLeave={(event) => {
        if (event.pointerType === "mouse") setOpen(false);
      }}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-controls="more-menu"
        // The first click after a hover opened it keeps it open, rather than closing it under the cursor.
        onClick={() => {
          if (hoverOpened.current) {
            hoverOpened.current = false;
            setOpen(true);
          } else {
            setOpen((value) => !value);
          }
        }}
        className={`${linkClass} flex items-center gap-1`}
      >
        {label}
        <ChevronDown aria-hidden="true" className={`size-4 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open ? (
        <div id="more-menu" className="absolute top-full left-1/2 z-50 -translate-x-1/2 pt-3">
          <ul className="min-w-[200px] rounded-2xl border-2 border-line bg-surface p-2 shadow-[4px_4px_0_var(--shadow)]">
            {links.map((link) => (
              <li key={link.key}>
                <Link href={link.href} className={`${linkClass} block`}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
