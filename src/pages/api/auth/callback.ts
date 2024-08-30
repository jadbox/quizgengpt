import type { APIRoute } from "astro";
import {
  supabaseServer,
  setAstroSession,
  supabaseServerUserClient,
} from "../../../lib/supabase";

export const GET: APIRoute = async ({ request, cookies, url, redirect }) => {
  const authCode = url.searchParams.get("code") || "";

  if (!authCode) {
    return new Response("No auth code found", { status: 400 });
  }

  console.log("authCode", authCode);
  try {
    var { data, error } =
      await supabaseServerUserClient(cookies).auth.exchangeCodeForSession(
        authCode,
      );
    // console.log("data", data);
    if (error) {
      console.error("Callback Error:", error);
      return new Response("Callback error: " + error.message, { status: 500 });
    }
  } catch (e) {
    console.error("Callback Throw Error:", e);
    return new Response("Callback Throw error: " + e, { status: 500 });
  }

  if (!data || !data.session?.access_token) {
    console.error("No data or session found", data);
    return new Response("No data or session found", { status: 500 });
  }

  if (!data.user.id) {
    throw new Error("User not found");
  }

  if (!supabaseServer) throw new Error("supabaseServer not found");

  // set cookies for auth
  const { access_token, refresh_token } = data.session;

  cookies.set("sb-access-token", access_token, {
    path: "/",
  });
  cookies.set("sb-refresh-token", refresh_token, {
    path: "/",
  });

  const { data: profile } = await supabaseServer
    .from("profiles")
    .select("username")
    .eq("id", data.user.id)
    .single();

  let name = data.user?.user_metadata?.name;
  // if (name) {
  //   const names = name.split(" ");
  //   name = names[0] + " " + names[names.length - 1].charAt(0) + "";
  // }

  if (profile?.username) name = profile.username;
  else if (name) {
    // update supabase
    await supabaseServer
      .from("profiles")
      .update({ username: name })
      .eq("id", data.user.id);
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

  return redirect("/");
};
