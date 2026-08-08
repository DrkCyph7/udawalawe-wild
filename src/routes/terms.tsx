import { createFileRoute } from "@tanstack/react-router";
import { Section, SectionHeading } from "@/components/section";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of use — Udawalawe Wild" },
      { name: "description", content: "Terms of use for the Udawalawe Wild safari booking platform." },
      { property: "og:title", content: "Terms of use — Udawalawe Wild" },
      {
        property: "og:description",
        content: "Terms of use for the Udawalawe Wild booking platform.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://www.udawalawe-wild.com/terms" },
      { property: "og:image", content: "https://www.udawalawe-wild.com/og-image.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: "https://www.udawalawe-wild.com/og-image.png" },
    ],
    links: [{ rel: "canonical", href: "https://www.udawalawe-wild.com/terms" }],
  }),
  component: () => (
    <Section>
      <SectionHeading eyebrow="Legal" title="Terms of Use" />
      <div className="mt-8 max-w-3xl space-y-6 text-sm leading-relaxed text-foreground/85">
        <p className="text-xs text-muted-foreground">Effective Date: August 2, 2026</p>

        <h3 className="font-serif text-lg text-foreground">1. Platform Service Overview</h3>
        <p>
          Udawalawe Wild is an independent online booking platform operated to connect travellers with verified, licensed local safari jeep operators in and around Udawalawe National Park, Sri Lanka. Udawalawe Wild is not the Department of Wildlife Conservation (DWC) or the official national park authority.
        </p>

        <h3 className="font-serif text-lg text-foreground">2. Booking Intermediary Role</h3>
        <p>
          We act solely as a booking intermediary. Safari logistics, jeep operation, and park driving are delivered by independent, verified local partner operators. By submitting an enquiry through our platform, you authorize us to share your trip requirements with recommended local partners.
        </p>

        <h3 className="font-serif text-lg text-foreground">3. Wildlife Sightings Disclaimer</h3>
        <p>
          Udawalawe National Park is a natural wildlife sanctuary. Animals move freely within their natural habitat. Neither Udawalawe Wild nor any partner operator can guarantee specific animal sightings (including elephants, leopards, or specific bird species).
        </p>

        <h3 className="font-serif text-lg text-foreground">4. Park Rules & Guest Conduct</h3>
        <p>
          All guests must adhere strictly to the park rules enforced by the Department of Wildlife Conservation and our Ethical Safari Code. This includes remaining inside the safari vehicle at all times, refraining from feeding or disturbing animals, avoiding loud noises, and respecting driver instructions.
        </p>

        <h3 className="font-serif text-lg text-foreground">5. Pricing & Availability</h3>
        <p>
          Quotes provided following your enquiry are fixed once confirmed. Prices include jeep service, driver fees, and agreed transfers. Park entrance ticket fees are coordinated transparently and detailed in your quote.
        </p>

        <h3 className="font-serif text-lg text-foreground">6. Limitation of Liability</h3>
        <p>
          Udawalawe Wild is not liable for weather delays, park closures by wildlife authorities, traffic conditions, or unexpected vehicle breakdowns handled by partner operators, though we will always assist in resolving issues promptly.
        </p>

        <h3 className="font-serif text-lg text-foreground">7. Contact & Governing Law</h3>
        <p>
          These Terms are governed by the laws of Sri Lanka. For questions regarding these terms, reach us at hello@udawalawe-wild.com.
        </p>
      </div>
    </Section>
  ),
});
