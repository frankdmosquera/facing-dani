/**
 * Checks the built output for the things that quietly break rankings.
 *
 *   npm run build && node scripts/auditSeo.mjs
 *
 * Exists because "every page carries its own metadata and hreflang" is easy to
 * be true once and false forever after. Every page on this site sets its own
 * `alternates` today; the one that gets added next year will inherit the
 * layout's, declare the home page as its canonical, and nothing will complain.
 * This complains.
 *
 * It reads the prerendered HTML rather than the source, so it checks what a
 * crawler actually receives. `<script>` blocks are stripped first: the RSC
 * payload contains serialised copies of every prop, including the metadata, and
 * matching against it would make this pass while the real `<head>` was empty.
 *
 * Exits non-zero naming the route and the failed assertion. No dependencies.
 */
import fs from "node:fs";
import path from "node:path";

const APP = path.join(process.cwd(), ".next", "server", "app");

/** Kept in step with `NOINDEX` in `app/sitemap.ts`. */
const NOINDEX = ["/thank-you"];

if (!fs.existsSync(APP)) {
  console.error("No build found at .next/server/app. Run `npm run build` first.");
  process.exit(1);
}

/** Every prerendered page, as a route path, from the built output. */
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

/**
 * The public path a built route should call its own, mirroring `localePath`:
 * English lives at the root and Spanish under `/es`.
 *
 *   /en          -> /
 *   /en/gallery  -> /gallery
 *   /es          -> /es
 *   /es/gallery  -> /es/gallery
 */
function expectedCanonical(builtRoute) {
  if (builtRoute === "/en") return "/";
  if (builtRoute.startsWith("/en/")) return builtRoute.slice(3);
  return builtRoute;
}

const failures = [];
const fail = (route, message) => failures.push(`${route}: ${message}`);

const pages = builtRoutes();

/**
 * An empty build is a failure, not a pass.
 *
 * Found the hard way: a deliberate break made the build fail, which left
 * `.next/server/app` empty, and this script cheerfully reported "PASSED - 0
 * routes". A check that succeeds when there is nothing to check is worse than
 * no check, because it gets trusted.
 */
if (pages.length === 0) {
  console.error("No prerendered routes found. Did the build fail?");
  process.exit(1);
}

console.log(`Auditing ${pages.length} prerendered routes\n`);

for (const { route, file } of pages) {
  const raw = fs.readFileSync(file, "utf8");
  // The RSC payload lives in <script> tags and mirrors every prop. Matching
  // against it would let an empty <head> pass.
  const doc = raw.replace(/<script[\s\S]*?<\/script>/g, "");

  const canonicals = [...doc.matchAll(/<link[^>]*rel="canonical"[^>]*>/g)];
  const hreflangs = [...doc.matchAll(/<link[^>]*rel="alternate"[^>]*hrefLang="([^"]*)"/g)];
  const title = (doc.match(/<title>([^<]*)<\/title>/) || [])[1];
  const description = (doc.match(/<meta name="description" content="([^"]*)"/) || [])[1];
  const h1s = [...doc.matchAll(/<h1[\s>]/g)];
  const robots = (doc.match(/<meta name="robots" content="([^"]*)"/) || [])[1] ?? "";

  if (canonicals.length !== 1) fail(route, `${canonicals.length} canonical links, expected 1`);

  /**
   * The canonical must point at **this** page, not merely exist.
   *
   * This check was missing from the first version of the script, which made it
   * useless for the failure it was written to catch: a page that loses its own
   * `alternates` silently inherits the layout's and declares the home page as
   * its canonical. Every page still has exactly one canonical and a full
   * hreflang trio, so counting them passes while the site quietly tells Google
   * that seven pages are all the home page.
   *
   * Proved by deleting a page's `alternates` and watching the audit pass.
   */
  const href = (canonicals[0]?.[0].match(/href="([^"]*)"/) || [])[1];
  if (href !== undefined) {
    const got = href.startsWith("http") ? new URL(href).pathname : href;
    const want = expectedCanonical(route);
    // A trailing slash on the origin is the same page as no trailing slash.
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

/**
 * The sitemap is generated, so this checks the contract rather than the list:
 * nothing marked noindex may appear in it, and it must be absent entirely when
 * no site URL is configured.
 */
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
