import { createClient } from "@supabase/supabase-js";
import type { Database } from "./db/types";
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ADMIN_KEY } from "$env/static/public";

// IMPORTANT: This is the admin client, which has full access to all tables and views.
// It should only be used in server-side code, never in client-side code.
export const admin = createClient<Database>(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ADMIN_KEY);
