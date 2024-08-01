import { createClient } from "@supabase/supabase-js";
import type { Database } from "../../supabase/supabase";
import type { Tables } from "../../supabase/supabase";

// console.log(
//   import.meta.env.PUBLIC_SUPABASE_URL,
//   import.meta.env.PUBLIC_SUPABASE_ANON_KEY
// );

export let messages: Tables<"messages">;
export const supabase = createClient<Database>(
  import.meta.env.PUBLIC_SUPABASE_URL,
  import.meta.env.PUBLIC_SUPABASE_ANON_KEY,
  {
    auth: {
      flowType: "pkce",
      detectSessionInUrl: true,
    },
  }
);
