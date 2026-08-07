import { motion, AnimatePresence } from "framer-motion";
import { Binoculars, Leaf, Shield, Star } from "lucide-react";

const STATS = [
  { icon: Binoculars, label: "50+ Species" },
  { icon: Leaf,       label: "Ethical Code" },
  { icon: Shield,     label: "Verified Guides" },
  { icon: Star,       label: "4.9 Rated" },
];

export function SafariLoader({ visible }: { visible: boolean }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="safari-loader"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.04,
            filter: "blur(8px)",
            transition: { duration: 1.1, ease: [0.76, 0, 0.24, 1] },
          }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden select-none"
          style={{ background: "oklch(0.14 0.055 150)" }}
        >
          {/* Scan line CRT effect */}
          <motion.div
            className="absolute inset-x-0 h-px pointer-events-none"
            style={{ background: "oklch(0.56 0.17 40 / 0.12)", top: 0 }}
            animate={{ top: ["0%", "100%"] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear", repeatDelay: 1 }}
          />

          {/* Deep radial glow */}
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse 70% 60% at 50% 50%, oklch(0.28 0.08 150 / 0.5) 0%, transparent 70%)" }}
          />
          <motion.div
            className="absolute pointer-events-none"
            style={{ width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, oklch(0.56 0.17 40 / 0.07) 0%, transparent 70%)", left: "50%", top: "50%", transform: "translate(-50%,-50%)" }}
            animate={{ scale: [0.9, 1.15, 0.9], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Dust particles */}
          {Array.from({ length: 24 }).map((_, i) => (
            <motion.div key={i} className="absolute rounded-full pointer-events-none"
              style={{
                width: 2 + (i % 3), height: 2 + (i % 3),
                left: `${(i * 37 + 11) % 100}%`, top: `${(i * 53 + 7) % 100}%`,
                background: i % 4 === 0 ? "oklch(0.72 0.09 52 / 0.7)" : i % 3 === 0 ? "oklch(0.56 0.17 40 / 0.5)" : "oklch(0.85 0.02 78 / 0.25)",
              }}
              animate={{ y: [0, -(30 + (i % 5) * 12), 0], opacity: [0, 0.9, 0], x: [(i % 2 === 0 ? -15 : 15), (i % 2 === 0 ? 20 : -20), 0] }}
              transition={{ duration: 3 + (i % 4), repeat: Infinity, delay: (i * 0.22) % 2.5, ease: "easeInOut" }}
            />
          ))}

          {/* Logo + ring centrepiece */}
          <motion.div
            initial={{ opacity: 0, scale: 0.7, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
            className="relative flex flex-col items-center"
          >
            {/* Outer breathing ring */}
            <motion.div className="absolute rounded-full pointer-events-none"
              style={{ width: 200, height: 200, border: "1px solid oklch(0.56 0.17 40 / 0.18)" }}
              animate={{ scale: [1, 1.12, 1], opacity: [0.3, 0.65, 0.3] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
            />
            {/* Rotating dashed ring */}
            <motion.div className="absolute rounded-full pointer-events-none"
              style={{ width: 168, height: 168, border: "1px dashed oklch(0.56 0.17 40 / 0.32)" }}
              animate={{ rotate: 360 }}
              transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
            />
            {/* Glow ring */}
            <motion.div className="absolute rounded-full pointer-events-none"
              style={{ width: 140, height: 140, border: "1.5px solid oklch(0.56 0.17 40 / 0.55)", boxShadow: "0 0 32px oklch(0.56 0.17 40 / 0.2), inset 0 0 20px oklch(0.34 0.09 150 / 0.1)" }}
              animate={{ scale: [1, 1.06, 1], opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            />
            {/* Inner counter-rotating ring */}
            <motion.div className="absolute rounded-full pointer-events-none"
              style={{ width: 112, height: 112, border: "1px solid oklch(0.85 0.02 78 / 0.1)" }}
              animate={{ rotate: -360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            />

            {/* Orbiting primary dot */}
            <motion.div className="absolute pointer-events-none" style={{ width: 8, height: 8 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
            >
              <div style={{ width: 7, height: 7, borderRadius: "50%", background: "oklch(0.56 0.17 40)", transform: "translateX(78px)", boxShadow: "0 0 12px oklch(0.56 0.17 40 / 0.8)" }} />
            </motion.div>
            {/* Orbiting secondary dot */}
            <motion.div className="absolute pointer-events-none" style={{ width: 5, height: 5 }}
              animate={{ rotate: -360 }}
              transition={{ duration: 9, repeat: Infinity, ease: "linear" }}
            >
              <div style={{ width: 4, height: 4, borderRadius: "50%", background: "oklch(0.72 0.09 52)", transform: "translateX(56px)", boxShadow: "0 0 8px oklch(0.72 0.09 52 / 0.7)" }} />
            </motion.div>

            {/* Logo */}
            <motion.div
              className="relative z-10 flex h-24 w-24 items-center justify-center rounded-full"
              style={{ background: "oklch(0.20 0.07 150 / 0.85)", backdropFilter: "blur(16px)", border: "1px solid oklch(1 0 0 / 0.1)" }}
              animate={{ boxShadow: ["0 0 20px oklch(0.56 0.17 40 / 0.2)", "0 0 50px oklch(0.56 0.17 40 / 0.55), 0 0 100px oklch(0.56 0.17 40 / 0.15)", "0 0 20px oklch(0.56 0.17 40 / 0.2)"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <img src="/logo.png" alt="Udawalawe Wild" className="h-16 w-16 object-contain"
                style={{ filter: "drop-shadow(0 2px 16px oklch(0 0 0 / 0.5))" }}
              />
            </motion.div>
          </motion.div>

          {/* Brand name shimmer */}
          <motion.div
            initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.55 }}
            className="mt-9 flex flex-col items-center gap-1.5"
          >
            <p className="font-serif text-2xl tracking-[0.12em] shimmer-text">Udawalawe Wild</p>
            <motion.p className="text-[9px] font-semibold uppercase tracking-[0.32em]"
              style={{ color: "oklch(0.56 0.17 40)" }}
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            >
              Private Safaris · Sri Lanka
            </motion.p>
          </motion.div>

          {/* Stat pills with Lucide icons */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.0, duration: 0.5 }}
            className="mt-8 flex gap-2.5"
          >
            {STATS.map(({ icon: Icon, label }, i) => (
              <motion.div key={label}
                initial={{ opacity: 0, y: 12, scale: 0.88 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 1.1 + i * 0.1, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col items-center gap-1.5 px-3 py-2 rounded-xl"
                style={{ background: "oklch(1 0 0 / 0.05)", border: "1px solid oklch(1 0 0 / 0.08)", backdropFilter: "blur(12px)" }}
              >
                <Icon className="h-3.5 w-3.5" style={{ color: "oklch(0.56 0.17 40)" }} />
                <span className="text-[9px] font-semibold uppercase tracking-[0.14em] whitespace-nowrap" style={{ color: "oklch(0.72 0.03 76)" }}>
                  {label}
                </span>
              </motion.div>
            ))}
          </motion.div>

          {/* Progress bar */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
            className="absolute bottom-0 left-0 right-0 h-[2px]" style={{ background: "oklch(1 0 0 / 0.04)" }}
          >
            <motion.div className="h-full"
              style={{ background: "linear-gradient(90deg, oklch(0.34 0.09 150) 0%, oklch(0.56 0.17 40) 55%, oklch(0.72 0.09 52) 100%)", boxShadow: "0 0 12px oklch(0.56 0.17 40 / 0.6)" }}
              initial={{ scaleX: 0, transformOrigin: "left" }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.75, ease: [0.37, 0, 0.63, 1], delay: 0.2 }}
            />
          </motion.div>

          {/* Corner bracket accents */}
          {([
            [0, "top-3 left-3",   0],
            [1, "top-3 right-3",  90],
            [2, "bottom-3 left-3",  270],
            [3, "bottom-3 right-3", 180],
          ] as [number, string, number][]).map(([i, cls, rot]) => (
            <motion.div key={i} className={`absolute ${cls} w-10 h-10 pointer-events-none`}
              initial={{ opacity: 0 }} animate={{ opacity: 0.5 }} transition={{ delay: 0.3 + i * 0.08 }}
            >
              <svg viewBox="0 0 40 40" fill="none" style={{ transform: `rotate(${rot}deg)` }}>
                <path d="M 2 2 L 2 14" stroke="oklch(0.56 0.17 40 / 0.7)" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M 2 2 L 14 2" stroke="oklch(0.56 0.17 40 / 0.7)" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </motion.div>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}


