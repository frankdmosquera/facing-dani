// In code, not the env var, so local and production cannot disagree about the folder.
export const IMAGEKIT_FOLDER = "facing-dani";

// ImageKit caches for a year. Bump this whenever a file is replaced under the same name.
export const MEDIA_VERSION = "2026-09-22b";

// Accepts the endpoint with or without the folder already on it.
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

// Fail the deploy, but let a local build without the env file render placeholders.
if (!imagekitEndpoint && process.env.VERCEL === "1") {
  throw new Error("NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT is not set");
}
