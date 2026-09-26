import { NextRequest, NextResponse } from "next/server";

const PUBLIC_PATHS = ["/login"];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isPublic =
    PUBLIC_PATHS.includes(pathname) || pathname.startsWith("/api/auth/");
  const hasSession = request.cookies.has("bn_token");

  if (!isPublic && !hasSession) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (pathname === "/login" && hasSession) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  // Corre en todo excepto assets internos de Next Y cualquier archivo
  // estático (rutas con extensión, como /bajanews-logo.jpg) — si no,
  // el logo de la pantalla de login queda bloqueado por no tener sesión.
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
