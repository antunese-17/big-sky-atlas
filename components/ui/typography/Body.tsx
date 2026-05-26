import type { ElementType, ReactNode } from "react";

import { cn } from "@/lib/utils";

type BodySize = "large" | "default" | "small";

type BodyProps = {
  size?: BodySize;
  as?: keyof React.JSX.IntrinsicElements;
  className?: string;
  children: ReactNode;
};

const SIZES: Record<BodySize, string> = {
  large: "text-[20px] leading-[1.6] font-body font-normal",
  default: "text-[16px] leading-[1.7] font-body font-normal",
  small: "text-[14px] leading-[1.6] font-body font-normal",
};

export function Body({
  size = "default",
  as = "p",
  className,
  children,
}: BodyProps) {
  const Component = as as ElementType;
  const defaultMaxWidth = className ? undefined : "max-w-[65ch]";
  return (
    <Component className={cn(SIZES[size], defaultMaxWidth, className)}>
      {children}
    </Component>
  );
}
