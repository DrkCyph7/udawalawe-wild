"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { getSession, getCurrentRole, signIn, signOut } from "@/lib/auth";
import { fetchGeoInfo } from "@/lib/geo";
import { Terminal, Cpu, Loader2 } from "lucide-react";
import { TransitionLink as Link } from "@/components/transition-link";

const SuperAdminDashboard = dynamic(() => import("@/components/admin/superadmin-dashboard"), {
  loading: () => (
    <div className="flex h-screen items-center justify-center bg-black">
      <Loader2 className="h-6 w-6 animate-spin text-green-500" />
    </div>
  ),
  ssr: false,
});

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
          <p className="mt-1.5 text-xs text-green-500/60">&gt; WARNING: ALL ACTIVITY MONITORED_</p>

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
                placeholder="********"
                autoComplete="current-password"
                required
                className="w-full rounded-none border-b border-green-500/30 bg-black px-0 py-2 text-sm text-green-500 placeholder:text-green-500/30 focus:border-green-500 focus:outline-none"
              />
            </div>

            {error && (
              <div className="mt-4 border-l-2 border-red-500 bg-red-500/10 p-2 text-xs text-red-500">
                &gt; ERR: {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="mt-6 flex w-full items-center justify-between border border-green-500 bg-green-500/10 px-4 py-3 text-sm font-bold text-green-500 transition hover:bg-green-500 hover:text-black disabled:opacity-50"
            >
              <span>{loading ? "INITIALIZING..." : "EXECUTE"}</span>
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Cpu className="h-4 w-4" />}
            </button>
          </form>

          <Link
            to="/"
            className="mt-6 block text-center text-xs text-green-500/40 hover:text-green-500"
          >
            [ DISCONNECT ]
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function SuperAdminPage() {
  const [initLoading, setInitLoading] = useState(true);
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    async function init() {
      const session = await getSession();
      if (session) {
        const role = await getCurrentRole();
        if (role === "superadmin") {
          setAuthed(true);
        }
      }
      setInitLoading(false);
    }
    void init();
  }, []);

  if (initLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black">
        <Loader2 className="h-6 w-6 animate-spin text-green-500" />
      </div>
    );
  }

  if (authed) {
    return <SuperAdminDashboard onSignOut={() => setAuthed(false)} />;
  }

  return <LoginScreen onSuccess={() => setAuthed(true)} />;
}
