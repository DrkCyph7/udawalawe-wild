"use client";

import * as React from "react";
import { motion, Variants } from "motion/react";
import { cn } from "@/lib/utils";

interface StaggeredHeroProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  subtitle?: string;
  staggerDelay?: number;
  wordDelay?: number;
}

export function StaggeredHero({
  title,
  subtitle,
  staggerDelay = 0.2,
  wordDelay = 0.05,
  className,
  children,
  ...props
}: StaggeredHeroProps) {
  // Split title into words to stagger them individually
  const titleWords = title.split(" ");

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: wordDelay,
        delayChildren: staggerDelay,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const subVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        delay: staggerDelay + titleWords.length * wordDelay + 0.2,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className={cn("flex flex-col", className)} {...props}>
      <motion.h1
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="font-serif leading-[1.05] text-[2.5rem] sm:text-5xl md:text-6xl lg:text-7xl xl:text-[5.5rem] flex flex-wrap m-0"
      >
        {titleWords.map((word, idx) => (
          <motion.span key={idx} variants={itemVariants} className="inline-block mr-[0.25em]">
            {word}
          </motion.span>
        ))}
      </motion.h1>

      {subtitle && (
        <motion.p
          variants={subVariants}
          initial="hidden"
          animate="visible"
          className="mt-6 max-w-lg text-base leading-relaxed sm:text-lg"
          style={{ color: "oklch(0.98 0.005 95 / 0.75)" }}
        >
          {subtitle}
        </motion.p>
      )}

      {children && (
        <motion.div variants={subVariants} initial="hidden" animate="visible">
          {children}
        </motion.div>
      )}
    </div>
  );
}
