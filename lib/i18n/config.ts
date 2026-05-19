export const locales = ["en", "fr", "ja", "zh"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const localeLabels: Record<Locale, string> = {
  en: "EN",
  fr: "FR",
  ja: "日本語",
  zh: "中文",
};

export const htmlLang: Record<Locale, string> = {
  en: "en",
  fr: "fr",
  ja: "ja",
  zh: "zh-CN",
};

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}
