import { createClient } from "@supabase/supabase-js";

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL || "https://unhkpfwwhhjynakeyeay.supabase.co";
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVuaGtwZnd3aGhqeW5ha2V5ZWF5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTExODY1MTcsImV4cCI6MjEwNjc2MjUxN30.OvL9YsFu5zET5KHpiMEVpXDmyVbewD668aA-vKj0sgo";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});
