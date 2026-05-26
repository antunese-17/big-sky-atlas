import type { Metadata } from "next";

import { MetadataStrip } from "@/components/ui/MetadataStrip";
import { Body, Heading, Overline } from "@/components/ui/typography";

export const metadata: Metadata = {
  title: "Metadata · Demo",
  robots: { index: false, follow: false },
};

export default function MetadataDemoPage() {
  return (
    <main
      id="main"
      className="min-h-dvh bg-bsa-papel px-6 pb-24 pt-32 text-bsa-carvao md:px-10"
    >
      <header className="mb-16 max-w-[65ch]">
        <Overline>Metadata · Demo</Overline>
        <Heading level={1} className="mt-6">
          MetadataStrip
        </Heading>
        <Body size="large" className="mt-6 max-w-[65ch] opacity-80">
          Technical overlines that carry expedition metadata, coordinates,
          and brand context across the site. Accent items render in brasa
          with weight 700; separators fade to 60% of the base color.
        </Body>
      </header>

      <section className="mb-16 space-y-4 border-t border-bsa-carvao/10 pt-10">
        <Overline color="musgo">01 · Expedition metadata</Overline>
        <MetadataStrip
          items={[
            { label: "Expedition 04" },
            { label: "Teton Traverse" },
            { label: "7 days" },
            { label: "Wyoming" },
            { label: "Intensity 4/5", accent: true },
            { label: "From $11,800" },
          ]}
          color="musgo"
        />
      </section>

      <section className="mb-16 space-y-4 border-t border-bsa-carvao/10 pt-10">
        <Overline color="musgo">02 · Coordinates (small)</Overline>
        <MetadataStrip
          items={[
            { label: "44.6789° N" },
            { label: "110.5423° W" },
            { label: "Elev 3,842m" },
            { label: "Jul 14 — 21" },
          ]}
          color="granito"
          size="small"
          separator="·"
        />
      </section>

      <section className="space-y-4 border-t border-bsa-carvao/10 pt-10">
        <Overline color="musgo">03 · On noite-alpina</Overline>
        <div className="bg-[#1A2638] p-8">
          <MetadataStrip
            items={[
              { label: "Big Sky Atlas" },
              { label: "Bozeman MT" },
              { label: "Est. 2014", accent: true },
            ]}
            color="papel"
          />
        </div>
      </section>
    </main>
  );
}
