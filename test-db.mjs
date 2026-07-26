// Standalone DB diagnostic script — no npm install needed (Node 18+ has fetch built in).
//
// Run from your project root:
//   node test-db.mjs
//
// It reads VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY straight out of your
// .env.local (the same values the browser app uses), then:
//   1. Confirms the table is reachable
//   2. Inserts a test row exactly like the /book form does
//   3. Reads bookings back with the anon key, exactly like the admin panel does
// This isolates whether the problem is env vars, the table/schema, or RLS —
// without needing the browser, React, or the admin login at all.

import { readFileSync, existsSync } from "node:fs";

function loadEnvLocal() {
  const path = ".env.local";
  if (!existsSync(path)) {
    console.error(`❌ Could not find ${path} in the current directory.`);
    console.error(`   Run this script from your project root (next to package.json).`);
    process.exit(1);
  }

  const env = {};
  for (const line of readFileSync(path, "utf8").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    const value = trimmed.slice(eq + 1).trim();
    env[key] = value;
  }
  return env;
}

function normalizeUrl(url) {
  return url.trim().replace(/\/+$/, "").replace(/\/(?:rest|auth)\/v1$/i, "");
}

async function main() {
  const env = loadEnvLocal();
  const rawUrl = env.VITE_SUPABASE_URL;
  const anonKey = env.VITE_SUPABASE_ANON_KEY;

  console.log("=== Step 1: Checking env vars ===");
  if (!rawUrl || rawUrl.includes("YOUR-PROJECT-REF")) {
    console.error("❌ VITE_SUPABASE_URL is missing or still a placeholder in .env.local");
    process.exit(1);
  }
  if (!anonKey || anonKey.includes("YOUR-ANON")) {
    console.error("❌ VITE_SUPABASE_ANON_KEY is missing or still a placeholder in .env.local");
    process.exit(1);
  }
  const url = normalizeUrl(rawUrl);
  console.log(`✅ URL: ${url}`);
  console.log(`✅ Anon key present (${anonKey.slice(0, 8)}...${anonKey.slice(-4)})`);

  const headers = {
    apikey: anonKey,
    Authorization: `Bearer ${anonKey}`,
    "Content-Type": "application/json",
  };

  console.log("\n=== Step 2: Inserting a test booking (as the public /book form would) ===");
  const testPayload = {
    guest_name: "Test Script",
    guest_email: "test-script@example.com",
    guest_whatsapp: "+94000000000",
    adults: 2,
    children: 0,
    special_requests: `Diagnostic insert at ${new Date().toISOString()}`,
    status: "new",
  };

  const insertRes = await fetch(`${url}/rest/v1/booking_enquiries`, {
    method: "POST",
    headers: { ...headers, Prefer: "return=representation" },
    body: JSON.stringify(testPayload),
  });

  const insertBody = await insertRes.text();
  console.log(`HTTP ${insertRes.status}`);
  console.log(insertBody);

  if (!insertRes.ok) {
    console.log("\n❌ Insert failed. Common causes:");
    console.log('   - "relation ... does not exist" → booking-schema.sql was never run against this project');
    console.log('   - "permission denied" / RLS error → the anon insert policy is missing or wrong');
    console.log("   - 401/invalid API key → wrong anon key or URL in .env.local");
    process.exit(1);
  }
  console.log("✅ Insert succeeded (row created in booking_enquiries).");

  console.log("\n=== Step 3: Reading bookings back (as the admin panel would) ===");
  const readRes = await fetch(
    `${url}/rest/v1/booking_enquiries?select=id,guest_name,created_at&order=created_at.desc&limit=5`,
    { headers },
  );
  const readBody = await readRes.text();
  console.log(`HTTP ${readRes.status}`);
  console.log(readBody);

  if (!readRes.ok) {
    console.log("\n❌ Read failed — see the error above.");
    process.exit(1);
  }

  const rows = JSON.parse(readBody);
  if (rows.length === 0) {
    console.log(
      "\n⚠️  Insert succeeded but the read-back returned 0 rows.\n" +
        "   This means RLS is blocking SELECT for the anon role even though INSERT is allowed.\n" +
        "   Fix: re-run booking-schema.sql — the 'Admins can read all enquiries' policy must\n" +
        "   include the anon role (to anon, authenticated) for the admin panel's code-gate login to work.",
    );
    process.exit(1);
  }

  console.log(`✅ Read back ${rows.length} row(s). Most recent:`, rows[0]);
  console.log("\n=== Result: your Supabase connection, insert, and read are all working. ===");
  console.log("If the admin panel in the browser still shows 0, the bug is in the browser app");
  console.log("(wrong env vars in the deployed build, or a bug in fetchBookingEnquiries), not the DB.");
}

main().catch((err) => {
  console.error("Unexpected error:", err);
  process.exit(1);
});
