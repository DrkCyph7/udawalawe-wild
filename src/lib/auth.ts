/**
 * auth.ts — Supabase Auth helpers for the admin panel.
 *
 * Provides role-aware sign-in/out, session access, and login audit logging.
 */

import { supabase } from "@/lib/supabase";
import type { GeoInfo } from "@/lib/geo";

export type AdminRole = "admin" | "superadmin";

export interface LoginLogEntry {
  id: string;
  created_at: string;
  email: string;
  role: string | null;
  success: boolean;
  failure_reason: string | null;
  login_ip: string | null;
  login_country: string | null;
  login_country_code: string | null;
  login_city: string | null;
  login_timezone: string | null;
  user_agent: string | null;
}

// ─── Session ─────────────────────────────────────────────────

/** Returns the current Supabase session, or null. */
export async function getSession() {
  if (!supabase) return null;
  const { data } = await supabase.auth.getSession();
  return data.session ?? null;
}

/** Returns the current signed-in user's role from the profiles table, or null. */
export async function getCurrentRole(): Promise<AdminRole | null> {
  if (!supabase) return null;
  const { data, error } = await supabase.rpc("get_my_role");
  if (error || !data) return null;
  if (data === "superadmin") return "superadmin";
  if (data === "admin") return "admin";
  return null;
}

// ─── Sign in ─────────────────────────────────────────────────

export interface SignInResult {
  ok: boolean;
  role: AdminRole | null;
  error?: string;
}

/**
 * Sign in with email + password.
 * Always writes an audit log entry (success or failure).
 * @param geo — result of fetchGeoInfo(), captured from the login machine's IP
 */
export async function signIn(
  email: string,
  password: string,
  geo: GeoInfo | null,
): Promise<SignInResult> {
  if (!supabase) {
    return { ok: false, role: null, error: "Supabase is not configured." };
  }

  const userAgent = typeof navigator !== "undefined" ? navigator.userAgent : null;
  const ip = geo?.ip ?? null;

  // --- Dynamic IP Banning (Brute-force protection) ---
  if (ip) {
    // Check if there are 5+ failed login attempts from this IP in the last hour
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();

    // We only count attempts where success = false and created_at > oneHourAgo
    const { count } = await supabase
      .from("admin_login_logs")
      .select("*", { count: "exact", head: true })
      .eq("login_ip", ip)
      .eq("success", false)
      .gte("created_at", oneHourAgo);

    if (count && count >= 5) {
      // Record this blocked attempt
      await writeLoginLog({
        user_id: null,
        email,
        role: null,
        success: false,
        failure_reason: "IP BANNED: Too many failed attempts",
        geo,
        user_agent: userAgent,
      });
      return {
        ok: false,
        role: null,
        error:
          "Your IP has been temporarily blocked due to excessive failed attempts. Please try again later.",
      };
    }
  }

  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error || !data.user) {
    // Log the failed attempt (user_id is unknown on failure)
    await writeLoginLog({
      user_id: null,
      email,
      role: null,
      success: false,
      failure_reason: error?.message ?? "Unknown error",
      geo,
      user_agent: userAgent,
    });
    return {
      ok: false,
      role: null,
      error: error?.message ?? "Sign in failed.",
    };
  }

  // Fetch the role AFTER successful sign-in
  const role = await getCurrentRole();

  if (!role) {
    // Signed in to Supabase Auth but has no profile row — not an admin
    await supabase.auth.signOut();
    await writeLoginLog({
      user_id: data.user.id,
      email,
      role: null,
      success: false,
      failure_reason: "No admin profile found for this account.",
      geo,
      user_agent: userAgent,
    });
    return {
      ok: false,
      role: null,
      error: "Your account does not have admin access.",
    };
  }

  await writeLoginLog({
    user_id: data.user.id,
    email,
    role,
    success: true,
    failure_reason: null,
    geo,
    user_agent: userAgent,
  });

  return { ok: true, role };
}

// ─── Sign out ────────────────────────────────────────────────

export async function signOut() {
  if (!supabase) return;
  await supabase.auth.signOut();
}

// ─── Login log ───────────────────────────────────────────────

interface WriteLogParams {
  user_id: string | null;
  email: string;
  role: string | null;
  success: boolean;
  failure_reason: string | null;
  geo: GeoInfo | null;
  user_agent: string | null;
}

/** Insert a row into admin_login_logs. Silently ignores errors. */
async function writeLoginLog(params: WriteLogParams): Promise<void> {
  if (!supabase) return;
  try {
    const { error } = await supabase.from("admin_login_logs").insert({
      user_id: params.user_id,
      email: params.email,
      role: params.role,
      success: params.success,
      failure_reason: params.failure_reason,
      login_ip: params.geo?.ip ?? null,
      login_country: params.geo?.country_name ?? null,
      login_country_code: params.geo?.country_code ?? null,
      login_city: params.geo?.city ?? null,
      login_timezone: params.geo?.timezone ?? null,
      user_agent: params.user_agent,
    });
    if (error) {
      console.error("[SYS_LOG_ERR] Failed to write audit log:", error);
      if (typeof window !== "undefined") {
        alert("LOG ERROR: " + JSON.stringify(error));
      }
    }
  } catch (err) {
    console.error("[SYS_LOG_ERR] Exception during audit log write:", err);
    if (typeof window !== "undefined") {
      alert("LOG EXCEPTION: " + (err as Error).message);
    }
  }
}

// ─── Login logs reader (superadmin only) ─────────────────────

/** Fetch all login logs. Supabase RLS ensures only superadmins can read all rows. */
export async function fetchLoginLogs(): Promise<LoginLogEntry[]> {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("admin_login_logs")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(500);
  if (error) throw new Error(error.message);
  return (data ?? []) as LoginLogEntry[];
}

// ─── Booking data fetchers ────────────────────────────────────

/**
 * Fetch bookings appropriate for the role:
 * - admin       → masked view (no IP, no city)
 * - superadmin  → raw table (full data including IP)
 */
export async function fetchBookingsForRole(role: AdminRole) {
  if (!supabase) throw new Error("Supabase not configured.");
  const table = role === "superadmin" ? "booking_enquiries" : "booking_enquiries_admin_view";
  const { data, error } = await supabase
    .from(table)
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return data ?? [];
}
