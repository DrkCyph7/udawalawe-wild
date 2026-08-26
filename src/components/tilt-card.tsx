"use client";
import { useRef, ReactNode } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

/* ------------------- 3D TILT CARD -------------------------------------- */
/* Mouse-tracked, spring-smoothed 3D tilt. Disabled automatically when the
   viewer prefers reduced motion, and effectively inert on touch devices
   since there's no continuous mousemove to drive it. */
export function TiltCard({
  children,
  className = "",
  intensity = 8,
}: {
  children: ReactNode;
  className?: string;
  intensity?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, { stiffness: 260, damping: 24, mass: 0.4 });
  const springY = useSpring(rotateY, { stiffness: 260, damping: 24, mass: 0.4 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    rotateY.set((px - 0.5) * intensity);
    rotateX.set((0.5 - py) * intensity);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  // On touch/mobile devices or reduced motion — bypass the 3d rotation entirely.
  // TiltCard effect is mouse-only and mounts springs for zero benefit on touch, saving CPU/battery.
  // Note: we can't completely replace the DOM element due to hydration mismatch, so we just pass static 0s to the style tag.
  const isTouchDevice =
    typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches;

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: isTouchDevice || prefersReducedMotion ? 0 : springX,
        rotateY: isTouchDevice || prefersReducedMotion ? 0 : springY,
        transformPerspective: 1000,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
