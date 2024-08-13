export function loginCheck(Astro: any) {
  const { cookies, redirect } = Astro;
  const accessToken = cookies.get("sb-access-token");
  const refreshToken = cookies.get("sb-refresh-token");

  if (!accessToken || !refreshToken) {
    // console.log("no auth token");
    return redirect("/api/auth/signin");
  }

  if (!cookies.get("uid")) {
    // console.log("no auth cookie");
    return redirect("/api/auth/signin");
  }

  return null;
}
