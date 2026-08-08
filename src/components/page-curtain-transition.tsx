/* ════════════════════════════════════════════════════════════════════════
   PAGE CURTAIN — redirect from the loader into the home page

   Two options are included below. Use whichever matches what you actually
   have installed:

   OPTION A — Official @motion/page-curtain (requires Motion+)
     The real command is singular: `npx shadcn@latest add @motion/page-curtain`
     (not "page-curtains"). It ships as part of Motion UI, which is gated
     behind a paid Motion+ membership — the install needs an access token
     wired into your components.json registry config (see motion.dev/ui/install).
     I can't run that install or generate you a token from here, so Option A
     is written against the *real* documented API (verified against
     motion.dev/ui/components/page-curtain) for you to drop in once you have
     it installed.

   OPTION B — CurtainTransition (no extra dependency, works today)
     A self-built version of the same mechanic — cover the screen, swap
     content while fully hidden, reveal — using Motion, which you already
     have in this project. Same diagonal skewed wipe, same themed colours,
     same title-riding-the-curtain feel. This is the one to wire up right
     now; swap to Option A later if you pick up Motion+.
   ════════════════════════════════════════════════════════════════════════ */

/* ─────────────────────────────────────────────────────────────────────────
   OPTION A — Official Motion+ component
   Install first: npx shadcn@latest add @motion/page-curtain
───────────────────────────────────────────────────────────────────────── */

/*
import { useEffect } from "react";
import {
  PageCurtainStage,
  PageCurtainContent,
  usePageCurtain,
} from "@/components/motion/page-curtain"; // path shadcn writes it to
import { SafariLoader } from "@/components/safari-loader";
import Home from "@/routes";

export function AppWithOfficialCurtain() {
  // titles[0] paints onto the curtain as it wipes in for the loader "page",
  // titles[1] paints on as it wipes in over home.
  const { page, isPending, go, ref } = usePageCurtain({
    titles: ["Loading", "Udawalawe Wild"],
    angle: 9,
    initial: 0,
  });

  // Trigger the wipe once the loader's own choreography has had time to play.
  useEffect(() => {
    if (page !== 0) return;
    const timer = setTimeout(() => go(1), 2600);
    return () => clearTimeout(timer);
  }, [page, go]);

  return (
    <PageCurtainStage
      ref={ref}
      announce={page === 0 ? "Loading" : "Udawalawe Wild home page"}
    >
      <PageCurtainContent>
        {page === 0 ? <SafariLoader visible /> : <Home />}
      </PageCurtainContent>
    </PageCurtainStage>
  );
}
*/

/* ─────────────────────────────────────────────────────────────────────────
   OPTION B — Dependency-free fallback (use this today)
───────────────────────────────────────────────────────────────────────── */

import { useCallback, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type CurtainPhase = "idle" | "covering" | "revealing";

/**
 * Drives a cover → swap-content-while-hidden → reveal transition.
 * Call `run(swapFn)` once your loader decides it's time to navigate home;
 * `swapFn` runs at the exact moment the curtain has fully covered the
 * screen, so the swap is invisible to the visitor — same guarantee the
 * real curtains() gives you.
 */
export function usePageCurtainTransition() {
  const [phase, setPhase] = useState<CurtainPhase>("idle");
  const [pendingSwap, setPendingSwap] = useState<(() => void) | null>(null);

  const run = useCallback((swapContent: () => void) => {
    setPendingSwap(() => swapContent);
    setPhase("covering");
  }, []);

  const handleCoverComplete = useCallback(() => {
    pendingSwap?.();
    setPendingSwap(null);
    setPhase("revealing");
  }, [pendingSwap]);

  const handleRevealComplete = useCallback(() => {
    setPhase("idle");
  }, []);

  return { phase, run, handleCoverComplete, handleRevealComplete };
}

export function CurtainTransition({
  phase,
  title = "Udawalawe Wild",
  angle = 9,
  onCoverComplete,
  onRevealComplete,
}: {
  phase: CurtainPhase;
  title?: string;
  angle?: number;
  onCoverComplete?: () => void;
  onRevealComplete?: () => void;
}) {
  return (
    <AnimatePresence>
      {phase !== "idle" && (
        <motion.div
          key="page-curtain"
          className="fixed inset-y-0 z-[10000] pointer-events-none flex items-center justify-center overflow-hidden"
          style={{
            left: "-25vw",
            width: "150vw",
            background: "linear-gradient(135deg, oklch(0.15 0.055 150) 0%, oklch(0.2 0.06 148) 100%)",
            transform: `skewX(-${angle}deg)`,
            boxShadow: "0 0 80px oklch(0 0 0 / 0.4)",
          }}
          initial={{ x: "-100%" }}
          animate={{ x: phase === "covering" ? "0%" : "100%" }}
          exit={{ x: "100%" }}
          transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
          onAnimationComplete={() => {
            if (phase === "covering") onCoverComplete?.();
            if (phase === "revealing") onRevealComplete?.();
          }}
          role="presentation"
          aria-hidden="true"
        >
          <motion.h2
            className="font-serif italic text-5xl md:text-7xl lg:text-8xl whitespace-nowrap tracking-tight"
            style={{ 
              transform: `skewX(${angle}deg)`, 
              color: "oklch(0.93 0.035 76)",
              textShadow: "0 10px 30px oklch(0 0 0 / 0.5)"
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: phase === "covering" ? 1 : 0 }}
            transition={{ duration: 0.35, delay: phase === "covering" ? 0.35 : 0 }}
          >
            {title}
          </motion.h2>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   Example wiring — SafariLoader → CurtainTransition → Home
───────────────────────────────────────────────────────────────────────── */

/*
import { useEffect, useState } from "react";
import { SafariLoader } from "@/components/safari-loader";
import Home from "@/routes";
import { usePageCurtainTransition, CurtainTransition } from "@/components/page-curtain-transition";

export function AppRoot() {
  const [showLoader, setShowLoader] = useState(true);
  const [showHome, setShowHome] = useState(false);
  const { phase, run, handleCoverComplete, handleRevealComplete } = usePageCurtainTransition();

  useEffect(() => {
    // Let the loader's own choreography (rings, greeting cycler, stat pills)
    // finish playing before the curtain takes over.
    const timer = setTimeout(() => {
      run(() => {
        setShowLoader(false);
        setShowHome(true);
      });
    }, 2600);
    return () => clearTimeout(timer);
  }, [run]);

  return (
    <>
      <SafariLoader visible={showLoader} />
      {showHome && <Home />}
      <CurtainTransition
        phase={phase}
        title="Udawalawe Wild"
        onCoverComplete={handleCoverComplete}
        onRevealComplete={handleRevealComplete}
      />
    </>
  );
}
*/
