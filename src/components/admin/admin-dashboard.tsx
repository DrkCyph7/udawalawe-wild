"use client";

import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { updateBookingStatus, updateBookingPartner, updateBookingNotes, type BookingEnquiryRow } from "@/lib/firebase";
import { signOut, fetchBookings } from "@/lib/auth";
import {
  AlertCircle, Bell, BellRing, CalendarDays, Check, ChevronDown,
  ChevronLeft, ChevronRight, ClipboardList, Globe,
  LayoutDashboard, Loader2, LogOut, MapPin, MessageSquare, Phone,
  RefreshCcw, Search, Star, Users, X, Download
} from "lucide-react";

/* ─── TYPES ─── */
type Booking = BookingEnquiryRow & { id: string };
type Tab = "overview" | "bookings" | "calendar";
const STATUS_OPTIONS = ["new", "reviewing", "quoted", "confirmed", "cancelled", "archived"] as const;
type Status = (typeof STATUS_OPTIONS)[number];

const STATUS_STYLES: Record<Status, string> = {
  new: "bg-[#00ffcc] text-black border-black",
  reviewing: "bg-[#ffef00] text-black border-black",
  quoted: "bg-[#aa00ff] text-white border-black",
  confirmed: "bg-[#00ff00] text-black border-black",
  cancelled: "bg-[#ff3366] text-black border-black",
  archived: "bg-[#cccccc] text-black border-black",
};

type Reminder = { note: string; dueDate: string; bookingName: string };
type RemindersMap = Record<string, Reminder>;

/* ─── HELPERS ─── */
function getDaysInMonth(y: number, m: number) { return new Date(y, m + 1, 0).getDate(); }
function getFirstDayOfMonth(y: number, m: number) { return new Date(y, m, 1).getDay(); }
function formatDate(s?: string | null) {
  if (!s) return "—";
  try { return new Intl.DateTimeFormat("en-GB", { day: "2-digit", month: "short", year: "numeric" }).format(new Date(s)).toUpperCase(); }
  catch { return s; }
}
function waLink(phone?: string | null, name?: string | null) {
  const clean = (phone ?? "").replace(/[^0-9+]/g, "");
  const msg = encodeURIComponent(`Hi ${name ?? "there"}, this is Udawalawe Wild. `);
  return `https://wa.me/${clean.replace(/^\+/, "")}?text=${msg}`;
}
function exportCsv(rows: Booking[]) {
  const headers = ["id","created_at","guest_name","guest_email","guest_whatsapp","guest_country",
    "guest_hotel","safari_date","adults","children","safari_type","pickup_location",
    "dropoff_location","special_requests","assigned_partner","quoted_amount","quoted_currency","status"];
  const lines = [headers.join(","), ...rows.map(r =>
    headers.map(h => { const v = (r as Record<string,unknown>)[h]??""; return `"${String(v).replace(/"/g,'""')}"`; }).join(","))];
  const blob = new Blob([lines.join("\n")],{type:"text/csv"});
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a"); a.href=url; a.download=`bookings-${new Date().toISOString().slice(0,10)}.csv`; a.click();
  URL.revokeObjectURL(url);
}

/* ─── TOAST ─── */
type Toast = { id: number; text: string; type: "ok" | "err" };
function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const counter = useRef(0);
  const push = useCallback((text: string, type: "ok" | "err" = "ok") => {
    const id = ++counter.current;
    setToasts(t => [...t, { id, text, type }]);
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 3500);
  }, []);
  const dismiss = useCallback((id: number) => setToasts(t => t.filter(x => x.id !== id)), []);
  return { toasts, push, dismiss };
}

