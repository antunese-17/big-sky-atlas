"use client";

import "@/styles/ethos.css";

import { NotusNot } from "./_components/NotusNot";
import { OriginSection } from "./_components/OriginSection";
import { PrinciplesStack } from "./_components/PrinciplesStack";
import { StatsSection } from "./_components/StatsSection";
import { VideoCard } from "./_components/VideoCard";
import { useReveal } from "./_hooks/useReveal";

export default function EthosPage() {
  useReveal();

  return (
    <>
        {/* NAV */}


        {/* ════════════════════════════════════════════
             01 · HERO
        ════════════════════════════════════════════ */}
        <section className="hero" aria-label="Ethos">
          {/* Background photo — production: swap gradient for actual image */}
          <div className="hero__bg" aria-hidden="true"></div>

          {/* Page title — right side, staggered (mirrors "About / us" reference) */}
          <div className="hero__title" aria-hidden="true">
            <span className="hero__title-line1">Our</span>
            <span className="hero__title-line2">Ethos</span>
          </div>

          {/* Tagline — bottom left */}
          <div className="hero__tagline">
            <h1 className="hero__tagline-text">
              Where the<br />land leads.
            </h1>
          </div>
          <VideoCard
            src="/videos/ethos-hero.mp4"
            poster="/images/hero-video-poster.jpg"
            label="Watch the expedition reel"
          />

        </section>

        {/* ════════════════════════════════════════════
             02 · ORIGIN
        ════════════════════════════════════════════ */}
        <OriginSection />

        {/* ════════════════════════════════════════════
             03 · PRINCIPLES — GSAP stacking cards
             (markup + GSAP lives in ./_components/PrinciplesStack)
        ════════════════════════════════════════════ */}
        <PrinciplesStack />

        {/* ════════════════════════════════════════════
             04 · GUIDES
        ════════════════════════════════════════════ */}
        <section className="guides" aria-labelledby="guides-heading">

          <div className="guides__header reveal">
            <p className="guides__label">The guides</p>
            <h2 className="guides__h2" id="guides-heading">
              They know the shortcuts that aren&apos;t on the map.
            </h2>
            <p className="guides__note">
              Their résumés are written in elevation gain, not conference rooms.
            </p>
          </div>

          <div className="guides__grid">

            <article className="guide reveal">
              <div className="guide__photo" role="img" aria-label="Marcus Reid — Backcountry Skiing">
                <div className="guide__meta">
                  <h3 className="guide__name">Marcus Reid</h3>
                  <p className="guide__specialty">Backcountry Ski · Yellowstone Winter</p>
                </div>
                <div className="guide__quote" aria-hidden="true">
                  <blockquote>&ldquo;The right snow falls in the right place. You just have to know how to wait.&rdquo;</blockquote>
                </div>
              </div>
              <div className="guide__foot">
                <p className="guide__seasons"><strong>12 seasons</strong> · 2012–present</p>
              </div>
            </article>

            <article className="guide reveal reveal-delay-1">
              <div className="guide__photo" role="img" aria-label="Lena Carver — Long Trail">
                <div className="guide__meta">
                  <h3 className="guide__name">Lena Carver</h3>
                  <p className="guide__specialty">Long Trail · Glacier N.P.</p>
                </div>
                <div className="guide__quote" aria-hidden="true">
                  <blockquote>&ldquo;I learned to read the wind before I learned to read a map.&rdquo;</blockquote>
                </div>
              </div>
              <div className="guide__foot">
                <p className="guide__seasons"><strong>9 seasons</strong> · 2015–present</p>
              </div>
            </article>

            <article className="guide reveal reveal-delay-2">
              <div className="guide__photo" role="img" aria-label="James Hollow — Photo Expedition">
                <div className="guide__meta">
                  <h3 className="guide__name">James Hollow</h3>
                  <p className="guide__specialty">Photo Expedition · Wildlife</p>
                </div>
                <div className="guide__quote" aria-hidden="true">
                  <blockquote>&ldquo;I don&apos;t photograph places. I photograph the moment before a place changes.&rdquo;</blockquote>
                </div>
              </div>
              <div className="guide__foot">
                <p className="guide__seasons"><strong>11 seasons</strong> · 2013–present</p>
              </div>
            </article>

            <article className="guide reveal reveal-delay-3">
              <div className="guide__photo" role="img" aria-label="Skye Whitmore — Wildlife">
                <div className="guide__meta">
                  <h3 className="guide__name">Skye Whitmore</h3>
                  <p className="guide__specialty">Wildlife · Yellowstone Summer</p>
                </div>
                <div className="guide__quote" aria-hidden="true">
                  <blockquote>&ldquo;Bison are never late. We&apos;re the ones who always arrive too early.&rdquo;</blockquote>
                </div>
              </div>
              <div className="guide__foot">
                <p className="guide__seasons"><strong>7 seasons</strong> · 2017–present</p>
              </div>
            </article>

          </div>
        </section>

        {/* ════════════════════════════════════════════
             05 · THE PLACE
        ════════════════════════════════════════════ */}
        <StatsSection />

        {/* ════════════════════════════════════════════
             06 · NOT US
        ════════════════════════════════════════════ */}
        <NotusNot />

        {/* ════════════════════════════════════════════
             07 · CLOSING
        ════════════════════════════════════════════ */}
        <section className="closing" aria-labelledby="closing-heading">
          <div className="closing__bg" aria-hidden="true"></div>

          <div className="closing__content">
            <p className="closing__label reveal" aria-hidden="true">The next step</p>
            <h2 className="closing__h2 reveal" id="closing-heading">
              No expedition<br />starts with<br />a form.
            </h2>
            <p className="closing__body reveal">
              It starts with a question from you, an answer from us, and a shared clarity that this terrain is what you&apos;re looking for. When you&apos;re ready — the conversation is open.
            </p>
            <a href="/contact" className="closing__cta reveal">
              <span className="cta-text">Start the conversation</span>
              <span className="cta-arrow-wrap" aria-hidden="true">
                <span className="cta-arrow cta-arrow--primary">→</span>
                <span className="cta-arrow cta-arrow--secondary">→</span>
              </span>
            </a>
          </div>

          <div className="closing__aside reveal" aria-hidden="true">
            <div className="closing__aside-num">400+</div>
            <p className="closing__aside-label">Guided expeditions</p>
          </div>
        </section>

        {/* FOOTER */}





          {/* ══ Place section — animations ══ */}
    </>
  );
}
