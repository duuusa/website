import type { Metadata } from "next";
import { getDictionary } from "@/lib/i18n/dictionaries";
import type { Locale } from "@/lib/i18n/config";
import { defaultLocale, locales, htmlLang } from "@/lib/i18n/config";

const siteUrl = "https://www.clementduvivier.com";

function localeUrl(locale: Locale, path: string): string {
  const suffix = path === "/" ? "" : path;
  return `${siteUrl}/${locale}${suffix}`;
}

function languageAlternates(path: string): Record<string, string> {
  const map: Record<string, string> = {};
  for (const loc of locales) {
    map[htmlLang[loc]] = localeUrl(loc, path);
  }
  map["x-default"] = localeUrl(defaultLocale, path);
  return map;
}

export function buildPageMetadata(locale: Locale, path: string = "/"): Metadata {
  const dictionary = getDictionary(locale);
  const canonical = localeUrl(locale, path);
  const alternateLocales = locales
    .filter((loc) => loc !== locale)
    .map((loc) => htmlLang[loc].replace("-", "_"));

  return {
    metadataBase: new URL(siteUrl),
    title: dictionary.meta.title,
    description: dictionary.meta.description,
    keywords: dictionary.meta.keywords,
    authors: [{ name: "Clément Duvivier", url: siteUrl }],
    creator: "Clément Duvivier",
    alternates: {
      canonical,
      languages: languageAlternates(path),
    },
    openGraph: {
      title: dictionary.meta.title,
      description: dictionary.meta.description,
      type: "website",
      url: canonical,
      locale: htmlLang[locale].replace("-", "_"),
      alternateLocale: alternateLocales,
      siteName: dictionary.meta.title,
      images: [
        {
          url: "/meta_image_picture.jpg",
          width: 1200,
          height: 630,
          alt: dictionary.meta.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: dictionary.meta.title,
      description: dictionary.meta.description,
      images: ["/meta_image_picture.jpg"],
    },
    icons: {
      icon: "/favicon.ico",
      apple: "/meta_image_picture.jpg",
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export function buildThanksMetadata(locale: Locale): Metadata {
  const dictionary = getDictionary(locale);

  return {
    title: dictionary.thanks.metaTitle,
    description: dictionary.thanks.metaDescription,
    robots: {
      index: false,
      follow: false,
    },
  };
}
