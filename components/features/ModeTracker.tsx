"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export function ModeTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;

    let observer: IntersectionObserver | null = null;

    const timer = window.setTimeout(() => {
      const sections =
        document.querySelectorAll<HTMLElement>("[data-mode]");
      if (sections.length === 0) return;

      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue;
            const mode = entry.target.getAttribute("data-mode");
            if (mode) {
              document.documentElement.setAttribute("data-mode", mode);
            }
          }
        },
        { threshold: 0.5 },
      );

      sections.forEach((section) => observer!.observe(section));
    }, 100);

    return () => {
      window.clearTimeout(timer);
      observer?.disconnect();
    };
  }, [pathname]);

  return null;
}
