// Unset until the domain exists. Never guess a host: an absolute canonical on a preview URL gets indexed.
export const siteUrl = normalise(process.env.NEXT_PUBLIC_SITE_URL);

// The indexing gate. robots.txt blocks every crawler until this is true.
export const siteUrlConfigured = siteUrl !== undefined;

function normalise(raw: string | undefined): string | undefined {
  if (!raw) return undefined;

  const trimmed = raw.trim().replace(/\/+$/, "");
  if (!trimmed) return undefined;

  try {
    // Origin only. A stray path would be prefixed to every canonical.
    return new URL(trimmed).origin;
  } catch {
    // Treated as unset rather than thrown, so a bad value cannot break the build.
    console.error(
      `[siteUrl] NEXT_PUBLIC_SITE_URL is not a valid URL: ${raw}. Treating it as unset.`,
    );
    return undefined;
  }
}

export function absoluteUrl(path: string): string {
  return siteUrl ? `${siteUrl}${path}` : path;
}
