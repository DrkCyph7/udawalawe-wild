import { createFileRoute } from "@tanstack/react-router";
import { Section, SectionHeading } from "@/components/section";
import { Reveal } from "@/components/reveal";
import elephant from "@/assets/ethical-safari-img.JPG";

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
      { property: "og:url", content: "https://udawalawe-wild.com/ethical-safari" },
      { property: "og:image", content: "https://udawalawe-wild.com/og-image.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: "https://udawalawe-wild.com/og-image.png" },
    ],
    links: [{ rel: "canonical", href: "https://udawalawe-wild.com/ethical-safari" }],
  }),
  component: EthicalPage,
});

function EthicalPage() {
  return (
    <>
      <Section>
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
          <Reveal direction="left">
            <SectionHeading
              eyebrow="Wildlife first"
              title="A quieter, kinder way to safari."
              intro="Udawalawe is home to wild elephants, water buffalo, crocodiles, peafowl, and hundreds of bird species. Our standard is designed so they barely notice we were there."
            />
          </Reveal>
          <Reveal direction="right" delay={100}>
            <div className="aspect-[4/5] overflow-hidden rounded-2xl">
              <img
                src={elephant}
                alt="Elephant in Sri Lankan grassland"
                loading="lazy"
                className="h-full w-full object-cover transition duration-700 hover:scale-[1.03]"
              />
            </div>
          </Reveal>
        </div>
      </Section>

      <div className="bg-[color:var(--sand)]/30">
        <Section>
          <Reveal>
            <SectionHeading title="On the tracks" eyebrow="Field code" />
          </Reveal>
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
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
                <div className="h-full rounded-xl border border-border bg-background p-6 transition-all duration-250 hover:border-[color:var(--terracotta)]/40 hover:shadow-md hover:-translate-y-1">
                  <div className="font-serif text-xl text-foreground">{c.t}</div>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Section>
      </div>

      <Section>
        <Reveal>
          <SectionHeading
            eyebrow="Partner verification"
            title="How we choose the operators we work with."
            intro="We're an independent booking platform. We don't own jeeps — we partner with licensed local operators who meet a clear standard."
          />
        </Reveal>
        <ol className="mt-10 grid gap-5 sm:grid-cols-2">
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
              <li className="flex gap-4 rounded-xl border border-border p-5 transition-all duration-200 hover:border-[color:var(--forest)]/30 hover:shadow-sm">
                <span className="font-serif text-2xl text-[color:var(--terracotta)]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-sm leading-relaxed text-foreground/85">{step}</span>
              </li>
            </Reveal>
          ))}
        </ol>
        <Reveal delay={80}>
          <p className="mt-10 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Supporting licensed local drivers and guides keeps expertise — and income — in the
            community that has cared for this park for generations.
          </p>
        </Reveal>
      </Section>
    </>
  );
}
