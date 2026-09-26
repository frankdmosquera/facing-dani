"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useId, useState } from "react";
import { useForm, useWatch } from "react-hook-form";

import { submitContact } from "@/actions/contactAction";
import { contactSourceKeys } from "@/data/contactSources";
import type { Dictionary } from "@/dictionaries";
import {
  contactSchema,
  contactTopics,
  MAX_GUESTS,
  partyKinds,
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

// Local date, not toISOString: that is UTC, which is already tomorrow on a Calgary evening.
function today(): string {
  const now = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
}

export function ContactForm({ locale, t }: { locale: Locale; t: Dictionary }) {
  const c = t.contact;
  const router = useRouter();
  const uid = useId();
  const [failed, setFailed] = useState(false);

  const {
    register,
    handleSubmit,
    setFocus,
    setValue,
    control,
    formState: { errors, isSubmitting },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      topic: "",
      partyKind: "",
      partyDate: "",
      guests: "",
      area: "",
      source: "",
      message: "",
      company: "",
    },
  });

  const isParty = useWatch({ control, name: "topic" }) === "party";

  // The parties page links here with ?topic=party. Read after mount, so the page itself stays static.
  useEffect(() => {
    const topic = new URLSearchParams(window.location.search).get("topic");
    if (topic && (contactTopics as readonly string[]).includes(topic)) {
      setValue("topic", topic);
    }
  }, [setValue]);

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
          <label className={LABEL} htmlFor={id("topic")}>
            {c.form.topic}
          </label>
          <select
            id={id("topic")}
            className={FIELD}
            aria-invalid={errors.topic ? true : undefined}
            aria-describedby={errors.topic ? errorId("topic") : undefined}
            {...register("topic")}
          >
            <option value="">{c.form.topicPlaceholder}</option>
            {contactTopics.map((key) => (
              <option key={key} value={key}>
                {c.topics[key]}
              </option>
            ))}
          </select>
          {errors.topic ? (
            <span id={errorId("topic")} role="alert" className={ERROR}>
              {message(errors.topic.message)}
            </span>
          ) : null}
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

      {/* Only for a party. Hidden fields are not checked: the schema skips them for any other topic. */}
      {isParty ? (
        <fieldset className="mt-5 grid gap-5 rounded-xl border border-line p-5 min-[620px]:grid-cols-2">
          <div>
            <label className={LABEL} htmlFor={id("partyKind")}>
              {c.form.partyKind}
            </label>
            <select
              id={id("partyKind")}
              className={FIELD}
              aria-invalid={errors.partyKind ? true : undefined}
              aria-describedby={errors.partyKind ? errorId("partyKind") : undefined}
              {...register("partyKind")}
            >
              <option value="">{c.form.topicPlaceholder}</option>
              {partyKinds.map((key) => (
                <option key={key} value={key}>
                  {c.partyKinds[key]}
                </option>
              ))}
            </select>
            {errors.partyKind ? (
              <span id={errorId("partyKind")} role="alert" className={ERROR}>
                {message(errors.partyKind.message)}
              </span>
            ) : null}
          </div>

          <div>
            <label className={LABEL} htmlFor={id("partyDate")}>
              {c.form.partyDate}
            </label>
            <input
              id={id("partyDate")}
              type="date"
              min={today()}
              className={FIELD}
              aria-invalid={errors.partyDate ? true : undefined}
              aria-describedby={errors.partyDate ? errorId("partyDate") : undefined}
              {...register("partyDate")}
            />
            {errors.partyDate ? (
              <span id={errorId("partyDate")} role="alert" className={ERROR}>
                {message(errors.partyDate.message)}
              </span>
            ) : null}
          </div>

          <div>
            <label className={LABEL} htmlFor={id("guests")}>
              {c.form.guests}
            </label>
            <input
              id={id("guests")}
              type="number"
              inputMode="numeric"
              min={1}
              max={MAX_GUESTS}
              className={FIELD}
              aria-invalid={errors.guests ? true : undefined}
              aria-describedby={errors.guests ? errorId("guests") : hintId("guests")}
              {...register("guests")}
            />
            {errors.guests ? (
              <span id={errorId("guests")} role="alert" className={ERROR}>
                {message(errors.guests.message)}
              </span>
            ) : (
              <span id={hintId("guests")} className={HINT}>
                {c.form.guestsHint}
              </span>
            )}
          </div>

          <div>
            <label className={LABEL} htmlFor={id("area")}>
              {c.form.area}
            </label>
            <input
              id={id("area")}
              type="text"
              className={FIELD}
              aria-invalid={errors.area ? true : undefined}
              aria-describedby={errors.area ? errorId("area") : hintId("area")}
              {...register("area")}
            />
            {errors.area ? (
              <span id={errorId("area")} role="alert" className={ERROR}>
                {message(errors.area.message)}
              </span>
            ) : (
              <span id={hintId("area")} className={HINT}>
                {c.form.areaHint}
              </span>
            )}
          </div>
        </fieldset>
      ) : null}

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
            {isParty ? c.form.messageHintParty : c.form.messageHint}
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
        className="mt-6 hover-glow rounded-pill bg-[image:var(--hot)] px-7 py-4 text-[15px] font-bold text-on-hot focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:opacity-60"
      >
        {isSubmitting ? c.form.submitting : c.form.submit}
      </button>
    </form>
  );
}
