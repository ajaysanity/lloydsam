"use client";

import { motion } from "framer-motion";

const FloralFooterSVG = () => (
  <svg
    viewBox="0 0 1200 120"
    xmlns="http://www.w3.org/2000/svg"
    className="w-full pointer-events-none"
    preserveAspectRatio="none"
    style={{ height: "120px" }}
  >
    {/* Left cluster */}
    <circle cx="50" cy="50" r="22" fill="#3b6ea5" opacity="0.2" />
    <circle cx="50" cy="50" r="13" fill="#3b6ea5" opacity="0.4" />
    <circle cx="50" cy="50" r="6" fill="#c8a96e" opacity="0.8" />
    {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
      <ellipse
        key={`fl-${i}`}
        cx={50 + Math.cos((angle * Math.PI) / 180) * 17}
        cy={50 + Math.sin((angle * Math.PI) / 180) * 17}
        rx="8"
        ry="4"
        fill="#3b6ea5"
        opacity="0.4"
        transform={`rotate(${angle}, ${50 + Math.cos((angle * Math.PI) / 180) * 17}, ${50 + Math.sin((angle * Math.PI) / 180) * 17})`}
      />
    ))}
    <ellipse cx="90" cy="80" rx="16" ry="6" fill="#4a8c5c" opacity="0.4" transform="rotate(-25, 90, 80)" />
    <ellipse cx="20" cy="85" rx="14" ry="5" fill="#4a8c5c" opacity="0.4" transform="rotate(40, 20, 85)" />
    <circle cx="115" cy="40" r="10" fill="#5a9fd4" opacity="0.35" />
    <circle cx="115" cy="40" r="5" fill="#5a9fd4" opacity="0.5" />
    <circle cx="115" cy="40" r="3" fill="#c8a96e" opacity="0.8" />

    {/* Right cluster (mirrored) */}
    <circle cx="1150" cy="50" r="22" fill="#3b6ea5" opacity="0.2" />
    <circle cx="1150" cy="50" r="13" fill="#3b6ea5" opacity="0.4" />
    <circle cx="1150" cy="50" r="6" fill="#c8a96e" opacity="0.8" />
    {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
      <ellipse
        key={`fr-${i}`}
        cx={1150 + Math.cos((angle * Math.PI) / 180) * 17}
        cy={50 + Math.sin((angle * Math.PI) / 180) * 17}
        rx="8"
        ry="4"
        fill="#3b6ea5"
        opacity="0.4"
        transform={`rotate(${angle}, ${1150 + Math.cos((angle * Math.PI) / 180) * 17}, ${50 + Math.sin((angle * Math.PI) / 180) * 17})`}
      />
    ))}
    <ellipse cx="1110" cy="80" rx="16" ry="6" fill="#4a8c5c" opacity="0.4" transform="rotate(25, 1110, 80)" />
    <ellipse cx="1180" cy="85" rx="14" ry="5" fill="#4a8c5c" opacity="0.4" transform="rotate(-40, 1180, 85)" />
    <circle cx="1085" cy="40" r="10" fill="#5a9fd4" opacity="0.35" />
    <circle cx="1085" cy="40" r="5" fill="#5a9fd4" opacity="0.5" />
    <circle cx="1085" cy="40" r="3" fill="#c8a96e" opacity="0.8" />

    {/* Center decorative dots */}
    <circle cx="590" cy="20" r="3" fill="#c8a96e" opacity="0.5" />
    <circle cx="600" cy="14" r="4" fill="#3b6ea5" opacity="0.35" />
    <circle cx="610" cy="20" r="3" fill="#c8a96e" opacity="0.5" />
  </svg>
);

const navLinks = [
  { label: "Our Story", href: "#story" },
  { label: "Details", href: "#details" },
  { label: "Gallery", href: "#gallery" },
  { label: "RSVP", href: "#rsvp" },
];

export default function Footer() {
  return (
    <footer style={{ background: "var(--blue-pale)" }}>
      <FloralFooterSVG />

      <div
        className="pb-16 px-6 text-center"
        style={{ background: "linear-gradient(180deg, var(--blue-pale), #d6e8f7)" }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2
            className="font-script"
            style={{ fontSize: "clamp(3rem, 8vw, 6rem)", color: "var(--blue-primary)" }}
          >
            Lloyd &amp; Sam
          </h2>

          <p
            className="font-serif italic text-base md:text-lg mt-2"
            style={{ color: "var(--text-muted)" }}
          >
            December 29, 2026
          </p>

          <div className="section-divider my-6" />

          <p
            className="font-serif italic text-sm md:text-base max-w-md mx-auto leading-relaxed"
            style={{ color: "var(--text-muted)" }}
          >
            &ldquo;And I&apos;ll love you forever, if forever&apos;s a place.&rdquo;
          </p>

          <nav className="flex flex-wrap justify-center gap-6 mt-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-sans text-xs tracking-[0.2em] uppercase transition-colors duration-200 hover:opacity-100"
                style={{ color: "var(--blue-primary)", opacity: 0.7 }}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="mt-10 pt-6 border-t" style={{ borderColor: "rgba(59,110,165,0.2)" }}>
            <p className="font-sans text-xs" style={{ color: "var(--text-muted)", opacity: 0.6 }}>
              Made with love · Lloyd &amp; Sam 2026
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
