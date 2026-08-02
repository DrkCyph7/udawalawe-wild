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
  Send,
  Phone,
  Mail,
  ExternalLink,
} from "lucide-react";

/* ─── TripAdvisor SVG Icon ────────────────────────────── */
function TripAdvisorIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18c-4.41 0-8-3.59-8-8 0-1.84.63-3.53 1.69-4.88l1.42 1.42c-.7.94-1.11 2.1-1.11 3.46 0 3.31 2.69 6 6 6s6-2.69 6-6c0-1.36-.41-2.52-1.11-3.46l1.42-1.42C21.37 8.47 22 10.16 22 12c0 4.41-3.59 8-8 8zm0-13a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm-3 5a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm6 0a2 2 0 1 1 4 0 2 2 0 0 1-4 0z" />
    </svg>
  );
}

const exploreLinks = [
  { to: "/safaris", label: "Safari Options", icon: Compass },
  { to: "/routes", label: "Travel Routes", icon: MapPin },
  { to: "/guide", label: "Visitor Guide", icon: BookOpen },
  { to: "/ethical-safari", label: "Ethical Safari Code", icon: Leaf },
  { to: "/about", label: "About Us", icon: Info },
];

const planLinks = [
  { to: "/book", label: "Request Availability", icon: CalendarCheck, isLink: true },
  { href: waLink(), label: "WhatsApp Us", icon: MessageCircle, isExternal: true },
  { to: "/privacy", label: "Privacy Policy", icon: Shield, isLink: true },
  { to: "/terms", label: "Terms of Use", icon: FileText, isLink: true },
  { to: "/cancellation-policy", label: "Cancellation Policy", icon: XCircle, isLink: true },
];

const socials = [
  {
    href: SITE.facebook,
    label: "Facebook",
    icon: Facebook,
    color: "hover:text-[#1877F2] hover:border-[#1877F2]/40",
  },
  {
    href: SITE.tripadvisor,
    label: "TripAdvisor",
    icon: TripAdvisorIcon,
    color: "hover:text-[#00AF87] hover:border-[#00AF87]/40",
  },
  {
    href: "https://t.me",
    label: "Telegram",
    icon: Send,
    color: "hover:text-[#2AABEE] hover:border-[#2AABEE]/40",
  },
];

