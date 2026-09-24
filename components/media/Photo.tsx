import { Image } from "@imagekit/next";

import { MEDIA_VERSION, imagekitEndpoint } from "@/lib/imagekit";

// With no ImageKit endpoint (no env file), draws a placeholder box at the photo's aspect ratio.
export function Photo({
  path,
  alt,
  width,
  height,
  sizes,
  priority = false,
  className,
}: {
  // Inside the library: leading slash, no endpoint.
  path: string;
  alt: string;
  width: number;
  height: number;
  sizes: string;
  priority?: boolean;
  className?: string;
}) {
  if (!imagekitEndpoint) {
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
