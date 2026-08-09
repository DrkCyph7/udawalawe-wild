import { motion } from "framer-motion";
import { useEffect, useState } from "react";

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
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const offset = 36;
  const delayS = delay / 1000;

  const variants = {
    hidden: {
      opacity: 0,
      y: direction === "up" ? offset : direction === "down" ? -offset : 0,
      x: direction === "left" ? -offset : direction === "right" ? offset : 0,
      scale: direction === "scale" ? 0.93 : 1,
      filter: "blur(6px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        duration: 0.9,
        delay: delayS,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      },
    },
  } as const;

  if (!isMounted) {
    return (
      <div className={className} style={{ opacity: 1, filter: "blur(0px)", transform: "none" }}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
