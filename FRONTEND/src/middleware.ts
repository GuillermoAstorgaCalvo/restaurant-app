import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const publicPaths = ["/", "/about", "/contact", "/menu"];
  const isPublic = publicPaths.some((path) =>
    request.nextUrl.pathname.startsWith(path),
  );

  if (!isPublic) {
    const token = request.cookies.get("authToken"); // Example of checking auth state
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

// Match all routes
export const config = {
  matcher: ["/((?!_next|static|favicon.ico).*)"],
};
