"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

const DRAW_MS = 2200;
const HOLD_MS = 500;
const MOVE_MS = 950;
const SETTLE_MS = 600;
const REVEAL_MS = 850;

type Phase = "draw" | "move" | "settle" | "reveal" | "done";

export function SplashIntro() {
  const [phase, setPhase] = useState<Phase>("draw");
  const [moveStyle, setMoveStyle] = useState<CSSProperties>();
  const signatureRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // If the inline script already gated us (skip class on <html>), bail.
    if (document.documentElement.classList.contains("splash-skip")) {
      setPhase("done");
      return;
    }

    try {
      window.sessionStorage.setItem("splash-shown", "1");
    } catch {
      // sessionStorage may be unavailable (private mode, etc.) — ignore.
    }

    // Hide the real logo while the splash plays so we never show two
    // signatures at once. It is revealed on the same frame the splash
    // unmounts — the splash copy has landed exactly on its slot by then.
    const root = document.documentElement;
    root.classList.add("splash-playing");

    // 1) draw + hold, then glide the signature onto the real logo's slot —
    //    all over a clean white field (content stays hidden).
    const moveTimer = window.setTimeout(() => {
      const signature = signatureRef.current;
      const target = document.querySelector<HTMLElement>("[data-logo-mark]");
      if (signature && target) {
        const from = signature.getBoundingClientRect();
        const to = target.getBoundingClientRect();
        if (from.width > 0 && to.width > 0) {
          const scale = to.width / from.width;
          const dx = to.left - from.left;
          const dy = to.top - from.top;
          setMoveStyle({
            transform: `translate(${dx}px, ${dy}px) scale(${scale})`,
          });
        }
      }
      setPhase("move");
    }, DRAW_MS + HOLD_MS);

    // 2) it has arrived — hold it parked on the white field for a clear beat
    //    so the logo reads as "settled in place" before anything else moves.
    const settleTimer = window.setTimeout(() => {
      setPhase("settle");
    }, DRAW_MS + HOLD_MS + MOVE_MS);

    // 3) only now fade the white away and let the content rise in.
    const revealTimer = window.setTimeout(() => {
      root.classList.add("content-in");
      setPhase("reveal");
    }, DRAW_MS + HOLD_MS + MOVE_MS + SETTLE_MS);

    // 4) hand off to the real logo and unmount.
    const doneTimer = window.setTimeout(() => {
      root.classList.remove("splash-playing");
      setPhase("done");
    }, DRAW_MS + HOLD_MS + MOVE_MS + SETTLE_MS + REVEAL_MS);

    return () => {
      window.clearTimeout(moveTimer);
      window.clearTimeout(settleTimer);
      window.clearTimeout(revealTimer);
      window.clearTimeout(doneTimer);
      root.classList.remove("splash-playing");
    };
  }, []);

  if (phase === "done") return null;

  const moved = phase === "move" || phase === "settle" || phase === "reveal";

  const className = [
    "splash-intro",
    moved ? "splash-intro--moved" : "",
    phase === "reveal" ? "splash-intro--reveal" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={className} aria-hidden="true">
      <div
        ref={signatureRef}
        className="splash-intro__signature"
        style={moveStyle}
      />
    </div>
  );
}
