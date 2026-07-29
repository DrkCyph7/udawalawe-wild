import { useEffect, useRef } from "react";

type Direction = "up" | "left" | "right" | "scale";

function getBase(direction: Direction) {
  if (direction === "left") return "reveal-left";
  if (direction === "right") return "reveal-right";
  if (direction === "scale") return "reveal-scale";
  return "reveal";
}

/**
 * Intersection-observer powered scroll-reveal wrapper.
 * Wraps children in a <div> that fades/slides into view once scrolled into viewport.
 *
 * Usage:
 *   <Reveal delay={80} direction="up">…</Reveal>
 */
export function Reveal({
  children,
  delay = 0,
  className = "",
  direction = "up",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  direction?: Direction;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("reveal-visible");
          obs.unobserve(el);
        }
      },
      { rootMargin: "0px 0px -70px 0px" },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`${getBase(direction)} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
