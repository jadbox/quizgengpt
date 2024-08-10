import { createClient } from "@supabase/supabase-js";
import type { Database } from "../../supabase/supabase";
import type { Tables } from "../../supabase/supabase";

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

const serverkey = !globalThis.window && process.env.SUPABASE_SERVICE_KEY;

export const supabaseServer = !serverkey
  ? null
  : createClient<Database>(
      import.meta.env.PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_KEY as string
    );

export const supabase = createClient<Database>(
  import.meta.env.PUBLIC_SUPABASE_URL,
  import.meta.env.PUBLIC_SUPABASE_ANON_KEY,
  {
    auth: {
      flowType: "pkce",
      autoRefreshToken: true,
      persistSession: true,
      // storage: globalThis.window ? localStorage : undefined,
      // storageKey: "supabase.auth.token",
      detectSessionInUrl: true,
    },
  }
);

export const setAstroSession = async (cookies: any) => {
  const access_token = cookies.get("sb-access-token")?.value as string;
  const refresh_token = cookies.get("sb-refresh-token")?.value as string;

  if (!access_token || !refresh_token) {
    return { supabase, data: null };
  }

  const { data, error } = await supabase.auth.setSession({
    access_token: access_token,
    refresh_token: refresh_token,
  });

  if (error) {
    console.error("Error:", error);
    return { supabase, data: null, error };
    // return new Response(error.message, { status: 500 });
  }

  if (!data || !data.session?.access_token) {
    console.error("No data or session found", data);
    return { supabase, data: null };
  }

  return { supabase, data, user: data, error: null };
};
