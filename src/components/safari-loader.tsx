import { motion, AnimatePresence } from "framer-motion";

/**
 * Safari Loader — cinematic full-screen intro.
 * Uses logo.png from /public, deep night-canopy background,
 * a pulsing glowing ring, and animated dust particles.
 */
export function SafariLoader({ visible }: { visible: boolean }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="safari-loader"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] },
          }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden"
          style={{ background: "oklch(0.15 0.06 150)" }}
        >
          {/* ── ambient radial glow ────────────────────────────────── */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 60% 55% at 50% 50%, oklch(0.28 0.08 150 / 0.4) 0%, transparent 70%)",
            }}
          />

          {/* ── floating dust particles ────────────────────────────── */}
          {Array.from({ length: 18 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                width: Math.random() * 3 + 1.5,
                height: Math.random() * 3 + 1.5,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                background:
                  i % 3 === 0
                    ? "oklch(0.72 0.09 52 / 0.55)"
                    : "oklch(0.85 0.02 78 / 0.3)",
              }}
              animate={{
                y: [0, -(Math.random() * 40 + 20), 0],
                opacity: [0, 0.8, 0],
                x: [(Math.random() - 0.5) * 20, (Math.random() - 0.5) * 30, (Math.random() - 0.5) * 10],
              }}
              transition={{
                duration: Math.random() * 3 + 2.5,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: "easeInOut",
              }}
            />
          ))}

          {/* ── centrepiece ───────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="relative flex flex-col items-center"
          >
            {/* Outer glow ring */}
            <motion.div
              className="absolute rounded-full"
              style={{
                width: 140,
                height: 140,
                border: "1.5px solid oklch(0.56 0.17 40 / 0.5)",
                boxShadow: "0 0 32px oklch(0.56 0.17 40 / 0.25), inset 0 0 20px oklch(0.34 0.09 150 / 0.15)",
              }}
              animate={{
                scale: [1, 1.08, 1],
                opacity: [0.6, 1, 0.6],
              }}
              transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Inner ring */}
            <motion.div
              className="absolute rounded-full"
              style={{
                width: 112,
                height: 112,
                border: "1px solid oklch(0.85 0.02 78 / 0.15)",
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            />

            {/* Logo */}
            <motion.div
              className="relative z-10 flex h-24 w-24 items-center justify-center rounded-full"
              style={{ background: "oklch(0.20 0.07 150 / 0.7)", backdropFilter: "blur(12px)" }}
            >
              <img
                src="/logo.png"
                alt="Udawalawe Wild"
                className="h-16 w-16 object-contain"
                style={{ filter: "drop-shadow(0 2px 12px oklch(0 0 0 / 0.4))" }}
              />
            </motion.div>
          </motion.div>

          {/* ── brand name ────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.45 }}
            className="mt-8 flex flex-col items-center gap-1"
          >
            <motion.p
              className="font-serif text-2xl tracking-[0.12em]"
              style={{ color: "oklch(0.93 0.035 76)" }}
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              Udawalawe Wild
            </motion.p>
            <p
              className="text-[10px] font-medium uppercase tracking-[0.28em]"
              style={{ color: "oklch(0.56 0.17 40)" }}
            >
              Sri Lanka
            </p>
          </motion.div>

          {/* ── progress dots ─────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mt-10 flex gap-2"
          >
            {[0, 1, 2, 3].map((i) => (
              <motion.div
                key={i}
                className="rounded-full"
                style={{
                  width: i === 1 || i === 2 ? 20 : 6,
                  height: 4,
                  background: "oklch(0.56 0.17 40 / 0.4)",
                }}
                animate={{
                  background: [
                    "oklch(0.56 0.17 40 / 0.25)",
                    "oklch(0.56 0.17 40 / 1)",
                    "oklch(0.56 0.17 40 / 0.25)",
                  ],
                  scaleX: [1, 1.15, 1],
                }}
                transition={{
                  duration: 1.4,
                  repeat: Infinity,
                  delay: i * 0.25,
                  ease: "easeInOut",
                }}
              />
            ))}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
