import type { Metadata } from "next";

import "@/styles/contact.css";
import { ContactAnimations } from "./_components/ContactAnimations";
import { ContactForm } from "./_components/ContactForm";

export const metadata: Metadata = {
  title: "Contact — Big Sky Atlas",
  description:
    "Plan your expedition. WhatsApp and email. Response within 4 hours, Monday to Friday.",
};

/* ─── Contact info sidebar items ────────────────────────────── */
const CONTACT_ITEMS = [
  {
    label: "WhatsApp",
    value: "+1 (406) 555-0142",
    href: "https://wa.me/14065550142",
    note: "Fastest response",
    scramble: true,
  },
  {
    label: "Email",
    value: "hello@bigskyatlas.co",
    href: "mailto:hello@bigskyatlas.co",
    note: "Within 4 hours · Mon–Fri",
    scramble: false,
  },
  {
    label: "Base",
    value: "Jackson Hole, Wyoming",
    href: null,
    note: "Northern Rockies",
    scramble: false,
  },
];

export default function ContactPage() {
  return (
    <main id="main" className="min-h-dvh bg-bsa-papel">
      <ContactAnimations />

      {/* ── Hero header ─────────────────────────────────────── */}
      <header className="border-b border-[#e8e3db] px-6 pb-14 pt-20 md:px-16 lg:px-24">
        {/* "Start the conversation" — 22 chars (no spaces counted by CSS steps) */}
        <p
          className="type-reveal font-technical text-[11px] uppercase tracking-[0.2em] text-bsa-brasa"
          data-type-chars="22"
        >
          Start the conversation
        </p>
        <h1 className="mt-5 font-display text-[clamp(3rem,8vw,7rem)] leading-[0.9] tracking-tight-display text-bsa-carvao">
          Let&apos;s plan your
          <br />
          <span
            className="expedition-word not-italic"
            data-replace="expedition."
          >
            <span>expedition.</span>
          </span>
        </h1>
      </header>

      {/* ── Two-column body ─────────────────────────────────── */}
      <div className="grid grid-cols-1 gap-0 lg:grid-cols-[1fr_1.6fr]">

        {/* Left — contact info */}
        <aside className="border-b border-[#e8e3db] px-6 py-14 lg:border-b-0 lg:border-r lg:px-16 lg:py-20">
          {/* "Reach us directly" — 17 chars */}
          <p
            className="type-reveal font-technical text-[11px] uppercase tracking-[0.18em] text-bsa-granito"
            data-type-chars="17"
          >
            Reach us directly
          </p>

          <ul className="mt-10 flex flex-col gap-8">
            {CONTACT_ITEMS.map((item) => (
              <li key={item.label} className="flex flex-col gap-1">
                <span className="font-technical text-[10px] uppercase tracking-[0.18em] text-bsa-granito">
                  {item.label}
                </span>
                {item.href ? (
                  <a
                    href={item.href}
                    className="font-body text-[17px] font-semibold text-bsa-carvao underline underline-offset-4 decoration-bsa-brasa hover:text-bsa-brasa transition-colors duration-200"
                    {...(item.href.startsWith("http")
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    {...(item.scramble
                      ? { "data-scramble": item.value }
                      : {})}
                  >
                    {item.value}
                  </a>
                ) : (
                  <span className="font-body text-[17px] font-semibold text-bsa-carvao">
                    {item.value}
                  </span>
                )}
                <span className="font-body text-[13px] text-bsa-granito">
                  {item.note}
                </span>
              </li>
            ))}
          </ul>

          {/* Divider quote */}
          <blockquote className="mt-16 border-l-2 border-bsa-brasa pl-5">
            <p className="font-display text-[1.35rem] leading-snug text-bsa-carvao">
              &ldquo;No expedition starts<br />
              with a form.&rdquo;
            </p>
            {/* "— Marcus Reid, Lead Guide" — 25 chars */}
            <cite
              className="type-reveal mt-3 block font-technical text-[10px] not-italic uppercase tracking-[0.18em] text-bsa-granito"
              data-type-chars="25"
            >
              — Marcus Reid, Lead Guide
            </cite>
          </blockquote>
        </aside>

        {/* Right — form */}
        <section className="px-6 py-14 md:px-10 lg:px-16 lg:py-20">
          <p className="mb-10 font-technical text-[11px] uppercase tracking-[0.18em] text-bsa-granito">
            Tell us about your trip
          </p>
          <ContactForm />
        </section>

      </div>
    </main>
  );
}
