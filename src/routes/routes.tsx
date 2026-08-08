import { createFileRoute } from "@tanstack/react-router";
import { TransitionLink as Link } from "@/components/transition-link";
import { Section, SectionHeading } from "@/components/section";
import { Reveal } from "@/components/reveal";
import { routes } from "@/lib/content";
import { ChevronRight, MapPin, Compass } from "lucide-react";
import { TiltCard } from "@/components/tilt-card";
import { motion } from "framer-motion";

export const Route = createFileRoute("/routes")({
  head: () => ({
    meta: [
      { title: "Travel routes to Udawalawe — Udawalawe Wild" },
      {
        name: "description",
        content:
          "Reaching Udawalawe from Ella, Mirissa, Galle, Hiriketiya, Colombo, Kandy, Tangalle, and Nuwara Eliya. Route notes, timings, and safari + transfer options.",
      },
      { property: "og:title", content: "Travel routes to Udawalawe" },
      {
        property: "og:description",
        content: "How to reach Udawalawe from popular Sri Lankan bases.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://www.udawalawe-wild.com/routes" },
      { property: "og:image", content: "https://www.udawalawe-wild.com/og-image.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: "https://www.udawalawe-wild.com/og-image.png" },
    ],
    links: [{ rel: "canonical", href: "https://www.udawalawe-wild.com/routes" }],
  }),
  component: RoutesPage,
});

function RoutesPage() {
  return (
    <>
      {/* Page hero — dark cinematic banner */}
      <div className="page-hero">
        <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-8">
          <Reveal>
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-4 inline-flex items-center gap-2 rounded-full px-4 py-2"
              style={{ background: "oklch(1 0 0 / 0.08)", border: "1px solid oklch(1 0 0 / 0.15)", backdropFilter: "blur(16px)" }}
            >
              <Compass className="h-3.5 w-3.5" style={{ color: "oklch(0.56 0.17 40)" }} />
              <span className="text-[10px] font-semibold uppercase tracking-[0.2em]" style={{ color: "oklch(0.85 0.02 78 / 0.8)" }}>
                Getting to Udawalawe
              </span>
            </motion.div>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl leading-[1.08]" style={{ color: "oklch(0.93 0.035 76)" }}>
              Pick your starting point.<br />
              <span style={{ color: "oklch(0.56 0.17 40)" }}>We'll handle the rest.</span>
            </h1>
            <p className="mt-4 max-w-xl text-base leading-relaxed" style={{ color: "oklch(0.68 0.03 76)" }}>
              We'll help you shape the day so the safari — not the driving — is the memorable part.
            </p>
          </Reveal>
        </div>
      </div>

      <div className="section-dark">
        <Section className="pt-4">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" style={{ perspective: "1000px" }}>
            {routes.map((r, i) => (
              <Reveal key={r.slug} delay={i * 70}>
                <TiltCard intensity={8} className="h-full">
                  <Link
                    to={`/${r.slug}`}
                    className="group card-3d card-shine flex h-full flex-col justify-between rounded-3xl p-7 sm:p-9 transition-all duration-300 hover:scale-[1.02]"
                    style={{
                      background: "oklch(0.21 0.055 150)",
                      border: "1px solid oklch(1 0 0 / 0.08)",
                      boxShadow: "0 8px 32px oklch(0 0 0 / 0.3), inset 0 1px 0 oklch(1 0 0 / 0.08)",
                    }}
                  >
                    <div>
                      <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: "oklch(0.56 0.17 40)" }}>
                        <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                        From
                      </div>
                      <h2 className="mt-2 font-serif text-3xl" style={{ color: "oklch(0.93 0.035 76)" }}>{r.from}</h2>
                      <div className="mt-2 text-[11px] font-semibold uppercase tracking-wider" style={{ color: "oklch(0.72 0.03 76)" }}>{r.drive}</div>
                      <p className="mt-4 text-sm leading-relaxed" style={{ color: "oklch(0.65 0.03 76)" }}>{r.summary}</p>
                    </div>
                    <div className="mt-8 flex items-center gap-1.5 text-sm font-semibold" style={{ color: "oklch(0.85 0.02 78)" }}>
                      View route notes
                      <ChevronRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" style={{ color: "oklch(0.56 0.17 40)" }} aria-hidden="true" />
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
