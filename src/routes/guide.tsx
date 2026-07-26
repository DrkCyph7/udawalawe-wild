import { createFileRoute, Link } from "@tanstack/react-router";
import { Section, SectionHeading } from "@/components/section";
import { FaqList } from "@/components/faq-list";
import { faqs } from "@/lib/content";
import landscape from "@/assets/landscape.jpg";

export const Route = createFileRoute("/guide")({
  head: () => ({
    meta: [
      { title: "Udawalawe visitor guide — what to know before you go" },
      { name: "description", content: "Practical guide to Udawalawe National Park: morning vs afternoon safari, wildlife, what to wear, how to get there, and park etiquette." },
      { property: "og:title", content: "Udawalawe visitor guide" },
      { property: "og:description", content: "Everything to know before your Udawalawe safari." },
    ],
    links: [{ rel: "canonical", href: "/guide" }],
  }),
  component: GuidePage,
});

function GuidePage() {
  return (
    <>
      <Section>
        <SectionHeading
          eyebrow="Visitor guide"
          title="Everything to know before your Udawalawe safari."
          intro="A short, honest guide from planners who help travellers here every week."
        />
      </Section>

      <Section className="pt-0">
        <div className="grain overflow-hidden rounded-sm">
          <img
            src={landscape}
            alt="Udawalawe reservoir landscape at sunset"
            loading="lazy"
            width={1920}
            height={1080}
            className="h-full w-full object-cover"
          />
        </div>
      </Section>

      <div className="bg-[color:var(--sand)]/30">
        <Section>
          <div className="grid gap-10 lg:grid-cols-2">
            <Article title="Morning vs. afternoon safari">
              Morning safaris begin before dawn. The air is cool, the light is
              soft, and wildlife tends to be most active. Afternoon safaris
              start mid-afternoon and often finish at sunset — great for
              elephants gathering near water and for photography. Both are
              rewarding; if you can only choose one, mornings are usually
              quieter on the tracks.
            </Article>
            <Article title="What wildlife you may see">
              Udawalawe is best known for wild Asian elephants, which are
              typically visible in small family groups. You may also see water
              buffalo, spotted deer, jackals, crocodiles, monitor lizards, and
              a wide range of birdlife including peafowl, eagles, and painted
              storks. We can't promise any specific sighting.
            </Article>
            <Article title="What to wear and bring">
              Muted colours, long sleeves for early mornings, a hat, sunscreen,
              and refillable water. A light rain layer during monsoon months.
              Binoculars and a zoom lens if you have them — a phone camera is
              fine for memories but not for wildlife detail.
            </Article>
            <Article title="How to reach Udawalawe">
              From the south coast (Mirissa, Galle, Hiriketiya): roughly 2–3
              hours by road. From Ella: around 2.5–3 hours down through the
              hills. From Colombo airport: expect a longer travel day. Our{" "}
              <Link to="/routes" className="text-primary underline underline-offset-4">
                routes guide
              </Link>{" "}
              has more detail per starting point.
            </Article>
            <Article title="How long to stay">
              A single half-day safari works well for travellers passing
              through. Two safaris in one day (or across two days) gives you a
              better chance of unhurried sightings. Photographers usually
              prefer the full-day option.
            </Article>
            <Article title="Park etiquette">
              Stay in the vehicle. Keep your voice low. No feeding. No leaning
              out. No drones. Respect posted distances. If a driver breaks
              these, tell them politely — and tell us.
            </Article>
          </div>
          <div className="mt-12 rounded-sm border border-border bg-card p-6 text-sm sm:p-8">
            <div className="font-serif text-xl">Related</div>
            <ul className="mt-3 space-y-2">
              <li><Link className="text-primary underline underline-offset-4" to="/safaris">Compare safari options</Link></li>
              <li><Link className="text-primary underline underline-offset-4" to="/routes">Travel routes to Udawalawe</Link></li>
              <li><Link className="text-primary underline underline-offset-4" to="/ethical-safari">Our ethical safari standard</Link></li>
            </ul>
          </div>
        </Section>
      </div>

      <Section>
        <SectionHeading title="Frequently asked questions" eyebrow="FAQ" />
        <div className="mt-8">
          <FaqList items={faqs} />
        </div>
      </Section>
    </>
  );
}

function Article({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border-t border-foreground/15 pt-6">
      <h3 className="font-serif text-2xl text-foreground">{title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{children}</p>
    </div>
  );
}