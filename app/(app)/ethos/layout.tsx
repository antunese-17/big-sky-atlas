import type { ReactNode } from "react";

import { Footer } from "@/components/blocks/Footer";

export default function EthosLayout({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <Footer />
    </>
  );
}
