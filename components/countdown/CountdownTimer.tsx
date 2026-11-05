"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Gem, Wine, Music2, UtensilsCrossed, Car,
  Heart, Star, Flower2, Sparkles, Ribbon,
} from "lucide-react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function getTimeLeft(): TimeLeft {
  const target = new Date("2026-12-29T13:00:00").getTime();
  const now = new Date().getTime();
  const diff = Math.max(target - now, 0);
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((diff % (1000 * 60)) / 1000),
  };
}

/* ── Scattered icon background ──────────────────────────────── */
const BG_ICONS = [
  { Icon: Heart,    top: "5%",  left: "3%",   size: 48, rotate: -15, opacity: 0.18, color: "#c9848a" },
  { Icon: Flower2,  top: "2%",  left: "20%",  size: 36, rotate: 20,  opacity: 0.15, color: "#8fad90" },
  { Icon: Gem,      top: "7%",  left: "40%",  size: 32, rotate: 0,   opacity: 0.15, color: "#b79a68" },
  { Icon: Sparkles, top: "3%",  left: "62%",  size: 38, rotate: 10,  opacity: 0.16, color: "#b79a68" },
  { Icon: Ribbon,   top: "6%",  left: "88%",  size: 44, rotate: -8,  opacity: 0.17, color: "#c9848a" },
  { Icon: Flower2,  top: "18%", left: "1%",   size: 40, rotate: 30,  opacity: 0.15, color: "#8fad90" },
  { Icon: Star,     top: "22%", left: "14%",  size: 28, rotate: 20,  opacity: 0.15, color: "#b79a68" },
  { Icon: Heart,    top: "20%", left: "86%",  size: 38, rotate: -20, opacity: 0.18, color: "#c9848a" },
  { Icon: Sparkles, top: "30%", left: "94%",  size: 32, rotate: 5,   opacity: 0.15, color: "#b79a68" },
  { Icon: Gem,      top: "40%", left: "0%",   size: 34, rotate: -10, opacity: 0.15, color: "#8fafc9" },
  { Icon: Flower2,  top: "44%", left: "92%",  size: 40, rotate: 15,  opacity: 0.15, color: "#8fad90" },
  { Icon: Star,     top: "50%", left: "4%",   size: 28, rotate: 30,  opacity: 0.14, color: "#b79a68" },
  { Icon: Heart,    top: "54%", left: "90%",  size: 36, rotate: -5,  opacity: 0.18, color: "#c9848a" },
  { Icon: Ribbon,   top: "62%", left: "92%",  size: 42, rotate: 10,  opacity: 0.16, color: "#c9848a" },
  { Icon: Sparkles, top: "60%", left: "1%",   size: 38, rotate: -20, opacity: 0.15, color: "#b79a68" },
  { Icon: Gem,      top: "72%", left: "5%",   size: 32, rotate: 15,  opacity: 0.15, color: "#8fafc9" },
  { Icon: Flower2,  top: "74%", left: "88%",  size: 38, rotate: -18, opacity: 0.15, color: "#8fad90" },
  { Icon: Heart,    top: "83%", left: "2%",   size: 44, rotate: 8,   opacity: 0.18, color: "#c9848a" },
  { Icon: Star,     top: "80%", left: "86%",  size: 30, rotate: 25,  opacity: 0.15, color: "#b79a68" },
  { Icon: Sparkles, top: "89%", left: "16%",  size: 34, rotate: -12, opacity: 0.15, color: "#b79a68" },
  { Icon: Ribbon,   top: "91%", left: "76%",  size: 40, rotate: 6,   opacity: 0.16, color: "#c9848a" },
  { Icon: Flower2,  top: "95%", left: "44%",  size: 34, rotate: 20,  opacity: 0.15, color: "#8fad90" },
  { Icon: Heart,    top: "93%", left: "60%",  size: 28, rotate: -14, opacity: 0.16, color: "#c9848a" },
  { Icon: Gem,      top: "96%", left: "28%",  size: 30, rotate: 10,  opacity: 0.15, color: "#8fafc9" },
  { Icon: Star,     top: "36%", left: "7%",   size: 24, rotate: 40,  opacity: 0.14, color: "#b79a68" },
  { Icon: Ribbon,   top: "30%", left: "80%",  size: 36, rotate: -8,  opacity: 0.15, color: "#c9848a" },
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

/* ── Countdown unit ─────────────────────────────────────────── */
function CountUnit({ value, label }: { value: number; label: string }) {
  const display = String(value).padStart(2, "0");
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative h-20 w-16 overflow-hidden sm:h-24 sm:w-20 lg:h-28 lg:w-24">
        <AnimatePresence mode="popLayout">
          <motion.span
            key={display}
            initial={{ y: "-60%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            exit={{ y: "60%", opacity: 0 }}
            transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 flex items-center justify-center font-serif font-bold tabular-nums leading-none"
            style={{ fontSize: "clamp(3rem, 8vw, 5rem)", color: "#1a3060", letterSpacing: "-0.02em" }}
          >
            {display}
          </motion.span>
        </AnimatePresence>
      </div>
      <span
        className="font-sans uppercase"
        style={{ fontSize: "clamp(0.62rem, 1.2vw, 0.72rem)", letterSpacing: "0.28em", color: "rgba(183,154,104,0.85)" }}
      >
        {label}
      </span>
    </div>
  );
}

function Dot() {
  return (
    <span className="mb-8 self-center font-serif leading-none" aria-hidden style={{ fontSize: "2rem", color: "rgba(183,154,104,0.4)" }}>
      ·
    </span>
  );
}

function GoldRule() {
  return (
    <div className="flex items-center justify-center gap-4">
      <span className="block h-px w-14 bg-[rgba(183,154,104,0.4)]" />
      <span className="block h-[5px] w-[5px] rotate-45 bg-[rgba(183,154,104,0.65)]" />
      <span className="block h-px w-14 bg-[rgba(183,154,104,0.4)]" />
    </div>
  );
}

/* ── Timeline ───────────────────────────────────────────────── */
const EVENTS = [
  { time: "1:00 PM", label: "Guest Arrival",       icon: Car,             side: "right", accent: "#8fafc9", bg: "rgba(143,175,201,0.12)" },
  { time: "2:00 PM", label: "Ceremony",            icon: Gem,             side: "left",  accent: "#b79a68", bg: "rgba(183,154,104,0.12)" },
  { time: "3:00 PM", label: "Photo Op",            icon: Sparkles,        side: "right", accent: "#c9848a", bg: "rgba(201,132,138,0.12)" },
  { time: "4:00 PM", label: "Cocktails",           icon: Wine,            side: "left",  accent: "#8fad90", bg: "rgba(143,173,144,0.12)" },
  { time: "4:30 PM", label: "Grand Entrance",      icon: Flower2,         side: "right", accent: "#b79a68", bg: "rgba(183,154,104,0.12)" },
  { time: "5:00 PM", label: "First Dance",         icon: Music2,          side: "left",  accent: "#a58fc9", bg: "rgba(165,143,201,0.12)" },
  { time: "5:30 PM", label: "Dinner Time",         icon: UtensilsCrossed, side: "right", accent: "#8fafc9", bg: "rgba(143,175,201,0.12)" },
  { time: "6:30 PM", label: "Wedding Traditions",  icon: Heart,           side: "left",  accent: "#b79a68", bg: "rgba(183,154,104,0.12)" },
  { time: "7:00 PM", label: "Party Time",          icon: Star,            side: "right", accent: "#c9848a", bg: "rgba(201,132,138,0.12)" },
] as const;

function TimelineEvent({
  time, label, icon: Icon, side, index, accent, bg,
}: {
  time: string; label: string; icon: React.ElementType; side: "left" | "right"; index: number; accent: string; bg: string;
}) {
  const isRight = side === "right";
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-16px" }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
      className="grid items-center gap-x-3 lg:gap-x-6"
      style={{ gridTemplateColumns: "1fr auto 1fr" }}
    >
      {/* Left text */}
      <div className={`flex flex-col text-right ${isRight ? "invisible" : ""}`}>
        <span
          className="font-serif leading-tight"
          style={{ fontSize: "clamp(0.82rem, 1.1vw, 1rem)", color: "rgba(26,48,96,0.52)", letterSpacing: "0.05em" }}
        >
          {time}
        </span>
        <span
          className="mt-1 font-serif font-semibold leading-snug"
          style={{ fontSize: "clamp(0.9rem, 1.2vw, 1.1rem)", color: "#1a3060" }}
        >
          {label}
        </span>
      </div>

      {/* Icon circle */}
      <div
        className="relative z-10 place-self-center flex flex-shrink-0 items-center justify-center rounded-full
                   h-[52px] w-[52px] lg:h-[64px] lg:w-[64px]"
        style={{
          background: `linear-gradient(135deg, #fdfaf6, #f8f3ec)`,
          border: `2px solid ${accent}`,
          boxShadow: `0 4px 18px ${bg}, inset 0 0 0 4px ${bg}`,
        }}
      >
        <Icon className="h-5 w-5 lg:h-6 lg:w-6" strokeWidth={1.4} color={accent} />
      </div>

      {/* Right text */}
      <div className={`flex flex-col text-left ${!isRight ? "invisible" : ""}`}>
        <span
          className="font-serif leading-tight"
          style={{ fontSize: "clamp(0.82rem, 1.1vw, 1rem)", color: "rgba(26,48,96,0.52)", letterSpacing: "0.05em" }}
        >
          {time}
        </span>
        <span
          className="mt-1 font-serif font-semibold leading-snug"
          style={{ fontSize: "clamp(0.9rem, 1.2vw, 1.1rem)", color: "#1a3060" }}
        >
          {label}
        </span>
      </div>
    </motion.div>
  );
}

function WeddingTimeline() {
  return (
    <div className="w-full">
      {/* Heading */}
      <div className="mb-8 text-center lg:mb-10">
        <p
          className="font-script leading-none"
          style={{ fontSize: "clamp(5rem, 3.5vw, 3.4rem)", color: "#1a3060" }}
        >
          The
        </p>
        <p
          className="mt-1! font-serif font-bold uppercase tracking-[0.22em]"
          style={{ fontSize: "clamp(1.8rem, 1.6vw, 1.45rem)", color: "#1a3060" }}
        >
          Wedding Timeline
        </p>
      </div>

      {/* Spine + events */}
      <div className="relative">
        <div
          className="pointer-events-none absolute inset-y-0 left-1/2 w-px -translate-x-1/2"
          style={{
            background:
              "linear-gradient(to bottom, transparent, rgba(183,154,104,0.55) 6%, rgba(183,154,104,0.55) 94%, transparent)",
          }}
        />
        <div className="relative flex flex-col gap-5 lg:gap-7">
          {EVENTS.map((e, i) => (
            <TimelineEvent key={e.label} {...e} index={i} />
          ))}
        </div>
      </div>

      {/* Bottom ornament */}
      <div className="mt-8 flex justify-center lg:mt-10">
        <svg width="110" height="24" viewBox="0 0 110 24" fill="none" aria-hidden>
          <path d="M55 12 C42 4, 22 4, 8 10"  stroke="rgba(183,154,104,0.45)" strokeWidth="1.4" strokeLinecap="round" fill="none" />
          <path d="M55 12 C68 4, 88 4, 102 10" stroke="rgba(183,154,104,0.45)" strokeWidth="1.4" strokeLinecap="round" fill="none" />
          <circle cx="55" cy="12" r="2.5" fill="rgba(183,154,104,0.6)" />
          <circle cx="28"  cy="7"  r="1.4" fill="rgba(183,154,104,0.32)" />
          <circle cx="82"  cy="7"  r="1.4" fill="rgba(183,154,104,0.32)" />
        </svg>
      </div>
    </div>
  );
}

/* ── Animation helper ───────────────────────────────────────── */
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8, delay, ease: "easeOut" as const },
});

