"use client";

import { useEffect, useRef } from "react";

const easeOutExpo = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

function animateCount(el: HTMLElement) {
  const target = parseFloat(el.dataset.target ?? "0");
  const suffix = el.dataset.suffix ?? "";
  const decimals = parseInt(el.dataset.decimals ?? "0", 10);
  const duration = 1600;
  const start = performance.now();
  const suffixHTML = suffix
    ? `<span class="stat-suffix">${suffix}</span>`
    : "";

  const step = (now: number) => {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = easeOutExpo(progress);
    const current = target * eased;
    const display =
      decimals > 0
        ? current.toFixed(decimals)
        : Math.round(current).toString();
    el.innerHTML = display + suffixHTML;
    if (progress < 1) requestAnimationFrame(step);
    else
      el.innerHTML =
        (decimals > 0 ? target.toFixed(decimals) : target) + suffixHTML;
  };
  requestAnimationFrame(step);
}

export function StatsSection() {
  const rootRef = useRef<HTMLElement>(null);
  const ghostRef = useRef<HTMLSpanElement>(null);

  // Count-up on stat intersection
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const statNums = root.querySelectorAll<HTMLElement>(
      ".place__stat-num[data-target]",
    );
    if (!statNums.length) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)")
      .matches;
    if (reduced) {
      statNums.forEach((el) => el.classList.add("count-visible"));
      return;
    }

    const timers: Array<ReturnType<typeof setTimeout>> = [];
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement;
          el.classList.add("count-visible");
          const t = setTimeout(() => animateCount(el), 200);
          timers.push(t);
          io.unobserve(el);
        });
      },
      { threshold: 0.5 },
    );
    statNums.forEach((el) => io.observe(el));

    return () => {
      io.disconnect();
      timers.forEach((t) => clearTimeout(t));
    };
  }, []);

  // Ghost number parallax
  useEffect(() => {
    const ghost = ghostRef.current;
    const section = rootRef.current;
    if (!ghost || !section) return;

    const onScroll = () => {
      const rect = section.getBoundingClientRect();
      const inView =
        rect.top < window.innerHeight && rect.bottom > 0;
      if (!inView) return;
      const progress =
        1 - rect.bottom / (window.innerHeight + rect.height);
      ghost.style.transform = `translateY(${progress * 40}px)`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      ref={rootRef}
      className="place"
      aria-labelledby="place-heading"
    >
      <span
        ref={ghostRef}
        className="place__bg-ghost"
        aria-hidden="true"
      >
        2.2M
      </span>

      <div className="place__inner">
        <div className="place__header">
          <h2 className="place__h2 reveal" id="place-heading">
            Montana isn&apos;t scenery.
            <br />
            It&apos;s a <span className="kw-brand">character</span>.
          </h2>
          <p className="place__intro reveal reveal-delay-1">
            <span className="kw-bold">Big Sky</span> isn&apos;t on the map.
            It&apos;s what you feel when the map runs out. We work in the
            space between <span className="kw-brand">Yellowstone</span> and{" "}
            <span className="kw-brand">Glacier</span> — land older than the
            idea of a border.
            <br />
            <br />
            We have{" "}
            <span className="kw-bold">unlimited federal wilderness</span> less
            than four hours away. And in between: terrain that{" "}
            <span className="kw-bold">still has no name</span>.
          </p>
        </div>

        <div className="place__stats">
          <div className="place__stat reveal">
            <span className="place__stat-index">01 · Scale</span>
            <span
              className="place__stat-num"
              data-target="2.2"
              data-suffix="M"
              data-decimals="1"
              id="stat-0"
            >
              2.2<span className="stat-suffix">M</span>
            </span>
            <p className="place__stat-label">
              <strong>
                Acres in <em className="kw-brand">Yellowstone</em> alone.
              </strong>{" "}
              Established <em className="kw-bold">1872</em> — four years
              before Colorado became a state.
            </p>
            <span className="place__stat-source">
              U.S. National Park Service
            </span>
          </div>

          <div className="place__stat reveal reveal-delay-1">
            <span className="place__stat-index">02 · Time</span>
            <span
              className="place__stat-num"
              data-target="110"
              data-suffix="M"
              data-decimals="0"
              id="stat-1"
            >
              110<span className="stat-suffix">M</span>
            </span>
            <p className="place__stat-label">
              <strong>
                Years of age — the{" "}
                <em className="kw-brand">Beartooth</em> granite.
              </strong>{" "}
              The rock you&apos;ll stand on is{" "}
              <em className="kw-bold">older than the Rockies</em> themselves.
            </p>
            <span className="place__stat-source">U.S. Geological Survey</span>
          </div>

          <div className="place__stat reveal reveal-delay-2">
            <span className="place__stat-index">03 · Density</span>
            <span
              className="place__stat-num"
              data-target="1"
              data-suffix=" in 4"
              data-decimals="0"
              id="stat-2"
            >
              1<span className="stat-suffix"> in 4</span>
            </span>
            <p className="place__stat-label">
              <strong>
                <em className="kw-brand">Bison</em> alive in North America.
              </strong>{" "}
              One in four lives inside our{" "}
              <em className="kw-bold">operating range</em>.
            </p>
            <span className="place__stat-source">
              Wildlife Conservation Society, 2025
            </span>
          </div>

          <div className="place__stat reveal reveal-delay-3">
            <span className="place__stat-index">04 · Silence</span>
            <span
              className="place__stat-num"
              data-target="0"
              data-suffix=""
              data-decimals="0"
              id="stat-3"
            >
              0<span className="stat-suffix"></span>
            </span>
            <p className="place__stat-label">
              <strong>
                Cell signal on{" "}
                <em className="kw-bold">80% of our routes</em>.
              </strong>{" "}
              This is <em className="kw-brand">on purpose</em>.
            </p>
            <span className="place__stat-source">
              BSA Route Database, 2026
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
