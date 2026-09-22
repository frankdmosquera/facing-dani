/**
 * ImageKit, ported from `face-and-body/lib/imagekitConfig.ts`. Same account,
 * different folder, and the same two traps already paid for over there.
 */

/**
 * The media library folder for this project. It lives here rather than inside
 * the endpoint variable on purpose: a folder name is a fact about the repo, not
 * about a deployment, and hiding it in an env var lets local and production
 * drift apart. On `face-and-body` production spent a day serving 404s because
 * only one of the two environments had the folder appended by hand.
 *
 * `resolveEndpoint` accepts the endpoint with or without the folder, so
 * whichever spelling a given environment holds, the URL comes out the same.
 */
export const IMAGEKIT_FOLDER = "facing-dani";

/**
 * Cache-busting token on every ImageKit URL.
 *
 * ImageKit serves images with `max-age=31536000` - a one-year browser cache -
 * and a photo swapped in under its existing filename keeps the same URL. So a
 * replaced photo keeps showing the old file to anyone who had already loaded
 * it. curl is no help diagnosing it: curl has no cache, so it reports the new
 * image while every real browser still shows the old one.
 *
 * Bump this whenever a file in the library is replaced in place. It changes the
 * URL, so every browser refetches once and then caches again for the year.
 * Leaving it alone costs nothing.
 */
export const MEDIA_VERSION = "2026-09-22b";

function resolveEndpoint(raw: string | undefined): string | undefined {
  if (!raw) return undefined;
  const base = raw.replace(/\/+$/, "");
  return base.endsWith(`/${IMAGEKIT_FOLDER}`)
    ? base
    : `${base}/${IMAGEKIT_FOLDER}`;
}

export const imagekitEndpoint = resolveEndpoint(
  process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT,
);

/**
 * A deploy without the endpoint is a mistake and should fail loudly. A local
 * build without it is just someone who has not pulled the env file yet, so
 * callers render a labelled box instead and the rest of the page still works.
 */
if (!imagekitEndpoint && process.env.VERCEL === "1") {
  throw new Error("NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT is not set");
}
