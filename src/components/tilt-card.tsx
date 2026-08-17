import { useRef, ReactNode } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

/* ═══════════════════ 3D TILT CARD ══════════════════════════════════════ */
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

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: prefersReducedMotion ? 0 : springX,
        rotateY: prefersReducedMotion ? 0 : springY,
        transformPerspective: 1000,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
