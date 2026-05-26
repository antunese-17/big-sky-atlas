"use client";

import {
  createContext,
  useContext,
  type ReactNode,
} from "react";
import { useReducedMotion as useFramerReducedMotion } from "framer-motion";

type ReducedMotionContextValue = {
  reducedMotion: boolean;
};

const ReducedMotionContext = createContext<ReducedMotionContextValue>({
  reducedMotion: false,
});

export function ReducedMotionProvider({ children }: { children: ReactNode }) {
  const detected = useFramerReducedMotion();
  const reducedMotion = detected ?? false;

  return (
    <ReducedMotionContext.Provider value={{ reducedMotion }}>
      {children}
    </ReducedMotionContext.Provider>
  );
}

export function useReducedMotion(): boolean {
  return useContext(ReducedMotionContext).reducedMotion;
}
