import { createFileRoute, Link } from "@tanstack/react-router";
import { Clock, Users, MapPin, ShieldCheck, CheckCircle2, ArrowUpRight } from "lucide-react";
import { Section, SectionHeading } from "@/components/section";
import { safaris } from "@/lib/content";
import elephantPortrait from "@/assets/elephant-portrait.jpg";
import safariJeep from "@/assets/safari-jeep.jpg";
import wildlife from "@/assets/wildlife.jpg";
import landscape from "@/assets/landscape.jpg";

export const Route = createFileRoute("/safaris")({
  head: () => ({
    meta: [
      { title: "Safari Options — Udawalawe Wild" },
      {
        name: "description",
        content:
          "Compare private morning, afternoon, full-day, and safari + Ella transfer options in Udawalawe. Verified local hosts.",
      },
      { property: "og:title", content: "Safari Options — Udawalawe Wild" },
      {
        property: "og:description",
        content: "Compare private safari options in Udawalawe National Park.",
      },
    ],
    links: [{ rel: "canonical", href: "/safaris" }],
  }),
  component: SafarisPage,
});

const imgs = [elephantPortrait, safariJeep, wildlife, landscape];

function SafarisPage() {
  return (
    <>
      <Section className="pb-6 pt-12">
        <SectionHeading
          eyebrow="Safari Options"
          title="Private jeeps. Verified drivers. Wildlife first."
          intro="Choose a shape for your day. We'll send verified jeep availability and clear quotes upon request."
        />
      </Section>

      <Section className="pt-4 pb-20">
        <div className="grid gap-12">
          {safaris.map((s, i) => (
            <article
              key={s.slug}
              className="grid gap-8 rounded-3xl border border-border/80 bg-card/60 p-6 sm:p-8 shadow-xs backdrop-blur transition duration-300 hover:border-primary/40 lg:grid-cols-[1fr_1.2fr] lg:gap-12"
            >
              <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-muted relative">
                <img
                  src={imgs[i]}
                  alt={s.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-700 hover:scale-105"
                />
                <div className="absolute top-4 left-4 bg-black/60 backdrop-blur px-3 py-1 rounded-full text-[11px] font-semibold text-white uppercase tracking-wider">
                  Option 0{i + 1}
                </div>
              </div>
              <div className="flex flex-col justify-between">
                <div>
                  <h2 className="font-serif text-3xl font-medium text-foreground sm:text-4xl">{s.name}</h2>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.short}</p>

                  <dl className="mt-6 grid gap-x-8 gap-y-4 sm:grid-cols-2">
                    <Item icon={Clock} label="Duration" value={s.duration} />
                    <Item icon={Users} label="Ideal for" value={s.ideal} />
                    <Item icon={MapPin} label="Pickup" value={s.pickup} />
                    <Item icon={ShieldCheck} label="Ethical approach" value={s.ethical} />
                  </dl>

                  <div className="mt-6 border-t border-border/60 pt-5">
                    <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                      What's included in jeep option
                    </div>
                    <ul className="grid gap-2 text-xs text-foreground/85 sm:grid-cols-2">
                      {s.includes.map((inc) => (
                        <li key={inc} className="flex items-center gap-2">
                          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                          <span>{inc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-8 pt-4">
                  <Link
                    to="/book"
                    className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition duration-300 hover:bg-primary/90 hover:scale-105"
                  >
                    <span>Check Safari Availability</span>
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Section>
    </>
  );
}

function Item({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: string }) {
  return (
    <div className="flex items-start gap-2.5">
      <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10 text-primary shrink-0 mt-0.5">
        <Icon className="h-4 w-4" />
      </div>
      <div>
        <dt className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
          {label}
        </dt>
        <dd className="mt-0.5 text-xs leading-relaxed text-foreground">{value}</dd>
      </div>
    </div>
  );
}

