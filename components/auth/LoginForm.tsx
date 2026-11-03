"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

const inputClassName =
  "w-full px-4 py-3 text-sm font-sans outline-none transition-colors duration-200 rounded-sm border border-[rgba(59,110,165,0.25)] focus:border-[var(--blue-primary)]";

export function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setPending(true);
    const form = e.currentTarget;
    const fd = new FormData(form);
    const email = (fd.get("email") as string)?.trim();
    const password = fd.get("password") as string;

    if (!email || !password) {
      setPending(false);
      setError("Please enter email and password.");
      return;
    }

    const supabase = createSupabaseBrowserClient();
    const { error: signError } = await supabase.auth.signInWithPassword({ email, password });
    setPending(false);

    if (signError) {
      setError(signError.message);
      return;
    }

    router.replace("/dashboard");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error ? (
        <p className="font-sans text-sm text-red-700 text-center" role="alert">
          {error}
        </p>
      ) : null}

      <div>
        <label
          className="block font-sans text-xs tracking-widest uppercase mb-2"
          style={{ color: "var(--text-muted)" }}
          htmlFor="login-email"
        >
          Email
        </label>
        <input
          id="login-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          className={inputClassName}
          style={{ background: "var(--blue-pale)", color: "var(--text-dark)" }}
        />
      </div>

      <div>
        <label
          className="block font-sans text-xs tracking-widest uppercase mb-2"
          style={{ color: "var(--text-muted)" }}
          htmlFor="login-password"
        >
          Password
        </label>
        <input
          id="login-password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className={inputClassName}
          style={{ background: "var(--blue-pale)", color: "var(--text-dark)" }}
        />
      </div>

      <button
        type="submit"
        disabled={pending}
        className="w-full py-3 font-serif text-sm tracking-[0.2em] uppercase transition-all duration-300 hover:opacity-90 active:scale-[0.99] disabled:opacity-60 disabled:pointer-events-none"
        style={{ background: "var(--blue-primary)", color: "white" }}
      >
        {pending ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
