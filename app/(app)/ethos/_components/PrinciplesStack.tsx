"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function PrinciplesStack() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    gsap.registerPlugin(ScrollTrigger);
    const triggers: ScrollTrigger[] = [];

    const cards = Array.from(root.querySelectorAll<HTMLElement>(".pcard"));
    const progressEl = root.querySelector<HTMLElement>("#pcardProgress");
    const fillEl = root.querySelector<HTMLElement>("#pcardProgressFill");
    const stack = root.querySelector<HTMLElement>("#principlesStack");
    const totalCards = cards.length;

    if (!cards.length) return;

    cards.forEach((card, i) => {
      if (i === totalCards - 1) return;
      const pin = ScrollTrigger.create({
        trigger: card,
        start: "top top",
        pin: true,
        pinSpacing: false,
        anticipatePin: 1,
        id: `pcard-pin-${i}`,
      });
      triggers.push(pin);

      const tween = gsap.to(card, {
        scale: 0.88,
        opacity: 0.15,
        borderRadius: "16px",
        ease: "none",
        scrollTrigger: {
          trigger: card,
          start: "top top",
          end: "+=100%",
          scrub: 0.8,
        },
      });
      if (tween.scrollTrigger) triggers.push(tween.scrollTrigger);
    });

    if (stack && progressEl && fillEl) {
      const progTrigger = ScrollTrigger.create({
        trigger: stack,
        start: "top top",
        end: `+=${(totalCards - 1) * window.innerHeight}`,
        onEnter: () => progressEl.classList.add("visible"),
        onLeave: () => progressEl.classList.remove("visible"),
        onEnterBack: () => progressEl.classList.add("visible"),
        onLeaveBack: () => progressEl.classList.remove("visible"),
        onUpdate: (self) => {
          fillEl.style.width = `${self.progress * 100}%`;
        },
      });
      triggers.push(progTrigger);
    }

    cards.forEach((card) => {
      const line = card.querySelector(".pcard__line");
      const h3 = card.querySelector(".pcard__h3");
      const body = card.querySelector(".pcard__body");
      const num = card.querySelector(".pcard__num");
      if (!line) return;

      gsap.set([line, h3, body, num], { opacity: 0, y: 20 });

      const contentTrigger = ScrollTrigger.create({
        trigger: card,
        start: "top 80%",
        once: true,
        onEnter: () => {
          gsap.to(num, { opacity: 1, y: 0, duration: 1.2, ease: "power2.out", delay: 0 });
          gsap.to(line, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out", delay: 0.15 });
          gsap.to(h3, { opacity: 1, y: 0, duration: 0.9, ease: "power2.out", delay: 0.25 });
          gsap.to(body, { opacity: 1, y: 0, duration: 0.9, ease: "power2.out", delay: 0.4 });
        },
      });
      triggers.push(contentTrigger);
    });

    return () => {
      triggers.forEach((t) => t.kill());
    };
  }, []);

  return (
    <section
      ref={rootRef}
      className="principles"
      aria-labelledby="principles-heading"
    >
      {/* Progress bar */}
      <div className="pcard__progress" id="pcardProgress" aria-hidden="true">
        <div className="pcard__progress-fill" id="pcardProgressFill"></div>
      </div>

      <div className="principles__header">
        <h2 className="principles__h2 reveal" id="principles-heading">
          What we believe<br />when no one<br />is watching.
        </h2>
        <p className="principles__intro reveal">
          Five commitments worth more as<br />
          <span className="kw-bold">daily practice</span> than as a{" "}
          <span className="kw-brand">mission statement</span>.
        </p>
      </div>

      <div className="principles__stack" id="principlesStack">
        <article className="pcard" id="pcard1" style={{ zIndex: 15 }}>
          <div
            className="pcard__bg"
            style={{
              backgroundImage: "url('/images/principle-1.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center 30%",
            }}
          ></div>
          <span className="pcard__num" aria-hidden="true">01</span>
          <p className="pcard__counter" aria-hidden="true">01 of 05</p>
          <div className="pcard__content">
            <div>
              <div className="pcard__line"></div>
              <h3 className="pcard__h3">Terrain<br />First</h3>
            </div>
            <p className="pcard__body">
              The terrain doesn&apos;t lie. Every itinerary begins with{" "}
              <span className="kw-bold">the place</span> — its seasons, its
              moods, its limits. If the weather doesn&apos;t allow it,{" "}
              <span className="kw-brand">the plan changes</span>. Not the
              guest.
            </p>
          </div>
        </article>

        <article className="pcard" id="pcard2" style={{ zIndex: 14 }}>
          <div
            className="pcard__bg"
            style={{
              backgroundImage: "url('/images/principle-2.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center 40%",
            }}
          ></div>
          <span className="pcard__num" aria-hidden="true">02</span>
          <p className="pcard__counter" aria-hidden="true">02 of 05</p>
          <div className="pcard__content">
            <div>
              <div className="pcard__line"></div>
              <h3 className="pcard__h3">Guides, Not<br />Tour Guides</h3>
            </div>
            <p className="pcard__body">
              Our guides <span className="kw-bold">live here</span>. Some were
              born here. They know where the{" "}
              <span className="kw-brand">light falls at 5pm in October</span>,
              which trail closes after rain, which waterfall is worth a
              three-hour detour.
            </p>
          </div>
        </article>

        <article className="pcard" id="pcard3" style={{ zIndex: 13 }}>
          <div
            className="pcard__bg"
            style={{
              backgroundImage: "url('/images/principle-3.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center 35%",
            }}
          ></div>
          <span className="pcard__num" aria-hidden="true">03</span>
          <p className="pcard__counter" aria-hidden="true">03 of 05</p>
          <div className="pcard__content">
            <div>
              <div className="pcard__line"></div>
              <h3 className="pcard__h3">Small Groups,<br />By Design</h3>
            </div>
            <p className="pcard__body">
              Never more than <span className="kw-brand">eight people</span> per
              expedition. That&apos;s not an operational constraint — it&apos;s
              a <span className="kw-bold">philosophical choice</span>. Large
              groups change the nature of a place.
            </p>
          </div>
        </article>

        <article className="pcard" id="pcard4" style={{ zIndex: 12 }}>
          <div
            className="pcard__bg"
            style={{
              backgroundImage: "url('/images/principle-4.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center 50%",
            }}
          ></div>
          <span className="pcard__num" aria-hidden="true">04</span>
          <p className="pcard__counter" aria-hidden="true">04 of 05</p>
          <div className="pcard__content">
            <div>
              <div className="pcard__line"></div>
              <h3 className="pcard__h3">Silence as<br />a Service</h3>
            </div>
            <p className="pcard__body">
              Most outdoor experiences fill every second with activity. Ours
              include deliberately empty moments — because nature fills them
              with more quality than any itinerary we could write.
            </p>
          </div>
        </article>

        <article className="pcard" id="pcard5" style={{ zIndex: 11 }}>
          <div
            className="pcard__bg"
            style={{
              backgroundImage: "url('/images/principle-5.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center 60%",
            }}
          ></div>
          <span className="pcard__num" aria-hidden="true">05</span>
          <p className="pcard__counter" aria-hidden="true">05 of 05</p>
          <div className="pcard__content">
            <div>
              <div className="pcard__line"></div>
              <h3 className="pcard__h3">Leave No Trace,<br />No Exceptions</h3>
            </div>
            <p className="pcard__body">
              Leave No Trace is not a marketing policy. It&apos;s the contract
              we hold with the land that sustains us. No exceptions for large
              groups, celebrations, or difficult weather.
            </p>
          </div>
        </article>
      </div>
    </section>
  );
}
