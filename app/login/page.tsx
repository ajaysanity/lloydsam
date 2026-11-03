import Link from "next/link";
import { LoginForm } from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <main
      className="relative flex min-h-screen flex-col items-center justify-center px-4 py-12"
      style={{ background: "linear-gradient(180deg, var(--blue-pale) 0%, var(--cream) 45%, var(--cream-dark) 100%)" }}
    >
      <div
        className="relative w-full max-w-md rounded-sm px-8 py-10 shadow-xl md:px-10 md:py-12"
        style={{
          background: "var(--cream)",
          border: "1px solid rgba(59,110,165,0.15)",
        }}
      >
        <div
          className="pointer-events-none absolute top-4 left-4 h-8 w-8 border-t border-l"
          style={{ borderColor: "var(--gold-accent)" }}
        />
        <div
          className="pointer-events-none absolute top-4 right-4 h-8 w-8 border-t border-r"
          style={{ borderColor: "var(--gold-accent)" }}
        />
        <div
          className="pointer-events-none absolute bottom-4 left-4 h-8 w-8 border-b border-l"
          style={{ borderColor: "var(--gold-accent)" }}
        />
        <div
          className="pointer-events-none absolute right-4 bottom-4 h-8 w-8 border-r border-b"
          style={{ borderColor: "var(--gold-accent)" }}
        />

        <div className="mb-8 text-center">
          <p
            className="mb-2 font-serif text-xs tracking-[0.3em] uppercase"
            style={{ color: "var(--gold-accent)" }}
          >
            Lloyd &amp; Sam
          </p>
          <h1 className="font-script" style={{ fontSize: "clamp(2.2rem, 6vw, 3rem)", color: "var(--blue-primary)" }}>
            RSVP dashboard
          </h1>
          <div className="section-divider mx-auto mt-4" style={{ maxWidth: "120px" }} />
          <p className="mt-4 font-sans text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
            Sign in to view guest responses.
          </p>
        </div>

        <LoginForm />

        <p className="mt-8 text-center font-sans text-xs" style={{ color: "var(--text-muted)" }}>
          <Link href="/" className="underline underline-offset-2 hover:opacity-80" style={{ color: "var(--blue-secondary)" }}>
            Back to invitation
          </Link>
        </p>
      </div>
    </main>
  );
}
