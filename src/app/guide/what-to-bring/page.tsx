import { Metadata } from "next";
import { GuideArticle } from "@/components/guide-article";

export const metadata: Metadata = {
  title: "What to Bring on an Udawalawe Safari | Udawalawe Wild",
  description:
    "A practical packing list for your Udawalawe National Park safari. Find out what clothing, gear, and essentials to bring for a comfortable trip.",
  alternates: {
    canonical: "https://www.udawalawe-wild.com/guide/what-to-bring",
  },
};

export default function Page() {
  return (
    <GuideArticle
      eyebrow="Safari Planning"
      title="What to Bring on Your Safari"
      breadcrumbs={[
        { name: "Guide", url: "/guide" },
        { name: "What to Bring", url: "/guide/what-to-bring" },
      ]}
      cta={{ label: "View Safari Packages", href: "/safaris" }}
    >
      <p>
        Packing correctly for your Udawalawe safari ensures you stay comfortable and can fully enjoy
        the wildlife experience. Safaris take place in open-top 4×4 jeeps, meaning you will be
        exposed to the elements. Here is a practical checklist of what to bring.
      </p>

      <h3>Clothing and Comfort</h3>
      <ul>
        <li>
          <strong>Comfortable, neutral-coloured clothing:</strong> Opt for breathable fabrics in
          earth tones (greens, browns, khakis). Avoid bright, neon colours that might startle
          animals, and skip white, as the park tracks can be very dusty.
        </li>
        <li>
          <strong>Layers:</strong> If you are on a morning safari, the pre-dawn air is chilly. Bring
          a light sweater or fleece that you can remove as it warms up.
        </li>
        <li>
          <strong>Appropriate footwear:</strong> You will remain in the jeep for the duration of the
          safari, so comfortable sandals or trainers are perfectly fine.
        </li>
        <li>
          <strong>Sun protection:</strong> A wide-brimmed hat, sunglasses, and high-SPF sunscreen are
          essential, especially for afternoon safaris.
        </li>
        <li>
          <strong>Rain protection:</strong> If visiting during the wetter months, a light rain jacket
          or poncho is recommended.
        </li>
      </ul>

      <h3>Gear and Equipment</h3>
      <ul>
        <li>
          <strong>Camera and lenses:</strong> Bring your best camera. A zoom lens (200mm or more) is
          highly recommended for wildlife photography.
        </li>
        <li>
          <strong>Binoculars:</strong> A pair of binoculars will significantly enhance your
          experience, allowing you to spot distant birds and details on larger animals.
        </li>
        <li>
          <strong>Power bank:</strong> Safaris are long, and you will likely be taking many photos and
          videos. A fully charged power bank is very useful.
        </li>
      </ul>

      <h3>Personal Essentials</h3>
      <ul>
        <li>
          <strong>Water:</strong> Stay hydrated. We provide bottled water, but bringing a reusable
          water bottle is always a good idea.
        </li>
        <li>
          <strong>Insect repellent:</strong> Essential for early mornings and late afternoons.
        </li>
        <li>
          <strong>Personal medication:</strong> Bring any necessary medication, as there are no
          facilities inside the park.
        </li>
        <li>
          <strong>Cash:</strong> Bring small denominations of Sri Lankan Rupees for tipping your
          driver/guide (optional but appreciated for good service) or for small roadside purchases.
        </li>
      </ul>
    </GuideArticle>
  );
}
