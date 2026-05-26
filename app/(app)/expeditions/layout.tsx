import type { ReactNode } from "react";

import { ExpeditionsFooter } from "@/components/blocks/ExpeditionsFooter";

export default function ExpeditionsLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      {children}
      <ExpeditionsFooter />
    </>
  );
}
