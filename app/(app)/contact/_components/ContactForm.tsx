"use client";

import { useState } from "react";

type FormState = "idle" | "submitting" | "success";

const EXPEDITIONS = [
  { value: "bighorn-sanctuary", label: "Bighorn Sanctuary" },
  { value: "beartooth-summits", label: "Beartooth Summits" },
  { value: "wind-river-high-route", label: "Wind River High Route" },
  { value: "teton-traverse", label: "Teton Traverse" },
  { value: "snake-river-whitewater", label: "Snake River Whitewater" },
  { value: "custom", label: "Something custom" },
] as const;

export function ContactForm() {
  const [state, setState] = useState<FormState>("idle");
  const [values, setValues] = useState({
    name: "",
    email: "",
    expedition: "",
    dates: "",
    groupSize: "",
    message: "",
  });

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) {
    setValues((v) => ({ ...v, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setState("submitting");
    // Portfolio mode — simulate network delay, no real API call
    setTimeout(() => setState("success"), 1400);
  }

  if (state === "success") {
    return (
      <div className="flex flex-col items-start gap-6 py-16">
        <span className="font-technical text-[11px] uppercase tracking-[0.18em] text-bsa-brasa">
          Message received
        </span>
        <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] leading-[0.92] tracking-tight-display text-bsa-carvao">
          We&apos;ll be in touch
          <br />
          within 4 hours.
        </h2>
        <p className="max-w-sm font-body text-[15px] leading-relaxed text-bsa-granito">
          In the meantime, explore our trails or follow the mountain on
          Instagram.
        </p>
        <button
          type="button"
          onClick={() => {
            setState("idle");
            setValues({
              name: "",
              email: "",
              expedition: "",
              dates: "",
              groupSize: "",
              message: "",
            });
          }}
          className="mt-2 font-body text-[13px] font-semibold underline underline-offset-4 text-bsa-granito hover:text-bsa-carvao transition-colors"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-8">
      {/* Row 1: Name + Email */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Field label="Your name" required>
          <input
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder="First and last"
            value={values.name}
            onChange={handleChange}
          />
        </Field>
        <Field label="Email" required>
          <input
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@example.com"
            value={values.email}
            onChange={handleChange}
          />
        </Field>
      </div>

      {/* Row 2: Expedition select */}
      <Field label="Which expedition interests you?" required>
        <select
          name="expedition"
          required
          value={values.expedition}
          onChange={handleChange}
        >
          <option value="" disabled>
            Select a route
          </option>
          {EXPEDITIONS.map((ex) => (
            <option key={ex.value} value={ex.value}>
              {ex.label}
            </option>
          ))}
        </select>
      </Field>

      {/* Row 3: Dates + Group */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Field label="Ideal dates or window">
          <input
            name="dates"
            type="text"
            placeholder="e.g. July, flexible"
            value={values.dates}
            onChange={handleChange}
          />
        </Field>
        <Field label="Group size">
          <input
            name="groupSize"
            type="number"
            min={1}
            max={20}
            placeholder="1–20"
            value={values.groupSize}
            onChange={handleChange}
          />
        </Field>
      </div>

      {/* Row 4: Message */}
      <Field label="Tell us about your trip">
        <textarea
          name="message"
          rows={5}
          placeholder="What are you hoping to experience? Any experience level, physical considerations, or goals we should know about?"
          value={values.message}
          onChange={handleChange}
          className="resize-none"
        />
      </Field>

      {/* Submit */}
      <div className="flex items-center gap-6 pt-2">
        <button
          type="submit"
          disabled={state === "submitting"}
          className={[
            "group inline-flex items-center gap-3 rounded bg-bsa-brasa px-8 py-4",
            "font-body text-[13px] font-bold tracking-[0.04em] text-bsa-papel",
            "transition-all duration-[400ms] ease-natural",
            "hover:brightness-110 hover:scale-[1.02] active:scale-[0.98]",
            "disabled:opacity-60 disabled:pointer-events-none",
          ].join(" ")}
        >
          {state === "submitting" ? (
            <>
              <Spinner />
              Sending…
            </>
          ) : (
            <>
              Start the conversation
              <span
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:translate-x-1"
              >
                →
              </span>
            </>
          )}
        </button>

        <p className="font-technical text-[11px] uppercase tracking-[0.14em] text-bsa-granito">
          No commitment · Free consultation
        </p>
      </div>
    </form>
  );
}

/* ─── Field wrapper ─────────────────────────────────────────── */
function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactElement;
}) {
  return (
    <label className="group flex flex-col gap-2">
      <span className="font-technical text-[11px] uppercase tracking-[0.16em] text-bsa-granito transition-colors group-focus-within:text-bsa-carvao">
        {label}
        {required && (
          <span aria-hidden="true" className="ml-1 text-bsa-brasa">
            *
          </span>
        )}
      </span>
      <div className="[&>input]:bsa-input [&>select]:bsa-input [&>textarea]:bsa-input">
        {children}
      </div>
    </label>
  );
}

/* ─── Spinner ────────────────────────────────────────────────── */
function Spinner() {
  return (
    <svg
      className="h-4 w-4 animate-spin"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="3"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
      />
    </svg>
  );
}
