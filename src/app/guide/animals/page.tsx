import { Metadata } from "next";
import { Section, SectionHeading } from "@/components/section";
import { Breadcrumbs } from "@/components/breadcrumbs";

export const metadata: Metadata = {
  title: "Animals in Udawalawe National Park | Udawalawe Wild",
  description:
    "Learn about the wildlife you can see in Udawalawe National Park, including Sri Lankan elephants, water buffalo, crocodiles, and diverse birdlife.",
  alternates: {
    canonical: "https://www.udawalawe-wild.com/guide/animals",
  },
};

export default function Page() {
  return (
    <main className="pb-16 pt-24 sm:pt-32 lg:pb-24">
      <Section>
        <Breadcrumbs
          items={[
            { name: "Guide", url: "/guide" },
            { name: "Animals", url: "/guide/animals" },
          ]}
        />

        <SectionHeading
          eyebrow="Wildlife Guide"
          title="Animals of Udawalawe National Park"
          titleClass="text-forest-900"
        />

        <div className="mt-8 prose prose-forest max-w-none text-foreground/80">
          <p>
            Udawalawe National Park is one of the most reliable places in Sri Lanka for wildlife
            viewing. The park was originally created to provide a sanctuary for wild animals
            displaced by the construction of the Udawalawe Reservoir, and today it supports a
            thriving, diverse ecosystem.
          </p>

          <h3>Sri Lankan Elephants</h3>
          <p>
            The undisputed highlight of Udawalawe is its large population of Sri Lankan elephants (
            <em>Elephas maximus maximus</em>). The open terrain makes it highly likely that you will
            encounter herds of females and calves feeding, bathing, or moving through the scrub.
            Solitary mature males (bulls) are also commonly seen. While sightings can never be 100%
            guaranteed, Udawalawe offers the best chance of seeing wild elephants in Sri Lanka.
          </p>

          <h3>Water Buffalo and Crocodiles</h3>
          <p>
            Around the Udawalawe Reservoir and smaller waterholes, you will frequently see large
            herds of water buffalo resting in the shallows. Sharing this aquatic habitat are Mugger
            crocodiles, often seen basking on the sun-baked banks.
          </p>

          <h3>Deer and Primates</h3>
          <p>
            Spotted deer (Chital) are common throughout the park, often moving in large groups. You
            may also catch glimpses of the more elusive Sambar deer or the tiny Barking deer. Look
            up into the trees to spot troops of Toque macaques and the grey Langur monkeys.
          </p>

          <h3>Birdlife</h3>
          <p>
            Udawalawe is a fantastic destination for bird watching. The park is home to a huge
            variety of raptors, including the Changeable Hawk-eagle, White-bellied Sea Eagle, and
            Grey-headed Fish Eagle. Near the water, you can spot Painted storks, pelicans,
            spoonbills, and several species of kingfisher. Peacocks (Indian peafowl) are ubiquitous.
          </p>

          <h3>Other Wildlife</h3>
          <p>
            While present, leopards are rarely seen in Udawalawe due to the dense scrub jungle in
            certain areas and a lower population density compared to Yala. Other animals you may
            encounter include wild boar, golden jackals, monitor lizards, and various snake species.
          </p>

          <p>
            <em>
              Remember: A safari is an observation of nature, not a zoo visit. Respectful distance
              and quiet observation are crucial for the animals' wellbeing and your enjoyment.
            </em>
          </p>

          <div className="mt-12 bg-sand-200 p-6 rounded-xl border border-border">
            <h4 className="text-forest-900 font-serif mt-0">Experience the Wildlife</h4>
            <p className="text-sm">
              Join a private safari with a knowledgeable local guide who can help you spot and
              identify Udawalawe's incredible animals.
            </p>
            <div className="mt-4 flex gap-4">
              <a
                href="/safaris"
                className="px-5 py-2.5 bg-[oklch(0.70_0.12_85)] text-[#222] font-semibold rounded-lg text-sm hover:scale-105 transition-transform inline-block"
              >
                Explore Safari Options
              </a>
            </div>
          </div>
        </div>
      </Section>
    </main>
  );
}
