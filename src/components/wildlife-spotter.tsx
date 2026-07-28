import { useState } from "react";
import { Sparkles, Eye, Clock, ShieldAlert } from "lucide-react";

// Import existing visual assets
import elephantPortrait from "@/assets/elephant-portrait.jpg";
import wildlifeImg from "@/assets/wildlife.jpg";
import heroImg from "@/assets/hero-elephant.jpg";
import landscapeImg from "@/assets/landscape.jpg";

type Species = {
  id: string;
  name: string;
  scientificName: string;
  category: "elephants" | "predators" | "birds" | "reptiles";
  sightingRate: string;
  bestTime: string;
  image: string;
  description: string;
  funFact: string;
};

const speciesList: Species[] = [
  {
    id: "asian-elephant",
    name: "Asian Elephant",
    scientificName: "Elephas maximus maximus",
    category: "elephants",
    sightingRate: "98% (Guaranteed Sighting)",
    bestTime: "Morning 06:00 - 08:30 & Afternoon 15:30 - 18:00",
    image: elephantPortrait,
    description: "Udawalawe is home to over 600 wild Sri Lankan elephants. Unlike other parks, elephant sightings here are almost guaranteed year-round due to the reservoir.",
    funFact: "Udawalawe has one of the highest densities of wild Asian elephants anywhere in the world.",
  },
  {
    id: "spot-billed-pelican",
    name: "Spot-billed Pelican & Waterbirds",
    scientificName: "Pelecanus philippensis",
    category: "birds",
    sightingRate: "92% Very High",
    bestTime: "Early Morning near Reservoir Wetlands",
    image: wildlifeImg,
    description: "Udawalawe Reservoir attracts thousands of migratory waterbirds including pelicans, painted storks, spoonbills, and crested serpent eagles.",
    funFact: "Over 184 species of birds inhabit the park, making it a birdwatcher's haven.",
  },
  {
    id: "mugger-crocodile",
    name: "Mugger Crocodile",
    scientificName: "Crocodylus palustris",
    category: "reptiles",
    sightingRate: "85% High",
    bestTime: "Midday Basking along Reservoir Banks",
    image: landscapeImg,
    description: "Basking openly on muddy banks or swimming gracefully across Walawe Reservoir, these freshwater crocodiles are frequently observed up close.",
    funFact: "Muggers can reach lengths of up to 4 to 5 meters in the serene park waters.",
  },
  {
    id: "sri-lankan-leopard",
    name: "Sri Lankan Leopard",
    scientificName: "Panthera pardus kotiya",
    category: "predators",
    sightingRate: "15% (Elusive Special)",
    bestTime: "First Light 06:00 AM on rocky outcrops",
    image: heroImg,
    description: "While Yala is known for leopards, a small resident population stalks the open grasslands of Udawalawe. Spotting one here is a rare highlight.",
    funFact: "Leopards in Udawalawe are Apex predators and hunt spotted deer across open plains.",
  },
];

export function WildlifeSpotter() {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const filteredSpecies = activeCategory === "all"
    ? speciesList
    : speciesList.filter((s) => s.category === activeCategory);

  return (
    <div className="space-y-8">
      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          {[
            { id: "all", label: "All Fauna" },
            { id: "elephants", label: "🐘 Elephants" },
            { id: "birds", label: "🦅 Birdlife" },
            { id: "reptiles", label: "🐊 Reptiles & Wetlands" },
            { id: "predators", label: "🐆 Predators & Elusive" },
          ].map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategory(cat.id)}
              className={`rounded-full px-4 py-2 text-xs font-medium transition ${
                activeCategory === cat.id
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "bg-secondary/70 text-foreground hover:bg-secondary"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="text-xs text-muted-foreground flex items-center gap-1.5">
          <Sparkles className="h-3.5 w-3.5 text-accent" />
          <span>Real sighting logs verified by local jeep drivers</span>
        </div>
      </div>

      {/* Species Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {filteredSpecies.map((species) => (
          <div
            key={species.id}
            className="group overflow-hidden rounded-2xl border border-border/80 bg-card shadow-sm transition hover:shadow-xl hover:-translate-y-1"
          >
            <div className="relative aspect-[4/3] overflow-hidden bg-muted">
              <img
                src={species.image}
                alt={species.name}
                loading="lazy"
                className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              
              <div className="absolute top-3 left-3">
                <span className="inline-flex items-center gap-1 rounded-full bg-black/60 px-2.5 py-1 text-[10px] font-semibold text-white backdrop-blur">
                  <Eye className="h-3 w-3 text-emerald-400" />
                  {species.sightingRate}
                </span>
              </div>

              <div className="absolute bottom-3 left-3 right-3 text-white">
                <div className="font-serif text-lg font-medium leading-tight">{species.name}</div>
                <div className="text-[11px] italic opacity-80">{species.scientificName}</div>
              </div>
            </div>

            <div className="p-4 space-y-3">
              <p className="text-xs leading-relaxed text-muted-foreground">
                {species.description}
              </p>

              <div className="space-y-1.5 border-t border-border/60 pt-3 text-[11px]">
                <div className="flex items-center gap-1.5 text-foreground font-medium">
                  <Clock className="h-3 w-3 text-primary shrink-0" />
                  <span>Best Time: {species.bestTime}</span>
                </div>

                <div className="rounded-lg bg-secondary/50 p-2 text-[11px] text-foreground/80">
                  💡 <em>{species.funFact}</em>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
