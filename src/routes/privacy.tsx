import { createFileRoute } from "@tanstack/react-router";
import { Section, SectionHeading } from "@/components/section";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy policy — Udawalawe Wild" },
      {
        name: "description",
        content:
          "How Udawalawe Wild collects, uses, and protects personal information provided for safari booking enquiries.",
      },
      { property: "og:title", content: "Privacy policy — Udawalawe Wild" },
      { property: "og:description", content: "How we handle enquiry data." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://udawalawe-wild.com/privacy" },
      { property: "og:image", content: "https://udawalawe-wild.com/og-image.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: "https://udawalawe-wild.com/og-image.png" },
    ],
    links: [{ rel: "canonical", href: "https://udawalawe-wild.com/privacy" }],
  }),
  component: () => (
    <Section>
      <SectionHeading eyebrow="Legal" title="Privacy Policy" />
      <div className="mt-8 max-w-3xl space-y-6 text-sm leading-relaxed text-foreground/85">
        <p className="text-xs text-muted-foreground">Effective Date: August 2, 2026</p>

        <h3 className="font-serif text-lg text-foreground">1. Introduction</h3>
        <p>
          Udawalawe Wild ("we," "our," or "us") operates an independent safari booking platform for Udawalawe National Park, Sri Lanka. This Privacy Policy outlines how we collect, use, store, and protect your personal information when you use our website and services.
        </p>

        <h3 className="font-serif text-lg text-foreground">2. Information We Collect</h3>
        <p>We collect information you voluntarily provide to us when submitting an enquiry or booking request, including:</p>
        <ul className="list-disc space-y-1 pl-5 text-muted-foreground">
          <li>Full name and contact details (email address, WhatsApp phone number)</li>
          <li>Trip details (preferred dates, group size, pickup/drop-off locations)</li>
          <li>Hotel or accommodation information (if provided)</li>
          <li>Any special requests or notes submitted in booking forms</li>
        </ul>

        <h3 className="font-serif text-lg text-foreground">3. How We Use Your Information</h3>
        <p>Your information is used strictly to:</p>
        <ul className="list-disc space-y-1 pl-5 text-muted-foreground">
          <li>Process and respond to your safari availability enquiries</li>
          <li>Coordinate with verified local safari jeep operators to fulfill your request</li>
          <li>Communicate quotes, trip details, and updates via WhatsApp or email</li>
          <li>Improve our website performance and user experience</li>
        </ul>

        <h3 className="font-serif text-lg text-foreground">4. Data Sharing & Disclosure</h3>
        <p>
          We do not sell, rent, or trade your personal information. To arrange your safari, we share relevant booking details (e.g. date, group size, pickup location, contact name) with the verified local safari operator assigned to your trip. We require all partner operators to handle your data confidentially and solely for trip fulfillment.
        </p>

        <h3 className="font-serif text-lg text-foreground">5. Payment Data Security</h3>
        <p>
          We do not collect, process, or store credit/debit card numbers or bank account details on our website. All payment arrangements are handled directly with your assigned local operator or via secure channels disclosed upon booking confirmation.
        </p>

        <h3 className="font-serif text-lg text-foreground">6. Data Retention & Your Rights</h3>
        <p>
          We retain enquiry data for as long as necessary to complete your booking coordination and fulfill accounting or legal obligations. You have the right to request a copy of your personal data or request deletion of your records at any time by emailing us at hello@udawalawe-wild.com or messaging us on WhatsApp (+94 72 189 0006).
        </p>

        <h3 className="font-serif text-lg text-foreground">7. Contact Us</h3>
        <p>
          For any privacy inquiries or data requests, please contact us at:
          <br />
          Email: hello@udawalawe-wild.com | Phone / WhatsApp: +94 72 189 0006
        </p>
      </div>
    </Section>
  ),
});
