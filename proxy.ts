import { NextResponse, type NextRequest } from "next/server";

import { defaultLocale, isLocale } from "@/lib/locale";

// English lives at the root: /nails is served by /en/nails. Decided per request, not as one
// rewrite per route in next.config.ts, because those are built once at startup and a new page
// 404'd on the dev server until it was restarted.
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // /es/... is already a real route. /en/... never gets here: next.config.ts redirects it first.
  if (isLocale(pathname.split("/")[1] ?? "")) return;

  const url = request.nextUrl.clone();
  url.pathname = pathname === "/" ? `/${defaultLocale}` : `/${defaultLocale}${pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  // Skips Next's own files and anything with an extension: robots.txt, sitemap.xml, the icons, public/.
  matcher: ["/((?!_next/|.*\\..*).*)"],
};
