import { createFileRoute } from "@tanstack/react-router";
import { RouteTemplate } from "@/components/route-template";
import { routes } from "@/lib/content";

const info = routes.find((r) => r.slug === "safari-from-tangalle")!;

export const Route = createFileRoute("/safari-from-tangalle")({
  head: () => ({
    meta: [
      { title: "Safari from Tangalle to Udawalawe — Udawalawe Wild" },
      {
        name: "description",
        content:
          "Plan a private Udawalawe safari from Tangalle. Direct coastal-inland route notes, timing, and safari + transfer options.",
      },
      { property: "og:title", content: "Safari from Tangalle to Udawalawe" },
      {
        property: "og:description",
        content: "Private safaris from Tangalle with verified local operators.",
      },
      { property: "og:type", content: "article" },
      { property: "og:url", content: "https://www.udawalawe-wild.com/safari-from-tangalle" },
      { property: "og:image", content: "https://www.udawalawe-wild.com/og-image.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: "https://www.udawalawe-wild.com/og-image.png" },
    ],
    links: [{ rel: "canonical", href: "https://www.udawalawe-wild.com/safari-from-tangalle" }],
  }),
  component: () => <RouteTemplate info={info} />,
});
