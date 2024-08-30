// // src/actions/index.ts
// import { defineAction, z } from "astro:actions";
// import { setAstroSession } from "@/lib/supabase";

// export const server = {
//   resetGoals: defineAction({
//     accept: "form",
//     input: z.object({}),
//     handler: async ({}, context) => {
//       // get cookies from the context
//       const cookies = context.cookies;
//       const { supabase, data } = await setAstroSession(cookies);
//       const uid = data?.user?.id as string;

//       const { error } = await supabase
//         .from("goals")
//         .delete()
//         .eq("uid", uid)
//         .is("completed", null);
//       // call a mailing service, or store to a database
//       return { success: true };
//     },
//   }),
// };
