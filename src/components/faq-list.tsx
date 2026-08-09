import { useState } from "react";

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
              className="group flex w-full min-h-[44px] items-center justify-between gap-6 py-5 text-left outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              aria-expanded={isOpen}
            >
              <span className="font-serif text-[1.1rem] sm:text-lg text-foreground transition-colors group-hover:text-[color:var(--terracotta)]" itemProp="name">
                {f.q}
              </span>
              
              {/* CSS Animated Plus / Minus icon */}
              <div className="relative flex h-6 w-6 shrink-0 items-center justify-center text-[color:var(--terracotta)]">
                <div
                  className="absolute h-[2px] w-4 rounded-full bg-current transition-transform duration-300"
                  style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
                />
                <div
                  className="absolute h-4 w-[2px] rounded-full bg-current transition-transform duration-300"
                  style={{ transform: isOpen ? "rotate(90deg) scale(0)" : "rotate(0deg) scale(1)" }}
                />
              </div>
            </button>

            {/* Animated answer panel (CSS Grid height hack for smooth 0-to-auto) */}
            <div
              className="grid transition-[grid-template-rows,opacity] duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{
                gridTemplateRows: isOpen ? "1fr" : "0fr",
                opacity: isOpen ? 1 : 0,
              }}
              itemScope
              itemProp="acceptedAnswer"
              itemType="https://schema.org/Answer"
            >
              <div className="overflow-hidden">
                <div
                  className="pb-6 pr-10 sm:pr-14 pt-1 text-sm sm:text-base leading-relaxed text-muted-foreground"
                  itemProp="text"
                >
                  {f.a}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
