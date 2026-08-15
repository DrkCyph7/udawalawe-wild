import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
dotenv.config();

const supabase = createClient(
  process.env.VITE_SUPABASE_URL!,
  process.env.VITE_SUPABASE_ANON_KEY!
);

async function run() {
  const { data, error } = await supabase.from("admin_login_logs").insert({
    email: "test@test.com",
    role: "admin",
    success: false,
    failure_reason: "test",
  }).select();
  console.log("Result:", data, error);
}

run();
