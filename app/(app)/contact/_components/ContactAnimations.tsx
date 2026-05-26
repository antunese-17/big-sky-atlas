"use client";

import { useEffect } from "react";

/* ─── Typing reveal ──────────────────────────────────────────────────────────
 * Injects a scoped <style> per element so steps() gets the exact char count.
 * Triggered once by IntersectionObserver when element enters the viewport.
 * ─────────────────────────────────────────────────────────────────────────── */
function initTypingReveal() {
  const els = document.querySelectorAll<HTMLElement>("[data-type-chars]");
  if (!els.length) return;

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target as HTMLElement;
        const chars = parseInt(el.dataset.typeChars ?? "15", 10);

        // ms-per-char: 70ms base, min 0.8s total, max 2.5s
        const duration = Math.min(2.5, Math.max(0.8, chars * 0.07));
        const cursorDelay = duration;
        const uid = `tr-${Math.random().toString(36).slice(2, 7)}`;

        if (!reduced) {
          // Inject scoped keyframe with exact steps count
          const style = document.createElement("style");
          style.dataset.typeStyle = uid;
          style.textContent = `
            .${uid}::after {
              animation:
                type-uncover ${duration}s steps(${chars}, end) forwards,
                cursor-blink 0.75s step-end ${cursorDelay}s 4;
            }
          `;
          document.head.appendChild(style);
          el.classList.add(uid, "is-typing");
        }

        io.unobserve(el);
      });
    },
    { threshold: 0.4 },
  );

  els.forEach((el) => io.observe(el));
  return () => io.disconnect();
}

/* ─── Slot-machine scramble ──────────────────────────────────────────────────
 * On mouseenter: digits roll randomly, locking in left-to-right over 28 frames.
 * Non-digit characters (spaces, parentheses, dashes) are preserved as-is.
 * ─────────────────────────────────────────────────────────────────────────── */
function initScramble() {
  const el = document.querySelector<HTMLElement>("[data-scramble]");
  if (!el) return;

  const original = el.dataset.scramble ?? el.textContent ?? "";
  const DIGITS = "0123456789";
  const TOTAL_FRAMES = 28;
  let raf: number;

  const scramble = () => {
    cancelAnimationFrame(raf);
    let frame = 0;

    // Precompute which frame each digit position locks in (left → right)
    const digitPositions = original
      .split("")
      .map((ch, i) => ({ ch, i, isDigit: /\d/.test(ch) }))
      .filter((d) => d.isDigit);

    const lockFrame = (posIndex: number) =>
      Math.floor((posIndex / digitPositions.length) * TOTAL_FRAMES * 0.75);

    const step = () => {
      let posIdx = 0;
      const result = original.split("").map((ch) => {
        if (!/\d/.test(ch)) return ch;
        const shouldLock = frame >= lockFrame(posIdx);
        posIdx++;
        return shouldLock
          ? ch
          : DIGITS[Math.floor(Math.random() * DIGITS.length)];
      });

      el.textContent = result.join("");
      frame++;

      if (frame <= TOTAL_FRAMES) {
        raf = requestAnimationFrame(step);
      } else {
        el.textContent = original;
      }
    };

    raf = requestAnimationFrame(step);
  };

  el.addEventListener("mouseenter", scramble);
  return () => {
    el.removeEventListener("mouseenter", scramble);
    cancelAnimationFrame(raf);
  };
}

/* ─── Component ─────────────────────────────────────────────────────────────  */
export function ContactAnimations() {
  useEffect(() => {
    const cleanTyping = initTypingReveal();
    const cleanScramble = initScramble();
    return () => {
      cleanTyping?.();
      cleanScramble?.();
    };
  }, []);

  return null;
}
