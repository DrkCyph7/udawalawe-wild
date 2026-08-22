"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { getSession, getCurrentRole, type AdminRole, signIn } from "@/lib/auth";
import { fetchGeoInfo } from "@/lib/geo";
import { Shield, AlertCircle, Loader2 } from "lucide-react";
import { TransitionLink as Link } from "@/components/transition-link";

// 1) Dynamically import the AdminDashboard so its huge bundle is NEVER shipped
//    to the browser unless the user actually successfully authenticates.
const AdminDashboard = dynamic(() => import("@/components/admin/admin-dashboard"), {
  loading: () => (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
    </div>
  ),
  ssr: false, // Must be client-side only due to localStorage Supabase Auth
});

function LoginScreen({ onSuccess }: { onSuccess: (role: AdminRole) => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email.trim() || !password) {
      setError("Please enter your email and password.");
      return;
    }
    setLoading(true);
    try {
      const geo = await fetchGeoInfo();
      const result = await signIn(email.trim().toLowerCase(), password, geo);
      if (result.ok && result.role) {
        onSuccess(result.role);
      } else {
        setError(
          result.error === "AUTH_FAILURE"
            ? "Incorrect email or password. Please try again."
            : (result.error ?? "Authentication failed. Please check your credentials."),
        );
      }
    } catch {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[color:var(--sand)]/40 via-background to-[color:var(--forest)]/5 px-4">
      <div className="w-full max-w-sm">
        {/* Card */}
        <div className="rounded-2xl border border-border bg-card p-8 shadow-2xl">
          {/* Icon */}
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[color:var(--forest)]/10 text-[color:var(--forest)]">
            <Shield className="h-6 w-6" />
          </div>

          <h1 className="mt-5 font-serif text-2xl text-foreground">Admin sign in</h1>
          <p className="mt-1.5 text-sm text-muted-foreground">
            Use your authorised admin email and password.
          </p>

          <form onSubmit={(e) => void handleSubmit(e)} className="mt-6 space-y-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@udawalawe-wild.com"
              autoComplete="email"
              required
              className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              autoComplete="current-password"
              required
              className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />

            {error && (
              <div className="flex items-center gap-1.5 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700">
                <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-[color:var(--forest)] py-3 text-sm font-semibold text-[color:var(--ivory)] transition hover:opacity-90 disabled:opacity-60"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Signing in…
                </span>
              ) : (
                "Sign in"
              )}
            </button>
          </form>

          <Link
            to="/"
            className="mt-5 block text-center text-xs text-muted-foreground hover:text-foreground"
          >
            ← Return to site
          </Link>
        </div>

        {/* Security note */}
        <p className="mt-4 text-center text-[10px] text-muted-foreground/60">
          All login attempts are logged securely.
        </p>
      </div>
    </div>
  );
}

export default function AdminPage() {
  const [initLoading, setInitLoading] = useState(true);
  const [role, setRole] = useState<AdminRole | null>(null);

  useEffect(() => {
    async function init() {
      const session = await getSession();
      if (session) {
        const r = await getCurrentRole();
        if (r) {
          setRole(r);
        }
      }
      setInitLoading(false);
    }
    void init();
  }, []);

  if (initLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  // If the user has successfully authenticated, lazily load the dashboard
  if (role) {
    return <AdminDashboard initialRole={role} onSignOut={() => setRole(null)} />;
  }

  // Otherwise, show the extremely lightweight login screen
  return <LoginScreen onSuccess={(r) => setRole(r)} />;
}
