import { createFileRoute } from "@tanstack/react-router";
import { RouteTemplate } from "@/components/route-template";
import { routes } from "@/lib/content";

const info = routes.find((r) => r.slug === "safari-from-mirissa")!;

export const Route = createFileRoute("/safari-from-mirissa")({
  head: () => ({
    meta: [
      { title: "Safari from Mirissa to Udawalawe — Udawalawe Wild" },
      { name: "description", content: "Plan a private Udawalawe safari from Mirissa. Route notes, day-trip advice, and enquiry form." },
      { property: "og:title", content: "Safari from Mirissa to Udawalawe" },
      { property: "og:description", content: "Private safaris from Mirissa with verified local operators." },
    ],
    links: [{ rel: "canonical", href: "/safari-from-mirissa" }],
  }),
  component: () => <RouteTemplate info={info} />,
});