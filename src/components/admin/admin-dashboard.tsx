"use client";

import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { supabase, updateBookingStatus, type BookingEnquiryRow } from "@/lib/supabase";
import { signOut, fetchBookingsForRole, type AdminRole } from "@/lib/auth";
import {
  AlertCircle, Bell, BellRing, CalendarDays, Check, ChevronDown,
  ChevronLeft, ChevronRight, ClipboardList, Download, Globe,
  LayoutDashboard, Loader2, LogOut, MapPin, MessageSquare, Phone,
  RefreshCcw, Search, Shield, Star, Users, X,
} from "lucide-react";

/* ─── TYPES ─── */
type Booking = BookingEnquiryRow & { id: string };
type SortKey = keyof Booking | null;
type SortDir = "asc" | "desc";
type Tab = "overview" | "calendar" | "all" | "new" | "confirmed" | "archived";
const STATUS_OPTIONS = ["new","reviewing","quoted","confirmed","cancelled","archived"] as const;
type Status = (typeof STATUS_OPTIONS)[number];
const STATUS_STYLES: Record<Status,string> = {
  new:"bg-blue-50 text-blue-700 border-blue-200",
  reviewing:"bg-amber-50 text-amber-700 border-amber-200",
  quoted:"bg-purple-50 text-purple-700 border-purple-200",
  confirmed:"bg-emerald-50 text-emerald-700 border-emerald-200",
  cancelled:"bg-red-50 text-red-600 border-red-200",
  archived:"bg-gray-50 text-gray-500 border-gray-200",
};
const STATUS_DOT: Record<Status,string> = {
  new:"bg-blue-500", reviewing:"bg-amber-500", quoted:"bg-purple-500",
  confirmed:"bg-emerald-500", cancelled:"bg-red-500", archived:"bg-gray-400",
};
const STATUS_BG: Record<Status,string> = {
  new:"bg-blue-500", reviewing:"bg-amber-500", quoted:"bg-purple-500",
  confirmed:"bg-emerald-500", cancelled:"bg-red-500", archived:"bg-gray-400",
};
type Reminder = { note: string; dueDate: string; bookingName: string };
type RemindersMap = Record<string, Reminder>;

