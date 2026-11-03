import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { RsvpGuestRow, RsvpWithGuests } from "@/types/dashboard-rsvp";

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return iso;
  }
}

function truncateMessage(text: string | null, max = 72) {
  if (!text) return "—";
  const t = text.trim();
  if (t.length <= max) return t;
  return `${t.slice(0, max)}…`;
}

function sortedGuests(guests: RsvpGuestRow[] | null) {
  if (!guests?.length) return [];
  return [...guests].sort((a, b) => a.sort_order - b.sort_order);
}

function StatCard({
  label,
  value,
  sub,
}: {
  label: string;
  value: string | number;
  sub?: string;
}) {
  return (
    <div
      className="rounded-sm border border-[rgba(59,110,165,0.12)] p-5 shadow-sm"
      style={{ background: "var(--blue-pale)" }}
    >
      <div className="mb-1 h-px w-10 bg-[var(--gold-accent)]" aria-hidden />
      <p className="mt-3 font-serif text-xs tracking-[0.2em] uppercase" style={{ color: "var(--text-muted)" }}>
        {label}
      </p>
      <p className="mt-2 font-serif text-3xl tabular-nums" style={{ color: "var(--blue-primary)" }}>
        {value}
      </p>
      {sub ? (
        <p className="mt-1 font-sans text-xs" style={{ color: "var(--text-muted)" }}>
          {sub}
        </p>
      ) : null}
    </div>
  );
}

export default async function DashboardPage() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data, error } = await supabase
    .from("rsvps")
    .select("*, rsvp_guests(*)")
    .order("created_at", { ascending: false });

  const rows = (data ?? []) as RsvpWithGuests[];

  const totalResponses = rows.length;
  const attendingCount = rows.filter((r) => r.attendance === "yes").length;
  const declinedCount = rows.filter((r) => r.attendance === "no").length;
  const totalHeadsYes = rows
    .filter((r) => r.attendance === "yes")
    .reduce((sum, r) => sum + r.guest_count, 0);

  return (
    <div>
      <div className="mb-10">
        <p className="font-serif text-xs tracking-[0.3em] uppercase" style={{ color: "var(--gold-accent)" }}>
          Overview
        </p>
        <div className="section-divider mt-3 !mx-0" style={{ maxWidth: "80px" }} />
      </div>

      {error ? (
        <p className="font-sans text-sm text-red-700" role="alert">
          Could not load RSVPs. Check database policies and try again.
        </p>
      ) : null}

      <div className="mb-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total responses" value={totalResponses} />
        <StatCard label="Attending (RSVPs)" value={attendingCount} sub="Joyfully accepts" />
        <StatCard label="Declined" value={declinedCount} />
        <StatCard label="Total guests (heads)" value={totalHeadsYes} sub="If attending" />
      </div>

      <div className="mb-4 flex items-end justify-between gap-4">
        <div>
          <h2 className="font-serif text-lg sm:text-xl" style={{ color: "var(--blue-secondary)" }}>
            All responses
          </h2>
          <p className="mt-1 font-sans text-sm" style={{ color: "var(--text-muted)" }}>
            Newest first
          </p>
        </div>
      </div>

      {rows.length === 0 ? (
        <div
          className="rounded-sm border border-dashed border-[rgba(59,110,165,0.25)] px-6 py-16 text-center"
          style={{ background: "var(--blue-pale)" }}
        >
          <p className="font-serif text-lg italic" style={{ color: "var(--blue-secondary)" }}>
            No RSVPs yet
          </p>
          <p className="mt-2 font-sans text-sm" style={{ color: "var(--text-muted)" }}>
            Responses from your invitation will appear here.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-sm border border-[rgba(59,110,165,0.12)] shadow-sm" style={{ background: "var(--cream)" }}>
          <table className="w-full min-w-[720px] border-collapse text-left text-sm">
            <thead>
              <tr style={{ background: "var(--cream-dark)" }}>
                <th className="border-b border-[rgba(59,110,165,0.12)] px-4 py-3 font-serif text-xs tracking-widest uppercase" style={{ color: "var(--text-muted)" }}>
                  Date
                </th>
                <th className="border-b border-[rgba(59,110,165,0.12)] px-4 py-3 font-serif text-xs tracking-widest uppercase" style={{ color: "var(--text-muted)" }}>
                  Name
                </th>
                <th className="border-b border-[rgba(59,110,165,0.12)] px-4 py-3 font-serif text-xs tracking-widest uppercase" style={{ color: "var(--text-muted)" }}>
                  Response
                </th>
                <th className="border-b border-[rgba(59,110,165,0.12)] px-4 py-3 font-serif text-xs tracking-widest uppercase" style={{ color: "var(--text-muted)" }}>
                  Party
                </th>
                <th className="border-b border-[rgba(59,110,165,0.12)] px-4 py-3 font-serif text-xs tracking-widest uppercase" style={{ color: "var(--text-muted)" }}>
                  Guests
                </th>
                <th className="border-b border-[rgba(59,110,165,0.12)] px-4 py-3 font-serif text-xs tracking-widest uppercase" style={{ color: "var(--text-muted)" }}>
                  Message
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => {
                const guests = sortedGuests(row.rsvp_guests);
                const guestLine = guests.length ? guests.map((g) => g.full_name).join(", ") : "—";
                const yes = row.attendance === "yes";
                return (
                  <tr key={row.id} className="border-b border-[rgba(59,110,165,0.08)] last:border-0">
                    <td className="whitespace-nowrap px-4 py-3 font-sans text-xs" style={{ color: "var(--text-muted)" }}>
                      {formatDate(row.created_at)}
                    </td>
                    <td className="max-w-[160px] px-4 py-3 font-sans" style={{ color: "var(--text-dark)" }}>
                      {row.full_name}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3">
                      <span
                        className="inline-block rounded-sm px-2 py-0.5 font-sans text-xs tracking-wide uppercase"
                        style={{
                          background: yes ? "rgba(59,110,165,0.12)" : "rgba(107,114,128,0.15)",
                          color: yes ? "var(--blue-secondary)" : "var(--text-muted)",
                        }}
                      >
                        {yes ? "Attending" : "Declined"}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 font-sans tabular-nums" style={{ color: "var(--text-dark)" }}>
                      {row.guest_count}
                    </td>
                    <td className="max-w-[200px] px-4 py-3 font-sans text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>
                      {guestLine}
                    </td>
                    <td className="max-w-[220px] px-4 py-3 font-sans text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>
                      {truncateMessage(row.message)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
