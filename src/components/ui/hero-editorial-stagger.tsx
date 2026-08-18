"use client";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * HeroEditorialStagger:
 * A container that orchestrates a sequential reveal of its children.
 * Replicates the popular "Motion UI" editorial stagger effect.
 */
export function HeroEditorialStagger({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.15,
            delayChildren: delay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * HeroLine:
 * Wraps text in an overflow-hidden container and reveals it by sliding up
 * and fading in simultaneously, creating an editorial, high-impact feel.
 */
export function HeroLine({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className="overflow-hidden pb-1">
      <motion.div
        variants={{
          hidden: { y: "110%", opacity: 0, rotateZ: 3 },
          visible: {
            y: "0%",
            opacity: 1,
            rotateZ: 0,
            transition: { duration: 1.0, ease: [0.22, 1, 0.36, 1] },
          },
        }}
        className={className}
      >
        {children}
      </motion.div>
    </div>
  );
}

/**
 * HeroFadeIn:
 * A simple coordinated fade-up for secondary hero elements like subtext or CTAs.
 * Synchronizes with the HeroEditorialStagger container.
 */
export function HeroFadeIn({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 1.0, ease: [0.22, 1, 0.36, 1] },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
