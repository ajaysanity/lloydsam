"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Heart, MapPin, Gem, Flower2, Sparkles, Star, Ribbon, Music2 } from "lucide-react";

/* ── Scattered icon background ──────────────────────────────── */
const BG_ICONS = [
  { Icon: Heart,    top: "2%",  left: "1%",   size: 52, rotate: -12, opacity: 0.22 },
  { Icon: Flower2,  top: "3%",  left: "22%",  size: 44, rotate: 18,  opacity: 0.22 },
  { Icon: Sparkles, top: "2%",  left: "48%",  size: 40, rotate: -5,  opacity: 0.22 },
  { Icon: Gem,      top: "3%",  left: "70%",  size: 42, rotate: 14,  opacity: 0.20 },
  { Icon: Ribbon,   top: "2%",  left: "90%",  size: 48, rotate: -8,  opacity: 0.22 },
  { Icon: Music2,   top: "16%", left: "0%",   size: 40, rotate: 20,  opacity: 0.20 },
  { Icon: Star,     top: "18%", left: "94%",  size: 38, rotate: -16, opacity: 0.22 },
  { Icon: Flower2,  top: "28%", left: "2%",   size: 44, rotate: 28,  opacity: 0.20 },
  { Icon: Heart,    top: "30%", left: "92%",  size: 48, rotate: -10, opacity: 0.24 },
  { Icon: Sparkles, top: "42%", left: "1%",   size: 38, rotate: -18, opacity: 0.22 },
  { Icon: Gem,      top: "44%", left: "94%",  size: 40, rotate: 10,  opacity: 0.20 },
  { Icon: Ribbon,   top: "55%", left: "0%",   size: 46, rotate: 14,  opacity: 0.22 },
  { Icon: Music2,   top: "57%", left: "93%",  size: 36, rotate: -22, opacity: 0.22 },
  { Icon: Star,     top: "66%", left: "3%",   size: 34, rotate: 32,  opacity: 0.20 },
  { Icon: Flower2,  top: "68%", left: "91%",  size: 44, rotate: -14, opacity: 0.22 },
  { Icon: Heart,    top: "78%", left: "1%",   size: 50, rotate: -6,  opacity: 0.24 },
  { Icon: Sparkles, top: "80%", left: "90%",  size: 40, rotate: 18,  opacity: 0.22 },
  { Icon: Gem,      top: "88%", left: "12%",  size: 38, rotate: -10, opacity: 0.20 },
  { Icon: Ribbon,   top: "90%", left: "80%",  size: 44, rotate: 8,   opacity: 0.22 },
  { Icon: Star,     top: "94%", left: "36%",  size: 36, rotate: 24,  opacity: 0.20 },
  { Icon: Heart,    top: "95%", left: "60%",  size: 42, rotate: -14, opacity: 0.24 },
  { Icon: Flower2,  top: "96%", left: "88%",  size: 38, rotate: 20,  opacity: 0.22 },
] as const;

function IconBackground() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {BG_ICONS.map(({ Icon, top, left, size, rotate, opacity }, i) => (
        <span
          key={i}
          className="absolute"
          style={{ top, left, opacity, transform: `rotate(${rotate}deg)`, color: "#1a3060" }}
        >
          <Icon size={size} strokeWidth={1} />
        </span>
      ))}
    </div>
  );
}

/* ── Story data ─────────────────────────────────────────────── */
interface Milestone {
  year: string;
  title: string;
  description: string;
  image: string;
  width: number;
  height: number;
  side: "left" | "right";
  icon: React.ElementType;
  accent: string;
}

const milestones: Milestone[] = [
  {
    year: "2014",
    title: "First Meeting",
    description:
      "We meet in Grade 9 at San Jose National High School. It all started with our friends' playful teasing. Little did we know, those simple moments would lead us to a love story of our own.",
    image: "/gallery/first.png",
    width: 421,
    height: 553,
    side: "left",
    icon: MapPin,
    accent: "#8fafc9",
  },
  {
    year: "2015",
    title: "First Dance",
    description:
      "On prom night, we shared our first dance, simply enjoying the music and each other's company. What felt like an ordinary moments became a memory close to our hearts, a little glimpse of the beautiful love story waiting to unfold.",
    image: "/gallery/date1.jpg",
    width: 1070,
    height: 803,
    side: "right",
    icon: Heart,
    accent: "#c9848a",
  },
  {
    year: "2025",
    title: "The Proposal",
    description:
      "It was Christmas Day, and what began as a simple exchange gift turned into a moment straight from our hearts. Surrounded by his family, Lloyd surprised me with a proposal I never saw coming. In the warmth of Christmas, one heartfelt question became the sweetest promise of forever.",
    image: "/gallery/proposal.jpg",
    width: 1290,
    height: 914,
    side: "left",
    icon: Gem,
    accent: "#b79a68",
  },
  {
    year: "2026",
    title: "Forever Begins",
    description:
      "From the innocence of young love to a lifetime of shared dreams, twelve years have brought us to this beautiful moment. Our next chapter begins with a promise of endless love.",
    image: "/images/forever.jpg",
    width: 853,
    height: 1280,
    side: "right",
    icon: Heart,
    accent: "#8fad90",
  },
];

