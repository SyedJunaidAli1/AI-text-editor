"use server";
import { createClient } from "@/lib/supabase/server";

interface SignInParams {
  email: string;
  password: string;
}

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

export async function signinUser({ email, password }: SignInParams) {
  const supabase = await createClient();
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    if (error) {
      throw new Error(error.message);
    }
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("SignIn failed");
  }
}

export async function signoutUser() {
  const supabase = await createClient();

  try {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error(error.message);
    }
  } catch (error) {
    console.error(error);
    throw new Error("SignOut failed");
  }
}

export async function resetPassword({ email }: { email: string }) {
  const supabase = await createClient();

  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: "http://example.com/account/update-password",
    });

    if (error) {
      throw new Error(error.message);
    }
  } catch (error) {
    console.error(error);
    throw new Error("ResetPassword failed");
  }
}
