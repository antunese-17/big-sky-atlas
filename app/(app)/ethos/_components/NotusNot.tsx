"use client";

import { useEffect, useRef } from "react";

const fitTextPx = (el: HTMLElement, availableWidth: number) => {
  el.style.fontSize = "16px";
  let lo = 8;
  let hi = 600;
  while (hi - lo > 0.4) {
    const mid = (lo + hi) / 2;
    el.style.fontSize = `${mid}px`;
    if (el.scrollWidth > availableWidth) hi = mid;
    else lo = mid;
  }
  el.style.fontSize = `${lo}px`;
};

export function NotusNot() {
  const titleBlockRef = useRef<HTMLDivElement>(null);
  const fitLine1Ref = useRef<HTMLSpanElement>(null);
  const fitLine2Ref = useRef<HTMLSpanElement>(null);
  const notBandRef = useRef<HTMLDivElement>(null);
  const notWordRef = useRef<HTMLSpanElement>(null);
  const linesContainerRef = useRef<HTMLDivElement>(null);

  // fit-text + resize listener
  useEffect(() => {
    const titleBlock = titleBlockRef.current;
    const fitLine1 = fitLine1Ref.current;
    const fitLine2 = fitLine2Ref.current;
    const notBand = notBandRef.current;
    const notWord = notWordRef.current;
    if (!titleBlock || !fitLine1 || !fitLine2 || !notBand || !notWord) return;

    const run = () => {
      const titleStyle = window.getComputedStyle(titleBlock);
      const titleAvailable =
        titleBlock.clientWidth -
        parseFloat(titleStyle.paddingLeft) -
        parseFloat(titleStyle.paddingRight);
      fitTextPx(fitLine1, titleAvailable);
      fitTextPx(fitLine2, titleAvailable);

      const bandStyle = window.getComputedStyle(notBand);
      const bandAvailable =
        notBand.clientWidth -
        parseFloat(bandStyle.paddingLeft) -
        parseFloat(bandStyle.paddingRight);
      fitTextPx(notWord, bandAvailable);
    };

    run();
    window.addEventListener("resize", run, { passive: true });
    return () => window.removeEventListener("resize", run);
  }, []);

  // Title entrance observer
  useEffect(() => {
    const titleBlock = titleBlockRef.current;
    if (!titleBlock) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target
            .querySelectorAll(
              ".notusnot__eyebrow, .notusnot__fit-line, .notusnot__not-band, .notusnot__with-respect",
            )
            .forEach((child) => child.classList.add("title-visible"));
          io.unobserve(entry.target);
        });
      },
      { threshold: 0.15 },
    );
    io.observe(titleBlock);
    return () => io.disconnect();
  }, []);

  // Lines staggered fade + strike-through
  useEffect(() => {
    const container = linesContainerRef.current;
    if (!container) return;

    const lineEls = container.querySelectorAll<HTMLElement>(".notusnot__line");
    if (!lineEls.length) return;

    const lineIO = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("line-visible");
          lineIO.unobserve(entry.target);
        });
      },
      { threshold: 0.25, rootMargin: "0px 0px -32px 0px" },
    );
    lineEls.forEach((line, i) => {
      const delay = i * 75;
      line.style.transitionDelay = `${delay}ms, ${delay}ms, ${delay}ms`;
      lineIO.observe(line);
    });

    const strikeTimers: Array<ReturnType<typeof setTimeout>> = [];
    const strikeIO = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target
            .querySelectorAll(".notusnot__line")
            .forEach((line, i) => {
              const t = setTimeout(
                () => line.classList.add("struck"),
                i * 220,
              );
              strikeTimers.push(t);
            });
          strikeIO.unobserve(entry.target);
        });
      },
      { threshold: 0.6 },
    );
    strikeIO.observe(container);

    return () => {
      lineIO.disconnect();
      strikeIO.disconnect();
      strikeTimers.forEach((t) => clearTimeout(t));
    };
  }, []);

  return (
    <section className="notusnot" aria-labelledby="notusnot-heading">
      {/* Block 1: Typographic statement */}
      <div ref={titleBlockRef} className="notusnot__title-block">
        <p className="notusnot__eyebrow">06 · Clarity</p>

        <span
          ref={fitLine1Ref}
          className="notusnot__fit-line"
          aria-hidden="true"
        >
          WHO WE&rsquo;RE
        </span>

        <div ref={notBandRef} className="notusnot__not-band">
          <span
            ref={notWordRef}
            className="notusnot__not-word"
          >
            NOT
          </span>
        </div>

        <span
          ref={fitLine2Ref}
          className="notusnot__fit-line notusnot__fit-line--delay"
          aria-hidden="true"
        >
          FOR.
        </span>

        {/* Accessible heading */}
        <h2 id="notusnot-heading" className="vh">
          Who we&rsquo;re not for &mdash; with respect
        </h2>

        <p className="notusnot__with-respect">With respect.</p>
      </div>

      {/* Block 2: Numbered lines */}
      <div className="notusnot__inner">
        <div ref={linesContainerRef} className="notusnot__lines" role="list">
          <p className="notusnot__line" role="listitem">
            <span className="notusnot__line-num">01</span>
            <span>We are not a resort.</span>
          </p>
          <p className="notusnot__line" role="listitem">
            <span className="notusnot__line-num">02</span>
            <span>We don&rsquo;t do all-inclusive packages.</span>
          </p>
          <p className="notusnot__line" role="listitem">
            <span className="notusnot__line-num">03</span>
            <span>We don&rsquo;t put ten people on a bus.</span>
          </p>
          <p className="notusnot__line" role="listitem">
            <span className="notusnot__line-num">04</span>
            <span>We don&rsquo;t promise what the weather won&rsquo;t allow.</span>
          </p>
          <p className="notusnot__line" role="listitem">
            <span className="notusnot__line-num">05</span>
            <span>
              We don&rsquo;t pretend there&rsquo;s an &ldquo;effortless&rdquo;
              trail to the summit.
            </span>
          </p>
        </div>

        <div className="notusnot__divider reveal" aria-hidden="true"></div>
        <p className="notusnot__affirm-label reveal">
          If you want the opposite
        </p>
        <h3 className="notusnot__affirm reveal">
          We&rsquo;re here.
          <br />
          Since 2019.
        </h3>
        <p className="notusnot__affirm-sub reveal">
          If you&rsquo;re looking for resorts, all-inclusive packages, or
          effortless trails &mdash; there are good options elsewhere. We
          genuinely respect that choice.
        </p>
      </div>
    </section>
  );
}
