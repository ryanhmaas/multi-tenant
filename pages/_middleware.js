import { NextResponse } from "next/server";

export default function middleware(req) {
  const host = "vercel.app";
  const { pathname } = req.nextUrl; // get pathname of request (e.g. /blog-slug)
  const hostname = req.headers.get("host"); // get hostname of request (e.g. demo.vercel.pub)

  console.log('hostname pre replace', hostname);

  const currentHost =
    process.env.NODE_ENV === "production" && process.env.VERCEL === "1"
      ? hostname.replace(`.${host}`, "")
      : hostname.replace(`.localhost:3000`, "");

  console.log('AHHHH', currentHost);
  console.log('hostname', hostname);

  if (pathname.startsWith(`/_sites`)) {
    return new Response(null, { status: 404 });
  }

  if (!pathname.includes(".") && !pathname.startsWith("/api")) {
    if (currentHost == "app") {
      if (
        pathname === "/login" &&
        (req.cookies["next-auth.session-token"] ||
          req.cookies["__Secure-next-auth.session-token"])
      ) {
        return NextResponse.redirect("/");
      }
      return NextResponse.rewrite(`/app${pathname}`);
    } else if (hostname === "localhost:3000") {
      return NextResponse.rewrite(`/home`);
    } else {
      return NextResponse.rewrite(`/_sites/${currentHost}${pathname}`);
    }
  }
}
