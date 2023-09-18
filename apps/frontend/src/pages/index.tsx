import { ConnectButton } from "@rainbow-me/rainbowkit";
import dynamic from "next/dynamic";
import Head from "next/head";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
const GenerateMessageBtn = dynamic(
  () => import("~/components/GenerateMessageBtn"),
  {
    ssr: false,
  },
);

export default function Home() {
  const { address } = useAccount();
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    if (!address) return;
    const eventSource = new EventSource("http://localhost:3001/nfts", {
      withCredentials: true,
    });

    eventSource.onmessage = (event) => {
      console.log(JSON.parse(event.data));
    };

    eventSource.onerror = (error) => {
      console.error("EventSource failed:", error);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, []);

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className=" flex min-h-screen flex-col items-center justify-center ">
        <span className="my-4 text-white" suppressHydrationWarning>
          {address}
        </span>
        <GenerateMessageBtn />

        <button
          className="my-2 h-8 w-48 rounded-md bg-teal-500"
          onClick={async () => {
            fetch("http://localhost:3001/nfts", { credentials: "include" });
          }}
        >
          Sess
        </button>
      </main>
    </>
  );
}
