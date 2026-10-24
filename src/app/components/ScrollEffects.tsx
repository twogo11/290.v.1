"use client";

import { createContext, useContext, useRef, type ReactNode } from "react";
import { motion, useScroll, useSpring, useTransform, type MotionValue } from "framer-motion";

export const MotionModeContext = createContext(true);
export function useMotionMode() { return useContext(MotionModeContext); }

export function useSoftProgress(progress: MotionValue<number>) {
  return useSpring(progress, { stiffness: 220, damping: 38, mass: 0.3, restDelta: 0.0001, restSpeed: 0.0001 });
}

export function ScrollReveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const enabled = useMotionMode();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const progress = useSoftProgress(scrollYProgress);
  const y = useTransform(progress, [0, 0.25], [42, 0]);
  const opacity = useTransform(progress, [0, 0.2], [0.35, 1]);
  return <motion.div ref={ref} className={"scroll-reveal " + className} style={{ y: enabled ? y : 0, opacity: enabled ? opacity : 1 }}>{children}</motion.div>;
}
