export type SafariPackage = {
  slug: string;
  name: string;
  duration: string;
  ideal: string;
  includes: string[];
  pickup: string;
  ethical: string;
  cancellation: string;
  short: string;
};

export const safaris: SafariPackage[] = [
  {
    slug: "morning-private-safari",
    name: "Morning Private Safari",
    duration: "Approx. 5 hours (pre-dawn start)",
    ideal: "Best light, active wildlife, calm crowds.",
    includes: [
      "Private jeep with licensed local driver",
      "Park entry coordination",
      "Bottled water",
      "Wildlife-first driving code",
    ],
    pickup: "Udawalawe town, nearby hotels, or arranged transfer.",
    ethical: "Respectful distance, no engine crowding, no chasing.",
    cancellation: "Flexible cancellation terms shared with your quote.",
    short: "The classic dawn safari — golden light, cool air, and quieter tracks.",
  },
  {
    slug: "afternoon-private-safari",
    name: "Afternoon Private Safari",
    duration: "Approx. 4 hours (mid-afternoon start)",
    ideal: "Sunset light, herd movement near water.",
    includes: [
      "Private jeep with licensed local driver",
      "Park entry coordination",
      "Bottled water",
      "Wildlife-first driving code",
    ],
    pickup: "Udawalawe town, nearby hotels, or arranged transfer.",
    ethical: "Slow, considered driving. No feeding, no crowding.",
    cancellation: "Flexible cancellation terms shared with your quote.",
    short: "A softer, later start with elephants gathering near the reservoir.",
  },
  {
    slug: "full-day-wildlife-safari",
    name: "Full-Day Wildlife Safari",
    duration: "Full day with midday rest break",
    ideal: "Serious wildlife watchers and photographers.",
    includes: [
      "Private jeep across two park sessions",
      "Park entry coordination",
      "Bottled water and simple refreshments",
      "Wildlife-first driving code",
    ],
    pickup: "Udawalawe town or nearby hotels.",
    ethical: "Two calm sessions rather than one rushed loop.",
    cancellation: "Flexible cancellation terms shared with your quote.",
    short: "Two unhurried sessions in one day — the deepest way to know the park.",
  },
  {
    slug: "safari-transfer",
    name: "Safari + Transfer",
    duration: "Half-day safari + onward transfer to your next destination",
    ideal: "Travellers moving between the coast, hills, or airport.",
    includes: [
      "Private safari session",
      "Air-conditioned transfer to your next stop",
      "Luggage handling coordination",
      "Wildlife-first driving code",
    ],
    pickup: "South coast, Ella, Colombo, or arranged pick-up — then safari, then onward transfer.",
    ethical: "Wildlife first; transfer arranged separately so the safari is never rushed.",
    cancellation: "Flexible cancellation terms shared with your quote.",
    short: "Combine your safari with a smooth onward transfer to anywhere in Sri Lanka.",
  },
  {
    slug: "safari-elephant-transit-transfer",
    name: "Safari + Elephant Transit + Transfer",
    duration: "Half-day safari + ETH visit + onward transfer",
    ideal: "Anyone who wants to witness elephant conservation up close.",
    includes: [
      "Private safari in Udawalawe National Park",
      "Visit to the Elephant Transit Home (ETH)",
      "Air-conditioned transfer to your next destination",
      "Luggage handling coordination",
      "Wildlife-first driving code throughout",
    ],
    pickup: "Flexible pickup — hotel, town, or arranged start point.",
    ethical: "The ETH is a government-run rehabilitation centre — we observe only, never interfere.",
    cancellation: "Flexible cancellation terms shared with your quote.",
    short:
      "Safari in the park, then a rare glimpse of orphaned elephants being rehabilitated for release at the Elephant Transit Home.",
  },
];

export type RouteInfo = {
  slug: string;
  from: string;
  drive: string;
  summary: string;
  tips: string[];
};

