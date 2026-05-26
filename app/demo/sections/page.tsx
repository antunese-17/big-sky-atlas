import type { Metadata } from "next";

import { MetadataStrip } from "@/components/ui/MetadataStrip";
import { Section } from "@/components/ui/Section";
import { Body, Display } from "@/components/ui/typography";

export const metadata: Metadata = {
  title: "Sections · Demo",
  robots: { index: false, follow: false },
};

export default function SectionsDemoPage() {
  return (
    <main id="main">
      <Section mode="papel" size="lg">
        <Display size="l" as="h2">
          Papel section
        </Display>
        <Body className="mt-6 max-w-[65ch]">
          Default daylight mode — cremoso background, dark text.
        </Body>
        <div className="mt-8">
          <MetadataStrip
            items={[{ label: "Mode" }, { label: "Papel", accent: true }]}
            color="musgo"
          />
        </div>
      </Section>

      <Section mode="noite" size="lg">
        <Display size="l" as="h2">
          Noite section
        </Display>
        <Body className="mt-6 max-w-[65ch]">
          Strategic dark mode — reserved for 3 key moments.
        </Body>
        <div className="mt-8">
          <MetadataStrip
            items={[
              { label: "Mode" },
              { label: "Noite Alpina", accent: true },
            ]}
            color="papel"
          />
        </div>
      </Section>

      <Section mode="granito" size="md">
        <Display size="l" as="h2">
          Granito section
        </Display>
        <Body className="mt-6 max-w-[65ch]">
          Subtle contrast — between papel and full dark.
        </Body>
      </Section>

      <Section mode="noite" size="lg" fullBleed>
        <div style={{ padding: "0 40px" }}>
          <Display size="hero" as="h2">
            Full bleed
          </Display>
          <Body className="mt-6 max-w-[65ch]">
            fullBleed=true — no inner container.
          </Body>
        </div>
      </Section>
    </main>
  );
}
