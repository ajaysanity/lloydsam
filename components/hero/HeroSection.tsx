"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useFitToHeight } from "@/hooks/useFitToHeight";

/* ── Staggered fade-up helper ───────────────────────────────── */
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.85, delay, ease: "easeOut" as const },
});

/* ── Animated heart watermark ───────────────────────────────── */
function CalligraphicHeart() {
  return (
    <div
      className="relative flex items-center justify-center"
      style={{
        width: "clamp(92px, min(18vw, calc((100vh - 720px) * 0.71)), 220px)",
        height: "clamp(130px, min(25vw, calc(100vh - 720px)), 310px)",
        flexShrink: 0,
      }}
    >
      {/* Bloom ring */}
      <motion.div
        className="absolute inset-0"
        animate={{ opacity: [0.06, 0.22, 0.06], scale: [1, 1.12, 1] }}
        transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}
        style={{ transformOrigin: "center" }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/heart2.png" alt="" className="w-full h-full object-contain"
          style={{ filter: "invert(1) sepia(0.35) saturate(2) hue-rotate(185deg) brightness(1.7)", mixBlendMode: "multiply" }} />
      </motion.div>
      {/* Main breathe */}
      <motion.div
        className="absolute inset-0"
        animate={{ opacity: [0.28, 0.88, 0.28] }}
        transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/heart2.png" alt="" className="w-full h-full object-contain"
          style={{ filter: "invert(1) sepia(0.35) saturate(2) hue-rotate(185deg) brightness(1.7)", mixBlendMode: "multiply" }} />
      </motion.div>
    </div>
  );
}

/* ── Gold ornament divider ──────────────────────────────────── */
function OrnamentDivider() {
  return (
    <div className="flex items-center gap-3" style={{ width: "clamp(200px, 40vw, 320px)" }}>
      <div className="flex-1 h-px" style={{ background: "linear-gradient(to right, transparent, rgba(183,154,104,0.55))" }} />
      <div className="flex items-center gap-1">
        <div className="w-1 h-1 rotate-45" style={{ background: "#b79a68" }} />
        <div className="w-1.5 h-1.5 rotate-45" style={{ background: "#b79a68", opacity: 0.55 }} />
        <div className="w-1 h-1 rotate-45" style={{ background: "#b79a68" }} />
      </div>
      <div className="flex-1 h-px" style={{ background: "linear-gradient(to left, transparent, rgba(183,154,104,0.55))" }} />
    </div>
  );
}

/* ── RSVP button with looping premium pulse ─────────────────── */
function RsvpButton() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 1.4, ease: "easeOut" }}
    >
      <motion.div
        animate={{
          y: [0, -10, 0],
          boxShadow: [
            "0 4px 18px rgba(26,48,96,0.10)",
            "0 16px 40px rgba(26,48,96,0.22)",
            "0 4px 18px rgba(26,48,96,0.10)",
          ],
        }}
        transition={{
          y: { duration: 3.2, repeat: Infinity, ease: "easeInOut", delay: 2.2 },
          boxShadow: { duration: 3.2, repeat: Infinity, ease: "easeInOut", delay: 2.2 },
        }}
        whileHover={{ y: -14, boxShadow: "0 20px 44px rgba(26,48,96,0.28)" }}
        style={{ display: "inline-block", borderRadius: "2px" }}
      >
        <motion.button
          type="button"
          onClick={() => window.dispatchEvent(new CustomEvent("open-rsvp"))}
          whileHover={{ scale: 1.03 }}
          whileFocus={{ scale: 1.02, boxShadow: "0 0 0 3px rgba(26,48,96,0.3)" }}
          className="inline-flex items-center justify-center rounded-[2px] border border-[#1a3060] bg-[#1a3060] px-14 py-4 font-serif text-xl uppercase text-white transition-colors duration-300 hover:bg-[#1f3d7a] focus-visible:outline-none md:px-20 md:py-5 md:text-2xl"
          style={{ minWidth: "clamp(160px, 22vw, 260px)", letterSpacing: "0.22em" }}
          aria-label="RSVP to the wedding"
        >
          RSVP
        </motion.button>
      </motion.div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   HERO SECTION
   ═══════════════════════════════════════════════════════════════ */
