"use client";

import { useState, useEffect, useCallback, useActionState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { submitRsvp } from "@/app/actions/submit-rsvp";
import { rsvpInitialState, MAX_ADDITIONAL_GUESTS } from "@/types/rsvp";

function SubmitButton({ pending }: { pending: boolean }) {
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full py-3 font-serif text-sm tracking-[0.2em] uppercase transition-all duration-300 hover:opacity-90 active:scale-95 disabled:opacity-60 disabled:pointer-events-none"
      style={{ background: "var(--blue-primary)", color: "white" }}
    >
      {pending ? "Sending…" : "Send RSVP"}
    </button>
  );
}

const inputClassName =
  "w-full px-4 py-3 text-sm font-sans outline-none transition-colors duration-200 rounded-sm";

function RsvpModal({ onClose }: { onClose: () => void }) {
  const [state, formAction, isPending] = useActionState(submitRsvp, rsvpInitialState);
  const showSuccess = state.ok;
  const [attendance, setAttendance] = useState("");
  const [additionalGuests, setAdditionalGuests] = useState(0);
  const errorFields = new Set(state.errorFields ?? []);
  const fieldError = (key: string) => errorFields.has(key);
  const inputBorderClass = (key: string) =>
    fieldError(key)
      ? "border-2 border-red-600 focus:border-red-600"
      : "border border-[rgba(59,110,165,0.25)] focus:border-[var(--blue-primary)]";

  useEffect(() => {
    if (attendance === "no") {
      setAdditionalGuests(0);
    }
  }, [attendance]);

  return (
    <motion.div
      className="fixed inset-0 z-[999] flex items-center justify-center px-4 py-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      <motion.div
        className="absolute inset-0"
        style={{ background: "rgba(8,12,28,0.72)", backdropFilter: "blur(6px)" }}
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />

      <motion.div
        className="relative z-10 w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-sm shadow-2xl"
        style={{ background: "var(--cream)", border: "1px solid rgba(59,110,165,0.15)" }}
        initial={{ opacity: 0, scale: 0.94, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 24 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <div className="absolute top-4 left-4 w-8 h-8 border-t border-l pointer-events-none" style={{ borderColor: "var(--gold-accent)" }} />
        <div className="absolute top-4 right-4 w-8 h-8 border-t border-r pointer-events-none" style={{ borderColor: "var(--gold-accent)" }} />
        <div className="absolute bottom-4 left-4 w-8 h-8 border-b border-l pointer-events-none" style={{ borderColor: "var(--gold-accent)" }} />
        <div className="absolute bottom-4 right-4 w-8 h-8 border-b border-r pointer-events-none" style={{ borderColor: "var(--gold-accent)" }} />

        <button
          onClick={onClose}
          aria-label="Close RSVP"
          className="absolute top-5 right-5 z-10 flex h-8 w-8 items-center justify-center rounded-full transition-colors duration-200 hover:bg-black/10"
          style={{ color: "var(--text-muted)" }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M2 2L14 14M14 2L2 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>

        <div className="px-8 pt-10 pb-10 md:px-12">
          <div className="text-center mb-8">
            <p
              className="font-serif text-xs tracking-[0.3em] uppercase mb-2"
              style={{ color: "var(--gold-accent)" }}
            >
              Kindly reply by on or before April 30, 2026
            </p>
            <h2
              className="font-script"
              style={{ fontSize: "clamp(2.2rem, 6vw, 3.5rem)", color: "var(--blue-primary)" }}
            >
              RSVP
            </h2>
            <div className="section-divider mt-4 mx-auto" style={{ maxWidth: "160px" }} />
            <p
              className="font-sans text-sm mt-4 leading-relaxed"
              style={{ color: "var(--text-muted)" }}
            >
              We would love to have you celebrate this special day with us.
            </p>
          </div>

          {showSuccess ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-8"
            >
              <div className="mb-4">
                <svg className="mx-auto" width="56" height="56" viewBox="0 0 56 56" fill="none">
                  <circle cx="28" cy="28" r="27" stroke="#3b6ea5" strokeWidth="1.5" />
                  <path d="M16 28 L24 36 L40 20" stroke="#3b6ea5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h3 className="font-script mb-3" style={{ fontSize: "2.5rem", color: "var(--blue-primary)" }}>
                Thank You!
              </h3>
              <p className="font-sans text-sm" style={{ color: "var(--text-muted)" }}>
                We&apos;ve received your RSVP. We can&apos;t wait to celebrate with you!
              </p>
              <button
                onClick={onClose}
                className="mt-6 px-8 py-2.5 font-serif text-sm tracking-[0.2em] uppercase transition-all duration-300 hover:opacity-90"
                style={{ background: "var(--blue-primary)", color: "white" }}
              >
                Close
              </button>
            </motion.div>
          ) : (
            <form action={formAction} className="space-y-5">
              {state.error ? (
                <p className="font-sans text-sm text-red-700 text-center" role="alert">
                  {state.error}
                </p>
              ) : null}

              <div>
                <label
                  className="block font-sans text-xs tracking-widest uppercase mb-2"
                  style={{ color: "var(--text-muted)" }}
                  htmlFor="rsvp-full-name"
                >
                  Full Name *
                </label>
                <input
                  id="rsvp-full-name"
                  name="full_name"
                  type="text"
                  required
                  placeholder="Your full name"
                  aria-invalid={fieldError("full_name")}
                  className={`${inputClassName} ${inputBorderClass("full_name")}`}
                  style={{
                    background: "var(--blue-pale)",
                    color: "var(--text-dark)",
                  }}
                />
              </div>

              <div>
                <label
                  className="block font-sans text-xs tracking-widest uppercase mb-2"
                  style={{ color: "var(--text-muted)" }}
                  htmlFor="rsvp-attendance"
                >
                  Attendance *
                </label>
                <select
                  id="rsvp-attendance"
                  name="attendance"
                  required
                  value={attendance}
                  onChange={(e) => setAttendance(e.target.value)}
                  aria-invalid={fieldError("attendance")}
                  className={`${inputClassName} appearance-none cursor-pointer ${inputBorderClass("attendance")}`}
                  style={{
                    background: "var(--blue-pale)",
                    color: "var(--text-dark)",
                  }}
                >
                  <option value="" disabled>
                    Select your response
                  </option>
                  <option value="yes">Joyfully accepts</option>
                  <option value="no">Regretfully declines</option>
                </select>
              </div>

              {attendance === "no" || attendance === "" ? (
                <input type="hidden" name="additional_guests" value="0" />
              ) : (
                <div>
                  <label
                    className="block font-sans text-xs tracking-widest uppercase mb-2"
                    style={{ color: "var(--text-muted)" }}
                    htmlFor="rsvp-additional-guests"
                  >
                    Additional guests
                  </label>
                  <p className="mb-2 font-sans text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>
                    You may bring a maximum of 1 guest (+1). Use 0 if you are attending alone.
                  </p>
                  <select
                    id="rsvp-additional-guests"
                    name="additional_guests"
                    required
                    value={additionalGuests}
                    onChange={(e) => {
                      const n = Number.parseInt(e.target.value, 10);
                      setAdditionalGuests(Number.isFinite(n) ? Math.max(0, Math.min(MAX_ADDITIONAL_GUESTS, n)) : 0);
                    }}
                    aria-invalid={fieldError("additional_guests")}
                    className={`${inputClassName} appearance-none cursor-pointer ${inputBorderClass("additional_guests")}`}
                    style={{
                      background: "var(--blue-pale)",
                      color: "var(--text-dark)",
                    }}
                  >
                    <option value={0}>0 — Attending alone</option>
                    <option value={1}>1 — Plus one (+1)</option>
                  </select>
                </div>
              )}

              {attendance === "yes" && additionalGuests > 0
                ? Array.from({ length: additionalGuests }, (_, i) => (
                    <div key={i}>
                      <label
                        className="block font-sans text-xs tracking-widest uppercase mb-2"
                        style={{ color: "var(--text-muted)" }}
                        htmlFor={`rsvp-guest-name-${i}`}
                      >
                        Guest {i + 1} full name *
                      </label>
                      <input
                        id={`rsvp-guest-name-${i}`}
                        name={`guest_name_${i}`}
                        type="text"
                        required
                        placeholder="Full name"
                        aria-invalid={fieldError(`guest_name_${i}`)}
                        className={`${inputClassName} ${inputBorderClass(`guest_name_${i}`)}`}
                        style={{
                          background: "var(--blue-pale)",
                          color: "var(--text-dark)",
                        }}
                      />
                    </div>
                  ))
                : null}

              <div>
                <label
                  className="block font-sans text-xs tracking-widest uppercase mb-2"
                  style={{ color: "var(--text-muted)" }}
                  htmlFor="rsvp-message"
                >
                  Message (Optional)
                </label>
                <textarea
                  id="rsvp-message"
                  name="message"
                  rows={3}
                  placeholder="Share a message with the couple..."
                  aria-invalid={fieldError("message")}
                  className={`${inputClassName} resize-none ${inputBorderClass("message")}`}
                  style={{
                    background: "var(--blue-pale)",
                    color: "var(--text-dark)",
                  }}
                />
              </div>

              <SubmitButton pending={isPending} />
            </form>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function RsvpSection() {
  const [open, setOpen] = useState(false);

  const openModal = useCallback(() => setOpen(true), []);

  useEffect(() => {
    window.addEventListener("open-rsvp", openModal);
    return () => window.removeEventListener("open-rsvp", openModal);
  }, [openModal]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  function handleClose() {
    setOpen(false);
  }

  return (
    <>
      <div id="rsvp" aria-hidden />

      <AnimatePresence>
        {open ? <RsvpModal onClose={handleClose} /> : null}
      </AnimatePresence>
    </>
  );
}
