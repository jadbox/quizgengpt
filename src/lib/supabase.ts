import {
  AuthResponse,
  createClient,
  SupabaseClient,
} from "@supabase/supabase-js";
import type { Database } from "../../supabase/supabase";
import type { Tables } from "../../supabase/supabase";
import { AstroCookies } from "astro";

// console.log(
//   "PUBLIC_SUPABASE_URL",
//   import.meta.env.PUBLIC_SUPABASE_URL,
//   import.meta.env.PUBLIC_SUPABASE_ANON_KEY
//   // import.meta.env.PUBLIC_SUPABASE_ANON_KEY
// );

export let messages: Tables<"messages">;
export type Goal = Tables<"goals">;
export type Comment = Tables<"messages">;
export type Reaction = Tables<"reactions">;
export type Profile = Tables<"profiles">;

const serverkey = !globalThis.window && import.meta.env.SUPABASE_SERVICE_KEY;

if (!globalThis.window && !serverkey)
  throw new Error("No SUPABASE_SERVICE_KEY key found");

export const supabaseServer = !serverkey
  ? null
  : createClient<Database>(
      import.meta.env.PUBLIC_SUPABASE_URL,
      import.meta.env.SUPABASE_SERVICE_KEY as string,
    );

export const supabase = createClient<Database>(
  import.meta.env.PUBLIC_SUPABASE_URL,
  import.meta.env.PUBLIC_SUPABASE_ANON_KEY,
  {
    auth: {
      flowType: "pkce",
      // storage: globalThis.window ? localStorage : undefined,
      // storageKey: "supabase.auth.token",
      detectSessionInUrl: true,
      persistSession: true,
    },
  },
);

export function supabaseServerUserClient(cookies: AstroCookies) {
  // if (!storage.getItem) throw new Error("storage.getItem not found");

  // console.log("test", storage.getItem("uid"));

  return createClient<Database>(
    import.meta.env.PUBLIC_SUPABASE_URL,
    import.meta.env.PUBLIC_SUPABASE_ANON_KEY,
    {
      auth: {
        flowType: "pkce",
        // storage: globalThis.window ? localStorage : undefined,
        // storageKey: "supabase.auth.token",
        detectSessionInUrl: true,
        persistSession: true,
        storage: {
          getItem: (key: string) => cookies.get(key)?.value as string,
          setItem: (key: string, value: string) => {
            cookies.set(key, value, { path: "/" });
          },
          removeItem: (key: string) => cookies.delete(key, { path: "/" }),
        },
        storageKey: "supabase.auth.token",
      },
    },
  );
}

// Cache last session
let lastSession: AuthResponse;
export const setAstroSession = async (cookies: any) => {
  const access_token = cookies.get("sb-access-token")?.value as string;
  const refresh_token = cookies.get("sb-refresh-token")?.value as string;
  const uid = cookies.get("uid")?.value as string;

  if (!access_token || !refresh_token || !uid) {
    return { supabase, data: null };
  }

  if (!lastSession) {
    var { data, error } = await supabase.auth.setSession({
      access_token: access_token,
      refresh_token: refresh_token,
    });

    if (error) {
      console.error("Error:", error);
      throw new Error(error.message);
      return { supabase, data: null, error, user: null };
      // return new Response(error.message, { status: 500 });
    }
    if (typeof window !== "undefined") lastSession = data as any; // cache on browser
  } else data = lastSession as any;

  if (!data || !data.session?.access_token) {
    console.error("No data or session found", data);
    return { supabase, data: null };
  }

  return { supabase, data, user: data, error: null };
};
