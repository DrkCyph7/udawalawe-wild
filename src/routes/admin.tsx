import { createFileRoute } from "@tanstack/react-router";
import { TransitionLink as Link } from "@/components/transition-link";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  supabase,
  isAdminUser,
  fetchBookingEnquiries,
  updateBookingStatus,
  type BookingEnquiryRow,
} from "@/lib/supabase";
import { Section } from "@/components/section";
import {
  AlertCircle,
  ArrowDownUp,
  ArrowUpDown,
  CalendarDays,
  Check,
  ChevronDown,
  ChevronRight,
  ClipboardList,
  Download,
  Globe,
  Hotel,
  Loader2,
  MapPin,
  MessageSquare,
  Phone,
  RefreshCcw,
  Search,
  Shield,
  Star,
  Users,
  X,
} from "lucide-react";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin — Udawalawe Wild" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminPage,
});

/* ═══════════════════ TYPES ════════════════════════════════════════════ */

type Booking = BookingEnquiryRow & { id: string };
type SortKey = keyof Booking | null;
type SortDir = "asc" | "desc";

const STATUS_OPTIONS = ["new", "reviewing", "quoted", "confirmed", "cancelled", "archived"] as const;
type Status = (typeof STATUS_OPTIONS)[number];

const STATUS_STYLES: Record<Status, string> = {
  new: "bg-blue-50 text-blue-700 border-blue-200",
  reviewing: "bg-amber-50 text-amber-700 border-amber-200",
  quoted: "bg-purple-50 text-purple-700 border-purple-200",
  confirmed: "bg-emerald-50 text-emerald-700 border-emerald-200",
  cancelled: "bg-red-50 text-red-600 border-red-200",
  archived: "bg-gray-50 text-gray-500 border-gray-200",
};

const STATUS_DOT: Record<Status, string> = {
  new: "bg-blue-500",
  reviewing: "bg-amber-500",
  quoted: "bg-purple-500",
  confirmed: "bg-emerald-500",
  cancelled: "bg-red-500",
  archived: "bg-gray-400",
};

/* ═══════════════════ HELPERS ══════════════════════════════════════════ */

function formatDate(s?: string | null) {
  if (!s) return "—";
  try {
    return new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric" }).format(new Date(s));
  } catch {
    return s;
  }
}

function waLink(phone?: string | null, name?: string | null) {
  const clean = (phone ?? "").replace(/[^0-9+]/g, "");
  const msg = encodeURIComponent(`Hi ${name ?? "there"}, this is Udawalawe Wild. `);
  return `https://wa.me/${clean.replace(/^\+/, "")}?text=${msg}`;
}

function exportCsv(rows: Booking[]) {
  const headers = [
    "id","created_at","guest_name","guest_email","guest_whatsapp","guest_country",
    "guest_hotel","safari_date","adults","children","safari_type","pickup_location",
    "dropoff_location","special_requests","assigned_partner","quoted_amount","quoted_currency","status",
  ];
  const lines = [
    headers.join(","),
    ...rows.map((r) =>
      headers.map((h) => {
        const val = (r as Record<string, unknown>)[h] ?? "";
        return `"${String(val).replace(/"/g, '""')}"`;
      }).join(",")
    ),
  ];
  const blob = new Blob([lines.join("\n")], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `bookings-${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

/* ═══════════════════ TOAST ════════════════════════════════════════════ */

type Toast = { id: number; text: string; type: "ok" | "err" };

function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const counter = useRef(0);

  const push = (text: string, type: "ok" | "err" = "ok") => {
    const id = ++counter.current;
    setToasts((t) => [...t, { id, text, type }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3500);
  };

  const dismiss = (id: number) => setToasts((t) => t.filter((x) => x.id !== id));

  return { toasts, push, dismiss };
}

/* ═══════════════════ STAT CARD ════════════════════════════════════════ */

function StatCard({
  label,
  value,
  active,
  onClick,
  accent,
}: {
  label: string;
  value: number;
  active: boolean;
  onClick: () => void;
  accent: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group flex flex-col gap-1.5 rounded-xl border p-4 text-left transition-all duration-200 hover:shadow-md ${
        active
          ? "border-[color:var(--forest)] bg-[color:var(--forest)] text-[color:var(--ivory)] shadow-md"
          : "border-border bg-card text-foreground hover:border-[color:var(--forest)]/30"
      }`}
    >
      <div
        className={`text-[10px] font-semibold uppercase tracking-widest ${
          active ? "text-[color:var(--ivory)]/75" : "text-muted-foreground"
        }`}
      >
        {label}
      </div>
      <div className="font-serif text-3xl">{value}</div>
      {!active && (
        <div className={`h-1 w-6 rounded-full ${accent} transition-all duration-200 group-hover:w-10`} />
      )}
    </button>
  );
}

