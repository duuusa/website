import { defaultLocale, isLocale, type Locale } from "./config";

function normalizeLanguageTag(tag: string): string {
  return tag.trim().toLowerCase().split(";")[0] ?? tag;
}

export function negotiateLocale(acceptLanguage: string | null): Locale {
  if (!acceptLanguage) {
    return defaultLocale;
  }

  const preferences = acceptLanguage
    .split(",")
    .map((part, index) => {
      const [rawTag, ...params] = part.trim().split(";");
      const tag = normalizeLanguageTag(rawTag ?? "");
      const qParam = params.find((param) => param.trim().startsWith("q="));
      const q = qParam ? Number.parseFloat(qParam.split("=")[1] ?? "1") : 1;
      return { tag, q: Number.isFinite(q) ? q : 1 - index * 0.01 };
    })
    .sort((a, b) => b.q - a.q);

  for (const { tag } of preferences) {
    if (tag === "ja" || tag.startsWith("ja-")) return "ja";
    if (tag === "zh" || tag.startsWith("zh-")) return "zh";
    if (tag === "fr" || tag.startsWith("fr-")) return "fr";
    if (tag === "en" || tag.startsWith("en-")) return "en";
  }

  return defaultLocale;
}

export function localeFromQuery(value: string | null): Locale | null {
  if (!value) return null;
  const normalized = value.toLowerCase();
  if (isLocale(normalized)) return normalized;
  if (normalized === "jp") return "ja";
  if (normalized === "fra") return "fr";
  if (normalized === "cn" || normalized === "zh-cn" || normalized === "zh-hans") {
    return "zh";
  }
  return null;
}
