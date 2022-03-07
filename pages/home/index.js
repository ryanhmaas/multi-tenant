import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  const handleClick = (e) => {
    e.preventDefault();
    const host = process.env.NODE_ENV === "production" ? window.location.hostname : "localhost:3000";
    window.location.href = `http://app.${host}/login`;
  };


  return (
    <div className="flex h-screen bg-black">
      <Head>
        <title>Platforms on Vercel</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="m-auto w-48 flex flex-col items-center">
        <Image
          width={512}
          height={512}
          src="/shaggy.jpg"
          alt="Platforms on Vercel"
        />
      <button
        type="button"
        onClick={handleClick}
        className="inline-flex items-center mt-2 px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Log in to application
      </button>

      </div>
    </div>
  );
}
