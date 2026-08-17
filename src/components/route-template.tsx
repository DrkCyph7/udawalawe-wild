import { TransitionLink as Link } from "@/components/transition-link";
import { Section, SectionHeading } from "@/components/section";
import { Reveal } from "@/components/reveal";
import { EnquiryForm } from "@/components/enquiry-form";
import { FaqList } from "@/components/faq-list";
import { faqs } from "@/lib/content";
import type { RouteInfo } from "@/lib/content";
import landscape from "@/assets/landscape.src.jpg";
import { CalendarCheck, Compass } from "lucide-react";
import { TiltCard } from "@/components/tilt-card";
import { motion } from "framer-motion";
import { Magnetic } from "@/components/magnetic";

export function RouteTemplate({ info }: { info: RouteInfo }) {
  return (
    <>
      {/* Hero */}
      <div className="page-hero relative isolate overflow-hidden">
        <img
          src={landscape.src}
          alt={`Grassland landscape.src in Udawalawe National Park`}
          loading="eager"
          className="absolute inset-0 -z-10 h-full w-full object-cover opacity-30"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[oklch(0.22_0.02_135_/_0.8)] to-[oklch(0.22_0.02_135)]" />
        <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-8 pt-20 pb-10">
          <Reveal>
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-4 inline-flex items-center gap-2 rounded-full px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20"
            >
              <Compass className="h-3.5 w-3.5 text-[color:var(--terracotta)]" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[color:var(--ivory)]/90">
                Safari from {info.from}
              </span>
            </motion.div>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl leading-[1.08] text-[color:var(--ivory)]">
              Udawalawe safaris
              <br />
              <span className="text-[color:var(--terracotta)]">from {info.from}.</span>
            </h1>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-[color:var(--ivory)]/80">
              {info.summary}
            </p>
            <div className="mt-4 text-sm font-semibold uppercase tracking-widest text-muted-foreground">
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
                titleClass=""
                introClass=""
              />
              <ul className="mt-8 space-y-3 text-sm text-foreground">
                {info.tips.map((t, i) => (
                  <Reveal key={t} delay={i * 60}>
                    <TiltCard intensity={4}>
                      <li className="flex gap-3 rounded-2xl p-5 card-glass">
                        <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--terracotta)]" />
                        {t}
                      </li>
                    </TiltCard>
                  </Reveal>
                ))}
              </ul>

              <Reveal delay={120}>
                <TiltCard intensity={6}>
                  <div className="mt-8 rounded-3xl p-7 card-3d card-shine card-glass">
                    <div className="font-serif text-2xl text-foreground">Safari + transfer</div>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      Travelling on the same day? We can combine your safari with an onward or
                      return transfer so you don't lose a day to driving.
                    </p>
                    <Magnetic>
                      <Link
                        to="/safaris"
                        className="mt-5 inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition-all duration-300 hover:scale-[1.04] bg-[color:var(--terracotta)] text-[color:var(--ivory)] shadow-[0_4px_20px_oklch(0.70_0.12_85_/_0.4)]"
                      >
                        <CalendarCheck className="h-4 w-4" aria-hidden="true" />
                        See safari options
                      </Link>
                    </Magnetic>
                  </div>
                </TiltCard>
              </Reveal>
            </Reveal>

            <Reveal direction="right" delay={100}>
              <TiltCard intensity={4}>
                <div id="enquire" className="card-3d card-shine rounded-3xl p-6 sm:p-8 card-glass">
                  <div className="mb-6">
                    <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-[color:var(--terracotta)]">
                      Enquire
                    </div>
                    <div className="font-serif text-3xl mt-1 text-foreground">Start planning.</div>
                    <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
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
            <SectionHeading eyebrow="FAQ" title="Common questions" titleClass="" introClass="" />
          </Reveal>
          <div className="mt-8">
            <FaqList items={faqs} />
          </div>
        </Section>
      </div>
    </>
  );
}
