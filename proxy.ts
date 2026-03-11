import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

const authPaths = ["/signin", "/signup", "/forgot-password", "/reset-password"];
const protectedPaths = ["/app"];

export async function proxy(request: NextRequest) {
  const response = NextResponse.next();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { pathname } = request.nextUrl;

  // 🚫 Not logged in → accessing protected routes
  if (!user && protectedPaths.some((path) => pathname.startsWith(path))) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  // ✅ Logged in → accessing auth pages
  if (user && authPaths.some((path) => pathname.startsWith(path))) {
    return NextResponse.redirect(new URL("/app", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
  ],
};
