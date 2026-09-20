"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { getSession, getCurrentRole, type AdminRole, signIn } from "@/lib/auth";
import { fetchGeoInfo } from "@/lib/geo";
import { Shield, AlertCircle, Loader2 } from "lucide-react";
import { TransitionLink as Link } from "@/components/transition-link";

// Dynamically import the AdminDashboard so its huge bundle is NEVER shipped
// to the browser unless the user actually successfully authenticates.
const AdminDashboard = dynamic(() => import("@/components/admin/admin-dashboard"), {
  loading: () => (
    <div className="flex min-h-screen items-center justify-center bg-[#fdf5e6]">
      <Loader2 className="h-10 w-10 animate-spin text-black" />
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
      setError("ENTER EMAIL AND PASSWORD.");
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
            ? "INCORRECT CREDENTIALS."
            : (result.error ?? "AUTHENTICATION FAILED."),
        );
      }
    } catch {
      setError("SYSTEM ERROR. TRY AGAIN.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#fdf5e6] px-4 font-mono">
      <div className="w-full max-w-sm">
        {/* BRUTALIST CARD */}
        <div className="border-4 border-black bg-white p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          {/* Icon */}
          <div className="flex h-16 w-16 items-center justify-center border-4 border-black bg-[#ffef00] text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <Shield className="h-8 w-8" />
          </div>

          <h1 className="mt-6 text-3xl font-black uppercase tracking-tight text-black">Admin Access</h1>
          <p className="mt-2 text-sm font-bold uppercase text-black/70">
            Authorised personnel only.
          </p>

          <form onSubmit={(e) => void handleSubmit(e)} className="mt-8 space-y-4">
            <div>
              <label className="mb-1 block text-sm font-bold uppercase text-black">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@udawalawe-wild.com"
                autoComplete="email"
                required
                className="w-full border-4 border-black bg-[#e0e0e0] px-4 py-3 text-base font-bold text-black placeholder-black/50 focus:bg-white focus:outline-none focus:ring-0"
              />
            </div>
            
            <div>
              <label className="mb-1 block text-sm font-bold uppercase text-black">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="PASSWORD"
                autoComplete="current-password"
                required
                className="w-full border-4 border-black bg-[#e0e0e0] px-4 py-3 text-base font-bold text-black placeholder-black/50 focus:bg-white focus:outline-none focus:ring-0"
              />
            </div>

            {error && (
              <div className="flex items-center gap-2 border-4 border-black bg-[#ff3366] px-4 py-3 font-bold text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <AlertCircle className="h-5 w-5 shrink-0" />
                <span className="text-sm">{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="mt-4 w-full border-4 border-black bg-[#00ffcc] py-4 text-lg font-black uppercase text-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-transform hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-1.5 active:translate-y-1.5 active:shadow-none disabled:opacity-50"
            >
              {loading ? "AUTHENTICATING..." : "SIGN IN"}
            </button>
          </form>

          <div className="mt-8 border-t-4 border-black pt-4">
            <Link
              to="/"
              className="block text-center text-sm font-bold uppercase text-black hover:bg-black hover:text-white transition-colors py-2"
            >
              ← Return to site
            </Link>
          </div>
        </div>

        {/* Security note */}
        <p className="mt-6 text-center text-xs font-bold uppercase text-black/50">
          ALL LOGIN ATTEMPTS ARE LOGGED.
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
      <div className="flex min-h-screen items-center justify-center bg-[#fdf5e6]">
        <Loader2 className="h-10 w-10 animate-spin text-black" />
      </div>
    );
  }

  // If the user has successfully authenticated, lazily load the dashboard
  if (role) {
    return <AdminDashboard onSignOut={() => setRole(null)} />;
  }

  // Otherwise, show the extremely lightweight login screen
  return <LoginScreen onSuccess={(r) => setRole(r)} />;
}
