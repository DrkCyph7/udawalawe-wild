"use client";
import { motion, useReducedMotion } from "framer-motion";

type Direction = "up" | "down" | "left" | "right" | "scale";

export function Reveal({
  children,
  delay = 0,
  className = "",
  direction = "up",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  direction?: Direction;
}) {
  const prefersReducedMotion = useReducedMotion();
  const offset = 28;
  const delayS = delay / 1000;

  // No blur on mobile — blur() is GPU-heavy and causes scroll jank.
  // We detect mobile by checking if pointer is coarse (touch device).
  // SSR-safe: we skip blur on the server side entirely.
  const isTouchDevice =
    typeof window !== "undefined" &&
    window.matchMedia("(pointer: coarse)").matches;

  const variants = {
    hidden: {
      opacity: 0,
      y: direction === "up" ? offset : direction === "down" ? -offset : 0,
      x: direction === "left" ? -offset : direction === "right" ? offset : 0,
      scale: direction === "scale" ? 0.95 : 1,
      // Removed filter: blur entirely for extreme performance improvement on mobile scrolling.
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
      transition: {
        duration: prefersReducedMotion ? 0.01 : 0.7,
        delay: prefersReducedMotion ? 0 : delayS,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      },
    },
  } as const;

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
