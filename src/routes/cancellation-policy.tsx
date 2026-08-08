import { createFileRoute } from "@tanstack/react-router";
import { Section, SectionHeading } from "@/components/section";

export const Route = createFileRoute("/cancellation-policy")({
  head: () => ({
    meta: [
      { title: "Cancellation policy — Udawalawe Wild" },
      {
        name: "description",
        content: "Clear, fair cancellation and rescheduling terms for Udawalawe Wild safari bookings.",
      },
      { property: "og:title", content: "Cancellation policy — Udawalawe Wild" },
      { property: "og:description", content: "Cancellation and change policy." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://www.udawalawe-wild.com/cancellation-policy" },
      { property: "og:image", content: "https://www.udawalawe-wild.com/og-image.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: "https://www.udawalawe-wild.com/og-image.png" },
    ],
    links: [{ rel: "canonical", href: "https://www.udawalawe-wild.com/cancellation-policy" }],
  }),
  component: () => (
    <Section>
      <SectionHeading eyebrow="Legal" title="Cancellation & Rescheduling Policy" />
      <div className="mt-8 max-w-3xl space-y-6 text-sm leading-relaxed text-foreground/85">
        <p className="text-xs text-muted-foreground">Effective Date: August 2, 2026</p>

        <p>
          We work with small, independent local safari drivers whose livelihoods depend on booked schedules. Our cancellation policy is designed to be fair to travellers while protecting our drivers' reserved time.
        </p>

        <h3 className="font-serif text-lg text-foreground">Standard Cancellation Terms</h3>
        <ul className="list-disc space-y-2 pl-5 text-muted-foreground">
          <li>
            <strong className="text-foreground">More than 72 hours before safari:</strong> Free cancellation or free date rescheduling with full refund of any deposit paid.
          </li>
          <li>
            <strong className="text-foreground">24 to 72 hours before safari:</strong> Free date rescheduling subject to driver availability. Cancellations incur a modest 25% fee to compensate the assigned driver for reserved slot loss.
          </li>
          <li>
            <strong className="text-foreground">Less than 24 hours before safari:</strong> Cancellations or no-shows incur a 50% cancellation fee.
          </li>
        </ul>

        <h3 className="font-serif text-lg text-foreground">Weather & Wildlife Disruptions</h3>
        <p>
          In the event of severe weather warnings or temporary park closures mandated by the Department of Wildlife Conservation, we offer 100% free rescheduling or a full refund without penalty.
        </p>

        <h3 className="font-serif text-lg text-foreground">How to Request a Change</h3>
        <p>
          To change or cancel your booking, simply message us on WhatsApp (+94 72 189 0006) or email hello@udawalawe-wild.com with your booking name and date. We respond within hours.
        </p>
      </div>
    </Section>
  ),
});
