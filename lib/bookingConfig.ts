import type { ServiceId } from "@/data/services";

// A constant, not an env var: face-and-body's username lived in .env.local, Vercel never had it, and every live Book button fell back quietly.
export const CALCOM_USERNAME = "glammedbeautystudio";

// One Cal.com event per bookable treatment: nails + gelXFill -> "nails-gel-x-fill". scripts/createCalcomEventTypes.mjs creates them with the same rule.
export function eventSlug(service: ServiceId, treatment: string): string {
  return `${service}-${treatment.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`)}`;
}

// No event means her account page, which lists every job.
function calPath(event?: string): string {
  return event ? `${CALCOM_USERNAME}/${event}` : CALCOM_USERNAME;
}

// The real link under the popup: middle click, copy link and a visitor without JavaScript still reach the booker.
export function bookingHref(event?: string): string {
  return `https://cal.com/${calPath(event)}`;
}

// Spread onto the anchor next to its href. Cal's script opens the popup for anything carrying data-cal-link.
export function bookingTrigger(event?: string): Record<string, string> {
  return {
    "data-cal-link": calPath(event),
    "data-cal-config": JSON.stringify({ layout: "month_view" }),
  };
}
