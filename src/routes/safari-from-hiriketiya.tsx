import { createFileRoute } from "@tanstack/react-router";
import { RouteTemplate } from "@/components/route-template";
import { routes } from "@/lib/content";

const info = routes.find((r) => r.slug === "safari-from-hiriketiya")!;

export const Route = createFileRoute("/safari-from-hiriketiya")({
  head: () => ({
    meta: [
      { title: "Safari from Hiriketiya to Udawalawe — Udawalawe Wild" },
      {
        name: "description",
        content:
          "Plan a private Udawalawe safari from Hiriketiya. Short coastal route, timing, and enquiry form.",
      },
      { property: "og:title", content: "Safari from Hiriketiya to Udawalawe" },
      {
        property: "og:description",
        content: "Private safaris from Hiriketiya with verified local operators.",
      },
    ],
    links: [{ rel: "canonical", href: "/safari-from-hiriketiya" }],
  }),
  component: () => <RouteTemplate info={info} />,
});
