import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, {
              ...options,
              // Force secure cookies in production.
              // Vercel (and most hosts) terminate HTTPS at the edge and
              // forward requests internally over HTTP, so @supabase/ssr
              // would otherwise set Secure: false even on production.
              secure: process.env.NODE_ENV === "production",
            }),
          );
        },
      },
    },
  );
}