/* ── Main section ───────────────────────────────────────────── */
export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(getTimeLeft());

  useEffect(() => {
    const id = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden"
      style={{ background: "linear-gradient(160deg, #faf7f2 0%, #fdfaf6 50%, #f4ede4 100%)" }}
    >
      <IconBackground />

      {/* Centered content */}
      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 py-20 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2 lg:gap-20">

          {/* ── LEFT: Countdown ─────────────────────────────── */}
          <div className="flex flex-col items-center text-center">
            <motion.p
              {...fadeUp(0)}
              className="font-sans uppercase mb-12"
              style={{ fontSize: "clamp(1.2rem, 1.1vw, 0.78rem)", letterSpacing: "0.38em", color: "rgba(183,154,104,0.9)" }}
            >
              Counting Down To
            </motion.p>

            <motion.h2
              {...fadeUp(0.1)}
              className="font-script mt-3 leading-[0.9]"
              style={{ fontSize: "clamp(3.2rem, 7vw, 6rem)", color: "#1a3060" }}
            >
              Our Wedding Day
            </motion.h2>

            <motion.p
              {...fadeUp(0.2)}
              className="mt-4! font-serif"
              style={{ fontSize: "clamp(0.85rem, 1.4vw, 1rem)", letterSpacing: "0.16em", color: "rgba(26,48,96,0.5)" }}
            >
              December 29, 2026 &nbsp;·&nbsp; 1:00 PM
            </motion.p>

            <motion.div {...fadeUp(0.28)} className="mt-7">
              <GoldRule />
            </motion.div>

            <motion.div
              {...fadeUp(0.36)}
              className="mt-10 flex flex-wrap items-end justify-center gap-3 sm:gap-5"
            >
              <CountUnit value={timeLeft.days}    label="Days"    />
              <Dot />
              <CountUnit value={timeLeft.hours}   label="Hours"   />
              <Dot />
              <CountUnit value={timeLeft.minutes} label="Minutes" />
              <Dot />
              <CountUnit value={timeLeft.seconds} label="Seconds" />
            </motion.div>

            <motion.p
              {...fadeUp(0.5)}
              className="mt-10! max-w-md font-serif italic leading-relaxed"
              style={{ fontSize: "clamp(0.88rem, 1.4vw, 1rem)", color: "rgba(26,48,96,0.38)", letterSpacing: "0.02em" }}
            >
              &ldquo;A love written by God, a promise made for a lifetime.&rdquo;
            </motion.p>
          </div>

          {/* ── RIGHT: Timeline ──────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 1, delay: 0.18, ease: "easeOut" }}
            className="flex flex-col items-center"
          >
            <WeddingTimeline />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
