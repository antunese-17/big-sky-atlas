import type { ReactNode } from "react";

import { Nav } from "@/components/blocks/Nav";

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Nav />
      {children}
    </>
  );
}
