import { NextResponse } from "next/server";

export default function middleware(req) {
  const url = req.nextUrl.clone(); // clone the request url
  const { pathname } = req.nextUrl; // get pathname of request (e.g. /blog-slug)
  const hostname = req.headers.get("host"); // get hostname of request (e.g. demo.vercel.pub)

  console.log('hostname pre replace', hostname);
  const host = "ryanhmaas.xyz";

  if (hostname === host) {
    return NextResponse.redirect("https://demo.vercel.pub");
  }

  const currentHost =
    process.env.NODE_ENV === "production" && process.env.VERCEL === "1"
      ? hostname
          .replace(`.${host}`, "") // you have to replace ".vercel.pub" with your own domain if you deploy this example under your domain.
      : // in this case, our team slug is "platformize", thus *.platformize.vercel.app works
        hostname.replace(`.localhost:3000`, "");

  if (pathname.startsWith(`/_sites`)) {
    console.log("app here");

    return new Response(null, { status: 404 });
  }

  console.log("currentHost", currentHost);

  if (!pathname.includes(".") && !pathname.startsWith("/api")) {
    console.log("app here - !pathname starts");

    if (currentHost == "app") {
      if (
        pathname === "/login" &&
        (req.cookies["next-auth.session-token"] ||
          req.cookies["__Secure-next-auth.session-token"])
      ) {
        console.log("app here app/login");
        url.pathname = "/";
        return NextResponse.redirect(url);
      }
      url.pathname = `/app${pathname}`;
      return NextResponse.rewrite(url);
    } else if (
      hostname === "localhost:3000") {
      console.log("app here home");

      url.pathname = `/home`;
      return NextResponse.rewrite(url);
    } else {
      url.pathname = `/_sites/${currentHost}${pathname}`;
      console.log("app here sites");

      return NextResponse.rewrite(url);
    }
  }
}