"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, type ReactNode } from "react";

import { useReducedMotion } from "@/components/features/ReducedMotionProvider";
import { useLenis } from "@/components/features/LenisProvider";

const CINEMATIC_EASE = [0.75, 0, 0.25, 1] as const;

const fullVariants = {
  initial: { opacity: 0, y: -40, clipPath: "inset(0 0 100% 0)" },
  animate: { opacity: 1, y: 0, clipPath: "inset(0 0 0% 0)" },
  exit: { opacity: 0, y: 40, clipPath: "inset(100% 0 0% 0)" },
};

const reducedVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

export function TrailDescentTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const reducedMotion = useReducedMotion();
  const lenis = useLenis();

  useEffect(() => {
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    }
    if (typeof window !== "undefined") {
      window.scrollTo(0, 0);
    }
  }, [pathname, lenis]);

  const variants = reducedMotion ? reducedVariants : fullVariants;
  const transition = reducedMotion
    ? { duration: 0, ease: "linear" as const }
    : { duration: 1.2, ease: CINEMATIC_EASE };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        variants={variants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={transition}
        style={{ minHeight: "100vh" }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
