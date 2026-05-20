import type { Locale } from "@/lib/i18n/config";

export type RichVariant =
  | "default"
  | "code"
  | "frame"
  | "flash"
  | "highlight"
  | "terminal"
  | "url"
  | "ticket";

export type RichToken =
  | { type: "link"; text: string; href: string; external?: boolean }
  | {
      type: "emoji";
      text: string;
      emoji: string;
      variant?: RichVariant;
    };

export type RichPart = { kind: "text"; text: string } | { kind: "token"; token: RichToken };

const richTokensByLocale: Record<Locale, RichToken[]> = {
  en: [
    { type: "link", text: "Dipeeo", href: "https://dipeeo.com/", external: true },
    { type: "emoji", text: "Product Owner", emoji: "🧭", variant: "ticket" },
    { type: "emoji", text: "computer science", emoji: "💻", variant: "terminal" },
    { type: "emoji", text: "web development", emoji: "🌐", variant: "url" },
    { type: "emoji", text: "photographer", emoji: "📷", variant: "flash" },
    { type: "emoji", text: "developer", emoji: "⌨️", variant: "code" },
    { type: "emoji", text: "designer", emoji: "🎨", variant: "frame" },
    { type: "emoji", text: "Paris", emoji: "🥐", variant: "highlight" },
    { type: "emoji", text: "HETIC", emoji: "🎓", variant: "highlight" },
  ],
  fr: [
    { type: "link", text: "Dipeeo", href: "https://dipeeo.com/", external: true },
    { type: "emoji", text: "Product Owner", emoji: "🧭", variant: "ticket" },
    { type: "emoji", text: "informatique", emoji: "💻", variant: "terminal" },
    { type: "emoji", text: "développement web", emoji: "🌐", variant: "url" },
    { type: "emoji", text: "photographe", emoji: "📷", variant: "flash" },
    { type: "emoji", text: "développeur", emoji: "⌨️", variant: "code" },
    { type: "emoji", text: "designer", emoji: "🎨", variant: "frame" },
    { type: "emoji", text: "Paris", emoji: "🥐", variant: "highlight" },
    { type: "emoji", text: "HETIC", emoji: "🎓", variant: "highlight" },
  ],
  ja: [
    { type: "link", text: "Dipeeo", href: "https://dipeeo.com/", external: true },
    { type: "emoji", text: "プロダクトオーナー", emoji: "🧭", variant: "ticket" },
    { type: "emoji", text: "コンピュータサイエンス", emoji: "💻", variant: "terminal" },
    { type: "emoji", text: "ウェブ開発", emoji: "🌐", variant: "url" },
    { type: "emoji", text: "写真家", emoji: "📷", variant: "flash" },
    { type: "emoji", text: "開発者", emoji: "⌨️", variant: "code" },
    { type: "emoji", text: "デザイナー", emoji: "🎨", variant: "frame" },
    { type: "emoji", text: "Paris", emoji: "🥐", variant: "highlight" },
    { type: "emoji", text: "HETIC", emoji: "🎓", variant: "highlight" },
  ],
  zh: [
    { type: "link", text: "Dipeeo", href: "https://dipeeo.com/", external: true },
    { type: "emoji", text: "产品负责人", emoji: "🧭", variant: "ticket" },
    { type: "emoji", text: "计算机科学", emoji: "💻", variant: "terminal" },
    { type: "emoji", text: "Web 开发", emoji: "🌐", variant: "url" },
    { type: "emoji", text: "摄影师", emoji: "📷", variant: "flash" },
    { type: "emoji", text: "开发者", emoji: "⌨️", variant: "code" },
    { type: "emoji", text: "设计师", emoji: "🎨", variant: "frame" },
    { type: "emoji", text: "Paris", emoji: "🥐", variant: "highlight" },
    { type: "emoji", text: "HETIC", emoji: "🎓", variant: "highlight" },
  ],
};

function escapeRegex(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function tokenizeRichText(text: string, locale: Locale): RichPart[] {
  const tokens = richTokensByLocale[locale];
  if (!tokens.length) return [{ kind: "text", text }];

  // Match longer phrases first so "Product Owner" beats "Owner", etc.
  const sortedTokens = [...tokens].sort((a, b) => b.text.length - a.text.length);
  const pattern = sortedTokens.map((token) => escapeRegex(token.text)).join("|");
  const regex = new RegExp(`(${pattern})`, "g");

  const parts: RichPart[] = [];
  let lastIndex = 0;
  for (const match of text.matchAll(regex)) {
    const start = match.index ?? 0;
    if (start > lastIndex) {
      parts.push({ kind: "text", text: text.slice(lastIndex, start) });
    }
    const matched = match[0];
    const token = sortedTokens.find((candidate) => candidate.text === matched);
    if (token) {
      parts.push({ kind: "token", token });
    } else {
      parts.push({ kind: "text", text: matched });
    }
    lastIndex = start + matched.length;
  }
  if (lastIndex < text.length) {
    parts.push({ kind: "text", text: text.slice(lastIndex) });
  }
  return parts;
}