/* ═══════════════════ DETAIL PANEL ═════════════════════════════════════ */

function DetailPanel({
  row,
  onStatusChange,
  onClose,
  toast,
}: {
  row: Booking;
  onStatusChange: (id: string, status: string) => Promise<void>;
  onClose: () => void;
  toast: (text: string, type?: "ok" | "err") => void;
}) {
  const [notes, setNotes] = useState(row.internal_notes ?? "");
  const [savingNotes, setSavingNotes] = useState(false);
  const [savingStatus, setSavingStatus] = useState(false);

  const saveNotes = async () => {
    if (!supabase) return;
    setSavingNotes(true);
    try {
      const { error } = await supabase
        .from("booking_enquiries")
        .update({ internal_notes: notes })
        .eq("id", row.id);
      if (error) throw error;
      toast("Notes saved.");
    } catch {
      toast("Failed to save notes.", "err");
    } finally {
      setSavingNotes(false);
    }
  };

  const status = (row.status ?? "new") as Status;

  const Field = ({ label, value }: { label: string; value?: string | number | null }) => (
    <div>
      <div className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">{label}</div>
      <div className="mt-0.5 text-sm text-foreground">{value ?? "—"}</div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-end overflow-y-auto">
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Close detail panel"
        className="absolute inset-0 bg-black/25"
        onClick={onClose}
      />

      {/* Drawer */}
      <aside className="relative z-10 flex h-full min-h-screen w-full max-w-lg flex-col gap-0 overflow-y-auto bg-card shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-border bg-card px-6 py-4">
          <div>
            <div className="text-xs uppercase tracking-widest text-muted-foreground">Enquiry detail</div>
            <div className="mt-0.5 font-serif text-xl text-foreground">{row.guest_name}</div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 transition hover:bg-muted"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 space-y-6 px-6 py-5">
          {/* Status badge + selector */}
          <div>
            <div className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
              Status
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {STATUS_OPTIONS.map((s) => (
                <button
                  key={s}
                  type="button"
                  disabled={savingStatus}
                  onClick={async () => {
                    setSavingStatus(true);
                    await onStatusChange(row.id, s);
                    setSavingStatus(false);
                  }}
                  className={`rounded-full border px-3 py-1 text-xs font-medium capitalize transition-all duration-150 ${
                    status === s
                      ? STATUS_STYLES[s] + " scale-105 font-semibold"
                      : "border-border text-muted-foreground hover:border-foreground/30 hover:text-foreground"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Guest info */}
          <div className="rounded-xl border border-border bg-background p-4">
            <div className="mb-3 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              <Users className="h-3.5 w-3.5" />
              Guest information
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Name" value={row.guest_name} />
              <Field label="Country" value={row.guest_country} />
              <div className="col-span-2">
                <Field label="Email" value={row.guest_email} />
              </div>
              <div className="col-span-2">
                <div className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                  WhatsApp
                </div>
                <div className="mt-1 flex items-center gap-2">
                  <span className="text-sm text-foreground">{row.guest_whatsapp || "—"}</span>
                  {row.guest_whatsapp && (
                    <a
                      href={waLink(row.guest_whatsapp, row.guest_name)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 rounded-lg bg-[#25D366]/10 px-2.5 py-1 text-xs font-medium text-[#128c7e] transition hover:bg-[#25D366]/20"
                    >
                      <Phone className="h-3 w-3" />
                      Open WhatsApp
                    </a>
                  )}
                </div>
              </div>
              <Field label="Hotel / Accommodation" value={row.guest_hotel} />
            </div>
          </div>

          {/* Trip info */}
          <div className="rounded-xl border border-border bg-background p-4">
            <div className="mb-3 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              <CalendarDays className="h-3.5 w-3.5" />
              Trip details
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Safari date" value={formatDate(row.safari_date)} />
              <Field label="Safari type" value={row.safari_type} />
              <Field label="Adults" value={row.adults} />
              <Field label="Children" value={row.children} />
              <Field label="Pickup location" value={row.pickup_location} />
              <Field label="Drop-off location" value={row.dropoff_location} />
            </div>
            {row.special_requests && (
              <div className="mt-4 rounded-lg border border-dashed border-border bg-muted/30 p-3">
                <div className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                  Special requests
                </div>
                <p className="mt-1 text-sm leading-relaxed text-foreground/80">{row.special_requests}</p>
              </div>
            )}
          </div>

          {/* Quote info */}
          <div className="rounded-xl border border-border bg-background p-4">
            <div className="mb-3 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              <Star className="h-3.5 w-3.5" />
              Quote &amp; assignment
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Quoted amount" value={row.quoted_amount != null ? `${row.quoted_currency ?? "USD"} ${row.quoted_amount}` : null} />
              <Field label="Assigned partner" value={row.assigned_partner} />
            </div>
          </div>

          {/* Internal notes */}
          <div className="rounded-xl border border-border bg-background p-4">
            <div className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              <ClipboardList className="h-3.5 w-3.5" />
              Internal notes
            </div>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={4}
              placeholder="Add private notes for this enquiry…"
              className="w-full resize-none rounded-lg border border-input bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
            <button
              type="button"
              disabled={savingNotes}
              onClick={() => void saveNotes()}
              className="mt-2 flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground transition hover:bg-primary/85 disabled:opacity-60"
            >
              {savingNotes ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Check className="h-3.5 w-3.5" />}
              Save notes
            </button>
          </div>

          {/* Meta */}
          <div className="text-xs text-muted-foreground space-y-0.5">
            <div>Created: {formatDate(row.created_at)}</div>
            <div>Last updated: {formatDate(row.updated_at)}</div>
            <div className="font-mono">ID: {row.id}</div>
          </div>
        </div>
      </aside>
    </div>
  );
}

/* ═══════════════════ MAIN PAGE ════════════════════════════════════════ */

function AdminPage() {
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);
  const [checking, setChecking] = useState(true);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [accessCode, setAccessCode] = useState("");
  const [accessError, setAccessError] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  /* Filters */
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<Status | "all">("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  /* Sort */
  const [sortKey, setSortKey] = useState<SortKey>("created_at");
  const [sortDir, setSortDir] = useState<SortDir>("desc");

  /* Expanded row */
  const [selected, setSelected] = useState<Booking | null>(null);

  const { toasts, push: toast, dismiss } = useToast();

  /* Auth init */
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
        if (!active) return;
        setAuthorized(isAdmin);
        if (isAdmin) {
          const rows = await fetchBookingEnquiries();
          setBookings(rows as Booking[]);
        }
      } catch (err) {
        console.error(err);
        if (active) setAuthorized(false);
      } finally {
        if (active) {
          setLoading(false);
          setChecking(false);
        }
      }
    }
    void init();
    return () => { active = false; };
  }, []);

  /* Sign in */
  const handleSignIn = async () => {
    setAccessError("");
    const code = accessCode.trim();
    if (!code) { setAccessError("Please enter the admin code."); return; }
    if (code !== "40808") { setAccessError("Invalid admin code."); return; }
    setAuthorized(true);
    setChecking(false);
    setLoading(false);
    try {
      const rows = await fetchBookingEnquiries();
      setBookings(rows as Booking[]);
    } catch (err) {
      toast(err instanceof Error ? err.message : "Unable to load bookings.", "err");
    }
  };

  /* Refresh */
  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      const rows = await fetchBookingEnquiries();
      setBookings(rows as Booking[]);
      toast("Bookings refreshed.");
    } catch (err) {
      toast(err instanceof Error ? err.message : "Refresh failed.", "err");
    } finally {
      setRefreshing(false);
    }
  };

  /* Status update */
  const handleStatusChange = async (id: string, status: string) => {
    try {
      await updateBookingStatus(id, status);
      setBookings((current) =>
        current.map((row) => (row.id === id ? { ...row, status } : row))
      );
      if (selected?.id === id) setSelected((s) => s ? { ...s, status } : s);
      toast(`Status updated to "${status}".`);
    } catch (err) {
      toast(err instanceof Error ? err.message : "Unable to update status.", "err");
    }
  };

  /* Derived stats */
  const stats = useMemo(() => ({
    total: bookings.length,
    new: bookings.filter((r) => r.status === "new").length,
    reviewing: bookings.filter((r) => r.status === "reviewing").length,
    quoted: bookings.filter((r) => r.status === "quoted").length,
    confirmed: bookings.filter((r) => r.status === "confirmed").length,
    cancelled: bookings.filter((r) => r.status === "cancelled").length,
  }), [bookings]);

  /* Safari type options */
  const safariTypes = useMemo(() => {
    const types = [...new Set(bookings.map((r) => r.safari_type).filter(Boolean))];
    return types as string[];
  }, [bookings]);

  /* Filtered + sorted rows */
  const filtered = useMemo(() => {
    let rows = [...bookings];

    if (statusFilter !== "all") rows = rows.filter((r) => r.status === statusFilter);
    if (typeFilter !== "all") rows = rows.filter((r) => r.safari_type === typeFilter);
    if (dateFrom) rows = rows.filter((r) => r.safari_date && r.safari_date >= dateFrom);
    if (dateTo) rows = rows.filter((r) => r.safari_date && r.safari_date <= dateTo);
    if (search.trim()) {
      const q = search.toLowerCase();
      rows = rows.filter(
        (r) =>
          r.guest_name?.toLowerCase().includes(q) ||
          r.guest_email?.toLowerCase().includes(q) ||
          r.guest_whatsapp?.toLowerCase().includes(q) ||
          r.guest_country?.toLowerCase().includes(q) ||
          r.pickup_location?.toLowerCase().includes(q) ||
          r.safari_type?.toLowerCase().includes(q)
      );
    }

    if (sortKey) {
      rows.sort((a, b) => {
        const av = (a as Record<string, unknown>)[sortKey] ?? "";
        const bv = (b as Record<string, unknown>)[sortKey] ?? "";
        if (av < bv) return sortDir === "asc" ? -1 : 1;
        if (av > bv) return sortDir === "asc" ? 1 : -1;
        return 0;
      });
    }

    return rows;
  }, [bookings, statusFilter, typeFilter, dateFrom, dateTo, search, sortKey, sortDir]);

  /* Sort toggle */
  const toggleSort = (key: SortKey) => {
    if (sortKey === key) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else { setSortKey(key); setSortDir("asc"); }
  };

  /* ── Loading ── */
  if (loading || checking) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  /* ── Login ── */
  if (!authorized) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[color:var(--sand)]/30 px-4">
        <div className="w-full max-w-sm rounded-2xl border border-border bg-card p-8 shadow-xl">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Shield className="h-6 w-6" />
          </div>
          <h1 className="mt-5 font-serif text-2xl text-foreground">Admin access</h1>
          <p className="mt-1.5 text-sm text-muted-foreground">
            Enter the admin code to view booking enquiries.
          </p>
          <input
            type="password"
            value={accessCode}
            onChange={(e) => setAccessCode(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && void handleSignIn()}
            placeholder="Admin code"
            className="mt-5 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            autoFocus
          />
          {accessError && (
            <div className="mt-2 flex items-center gap-1.5 text-xs text-destructive">
              <AlertCircle className="h-3.5 w-3.5" />
              {accessError}
            </div>
          )}
          <button
            type="button"
            onClick={() => void handleSignIn()}
            className="mt-4 w-full rounded-xl bg-primary py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/85"
          >
            Access dashboard
          </button>
          <Link
            to="/"
            className="mt-4 block text-center text-xs text-muted-foreground hover:text-foreground"
          >
            ← Return to site
          </Link>
        </div>
      </div>
    );
  }

  /* ── Dashboard ── */
  return (
    <div className="min-h-screen bg-[color:var(--sand)]/20">
      {/* Toasts */}
      <div className="fixed bottom-5 right-5 z-[60] flex flex-col gap-2">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`flex items-center gap-2.5 rounded-xl border px-4 py-3 text-sm shadow-lg transition-all duration-300 ${
              t.type === "err"
                ? "border-red-200 bg-red-50 text-red-700"
                : "border-emerald-200 bg-emerald-50 text-emerald-700"
            }`}
          >
            {t.type === "err" ? <AlertCircle className="h-4 w-4 shrink-0" /> : <Check className="h-4 w-4 shrink-0" />}
            {t.text}
            <button type="button" onClick={() => dismiss(t.id)} className="ml-2 opacity-60 hover:opacity-100">
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        ))}
      </div>

      {/* Detail panel */}
      {selected && (
        <DetailPanel
          row={selected}
          onStatusChange={handleStatusChange}
          onClose={() => setSelected(null)}
          toast={toast}
        />
      )}

      {/* Header bar */}
      <div className="border-b border-border bg-card shadow-sm">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-5 py-4 sm:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Shield className="h-5 w-5" />
            </div>
            <div>
              <div className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                Udawalawe Wild
              </div>
              <h1 className="font-serif text-xl text-foreground">Admin Dashboard</h1>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => void handleRefresh()}
              disabled={refreshing}
              className="flex items-center gap-1.5 rounded-xl border border-border bg-background px-3.5 py-2 text-xs font-medium text-foreground transition hover:bg-muted disabled:opacity-60"
            >
              <RefreshCcw className={`h-3.5 w-3.5 ${refreshing ? "animate-spin" : ""}`} />
              Refresh
            </button>
            <button
              type="button"
              onClick={() => exportCsv(filtered)}
              className="flex items-center gap-1.5 rounded-xl border border-border bg-background px-3.5 py-2 text-xs font-medium text-foreground transition hover:bg-muted"
            >
              <Download className="h-3.5 w-3.5" />
              Export CSV
            </button>
            <button
              type="button"
              onClick={async () => { await supabase?.auth.signOut(); window.location.reload(); }}
              className="rounded-xl border border-border bg-background px-3.5 py-2 text-xs font-medium text-foreground transition hover:bg-muted"
            >
              Sign out
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8">

        {/* ── Stats row ── */}
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
          {(
            [
              { label: "Total", value: stats.total, key: "all", accent: "bg-foreground/20" },
              { label: "New", value: stats.new, key: "new", accent: "bg-blue-400" },
              { label: "Reviewing", value: stats.reviewing, key: "reviewing", accent: "bg-amber-400" },
              { label: "Quoted", value: stats.quoted, key: "quoted", accent: "bg-purple-400" },
              { label: "Confirmed", value: stats.confirmed, key: "confirmed", accent: "bg-emerald-400" },
              { label: "Cancelled", value: stats.cancelled, key: "cancelled", accent: "bg-red-400" },
            ] as const
          ).map((s) => (
            <StatCard
              key={s.key}
              label={s.label}
              value={s.value}
              active={statusFilter === s.key}
              onClick={() => setStatusFilter(statusFilter === s.key ? "all" : (s.key as Status | "all"))}
              accent={s.accent}
            />
          ))}
        </div>

        {/* ── Filters ── */}
        <div className="mt-5 rounded-xl border border-border bg-card p-4">
          <div className="flex flex-wrap gap-3">
            {/* Search */}
            <div className="relative min-w-[200px] flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="search"
                placeholder="Search name, email, country, location…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-xl border border-input bg-background py-2.5 pl-9 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>

            {/* Safari type */}
            <div className="relative">
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="appearance-none rounded-xl border border-input bg-background py-2.5 pl-3 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="all">All types</option>
                {safariTypes.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            </div>

            {/* Date from */}
            <div className="flex items-center gap-2 rounded-xl border border-input bg-background px-3 py-2.5 text-sm text-muted-foreground">
              <CalendarDays className="h-4 w-4 shrink-0" />
              <input
                type="date"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
                className="bg-transparent text-sm focus:outline-none"
                placeholder="From date"
              />
              <span className="text-muted-foreground/50">→</span>
              <input
                type="date"
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
                className="bg-transparent text-sm focus:outline-none"
                placeholder="To date"
              />
            </div>

            {/* Clear filters */}
            {(search || typeFilter !== "all" || dateFrom || dateTo) && (
              <button
                type="button"
                onClick={() => { setSearch(""); setTypeFilter("all"); setDateFrom(""); setDateTo(""); }}
                className="flex items-center gap-1 rounded-xl border border-border px-3 py-2.5 text-xs font-medium text-muted-foreground hover:border-foreground/30 hover:text-foreground"
              >
                <X className="h-3.5 w-3.5" />
                Clear filters
              </button>
            )}
          </div>

          {/* Result count */}
          <div className="mt-3 text-xs text-muted-foreground">
            Showing <strong>{filtered.length}</strong> of <strong>{bookings.length}</strong> enquiries
            {statusFilter !== "all" && ` · Status: ${statusFilter}`}
          </div>
        </div>

        {/* ── Table ── */}
        <div className="mt-4 overflow-hidden rounded-xl border border-border bg-card">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-3 py-20 text-muted-foreground">
              <MessageSquare className="h-8 w-8 opacity-30" />
              <p className="text-sm">No enquiries match your filters.</p>
              <button
                type="button"
                onClick={() => { setSearch(""); setTypeFilter("all"); setDateFrom(""); setDateTo(""); setStatusFilter("all"); }}
                className="text-xs underline underline-offset-4 hover:text-foreground"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead className="border-b border-border bg-muted/40 text-left">
                  <tr>
                    {(
                      [
                        { label: "Guest", key: "guest_name" },
                        { label: "Safari", key: "safari_date" },
                        { label: "Party", key: "adults" },
                        { label: "Type", key: "safari_type" },
                        { label: "Pickup", key: "pickup_location" },
                        { label: "Status", key: "status" },
                        { label: "Created", key: "created_at" },
                        { label: "", key: null },
                      ] as { label: string; key: SortKey }[]
                    ).map(({ label, key }) => (
                      <th
                        key={label}
                        className={`px-4 py-3 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground ${key ? "cursor-pointer select-none hover:text-foreground" : ""}`}
                        onClick={() => key && toggleSort(key)}
                      >
                        <div className="flex items-center gap-1">
                          {label}
                          {key && sortKey === key ? (
                            <ArrowUpDown className="h-3 w-3 text-primary" />
                          ) : key ? (
                            <ArrowDownUp className="h-3 w-3 opacity-25" />
                          ) : null}
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/60">
                  {filtered.map((row) => {
                    const rowStatus = (row.status ?? "new") as Status;
                    return (
                      <tr
                        key={row.id}
                        onClick={() => setSelected(row)}
                        className="cursor-pointer align-middle transition-colors duration-100 hover:bg-[color:var(--sand)]/30"
                      >
                        {/* Guest */}
                        <td className="px-4 py-3">
                          <div className="font-medium text-foreground">{row.guest_name}</div>
                          <div className="mt-0.5 flex items-center gap-1 text-[11px] text-muted-foreground">
                            <Globe className="h-3 w-3" />
                            {row.guest_country ?? "—"}
                          </div>
                          <div className="mt-0.5 text-[11px] text-muted-foreground truncate max-w-[160px]">{row.guest_email}</div>
                        </td>

                        {/* Safari date */}
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="flex items-center gap-1.5 text-sm">
                            <CalendarDays className="h-3.5 w-3.5 text-muted-foreground" />
                            {formatDate(row.safari_date)}
                          </div>
                        </td>

                        {/* Party */}
                        <td className="px-4 py-3 text-sm whitespace-nowrap">
                          <div className="flex items-center gap-1">
                            <Users className="h-3.5 w-3.5 text-muted-foreground" />
                            {row.adults}A {row.children > 0 ? `+ ${row.children}C` : ""}
                          </div>
                        </td>

                        {/* Safari type */}
                        <td className="px-4 py-3">
                          <span className="rounded-md bg-muted px-2 py-0.5 text-xs font-medium text-foreground/75">
                            {row.safari_type ?? "—"}
                          </span>
                        </td>

                        {/* Pickup */}
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <MapPin className="h-3 w-3 shrink-0" />
                            {row.pickup_location ?? "—"}
                          </div>
                        </td>

                        {/* Status */}
                        <td className="px-4 py-3">
                          <span
                            className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium capitalize ${STATUS_STYLES[rowStatus]}`}
                          >
                            <span className={`h-1.5 w-1.5 rounded-full ${STATUS_DOT[rowStatus]}`} />
                            {rowStatus}
                          </span>
                        </td>

                        {/* Created */}
                        <td className="px-4 py-3 text-xs text-muted-foreground whitespace-nowrap">
                          {formatDate(row.created_at)}
                        </td>

                        {/* Arrow */}
                        <td className="px-4 py-3">
                          <ChevronRight className="h-4 w-4 text-muted-foreground/40 group-hover:text-foreground" />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Footer note */}
        <p className="mt-4 text-right text-xs text-muted-foreground">
          Click any row to open the full enquiry detail panel.
        </p>
      </div>
    </div>
  );
}
