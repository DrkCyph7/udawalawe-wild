import { TransitionLink as Link } from "@/components/transition-link";
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

/* ─── User-Specified Brand SVG Icons (24x24 Clean Geometry) ────────────────────── */

/** TripAdvisor Owl Mark */
function TripAdvisorIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 3.5c-3.6 0-6.4 1.8-8 3.5L1.5 6l1.5 3.8C2.2 11.2 2.1 12.7 2.5 14.2c1.3 4.2 5.5 7 9.5 4.5 4 2.5 8.2-.3 9.5-4.5.4-1.5.3-3-.5-4.4L22.5 6l-2.5 1c-1.6-1.7-4.4-3.5-8-3.5zm-4.5 6a3.5 3.5 0 100 7 3.5 3.5 0 000-7zm9 0a3.5 3.5 0 100 7 3.5 3.5 0 000-7zm-9 2a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm9 0a1.5 1.5 0 100 3 1.5 1.5 0 000-3z"
      />
    </svg>
  );
}

/** Standalone Facebook "f" Logo */
function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3V2z" />
    </svg>
  );
}

/** Telegram Paper Plane Outline Logo */
function TelegramIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M22 2L2 10.5l6.5 2.5L17 6l-6.5 8L15 21l7-19zM8.5 13v5l2.5-3.5L8.5 13z" />
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
    icon: FacebookIcon,
    color: "text-[#1877F2] hover:opacity-80",
  },
  {
    href: SITE.tripadvisor,
    label: "TripAdvisor",
    icon: TripAdvisorIcon,
    color: "text-[#00AF87] hover:opacity-80",
  },
  {
    href: "https://t.me",
    label: "Telegram",
    icon: TelegramIcon,
    color: "text-[#2AABEE] hover:opacity-80",
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

          {/* Social icons — inside styled circular badges */}
          <div className="flex items-center gap-3 pt-2">
            {socials.map(({ href, label, icon: Icon, color }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className={`flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 shadow-sm transition-all duration-200 hover:scale-110 hover:border-white/30 hover:bg-white/10 ${color}`}
              >
                <Icon className="h-5 w-5" />
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
