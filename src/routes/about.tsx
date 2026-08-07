import { createFileRoute, Link } from "@tanstack/react-router";
import { Section, SectionHeading } from "@/components/section";
import { Reveal } from "@/components/reveal";
import portrait from "@/assets/elephant-portrait.jpg";
import { CalendarCheck, Handshake, Eye, Ban, Award } from "lucide-react";
import { motion } from "framer-motion";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Udawalawe Wild — an independent safari booking platform" },
      {
        name: "description",
        content:
          "Udawalawe Wild is an independent online booking platform partnering with verified local safari operators in Udawalawe, Sri Lanka.",
      },
      { property: "og:title", content: "About Udawalawe Wild" },
      {
        property: "og:description",
        content: "An independent, wildlife-first safari booking platform.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://udawalawe-wild.com/about" },
      { property: "og:image", content: "https://udawalawe-wild.com/og-image.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: "https://udawalawe-wild.com/og-image.png" },
    ],
    links: [{ rel: "canonical", href: "https://udawalawe-wild.com/about" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  const pillars = [
    {
      icon: Ban,
      t: "We don't own the jeeps",
      d: "Every safari is delivered by a licensed local operator we've verified. This keeps money in the community and expertise in the driver's seat.",
    },
    {
      icon: Eye,
      t: "We share fixed quotes",
      d: "You'll see the full price before you commit. No gate fees, no surprises — what you see is what you pay.",
    },
    {
      icon: Handshake,
      t: "We're not the park authority",
      d: "Udawalawe Wild is not affiliated with Udawalawe National Park. We're a private booking platform.",
    },
    {
      icon: Award,
      t: "We don't fake reviews",
      d: "Real guest reviews appear when guests give them. Until then, that section stays honestly empty.",
    },
  ];

  return (
    <>
      {/* Page hero */}
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
              <Handshake className="h-3.5 w-3.5" style={{ color: "oklch(0.56 0.17 40)" }} />
              <span className="text-[10px] font-semibold uppercase tracking-[0.2em]" style={{ color: "oklch(0.85 0.02 78 / 0.8)" }}>
                Our Story
              </span>
            </motion.div>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl leading-[1.08]" style={{ color: "oklch(0.93 0.035 76)" }}>
              Simpler. More transparent.<br />
              <span style={{ color: "oklch(0.56 0.17 40)" }}>Kinder to wildlife.</span>
            </h1>
            <p className="mt-4 max-w-xl text-base leading-relaxed" style={{ color: "oklch(0.68 0.03 76)" }}>
              Udawalawe Wild exists to make booking a safari simpler, more transparent, and more respectful of wildlife. An independent booking platform — not a tour operator.
            </p>
          </Reveal>
        </div>
      </div>

      {/* Story content */}
      <div className="section-dark">
        <Section>
          <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-center">
            <Reveal direction="left">
              <div className="space-y-4 text-sm leading-relaxed" style={{ color: "oklch(0.72 0.03 76)" }}>
                <p className="text-base" style={{ color: "oklch(0.85 0.025 78)" }}>
                  We're not a tour operator. We don't own jeeps or dress our drivers in branded uniforms. We're an independent online booking platform, based between Sri Lanka and travellers arriving from all over the world.
                </p>
                <p>
                  Our job is to connect you with carefully verified, licensed local safari operators in Udawalawe National Park — and to make sure the experience you're paying for is the one that actually happens in the park.
                </p>
                <p>
                  We publish fixed quotes before you confirm. We answer on WhatsApp like humans, not scripts. And we hold every partner to the same wildlife-first ethical safari standard.
                </p>
              </div>
            </Reveal>
            <Reveal direction="right" delay={100}>
              <div className="aspect-[4/5] overflow-hidden rounded-3xl" style={{ boxShadow: "0 24px 64px oklch(0 0 0 / 0.4)" }}>
                <img
                  src={portrait}
                  alt="Wild elephant roaming free in Udawalawe National Park, Sri Lanka"
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-700 hover:scale-[1.04]"
                />
              </div>
            </Reveal>
          </div>
        </Section>
      </div>

      {/* How we operate — dark card grid */}
      <div className="section-dark" style={{ borderTop: "1px solid oklch(1 0 0 / 0.06)" }}>
        <Section>
          <Reveal>
            <SectionHeading
              eyebrow="How we operate"
              title="Independent booking platform."
              titleClass="text-[oklch(0.93_0.035_76)]"
              introClass="text-[oklch(0.68_0.03_76)]"
            />
          </Reveal>
          <div className="mt-8 grid gap-4 sm:grid-cols-2" style={{ perspective: "1000px" }}>
            {pillars.map((b, i) => (
              <Reveal key={b.t} delay={i * 80}>
                <div className="card-3d card-shine benefit-tile h-full">
                  <div
                    className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl"
                    style={{ background: "oklch(0.56 0.17 40 / 0.15)", border: "1px solid oklch(0.56 0.17 40 / 0.3)" }}
                  >
                    <b.icon className="h-4.5 w-4.5" style={{ color: "oklch(0.56 0.17 40)" }} />
                  </div>
                  <div className="font-serif text-xl" style={{ color: "oklch(0.93 0.035 76)" }}>{b.t}</div>
                  <p className="mt-2 text-sm leading-relaxed" style={{ color: "oklch(0.62 0.03 76)" }}>{b.d}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={100}>
            <div className="mt-10">
              <Link
                to="/book"
                className="inline-flex items-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold transition-all duration-300 hover:scale-[1.03]"
                style={{
                  background: "oklch(0.56 0.17 40)",
                  color: "oklch(0.97 0.018 80)",
                  boxShadow: "0 4px 20px oklch(0.56 0.17 40 / 0.4)",
                }}
              >
                <CalendarCheck className="h-4 w-4" aria-hidden="true" />
                Plan my Udawalawe safari
              </Link>
            </div>
          </Reveal>
        </Section>
      </div>
    </>
  );
}

