import { Metadata } from "next";
import { Section, SectionHeading } from "@/components/section";
import { Breadcrumbs } from "@/components/breadcrumbs";

export const metadata: Metadata = {
  title: "Udawalawe vs Yala Safari: Which National Park Is Better?",
  description: "Comparing Udawalawe and Yala National Parks for your Sri Lanka safari. Find out which park is best for elephants, leopards, crowds, and families.",
  alternates: {
    canonical: "https://www.udawalawe-wild.com/guide/udawalawe-vs-yala",
  },
};

export default function Page() {
  return (
    <main className="pb-16 pt-24 sm:pt-32 lg:pb-24">
      <Section>
        <Breadcrumbs items={[{name: "Guide", url: "/guide"}, {name: "Udawalawe vs Yala", url: "/guide/udawalawe-vs-yala"}]} />

        <SectionHeading
          eyebrow="Safari Comparison"
          title="Udawalawe vs Yala Safari: Which is Better?"
          titleClass="text-forest-900"
        />

        <div className="mt-8 prose prose-forest max-w-none text-foreground/80">
          <p>
            Choosing between Udawalawe and Yala is the most common dilemma for travellers planning a safari in Sri Lanka. Both are incredible national parks, but they offer very different experiences. The "better" park depends entirely on what you want to see and how you prefer to travel.
          </p>

          <h3>Udawalawe National Park: The Elephant Sanctuary</h3>
          <p>
            Udawalawe is world-renowned for its Asian elephant population. With its open grasslands and large reservoir, visibility is excellent. It is widely considered one of the best places on earth to observe elephants in their natural habitat.
          </p>
          <ul>
            <li><strong>Wildlife:</strong> Almost guaranteed elephant sightings. Rich birdlife, crocodiles, water buffalo, and macaques. Leopards are present but rarely seen.</li>
            <li><strong>Scenery:</strong> Open savanna and scrub jungle, built around the Udawalawe Reservoir.</li>
            <li><strong>Crowds:</strong> Generally quieter than Yala, especially on weekday mornings.</li>
            <li><strong>Best For:</strong> Families, elephant lovers, and those seeking a calmer, less crowded safari experience.</li>
          </ul>

          <h3>Yala National Park: The Leopard Territory</h3>
          <p>
            Yala is Sri Lanka's most famous and visited national park. Its diverse ecosystems range from dense jungles to coastal lagoons, and it boasts one of the highest leopard densities in the world.
          </p>
          <ul>
            <li><strong>Wildlife:</strong> Excellent chance of seeing leopards and sloth bears. Elephants are present but less concentrated than in Udawalawe.</li>
            <li><strong>Scenery:</strong> Diverse terrain including dense forest, rocky outcrops, and coastal areas.</li>
            <li><strong>Crowds:</strong> Very busy, particularly during peak season. Sightings of leopards often attract large clusters of jeeps.</li>
            <li><strong>Best For:</strong> Travellers whose primary goal is spotting a leopard, and those who don't mind navigating busier tracks.</li>
          </ul>

          <h3>Making Your Choice</h3>
          <p>
            If you dream of watching herds of elephants interacting naturally with plenty of space and fewer jeeps, Udawalawe is the clear winner. The open terrain also makes it fantastic for photography and families with children.
          </p>
          <p>
            If seeing a leopard is your top priority and you are prepared for a busier, more competitive safari environment, Yala is the right choice.
          </p>

          <div className="mt-12 bg-sand-200 p-6 rounded-xl border border-border">
            <h4 className="text-forest-900 font-serif mt-0">Experience Udawalawe Wildly</h4>
            <p className="text-sm">We specialize in private, ethical safaris in Udawalawe National Park. If you've decided Udawalawe is right for you, we'd love to help you plan your trip.</p>
            <div className="mt-4 flex gap-4">
              <a href="/book" className="px-5 py-2.5 bg-[oklch(0.70_0.12_85)] text-[#222] font-semibold rounded-lg text-sm hover:scale-105 transition-transform inline-block">Plan my Udawalawe Safari</a>
            </div>
          </div>
        </div>
      </Section>
    </main>
  );
}
