import { z } from "zod";

import { contactSourceKeys } from "@/data/contactSources";
import { services } from "@/data/services";

/**
 * The one schema. `react-hook-form` validates against it in the browser so the
 * visitor gets told before she submits; the Server Action validates against it
 * again because the browser cannot be trusted. Two callers, one definition, so
 * the two can never disagree about what a valid enquiry is.
 *
 * Messages are **keys, not sentences**. The form turns them into localised
 * copy, because this schema is shared by both languages and a hard-coded
 * English "Required" would leak onto the Spanish page.
 */

/**
 * Both selects are typed as plain `string` rather than as unions of their
 * allowed values, and validated by a refine instead.
 *
 * The union version was written first and does not survive contact with
 * react-hook-form: a zod union narrows differently on the way in and on the way
 * out, so the resolver's generics stop matching `useForm`'s and the form will
 * not typecheck. Two rounds were spent on it.
 *
 * Nothing is lost at runtime - an unknown value is still rejected here and
 * again on the server. What is lost is compile-time narrowing inside the
 * action, where `source` is a `string` the refine has already guaranteed.
 */
const serviceIdList: readonly string[] = services.map((service) => service.id);
const isServiceId = (value: string) => serviceIdList.includes(value);
const isSourceKey = (value: string) =>
  (contactSourceKeys as readonly string[]).includes(value);

export const contactSchema = z.object({
  name: z.string().trim().min(1, "required").max(80, "tooLong"),

  /**
   * Required, unlike the sibling project's form: it is the only way she can
   * reply. `replyTo` has nothing to fall back on if this is blank, because
   * `from` is a send-only address with no mailbox behind it.
   */
  email: z.string().trim().min(1, "required").max(120, "tooLong").email("email"),

  /**
   * Optional. "I am not sure yet" is a real answer from someone who has never
   * booked a set, and forcing a guess here would cost more enquiries than the
   * tidier data is worth.
   *
   * `""` is the unselected state and stays `""` through the schema. An earlier
   * version transformed it to `null` here, which broke both ends at once: the
   * form's input type stopped matching the resolver's output type, and the
   * action - which re-parses with this same schema - would have rejected the
   * very `null` the client had just been told to send. The schema describes
   * what goes over the wire; the action normalises after parsing.
   */
  service: z
    .string()
    .refine((value) => value === "" || isServiceId(value), {
      message: "required",
    }),

  /** Required. `""` is the unselected state and is what the refine rejects. */
  source: z.string().refine((value) => isSourceKey(value), {
    message: "required",
  }),

  /**
   * Ten characters stops "hi" arriving with no way to answer it. Two thousand
   * stops a paste bomb without ever being reached by a real enquiry.
   */
  message: z.string().trim().min(10, "tooShort").max(2000, "tooLong"),

  /**
   * Honeypot. Hidden from sighted users and from assistive technology, so a
   * human never fills it and a bot filling every field does.
   *
   * **Deliberately unconstrained.** An earlier version was `z.string().max(0)`,
   * which looked tidier and broke the whole mechanism: a filled honeypot failed
   * validation, so the action returned its failure result and the form showed
   * the "that did not send" message. That tells a bot precisely which field
   * gave it away, which is the one outcome a honeypot exists to prevent.
   *
   * Caught by filling it in a real browser; the build was perfectly happy.
   *
   * The check belongs in the action, before parsing, and its answer is success.
   */
  company: z.string(),
});

/**
 * The wire shape, identical on both sides. `service` and `source` are the
 * strings the selects hold, empty when unchosen.
 */
export type ContactInput = z.infer<typeof contactSchema>;

/** Every error key the schema can produce, so the dictionary must cover them. */
export type ContactErrorKey = "required" | "email" | "tooShort" | "tooLong";
