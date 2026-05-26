import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type SectionMode = "papel" | "noite" | "granito";
type SectionSize = "sm" | "md" | "lg";
type SectionContainer = "default" | "narrow" | "wide";

type SectionProps = {
  mode?: SectionMode;
  size?: SectionSize;
  fullBleed?: boolean;
  container?: SectionContainer;
  className?: string;
  children: ReactNode;
  id?: string;
  "data-mode"?: string;
};

const MODE_CLASSES: Record<SectionMode, string> = {
  papel: "bg-bsa-papel text-bsa-carvao",
  noite: "bg-bsa-noite-alpina text-bsa-papel",
  granito: "bg-[#EFECDE] text-bsa-carvao",
};

const SIZE_CLASSES: Record<SectionSize, string> = {
  sm: "py-[75px]",
  md: "py-[96px]",
  lg: "py-[168px]",
};

const CONTAINER_CLASSES: Record<SectionContainer, string> = {
  default: "mx-auto w-full max-w-[1440px] px-6 md:px-10",
  narrow: "mx-auto w-full max-w-[720px] px-6 md:px-10",
  wide: "mx-auto w-full max-w-[1720px] px-6 md:px-10",
};

export function Section({
  mode = "papel",
  size = "md",
  fullBleed = false,
  container = "default",
  className,
  children,
  id,
  "data-mode": dataModeOverride,
}: SectionProps) {
  return (
    <section
      id={id}
      data-mode={dataModeOverride ?? mode}
      className={cn(MODE_CLASSES[mode], SIZE_CLASSES[size], className)}
    >
      {fullBleed ? (
        children
      ) : (
        <div className={CONTAINER_CLASSES[container]}>{children}</div>
      )}
    </section>
  );
}
