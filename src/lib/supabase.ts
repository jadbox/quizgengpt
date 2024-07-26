import { createClient } from "@supabase/supabase-js";

console.log(import.meta.env.SUPABASE_URL, import.meta.env.SUPABASE_ANON_KEY);

export const supabase = createClient(
  import.meta.env.SUPABASE_URL,
  import.meta.env.SUPABASE_ANON_KEY,
  {
    auth: {
      flowType: "pkce",
      detectSessionInUrl: true,
    },
  }
);
