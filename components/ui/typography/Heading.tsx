import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type HeadingProps = {
  level: 1 | 2 | 3;
  className?: string;
  children: ReactNode;
};

const STYLES: Record<HeadingProps["level"], string> = {
  1: "text-[56px] leading-[1.05] tracking-[-0.02em] font-display font-[500]",
  2: "text-[40px] leading-[1.1] tracking-[-0.01em] font-display font-[500]",
  3: "text-[28px] leading-[1.25] tracking-[0] font-body font-[600]",
};

export function Heading({ level, className, children }: HeadingProps) {
  const classes = cn(STYLES[level], className);
  if (level === 1) return <h1 className={classes}>{children}</h1>;
  if (level === 2) return <h2 className={classes}>{children}</h2>;
  return <h3 className={classes}>{children}</h3>;
}
