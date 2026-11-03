"use client";

import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const VIDEO_URL =
  "https://tuoqghemdpiimyrkjzrf.supabase.co/storage/v1/object/public/assets/3gb%20sample.mp4";

export default function CinematicSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const videoScale = useTransform(scrollYProgress, [0, 1], [1.08, 1.18]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(sectionRef.current!);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex w-full items-center justify-center overflow-hidden aspect-video lg:aspect-auto lg:min-h-screen"
      aria-label="Cinematic pre-nup moment"
    >
      {/* ── Video background ─────────────────────────────────── */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ scale: videoScale }}
      >
        <video
          ref={videoRef}
          src={VIDEO_URL}
          muted
          loop
          playsInline
          aria-hidden
          className="h-full w-full object-cover object-center"
        />
      </motion.div>

      {/* ── Overlay: lighter on mobile so video is more visible ── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          background:
            "linear-gradient(to bottom, rgba(8,10,18,0.45) 0%, rgba(8,10,18,0.08) 30%, rgba(8,10,18,0.08) 70%, rgba(8,10,18,0.52) 100%)",
        }}
      />

      {/* Vignette — subtle on all screens */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          background:
            "radial-gradient(ellipse 90% 80% at 50% 50%, transparent 45%, rgba(8,10,18,0.3) 100%)",
        }}
      />

      {/* ── Centered content ─────────────────────────────────── */}
      <motion.div
        className="relative z-20 flex flex-col items-center px-5 text-center sm:px-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 1.4, ease: "easeOut" }}
      >
        {/* Decorative rule */}
        <motion.div
          className="mb-4 flex items-center gap-3 sm:mb-6 sm:gap-4"
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, delay: 0.3, ease: "easeOut" }}
          style={{ transformOrigin: "center" }}
        >
          <span className="block" style={{ width: "clamp(28px, 6vw, 80px)", height: "1px", background: "rgba(255,255,255,0.4)" }} />
          <span className="block h-[5px] w-[5px] rotate-45" style={{ background: "rgba(183,154,104,0.75)" }} />
          <span className="block" style={{ width: "clamp(28px, 6vw, 80px)", height: "1px", background: "rgba(255,255,255,0.4)" }} />
        </motion.div>

        {/* Heading — smaller base so it fits on mobile without crowding */}
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
          className="font-script leading-tight text-white"
          style={{
            fontSize: "clamp(1.8rem, 6vw, 5.5rem)",
            textShadow: "0 4px 28px rgba(0,0,0,0.6)",
            letterSpacing: "0.02em",
          }}
        >
          A Love Worth Waiting For
        </motion.h2>

        {/* Sub-line — hidden on very small screens to keep video visible */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.75, ease: "easeOut" }}
          className="mt-3 hidden font-serif italic sm:block sm:mt-4"
          style={{
            fontSize: "clamp(0.82rem, 1.8vw, 1.1rem)",
            color: "rgba(255,255,255,0.65)",
            letterSpacing: "0.06em",
            textShadow: "0 2px 14px rgba(0,0,0,0.45)",
          }}
        >
          Every chapter of us has been beautifully written.
        </motion.p>

        {/* Scroll cue — hidden on mobile to reduce clutter */}
        <motion.div
          className="mt-6 hidden flex-col items-center gap-2 sm:flex sm:mt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 1, ease: "easeOut" }}
        >
          <span
            className="block"
            style={{ width: "1px", height: "clamp(24px, 4vw, 44px)", background: "linear-gradient(to bottom, rgba(183,154,104,0.6), transparent)" }}
          />
          <motion.span
            className="block font-sans text-[0.6rem] uppercase tracking-[0.3em]"
            style={{ color: "rgba(255,255,255,0.38)" }}
            animate={{ y: [0, 4, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          >
            scroll
          </motion.span>
        </motion.div>
      </motion.div>
    </section>
  );
}
