"use client";

import { TransitionLink as Link } from "@/components/transition-link";
import { Section } from "@/components/section";
import { Reveal } from "@/components/reveal";
import { routes } from "@/lib/content";
import { ChevronRight, MapPin, Compass } from "lucide-react";
import { TiltCard } from "@/components/tilt-card";
import { motion } from "framer-motion";

export default function RoutesPage() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Udawalawe Wild",
        item: "https://www.udawalawe-wild.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Travel Routes",
        item: "https://www.udawalawe-wild.com/routes",
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {/* Page hero — dark cinematic banner */}
      <div className="page-hero">
        <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-8">
          <Reveal>
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-4 inline-flex items-center gap-2 rounded-full px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20"
            >
              <Compass className="h-3.5 w-3.5 text-[color:var(--ivory)]/70" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[color:var(--ivory)]/90">
                Getting to Udawalawe
              </span>
            </motion.div>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl leading-[1.08] text-[color:var(--ivory)]">
              Pick your starting point.
              <br />
              <span className="text-[color:var(--ivory)]/80">We'll handle the rest.</span>
            </h1>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-[color:var(--ivory)]/80">
              We'll help you shape the day so the safari — not the driving — is the memorable part.
            </p>
          </Reveal>
        </div>
      </div>

      <div className="section-dark">
        <Section className="pt-4">
          <div
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            style={{ perspective: "1000px" }}
          >
            {routes.map((r, i) => (
              <Reveal key={r.slug} delay={i * 70}>
                <TiltCard intensity={8} className="h-full">
                  <Link
                    to={`/${r.slug}`}
                    className="group card-3d card-shine flex h-full flex-col justify-between rounded-3xl p-7 sm:p-9 transition-all duration-300 hover:scale-[1.02] card-glass"
                  >
                    <div>
                      <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[color:var(--ivory)]/70">
                        <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                        From
                      </div>
                      <h2 className="mt-2 font-serif text-3xl text-foreground">{r.from}</h2>
                      <div className="mt-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                        {r.drive}
                      </div>
                      <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                        {r.summary}
                      </p>
                    </div>
                    <div className="mt-8 flex items-center gap-1.5 text-sm font-semibold text-foreground">
                      View route notes
                      <ChevronRight
                        className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1 text-[color:var(--ivory)]"
                        aria-hidden="true"
                      />
                    </div>
                  </Link>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </Section>
      </div>
    </>
  );
}
