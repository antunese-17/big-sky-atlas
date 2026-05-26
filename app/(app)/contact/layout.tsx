import type { ReactNode } from "react";

import { Footer } from "@/components/blocks/Footer";

export default function ContactLayout({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <Footer />
    </>
  );
}
