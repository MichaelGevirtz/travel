import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const COOKIE_NAME = "admin_session";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only protect /admin routes (except /admin/login)
  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    const sessionCookie = request.cookies.get(COOKIE_NAME);

    // If no session cookie, redirect to login
    if (!sessionCookie?.value) {
      const loginUrl = new URL("/admin/login", request.url);
      // Add the original URL as a redirect parameter
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // If logged in and trying to access login page, redirect to admin
  if (pathname === "/admin/login") {
    const sessionCookie = request.cookies.get(COOKIE_NAME);
    if (sessionCookie?.value) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