export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const scale = useFitToHeight(sectionRef, contentRef);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen lg:h-screen lg:pt-16 lg:pb-6 flex flex-col items-center justify-center overflow-hidden"
      style={{ background: "linear-gradient(160deg, #faf7f2 0%, #f5f0e8 45%, #edf2f8 100%)" }}
    >
      {/* Paper-grain texture — very subtle depth */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E\")",
          zIndex: 0,
        }}
      />

      {/* Champagne vignette */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(ellipse 85% 85% at 50% 50%, transparent 50%, rgba(210,195,170,0.18) 100%)", zIndex: 1 }}
      />

      {/* ── Floral accent: upper right ── */}
      <motion.div
        aria-hidden
        className="pointer-events-none select-none absolute top-0 right-0"
        style={{ width: "clamp(180px, 36vw, 480px)", zIndex: 3 }}
        initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.2, delay: 0.1 }}
      >
        <Image src="/images/bg-2.png" alt="" width={480} height={480} className="w-full h-auto" priority />
      </motion.div>

      {/* ── Floral accent: lower left ── */}
      <motion.div
        aria-hidden
        className="pointer-events-none select-none absolute bottom-0 left-0"
        style={{ width: "clamp(180px, 36vw, 480px)", zIndex: 3 }}
        initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.2, delay: 0.1 }}
      >
        <Image src="/images/bg-1.png" alt="" width={480} height={480} className="w-full h-auto" priority />
      </motion.div>

      {/* ══════════════════════════════════════════════════════════
          CONTENT
          ══════════════════════════════════════════════════════════ */}
      <div
        ref={contentRef}
        className="relative z-10 flex w-full shrink-0 flex-col items-center text-center px-4 py-8 lg:py-2"
        style={{ transform: `scale(${scale})`, transformOrigin: "center" }}
      >

        {/* ── "we ♡ do" accent ── */}
        <motion.div
          className="flex items-center justify-center w-full mb-4 lg:mb-1"
          style={{ maxWidth: "min(740px, 92vw)" }}
          {...fadeUp(0.25)}
        >
          {/* we.png + fade line */}
          <div className="flex flex-1 items-center justify-end gap-3 sm:gap-5">
            <div className="hidden sm:block flex-1 h-px" style={{ background: "linear-gradient(to left, rgba(59,90,140,0.28), transparent)" }} />
            <Image src="/images/we.png" alt="we" width={200} height={100}
              className="h-auto w-auto" style={{ width: "clamp(88px, 13vw, 200px)" }} />
          </div>

          {/* Heart */}
          <div className="mx-2 sm:mx-4" style={{ flexShrink: 0 }}>
            <CalligraphicHeart />
          </div>

          {/* do.png + fade line */}
          <div className="flex flex-1 items-center justify-start gap-3 sm:gap-5">
            <Image src="/images/do.png" alt="do" width={200} height={100}
              className="h-auto w-auto" style={{ width: "clamp(88px, 13vw, 200px)" }} />
            <div className="hidden sm:block flex-1 h-px" style={{ background: "linear-gradient(to right, rgba(59,90,140,0.28), transparent)" }} />
          </div>
        </motion.div>

        {/* ── Pre-heading ── */}
        <motion.p
          className="font-serif uppercase tracking-[0.28em] text-[#7a8fa8]"
          style={{ fontSize: "clamp(1.2rem, 1.4vw, 0.8rem)" }}
          {...fadeUp(0.45)}
        >
          Together with their families
        </motion.p>

        {/* ── NAMES: primary focal point (hierarchy 1) ── */}
        <motion.div
          className="mt-8 flex flex-wrap items-baseline justify-center lg:mt-2!"
          style={{ gap: "clamp(0.4rem, 1.8vw, 1.1rem)" }}
          {...fadeUp(0.6)}
        >
          <h1
            className="font-script leading-none"
            style={{ fontSize: "clamp(3.2rem, 10vw, 7rem)", color: "#1a3060", textShadow: "0 3px 24px rgba(26,48,96,0.09)" }}
          >
            Lloyd
          </h1>
          <span
            className="font-serif relative"
            style={{ fontSize: "clamp(1.2rem, 2.8vw, 2.2rem)", color: "#b79a68", top: "0.1em", lineHeight: 1, letterSpacing: "0.12em" }}
          >
            &amp;
          </span>
          <h1
            className="font-script leading-none"
            style={{ fontSize: "clamp(3.2rem, 10vw, 7rem)", color: "#1a3060", textShadow: "0 3px 24px rgba(26,48,96,0.09)" }}
          >
            Sam
          </h1>
        </motion.div>

        {/* ── Invitation line ── */}
        <motion.p
          className="mt-4 lg:mt-1 font-serif uppercase tracking-[0.2em] text-[#7a8fa8]"
          style={{ fontSize: "clamp(1.2rem, 1.3vw, 0.78rem)" }}
          {...fadeUp(0.75)}
        >
          Invite you to their wedding celebration
        </motion.p>

        {/* ── Ornament ── */}
        <motion.div className="my-7 lg:my-2 flex justify-center" {...fadeUp(0.85)}>
          <OrnamentDivider />
        </motion.div>

        {/* ── DATE BLOCK: hierarchy 2 ── */}
        <motion.div className="my-4 flex flex-col items-center lg:my-1!" {...fadeUp(0.95)}>

          {/* Month */}
          <p
            className="font-serif uppercase tracking-[0.55em] text-[#7a8fa8]"
            style={{ fontSize: "clamp(1.5rem, 1.7vw, 1rem)" }}
          >
            December
          </p>

          {/* Day "16" — showstopper */}
          <div className="flex items-center justify-center gap-5 md:gap-9">
            <span
              className="block flex-none self-center"
              style={{ width: "clamp(36px, 7vw, 80px)", height: "1px", background: "rgba(183,154,104,0.5)" }}
            />
            <time
              dateTime="2026-12-29"
              className="pb-6 font-serif font-bold leading-none [@media(min-width:1024px)_and_(max-height:900px)]:pb-1!"
              style={{ fontSize: "clamp(3.8rem, 12vw, 8rem)", color: "#1a3060", letterSpacing: "-0.02em", textShadow: "0 6px 36px rgba(26,48,96,0.13)" }}
            >
              29
            </time>
            <span
              className="block flex-none self-center"
              style={{ width: "clamp(36px, 7vw, 80px)", height: "1px", background: "rgba(183,154,104,0.5)" }}
            />
          </div>

          {/* Weekday · Year · Time — hierarchy 4: clearly readable */}
          <div
            className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 font-serif uppercase tracking-[0.22em] md:gap-x-8"
            style={{ fontSize: "clamp(1.5rem, 1.6vw, 0.95rem)", color: "#607da2" }}
          >
            <span>Tuesday</span>
            <span style={{ color: "rgba(183,154,104,0.65)" }}>·</span>
            <span className="font-semibold tracking-[0.32em]" style={{ color: "#1a3060" }}>2026</span>
            <span style={{ color: "rgba(183,154,104,0.65)" }}>·</span>
            <time dateTime="13:00" className="font-semibold" style={{ color: "#1a3060" }}>
              1:00 PM
            </time>
          </div>
        </motion.div>

        {/* ── Ornament ── */}
        <motion.div className="my-7 flex justify-center lg:my-2" {...fadeUp(1.1)}>
          <OrnamentDivider />
        </motion.div>

        {/* ── Venue: hierarchy 5 ── */}
        <motion.p
          className="font-serif italic leading-relaxed text-[#6f87a3]"
          style={{ fontSize: "clamp(0.78rem, 1.6vw, 0.95rem)", letterSpacing: "0.04em" }}
          {...fadeUp(1.2)}
        >
          St. Joseph Cathedral Parish
        </motion.p>
        <motion.p
          className="mt-2 font-serif italic leading-relaxed text-[#6f87a3]"
          style={{ fontSize: "clamp(0.78rem, 1.6vw, 0.95rem)", letterSpacing: "0.04em" }}
          {...fadeUp(1.28)}
        >
          Reception to follow · Grandiya Venue and Restaurant
          <br />
          Aroma Center, Gate 1, San Roque, San Jose, Occidental Mindoro
        </motion.p>

        {/* ── RSVP CTA: hierarchy 3 ── */}
        <div className="mt-10 lg:mt-5 [@media(min-width:1024px)_and_(max-height:900px)]:mt-3">
          <RsvpButton />
        </div>

      </div>
    </section>
  );
}
