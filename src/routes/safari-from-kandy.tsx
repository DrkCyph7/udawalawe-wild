import { createFileRoute } from "@tanstack/react-router";
import { RouteTemplate } from "@/components/route-template";
import { routes } from "@/lib/content";

const info = routes.find((r) => r.slug === "safari-from-kandy")!;

export const Route = createFileRoute("/safari-from-kandy")({
  head: () => ({
    meta: [
      { title: "Safari from Kandy to Udawalawe — Udawalawe Wild" },
      {
        name: "description",
        content:
          "Plan a private Udawalawe safari from Kandy. Route notes, mountain pass timings, and safari + transfer options.",
      },
      { property: "og:title", content: "Safari from Kandy to Udawalawe" },
      {
        property: "og:description",
        content: "Private safaris from Kandy with verified local operators.",
      },
    ],
    links: [{ rel: "canonical", href: "/safari-from-kandy" }],
  }),
  component: () => <RouteTemplate info={info} />,
});
