import { createFileRoute, Link } from "@tanstack/react-router";
import { Section, SectionHeading } from "@/components/section";
import { routes } from "@/lib/content";

export const Route = createFileRoute("/routes")({
  head: () => ({
    meta: [
      { title: "Travel routes to Udawalawe — Udawalawe Wild" },
      { name: "description", content: "Reaching Udawalawe from Ella, Mirissa, Galle, and Hiriketiya. Route notes, timings, and safari + transfer options." },
      { property: "og:title", content: "Travel routes to Udawalawe" },
      { property: "og:description", content: "How to reach Udawalawe from popular Sri Lankan bases." },
    ],
    links: [{ rel: "canonical", href: "/routes" }],
  }),
  component: RoutesPage,
});

function RoutesPage() {
  return (
    <Section>
      <SectionHeading
        eyebrow="Getting to Udawalawe"
        title="Popular routes into the park."
        intro="Pick your starting point. We'll help you shape the day so the safari — not the driving — is the memorable part."
      />
      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        {routes.map((r) => (
          <Link
            key={r.slug}
            to={`/${r.slug}`}
            className="group flex flex-col justify-between border border-border bg-card p-6 transition hover:border-primary sm:p-8"
          >
            <div>
              <div className="text-[11px] uppercase tracking-widest text-[color:var(--terracotta)]">
                From
              </div>
              <h2 className="mt-1 font-serif text-3xl text-foreground">{r.from}</h2>
              <div className="mt-2 text-xs text-muted-foreground">{r.drive}</div>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{r.summary}</p>
            </div>
            <div className="mt-6 text-sm font-medium text-primary underline underline-offset-4">
              View route notes →
            </div>
          </Link>
        ))}
      </div>
    </Section>
  );
}