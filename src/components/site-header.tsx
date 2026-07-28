import { Link } from "@tanstack/react-router";
import { Menu, Compass } from "lucide-react";
import { useState } from "react";
import { SITE } from "@/lib/site";
import { ThemeToggle } from "@/components/theme-toggle";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const nav = [
  { to: "/safaris", label: "Safaris" },
  { to: "/routes", label: "Routes" },
  { to: "/guide", label: "Guide" },
  { to: "/ethical-safari", label: "Ethical safari" },
  { to: "/about", label: "About" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <TooltipProvider delayDuration={150}>
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-xl transition-colors duration-300">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5 sm:px-8">
          <Link to="/" className="flex items-center gap-2 group" onClick={() => setOpen(false)}>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary transition duration-300 group-hover:scale-105 group-hover:bg-primary group-hover:text-primary-foreground">
              <Compass className="h-5 w-5" />
            </div>
            <span className="font-serif text-lg tracking-tight text-primary sm:text-xl font-semibold">
              {SITE.name}
            </span>
          </Link>

          <nav className="hidden items-center gap-6 md:flex">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                className="text-sm font-medium text-foreground/75 transition hover:text-foreground hover:scale-105"
                activeProps={{ className: "text-foreground font-semibold underline underline-offset-4 decoration-accent" }}
              >
                {n.label}
              </Link>
            ))}

            <div className="h-4 w-px bg-border/80" />

            <ThemeToggle />

            <Link
              to="/book"
              className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition hover:bg-primary/90 hover:shadow-md"
            >
              Plan my safari
            </Link>
          </nav>

          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />

            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  onClick={() => setOpen((v) => !v)}
                  className="inline-flex items-center justify-center rounded-lg border border-border/70 p-2 text-foreground transition hover:bg-accent/70"
                  aria-label="Toggle menu"
                  aria-expanded={open}
                >
                  <span className="sr-only">Menu</span>
                  <Menu className="h-5 w-5" />
                </button>
              </TooltipTrigger>
              <TooltipContent side="bottom" align="end">
                Open navigation
              </TooltipContent>
            </Tooltip>
          </div>
        </div>

        {open && (
          <div className="border-t border-border/60 bg-background/95 backdrop-blur-xl md:hidden animate-in slide-in-from-top-2 duration-200">
            <nav className="mx-auto flex max-w-6xl flex-col gap-1.5 px-5 py-4">
              {nav.map((n) => (
                <Link
                  key={n.to}
                  to={n.to}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-2 text-base font-medium text-foreground/80 hover:bg-accent/50"
                  activeProps={{ className: "text-primary font-semibold bg-primary/10" }}
                >
                  {n.label}
                </Link>
              ))}
              <Link
                to="/book"
                onClick={() => setOpen(false)}
                className="mt-3 rounded-lg bg-primary px-4 py-3 text-center text-sm font-semibold text-primary-foreground shadow-md"
              >
                Plan my safari
              </Link>
            </nav>
          </div>
        )}
      </header>
    </TooltipProvider>
  );
}

