import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("relative overflow-hidden rounded-md bg-[oklch(1_0_0_/_0.05)]", className)}
      {...props}
    >
      <motion.div
        className="absolute inset-0 z-10"
        style={{
          background:
            "linear-gradient(90deg, transparent, oklch(1 0 0 / 0.08), transparent)",
        }}
        animate={{ x: ["-100%", "200%"] }}
        transition={{
          repeat: Infinity,
          duration: 1.5,
          ease: "linear",
          repeatDelay: 0.2,
        }}
      />
    </div>
  );
}

export { Skeleton };
