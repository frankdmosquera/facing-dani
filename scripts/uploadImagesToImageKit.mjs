/**
 * Uploads a local folder of photographs into the ImageKit media library.
 *
 *   node scripts/uploadImagesToImageKit.mjs <local-dir> <remote-folder> [--dry-run]
 *   node scripts/uploadImagesToImageKit.mjs ./photos/nails nails --dry-run
 *   node scripts/uploadImagesToImageKit.mjs ./photos/nails nails
 *
 * Ported from `face-and-body/scripts/uploadImagesToImageKit.mjs`. Same ImageKit
 * account, different folder.
 *
 * Every photograph on this site is served from ImageKit; `public/` is for icons
 * and the favicon only. The local directory you point this at is a staging area
 * and does not belong in the repo - the repo stores a path, never a photograph.
 *
 * The remote folder is created on demand. ImageKit makes any folder named in an
 * upload request, so there is nothing to set up in the dashboard first.
 *
 * Subfolders are mirrored exactly under `<remote-folder>`, so
 * `./photos/nails/chrome/set-01.jpg` becomes
 * `facing-dani/nails/chrome/set-01.jpg`.
 *
 * Safe to re-run: `overwriteFile` replaces a file in place and
 * `useUniqueFileName` is off, so filenames stay predictable and nothing is ever
 * duplicated with a suffix. Re-running after replacing a photo means bumping
 * MEDIA_VERSION in `lib/imagekit.ts`, or browsers keep showing the old one for
 * a year.
 *
 * The private key is read from .env.local at run time and never printed.
 */
import fs from "node:fs/promises";
import path from "node:path";

const ROOT = process.cwd();
const ENDPOINT = "https://upload.imagekit.io/api/v1/files/upload";
const CONCURRENCY = 4;

/** Must match IMAGEKIT_FOLDER in lib/imagekit.ts. */
const IMAGEKIT_FOLDER = "facing-dani";

const DRY_RUN = process.argv.includes("--dry-run");
const [localDir, remoteFolder] = process.argv
  .slice(2)
  .filter((arg) => arg !== "--dry-run");

if (!localDir || !remoteFolder) {
  console.error(
    "usage: node scripts/uploadImagesToImageKit.mjs <local-dir> <remote-folder> [--dry-run]",
  );
  process.exit(1);
}

const SOURCE = path.resolve(ROOT, localDir);
const REMOTE_ROOT = `${IMAGEKIT_FOLDER}/${remoteFolder.replace(/^\/+|\/+$/g, "")}`;

const TYPES = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
};

/** Minimal .env.local reader. The key is used and never printed. */
async function readPrivateKey() {
  const raw = await fs.readFile(path.join(ROOT, ".env.local"), "utf8");
  for (const line of raw.split(/\r?\n/)) {
    const match = line.match(/^\s*IMAGE_KIT_PRIVATE_KEY\s*=\s*(.+)\s*$/);
    if (match) return match[1].trim().replace(/^["']|["']$/g, "");
  }
  throw new Error("IMAGE_KIT_PRIVATE_KEY is not in .env.local");
}

async function collectImages(dir) {
  const found = [];
  for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      found.push(...(await collectImages(full)));
    } else if (TYPES[path.extname(entry.name).toLowerCase()]) {
      found.push(full);
    }
  }
  return found;
}

async function upload(file, auth) {
  const relative = path.relative(SOURCE, file).split(path.sep);
  const fileName = relative.pop();
  const folder = [REMOTE_ROOT, ...relative].join("/");

  if (DRY_RUN) return { folder, fileName };

  const body = new FormData();
  const bytes = await fs.readFile(file);
  const type = TYPES[path.extname(fileName).toLowerCase()];
  body.append("file", new Blob([bytes], { type }), fileName);
  body.append("fileName", fileName);
  body.append("folder", folder);
  body.append("useUniqueFileName", "false");
  body.append("overwriteFile", "true");

  const response = await fetch(ENDPOINT, {
    method: "POST",
    headers: { Authorization: `Basic ${auth}` },
    body,
  });

  if (!response.ok) {
    const detail = await response.text();
    // The key travels in the Authorization header and never comes back in the
    // response, so this is safe to print. Keep it that way.
    throw new Error(`${response.status} ${detail.slice(0, 200)}`);
  }

  return { folder, fileName };
}

async function main() {
  // A dry run should work on a machine with no key at all, so it is the one
  // path that does not need .env.local.
  const auth = DRY_RUN
    ? ""
    : Buffer.from(`${await readPrivateKey()}:`).toString("base64");

  const files = await collectImages(SOURCE);
  files.sort();
  console.log(
    `${files.length} images in ${localDir} -> ${REMOTE_ROOT}${DRY_RUN ? " (dry run, nothing will be sent)" : ""}`,
  );

  let done = 0;
  const failures = [];
  const queue = [...files];

  async function worker() {
    for (;;) {
      const next = queue.shift();
      if (!next) return;
      try {
        const result = await upload(next, auth);
        done += 1;
        if (DRY_RUN || done % 20 === 0 || done === files.length) {
          console.log(
            `  ${done}/${files.length}  ${result.folder}/${result.fileName}`,
          );
        }
      } catch (error) {
        failures.push({ file: next, message: String(error.message ?? error) });
      }
    }
  }

  await Promise.all(
    Array.from({ length: Math.min(CONCURRENCY, files.length) }, worker),
  );

  console.log(
    `\n${DRY_RUN ? "would upload" : "uploaded"} ${done}, failed ${failures.length}`,
  );
  for (const failure of failures) {
    console.log(
      `  FAILED ${path.relative(ROOT, failure.file)}: ${failure.message}`,
    );
  }
  if (failures.length > 0) process.exitCode = 1;
}

main().catch((error) => {
  console.error(String(error.message ?? error));
  process.exitCode = 1;
});
