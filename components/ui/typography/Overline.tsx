import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type OverlineColor =
  | "musgo"
  | "granito"
  | "lanterna"
  | "brasa"
  | "pinheiro"
  | "papel";

type OverlineProps = {
  color?: OverlineColor;
  className?: string;
  children: ReactNode;
};

const COLOR_MAP: Record<OverlineColor, string> = {
  musgo: "#4F6305",
  granito: "#A8ADA7",
  lanterna: "#F6C67F",
  brasa: "#C02B0A",
  pinheiro: "#2A3820",
  papel: "#FAF8F4",
};

export function Overline({
  color = "granito",
  className,
  children,
}: OverlineProps) {
  return (
    <span
      className={cn(
        "block font-technical text-[12px] font-[500] uppercase tracking-[0.22em]",
        className,
      )}
      style={{ color: COLOR_MAP[color] }}
    >
      {children}
    </span>
  );
}
