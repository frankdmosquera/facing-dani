// Checks the prerendered HTML for canonical, hreflang, title, description, h1 and noindex.
//   npm run build && node scripts/auditSeo.mjs
import fs from "node:fs";
import path from "node:path";

const APP = path.join(process.cwd(), ".next", "server", "app");

// Keep in step with NOINDEX in app/sitemap.ts.
const NOINDEX = ["/thank-you"];

if (!fs.existsSync(APP)) {
  console.error("No build found at .next/server/app. Run `npm run build` first.");
  process.exit(1);
}

function builtRoutes() {
  const found = [];
  (function walk(dir) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) walk(full);
      else if (entry.name.endsWith(".html")) {
        const rel = path.relative(APP, full).replace(/\\/g, "/");
        found.push({ route: "/" + rel.replace(/\.html$/, ""), file: full });
      }
    }
  })(APP);
  return found
    .filter(({ route }) => !route.startsWith("/_"))
    .sort((a, b) => a.route.localeCompare(b.route));
}

// Mirrors localePath: /en/gallery -> /gallery, /es/gallery stays.
function expectedCanonical(builtRoute) {
  if (builtRoute === "/en") return "/";
  if (builtRoute.startsWith("/en/")) return builtRoute.slice(3);
  return builtRoute;
}

const failures = [];
const fail = (route, message) => failures.push(`${route}: ${message}`);

const pages = builtRoutes();

// A failed build leaves no pages. That must fail, not pass with 0 routes.
if (pages.length === 0) {
  console.error("No prerendered routes found. Did the build fail?");
  process.exit(1);
}

console.log(`Auditing ${pages.length} prerendered routes\n`);

for (const { route, file } of pages) {
  const raw = fs.readFileSync(file, "utf8");
  // The RSC payload in <script> repeats the metadata, which would let an empty <head> pass.
  const doc = raw.replace(/<script[\s\S]*?<\/script>/g, "");

  const canonicals = [...doc.matchAll(/<link[^>]*rel="canonical"[^>]*>/g)];
  const hreflangs = [...doc.matchAll(/<link[^>]*rel="alternate"[^>]*hrefLang="([^"]*)"/g)];
  const title = (doc.match(/<title>([^<]*)<\/title>/) || [])[1];
  const description = (doc.match(/<meta name="description" content="([^"]*)"/) || [])[1];
  const h1s = [...doc.matchAll(/<h1[\s>]/g)];
  const robots = (doc.match(/<meta name="robots" content="([^"]*)"/) || [])[1] ?? "";

  if (canonicals.length !== 1) fail(route, `${canonicals.length} canonical links, expected 1`);

  // Must point at this page. A page missing its own alternates inherits the home page's canonical.
  const href = (canonicals[0]?.[0].match(/href="([^"]*)"/) || [])[1];
  if (href !== undefined) {
    const got = href.startsWith("http") ? new URL(href).pathname : href;
    const want = expectedCanonical(route);
    if (got.replace(/\/$/, "") !== want.replace(/\/$/, "")) {
      fail(route, `canonical is "${got}", expected "${want}"`);
    }
  }

  const langs = hreflangs.map((m) => m[1]).sort();
  const expected = ["en", "es", "x-default"];
  if (JSON.stringify(langs) !== JSON.stringify(expected)) {
    fail(route, `hreflang is [${langs}], expected [${expected}]`);
  }

  if (!title?.trim()) fail(route, "no title");
  if (!description?.trim()) fail(route, "no meta description");
  if (h1s.length !== 1) fail(route, `${h1s.length} h1 elements, expected 1`);

  const shouldBeNoindex = NOINDEX.some((n) => route === n || route.endsWith(n));
  const isNoindex = robots.includes("noindex");
  if (shouldBeNoindex && !isNoindex) fail(route, "should be noindex and is not");
  if (!shouldBeNoindex && isNoindex) fail(route, "is noindex and should not be");

  const flag = isNoindex ? " (noindex)" : "";
  console.log(`  ${failures.length ? " " : ""}${route}${flag}`);
}

const sitemapFile = path.join(APP, "sitemap.xml.body");
if (fs.existsSync(sitemapFile)) {
  const xml = fs.readFileSync(sitemapFile, "utf8");
  const urls = [...xml.matchAll(/<loc>([^<]*)<\/loc>/g)].map((m) => m[1]);
  console.log(`\nSitemap: ${urls.length} URLs`);

  for (const url of urls) {
    for (const n of NOINDEX) {
      if (url.endsWith(n)) fail("sitemap", `lists ${url}, which is noindex`);
    }
    if (!/^https?:\/\//.test(url)) fail("sitemap", `${url} is not absolute`);
  }

  if (urls.length === 0) {
    console.log("  empty - expected while NEXT_PUBLIC_SITE_URL is unset");
  }
} else {
  console.log("\nSitemap: not emitted");
}

console.log("");
if (failures.length) {
  console.error(`FAILED (${failures.length}):`);
  for (const f of failures) console.error(`  ${f}`);
  process.exit(1);
}
console.log(`PASSED - ${pages.length} routes`);
