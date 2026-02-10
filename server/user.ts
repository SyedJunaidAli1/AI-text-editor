"use server";
import { createClient } from "@/lib/supabase/server";

interface SigUpParams {
  email: string;
  password: string;
  name: string;
}

export async function signUpNewUser({ email, password, name }: SigUpParams) {
  const supabase = await createClient();
  try {
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          full_name: name,
        },
      },
    });

    if (error) {
      throw new Error(error.message);
    }
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("SignUp failed");
  }
}
