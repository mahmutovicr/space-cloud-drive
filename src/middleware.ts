import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const DEMO_MODE = process.env.NEXT_PUBLIC_DEMO_MODE === "true";

export default clerkMiddleware(async (auth, request: NextRequest) => {
  if (DEMO_MODE) {
    const { pathname } = request.nextUrl;
    if (pathname.startsWith("/drive") || pathname.startsWith("/f/")) {
      return NextResponse.next();
    }
  }
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
