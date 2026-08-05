import { motion } from "framer-motion";

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
  const variants = {
    hidden: {
      opacity: 0,
      y: direction === "up" ? 32 : direction === "down" ? -32 : 0,
      x: direction === "left" ? -32 : direction === "right" ? 32 : 0,
      scale: direction === "scale" ? 0.94 : 1,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1], // easeOutQuint for smooth deceleration
        delay: delay / 1000,
      },
    },
  };

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-70px" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
