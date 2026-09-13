"use client";
import { cn } from "@/lib/utils";
import { HTMLMotionProps, motion } from "framer-motion";
import React from "react";

export function Skeleton({ className, ...props }: HTMLMotionProps<"div">) {
  return (
    <motion.div
      className={cn(
        "relative overflow-hidden rounded-xl bg-[oklch(0.22_0.02_135_/_0.15)] shadow-inner",
        className,
      )}
      initial={{ opacity: 0.6 }}
      animate={{ opacity: 1 }}
      transition={{
        repeat: Infinity,
        repeatType: "reverse",
        duration: 1.2,
        ease: "easeInOut",
      }}
      {...props}
    >
      {/* Sweeping shimmer effect */}
      <motion.div
        className="absolute inset-0 -translate-x-full"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, oklch(1 0 0 / 0.12) 50%, transparent 100%)",
        }}
        animate={{ x: ["-100%", "200%"] }}
        transition={{
          repeat: Infinity,
          duration: 1.8,
          ease: "easeInOut",
          repeatDelay: 0.2,
        }}
      />
    </motion.div>
  );
}
