"use client";

import "@/styles/expeditions.css";

import Link from "next/link";
import { useEffect, useRef } from "react";

type Trail = {
  id: "bighorn" | "beartooth" | "teton";
  slug: "bighorn-sanctuary" | "beartooth-summits" | "teton-traverse";
  name: string;
  reserveLabel: string;
  video: {
    src: string;
    poster: string;
  };
  meta: {
    duration: string;
    distance: string;
    effort: string;
    season: string;
    price: string;
  };
  days: Array<{
    overline: string;
    title: string;
    desc: string;
  }>;
};

const TRAILS: Trail[] = [
  {
    id: "bighorn",
    slug: "bighorn-sanctuary",
    name: "Bighorn Sanctuary",
    reserveLabel: "Reserve Bighorn →",
    video: {
      src: "/videos/BIGHORN.mp4",
      poster: "/images/Calm_alpine_lake_202604192136.png",
    },
    meta: {
      duration: "3",
      distance: "48",
      effort: "Moderate",
      season: "Jun—Sep",
      price: "$1,890",
    },
    days: [
      {
        overline: "Bighorn Sanctuary · Day 01",
        title: "The approach",
        desc: "Dawn in Buffalo, Wyoming. Coffee black as basalt. The trailhead is forty minutes on dirt road — you won't find it without a guide who's been there before.",
      },
      {
        overline: "Bighorn Sanctuary · Day 02",
        title: "Mirror lake",
        desc: "Twelve miles in, the sanctuary opens. Mornings are glass. Afternoons are wind. The camp sits on a granite shelf above water that holds the range upside-down.",
      },
      {
        overline: "Bighorn Sanctuary · Day 03",
        title: "The walk out",
        desc: "Down through the pines the way we came. Different light. Different legs. You won't forget the quiet — it's what the walk was for.",
      },
    ],
  },
  {
    id: "beartooth",
    slug: "beartooth-summits",
    name: "Beartooth Summits",
    reserveLabel: "Reserve Beartooth →",
    video: {
      src: "/videos/BEARTOOTH.mp4",
      poster: "/images/Vast_alpine_plateau_202604192136.png",
    },
    meta: {
      duration: "3",
      distance: "52",
      effort: "Challenging",
      season: "Jul—Sep",
      price: "$2,340",
    },
    days: [
      {
        overline: "Beartooth Summits · Day 01",
        title: "Above the treeline",
        desc: "We cross Beartooth Pass at 10,900 feet. The last tree falls behind us by noon. Weather is the plan — we adjust, we don't push.",
      },
      {
        overline: "Beartooth Summits · Day 02",
        title: "The plateau",
        desc: "A full day on high ground. Wildflowers where the snow pulled back last month. Alpine lakes you can see the bottom of. The air thins. You learn to notice it.",
      },
      {
        overline: "Beartooth Summits · Day 03",
        title: "Twin lakes descent",
        desc: "Down through glacial cirques. Optional summit in the morning for those who want it. By evening, we're back to cell signal — the part of the trip you haven't missed.",
      },
    ],
  },
  {
    id: "teton",
    slug: "teton-traverse",
    name: "Teton Traverse",
    reserveLabel: "Reserve Teton →",
    video: {
      src: "/videos/ethos-hero.mp4",
      poster: "/images/Dramatic_granite_peaks_202604192136.png",
    },
    meta: {
      duration: "3",
      distance: "38",
      effort: "Moderate",
      season: "Jun—Sep",
      price: "$2,180",
    },
    days: [
      {
        overline: "Teton Traverse · Day 01",
        title: "The saddle",
        desc: "From Jenny Lake up to the first saddle at 9,400 feet. The Cathedral Group grows closer with every switchback. First night at String Lake.",
      },
      {
        overline: "Teton Traverse · Day 02",
        title: "Granite alley",
        desc: "The traverse day. Between the Middle and the Grand, you walk where only the weather and the light change. Lunch above Cascade Canyon.",
      },
      {
        overline: "Teton Traverse · Day 03",
        title: "Paintbrush divide",
        desc: "One more pass before the walk out. The Tetons go quiet behind you. Leigh Lake to close. Cold beer in Moose by dinner.",
      },
    ],
  },
];

