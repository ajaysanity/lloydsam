"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Flower2, Gem, Sparkles, Star, Camera, ImageIcon, Ribbon } from "lucide-react";

/* ── Scattered icon background ──────────────────────────────── */
const BG_ICONS = [
  { Icon: Camera,    top: "2%",  left: "1%",   size: 48, rotate: -12, opacity: 0.22 },
  { Icon: Heart,     top: "3%",  left: "20%",  size: 42, rotate: 8,   opacity: 0.24 },
  { Icon: Flower2,   top: "1%",  left: "45%",  size: 40, rotate: -5,  opacity: 0.22 },
  { Icon: Sparkles,  top: "3%",  left: "68%",  size: 38, rotate: 16,  opacity: 0.22 },
  { Icon: Gem,       top: "2%",  left: "88%",  size: 44, rotate: -10, opacity: 0.20 },
  { Icon: ImageIcon, top: "16%", left: "0%",   size: 38, rotate: 20,  opacity: 0.20 },
  { Icon: Ribbon,    top: "18%", left: "94%",  size: 42, rotate: -14, opacity: 0.22 },
  { Icon: Star,      top: "30%", left: "3%",   size: 34, rotate: 32,  opacity: 0.20 },
  { Icon: Heart,     top: "32%", left: "92%",  size: 44, rotate: -8,  opacity: 0.24 },
  { Icon: Flower2,   top: "46%", left: "1%",   size: 48, rotate: 14,  opacity: 0.22 },
  { Icon: Camera,    top: "48%", left: "93%",  size: 40, rotate: 10,  opacity: 0.20 },
  { Icon: Sparkles,  top: "60%", left: "4%",   size: 38, rotate: -20, opacity: 0.22 },
  { Icon: Gem,       top: "62%", left: "91%",  size: 36, rotate: 6,   opacity: 0.20 },
  { Icon: Star,      top: "74%", left: "2%",   size: 34, rotate: 24,  opacity: 0.20 },
  { Icon: Ribbon,    top: "76%", left: "90%",  size: 44, rotate: -16, opacity: 0.22 },
  { Icon: Heart,     top: "86%", left: "6%",   size: 46, rotate: -6,  opacity: 0.24 },
  { Icon: Flower2,   top: "88%", left: "86%",  size: 40, rotate: 18,  opacity: 0.22 },
  { Icon: ImageIcon, top: "94%", left: "24%",  size: 36, rotate: -10, opacity: 0.20 },
  { Icon: Camera,    top: "95%", left: "56%",  size: 42, rotate: 12,  opacity: 0.20 },
  { Icon: Sparkles,  top: "93%", left: "76%",  size: 38, rotate: -4,  opacity: 0.22 },
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

const images = [
  "/gallery/1.JPG",
  "/gallery/2.JPEG",
  "/gallery/3.JPEG",
  "/gallery/3.JPG",
  "/gallery/4.JPG",
  "/gallery/5.JPG",
  "/gallery/6.jpg",
  "/gallery/7.JPG",
  "/gallery/8.JPG",
  "/gallery/9.JPG",
  "/gallery/10.JPG",
  "/gallery/11.JPG",
  "/gallery/12.jpg",
  "/gallery/13.JPG",
  "/gallery/14.JPG",
  "/gallery/15.JPEG",
  "/gallery/16.jpg",
  "/gallery/17.jpg",
  "/gallery/18.jpeg",
  "/gallery/date1.jpg",
  "/gallery/forever.jpg",
  "/gallery/proposal.jpg",
  "/gallery/NEL06278.jpg",
  "/gallery/NEL06629.jpg",
  "/gallery/NEL06634.jpg",
  "/gallery/NEL06667.jpg",
  "/gallery/NEL06715.jpg",
  "/gallery/NEL06915.jpg",
  "/gallery/NEL06924.jpg",
  "/gallery/NEL07027.jpg",
  "/gallery/NEL07088.jpg",
  "/gallery/NEL07329.jpg",
  "/gallery/NEL07340.jpg",
  "/gallery/NEL07429.jpg",
  "/gallery/NEL07462.jpg",
  "/gallery/NEL06288.jpg",
  "/gallery/NEL06311.jpg",
  "/gallery/NEL06324.jpg",
  "/gallery/NEL06350.jpg",
  "/gallery/NEL06417.jpg",
  "/gallery/NEL06459.jpg",
  "/gallery/NEL06468.jpg",
  "/gallery/NEL06476.jpg",
  "/gallery/NEL06482.jpg",
  "/gallery/NEL06490.jpg",
  "/gallery/NEL06493.jpg",
  "/gallery/NEL06517.jpg",
  "/gallery/NEL06522.jpg",
  "/gallery/NEL06537.jpg",
  "/gallery/NEL06543.jpg",
  "/gallery/NEL06563.jpg",
  "/gallery/NEL06633.jpg",
  "/gallery/NEL06666.jpg",
  "/gallery/NEL06710.jpg",
  "/gallery/NEL06737.jpg",
  "/gallery/NEL06755.jpg",
  "/gallery/NEL06795.jpg",
  "/gallery/NEL06826.jpg",
  "/gallery/NEL06853.jpg",
  "/gallery/NEL06863.jpg",
  "/gallery/NEL06880.jpg",
  "/gallery/NEL06893.jpg",
  "/gallery/NEL06938.jpg",
  "/gallery/NEL06974.jpg",
  "/gallery/NEL06998.jpg",
  "/gallery/NEL07005.jpg",
  "/gallery/NEL07019.jpg",
  "/gallery/NEL07024.jpg",
  "/gallery/NEL07058.jpg",
  "/gallery/NEL07073.jpg",
  "/gallery/NEL07079.jpg",
  "/gallery/NEL07094.jpg",
  "/gallery/NEL07105.jpg",
  "/gallery/NEL07116.jpg",
  "/gallery/NEL07120.jpg",
  "/gallery/NEL07154.jpg",
  "/gallery/NEL07173.jpg",
  "/gallery/NEL07185.jpg",
  "/gallery/NEL07194.jpg",
  "/gallery/NEL07201.jpg",
  "/gallery/NEL07207.jpg",
  "/gallery/NEL07209.jpg",
  "/gallery/NEL07211.jpg",
  "/gallery/NEL07215.jpg",
  "/gallery/NEL07220.jpg",
  "/gallery/NEL07224.jpg",
  "/gallery/NEL07228.jpg",
  "/gallery/NEL07233.jpg",
  "/gallery/NEL07235.jpg",
  "/gallery/NEL07238.jpg",
  "/gallery/NEL07251.jpg",
  "/gallery/NEL07256.jpg",
  "/gallery/NEL07262.jpg",
  "/gallery/NEL07267.jpg",
  "/gallery/NEL07277.jpg",
  "/gallery/NEL07282.jpg",
  "/gallery/NEL07293.jpg",
  "/gallery/NEL07301.jpg",
  "/gallery/NEL07318.jpg",
  "/gallery/NEL07327.jpg",
  "/gallery/NEL07331.jpg",
  "/gallery/NEL07335.jpg",
  "/gallery/NEL07338.jpg",
  "/gallery/NEL07347.jpg",
  "/gallery/NEL07349.jpg",
  "/gallery/NEL07355.jpg",
  "/gallery/NEL07361.jpg",
  "/gallery/NEL07367.jpg",
  "/gallery/NEL07371.jpg",
  "/gallery/NEL07374.jpg",
  "/gallery/NEL07377.jpg",
  "/gallery/NEL07382.jpg",
  "/gallery/NEL07393.jpg",
  "/gallery/NEL07395.jpg",
  "/gallery/NEL07443.jpg",
  "/gallery/NEL07453.jpg",
  "/gallery/NEL07461.jpg",
  "/gallery/NEL07529.jpg",
  "/gallery/NEL07539.jpg",
  "/gallery/NEL07556.jpg",
  "/gallery/NEL07573.jpg",
  "/gallery/NEL07589.jpg",
  "/gallery/NEL07600.jpg",
  "/gallery/NEL07606.jpg",
  "/gallery/NEL07626.jpg",
  "/gallery/NEL07646.jpg",
  "/gallery/NEL07677.jpg",
  "/gallery/NEL07685.jpg",
  "/gallery/NEL07738.jpg",
  "/gallery/NEL07784.jpg",
  "/gallery/NEL07901.jpg",
  "/gallery/NEL07927.jpg",
  "/gallery/NEL07928.jpg",
  "/gallery/NEL07929.jpg",
];

interface LightboxProps {
  src: string;
  index: number;
  total: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

function Lightbox({ src, index, total, onClose, onPrev, onNext }: LightboxProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: "rgba(0,0,0,0.92)" }}
      onClick={onClose}
    >
      <button
        className="absolute top-4 right-5 text-white text-3xl font-light leading-none hover:opacity-70 transition-opacity"
        onClick={onClose}
        aria-label="Close"
      >
        ×
      </button>
      <button
        className="absolute left-4 text-white text-4xl font-thin hover:opacity-70 transition-opacity z-10 p-2"
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        aria-label="Previous"
      >
        ‹
      </button>
      <motion.div
        key={src}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.2 }}
        className="relative max-w-5xl max-h-screen w-full mx-14 my-8"
        onClick={(e) => e.stopPropagation()}
        style={{ aspectRatio: "4/3" }}
      >
        <Image
          src={src}
          alt={`Wedding photo ${index + 1}`}
          fill
          className="object-contain"
          sizes="90vw"
          priority
        />
      </motion.div>

      <button
        className="absolute right-4 text-white text-4xl font-thin hover:opacity-70 transition-opacity z-10 p-2"
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        aria-label="Next"
      >
        ›
      </button>

      <div
        className="absolute bottom-4 left-1/2 -translate-x-1/2 font-sans text-xs tracking-widest"
        style={{ color: "rgba(255,255,255,0.5)" }}
      >
        {index + 1} / {total}
      </div>
    </motion.div>
  );
}

