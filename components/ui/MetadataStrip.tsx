"use client";

import { Fragment } from "react";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/components/features/ReducedMotionProvider";

type MetadataColor = "musgo" | "granito" | "lanterna" | "brasa" | "papel";
type MetadataSize = "default" | "small";
type MetadataSeparator = "·" | "—" | "/";

export type MetadataItem = {
  label: string;
  accent?: boolean;
};

type MetadataStripProps = {
  items: MetadataItem[];
  color?: MetadataColor;
  size?: MetadataSize;
  separator?: MetadataSeparator;
  animate?: boolean;
  className?: string;
};

const COLOR_MAP: Record<MetadataColor, string> = {
  musgo: "#4F6305",
  granito: "#A8ADA7",
  lanterna: "#F6C67F",
  brasa: "#C02B0A",
  papel: "#FAF8F4",
};

const SIZE_CLASSES: Record<MetadataSize, string> = {
  default: "text-[12px] tracking-[0.22em]",
  small: "text-[10px] tracking-[0.2em]",
};

const NATURAL_EASE = [0.165, 0.84, 0.44, 1] as const;
const ACCENT_COLOR = COLOR_MAP.brasa;

export function MetadataStrip({
  items,
  color = "granito",
  size = "default",
  separator = "·",
  animate = true,
  className,
}: MetadataStripProps) {
  const reducedMotion = useReducedMotion();
  const shouldAnimate = animate && !reducedMotion;
  const baseColor = COLOR_MAP[color];

  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-x-[10px] font-technical font-[500] uppercase",
        SIZE_CLASSES[size],
        className,
      )}
    >
      {items.map((item, index) => {
        const isAccent = item.accent === true;
        const itemColor = isAccent ? ACCENT_COLOR : baseColor;
        const itemWeight = isAccent ? 700 : 500;
        const isLast = index === items.length - 1;

        return (
          <Fragment key={`${index}-${item.label}`}>
            {shouldAnimate ? (
              <motion.span
                style={{
                  color: itemColor,
                  fontWeight: itemWeight,
                  display: "inline-block",
                }}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.4,
                  ease: NATURAL_EASE,
                  delay: index * 0.06,
                }}
              >
                {item.label}
              </motion.span>
            ) : (
              <span style={{ color: itemColor, fontWeight: itemWeight }}>
                {item.label}
              </span>
            )}
            {!isLast ? (
              <span
                aria-hidden="true"
                style={{ color: baseColor, opacity: 0.6 }}
              >
                {separator}
              </span>
            ) : null}
          </Fragment>
        );
      })}
    </div>
  );
}
