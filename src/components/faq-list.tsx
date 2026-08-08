import { useState } from "react";
import { ChevronDown } from "lucide-react";

export function FaqList({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="divide-y divide-border rounded-xl border border-border bg-card overflow-hidden">
      {items.map((f, i) => {
        const isOpen = open === i;
        return (
          <div key={f.q} itemScope itemType="https://schema.org/Question">
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left transition-colors duration-200 hover:bg-[color:var(--sand)]/30"
              aria-expanded={isOpen}
            >
              <span className="font-serif text-lg text-foreground" itemProp="name">
                {f.q}
              </span>
              <ChevronDown
                className={`h-5 w-5 shrink-0 text-[color:var(--terracotta)] transition-transform duration-350 ease-in-out ${
                  isOpen ? "rotate-180" : "rotate-0"
                }`}
                aria-hidden="true"
              />
            </button>

            {/* Animated answer panel */}
            <div
              className={`faq-answer ${isOpen ? "open" : ""}`}
              itemScope
              itemProp="acceptedAnswer"
              itemType="https://schema.org/Answer"
            >
              <div className="px-6 pb-6 pr-14 text-sm leading-relaxed text-muted-foreground" itemProp="text">
                {f.a}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
