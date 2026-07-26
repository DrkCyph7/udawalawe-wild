import { Link } from "@tanstack/react-router";
import { Menu } from "lucide-react";
import { useState } from "react";
import { SITE } from "@/lib/site";
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
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
          <Link to="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
            <span className="font-serif text-lg tracking-tight text-primary sm:text-xl">
              {SITE.name}
            </span>
          </Link>

          <nav className="hidden items-center gap-7 md:flex">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                className="text-sm text-foreground/75 transition hover:text-foreground"
                activeProps={{ className: "text-foreground font-medium" }}
              >
                {n.label}
              </Link>
            ))}
            <Link
              to="/book"
              className="rounded-sm bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:bg-primary/90"
            >
              Plan my safari
            </Link>
          </nav>

          <Tooltip>
            <TooltipTrigger asChild>
              <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                className="inline-flex items-center justify-center rounded-sm p-2 transition hover:bg-accent/70 md:hidden"
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

        {open && (
          <div className="border-t border-border/60 bg-background md:hidden">
            <nav className="mx-auto flex max-w-6xl flex-col gap-1 px-5 py-4">
              {nav.map((n) => (
                <Link
                  key={n.to}
                  to={n.to}
                  onClick={() => setOpen(false)}
                  className="rounded-sm px-2 py-2 text-base text-foreground/80"
                  activeProps={{ className: "text-foreground font-medium" }}
                >
                  {n.label}
                </Link>
              ))}
              <Link
                to="/book"
                onClick={() => setOpen(false)}
                className="mt-2 rounded-sm bg-primary px-4 py-3 text-center text-sm font-medium text-primary-foreground"
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
