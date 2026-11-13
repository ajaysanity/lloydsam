"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, Gift, HelpCircle, Heart, MessageCircle, Sparkles } from "lucide-react";

const BG_ICONS = [
  { Icon: Camera, top: "6%", left: "3%", size: 40, rotate: -8, opacity: 0.22 },
  { Icon: Gift, top: "4%", left: "92%", size: 38, rotate: 10, opacity: 0.22 },
  { Icon: HelpCircle, top: "38%", left: "1%", size: 36, rotate: 12, opacity: 0.2 },
  { Icon: Heart, top: "44%", left: "96%", size: 42, rotate: -6, opacity: 0.24 },
  { Icon: Sparkles, top: "72%", left: "4%", size: 38, rotate: 14, opacity: 0.22 },
  { Icon: MessageCircle, top: "78%", left: "91%", size: 36, rotate: -10, opacity: 0.2 },
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

const QA_ITEMS = [
  {
    question: "When do I need to RSVP?",
    answer:
      "Kindly confirm your presence on or before December 01, 2026 through this website, or message us on Facebook.",
  },
  {
    question: "Can we take photos during the wedding?",
    answer:
      "We will be having an unplugged ceremony, so we kindly request that phones and cameras be kept out of sight until after the ceremony is concluded. You are welcome to take photos during the cocktail hour, reception, and after party.",
  },
  {
    question: "Can I bring plus one?",
    answer:
      "Your presence is already so special to us! If we're reserved a plus one for you, we'll personally let you know. If your original guest can't make it, kindly reach out to us before inviting someone else so we can keep everything organized.",
  },
] as const;

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-40px" },
  transition: { duration: 0.6, delay, ease: "easeOut" as const },
});

const GUIDE_IMAGE = "/gallery/NEL07340.jpg";

const ATTIRE_COLORS = [
  { name: "Cream", role: "Parents", color: "#f3e6b8" },
  { name: "Navy blue", role: "Best Man & Maid of Honor", color: "#1e3a6e" },
  { name: "Dusty blue", role: "Bridesmaids & Groomsmen", color: "#8eafc9" },
  { name: "Cream", role: "Ring, Bible & Coin Bearer", color: "#f3e6b8" },
  { name: "Blue slate", role: "Flower Girls", color: "#6d8eae" },
  { name: "Silver gray", role: "Principal Sponsors", color: "#b7bcc2" },
] as const;
const QR_CODES = [
  { src: "/qr/qr_gcash.jpg", label: "GCash", alt: "GCash QR code" },
  { src: "/qr/qr_pnb.jpg", label: "PNB", alt: "PNB QR code" },
] as const;

type QrItem = (typeof QR_CODES)[number];

function QrLightbox({ qr, onClose }: { qr: QrItem; onClose: () => void }) {
  const titleId = `qr-lightbox-title-${qr.label.replace(/\s/g, "-")}`;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center p-4 sm:p-6"
      style={{ background: "rgba(0,0,0,0.92)" }}
      onClick={onClose}
      role="presentation"
    >
      <button
        type="button"
        className="absolute top-3 right-4 z-10 text-3xl font-light leading-none text-white transition-opacity hover:opacity-70 sm:top-5 sm:right-6"
        onClick={onClose}
        aria-label="Close"
      >
        ×
      </button>
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        transition={{ duration: 0.2 }}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="flex w-full max-w-lg flex-col items-center gap-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative h-[min(78vh,720px)] w-full max-w-md overflow-hidden rounded-lg border border-[var(--gold-accent)] bg-[#ffffff] p-3 shadow-xl">
          <Image
            src={qr.src}
            alt={qr.alt}
            fill
            className="object-contain object-center"
            sizes="(max-width: 768px) 90vw, 28rem"
            priority
          />
        </div>
        <p
          id={titleId}
          className="font-serif text-xs tracking-[0.2em] text-white/90 uppercase sm:text-sm"
        >
          {qr.label}
        </p>
      </motion.div>
    </motion.div>
  );
}

