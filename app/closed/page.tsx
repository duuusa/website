import Image from "next/image";
import { RxArrowTopRight } from "react-icons/rx";


export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-5">
      <div className="flex flex-col items-center justify-center gap-6">
        <Image 
          src="/me.jpeg" 
          alt="me" 
          width={200} 
          height={200}
          className="rounded-full border-2 border-gray-100"
        />
        <h1 className="text-center text-5xl tracking-tight max-w-3xl font-semibold">Still in maintenance.</h1>
        <p className="ml-4 text-gray-500 text-xl text-center">Currently busy updating it, the new version is coming soonish.</p>
      </div>
      <div className="flex flex-wrap justify-center gap-8">
        <span className="px-4 py-3 flex justify-center items-center gap-2 rounded-full bg-white hover:bg-gray-100">
          <a href="https://read.cv/dusa" target="_blank">my resume</a>
          <RxArrowTopRight/>
        </span>
        <span className="px-4 py-3 flex justify-center items-center gap-2 rounded-full bg-white hover:bg-gray-100">
          <a href="https://bento.me/clementduvivier" target="_blank">learn more</a>
          <RxArrowTopRight/>
        </span>
      </div>
    </main>
  );
}
