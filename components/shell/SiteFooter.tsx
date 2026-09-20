import Link from "next/link";

import { siteConfig } from "@/data/siteConfig";

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

export function SiteFooter() {
  const { business, footer, social } = siteConfig;

  return (
    <footer className="mt-auto border-t border-line-soft bg-surface-2 pt-11 pb-9">
      <div className="mx-auto max-w-[var(--site)] px-[var(--gutter)]">
        <div className="grid gap-[30px] min-[760px]:grid-cols-[1.4fr_1fr_1fr] min-[760px]:gap-10">
          <div>
            <Wordmark className="text-[22px]!" />
            <p className="mt-3 max-w-[34ch] text-[14px] text-ink-muted">
              {business.blurb}
            </p>
          </div>

          <Column heading="Services">
            {footer.services.map((item) => (
              <Link key={item.key} href={item.href} className={linkClass}>
                {item.label}
              </Link>
            ))}
          </Column>

          <Column heading="Get in touch">
            {/* Rendered only once the handle is known, so an unset one cannot
                ship as a dead link. */}
            {social.instagram ? (
              <a
                href={social.instagram.url}
                className={linkClass}
                rel="me noopener noreferrer"
                target="_blank"
              >
                Instagram
              </a>
            ) : null}
            {footer.contact.map((item) => (
              <Link key={item.key} href={item.href} className={linkClass}>
                {item.label}
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
