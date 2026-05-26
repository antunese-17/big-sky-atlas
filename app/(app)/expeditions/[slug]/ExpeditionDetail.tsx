"use client";

import "@/styles/expeditions.css";

import Link from "next/link";
import { useEffect, useRef } from "react";

import type { Expedition } from "@/lib/expeditions-data";

type Props = {
  expedition: Expedition;
};

export function ExpeditionDetail({ expedition }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const cleanups: Array<() => void> = [];

    // ── DAY NAVIGATION — prev/next + dots ──
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

    // ── VIDEO PLAY / PAUSE ──
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

    // ── FADE-IN CARD ──
    const fadeObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
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
  }, [expedition.slug]);

  const firstDay = expedition.days[0];

  return (
    <div ref={rootRef} className="expeditions-root">
      {/* ══ PAGE HERO ══ */}
      <section className="page-hero">
        <span className="page-hero-overline">
          Big Sky Atlas · {expedition.name}
        </span>
        <h1 className="page-hero-title">
          {expedition.name}
          <span className="dot">.</span>
        </h1>
        {firstDay ? (
          <p className="page-hero-desc">{firstDay.title}</p>
        ) : null}
      </section>

      {/* ══ SINGLE TRAIL CARD ══ */}
      <div className="cards-stack">
        <section className="trail-block" id={expedition.id}>
          <div className="trail-sticky">
            <div className="trail-top">
              <div className="trail-left">
                <div className="trail-day-carousel">
                  {expedition.days.map((day, i) => (
                    <div
                      key={day.step}
                      className={`trail-day${i === 0 ? " active" : ""}`}
                      data-trail={expedition.id}
                      data-step={day.step}
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
                  <span className="trail-day-counter">
                    Day 01 / {String(expedition.days.length).padStart(2, "0")}
                  </span>
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
                      {expedition.meta.duration}
                      <span className="unit">days</span>
                    </span>
                  </div>
                  <div className="trail-meta-cell">
                    <span className="trail-meta-label">Distance</span>
                    <span className="trail-meta-value">
                      {expedition.meta.distance}
                      <span className="unit">mi</span>
                    </span>
                  </div>
                  <div className="trail-meta-cell">
                    <span className="trail-meta-label">Effort</span>
                    <span className="trail-meta-value">
                      {expedition.meta.effort}
                    </span>
                  </div>
                  <div className="trail-meta-cell">
                    <span className="trail-meta-label">Season</span>
                    <span className="trail-meta-value">
                      {expedition.meta.season}
                    </span>
                  </div>
                  <div className="trail-meta-cell trail-meta-cell--price">
                    <span className="trail-meta-label">From</span>
                    <span className="trail-meta-value">
                      {expedition.meta.price}
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
                    poster={expedition.video.poster}
                  >
                    <source src={expedition.video.src} type="video/mp4" />
                  </video>
                  <div className="trail-video-overlay" />
                  <div className="trail-progress">
                    {expedition.days.map((day, i) => (
                      <span
                        key={day.step}
                        className={`trail-progress-dot${i === 0 ? " active" : ""}`}
                        data-trail-prog={expedition.id}
                        data-step={day.step}
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
                  <Link href="/contact" className="trail-reserve">
                    Reserve {expedition.name} →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
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