/* ─── REMINDERS HOOK ─── */
function useReminders() {
  const [reminders, setReminders] = useState<RemindersMap>({});
  useEffect(() => {
    try { const s = localStorage.getItem("uw_reminders"); if (s) setReminders(JSON.parse(s)); } catch {/**/ }
  }, []);
  const setReminder = useCallback((id: string, r: Reminder | null) => {
    setReminders(prev => {
      const next = { ...prev };
      if (r === null) delete next[id]; else next[id] = r;
      try { localStorage.setItem("uw_reminders", JSON.stringify(next)); } catch {/**/ }
      return next;
    });
  }, []);
  const dueToday = useMemo(() => {
    const today = new Date().toISOString().slice(0, 10);
    return Object.entries(reminders).filter(([, r]) => r.dueDate <= today).map(([id, r]) => ({ id, ...r }));
  }, [reminders]);
  return { reminders, setReminder, dueToday };
}

/* ─── COMPONENTS ─── */

function BookingCard({ row, onClick }: { row: Booking; onClick: () => void }) {
  const status = (row.status ?? "new") as Status;
  return (
    <button type="button" onClick={onClick}
      className="w-full text-left border-4 border-black bg-white p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-[0px_0px_0px_0px_rgba(0,0,0,1)] active:bg-black active:text-white transition-all duration-75 group relative overflow-hidden">
      <div className="flex items-start justify-between gap-2 relative z-10">
        <div className="flex-1 min-w-0">
          <div className="font-black text-xl uppercase tracking-tighter truncate">{row.guest_name}</div>
          <div className="text-sm font-bold uppercase mt-1 flex items-center gap-1 opacity-70 group-active:opacity-100">
            <Globe className="h-4 w-4 shrink-0" />{row.guest_country ?? "UNKNOWN"}
          </div>
        </div>
        <span className={`shrink-0 inline-flex items-center gap-1 border-2 px-3 py-1 text-xs font-black uppercase tracking-widest ${STATUS_STYLES[status]}`}>
          {status}
        </span>
      </div>
      <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm font-bold uppercase relative z-10">
        <span className="flex items-center gap-1 border-2 border-black bg-[#fdf5e6] px-2 py-1 group-active:text-black"><CalendarDays className="h-4 w-4" />{formatDate(row.safari_date)}</span>
        <span className="flex items-center gap-1 border-2 border-black bg-[#fdf5e6] px-2 py-1 group-active:text-black"><Users className="h-4 w-4" />{row.adults}A{row.children > 0 ? ` + ${row.children}C` : ""}</span>
        {row.safari_type && <span className="flex items-center gap-1 border-2 border-black bg-[#fdf5e6] px-2 py-1 group-active:text-black"><Star className="h-4 w-4" />{row.safari_type}</span>}
      </div>
    </button>
  );
}

