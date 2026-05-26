import type { ElementType, ReactNode } from "react";

type CursorVariant = "link" | "cta" | "image" | "drag" | "map";

type CursorAwareProps = {
  cursor: CursorVariant;
  children: ReactNode;
  className?: string;
  as?: keyof React.JSX.IntrinsicElements;
};

export function CursorAware({
  cursor,
  children,
  className,
  as = "div",
}: CursorAwareProps) {
  const Component = as as ElementType;
  return (
    <Component data-cursor={cursor} className={className}>
      {children}
    </Component>
  );
}
