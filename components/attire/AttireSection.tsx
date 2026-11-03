"use client";

import { Shirt, Sparkles, Gem, Flower2, Heart, Star, Ribbon } from "lucide-react";
import { motion } from "framer-motion";
import { defaultAttireCategories } from "@/data/attire-categories";
import type { AttireCategory } from "@/types/attire";
import { AttireCategoryCard } from "@/components/attire/AttireCategoryCard";

const BG_ICONS = [
  { Icon: Shirt, top: "3%", left: "2%", size: 46, rotate: -8, opacity: 0.18 },
  { Icon: Sparkles, top: "2%", left: "22%", size: 40, rotate: 12, opacity: 0.18 },
  { Icon: Gem, top: "4%", left: "48%", size: 36, rotate: 0, opacity: 0.16 },
  { Icon: Flower2, top: "2%", left: "72%", size: 44, rotate: -14, opacity: 0.18 },
  { Icon: Heart, top: "3%", left: "92%", size: 42, rotate: 8, opacity: 0.2 },
  { Icon: Star, top: "22%", left: "1%", size: 34, rotate: 22, opacity: 0.16 },
  { Icon: Ribbon, top: "24%", left: "94%", size: 42, rotate: -10, opacity: 0.18 },
  { Icon: Shirt, top: "42%", left: "4%", size: 38, rotate: 14, opacity: 0.16 },
  { Icon: Sparkles, top: "44%", left: "90%", size: 36, rotate: -18, opacity: 0.18 },
  { Icon: Gem, top: "62%", left: "2%", size: 40, rotate: -6, opacity: 0.16 },
  { Icon: Flower2, top: "64%", left: "93%", size: 44, rotate: 16, opacity: 0.18 },
  { Icon: Heart, top: "82%", left: "8%", size: 46, rotate: -12, opacity: 0.2 },
  { Icon: Star, top: "84%", left: "88%", size: 36, rotate: 28, opacity: 0.16 },
  { Icon: Shirt, top: "92%", left: "42%", size: 40, rotate: 5, opacity: 0.16 },
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

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.75, delay, ease: "easeOut" as const },
});

function gridClassForIndex(_i: number) {
  return "";
}

export type AttireSectionProps = {
  categories?: AttireCategory[];
};

export default function AttireSection({ categories = defaultAttireCategories }: AttireSectionProps) {
  return (
    <section
      id="attire"
      className="relative w-full overflow-hidden py-12 sm:py-16 md:py-20"
      style={{
        background: "linear-gradient(175deg, #f8f5f0 0%, #eef4fb 42%, #f4f0eb 100%)",
      }}
      aria-labelledby="attire-heading"
    >
      <IconBackground />

      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center sm:mb-14">
          <motion.p
            {...fadeUp(0)}
            className="font-sans uppercase"
            style={{ fontSize: "0.65rem", letterSpacing: "0.38em", color: "rgba(183,154,104,0.9)" }}
          >
            Dress code
          </motion.p>
          <motion.h2
            id="attire-heading"
            {...fadeUp(0.1)}
            className="font-script mt-2 leading-none"
            style={{ fontSize: "clamp(2.75rem, 7vw, 4.5rem)", color: "#1a3060" }}
          >
            Attire
          </motion.h2>
          <motion.div {...fadeUp(0.2)} className="mt-6 flex items-center justify-center gap-4">
            <span className="block h-px w-12" style={{ background: "rgba(183,154,104,0.4)" }} />
            <span className="block h-[5px] w-[5px] rotate-45" style={{ background: "rgba(183,154,104,0.65)" }} />
            <span className="block h-px w-12" style={{ background: "rgba(183,154,104,0.4)" }} />
          </motion.div>
          <motion.p
            {...fadeUp(0.28)}
            className="mx-auto mt-6 max-w-lg font-sans leading-relaxed"
            style={{ fontSize: "clamp(0.82rem, 1.4vw, 0.95rem)", color: "rgba(44,44,44,0.62)" }}
          >
            Please dress according to your role so our celebration looks cohesive in every photo.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {categories.map((category, index) => (
            <AttireCategoryCard
              key={category.id}
              category={category}
              index={index}
              gridClassName={gridClassForIndex(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
