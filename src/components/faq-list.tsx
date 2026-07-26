import { useState } from "react";

export function FaqList({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="divide-y divide-border border-y border-border">
      {items.map((f, i) => {
        const isOpen = open === i;
        return (
          <div key={f.q} itemScope itemType="https://schema.org/Question">
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              className="flex w-full items-start justify-between gap-6 py-5 text-left"
              aria-expanded={isOpen}
            >
              <span className="font-serif text-lg text-foreground" itemProp="name">
                {f.q}
              </span>
              <span className="mt-1 text-xl leading-none text-muted-foreground">
                {isOpen ? "–" : "+"}
              </span>
            </button>
            {isOpen && (
              <div
                className="pb-6 pr-10 text-sm leading-relaxed text-muted-foreground"
                itemScope
                itemProp="acceptedAnswer"
                itemType="https://schema.org/Answer"
              >
                <span itemProp="text">{f.a}</span>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
