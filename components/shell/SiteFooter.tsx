import Link from "next/link";

import { siteConfig } from "@/data/siteConfig";
import type { Dictionary } from "@/dictionaries";
import { localePath, type Locale } from "@/lib/locale";

import { Wordmark } from "./Wordmark";

function Column({
  heading,
  children,
}: {
  heading: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h2 className="font-body mb-3.5 text-[11px] font-semibold tracking-[0.15em] text-ink-faint uppercase">
        {heading}
      </h2>
      {children}
    </div>
  );
}

const linkClass =
  "block py-[5px] text-[14px] text-ink-muted transition-colors hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring";

export function SiteFooter({ locale, t }: { locale: Locale; t: Dictionary }) {
  const { business, footer, social } = siteConfig;
  const label = (key: string) => t.footer[key as keyof Dictionary["footer"]];

  return (
    <footer className="mt-auto border-t border-line-soft bg-surface-2 pt-11 pb-9">
      <div className="mx-auto max-w-[var(--site)] px-[var(--gutter)]">
        <div className="grid gap-[30px] min-[760px]:grid-cols-[1.4fr_1fr_1fr] min-[760px]:gap-10">
          <div>
            <Wordmark locale={locale} t={t} className="text-[22px]!" />
            <p className="mt-3 max-w-[34ch] text-[14px] text-ink-muted">
              {t.blurb}
            </p>
          </div>

          <Column heading={t.footer.services}>
            {footer.services.map((item) => (
              <Link
                key={item.key}
                href={localePath(locale, item.href)}
                className={linkClass}
              >
                {label(item.key)}
              </Link>
            ))}
          </Column>

          <Column heading={t.footer.contact}>
            {/* Rendered only once the handle is known, so an unset one cannot
                ship as a dead link. */}
            {social.instagram ? (
              <a
                href={social.instagram.url}
                className={linkClass}
                rel="me noopener noreferrer"
                target="_blank"
              >
                {t.footer.instagram}
              </a>
            ) : null}
            {footer.contact.map((item) => (
              <Link
                key={item.key}
                href={localePath(locale, item.href)}
                className={linkClass}
              >
                {label(item.key)}
              </Link>
            ))}
          </Column>
        </div>

        <div className="mt-[34px] flex flex-wrap justify-between gap-x-5 gap-y-2 border-t border-line-soft pt-5 text-[12.5px] text-ink-faint">
          <span>
            &copy; {new Date().getFullYear()} {business.name}. {business.city},{" "}
            {business.region}.
          </span>
        </div>
      </div>
    </footer>
  );
}