export default function ExpeditionsPage() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const cleanups: Array<() => void> = [];

    // ── DAY NAVIGATION — manual prev/next + dots per trail-block ──
    root.querySelectorAll<HTMLElement>(".trail-block").forEach((block) => {
      const days = Array.from(
        block.querySelectorAll<HTMLElement>(".trail-day"),
      );
      const dots = Array.from(
        block.querySelectorAll<HTMLElement>(".trail-progress-dot"),
      );
      const prev = block.querySelector<HTMLButtonElement>(
        ".trail-day-btn.prev",
      );
      const next = block.querySelector<HTMLButtonElement>(
        ".trail-day-btn.next",
      );
      const counter = block.querySelector<HTMLElement>(".trail-day-counter");
      if (!days.length) return;

      let idx = 0;

      const show = (i: number) => {
        idx = ((i % days.length) + days.length) % days.length;
        days.forEach((d, j) => d.classList.toggle("active", j === idx));
        dots.forEach((d, j) => d.classList.toggle("active", j === idx));
        if (counter) {
          const pad = (n: number) => String(n).padStart(2, "0");
          counter.textContent = `Day ${pad(idx + 1)} / ${pad(days.length)}`;
        }
      };

      const onPrev = () => show(idx - 1);
      const onNext = () => show(idx + 1);
      prev?.addEventListener("click", onPrev);
      next?.addEventListener("click", onNext);

      const dotHandlers: Array<() => void> = [];
      dots.forEach((dot, j) => {
        dot.style.cursor = "pointer";
        const handler = () => show(j);
        dot.addEventListener("click", handler);
        dotHandlers.push(handler);
      });

      show(0);

      cleanups.push(() => {
        prev?.removeEventListener("click", onPrev);
        next?.removeEventListener("click", onNext);
        dots.forEach((dot, j) => {
          const handler = dotHandlers[j];
          if (handler) dot.removeEventListener("click", handler);
        });
      });
    });

    // ── VIDEO PLAY / PAUSE BUTTON ──
    root
      .querySelectorAll<HTMLElement>(".trail-right")
      .forEach((container) => {
        const video = container.querySelector<HTMLVideoElement>(
          ".trail-video",
        );
        const btn = container.querySelector<HTMLButtonElement>(
          ".video-play-btn",
        );
        if (!video || !btn) return;

        const onClick = () => {
          if (video.paused) {
            void video.play();
            btn.classList.add("playing");
          } else {
            video.pause();
            btn.classList.remove("playing");
          }
        };
        const onEnded = () => btn.classList.remove("playing");

        btn.addEventListener("click", onClick);
        video.addEventListener("ended", onEnded);

        cleanups.push(() => {
          btn.removeEventListener("click", onClick);
          video.removeEventListener("ended", onEnded);
        });
      });

    // ── FADE-IN CARDS (bottom to top) ──
    const fadeObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const allBlocks = Array.from(
            root.querySelectorAll<HTMLElement>(".trail-block"),
          );
          const delay = allBlocks.indexOf(entry.target as HTMLElement) * 80;
          window.setTimeout(() => {
            entry.target.classList.add("is-visible");
          }, delay);
          fadeObs.unobserve(entry.target);
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -60px 0px" },
    );

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) {
      root
        .querySelectorAll<HTMLElement>(".trail-block")
        .forEach((el) => el.classList.add("is-visible"));
    } else {
      root
        .querySelectorAll<HTMLElement>(".trail-block")
        .forEach((el) => fadeObs.observe(el));
    }
    cleanups.push(() => fadeObs.disconnect());

    // ── NAV TRAIL LINKS — highlight current on scroll ──
    // (no-op on this page: the prototype's trail pill nav was removed in
    // favor of the global <Nav />. Kept for parity with prototype JS.)
    const navLinks = root.querySelectorAll<HTMLElement>(".nav-trail-link");
    const trailBlocks = root.querySelectorAll<HTMLElement>(".trail-block");
    let navHighlightObs: IntersectionObserver | null = null;
    if (navLinks.length && trailBlocks.length) {
      navHighlightObs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            const id = entry.target.id;
            navLinks.forEach((l) =>
              l.classList.toggle("active", l.dataset.navTrail === id),
            );
          });
        },
        { threshold: 0.3 },
      );
      trailBlocks.forEach((b) => navHighlightObs!.observe(b));
      cleanups.push(() => navHighlightObs?.disconnect());
    }

    // ── CLOSING CTA reveal ──
    const closingEl = root.querySelector<HTMLElement>("#closing-cta");
    if (closingEl) {
      const closingObs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add("revealed");
            closingObs.unobserve(entry.target);
          });
        },
        { threshold: 0.25 },
      );
      closingObs.observe(closingEl);
      cleanups.push(() => closingObs.disconnect());
    }

    return () => {
      cleanups.forEach((fn) => fn());
    };
  }, []);

  return (
    <div ref={rootRef} className="expeditions-root">
      {/* ══ PAGE HERO ══ */}
      <section className="page-hero">
        <span className="page-hero-overline">
          Big Sky Atlas · Guided Wilderness
        </span>
        <h1 className="page-hero-title">
          Expeditions<span className="dot">.</span>
        </h1>
        <p className="page-hero-desc">
          Three trails into the American West. Each one chosen for what it
          asks of you — not the distance, but the attention.
        </p>
      </section>

      {/* ══ TRAIL CARDS ══ */}
      <div className="cards-stack">
        {TRAILS.map((trail) => (
          <section key={trail.id} className="trail-block" id={trail.id}>
            <div className="trail-sticky">
              <div className="trail-top">
                <div className="trail-left">
                  <div className="trail-day-carousel">
                    {trail.days.map((day, i) => (
                      <div
                        key={i}
                        className={`trail-day${i === 0 ? " active" : ""}`}
                        data-trail={trail.id}
                        data-step={i}
                      >
                        <div className="trail-day-overline">
                          <span>{day.overline}</span>
                        </div>
                        <h2 className="trail-day-title">
                          {day.title}
                          <span className="dot">.</span>
                        </h2>
                        <p className="trail-day-desc">{day.desc}</p>
                      </div>
                    ))}
                  </div>

                  <div className="trail-day-nav">
                    <button
                      type="button"
                      className="trail-day-btn prev"
                      aria-label="Previous day"
                    >
                      <svg
                        width="10"
                        height="10"
                        viewBox="0 0 10 10"
                        fill="none"
                      >
                        <path
                          d="M6 1L2 5l4 4"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                    <span className="trail-day-counter">Day 01 / 03</span>
                    <button
                      type="button"
                      className="trail-day-btn next"
                      aria-label="Next day"
                    >
                      <svg
                        width="10"
                        height="10"
                        viewBox="0 0 10 10"
                        fill="none"
                      >
                        <path
                          d="M4 1l4 4-4 4"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </div>

                  <div className="trail-meta-strip">
                    <div className="trail-meta-cell">
                      <span className="trail-meta-label">Duration</span>
                      <span className="trail-meta-value">
                        {trail.meta.duration}
                        <span className="unit">days</span>
                      </span>
                    </div>
                    <div className="trail-meta-cell">
                      <span className="trail-meta-label">Distance</span>
                      <span className="trail-meta-value">
                        {trail.meta.distance}
                        <span className="unit">mi</span>
                      </span>
                    </div>
                    <div className="trail-meta-cell">
                      <span className="trail-meta-label">Effort</span>
                      <span className="trail-meta-value">
                        {trail.meta.effort}
                      </span>
                    </div>
                    <div className="trail-meta-cell">
                      <span className="trail-meta-label">Season</span>
                      <span className="trail-meta-value">
                        {trail.meta.season}
                      </span>
                    </div>
                    <div className="trail-meta-cell trail-meta-cell--price">
                      <span className="trail-meta-label">From</span>
                      <span className="trail-meta-value">
                        {trail.meta.price}
                        <span className="unit">/ p</span>
                      </span>
                    </div>
                  </div>
                </div>

                <div className="trail-right-col">
                  <div className="trail-right">
                    <video
                      className="trail-video"
                      loop
                      muted
                      playsInline
                      poster={trail.video.poster}
                    >
                      <source src={trail.video.src} type="video/mp4" />
                    </video>
                    <div className="trail-video-overlay" />
                    <div className="trail-progress">
                      {trail.days.map((_, i) => (
                        <span
                          key={i}
                          className={`trail-progress-dot${i === 0 ? " active" : ""}`}
                          data-trail-prog={trail.id}
                          data-step={i}
                        />
                      ))}
                    </div>
                    <button
                      type="button"
                      className="video-play-btn"
                      aria-label="Play/Pause video"
                    >
                      <svg
                        className="icon-play"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                      <svg
                        className="icon-pause"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                      </svg>
                    </button>
                  </div>
                  <div className="trail-bottom">
                    <Link
                      href={`/expeditions/${trail.slug}`}
                      className="trail-reserve"
                    >
                      {trail.reserveLabel}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>

      {/* ══ CLOSING CTA ══ */}
      <section className="closing-cta" id="closing-cta">
        <span className="closing-cta-overline">Still deciding</span>
        <h3 className="closing-cta-quote">
          Talk to a guide<span className="dot">.</span>
        </h3>
        <p className="closing-cta-sub">
          Fifteen minutes. No pitch. We&apos;ll tell you which trail asks
          what of you.
        </p>
        <Link href="/contact" className="closing-cta-btn">
          <span>Book a call</span>
          <span className="closing-cta-btn-arrow">→</span>
        </Link>
      </section>
    </div>
  );
}