function DetailSheet({ row, onUpdate, onClose, toast, reminders, setReminder }: {
  row: Booking; onUpdate: (id: string, updates: Partial<Booking>) => void; onClose: () => void;
  toast: (text: string, type?: "ok" | "err") => void; reminders: RemindersMap;
  setReminder: (id: string, r: Reminder | null) => void;
}) {
  const [notes, setNotes] = useState(row.internal_notes ?? "");
  const [partner, setPartner] = useState(row.assigned_partner ?? "");
  const [savingNotes, setSavingNotes] = useState(false);
  const [savingStatus, setSavingStatus] = useState(false);
  const [savingPartner, setSavingPartner] = useState(false);
  const status = (row.status ?? "new") as Status;

  const saveStatus = async (s: string) => {
    setSavingStatus(true);
    try {
      await updateBookingStatus(row.id, s);
      onUpdate(row.id, { status: s });
      toast("STATUS UPDATED.");
    } catch { toast("UPDATE FAILED.", "err"); }
    finally { setSavingStatus(false); }
  };

  const savePartner = async (p: string) => {
    setPartner(p); setSavingPartner(true);
    try {
      const assigned = p === "Unassigned" ? null : p;
      await updateBookingPartner(row.id, assigned);
      onUpdate(row.id, { assigned_partner: assigned });
      toast("PARTNER ASSIGNED.");
    } catch { toast("FAILED TO ASSIGN.", "err"); setPartner(row.assigned_partner ?? ""); }
    finally { setSavingPartner(false); }
  };
  
  const saveNotes = async () => {
    setSavingNotes(true);
    try {
      await updateBookingNotes(row.id, notes);
      onUpdate(row.id, { internal_notes: notes });
      toast("NOTES SAVED.");
    } catch { toast("FAILED TO SAVE.", "err"); }
    finally { setSavingNotes(false); }
  };

  const PARTNERS = ["Unassigned", "Udawalawe Safari Jeep Tours", "Eco Safari Sri Lanka", "Elephant Transit Home Tours", "Wilderness Edge Safaris"];
  const Field = ({ label, value }: { label: string; value?: string | number | null }) => (
    <div className="border-b-4 border-black pb-2">
      <div className="text-xs font-black uppercase tracking-widest text-black/50">{label}</div>
      <div className="mt-1 text-lg font-bold text-black uppercase">{value ?? "—"}</div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-[100] flex flex-col justify-end sm:justify-center sm:items-center p-0 sm:p-4">
      <button type="button" aria-label="Close" className="absolute inset-0 bg-[#fdf5e6]/80 backdrop-blur-sm transition-opacity" onClick={onClose} />
      <div className="relative z-10 w-full max-w-2xl bg-white border-t-8 border-x-8 sm:border-b-8 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col max-h-[95vh] sm:max-h-[85vh] animate-in slide-in-from-bottom-16 duration-300">
        
        {/* Header */}
        <div className="sticky top-0 z-20 flex items-center justify-between border-b-8 border-black bg-[#ffef00] px-6 py-4">
          <div>
            <div className="text-xs font-black uppercase tracking-widest text-black">ID: {row.id.split('-')[0]}</div>
            <div className="mt-1 font-black text-3xl uppercase tracking-tighter text-black">{row.guest_name}</div>
          </div>
          <button type="button" onClick={onClose} className="flex h-12 w-12 items-center justify-center border-4 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none active:bg-black active:text-white transition-all">
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8 bg-[#fdf5e6]">
          
          {/* Status Updates */}
          <div className="border-4 border-black bg-white p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            <div className="mb-4 text-sm font-black uppercase tracking-widest text-black">Current Status</div>
            <div className="flex flex-wrap gap-3">
              {STATUS_OPTIONS.map(s => (
                <button key={s} type="button" disabled={savingStatus}
                  onClick={() => void saveStatus(s)}
                  className={`border-4 px-4 py-2 text-sm font-black uppercase tracking-wider transition-all duration-150 ${
                    status === s ? STATUS_STYLES[s] + " scale-105 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                               : "border-black bg-white text-black hover:bg-[#e0e0e0] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"}`}>
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Contact Actions */}
          <div className="grid grid-cols-2 gap-4">
            {row.guest_whatsapp && (
              <a href={waLink(row.guest_whatsapp, row.guest_name)} target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 border-4 border-black bg-[#00ffcc] text-black px-4 py-4 font-black text-lg uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none active:bg-black active:text-white transition-all">
                <Phone className="h-6 w-6" /> WhatsApp
              </a>
            )}
            <a href={`mailto:${row.guest_email}`}
              className="flex items-center justify-center gap-2 border-4 border-black bg-white text-black px-4 py-4 font-black text-lg uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none active:bg-black active:text-white transition-all">
              <MessageSquare className="h-6 w-6" /> Email
            </a>
          </div>

          {/* Details */}
          <div className="border-4 border-black bg-white p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] space-y-6">
            <div className="grid grid-cols-2 gap-y-6 gap-x-6">
              <Field label="Phone" value={row.guest_whatsapp} />
              <Field label="Email" value={row.guest_email} />
              <Field label="Country" value={row.guest_country} />
              <Field label="Hotel" value={row.guest_hotel} />
              <Field label="Safari Date" value={formatDate(row.safari_date)} />
              <Field label="Type" value={row.safari_type} />
              <Field label="Adults" value={row.adults} />
              <Field label="Children" value={row.children} />
              <div className="col-span-2"><Field label="Pickup" value={row.pickup_location} /></div>
              <div className="col-span-2"><Field label="Dropoff" value={row.dropoff_location} /></div>
            </div>

            {row.special_requests && (
              <div className="border-4 border-black bg-[#ffef00] p-4 mt-6">
                <div className="text-sm font-black uppercase tracking-widest text-black">Special requests</div>
                <p className="mt-2 text-lg font-bold uppercase">{row.special_requests}</p>
              </div>
            )}
          </div>

          {/* Partner & Notes */}
          <div className="border-4 border-black bg-[#00ffcc] p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] space-y-6">
            <div>
              <div className="text-sm font-black uppercase tracking-widest text-black mb-3">Assign Partner</div>
              <div className="relative">
                <select value={partner || "Unassigned"} onChange={e => void savePartner(e.target.value)} disabled={savingPartner}
                  className="w-full appearance-none border-4 border-black bg-white py-4 pl-4 pr-12 text-lg font-bold uppercase focus:outline-none focus:bg-[#ffef00] disabled:opacity-50">
                  {PARTNERS.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
                <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-8 w-8 -translate-y-1/2 text-black" />
              </div>
            </div>

            <div>
              <div className="text-sm font-black uppercase tracking-widest text-black mb-3">Internal Notes</div>
              <textarea value={notes} onChange={e => setNotes(e.target.value)} rows={4}
                placeholder="PRIVATE NOTES..."
                className="w-full resize-none border-4 border-black bg-white px-4 py-4 text-lg font-bold uppercase focus:outline-none focus:bg-[#ffef00]" />
              <button type="button" disabled={savingNotes} onClick={() => void saveNotes()}
                className="mt-4 w-full flex items-center justify-center gap-2 border-4 border-black bg-black text-white px-4 py-4 text-xl font-black uppercase shadow-[6px_6px_0px_0px_rgba(255,255,255,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none active:bg-white active:text-black transition-all disabled:opacity-60">
                {savingNotes ? <Loader2 className="h-6 w-6 animate-spin" /> : <Check className="h-6 w-6" />}
                Save Notes
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

function CalendarView({ bookings, onSelectBooking }: { bookings: Booking[]; onSelectBooking: (b: Booking) => void }) {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  
  const MONTHS = ["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"];
  const DAYS = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);
  
  const bookingsByDay = useMemo(() => {
    const map: Record<number, Booking[]> = {};
    bookings.forEach(b => {
      if (!b.safari_date) return;
      const d = new Date(b.safari_date);
      if (d.getFullYear() === year && d.getMonth() === month) {
        const day = d.getDate();
        if (!map[day]) map[day] = [];
        map[day].push(b);
      }
    });
    return map;
  }, [bookings, year, month]);
  
  const selectedDayBookings = selectedDay ? (bookingsByDay[selectedDay] ?? []) : [];
  
  const prevMonth = () => { if (month === 0) { setYear(y => y - 1); setMonth(11); } else setMonth(m => m - 1); setSelectedDay(null); };
  const nextMonth = () => { if (month === 11) { setYear(y => y + 1); setMonth(0); } else setMonth(m => m + 1); setSelectedDay(null); };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-4 border-black bg-white p-4 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
        <button onClick={prevMonth} className="flex h-12 w-12 items-center justify-center border-4 border-black bg-[#ffef00] hover:translate-x-1 hover:translate-y-1 hover:shadow-none active:bg-black active:text-white transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <ChevronLeft className="h-6 w-6" />
        </button>
        <div className="text-center">
          <div className="font-black text-2xl uppercase tracking-tighter text-black">{MONTHS[month]} {year}</div>
        </div>
        <button onClick={nextMonth} className="flex h-12 w-12 items-center justify-center border-4 border-black bg-[#ffef00] hover:translate-x-1 hover:translate-y-1 hover:shadow-none active:bg-black active:text-white transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>

      <div className="border-4 border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <div className="grid grid-cols-7 border-b-4 border-black bg-[#00ffcc]">
          {DAYS.map(d => (
            <div key={d} className="py-3 text-center text-sm font-black uppercase tracking-widest text-black border-r-4 border-black last:border-r-0">
              {d}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7">
          {Array.from({ length: firstDay }).map((_, i) => (
            <div key={`empty-${i}`} className="border-b-4 border-r-4 border-black bg-[#e0e0e0] min-h-[80px]" />
          ))}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1;
            const dayBookings = bookingsByDay[day] ?? [];
            const isToday = day === today.getDate() && month === today.getMonth() && year === today.getFullYear();
            const isSelected = selectedDay === day;
            const hasBookings = dayBookings.length > 0;
            const colIndex = (firstDay + i) % 7;
            
            return (
              <button key={day} type="button" onClick={() => setSelectedDay(isSelected ? null : day)}
                className={`relative flex flex-col items-center justify-start pt-2 pb-2 min-h-[80px] border-b-4 border-r-4 border-black transition-all ${
                  colIndex === 6 ? "border-r-0" : ""
                } ${
                  isSelected ? "bg-black text-white" :
                  hasBookings ? "bg-[#ffef00] hover:bg-[#ffe500]" :
                  "bg-white hover:bg-[#f5f5f5]"
                }`}>
                
                <span className={`flex h-8 w-8 items-center justify-center font-black text-lg ${
                  isToday && !isSelected ? "border-4 border-black bg-[#00ffcc] text-black" : ""
                }`}>
                  {day}
                </span>
                
                {hasBookings && (
                  <div className="mt-2 flex items-center justify-center border-2 border-black bg-white px-2 py-0.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                    <span className="text-xs font-black text-black">{dayBookings.length}</span>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {selectedDay !== null && (
        <div className="border-4 border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] animate-in slide-in-from-top-4 duration-200">
          <div className="border-b-4 border-black bg-[#aa00ff] text-white px-6 py-4">
            <div className="font-black text-2xl uppercase tracking-tighter">
              {MONTHS[month]} {selectedDay}, {year}
            </div>
          </div>
          
          {selectedDayBookings.length === 0 ? (
            <div className="text-center py-16 text-black/50">
              <span className="text-xl font-black uppercase">NO BOOKINGS</span>
            </div>
          ) : (
            <div className="divide-y-4 divide-black">
              {selectedDayBookings.map(b => (
                <div key={b.id} className="p-4 bg-white hover:bg-[#fdf5e6] transition-colors cursor-pointer" onClick={() => onSelectBooking(b)}>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-black text-xl uppercase tracking-tighter truncate">{b.guest_name}</div>
                      <div className="text-sm font-bold uppercase mt-1">
                        {b.safari_type ?? "—"} · {b.adults}A{b.children > 0 ? ` + ${b.children}C` : ""}
                      </div>
                    </div>
                    <ChevronRight className="h-6 w-6 text-black" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* ─── MAIN DASHBOARD ─── */
export default function AdminDashboard({ onSignOut }: { onSignOut: () => void }) {
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [dataLoading, setDataLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const { toasts, push: toast, dismiss } = useToast();
  const { reminders, setReminder, dueToday } = useReminders();
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  const loadData = useCallback(async () => {
    setDataLoading(true);
    try {
      const b = await fetchBookings();
      setBookings(b as Booking[]);
    } catch (err: any) {
      toast(err.message, "err");
    } finally {
      setDataLoading(false);
    }
  }, [toast]);

  useEffect(() => { void loadData(); }, [loadData]);

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      const b = await fetchBookings();
      setBookings(b as Booking[]);
      toast("SYNC COMPLETE");
    } catch {
      toast("SYNC FAILED", "err");
    }
    setRefreshing(false);
  };

  const handleBookingUpdate = (id: string, updates: Partial<Booking>) => {
    setBookings(prev => prev.map(b => b.id === id ? { ...b, ...updates } : b));
    setSelectedBooking(prev => prev && prev.id === id ? { ...prev, ...updates } : prev);
  };



  // Stats
  const stats = useMemo(() => {
    const today = new Date().toISOString().slice(0, 10);
    const tomorrowDate = new Date();
    tomorrowDate.setDate(tomorrowDate.getDate() + 1);
    const tomorrow = tomorrowDate.toISOString().slice(0, 10);

    return {
      total: bookings.length,
      new: bookings.filter(b => b.status === "new" || !b.status).length,
      confirmed: bookings.filter(b => b.status === "confirmed").length,
      reviewing: bookings.filter(b => b.status === "reviewing").length,
      quoted: bookings.filter(b => b.status === "quoted").length,
      today: bookings.filter(b => b.safari_date && b.safari_date.startsWith(today)).length,
      tomorrow: bookings.filter(b => b.safari_date && b.safari_date.startsWith(tomorrow)).length,
    };
  }, [bookings]);

  return (
    <div className="flex flex-col min-h-[100dvh] bg-[#fdf5e6] text-black font-mono">
      
      {/* Top Header */}
      <header className="sticky top-0 z-30 border-b-8 border-black bg-white px-4 sm:px-8 py-4 flex items-center justify-between shadow-[0px_8px_0px_0px_rgba(0,0,0,1)]">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center border-4 border-black bg-[#ffef00] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <LayoutDashboard className="h-6 w-6 text-black" />
          </div>
          <span className="font-black text-2xl uppercase tracking-tighter">CONTROL_PANEL</span>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={handleRefresh} disabled={refreshing} className="flex h-12 w-12 items-center justify-center border-4 border-black bg-[#00ffcc] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all">
            <RefreshCcw className={`h-6 w-6 text-black ${refreshing ? "animate-spin" : ""}`} />
          </button>
          <button onClick={() => exportCsv(bookings)} className="hidden sm:flex h-12 w-12 items-center justify-center border-4 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all">
            <Download className="h-6 w-6 text-black" />
          </button>
          <button onClick={async () => { await signOut(); onSignOut(); }} className="flex h-12 w-12 items-center justify-center border-4 border-black bg-[#ff3366] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all">
            <LogOut className="h-6 w-6 text-black" />
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto pb-32 sm:pb-12 px-4 sm:px-8 pt-10 max-w-6xl mx-auto w-full">
        {dataLoading ? (
          <div className="flex flex-col items-center justify-center py-32 space-y-6">
            <Loader2 className="h-16 w-16 animate-spin text-black" />
            <span className="text-xl font-black uppercase tracking-widest text-black">SYNCING_DATA...</span>
          </div>
        ) : (
          <>
            {/* OVERVIEW TAB */}
            {activeTab === "overview" && (
              <div className="space-y-8 animate-in fade-in duration-300">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
                  <div className="border-4 border-black bg-[#00ffcc] p-4 sm:p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    <div className="text-xs sm:text-sm font-black uppercase tracking-widest text-black/70">New/Review</div>
                    <div className="mt-2 text-4xl sm:text-6xl font-black tracking-tighter">{stats.new + stats.reviewing}</div>
                  </div>
                  <div className="border-4 border-black bg-[#aa00ff] p-4 sm:p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-white">
                    <div className="text-xs sm:text-sm font-black uppercase tracking-widest text-white/70">Quoted</div>
                    <div className="mt-2 text-4xl sm:text-6xl font-black tracking-tighter">{stats.quoted}</div>
                  </div>
                  <div className="border-4 border-black bg-[#ffef00] p-4 sm:p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    <div className="text-xs sm:text-sm font-black uppercase tracking-widest text-black/70">Confirmed</div>
                    <div className="mt-2 text-4xl sm:text-6xl font-black tracking-tighter">{stats.confirmed}</div>
                  </div>
                  <div className="border-4 border-black bg-white p-4 sm:p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    <div className="text-xs sm:text-sm font-black uppercase tracking-widest text-black/70">Total</div>
                    <div className="mt-2 text-4xl sm:text-6xl font-black tracking-tighter">{stats.total}</div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="border-4 border-black bg-[#ff3366] p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] text-black">
                    <div className="flex items-center justify-between border-b-4 border-black pb-4 mb-4">
                      <h2 className="text-lg font-black uppercase tracking-widest">Safaris Today</h2>
                      <span className="bg-black text-white px-3 py-1 text-sm font-black">{stats.today}</span>
                    </div>
                    {bookings.filter(b => b.safari_date && b.safari_date.startsWith(new Date().toISOString().slice(0, 10))).slice(0,3).map(b => (
                       <div key={b.id} className="mb-2 last:mb-0 bg-white border-2 border-black p-3 hover:bg-black hover:text-white cursor-pointer" onClick={() => setSelectedBooking(b)}>
                         <div className="font-black uppercase truncate">{b.guest_name}</div>
                         <div className="text-xs font-bold">{b.adults}A {b.children}C • {b.safari_type}</div>
                       </div>
                    ))}
                    {stats.today === 0 && <div className="text-sm font-black uppercase text-center py-4 opacity-50">No safaris today</div>}
                  </div>
                  
                  <div className="border-4 border-black bg-[#00ff00] p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] text-black">
                    <div className="flex items-center justify-between border-b-4 border-black pb-4 mb-4">
                      <h2 className="text-lg font-black uppercase tracking-widest">Safaris Tomorrow</h2>
                      <span className="bg-black text-white px-3 py-1 text-sm font-black">{stats.tomorrow}</span>
                    </div>
                    {bookings.filter(b => b.safari_date && b.safari_date.startsWith(new Date(Date.now() + 86400000).toISOString().slice(0, 10))).slice(0,3).map(b => (
                       <div key={b.id} className="mb-2 last:mb-0 bg-white border-2 border-black p-3 hover:bg-black hover:text-white cursor-pointer" onClick={() => setSelectedBooking(b)}>
                         <div className="font-black uppercase truncate">{b.guest_name}</div>
                         <div className="text-xs font-bold">{b.adults}A {b.children}C • {b.safari_type}</div>
                       </div>
                    ))}
                    {stats.tomorrow === 0 && <div className="text-sm font-black uppercase text-center py-4 opacity-50">No safaris tomorrow</div>}
                  </div>
                </div>

                <div className="border-4 border-black bg-white p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                  <div className="flex items-center justify-between mb-6 border-b-4 border-black pb-4">
                    <h2 className="text-xl font-black uppercase tracking-widest text-black">Action Required</h2>
                    <button onClick={() => setActiveTab("bookings")} className="border-2 border-black bg-black text-white px-4 py-2 font-black uppercase hover:bg-white hover:text-black transition-colors">
                      View All
                    </button>
                  </div>
                  <div className="space-y-6">
                    {bookings.filter(b => b.status === "new" || b.status === "reviewing").slice(0, 5).map(b => (
                      <BookingCard key={b.id} row={b} onClick={() => setSelectedBooking(b)} />
                    ))}
                    {bookings.filter(b => b.status === "new" || b.status === "reviewing").length === 0 && (
                      <div className="text-center py-16 border-4 border-dashed border-black bg-[#fdf5e6]">
                        <span className="text-2xl font-black uppercase">0 PENDING ITEMS</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* BOOKINGS TAB */}
            {activeTab === "bookings" && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <div className="sticky top-24 z-20 -mx-4 px-4 py-4 bg-[#fdf5e6]">
                   <div className="relative border-4 border-black bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex items-center">
                     <Search className="absolute left-4 h-6 w-6 text-black" />
                     <input type="search" placeholder="SEARCH QUERY..."
                       className="w-full bg-transparent py-4 pl-14 pr-4 text-xl font-black uppercase focus:outline-none placeholder-black/30" />
                   </div>
                </div>
                <div className="space-y-6">
                  {bookings.map(b => (
                    <BookingCard key={b.id} row={b} onClick={() => setSelectedBooking(b)} />
                  ))}
                </div>
              </div>
            )}

            {/* CALENDAR TAB */}
            {activeTab === "calendar" && (
              <div className="animate-in fade-in duration-300">
                <CalendarView bookings={bookings} onSelectBooking={setSelectedBooking} />
              </div>
            )}
          </>
        )}
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t-8 border-black pb-safe shadow-[0px_-8px_0px_0px_rgba(0,0,0,1)]">
        <div className="flex items-center">
          {[
            { id: "overview", label: "Overview", icon: LayoutDashboard },
            { id: "bookings", label: "Bookings", icon: ClipboardList },
            { id: "calendar", label: "Calendar", icon: CalendarDays }
          ].map((tab, idx) => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id as Tab)}
              className={`flex flex-col items-center justify-center w-full py-4 gap-2 border-r-4 border-black last:border-r-0 transition-colors ${
                activeTab === tab.id ? "bg-[#ffef00] text-black" : "bg-white text-black hover:bg-[#e0e0e0]"
              }`}>
              <tab.icon className={`h-8 w-8`} />
              <span className="text-[10px] font-black uppercase tracking-widest">{tab.label}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* Desktop Side Navigation Alternative */}
      <div className="hidden sm:flex fixed bottom-12 left-1/2 -translate-x-1/2 z-40 bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-2 gap-2">
         {[
            { id: "overview", label: "OVERVIEW", icon: LayoutDashboard },
            { id: "bookings", label: "BOOKINGS", icon: ClipboardList },
            { id: "calendar", label: "CALENDAR", icon: CalendarDays }
          ].map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id as Tab)}
              className={`flex items-center gap-3 px-6 py-3 border-4 border-black transition-all ${
                activeTab === tab.id ? "bg-black text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] translate-x-[-2px] translate-y-[-2px]" : "bg-white text-black hover:bg-[#ffef00]"
              }`}>
              <tab.icon className="h-5 w-5" />
              <span className="text-sm font-black uppercase">{tab.label}</span>
            </button>
          ))}
      </div>

      {/* Detail Sheet Overlay */}
      {selectedBooking && (
        <DetailSheet
          row={selectedBooking}
          onUpdate={handleBookingUpdate}
          onClose={() => setSelectedBooking(null)}
          toast={toast}
          reminders={reminders}
          setReminder={setReminder}
        />
      )}

      {/* Toasts */}
      <div className="fixed top-24 sm:top-6 right-4 sm:right-6 z-[100] flex flex-col gap-4 pointer-events-none">
        {toasts.map(t => (
          <div key={t.id} className={`pointer-events-auto flex items-center gap-3 border-4 border-black px-6 py-4 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] animate-in slide-in-from-right-8 ${
            t.type === "err" ? "bg-[#ff3366] text-black" : "bg-[#00ffcc] text-black"
          }`}>
            {t.type === "ok" ? <Check className="h-6 w-6 border-2 border-black bg-white rounded-full p-0.5" /> : <AlertCircle className="h-6 w-6 border-2 border-black bg-white rounded-full p-0.5" />}
            <span className="text-sm font-black uppercase tracking-widest">{t.text}</span>
            <button onClick={() => dismiss(t.id)} className="ml-4 border-2 border-black bg-white p-1 hover:bg-black hover:text-white transition-colors"><X className="h-4 w-4" /></button>
          </div>
        ))}
      </div>
    </div>
  );
}
