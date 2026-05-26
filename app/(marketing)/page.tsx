"use client";

import "./home.css";

import Link from "next/link";
import { useEffect, useRef } from "react";

export default function HomePage() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const cleanups: Array<() => void> = [];

    // ── HERO VIDEO ──────────────────────────
    const heroVideo = root.querySelector<HTMLVideoElement>("#hero-video");
    const heroPlaceholder = root.querySelector<HTMLDivElement>(
      "#hero-placeholder",
    );
    if (heroVideo) {
      const markReady = () => {
        heroVideo.classList.add("ready");
        heroPlaceholder?.classList.add("hidden");
      };
      const onError = () => {
        heroVideo.style.display = "none";
      };
      // Some browsers fire `loadeddata` before `canplay`; listen to both
      // so we fade the placeholder out as soon as the first frame is ready.
      heroVideo.addEventListener("loadeddata", markReady);
      heroVideo.addEventListener("canplay", markReady);
      heroVideo.addEventListener("error", onError);
      // If the video was already buffered (HAVE_CURRENT_DATA = 2), mark ready now.
      if (heroVideo.readyState >= 2) markReady();
      // Fallback: give the network 15s to deliver the first frame
      // (hero.mp4 is ~7.8 MB; on cold cache it can take longer than 3s).
      const fallbackTimer = window.setTimeout(() => {
        if (!heroVideo.classList.contains("ready")) {
          heroVideo.style.display = "none";
        }
      }, 15000);
      cleanups.push(() => {
        heroVideo.removeEventListener("loadeddata", markReady);
        heroVideo.removeEventListener("canplay", markReady);
        heroVideo.removeEventListener("error", onError);
        window.clearTimeout(fallbackTimer);
      });
    }

    // ── NAV scroll ──────────────────────────
    const navEl = root.querySelector<HTMLElement>("#nav");
    const onWindowScroll = () => {
      navEl?.classList.toggle("scrolled", window.scrollY > 60);
    };
    window.addEventListener("scroll", onWindowScroll, { passive: true });
    cleanups.push(() =>
      window.removeEventListener("scroll", onWindowScroll),
    );

    // ── EXPEDITIONS scroll cinema ────────────
    const wrap = root.querySelector<HTMLDivElement>("#expeditions-wrap");
    const trackFill = root.querySelector<HTMLDivElement>("#exp-track-fill");
    const ghost = root.querySelector<HTMLDivElement>("#exp-ghost");
    const ghosts = ["04", "06", "07"];
    const TOTAL_EXP = 3;

    const expItems = Array.from(
      root.querySelectorAll<HTMLDivElement>(".exp-item"),
    );
    const expImages = Array.from(
      root.querySelectorAll<HTMLDivElement>(".exp-image"),
    );

    let ghostTimer: number | null = null;
    const setExp = (i: number) => {
      expItems.forEach((el, j) => el.classList.toggle("active", j === i));
      expImages.forEach((el, j) => el.classList.toggle("active", j === i));
      if (ghost) {
        ghost.textContent = ghosts[i] ?? "";
        ghost.style.opacity = "1";
        if (ghostTimer) window.clearTimeout(ghostTimer);
        ghostTimer = window.setTimeout(() => {
          ghost.style.opacity = "0";
        }, 600);
      }
    };

    const onExpScroll = () => {
      if (!wrap) return;
      const rect = wrap.getBoundingClientRect();
      const total = wrap.offsetHeight - window.innerHeight;
      const scrolled = Math.max(0, -rect.top);
      const progress = total > 0 ? Math.min(1, scrolled / total) : 0;
      if (trackFill) trackFill.style.height = `${progress * 100}%`;
      const idx = Math.min(TOTAL_EXP - 1, Math.floor(progress * TOTAL_EXP));
      setExp(idx);
    };
    window.addEventListener("scroll", onExpScroll, { passive: true });
    cleanups.push(() => {
      window.removeEventListener("scroll", onExpScroll);
      if (ghostTimer) window.clearTimeout(ghostTimer);
    });

    // ── ENTRANCE observer (expeditions) ────
    const expObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target
            .querySelectorAll(".exp-enter")
            .forEach((el) => el.classList.add("in"));
          expObserver.unobserve(entry.target);
        });
      },
      { threshold: 0.15 },
    );
    if (wrap) expObserver.observe(wrap);
    cleanups.push(() => expObserver.disconnect());

    // ── PHILOSOPHY entrance ────────────────
    const philSection = root.querySelector<HTMLElement>("#philosophy");
    const philBg = philSection?.querySelector<HTMLDivElement>(".phil-bg");
    let philLateTimer: number | null = null;
    const philObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          philBg?.classList.add("zooming");
          const label = philSection?.querySelector<HTMLElement>(".phil-label");
          if (label) {
            label.style.animationDelay = "0s";
            label.classList.add("revealed");
          }
          philSection
            ?.querySelectorAll<HTMLElement>(".phil-line")
            .forEach((el, i) => {
              el.style.animationDelay = `${0.15 + i * 0.18}s`;
              el.classList.add("revealed");
            });
          philLateTimer = window.setTimeout(() => {
            philSection?.querySelector(".phil-rule")?.classList.add("revealed");
            philSection?.querySelector(".phil-sub")?.classList.add("revealed");
          }, 1400);
          philObserver.unobserve(entry.target);
        });
      },
      { threshold: 0.25 },
    );
    if (philSection) philObserver.observe(philSection);
    cleanups.push(() => {
      philObserver.disconnect();
      if (philLateTimer) window.clearTimeout(philLateTimer);
    });

    // ── CTA entrance ───────────────────────
    const ctaSection = root.querySelector<HTMLElement>("#cta");
    const ctaBg = root.querySelector<HTMLDivElement>("#cta-bg");
    let ctaSubTimer: number | null = null;
    let ctaActionsTimer: number | null = null;
    const ctaObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          ctaBg?.classList.add("revealed");
          root
            .querySelector<HTMLElement>("#cta-overline")
            ?.classList.add("revealed");
          ["cta-w1", "cta-w2", "cta-w3", "cta-w4"].forEach((id) => {
            root.querySelector<HTMLElement>(`#${id}`)?.classList.add("revealed");
          });
          ctaSubTimer = window.setTimeout(() => {
            root.querySelector<HTMLElement>("#cta-sub")?.classList.add(
              "revealed",
            );
          }, 700);
          ctaActionsTimer = window.setTimeout(() => {
            root
              .querySelector<HTMLElement>("#cta-actions")
              ?.classList.add("revealed");
            root
              .querySelector<HTMLElement>("#cta-photos")
              ?.classList.add("revealed");
          }, 1100);
          ctaObserver.unobserve(entry.target);
        });
      },
      { threshold: 0.2 },
    );
    if (ctaSection) ctaObserver.observe(ctaSection);
    cleanups.push(() => {
      ctaObserver.disconnect();
      if (ctaSubTimer) window.clearTimeout(ctaSubTimer);
      if (ctaActionsTimer) window.clearTimeout(ctaActionsTimer);
    });

    // ── CTA carousel (Luriva-style) ────────
    const carouselSlides = Array.from(
      root.querySelectorAll<HTMLDivElement>(".cta-slide"),
    );
    const carouselDots = Array.from(
      root.querySelectorAll<HTMLDivElement>(".cta-carousel-dot"),
    );
    const carouselPrev = root.querySelector<HTMLButtonElement>("#cta-prev");
    const carouselNext = root.querySelector<HTMLButtonElement>("#cta-next");
    const carouselWrap = root.querySelector<HTMLDivElement>("#cta-carousel");

    if (carouselSlides.length && carouselWrap) {
      const totalSlides = carouselSlides.length;
      let active = 1;

      const renderCarousel = () => {
        carouselSlides.forEach((s, i) => {
          const rel = (i - active + totalSlides) % totalSlides;
          let pos = "hidden";
          if (rel === 0) pos = "center";
          else if (rel === 1) pos = "right";
          else if (rel === totalSlides - 1) pos = "left";
          s.setAttribute("data-pos", pos);
        });
        carouselDots.forEach((d, i) => {
          d.classList.toggle("active", i === active);
        });
      };

      const go = (delta: number) => {
        active = (active + delta + totalSlides) % totalSlides;
        renderCarousel();
      };
      const goTo = (i: number) => {
        active = ((i % totalSlides) + totalSlides) % totalSlides;
        renderCarousel();
      };

      let carouselTimer: number | null = null;
      const start = () => {
        carouselTimer = window.setInterval(() => go(1), 5200);
      };
      const stop = () => {
        if (carouselTimer) {
          window.clearInterval(carouselTimer);
          carouselTimer = null;
        }
      };
      const restart = () => {
        stop();
        start();
      };

      const onPrev = () => {
        go(-1);
        restart();
      };
      const onNext = () => {
        go(1);
        restart();
      };
      carouselPrev?.addEventListener("click", onPrev);
      carouselNext?.addEventListener("click", onNext);

      const dotHandlers: Array<() => void> = [];
      carouselDots.forEach((d, i) => {
        const handler = () => {
          const idxAttr = d.dataset.idx;
          goTo(idxAttr ? parseInt(idxAttr, 10) : i);
          restart();
        };
        d.addEventListener("click", handler);
        dotHandlers.push(handler);
      });

      carouselWrap.addEventListener("mouseenter", stop);
      carouselWrap.addEventListener("mouseleave", start);

      renderCarousel();
      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      if (!prefersReduced) start();

      cleanups.push(() => {
        stop();
        carouselPrev?.removeEventListener("click", onPrev);
        carouselNext?.removeEventListener("click", onNext);
        carouselDots.forEach((d, i) => {
          const handler = dotHandlers[i];
          if (handler) d.removeEventListener("click", handler);
        });
        carouselWrap.removeEventListener("mouseenter", stop);
        carouselWrap.removeEventListener("mouseleave", start);
      });
    }

    // ── FOOTER reveals (manifest + stats) ──
    const footerRevealObservers: IntersectionObserver[] = [];
    ["footer-manifest", "footer-stats"].forEach((id) => {
      const el = root.querySelector<HTMLElement>(`#${id}`);
      if (!el) return;
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add("revealed");
            obs.unobserve(entry.target);
          });
        },
        { threshold: 0.25 },
      );
      obs.observe(el);
      footerRevealObservers.push(obs);
    });
    cleanups.push(() =>
      footerRevealObservers.forEach((obs) => obs.disconnect()),
    );

    // ── FOOTER wordmark parallax ───────────
    const wm = root.querySelector<HTMLDivElement>("#footer-wordmark");
    const wmText = root.querySelector<HTMLSpanElement>("#footer-wordmark-text");
    if (wm && wmText) {
      const prefersReducedWm = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      if (prefersReducedWm) {
        wmText.style.transform = "translateY(35%)";
      } else {
        let ticking = false;
        const START = 85;
        const END = 30;
        const SLOWNESS = 0.55;
        const update = () => {
          const rect = wm.getBoundingClientRect();
          const vh =
            window.innerHeight || document.documentElement.clientHeight;
          const raw = (vh - rect.top) / (vh + rect.height);
          const prog = Math.max(0, Math.min(1, raw * SLOWNESS));
          const y = START - (START - END) * prog;
          wmText.style.transform = `translateY(${y.toFixed(2)}%)`;
          ticking = false;
        };
        const onWmScroll = () => {
          if (!ticking) {
            window.requestAnimationFrame(update);
            ticking = true;
          }
        };
        window.addEventListener("scroll", onWmScroll, { passive: true });
        window.addEventListener("resize", onWmScroll);
        update();
        cleanups.push(() => {
          window.removeEventListener("scroll", onWmScroll);
          window.removeEventListener("resize", onWmScroll);
        });
      }
    }

    // ── NAV hide on CTA ────────────────────
    const ctaNavObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          navEl?.classList.toggle("hide-nav", entry.isIntersecting);
        });
      },
      { threshold: 0.1 },
    );
    if (ctaSection) ctaNavObserver.observe(ctaSection);
    cleanups.push(() => ctaNavObserver.disconnect());

    // ── TESTIMONIALS carousel ──────────────
    const testiCards = Array.from(
      root.querySelectorAll<HTMLDivElement>(".testi-card"),
    );
    const testiBgs = Array.from(
      root.querySelectorAll<HTMLDivElement>(".testi-bg"),
    );
    const testiDots = Array.from(
      root.querySelectorAll<HTMLDivElement>(".testi-dot"),
    );
    const avClasses = ["testi-av-1", "testi-av-2", "testi-av-3"] as const;
    const avBig = root.querySelector<HTMLDivElement>("#testi-av-big");
    const testiTotal = 3;
    let curTesti = 0;

    const setTesti = (n: number) => {
      const prev = curTesti;
      curTesti = ((n % testiTotal) + testiTotal) % testiTotal;
      testiCards.forEach((el, i) => {
        el.classList.remove("active", "prev");
        if (i === curTesti) el.classList.add("active");
        else if (i === prev) el.classList.add("prev");
      });
      testiBgs.forEach((el, i) =>
        el.classList.toggle("active", i === curTesti),
      );
      testiDots.forEach((el, i) =>
        el.classList.toggle("active", i === curTesti),
      );
      if (avBig) {
        avBig.classList.remove(...avClasses);
        const nextClass = avClasses[curTesti];
        if (nextClass) avBig.classList.add(nextClass);
      }
    };

    const testiPrev = root.querySelector<HTMLButtonElement>("#testi-prev");
    const testiNext = root.querySelector<HTMLButtonElement>("#testi-next");
    const onTestiPrev = () => setTesti(curTesti - 1);
    const onTestiNext = () => setTesti(curTesti + 1);
    testiPrev?.addEventListener("click", onTestiPrev);
    testiNext?.addEventListener("click", onTestiNext);

    const testiDotHandlers: Array<() => void> = [];
    testiDots.forEach((dot, i) => {
      const handler = () => {
        const idxAttr = dot.dataset.i;
        setTesti(idxAttr ? parseInt(idxAttr, 10) : i);
      };
      dot.addEventListener("click", handler);
      testiDotHandlers.push(handler);
    });
    const testiTimer = window.setInterval(
      () => setTesti(curTesti + 1),
      8000,
    );
    cleanups.push(() => {
      testiPrev?.removeEventListener("click", onTestiPrev);
      testiNext?.removeEventListener("click", onTestiNext);
      testiDots.forEach((dot, i) => {
        const handler = testiDotHandlers[i];
        if (handler) dot.removeEventListener("click", handler);
      });
      window.clearInterval(testiTimer);
    });

    return () => {
      cleanups.forEach((fn) => fn());
    };
  }, []);

  return (
    <div ref={rootRef} className="home-root">
      {/* ── NAV ─────────────────────────────── */}
      <nav id="nav" className="h-nav">
        <Link href="/" className="nav-brand">
          Big Sky <span>Atlas</span>
        </Link>
        <ul className="nav-links">
          <li>
            <Link href="/expeditions">Expeditions</Link>
          </li>
          <li>
            <Link href="/ethos">About</Link>
          </li>
          <li>
            <Link href="/ethos#guides">Stories</Link>
          </li>
          <li>
            <Link href="/contact" className="nav-cta">
              Reserve →
            </Link>
          </li>
        </ul>
      </nav>

      {/* ── HERO ────────────────────────────── */}
      <section id="hero">
        <div className="hero-video-wrap">
          <video autoPlay muted loop playsInline id="hero-video">
            <source src="/videos/hero.mp4" type="video/mp4" />
          </video>
          <div className="hero-placeholder" id="hero-placeholder" />
        </div>
        <div className="hero-content">
          <span className="hero-overline">
            Wyoming &amp; Montana · Since 2019
          </span>
          <h1 className="hero-title">
            <span className="hero-line-1">Big Sky</span>
            <span className="hero-line-2">
              Atlas<span style={{ color: "var(--brasa)" }}>.</span>
            </span>
          </h1>
          <p className="hero-tagline">Where the trail finds you.</p>
        </div>
        <div className="hero-scroll">
          <span>scroll</span>
          <div className="scroll-line" />
        </div>
      </section>

      {/* ── EXPEDITIONS ──────────────────────── */}
      <div id="expeditions-wrap">
        <section id="expeditions">
          <div className="exp-left">
            <div className="exp-track">
              <div className="exp-track-fill" id="exp-track-fill" />
            </div>
            <div className="exp-ghost-num" id="exp-ghost">
              04
            </div>
            <span className="exp-section-label exp-enter">Our expeditions</span>
            <h2
              className="exp-section-title exp-enter"
              style={{ transitionDelay: ".1s" }}
            >
              Choose your
              <br />
              trail<span>.</span>
            </h2>
            <div className="exp-list">
              <div
                className="exp-item active exp-enter"
                data-exp="0"
                style={{ transitionDelay: ".18s" }}
              >
                <div className="exp-item-head">
                  <span className="exp-num">04</span>
                  <Link
                    href="/expeditions/teton-traverse"
                    className="exp-name"
                    style={{ textDecoration: "none" }}
                  >
                    Teton Traverse
                  </Link>
                  <span className="exp-arrow">→</span>
                </div>
                <p className="exp-desc">
                  Seven days across the most dramatic terrain in Wyoming.
                  Technical, remote, unforgettable. Grand Teton NP — 3,842m
                  elevation.
                </p>
                <div className="exp-meta-pills">
                  <span className="exp-pill">Wyoming</span>
                  <span className="exp-pill">7 days</span>
                  <span className="exp-pill">3,842m</span>
                  <span className="exp-pill-red exp-pill">Technical</span>
                </div>
              </div>
              <div
                className="exp-item exp-enter"
                data-exp="1"
                style={{ transitionDelay: ".26s" }}
              >
                <div className="exp-item-head">
                  <span className="exp-num">06</span>
                  <Link
                    href="/expeditions/bighorn-sanctuary"
                    className="exp-name"
                    style={{ textDecoration: "none" }}
                  >
                    Bighorn Sanctuary
                  </Link>
                  <span className="exp-arrow">→</span>
                </div>
                <p className="exp-desc">
                  Five days of stillwater lakes, pine forest and zero scramble.
                  Designed for families and first-time expedition groups.
                </p>
                <div className="exp-meta-pills">
                  <span className="exp-pill">Wyoming</span>
                  <span className="exp-pill">5 days</span>
                  <span className="exp-pill">2,340m</span>
                  <span
                    className="exp-pill"
                    style={{
                      background: "rgba(79,99,5,.2)",
                      color: "#9ab845",
                    }}
                  >
                    Family
                  </span>
                </div>
              </div>
              <div
                className="exp-item exp-enter"
                data-exp="2"
                style={{ transitionDelay: ".34s" }}
              >
                <div className="exp-item-head">
                  <span className="exp-num">07</span>
                  <Link
                    href="/expeditions/beartooth-summits"
                    className="exp-name"
                    style={{ textDecoration: "none" }}
                  >
                    Beartooth Summits
                  </Link>
                  <span className="exp-arrow">→</span>
                </div>
                <p className="exp-desc">
                  Six days above the treeline in Montana&apos;s wildflower
                  season. An all-women expedition through one of the highest
                  plateaus in the Rockies.
                </p>
                <div className="exp-meta-pills">
                  <span className="exp-pill">Montana</span>
                  <span className="exp-pill">6 days</span>
                  <span className="exp-pill">3,010m</span>
                  <span
                    className="exp-pill"
                    style={{
                      background: "rgba(123,79,142,.2)",
                      color: "#b87fd4",
                    }}
                  >
                    Women&apos;s
                  </span>
                </div>
              </div>
            </div>
            <div
              className="exp-scroll-hint exp-enter"
              style={{ transitionDelay: ".42s" }}
            >
              scroll to explore
            </div>
          </div>
          <div className="exp-right">
            <div className="exp-image exp-img-1 active" id="exp-img-0">
              <div className="exp-img-label">
                <span className="exp-img-number">Expedition 04</span>
                <span className="exp-img-name">Teton Traverse</span>
              </div>
            </div>
            <div className="exp-image exp-img-2" id="exp-img-1">
              <div className="exp-img-label">
                <span className="exp-img-number">Expedition 06</span>
                <span className="exp-img-name">Bighorn Sanctuary</span>
              </div>
            </div>
            <div className="exp-image exp-img-3" id="exp-img-2">
              <div className="exp-img-label">
                <span className="exp-img-number">Expedition 07</span>
                <span className="exp-img-name">Beartooth Summits</span>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* ── PHILOSOPHY ───────────────────────── */}
      <section id="philosophy">
        <div className="phil-bg" />
        <div className="phil-overlay" />
        <div className="phil-content">
          <span className="phil-label">The Atlas way</span>
          <div className="phil-line xl">
            We don&apos;t sell <em>trips.</em>
          </div>
          <div className="phil-line lg">We map the version of you</div>
          <div className="phil-line xl">
            that exists <em>at altitude.</em>
          </div>
          <div className="phil-rule" />
          <div className="phil-line md">
            Groups of <strong>8 maximum.</strong> Every guide a local.
          </div>
          <div className="phil-line md">
            Every trail chosen for <strong>what it asks of you.</strong>
          </div>
          <div style={{ marginTop: 32 }}>
            <span className="phil-sub">
              Big Sky Atlas · Wyoming &amp; Montana · Est. 2019
            </span>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────── */}
      <section id="testimonials">
        <span className="testi-label">From the field</span>
        <div className="testi-stage">
          <button
            type="button"
            className="testi-arrow-ext"
            id="testi-prev"
            aria-label="Previous testimonial"
          >
            ←
          </button>
          <div className="testi-frame" id="testi-frame">
            <div className="testi-bg testi-bg-1 active" id="testi-bg-0" />
            <div className="testi-bg testi-bg-2" id="testi-bg-1" />
            <div className="testi-bg testi-bg-3" id="testi-bg-2" />
            <div className="testi-overlay" />
            <div className="testi-cards">
              <div className="testi-card active" id="testi-0">
                <div className="testi-stars">★★★★★</div>
                <div className="testi-quote">
                  &ldquo;Honestly I didn&apos;t expect to cry. But on day four,
                  just sitting there watching the light change over the ridge —
                  something shifted. Hard to explain to people who weren&apos;t
                  there.&rdquo;
                </div>
                <div className="testi-author">
                  <div className="testi-avatar testi-av-1" />
                  <div>
                    <div className="testi-name">Sarah Mitchell</div>
                    <div className="testi-location">
                      Vancouver, Canada · Beartooth Summits 2024
                    </div>
                  </div>
                </div>
              </div>
              <div className="testi-card" id="testi-1">
                <div className="testi-stars">★★★★★</div>
                <div className="testi-quote">
                  &ldquo;My son is 9. He complained the whole first day. By day
                  three he was the one waking us up early. That&apos;s the
                  whole story.&rdquo;
                </div>
                <div className="testi-author">
                  <div className="testi-avatar testi-av-2" />
                  <div>
                    <div className="testi-name">Marcus Johnson</div>
                    <div className="testi-location">
                      Atlanta, USA · Bighorn Sanctuary 2024
                    </div>
                  </div>
                </div>
              </div>
              <div className="testi-card" id="testi-2">
                <div className="testi-stars">★★★★★</div>
                <div className="testi-quote">
                  &ldquo;I&apos;ve done a lot of trips. This one I still think
                  about. Not the views — the silence. There was a lot of
                  silence.&rdquo;
                </div>
                <div className="testi-author">
                  <div className="testi-avatar testi-av-3" />
                  <div>
                    <div className="testi-name">Valentina Cruz</div>
                    <div className="testi-location">
                      Buenos Aires, Argentina · Teton Traverse 2023
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="testi-av-big testi-av-1" id="testi-av-big" />
          </div>
          <button
            type="button"
            className="testi-arrow-ext"
            id="testi-next"
            aria-label="Next testimonial"
          >
            →
          </button>
        </div>
        <div className="testi-dots">
          <div className="testi-dot active" data-i="0" />
          <div className="testi-dot" data-i="1" />
          <div className="testi-dot" data-i="2" />
        </div>
      </section>

      {/* ── CTA ──────────────────────────────── */}
      <section id="cta">
        <div className="cta-bg" id="cta-bg" />
        <div className="cta-overlay" />
        <div className="cta-content">
          <span className="cta-overline" id="cta-overline">
            2025 Season · Limited spots
          </span>
          <div
            style={{
              display: "flex",
              alignItems: "stretch",
              gap: 24,
              flex: 1,
            }}
          >
            <h2 className="cta-title" style={{ flex: 1 }}>
              <span className="cta-word">
                <span className="cta-word-inner" id="cta-w1">
                  Your
                </span>
              </span>
              <span className="cta-word">
                <span
                  className="cta-word-inner"
                  id="cta-w2"
                  style={{ transitionDelay: ".18s" }}
                >
                  {" "}
                  trail
                </span>
              </span>
              <br />
              <span className="cta-word">
                <span
                  className="cta-word-inner"
                  id="cta-w3"
                  style={{ transitionDelay: ".36s" }}
                >
                  is
                </span>
              </span>
              <span className="cta-word">
                <span
                  className="cta-word-inner"
                  id="cta-w4"
                  style={{ transitionDelay: ".54s" }}
                >
                  {" "}
                  waiting<span className="dot">.</span>
                </span>
              </span>
            </h2>
            <div
              className="cta-photos"
              id="cta-photos"
              style={{ alignSelf: "center" }}
            >
              <div className="cta-carousel" id="cta-carousel">
                <div
                  className="cta-slide"
                  data-pos="left"
                  style={{
                    backgroundImage:
                      "url('/images/Group_of_5_202604200914.png')",
                  }}
                >
                  <Link
                    href="/expeditions/teton-traverse"
                    className="cta-slide-badge"
                  >
                    <span className="cta-badge-pin">◆</span>
                    <span className="cta-badge-text">
                      Teton Traverse, Wyoming
                    </span>
                    <span className="cta-badge-arrow">↗</span>
                  </Link>
                </div>

                <div
                  className="cta-slide"
                  data-pos="center"
                  style={{
                    backgroundImage:
                      "url('/images/Multi-generational_family_of_202604200914.png')",
                  }}
                >
                  <Link
                    href="/expeditions/bighorn-sanctuary"
                    className="cta-slide-badge"
                  >
                    <span className="cta-badge-pin">◆</span>
                    <span className="cta-badge-text">
                      Bighorn Sanctuary, Wyoming
                    </span>
                    <span className="cta-badge-arrow">↗</span>
                  </Link>
                </div>

                <div
                  className="cta-slide"
                  data-pos="right"
                  style={{
                    backgroundImage:
                      "url('/images/Woman_standing_on_202604200914.png')",
                  }}
                >
                  <Link
                    href="/expeditions/beartooth-summits"
                    className="cta-slide-badge"
                  >
                    <span className="cta-badge-pin">◆</span>
                    <span className="cta-badge-text">
                      Beartooth Summits, Montana
                    </span>
                    <span className="cta-badge-arrow">↗</span>
                  </Link>
                </div>

                <button
                  type="button"
                  className="cta-carousel-nav prev"
                  id="cta-prev"
                  aria-label="Previous expedition"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="15 18 9 12 15 6" />
                  </svg>
                </button>
                <button
                  type="button"
                  className="cta-carousel-nav next"
                  id="cta-next"
                  aria-label="Next expedition"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </button>

                <div className="cta-carousel-dots" id="cta-dots">
                  <div className="cta-carousel-dot" data-idx="0" />
                  <div className="cta-carousel-dot active" data-idx="1" />
                  <div className="cta-carousel-dot" data-idx="2" />
                </div>
              </div>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              paddingTop: 28,
              borderTop: ".5px solid rgba(250,248,244,.1)",
              marginTop: 24,
            }}
          >
            <p className="cta-sub" id="cta-sub">
              Groups of 8 maximum. Every expedition departs once per season.
              <br />
              No mass tourism. No shortcuts.
            </p>
            <div className="cta-actions" id="cta-actions">
              <a href="#expeditions" className="cta-btn">
                Reserve your expedition →
              </a>
              <p className="cta-note">
                Full refund 60 days prior · No commitment until deposit
                confirmed
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────── */}
      <footer>
        <div className="footer-manifest" id="footer-manifest">
          <span className="footer-manifest-overline">Our promise</span>
          <h3 className="footer-manifest-quote">
            <span className="fm-word">
              <span className="fm-word-inner">The</span>
            </span>
            <span className="fm-word">
              <span
                className="fm-word-inner"
                style={{ transitionDelay: ".10s" }}
              >
                &nbsp;long
              </span>
            </span>
            <span className="fm-word">
              <span
                className="fm-word-inner"
                style={{ transitionDelay: ".20s" }}
              >
                &nbsp;way
              </span>
            </span>
            <br />
            <span className="fm-word">
              <span
                className="fm-word-inner"
                style={{ transitionDelay: ".34s" }}
              >
                is
              </span>
            </span>
            <span className="fm-word">
              <span
                className="fm-word-inner"
                style={{ transitionDelay: ".44s" }}
              >
                &nbsp;the
              </span>
            </span>
            <span className="fm-word">
              <span
                className="fm-word-inner"
                style={{ transitionDelay: ".54s" }}
              >
                &nbsp;only
              </span>
            </span>
            <span className="fm-word">
              <span
                className="fm-word-inner"
                style={{ transitionDelay: ".64s" }}
              >
                &nbsp;way<span className="dot">.</span>
              </span>
            </span>
          </h3>
        </div>

        <div className="footer-stats" id="footer-stats">
          <div className="footer-stat">
            <span className="footer-stat-label">Wilderness under foot</span>
            <span className="footer-stat-value">
              2.3<span className="footer-stat-unit">M acres</span>
            </span>
          </div>
          <div className="footer-stat">
            <span className="footer-stat-label">Guides on staff</span>
            <span className="footer-stat-value">14</span>
          </div>
          <div className="footer-stat">
            <span className="footer-stat-label">Max group size</span>
            <span className="footer-stat-value">8</span>
          </div>
          <div className="footer-stat">
            <span className="footer-stat-label">Seasons run</span>
            <span className="footer-stat-value">6</span>
          </div>
        </div>

        <div className="footer-upper">
          <div className="footer-brand-col">
            <span className="footer-logo">
              Big Sky <span>Atlas</span>
            </span>
            <p className="footer-tagline">
              Guided expeditions across Wyoming and Montana. Groups of eight.
              Trails chosen for what they ask of you.
            </p>
            <div className="footer-social">
              <div className="social-btn">in</div>
              <div className="social-btn">ig</div>
              <div className="social-btn">yt</div>
            </div>
            <p className="footer-address">Jackson Hole, Wyoming · USA</p>
          </div>
          <div>
            <span className="footer-col-title">Expeditions</span>
            <ul className="footer-links">
              <li>
                <Link href="/expeditions/teton-traverse">Teton Traverse</Link>
              </li>
              <li>
                <Link href="/expeditions/bighorn-sanctuary">
                  Bighorn Sanctuary
                </Link>
              </li>
              <li>
                <Link href="/expeditions/beartooth-summits">
                  Beartooth Summits
                </Link>
              </li>
              <li>
                <Link href="/expeditions/wind-river-high-route">Wind River Range</Link>
              </li>
              <li>
                <Link href="/expeditions">All expeditions →</Link>
              </li>
            </ul>
          </div>
          <div>
            <span className="footer-col-title">The company</span>
            <ul className="footer-links">
              <li>
                <Link href="/ethos">About BSA</Link>
              </li>
              <li>
                <Link href="/ethos#guides">Our guides</Link>
              </li>
              <li>
                <Link href="/ethos">Stories from the range</Link>
              </li>
              <li>
                <Link href="/contact">Contact</Link>
              </li>
            </ul>
          </div>
          <div>
            <span className="footer-col-title">The long trail</span>
            <p className="footer-newsletter-desc">
              A quarterly letter from the range. No noise, no vans — just field
              notes, open dates and the occasional photograph.
            </p>
            <div className="newsletter-form">
              <input
                className="newsletter-input"
                type="email"
                placeholder="your@email.com"
              />
              <button type="button" className="newsletter-btn">
                Join
              </button>
            </div>
          </div>
        </div>

        <div className="footer-lower">
          <div className="footer-coord">
            <span>43°28&apos;N</span>
            <span className="footer-coord-sep">·</span>
            <span>110°45&apos;W</span>
            <span className="footer-coord-city">Jackson, WY</span>
          </div>
          <span className="footer-copy">
            © 2025 Big Sky Atlas LLC · WY Outfitter #2019-0847
          </span>
          <div className="footer-legal">
            <Link href="/contact">Privacy</Link>
            <Link href="/contact">Terms</Link>
            <Link href="/contact">Cookies</Link>
          </div>
        </div>

        <div className="footer-wordmark" id="footer-wordmark">
          <span id="footer-wordmark-text">Big Sky Atlas</span>
        </div>
      </footer>
    </div>
  );
}
