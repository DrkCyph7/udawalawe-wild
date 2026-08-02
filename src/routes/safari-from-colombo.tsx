import { createFileRoute } from "@tanstack/react-router";
import { RouteTemplate } from "@/components/route-template";
import { routes } from "@/lib/content";

const info = routes.find((r) => r.slug === "safari-from-colombo")!;

export const Route = createFileRoute("/safari-from-colombo")({
  head: () => ({
    meta: [
      { title: "Safari from Colombo to Udawalawe — Udawalawe Wild" },
      {
        name: "description",
        content:
          "Plan a private Udawalawe safari from Colombo or the airport. Route notes, timing via Southern Expressway, and safari + transfer options.",
      },
      { property: "og:title", content: "Safari from Colombo to Udawalawe" },
      {
        property: "og:description",
        content: "Private safaris from Colombo with verified local operators.",
      },
      { property: "og:type", content: "article" },
      { property: "og:url", content: "https://udawalawe-wild.com/safari-from-colombo" },
      { property: "og:image", content: "https://udawalawe-wild.com/og-image.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: "https://udawalawe-wild.com/og-image.png" },
    ],
    links: [{ rel: "canonical", href: "https://udawalawe-wild.com/safari-from-colombo" }],
  }),
  component: () => <RouteTemplate info={info} />,
});
