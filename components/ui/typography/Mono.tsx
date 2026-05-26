import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type MonoProps = {
  className?: string;
  children: ReactNode;
};

export function Mono({ className, children }: MonoProps) {
  return (
    <span
      className={cn(
        "font-mono text-[13px] leading-[1.5] tracking-[0.04em]",
        className,
      )}
    >
      {children}
    </span>
  );
}
