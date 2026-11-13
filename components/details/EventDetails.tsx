"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Map } from "@/components/ui/map";
import { Heart, Flower2, Gem, Sparkles, MapPin, Star, Church, CalendarHeart } from "lucide-react";

/* ── Scattered icon background ──────────────────────────────── */
const BG_ICONS = [
  { Icon: Church,       top: "3%",  left: "1%",   size: 50, rotate: -10, opacity: 0.22 },
  { Icon: Flower2,      top: "2%",  left: "22%",  size: 44, rotate: 18,  opacity: 0.22 },
  { Icon: Heart,        top: "4%",  left: "50%",  size: 42, rotate: -5,  opacity: 0.24 },
  { Icon: Sparkles,     top: "3%",  left: "72%",  size: 40, rotate: 14,  opacity: 0.22 },
  { Icon: MapPin,       top: "2%",  left: "90%",  size: 46, rotate: -8,  opacity: 0.22 },
  { Icon: Gem,          top: "20%", left: "0%",   size: 38, rotate: 12,  opacity: 0.20 },
  { Icon: CalendarHeart,top: "22%", left: "95%",  size: 42, rotate: -15, opacity: 0.22 },
  { Icon: Star,         top: "35%", left: "3%",   size: 34, rotate: 30,  opacity: 0.20 },
  { Icon: Flower2,      top: "38%", left: "92%",  size: 46, rotate: 20,  opacity: 0.22 },
  { Icon: Heart,        top: "55%", left: "1%",   size: 48, rotate: -12, opacity: 0.24 },
  { Icon: MapPin,       top: "58%", left: "94%",  size: 40, rotate: 8,   opacity: 0.22 },
  { Icon: Sparkles,     top: "70%", left: "4%",   size: 42, rotate: -18, opacity: 0.22 },
  { Icon: Church,       top: "72%", left: "91%",  size: 48, rotate: 10,  opacity: 0.20 },
  { Icon: Gem,          top: "82%", left: "2%",   size: 36, rotate: 20,  opacity: 0.20 },
  { Icon: Star,         top: "85%", left: "88%",  size: 38, rotate: -22, opacity: 0.20 },
  { Icon: Flower2,      top: "92%", left: "18%",  size: 44, rotate: 14,  opacity: 0.22 },
  { Icon: Heart,        top: "94%", left: "60%",  size: 42, rotate: -8,  opacity: 0.24 },
  { Icon: CalendarHeart,top: "93%", left: "82%",  size: 40, rotate: 6,   opacity: 0.22 },
] as const;

function IconBackground() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {BG_ICONS.map(({ Icon, top, left, size, rotate, opacity }, i) => (
        <span
          key={i}
          className="absolute"
          style={{ top, left, opacity, transform: `rotate(${rotate}deg)`, color: "var(--blue-primary)" }}
        >
          <Icon size={size} strokeWidth={1} />
        </span>
      ))}
    </div>
  );
}

/* ── Venue coordinates ──────────────────────────────────────── */
const CEREMONY_COORDS: [number, number] = [121.068422, 12.3541661];
const RECEPTION_COORDS: [number, number] = [121.0421711, 12.3599564];

function toGoogleMapsUrl(label: string, address: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${label}, ${address}`)}`;
}

/* ── Map modal ──────────────────────────────────────────────── */
interface MapModalProps {
  label: string;
  coords: [number, number];
  address: string;
  mapsUrl: string;
  onClose: () => void;
}

