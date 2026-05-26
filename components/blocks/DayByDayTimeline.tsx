"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";
import type { ItineraryDay } from "@/lib/types";
import { useReducedMotion } from "@/components/features/ReducedMotionProvider";
import {
  MetadataStrip,
  type MetadataItem,
} from "@/components/ui/MetadataStrip";
import { Body, Heading, Overline } from "@/components/ui/typography";

type DayByDayTimelineProps = {
  days: ItineraryDay[];
  className?: string;
};

const CINEMATIC_EASE = [0.75, 0, 0.25, 1] as const;

function buildMetrics(day: ItineraryDay): MetadataItem[] {
  const items: MetadataItem[] = [];
  if (typeof day.elevation_gain_m === "number") {
    items.push({ label: `↑ ${day.elevation_gain_m}M` });
  }
  if (typeof day.distance_km === "number") {
    items.push({ label: `${day.distance_km}KM` });
  }
  if (typeof day.hours === "number") {
    items.push({ label: `${day.hours}H Hiking` });
  }
  return items;
}

function DayRow({
  day,
  reducedMotion,
  isLast,
}: {
  day: ItineraryDay;
  reducedMotion: boolean;
  isLast: boolean;
}) {
  const metrics = buildMetrics(day);
  const numberLabel = String(day.number).padStart(2, "0");

  const content = (
    <>
      <div className="relative z-10 mt-[6px] flex-shrink-0">
        <div
          className="flex h-[14px] w-[14px] items-center justify-center rounded-full bg-bsa-brasa"
          aria-hidden="true"
        >
          <span className="font-mono text-[8px] leading-none text-bsa-papel">
            {day.number}
          </span>
        </div>
      </div>
      <div className="flex-1">
        <Overline color="musgo" className="mb-2">
          Day {numberLabel}
        </Overline>
        <Heading level={2} className="mb-4">
          {day.title}
        </Heading>
        <Body size="default" className="mb-6 max-w-[520px]">
          {day.narrative}
        </Body>
        {day.image ? (
          <div className="relative aspect-[16/10] w-full max-w-[640px] overflow-hidden rounded-[16px]">
            <Image
              src={day.image}
              alt={day.title}
              fill
              sizes="(max-width: 768px) 100vw, 640px"
              className="object-cover"
            />
          </div>
        ) : null}
        {metrics.length > 0 ? (
          <div className="mt-3">
            <MetadataStrip
              animate={false}
              size="small"
              color="granito"
              items={metrics}
            />
          </div>
        ) : null}
      </div>
    </>
  );

  const rowClasses = cn("flex gap-8", !isLast && "mb-[96px]");

  if (reducedMotion) {
    return <div className={rowClasses}>{content}</div>;
  }

  return (
    <motion.div
      className={rowClasses}
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: CINEMATIC_EASE, delay: 0.1 }}
    >
      {content}
    </motion.div>
  );
}

export function DayByDayTimeline({ days, className }: DayByDayTimelineProps) {
  const reducedMotion = useReducedMotion();

  return (
    <div className={cn("relative", className)}>
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-[27px] top-0 w-[1px] bg-bsa-granito/40"
      />
      {days.map((day, index) => (
        <DayRow
          key={day.number}
          day={day}
          reducedMotion={reducedMotion}
          isLast={index === days.length - 1}
        />
      ))}
    </div>
  );
}
