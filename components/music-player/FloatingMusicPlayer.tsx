"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";

const AUDIO_SRC = "/audio/kay_tagal_kitang_hinintay_spongecole.mp3";
const START_AT = 3;

function playAudible(el: HTMLAudioElement) {
  el.muted = false;
  el.volume = 0.65;
  if (el.currentTime < START_AT) el.currentTime = START_AT;
  return el.play();
}

export default function FloatingMusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);
  const [loadError, setLoadError] = useState(false);
  const progressRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<HTMLDivElement>(null);

  const pct = duration > 0 ? (current / duration) * 100 : 0;

  const togglePlay = useCallback(() => {
    const el = audioRef.current;
    if (!el || loadError) return;
    if (!el.paused && !el.muted) {
      el.pause();
    } else {
      void playAudible(el).catch(() => {});
    }
  }, [loadError]);

  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;

    const onTime = () => {
      if (el.currentTime < START_AT) {
        el.currentTime = START_AT;
        setCurrent(START_AT);
        return;
      }
      setCurrent(el.currentTime);
    };
    const onMeta = () => {
      setDuration(el.duration || 0);
      if (el.currentTime < START_AT) el.currentTime = START_AT;
    };
    const onEnded = () => setPlaying(false);
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    const onErr = () => setLoadError(true);

    el.addEventListener("timeupdate", onTime);
    el.addEventListener("loadedmetadata", onMeta);
    el.addEventListener("ended", onEnded);
    el.addEventListener("play", onPlay);
    el.addEventListener("pause", onPause);
    el.addEventListener("error", onErr);

    let armed = false;
    const gestureEvents = ["pointerdown", "touchstart", "keydown"] as const;

    const disarm = () => {
      armed = false;
      gestureEvents.forEach((type) => document.removeEventListener(type, onGesture, true));
    };

    const onGesture = (event: Event) => {
      if (event.target instanceof Node && playerRef.current?.contains(event.target)) return;
      void playAudible(el).then(disarm).catch(() => {});
    };

    const arm = () => {
      if (armed) return;
      armed = true;
      gestureEvents.forEach((type) => document.addEventListener(type, onGesture, true));
    };

    const tryAutoplay = () => {
      if (!el.paused && !el.muted) return;
      void playAudible(el)
        .then(disarm)
        .catch((err: unknown) => {
          const blocked = err instanceof DOMException && err.name === "NotAllowedError";
          if (!blocked && el.readyState < 2) return;
          arm();
        });
    };

    tryAutoplay();
    el.addEventListener("canplay", tryAutoplay);

    return () => {
      el.removeEventListener("timeupdate", onTime);
      el.removeEventListener("loadedmetadata", onMeta);
      el.removeEventListener("ended", onEnded);
      el.removeEventListener("play", onPlay);
      el.removeEventListener("pause", onPause);
      el.removeEventListener("error", onErr);
      el.removeEventListener("canplay", tryAutoplay);
      disarm();
    };
  }, []);

  const onBarPointer = useCallback(
    (clientX: number) => {
      const el = audioRef.current;
      const bar = progressRef.current;
      if (!el || !bar || !duration || loadError) return;
      if (el.paused || el.muted) void playAudible(el).catch(() => {});
      const rect = bar.getBoundingClientRect();
      const x = Math.min(Math.max(0, clientX - rect.left), rect.width);
      el.currentTime = (x / rect.width) * duration;
    },
    [duration, loadError]
  );

  return (
    <>
      <audio ref={audioRef} src={AUDIO_SRC} loop playsInline preload="auto" />

      <div
        ref={playerRef}
        className="fixed left-1/2 top-3 z-40 w-[min(100%-1rem,22rem)] -translate-x-1/2 sm:top-4 sm:w-[min(100%-1.5rem,26rem)]"
        role="region"
        aria-label="Background music"
      >
        {loadError ? (
          <div
            className="rounded-lg border px-2 py-1 text-center font-sans text-[0.6rem] leading-tight backdrop-blur-md"
            style={{
              background: "rgba(255, 255, 255, 0.12)",
              borderColor: "rgba(255, 255, 255, 0.22)",
              color: "var(--text-muted)",
            }}
          >
            Add MP3: <span style={{ color: "var(--blue-secondary)" }}>public/audio/kay_tagal_kitang_hinintay_spongecole.mp3</span>
          </div>
        ) : (
          <div
            className="relative h-[40px] overflow-hidden rounded-lg border backdrop-blur-md"
            style={{
              background: "rgba(255, 255, 255, 0.08)",
              borderColor: "rgba(255, 255, 255, 0.22)",
              boxShadow: "0 2px 12px rgba(0, 0, 0, 0.06)",
            }}
          >
            <div className="flex h-[38px] items-center gap-2 pl-2 pr-2">
              <button
                type="button"
                onClick={togglePlay}
                className="flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-full transition-opacity hover:opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--blue-primary)] focus-visible:ring-offset-0"
                style={{ color: "var(--blue-primary)" }}
                aria-label={playing ? "Pause" : "Play"}
              >
                {playing ? (
                  <Pause className="h-5 w-5" fill="currentColor" strokeWidth={1.5} />
                ) : (
                  <Play className="h-5 w-5" fill="currentColor" strokeWidth={1.5} />
                )}
              </button>
              <p className="min-w-0 flex-1 truncate leading-[0.95]">
                <span
                  className="font-script leading-[0.9]"
                  style={{
                    fontSize: "clamp(0.9rem, 3.2vw, 1.15rem)",
                    color: "#1a3060",
                    textShadow: "0 1px 2px rgba(255,255,255,0.85)",
                  }}
                >
                  Kay Tagal Kitang Hinintay
                </span>
                <span
                  className="font-serif"
                  style={{
                    fontSize: "clamp(0.62rem, 2vw, 0.72rem)",
                    letterSpacing: "0.12em",
                    color: "rgba(26,48,96,0.5)",
                  }}
                >
                  {" "}
                  · Sponge Cola
                </span>
              </p>
            </div>
            <div
              ref={progressRef}
              className="absolute bottom-0 left-0 right-0 h-0.5 cursor-pointer"
              style={{ background: "rgba(59, 110, 165, 0.2)" }}
              onClick={(e) => onBarPointer(e.clientX)}
              role="presentation"
            >
              <div
                className="absolute left-0 top-0 h-full rounded-none"
                style={{
                  width: `${pct}%`,
                  minWidth: pct > 0 ? "2px" : undefined,
                  background: "var(--blue-primary)",
                }}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
}
