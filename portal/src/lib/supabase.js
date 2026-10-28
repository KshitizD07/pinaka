import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

/**
 * Returns true if Supabase credentials are configured in the environment.
 */
export function isSupabaseConfigured() {
  return Boolean(supabaseUrl && supabaseKey);
}

/**
 * Server-side Supabase client with elevated service role privileges (or anon fallback).
 * Never expose SUPABASE_SERVICE_ROLE_KEY to the client bundle.
 */
export const supabase = isSupabaseConfigured()
  ? createClient(supabaseUrl, supabaseKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    })
  : null;
