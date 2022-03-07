import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import PlausibleProvider from "next-plausible";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <PlausibleProvider domain="ryanhmaas.xyz">
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    </PlausibleProvider>
  );
}
