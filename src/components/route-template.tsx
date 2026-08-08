import { TransitionLink as Link } from "@/components/transition-link";
import { Section, SectionHeading } from "@/components/section";
import { Reveal } from "@/components/reveal";
import { EnquiryForm } from "@/components/enquiry-form";
import { FaqList } from "@/components/faq-list";
import { faqs } from "@/lib/content";
import type { RouteInfo } from "@/lib/content";
import landscape from "@/assets/landscape.jpg";
import { CalendarCheck, Compass } from "lucide-react";
import { TiltCard } from "@/components/tilt-card";
import { motion } from "framer-motion";

export function RouteTemplate({ info }: { info: RouteInfo }) {
  return (
    <>
      {/* Hero */}
      <div className="page-hero relative isolate overflow-hidden">
        <img
          src={landscape}
          alt={`Grassland landscape in Udawalawe National Park`}
          loading="eager"
          className="absolute inset-0 -z-10 h-full w-full object-cover opacity-30"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[oklch(0.18_0.05_150_/_0.8)] to-[oklch(0.18_0.05_150)]" />
        <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-8 pt-20 pb-10">
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
                Safari from {info.from}
              </span>
            </motion.div>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl leading-[1.08]" style={{ color: "oklch(0.93 0.035 76)" }}>
              Udawalawe safaris<br />
              <span style={{ color: "oklch(0.56 0.17 40)" }}>from {info.from}.</span>
            </h1>
            <p className="mt-4 max-w-xl text-base leading-relaxed" style={{ color: "oklch(0.68 0.03 76)" }}>
              {info.summary}
            </p>
            <div className="mt-4 text-sm font-semibold uppercase tracking-widest" style={{ color: "oklch(0.72 0.03 76)" }}>
              {info.drive}
            </div>
          </Reveal>
        </div>
      </div>

      <div className="section-dark">
        <Section>
          <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr]">
            <Reveal direction="left">
              <SectionHeading
                eyebrow="Route notes"
                title={`Planning from ${info.from}.`}
                intro="Small details that make the day feel unhurried."
                titleClass="text-[oklch(0.93_0.035_76)]"
                introClass="text-[oklch(0.68_0.03_76)]"
              />
              <ul className="mt-8 space-y-3 text-sm" style={{ color: "oklch(0.85 0.02 78)" }}>
                {info.tips.map((t, i) => (
                  <Reveal key={t} delay={i * 60}>
                    <TiltCard intensity={4}>
                      <li className="flex gap-3 rounded-2xl p-5"
                        style={{
                          background: "oklch(1 0 0 / 0.03)",
                          border: "1px solid oklch(1 0 0 / 0.08)",
                          boxShadow: "0 4px 16px oklch(0 0 0 / 0.2)",
                        }}>
                        <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: "oklch(0.56 0.17 40)" }} />
                        {t}
                      </li>
                    </TiltCard>
                  </Reveal>
                ))}
              </ul>

              <Reveal delay={120}>
                <TiltCard intensity={6}>
                  <div className="mt-8 rounded-3xl p-7 card-3d card-shine"
                    style={{
                      background: "oklch(0.21 0.055 150)",
                      border: "1px solid oklch(1 0 0 / 0.08)",
                      boxShadow: "0 8px 32px oklch(0 0 0 / 0.3)",
                    }}>
                    <div className="font-serif text-2xl" style={{ color: "oklch(0.93 0.035 76)" }}>Safari + transfer</div>
                    <p className="mt-3 text-sm leading-relaxed" style={{ color: "oklch(0.65 0.03 76)" }}>
                      Travelling on the same day? We can combine your safari with an onward or return
                      transfer so you don't lose a day to driving.
                    </p>
                    <Link
                      to="/safaris"
                      className="mt-5 inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition-all duration-300 hover:scale-[1.04]"
                      style={{
                        background: "oklch(0.56 0.17 40)",
                        color: "oklch(0.97 0.018 80)",
                        boxShadow: "0 4px 20px oklch(0.56 0.17 40 / 0.4)",
                      }}
                    >
                      <CalendarCheck className="h-4 w-4" aria-hidden="true" />
                      See safari options
                    </Link>
                  </div>
                </TiltCard>
              </Reveal>
            </Reveal>

            <Reveal direction="right" delay={100}>
              <TiltCard intensity={4}>
                <div
                  id="enquire"
                  className="card-3d card-shine rounded-3xl p-6 sm:p-8"
                  style={{
                    background: "oklch(1 0 0 / 0.02)",
                    border: "1px solid oklch(1 0 0 / 0.08)",
                    backdropFilter: "blur(20px)",
                  }}
                >
                  <div className="mb-6">
                    <div className="text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: "oklch(0.56 0.17 40)" }}>
                      Enquire
                    </div>
                    <div className="font-serif text-3xl mt-1" style={{ color: "oklch(0.93 0.035 76)" }}>Start planning.</div>
                    <p className="mt-2 text-xs leading-relaxed" style={{ color: "oklch(0.65 0.03 76)" }}>
                      A real person replies within one business day with verified options.
                    </p>
                  </div>
                  {/* The form inherits dark theme styling via the theme prop. */}
                  <EnquiryForm defaultPickup={info.from} theme="dark" />
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
              eyebrow="FAQ" 
              title="Common questions" 
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
