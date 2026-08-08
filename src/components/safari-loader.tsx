import { motion, AnimatePresence } from "framer-motion";

export function SafariLoader({ visible }: { visible: boolean }) {
  // A cinematic, premium loader sequence replacing the old UI
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="safari-loader"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.05,
            filter: "blur(12px)",
            transition: { duration: 1.0, ease: [0.76, 0, 0.24, 1] },
          }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden select-none bg-[#0a0f0a]"
        >
          {/* Subtle noise/texture overlay for a premium analog feel */}
          <div 
            className="absolute inset-0 opacity-[0.035] pointer-events-none mix-blend-overlay"
            style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')" }}
          />

          {/* Ambient lighting: Soft golden/terracotta sun-like glow behind the center */}
          <motion.div
            className="absolute rounded-full pointer-events-none"
            style={{ 
              width: "min(800px, 120vw)", 
              height: "min(800px, 120vw)", 
              background: "radial-gradient(circle, oklch(0.45 0.15 45 / 0.15) 0%, transparent 65%)" 
            }}
            initial={{ scale: 0.7, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 2.5, ease: "easeOut" }}
          />

          <div className="relative flex flex-col items-center z-10 w-full max-w-lg">
            {/* The "Sunrise / Horizon" Logo Reveal */}
            <div className="relative flex items-end justify-center w-full h-36 overflow-hidden mb-4">
              <motion.div
                initial={{ y: "100%", opacity: 0, scale: 0.95 }}
                animate={{ y: "-10%", opacity: 1, scale: 1 }}
                transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
                className="flex flex-col items-center pb-2"
              >
                {/* Elegant Glassmorphism Logo Ring */}
                <div className="relative flex items-center justify-center w-24 h-24 rounded-full border border-[oklch(1_0_0_/_0.08)] bg-[oklch(1_0_0_/_0.03)] backdrop-blur-xl shadow-[0_0_50px_oklch(0.56_0.17_40_/_0.15)] p-4">
                  {/* Subtle inner rotating ring for detail */}
                  <motion.div 
                    className="absolute inset-0 rounded-full border border-dashed border-white/10"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  />
                  <img src="/logo.png" alt="Udawalawe Wild" className="w-full h-full object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)]" />
                </div>
              </motion.div>
              
              {/* Layered horizon lines for a cinematic flare effect */}
              <motion.div 
                className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] w-3/4 bg-gradient-to-r from-transparent via-[oklch(0.65_0.2_45)] to-transparent blur-[3px]"
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: [0, 1, 0.7] }}
                transition={{ duration: 1.6, ease: [0.76, 0, 0.24, 1] }}
              />
              <motion.div 
                className="absolute bottom-0 left-1/2 -translate-x-1/2 h-px w-full bg-gradient-to-r from-transparent via-white/60 to-transparent"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.3, ease: [0.76, 0, 0.24, 1], delay: 0.1 }}
              />
            </div>

            {/* Typography Section with Staggered Mask Reveals */}
            <div className="overflow-hidden">
              <motion.h1
                initial={{ y: "100%", opacity: 0, filter: "blur(4px)" }}
                animate={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
                className="font-serif text-3xl sm:text-[2.5rem] tracking-[0.1em] text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50 py-1"
              >
                Udawalawe Wild
              </motion.h1>
            </div>
            
            <div className="overflow-hidden mt-3">
              <motion.div
                initial={{ y: "-100%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.6 }}
                className="flex items-center gap-4"
              >
                <span className="h-[1px] w-12 bg-gradient-to-r from-transparent to-white/20"></span>
                <span className="text-[9px] sm:text-[10px] font-semibold uppercase tracking-[0.4em] text-[oklch(0.7_0.15_45)]">
                  Sri Lanka
                </span>
                <span className="h-[1px] w-12 bg-gradient-to-l from-transparent to-white/20"></span>
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
