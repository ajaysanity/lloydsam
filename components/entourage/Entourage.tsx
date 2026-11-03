"use client";

import { motion } from "framer-motion";
import { Heart, Flower2, Gem, Sparkles, Ribbon, Star, Crown, Music2 } from "lucide-react";

/* ── Scattered icon background ──────────────────────────────── */
const BG_ICONS = [
  { Icon: Crown,    top: "2%",  left: "2%",   size: 52, rotate: -12, opacity: 0.22 },
  { Icon: Flower2,  top: "4%",  left: "18%",  size: 44, rotate: 22,  opacity: 0.22 },
  { Icon: Gem,      top: "3%",  left: "38%",  size: 38, rotate: 0,   opacity: 0.20 },
  { Icon: Sparkles, top: "2%",  left: "58%",  size: 42, rotate: 12,  opacity: 0.22 },
  { Icon: Heart,    top: "4%",  left: "76%",  size: 48, rotate: -8,  opacity: 0.24 },
  { Icon: Ribbon,   top: "2%",  left: "92%",  size: 44, rotate: 6,   opacity: 0.22 },
  { Icon: Flower2,  top: "14%", left: "1%",   size: 40, rotate: 30,  opacity: 0.20 },
  { Icon: Music2,   top: "18%", left: "94%",  size: 38, rotate: -15, opacity: 0.22 },
  { Icon: Star,     top: "25%", left: "8%",   size: 34, rotate: 20,  opacity: 0.20 },
  { Icon: Heart,    top: "28%", left: "88%",  size: 44, rotate: -18, opacity: 0.24 },
  { Icon: Gem,      top: "36%", left: "3%",   size: 38, rotate: -8,  opacity: 0.20 },
  { Icon: Sparkles, top: "38%", left: "91%",  size: 40, rotate: 10,  opacity: 0.22 },
  { Icon: Flower2,  top: "48%", left: "0%",   size: 46, rotate: 15,  opacity: 0.20 },
  { Icon: Crown,    top: "50%", left: "95%",  size: 44, rotate: -6,  opacity: 0.22 },
  { Icon: Star,     top: "58%", left: "5%",   size: 36, rotate: 35,  opacity: 0.20 },
  { Icon: Ribbon,   top: "60%", left: "90%",  size: 46, rotate: 12,  opacity: 0.22 },
  { Icon: Heart,    top: "68%", left: "2%",   size: 50, rotate: 8,   opacity: 0.24 },
  { Icon: Music2,   top: "70%", left: "93%",  size: 38, rotate: -20, opacity: 0.22 },
  { Icon: Gem,      top: "78%", left: "7%",   size: 40, rotate: 18,  opacity: 0.20 },
  { Icon: Flower2,  top: "80%", left: "87%",  size: 44, rotate: -14, opacity: 0.22 },
  { Icon: Sparkles, top: "88%", left: "14%",  size: 40, rotate: -10, opacity: 0.22 },
  { Icon: Star,     top: "86%", left: "82%",  size: 36, rotate: 28,  opacity: 0.20 },
  { Icon: Crown,    top: "93%", left: "40%",  size: 44, rotate: -5,  opacity: 0.20 },
  { Icon: Heart,    top: "95%", left: "64%",  size: 40, rotate: -12, opacity: 0.24 },
  { Icon: Ribbon,   top: "92%", left: "2%",   size: 42, rotate: 8,   opacity: 0.22 },
  { Icon: Flower2,  top: "96%", left: "90%",  size: 40, rotate: 20,  opacity: 0.20 },
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

/* ── Animation helper ───────────────────────────────────────── */
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.7, delay, ease: "easeOut" as const },
});

/* ── Sub-components ─────────────────────────────────────────── */
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <motion.h3
      {...fadeUp(0.1)}
      className="font-script text-center mb-2"
      style={{ fontSize: "clamp(2rem, 5vw, 3rem)", color: "var(--blue-primary)" }}
    >
      {children}
    </motion.h3>
  );
}

