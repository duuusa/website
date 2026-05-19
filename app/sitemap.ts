import type { MetadataRoute } from "next";
import { defaultLocale, locales, htmlLang } from "@/lib/i18n/config";

const siteUrl = "https://www.clementduvivier.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const languages = Object.fromEntries(
    locales.map((loc) => [htmlLang[loc], `${siteUrl}/${loc}`]),
  );

  return locales.map((locale) => ({
    url: `${siteUrl}/${locale}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: locale === defaultLocale ? 1 : 0.8,
    alternates: {
      languages: {
        ...languages,
        "x-default": `${siteUrl}/${defaultLocale}`,
      },
    },
  }));
}
