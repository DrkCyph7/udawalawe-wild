import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function FaqList({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="w-full divide-y divide-border border-y border-border">
      {items.map((f, i) => {
        const isOpen = open === i;
        return (
          <div key={f.q} itemScope itemType="https://schema.org/Question" className="py-2">
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              className="group flex w-full items-center justify-between gap-6 py-5 text-left"
              aria-expanded={isOpen}
            >
              <span
                className="font-serif text-[1.1rem] sm:text-lg text-foreground transition-colors group-hover:text-forest-700"
                itemProp="name"
              >
                {f.q}
              </span>

              {/* Animated Plus / Minus icon */}
              <div className="relative flex h-6 w-6 shrink-0 items-center justify-center text-[color:var(--terracotta)]">
                {/* Horizontal line */}
                <motion.div
                  className="absolute h-[2px] w-4 rounded-full bg-current"
                  initial={false}
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                />
                {/* Vertical line */}
                <motion.div
                  className="absolute h-4 w-[2px] rounded-full bg-current"
                  initial={false}
                  animate={{ rotate: isOpen ? 90 : 0, scale: isOpen ? 0 : 1 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                />
              </div>
            </button>

            {/* Animated answer panel */}
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                  itemScope
                  itemProp="acceptedAnswer"
                  itemType="https://schema.org/Answer"
                >
                  <div
                    className="pb-6 pr-10 sm:pr-14 pt-1 text-sm sm:text-base leading-relaxed text-muted-foreground"
                    itemProp="text"
                  >
                    {f.a}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
