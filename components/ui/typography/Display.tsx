import type { CSSProperties, ElementType, ReactNode } from "react";

import { cn } from "@/lib/utils";

type DisplaySize = "hero" | "xl" | "l";

type DisplayProps = {
  size: DisplaySize;
  as?: keyof React.JSX.IntrinsicElements;
  className?: string;
  children: ReactNode;
};

const SIZE_STYLES: Record<DisplaySize, CSSProperties> = {
  hero: {
    fontSize: "clamp(6rem, 14vw, 12.5rem)",
    lineHeight: 0.92,
    letterSpacing: "-0.035em",
  },
  xl: {
    fontSize: "clamp(4.5rem, 10vw, 8.75rem)",
    lineHeight: 0.95,
    letterSpacing: "-0.03em",
  },
  l: {
    fontSize: "clamp(3.5rem, 7vw, 6rem)",
    lineHeight: 1,
    letterSpacing: "-0.02em",
  },
};

export function Display({
  size,
  as = "h1",
  className,
  children,
}: DisplayProps) {
  const Component = as as ElementType;
  return (
    <Component
      className={cn("font-display font-normal", className)}
      style={{ ...SIZE_STYLES[size], color: "inherit" }}
    >
      {children}
    </Component>
  );
}