function NameList({ names, align = "center" }: { names: string[]; align?: "center" | "left" }) {
  const left = align === "left";
  return (
    <div
      className={`flex flex-col gap-1 ${
        left
          ? "w-full sm:w-max sm:max-w-full"
          : "w-full items-center"
      }`}
    >
      {names.map((name) => (
        <p
          key={name}
          className={`font-sans uppercase tracking-[0.15em] ${left ? "text-left" : "w-full text-center"}`}
          style={{ fontSize: "clamp(0.75rem, 1.6vw, 0.92rem)", color: "var(--text-muted)" }}
        >
          {name}
        </p>
      ))}
    </div>
  );
}

function GoldRule() {
  return (
    <div className="flex items-center justify-center gap-3 my-8 md:my-10">
      <div className="h-px flex-1" style={{ background: "linear-gradient(to right, transparent, rgba(200,169,110,0.45))" }} />
      <div className="flex items-center gap-1.5">
        <span className="block w-1 h-1 rotate-45" style={{ background: "#c8a96e", opacity: 0.6 }} />
        <span className="block w-1.5 h-1.5 rotate-45" style={{ background: "#c8a96e" }} />
        <span className="block w-1 h-1 rotate-45" style={{ background: "#c8a96e", opacity: 0.6 }} />
      </div>
      <div className="h-px flex-1" style={{ background: "linear-gradient(to left, transparent, rgba(200,169,110,0.45))" }} />
    </div>
  );
}

