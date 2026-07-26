import { createFileRoute, Link } from "@tanstack/react-router";
import { Section, SectionHeading } from "@/components/section";
import portrait from "@/assets/elephant-portrait.jpg";

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
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <Section>
        <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-center">
          <div>
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
          </div>
          <div className="aspect-[4/5] overflow-hidden rounded-sm">
            <img
              src={portrait}
              alt="Wild elephant in Udawalawe"
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </Section>

      <div className="bg-[color:var(--sand)]/30">
        <Section>
          <SectionHeading eyebrow="How we operate" title="Independent booking platform." />
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
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
            ].map((b) => (
              <div key={b.t} className="border-t border-foreground/20 pt-5">
                <div className="font-serif text-xl text-foreground">{b.t}</div>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{b.d}</p>
              </div>
            ))}
          </div>

          <div className="mt-12">
            <Link
              to="/book"
              className="rounded-sm bg-primary px-5 py-3 text-sm font-medium text-primary-foreground"
            >
              Plan my safari
            </Link>
          </div>
        </Section>
      </div>
    </>
  );
}
