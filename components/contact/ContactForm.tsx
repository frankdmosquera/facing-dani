"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useId, useState } from "react";
import { useForm } from "react-hook-form";

import { submitContact } from "@/actions/contactAction";
import { contactSourceKeys } from "@/data/contactSources";
import { services } from "@/data/services";
import type { Dictionary } from "@/dictionaries";
import {
  contactSchema,
  type ContactErrorKey,
  type ContactInput,
} from "@/lib/contactValidation";
import { localePath, type Locale } from "@/lib/locale";

// Plain react-hook-form, not shadcn's Form wrapper, which lags behind the current react-hook-form API.
// Native selects on purpose: they open the phone's own picker.

const FIELD =
  "w-full rounded-lg border border-line bg-surface px-4 py-3 text-[15px] text-ink placeholder:text-ink-faint focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring";
const LABEL = "mb-1.5 block text-[13.5px] font-medium text-ink";
const HINT = "mt-1.5 block text-[12.5px] text-ink-faint";
const ERROR = "mt-1.5 block text-[12.5px] font-medium text-[var(--nails)]";

export function ContactForm({ locale, t }: { locale: Locale; t: Dictionary }) {
  const c = t.contact;
  const router = useRouter();
  const uid = useId();
  const [failed, setFailed] = useState(false);

  const {
    register,
    handleSubmit,
    setFocus,
    formState: { errors, isSubmitting },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", service: "", source: "", message: "", company: "" },
  });

  const message = (key?: string) =>
    key ? c.errors[key as ContactErrorKey] : undefined;

  const id = (field: string) => `${uid}-${field}`;
  const errorId = (field: string) => `${uid}-${field}-error`;
  const hintId = (field: string) => `${uid}-${field}-hint`;

  async function onSubmit(values: ContactInput) {
    setFailed(false);
    const result = await submitContact(values, locale);

    if (!result.success) {
      setFailed(true);
      return;
    }

    router.push(localePath(locale, "/thank-you"));
  }

  return (
    <form
      noValidate
      onSubmit={handleSubmit(onSubmit, (fieldErrors) => {
        const first = Object.keys(fieldErrors)[0] as keyof ContactInput;
        if (first) setFocus(first);
      })}
      className="max-w-[46rem]"
    >
      <div className="grid gap-5 min-[620px]:grid-cols-2">
        <div>
          <label className={LABEL} htmlFor={id("name")}>
            {c.form.name}
          </label>
          <input
            id={id("name")}
            type="text"
            autoComplete="name"
            className={FIELD}
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={errors.name ? errorId("name") : undefined}
            {...register("name")}
          />
          {errors.name ? (
            <span id={errorId("name")} role="alert" className={ERROR}>
              {message(errors.name.message)}
            </span>
          ) : null}
        </div>

        <div>
          <label className={LABEL} htmlFor={id("email")}>
            {c.form.email}
          </label>
          <input
            id={id("email")}
            type="email"
            autoComplete="email"
            className={FIELD}
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={
              errors.email ? errorId("email") : hintId("email")
            }
            {...register("email")}
          />
          {errors.email ? (
            <span id={errorId("email")} role="alert" className={ERROR}>
              {message(errors.email.message)}
            </span>
          ) : (
            <span id={hintId("email")} className={HINT}>
              {c.form.emailHint}
            </span>
          )}
        </div>

        <div>
          <label className={LABEL} htmlFor={id("service")}>
            {c.form.service}
          </label>
          <select id={id("service")} className={FIELD} {...register("service")}>
            <option value="">{c.form.servicePlaceholder}</option>
            {[...services]
              .sort((a, b) => a.order - b.order)
              .map((service) => (
                <option key={service.id} value={service.id}>
                  {t.services[service.id].name}
                </option>
              ))}
          </select>
        </div>

        <div>
          <label className={LABEL} htmlFor={id("source")}>
            {c.form.source}
          </label>
          <select
            id={id("source")}
            className={FIELD}
            aria-invalid={errors.source ? true : undefined}
            aria-describedby={errors.source ? errorId("source") : undefined}
            {...register("source")}
          >
            <option value="">{c.form.sourcePlaceholder}</option>
            {contactSourceKeys.map((key) => (
              <option key={key} value={key}>
                {c.sources[key]}
              </option>
            ))}
          </select>
          {errors.source ? (
            <span id={errorId("source")} role="alert" className={ERROR}>
              {message(errors.source.message)}
            </span>
          ) : null}
        </div>
      </div>

      <div className="mt-5">
        <label className={LABEL} htmlFor={id("message")}>
          {c.form.message}
        </label>
        <textarea
          id={id("message")}
          rows={5}
          className={`${FIELD} resize-y`}
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={
            errors.message ? errorId("message") : hintId("message")
          }
          {...register("message")}
        />
        {errors.message ? (
          <span id={errorId("message")} role="alert" className={ERROR}>
            {message(errors.message.message)}
          </span>
        ) : (
          <span id={hintId("message")} className={HINT}>
            {c.form.messageHint}
          </span>
        )}
      </div>

      {/* Honeypot: invisible to people, screen readers and the keyboard. */}
      <div hidden aria-hidden="true">
        <label htmlFor={id("company")}>Company</label>
        <input
          id={id("company")}
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register("company")}
        />
      </div>

      {failed ? (
        <p
          role="alert"
          className="mt-5 rounded-lg border border-[var(--nails)] bg-surface px-4 py-3 text-[14px] text-ink"
        >
          {c.failed}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-6 rounded-pill bg-[image:var(--hot)] px-7 py-4 text-[15px] font-bold text-on-hot focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:opacity-60"
      >
        {isSubmitting ? c.form.submitting : c.form.submit}
      </button>
    </form>
  );
}
