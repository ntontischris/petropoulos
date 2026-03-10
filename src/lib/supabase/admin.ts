import { createClient } from "@supabase/supabase-js";

// WARNING: This client bypasses RLS.
// Use ONLY in: Stripe webhooks, server actions that insert into protected tables.
export function createSupabaseAdmin() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );
}
