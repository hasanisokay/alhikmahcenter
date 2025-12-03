import { NextResponse } from "next/server";

export async function proxy(request) {
//   return NextResponse.next();
  let token = request.cookies.get('token')?.value;
  const pathName = request.nextUrl.pathname;
  if (!token && pathName.startsWith("/admin") && pathName !=='/admin/login') {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|api).*)",
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
  ],
};
