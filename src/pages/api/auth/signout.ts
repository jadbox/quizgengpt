// With `output: 'hybrid'` configured:
// export const prerender = false;
import type { APIRoute } from "astro";
import { supabase } from "@/lib/supabase";

export const GET: APIRoute = async ({ cookies, redirect }) => {
  await supabase.auth.signOut();

  cookies.delete("uid", { path: "/" });
  cookies.delete("name", { path: "/" });
  cookies.delete("location", { path: "/" });
  cookies.delete("sb-access-token", { path: "/" });
  cookies.delete("sb-refresh-token", { path: "/" });
  return redirect("/signin");
};
