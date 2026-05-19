import type { ReactNode } from "react";

type FadeInProps = {
  children: ReactNode;
  delayMs?: number;
  className?: string;
};

export function FadeIn({ children, delayMs = 0, className = "" }: FadeInProps) {
  return (
    <div
      className={`fade-in-up ${className}`.trim()}
      style={{ animationDelay: `${delayMs}ms` }}
    >
      {children}
    </div>
  );
}
