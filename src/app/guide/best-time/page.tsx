import { Metadata } from "next";
import { GuideArticle } from "@/components/guide-article";

export const metadata: Metadata = {
  title: "Best Time to Visit Udawalawe National Park | Udawalawe Wild",
  description:
    "Discover the best time of year and time of day to visit Udawalawe National Park for optimal wildlife viewing and weather conditions.",
  alternates: {
    canonical: "https://www.udawalawe-wild.com/guide/best-time",
  },
};

export default function Page() {
  return (
    <GuideArticle
      eyebrow="Safari Planning"
      title="The Best Time to Visit Udawalawe"
      breadcrumbs={[
        { name: "Guide", url: "/guide" },
        { name: "Best Time to Visit", url: "/guide/best-time" },
      ]}
      cta={{ label: "Check Availability", href: "/book" }}
    >
      <p>
        One of the great advantages of Udawalawe National Park is that it offers excellent wildlife
        viewing year-round. However, the experience can vary depending on the season and the time of
        day you choose for your safari.
      </p>

      <h3>Best Time of Year (Seasons)</h3>

      <h4>The Dry Season (May to September)</h4>
      <p>
        The dry season is generally considered the best time for wildlife viewing in Udawalawe. As
        water sources in the park dry up, animals, particularly elephants, congregate around the
        Udawalawe Reservoir and remaining waterholes. This makes them much easier to spot in large
        numbers. The dry scrub also improves visibility across the park.
      </p>

      <h4>The Wet Season (October to January)</h4>
      <p>
        The northeast monsoon brings rain to the park, transforming the dry landscape into lush,
        vibrant green. While the thick vegetation can make spotting smaller animals slightly more
        challenging, elephants are still seen regularly. The wet season is spectacular for bird
        watching, as many migratory species arrive. The park is incredibly beautiful during this time,
        and the rain often comes in short, heavy bursts rather than all-day drizzle.
      </p>

      <h4>The Shoulder Seasons (February to April)</h4>
      <p>
        These months offer a good balance. The park is still relatively green from the rains, but the
        weather is generally dry and sunny.
      </p>

      <h3>Best Time of Day (Morning vs. Afternoon)</h3>
      <p>
        Wildlife in Udawalawe is most active during the cooler hours of the day. Therefore, safaris
        are conducted in the early morning or late afternoon.
      </p>
      <ul>
        <li>
          <strong>Morning Safaris (6:00 AM – 9:30 AM):</strong> The park is cool, the dawn light is
          beautiful for photography, and birds are highly active. This is often the quietest time on
          the tracks.
        </li>
        <li>
          <strong>Afternoon Safaris (3:00 PM – 6:00 PM):</strong> As the heat of the day fades,
          elephants frequently head towards the water to drink and bathe. The afternoon light turns
          golden leading up to sunset, creating stunning scenery.
        </li>
      </ul>

      <p>
        <em>
          Please note: Wildlife sightings are never guaranteed, regardless of the season or time of
          day. However, Udawalawe's resident elephant population makes it one of the most reliable
          parks in Sri Lanka for sightings year-round.
        </em>
      </p>
    </GuideArticle>
  );
}
