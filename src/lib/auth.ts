export function loginCheck(Astro:any) {
  const { cookies, redirect } = Astro;
  const accessToken = cookies.get("sb-access-token");
  const refreshToken = cookies.get("sb-refresh-token");

  if (!accessToken || !refreshToken) {
    return redirect("/signin");
  }

  if(!cookies.get('uid')) {
    return redirect('/signin');
  }

  return null;
}
