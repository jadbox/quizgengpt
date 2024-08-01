export function loginCheck(Astro: any) {
  const { cookies, redirect } = Astro;
  const accessToken = cookies.get("sb-access-token");
  const refreshToken = cookies.get("sb-refresh-token");

  if (!accessToken || !refreshToken) {
    console.log("no auth token");
    return redirect("/signin");
  }

  if (!cookies.get("uid")) {
    console.log("no auth cookie");
    return redirect("/signin");
  }

  return null;
}
