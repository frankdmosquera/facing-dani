import { z } from "zod";

import { contactSourceKeys } from "@/data/contactSources";

// Shared by the form and the Server Action. Messages are dictionary keys, not sentences.

export const contactTopics = ["party", "question", "product", "other"] as const;
export type ContactTopic = (typeof contactTopics)[number];

export const partyKinds = ["birthday", "school", "other"] as const;
export type PartyKind = (typeof partyKinds)[number];

export const MAX_GUESTS = 50;

// Plain strings plus a refine, not unions: a zod union breaks zodResolver's types against useForm.
const isIn = (list: readonly string[]) => (value: string) => list.includes(value);
const isSourceKey = isIn(contactSourceKeys);

// A real calendar date as the date input sends it. Not "not in the past": the server's clock is UTC, hers is Calgary's.
const isIsoDate = (value: string) => {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(`${value}T00:00:00Z`);
  return !Number.isNaN(date.getTime()) && date.toISOString().startsWith(value);
};

export const contactSchema = z
  .object({
    name: z.string().trim().min(1, "required").max(80, "tooLong"),

    email: z.string().trim().min(1, "required").max(120, "tooLong").email("email"),

    topic: z.string().refine(isIn(contactTopics), { message: "required" }),

    // The party fields stay strings for every topic, and are only checked for a party below.
    partyKind: z.string(),
    partyDate: z.string(),
    guests: z.string(),
    area: z.string().trim().max(80, "tooLong"),

    source: z.string().refine((value) => isSourceKey(value), {
      message: "required",
    }),

    message: z.string().trim().min(10, "tooShort").max(2000, "tooLong"),

    // Honeypot. Unconstrained on purpose: the action checks it before parsing.
    company: z.string(),
  })
  .superRefine((values, ctx) => {
    if (values.topic !== "party") return;

    if (!isIn(partyKinds)(values.partyKind)) {
      ctx.addIssue({ code: "custom", path: ["partyKind"], message: "required" });
    }
    if (!isIsoDate(values.partyDate)) {
      ctx.addIssue({ code: "custom", path: ["partyDate"], message: "date" });
    }
    const guests = Number(values.guests);
    if (!Number.isInteger(guests) || guests < 1 || guests > MAX_GUESTS) {
      ctx.addIssue({ code: "custom", path: ["guests"], message: "guests" });
    }
    if (values.area.length === 0) {
      ctx.addIssue({ code: "custom", path: ["area"], message: "required" });
    }
  });

export type ContactInput = z.infer<typeof contactSchema>;

export type ContactErrorKey =
  | "required"
  | "email"
  | "tooShort"
  | "tooLong"
  | "date"
  | "guests";
