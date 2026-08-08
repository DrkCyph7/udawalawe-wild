import { createFileRoute } from "@tanstack/react-router";
import { Section, SectionHeading } from "@/components/section";
import { Reveal } from "@/components/reveal";
import elephant from "@/assets/ethical-safari-img.jpg";
import { Leaf } from "lucide-react";
import { TiltCard } from "@/components/tilt-card";
import { motion } from "framer-motion";

export const Route = createFileRoute("/ethical-safari")({
  head: () => ({
    meta: [
      { title: "Ethical safari standard — Udawalawe Wild" },
      {
        name: "description",
        content:
          "Our wildlife-first standard, respectful driving rules, and how we verify local safari partners in Udawalawe.",
      },
      { property: "og:title", content: "Ethical safari standard — Udawalawe Wild" },
      {
        property: "og:description",
        content: "How we protect wildlife and support licensed local drivers.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://www.udawalawe-wild.com/ethical-safari" },
      { property: "og:image", content: "https://www.udawalawe-wild.com/og-image.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: "https://www.udawalawe-wild.com/og-image.png" },
    ],
    links: [{ rel: "canonical", href: "https://www.udawalawe-wild.com/ethical-safari" }],
  }),
  component: EthicalPage,
});

function EthicalPage() {
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
              <Leaf className="h-3.5 w-3.5" style={{ color: "oklch(0.56 0.17 40)" }} />
              <span className="text-[10px] font-semibold uppercase tracking-[0.2em]" style={{ color: "oklch(0.85 0.02 78 / 0.8)" }}>
                Wildlife first
              </span>
            </motion.div>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl leading-[1.08]" style={{ color: "oklch(0.93 0.035 76)" }}>
              A quieter, kinder<br />
              <span style={{ color: "oklch(0.56 0.17 40)" }}>way to safari.</span>
            </h1>
            <p className="mt-4 max-w-xl text-base leading-relaxed" style={{ color: "oklch(0.68 0.03 76)" }}>
              Our wildlife-first standard, respectful driving rules, and how we verify local safari partners in Udawalawe.
            </p>
          </Reveal>
        </div>
      </div>

      <div className="section-dark pb-10">
        <Section>
          <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center">
            <Reveal direction="left">
              <div className="space-y-5 text-sm leading-relaxed" style={{ color: "oklch(0.72 0.03 76)" }}>
                <p className="text-lg font-serif" style={{ color: "oklch(0.93 0.035 76)" }}>
                  Udawalawe is home to wild elephants, water buffalo, crocodiles, peafowl, and hundreds of bird species.
                </p>
                <p>
                  Our standard is designed so they barely notice we were there. We believe that a great safari shouldn't come at the expense of the animals' wellbeing.
                </p>
                <p>
                  We partner exclusively with licensed local operators who share this philosophy, ensuring that every drive respects the natural rhythm of the park.
                </p>
              </div>
            </Reveal>
            <Reveal direction="right" delay={100}>
              <TiltCard intensity={5}>
                <div className="aspect-[4/5] overflow-hidden rounded-3xl" style={{ boxShadow: "0 24px 64px oklch(0 0 0 / 0.4)" }}>
                  <img
                    src={elephant}
                    alt="Elephant in Sri Lankan grassland"
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-700 hover:scale-[1.04]"
                  />
                </div>
              </TiltCard>
            </Reveal>
          </div>
        </Section>
      </div>

      <div className="section-dark" style={{ borderTop: "1px solid oklch(1 0 0 / 0.06)" }}>
        <Section>
          <Reveal>
            <SectionHeading 
              title="On the tracks" 
              eyebrow="Field code" 
              titleClass="text-[oklch(0.93_0.035_76)]"
              introClass="text-[oklch(0.68_0.03_76)]"
            />
          </Reveal>
          <div className="mt-8 grid gap-5 sm:grid-cols-2" style={{ perspective: "1000px" }}>
            {[
              {
                t: "Safe animal distance",
                d: "Our partners hold back at posted distances and further where behaviour signals stress. If an animal moves toward the road, we let them pass.",
              },
              {
                t: "Respectful driving",
                d: "No revving engines, no reversing at pace toward wildlife, no cutting off herds. Slow is the default speed.",
              },
              {
                t: "No feeding, no crowding",
                d: "We never feed wildlife. We won't queue in a scrum around a single sighting, and we'll leave a scene rather than escalate it.",
              },
              {
                t: "Responsible photography",
                d: "No flash, no drones over the park, no leaning out of the vehicle. Great shots come from patience, not proximity.",
              },
            ].map((c, i) => (
              <Reveal key={c.t} delay={i * 70}>
                <TiltCard intensity={8} className="h-full">
                  <div className="card-3d card-shine h-full rounded-3xl p-7"
                    style={{
                      background: "oklch(0.21 0.055 150)",
                      border: "1px solid oklch(1 0 0 / 0.08)",
                      boxShadow: "0 8px 32px oklch(0 0 0 / 0.3), inset 0 1px 0 oklch(1 0 0 / 0.08)",
                    }}
                  >
                    <div className="font-serif text-xl" style={{ color: "oklch(0.93 0.035 76)" }}>{c.t}</div>
                    <p className="mt-3 text-sm leading-relaxed" style={{ color: "oklch(0.65 0.03 76)" }}>{c.d}</p>
                  </div>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </Section>
      </div>

      <div className="section-dark" style={{ borderTop: "1px solid oklch(1 0 0 / 0.06)" }}>
        <Section>
          <Reveal>
            <SectionHeading
              eyebrow="Partner verification"
              title="How we choose the operators we work with."
              intro="We're an independent booking platform. We don't own jeeps — we partner with licensed local operators who meet a clear standard."
              titleClass="text-[oklch(0.93_0.035_76)]"
              introClass="text-[oklch(0.68_0.03_76)]"
            />
          </Reveal>
          <ol className="mt-10 grid gap-4 sm:grid-cols-2">
            {[
              "Registered business credentials",
              "Valid driver and vehicle licences",
              "Active insurance on the vehicle",
              "Vehicle condition and safety check",
              "Clear, honest passenger capacity",
              "Documented guide and driver experience",
              "Written commitment to our ethical safari code",
              "Willingness to receive guest feedback",
            ].map((step, i) => (
              <Reveal key={step} delay={i * 50}>
                <TiltCard intensity={3}>
                  <li className="card-3d flex items-center gap-4 rounded-2xl p-5"
                    style={{
                      background: "oklch(1 0 0 / 0.03)",
                      border: "1px solid oklch(1 0 0 / 0.08)",
                      boxShadow: "0 4px 16px oklch(0 0 0 / 0.2)",
                    }}>
                    <span className="font-serif text-2xl" style={{ color: "oklch(0.56 0.17 40)" }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-sm leading-relaxed" style={{ color: "oklch(0.85 0.02 78)" }}>{step}</span>
                  </li>
                </TiltCard>
              </Reveal>
            ))}
          </ol>
          <Reveal delay={80}>
            <p className="mt-10 max-w-2xl text-sm leading-relaxed" style={{ color: "oklch(0.68 0.03 76)" }}>
              Supporting licensed local drivers and guides keeps expertise — and income — in the
              community that has cared for this park for generations.
            </p>
          </Reveal>
        </Section>
      </div>
    </>
  );
}
