"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useRef } from "react";

const EASTER_EGG_CLICKS = 5;
const EASTER_EGG_WINDOW_MS = 2500;

type LogoMarkProps = {
  alt: string;
};

export function LogoMark({ alt }: LogoMarkProps) {
  const router = useRouter();
  const clickTimestamps = useRef<number[]>([]);

  const handleClick = useCallback(() => {
    const now = Date.now();
    const recentClicks = clickTimestamps.current.filter(
      (timestamp) => now - timestamp < EASTER_EGG_WINDOW_MS,
    );

    recentClicks.push(now);
    clickTimestamps.current = recentClicks;

    if (recentClicks.length >= EASTER_EGG_CLICKS) {
      clickTimestamps.current = [];
      router.push("/thanks");
    }
  }, [router]);

  return (
    <button
      type="button"
      onClick={handleClick}
      className="relative block h-16 w-[150px] shrink-0 cursor-pointer border-0 bg-transparent p-0"
      aria-label={alt}
    >
      <Image
        src="/signature.png"
        alt=""
        width={150}
        height={64}
        className="h-16 w-[150px] object-contain object-left object-bottom"
        priority
        unoptimized
      />
    </button>
  );
}