function MapModal({ label, coords, address, mapsUrl, onClose }: MapModalProps) {
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[999] flex items-center justify-center px-4 py-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.22 }}
      >
        {/* Backdrop */}
        <motion.div
          className="absolute inset-0"
          style={{ background: "rgba(8,12,28,0.72)", backdropFilter: "blur(6px)" }}
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />

        {/* Card */}
        <motion.div
          className="relative z-10 w-full max-w-2xl rounded-sm shadow-2xl overflow-hidden"
          style={{ background: "var(--cream)", border: "1px solid rgba(59,110,165,0.15)" }}
          initial={{ opacity: 0, scale: 0.94, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 24 }}
          transition={{ duration: 0.28, ease: "easeOut" }}
        >
          {/* Corner accents */}
          <div className="pointer-events-none absolute top-3 left-3 w-6 h-6 border-t border-l z-10" style={{ borderColor: "var(--gold-accent)" }} />
          <div className="pointer-events-none absolute top-3 right-3 w-6 h-6 border-t border-r z-10" style={{ borderColor: "var(--gold-accent)" }} />
          <div className="pointer-events-none absolute bottom-3 left-3 w-6 h-6 border-b border-l z-10" style={{ borderColor: "var(--gold-accent)" }} />
          <div className="pointer-events-none absolute bottom-3 right-3 w-6 h-6 border-b border-r z-10" style={{ borderColor: "var(--gold-accent)" }} />

          {/* Header */}
          <div className="flex items-center justify-between px-6 pt-6 pb-4">
            <div>
              <p className="font-sans text-xs tracking-[0.28em] uppercase" style={{ color: "var(--gold-accent)" }}>
                Location
              </p>
              <h3 className="font-script mt-0.5" style={{ fontSize: "clamp(1.4rem, 4vw, 2rem)", color: "var(--blue-primary)" }}>
                {label}
              </h3>
              <p className="font-sans text-xs mt-1 leading-relaxed" style={{ color: "var(--text-muted)" }}>
                {address}
              </p>
            </div>
            <button
              onClick={onClose}
              aria-label="Close map"
              className="ml-4 flex-shrink-0 flex h-8 w-8 items-center justify-center rounded-full transition-colors duration-200 hover:bg-black/10"
              style={{ color: "var(--text-muted)" }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M2 2L14 14M14 2L2 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          {/* Map */}
          <div className="w-full" style={{ height: "clamp(320px, 55vw, 520px)" }}>
            <Map
              center={coords}
              zoom={16}
              markerLabel={label}
              className="w-full h-full"
            />
          </div>

          {/* Footer */}
          <div className="flex justify-end px-6 py-4">
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans text-xs tracking-[0.2em] uppercase px-6 py-2.5 border transition-all duration-300 hover:text-white"
              style={{ borderColor: "var(--blue-primary)", color: "var(--blue-primary)" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "var(--blue-primary)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "transparent"; }}
            >
              Open in Google Maps
            </a>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

/* ── Floral divider ─────────────────────────────────────────── */
const FloralDivider = () => (
  <div className="flex items-center justify-center my-8 md:my-16">
    <div className="flex-1 h-px" style={{ background: "linear-gradient(to right, transparent, rgba(200,169,110,0.4))" }} />
    <div className="mx-4 flex items-center gap-2">
      <svg width="16" height="16" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="20" cy="20" r="6" fill="#c8a96e" opacity="0.8" />
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
          <ellipse key={i} cx={20 + Math.cos((angle * Math.PI) / 180) * 13} cy={20 + Math.sin((angle * Math.PI) / 180) * 13} rx="5" ry="3" fill="#c8a96e" opacity="0.5" transform={`rotate(${angle}, ${20 + Math.cos((angle * Math.PI) / 180) * 13}, ${20 + Math.sin((angle * Math.PI) / 180) * 13})`} />
        ))}
      </svg>
      <svg width="24" height="24" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="20" cy="20" r="8" fill="#3b6ea5" opacity="0.7" />
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
          <ellipse key={i} cx={20 + Math.cos((angle * Math.PI) / 180) * 15} cy={20 + Math.sin((angle * Math.PI) / 180) * 15} rx="7" ry="4" fill="#3b6ea5" opacity="0.45" transform={`rotate(${angle}, ${20 + Math.cos((angle * Math.PI) / 180) * 15}, ${20 + Math.sin((angle * Math.PI) / 180) * 15})`} />
        ))}
      </svg>
      <svg width="16" height="16" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="20" cy="20" r="6" fill="#c8a96e" opacity="0.8" />
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
          <ellipse key={i} cx={20 + Math.cos((angle * Math.PI) / 180) * 13} cy={20 + Math.sin((angle * Math.PI) / 180) * 13} rx="5" ry="3" fill="#c8a96e" opacity="0.5" transform={`rotate(${angle}, ${20 + Math.cos((angle * Math.PI) / 180) * 13}, ${20 + Math.sin((angle * Math.PI) / 180) * 13})`} />
        ))}
      </svg>
    </div>
    <div className="flex-1 h-px" style={{ background: "linear-gradient(to left, transparent, rgba(200,169,110,0.4))" }} />
  </div>
);

