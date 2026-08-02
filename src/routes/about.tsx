import { createFileRoute, Link } from "@tanstack/react-router";
import { Section, SectionHeading } from "@/components/section";
import { Reveal } from "@/components/reveal";
import portrait from "@/assets/elephant-portrait.jpg";
import { CalendarCheck } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Udawalawe Wild — an independent safari booking platform" },
      {
        name: "description",
        content:
          "Udawalawe Wild is an independent online booking platform partnering with verified local safari operators in Udawalawe, Sri Lanka.",
      },
      { property: "og:title", content: "About Udawalawe Wild" },
      {
        property: "og:description",
        content: "An independent, wildlife-first safari booking platform.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://udawalawe-wild.com/about" },
      { property: "og:image", content: "https://udawalawe-wild.com/og-image.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: "https://udawalawe-wild.com/og-image.png" },
    ],
    links: [{ rel: "canonical", href: "https://udawalawe-wild.com/about" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <Section>
        <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-center">
          <Reveal direction="left">
            <SectionHeading
              eyebrow="Our story"
              title="Simpler. More transparent. Kinder to wildlife."
              intro="Udawalawe Wild exists to make booking a safari simpler, more transparent, and more respectful of wildlife."
            />
            <div className="mt-6 space-y-4 text-sm leading-relaxed text-foreground/85">
              <p>
                We're not a tour operator. We don't own jeeps or dress our drivers in branded
                uniforms. We're an independent online booking platform, based between Sri Lanka and
                travellers arriving from all over the world.
              </p>
              <p>
                Our job is to connect you with carefully verified, licensed local safari operators —
                and to make sure the experience you're paying for is the one that actually happens
                in the park.
              </p>
              <p>
                We publish fixed quotes before you confirm. We answer on WhatsApp like humans, not
                scripts. And we hold every partner to the same wildlife-first standard.
              </p>
            </div>
          </Reveal>
          <Reveal direction="right" delay={100}>
            <div className="aspect-[4/5] overflow-hidden rounded-2xl">
              <img
                src={portrait}
                alt="Wild elephant in Udawalawe"
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
            <SectionHeading eyebrow="How we operate" title="Independent booking platform." />
          </Reveal>
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {[
              {
                t: "We don't own the jeeps",
                d: "Every safari is delivered by a licensed local operator we've verified. This keeps money in the community and expertise in the driver's seat.",
              },
              {
                t: "We share fixed quotes",
                d: "You'll see the full price before you commit. No gate fees, no surprises.",
              },
              {
                t: "We're not the park authority",
                d: "Udawalawe Wild is not affiliated with Udawalawe National Park. We're a private booking platform.",
              },
              {
                t: "We don't fake reviews",
                d: "Real guest reviews appear when guests give them. Until then, that section stays honestly empty.",
              },
            ].map((b, i) => (
              <Reveal key={b.t} delay={i * 70}>
                <div className="h-full rounded-xl border border-border bg-background p-6 transition-all duration-250 hover:border-[color:var(--terracotta)]/40 hover:shadow-md hover:-translate-y-1">
                  <div className="font-serif text-xl text-foreground">{b.t}</div>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{b.d}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={100}>
            <div className="mt-10">
              <Link
                to="/book"
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground transition-all duration-200 hover:bg-primary/85 hover:scale-[1.02] hover:shadow-md"
              >
                <CalendarCheck className="h-4 w-4" aria-hidden="true" />
                Plan my safari
              </Link>
            </div>
          </Reveal>
        </Section>
      </div>
    </>
  );
}
