import { Image } from "@imagekit/next";

import { MEDIA_VERSION, imagekitEndpoint } from "@/lib/imagekit";

/**
 * One photograph from the ImageKit library, and nothing else.
 *
 * This owns exactly one behaviour beyond rendering an image: when no endpoint is
 * configured it draws a box at the photograph's real aspect ratio instead, so a
 * page still lays out correctly for someone who has not pulled the env file. It
 * carries no scrim, no caption, no filter classes - everything decorative
 * belongs to the caller.
 *
 * It exists because that endpoint check was about to be written a third time.
 * `GalleryFigure` had it in two branches; this page needs a portrait with the
 * same fallback and none of the gallery's chrome.
 *
 * `Image` comes from `@imagekit/next`, which opens with `'use client'`, so the
 * image is a client boundary. There is no server-rendered alternative -
 * `@imagekit/next/server` exports `getUploadAuthParams` and nothing else.
 * Whatever the caller wraps around this still renders on the server.
 */
export function Photo({
  path,
  alt,
  width,
  height,
  sizes,
  priority = false,
  className,
}: {
  /** Path inside the library, leading slash, no endpoint. */
  path: string;
  alt: string;
  /** The master's intrinsic pixels, so the space is reserved before it loads. */
  width: number;
  height: number;
  sizes: string;
  priority?: boolean;
  className?: string;
}) {
  if (!imagekitEndpoint) {
    // An empty alt means the caller has declared the image decorative. A box
    // with `role="img"` and an empty label would be an unnamed image to a
    // screen reader, so a decorative placeholder is hidden instead.
    const decorative = alt === "";

    return (
      <div
        role={decorative ? undefined : "img"}
        aria-label={decorative ? undefined : alt}
        aria-hidden={decorative ? true : undefined}
        style={{ aspectRatio: `${width} / ${height}` }}
        className={`w-full bg-shot ${className ?? ""}`}
      />
    );
  }

  return (
    <Image
      urlEndpoint={imagekitEndpoint}
      src={path}
      alt={alt}
      width={width}
      height={height}
      queryParameters={{ v: MEDIA_VERSION }}
      sizes={sizes}
      priority={priority}
      className={className}
    />
  );
}
