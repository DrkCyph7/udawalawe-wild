import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TransitionLink as Link } from "@/components/transition-link";
import { Cookie, X } from "lucide-react";

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem("udawalawe_cookie_consent");
    if (!consent) {
      // Small delay so it doesn't pop up instantly on page load
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("udawalawe_cookie_consent", "accepted");
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem("udawalawe_cookie_consent", "declined");
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-5 left-5 z-50 max-w-[340px] rounded-2xl border border-white/10 bg-[oklch(0.22_0.02_135)]/90 p-5 text-[oklch(0.94_0.01_100)] shadow-2xl backdrop-blur-xl sm:bottom-6 sm:left-6"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-accent/20 text-accent">
                <Cookie className="h-5 w-5" />
              </div>
              <h3 className="font-serif text-lg font-medium tracking-tight">
                We value your privacy
              </h3>
            </div>
            <button
              onClick={handleDecline}
              className="text-white/50 transition-colors hover:text-white"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <p className="mt-4 text-sm leading-relaxed text-white/70">
            We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. 
            By clicking "Accept", you consent to our use of cookies.
          </p>

          <div className="mt-5 flex items-center gap-3">
            <button
              onClick={handleAccept}
              className="flex-1 rounded-full bg-accent px-4 py-2.5 text-sm font-semibold text-[oklch(0.22_0.02_135)] transition-transform hover:scale-105 active:scale-95"
            >
              Accept
            </button>
            <button
              onClick={handleDecline}
              className="flex-1 rounded-full border border-white/20 bg-white/5 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-white/10 active:scale-95"
            >
              Decline
            </button>
          </div>

          <div className="mt-4 text-center">
            <Link
              to="/privacy"
              className="text-xs text-white/50 underline underline-offset-2 transition-colors hover:text-white"
            >
              Read our Privacy Policy
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
