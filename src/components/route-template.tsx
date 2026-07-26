import { Link } from "@tanstack/react-router";
import { Section, SectionHeading } from "@/components/section";
import { EnquiryForm } from "@/components/enquiry-form";
import { FaqList } from "@/components/faq-list";
import { faqs } from "@/lib/content";
import type { RouteInfo } from "@/lib/content";
import landscape from "@/assets/landscape.jpg";

export function RouteTemplate({ info }: { info: RouteInfo }) {
  return (
    <>
      <section className="relative isolate overflow-hidden">
        <img
          src={landscape}
          alt=""
          aria-hidden
          loading="eager"
          className="absolute inset-0 -z-10 h-full w-full object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-[oklch(0.22_0.035_155_/_0.7)]" />
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
          <div>
            <SectionHeading
              eyebrow="Route notes"
              title={`Planning from ${info.from}.`}
              intro="Small details that make the day feel unhurried."
            />
            <ul className="mt-8 space-y-4 text-sm text-foreground/85">
              {info.tips.map((t) => (
                <li key={t} className="flex gap-3 border-t border-border pt-4">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--terracotta)]" />
                  {t}
                </li>
              ))}
            </ul>

            <div className="mt-10 rounded-sm border border-border bg-card p-6">
              <div className="font-serif text-xl">Safari + transfer</div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Travelling on the same day? We can combine your safari with an onward or return
                transfer so you don't lose a day to driving.
              </p>
              <Link
                to="/safaris"
                className="mt-4 inline-block text-sm font-medium text-primary underline underline-offset-4"
              >
                See safari + transfer options →
              </Link>
            </div>
          </div>

          <div
            id="enquire"
            className="rounded-sm border border-border bg-card p-5 shadow-sm sm:p-7"
          >
            <div className="mb-4">
              <div className="text-xs uppercase tracking-widest text-[color:var(--terracotta)]">
                Enquire
              </div>
              <div className="font-serif text-2xl">Start planning from {info.from}.</div>
            </div>
            <EnquiryForm defaultPickup={info.from} />
          </div>
        </div>
      </Section>

      <div className="bg-[color:var(--sand)]/30">
        <Section>
          <SectionHeading eyebrow="FAQ" title="Common questions" />
          <div className="mt-8">
            <FaqList items={faqs} />
          </div>
        </Section>
      </div>
    </>
  );
}
