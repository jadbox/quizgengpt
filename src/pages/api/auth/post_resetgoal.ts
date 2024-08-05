// Astro framework endpoint to reset user's goal in supabase
// Method: POST
// Payload: { goal: number } // id
// Headers: { Authorization: `Bearer ${token}` }
// Cookies: none
// Result: { success: boolean, error?: string }

// write function
// src/pages/api/auth/post_resetgoal.ts

import type { APIRoute } from "astro";
import { supabase } from "../../../lib/supabase";

export const post: APIRoute = async ({ request }) => {
  try {
    // Extract the Authorization header
    const authHeader = request.headers.get("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Invalid or missing Authorization header",
        }),
        {
          status: 401,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const token = authHeader.split(" ")[1];

    // Verify the token and get the user
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser(token);

    if (authError || !user) {
      return new Response(
        JSON.stringify({ success: false, error: "Invalid token" }),
        {
          status: 401,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Parse the request body
    const body = await request.json();
    const { goal } = body;

    if (!goal || typeof goal !== "number") {
      return new Response(
        JSON.stringify({ success: false, error: "Invalid goal ID" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Reset the user's goal in Supabase
    const { error: updateError } = await supabase
      .from("goals")
      .delete()
      .eq("id", user.id)
      .is("completed", null);

    if (updateError) {
      return new Response(
        JSON.stringify({ success: false, error: "Failed to reset goal" }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Return success response
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in post_resetgoal:", error);
    return new Response(
      JSON.stringify({ success: false, error: "Internal server error" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
};
