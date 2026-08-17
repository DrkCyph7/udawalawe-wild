"use client";

import { TransitionLink as Link } from "@/components/transition-link";
import { Section, SectionHeading } from "@/components/section";
import { Reveal } from "@/components/reveal";
import { FaqList } from "@/components/faq-list";
import { faqs } from "@/lib/content";
import landscape from "@/assets/landscape.jpg";
import { Compass } from "lucide-react";
import { TiltCard } from "@/components/tilt-card";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef } from "react";


export default function GuidePage() {
  const prefersReducedMotion = useReducedMotion();
  const imageRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: imageRef,
    offset: ["start end", "end start"],
  });
  const parallaxY = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? ["0%", "0%"] : ["-8%", "8%"],
  );

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
        name: "Visitor Guide",
        item: "https://www.udawalawe-wild.com/guide",
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
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
                Visitor guide
              </span>
            </motion.div>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl leading-[1.08] text-[color:var(--ivory)]">
              Everything to know
              <br />
              <span className="text-[color:var(--ivory)]/80">before you go.</span>
            </h1>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-[color:var(--ivory)]/80">
              A short, honest guide from planners who help travellers here every week.
            </p>
          </Reveal>
        </div>
      </div>

      <div className="section-dark pb-8">
        <Section className="pt-0">
          <Reveal direction="scale">
            <TiltCard intensity={3}>
              <div
                ref={imageRef}
                className="grain overflow-hidden rounded-[2rem] h-[380px] sm:h-[500px]"
                style={{ boxShadow: "0 24px 64px oklch(0 0 0 / 0.4)" }}
              >
                <motion.img
                  style={{ y: parallaxY, scale: 1.16 }}
                  src={landscape}
                  alt="Udawalawe reservoir landscape at sunset"
                  loading="lazy"
                  width={1920}
                  height={1080}
                  className="h-full w-full object-cover"
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
                  <div className="card-3d card-shine h-full rounded-3xl p-7 sm:p-9 card-glass">
                    <h3 className="font-serif text-xl text-foreground">{a.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      {a.body ?? (
                        <>
                          From the south coast (Mirissa, Galle, Hiriketiya): roughly 2–3 hours by
                          road. From Ella: around 2.5–3 hours down through the hills. From Colombo
                          airport: expect a longer travel day. Our{" "}
                          <Link
                            to="/routes"
                            className="font-semibold underline underline-offset-4 decoration-[color:var(--terracotta)]/50 transition-colors hover:text-[color:var(--terracotta)] text-foreground"
                          >
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
              <div className="mt-10 rounded-3xl p-7 sm:p-9 card-glass">
                <div className="font-serif text-2xl text-foreground">Related</div>
                <ul className="mt-4 space-y-3">
                  <li>
                    <Link
                      className="font-semibold underline underline-offset-4 decoration-[color:var(--terracotta)]/50 transition-colors hover:text-[color:var(--terracotta)] text-muted-foreground"
                      to="/safaris"
                    >
                      Compare safari options
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="font-semibold underline underline-offset-4 decoration-[color:var(--terracotta)]/50 transition-colors hover:text-[color:var(--terracotta)] text-muted-foreground"
                      to="/routes"
                    >
                      Travel routes to Udawalawe
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="font-semibold underline underline-offset-4 decoration-[color:var(--terracotta)]/50 transition-colors hover:text-[color:var(--terracotta)] text-muted-foreground"
                      to="/ethical-safari"
                    >
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
              titleClass=""
              introClass=""
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
