import { Link } from "@tanstack/react-router";
import { SITE, waLink } from "@/lib/site";
import {
  MapPin,
  Compass,
  BookOpen,
  Leaf,
  Info,
  CalendarCheck,
  MessageCircle,
  Shield,
  FileText,
  XCircle,
  Facebook,
  Instagram,
  Send,
} from "lucide-react";

/* ─── Brand-specific TikTok SVG icon ────────────────────────────── */
function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.74a4.85 4.85 0 0 1-1.01-.05z" />
    </svg>
  );
}

const exploreLinks = [
  { to: "/safaris", label: "Safari options", icon: Compass },
  { to: "/routes", label: "Travel routes", icon: MapPin },
  { to: "/guide", label: "Visitor guide", icon: BookOpen },
  { to: "/ethical-safari", label: "Ethical safari", icon: Leaf },
  { to: "/about", label: "About us", icon: Info },
];

const planLinks = [
  { to: "/book", label: "Request availability", icon: CalendarCheck, isLink: true },
  { href: waLink(), label: "WhatsApp us", icon: MessageCircle, isExternal: true },
  { to: "/privacy", label: "Privacy policy", icon: Shield, isLink: true },
  { to: "/terms", label: "Terms of use", icon: FileText, isLink: true },
  { to: "/cancellation-policy", label: "Cancellation", icon: XCircle, isLink: true },
];

const socials = [
  {
    href: "https://facebook.com",
    label: "Facebook",
    icon: Facebook,
    color: "hover:text-[#1877F2]",
  },
  {
    href: "https://instagram.com",
    label: "Instagram",
    icon: Instagram,
    color: "hover:text-[#E1306C]",
  },
  {
    href: "https://tiktok.com",
    label: "TikTok",
    icon: TikTokIcon,
    color: "hover:text-[#69C9D0]",
  },
  {
    href: "https://t.me",
    label: "Telegram",
    icon: Send,
    color: "hover:text-[#2AABEE]",
  },
];

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border/60 bg-[color:var(--forest-deep)] text-[color:var(--ivory)]/80">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-4">

        {/* Brand column */}
        <div className="md:col-span-2 space-y-5">
          <div className="flex items-center gap-2">
            <Leaf className="h-5 w-5 text-[color:var(--terracotta)]" aria-hidden="true" />
            <span className="font-serif text-2xl text-[color:var(--ivory)]">{SITE.name}</span>
          </div>
          <p className="max-w-sm text-sm leading-relaxed">{SITE.tagline}</p>
          <p className="max-w-md text-xs leading-relaxed text-[color:var(--ivory)]/50">
            {SITE.disclaimer}
          </p>

          {/* Social icons */}
          <div className="flex items-center gap-3 pt-1">
            {socials.map(({ href, label, icon: Icon, color }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className={`flex h-9 w-9 items-center justify-center rounded-full border border-[color:var(--ivory)]/15 text-[color:var(--ivory)]/55 transition-all duration-200 hover:border-[color:var(--ivory)]/35 hover:scale-110 ${color}`}
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        {/* Explore column */}
        <div>
          <div className="text-xs uppercase tracking-widest text-[color:var(--ivory)]/50 mb-4">
            Explore
          </div>
          <ul className="space-y-2.5 text-sm">
            {exploreLinks.map(({ to, label, icon: Icon }) => (
              <li key={to}>
                <Link
                  to={to}
                  className="group flex items-center gap-2.5 transition-all duration-150 hover:text-[color:var(--ivory)]"
                >
                  <Icon className="h-3.5 w-3.5 shrink-0 text-[color:var(--terracotta)]/70 transition-transform duration-150 group-hover:scale-110" />
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Plan column */}
        <div>
          <div className="text-xs uppercase tracking-widest text-[color:var(--ivory)]/50 mb-4">
            Plan
          </div>
          <ul className="space-y-2.5 text-sm">
            {planLinks.map((item) => {
              const Icon = item.icon;
              if ("isExternal" in item && item.isExternal) {
                return (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-2.5 transition-all duration-150 hover:text-[color:var(--ivory)]"
                    >
                      <Icon className="h-3.5 w-3.5 shrink-0 text-[color:var(--terracotta)]/70 transition-transform duration-150 group-hover:scale-110" />
                      {item.label}
                    </a>
                  </li>
                );
              }
              return (
                <li key={item.label}>
                  <Link
                    to={(item as { to: string }).to}
                    className="group flex items-center gap-2.5 transition-all duration-150 hover:text-[color:var(--ivory)]"
                  >
                    <Icon className="h-3.5 w-3.5 shrink-0 text-[color:var(--terracotta)]/70 transition-transform duration-150 group-hover:scale-110" />
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-5 py-5 text-xs text-[color:var(--ivory)]/45 sm:flex-row sm:px-8">
          <span>© {new Date().getFullYear()} {SITE.name} · {SITE.domain}</span>
          <span className="flex items-center gap-1">
            <Leaf className="h-3 w-3 text-[color:var(--terracotta)]/60" />
            Wildlife-first · Ethical safari code
          </span>
        </div>
      </div>
    </footer>
  );
}
