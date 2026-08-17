import { signIn } from "./src/lib/auth";

async function run() {
  const result = await signIn("admin@udawalawe-wild.com", "wrongpass", null);
  console.log(result);
}

run();
