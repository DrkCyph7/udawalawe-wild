import { useRouterState } from "@tanstack/react-router";
import { TransitionLink as Link } from "@/components/transition-link";
import {
  Menu,
  X,
  Compass,
  MapPin,
  BookOpen,
  Leaf,
  Info,
  CalendarCheck,
  Home,
  Phone,
} from "lucide-react";
import { Magnetic } from "./magnetic";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isHome = pathname === "/";

  useEffect(() => {
    if (!isHome) {
      setScrolled(true);
      return;
    }
    const handler = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handler, { passive: true });
    handler();
    return () => window.removeEventListener("scroll", handler);
  }, [isHome]);

  const transparent = isHome && !scrolled && !open;

  const nav = [
    { to: "/", label: "Home", icon: Home },
    { to: "/safaris", label: "Safaris", icon: Compass },
    { to: "/routes", label: "Routes", icon: MapPin },
    { to: "/guide", label: "Guide", icon: BookOpen },
    { to: "/ethical-safari", label: "Ethical", icon: Leaf },
    { to: "/about", label: "About", icon: Info },
  ];

  return (
    <header
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-1.5rem)] lg:w-[calc(100%-3rem)] max-w-6xl rounded-2xl border ring-1 ring-inset duration-500 ease-out ${
        transparent
          ? "border-transparent ring-transparent bg-transparent py-1 shadow-none backdrop-blur-none"
          : "border-white/[0.12] ring-white/[0.08] shadow-[0_8px_40px_rgba(0,0,0,0.5)] bg-[oklch(0.20_0.018_135_/_0.82)] backdrop-blur-2xl py-0.5"
      }`}
      style={{
        transitionProperty: "background-color, border-color, box-shadow, padding, backdrop-filter"
      }}
    >
      <div className="flex items-center justify-between px-3 py-2 sm:px-5 sm:py-2.5">
        {/* Logo */}
        <Link
          to="/"
          className="group flex shrink-0 items-center gap-3"
          onClick={() => setOpen(false)}
          aria-label="Udawalawe Wild — Home"
        >
          <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full overflow-hidden shadow-inner ring-2 ring-white/10 transition-all duration-500 group-hover:ring-white/40 group-hover:shadow-[0_0_15px_rgba(255,255,255,0.2)]">
            <img
              src="/logo.png"
              alt="Udawalawe Wild logo"
              width={40}
              height={40}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          </div>
          <span className="whitespace-nowrap font-serif text-lg tracking-wide transition-all duration-300 sm:text-xl text-white/90 group-hover:text-white drop-shadow-sm group-hover:drop-shadow-md">
            Udawalawe Wild
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main navigation">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="relative flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-medium transition-all duration-300 text-white/70 hover:bg-white/10 hover:text-white whitespace-nowrap"
              activeProps={{
                className: "text-white bg-white/15 shadow-sm",
              }}
              activeOptions={n.to === "/" ? { exact: true } : undefined}
            >
              <n.icon className="h-3.5 w-3.5 opacity-80 shrink-0" aria-hidden="true" />
              {n.label}
            </Link>
          ))}

          <div className="ml-2 flex shrink-0 items-center gap-2">
            <Magnetic>
              <a
                href="tel:+94721890006"
                className="flex items-center gap-1.5 rounded-full px-4 py-2.5 text-sm font-semibold bg-white/5 border border-white/10 text-white transition-all hover:bg-white/15 hover:border-white/20 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] whitespace-nowrap"
              >
                <Phone className="h-4 w-4 shrink-0" aria-hidden="true" />
                Call
              </a>
            </Magnetic>

            <Magnetic>
              <Link
                to="/book"
                className="group flex items-center gap-1.5 rounded-full px-4 py-2.5 text-sm font-bold shadow-sm bg-[oklch(0.70_0.12_85)] text-[oklch(0.22_0.02_135)] transition-all hover:bg-[oklch(0.80_0.08_85)] hover:shadow-[0_4px_20px_oklch(0.70_0.12_85_/_0.5)] hover:-translate-y-0.5 border border-white/10 whitespace-nowrap"
              >
                <CalendarCheck
                  className="h-4 w-4 shrink-0 transition-transform group-hover:scale-110"
                  aria-hidden="true"
                />
                Plan my safari
              </Link>
            </Magnetic>
          </div>
        </nav>

        {/* Mobile controls — Call + Hamburger */}
        <div className="flex items-center gap-2.5 lg:hidden">
          <Magnetic>
            <a
              href="tel:+94721890006"
              className="inline-flex items-center justify-center rounded-full p-2.5 transition-all duration-300 shadow-sm"
              style={{
                background: "oklch(1 0 0 / 0.1)",
                border: "1px solid oklch(1 0 0 / 0.15)",
                backdropFilter: "blur(12px)",
              }}
              aria-label="Call us"
            >
              <Phone className="h-4.5 w-4.5 text-white" />
            </a>
          </Magnetic>

          <Magnetic>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="inline-flex items-center justify-center rounded-full p-2.5 transition-all duration-300 shadow-sm hover:bg-white/10"
              style={{
                background: open ? "oklch(1 0 0 / 0.15)" : "oklch(1 0 0 / 0.1)",
                border: "1px solid oklch(1 0 0 / 0.15)",
                backdropFilter: "blur(12px)",
              }}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
            >
              {open ? (
                <X className="h-4.5 w-4.5 text-white transition-transform duration-300 rotate-90" />
              ) : (
                <Menu className="h-4.5 w-4.5 text-white transition-transform duration-300" />
              )}
            </button>
          </Magnetic>
        </div>
      </div>

      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out lg:hidden ${
          open
            ? "max-h-[32rem] opacity-100 border-t border-white/10 rounded-b-2xl"
            : "max-h-0 opacity-0"
        }`}
        style={open ? {
          background: "oklch(0.18 0.015 135 / 0.92)",
          backdropFilter: "blur(24px) saturate(1.8)",
          WebkitBackdropFilter: "blur(24px) saturate(1.8)",
        } : undefined}
        aria-hidden={!open}
      >
        <nav className="flex flex-col gap-1.5 px-3 py-4 sm:px-5" aria-label="Mobile navigation">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              onClick={() => setOpen(false)}
              className="flex items-center gap-3.5 rounded-xl px-4 py-3 text-[15px] font-medium text-white/75 transition-all duration-200 hover:bg-white/10 hover:text-white active:scale-[0.98]"
              activeProps={{ className: "text-white bg-white/15 shadow-sm" }}
              activeOptions={n.to === "/" ? { exact: true } : undefined}
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/5 border border-white/10">
                <n.icon className="h-4 w-4 text-white/90" aria-hidden="true" />
              </div>
              {n.label}
            </Link>
          ))}

          <div className="mt-3 px-1 pb-1">
            <Link
              to="/book"
              onClick={() => setOpen(false)}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[oklch(0.70_0.12_85)] border border-white/10 px-4 py-3.5 text-[15px] font-bold text-[oklch(0.22_0.02_135)] shadow-lg transition-all duration-200 hover:bg-[oklch(0.80_0.08_85)] active:scale-[0.98] whitespace-nowrap"
            >
              <CalendarCheck className="h-5 w-5 shrink-0" />
              Plan my safari
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