export const routes: RouteInfo[] = [
  {
    slug: "safari-from-ella",
    from: "Ella",
    drive: "Approx. 2.5 – 3 hrs by road",
    summary: "A scenic descent from the hill country. Popular as a day trip or on the way south.",
    tips: [
      "Leave early to catch the morning safari window",
      "Roads are winding — allow buffer time",
      "Combine with a Safari + Transfer onwards to the coast",
    ],
  },
  {
    slug: "safari-from-mirissa",
    from: "Mirissa",
    drive: "Approx. 2 – 2.5 hrs by road",
    summary: "The easiest safari from the south coast — feasible as a long day trip.",
    tips: [
      "Consider an overnight in Udawalawe to avoid a rushed day",
      "Afternoon safaris pair well with a late return",
      "Pack light layers for park mornings",
    ],
  },
  {
    slug: "safari-from-galle",
    from: "Galle",
    drive: "Approx. 2.5 – 3 hrs by road",
    summary: "A comfortable inland drive from the fort. Great with a hill-country onward transfer.",
    tips: [
      "Early departure is essential for a morning safari",
      "Consider Safari + Transfer to save a driving day",
      "Water and sun protection recommended",
    ],
  },
  {
    slug: "safari-from-hiriketiya",
    from: "Hiriketiya",
    drive: "Approx. 2 hrs by road",
    summary: "Quiet coves to open grasslands — one of the shortest coastal routes.",
    tips: [
      "Afternoon safaris are easy on this route",
      "Ask about surfboard-safe transfers if you're moving hotels",
      "Bring cash for small roadside stops",
    ],
  },
  {
    slug: "safari-from-colombo",
    from: "Colombo / Airport",
    drive: "Approx. 4 – 4.5 hrs via Southern Expressway",
    summary:
      "A long but straightforward drive via the expressway. Often done as a multi-day trip or en route to the south coast.",
    tips: [
      "Book an early departure to reach the afternoon safari in time",
      "Break the journey at Embilipitiya or Hambantota",
      "Consider staying overnight near the park to enjoy a morning safari",
    ],
  },
  {
    slug: "safari-from-kandy",
    from: "Kandy",
    drive: "Approx. 3.5 – 4 hrs by road",
    summary:
      "A beautiful highland-to-lowland journey through tea country and forest roads. Combine with Ella or Nuwara Eliya.",
    tips: [
      "Route via Haputale or Welimada offers stunning scenery",
      "Roads can be narrow — allow extra time",
      "Pair with a Safari + Elephant Transit + Transfer back north",
    ],
  },
  {
    slug: "safari-from-tangalle",
    from: "Tangalle",
    drive: "Approx. 1.5 – 2 hrs by road",
    summary:
      "The closest major coastal town to Udawalawe — ideal for a morning safari and return by lunch.",
    tips: [
      "Closest coastal base to the park — no overnights needed",
      "Start early for the morning window; return for a late lunch",
      "Hambantota is similarly close if you prefer that area",
    ],
  },
  {
    slug: "safari-from-nuwara-eliya",
    from: "Nuwara Eliya",
    drive: "Approx. 3 – 3.5 hrs by road",
    summary:
      "A popular stop on the tea-country circuit. A natural pause before heading to the south coast.",
    tips: [
      "Drive via Haputale and Wellawaya for the most scenic route",
      "Plan a Safari + Transfer onwards to Mirissa or Galle",
      "Morning departure aligns well with afternoon safari arrival",
    ],
  },
];

export const faqs: { q: string; a: string }[] = [
  {
    q: "Are you the official Udawalawe National Park website?",
    a: "No. Udawalawe Wild is an independent online booking platform. We help travelers plan safaris with verified local operators. We are not affiliated with the national park authority.",
  },
  {
    q: "Can you guarantee we will see elephants or other wildlife?",
    a: "No responsible operator can guarantee sightings. Udawalawe is known for its elephant populations and diverse birdlife, but wildlife moves freely. We plan timings and routes that give you the best reasonable chance.",
  },
  {
    q: "Do you own the safari jeeps?",
    a: "No. We partner with carefully verified, licensed local operators. This keeps money in the local economy and gives you experienced drivers who know the park.",
  },
  {
    q: "When will I know the price?",
    a: "After you send an enquiry, we share a fixed, transparent quote before you confirm anything. No hidden fees.",
  },
  {
    q: "How do I pay?",
    a: "For now we accept enquiries and availability requests only. Payment details will be shared directly by your assigned operator once you confirm.",
  },
  {
    q: "What is the best time for a safari?",
    a: "Both morning and late afternoon sessions offer good wildlife activity and softer light. Midday is usually hotter and quieter.",
  },
  {
    q: "What is the Elephant Transit Home?",
    a: "The Elephant Transit Home (ETH) is a government-run wildlife facility adjacent to Udawalawe National Park. It rehabilitates orphaned elephant calves found in the wild, with the aim of releasing them back into the park. Visitors can observe feeding sessions from a distance. We include an ETH visit in our Safari + Elephant Transit + Transfer package.",
  },
];

export const placeholderReviews = [
  {
    name: "Guest review placeholder",
    location: "Coming soon",
    body: "Real guest reviews will appear here once available. We do not publish fake testimonials.",
  },
  {
    name: "Guest review placeholder",
    location: "Coming soon",
    body: "We are collecting honest reviews from confirmed travellers. Until then, this space stays empty on purpose.",
  },
  {
    name: "Guest review placeholder",
    location: "Coming soon",
    body: "Prefer to hear from past guests directly? Ask us on WhatsApp — we can share references from recent trips.",
  },
];
