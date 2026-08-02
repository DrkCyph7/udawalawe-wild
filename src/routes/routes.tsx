import { createFileRoute, Link } from "@tanstack/react-router";
import { Section, SectionHeading } from "@/components/section";
import { Reveal } from "@/components/reveal";
import { routes } from "@/lib/content";
import { ChevronRight, MapPin } from "lucide-react";

export const Route = createFileRoute("/routes")({
  head: () => ({
    meta: [
      { title: "Travel routes to Udawalawe — Udawalawe Wild" },
      {
        name: "description",
        content:
          "Reaching Udawalawe from Ella, Mirissa, Galle, Hiriketiya, Colombo, Kandy, Tangalle, and Nuwara Eliya. Route notes, timings, and safari + transfer options.",
      },
      { property: "og:title", content: "Travel routes to Udawalawe" },
      {
        property: "og:description",
        content: "How to reach Udawalawe from popular Sri Lankan bases.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://udawalawe-wild.com/routes" },
      { property: "og:image", content: "https://udawalawe-wild.com/og-image.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: "https://udawalawe-wild.com/og-image.png" },
    ],
    links: [{ rel: "canonical", href: "https://udawalawe-wild.com/routes" }],
  }),
  component: RoutesPage,
});

function RoutesPage() {
  return (
    <Section>
      <Reveal>
        <SectionHeading
          eyebrow="Getting to Udawalawe"
          title="Popular routes into the park."
          intro="Pick your starting point. We'll help you shape the day so the safari — not the driving — is the memorable part."
        />
      </Reveal>
      <div className="mt-10 grid gap-5 sm:grid-cols-2">
        {routes.map((r, i) => (
          <Reveal key={r.slug} delay={i * 70}>
            <Link
              to={`/${r.slug}`}
              className="group flex h-full flex-col justify-between rounded-xl border border-border bg-card p-6 transition-all duration-250 hover:border-[color:var(--forest)]/40 hover:shadow-md hover:-translate-y-1 sm:p-8"
            >
              <div>
                <div className="flex items-center gap-1.5 text-[11px] uppercase tracking-widest text-[color:var(--terracotta)]">
                  <MapPin className="h-3 w-3" aria-hidden="true" />
                  From
                </div>
                <h2 className="mt-1 font-serif text-3xl text-foreground">{r.from}</h2>
                <div className="mt-2 text-xs text-muted-foreground">{r.drive}</div>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{r.summary}</p>
              </div>
              <div className="link-underline mt-6 flex items-center gap-1 text-sm font-medium text-primary">
                View route notes
                <ChevronRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
