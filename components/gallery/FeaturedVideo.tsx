"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Film, Play } from "lucide-react";
import { releaseBackgroundMusic, requestBackgroundMusicPause } from "@/lib/background-music";

const VIDEO_SRC = "/videos/our-film.mp4";
const POSTER_SRC = "/videos/our-film-poster.jpg";
const MIN_VISIBLE_RATIO = 0.25;

function formatDuration(seconds: number) {
  const total = Math.round(seconds);
  return `${Math.floor(total / 60)}:${String(total % 60).padStart(2, "0")}`;
}

export default function FeaturedVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);
  const [duration, setDuration] = useState<number | null>(null);

  const play = useCallback(() => {
    const el = videoRef.current;
    if (!el) return;
    setStarted(true);
    void el.play().catch(() => setStarted(false));
  }, []);

  const handleEnded = useCallback(() => {
    setStarted(false);
    videoRef.current?.load();
  }, []);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;

    const syncDuration = () => {
      if (Number.isFinite(el.duration)) setDuration(el.duration);
    };
    if (el.readyState >= HTMLMediaElement.HAVE_METADATA) syncDuration();
    el.addEventListener("loadedmetadata", syncDuration);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (document.fullscreenElement) return;
        if (entry.intersectionRatio < MIN_VISIBLE_RATIO && !el.paused) el.pause();
      },
      { threshold: [0, MIN_VISIBLE_RATIO] },
    );
    observer.observe(el);

    return () => {
      el.removeEventListener("loadedmetadata", syncDuration);
      observer.disconnect();
      releaseBackgroundMusic();
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7 }}
      className="mx-auto mb-14 grid max-w-4xl items-center gap-10 md:mb-20 md:grid-cols-[1fr_auto] md:gap-16"
    >
      <div className="text-center md:text-left">
        <p
          className="mb-3 inline-flex items-center gap-2 font-serif text-xs uppercase tracking-[0.3em]"
          style={{ color: "var(--gold-accent)" }}
        >
          <Film className="h-4 w-4" strokeWidth={1.5} aria-hidden />
          A moment in motion
        </p>
        <h3
          className="font-script leading-none"
          style={{ fontSize: "clamp(2.4rem, 5.5vw, 3.75rem)", color: "var(--blue-primary)" }}
        >
          Our Little Film
        </h3>
        <div
          aria-hidden
          className="mx-auto my-5 h-px w-16 md:mx-0"
          style={{ background: "linear-gradient(to right, transparent, var(--gold-accent), transparent)" }}
        />
        <p
          className="mx-auto max-w-sm font-serif text-base italic leading-relaxed sm:text-lg md:mx-0"
          style={{ color: "var(--text-dark)" }}
        >
          A few seconds of us — laughing, running, and falling in love all over again.
        </p>
      </div>

      <div className="flex justify-center" data-bg-music-exempt>
        <div className="relative w-[min(76vw,19rem)] sm:w-[20rem] lg:w-[22rem]">
          <div
            aria-hidden
            className="absolute -inset-3 rounded-[1.9rem] border sm:-inset-4"
            style={{ borderColor: "rgba(200,169,110,0.5)" }}
          />
          <div
            aria-hidden
            className="absolute inset-0 translate-x-4 translate-y-4 rounded-[1.5rem] sm:translate-x-6 sm:translate-y-6"
            style={{ background: "rgba(59,110,165,0.14)" }}
          />

          <div className="relative aspect-[9/16] overflow-hidden rounded-[1.5rem] bg-black shadow-2xl ring-1 ring-white/50">
            <video
              ref={videoRef}
              poster={POSTER_SRC}
              preload="metadata"
              playsInline
              controls={started}
              controlsList="nodownload"
              aria-label="Our little film"
              className="h-full w-full bg-black object-contain"
              onPlay={requestBackgroundMusicPause}
              onPause={releaseBackgroundMusic}
              onEnded={handleEnded}
            >
              <source src={VIDEO_SRC} type="video/mp4" />
            </video>

            {!started && (
              <button
                type="button"
                onClick={play}
                aria-label="Play our little film"
                className="group absolute inset-0 flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--gold-accent)]"
              >
                <span
                  aria-hidden
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(10,20,40,0.6) 0%, rgba(10,20,40,0.08) 45%, rgba(10,20,40,0.2) 100%)",
                  }}
                />

                <span className="relative flex h-20 w-20 items-center justify-center">
                  <motion.span
                    aria-hidden
                    className="absolute inset-0 rounded-full bg-white/40"
                    animate={{ scale: [1, 1.45], opacity: [0.55, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                  />
                  <span className="relative flex h-20 w-20 items-center justify-center rounded-full border border-white/70 bg-white/20 backdrop-blur-md transition-transform duration-300 group-hover:scale-110">
                    <Play className="ml-1 h-8 w-8 text-white" fill="currentColor" strokeWidth={1} />
                  </span>
                </span>

                <span className="absolute inset-x-0 bottom-0 flex items-center justify-between px-5 pb-5 font-sans text-[0.68rem] uppercase tracking-[0.25em] text-white/90">
                  <span>Tap to play</span>
                  {duration ? <span>{formatDuration(duration)}</span> : null}
                </span>
              </button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