/* ─── HELPERS ─── */
function formatDate(s?: string | null) {
  if (!s) return "—";
  try { return new Intl.DateTimeFormat("en-GB",{day:"numeric",month:"short",year:"numeric"}).format(new Date(s)); }
  catch { return s; }
}
function formatShort(s?: string | null) {
  if (!s) return "—";
  try { return new Intl.DateTimeFormat("en-GB",{day:"numeric",month:"short"}).format(new Date(s)); }
  catch { return s; }
}
function waLink(phone?: string|null, name?: string|null) {
  const clean = (phone??"").replace(/[^0-9+]/g,"");
  const msg = encodeURIComponent(`Hi ${name??"there"}, this is Udawalawe Wild. `);
  return `https://wa.me/${clean.replace(/^\+/,"")}?text=${msg}`;
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
function getDaysInMonth(y:number,m:number){return new Date(y,m+1,0).getDate();}
function getFirstDayOfMonth(y:number,m:number){return new Date(y,m,1).getDay();}

/* ─── TOAST ─── */
type Toast = {id:number;text:string;type:"ok"|"err"};
function useToast() {
  const [toasts,setToasts] = useState<Toast[]>([]);
  const counter = useRef(0);
  const push = (text:string,type:"ok"|"err"="ok") => {
    const id = ++counter.current;
    setToasts(t=>[...t,{id,text,type}]);
    setTimeout(()=>setToasts(t=>t.filter(x=>x.id!==id)),3500);
  };
  const dismiss = (id:number) => setToasts(t=>t.filter(x=>x.id!==id));
  return {toasts,push,dismiss};
}

/* ─── REMINDERS ─── */
function useReminders() {
  const [reminders,setReminders] = useState<RemindersMap>({});
  useEffect(()=>{
    try { const s=localStorage.getItem("uw_reminders"); if(s) setReminders(JSON.parse(s)); } catch{/**/}
  },[]);
  const setReminder = useCallback((id:string,r:Reminder|null)=>{
    setReminders(prev=>{
      const next={...prev};
      if(r===null) delete next[id]; else next[id]=r;
      try{localStorage.setItem("uw_reminders",JSON.stringify(next));}catch{/**/}
      return next;
    });
  },[]);
  const dueToday = useMemo(()=>{
    const today=new Date().toISOString().slice(0,10);
    return Object.entries(reminders).filter(([,r])=>r.dueDate<=today).map(([id,r])=>({id,...r}));
  },[reminders]);
  return {reminders,setReminder,dueToday};
}

/* ─── STAT CARD ─── */
function StatCard({label,value,active,onClick,accent,icon}:{
  label:string;value:number;active:boolean;onClick:()=>void;accent:string;icon:React.ReactNode;
}) {
  return (
    <button type="button" onClick={onClick}
      className={`flex flex-col gap-2 rounded-2xl border p-4 text-left transition-all duration-200 active:scale-95 ${
        active ? "border-[color:var(--forest)] bg-[color:var(--forest)] text-[color:var(--ivory)] shadow-lg"
               : "border-border bg-card text-foreground hover:border-[color:var(--forest)]/30 hover:shadow-md"}`}>
      <div className={`flex items-center justify-between ${active?"text-[color:var(--ivory)]/70":"text-muted-foreground"}`}>
        <span className="text-[10px] font-semibold uppercase tracking-widest">{label}</span>
        <span className={`rounded-lg p-1.5 ${active?"bg-white/10":"bg-muted"}`}>{icon}</span>
      </div>
      <div className="font-serif text-3xl">{value}</div>
      {!active && <div className={`h-0.5 w-8 rounded-full ${accent}`} />}
    </button>
  );
}

/* ─── BOOKING CARD (mobile) ─── */
function BookingCard({row,onClick}:{row:Booking;onClick:()=>void}) {
  const status = (row.status??"new") as Status;
  return (
    <button type="button" onClick={onClick}
      className="w-full text-left rounded-2xl border border-border bg-card p-4 shadow-sm active:scale-[0.98] transition-all duration-150 hover:shadow-md">
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-foreground truncate">{row.guest_name}</div>
          <div className="text-xs text-muted-foreground mt-0.5 flex items-center gap-1">
            <Globe className="h-3 w-3 shrink-0"/>{row.guest_country??"—"}
          </div>
        </div>
        <span className={`shrink-0 inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[10px] font-semibold capitalize ${STATUS_STYLES[status]}`}>
          <span className={`h-1.5 w-1.5 rounded-full ${STATUS_DOT[status]}`}/>{status}
        </span>
      </div>
      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-muted-foreground">
        <span className="flex items-center gap-1"><CalendarDays className="h-3.5 w-3.5"/>{formatDate(row.safari_date)}</span>
        <span className="flex items-center gap-1"><Users className="h-3.5 w-3.5"/>{row.adults}A{row.children>0?` + ${row.children}C`:""}</span>
        {row.safari_type && <span className="flex items-center gap-1"><Star className="h-3.5 w-3.5"/>{row.safari_type}</span>}
      </div>
      <div className="mt-3 flex items-center justify-between">
        <span className="text-[10px] text-muted-foreground/60">Submitted {formatDate(row.created_at)}</span>
        {row.guest_whatsapp && (
          <a href={waLink(row.guest_whatsapp,row.guest_name)} target="_blank" rel="noopener noreferrer"
            onClick={e=>e.stopPropagation()}
            className="inline-flex items-center gap-1 rounded-xl bg-[#25D366]/10 px-2.5 py-1 text-[11px] font-medium text-[#128c7e] hover:bg-[#25D366]/20 active:scale-95 transition-all">
            <Phone className="h-3 w-3"/>WhatsApp
          </a>
        )}
      </div>
    </button>
  );
}

/* ─── REMINDER DIALOG ─── */
function ReminderDialog({bookingId,bookingName,existing,onSave,onClose}:{
  bookingId:string;bookingName:string;existing:Reminder|null;
  onSave:(id:string,r:Reminder|null)=>void;onClose:()=>void;
}) {
  const [note,setNote] = useState(existing?.note??"");
  const [dueDate,setDueDate] = useState(existing?.dueDate??new Date().toISOString().slice(0,10));
  return (
    <div className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose}/>
      <div className="relative z-10 w-full max-w-sm rounded-3xl bg-card border border-border shadow-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Reminder for</div>
            <div className="font-serif text-lg text-foreground">{bookingName}</div>
          </div>
          <button onClick={onClose} className="rounded-full p-2 hover:bg-muted transition-colors"><X className="h-4 w-4"/></button>
        </div>
        <div className="space-y-3">
          <div>
            <label className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">Due date</label>
            <input type="date" value={dueDate} onChange={e=>setDueDate(e.target.value)}
              className="mt-1 w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"/>
          </div>
          <div>
            <label className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">Note</label>
            <textarea value={note} onChange={e=>setNote(e.target.value)} rows={3}
              placeholder="e.g. Follow up with quote, confirm pickup time…"
              className="mt-1 w-full resize-none rounded-xl border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"/>
          </div>
        </div>
        <div className="mt-4 flex gap-2">
          {existing && (
            <button onClick={()=>{onSave(bookingId,null);onClose();}}
              className="flex-1 rounded-xl border border-red-200 bg-red-50 py-2.5 text-sm font-medium text-red-600 hover:bg-red-100 transition-colors">
              Remove
            </button>
          )}
          <button onClick={()=>{onSave(bookingId,{note,dueDate,bookingName});onClose();}}
            className="flex-1 rounded-xl bg-[color:var(--forest)] py-2.5 text-sm font-semibold text-[color:var(--ivory)] hover:opacity-90 transition-opacity">
            Save reminder
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── DETAIL PANEL ─── */
function DetailPanel({row,onStatusChange,onClose,toast,reminders,setReminder,role}:{
  row:Booking;onStatusChange:(id:string,status:string)=>Promise<void>;onClose:()=>void;
  toast:(text:string,type?:"ok"|"err")=>void;reminders:RemindersMap;
  setReminder:(id:string,r:Reminder|null)=>void;role:AdminRole;
}) {
  const [notes,setNotes] = useState(row.internal_notes??"");
  const [partner,setPartner] = useState(row.assigned_partner??"");
  const [savingNotes,setSavingNotes] = useState(false);
  const [savingStatus,setSavingStatus] = useState(false);
  const [savingPartner,setSavingPartner] = useState(false);
  const [showReminder,setShowReminder] = useState(false);
  const existingReminder = reminders[row.id]??null;
  const PARTNERS = ["Unassigned","Udawalawe Safari Jeep Tours","Eco Safari Sri Lanka","Elephant Transit Home Tours","Wilderness Edge Safaris"];

  const savePartner = async (p:string) => {
    if(!supabase) return; setPartner(p); setSavingPartner(true);
    try {
      const {error} = await supabase.from("booking_enquiries").update({assigned_partner:p==="Unassigned"?null:p}).eq("id",row.id);
      if(error) throw error; toast("Partner updated.");
    } catch { toast("Failed to assign partner.","err"); setPartner(row.assigned_partner??""); }
    finally { setSavingPartner(false); }
  };
  const saveNotes = async () => {
    if(!supabase) return; setSavingNotes(true);
    try {
      const {error} = await supabase.from("booking_enquiries").update({internal_notes:notes}).eq("id",row.id);
      if(error) throw error; toast("Notes saved.");
    } catch { toast("Failed to save notes.","err"); }
    finally { setSavingNotes(false); }
  };
  const status = (row.status??"new") as Status;
  const Field = ({label,value}:{label:string;value?:string|number|null}) => (
    <div>
      <div className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">{label}</div>
      <div className="mt-0.5 text-sm text-foreground">{value??"—"}</div>
    </div>
  );
  return (
    <>
      {showReminder && (
        <ReminderDialog bookingId={row.id} bookingName={row.guest_name} existing={existingReminder}
          onSave={setReminder} onClose={()=>setShowReminder(false)}/>
      )}
      <div className="fixed inset-0 z-50 flex items-start justify-end">
        <button type="button" aria-label="Close" className="absolute inset-0 bg-black/30 backdrop-blur-[2px]" onClick={onClose}/>
        <aside className="relative z-10 flex h-full min-h-screen w-full max-w-lg flex-col overflow-y-auto bg-card shadow-2xl">
          <div className="sticky top-0 z-10 flex items-center justify-between border-b border-border bg-card/95 backdrop-blur px-5 py-4">
            <div>
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Booking detail</div>
              <div className="mt-0.5 font-serif text-xl text-foreground">{row.guest_name}</div>
            </div>
            <div className="flex items-center gap-2">
              <button type="button" onClick={()=>setShowReminder(true)}
                className={`flex h-9 w-9 items-center justify-center rounded-xl transition-colors ${existingReminder?"bg-amber-100 text-amber-600 hover:bg-amber-200":"bg-muted text-muted-foreground hover:bg-muted/80"}`}
                title={existingReminder?"Edit reminder":"Set reminder"}>
                {existingReminder ? <BellRing className="h-4 w-4"/> : <Bell className="h-4 w-4"/>}
              </button>
              <button type="button" onClick={onClose} className="flex h-9 w-9 items-center justify-center rounded-xl bg-muted transition-colors hover:bg-muted/80">
                <X className="h-4 w-4"/>
              </button>
            </div>
          </div>
          <div className="flex-1 space-y-4 px-5 py-5">
            {existingReminder && (
              <div className="flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3">
                <BellRing className="h-4 w-4 mt-0.5 text-amber-600 shrink-0"/>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-semibold text-amber-700">Reminder — {formatDate(existingReminder.dueDate)}</div>
                  <div className="text-xs text-amber-600/80 mt-0.5 leading-relaxed">{existingReminder.note}</div>
                </div>
                <button onClick={()=>setShowReminder(true)} className="text-[10px] text-amber-600 underline underline-offset-2 shrink-0">Edit</button>
              </div>
            )}
            {/* Status */}
            <div className="rounded-2xl border border-border bg-background p-4">
              <div className="mb-3 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Status</div>
              <div className="flex flex-wrap gap-2">
                {STATUS_OPTIONS.map(s=>(
                  <button key={s} type="button" disabled={savingStatus}
                    onClick={async()=>{setSavingStatus(true);await onStatusChange(row.id,s);setSavingStatus(false);}}
                    className={`rounded-full border px-3 py-1 text-xs font-medium capitalize transition-all duration-150 ${
                      status===s ? STATUS_STYLES[s]+" scale-105 font-semibold shadow-sm"
                                 : "border-border text-muted-foreground hover:border-foreground/20 hover:text-foreground"}`}>
                    {s}
                  </button>
                ))}
              </div>
            </div>
            {/* Guest info */}
            <div className="rounded-2xl border border-border bg-background p-4">
              <div className="mb-3 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                <Users className="h-3.5 w-3.5"/>Guest information
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Name" value={row.guest_name}/>
                <Field label="Country" value={row.guest_country}/>
                {role==="superadmin" && row.guest_ip && (
                  <><Field label="IP Address" value={row.guest_ip}/><Field label="City & Timezone" value={`${row.guest_city??"Unknown"} • ${row.guest_timezone??"Unknown"}`}/></>
                )}
                <div className="col-span-2"><Field label="Email" value={row.guest_email}/></div>
                <div className="col-span-2">
                  <div className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">WhatsApp</div>
                  <div className="mt-1 flex items-center gap-2">
                    <span className="text-sm text-foreground">{row.guest_whatsapp||"—"}</span>
                    {row.guest_whatsapp && (
                      <a href={waLink(row.guest_whatsapp,row.guest_name)} target="_blank" rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 rounded-xl bg-[#25D366]/10 px-3 py-1.5 text-xs font-medium text-[#128c7e] transition hover:bg-[#25D366]/20">
                        <Phone className="h-3.5 w-3.5"/>Open WhatsApp
                      </a>
                    )}
                  </div>
                </div>
                <Field label="Hotel / Accommodation" value={row.guest_hotel}/>
              </div>
            </div>
            {/* Trip info */}
            <div className="rounded-2xl border border-border bg-background p-4">
              <div className="mb-3 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                <CalendarDays className="h-3.5 w-3.5"/>Trip details
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Safari date" value={formatDate(row.safari_date)}/>
                <Field label="Safari type" value={row.safari_type}/>
                <Field label="Adults" value={row.adults}/>
                <Field label="Children" value={row.children}/>
                <Field label="Pickup" value={row.pickup_location}/>
                <Field label="Drop-off" value={row.dropoff_location}/>
              </div>
              {row.special_requests && (
                <div className="mt-4 rounded-xl border border-dashed border-border bg-muted/30 p-3">
                  <div className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Special requests</div>
                  <p className="mt-1 text-sm leading-relaxed text-foreground/80">{row.special_requests}</p>
                </div>
              )}
            </div>
            {/* Quote & partner */}
            <div className="rounded-2xl border border-border bg-background p-4">
              <div className="mb-3 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                <Star className="h-3.5 w-3.5"/>Quote & assignment
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Quoted amount" value={row.quoted_amount!=null?`${row.quoted_currency??"USD"} ${row.quoted_amount}`:null}/>
                <div>
                  <div className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-1">Partner</div>
                  <div className="relative">
                    <select value={partner||"Unassigned"} onChange={e=>void savePartner(e.target.value)} disabled={savingPartner}
                      className="w-full appearance-none rounded-xl border border-input bg-background py-2 pl-3 pr-7 text-sm focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50">
                      {PARTNERS.map(p=><option key={p} value={p}>{p}</option>)}
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"/>
                  </div>
                </div>
              </div>
            </div>
            {/* Notes */}
            <div className="rounded-2xl border border-border bg-background p-4">
              <div className="mb-2 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                <ClipboardList className="h-3.5 w-3.5"/>Internal notes
              </div>
              <textarea value={notes} onChange={e=>setNotes(e.target.value)} rows={4}
                placeholder="Private notes for this enquiry…"
                className="w-full resize-none rounded-xl border border-input bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"/>
              <button type="button" disabled={savingNotes} onClick={()=>void saveNotes()}
                className="mt-2 flex items-center gap-1.5 rounded-xl bg-[color:var(--forest)] px-4 py-2.5 text-xs font-semibold text-[color:var(--ivory)] transition hover:opacity-90 disabled:opacity-60">
                {savingNotes ? <Loader2 className="h-3.5 w-3.5 animate-spin"/> : <Check className="h-3.5 w-3.5"/>}
                Save notes
              </button>
            </div>
            {/* Meta */}
            <div className="rounded-2xl border border-border bg-background/60 p-4 text-xs text-muted-foreground space-y-0.5">
              <div>Created: {formatDate(row.created_at)}</div>
              <div>Last updated: {formatDate(row.updated_at)}</div>
              <div className="font-mono opacity-60">ID: {row.id}</div>
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}

/* ─── CALENDAR VIEW ─── */
function CalendarView({bookings,onSelectBooking}:{bookings:Booking[];onSelectBooking:(b:Booking)=>void}) {
  const today = new Date();
  const [year,setYear] = useState(today.getFullYear());
  const [month,setMonth] = useState(today.getMonth());
  const [selectedDay,setSelectedDay] = useState<number|null>(null);
  const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  const DAYS = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
  const daysInMonth = getDaysInMonth(year,month);
  const firstDay = getFirstDayOfMonth(year,month);
  const bookingsByDay = useMemo(()=>{
    const map: Record<number,Booking[]> = {};
    bookings.forEach(b=>{
      if(!b.safari_date) return;
      const d = new Date(b.safari_date);
      if(d.getFullYear()===year && d.getMonth()===month){
        const day = d.getDate();
        if(!map[day]) map[day]=[];
        map[day].push(b);
      }
    });
    return map;
  },[bookings,year,month]);
  const selectedDayBookings = selectedDay ? (bookingsByDay[selectedDay]??[]) : [];
  const prevMonth = ()=>{ if(month===0){setYear(y=>y-1);setMonth(11);}else setMonth(m=>m-1); setSelectedDay(null); };
  const nextMonth = ()=>{ if(month===11){setYear(y=>y+1);setMonth(0);}else setMonth(m=>m+1); setSelectedDay(null); };
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between rounded-2xl border border-border bg-card p-4">
        <button onClick={prevMonth} className="flex h-9 w-9 items-center justify-center rounded-xl hover:bg-muted transition-colors"><ChevronLeft className="h-5 w-5"/></button>
        <div className="text-center">
          <div className="font-serif text-xl text-foreground">{MONTHS[month]}</div>
          <div className="text-xs text-muted-foreground">{year}</div>
        </div>
        <button onClick={nextMonth} className="flex h-9 w-9 items-center justify-center rounded-xl hover:bg-muted transition-colors"><ChevronRight className="h-5 w-5"/></button>
      </div>
      <div className="rounded-2xl border border-border bg-card overflow-hidden">
        <div className="grid grid-cols-7 border-b border-border">
          {DAYS.map(d=><div key={d} className="py-2 text-center text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">{d}</div>)}
        </div>
        <div className="grid grid-cols-7">
          {Array.from({length:firstDay}).map((_,i)=>(
            <div key={`e-${i}`} className="border-b border-r border-border/40 min-h-[56px] sm:min-h-[72px]"/>
          ))}
          {Array.from({length:daysInMonth}).map((_,i)=>{
            const day=i+1;
            const dayBookings=bookingsByDay[day]??[];
            const isToday=day===today.getDate()&&month===today.getMonth()&&year===today.getFullYear();
            const isSelected=selectedDay===day;
            const hasBookings=dayBookings.length>0;
            const colIndex=(firstDay+i)%7;
            return (
              <button key={day} type="button" onClick={()=>setSelectedDay(isSelected?null:day)}
                className={`relative flex flex-col items-center pt-2 pb-1.5 min-h-[56px] sm:min-h-[72px] border-b border-r border-border/40 transition-colors ${
                  isSelected?"bg-[color:var(--forest)]/8":hasBookings?"hover:bg-[color:var(--forest)]/4":"hover:bg-muted/50"
                } ${colIndex===6?"border-r-0":""}`}>
                <span className={`flex h-7 w-7 items-center justify-center rounded-full text-sm font-medium ${
                  isToday?"bg-[color:var(--forest)] text-[color:var(--ivory)]"
                  :isSelected?"bg-[color:var(--forest)]/15 text-[color:var(--forest)]"
                  :"text-foreground"}`}>{day}</span>
                {hasBookings && (
                  <div className="mt-1 flex flex-wrap justify-center gap-0.5 px-1 max-w-full">
                    {dayBookings.slice(0,3).map((b,idx)=>{
                      const s=(b.status??"new") as Status;
                      return <span key={idx} className={`h-1.5 w-1.5 rounded-full ${STATUS_BG[s]}`}/>;
                    })}
                    {dayBookings.length>3 && <span className="text-[8px] text-muted-foreground">+{dayBookings.length-3}</span>}
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>
      <div className="flex flex-wrap gap-3 text-[10px] text-muted-foreground px-1">
        {(Object.keys(STATUS_BG) as Status[]).map(s=>(
          <span key={s} className="flex items-center gap-1"><span className={`h-2 w-2 rounded-full ${STATUS_BG[s]}`}/>{s}</span>
        ))}
      </div>
      {selectedDay!==null && (
        <div className="rounded-2xl border border-border bg-card overflow-hidden">
          <div className="border-b border-border px-5 py-3">
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
              {selectedDayBookings.length>0 ? `${selectedDayBookings.length} booking${selectedDayBookings.length!==1?"s":""} on` : "No bookings on"}
            </div>
            <div className="font-serif text-lg text-foreground">{MONTHS[month]} {selectedDay}, {year}</div>
          </div>
          {selectedDayBookings.length===0 ? (
            <div className="flex flex-col items-center justify-center gap-2 py-10 text-muted-foreground">
              <CalendarDays className="h-7 w-7 opacity-30"/><p className="text-sm">No safaris scheduled for this day.</p>
            </div>
          ) : (
            <div className="divide-y divide-border/60">
              {selectedDayBookings.map(b=>{
                const s=(b.status??"new") as Status;
                return (
                  <button key={b.id} type="button" onClick={()=>onSelectBooking(b)}
                    className="w-full text-left px-5 py-4 hover:bg-muted/40 transition-colors">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <div className="font-medium text-foreground">{b.guest_name}</div>
                        <div className="text-xs text-muted-foreground mt-0.5">
                          {b.safari_type??"—"} · {b.adults}A{b.children>0?` + ${b.children}C`:""}{b.pickup_location?` · ${b.pickup_location}`:""}
                        </div>
                      </div>
                      <span className={`shrink-0 inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[10px] font-semibold capitalize ${STATUS_STYLES[s]}`}>
                        <span className={`h-1.5 w-1.5 rounded-full ${STATUS_DOT[s]}`}/>{s}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* ─── BOOKINGS LIST VIEW ─── */
function BookingsList({bookings,allBookings,onSelect}:{bookings:Booking[];allBookings:Booking[];onSelect:(b:Booking)=>void}) {
  const [search,setSearch] = useState("");
  const [typeFilter,setTypeFilter] = useState("all");
  const [dateFrom,setDateFrom] = useState("");
  const [dateTo,setDateTo] = useState("");
  const [sortKey,setSortKey] = useState<SortKey>("created_at");
  const [sortDir,setSortDir] = useState<SortDir>("desc");
  const safariTypes = useMemo(()=>{
    const types=[...new Set(allBookings.map(r=>r.safari_type).filter(Boolean))];
    return types as string[];
  },[allBookings]);
  const filtered = useMemo(()=>{
    let rows=[...bookings];
    if(typeFilter!=="all") rows=rows.filter(r=>r.safari_type===typeFilter);
    if(dateFrom) rows=rows.filter(r=>r.safari_date&&r.safari_date>=dateFrom);
    if(dateTo) rows=rows.filter(r=>r.safari_date&&r.safari_date<=dateTo);
    if(search.trim()){
      const q=search.toLowerCase();
      rows=rows.filter(r=>r.guest_name?.toLowerCase().includes(q)||r.guest_email?.toLowerCase().includes(q)||r.guest_whatsapp?.toLowerCase().includes(q)||r.guest_country?.toLowerCase().includes(q)||r.safari_type?.toLowerCase().includes(q));
    }
    if(sortKey){
      rows.sort((a,b)=>{
        const av=(a as Record<string,unknown>)[sortKey]??"";
        const bv=(b as Record<string,unknown>)[sortKey]??"";
        if(av<bv) return sortDir==="asc"?-1:1;
        if(av>bv) return sortDir==="asc"?1:-1;
        return 0;
      });
    }
    return rows;
  },[bookings,typeFilter,dateFrom,dateTo,search,sortKey,sortDir]);
  const anyFilter=search||typeFilter!=="all"||dateFrom||dateTo;
  const toggleSort=(key:SortKey)=>{
    if(!key) return;
    if(sortKey===key) setSortDir(d=>d==="asc"?"desc":"asc");
    else {setSortKey(key);setSortDir("asc");}
  };
  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-border bg-card p-4 space-y-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"/>
          <input type="search" placeholder="Search name, email, country…" value={search} onChange={e=>setSearch(e.target.value)}
            className="w-full rounded-xl border border-input bg-background py-2.5 pl-9 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-ring"/>
        </div>
        <div className="flex flex-wrap gap-2">
          <div className="relative">
            <select value={typeFilter} onChange={e=>setTypeFilter(e.target.value)}
              className="appearance-none rounded-xl border border-input bg-background py-2 pl-3 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-ring">
              <option value="all">All types</option>
              {safariTypes.map(t=><option key={t} value={t}>{t}</option>)}
            </select>
            <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"/>
          </div>
          <div className="flex items-center gap-2 rounded-xl border border-input bg-background px-3 py-2 text-sm text-muted-foreground">
            <CalendarDays className="h-4 w-4 shrink-0"/>
            <input type="date" value={dateFrom} onChange={e=>setDateFrom(e.target.value)} className="bg-transparent text-sm focus:outline-none w-28"/>
            <span>→</span>
            <input type="date" value={dateTo} onChange={e=>setDateTo(e.target.value)} className="bg-transparent text-sm focus:outline-none w-28"/>
          </div>
          {anyFilter && (
            <button type="button" onClick={()=>{setSearch("");setTypeFilter("all");setDateFrom("");setDateTo("");}}
              className="flex items-center gap-1 rounded-xl border border-border px-3 py-2 text-xs font-medium text-muted-foreground hover:text-foreground hover:border-foreground/30">
              <X className="h-3.5 w-3.5"/>Clear
            </button>
          )}
        </div>
        <div className="text-xs text-muted-foreground">Showing <strong>{filtered.length}</strong> of <strong>{bookings.length}</strong> bookings</div>
      </div>
      {/* Mobile cards */}
      <div className="sm:hidden space-y-3">
        {filtered.length===0 ? (
          <div className="flex flex-col items-center justify-center gap-3 py-16 text-muted-foreground">
            <MessageSquare className="h-8 w-8 opacity-30"/><p className="text-sm">No bookings match your filters.</p>
          </div>
        ) : filtered.map(row=><BookingCard key={row.id} row={row} onClick={()=>onSelect(row)}/>)}
      </div>
      {/* Desktop table */}
      <div className="hidden sm:block overflow-hidden rounded-2xl border border-border bg-card">
        {filtered.length===0 ? (
          <div className="flex flex-col items-center justify-center gap-3 py-16 text-muted-foreground">
            <MessageSquare className="h-8 w-8 opacity-30"/><p className="text-sm">No bookings match your filters.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="border-b border-border bg-muted/40 text-left">
                <tr>
                  {([{label:"Guest",key:"guest_name"},{label:"Safari date",key:"safari_date"},{label:"Party",key:"adults"},
                    {label:"Type",key:"safari_type"},{label:"Pickup",key:"pickup_location"},{label:"Status",key:"status"},
                    {label:"Submitted",key:"created_at"},{label:"",key:null}] as {label:string;key:SortKey}[]).map(({label,key})=>(
                    <th key={label} onClick={()=>toggleSort(key)}
                      className={`px-4 py-3 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground ${key?"cursor-pointer select-none hover:text-foreground":""}`}>
                      <div className="flex items-center gap-1">
                        {label}
                        {key&&sortKey===key && <ChevronDown className={`h-3 w-3 text-primary transition-transform ${sortDir==="asc"?"rotate-180":""}`}/>}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {filtered.map(row=>{
                  const s=(row.status??"new") as Status;
                  return (
                    <tr key={row.id} onClick={()=>onSelect(row)}
                      className="cursor-pointer transition-colors duration-100 hover:bg-[color:var(--sand)]/20">
                      <td className="px-4 py-3">
                        <div className="font-medium text-foreground">{row.guest_name}</div>
                        <div className="text-[11px] text-muted-foreground mt-0.5">{row.guest_country??"—"}</div>
                        <div className="text-[11px] text-muted-foreground truncate max-w-[140px]">{row.guest_email}</div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm">{formatDate(row.safari_date)}</td>
                      <td className="px-4 py-3 text-sm whitespace-nowrap">{row.adults}A{row.children>0?` + ${row.children}C`:""}</td>
                      <td className="px-4 py-3"><span className="rounded-lg bg-muted px-2 py-0.5 text-xs font-medium">{row.safari_type??"—"}</span></td>
                      <td className="px-4 py-3 text-xs text-muted-foreground"><div className="flex items-center gap-1"><MapPin className="h-3 w-3 shrink-0"/>{row.pickup_location??"—"}</div></td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium capitalize ${STATUS_STYLES[s]}`}>
                          <span className={`h-1.5 w-1.5 rounded-full ${STATUS_DOT[s]}`}/>{s}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-xs text-muted-foreground whitespace-nowrap">{formatDate(row.created_at)}</td>
                      <td className="px-4 py-3"><ChevronRight className="h-4 w-4 text-muted-foreground/40"/></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── OVERVIEW TAB ─── */
function OverviewTab({bookings,stats,dueReminders,onSelectBooking,onTabChange}:{
  bookings:Booking[];stats:Record<string,number>;
  dueReminders:Array<{id:string;note:string;dueDate:string;bookingName:string}>;
  onSelectBooking:(b:Booking)=>void;onTabChange:(t:Tab)=>void;
}) {
  const upcoming7 = useMemo(()=>{
    const today=new Date(); today.setHours(0,0,0,0);
    const in7=new Date(today); in7.setDate(today.getDate()+7);
    return bookings.filter(b=>{
      if(!b.safari_date) return false;
      const d=new Date(b.safari_date); return d>=today&&d<=in7;
    }).sort((a,b)=>(a.safari_date??"").localeCompare(b.safari_date??""));
  },[bookings]);
  const recentNew = useMemo(()=>
    [...bookings].filter(b=>b.status==="new")
      .sort((a,b)=>(b.created_at??"").localeCompare(a.created_at??"")).slice(0,5),
    [bookings]);
  const todayCount = useMemo(()=>
    bookings.filter(b=>b.created_at&&new Date(b.created_at).toDateString()===new Date().toDateString()).length,
    [bookings]);
  const STAT_ITEMS = [
    {label:"Total",value:stats.total,accent:"bg-foreground/15",tab:"all" as Tab,icon:<LayoutDashboard className="h-4 w-4"/>},
    {label:"New",value:stats.new,accent:"bg-blue-400",tab:"new" as Tab,icon:<Star className="h-4 w-4"/>},
    {label:"Confirmed",value:stats.confirmed,accent:"bg-emerald-400",tab:"confirmed" as Tab,icon:<Check className="h-4 w-4"/>},
    {label:"Reviewing",value:stats.reviewing,accent:"bg-amber-400",tab:"all" as Tab,icon:<RefreshCcw className="h-4 w-4"/>},
    {label:"Quoted",value:stats.quoted,accent:"bg-purple-400",tab:"all" as Tab,icon:<ClipboardList className="h-4 w-4"/>},
    {label:"Cancelled",value:stats.cancelled,accent:"bg-red-400",tab:"archived" as Tab,icon:<X className="h-4 w-4"/>},
  ];
  return (
    <div className="space-y-6">
      {dueReminders.length>0 && (
        <div className="rounded-2xl border border-amber-200 bg-amber-50 overflow-hidden">
          <div className="flex items-center gap-2 border-b border-amber-200/80 px-5 py-3">
            <BellRing className="h-4 w-4 text-amber-600"/>
            <span className="text-sm font-semibold text-amber-700">{dueReminders.length} reminder{dueReminders.length!==1?"s":""} due</span>
          </div>
          <div className="divide-y divide-amber-200/50">
            {dueReminders.map(r=>{
              const booking=bookings.find(b=>b.id===r.id);
              return (
                <button key={r.id} type="button" onClick={()=>booking&&onSelectBooking(booking)}
                  className="w-full text-left px-5 py-3 hover:bg-amber-100/50 transition-colors">
                  <div className="font-medium text-amber-800 text-sm">{r.bookingName}</div>
                  <div className="text-xs text-amber-600 mt-0.5">{r.note}</div>
                  <div className="text-[10px] text-amber-500 mt-0.5">Due: {formatDate(r.dueDate)}</div>
                </button>
              );
            })}
          </div>
        </div>
      )}
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-2xl border border-border bg-card p-4 flex items-center justify-between">
          <div>
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">Today</div>
            <div className="mt-1 font-serif text-3xl text-foreground">{todayCount}</div>
            <div className="text-xs text-muted-foreground mt-0.5">new enquiries</div>
          </div>
          <div className="h-11 w-11 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-600"><CalendarDays className="h-5 w-5"/></div>
        </div>
        <button type="button" onClick={()=>onTabChange("calendar")}
          className="rounded-2xl border border-border bg-card p-4 flex items-center justify-between cursor-pointer hover:border-[color:var(--forest)]/30 transition-colors text-left">
          <div>
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">Next 7 Days</div>
            <div className="mt-1 font-serif text-3xl text-foreground">{upcoming7.length}</div>
            <div className="text-xs text-muted-foreground mt-0.5">safaris scheduled</div>
          </div>
          <div className="h-11 w-11 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-600"><Star className="h-5 w-5"/></div>
        </button>
      </div>
      <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
        {STAT_ITEMS.map(s=>(
          <StatCard key={s.label} label={s.label} value={s.value} active={false}
            onClick={()=>onTabChange(s.tab)} accent={s.accent} icon={s.icon}/>
        ))}
      </div>
      {upcoming7.length>0 && (
        <div className="rounded-2xl border border-border bg-card overflow-hidden">
          <div className="border-b border-border px-5 py-3 flex items-center justify-between">
            <div>
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Upcoming this week</div>
              <div className="font-serif text-base text-foreground mt-0.5">Safari schedule</div>
            </div>
            <button onClick={()=>onTabChange("calendar")} className="text-xs text-[color:var(--forest)] font-medium hover:underline">View calendar →</button>
          </div>
          <div className="divide-y divide-border/60">
            {upcoming7.map(b=>{
              const s=(b.status??"new") as Status;
              return (
                <button key={b.id} type="button" onClick={()=>onSelectBooking(b)}
                  className="w-full text-left px-5 py-3.5 hover:bg-muted/30 transition-colors">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="shrink-0 flex flex-col items-center justify-center w-10 h-10 rounded-xl bg-[color:var(--forest)]/8 text-[color:var(--forest)]">
                        <div className="text-[10px] font-semibold uppercase leading-none">
                          {new Date(b.safari_date!).toLocaleString("en-GB",{month:"short"})}
                        </div>
                        <div className="text-lg font-bold leading-tight">{new Date(b.safari_date!).getDate()}</div>
                      </div>
                      <div className="min-w-0">
                        <div className="font-medium text-foreground truncate">{b.guest_name}</div>
                        <div className="text-xs text-muted-foreground mt-0.5">
                          {b.safari_type??"—"} · {b.adults}A{b.children>0?` + ${b.children}C`:""}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      {b.guest_whatsapp && (
                        <a href={waLink(b.guest_whatsapp,b.guest_name)} target="_blank" rel="noopener noreferrer"
                          onClick={e=>e.stopPropagation()}
                          className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#25D366]/10 text-[#128c7e] hover:bg-[#25D366]/20 transition-colors">
                          <Phone className="h-4 w-4"/>
                        </a>
                      )}
                      <span className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-semibold capitalize ${STATUS_STYLES[s]}`}>{s}</span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
      {recentNew.length>0 && (
        <div className="rounded-2xl border border-border bg-card overflow-hidden">
          <div className="border-b border-border px-5 py-3 flex items-center justify-between">
            <div>
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Needs attention</div>
              <div className="font-serif text-base text-foreground mt-0.5">New enquiries</div>
            </div>
            <button onClick={()=>onTabChange("new")} className="text-xs text-[color:var(--forest)] font-medium hover:underline">View all →</button>
          </div>
          <div className="divide-y divide-border/60">
            {recentNew.map(b=>(
              <button key={b.id} type="button" onClick={()=>onSelectBooking(b)}
                className="w-full text-left px-5 py-3.5 hover:bg-muted/30 transition-colors">
                <div className="flex items-center justify-between gap-2">
                  <div className="min-w-0">
                    <div className="font-medium text-foreground truncate">{b.guest_name}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">
                      {b.guest_country??"—"} · {formatShort(b.safari_date)} · {b.safari_type??"—"}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-[10px] text-muted-foreground whitespace-nowrap">{formatDate(b.created_at)}</span>
                    <ChevronRight className="h-4 w-4 text-muted-foreground/40"/>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── MAIN DASHBOARD ─── */
export default function AdminDashboard({initialRole,onSignOut}:{initialRole:AdminRole;onSignOut:()=>void}) {
  const role = initialRole;
  const [initLoading,setInitLoading] = useState(true);
  const [bookings,setBookings] = useState<Booking[]>([]);
  const [refreshing,setRefreshing] = useState(false);
  const [activeTab,setActiveTab] = useState<Tab>("overview");
  const [selected,setSelected] = useState<Booking|null>(null);
  const {toasts,push:toast,dismiss} = useToast();
  const {reminders,setReminder,dueToday} = useReminders();

  useEffect(()=>{
    async function init() {
      try { const rows=await fetchBookingsForRole(initialRole); setBookings(rows as Booking[]); } catch{/**/}
      setInitLoading(false);
    }
    void init();
  },[initialRole]);

  const handleSignOut = async ()=>{await signOut();onSignOut();};
  const handleRefresh = async ()=>{
    setRefreshing(true);
    try { const rows=await fetchBookingsForRole(role); setBookings(rows as Booking[]); toast("Bookings refreshed."); }
    catch(err){toast(err instanceof Error?err.message:"Refresh failed.","err");}
    finally{setRefreshing(false);}
  };
  const handleStatusChange = async (id:string,status:string)=>{
    try {
      await updateBookingStatus(id,status);
      setBookings(c=>c.map(r=>r.id===id?{...r,status}:r));
      if(selected?.id===id) setSelected(s=>s?{...s,status}:s);
      toast(`Status → "${status}".`);
    } catch(err){toast(err instanceof Error?err.message:"Unable to update status.","err");}
  };

  const stats = useMemo(()=>({
    total:bookings.length,
    new:bookings.filter(r=>r.status==="new").length,
    reviewing:bookings.filter(r=>r.status==="reviewing").length,
    quoted:bookings.filter(r=>r.status==="quoted").length,
    confirmed:bookings.filter(r=>r.status==="confirmed").length,
    cancelled:bookings.filter(r=>r.status==="cancelled").length,
  }),[bookings]);

  const tabBookings = useMemo(()=>{
    switch(activeTab){
      case "new": return bookings.filter(b=>b.status==="new");
      case "confirmed": return bookings.filter(b=>b.status==="confirmed");
      case "archived": return bookings.filter(b=>b.status==="archived"||b.status==="cancelled");
      default: return bookings;
    }
  },[bookings,activeTab]);

  const TABS: {id:Tab;label:string;badge?:number}[] = [
    {id:"overview",label:"Overview"},
    {id:"calendar",label:"Calendar"},
    {id:"all",label:"All",badge:bookings.length},
    {id:"new",label:"New",badge:stats.new},
    {id:"confirmed",label:"Confirmed",badge:stats.confirmed},
    {id:"archived",label:"Archived"},
  ];

  const TAB_ICONS: Record<Tab,React.ReactNode> = {
    overview:<LayoutDashboard className="h-5 w-5"/>,
    calendar:<CalendarDays className="h-5 w-5"/>,
    all:<ClipboardList className="h-5 w-5"/>,
    new:<Star className="h-5 w-5"/>,
    confirmed:<Check className="h-5 w-5"/>,
    archived:<MessageSquare className="h-5 w-5"/>,
  };

  if(initLoading){
    return <div className="flex min-h-screen items-center justify-center bg-background"><Loader2 className="h-6 w-6 animate-spin text-muted-foreground"/></div>;
  }

  return (
    <div className="min-h-screen bg-[color:var(--sand)]/15 pb-24 sm:pb-8">
      {/* Toasts */}
      <div className="fixed bottom-24 right-4 sm:bottom-5 sm:right-5 z-[60] flex flex-col gap-2 max-w-xs">
        {toasts.map(t=>(
          <div key={t.id} className={`flex items-center gap-2.5 rounded-2xl border px-4 py-3 text-sm shadow-xl backdrop-blur ${
            t.type==="err"?"border-red-200 bg-red-50 text-red-700":"border-emerald-200 bg-emerald-50 text-emerald-700"}`}>
            {t.type==="err"?<AlertCircle className="h-4 w-4 shrink-0"/>:<Check className="h-4 w-4 shrink-0"/>}
            <span className="flex-1 text-xs">{t.text}</span>
            <button type="button" onClick={()=>dismiss(t.id)} className="opacity-50 hover:opacity-100"><X className="h-3.5 w-3.5"/></button>
          </div>
        ))}
      </div>

      {/* Detail panel */}
      {selected && (
        <DetailPanel row={selected} onStatusChange={handleStatusChange}
          onClose={()=>setSelected(null)} toast={toast}
          reminders={reminders} setReminder={setReminder} role={role}/>
      )}

      {/* Top header */}
      <div className="sticky top-0 z-40 border-b border-border bg-card/95 backdrop-blur shadow-sm">
        <div className="mx-auto max-w-4xl px-4 py-3 sm:py-4">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[color:var(--forest)]/10 text-[color:var(--forest)]">
                <Shield className="h-4 w-4"/>
              </div>
              <div>
                <div className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground leading-none">Udawalawe Wild</div>
                <div className="font-serif text-base text-foreground leading-tight">Booking Manager</div>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <span className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${
                role==="superadmin"?"border-amber-300 bg-amber-50 text-amber-700":"border-blue-200 bg-blue-50 text-blue-700"}`}>
                {role}
              </span>
              <button type="button" onClick={()=>void handleRefresh()} disabled={refreshing}
                className="flex h-8 w-8 items-center justify-center rounded-xl border border-border bg-background transition hover:bg-muted disabled:opacity-60" title="Refresh">
                <RefreshCcw className={`h-3.5 w-3.5 ${refreshing?"animate-spin":""}`}/>
              </button>
              <button type="button" onClick={()=>exportCsv(bookings)}
                className="hidden sm:flex h-8 items-center gap-1.5 rounded-xl border border-border bg-background px-3 text-xs font-medium hover:bg-muted transition">
                <Download className="h-3.5 w-3.5"/>Export
              </button>
              <button type="button" onClick={()=>void handleSignOut()}
                className="flex h-8 w-8 items-center justify-center rounded-xl border border-border bg-background transition hover:bg-red-50 hover:border-red-200 hover:text-red-600" title="Sign out">
                <LogOut className="h-3.5 w-3.5"/>
              </button>
            </div>
          </div>
          {/* Desktop tabs */}
          <div className="hidden sm:flex mt-3 gap-1 overflow-x-auto pb-0.5">
            {TABS.map(tab=>(
              <button key={tab.id} type="button" onClick={()=>setActiveTab(tab.id)}
                className={`flex shrink-0 items-center gap-1.5 rounded-xl px-3.5 py-2 text-sm font-medium transition-colors ${
                  activeTab===tab.id?"bg-[color:var(--forest)] text-[color:var(--ivory)]":"text-muted-foreground hover:bg-muted hover:text-foreground"}`}>
                {tab.label}
                {tab.badge!==undefined&&tab.badge>0 && (
                  <span className={`rounded-full px-1.5 py-0.5 text-[10px] font-bold leading-none ${
                    activeTab===tab.id?"bg-white/20 text-white":"bg-muted text-muted-foreground"}`}>
                    {tab.badge}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-4xl px-4 py-5 sm:py-6">
        {activeTab==="overview" && (
          <OverviewTab bookings={bookings} stats={stats} dueReminders={dueToday}
            onSelectBooking={setSelected} onTabChange={setActiveTab}/>
        )}
        {activeTab==="calendar" && (
          <CalendarView bookings={bookings} onSelectBooking={setSelected}/>
        )}
        {(activeTab==="all"||activeTab==="new"||activeTab==="confirmed"||activeTab==="archived") && (
          <BookingsList bookings={tabBookings} allBookings={bookings} onSelect={setSelected}/>
        )}
      </div>

      {/* Mobile bottom tab bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-card/95 backdrop-blur sm:hidden">
        <div className="grid grid-cols-6 px-1 py-1.5">
          {TABS.map(tab=>(
            <button key={tab.id} type="button" onClick={()=>setActiveTab(tab.id)}
              className={`relative flex flex-col items-center justify-center gap-0.5 py-1.5 rounded-xl transition-colors ${
                activeTab===tab.id?"text-[color:var(--forest)] bg-[color:var(--forest)]/8":"text-muted-foreground"}`}>
              {TAB_ICONS[tab.id]}
              <span className="text-[9px] font-medium leading-none">{tab.label}</span>
              {tab.badge!==undefined&&tab.badge>0 && (
                <span className="absolute top-1 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-blue-500 text-[9px] font-bold text-white leading-none">
                  {tab.badge>9?"9+":tab.badge}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
