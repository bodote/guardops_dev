import { NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request) {
  const authToken = request.cookies.get("appSession")?.value;
  if (
    !authToken &&
    (request.nextUrl.pathname !== "/" ||
      request.nextUrl.pathname.startsWith("/api"))
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/",
    "/intro",
    "/projects",
    "/pageprofile",
    "/datasets",
    "/dummy_data",
    "/login",
    "/playground",
    "/api/manageKeys",
    "/api/manageProjects",
    "/api/manageProjectTrace",
  ],
};