/* ── Animated pulse marker on the spine ────────────────────── */
function SpineMarker({ accent }: { accent: string }) {
  return (
    <div className="relative flex items-center justify-center">
      {/* Outer pulse ring */}
      <motion.div
        className="absolute rounded-full"
        style={{ width: 28, height: 28, background: `${accent}22` }}
        animate={{ scale: [1, 1.5, 1], opacity: [0.6, 0, 0.6] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Inner dot */}
      <div
        className="relative z-10 h-3 w-3 rounded-full"
        style={{ background: accent, boxShadow: `0 0 0 3px white, 0 0 0 5px ${accent}55` }}
      />
    </div>
  );
}

/* ── Single milestone card ───────────────────────────────────── */
function MilestoneCard({ milestone, index }: { milestone: Milestone; index: number }) {
  const isLeft = milestone.side === "left";
  const Icon = milestone.icon;

  return (
    <div className="relative w-full">

      {/* ── Desktop layout: zig-zag ───────────────────────── */}
      <div className="hidden md:grid md:grid-cols-[1fr_48px_1fr] md:items-center md:gap-x-8">

        {/* Left content or spacer */}
        <div className={isLeft ? "flex justify-end" : ""}>
          {isLeft && (
            <motion.div
              initial={{ opacity: 0, x: -48 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, delay: index * 0.08, ease: "easeOut" }}
              className="w-full max-w-[320px]"
            >
              <StoryCard milestone={milestone} align="right" />
            </motion.div>
          )}
        </div>

        {/* Center spine marker */}
        <div className="flex justify-center">
          <SpineMarker accent={milestone.accent} />
        </div>

        {/* Right content or spacer */}
        <div>
          {!isLeft && (
            <motion.div
              initial={{ opacity: 0, x: 48 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, delay: index * 0.08, ease: "easeOut" }}
              className="w-full max-w-[320px]"
            >
              <StoryCard milestone={milestone} align="left" />
            </motion.div>
          )}
        </div>
      </div>

      {/* ── Mobile layout: left-anchored single column ────── */}
      <div className="flex gap-5 md:hidden">
        {/* Left spine */}
        <div className="flex flex-col items-center">
          <SpineMarker accent={milestone.accent} />
          {index < milestones.length - 1 && (
            <div className="mt-2 flex-1 w-px" style={{ background: `linear-gradient(to bottom, ${milestone.accent}55, transparent)` }} />
          )}
        </div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.7, delay: index * 0.07, ease: "easeOut" }}
          className="min-w-0 flex-1 pb-8"
        >
          {/* Year + icon pill */}
          <div className="mb-2 flex items-center gap-2">
            <span
              className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 font-sans text-[0.58rem] uppercase tracking-[0.18em]"
              style={{ background: `${milestone.accent}18`, color: milestone.accent, border: `1px solid ${milestone.accent}40` }}
            >
              <Icon size={9} strokeWidth={1.8} />
              {milestone.year}
            </span>
          </div>

          <h3 className="font-serif font-semibold leading-tight mb-2" style={{ fontSize: "0.95rem", color: "#1a3060" }}>
            {milestone.title}
          </h3>

          <div className="relative mb-2.5 w-full overflow-hidden rounded-[4px]">
            <Image
              src={milestone.image}
              alt={milestone.title}
              width={milestone.width}
              height={milestone.height}
              className="block h-auto w-full transition-transform duration-700 hover:scale-105"
              sizes="(max-width: 768px) 80vw"
            />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(26,48,96,0.22) 0%, transparent 50%)" }} />
          </div>

          <p className="font-sans leading-relaxed" style={{ fontSize: "0.78rem", color: "rgba(44,44,44,0.68)" }}>
            {milestone.description}
          </p>
        </motion.div>
      </div>

    </div>
  );
}

