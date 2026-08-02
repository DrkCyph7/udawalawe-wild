import { createFileRoute, Link } from "@tanstack/react-router";
import { Section, SectionHeading } from "@/components/section";
import { Reveal } from "@/components/reveal";
import { safaris } from "@/lib/content";
import elephantPortrait from "@/assets/elephant-portrait.jpg";
import safariJeep from "@/assets/safari-jeep.jpg";
import wildlife from "@/assets/wildlife.JPG";
import landscape from "@/assets/landscape.jpg";
import { CalendarCheck, CheckCircle } from "lucide-react";

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
      { property: "og:url", content: "https://udawalawe-wild.com/safaris" },
      { property: "og:image", content: "https://udawalawe-wild.com/og-image.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: "https://udawalawe-wild.com/og-image.png" },
    ],
    links: [{ rel: "canonical", href: "https://udawalawe-wild.com/safaris" }],
  }),
  component: SafarisPage,
});

const imgs = [elephantPortrait, safariJeep, wildlife, landscape, elephantPortrait];

function SafarisPage() {
  return (
    <>
      <Section className="pb-6">
        <Reveal>
          <SectionHeading
            eyebrow="Safari options"
            title="Private jeeps. Verified drivers. Wildlife first."
            intro="Choose a shape for your day. We'll send a fixed, transparent quote before you confirm anything."
          />
        </Reveal>
      </Section>

      <Section className="pt-4">
        <div className="grid gap-16">
          {safaris.map((s, i) => (
            <Reveal key={s.slug} delay={i * 60}>
              <article className="grid gap-6 overflow-hidden rounded-2xl border border-border bg-card p-6 transition-shadow duration-300 hover:shadow-lg lg:grid-cols-[1fr_1.2fr] lg:gap-10">
                <div className="aspect-[4/3] overflow-hidden rounded-xl bg-muted">
                  <img
                    src={imgs[i]}
                    alt={s.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-700 hover:scale-[1.04]"
                  />
                </div>
                <div>
                  <div className="text-[11px] uppercase tracking-widest text-[color:var(--terracotta)]">
                    Option 0{i + 1}
                  </div>
                  <h2 className="mt-2 font-serif text-3xl text-foreground sm:text-4xl">{s.name}</h2>
                  <p className="mt-3 text-base leading-relaxed text-muted-foreground">{s.short}</p>

                  <dl className="mt-6 grid gap-x-8 gap-y-4 sm:grid-cols-2">
                    <Item label="Duration" value={s.duration} />
                    <Item label="Ideal for" value={s.ideal} />
                    <Item label="Pickup" value={s.pickup} />
                    <Item label="Ethical approach" value={s.ethical} />
                    <Item label="Cancellation" value={s.cancellation} />
                    <Item label="Price" value="Receive a transparent fixed quote before you confirm." />
                  </dl>

                  <div className="mt-6">
                    <div className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                      What's included
                    </div>
                    <ul className="mt-3 grid gap-2 text-sm text-foreground/85 sm:grid-cols-2">
                      {s.includes.map((inc) => (
                        <li key={inc} className="flex items-start gap-2">
                          <CheckCircle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[color:var(--terracotta)]" aria-hidden="true" />
                          {inc}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-8">
                    <Link
                      to="/book"
                      className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-all duration-200 hover:bg-primary/85 hover:scale-[1.02] hover:shadow-md"
                    >
                      <CalendarCheck className="h-4 w-4" aria-hidden="true" />
                      Request availability
                    </Link>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  );
}

function Item({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground">
        {label}
      </dt>
      <dd className="mt-1 text-sm leading-relaxed text-foreground">{value}</dd>
    </div>
  );
}
