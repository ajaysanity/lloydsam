"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Users } from "lucide-react";
import type { AttireCategory } from "@/types/attire";

function PalettePlaceholder({ palette }: { palette: readonly string[] }) {
  const [a, b, c, d] = palette;
  const stops = [a, b, c, d ?? b].filter(Boolean);
  const gradient = `linear-gradient(145deg, ${stops[0]} 0%, ${stops[1]} 42%, ${stops[2]} 78%, ${stops[3] ?? stops[2]} 100%)`;

  return (
    <div
      aria-hidden
      className="relative flex h-full min-h-[200px] w-full items-center justify-center overflow-hidden sm:min-h-[220px]"
      style={{ background: gradient }}
    >
      <div className="absolute inset-0 opacity-[0.12] bg-[radial-gradient(circle_at_70%_20%,#fff_0%,transparent_50%)]" />
      <div className="relative rounded-full p-6" style={{ background: "rgba(255,255,255,0.22)", backdropFilter: "blur(8px)" }}>
        <Users className="h-14 w-14 sm:h-16 sm:w-16" strokeWidth={1} style={{ color: "rgba(26,48,96,0.35)" }} />
      </div>
    </div>
  );
}

export type AttireCategoryCardProps = {
  category: AttireCategory;
  index: number;
  gridClassName?: string;
};

export function AttireCategoryCard({ category, index, gridClassName = "" }: AttireCategoryCardProps) {
  const hasImage = Boolean(category.imageSrc?.trim());

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      className={`flex h-full flex-col overflow-hidden rounded-[6px] ${gridClassName}`}
      style={{
        background: "white",
        border: "1px solid rgba(26,48,96,0.08)",
        boxShadow: "0 4px 24px rgba(26,48,96,0.07)",
      }}
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-white sm:aspect-[5/4]">
        {hasImage ? (
          <Image
            src={category.imageSrc as string}
            alt={category.imageAlt ?? category.title}
            fill
            className="object-contain object-center"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            quality={85}
          />
        ) : (
          <PalettePlaceholder palette={category.palette} />
        )}
      </div>

      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <div className="mb-3 h-px w-10" style={{ background: "linear-gradient(to right, var(--gold-accent), transparent)" }} />
        <h3
          className="font-serif font-semibold leading-snug tracking-wide"
          style={{ fontSize: "clamp(0.95rem, 2vw, 1.1rem)", color: "#1a3060" }}
        >
          {category.title}
        </h3>
        <p
          className="mt-2 font-sans leading-relaxed"
          style={{ fontSize: "clamp(0.78rem, 1.5vw, 0.875rem)", color: "rgba(44,44,44,0.68)", lineHeight: 1.75 }}
        >
          {category.description}
        </p>
        <ul className="mt-3 flex flex-wrap gap-2" aria-label={`${category.title} color palette`}>
          {category.palette.map((hex) => (
            <li
              key={hex}
              className="h-5 w-5 shrink-0 rounded-full border border-black/10 shadow-sm"
              style={{ backgroundColor: hex }}
              title={hex}
            />
          ))}
        </ul>
      </div>
    </motion.article>
  );
}
