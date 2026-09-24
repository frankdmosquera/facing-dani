"use server";

import { createElement } from "react";
import { Resend } from "resend";

import { siteConfig } from "@/data/siteConfig";
import { ContactEnquiryEmail } from "@/emails/contact-enquiry";
import { contactSchema, type ContactInput } from "@/lib/contactValidation";
import { type Locale } from "@/lib/locale";

// A key, not a sentence: the form localises it.
export type ContactResult =
  | { success: true }
  | { success: false; error: "failed" };

// One answer for every failure. The real reason goes to the server log.
const FAILED: ContactResult = { success: false, error: "failed" };

export async function submitContact(
  values: ContactInput,
  locale: Locale,
): Promise<ContactResult> {
  // Honeypot first, and it reports success. A failure here tells a bot which field gave it away.
  if (values.company) return { success: true };

  const parsed = contactSchema.safeParse(values);
  if (!parsed.success) return FAILED;

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[contact] RESEND_API_KEY is not set; nothing was sent");
    return FAILED;
  }

  const { name, email, source, message } = parsed.data;
  const service = parsed.data.service || null;

  try {
    const resend = new Resend(apiKey);

    const { data, error } = await resend.emails.send({
      // Resend's shared sender only delivers to the account owner. Production needs RESEND_FROM.
      from: process.env.RESEND_FROM ?? "onboarding@resend.dev",
      to: [siteConfig.business.email],
      replyTo: email,
      subject: `New enquiry from ${name}`,
      text: [
        `Name:    ${name}`,
        `Email:   ${email}`,
        `Service: ${service ?? "not sure yet"}`,
        `Found:   ${source}`,
        `Language: ${locale}`,
        "",
        message,
      ].join("\n"),
      // createElement keeps this file .ts.
      react: createElement(ContactEnquiryEmail, {
        name,
        email,
        service,
        source,
        locale,
        message,
      }),
    });

    // Resend returns errors instead of throwing, so the catch alone misses them.
    if (error || !data) {
      console.error("[contact] resend rejected:", JSON.stringify(error));
      return FAILED;
    }

    return { success: true };
  } catch (cause) {
    // Never log the enquiry itself.
    console.error("[contact] send threw:", cause);
    return FAILED;
  }
}
