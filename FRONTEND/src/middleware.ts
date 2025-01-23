import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const publicPaths = ["/", "/about", "/contact", "/menu", "/admin/login"];
  const isPublic = publicPaths.some((path) =>
    request.nextUrl.pathname.startsWith(path),
  );

  const response = NextResponse.next();

  // Add a cookie to indicate whether the page is public
  response.cookies.set("isPublic", isPublic.toString());

  if (!isPublic) {
    const token = request.cookies.get("authToken");
    if (!token) {
      if (request.nextUrl.pathname.startsWith("/admin")) {
        return NextResponse.redirect(new URL("/admin/login", request.url));
      }
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next|static|favicon.ico|robots.txt).*)"],
};