/* ── Main component ─────────────────────────────────────────── */
export default function Entourage() {
  return (
    <section
      className="relative py-16 md:py-24 overflow-hidden"
      style={{ background: "var(--cream)" }}
    >
      <IconBackground />

      {/* Subtle paper texture */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")",
        }}
      />

      <div className="relative max-w-5xl mx-auto px-5 sm:px-8">

        {/* ── Heading ── */}
        <motion.div {...fadeUp(0)} className="text-center mb-12 md:mb-16">
          <p
            className="font-serif uppercase tracking-[0.35em] mb-4"
            style={{ fontSize: "clamp(0.75rem, 1.6vw, 0.9rem)", color: "var(--gold-accent)" }}
          >
            With gratitude & honour
          </p>
          <h2
            className="font-sans font-light uppercase"
            style={{
              fontSize: "clamp(2rem, 7vw, 4.2rem)",
              color: "var(--blue-primary)",
              letterSpacing: "0.3em",
            }}
          >
            The Entourage
          </h2>
          <div className="section-divider mt-5" />
        </motion.div>

        {/* ── Parents ── */}
        <motion.div {...fadeUp(0.1)} className="grid grid-cols-1 sm:grid-cols-2 gap-10 md:gap-16 mb-2 text-center">
          <div className="space-y-2">
            <SectionLabel>Parents of the Groom</SectionLabel>
            <NameList names={["Mr. Silverio Ariola Jr.", "Mrs. Lucilyn Ariola"]} />
          </div>
          <div className="space-y-2">
            <SectionLabel>Parents of the Bride</SectionLabel>
            <NameList names={["Mr. Joie Mingao", "Mrs. Angelina Mingao"]} />
          </div>
        </motion.div>

        <GoldRule />

        {/* ── Principal Sponsors ── */}
        <motion.div {...fadeUp(0.1)} className="text-center mb-8">
          <SectionLabel>Principal Sponsors</SectionLabel>
        </motion.div>
        <motion.div
          {...fadeUp(0.15)}
          className="mb-4 flex w-full flex-col items-center gap-10 sm:flex-row sm:items-start sm:justify-center sm:gap-10 md:gap-16"
        >
          <div className="flex w-max max-w-full flex-col gap-10 mx-auto sm:contents">
            <NameList
              align="left"
              names={[
                "Hon. Cong. Leody Tarriela",
                "Hon. Santiago Javier Jr.",
                "Mr. John Patrick Loyzaga",
                "Arch. Eugene Panaguiton",
                "Mr. Menandro Santos",
                "Mr. Vicente Barel",
                "Mr. Rixon Catimbang",
                "Mr. Jerry Cortes",
                "Hon. Juvan Difuntorum",
                "Mr. Dennis Cerezo",
              ]}
            />
            <NameList
              align="left"
              names={[
                "Mrs. Rose Schuman",
                "Mrs. Normita Guerrero",
                "Mrs. Edna Cajeta",
                "Mrs. Cynthia Calabio",
                "Mrs. Fe Gresham",
                "Mrs. Joey Mingao",
                "Mrs. Airene Catimbang",
                "Mrs. Rosbie Asunio",
                "Mrs. May Andales",
                "Mrs. Ailyn Alejandro",
              ]}
            />
          </div>
        </motion.div>

        <GoldRule />

        {/* ── Secondary Sponsors ── */}
        <motion.div {...fadeUp(0.1)} className="text-center mb-8">
          <SectionLabel>Secondary Sponsors</SectionLabel>
        </motion.div>
        <motion.div {...fadeUp(0.15)} className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center mb-2">
          <div className="space-y-2">
            <p className="font-script mb-1" style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", color: "var(--blue-primary)" }}>Candle</p>
            <NameList names={["El Edzel Gamido", "Lorraine Ariola"]} />
          </div>
          <div className="space-y-2">
            <p className="font-script mb-1" style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", color: "var(--blue-primary)" }}>Cord</p>
            <NameList names={["Maverick Mingao", "Kim Loraine Mingao"]} />
          </div>
          <div className="space-y-2">
            <p className="font-script mb-1" style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", color: "var(--blue-primary)" }}>Veil</p>
            <NameList names={["Carlos David Temenia", "Khrysha Shyrl Centeno"]} />
          </div>
        </motion.div>

        <GoldRule />

        {/* ── Best Man & Maid of Honor ── */}
        <motion.div {...fadeUp(0.1)} className="grid grid-cols-1 sm:grid-cols-2 gap-10 md:gap-16 text-center mb-2">
          <div className="space-y-2">
            <SectionLabel>Best Man</SectionLabel>
            <NameList names={["Jake Andro Santos"]} />
          </div>
          <div className="space-y-2">
            <SectionLabel>Maid of Honor</SectionLabel>
            <NameList names={["Rochelle Gutierrez"]} />
          </div>
        </motion.div>

        <GoldRule />

        {/* ── Groomsmen & Bridesmaids ── */}
        <motion.div {...fadeUp(0.1)} className="grid grid-cols-1 sm:grid-cols-2 gap-10 md:gap-16 text-center mb-2">
          <div className="space-y-2">
            <SectionLabel>Groomsmen</SectionLabel>
            <NameList names={[
              "John Lloyd Domingo",
              "Dave Janairo",
              "Germon Feudo",
              "Emmanuel Tenorio",
              "Christian Jeriz Cortes",
              "Ivan Santos",
              "Kim Llanes",
            ]} />
          </div>
          <div className="space-y-2">
            <SectionLabel>Bridesmaid</SectionLabel>
            <NameList names={[
              "Princess Jelian Mingao",
              "Alexdra Nicole Abejo",
              "Crizia Harvey Lopez",
              "Grace Ann Enero",
              "Yhanie Mingao",
              "Necie Estorgio",
            ]} />
          </div>
        </motion.div>

        <GoldRule />

        {/* ── Bearers ── */}
        <motion.div {...fadeUp(0.1)} className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center mb-8">
          <div className="space-y-2">
            <SectionLabel>Bible Bearer</SectionLabel>
            <NameList names={["Lawrenze Jude Mauricio"]} />
          </div>
          <div className="space-y-2">
            <SectionLabel>Ring Bearer</SectionLabel>
            <NameList names={["Clyde Gabriel Mingao"]} />
          </div>
          <div className="space-y-2">
            <SectionLabel>Coin Bearer</SectionLabel>
            <NameList names={["Aiden Julian Levantino"]} />
          </div>
        </motion.div>

        <GoldRule />

        {/* ── Flower Girls & Papal Blessing Bearer ── */}
        <motion.div {...fadeUp(0.1)} className="grid grid-cols-1 sm:grid-cols-2 gap-10 md:gap-16 text-center">
          <div className="space-y-2">
            <SectionLabel>Flower Girl</SectionLabel>
            <NameList names={[
              "Athalia Yslah Mabunga",
              "Zhavia Panganiban",
            ]} />
          </div>
          <div className="space-y-2">
            <SectionLabel>Banner Bearer</SectionLabel>
            <NameList names={["Reo Skyler Tulabot"]} />
          </div>
        </motion.div>

      </div>
    </section>
  );
}
