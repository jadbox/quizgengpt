import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ request, cookies, url }) => {
  cookies.set("helloo", "world", {
    path: "/",
  });

  // set cookie with no path
  request.headers.set("Set-Cookie", "hello=world2");
  const memory = process.memoryUsage();

  const r = new Response(JSON.stringify({ memory }), {
    headers: {
      "Content-Type": "application/json",
    },
  });

  // "HELLO1=world3; path=/"
  let cookieHeaders = "";
  const cookie = cookies.headers();

  for (const key of cookie) {
    cookieHeaders += `${key}=${cookies.get(key)}; `;
  }

  // set path as root /
  r.headers.set("Set-Cookie", `${cookieHeaders}path=/`);

  return r;
};
