import { z } from "zod";

import { contactSourceKeys } from "@/data/contactSources";
import { services } from "@/data/services";

// Shared by the form and the Server Action. Messages are dictionary keys, not sentences.

// Plain strings plus a refine, not unions: a zod union breaks zodResolver's types against useForm.
const serviceIdList: readonly string[] = services.map((service) => service.id);
const isServiceId = (value: string) => serviceIdList.includes(value);
const isSourceKey = (value: string) =>
  (contactSourceKeys as readonly string[]).includes(value);

export const contactSchema = z.object({
  name: z.string().trim().min(1, "required").max(80, "tooLong"),

  email: z.string().trim().min(1, "required").max(120, "tooLong").email("email"),

  // Optional, and "" stays "". Transforming it to null breaks the resolver types and the server re-parse.
  service: z
    .string()
    .refine((value) => value === "" || isServiceId(value), {
      message: "required",
    }),

  source: z.string().refine((value) => isSourceKey(value), {
    message: "required",
  }),

  message: z.string().trim().min(10, "tooShort").max(2000, "tooLong"),

  // Honeypot. Unconstrained on purpose: the action checks it before parsing.
  company: z.string(),
});

export type ContactInput = z.infer<typeof contactSchema>;

export type ContactErrorKey = "required" | "email" | "tooShort" | "tooLong";
