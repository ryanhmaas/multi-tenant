import { NextResponse } from "next/server";

export default function middleware(req) {
  const host = "ryanhmaas.xyz";
  const { pathname } = req.nextUrl; // get pathname of request (e.g. /blog-slug)
  const hostname = req.headers.get("host"); // get hostname of request (e.g. demo.vercel.pub)

  console.log('hostname pre replace', hostname);

  const currentHost =
    process.env.NODE_ENV === "production" && process.env.VERCEL === "1"
      ? hostname.replace(`.${host}`, "")
      : hostname.replace(`.localhost:3000`, "");

  console.log('AHHHH currentHost', currentHost);
  console.log('hostname', hostname);
  console.log('pathname', pathname);

  if (pathname.startsWith(`/_sites`)) {
    console.log("app here");

    return new Response(null, { status: 404 });
  }

  if (!pathname.includes(".") && !pathname.startsWith("/api")) {
    if (currentHost == "app") {
      console.log("app here");
      if (
        pathname === "/login" &&
        (req.cookies["next-auth.session-token"] ||
          req.cookies["__Secure-next-auth.session-token"])
      ) {
        return NextResponse.redirect("/");
      }
      return NextResponse.rewrite(`/app${pathname}`);
    } else if (hostname === "localhost:3000" || hostname  === host) {
      console.log('rewriting home');
      return NextResponse.rewrite(`/home`);
    } else {
      console.log('rewriting to sites');
      return NextResponse.rewrite(`/_sites/${currentHost}${pathname}`);
    }
  }
}