const col2A = images.filter((_, i) => i % 2 === 0);
const col2B = images.filter((_, i) => i % 2 === 1);
const col3A = images.filter((_, i) => i % 3 === 0);
const col3B = images.filter((_, i) => i % 3 === 1);
const col3C = images.filter((_, i) => i % 3 === 2);

function GalleryColumn({
  col,
  colIndex,
  cols,
  mobile,
  onOpen,
}: {
  col: string[];
  colIndex: number;
  cols: number;
  mobile: boolean;
  onOpen: (index: number) => void;
}) {
  return (
    <div className={`flex flex-col ${mobile ? "gap-3" : "gap-4"}`}>
      {col.map((src, rowIndex) => {
        const globalIndex = rowIndex * cols + colIndex;
        const isTall = (colIndex + rowIndex) % 2 === 0;
        const minHeight = mobile
          ? (isTall ? "clamp(254px, 61.2vw, 380px)" : "clamp(191px, 44.4vw, 286px)")
          : (isTall ? "clamp(286px, 42vw, 508px)" : "clamp(222px, 31.2vw, 380px)");
        return (
          <motion.div
            key={src}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: rowIndex * 0.05 + colIndex * 0.08 }}
            className="relative overflow-hidden rounded-sm cursor-pointer group shadow-md"
            style={{ flex: "1 0 auto", minHeight }}
            onClick={() => onOpen(globalIndex < images.length ? globalIndex : images.indexOf(src))}
          >
            <Image
              src={src}
              alt={`Wedding photo ${globalIndex + 1}`}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes={mobile ? "50vw" : "33vw"}
            />
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
              style={{ background: "rgba(59,110,165,0.35)" }}
            >
              <svg width="32" height="32" fill="none" viewBox="0 0 32 32">
                <circle cx="16" cy="16" r="15" stroke="white" strokeWidth="1.5" />
                <path d="M10 16h12M16 10v12" stroke="white" strokeWidth="1.5" />
              </svg>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

export default function Gallery() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const openLightbox = useCallback((index: number) => setActiveIndex(index), []);
  const closeLightbox = useCallback(() => setActiveIndex(null), []);

  const goNext = useCallback(() => {
    setActiveIndex((prev) => (prev === null ? 0 : (prev + 1) % images.length));
  }, []);

  const goPrev = useCallback(() => {
    setActiveIndex((prev) => (prev === null ? 0 : (prev - 1 + images.length) % images.length));
  }, []);

  return (
    <section id="gallery" className="relative py-8 overflow-hidden" style={{ background: "var(--blue-pale)" }}>
      <IconBackground />
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="text-center mb-14">
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-serif text-sm tracking-[0.3em] uppercase mb-3"
            style={{ color: "var(--gold-accent)" }}
          >
            Captured moments
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-script"
            style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)", color: "var(--blue-primary)" }}
          >
            Our Gallery
          </motion.h2>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="section-divider mt-6"
          />
        </div>

        {/* Mobile: 2 columns */}
        <div className="grid grid-cols-2 gap-3 md:hidden">
          <GalleryColumn col={col2A} colIndex={0} cols={2} mobile onOpen={openLightbox} />
          <GalleryColumn col={col2B} colIndex={1} cols={2} mobile onOpen={openLightbox} />
        </div>

        {/* Desktop: 3 columns */}
        <div className="hidden md:grid md:grid-cols-3 md:gap-4">
          <GalleryColumn col={col3A} colIndex={0} cols={3} mobile={false} onOpen={openLightbox} />
          <GalleryColumn col={col3B} colIndex={1} cols={3} mobile={false} onOpen={openLightbox} />
          <GalleryColumn col={col3C} colIndex={2} cols={3} mobile={false} onOpen={openLightbox} />
        </div>
      </div>

      <AnimatePresence>
        {activeIndex !== null && (
          <Lightbox
            src={images[activeIndex]}
            index={activeIndex}
            total={images.length}
            onClose={closeLightbox}
            onPrev={goPrev}
            onNext={goNext}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