/* ── Story card (desktop) ────────────────────────────────────── */
function StoryCard({ milestone, align }: { milestone: Milestone; align: "left" | "right" }) {
  const Icon = milestone.icon;

  return (
    <motion.div
      whileHover={{ y: -6, boxShadow: "0 20px 48px rgba(26,48,96,0.13)" }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="overflow-hidden rounded-[6px]"
      style={{
        background: "white",
        border: "1px solid rgba(26,48,96,0.08)",
        boxShadow: "0 4px 24px rgba(26,48,96,0.07)",
      }}
    >
      {/* Image */}
      <div className="relative w-full overflow-hidden" style={{ aspectRatio: "4/3" }}>
        <Image
          src={milestone.image}
          alt={milestone.title}
          fill
          className="object-cover object-top transition-transform duration-700 hover:scale-105"
          sizes="42vw"
        />
        {/* Gradient overlay for depth */}
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to top, rgba(26,48,96,0.28) 0%, transparent 55%)" }}
        />
        {/* Year badge — floats on image */}
        <div
          className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-full px-3 py-1"
          style={{ background: "rgba(255,255,255,0.88)", backdropFilter: "blur(6px)" }}
        >
          <Icon size={11} strokeWidth={1.8} color={milestone.accent} />
          <span className="font-sans text-[0.6rem] uppercase tracking-[0.18em]" style={{ color: milestone.accent }}>
            {milestone.year}
          </span>
        </div>
      </div>

      {/* Text body */}
      <div className={`p-4 ${align === "right" ? "text-right" : "text-left"}`}>
        {/* Accent line */}
        <div
          className={`mb-3 h-px w-10 ${align === "right" ? "ml-auto" : ""}`}
          style={{ background: `linear-gradient(to right, ${milestone.accent}, transparent)` }}
        />
        <h3
          className="font-serif font-semibold leading-snug mb-3"
          style={{ fontSize: "clamp(1.05rem, 1.5vw, 1.25rem)", color: "#1a3060" }}
        >
          {milestone.title}
        </h3>
        <p
          className="font-sans leading-relaxed"
          style={{ fontSize: "clamp(0.82rem, 1.1vw, 0.9rem)", color: "rgba(44,44,44,0.65)", lineHeight: 1.8 }}
        >
          {milestone.description}
        </p>
      </div>
    </motion.div>
  );
}

/* ── Section header ─────────────────────────────────────────── */
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8, delay, ease: "easeOut" as const },
});

/* ── Main export ────────────────────────────────────────────── */
export default function OurStory() {
  return (
    <section
      id="story"
      className="relative w-full overflow-hidden py-12"
      style={{
        background: "linear-gradient(175deg, #f8f5f0 0%, #eef4fb 40%, #f4f0eb 100%)",
      }}
    >
      <IconBackground />

      <div className="relative z-10 mx-auto max-w-5xl px-5 sm:px-8">

        {/* ── Header ───────────────────────────────────────── */}
        <div className="mb-16 text-center">
          <motion.p
            {...fadeUp(0)}
            className="font-sans uppercase"
            style={{ fontSize: "0.65rem", letterSpacing: "0.38em", color: "rgba(183,154,104,0.9)" }}
          >
            How it all began
          </motion.p>

          <motion.h2
            {...fadeUp(0.12)}
            className="font-script mt-2 leading-none"
            style={{ fontSize: "clamp(3rem, 8vw, 5.5rem)", color: "#1a3060" }}
          >
            Our Love Story
          </motion.h2>

          <motion.div {...fadeUp(0.22)} className="mt-6 flex items-center justify-center gap-4">
            <span className="block h-px w-12" style={{ background: "rgba(183,154,104,0.4)" }} />
            <span className="block h-[5px] w-[5px] rotate-45" style={{ background: "rgba(183,154,104,0.65)" }} />
            <span className="block h-px w-12" style={{ background: "rgba(183,154,104,0.4)" }} />
          </motion.div>
        </div>

        {/* ── Timeline ─────────────────────────────────────── */}
        <div className="relative">
          {/* Desktop vertical spine */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 md:block"
            style={{
              background:
                "linear-gradient(to bottom, transparent 0%, rgba(183,154,104,0.35) 8%, rgba(183,154,104,0.35) 92%, transparent 100%)",
            }}
          />

          <div className="flex flex-col gap-10 md:gap-14">
            {milestones.map((m, i) => (
              <MilestoneCard key={m.year} milestone={m} index={i} />
            ))}
          </div>
        </div>

        {/* ── Closing line ─────────────────────────────────── */}
        <motion.div
          {...fadeUp(0.2)}
          className="mt-16 text-center md:mt-20"
        >
          <p
            className="mx-auto max-w-sm font-serif italic leading-relaxed"
            style={{ fontSize: "clamp(0.88rem, 1.4vw, 1rem)", color: "rgba(26,48,96,0.42)", letterSpacing: "0.02em" }}
          >
            &ldquo;Every love story is beautiful, but ours is our favourite.&rdquo;
          </p>
          <p className="font-script mt-3" style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", color: "#1a3060" }}>
            — Lloyd &amp; Sam
          </p>
        </motion.div>

      </div>
    </section>
  );
}