function QrCodesBlock() {
  const [lightboxQr, setLightboxQr] = useState<QrItem | null>(null);
  const closeLightbox = useCallback(() => setLightboxQr(null), []);

  return (
    <>
      <div className="mx-auto mt-8 flex w-full max-w-md flex-col items-center gap-6 sm:flex-row sm:justify-center sm:gap-8">
        {QR_CODES.map((qr) => (
          <div key={qr.label} className="flex w-full max-w-[200px] flex-col items-center gap-2">
            <button
              type="button"
              onClick={() => setLightboxQr(qr)}
              className="w-full cursor-zoom-in rounded-lg text-left transition-opacity hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--cream)]"
              aria-label={`View ${qr.label} QR code larger`}
            >
              <div className="w-full overflow-hidden rounded-lg border border-[var(--gold-accent)] bg-[#ffffff] p-1.5 shadow-sm">
                <div className="relative aspect-[10/13] w-full bg-[#ffffff]">
                  <Image
                    src={qr.src}
                    alt=""
                    fill
                    className="pointer-events-none object-contain object-center"
                    sizes="200px"
                  />
                </div>
              </div>
            </button>
            <p
              className="font-serif text-xs tracking-[0.2em] uppercase"
              style={{ color: "var(--blue-secondary)" }}
            >
              {qr.label}
            </p>
          </div>
        ))}
      </div>
      <AnimatePresence mode="wait">
        {lightboxQr ? (
          <QrLightbox key={lightboxQr.label} qr={lightboxQr} onClose={closeLightbox} />
        ) : null}
      </AnimatePresence>
    </>
  );
}

