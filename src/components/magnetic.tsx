"use client";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { useRef, ReactNode } from "react";

// Detect touch/mobile at module level (SSR safe)
const isTouchDevice =
  typeof window !== "undefined" &&
  window.matchMedia("(pointer: coarse)").matches;

export function Magnetic({
  children,
  intensity = 0.2,
  jelly = true,
  className = "",
}: {
  children: ReactNode;
  intensity?: number;
  jelly?: boolean;
  className?: string;
}) {
  const prefersReducedMotion = useReducedMotion();

  // On touch/mobile devices or reduced motion — render as a plain wrapper.
  // Magnetic effect is mouse-only and mounts 5 springs for zero benefit on touch.
  if (isTouchDevice || prefersReducedMotion) {
    return <div className={`inline-flex ${className}`}>{children}</div>;
  }

  return <MagneticInner intensity={intensity} jelly={jelly} className={className}>{children}</MagneticInner>;
}

function MagneticInner({
  children,
  intensity = 0.2,
  jelly = true,
  className = "",
}: {
  children: ReactNode;
  intensity?: number;
  jelly?: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const scale = useMotionValue(1);
  const scaleX = useMotionValue(1);
  const scaleY = useMotionValue(1);

  const springConfig = { damping: 12, stiffness: 200, mass: 0.1 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);
  const springScale = useSpring(scale, springConfig);
  const springScaleX = useSpring(scaleX, springConfig);
  const springScaleY = useSpring(scaleY, springConfig);

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    x.set(middleX * intensity);
    y.set(middleY * intensity);
    if (jelly) {
      const absX = Math.abs(middleX) / (width / 2);
      const absY = Math.abs(middleY) / (height / 2);
      scaleX.set(1 + absX * 0.05);
      scaleY.set(1 + absY * 0.05);
    }
  };

  const handleEnter = () => scale.set(1.05);
  const handleLeave = () => {
    x.set(0);
    y.set(0);
    scale.set(1);
    scaleX.set(1);
    scaleY.set(1);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      style={{
        x: springX,
        y: springY,
        scale: springScale,
        scaleX: springScaleX,
        scaleY: springScaleY,
      }}
      className={`inline-flex ${className}`}
    >
      {children}
    </motion.div>
  );
}
