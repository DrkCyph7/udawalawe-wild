"use client";

import { useEffect, useRef, useState } from "react";
import Image, { StaticImageData } from "next/image";
import { Binoculars, ChevronRight } from "lucide-react";
import { TransitionLink as Link } from "@/components/transition-link";
import elephantPortrait from "@/assets/elephant-portrait.jpg";
import landscape from "@/assets/landscape.jpg";
import wildlife from "@/assets/wildlife.jpg";
import ethicalImg from "@/assets/ethical-safari-img.jpg";

import { type SafariPackage } from "@/lib/content";

function getSafariImage(i: number): StaticImageData {
  const idx = i % 5;
  const map = [elephantPortrait, ethicalImg, wildlife, landscape, elephantPortrait] as const;
  return map[idx];
}

export function SafariScroll({ safaris }: { safaris: SafariPackage[] }) {
  const safariScrollRef = useRef<HTMLDivElement>(null);
  const [activeDot, setActiveDot] = useState(0);

  useEffect(() => {
    const el = safariScrollRef.current;
    if (!el) return;
    const handler = () => {
      const children = Array.from(el.children) as HTMLElement[];
      let closestIdx = 0;
      let closestDist = Infinity;
      for (let i = 0; i < children.length; i++) {
        const dist = Math.abs(children[i].offsetLeft - el.scrollLeft);
        if (dist < closestDist) {
          closestDist = dist;
          closestIdx = i;
        }
      }
      setActiveDot(Math.max(0, Math.min(closestIdx, safaris.length - 1)));
    };
    el.addEventListener("scroll", handler, { passive: true });
    return () => el.removeEventListener("scroll", handler);
  }, [safaris.length]);

  const scrollToCard = (index: number) => {
    const el = safariScrollRef.current;
    if (!el) return;
    const child = el.children[index] as HTMLElement | null;
    if (!child) return;
    el.scrollTo({ left: child.offsetLeft, behavior: "smooth" });
  };

  return (
    <div className="sm:hidden">
      <div ref={safariScrollRef} className="safari-scroll-track">
        {safaris.map((s, i) => (
          <div key={s.slug} className="safari-scroll-item">
            <article className="group flex h-full flex-col overflow-hidden rounded-xl card-glass">
              <div className="relative w-full" style={{ aspectRatio: "4/3" }}>
                <Image
                  src={getSafariImage(i)}
                  alt={`${s.name} - Udawalawe Safari Jeep Booking`}
                  title={`${s.name} - Udawalawe Safari Jeep Booking`}
                  fill
                  sizes="80vw"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-1 flex-col p-4">
                <div className="flex items-center gap-1 text-[10px] uppercase tracking-widest text-muted-foreground">
                  <Binoculars className="h-3 w-3" aria-hidden="true" />
                  {s.duration}
                </div>
                <h3 className="mt-1.5 font-serif text-lg text-foreground">{s.name}</h3>
                <p className="mt-1.5 flex-1 text-xs leading-relaxed text-muted-foreground">
                  {s.short}
                </p>
                <Link
                  to="/safaris"
                  className="link-underline mt-3 flex items-center gap-1 text-xs font-medium text-accent"
                >
                  Learn more
                  <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
                </Link>
              </div>
            </article>
          </div>
        ))}
      </div>

      <div className="flex justify-center gap-1 mt-5" role="tablist" aria-label="Safari options">
        {safaris.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollToCard(i)}
            role="tab"
            aria-selected={i === activeDot}
            aria-label={`Go to safari option ${i + 1}`}
            className="flex h-11 w-11 items-center justify-center cursor-pointer outline-none"
          >
            <span
              className="block rounded-full transition-all duration-300"
              style={{
                width: i === activeDot ? 20 : 8,
                height: 8,
                background: i === activeDot ? "oklch(0.70 0.12 85)" : "oklch(1 0 0 / 0.35)",
              }}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
