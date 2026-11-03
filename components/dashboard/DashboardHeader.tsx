"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { createSupabaseBrowserClient } from "@/lib/supabase-auth/client";

export function DashboardHeader() {
  const router = useRouter();

  async function handleLogout() {
    const supabase = createSupabaseBrowserClient();
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  }

  return (
    <header
      className="border-b border-[rgba(59,110,165,0.12)]"
      style={{ background: "var(--cream-dark)" }}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <div>
          <p className="font-serif text-[10px] tracking-[0.25em] uppercase" style={{ color: "var(--gold-accent)" }}>
            Lloyd &amp; Sam
          </p>
          <h1 className="font-script text-2xl sm:text-3xl" style={{ color: "var(--blue-primary)" }}>
            RSVP dashboard
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="font-sans text-xs tracking-widest uppercase underline-offset-2 hover:underline"
            style={{ color: "var(--blue-secondary)" }}
          >
            Invitation
          </Link>
          <button
            type="button"
            onClick={handleLogout}
            className="rounded-sm px-4 py-2 font-serif text-xs tracking-[0.15em] uppercase transition-opacity hover:opacity-90"
            style={{ background: "var(--blue-primary)", color: "white" }}
          >
            Log out
          </button>
        </div>
      </div>
    </header>
  );
}
