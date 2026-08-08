import { createFileRoute } from "@tanstack/react-router";
import { TransitionLink as Link } from "@/components/transition-link";
import { Section, SectionHeading } from "@/components/section";
import { Reveal } from "@/components/reveal";
import { safaris } from "@/lib/content";
import elephantPortrait from "@/assets/elephant-portrait.jpg";
import safariJeep from "@/assets/safari-jeep.jpg";
import wildlife from "@/assets/wildlife.jpg";
import landscape from "@/assets/landscape.jpg";
import { CalendarCheck, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import { TiltCard } from "@/components/tilt-card";

export const Route = createFileRoute("/safaris")({
  head: () => ({
    meta: [
      { title: "Safari options — Udawalawe Wild" },
      {
        name: "description",
        content:
          "Compare private morning, afternoon, full-day, safari + transfer, and Elephant Transit Home combo options in Udawalawe. Transparent quotes, verified operators.",
      },
      { property: "og:title", content: "Safari options — Udawalawe Wild" },
      {
        property: "og:description",
        content: "Compare private safari options in Udawalawe National Park.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://www.udawalawe-wild.com/safaris" },
      { property: "og:image", content: "https://www.udawalawe-wild.com/og-image.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: "https://www.udawalawe-wild.com/og-image.png" },
    ],
    links: [{ rel: "canonical", href: "https://www.udawalawe-wild.com/safaris" }],
  }),
  component: SafarisPage,
});

const imgs = [elephantPortrait, safariJeep, wildlife, landscape, elephantPortrait];

function SafarisPage() {
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
              <CalendarCheck className="h-3.5 w-3.5" style={{ color: "oklch(0.56 0.17 40)" }} />
              <span className="text-[10px] font-semibold uppercase tracking-[0.2em]" style={{ color: "oklch(0.85 0.02 78 / 0.8)" }}>
                Safari Options
              </span>
            </motion.div>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl leading-[1.08]" style={{ color: "oklch(0.93 0.035 76)" }}>
              Private jeeps.<br />
              <span style={{ color: "oklch(0.56 0.17 40)" }}>Verified drivers.</span><br />
              Wildlife first.
            </h1>
            <p className="mt-4 max-w-xl text-base leading-relaxed" style={{ color: "oklch(0.68 0.03 76)" }}>
              Choose a shape for your day. We'll send a fixed, transparent quote before you confirm anything. Every jeep is private — no shared vehicles, ever.
            </p>
          </Reveal>
        </div>
      </div>

      {/* Safari cards */}
      <div className="section-dark">
        <Section className="pt-4">
          <div className="grid gap-12" style={{ perspective: "1200px" }}>
            {safaris.map((s, i) => (
              <Reveal key={s.slug} delay={i * 60}>
                <TiltCard
                  intensity={5}
                  className="card-3d card-shine grid gap-0 overflow-hidden rounded-3xl lg:grid-cols-[1fr_1.2fr]"
                  style={{
                    background: "oklch(0.21 0.055 150)",
                    border: "1px solid oklch(1 0 0 / 0.08)",
                    boxShadow: "0 8px 48px oklch(0 0 0 / 0.35), inset 0 1px 0 oklch(1 0 0 / 0.08)",
                  }}
                >
                  <div className="relative overflow-hidden min-h-[240px] lg:min-h-[340px]">
                    <img
                      src={imgs[i % 5]}
                      alt={s.name}
                      loading="lazy"
                      className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.05]"
                    />
                    {/* Image gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[oklch(0.21_0.055_150_/_0.8)] hidden lg:block" />
                    {/* Option badge */}
                    <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-[0.2em]"
                      style={{ background: "oklch(0.56 0.17 40)", color: "oklch(0.97 0.018 80)", boxShadow: "0 4px 16px oklch(0.56 0.17 40 / 0.5)" }}>
                      Option 0{i + 1}
                    </div>
                  </div>
                  <div className="p-7 lg:p-9">
                    <h2 className="font-serif text-2xl sm:text-3xl" style={{ color: "oklch(0.93 0.035 76)" }}>{s.name}</h2>
                    <p className="mt-3 text-sm leading-relaxed" style={{ color: "oklch(0.65 0.03 76)" }}>{s.short}</p>

                    <dl className="mt-6 grid gap-x-8 gap-y-3.5 sm:grid-cols-2">
                      <Item label="Duration" value={s.duration} />
                      <Item label="Ideal for" value={s.ideal} />
                      <Item label="Pickup" value={s.pickup} />
                      <Item label="Ethical approach" value={s.ethical} />
                      <Item label="Cancellation" value={s.cancellation} />
                      <Item label="Price" value="Fixed transparent quote before you confirm." />
                    </dl>

                    <div className="mt-6">
                      <div className="text-[10px] font-bold uppercase tracking-[0.18em] mb-3" style={{ color: "oklch(0.56 0.17 40)" }}>
                        What's included
                      </div>
                      <ul className="grid gap-2 text-sm sm:grid-cols-2">
                        {s.includes.map((inc) => (
                          <li key={inc} className="flex items-start gap-2.5">
                            <CheckCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" style={{ color: "oklch(0.56 0.17 40)" }} aria-hidden="true" />
                            <span style={{ color: "oklch(0.80 0.025 78)" }}>{inc}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-8">
                      <Link
                        to="/book"
                        className="inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition-all duration-300 hover:scale-[1.04]"
                        style={{
                          background: "oklch(0.56 0.17 40)",
                          color: "oklch(0.97 0.018 80)",
                          boxShadow: "0 4px 20px oklch(0.56 0.17 40 / 0.4)",
                        }}
                      >
                        <CalendarCheck className="h-4 w-4" aria-hidden="true" />
                        Request availability
                      </Link>
                    </div>
                  </div>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </Section>
      </div>
    </>
  );
}

function Item({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-[10px] font-bold uppercase tracking-[0.18em]" style={{ color: "oklch(0.56 0.17 40 / 0.8)" }}>
        {label}
      </dt>
      <dd className="mt-1 text-sm leading-relaxed" style={{ color: "oklch(0.80 0.025 78)" }}>{value}</dd>
    </div>
  );
}