export function SiteFooter() {
  return (
    <footer className="relative isolate mt-24 border-t border-white/10 bg-[color:var(--forest-deep)] text-[color:var(--ivory)]/80">
      {/* Subtle top edge glow */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[color:var(--terracotta)]/40 to-transparent" />

      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-12">
        {/* Brand column (span 5) */}
        <div className="md:col-span-5 space-y-5">
          <div className="flex items-center gap-3">
            <img
              src="/logo.png"
              alt="Udawalawe Wild logo"
              width={48}
              height={48}
              className="h-12 w-12 rounded-full object-cover ring-2 ring-[color:var(--ivory)]/20 shadow-md"
            />
            <div>
              <span className="font-serif text-2xl font-medium tracking-tight text-[color:var(--ivory)] block">
                {SITE.name}
              </span>
              <span className="text-[10px] uppercase tracking-widest text-[color:var(--terracotta)] block font-medium">
                Udawalawe · Sri Lanka
              </span>
            </div>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-[color:var(--ivory)]/75">
            {SITE.tagline}
          </p>
          <p className="max-w-md text-xs leading-relaxed text-[color:var(--ivory)]/50 border-l border-white/10 pl-3">
            {SITE.disclaimer}
          </p>

          {/* Social icons */}
          <div className="flex items-center gap-3 pt-2">
            {socials.map(({ href, label, icon: Icon, color }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className={`flex h-9 w-9 items-center justify-center rounded-full border border-[color:var(--ivory)]/15 text-[color:var(--ivory)]/60 transition-all duration-200 hover:scale-110 ${color}`}
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        {/* Explore column (span 2) */}
        <div className="md:col-span-2">
          <div className="text-xs uppercase tracking-widest text-[color:var(--terracotta)] font-semibold mb-4">
            Explore
          </div>
          <ul className="space-y-2.5 text-sm">
            {exploreLinks.map(({ to, label, icon: Icon }) => (
              <li key={to}>
                <Link
                  to={to}
                  className="group flex items-center gap-2 transition-colors duration-150 hover:text-[color:var(--ivory)]"
                >
                  <Icon className="h-3.5 w-3.5 shrink-0 text-[color:var(--ivory)]/40 transition-transform duration-150 group-hover:scale-110 group-hover:text-[color:var(--terracotta)]" />
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Plan column (span 2) */}
        <div className="md:col-span-2">
          <div className="text-xs uppercase tracking-widest text-[color:var(--terracotta)] font-semibold mb-4">
            Plan & Legal
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
                      className="group flex items-center gap-2 transition-colors duration-150 hover:text-[color:var(--ivory)]"
                    >
                      <Icon className="h-3.5 w-3.5 shrink-0 text-[color:var(--ivory)]/40 transition-transform duration-150 group-hover:scale-110 group-hover:text-[color:var(--terracotta)]" />
                      {item.label}
                    </a>
                  </li>
                );
              }
              return (
                <li key={item.label}>
                  <Link
                    to={(item as { to: string }).to}
                    className="group flex items-center gap-2 transition-colors duration-150 hover:text-[color:var(--ivory)]"
                  >
                    <Icon className="h-3.5 w-3.5 shrink-0 text-[color:var(--ivory)]/40 transition-transform duration-150 group-hover:scale-110 group-hover:text-[color:var(--terracotta)]" />
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Contact column (span 3) */}
        <div className="md:col-span-3 space-y-3">
          <div className="text-xs uppercase tracking-widest text-[color:var(--terracotta)] font-semibold mb-4">
            Direct Contact
          </div>
          <div className="space-y-3 text-sm">
            <a
              href={`tel:${SITE.phone}`}
              className="flex items-center gap-2.5 text-[color:var(--ivory)]/85 hover:text-[color:var(--ivory)] transition-colors"
            >
              <Phone className="h-4 w-4 shrink-0 text-[color:var(--terracotta)]" />
              <span>{SITE.phoneDisplay}</span>
            </a>
            <a
              href={`mailto:${SITE.email}`}
              className="flex items-center gap-2.5 text-[color:var(--ivory)]/85 hover:text-[color:var(--ivory)] transition-colors"
            >
              <Mail className="h-4 w-4 shrink-0 text-[color:var(--terracotta)]" />
              <span className="truncate">{SITE.email}</span>
            </a>
            <div className="flex items-start gap-2.5 text-[color:var(--ivory)]/65 text-xs">
              <MapPin className="h-4 w-4 shrink-0 text-[color:var(--terracotta)] mt-0.5" />
              <span>{SITE.location}</span>
            </div>

            <div className="pt-2">
              <a
                href={waLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-[#25D366] px-4 py-2 text-xs font-semibold text-white shadow-sm transition-transform duration-200 hover:scale-105 hover:bg-[#22bf5b]"
              >
                <MessageCircle className="h-3.5 w-3.5" />
                Quick WhatsApp Chat
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10 bg-black/20">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-5 py-5 text-xs text-[color:var(--ivory)]/50 sm:flex-row sm:px-8">
          <span>© {new Date().getFullYear()} {SITE.name} · {SITE.domain}</span>

          <span className="flex items-center gap-1.5 text-[color:var(--ivory)]/70">
            <Leaf className="h-3.5 w-3.5 text-[color:var(--terracotta)]" />
            Wildlife-First · Verified Local Operators
          </span>

          <span className="flex items-center gap-1 text-[color:var(--ivory)]/50">
            Designed & Developed by{" "}
            <a
              href="https://nexcy.lk"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-[color:var(--ivory)]/80 hover:text-[color:var(--terracotta)] transition-colors inline-flex items-center gap-0.5 underline underline-offset-2"
            >
              NexCy Technologies
              <ExternalLink className="h-2.5 w-2.5" />
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
