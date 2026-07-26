import { createFileRoute } from "@tanstack/react-router";
import { RouteTemplate } from "@/components/route-template";
import { routes } from "@/lib/content";

const info = routes.find((r) => r.slug === "safari-from-ella")!;

export const Route = createFileRoute("/safari-from-ella")({
  head: () => ({
    meta: [
      { title: "Safari from Ella to Udawalawe — Udawalawe Wild" },
      { name: "description", content: "Plan a private Udawalawe safari from Ella. Route notes, timing, and safari + transfer options." },
      { property: "og:title", content: "Safari from Ella to Udawalawe" },
      { property: "og:description", content: "Private safaris from Ella with verified local operators." },
    ],
    links: [{ rel: "canonical", href: "/safari-from-ella" }],
  }),
  component: () => <RouteTemplate info={info} />,
});