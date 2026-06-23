import type { Locale } from "@/lib/i18n/config";

export type RichTone = "muted" | "strong";

export type RichToken =
  | {
      type: "link";
      text: string;
      href: string;
      external?: boolean;
      glyph: string;
    }
  | {
      type: "mark";
      text: string;
      glyph?: string;
      tone?: RichTone;
      script?: boolean;
    };

export type RichPart = { kind: "text"; text: string } | { kind: "token"; token: RichToken };

// Editorial keyword treatment à la Los Feliz Engineering: muted words trailed by
// a small monochrome dingbat, a couple of strong (highlighted) words, and one in
// a script italic. Glyphs are unicode so they inherit the text colour.
const richTokensByLocale: Record<Locale, RichToken[]> = {
  en: [
    { type: "link", text: "Dipeeo", href: "https://dipeeo.com/", external: true, glyph: "☞" },
    { type: "mark", text: "Product Owner", tone: "strong", glyph: "❖" },
    { type: "mark", text: "computer science", tone: "muted", glyph: "◎" },
    { type: "mark", text: "web development", tone: "muted", glyph: "❂" },
    { type: "mark", text: "developer", tone: "muted", glyph: "✦" },
    { type: "mark", text: "designer", tone: "muted", glyph: "✎" },
    { type: "mark", text: "photographer", tone: "muted", glyph: "◉" },
    { type: "mark", text: "HETIC", tone: "muted", glyph: "✺" },
    { type: "mark", text: "Paris", script: true },
  ],
  fr: [
    { type: "link", text: "Dipeeo", href: "https://dipeeo.com/", external: true, glyph: "☞" },
    { type: "mark", text: "Product Owner", tone: "strong", glyph: "❖" },
    { type: "mark", text: "informatique", tone: "muted", glyph: "◎" },
    { type: "mark", text: "développement web", tone: "muted", glyph: "❂" },
    { type: "mark", text: "développeur", tone: "muted", glyph: "✦" },
    { type: "mark", text: "designer", tone: "muted", glyph: "✎" },
    { type: "mark", text: "photographe", tone: "muted", glyph: "◉" },
    { type: "mark", text: "HETIC", tone: "muted", glyph: "✺" },
    { type: "mark", text: "Paris", script: true },
  ],
  ja: [
    { type: "link", text: "Dipeeo", href: "https://dipeeo.com/", external: true, glyph: "☞" },
    { type: "mark", text: "プロダクトオーナー", tone: "strong", glyph: "❖" },
    { type: "mark", text: "コンピュータサイエンス", tone: "muted", glyph: "◎" },
    { type: "mark", text: "ウェブ開発", tone: "muted", glyph: "❂" },
    { type: "mark", text: "開発者", tone: "muted", glyph: "✦" },
    { type: "mark", text: "デザイナー", tone: "muted", glyph: "✎" },
    { type: "mark", text: "写真家", tone: "muted", glyph: "◉" },
    { type: "mark", text: "HETIC", tone: "muted", glyph: "✺" },
    { type: "mark", text: "Paris", script: true },
  ],
  zh: [
    { type: "link", text: "Dipeeo", href: "https://dipeeo.com/", external: true, glyph: "☞" },
    { type: "mark", text: "产品负责人", tone: "strong", glyph: "❖" },
    { type: "mark", text: "计算机科学", tone: "muted", glyph: "◎" },
    { type: "mark", text: "Web 开发", tone: "muted", glyph: "❂" },
    { type: "mark", text: "开发者", tone: "muted", glyph: "✦" },
    { type: "mark", text: "设计师", tone: "muted", glyph: "✎" },
    { type: "mark", text: "摄影师", tone: "muted", glyph: "◉" },
    { type: "mark", text: "HETIC", tone: "muted", glyph: "✺" },
    { type: "mark", text: "Paris", script: true },
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
