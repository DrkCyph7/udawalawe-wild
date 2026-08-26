import { Metadata } from "next";
import { GuideArticle } from "@/components/guide-article";

export function generateMetadata(): Metadata {
  return {
    title: `Udawalawe Safari Cost ${new Date().getFullYear()} | Prices & Packages`,
    description:
      "Understand the true cost of a private Udawalawe safari. We break down park entrance fees, private jeep costs, ETH visits, and transfer pricing.",
    alternates: {
      canonical: "https://www.udawalawe-wild.com/guide/udawalawe-safari-cost",
    },
  };
}

export default function Page() {
  return (
    <GuideArticle
      eyebrow="Safari Planning"
      title="How much does an Udawalawe Safari cost?"
      breadcrumbs={[
        { name: "Guide", url: "/guide" },
        { name: "Udawalawe Safari Cost", url: "/guide/udawalawe-safari-cost" },
      ]}
      cta={{ label: "Check Availability", href: "/book" }}
    >
      <p>
        When planning your visit to Udawalawe National Park, it's important to understand how safari
        pricing works. Unlike simple ticketed attractions, a safari cost is made up of several
        components: the park entrance fee, the private jeep hire, and any optional extras like
        transfers or visits to the Elephant Transit Home (ETH).
      </p>

      <h3>Park Entrance Fees</h3>
      <p>
        The Department of Wildlife Conservation (DWC) sets the park entrance fees. These fees are
        charged per person, with additional smaller fees for the jeep entry and local taxes. When you
        book a safari with Udawalawe Wild, our quotes always include these fees so you don't have to
        worry about cash at the gate.
      </p>

      <h3>Private Jeep Hire</h3>
      <p>
        We only offer private jeep safaris. This means you won't be sharing your vehicle with
        strangers. The cost of the jeep covers the vehicle, the licensed driver/guide, and fuel.
        Prices for the jeep remain the same whether you are a solo traveller or a group of six.
      </p>

      <h3>Morning vs. Afternoon Pricing</h3>
      <p>
        The cost for a morning or afternoon half-day safari is generally the same. Full-day safaris
        cost more as they require two park entry tickets and a full day of jeep hire.
      </p>

      <h3>What's Included in our Quotes</h3>
      <ul>
        <li>Private 4×4 safari jeep with a verified local driver</li>
        <li>All park entrance fees and taxes</li>
        <li>Coordination and booking management</li>
        <li>Strict adherence to our ethical wildlife-first guidelines</li>
      </ul>

      <h3>Payment and Cancellation</h3>
      <p>
        We believe in transparent pricing. Once you enquire, we provide a fixed quote. You pay your
        driver directly. Our cancellation policy is flexible and designed to be fair to both you and
        our local partners.
      </p>
    </GuideArticle>
  );
}
