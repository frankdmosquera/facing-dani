/**
 * Where this site lives, and whether that is actually known yet.
 *
 * One variable drives three things that must never disagree: `metadataBase` on
 * the root layout, every URL in the sitemap, and whether `robots.txt` lets a
 * crawler in at all. Keeping the decision here means it is made once rather
 * than remembered in three files.
 */

/**
 * The site's origin, or `undefined` when nobody has said yet.
 *
 * **Unset is a first-class state, not an error.** A local build and a preview
 * deploy both run without it and both must succeed. What they must not do is
 * guess: an absolute canonical pointing at a Vercel preview host invites Google
 * to index the preview as the real site, and undoing that costs redirects and
 * ranking. A relative canonical is resolved against whatever host served the
 * page, which is wrong-but-harmless; an absolute wrong one is believed.
 */
export const siteUrl = normalise(process.env.NEXT_PUBLIC_SITE_URL);

/**
 * Whether a real domain has been configured.
 *
 * This is the indexing gate. Until it is true the site tells every crawler to
 * stay out, because being indexed on a temporary host is worse than not being
 * indexed at all - nothing links here yet, so there is nothing to lose by
 * waiting and a canonical to lose by not.
 */
export const siteUrlConfigured = siteUrl !== undefined;

function normalise(raw: string | undefined): string | undefined {
  if (!raw) return undefined;

  const trimmed = raw.trim().replace(/\/+$/, "");
  if (!trimmed) return undefined;

  try {
    // Origin only. A path or a query in this value would end up prefixed to
    // every canonical on the site, which is the sort of thing nobody notices
    // until Search Console reports every page as a duplicate.
    return new URL(trimmed).origin;
  } catch {
    // A malformed value is treated as unset rather than thrown on: a broken
    // deploy that refuses indexing is recoverable, one that will not build is
    // a worse Saturday.
    console.error(
      `[siteUrl] NEXT_PUBLIC_SITE_URL is not a valid URL: ${raw}. Treating it as unset.`,
    );
    return undefined;
  }
}

/** An absolute URL for a path, or the path itself when the origin is unknown. */
export function absoluteUrl(path: string): string {
  return siteUrl ? `${siteUrl}${path}` : path;
}
