import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

export async function signUpNewUser(email: string, password: string) {
  try {
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        emailRedirectTo: "https://example.com/welcome",
      },
    });
    if (error) throw error;
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
