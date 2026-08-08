import { createFileRoute } from "@tanstack/react-router";
import { TransitionLink as Link } from "@/components/transition-link";
import { Section, SectionHeading } from "@/components/section";
import { Reveal } from "@/components/reveal";
import { FaqList } from "@/components/faq-list";
import { faqs } from "@/lib/content";
import landscape from "@/assets/landscape.jpg";

export const Route = createFileRoute("/guide")({
  head: () => ({
    meta: [
      { title: "Udawalawe visitor guide — what to know before you go" },
      {
        name: "description",
        content:
          "Practical guide to Udawalawe National Park: morning vs afternoon safari, wildlife, what to wear, how to get there, and park etiquette.",
      },
      { property: "og:title", content: "Udawalawe visitor guide" },
      { property: "og:description", content: "Everything to know before your Udawalawe safari." },
      { property: "og:type", content: "article" },
      { property: "og:url", content: "https://www.udawalawe-wild.com/guide" },
      { property: "og:image", content: "https://www.udawalawe-wild.com/og-image.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: "https://www.udawalawe-wild.com/og-image.png" },
    ],
    links: [{ rel: "canonical", href: "https://www.udawalawe-wild.com/guide" }],
  }),
  component: GuidePage,
});

function GuidePage() {
  return (
    <>
      <Section>
        <Reveal>
          <SectionHeading
            eyebrow="Visitor guide"
            title="Everything to know before your Udawalawe safari."
            intro="A short, honest guide from planners who help travellers here every week."
          />
        </Reveal>
      </Section>

      <Section className="pt-0">
        <Reveal direction="scale">
          <div className="grain overflow-hidden rounded-2xl max-h-[380px] sm:max-h-[500px]">
            <img
              src={landscape}
              alt="Udawalawe reservoir landscape at sunset"
              loading="lazy"
              width={1920}
              height={1080}
              className="h-full w-full object-cover max-h-[380px] sm:max-h-[500px]"
            />
          </div>
        </Reveal>
      </Section>

      <div className="bg-[color:var(--sand)]/30">
        <Section>
          <div className="grid gap-6 lg:grid-cols-2">
            {[
              {
                title: "Morning vs. afternoon safari",
                body: "Morning safaris begin before dawn. The air is cool, the light is soft, and wildlife tends to be most active. Afternoon safaris start mid-afternoon and often finish at sunset — great for elephants gathering near water and for photography. Both are rewarding; if you can only choose one, mornings are usually quieter on the tracks.",
              },
              {
                title: "What wildlife you may see",
                body: "Udawalawe is best known for wild Asian elephants, which are typically visible in small family groups. You may also see water buffalo, spotted deer, jackals, crocodiles, monitor lizards, and a wide range of birdlife including peafowl, eagles, and painted storks. We can't promise any specific sighting.",
              },
              {
                title: "What to wear and bring",
                body: "Muted colours, long sleeves for early mornings, a hat, sunscreen, and refillable water. A light rain layer during monsoon months. Binoculars and a zoom lens if you have them — a phone camera is fine for memories but not for wildlife detail.",
              },
              {
                title: "How to reach Udawalawe",
                body: null,
              },
              {
                title: "How long to stay",
                body: "A single half-day safari works well for travellers passing through. Two safaris in one day (or across two days) gives you a better chance of unhurried sightings. Photographers usually prefer the full-day option.",
              },
              {
                title: "Elephant Transit Home (ETH)",
                body: "Located just outside the park, the ETH cares for orphaned elephant calves until they can be released back into the wild. You can observe the calves from a viewing platform during feeding times (typically 9am, 12pm, 3pm, and 6pm). It's a completely ethical experience where the elephants' wellbeing comes first. You can easily combine a visit with your safari.",
              },
              {
                title: "Park etiquette",
                body: "Stay in the vehicle. Keep your voice low. No feeding. No leaning out. No drones. Respect posted distances. If a driver breaks these, tell them politely — and tell us.",
              },
            ].map((a, i) => (
              <Reveal key={a.title} delay={i * 60}>
                <div className="h-full rounded-xl border border-border/60 bg-background p-6 transition-shadow duration-250 hover:shadow-md">
                  <h3 className="font-serif text-xl text-foreground">{a.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {a.body ?? (
                      <>
                        From the south coast (Mirissa, Galle, Hiriketiya): roughly 2–3 hours by road.
                        From Ella: around 2.5–3 hours down through the hills. From Colombo airport:
                        expect a longer travel day. Our{" "}
                        <Link to="/routes" className="link-underline text-primary">
                          routes guide
                        </Link>{" "}
                        has more detail per starting point.
                      </>
                    )}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={100}>
            <div className="mt-10 rounded-xl border border-border bg-card p-6 text-sm sm:p-8">
              <div className="font-serif text-xl">Related</div>
              <ul className="mt-3 space-y-2">
                <li>
                  <Link className="link-underline text-primary" to="/safaris">
                    Compare safari options
                  </Link>
                </li>
                <li>
                  <Link className="link-underline text-primary" to="/routes">
                    Travel routes to Udawalawe
                  </Link>
                </li>
                <li>
                  <Link className="link-underline text-primary" to="/ethical-safari">
                    Our ethical safari standard
                  </Link>
                </li>
              </ul>
            </div>
          </Reveal>
        </Section>
      </div>

      <Section>
        <Reveal>
          <SectionHeading title="Frequently asked questions" eyebrow="FAQ" />
        </Reveal>
        <div className="mt-8">
          <FaqList items={faqs} />
        </div>
      </Section>
    </>
  );
}
