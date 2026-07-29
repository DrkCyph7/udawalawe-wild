import { Link } from "@tanstack/react-router";
import { Menu, X, Compass, MapPin, BookOpen, Leaf, Info, CalendarCheck } from "lucide-react";
import { useState } from "react";
import { SITE } from "@/lib/site";

const nav = [
  { to: "/safaris", label: "Safaris", icon: Compass },
  { to: "/routes", label: "Routes", icon: MapPin },
  { to: "/guide", label: "Guide", icon: BookOpen },
  { to: "/ethical-safari", label: "Ethical", icon: Leaf },
  { to: "/about", label: "About", icon: Info },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border/50 bg-background/90 backdrop-blur-md transition-all duration-300">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5 sm:px-8">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 group"
          onClick={() => setOpen(false)}
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[color:var(--forest)] transition-transform duration-200 group-hover:scale-105">
            <Leaf className="h-4 w-4 text-[color:var(--ivory)]" aria-hidden="true" />
          </span>
          <span className="font-serif text-lg tracking-tight text-primary sm:text-xl">
            {SITE.name}
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex" aria-label="Main navigation">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="flex items-center gap-1.5 rounded-md px-3 py-2 text-sm text-foreground/70 transition-all duration-150 hover:bg-accent/10 hover:text-foreground"
              activeProps={{ className: "text-foreground font-medium bg-accent/10" }}
            >
              <n.icon className="h-3.5 w-3.5" aria-hidden="true" />
              {n.label}
            </Link>
          ))}
          <Link
            to="/book"
            className="ml-3 flex items-center gap-1.5 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-all duration-200 hover:bg-primary/85 hover:shadow-md hover:scale-[1.02]"
          >
            <CalendarCheck className="h-4 w-4" aria-hidden="true" />
            Plan my safari
          </Link>
        </nav>

        {/* Mobile hamburger */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex items-center justify-center rounded-md p-2 transition-all duration-150 hover:bg-accent/10 md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? (
            <X className="h-5 w-5 text-foreground" />
          ) : (
            <Menu className="h-5 w-5 text-foreground" />
          )}
        </button>
      </div>

      {/* Mobile drawer */}
      <div
        className={`overflow-hidden border-t border-border/50 bg-background transition-all duration-300 ease-in-out md:hidden ${
          open ? "max-h-[28rem] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="mx-auto flex max-w-6xl flex-col gap-1 px-5 py-4" aria-label="Mobile navigation">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 rounded-md px-3 py-3 text-base text-foreground/75 transition-all duration-150 hover:bg-accent/10 hover:text-foreground"
              activeProps={{ className: "text-foreground font-medium bg-accent/8" }}
            >
              <n.icon className="h-4.5 w-4.5 text-[color:var(--terracotta)]" aria-hidden="true" />
              {n.label}
            </Link>
          ))}
          <Link
            to="/book"
            onClick={() => setOpen(false)}
            className="mt-2 flex items-center justify-center gap-2 rounded-md bg-primary px-4 py-3 text-center text-sm font-medium text-primary-foreground transition-all duration-200 hover:bg-primary/90"
          >
            <CalendarCheck className="h-4 w-4" />
            Plan my safari
          </Link>
        </nav>
      </div>
    </header>
  );
}
