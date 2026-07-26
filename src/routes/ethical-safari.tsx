import { createFileRoute } from "@tanstack/react-router";
import { Section, SectionHeading } from "@/components/section";
import elephant from "@/assets/elephant-portrait.jpg";

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
    ],
    links: [{ rel: "canonical", href: "/ethical-safari" }],
  }),
  component: EthicalPage,
});

function EthicalPage() {
  return (
    <>
      <Section>
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div>
            <SectionHeading
              eyebrow="Wildlife first"
              title="A quieter, kinder way to safari."
              intro="Udawalawe is home to wild elephants, water buffalo, crocodiles, peafowl, and hundreds of bird species. Our standard is designed so they barely notice we were there."
            />
          </div>
          <div className="aspect-[4/5] overflow-hidden rounded-sm">
            <img
              src={elephant}
              alt="Elephant in Sri Lankan grassland"
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </Section>

      <div className="bg-[color:var(--sand)]/30">
        <Section>
          <SectionHeading title="On the tracks" eyebrow="Field code" />
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
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
            ].map((c) => (
              <div key={c.t} className="border-t border-foreground/20 pt-5">
                <div className="font-serif text-xl text-foreground">{c.t}</div>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.d}</p>
              </div>
            ))}
          </div>
        </Section>
      </div>

      <Section>
        <SectionHeading
          eyebrow="Partner verification"
          title="How we choose the operators we work with."
          intro="We're an independent booking platform. We don't own jeeps — we partner with licensed local operators who meet a clear standard."
        />
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
            <li key={step} className="flex gap-4 border-t border-border pt-5">
              <span className="font-serif text-2xl text-[color:var(--terracotta)]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-sm leading-relaxed text-foreground/85">{step}</span>
            </li>
          ))}
        </ol>
        <p className="mt-10 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          Supporting licensed local drivers and guides keeps expertise — and income — in the
          community that has cared for this park for generations.
        </p>
      </Section>
    </>
  );
}
