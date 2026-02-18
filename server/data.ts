import { createClient } from "@/lib/supabase/server-read";

export async function getUser() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error) {
    console.error("Auth error", error.message);
    return null;
  }
  return data.user;
}