/* ── Event card ─────────────────────────────────────────────── */
interface EventCardProps {
  type: "ceremony" | "reception";
  title: string;
  date: string;
  time: string;
  venue: string;
  address: string;
  delay: number;
  onViewMap: () => void;
}

function EventCard({ type, title, date, time, venue, address, delay, onViewMap }: EventCardProps) {
  const Icon = type === "ceremony" ? ChurchIcon : CelebrationIcon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay }}
      className="flex-1 flex flex-col items-center text-center p-5 md:p-10 rounded-sm shadow-md relative"
      style={{ background: "white", border: "1px solid rgba(59,110,165,0.15)", minWidth: 0 }}
    >
      <div className="absolute top-3 left-3 w-6 h-6 border-t border-l" style={{ borderColor: "var(--gold-accent)" }} />
      <div className="absolute top-3 right-3 w-6 h-6 border-t border-r" style={{ borderColor: "var(--gold-accent)" }} />
      <div className="absolute bottom-3 left-3 w-6 h-6 border-b border-l" style={{ borderColor: "var(--gold-accent)" }} />
      <div className="absolute bottom-3 right-3 w-6 h-6 border-b border-r" style={{ borderColor: "var(--gold-accent)" }} />

      <div className="mb-4"><Icon /></div>

      <span className="font-sans text-xs tracking-[0.3em] uppercase mb-2" style={{ color: "var(--gold-accent)" }}>
        {type}
      </span>

      <h3 className="font-script mb-3 md:mb-4" style={{ fontSize: "clamp(1.6rem, 5vw, 2.2rem)", color: "var(--blue-primary)" }}>
        {title}
      </h3>

      <div className="section-divider mb-5" />

      <div className="space-y-1.5 md:space-y-2 font-sans" style={{ color: "var(--text-muted)" }}>
        <p className="font-serif font-semibold text-sm md:text-base" style={{ color: "var(--text-dark)" }}>{date}</p>
        <p className="text-sm md:text-md tracking-wider">{time}</p>
        <p className="font-serif font-medium text-sm md:text-base mt-3 md:mt-4" style={{ color: "var(--blue-primary)" }}>{venue}</p>
        <p className="text-xs md:text-sm leading-relaxed">{address}</p>
      </div>

      <button
        onClick={onViewMap}
        className="mt-4 md:mt-6 font-sans text-xs tracking-[0.2em] uppercase px-5 py-2 md:px-6 border transition-all duration-300 hover:text-white"
        style={{ borderColor: "var(--blue-primary)", color: "var(--blue-primary)" }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "var(--blue-primary)"; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "transparent"; }}
        aria-label={`View map for ${venue}`}
      >
        View Map
      </button>
    </motion.div>
  );
}

function ChurchIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="14" y="16" width="12" height="20" rx="1" fill="#3b6ea5" opacity="0.2" stroke="#3b6ea5" strokeWidth="1.5" />
      <polygon points="20,4 10,16 30,16" fill="#3b6ea5" opacity="0.3" stroke="#3b6ea5" strokeWidth="1.5" />
      <line x1="20" y1="0" x2="20" y2="8" stroke="#c8a96e" strokeWidth="2" />
      <line x1="17" y1="3" x2="23" y2="3" stroke="#c8a96e" strokeWidth="2" />
      <rect x="17" y="24" width="6" height="12" rx="3" fill="#3b6ea5" opacity="0.4" />
    </svg>
  );
}

function CelebrationIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="20" cy="20" r="14" fill="#3b6ea5" opacity="0.12" stroke="#3b6ea5" strokeWidth="1.5" />
      <path d="M12 28 Q20 14 28 28" stroke="#c8a96e" strokeWidth="2" fill="none" />
      <circle cx="20" cy="16" r="3" fill="#c8a96e" opacity="0.8" />
      <path d="M16 22 Q20 26 24 22" stroke="#3b6ea5" strokeWidth="1.5" fill="none" />
    </svg>
  );
}

/* ── Main section ───────────────────────────────────────────── */
type ActiveMap = "ceremony" | "reception" | null;

export default function EventDetails() {
  const [activeMap, setActiveMap] = useState<ActiveMap>(null);

  const mapConfig = {
    ceremony: {
      label: "St. Joseph Cathedral Parish",
      coords: CEREMONY_COORDS,
      address: "San Jose, Occidental Mindoro",
      mapsUrl: toGoogleMapsUrl("St. Joseph Cathedral Parish", "San Jose, Occidental Mindoro"),
    },
    reception: {
      label: "Grandiya Venue and Restaurant",
      coords: RECEPTION_COORDS,
      address: "Aroma Center, Gate 1, San Roque, San Jose, Occidental Mindoro",
      mapsUrl: toGoogleMapsUrl("Grandiya Venue and Restaurant", "Aroma Center, Gate 1, San Roque, San Jose, Occidental Mindoro"),
    },
  };

  return (
    <>
      <section id="details" className="relative py-10 md:py-12 overflow-hidden" style={{ background: "var(--cream)" }}>
        <IconBackground />
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-4 md:mb-12">
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="font-serif text-sm tracking-[0.3em] uppercase mb-3"
              style={{ color: "var(--gold-accent)" }}
            >
              Join us on our special day
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-script"
              style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)", color: "var(--blue-primary)" }}
            >
              Wedding Details
            </motion.h2>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="section-divider mt-6"
            />
          </div>

          <div className="flex flex-col md:flex-row gap-5 md:gap-10">
            <EventCard
              type="ceremony"
              title="The Ceremony"
              date="Tuesday, December 29, 2026"
              time="1:00 PM"
              venue="St. Joseph Cathedral Parish"
              address="San Jose, Occidental Mindoro"
              delay={0.3}
              onViewMap={() => setActiveMap("ceremony")}
            />

            <EventCard
              type="reception"
              title="The Reception"
              date="Tuesday, December 29, 2026"
              time="To follow"
              venue="Grandiya Venue and Restaurant"
              address="Aroma Center, Gate 1, San Roque, San Jose, Occidental Mindoro"
              delay={0.5}
              onViewMap={() => setActiveMap("reception")}
            />
          </div>

          <FloralDivider />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center max-w-xl mx-auto"
          >
            <p
              className="font-serif italic text-sm md:text-xl leading-relaxed"
              style={{ color: "var(--text-muted)" }}
            >
              &ldquo;When the time is right, I, the Lord will make it happen.&rdquo;
            </p>
            <p className="font-serif mt-2 text-xs tracking-[0.16em] uppercase" style={{ color: "var(--gold-accent)" }}>
              Isaiah 60:22
            </p>
            <p className="font-script mt-3 md:mt-4" style={{ fontSize: "clamp(1.4rem, 4vw, 1.8rem)", color: "var(--blue-primary)" }}>
              — Lloyd &amp; Sam
            </p>
          </motion.div>
        </div>
      </section>

      {activeMap && (
        <MapModal
          {...mapConfig[activeMap]}
          onClose={() => setActiveMap(null)}
        />
      )}
    </>
  );
}
