import { createFileRoute } from "@tanstack/react-router";
import { TransitionLink as Link } from "@/components/transition-link";
import { useEffect, useState } from "react";
import {
  signIn,
  signOut,
  getSession,
  getCurrentRole,
  fetchBookingsForRole,
  fetchLoginLogs,
  type AdminRole,
  type LoginLogEntry,
} from "@/lib/auth";
import { fetchGeoInfo } from "@/lib/geo";
import type { BookingEnquiryRow } from "@/lib/supabase";
import {
  Activity,
  AlertCircle,
  Check,
  ChevronDown,
  Download,
  Globe,
  Loader2,
  LogOut,
  Monitor,
  RefreshCcw,
  Search,
  Shield,
  ShieldAlert,
  X,
} from "lucide-react";

export const Route = createFileRoute("/superadmin")({
  head: () => ({
    meta: [
      { title: "Super Admin — Udawalawe Wild" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: SuperAdminPage,
});

/* ─── Types ──────────────────────────────────────────────── */

type Booking = BookingEnquiryRow & { id: string };

/* ─── Helpers ────────────────────────────────────────────── */

function formatDate(s?: string | null) {
  if (!s) return "—";
  try {
    return new Intl.DateTimeFormat("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(s));
  } catch {
    return s;
  }
}

function shortDate(s?: string | null) {
  if (!s) return "—";
  try {
    return new Intl.DateTimeFormat("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }).format(new Date(s));
  } catch {
    return s;
  }
}

function exportCsv<T extends Record<string, unknown>>(rows: T[], filename: string) {
  if (!rows.length) return;
  const headers = Object.keys(rows[0]);
  const lines = [
    headers.join(","),
    ...rows.map((r) =>
      headers
        .map((h) => `"${String(r[h] ?? "").replace(/"/g, '""')}"`)
        .join(","),
    ),
  ];
  const blob = new Blob([lines.join("\n")], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${filename}-${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

/* ─── Login screen (same component reused) ───────────────── */

function LoginScreen({ onSuccess }: { onSuccess: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const geo = await fetchGeoInfo();
      const result = await signIn(email.trim().toLowerCase(), password, geo);
      if (result.ok && result.role === "superadmin") {
        onSuccess();
      } else if (result.ok && result.role !== "superadmin") {
        await signOut();
        setError("Superadmin access required. Your account does not have this permission.");
      } else {
        setError(result.error ?? "Sign in failed.");
      }
    } catch {
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 px-4">
      <div className="w-full max-w-sm">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-md">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/15 text-amber-400">
            <ShieldAlert className="h-6 w-6" />
          </div>
          <h1 className="mt-5 font-serif text-2xl text-white">Super Admin</h1>
          <p className="mt-1.5 text-sm text-white/50">
            Restricted access. All activity is recorded.
          </p>

          <form onSubmit={(e) => void handleSubmit(e)} className="mt-6 space-y-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Superadmin email"
              autoComplete="email"
              required
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              autoComplete="current-password"
              required
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
            />

            {error && (
              <div className="flex items-start gap-1.5 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-xs text-red-400">
                <AlertCircle className="h-3.5 w-3.5 mt-0.5 shrink-0" />
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-amber-500 py-3 text-sm font-semibold text-gray-950 transition hover:bg-amber-400 disabled:opacity-60"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Authenticating…
                </span>
              ) : (
                "Sign in as Superadmin"
              )}
            </button>
          </form>

          <Link
            to="/admin"
            className="mt-5 block text-center text-xs text-white/30 hover:text-white/60"
          >
            ← Admin panel
          </Link>
        </div>
        <p className="mt-4 text-center text-[10px] text-white/20">
          All login attempts are logged with IP address, location, and device fingerprint.
        </p>
      </div>
    </div>
  );
}

/* ─── Login log table ────────────────────────────────────── */

function LoginLogsTable({ logs }: { logs: LoginLogEntry[] }) {
  const [search, setSearch] = useState("");

  const filtered = logs.filter((l) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      l.email?.toLowerCase().includes(q) ||
      l.login_ip?.toLowerCase().includes(q) ||
      l.login_country?.toLowerCase().includes(q) ||
      l.login_city?.toLowerCase().includes(q) ||
      l.user_agent?.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-3">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30" />
        <input
          type="search"
          placeholder="Search email, IP, country, city…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-xl border border-white/10 bg-white/5 py-2.5 pl-9 pr-4 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-amber-500/40"
        />
      </div>

      <div className="overflow-hidden rounded-xl border border-white/10 bg-white/5">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="border-b border-white/10 text-left">
              <tr>
                {["Time", "Email", "Role", "Result", "IP Address", "Country", "City", "Browser"].map(
                  (h) => (
                    <th
                      key={h}
                      className="px-4 py-3 text-[10px] font-semibold uppercase tracking-widest text-white/40"
                    >
                      {h}
                    </th>
                  ),
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-4 py-8 text-center text-sm text-white/30">
                    No logs found.
                  </td>
                </tr>
              ) : (
                filtered.map((log) => (
                  <tr key={log.id} className="align-top hover:bg-white/5 transition-colors">
                    <td className="px-4 py-3 whitespace-nowrap text-xs text-white/60">
                      {formatDate(log.created_at)}
                    </td>
                    <td className="px-4 py-3 text-sm text-white/90 max-w-[180px] truncate">
                      {log.email}
                    </td>
                    <td className="px-4 py-3">
                      {log.role ? (
                        <span className="rounded-full border border-amber-500/30 bg-amber-500/10 px-2 py-0.5 text-xs font-medium text-amber-400">
                          {log.role}
                        </span>
                      ) : (
                        <span className="text-xs text-white/30">—</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      {log.success ? (
                        <span className="flex items-center gap-1 text-xs font-medium text-emerald-400">
                          <Check className="h-3 w-3" /> Success
                        </span>
                      ) : (
                        <span
                          className="flex items-center gap-1 text-xs font-medium text-red-400"
                          title={log.failure_reason ?? undefined}
                        >
                          <X className="h-3 w-3" /> Failed
                        </span>
                      )}
                      {log.failure_reason && (
                        <div className="mt-0.5 text-[10px] text-red-400/70 max-w-[140px] truncate">
                          {log.failure_reason}
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <span className="font-mono text-xs text-amber-300/80">{log.login_ip ?? "—"}</span>
                    </td>
                    <td className="px-4 py-3 text-xs text-white/70">
                      {log.login_country ?? "—"}
                      {log.login_country_code && (
                        <span className="ml-1 text-white/30">({log.login_country_code})</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-xs text-white/60">{log.login_city ?? "—"}</td>
                    <td className="px-4 py-3 max-w-[200px]">
                      <span
                        className="block truncate text-[10px] text-white/30"
                        title={log.user_agent ?? undefined}
                      >
                        {log.user_agent ?? "—"}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      <div className="text-right text-xs text-white/30">
        {filtered.length} of {logs.length} log entries
      </div>
    </div>
  );
}

/* ─── Bookings table (full data) ─────────────────────────── */

function BookingsTable({ bookings }: { bookings: Booking[] }) {
  const [search, setSearch] = useState("");
  const filtered = bookings.filter((b) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      b.guest_name?.toLowerCase().includes(q) ||
      b.guest_email?.toLowerCase().includes(q) ||
      b.guest_ip?.toLowerCase().includes(q) ||
      b.guest_country?.toLowerCase().includes(q) ||
      b.guest_city?.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-3">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30" />
        <input
          type="search"
          placeholder="Search name, email, IP, country, city…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-xl border border-white/10 bg-white/5 py-2.5 pl-9 pr-4 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-amber-500/40"
        />
      </div>

      <div className="overflow-hidden rounded-xl border border-white/10 bg-white/5">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="border-b border-white/10 text-left">
              <tr>
                {[
                  "Guest",
                  "Email",
                  "Country",
                  "Country Code",
                  "IP Address",
                  "City",
                  "Safari Date",
                  "Safari Type",
                  "Party",
                  "Status",
                  "Booked At",
                ].map((h) => (
                  <th
                    key={h}
                    className="px-4 py-3 text-[10px] font-semibold uppercase tracking-widest text-white/40"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={11} className="px-4 py-8 text-center text-sm text-white/30">
                    No bookings found.
                  </td>
                </tr>
              ) : (
                filtered.map((b) => (
                  <tr key={b.id} className="align-middle hover:bg-white/5 transition-colors">
                    <td className="px-4 py-3 font-medium text-white/90">{b.guest_name}</td>
                    <td className="px-4 py-3 text-xs text-white/60 max-w-[160px] truncate">
                      {b.guest_email}
                    </td>
                    <td className="px-4 py-3 text-xs text-white/70">{b.guest_country ?? "—"}</td>
                    <td className="px-4 py-3 text-xs text-white/50">{b.guest_country_code ?? "—"}</td>
                    <td className="px-4 py-3">
                      <span className="font-mono text-xs text-amber-300/80">{b.guest_ip ?? "—"}</span>
                    </td>
                    <td className="px-4 py-3 text-xs text-white/60">{b.guest_city ?? "—"}</td>
                    <td className="px-4 py-3 text-xs text-white/60 whitespace-nowrap">
                      {shortDate(b.safari_date)}
                    </td>
                    <td className="px-4 py-3">
                      <span className="rounded-md bg-white/10 px-2 py-0.5 text-xs font-medium text-white/70">
                        {b.safari_type ?? "—"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs text-white/60 whitespace-nowrap">
                      {b.adults}A {b.children > 0 ? `+${b.children}C` : ""}
                    </td>
                    <td className="px-4 py-3">
                      <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-xs capitalize text-white/60">
                        {b.status ?? "new"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs text-white/40 whitespace-nowrap">
                      {shortDate(b.created_at)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      <div className="text-right text-xs text-white/30">
        {filtered.length} of {bookings.length} bookings (IP addresses visible)
      </div>
    </div>
  );
}

/* ─── Main page ──────────────────────────────────────────── */

function SuperAdminPage() {
  const [initLoading, setInitLoading] = useState(true);
  const [authed, setAuthed] = useState(false);
  const [activeTab, setActiveTab] = useState<"bookings" | "logs">("logs");
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [logs, setLogs] = useState<LoginLogEntry[]>([]);
  const [dataLoading, setDataLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  /* Session restore */
  useEffect(() => {
    async function init() {
      const session = await getSession();
      if (session) {
        const role = await getCurrentRole();
        if (role === "superadmin") {
          setAuthed(true);
          await loadData();
        }
      }
      setInitLoading(false);
    }
    void init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadData = async () => {
    setDataLoading(true);
    try {
      const [b, l] = await Promise.all([
        fetchBookingsForRole("superadmin"),
        fetchLoginLogs(),
      ]);
      setBookings(b as Booking[]);
      setLogs(l);
    } finally {
      setDataLoading(false);
    }
  };

  const handleLoginSuccess = async () => {
    setAuthed(true);
    await loadData();
  };

  const handleSignOut = async () => {
    await signOut();
    setAuthed(false);
    setBookings([]);
    setLogs([]);
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  };

  if (initLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-950">
        <Loader2 className="h-6 w-6 animate-spin text-amber-400" />
      </div>
    );
  }

  if (!authed) {
    return <LoginScreen onSuccess={() => void handleLoginSuccess()} />;
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Header */}
      <div className="border-b border-white/10 bg-gray-900/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-5 py-4 sm:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-500/15 text-amber-400">
              <ShieldAlert className="h-5 w-5" />
            </div>
            <div>
              <div className="text-[10px] font-semibold uppercase tracking-widest text-white/40">
                Udawalawe Wild
              </div>
              <h1 className="font-serif text-xl text-white">Super Admin</h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="rounded-full border border-amber-500/30 bg-amber-500/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest text-amber-400">
              Superadmin
            </span>
            <button
              type="button"
              onClick={() => void handleRefresh()}
              disabled={refreshing}
              className="flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-3.5 py-2 text-xs font-medium text-white/70 transition hover:bg-white/10 disabled:opacity-60"
            >
              <RefreshCcw className={`h-3.5 w-3.5 ${refreshing ? "animate-spin" : ""}`} />
              Refresh
            </button>
            <button
              type="button"
              onClick={() =>
                activeTab === "bookings"
                  ? exportCsv(bookings as unknown as Record<string, unknown>[], "bookings-full")
                  : exportCsv(logs as unknown as Record<string, unknown>[], "login-logs")
              }
              className="flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-3.5 py-2 text-xs font-medium text-white/70 transition hover:bg-white/10"
            >
              <Download className="h-3.5 w-3.5" />
              Export CSV
            </button>
            <Link
              to="/admin"
              className="rounded-xl border border-white/10 bg-white/5 px-3.5 py-2 text-xs font-medium text-white/70 transition hover:bg-white/10"
            >
              Admin panel
            </Link>
            <button
              type="button"
              onClick={() => void handleSignOut()}
              className="flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-3.5 py-2 text-xs font-medium text-white/70 transition hover:bg-red-500/20 hover:border-red-500/30 hover:text-red-400"
            >
              <LogOut className="h-3.5 w-3.5" />
              Sign out
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="mx-auto flex max-w-7xl gap-1 px-5 sm:px-8">
          {(
            [
              { key: "logs", label: "Login Audit Logs", icon: Activity },
              { key: "bookings", label: "All Bookings (with IP)", icon: Globe },
            ] as const
          ).map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              type="button"
              onClick={() => setActiveTab(key)}
              className={`flex items-center gap-1.5 border-b-2 px-4 py-3 text-xs font-medium transition-colors ${
                activeTab === key
                  ? "border-amber-400 text-amber-400"
                  : "border-transparent text-white/40 hover:text-white/70"
              }`}
            >
              <Icon className="h-3.5 w-3.5" />
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8">
        {dataLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-6 w-6 animate-spin text-amber-400" />
          </div>
        ) : activeTab === "logs" ? (
          <>
            {/* Summary cards */}
            <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                { label: "Total attempts", value: logs.length, color: "text-white" },
                {
                  label: "Successful",
                  value: logs.filter((l) => l.success).length,
                  color: "text-emerald-400",
                },
                {
                  label: "Failed",
                  value: logs.filter((l) => !l.success).length,
                  color: "text-red-400",
                },
                {
                  label: "Unique IPs",
                  value: new Set(logs.map((l) => l.login_ip).filter(Boolean)).size,
                  color: "text-amber-400",
                },
              ].map((s) => (
                <div
                  key={s.label}
                  className="rounded-xl border border-white/10 bg-white/5 p-4"
                >
                  <div className="text-[10px] font-semibold uppercase tracking-widest text-white/30">
                    {s.label}
                  </div>
                  <div className={`mt-1 font-serif text-3xl ${s.color}`}>{s.value}</div>
                </div>
              ))}
            </div>
            <LoginLogsTable logs={logs} />
          </>
        ) : (
          <BookingsTable bookings={bookings} />
        )}
      </div>
    </div>
  );
}
