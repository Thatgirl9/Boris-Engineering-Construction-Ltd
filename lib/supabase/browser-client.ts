import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// Client-side Supabase instance — used ONLY to perform the actual file
// PUT to a signed upload URL/token pair minted server-side (see
// app/api/quote/upload-url/route.ts). The anon key is safe to expose:
// it grants nothing by itself, since no public RLS policy allows direct
// storage writes — every upload is pre-authorized by a short-lived
// signed token created with the service-role key on the server.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const isSupabaseStorageConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export const supabaseBrowser: SupabaseClient | null = isSupabaseStorageConfigured
  ? createClient(supabaseUrl as string, supabaseAnonKey as string)
  : null;
