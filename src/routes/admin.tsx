import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { supabase, isAdminUser, fetchBookingEnquiries, updateBookingStatus } from "@/lib/supabase";
import { Section } from "@/components/section";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin — Udawalawe Wild" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminPage,
});

function AdminPage() {
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);
  const [checking, setChecking] = useState(true);
  const [bookings, setBookings] = useState<any[]>([]);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    async function init() {
      if (!supabase) {
        setChecking(false);
        setLoading(false);
        setAuthorized(false);
        return;
      }

      try {
        const { data: sessionData } = await supabase.auth.getSession();
        const user = sessionData.session?.user ?? null;
        const isAdmin = await isAdminUser(user);

        if (!active) {
          return;
        }

        setAuthorized(isAdmin);
        if (isAdmin) {
          const rows = await fetchBookingEnquiries();
          setBookings(rows);
        }
      } catch (error) {
        console.error(error);
        if (active) {
          setAuthorized(false);
        }
      } finally {
        if (active) {
          setLoading(false);
          setChecking(false);
        }
      }
    }

    void init();

    return () => {
      active = false;
    };
  }, []);

  const handleSignIn = async () => {
    if (!supabase) {
      setMessage("Supabase is not configured.");
      return;
    }

    setMessage(null);
    const { error } = await supabase.auth.signInWithOtp({
      email: window.prompt("Enter the admin email") ?? "",
      options: { emailRedirectTo: `${window.location.origin}/admin` },
    });

    if (error) {
      setMessage(error.message);
      return;
    }

    setMessage("Magic link sent. Check your inbox and return here.");
  };

  const handleStatusChange = async (id: string, status: string) => {
    try {
      await updateBookingStatus(id, status);
      setBookings((current) => current.map((row) => (row.id === id ? { ...row, status } : row)));
      setMessage("Booking updated.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Unable to update booking.");
    }
  };

  const stats = useMemo(() => {
    return {
      total: bookings.length,
      newCount: bookings.filter((row) => row.status === "new").length,
      quoted: bookings.filter((row) => row.status === "quoted").length,
      confirmed: bookings.filter((row) => row.status === "confirmed").length,
    };
  }, [bookings]);

  if (loading || checking) {
    return <Section><div className="mx-auto max-w-5xl text-sm text-muted-foreground">Loading admin workspace…</div></Section>;
  }

  if (!authorized) {
    return (
      <Section>
        <div className="mx-auto max-w-xl rounded-sm border border-border bg-card p-8 text-center">
          <div className="text-xs uppercase tracking-[0.3em] text-[color:var(--terracotta)]">Protected area</div>
          <h1 className="mt-3 font-serif text-3xl text-foreground">Admin access required</h1>
          <p className="mt-3 text-sm text-muted-foreground">
            Sign in with a verified admin email to view bookings and update status.
          </p>
          <button
            type="button"
            onClick={handleSignIn}
            className="mt-6 rounded-sm bg-primary px-5 py-3 text-sm font-medium text-primary-foreground"
          >
            Send magic link
          </button>
          {message && <p className="mt-4 text-sm text-muted-foreground">{message}</p>}
          <p className="mt-6 text-xs text-muted-foreground">
            <Link to="/" className="text-primary underline-offset-4 hover:underline">Return home</Link>
          </p>
        </div>
      </Section>
    );
  }

  return (
    <Section>
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="text-xs uppercase tracking-[0.3em] text-[color:var(--terracotta)]">Admin dashboard</div>
            <h1 className="mt-2 font-serif text-3xl text-foreground">Bookings and enquiries</h1>
          </div>
          <button
            type="button"
            onClick={async () => {
              await supabase?.auth.signOut();
              window.location.reload();
            }}
            className="rounded-sm border border-border px-4 py-2 text-sm"
          >
            Sign out
          </button>
        </div>

        {message && <div className="mt-4 rounded-sm border border-border bg-background/80 p-3 text-sm text-muted-foreground">{message}</div>}

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <div className="rounded-sm border border-border bg-card p-4">
            <div className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Total</div>
            <div className="mt-2 text-2xl font-semibold text-foreground">{stats.total}</div>
          </div>
          <div className="rounded-sm border border-border bg-card p-4">
            <div className="text-xs uppercase tracking-[0.25em] text-muted-foreground">New</div>
            <div className="mt-2 text-2xl font-semibold text-foreground">{stats.newCount}</div>
          </div>
          <div className="rounded-sm border border-border bg-card p-4">
            <div className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Confirmed</div>
            <div className="mt-2 text-2xl font-semibold text-foreground">{stats.confirmed}</div>
          </div>
        </div>

        <div className="mt-8 overflow-hidden rounded-sm border border-border bg-card">
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-muted/60 text-left text-xs uppercase tracking-[0.2em] text-muted-foreground">
                <tr>
                  <th className="px-4 py-3">Guest</th>
                  <th className="px-4 py-3">Trip</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Updated</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((row) => (
                  <tr key={row.id} className="border-t border-border/70 align-top">
                    <td className="px-4 py-3">
                      <div className="font-medium text-foreground">{row.guest_name}</div>
                      <div className="mt-1 text-xs text-muted-foreground">{row.guest_email}</div>
                      <div className="mt-1 text-xs text-muted-foreground">{row.guest_whatsapp}</div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-xs text-muted-foreground">{row.safari_date ?? "—"}</div>
                      <div className="text-xs text-muted-foreground">{row.safari_type ?? "—"}</div>
                      <div className="text-xs text-muted-foreground">{row.pickup_location ?? "—"}</div>
                    </td>
                    <td className="px-4 py-3">
                      <select
                        value={row.status ?? "new"}
                        onChange={(e) => void handleStatusChange(row.id, e.target.value)}
                        className="rounded-sm border border-input bg-background px-3 py-2 text-sm"
                      >
                        <option value="new">New</option>
                        <option value="reviewing">Reviewing</option>
                        <option value="quoted">Quoted</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="cancelled">Cancelled</option>
                        <option value="archived">Archived</option>
                      </select>
                    </td>
                    <td className="px-4 py-3 text-xs text-muted-foreground">{row.updated_at ?? row.created_at ?? "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Section>
  );
}
