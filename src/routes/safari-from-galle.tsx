import { createFileRoute } from "@tanstack/react-router";
import { RouteTemplate } from "@/components/route-template";
import { routes } from "@/lib/content";

const info = routes.find((r) => r.slug === "safari-from-galle")!;

export const Route = createFileRoute("/safari-from-galle")({
  head: () => ({
    meta: [
      { title: "Safari from Galle to Udawalawe — Udawalawe Wild" },
      {
        name: "description",
        content:
          "Plan a private Udawalawe safari from Galle. Route notes, hill-country transfer options, and enquiry form.",
      },
      { property: "og:title", content: "Safari from Galle to Udawalawe" },
      {
        property: "og:description",
        content: "Private safaris from Galle with verified local operators.",
      },
      { property: "og:type", content: "article" },
      { property: "og:url", content: "https://www.udawalawe-wild.com/safari-from-galle" },
      { property: "og:image", content: "https://www.udawalawe-wild.com/og-image.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: "https://www.udawalawe-wild.com/og-image.png" },
    ],
    links: [{ rel: "canonical", href: "https://www.udawalawe-wild.com/safari-from-galle" }],
  }),
  component: () => <RouteTemplate info={info} />,
});
