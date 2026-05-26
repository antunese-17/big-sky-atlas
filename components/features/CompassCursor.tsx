"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

import { useReducedMotion } from "@/components/features/ReducedMotionProvider";

type CursorVariant = "default" | "link" | "cta" | "image" | "drag";

const VARIANTS: readonly CursorVariant[] = [
  "default",
  "link",
  "cta",
  "image",
  "drag",
] as const;

const NATURAL_EASE = [0.165, 0.84, 0.44, 1] as const;
const COLOR_CARVAO = "#141414";
const COLOR_PAPEL = "#FAF8F4";
const COLOR_BRASA = "#C02B0A";

const SPRING_MOVE = { stiffness: 400, damping: 30, mass: 0.5 } as const;
const SPRING_ROTATE = { stiffness: 200, damping: 20 } as const;

const VARIANT_TRANSITION = { duration: 0.3, ease: NATURAL_EASE } as const;
const COLOR_TRANSITION = { duration: 0.6, ease: NATURAL_EASE } as const;

export function CompassCursor() {
  const reducedMotion = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [variant, setVariant] = useState<CursorVariant>("default");
  const [darkSection, setDarkSection] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const rawRotate = useMotionValue(0);
  const springX = useSpring(mouseX, SPRING_MOVE);
  const springY = useSpring(mouseY, SPRING_MOVE);
  const springRotate = useSpring(rawRotate, SPRING_ROTATE);

  useEffect(() => {
    if (typeof window === "undefined") return;
    setEnabled(!window.matchMedia("(hover: none)").matches);
  }, []);

  useEffect(() => {
    if (!enabled || reducedMotion) {
      const previous = document.body.style.cursor;
      document.body.style.cursor = "auto";
      return () => {
        document.body.style.cursor = previous;
      };
    }
    return;
  }, [enabled, reducedMotion]);

  useEffect(() => {
    if (!enabled || reducedMotion) return;
    const onMove = (event: MouseEvent) => {
      mouseX.set(event.clientX);
      mouseY.set(event.clientY);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [enabled, reducedMotion, mouseX, mouseY]);

  useEffect(() => {
    if (!enabled || reducedMotion) return;
    const onOver = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const matched = target.closest("[data-cursor]");
      const raw = matched?.getAttribute("data-cursor") ?? "default";
      const next = (VARIANTS as readonly string[]).includes(raw)
        ? (raw as CursorVariant)
        : "default";
      setVariant(next);
    };
    document.addEventListener("mouseover", onOver);
    return () => document.removeEventListener("mouseover", onOver);
  }, [enabled, reducedMotion]);

  useEffect(() => {
    if (!enabled || reducedMotion) return;
    let lastY = window.scrollY;
    let rafId = 0;
    let idleTimer: ReturnType<typeof setTimeout> | null = null;

    const onScroll = () => {
      if (idleTimer) clearTimeout(idleTimer);
      if (!rafId) {
        rafId = window.requestAnimationFrame(() => {
          const current = window.scrollY;
          const delta = current - lastY;
          lastY = current;
          const clamped = Math.max(-15, Math.min(15, delta * 0.3));
          rawRotate.set(clamped);
          rafId = 0;
        });
      }
      idleTimer = setTimeout(() => rawRotate.set(0), 150);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId) window.cancelAnimationFrame(rafId);
      if (idleTimer) clearTimeout(idleTimer);
    };
  }, [enabled, reducedMotion, rawRotate]);

  useEffect(() => {
    if (!enabled) return;
    const element = document.documentElement;
    const check = () => {
      setDarkSection(element.getAttribute("data-mode") === "noite");
    };
    check();
    const observer = new MutationObserver(check);
    observer.observe(element, {
      attributes: true,
      attributeFilter: ["data-mode"],
    });
    return () => observer.disconnect();
  }, [enabled]);

  if (!enabled || reducedMotion) return null;

  const baseColor = darkSection ? COLOR_PAPEL : COLOR_CARVAO;
  const compassColor = variant === "cta" ? COLOR_BRASA : baseColor;
  const wrapperScale =
    variant === "cta" ? 1.15 : variant === "image" ? 1.333 : 1;
  const strokeScale = variant === "link" ? 1.25 : 1;
  const isCompass =
    variant === "default" || variant === "link" || variant === "cta";

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[9999]"
      style={{ x: springX, y: springY, rotate: springRotate }}
    >
      <div style={{ transform: "translate(-50%, -50%)" }}>
        <motion.div
          animate={{ scale: wrapperScale }}
          transition={VARIANT_TRANSITION}
          style={{ width: 24, height: 24 }}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            style={{ display: "block", overflow: "visible" }}
          >
            <motion.g
              animate={{ opacity: isCompass ? 1 : 0 }}
              transition={VARIANT_TRANSITION}
            >
              <motion.g
                animate={{ scale: strokeScale }}
                transition={VARIANT_TRANSITION}
                style={{ transformOrigin: "12px 12px" }}
              >
                <motion.line
                  x1="12"
                  y1="12"
                  x2="12"
                  y2="5"
                  strokeWidth="1"
                  strokeLinecap="square"
                  animate={{ stroke: compassColor }}
                  transition={COLOR_TRANSITION}
                />
                <motion.line
                  x1="12"
                  y1="12"
                  x2="12"
                  y2="19"
                  strokeWidth="1"
                  strokeLinecap="square"
                  animate={{ stroke: compassColor }}
                  transition={COLOR_TRANSITION}
                />
                <motion.line
                  x1="12"
                  y1="12"
                  x2="5"
                  y2="12"
                  strokeWidth="1"
                  strokeLinecap="square"
                  animate={{ stroke: compassColor }}
                  transition={COLOR_TRANSITION}
                />
                <motion.line
                  x1="12"
                  y1="12"
                  x2="19"
                  y2="12"
                  strokeWidth="1"
                  strokeLinecap="square"
                  animate={{ stroke: compassColor }}
                  transition={COLOR_TRANSITION}
                />
              </motion.g>
              <motion.circle
                cx="12"
                cy="12"
                r="1.5"
                animate={{ fill: compassColor }}
                transition={COLOR_TRANSITION}
              />
            </motion.g>

            <motion.g
              animate={{ opacity: variant === "image" ? 1 : 0 }}
              transition={VARIANT_TRANSITION}
            >
              <motion.circle
                cx="12"
                cy="12"
                r="11"
                animate={{ fill: baseColor }}
                fillOpacity="0.3"
                transition={COLOR_TRANSITION}
              />
              <motion.line
                x1="12"
                y1="8"
                x2="12"
                y2="16"
                strokeWidth="1.2"
                strokeLinecap="square"
                animate={{ stroke: baseColor }}
                transition={COLOR_TRANSITION}
              />
              <motion.line
                x1="8"
                y1="12"
                x2="16"
                y2="12"
                strokeWidth="1.2"
                strokeLinecap="square"
                animate={{ stroke: baseColor }}
                transition={COLOR_TRANSITION}
              />
            </motion.g>

            <motion.g
              animate={{ opacity: variant === "drag" ? 1 : 0 }}
              transition={VARIANT_TRANSITION}
            >
              <motion.line
                x1="3"
                y1="12"
                x2="10"
                y2="12"
                strokeWidth="1"
                strokeLinecap="square"
                animate={{ stroke: baseColor }}
                transition={COLOR_TRANSITION}
              />
              <motion.polyline
                points="6,9 3,12 6,15"
                fill="none"
                strokeWidth="1"
                strokeLinejoin="round"
                animate={{ stroke: baseColor }}
                transition={COLOR_TRANSITION}
              />
              <motion.line
                x1="14"
                y1="12"
                x2="21"
                y2="12"
                strokeWidth="1"
                strokeLinecap="square"
                animate={{ stroke: baseColor }}
                transition={COLOR_TRANSITION}
              />
              <motion.polyline
                points="18,9 21,12 18,15"
                fill="none"
                strokeWidth="1"
                strokeLinejoin="round"
                animate={{ stroke: baseColor }}
                transition={COLOR_TRANSITION}
              />
            </motion.g>
          </svg>
        </motion.div>
      </div>
    </motion.div>
  );
}
