import type { ReactNode } from "react";

import { cn } from "@/lib/utils";
import { Overline } from "./Overline";

type PullQuoteSize = "l" | "m" | "s";

type PullQuoteProps = {
  size?: PullQuoteSize;
  attribution?: string;
  className?: string;
  children: ReactNode;
};

const SIZES: Record<PullQuoteSize, string> = {
  l: "text-[56px] leading-[1.2] tracking-[-0.02em]",
  m: "text-[36px] leading-[1.25] tracking-[-0.01em]",
  s: "text-[28px] leading-[1.3] tracking-[0]",
};

export function PullQuote({
  size = "m",
  attribution,
  className,
  children,
}: PullQuoteProps) {
  return (
    <blockquote className={className}>
      <p
        className={cn(SIZES[size], "font-display font-normal italic")}
        style={{ fontVariationSettings: "'opsz' 72, 'SOFT' 100" }}
      >
        {children}
      </p>
      {attribution ? (
        <footer className="mt-3">
          <Overline color="granito">{attribution}</Overline>
        </footer>
      ) : null}
    </blockquote>
  );
}
