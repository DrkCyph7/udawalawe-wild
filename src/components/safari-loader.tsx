import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Binoculars, Leaf, Shield, Star } from "lucide-react";

const STATS = [
  { icon: Binoculars, label: "50+ Species" },
  { icon: Leaf, label: "Ethical Code" },
  { icon: Shield, label: "Verified Guides" },
  { icon: Star, label: "4.9 Rated" },
];

/* A few words of welcome — the two local languages first, then the most
   common visitor languages. */
const GREETINGS = [
  { text: "Ayubowan", lang: "Sinhala" },
  { text: "Vanakkam", lang: "Tamil" },
  { text: "Welcome", lang: "English" },
  { text: "Willkommen", lang: "German" },
  { text: "Bienvenue", lang: "French" },
  { text: "Welkom", lang: "Dutch" },
];

export function SafariLoader({ visible }: { visible: boolean }) {
  const [greetIdx, setGreetIdx] = useState(0);

  useEffect(() => {
    if (!visible) return;
    const id = setInterval(() => setGreetIdx((i) => (i + 1) % GREETINGS.length), 1050);
    return () => clearInterval(id);
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="safari-loader"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.03,
            filter: "blur(6px)",
            transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] },
          }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden select-none px-4"
          style={{ background: "oklch(0.14 0.055 150)" }}
        >
          {/* Deep radial glow — the only "light source", kept singular for restraint */}
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse 65% 55% at 50% 48%, oklch(0.26 0.075 150 / 0.55) 0%, transparent 70%)" }}
          />
          <motion.div
            className="absolute pointer-events-none"
            style={{ width: "min(480px, 85vw)", height: "min(480px, 85vw)", borderRadius: "50%", background: "radial-gradient(circle, oklch(0.56 0.17 40 / 0.06) 0%, transparent 70%)", left: "50%", top: "48%", transform: "translate(-50%,-50%)" }}
            animate={{ scale: [0.92, 1.08, 0.92], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Ambient dust — quiet, sparse, thinned further on mobile */}
          {Array.from({ length: 16 }).map((_, i) => (
            <motion.div key={i}
              className={`absolute rounded-full pointer-events-none ${i % 2 !== 0 ? "hidden sm:block" : ""}`}
              style={{
                width: 2 + (i % 2), height: 2 + (i % 2),
                left: `${(i * 41 + 9) % 100}%`, top: `${(i * 53 + 7) % 100}%`,
                background: i % 4 === 0 ? "oklch(0.72 0.09 52 / 0.5)" : "oklch(0.85 0.02 78 / 0.16)",
              }}
              animate={{ y: [0, -(24 + (i % 4) * 10), 0], opacity: [0, 0.6, 0] }}
              transition={{ duration: 4 + (i % 4), repeat: Infinity, delay: (i * 0.3) % 3, ease: "easeInOut" }}
            />
          ))}

          {/* Soft glass panel — grounds the composition instead of leaving
              everything floating loose in the dark */}
          <div
            className="relative flex flex-col items-center rounded-[2rem] px-8 py-10 sm:px-14 sm:py-14"
            style={{
              background: "oklch(1 0 0 / 0.025)",
              border: "1px solid oklch(1 0 0 / 0.06)",
              backdropFilter: "blur(2px)",
            }}
          >
            {/* Logo + ring centrepiece — scales as one unit across breakpoints */}
            <motion.div
              initial={{ opacity: 0, scale: 0.7, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
              className="relative flex flex-col items-center"
            >
              <div className="relative flex items-center justify-center scale-[0.66] sm:scale-90 md:scale-100">
                {/* Single sonar pulse — one clean pulse, not a barrage */}
                <motion.div
                  className="absolute rounded-full pointer-events-none"
                  style={{ width: 140, height: 140, border: "1px solid oklch(0.56 0.17 40 / 0.3)" }}
                  animate={{ scale: [1, 2.1], opacity: [0.4, 0] }}
                  transition={{ duration: 3.2, repeat: Infinity, ease: "easeOut" }}
                />

                {/* Compass tick ring — slow full rotation */}
                <motion.svg
                  className="absolute pointer-events-none"
                  style={{ width: 224, height: 224 }}
                  viewBox="0 0 224 224"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 48, repeat: Infinity, ease: "linear" }}
                >
                  {Array.from({ length: 12 }).map((_, i) => {
                    const angle = (i / 12) * 360;
                    const major = i % 3 === 0;
                    return (
                      <line
                        key={i}
                        x1="112" y1="6" x2="112" y2={major ? 16 : 11}
                        stroke={major ? "oklch(0.72 0.09 52 / 0.4)" : "oklch(0.56 0.17 40 / 0.2)"}
                        strokeWidth={major ? 1.5 : 1}
                        strokeLinecap="round"
                        transform={`rotate(${angle} 112 112)`}
                      />
                    );
                  })}
                </motion.svg>

                {/* Outer breathing ring */}
                <motion.div className="absolute rounded-full pointer-events-none"
                  style={{ width: 196, height: 196, border: "1px solid oklch(0.56 0.17 40 / 0.15)" }}
                  animate={{ scale: [1, 1.08, 1], opacity: [0.25, 0.5, 0.25] }}
                  transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut" }}
                />
                {/* Rotating dashed ring */}
                <motion.div className="absolute rounded-full pointer-events-none"
                  style={{ width: 164, height: 164, border: "1px dashed oklch(0.56 0.17 40 / 0.25)" }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
                />
                {/* Glow ring */}
                <motion.div className="absolute rounded-full pointer-events-none"
                  style={{ width: 138, height: 138, border: "1.5px solid oklch(0.56 0.17 40 / 0.45)", boxShadow: "0 0 28px oklch(0.56 0.17 40 / 0.16), inset 0 0 18px oklch(0.34 0.09 150 / 0.1)" }}
                  animate={{ scale: [1, 1.05, 1], opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
                />
                {/* Inner counter-rotating ring */}
                <motion.div className="absolute rounded-full pointer-events-none"
                  style={{ width: 110, height: 110, border: "1px solid oklch(0.85 0.02 78 / 0.08)" }}
                  animate={{ rotate: -360 }}
                  transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                />

                {/* Orbiting primary dot */}
                <motion.div className="absolute pointer-events-none" style={{ width: 8, height: 8 }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
                >
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: "oklch(0.56 0.17 40)", transform: "translateX(76px)", boxShadow: "0 0 10px oklch(0.56 0.17 40 / 0.7)" }} />
                </motion.div>
                {/* Orbiting secondary dot */}
                <motion.div className="absolute pointer-events-none" style={{ width: 5, height: 5 }}
                  animate={{ rotate: -360 }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                >
                  <div style={{ width: 4, height: 4, borderRadius: "50%", background: "oklch(0.72 0.09 52)", transform: "translateX(55px)", boxShadow: "0 0 7px oklch(0.72 0.09 52 / 0.6)" }} />
                </motion.div>

                {/* Logo */}
                <motion.div
                  className="relative z-10 flex h-24 w-24 items-center justify-center rounded-full"
                  style={{ background: "oklch(0.20 0.07 150 / 0.85)", backdropFilter: "blur(16px)", border: "1px solid oklch(1 0 0 / 0.1)" }}
                  animate={{ boxShadow: ["0 0 18px oklch(0.56 0.17 40 / 0.18)", "0 0 42px oklch(0.56 0.17 40 / 0.45), 0 0 80px oklch(0.56 0.17 40 / 0.12)", "0 0 18px oklch(0.56 0.17 40 / 0.18)"] }}
                  transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
                >
                  <img src="/logo.png" alt="Udawalawe Wild" className="h-16 w-16 object-contain"
                    style={{ filter: "drop-shadow(0 2px 14px oklch(0 0 0 / 0.5))" }}
                  />
                </motion.div>
              </div>
            </motion.div>

            {/* Multilingual greeting cycler */}
            <div className="mt-6 sm:mt-7 h-8 sm:h-9 relative flex flex-col items-center justify-center overflow-hidden" style={{ minWidth: 160 }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={GREETINGS[greetIdx].text}
                  initial={{ opacity: 0, y: 10, filter: "blur(3px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -10, filter: "blur(3px)" }}
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute flex flex-col items-center gap-0.5"
                >
                  <span className="font-serif italic text-lg sm:text-xl" style={{ color: "oklch(0.87 0.05 65)" }}>
                    {GREETINGS[greetIdx].text}
                  </span>
                  <span className="text-[8px] font-semibold uppercase tracking-[0.28em]" style={{ color: "oklch(0.56 0.17 40 / 0.75)" }}>
                    {GREETINGS[greetIdx].lang}
                  </span>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Brand name */}
            <motion.div
              initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.55 }}
              className="mt-2 flex flex-col items-center gap-1.5"
            >
              <p className="font-serif text-xl sm:text-2xl tracking-[0.1em] shimmer-text">Udawalawe Wild</p>
              <p className="text-[8px] sm:text-[9px] font-semibold uppercase tracking-[0.28em] sm:tracking-[0.3em] text-center"
                style={{ color: "oklch(0.56 0.17 40 / 0.85)" }}
              >
                Private Safaris · Sri Lanka
              </p>
            </motion.div>

            {/* Stat pills */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.0, duration: 0.5 }}
              className="mt-7 sm:mt-8 flex flex-wrap justify-center gap-2 sm:gap-2.5 max-w-[280px] sm:max-w-none"
            >
              {STATS.map(({ icon: Icon, label }, i) => (
                <motion.div key={label}
                  initial={{ opacity: 0, y: 10, scale: 0.92 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: 1.1 + i * 0.08, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="flex flex-col items-center gap-1.5 px-2.5 py-2 sm:px-3 rounded-xl"
                  style={{ background: "oklch(1 0 0 / 0.04)", border: "1px solid oklch(1 0 0 / 0.07)" }}
                >
                  <Icon className="h-3 w-3 sm:h-3.5 sm:w-3.5" style={{ color: "oklch(0.56 0.17 40)" }} />
                  <span className="text-[8px] sm:text-[9px] font-semibold uppercase tracking-[0.14em] whitespace-nowrap" style={{ color: "oklch(0.72 0.03 76)" }}>
                    {label}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Progress bar — a single quiet sweep, not a loop of gimmicks */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
            className="absolute bottom-0 left-0 right-0 h-[2px]" style={{ background: "oklch(1 0 0 / 0.04)" }}
          >
            <motion.div className="h-full"
              style={{ background: "linear-gradient(90deg, oklch(0.34 0.09 150) 0%, oklch(0.56 0.17 40) 55%, oklch(0.72 0.09 52) 100%)", boxShadow: "0 0 10px oklch(0.56 0.17 40 / 0.5)" }}
              initial={{ scaleX: 0, transformOrigin: "left" }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.9, ease: [0.37, 0, 0.63, 1], delay: 0.2 }}
            />
          </motion.div>

          {/* Viewfinder corner brackets — static, reads as a camera/scope
              reticle rather than a looping HUD effect */}
          {([
            "top-4 left-4",
            "top-4 right-4 rotate-90",
            "bottom-4 left-4 -rotate-90",
            "bottom-4 right-4 rotate-180",
          ]).map((cls) => (
            <motion.div key={cls} className={`absolute ${cls} w-7 h-7 sm:w-9 sm:h-9 pointer-events-none`}
              initial={{ opacity: 0 }} animate={{ opacity: 0.35 }} transition={{ delay: 0.5, duration: 0.8 }}
            >
              <svg viewBox="0 0 40 40" fill="none">
                <path d="M 2 2 L 2 14" stroke="oklch(0.85 0.02 78 / 0.6)" strokeWidth="1.25" strokeLinecap="round" />
                <path d="M 2 2 L 14 2" stroke="oklch(0.85 0.02 78 / 0.6)" strokeWidth="1.25" strokeLinecap="round" />
              </svg>
            </motion.div>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
