import { createFileRoute, Link } from "@tanstack/react-router";
import { Section, SectionHeading } from "@/components/section";
import { safaris } from "@/lib/content";
import elephantPortrait from "@/assets/elephant-portrait.jpg";
import safariJeep from "@/assets/safari-jeep.jpg";
import wildlife from "@/assets/wildlife.jpg";
import landscape from "@/assets/landscape.jpg";

export const Route = createFileRoute("/safaris")({
  head: () => ({
    meta: [
      { title: "Safari options — Udawalawe Wild" },
      { name: "description", content: "Compare private morning, afternoon, full-day, and safari + Ella transfer options in Udawalawe. Transparent quotes, verified operators." },
      { property: "og:title", content: "Safari options — Udawalawe Wild" },
      { property: "og:description", content: "Compare private safari options in Udawalawe National Park." },
    ],
    links: [{ rel: "canonical", href: "/safaris" }],
  }),
  component: SafarisPage,
});

const imgs = [elephantPortrait, safariJeep, wildlife, landscape];

function SafarisPage() {
  return (
    <>
      <Section className="pb-6">
        <SectionHeading
          eyebrow="Safari options"
          title="Private jeeps. Verified drivers. Wildlife first."
          intro="Choose a shape for your day. We'll send a fixed, transparent quote before you confirm anything."
        />
      </Section>

      <Section className="pt-4">
        <div className="grid gap-10">
          {safaris.map((s, i) => (
            <article
              key={s.slug}
              className="grid gap-6 border-t border-border pt-10 lg:grid-cols-[1fr_1.2fr] lg:gap-12"
            >
              <div className="aspect-[4/3] overflow-hidden rounded-sm bg-muted">
                <img
                  src={imgs[i]}
                  alt={s.name}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <div className="text-[11px] uppercase tracking-widest text-[color:var(--terracotta)]">
                  Option 0{i + 1}
                </div>
                <h2 className="mt-2 font-serif text-3xl text-foreground sm:text-4xl">
                  {s.name}
                </h2>
                <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                  {s.short}
                </p>

                <dl className="mt-6 grid gap-x-8 gap-y-4 sm:grid-cols-2">
                  <Item label="Duration" value={s.duration} />
                  <Item label="Ideal for" value={s.ideal} />
                  <Item label="Pickup" value={s.pickup} />
                  <Item label="Ethical approach" value={s.ethical} />
                  <Item label="Cancellation" value={s.cancellation} />
                  <Item
                    label="Price"
                    value="Receive a transparent fixed quote before you confirm."
                  />
                </dl>

                <div className="mt-6">
                  <div className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                    What's included
                  </div>
                  <ul className="mt-3 grid gap-2 text-sm text-foreground/85 sm:grid-cols-2">
                    {s.includes.map((inc) => (
                      <li key={inc} className="flex gap-2">
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[color:var(--terracotta)]" />
                        {inc}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8">
                  <Link
                    to="/book"
                    className="inline-block rounded-sm bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition hover:bg-primary/90"
                  >
                    Request availability
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