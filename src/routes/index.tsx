import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { TransitionLink as Link } from "@/components/transition-link";
import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { TiltCard } from "@/components/tilt-card";
import { Reveal } from "@/components/reveal";
import {
  Binoculars,
  CalendarCheck,
  Car,
  ChevronRight,
  Footprints,
  Handshake,
  Leaf,
  MapPin,
  MessageCircle,
  PawPrint,
  Quote,
  Sparkles,
  Star,
  TreePine,
  Wallet,
} from "lucide-react";
import elephantPortrait from "@/assets/elephant-portrait.jpg";
import elephantPortrait800 from "@/assets/elephant-portrait-800w.webp";
import elephantPortrait1200 from "@/assets/elephant-portrait-1200w.webp";
import elephantPortrait1600 from "@/assets/elephant-portrait-1600w.webp";
import landscape from "@/assets/landscape.jpg";
import landscape800 from "@/assets/landscape-800w.webp";
import landscape1200 from "@/assets/landscape-1200w.webp";
import landscape1600 from "@/assets/landscape-1600w.webp";
import wildlife from "@/assets/wildlife.jpg";
import ethicalImg from "@/assets/ethical-safari-img.jpg";
import ethicalImg800 from "@/assets/ethical-safari-img-800w.webp";
import ethicalImg1200 from "@/assets/ethical-safari-img-1200w.webp";
import ethicalImg1600 from "@/assets/ethical-safari-img-1600w.webp";
import { EnquiryForm } from "@/components/enquiry-form";
import { Section, SectionHeading, Eyebrow } from "@/components/section";
import { FaqList } from "@/components/faq-list";
import { Skeleton } from "@/components/ui/skeleton";
import { safaris, faqs, routes as travelRoutes } from "@/lib/content";
import reviewsData from "@/lib/reviews.json";
import { waLink } from "@/lib/site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Udawalawe Wild — Private safaris in Udawalawe, Sri Lanka" },
      {
        name: "description",
        content:
          "Private, wildlife-first safaris with verified local partners, transparent pricing, and simple planning in Udawalawe National Park.",
      },
      { property: "og:title", content: "Udawalawe Wild — Private safaris in Udawalawe" },
      {
        property: "og:description",
        content:
          "Verified local partners. Private jeeps. Transparent quotes. Wildlife-first experiences.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://www.udawalawe-wild.com" },
      { property: "og:image", content: "https://www.udawalawe-wild.com/og-image.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: "https://www.udawalawe-wild.com/og-image.png" },
    ],
    links: [{ rel: "canonical", href: "https://www.udawalawe-wild.com" }],
  }),
  component: Home,
});


/* ═══════════════════ ETHICS RULES ═════════════════════════════════════ */
const ethicsRules = [
  { icon: Binoculars, r: "Keep a respectful distance at all times" },
  { icon: Car, r: "No chasing or crowding animals with the jeep" },
  { icon: Footprints, r: "No feeding wildlife under any circumstance" },
  { icon: Star, r: "No false promises of sightings" },
  { icon: TreePine, r: "Calm, considered driving throughout the park" },
];

/* ═══════════════════ BENEFITS ═════════════════════════════════════════ */
const benefits = [
  {
    t: "Clear pricing",
    d: "Fixed quotes before you confirm. No surprise fees at the gate.",
    icon: Wallet,
  },
  {
    t: "Carefully selected partners",
    d: "Every operator is licensed, insured, and vetted for conduct.",
    icon: Handshake,
  },
  {
    t: "Responsive planning",
    d: "Real replies on WhatsApp — usually within a few hours.",
    icon: MessageCircle,
  },
  {
    t: "Private experience",
    d: "Your jeep, your pace. No sharing with strangers.",
    icon: Car,
  },
];

/* ═══════════════════ TRUST STRIP ════════════════════════════════════════ */
const trustStats = [
  { icon: Handshake, stat: "100%", label: "Verified Local Partners", sub: "Every guide is local & licensed" },
  { icon: Car, stat: "0", label: "Shared Vehicles", sub: "Private jeeps, always" },
  { icon: Wallet, stat: "₀", label: "Hidden Fees", sub: "Transparent pricing guaranteed" },
  { icon: PawPrint, stat: "50+", label: "Species in the Park", sub: "Ethical wildlife-first approach" },
];

/* ═══════════════════ STAT PILLS ═════════════════════════════════════════ */
const statPills = [
  { label: "12+ Years Guiding", icon: Leaf },
  { label: "50+ Species Spotted", icon: PawPrint },
  { label: "100% Private Jeeps", icon: Car },
];

