import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// Server-only client — uses the SERVICE ROLE key, which must never be
// exposed to the browser (no NEXT_PUBLIC_ prefix). It's only imported
// from API routes / Server Components, never from client components.
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export const supabaseAdmin: SupabaseClient | null =
  supabaseUrl && supabaseServiceRoleKey
    ? createClient(supabaseUrl, supabaseServiceRoleKey, {
        auth: { persistSession: false },
      })
    : null;
