"use client";

import { useState, useCallback, useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { Star, Quote, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Review = {
  id: string;
  name: string;
  text: string;
  rating: number;
  date: string;
  photoUrl: string | null;
};

export function ReviewCarousel({ allReviews }: { allReviews: Review[] }) {
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);

  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const openReview = useCallback((r: Review) => setSelectedReview(r), []);
  const closeReview = useCallback(() => setSelectedReview(null), []);

  return (
    <>
      {/* ── Infinite marquee track ─────────────────────────────────────── */}
      <div className="select-none" aria-label="Guest reviews carousel">
        <div
          className="reviews-track"
          style={{ animationPlayState: selectedReview ? "paused" : undefined }}
        >
          {allReviews.map((r, i) => (
            <button
              key={i}
              onClick={() => openReview(r)}
              aria-label={`Read full review by ${r.name}`}
              aria-haspopup="dialog"
              className="card-lift w-80 shrink-0 rounded-2xl p-6 cursor-pointer text-left outline-none focus-visible:ring-2 focus-visible:ring-accent"
              style={{
                background: "oklch(1 0 0 / 0.78)",
                border: "1px solid oklch(0.70 0.12 85 / 0.14)",
                backdropFilter: "blur(16px) saturate(1.5)",
                WebkitBackdropFilter: "blur(16px) saturate(1.5)",
                boxShadow:
                  "0 4px 24px oklch(0 0 0 / 0.07), inset 0 1px 0 oklch(1 0 0 / 0.8)",
              }}
              aria-hidden={i >= allReviews.length / 2 ? "true" : undefined}
            >
              {/* Stars */}
              <div className="flex gap-0.5 mb-3">
                {Array.from({ length: r.rating }).map((_, s) => (
                  <Star
                    key={s}
                    className="h-3.5 w-3.5"
                    style={{ fill: "oklch(0.70 0.12 85)", color: "oklch(0.70 0.12 85)" }}
                    aria-hidden="true"
                  />
                ))}
              </div>

              {/* Quote */}
              <Quote
                className="h-4 w-4 mb-2"
                style={{ color: "oklch(0.70 0.12 85 / 0.35)" }}
                aria-hidden="true"
              />
              <p className="text-sm leading-relaxed text-foreground/80 italic line-clamp-4">
                "{r.text}"
              </p>

              {/* Read more hint */}
              <p
                className="mt-2 text-[11px] font-medium"
                style={{ color: "oklch(0.70 0.12 85)" }}
              >
                Tap to read more →
              </p>

              {/* Author */}
              <div
                className="mt-4 flex items-center justify-between gap-3 pt-4"
                style={{ borderTop: "1px solid oklch(0.70 0.12 85 / 0.12)" }}
              >
                <div className="flex items-center gap-3">
                  {r.photoUrl ? (
                    <Image
                      src={r.photoUrl}
                      alt={r.name}
                      width={40}
                      height={40}
                      className="rounded-full object-cover"
                      unoptimized
                    />
                  ) : (
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm"
                      style={{
                        background: "oklch(0.88 0.06 85)",
                        color: "oklch(0.30 0.04 135)",
                      }}
                      aria-hidden="true"
                    >
                      {r.name.charAt(0)}
                    </div>
                  )}
                  <div>
                    <div className="text-sm font-semibold text-foreground">{r.name}</div>
                    <div className="text-[10px] text-muted-foreground mt-0.5">{r.date}</div>
                  </div>
                </div>
                <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
                  Google
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* ── Expanded Review Modal (Rendered in Portal) ───────────────── */}
      {mounted && createPortal(
        <AnimatePresence>
          {selectedReview && (
            <div
              role="dialog"
              aria-modal="true"
              aria-label={`Review by ${selectedReview.name}`}
              className="fixed inset-0 z-[100] flex items-center justify-center px-4 py-8 sm:p-10"
            >
              {/* Backdrop */}
              <motion.div
                key="backdrop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.22 }}
                onClick={closeReview}
                className="absolute inset-0 cursor-pointer"
                style={{ background: "oklch(0.12 0.015 135 / 0.72)", backdropFilter: "blur(6px)", WebkitBackdropFilter: "blur(6px)" }}
              />

              {/* Modal — Apple spring scale-up */}
              <motion.div
                key="modal"
                initial={{ opacity: 0, scale: 0.82, y: 24 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.88, y: 16 }}
                transition={{ type: "spring", stiffness: 380, damping: 28 }}
                className="relative z-10 w-full max-w-lg rounded-3xl overflow-hidden flex flex-col"
                style={{
                  maxHeight: "85vh",
                  background: "oklch(0.98 0.005 95)",
                  border: "1px solid oklch(0.70 0.12 85 / 0.18)",
                  boxShadow:
                    "0 32px 64px oklch(0 0 0 / 0.28), 0 0 0 1px oklch(1 0 0 / 0.08)",
                }}
              >
                {/* Close button */}
                <button
                  onClick={closeReview}
                  className="absolute top-4 right-4 z-20 flex h-9 w-9 items-center justify-center rounded-full transition-colors"
                  style={{
                    background: "oklch(0 0 0 / 0.06)",
                    color: "oklch(0.35 0.02 135)",
                  }}
                  aria-label="Close review"
                >
                  <X className="h-4 w-4" />
                </button>

                {/* Scrollable content */}
                <div className="overflow-y-auto p-6 sm:p-8">
                  {/* Stars */}
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: selectedReview.rating }).map((_, s) => (
                      <Star
                        key={s}
                        className="h-5 w-5"
                        style={{ fill: "oklch(0.70 0.12 85)", color: "oklch(0.70 0.12 85)" }}
                        aria-hidden="true"
                      />
                    ))}
                  </div>

                  {/* Big quote icon */}
                  <Quote
                    className="h-7 w-7 mb-4"
                    style={{ color: "oklch(0.70 0.12 85 / 0.4)" }}
                    aria-hidden="true"
                  />

                  {/* Full review text */}
                  <p
                    className="text-base sm:text-[17px] leading-[1.75] italic"
                    style={{ color: "oklch(0.25 0.02 135)" }}
                  >
                    "{selectedReview.text}"
                  </p>

                  {/* Author footer */}
                  <div
                    className="mt-8 flex items-center justify-between gap-4 pt-6"
                    style={{ borderTop: "1px solid oklch(0.70 0.12 85 / 0.14)" }}
                  >
                    <div className="flex items-center gap-4">
                      {selectedReview.photoUrl ? (
                        <Image
                          src={selectedReview.photoUrl}
                          alt={selectedReview.name}
                          width={52}
                          height={52}
                          className="rounded-full object-cover"
                          unoptimized
                        />
                      ) : (
                        <div
                          className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-base"
                          style={{
                            background: "oklch(0.88 0.06 85)",
                            color: "oklch(0.30 0.04 135)",
                          }}
                          aria-hidden="true"
                        >
                          {selectedReview.name.charAt(0)}
                        </div>
                      )}
                      <div>
                        <div
                          className="text-base font-semibold"
                          style={{ color: "oklch(0.20 0.02 135)" }}
                        >
                          {selectedReview.name}
                        </div>
                        <div
                          className="text-xs mt-0.5"
                          style={{ color: "oklch(0.50 0.02 135)" }}
                        >
                          {selectedReview.date}
                        </div>
                      </div>
                    </div>

                    <a
                      href="https://maps.app.goo.gl/FMj8GgqVGXFyc9zQ7"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="shrink-0 text-right"
                    >
                      <div
                        className="text-xs font-semibold uppercase tracking-widest hover:underline"
                        style={{ color: "oklch(0.60 0.12 85)" }}
                      >
                        Google Review
                      </div>
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}
