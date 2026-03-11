// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";
// import { createServerClient } from "@supabase/ssr";

// const authPaths = ["/signin", "/signup", "/forgot-password", "/reset-password"];
// const protectedPaths = ["/app", "/test"];

// export async function middleware(request: NextRequest) {
//   const response = NextResponse.next();

//   const supabase = createServerClient(
//     process.env.NEXT_PUBLIC_SUPABASE_URL!,
//     process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!,
//     {
//       cookies: {
//         getAll() {
//           return request.cookies.getAll();
//         },
//         setAll(cookiesToSet) {
//           cookiesToSet.forEach(({ name, value, options }) =>
//             response.cookies.set(name, value, options),
//           );
//         },
//       },
//     },
//   );

//   const {
//     data: { user },
//   } = await supabase.auth.getUser();

//   console.log(user);

//   const { pathname } = request.nextUrl;

//   // 🚫 Not logged in → accessing protected routes
//   if (!user && protectedPaths.some((path) => pathname.startsWith(path))) {
//     return NextResponse.redirect(new URL("/login", request.url));
//   }

//   // ✅ Logged in → accessing auth pages
//   if (user && authPaths.some((path) => pathname.startsWith(path))) {
//     return NextResponse.redirect(new URL("/app", request.url));
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: [
//     "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
//   ],
// };


import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function proxy(request: NextRequest) {
  return NextResponse.redirect(new URL('/home', request.url))
}
 
console.log("middleware")
// Alternatively, you can use a default export:
// export default function proxy(request: NextRequest) { ... }
 
export const config = {
  matcher: '/about/:path*',
}