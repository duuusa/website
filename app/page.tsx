import Image from "next/image";
import Logo from "@/public/logo.png";
import Link from "next/link";

export default function Home() {
  return (
    <div className="
      h-screen
      w-screen
      flex flex-col
      items-center
      justify-center
      bg-[url(/bg.jpeg)] bg-cover bg-center bg-no-repeat
      text-white
      tracking-tight
    "
    >
      <main className="flex flex-col gap-8 items-center tracking-tighter h-max xl:w-xl md:w-md sm:w-sm">
        <Image src={Logo} className="w-40 md:w-64 lg:w-96" alt="logo from the website draw by Clément Duvivier" />
        <h1 className="xl:text-6xl md:text-5xl sm:text-3xl font-bold">
          New Year. New me.
        </h1>
        <h5 className="xl:text-3xl sm:text-2xl font-semibold">
          I&apos;ll be back soon.. (promise)
        </h5>
        <button>
          <Link href="https://drive.google.com/file/d/1ff60CzkB_cJuG69K4ypxAEsc2iPPTner/view?usp=sharing" className="px-5 py-3 rounded-full bg-white/5 hover:bg-white/15">Resume</Link>
        </button>
      </main>
      <footer className=" p-5 fixed bottom-0 left-0 flex flex-wrap justify-between text-xs font-tight w-full">
        <div className="flex flex-wrap gap-5">
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
        <p className="text-gray-300">©2025 clément duvivier</p>
      </footer>
    </div>
  );
}
