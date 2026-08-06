import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X, Compass, MapPin, BookOpen, Leaf, Info, CalendarCheck, Home } from "lucide-react";
import { useEffect, useState } from "react";

const nav = [
  { to: "/", label: "Home", icon: Home },
  { to: "/safaris", label: "Safaris", icon: Compass },
  { to: "/routes", label: "Routes", icon: MapPin },
  { to: "/guide", label: "Guide", icon: BookOpen },
  { to: "/ethical-safari", label: "Ethical", icon: Leaf },
  { to: "/about", label: "About", icon: Info },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isHome = pathname === "/";

  useEffect(() => {
    if (!isHome) { setScrolled(true); return; }
    const handler = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handler, { passive: true });
    handler();
    return () => window.removeEventListener("scroll", handler);
  }, [isHome]);

  const transparent = isHome && !scrolled;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        transparent
          ? "border-b border-white/10 bg-transparent"
          : "border-b border-border/50 bg-[oklch(0.93_0.035_76_/_0.97)] backdrop-blur-md shadow-sm"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3 sm:px-8">

        {/* Logo */}
        <Link
          to="/"
          className="group flex items-center gap-2.5"
          onClick={() => setOpen(false)}
          aria-label="Udawalawe Wild — Home"
        >
          <img
            src="/logo.png"
            alt="Udawalawe Wild logo"
            width={40}
            height={40}
            className="h-10 w-10 rounded-full object-cover ring-2 ring-white/20 transition-all duration-300 group-hover:ring-white/50 group-hover:scale-105"
          />
          <span className={`font-serif text-lg tracking-tight transition-colors duration-300 sm:text-xl ${
            transparent ? "text-white/90" : "text-primary"
          }`}>
            Udawalawe Wild
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-0.5 md:flex" aria-label="Main navigation">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm transition-all duration-200 ${
                transparent
                  ? "text-white/75 hover:bg-white/10 hover:text-white"
                  : "text-foreground/65 hover:bg-[color:var(--forest)]/8 hover:text-foreground"
              }`}
              activeProps={{
                className: transparent
                  ? "text-white font-medium bg-white/15"
                  : "text-foreground font-medium bg-[color:var(--forest)]/10",
              }}
              activeOptions={n.to === "/" ? { exact: true } : undefined}
            >
              <n.icon className="h-3.5 w-3.5" aria-hidden="true" />
              {n.label}
            </Link>
          ))}

          <Link
            to="/book"
            className="ml-3 flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition-all duration-200 hover:bg-primary/85 hover:shadow-md hover:scale-[1.02]"
          >
            <CalendarCheck className="h-4 w-4" aria-hidden="true" />
            Plan my safari
          </Link>
        </nav>

        {/* Mobile hamburger */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex items-center justify-center rounded-lg p-2.5 transition-all duration-200 hover:bg-[color:var(--forest)]/10 md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open
            ? <X className="h-5 w-5 text-foreground" />
            : <Menu className="h-5 w-5 text-foreground" />}
        </button>
      </div>

      {/* Mobile drawer — CSS height-animated, no JS jank */}
      <div
        className={`overflow-hidden border-t border-border/50 bg-background transition-all duration-350 ease-in-out md:hidden ${
          open ? "max-h-[32rem] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav
          className="mx-auto flex max-w-6xl flex-col gap-1 px-5 py-4"
          aria-label="Mobile navigation"
        >
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 rounded-xl px-3.5 py-3 text-base text-foreground/75 transition-all duration-200 hover:bg-[color:var(--forest)]/8 hover:text-foreground"
              activeProps={{ className: "text-foreground font-medium bg-[color:var(--forest)]/10" }}
              activeOptions={n.to === "/" ? { exact: true } : undefined}
            >
              <n.icon
                className="h-5 w-5 shrink-0 text-[color:var(--terracotta)]"
                aria-hidden="true"
              />
              {n.label}
            </Link>
          ))}

          <Link
            to="/book"
            onClick={() => setOpen(false)}
            className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3.5 text-sm font-semibold text-primary-foreground transition-all duration-200 hover:bg-primary/90"
          >
            <CalendarCheck className="h-4.5 w-4.5" />
            Plan my safari
          </Link>
        </nav>
      </div>
    </header>
  );
}
