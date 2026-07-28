import { Link } from "@tanstack/react-router";
import { SITE, waLink } from "@/lib/site";
import { Compass, Heart, Shield, ArrowUpRight } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-border/80 bg-card/60 text-foreground transition-colors duration-300 backdrop-blur">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 sm:px-8 md:grid-cols-4">
        <div className="md:col-span-2 space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Compass className="h-4 w-4" />
            </div>
            <span className="font-serif text-2xl font-semibold tracking-tight text-primary">
              {SITE.name}
            </span>
          </div>
          <p className="max-w-sm text-xs leading-relaxed text-muted-foreground">
            {SITE.tagline} Private, ethical safaris in Udawalawe National Park with verified local hosts.
          </p>
          <div className="flex items-center gap-2 text-[11px] text-muted-foreground pt-1">
            <Shield className="h-3.5 w-3.5 text-accent" />
            <span>Ethical Wildlife Standard Certified</span>
          </div>
        </div>

        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">
            Explore Park
          </div>
          <ul className="space-y-2.5 text-xs">
            <li>
              <Link to="/safaris" className="text-foreground/80 hover:text-primary transition flex items-center gap-1">
                Safari Experiences
              </Link>
            </li>
            <li>
              <Link to="/routes" className="text-foreground/80 hover:text-primary transition flex items-center gap-1">
                Travel Routes & Taxi
              </Link>
            </li>
            <li>
              <Link to="/guide" className="text-foreground/80 hover:text-primary transition flex items-center gap-1">
                Park Guide & Season
              </Link>
            </li>
            <li>
              <Link to="/ethical-safari" className="text-foreground/80 hover:text-primary transition flex items-center gap-1">
                Ethical Conduct Code
              </Link>
            </li>
            <li>
              <Link to="/about" className="text-foreground/80 hover:text-primary transition flex items-center gap-1">
                About Udawalawe Wild
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">
            Plan & Contact
          </div>
          <ul className="space-y-2.5 text-xs">
            <li>
              <Link to="/book" className="font-semibold text-primary hover:underline flex items-center gap-1">
                <span>Check Safari Dates</span>
                <ArrowUpRight className="h-3 w-3" />
              </Link>
            </li>
            <li>
              <a
                href={waLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/80 hover:text-accent transition"
              >
                WhatsApp Direct Assistant
              </a>
            </li>
            <li>
              <Link to="/privacy" className="text-foreground/70 hover:text-foreground transition">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="/terms" className="text-foreground/70 hover:text-foreground transition">
                Terms & Operating Rules
              </Link>
            </li>
            <li>
              <Link to="/cancellation-policy" className="text-foreground/70 hover:text-foreground transition">
                Cancellation Policy
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border/60 bg-secondary/30 py-6">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-5 text-[11px] text-muted-foreground sm:px-8">
          <div>
            © {new Date().getFullYear()} {SITE.name} · {SITE.domain}
          </div>
          <div className="flex items-center gap-1">
            <span>Crafted for wild nature & ethical travel</span>
            <Heart className="h-3 w-3 text-red-500 fill-red-500" />
          </div>
        </div>
      </div>
    </footer>
  );
}