export default function QaSection() {
  return (
    <section
      id="qa"
      className="relative w-full overflow-hidden py-12 sm:py-16 md:py-20 lg:py-24"
      style={{
        background: "linear-gradient(180deg, var(--blue-pale) 0%, var(--cream) 52%, var(--cream-dark) 100%)",
      }}
      aria-labelledby="guide-heading"
    >
      <IconBackground />

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center sm:mb-14">
          <motion.p
            {...fadeUp(0)}
            className="mb-3 font-serif text-sm tracking-[0.3em] uppercase"
            style={{ color: "var(--gold-accent)" }}
          >
            For our guests
          </motion.p>
          <motion.h2
            id="guide-heading"
            {...fadeUp(0.06)}
            className="font-script leading-none"
            style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)", color: "var(--blue-primary)" }}
          >
            Your guide
          </motion.h2>
          <motion.div {...fadeUp(0.12)} className="section-divider mt-6" />
        </div>

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 lg:items-start">
          <motion.div {...fadeUp(0.1)} className="flex justify-center lg:justify-start">
            <div
              className="relative aspect-square w-full max-w-[min(100%,420px)] shrink-0 overflow-hidden rounded-full shadow-md ring-2 ring-[var(--gold-accent)] ring-offset-4 ring-offset-[var(--cream)]"
            >
              <Image
                src={GUIDE_IMAGE}
                alt="Lloyd and Sam"
                fill
                className="object-cover object-[center_12%]"
                sizes="(max-width: 1024px) 100vw, 420px"
                priority={false}
              />
            </div>
          </motion.div>

          <div className="flex flex-col gap-10 text-center lg:gap-12 lg:pt-2 lg:text-left">
            <motion.div {...fadeUp(0.14)}>
              <p
                className="font-serif text-sm tracking-[0.3em] uppercase"
                style={{ color: "var(--gold-accent)" }}
              >
                Attire guide
              </p>
              <p
                className="mx-auto mt-4 max-w-md font-sans text-sm leading-relaxed md:text-base lg:mx-0"
                style={{ color: "var(--text-muted)" }}
              >
                We would love to see you in your best and most comfortable attire that suits our motif.
              </p>
              <ul className="mx-auto mt-5 max-w-md space-y-2.5 text-left lg:mx-0">
                {ATTIRE_COLORS.map((item) => (
                  <li key={`${item.role}-${item.name}`} className="flex items-center gap-3">
                    <span
                      className="h-4 w-4 shrink-0 rounded-full border border-black/10"
                      style={{ background: item.color }}
                      aria-hidden
                    />
                    <span className="font-sans text-sm leading-snug" style={{ color: "var(--text-muted)" }}>
                      <span className="font-medium" style={{ color: "var(--blue-secondary)" }}>
                        {item.name}
                      </span>
                      {" — "}
                      {item.role}
                    </span>
                  </li>
                ))}
              </ul>
              <p
                className="mx-auto mt-4 max-w-md font-sans text-sm leading-relaxed md:text-base lg:mx-0"
                style={{ color: "var(--text-muted)" }}
              >
                Guests: semi-formal, in our blue motif.
              </p>
            </motion.div>

            <motion.div {...fadeUp(0.18)}>
              <p
                className="font-serif text-sm tracking-[0.3em] uppercase"
                style={{ color: "var(--gold-accent)" }}
              >
                RSVP
              </p>
              <p
                className="mx-auto mt-4 max-w-md font-sans text-sm leading-relaxed md:text-base lg:mx-0"
                style={{ color: "var(--text-muted)" }}
              >
                Kindly confirm your presence on or before December 01, 2026 through this website, or message us on
                Facebook.
              </p>
            </motion.div>

            <motion.div {...fadeUp(0.22)}>
              <p
                className="font-serif text-sm tracking-[0.3em] uppercase"
                style={{ color: "var(--gold-accent)" }}
              >
                Gift guide
              </p>
              <p
                className="mx-auto mt-4 max-w-md font-sans text-sm leading-relaxed md:text-base lg:mx-0"
                style={{ color: "var(--text-muted)" }}
              >
                If you&apos;re thinking of giving us a gift as we begin this new chapter, a little monetary contribution
                would be truly appreciated. Whatever you decide, please remember that having you with us on our special
                day is the greatest gift of all.
              </p>
              <QrCodesBlock />
            </motion.div>

            <motion.div {...fadeUp(0.26)}>
              <p
                className="font-serif text-sm tracking-[0.3em] uppercase"
                style={{ color: "var(--gold-accent)" }}
              >
                Snap &amp; share
              </p>
              <p
                className="mx-auto mt-4 max-w-md font-sans text-sm leading-relaxed md:text-base lg:mx-0"
                style={{ color: "var(--text-muted)" }}
              >
                Please help us capture the unforgettable moments. Share and tag us on Facebook.
              </p>
            </motion.div>
          </div>
        </div>

        <div className="section-divider my-14 sm:my-16" aria-hidden />

        <div className="mx-auto max-w-2xl text-center mt-12">
          <motion.h2
            {...fadeUp(0)}
            className="font-script leading-none"
            style={{ fontSize: "clamp(2.5rem, 6vw, 4rem)", color: "var(--blue-primary)" }}
          >
            Q&amp;A
          </motion.h2>
          <motion.div {...fadeUp(0.08)} className="section-divider mt-6" />

          <dl className="mt-12 space-y-10 text-left sm:mt-14 sm:space-y-12">
            {QA_ITEMS.map((item, i) => (
              <motion.div key={item.question} {...fadeUp(0.14 + i * 0.08)}>
                <dt
                  className="font-serif text-lg italic sm:text-xl"
                  style={{ color: "var(--blue-secondary)" }}
                >
                  {item.question}
                </dt>
                <dd
                  className="mt-3 font-sans text-base leading-relaxed sm:text-[1.05rem]"
                  style={{ color: "var(--text-muted)" }}
                >
                  {item.answer}
                </dd>
              </motion.div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
