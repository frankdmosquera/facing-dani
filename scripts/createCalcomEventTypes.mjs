/**
 * Creates one Cal.com event type per bookable treatment, and hides Cal's default meetings.
 *
 *   $env:CALCOM_API_KEY = "cal_live_..."; node scripts/createCalcomEventTypes.mjs            # dry run
 *   $env:CALCOM_API_KEY = "cal_live_..."; node scripts/createCalcomEventTypes.mjs --apply
 *
 * Ported from face-and-body. The key is read from the environment for one command and never written down,
 * not even in .env.local: nothing the site renders needs it, and Turbopack snapshots that file into .next/cache.
 *
 * The menu in data/treatments.ts is the source: its name is the title, its length the length, and the slug
 * comes from eventSlug(), the same function the site's Book buttons use. Add-ons get no event; they are a
 * question on the events they go with, and a 15 minute buffer after every event leaves room for them.
 *
 * Safe to re-run: it skips any slug already there and never edits or deletes what it finds, apart from
 * hiding Cal's starter meetings. It refuses to run against any account other than CALCOM_USERNAME.
 */

import { en } from "../dictionaries/en.ts";
import { treatments } from "../data/treatments.ts";
import { CALCOM_USERNAME, eventSlug } from "../lib/bookingConfig.ts";

const API = "https://api.cal.com/v2";
const API_VERSION = "2024-06-14";

const KEY = process.env.CALCOM_API_KEY;
if (!KEY) {
  console.error("CALCOM_API_KEY is not set.");
  process.exit(1);
}
const APPLY = process.argv.includes("--apply");

// Only the city is public: she is 17 and works from home, so the exact address goes out with the confirmation.
const LOCATION = [{ type: "address", address: "Calgary, AB. Exact address sent after booking", public: true }];

// Time to clean up between clients, and room for an add-on picked at booking.
const BUFFER_AFTER = 15;

const categories = {
  nails: { title: "Nails", note: "Paste a reference photo link in the notes if you have one." },
  lashes: { title: "Lashes", note: "Come with clean lashes and no eye makeup." },
  makeup: { title: "Makeup", note: "Tell me the event and the look you want in the notes." },
};

// Cal's starter meetings, and the three per-category events from the first attempt. Hidden, never deleted.
const TO_HIDE = ["15min", "30min", "nails", "lashes", "makeup"];

// A removal is only a removal, and full glam already includes lashes.
const NO_ADD_ONS = ["removal", "fullGlam"];

const label = (service, key) => en.services[service].treatments[key].replace(/, add-on$/, "");

function hours(minutes) {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return [h ? `${h} h` : "", m ? `${m} min` : ""].filter(Boolean).join(" ");
}

const jobs = Object.entries(treatments).flatMap(([service, rows]) => {
  const addOns = rows.filter((row) => row.addOn).map((row) => label(service, row.key));
  return rows
    .filter((row) => !row.addOn)
    .sort((a, b) => a.order - b.order)
    .map((row) => ({
      slug: eventSlug(service, row.key),
      title: `${categories[service].title} · ${label(service, row.key)}`,
      length: row.durationMinutes,
      description: `${label(service, row.key)}, about ${hours(row.durationMinutes)}. ${categories[service].note} Prices: glammedbeautystudio.com/${service}`,
      addOns: NO_ADD_ONS.includes(row.key) ? [] : addOns,
    }));
});

async function call(path, options = {}) {
  const response = await fetch(`${API}${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${KEY}`,
      "cal-api-version": API_VERSION,
      "Content-Type": "application/json",
      ...options.headers,
    },
  });
  const body = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(`${options.method ?? "GET"} ${path} -> ${response.status} ${JSON.stringify(body).slice(0, 300)}`);
  }
  return body;
}

// A key made while signed in to another account would fill that account instead. Check before anything else.
const me = (await call("/me")).data;
console.log(`key belongs to: ${me.username} (${me.email})`);
if (me.username !== CALCOM_USERNAME) {
  console.error(`\nstopped: expected ${CALCOM_USERNAME}. Create the key while signed in to her account.`);
  process.exit(1);
}

const existing = (await call("/event-types")).data;
const bySlug = new Map(existing.map((event) => [event.slug, event]));
const todo = jobs.filter((job) => !bySlug.has(job.slug));
const toHide = TO_HIDE.map((slug) => bySlug.get(slug)).filter((event) => event && !event.hidden);

console.log(`account has ${existing.length} event types: ${existing.map((event) => event.slug).join(", ") || "none"}\n`);
for (const job of jobs) {
  const state = todo.includes(job) ? "create" : "exists, skip";
  const extras = job.addOns.length ? `  add-ons: ${job.addOns.join(", ")}` : "";
  console.log(`  ${state.padEnd(12)} ${String(job.length).padStart(3)} min  ${job.slug}${extras}`);
}
for (const event of toHide) console.log(`  hide         ${event.slug}`);

if (!APPLY) {
  console.log("\ndry run. re-run with --apply to make these changes.");
  process.exit(0);
}

console.log("");
const failures = [];

for (const job of todo) {
  let id;
  try {
    const created = await call("/event-types", {
      method: "POST",
      body: JSON.stringify({
        title: job.title,
        slug: job.slug,
        description: job.description,
        lengthInMinutes: job.length,
        afterEventBuffer: BUFFER_AFTER,
        locations: LOCATION,
        // One client in the chair at a time.
        disableGuests: true,
      }),
    });
    id = created.data.id;
    console.log(`  created  ${job.slug}`);
  } catch (error) {
    failures.push(`${job.slug}: ${error}`);
    console.log(`  FAILED   ${job.slug}`);
    continue;
  }

  // A separate call, so a question Cal rejects never costs the event itself.
  if (job.addOns.length) {
    try {
      await call(`/event-types/${id}`, {
        method: "PATCH",
        body: JSON.stringify({
          bookingFields: [
            { type: "multiselect", slug: "add-ons", label: "Add-ons", required: false, options: job.addOns },
          ],
        }),
      });
      console.log(`           + add-ons question`);
    } catch (error) {
      failures.push(`${job.slug} add-ons question: ${error}`);
      console.log(`           add-ons question FAILED`);
    }
  }
}

for (const event of toHide) {
  try {
    await call(`/event-types/${event.id}`, { method: "PATCH", body: JSON.stringify({ hidden: true }) });
    console.log(`  hidden   ${event.slug}`);
  } catch (error) {
    failures.push(`${event.slug}: ${error}`);
    console.log(`  FAILED   ${event.slug}`);
  }
}

console.log(`\n${failures.length ? `${failures.length} failed` : "all done"}`);
for (const failure of failures) console.log(`  ${failure}`);
