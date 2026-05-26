import type { Metadata } from "next";

import { ExpeditionCard } from "@/components/blocks/ExpeditionCard";
import { expeditions } from "@/lib/expeditions";
import { Body, Heading, Overline } from "@/components/ui/typography";

export const metadata: Metadata = {
  title: "Cards · Demo",
  robots: { index: false, follow: false },
};

export default function CardsDemoPage() {
  return (
    <main
      id="main"
      className="min-h-dvh bg-bsa-papel pb-24 pt-32 text-bsa-carvao"
    >
      <header className="mx-auto mb-16 max-w-[1440px] px-6 md:px-10">
        <Overline>Cards · Demo</Overline>
        <Heading level={1} className="mt-6">
          ExpeditionCard variants
        </Heading>
        <Body size="large" className="mt-6 max-w-[65ch] opacity-80">
          Three variants driven by the same <code>expedition</code> object —
          featured (horizontal scroll), grid (catalog), compact (footer /
          sidebar).
        </Body>
      </header>

      <section className="mb-24 space-y-6 border-t border-bsa-carvao/10 py-10">
        <div className="mx-auto max-w-[1440px] px-6 md:px-10">
          <Overline color="musgo">01 · Featured variant</Overline>
        </div>
        <div className="overflow-x-auto pb-4">
          <ul className="flex gap-6 px-6 md:px-10">
            {expeditions.map((expedition) => (
              <li key={expedition.slug}>
                <ExpeditionCard
                  expedition={expedition}
                  variant="featured"
                />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mb-24 space-y-6 border-t border-bsa-carvao/10 py-10">
        <div className="mx-auto max-w-[1440px] px-6 md:px-10">
          <Overline color="musgo">02 · Grid variant</Overline>
        </div>
        <ul className="mx-auto grid max-w-[1440px] grid-cols-1 gap-10 px-6 md:grid-cols-2 md:px-10 lg:grid-cols-3">
          {expeditions.map((expedition) => (
            <li key={expedition.slug}>
              <ExpeditionCard expedition={expedition} variant="grid" />
            </li>
          ))}
        </ul>
      </section>

      <section className="space-y-6 border-t border-bsa-carvao/10 py-10">
        <div className="mx-auto max-w-[1440px] px-6 md:px-10">
          <Overline color="musgo">03 · Compact variant</Overline>
          <ul className="mt-6 flex max-w-[420px] flex-col gap-3">
            {expeditions.map((expedition) => (
              <li key={expedition.slug}>
                <ExpeditionCard expedition={expedition} variant="compact" />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
