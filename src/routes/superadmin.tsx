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
  Terminal,
  Cpu,
  X,
} from "lucide-react";

export const Route = createFileRoute("/superadmin")({
  head: () => ({
    meta: [
      { title: "SYS.ADMIN // UDAWALAWE WILD" },
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
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }).format(new Date(s));
  } catch {
    return s;
  }
}

function shortDate(s?: string | null) {
  if (!s) return "—";
  try {
    return new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "2-digit",
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
        setError("ACCESS_DENIED: ROOT PRIVILEGES REQUIRED.");
      } else {
        setError(result.error ?? "AUTH_FAILURE");
      }
    } catch {
      setError("ERR_UNEXPECTED");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-black px-4 font-mono">
      <div className="w-full max-w-sm">
        <div className="rounded-none border border-green-500/30 bg-black p-8 shadow-[0_0_30px_rgba(0,255,65,0.1)]">
          <div className="flex h-12 w-12 items-center justify-center border border-green-500 text-green-500 shadow-[0_0_15px_rgba(0,255,65,0.2)]">
            <Terminal className="h-6 w-6" />
          </div>
          <h1 className="mt-5 text-xl font-bold text-green-500 tracking-widest uppercase">
            System.Root
          </h1>
          <p className="mt-1.5 text-xs text-green-500/60">
            &gt; WARNING: ALL ACTIVITY MONITORED_
          </p>

          <form onSubmit={(e) => void handleSubmit(e)} className="mt-8 space-y-4">
            <div>
              <div className="text-[10px] text-green-500/60 mb-1">&gt; IDENTIFIER</div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="root@..."
                autoComplete="email"
                required
                className="w-full rounded-none border-b border-green-500/30 bg-black px-0 py-2 text-sm text-green-500 placeholder:text-green-500/30 focus:border-green-500 focus:outline-none"
              />
            </div>
            <div>
              <div className="text-[10px] text-green-500/60 mb-1">&gt; PASSPHRASE</div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                autoComplete="current-password"
                required
                className="w-full rounded-none border-b border-green-500/30 bg-black px-0 py-2 text-sm text-green-500 placeholder:text-green-500/30 focus:border-green-500 focus:outline-none"
              />
            </div>

            {error && (
              <div className="flex items-start gap-2 border border-red-500/50 bg-red-500/10 px-3 py-2 text-xs text-red-500 shadow-[0_0_10px_rgba(239,68,68,0.2)]">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span className="uppercase">{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="mt-6 w-full border border-green-500 bg-green-500/10 py-3 text-sm font-bold tracking-widest text-green-500 uppercase transition hover:bg-green-500 hover:text-black disabled:opacity-50"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  INITIATING...
                </span>
              ) : (
                "EXECUTE_LOGIN"
              )}
            </button>
          </form>

          <Link
            to="/admin"
            className="mt-6 block text-center text-[10px] text-green-500/40 hover:text-green-500"
          >
            [ RETURN TO SAFE ZONE ]
          </Link>
        </div>
      </div>
    </div>
  );
}

/* ─── Detail Panel ───────────────────────────────────────── */

function LogDetailPanel({ log, onClose }: { log: LoginLogEntry; onClose: () => void }) {
  const Field = ({ label, value }: { label: string; value: string | null | undefined }) => (
    <div className="mb-4 border-b border-green-500/20 pb-2">
      <div className="text-[10px] text-green-500/50 uppercase tracking-widest">&gt; {label}</div>
      <div className="mt-1 text-sm text-green-400 break-all">{value || "NULL"}</div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm font-mono">
      <div className="w-full max-w-lg border border-green-500/50 bg-black shadow-[0_0_40px_rgba(0,255,65,0.15)] overflow-hidden">
        <div className="flex items-center justify-between border-b border-green-500/30 bg-green-500/10 px-4 py-3">
          <div className="flex items-center gap-2 text-green-500">
            <Cpu className="h-4 w-4" />
            <span className="text-xs font-bold uppercase tracking-widest">Syslog_Detail</span>
          </div>
          <button onClick={onClose} className="text-green-500/60 hover:text-green-500 transition">
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <div className="p-6 max-h-[80vh] overflow-y-auto">
          <div className="grid grid-cols-2 gap-4">
            <Field label="ID" value={log.id} />
            <Field label="TIMESTAMP" value={formatDate(log.created_at)} />
            
            <div className="col-span-2">
              <Field label="TARGET_ACCOUNT" value={log.email} />
            </div>
            
            <Field label="DETECTED_ROLE" value={log.role} />
            <div className="mb-4 border-b border-green-500/20 pb-2">
              <div className="text-[10px] text-green-500/50 uppercase tracking-widest">&gt; STATUS</div>
              <div className={`mt-1 text-sm font-bold ${log.success ? 'text-green-500' : 'text-red-500'}`}>
                {log.success ? 'GRANTED' : 'DENIED'}
              </div>
            </div>

            {log.failure_reason && (
              <div className="col-span-2">
                <Field label="ERR_REASON" value={log.failure_reason} />
              </div>
            )}

            <Field label="SOURCE_IP" value={log.login_ip} />
            <Field label="GEO_LOCATION" value={`${log.login_city || '?'}, ${log.login_country || '?'}`} />
            
            <Field label="GEO_CODE" value={log.login_country_code} />
            <Field label="TIMEZONE" value={log.login_timezone} />

            <div className="col-span-2">
              <Field label="FINGERPRINT (USER_AGENT)" value={log.user_agent} />
            </div>
          </div>
        </div>
        
        <div className="border-t border-green-500/30 bg-green-500/5 px-4 py-3 flex justify-between items-center text-[10px] text-green-500/50">
          <span>END OF RECORD.</span>
          <button onClick={onClose} className="hover:text-green-500">[ CLOSE ]</button>
        </div>
      </div>
    </div>
  );
}

/* ─── Login log table ────────────────────────────────────── */

function LoginLogsTable({ logs }: { logs: LoginLogEntry[] }) {
  const [search, setSearch] = useState("");
  const [selectedLog, setSelectedLog] = useState<LoginLogEntry | null>(null);

  const filtered = logs.filter((l) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      l.email?.toLowerCase().includes(q) ||
      l.login_ip?.toLowerCase().includes(q) ||
      l.login_country?.toLowerCase().includes(q) ||
      l.login_city?.toLowerCase().includes(q) ||
      l.login_timezone?.toLowerCase().includes(q) ||
      l.user_agent?.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-green-500/50 text-sm">&gt;</span>
        <input
          type="search"
          placeholder="grep -i 'query'..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border border-green-500/30 bg-black/50 py-2.5 pl-8 pr-4 text-sm text-green-500 placeholder:text-green-500/30 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
        />
      </div>

      <div className="border border-green-500/30 bg-black/50">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="border-b border-green-500/30 text-left bg-green-500/10">
              <tr>
                {["Time", "Account", "Status", "IP Address", "Location", "Browser"].map(
                  (h) => (
                    <th
                      key={h}
                      className="px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-green-500/70"
                    >
                      {h}
                    </th>
                  ),
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-green-500/10">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-sm text-green-500/40">
                    EOF (0 records found)
                  </td>
                </tr>
              ) : (
                filtered.map((log) => (
                  <tr 
                    key={log.id} 
                    onClick={() => setSelectedLog(log)}
                    className="align-top hover:bg-green-500/10 transition-colors cursor-pointer group"
                  >
                    <td className="px-4 py-3 whitespace-nowrap text-xs text-green-500/70 group-hover:text-green-400">
                      {formatDate(log.created_at)}
                    </td>
                    <td className="px-4 py-3 text-sm text-green-400 max-w-[180px] truncate">
                      {log.email}
                      <div className="text-[10px] text-green-500/50 mt-1">{log.role || 'UNKNOWN'}</div>
                    </td>
                    <td className="px-4 py-3">
                      {log.success ? (
                        <span className="text-xs font-bold text-green-500">OK</span>
                      ) : (
                        <span className="text-xs font-bold text-red-500">DENIED</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-xs text-green-400">{log.login_ip ?? "NULL"}</span>
                    </td>
                    <td className="px-4 py-3 text-xs text-green-500/70">
                      <div>{log.login_city ?? "?"}, {log.login_country_code ?? "?"}</div>
                    </td>
                    <td className="px-4 py-3 max-w-[200px]">
                      <span
                        className="block truncate text-[10px] text-green-500/40"
                        title={log.user_agent ?? undefined}
                      >
                        {log.user_agent ?? "NULL"}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      <div className="text-right text-[10px] text-green-500/40">
        {filtered.length} / {logs.length} RECORDS MATCHED
      </div>

      {selectedLog && (
        <LogDetailPanel log={selectedLog} onClose={() => setSelectedLog(null)} />
      )}
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
      b.guest_city?.toLowerCase().includes(q) ||
      b.guest_timezone?.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-4">
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-green-500/50 text-sm">&gt;</span>
        <input
          type="search"
          placeholder="grep -i 'guest_info'..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border border-green-500/30 bg-black/50 py-2.5 pl-8 pr-4 text-sm text-green-500 placeholder:text-green-500/30 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
        />
      </div>

      <div className="border border-green-500/30 bg-black/50">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="border-b border-green-500/30 text-left bg-green-500/10">
              <tr>
                {[
                  "ID/Name",
                  "Contact",
                  "Origin",
                  "IP.ADDR",
                  "Safari",
                  "Status",
                ].map((h) => (
                  <th
                    key={h}
                    className="px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-green-500/70"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-green-500/10">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-sm text-green-500/40">
                    EOF (0 records found)
                  </td>
                </tr>
              ) : (
                filtered.map((b) => (
                  <tr key={b.id} className="align-middle hover:bg-green-500/10 transition-colors">
                    <td className="px-4 py-3 text-white/90">
                      <div className="text-sm font-bold text-green-400">{b.guest_name}</div>
                      <div className="text-[10px] text-green-500/40">{b.id.split('-')[0]}</div>
                    </td>
                    <td className="px-4 py-3 text-xs text-green-500/80 max-w-[160px] truncate">
                      {b.guest_email}
                    </td>
                    <td className="px-4 py-3 text-xs text-green-500/70">
                      <div>{b.guest_city || "?"}, {b.guest_country_code || "?"}</div>
                      <div className="text-[10px] text-green-500/40">{b.guest_timezone || "NULL"}</div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-xs text-green-400">{b.guest_ip ?? "NULL"}</span>
                    </td>
                    <td className="px-4 py-3 text-xs text-green-500/80">
                      <div>{shortDate(b.safari_date)}</div>
                      <div className="text-[10px] text-green-500/50 mt-1">
                        {b.adults}A {b.children > 0 ? `${b.children}C` : ""} // {b.safari_type || "ANY"}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-green-500 border border-green-500/30 px-2 py-0.5">
                        {b.status ?? "NEW"}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      <div className="text-right text-[10px] text-green-500/40">
        {filtered.length} / {bookings.length} RECORDS MATCHED
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
      <div className="flex min-h-screen items-center justify-center bg-black font-mono text-green-500">
        <span className="animate-pulse">LOADING_SYS_MODULES...</span>
      </div>
    );
  }

  if (!authed) {
    return <LoginScreen onSuccess={() => void handleLoginSuccess()} />;
  }

  return (
    <div className="min-h-screen bg-black text-green-500 font-mono">
      {/* Header */}
      <div className="border-b border-green-500/20 bg-black/90 backdrop-blur-md sticky top-0 z-40">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-5 py-4 sm:px-8">
          <div className="flex items-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center border border-green-500 bg-green-500/10 text-green-500 shadow-[0_0_15px_rgba(0,255,65,0.2)]">
              <Terminal className="h-5 w-5" />
            </div>
            <div>
              <div className="text-[10px] text-green-500/60">&gt; SYSTEM.ROOT</div>
              <h1 className="text-lg font-bold tracking-widest text-green-500 uppercase">SYS_ADMIN</h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => void handleRefresh()}
              disabled={refreshing}
              className="flex items-center gap-1.5 border border-green-500/30 px-3 py-1.5 text-xs text-green-500 transition hover:bg-green-500/20 hover:border-green-500 disabled:opacity-50"
            >
              <RefreshCcw className={`h-3.5 w-3.5 ${refreshing ? "animate-spin" : ""}`} />
              <span className="hidden sm:inline">SYNC</span>
            </button>
            <button
              type="button"
              onClick={() =>
                activeTab === "bookings"
                  ? exportCsv(bookings as unknown as Record<string, unknown>[], "db-dump-bookings")
                  : exportCsv(logs as unknown as Record<string, unknown>[], "db-dump-logs")
              }
              className="flex items-center gap-1.5 border border-green-500/30 px-3 py-1.5 text-xs text-green-500 transition hover:bg-green-500/20 hover:border-green-500"
            >
              <Download className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">EXPORT.CSV</span>
            </button>
            <Link
              to="/admin"
              className="border border-green-500/30 px-3 py-1.5 text-xs text-green-500 transition hover:bg-green-500/20 hover:border-green-500"
            >
              UI_ADMIN
            </Link>
            <button
              type="button"
              onClick={() => void handleSignOut()}
              className="flex items-center gap-1.5 border border-red-500/50 px-3 py-1.5 text-xs text-red-500 transition hover:bg-red-500 hover:text-black"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">EXIT</span>
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="mx-auto flex max-w-7xl gap-6 px-5 sm:px-8 mt-2">
          {(
            [
              { key: "logs", label: "AUTH_LOGS", icon: Activity },
              { key: "bookings", label: "RAW_BOOKINGS", icon: Globe },
            ] as const
          ).map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              type="button"
              onClick={() => setActiveTab(key)}
              className={`flex items-center gap-2 border-b-2 px-1 py-3 text-xs font-bold transition-all ${
                activeTab === key
                  ? "border-green-500 text-green-500 shadow-[0_2px_10px_rgba(0,255,65,0.3)]"
                  : "border-transparent text-green-500/40 hover:text-green-500/80"
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
          <div className="flex flex-col items-center justify-center py-32 space-y-4">
            <Loader2 className="h-8 w-8 animate-spin text-green-500" />
            <span className="text-sm font-bold tracking-widest text-green-500 animate-pulse">FETCHING_RECORDS...</span>
          </div>
        ) : activeTab === "logs" ? (
          <>
            {/* Summary cards */}
            <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {[
                { label: "TOTAL_ATTEMPTS", value: logs.length, color: "text-green-400" },
                {
                  label: "GRANTED",
                  value: logs.filter((l) => l.success).length,
                  color: "text-green-500",
                },
                {
                  label: "DENIED",
                  value: logs.filter((l) => !l.success).length,
                  color: "text-red-500",
                },
                {
                  label: "UNIQUE_IPS",
                  value: new Set(logs.map((l) => l.login_ip).filter(Boolean)).size,
                  color: "text-green-300",
                },
              ].map((s) => (
                <div
                  key={s.label}
                  className="border border-green-500/30 bg-black/40 p-4 shadow-[0_0_15px_rgba(0,255,65,0.05)]"
                >
                  <div className="text-[10px] font-bold uppercase tracking-widest text-green-500/50 mb-2">
                    &gt; {s.label}
                  </div>
                  <div className={`text-2xl font-bold ${s.color}`}>{s.value}</div>
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
