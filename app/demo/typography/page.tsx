import type { Metadata } from "next";

import {
  Body,
  Display,
  Heading,
  Mono,
  Overline,
  PullQuote,
} from "@/components/ui/typography";

export const metadata: Metadata = {
  title: "Typography · Demo",
  robots: { index: false, follow: false },
};

export default function TypographyDemoPage() {
  return (
    <main
      id="main"
      className="min-h-dvh bg-bsa-papel px-6 pb-24 pt-32 text-bsa-carvao md:px-10"
    >
      <header className="mb-24 max-w-[65ch]">
        <Overline>Typography · Demo</Overline>
        <Heading level={1} className="mt-6">
          Big Sky Atlas typography scale
        </Heading>
        <Body size="large" className="mt-6 max-w-[65ch] opacity-80">
          Six primitives on top of four families — Gambarino (display),
          Satoshi (body), Khand (technical overlines), JetBrains Mono
          (readings). Fluid display sizes via{" "}
          <code className="font-mono text-[13px]">clamp()</code>.
        </Body>
      </header>

      <section className="mb-24 space-y-10 border-t border-bsa-carvao/10 pt-10">
        <Overline color="musgo">01 · Display</Overline>
        <Display size="hero" as="p">
          Expeditions.
        </Display>
        <Display size="xl" as="p">
          Northern Rockies.
        </Display>
        <Display size="l" as="p">
          Seven days above timberline.
        </Display>
      </section>

      <section className="mb-24 space-y-6 border-t border-bsa-carvao/10 pt-10">
        <Overline color="musgo">02 · Heading</Overline>
        <Heading level={1}>
          Heading 1 — 56px Gambarino medium, –0.02em
        </Heading>
        <Heading level={2}>
          Heading 2 — 40px Gambarino medium, –0.01em
        </Heading>
        <Heading level={3}>Heading 3 — 28px Satoshi 600</Heading>
      </section>

      <section className="mb-24 space-y-6 border-t border-bsa-carvao/10 pt-10">
        <Overline color="musgo">03 · Body</Overline>
        <Body size="large">
          Large body at 20px. The Wind River High Route runs nine days off the
          map — over 80km of the Continental Divide with no resupply. Small
          groups, local guides, real weather.
        </Body>
        <Body size="default">
          Default body at 16px. The working size for editorial text —
          itinerary narratives, trip descriptions, mission statements.
          Line-height 1.7 for easy long-form reading.
        </Body>
        <Body size="small">
          Small body at 14px. Captions, metadata, deposit terms, and
          secondary information that should whisper.
        </Body>
      </section>

      <section className="mb-24 space-y-3 border-t border-bsa-carvao/10 pt-10">
        <Overline color="musgo">04 · Overline colors</Overline>
        <div className="space-y-2">
          <Overline color="granito">Granito (default) · +1 406 555 0142</Overline>
          <Overline color="musgo">Musgo · Expedition 04 · Wyoming</Overline>
          <Overline color="lanterna">Lanterna · 7 days · Intensity 4/5</Overline>
          <Overline color="brasa">Brasa · Book this expedition</Overline>
          <Overline color="pinheiro">Pinheiro · Technical ridge walking</Overline>
        </div>
        <div className="mt-4 bg-bsa-carvao p-4">
          <Overline color="papel">Papel · on dark background</Overline>
        </div>
      </section>

      <section className="mb-24 space-y-4 border-t border-bsa-carvao/10 pt-10">
        <Overline color="musgo">05 · Mono</Overline>
        <Body>
          Elevation max: <Mono>3,842 m / 12,605 ft</Mono>
        </Body>
        <Body>
          Coordinates: <Mono>43.7904° N · 110.6818° W</Mono>
        </Body>
        <Body>
          Next departure: <Mono>2026-07-14 → 2026-07-20</Mono>
        </Body>
      </section>

      <section className="space-y-12 border-t border-bsa-carvao/10 pt-10">
        <Overline color="musgo">06 · PullQuote</Overline>

        <PullQuote size="l" attribution="Edward Abbey · Desert Solitaire">
          The mountains come first.
        </PullQuote>

        <PullQuote size="m" attribution="Guest · Teton Traverse 2025">
          We slept three nights above timberline. On the fourth morning the
          sky cracked open and the summit was ours.
        </PullQuote>

        <PullQuote size="s">
          Four days of moving water, no phone signal, bald eagles at
          breakfast.
        </PullQuote>
      </section>
    </main>
  );
}
