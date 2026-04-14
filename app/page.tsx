import Image from "next/image";
import Logo from "@/public/logo.png";
import Link from "next/link";

export default function Home() {
  return (
    <div
      className="
        min-h-screen
        w-full
        bg-[url(/bg.jpeg)] bg-cover bg-center bg-no-repeat
        text-white
        tracking-tight
      "
    >
      <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-4 py-8 sm:px-6 md:px-10">
        <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col items-center justify-center gap-6 text-center sm:gap-8">
          <Image
            src={Logo}
            className="h-auto w-36 sm:w-48 md:w-64 lg:w-80"
            alt="logo from the website draw by Clément Duvivier"
            priority
          />
          <h1 className="text-3xl font-bold leading-tight sm:text-4xl md:text-5xl lg:text-6xl">
          New Year. New me.
          </h1>
          <h5 className="text-lg font-semibold sm:text-xl md:text-2xl lg:text-3xl">
            I&apos;ll be back soon.. (promise)
          </h5>
          <Link
            href="https://drive.google.com/file/d/1ff60CzkB_cJuG69K4ypxAEsc2iPPTner/view?usp=sharing"
            className="rounded-full bg-white/5 px-5 py-3 text-sm font-medium transition-colors hover:bg-white/15 sm:text-base"
          >
            Resume
          </Link>
        </main>

        <footer className="mt-8 flex w-full flex-col items-center justify-between gap-4 text-xs sm:flex-row sm:items-end sm:text-sm">
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            <Link href="https://bento.me/clementduvivier" className="hover:underline">
              bento
            </Link>
            <Link href="https://linkedin.com/in/clementduvivier" className="hover:underline">
              linkedIn
            </Link>
            <Link href="https://x.com/_dusa__" className="hover:underline">
              x (formerly twitter)
            </Link>
          </div>
          <p className="text-center text-gray-300">©{new Date().getFullYear()} clément duvivier</p>
        </footer>
      </div>
    </div>
  );
}
