import { createClient, type SupabaseClient } from "@supabase/supabase-js";

function normalizeSupabaseUrl(rawUrl: string) {
  const value = rawUrl.trim();
  if (!value) {
    return "";
  }

  const withoutTrailingSlash = value.replace(/\/+$/, "");
  return withoutTrailingSlash.replace(/\/(?:rest|auth)\/v1$/i, "");
}

const supabaseUrl = normalizeSupabaseUrl(import.meta.env.VITE_SUPABASE_URL ?? "");
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY?.trim() ?? "";

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
    })
  : null;

export const adminEmailAllowList = (import.meta.env.VITE_ADMIN_EMAILS ?? "admin@udawalawewild.com")
  .split(",")
  .map((email) => email.trim().toLowerCase())
  .filter(Boolean);

export type BookingEnquiryRow = {
  id?: string;
  created_at?: string;
  updated_at?: string;
  guest_name: string;
  guest_email: string;
  guest_whatsapp: string;
  guest_hotel?: string | null;
  guest_country?: string | null;
  safari_date?: string | null;
  adults: number;
  children: number;
  safari_type?: string | null;
  pickup_location?: string | null;
  dropoff_location?: string | null;
  special_requests?: string | null;
  status?: string;
  assigned_partner?: string | null;
  internal_notes?: string | null;
  quoted_amount?: number | null;
  quoted_currency?: string | null;
};

type AuthUser = {
  id?: string;
  email?: string | null;
  user_metadata?: Record<string, unknown> | null;
};

function toFriendlySupabaseError(error: unknown) {
  // Supabase-js throws plain PostgrestError objects ({ message, code, details,
  // hint }), NOT instances of the built-in Error class. `error instanceof Error`
  // is false for these, so treating that as the only "real error" case caused
  // every Supabase failure to silently fall through to the generic message
  // below — hiding the actual cause (RLS, missing table, bad key, etc).
  const rawMessage =
    error instanceof Error
      ? error.message
      : typeof error === "object" && error !== null && "message" in error
        ? String((error as { message: unknown }).message)
        : null;

  if (rawMessage) {
    const message = rawMessage.toLowerCase();

    if (message.includes("relation") && message.includes("does not exist")) {
      return "The Supabase booking table is not set up yet. Please run the SQL from src/lib/booking-schema.sql in the Supabase SQL editor.";
    }

    if (message.includes("row-level security") || message.includes("permission denied")) {
      return "Supabase is rejecting the request because the table or RLS policies are not configured correctly.";
    }

    if (message.includes("invalid api key") || message.includes("api key") || message.includes("not configured")) {
      return "Supabase credentials are missing or invalid. Check VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.";
    }

    return rawMessage;
  }

  return "We couldn't reach the database. Check your connection and try again.";
}

export async function createBookingEnquiry(values: Record<string, string>) {
  if (!supabase) {
    throw new Error("Supabase is not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.");
  }

  const payload: BookingEnquiryRow = {
    guest_name: values.name ?? values.guest_name ?? "",
    guest_email: values.email ?? values.guest_email ?? "",
    guest_whatsapp: values.whatsapp ?? values.guest_whatsapp ?? "",
    guest_hotel: values.hotel ?? values.guest_hotel ?? null,
    guest_country: values.country ?? values.guest_country ?? null,
    safari_date: values.date ?? null,
    adults: Number(values.adults ?? 2) || 2,
    children: Number(values.children ?? 0) || 0,
    safari_type: values.type ?? null,
    pickup_location: values.pickup ?? null,
    dropoff_location: values.dropoff ?? null,
    special_requests: values.notes ?? values.special_requests ?? null,
    status: "new",
  };

  const { data, error } = await supabase
    .from("booking_enquiries")
    .insert(payload)
    .select("id")
    .maybeSingle();

  if (error) {
    throw new Error(toFriendlySupabaseError(error));
  }

  return data;
}

export async function fetchBookingEnquiries() {
  if (!supabase) {
    throw new Error("Supabase is not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.");
  }

  const { data, error } = await supabase
    .from("booking_enquiries")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(toFriendlySupabaseError(error));
  }

  return data ?? [];
}

export async function updateBookingStatus(id: string, status: string) {
  if (!supabase) {
    throw new Error("Supabase is not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.");
  }

  const { error } = await supabase.from("booking_enquiries").update({ status }).eq("id", id);

  if (error) {
    throw new Error(toFriendlySupabaseError(error));
  }
}

export async function isAdminUser(user: AuthUser | null) {
  if (!user) {
    return false;
  }

  const email = user.email?.toLowerCase() ?? "";
  const role = (user.user_metadata?.role as string | undefined)?.toLowerCase();
  if (role === "admin") {
    return true;
  }

  if (adminEmailAllowList.includes(email)) {
    return true;
  }

  if (!supabase) {
    return false;
  }

  const { data, error } = await supabase.from("profiles").select("role").eq("id", user.id).maybeSingle();
  if (error) {
    return false;
  }

  return data?.role === "admin";
}
