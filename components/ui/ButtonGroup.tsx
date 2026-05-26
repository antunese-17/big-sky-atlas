import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type ButtonGroupProps = {
  className?: string;
  children: ReactNode;
};

export function ButtonGroup({ className, children }: ButtonGroupProps) {
  return (
    <div className={cn("flex flex-wrap items-center gap-4", className)}>
      {children}
    </div>
  );
}
