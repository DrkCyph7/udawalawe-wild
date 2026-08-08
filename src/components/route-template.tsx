import { Link } from "@tanstack/react-router";
import { Section, SectionHeading } from "@/components/section";
import { Reveal } from "@/components/reveal";
import { EnquiryForm } from "@/components/enquiry-form";
import { FaqList } from "@/components/faq-list";
import { faqs } from "@/lib/content";
import type { RouteInfo } from "@/lib/content";
import landscape from "@/assets/landscape.jpg";
import { CalendarCheck } from "lucide-react";

export function RouteTemplate({ info }: { info: RouteInfo }) {
  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden">
        <img
          src={landscape}
          alt="Grassland landscape in Udawalawe National Park"
          loading="eager"
          className="absolute inset-0 -z-10 h-full w-full object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-[oklch(0.22_0.035_155_/_0.75)]" />
        <div className="mx-auto max-w-4xl px-5 py-20 text-[color:var(--ivory)] sm:px-8 sm:py-28">
          <div className="text-xs uppercase tracking-[0.25em] text-[color:var(--ivory)]/70">
            Safari from {info.from}
          </div>
          <h1 className="mt-3 font-serif text-4xl leading-tight sm:text-5xl md:text-6xl">
            Udawalawe safaris from {info.from}.
          </h1>
          <p className="mt-5 max-w-xl text-base text-[color:var(--ivory)]/85 sm:text-lg">
            {info.summary}
          </p>
          <div className="mt-5 text-sm text-[color:var(--ivory)]/70">{info.drive}</div>
        </div>
      </section>

      <Section>
        <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr]">
          <Reveal direction="left">
            <SectionHeading
              eyebrow="Route notes"
              title={`Planning from ${info.from}.`}
              intro="Small details that make the day feel unhurried."
            />
            <ul className="mt-8 space-y-3 text-sm text-foreground/85">
              {info.tips.map((t, i) => (
                <Reveal key={t} delay={i * 60}>
                  <li className="flex gap-3 rounded-xl border border-border bg-card p-4 transition-shadow duration-200 hover:shadow-sm">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--terracotta)]" />
                    {t}
                  </li>
                </Reveal>
              ))}
            </ul>

            <Reveal delay={120}>
              <div className="mt-8 rounded-xl border border-border bg-[color:var(--sand)]/40 p-6">
                <div className="font-serif text-xl">Safari + transfer</div>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Travelling on the same day? We can combine your safari with an onward or return
                  transfer so you don't lose a day to driving.
                </p>
                <Link
                  to="/safaris"
                  className="link-underline mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary"
                >
                  See safari + transfer options
                  <CalendarCheck className="h-3.5 w-3.5" aria-hidden="true" />
                </Link>
              </div>
            </Reveal>
          </Reveal>

          <Reveal direction="right" delay={100}>
            <div
              id="enquire"
              className="rounded-xl border border-border bg-card p-5 shadow-sm sm:p-7"
            >
              <div className="mb-4">
                <div className="text-xs uppercase tracking-widest text-[color:var(--terracotta)]">
                  Enquire
                </div>
                <div className="font-serif text-2xl">Start planning from {info.from}.</div>
                <p className="mt-1 text-xs text-muted-foreground">
                  A real person replies within one business day with verified options.
                </p>
              </div>
              <EnquiryForm defaultPickup={info.from} />
            </div>
          </Reveal>
        </div>
      </Section>

      <div className="bg-[color:var(--sand)]/30">
        <Section>
          <Reveal>
            <SectionHeading eyebrow="FAQ" title="Common questions" />
          </Reveal>
          <div className="mt-8">
            <FaqList items={faqs} />
          </div>
        </Section>
      </div>
    </>
  );
}
