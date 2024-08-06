import type { APIRoute } from "astro";
import { supabase } from "../../../lib/supabase";

export const GET: APIRoute = async ({ request, cookies, url, redirect }) => {
  const authCode = url.searchParams.get("code") || "";

  if (!authCode) {
    return new Response("No auth code found", { status: 400 });
  }

  console.log("authCode", authCode);
  const { data, error } = await supabase.auth.exchangeCodeForSession(authCode);

  if (error) {
    console.error("Error:", error);
    return new Response(error.message, { status: 500 });
  }

  if (!data || !data.session.access_token) {
    console.error("No data or session found", data);
    return new Response("No data or session found", { status: 500 });
  }

  if (!data.user.id) {
    throw new Error("User not found");
  }

  let name = data.user?.user_metadata?.name;
  if (!name) throw new Error("Name not found");

  if (name) {
    const names = name.split(" ");
    name = names[0] + " " + names[names.length - 1].charAt(0) + "";
  }
  cookies.set("name", name, {
    path: "/",
  });

  cookies.set("uid", data.user.id, {
    path: "/",
  });

  cookies.set("email", data.user.email as string, {
    path: "/",
  });

  // set cookies for auth
  const { access_token, refresh_token } = data.session;

  cookies.set("sb-access-token", access_token, {
    path: "/",
  });
  cookies.set("sb-refresh-token", refresh_token, {
    path: "/",
  });

  return redirect("/");
};
