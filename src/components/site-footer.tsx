import { Link } from "@tanstack/react-router";
import { SITE, waLink } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border/60 bg-[color:var(--forest-deep)] text-[color:var(--ivory)]/80">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="font-serif text-2xl text-[color:var(--ivory)]">
            {SITE.name}
          </div>
          <p className="mt-3 max-w-sm text-sm leading-relaxed">
            {SITE.tagline}
          </p>
          <p className="mt-4 max-w-md text-xs leading-relaxed text-[color:var(--ivory)]/60">
            {SITE.disclaimer}
          </p>
        </div>

        <div>
          <div className="text-xs uppercase tracking-widest text-[color:var(--ivory)]/60">
            Explore
          </div>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link to="/safaris" className="hover:text-[color:var(--ivory)]">Safari options</Link></li>
            <li><Link to="/routes" className="hover:text-[color:var(--ivory)]">Travel routes</Link></li>
            <li><Link to="/guide" className="hover:text-[color:var(--ivory)]">Visitor guide</Link></li>
            <li><Link to="/ethical-safari" className="hover:text-[color:var(--ivory)]">Ethical safari</Link></li>
            <li><Link to="/about" className="hover:text-[color:var(--ivory)]">About</Link></li>
          </ul>
        </div>

        <div>
          <div className="text-xs uppercase tracking-widest text-[color:var(--ivory)]/60">
            Plan
          </div>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link to="/book" className="hover:text-[color:var(--ivory)]">Request availability</Link></li>
            <li>
              <a href={waLink()} target="_blank" rel="noopener noreferrer" className="hover:text-[color:var(--ivory)]">
                WhatsApp us
              </a>
            </li>
            <li><Link to="/privacy" className="hover:text-[color:var(--ivory)]">Privacy</Link></li>
            <li><Link to="/terms" className="hover:text-[color:var(--ivory)]">Terms</Link></li>
            <li><Link to="/cancellation-policy" className="hover:text-[color:var(--ivory)]">Cancellation</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-5 py-5 text-xs text-[color:var(--ivory)]/55 sm:px-8">
          © {new Date().getFullYear()} {SITE.name} · {SITE.domain}
        </div>
      </div>
    </footer>
  );
}