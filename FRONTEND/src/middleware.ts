import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const publicPaths = ["/", "/about", "/contact", "/menu", "/admin/login"];
  const isPublic = publicPaths.some((path) =>
    request.nextUrl.pathname.startsWith(path),
  );

  if (!isPublic) {
    const token = request.cookies.get("authToken");
    if (!token) {
      if (request.nextUrl.pathname.startsWith("/admin")) {
        return NextResponse.redirect(new URL("/admin/login", request.url));
      }
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|static|favicon.ico|robots.txt).*)"],
};
