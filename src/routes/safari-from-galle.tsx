import { createFileRoute } from "@tanstack/react-router";
import { RouteTemplate } from "@/components/route-template";
import { routes } from "@/lib/content";

const info = routes.find((r) => r.slug === "safari-from-galle")!;

export const Route = createFileRoute("/safari-from-galle")({
  head: () => ({
    meta: [
      { title: "Safari from Galle to Udawalawe — Udawalawe Wild" },
      { name: "description", content: "Plan a private Udawalawe safari from Galle. Route notes, hill-country transfer options, and enquiry form." },
      { property: "og:title", content: "Safari from Galle to Udawalawe" },
      { property: "og:description", content: "Private safaris from Galle with verified local operators." },
    ],
    links: [{ rel: "canonical", href: "/safari-from-galle" }],
  }),
  component: () => <RouteTemplate info={info} />,
});