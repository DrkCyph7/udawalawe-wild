"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image, { StaticImageData } from "next/image";
import elephantPortrait from "@/assets/elephant-portrait.jpg";
import landscape from "@/assets/landscape.jpg";
import ethicalImg from "@/assets/ethical-safari-img.jpg";

const desktopHeroImages = [
  {
    src: landscape,
    alt: "Sweeping savanna landscape of Udawalawe National Park",
    title: "Udawalawe Safari Jeep Booking - Best Private Safari Tours",
  },
  {
    src: elephantPortrait,
    alt: "Close-up portrait of a Sri Lankan elephant during a morning safari in Udawalawe",
    title: "Best time for elephant sightings in Udawalawe",
  },
  {
    src: ethicalImg,
    alt: "Wildlife viewing in its natural habitat at Udawalawe National Park",
    title: "Full Day Udawalawe National Park Safari",
  },
];

const mobileHeroImages = [
  {
    src: elephantPortrait,
    alt: "Close-up portrait of a Sri Lankan elephant during a morning safari in Udawalawe",
    title: "Best time for elephant sightings in Udawalawe",
  },
  {
    src: ethicalImg,
    alt: "Wildlife viewing in its natural habitat at Udawalawe National Park",
    title: "Full Day Udawalawe National Park Safari",
  },
  {
    src: landscape,
    alt: "Sweeping savanna landscape of Udawalawe National Park",
    title: "Udawalawe Safari Jeep Booking - Best Private Safari Tours",
  },
];

export function HeroSlideshow() {
  const [activeHero, setActiveHero] = useState(0);
  // Start at 0, but on mount, we'll start cycling.
  // Actually, since the static image handles index 0, we can just fade in index 1, 2, etc.

  useEffect(() => {
    const id = setInterval(() => setActiveHero((i) => (i + 1) % desktopHeroImages.length), 6000);
    return () => clearInterval(id);
  }, []);

  return (
    <>
      <motion.div className="absolute inset-0 z-0" aria-hidden="true">
        <AnimatePresence initial={false}>
          <motion.div
            key={`slide-${activeHero}`}
            style={{ willChange: "opacity" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="absolute inset-0 h-full w-full"
          >
            <Image
              src={desktopHeroImages[activeHero].src}
              alt={desktopHeroImages[activeHero].alt}
              title={desktopHeroImages[activeHero].title}
              fill
              sizes="100vw"
              className="hidden sm:block object-cover object-center"
            />
            <Image
              src={mobileHeroImages[activeHero].src}
              alt={mobileHeroImages[activeHero].alt}
              title={mobileHeroImages[activeHero].title}
              fill
              sizes="100vw"
              className="block sm:hidden object-cover object-center"
            />
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* Slide indicator dots — bottom left */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="absolute bottom-20 sm:bottom-16 left-4 sm:left-8 flex gap-1.5 items-center z-20"
      >
        {desktopHeroImages.map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveHero(i)}
            className="group relative flex h-11 w-11 cursor-pointer items-center justify-center rounded-full outline-none"
            aria-label={`Go to slide ${i + 1}`}
          >
            <span
              className="absolute inline-flex transition-all duration-300"
              style={{
                width: i === activeHero ? 20 : 8,
                height: 8,
                borderRadius: 4,
                background: i === activeHero ? "oklch(0.98 0.005 95)" : "oklch(1 0 0 / 0.35)",
              }}
            />
            {/* Extended tap target */}
            <span className="absolute inset-0" />
          </button>
        ))}
      </motion.div>
    </>
  );
}
