"use server";

import { createElement } from "react";
import { Resend } from "resend";

import { siteConfig } from "@/data/siteConfig";
import { ContactEnquiryEmail } from "@/emails/contact-enquiry";
import { contactSchema, type ContactInput } from "@/lib/contactValidation";
import { type Locale } from "@/lib/locale";

/**
 * The one thing on this site that leaves the machine.
 *
 * Nothing is stored. No database, no file, no log of what anyone wrote - the
 * enquiry is validated, emailed and forgotten, which is what the overview locks
 * and what makes a privacy policy unnecessary at this scale.
 *
 * The result is a key, never a sentence and never a Resend code. The form turns
 * it into localised copy, because this action is shared by both languages.
 */
export type ContactResult =
  | { success: true }
  | { success: false; error: "failed" };

/**
 * Every failure past validation says the same thing to the visitor. The reason
 * is deliberately not distinguished for her: a blocked API key and a rejected
 * recipient are the same problem from where she is sitting, and the form's copy
 * points her at the DM either way.
 *
 * The real reason goes to the server log, which is the split the coding
 * standards ask for - the visitor gets the friendly version, the server keeps
 * the useful one.
 */
const FAILED: ContactResult = { success: false, error: "failed" };

export async function submitContact(
  values: ContactInput,
  locale: Locale,
): Promise<ContactResult> {
  /**
   * The honeypot is checked **first**, before validation, and reports success.
   *
   * Order matters and got this wrong once. With the check after `safeParse`,
   * and `company` constrained to empty in the schema, a filled honeypot failed
   * validation and the visitor - which is to say the bot - saw the "that did
   * not send" message. That is a tell, and a bot that gets one comes back
   * without the field.
   *
   * Looking indistinguishable from a real success is the entire mechanism. A
   * presence check on an arbitrary string needs no validation to be safe.
   */
  if (values.company) return { success: true };

  /**
   * Re-validated here rather than trusted. The client already checked, but a
   * Server Action is a public endpoint: anything that can POST can reach it
   * with any body at all.
   */
  const parsed = contactSchema.safeParse(values);
  if (!parsed.success) return FAILED;

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[contact] RESEND_API_KEY is not set; nothing was sent");
    return FAILED;
  }

  const { name, email, source, message } = parsed.data;
  // The select's unselected state is an empty string; the email wants a word.
  const service = parsed.data.service || null;

  try {
    const resend = new Resend(apiKey);

    const { data, error } = await resend.emails.send({
      /**
       * A verified sender, or Resend's shared one.
       *
       * The fallback delivers **only** to the address that owns the Resend
       * account and returns 403 for every other recipient, so an unset
       * `RESEND_FROM` on a deploy does not degrade quietly - it fails every
       * submission. It is a local-development convenience and never a
       * production state. This project has no domain of its own yet, so there
       * is nothing to verify and nothing to put here.
       */
      from: process.env.RESEND_FROM ?? "onboarding@resend.dev",
      to: [siteConfig.business.email],
      /**
       * The visitor is who Reply should reach. `from` is a send-only address
       * with no mailbox behind it, so without this a reply goes nowhere.
       * `email` is required by the schema, so there is no empty case.
       */
      replyTo: email,
      subject: `New enquiry from ${name}`,
      /**
       * The plain-text part stays even though an HTML version exists. It is
       * what a text-only client renders, and it is the copy a spam filter reads
       * when it distrusts the HTML.
       */
      text: [
        `Name:    ${name}`,
        `Email:   ${email}`,
        `Service: ${service ?? "not sure yet"}`,
        `Found:   ${source}`,
        /**
         * Which language she was reading. Nothing else in the message would
         * say, and an enquiry that arrived in Spanish should be answered in
         * Spanish.
         */
        `Language: ${locale}`,
        "",
        message,
      ].join("\n"),
      /**
       * `createElement` rather than JSX so this file stays `.ts`. One call does
       * not justify renaming the module and churning every import of it.
       *
       * React escapes every interpolation, so a visitor who types HTML into the
       * message field gets it back as text rather than as markup.
       */
      react: createElement(ContactEnquiryEmail, {
        name,
        email,
        service,
        source,
        locale,
        message,
      }),
    });

    /**
     * Resend reports failures in the response rather than by throwing, so the
     * try/catch alone would miss half of them. A failed send must never look
     * like a success: swallowing this loses a booking and nobody finds out.
     */
    if (error || !data) {
      console.error("[contact] resend rejected:", JSON.stringify(error));
      return FAILED;
    }

    return { success: true };
  } catch (cause) {
    // The enquiry itself is never logged. Only that it failed, and why.
    console.error("[contact] send threw:", cause);
    return FAILED;
  }
}
