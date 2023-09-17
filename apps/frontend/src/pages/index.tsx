import { ConnectButton } from "@rainbow-me/rainbowkit";
import dynamic from "next/dynamic";
import Head from "next/head";
import { useAccount } from "wagmi";
const GenerateMessageBtn = dynamic(
  () => import("~/components/GenerateMessageBtn"),
  {
    ssr: false,
  },
);

export default function Home() {
  const { address } = useAccount();
  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <span className="my-4 text-white" suppressHydrationWarning>
          {address}
        </span>
        <GenerateMessageBtn />
      </main>
    </>
  );
}
