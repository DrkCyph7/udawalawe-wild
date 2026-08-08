import { createFileRoute } from "@tanstack/react-router";
import { TransitionLink as Link } from "@/components/transition-link";
import { Section, SectionHeading } from "@/components/section";
import { Reveal } from "@/components/reveal";
import { FaqList } from "@/components/faq-list";
import { faqs } from "@/lib/content";
import landscape from "@/assets/landscape.jpg";
import { Compass } from "lucide-react";
import { TiltCard } from "@/components/tilt-card";
import { motion } from "framer-motion";

export const Route = createFileRoute("/guide")({
  head: () => ({
    meta: [
      { title: "Udawalawe visitor guide — what to know before you go" },
      {
        name: "description",
        content:
          "Practical guide to Udawalawe National Park: morning vs afternoon safari, wildlife, what to wear, how to get there, and park etiquette.",
      },
      { property: "og:title", content: "Udawalawe visitor guide" },
      { property: "og:description", content: "Everything to know before your Udawalawe safari." },
      { property: "og:type", content: "article" },
      { property: "og:url", content: "https://www.udawalawe-wild.com/guide" },
      { property: "og:image", content: "https://www.udawalawe-wild.com/og-image.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: "https://www.udawalawe-wild.com/og-image.png" },
    ],
    links: [{ rel: "canonical", href: "https://www.udawalawe-wild.com/guide" }],
  }),
  component: GuidePage,
});

function GuidePage() {
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
                Visitor guide
              </span>
            </motion.div>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl leading-[1.08]" style={{ color: "oklch(0.93 0.035 76)" }}>
              Everything to know<br />
              <span style={{ color: "oklch(0.56 0.17 40)" }}>before you go.</span>
            </h1>
            <p className="mt-4 max-w-xl text-base leading-relaxed" style={{ color: "oklch(0.68 0.03 76)" }}>
              A short, honest guide from planners who help travellers here every week.
            </p>
          </Reveal>
        </div>
      </div>

      <div className="section-dark pb-8">
        <Section className="pt-0">
          <Reveal direction="scale">
            <TiltCard intensity={3}>
              <div className="grain overflow-hidden rounded-[2rem] max-h-[380px] sm:max-h-[500px]" style={{ boxShadow: "0 24px 64px oklch(0 0 0 / 0.4)" }}>
                <img
                  src={landscape}
                  alt="Udawalawe reservoir landscape at sunset"
                  loading="lazy"
                  width={1920}
                  height={1080}
                  className="h-full w-full object-cover max-h-[380px] sm:max-h-[500px] transition duration-700 hover:scale-[1.03]"
                />
              </div>
            </TiltCard>
          </Reveal>
        </Section>
      </div>

      <div className="section-dark" style={{ borderTop: "1px solid oklch(1 0 0 / 0.06)" }}>
        <Section>
          <div className="grid gap-6 lg:grid-cols-2" style={{ perspective: "1000px" }}>
            {[
              {
                title: "Morning vs. afternoon safari",
                body: "Morning safaris begin before dawn. The air is cool, the light is soft, and wildlife tends to be most active. Afternoon safaris start mid-afternoon and often finish at sunset — great for elephants gathering near water and for photography. Both are rewarding; if you can only choose one, mornings are usually quieter on the tracks.",
              },
              {
                title: "What wildlife you may see",
                body: "Udawalawe is best known for wild Asian elephants, which are typically visible in small family groups. You may also see water buffalo, spotted deer, jackals, crocodiles, monitor lizards, and a wide range of birdlife including peafowl, eagles, and painted storks. We can't promise any specific sighting.",
              },
              {
                title: "What to wear and bring",
                body: "Muted colours, long sleeves for early mornings, a hat, sunscreen, and refillable water. A light rain layer during monsoon months. Binoculars and a zoom lens if you have them — a phone camera is fine for memories but not for wildlife detail.",
              },
              {
                title: "How to reach Udawalawe",
                body: null,
              },
              {
                title: "How long to stay",
                body: "A single half-day safari works well for travellers passing through. Two safaris in one day (or across two days) gives you a better chance of unhurried sightings. Photographers usually prefer the full-day option.",
              },
              {
                title: "Elephant Transit Home (ETH)",
                body: "Located just outside the park, the ETH cares for orphaned elephant calves until they can be released back into the wild. You can observe the calves from a viewing platform during feeding times (typically 9am, 12pm, 3pm, and 6pm). It's a completely ethical experience where the elephants' wellbeing comes first. You can easily combine a visit with your safari.",
              },
              {
                title: "Park etiquette",
                body: "Stay in the vehicle. Keep your voice low. No feeding. No leaning out. No drones. Respect posted distances. If a driver breaks these, tell them politely — and tell us.",
              },
            ].map((a, i) => (
              <Reveal key={a.title} delay={i * 60}>
                <TiltCard intensity={6} className="h-full">
                  <div className="card-3d card-shine h-full rounded-3xl p-7 sm:p-9"
                    style={{
                      background: "oklch(0.21 0.055 150)",
                      border: "1px solid oklch(1 0 0 / 0.08)",
                      boxShadow: "0 8px 32px oklch(0 0 0 / 0.3), inset 0 1px 0 oklch(1 0 0 / 0.08)",
                    }}
                  >
                    <h3 className="font-serif text-xl" style={{ color: "oklch(0.93 0.035 76)" }}>{a.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed" style={{ color: "oklch(0.65 0.03 76)" }}>
                      {a.body ?? (
                        <>
                          From the south coast (Mirissa, Galle, Hiriketiya): roughly 2–3 hours by road.
                          From Ella: around 2.5–3 hours down through the hills. From Colombo airport:
                          expect a longer travel day. Our{" "}
                          <Link to="/routes" className="font-semibold underline underline-offset-4 decoration-[oklch(0.56_0.17_40_/_0.5)] transition-colors hover:text-[oklch(0.56_0.17_40)]">
                            routes guide
                          </Link>{" "}
                          has more detail per starting point.
                        </>
                      )}
                    </p>
                  </div>
                </TiltCard>
              </Reveal>
            ))}
          </div>

          <Reveal delay={100}>
            <TiltCard intensity={4}>
              <div className="mt-10 rounded-3xl p-7 sm:p-9"
                style={{
                  background: "oklch(1 0 0 / 0.03)",
                  border: "1px solid oklch(1 0 0 / 0.08)",
                  boxShadow: "0 4px 16px oklch(0 0 0 / 0.2)",
                }}
              >
                <div className="font-serif text-2xl" style={{ color: "oklch(0.93 0.035 76)" }}>Related</div>
                <ul className="mt-4 space-y-3">
                  <li>
                    <Link className="font-semibold underline underline-offset-4 decoration-[oklch(0.56_0.17_40_/_0.5)] transition-colors hover:text-[oklch(0.56_0.17_40)] text-[oklch(0.85_0.02_78)]" to="/safaris">
                      Compare safari options
                    </Link>
                  </li>
                  <li>
                    <Link className="font-semibold underline underline-offset-4 decoration-[oklch(0.56_0.17_40_/_0.5)] transition-colors hover:text-[oklch(0.56_0.17_40)] text-[oklch(0.85_0.02_78)]" to="/routes">
                      Travel routes to Udawalawe
                    </Link>
                  </li>
                  <li>
                    <Link className="font-semibold underline underline-offset-4 decoration-[oklch(0.56_0.17_40_/_0.5)] transition-colors hover:text-[oklch(0.56_0.17_40)] text-[oklch(0.85_0.02_78)]" to="/ethical-safari">
                      Our ethical safari standard
                    </Link>
                  </li>
                </ul>
              </div>
            </TiltCard>
          </Reveal>
        </Section>
      </div>

      <div className="section-dark" style={{ borderTop: "1px solid oklch(1 0 0 / 0.06)" }}>
        <Section>
          <Reveal>
            <SectionHeading 
              title="Frequently asked questions" 
              eyebrow="FAQ" 
              titleClass="text-[oklch(0.93_0.035_76)]"
              introClass="text-[oklch(0.68_0.03_76)]"
            />
          </Reveal>
          <div className="mt-8">
            <FaqList items={faqs} />
          </div>
        </Section>
      </div>
    </>
  );
}