/* ═══════════════════ HOME PAGE ═════════════════════════════════════════ */
function Home() {
  const { data, isPending } = useQuery({
    queryKey: ["home-page-content"],
    queryFn: async () => ({
      safaris,
      faqs,
      routes: travelRoutes,
    }),
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });

  const visibleSafaris = data?.safaris ?? safaris;
  const visibleFaqs = data?.faqs ?? faqs;
  const visibleRoutes = data?.routes ?? travelRoutes;

  /* Duplicate reviews for infinite marquee */
  const allReviews = [...reviewsData, ...reviewsData];

  /* Mobile safari scroll dot tracker */
  const safariScrollRef = useRef<HTMLDivElement>(null);
  const [activeDot, setActiveDot] = useState(0);

  useEffect(() => {
    const el = safariScrollRef.current;
    if (!el) return;
    const handler = () => {
      const idx = Math.round(el.scrollLeft / (el.offsetWidth * 0.72 + 16));
      setActiveDot(Math.max(0, Math.min(idx, visibleSafaris.length - 1)));
    };
    el.addEventListener("scroll", handler, { passive: true });
    return () => el.removeEventListener("scroll", handler);
  }, [visibleSafaris.length]);

  /* Hero background slideshow */
  const heroImages = [
    { src: landscape, srcSet: `${landscape800} 800w, ${landscape1200} 1200w, ${landscape1600} 1600w`, alt: "Sweeping savanna landscape of Udawalawe National Park" },
    { src: elephantPortrait, srcSet: `${elephantPortrait800} 800w, ${elephantPortrait1200} 1200w, ${elephantPortrait1600} 1600w`, alt: "Close-up portrait of a Sri Lankan elephant" },
    { src: ethicalImg, srcSet: `${ethicalImg800} 800w, ${ethicalImg1200} 1200w, ${ethicalImg1600} 1600w`, alt: "Wildlife in the natural habitat of Udawalawe" },
  ];
  const [activeHero, setActiveHero] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setActiveHero((i) => (i + 1) % heroImages.length), 6000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* Subtle scroll parallax on the hero background */
  const prefersReducedMotion = useReducedMotion();
  const heroSectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress: heroScrollProgress } = useScroll({
    target: heroSectionRef,
    offset: ["start start", "end start"],
  });
  const heroParallaxY = useTransform(heroScrollProgress, [0, 1], prefersReducedMotion ? ["0%", "0%"] : ["0%", "9%"]);

  return (
    <>
      {/* ═══════════════════════ HERO ══════════════════════════════════ */}
      {/* header is fixed+transparent, so hero fills full 100svh from top */}
      <section
        ref={heroSectionRef}
        className="relative isolate overflow-hidden h-[100svh] min-h-[600px] sm:min-h-[680px] flex flex-col"
      >

        {/* ── Crossfade background slideshow ──────────────────────── */}
        <motion.div className="absolute inset-0 -z-10" style={{ y: heroParallaxY }}>
          <AnimatePresence>
            <motion.img
              key={activeHero}
              src={heroImages[activeHero].src}
              srcSet={heroImages[activeHero].srcSet}
              sizes="100vw"
              alt={heroImages[activeHero].alt}
              width={1920}
              height={1280}
              className="absolute inset-0 h-full w-full object-cover object-center"
              initial={{ opacity: 0, scale: 1.06 }}
              animate={{ opacity: 1, scale: 1.02 }}
              exit={{ opacity: 0, scale: 1 }}
              transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
            />
          </AnimatePresence>
          {/* Cinematic dark vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.15_0.06_150_/_0.92)] via-[oklch(0.15_0.06_150_/_0.48)] to-[oklch(0.15_0.06_150_/_0.15)]" />
          {/* Left-side dark anchor so text always readable */}
          <div className="absolute inset-0 bg-gradient-to-r from-[oklch(0.15_0.06_150_/_0.72)] via-[oklch(0.15_0.06_150_/_0.2)] to-transparent" />
          {/* Golden-hour warm wash from right */}
          <div className="absolute inset-0 bg-gradient-to-l from-[oklch(0.56_0.17_40_/_0.1)] to-transparent" />
        </motion.div>

        {/* ── Wildlife ticker — rendered BELOW the fixed header (top-16) ─ */}
        {/* Header is ~64px tall, so we offset by that */}
        <div
          className="absolute left-0 right-0 h-9 overflow-hidden flex items-center"
          style={{
            top: "64px",
            background: "oklch(0.12 0.05 150 / 0.55)",
            borderTop: "1px solid oklch(1 0 0 / 0.06)",
            borderBottom: "1px solid oklch(1 0 0 / 0.08)",
            backdropFilter: "blur(12px) saturate(1.4)",
          }}
        >
          <div className="flex w-max" style={{ animation: "marquee 32s linear infinite" }}>
            {[
              "🐘 Elephant", "🦅 Eagle", "🦊 Jackal", "🐊 Crocodile",
              "🦚 Peacock", "🦬 Buffalo", "🐆 Leopard", "🐦 Kingfisher",
              "🐘 Elephant", "🦅 Eagle", "🦊 Jackal", "🐊 Crocodile",
              "🦚 Peacock", "🦬 Buffalo", "🐆 Leopard", "🐦 Kingfisher",
            ].map((s, i) => (
              <span key={i}
                className="px-5 text-[10px] font-semibold tracking-[0.22em] uppercase whitespace-nowrap"
                style={{ color: "oklch(0.85 0.02 78 / 0.6)" }}>
                {s}
                <span className="ml-5" style={{ color: "oklch(0.56 0.17 40 / 0.4)" }}>·</span>
              </span>
            ))}
          </div>
        </div>

        {/* ── Live rating badge — liquid glass pill ───────────────── */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 2.2, ease: [0.22, 1, 0.36, 1] }}
          className="absolute top-[120px] right-4 sm:right-8 hidden sm:flex items-center gap-2 rounded-full px-4 py-2.5"
          style={{
            background: "oklch(1 0 0 / 0.08)",
            border: "1px solid oklch(1 0 0 / 0.18)",
            backdropFilter: "blur(20px) saturate(1.8)",
            boxShadow: "0 4px 24px oklch(0 0 0 / 0.25), inset 0 1px 0 oklch(1 0 0 / 0.15)",
          }}
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[oklch(0.56_0.17_40)] opacity-70" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[oklch(0.56_0.17_40)]" />
          </span>
          <span className="text-xs font-semibold" style={{ color: "oklch(0.95 0.02 78)" }}>
            4.9 ★ · 500+ Travellers
          </span>
        </motion.div>

        {/* ── Slide indicator dots — bottom left ──────────────────── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 0.6 }}
          className="absolute bottom-16 left-4 sm:left-8 flex gap-1.5 items-center"
        >
          {heroImages.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveHero(i)}
              className="transition-all duration-500 rounded-full"
              style={{
                width: i === activeHero ? 22 : 6,
                height: 4,
                background: i === activeHero
                  ? "oklch(0.56 0.17 40)"
                  : "oklch(1 0 0 / 0.35)",
              }}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </motion.div>


        {/* ── Main content — centered; pt accounts for header (64px) + ticker (36px) ── */}
        <div className="flex-1 flex items-center pt-[84px] sm:pt-[100px]">
          <div className="mx-auto w-full max-w-6xl px-4 sm:px-8 py-8 grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16 lg:items-center">
            {/* Left — headline + CTAs */}
            <div>
              {/* Eyebrow */}
              <motion.div
                initial={{ opacity: 0, y: 14, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.7, delay: 2.0, ease: [0.22, 1, 0.36, 1] }}
                className="mb-5 inline-flex items-center gap-2 rounded-full px-4 py-2"
                style={{
                  background: "oklch(1 0 0 / 0.1)",
                  border: "1px solid oklch(1 0 0 / 0.2)",
                  backdropFilter: "blur(20px) saturate(1.6)",
                  boxShadow: "0 2px 16px oklch(0 0 0 / 0.2), inset 0 1px 0 oklch(1 0 0 / 0.2)",
                }}
              >
                <Sparkles className="h-3 w-3" style={{ color: "oklch(0.72 0.09 52)" }} />
                <span className="text-[10px] font-semibold uppercase tracking-[0.2em]"
                  style={{ color: "oklch(0.93 0.035 76 / 0.85)" }}>
                  Udawalawe, Sri Lanka
                </span>
              </motion.div>

              {/* Staggered headline */}
              <motion.div
                initial={{ opacity: 0, y: 60, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 1.0, delay: 2.15, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden"
              >
                <h1
                  className="font-serif leading-[1.05] text-4xl sm:text-6xl lg:text-7xl"
                  style={{ color: "oklch(0.93 0.035 76)" }}
                >
                  Experience <br />
                  Udawalawe, <br />
                  <motion.span
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.9, delay: 2.45, ease: [0.22, 1, 0.36, 1] }}
                    className="italic inline-block mt-1 sm:mt-0"
                    style={{ color: "oklch(0.72 0.09 52)" }}
                  >
                    wildly.
                  </motion.span>
                </h1>
              </motion.div>

              {/* Subtext */}
              <motion.p
                initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.8, delay: 2.55, ease: [0.22, 1, 0.36, 1] }}
                className="mt-6 max-w-lg text-base leading-relaxed sm:text-lg"
                style={{ color: "oklch(0.93 0.035 76 / 0.75)" }}
              >
                Private, wildlife-first safaris with verified local partners, transparent pricing, and
                simple planning.
              </motion.p>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 2.7, ease: [0.22, 1, 0.36, 1] }}
                className="mt-8 flex flex-col sm:flex-row flex-wrap gap-3"
              >
                <Link
                  to="/book"
                  className="group inline-flex w-full sm:w-auto items-center justify-center gap-2.5 rounded-xl px-6 py-3.5 sm:py-3 text-sm font-semibold shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl active:scale-95"
                  style={{
                    background: "oklch(0.56 0.17 40)",
                    color: "oklch(0.97 0.018 80)",
                    boxShadow: "0 4px 24px oklch(0.56 0.17 40 / 0.4)",
                  }}
                >
                  <CalendarCheck className="h-4 w-4" aria-hidden="true" />
                  Plan my safari
                </Link>
                <a
                  href={waLink("Hi Udawalawe Wild, I'd like to plan a safari.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full sm:w-auto items-center justify-center gap-2.5 rounded-xl px-6 py-3.5 sm:py-3 text-sm font-semibold transition-all duration-300 hover:scale-105 active:scale-95"
                  style={{
                    border: "1px solid oklch(1 0 0 / 0.22)",
                    color: "oklch(0.95 0.02 78)",
                    background: "oklch(1 0 0 / 0.1)",
                    backdropFilter: "blur(20px) saturate(1.6)",
                    boxShadow: "0 4px 20px oklch(0 0 0 / 0.2), inset 0 1px 0 oklch(1 0 0 / 0.2)",
                  }}
                >
                  <MessageCircle className="h-4 w-4" aria-hidden="true" />
                  Chat on WhatsApp
                </a>
              </motion.div>

              {/* Floating stat pills */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 2.85, ease: [0.22, 1, 0.36, 1] }}
                className="mt-8 flex flex-wrap gap-2 sm:gap-2.5"
              >
                {statPills.map(({ label, icon: Icon }) => (
                  <div
                    key={label}
                    className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full px-3 py-1.5 sm:px-4 sm:py-2 text-[11px] sm:text-xs font-semibold"
                    style={{
                      background: "oklch(1 0 0 / 0.1)",
                      border: "1px solid oklch(1 0 0 / 0.18)",
                      color: "oklch(0.95 0.02 78)",
                      backdropFilter: "blur(20px) saturate(1.6)",
                      boxShadow: "0 2px 12px oklch(0 0 0 / 0.2), inset 0 1px 0 oklch(1 0 0 / 0.18)",
                    }}
                  >
                    <Icon className="h-3 w-3 sm:h-3.5 sm:w-3.5" style={{ color: "oklch(0.72 0.09 52)" }} aria-hidden="true" />
                    {label}
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right — enquiry glass card */}
            <motion.div
              initial={{ opacity: 0, x: 30, filter: "blur(8px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.9, delay: 2.4, ease: [0.22, 1, 0.36, 1] }}
              className="hidden sm:block"
            >
              <div
                className="rounded-3xl p-6 sm:p-8"
                style={{
                  background: "oklch(0.97 0.018 80 / 0.88)",
                  border: "1px solid oklch(1 0 0 / 0.6)",
                  backdropFilter: "blur(28px) saturate(2)",
                  boxShadow: "0 32px 80px oklch(0.15 0.06 150 / 0.4), 0 2px 0 oklch(1 0 0 / 0.9) inset, inset 0 0 0 1px oklch(0.84 0.04 73 / 0.4)",
                }}
              >
                <div className="mb-4">
                  <Eyebrow>Check availability</Eyebrow>
                  <div className="font-serif text-2xl text-foreground">Start with your dates.</div>
                  <p className="mt-1 text-xs text-muted-foreground">
                    A real person will reply with verified options within one business day.
                  </p>
                </div>
                <EnquiryForm />
              </div>
            </motion.div>
          </div>
        </div>

        {/* ── Scroll cue ──────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.2, duration: 0.8 }}
          className="absolute bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          style={{ color: "oklch(0.93 0.035 76 / 0.5)" }}
        >
          <span className="text-[9px] font-semibold uppercase tracking-[0.3em]">Explore</span>
          <motion.div
            animate={prefersReducedMotion ? {} : { y: [0, 6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="h-8 w-5 rounded-full flex items-start justify-center pt-1.5"
            style={{ border: "1.5px solid oklch(1 0 0 / 0.25)" }}
          >
            <motion.div
              className="h-1.5 w-1 rounded-full"
              style={{ background: "oklch(0.56 0.17 40)" }}
              animate={prefersReducedMotion ? {} : { y: [0, 10, 0], opacity: [1, 0, 1] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        </motion.div>
      </section>

      {/* ═══════════════════ TRUST STRIP ═══════════════════════════════ */}
      {/* Dark cinematic band — extends the hero's atmosphere into the page */}
      <div
        className="relative overflow-hidden"
        style={{
          background: "linear-gradient(180deg, oklch(0.16 0.05 150) 0%, oklch(0.19 0.055 150) 100%)",
          borderBottom: "1px solid oklch(1 0 0 / 0.08)",
        }}
      >
        {/* Subtle grain overlay */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{ backgroundImage: "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")" }} />

        <Reveal>
          <div className="mx-auto grid max-w-6xl grid-cols-2 lg:grid-cols-4 gap-px px-0"
            style={{ background: "oklch(1 0 0 / 0.05)" }}>
            {trustStats.map(({ icon: Icon, stat, label, sub }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
                className="group flex flex-col items-center gap-2 px-4 py-7 sm:px-6 sm:py-8 text-center cursor-default"
                style={{ background: "oklch(0.19 0.055 150)" }}
              >
                {/* Icon circle */}
                <div
                  className="mb-1 flex h-11 w-11 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110"
                  style={{
                    background: "oklch(0.56 0.17 40 / 0.15)",
                    border: "1px solid oklch(0.56 0.17 40 / 0.3)",
                    boxShadow: "0 0 20px oklch(0.56 0.17 40 / 0.12)",
                  }}
                >
                  <Icon className="h-5 w-5" style={{ color: "oklch(0.72 0.09 52)" }} aria-hidden="true" />
                </div>
                {/* Bold stat */}
                <div className="font-serif text-2xl font-medium" style={{ color: "oklch(0.56 0.17 40)" }}>
                  {stat}
                </div>
                {/* Label */}
                <div className="text-xs font-bold uppercase tracking-[0.18em]" style={{ color: "oklch(0.93 0.035 76)" }}>
                  {label}
                </div>
                {/* Sub-label */}
                <div className="text-[10px] leading-snug" style={{ color: "oklch(0.65 0.03 76)" }}>
                  {sub}
                </div>
              </motion.div>
            ))}
          </div>
        </Reveal>
      </div>

      {/* ═══════════════════ SAFARIS ════════════════════════════════════ */}
      <Section>
        <Reveal>
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <SectionHeading
              eyebrow="Safari options"
              title="Five ways to explore the park."
              intro="Each option is a private jeep run by a verified local operator. Wildlife first, always."
            />
            <Link
              to="/safaris"
              className="link-underline flex shrink-0 items-center gap-1 text-sm font-medium text-primary"
            >
              Compare all options
              <ChevronRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </Reveal>

        {/* Mobile: horizontal snap scroll | Desktop: 5-col grid */}
        <div className="mt-10">
          {/* Mobile scroll container */}
          <div
            ref={safariScrollRef}
            className="flex gap-4 overflow-x-auto scroll-snap-x pb-2 sm:hidden"
          >
            {isPending
              ? Array.from({ length: 5 }).map((_, idx) => (
                <div
                  key={idx}
                  className="safari-snap-card overflow-hidden rounded-xl border border-border bg-card"
                >
                  <Skeleton className="aspect-[3/2] w-full" />
                  <div className="space-y-3 p-4">
                    <Skeleton className="h-3 w-24" />
                    <Skeleton className="h-5 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                  </div>
                </div>
              ))
              : visibleSafaris.map((s, i) => (
                <article
                  key={s.slug}
                  className="safari-snap-card card-lift group flex flex-col overflow-hidden rounded-xl border border-border bg-card"
                >
                  <div className="aspect-[3/2] overflow-hidden bg-muted">
                    <img
                      src={[elephantPortrait, ethicalImg, wildlife, landscape, elephantPortrait][i % 5]}
                      alt={s.name}
                      loading="lazy"
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.06]"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-4">
                    <div className="flex items-center gap-1 text-[10px] uppercase tracking-widest text-muted-foreground">
                      <Binoculars className="h-3 w-3" aria-hidden="true" />
                      {s.duration}
                    </div>
                    <h3 className="mt-1.5 font-serif text-lg text-foreground">{s.name}</h3>
                    <p className="mt-1.5 flex-1 text-xs leading-relaxed text-muted-foreground">
                      {s.short}
                    </p>
                    <Link
                      to="/safaris"
                      className="link-underline mt-3 flex items-center gap-1 text-xs font-medium text-primary"
                    >
                      Learn more
                      <ChevronRight className="h-3 w-3" aria-hidden="true" />
                    </Link>
                  </div>
                </article>
              ))}
          </div>

          {/* Scroll dots — hidden on sm+ via CSS */}
          {!isPending && (
            <div className="snap-dots">
              {visibleSafaris.map((_, i) => (
                <div
                  key={i}
                  className={`snap-dot text-[color:var(--forest)] ${i === activeDot ? "active" : ""}`}
                />
              ))}
            </div>
          )}

          {/* Desktop grid */}
          <div className="hidden gap-4 sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {isPending
              ? Array.from({ length: 5 }).map((_, idx) => (
                <article
                  key={idx}
                  className="overflow-hidden rounded-xl border border-border bg-card"
                >
                  <Skeleton className="aspect-[4/5] w-full" />
                  <div className="space-y-3 p-4">
                    <Skeleton className="h-3 w-24" />
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                  </div>
                </article>
              ))
              : visibleSafaris.map((s, i) => (
                <Reveal key={s.slug} delay={i * 70} className="h-full">
                  <TiltCard className="h-full" intensity={7}>
                    <article
                      className="card-lift group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card"
                      style={{ transformStyle: "preserve-3d" }}
                    >
                      <div className="aspect-[4/5] overflow-hidden bg-muted">
                        <img
                          src={[elephantPortrait, ethicalImg, wildlife, landscape, elephantPortrait][i % 5]}
                          alt={s.name}
                          loading="lazy"
                          className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.06]"
                        />
                      </div>
                      <div className="flex flex-1 flex-col p-4">
                        <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-muted-foreground">
                          <Binoculars className="h-3 w-3" aria-hidden="true" />
                          {s.duration}
                        </div>
                        <h3 className="mt-1.5 font-serif text-base font-medium text-foreground">{s.name}</h3>
                        <p className="mt-1.5 flex-1 text-xs leading-relaxed text-muted-foreground">
                          {s.short}
                        </p>
                        <Link
                          to="/safaris"
                          className="link-underline mt-3 flex items-center gap-1 text-xs font-medium text-primary"
                        >
                          Learn more
                          <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
                        </Link>
                      </div>
                    </article>
                  </TiltCard>
                </Reveal>
              ))}
          </div>
        </div>
      </Section>

      {/* ═══════════════════ BENEFITS ═══════════════════════════════════ */}
      {/* Dark section — directly extends the trust strip's dark atmosphere */}
      <div className="section-dark">
        <Section>
          <Reveal>
            <SectionHeading
              eyebrow="Why Udawalawe Wild"
              title="A better way to explore the wild."
              intro="We're small on purpose. Our job is to make your safari calmer, clearer, and kinder to the wildlife you came to see."
              titleClass="text-[oklch(0.93_0.035_76)]"
              introClass="text-[oklch(0.70_0.03_76)]"
            />
          </Reveal>

          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((b, i) => (
              <Reveal key={b.t} delay={i * 90}>
                <TiltCard intensity={6} className="h-full">
                  <div className="benefit-tile h-full" style={{ transformStyle: "preserve-3d" }}>
                    {/* Icon */}
                    <div
                      className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl"
                      style={{
                        background: "oklch(0.56 0.17 40 / 0.18)",
                        border: "1px solid oklch(0.56 0.17 40 / 0.35)",
                      }}
                    >
                      <b.icon className="h-4.5 w-4.5" style={{ color: "oklch(0.72 0.09 52)" }} aria-hidden="true" />
                    </div>
                    <div className="font-serif text-xl" style={{ color: "oklch(0.93 0.035 76)" }}>{b.t}</div>
                    <p className="mt-3 flex-1 text-sm leading-relaxed" style={{ color: "oklch(0.62 0.03 76)" }}>{b.d}</p>
                  </div>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </Section>
      </div>

      {/* ═══════════════════ ELEPHANT TRANSIT HOME ══════════════════════ */}
      <div style={{ background: "oklch(0.93 0.035 76)" }}>
        <Section>
          <Reveal>
            <div
              className="grid gap-8 rounded-3xl p-7 sm:p-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center"
              style={{
                background: "linear-gradient(135deg, oklch(0.19 0.055 150) 0%, oklch(0.22 0.06 145) 100%)",
                border: "1px solid oklch(1 0 0 / 0.08)",
                boxShadow: "0 24px 64px oklch(0 0 0 / 0.25), inset 0 1px 0 oklch(1 0 0 / 0.1)",
              }}
            >
              <div>
                <div className="mb-2 text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: "oklch(0.56 0.17 40)" }}>Special Experience</div>
                <h2 className="mt-1 font-serif text-2xl sm:text-3xl" style={{ color: "oklch(0.93 0.035 76)" }}>
                  Visit the Elephant Transit Home
                </h2>
                <p className="mt-3 text-sm leading-relaxed sm:text-base" style={{ color: "oklch(0.68 0.03 76)" }}>
                  Located right beside Udawalawe National Park, the Elephant Transit Home (ETH) rehabilitates orphaned wild elephant calves until they are strong enough to be released back into the wild. Combine your safari with a public feeding view for a rare, ethical glimpse into elephant conservation.
                </p>
                <div className="mt-6 flex flex-col sm:flex-row sm:items-center gap-4">
                  <Link
                    to="/safaris"
                    className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-xs font-semibold transition-all duration-300 hover:scale-105 active:scale-95"
                    style={{
                      background: "oklch(0.56 0.17 40)",
                      color: "oklch(0.97 0.018 80)",
                      boxShadow: "0 4px 20px oklch(0.56 0.17 40 / 0.4)",
                    }}
                  >
                    Explore Combo Package
                    <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </Link>
                  <Link
                    to="/guide"
                    className="text-xs font-medium transition-colors hover:text-white"
                    style={{ color: "oklch(0.72 0.09 52)" }}
                  >
                    Learn about ETH in our guide →
                  </Link>
                </div>
              </div>
              <TiltCard intensity={5} className="overflow-hidden rounded-2xl aspect-[4/3]" >
                <div style={{ boxShadow: "0 16px 48px oklch(0 0 0 / 0.35)", transformStyle: "preserve-3d" }} className="h-full w-full">
                  <img
                    src={elephantPortrait}
                    alt="Orphaned elephant calf at Udawalawe"
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-700 hover:scale-105"
                  />
                </div>
              </TiltCard>
            </div>
          </Reveal>
        </Section>
      </div>

      {/* ═══════════════════ ETHICAL ════════════════════════════════════ */}
      <Section>
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <Reveal direction="left" className="grain overflow-hidden rounded-2xl">
            <img
              src={wildlife}
              alt="Peacock and buffalo in a green Sri Lankan grassland"
              loading="lazy"
              width={1400}
              height={1000}
              className="h-full max-h-[280px] sm:max-h-[380px] lg:max-h-[480px] w-full object-cover"
            />
          </Reveal>

          <Reveal delay={120} direction="right">
            <SectionHeading
              eyebrow="Ethical safari code"
              title="Wildlife comes first."
              intro="Great sightings happen when animals feel unbothered. Our partners agree to a simple, non-negotiable code."
            />
            <ul className="mt-6 space-y-3">
              {ethicsRules.map(({ icon: Icon, r }, i) => (
                <motion.li
                  key={r}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  className="flex items-start gap-3 text-sm text-foreground/85"
                >
                  <span
                    className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full"
                    style={{
                      background: "oklch(0.56 0.17 40 / 0.12)",
                      border: "1px solid oklch(0.56 0.17 40 / 0.25)",
                    }}
                  >
                    <Icon className="h-3.5 w-3.5" style={{ color: "oklch(0.56 0.17 40)" }} aria-hidden="true" />
                  </span>
                  {r}
                </motion.li>
              ))}
            </ul>
            <Link
              to="/ethical-safari"
              className="link-underline mt-8 inline-flex items-center gap-1.5 text-sm font-medium text-primary"
            >
              Read the full standard
              <ChevronRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
      </Section>

      {/* ═══════════════════ ROUTES ═════════════════════════════════════ */}
      <div style={{ background: "oklch(0.16 0.05 150)" }}>
        <Section>
          <Reveal>
            <SectionHeading
              eyebrow="Getting there"
              title="Coming from the coast or the hills?"
              titleClass="text-[oklch(0.93_0.035_76)]"
              introClass="text-[oklch(0.65_0.03_76)]"
            />
          </Reveal>
          <div className="mt-8 grid grid-cols-2 gap-3 lg:grid-cols-4 items-stretch">
            {isPending
              ? Array.from({ length: 4 }).map((_, idx) => (
                <div key={idx} className="rounded-xl border border-[color:var(--ivory)]/15 p-4">
                  <Skeleton className="h-3 w-16" />
                  <Skeleton className="mt-2 h-6 w-20" />
                  <Skeleton className="mt-2 h-3 w-full" />
                </div>
              ))
              : visibleRoutes.map((r, i) => (
                <Reveal key={r.slug} delay={i * 70} className="h-full">
                  <Link
                    to={`/${r.slug}`}
                    className="group flex h-full flex-col gap-1.5 rounded-xl p-4 transition-all duration-300"
                    style={{
                      background: "oklch(0.21 0.055 150)",
                      border: "1px solid oklch(1 0 0 / 0.08)",
                      boxShadow: "inset 0 1px 0 oklch(1 0 0 / 0.07)",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.background = "oklch(0.24 0.06 150)";
                      (e.currentTarget as HTMLElement).style.borderColor = "oklch(0.56 0.17 40 / 0.4)";
                      (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
                      (e.currentTarget as HTMLElement).style.boxShadow = "0 0 0 1px oklch(0.56 0.17 40 / 0.2), 0 16px 40px oklch(0 0 0 / 0.3)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.background = "oklch(0.21 0.055 150)";
                      (e.currentTarget as HTMLElement).style.borderColor = "oklch(1 0 0 / 0.08)";
                      (e.currentTarget as HTMLElement).style.transform = "";
                      (e.currentTarget as HTMLElement).style.boxShadow = "inset 0 1px 0 oklch(1 0 0 / 0.07)";
                    }}
                  >
                    <div className="flex items-center gap-1 text-[10px] uppercase tracking-widest" style={{ color: "oklch(0.56 0.17 40 / 0.8)" }}>
                      <MapPin className="h-2.5 w-2.5" aria-hidden="true" />
                      From
                    </div>
                    <div className="font-serif text-base leading-tight sm:text-xl" style={{ color: "oklch(0.93 0.035 76)" }}>{r.from}</div>
                    <div className="text-xs leading-snug" style={{ color: "oklch(0.60 0.03 76)" }}>{r.drive}</div>
                    <div className="mt-auto pt-2 flex items-center gap-1 text-xs font-medium opacity-0 transition-opacity duration-200 group-hover:opacity-100" style={{ color: "oklch(0.72 0.09 52)" }}>
                      View route
                      <ChevronRight className="h-3 w-3" aria-hidden="true" />
                    </div>
                  </Link>
                </Reveal>
              ))}
          </div>
        </Section>
      </div>

      {/* ═══════════════════ REVIEWS — Marquee ══════════════════════════ */}
      <section className="overflow-hidden border-y border-border py-16 sm:py-20">
        <Reveal>
          <div className="mb-10 px-5 sm:px-8">
            <SectionHeading
              eyebrow="What guests say"
              title="Real voices, real safaris."
              intro="Every review comes from a confirmed traveller. We don't publish fakes."
            />
          </div>
        </Reveal>

        {/* Infinite marquee track */}
        <div className="select-none" aria-label="Guest reviews carousel">
          <div className="reviews-track">
            {allReviews.map((r, i) => (
              <div
                key={i}
                className="card-lift w-80 shrink-0 rounded-2xl border border-border bg-card p-6 shadow-sm"
                aria-hidden={i >= allReviews.length / 2 ? "true" : undefined}
              >
                {/* Stars */}
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: r.rating }).map((_, s) => (
                    <Star
                      key={s}
                      className="h-3.5 w-3.5 fill-[color:var(--terracotta)] text-[color:var(--terracotta)]"
                      aria-hidden="true"
                    />
                  ))}
                </div>

                {/* Quote */}
                <Quote className="h-4 w-4 text-[color:var(--terracotta)]/40 mb-2" aria-hidden="true" />
                <p className="text-sm leading-relaxed text-foreground/75 italic">
                  "{r.body}"
                </p>

                {/* Author */}
                <div className="mt-4 flex items-center justify-between gap-2 border-t border-border/60 pt-4">
                  <div>
                    <div className="text-sm font-medium text-foreground">{r.name}</div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
                      <MapPin className="h-2.5 w-2.5" aria-hidden="true" />
                      {r.location}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{r.safari}</div>
                    <div className="text-[10px] text-muted-foreground/70">{r.date}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ FAQ ════════════════════════════════════════ */}
      <div className="bg-[color:var(--sand)]/30">
        <Section>
          <Reveal>
            <SectionHeading eyebrow="Good to know" title="Frequently asked questions." />
          </Reveal>
          <div className="mt-8">
            <FaqList items={visibleFaqs} />
          </div>
        </Section>
      </div>

      {/* ═══════════════════ FINAL CTA ══════════════════════════════════ */}
      <section className="relative isolate overflow-hidden">
        <img
          src={landscape}
          alt="Grassland landscape in Udawalawe National Park"
          loading="lazy"
          className="absolute inset-0 -z-10 h-full w-full object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-[oklch(0.22_0.035_155_/_0.82)]" />

        <div className="mx-auto max-w-3xl px-5 py-24 text-center text-[color:var(--ivory)] sm:px-8 sm:py-32">
          <Reveal direction="scale">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[color:var(--ivory)]/25 bg-[color:var(--ivory)]/10 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-[color:var(--ivory)]/75">
              <Sparkles className="h-3.5 w-3.5 text-[color:var(--terracotta)]" aria-hidden="true" />
              Start planning today
            </div>
            <h2 className="font-serif text-4xl leading-tight sm:text-5xl">
              Ready to plan your safari?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-[color:var(--ivory)]/80">
              Send us your dates. We'll come back with verified options and a fixed quote within one
              business day.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row flex-wrap justify-center gap-3">
              <Link
                to="/book"
                className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-lg bg-[color:var(--terracotta)] px-6 py-3 text-sm font-semibold text-[color:var(--ivory)] shadow-md transition-all duration-200 hover:brightness-110 active:scale-95"
              >
                <CalendarCheck className="h-4 w-4" aria-hidden="true" />
                Plan my safari
              </Link>
              <a
                href={waLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-lg border border-[color:var(--ivory)]/50 px-6 py-3 text-sm font-medium text-[color:var(--ivory)] transition-all duration-200 hover:bg-[color:var(--ivory)]/15 hover:border-[color:var(--ivory)]/80 active:scale-95"
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                Chat on WhatsApp
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
