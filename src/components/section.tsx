import type { ReactNode, HTMLAttributes } from "react";

export function Section({
  children,
  className = "",
  as: As = "section",
  ...props
}: {
  children: ReactNode;
  className?: string;
  as?: "section" | "div";
} & HTMLAttributes<HTMLElement>) {
  return (
    <As className={`mx-auto max-w-6xl px-4 py-10 sm:px-8 sm:py-20 ${className}`} {...props}>
      {children}
    </As>
  );
}

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`mb-3 text-xs font-medium uppercase tracking-[0.2em] ${className || "text-foreground/60"}`}
    >
      {children}
    </div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  center,
  titleClass,
  introClass,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  center?: boolean;
  /** Override the heading colour — e.g. pass "text-[color:var(--ivory)]" on dark sections */
  titleClass?: string;
  /** Override the intro paragraph colour */
  introClass?: string;
}) {
  return (
    <div className={`max-w-2xl ${center ? "mx-auto text-center" : ""}`}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2
        className={`font-serif text-2xl leading-tight sm:text-4xl ${titleClass ?? "text-foreground"}`}
      >
        {title}
      </h2>
      {intro && (
        <p
          className={`mt-3 text-sm leading-relaxed sm:mt-4 sm:text-base ${introClass ?? "text-muted-foreground"}`}
        >
          {intro}
        </p>
      )}
    </div>
  );
}
