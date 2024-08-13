// With `output: 'hybrid'` configured:
// export const prerender = false;
import type { APIRoute } from "astro";
import { setAstroSession, supabaseServerUserClient } from "@/lib/supabase";

export const GET: APIRoute = async ({ cookies, redirect }) => {
  const supabase = await supabaseServerUserClient(cookies);

  await supabase.auth.signOut({ scope: "local" });

  cookies.delete("uid", { path: "/" });
  cookies.delete("name", { path: "/" });
  cookies.delete("location", { path: "/" });
  cookies.delete("sb-access-token", { path: "/" });
  cookies.delete("sb-refresh-token", { path: "/" });
  cookies.delete("supabase.auth.token", { path: "/" });

  return redirect("/api/auth/signin");
};
