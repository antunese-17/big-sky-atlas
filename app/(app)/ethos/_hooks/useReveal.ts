import { useEffect } from "react";

/**
 * Observes every `.reveal` element on the page and adds `visible` class
 * when it crosses into the viewport. One-shot per element (unobserve on
 * intersect).
 *
 * Call once from a client component that wraps the content you want to
 * reveal — typically the route's page component.
 */
export function useReveal() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("visible");
          io.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -32px 0px" },
    );
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}
