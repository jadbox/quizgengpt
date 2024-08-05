import type { APIRoute } from "astro";
import { supabase } from "../../../lib/supabase";

export const GET: APIRoute = async ({ request, cookies, url }) => {
  const authCode = url.searchParams.get("code") || "";

  const headers = new Headers();
  console.log("authCode", authCode);
  if (!authCode) {
    // get list pf params keys as string
    // const params: string =
    //   "codes: " + Array.from(url.searchParams.keys()).join(", ");

    return new Response("No code provided", { status: 400 });
  } else console.log("authCode", authCode);

  const { data, error } = await supabase.auth.exchangeCodeForSession(authCode);

  if (error) {
    console.error("Error:", error);
    return new Response(error.message, { status: 500 });
  }

  if (!data || !data.session.access_token) {
    console.error("No data or session found", data);
    return new Response("No data or session found", { status: 500 });
  }

  // console.log("data.user.id", data.user.id);

  if (!data.user.id) {
    throw new Error("User not found");
  }

  headers.append("Set-Cookie", "hello=world3; Path=/");

  function cookiesset(key: string, value: string, options?: any) {
    headers.append("Set-Cookie", `${key}=${value}; Path=/`);
  }

  // --- name cookie
  let name = data.user?.user_metadata?.name;

  if (!name) throw new Error("Name not found");
  // remove last name and make it initial
  if (name) {
    const names = name.split(" ");
    name = names[0] + " " + names[names.length - 1].charAt(0) + "";
  }
  cookiesset("name", name, {
    path: "/",
  });

  // uid cookie
  cookiesset("uid", data.user.id, {
    path: "/",
    domain: process.env.SITE,
  });

  cookiesset("email", data.user.email as string, {
    path: "/",
  });

  const { access_token, refresh_token } = data.session;

  cookiesset("sb-access-token", access_token, {
    path: "/",
  });
  cookiesset("sb-refresh-token", refresh_token, {
    path: "/",
  });

  // console.info(
  //   "CB redirecting to /",
  //   access_token,
  //   cookies.get("uid")?.value,
  //   process.env.SITE
  // );

  headers.set("Location", "/");
  headers.set("Cache-Control", "no-store");
  const r = new Response("ok", { status: 302, headers });

  return r;
};
