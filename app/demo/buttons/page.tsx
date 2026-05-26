import type { Metadata } from "next";

import { Button, ButtonGroup } from "@/components/ui";
import { Body, Heading, Overline } from "@/components/ui/typography";

export const metadata: Metadata = {
  title: "Buttons · Demo",
  robots: { index: false, follow: false },
};

export default function ButtonsDemoPage() {
  return (
    <main
      id="main"
      className="min-h-dvh bg-bsa-papel px-6 pb-24 pt-32 text-bsa-carvao md:px-10"
    >
      <header className="mb-16 max-w-[65ch]">
        <Overline>Buttons · Demo</Overline>
        <Heading level={1} className="mt-6">
          CTA variants
        </Heading>
        <Body size="large" className="mt-6 max-w-[65ch] opacity-80">
          Four variants × two sizes. Primary and secondary append an arrow;
          whatsapp prepends its mark; ghost is an underlined inline link.
        </Body>
      </header>

      <section className="mb-16 space-y-6 border-t border-bsa-carvao/10 pt-10">
        <Overline color="musgo">01 · Default size — on papel</Overline>
        <ButtonGroup>
          <Button variant="primary">Reserve this expedition</Button>
          <Button variant="ghost">Read more</Button>
          <Button variant="whatsapp">Message us on WhatsApp</Button>
        </ButtonGroup>
      </section>

      <section className="mb-16 space-y-6 border-t border-bsa-carvao/10 pt-10">
        <Overline color="musgo">02 · Default size — on noite-alpina</Overline>
        <div className="bg-bsa-noite-alpina p-8 text-bsa-papel">
          <ButtonGroup>
            <Button variant="primary">Reserve this expedition</Button>
            <Button variant="secondary">Reserve this expedition</Button>
            <Button variant="ghost">Read more</Button>
            <Button variant="whatsapp">Message us on WhatsApp</Button>
          </ButtonGroup>
        </div>
      </section>

      <section className="mb-16 space-y-6 border-t border-bsa-carvao/10 pt-10">
        <Overline color="musgo">03 · Large size — on papel</Overline>
        <ButtonGroup>
          <Button variant="primary" size="large">
            Reserve this expedition
          </Button>
          <Button variant="ghost" size="large">
            Read more
          </Button>
          <Button variant="whatsapp" size="large">
            Message us on WhatsApp
          </Button>
        </ButtonGroup>
      </section>

      <section className="mb-16 space-y-6 border-t border-bsa-carvao/10 pt-10">
        <Overline color="musgo">04 · Large size — on noite-alpina</Overline>
        <div className="bg-bsa-noite-alpina p-8 text-bsa-papel">
          <ButtonGroup>
            <Button variant="primary" size="large">
              Reserve this expedition
            </Button>
            <Button variant="secondary" size="large">
              Reserve this expedition
            </Button>
            <Button variant="ghost" size="large">
              Read more
            </Button>
            <Button variant="whatsapp" size="large">
              Message us on WhatsApp
            </Button>
          </ButtonGroup>
        </div>
      </section>

      <section className="mb-16 space-y-6 border-t border-bsa-carvao/10 pt-10">
        <Overline color="musgo">05 · As link</Overline>
        <Button variant="primary" href="/expeditions">
          View all expeditions
        </Button>
      </section>

      <section className="space-y-6 border-t border-bsa-carvao/10 pt-10">
        <Overline color="musgo">06 · ButtonGroup — primary + ghost</Overline>
        <ButtonGroup>
          <Button variant="primary" href="/contact">
            Plan your expedition
          </Button>
          <Button variant="ghost" href="/ethos">
            Our ethos
          </Button>
        </ButtonGroup>
      </section>
    </main>
  );
}
