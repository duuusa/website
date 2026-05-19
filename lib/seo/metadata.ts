import type { Metadata } from "next";
import { getDictionary } from "@/lib/i18n/dictionaries";
import type { Locale } from "@/lib/i18n/config";
import { locales, htmlLang } from "@/lib/i18n/config";

const siteUrl = "https://www.clementduvivier.com";

export function buildPageMetadata(locale: Locale): Metadata {
  const dictionary = getDictionary(locale);

  return {
    metadataBase: new URL(siteUrl),
    title: dictionary.meta.title,
    description: dictionary.meta.description,
    keywords: dictionary.meta.keywords,
    authors: [{ name: "Clément Duvivier", url: siteUrl }],
    creator: "Clément Duvivier",
    alternates: {
      canonical: siteUrl,
      languages: Object.fromEntries(
        locales.map((loc) => [htmlLang[loc], `${siteUrl}/?lang=${loc}`]),
      ),
    },
    openGraph: {
      title: dictionary.meta.title,
      description: dictionary.meta.description,
      type: "website",
      url: siteUrl,
      locale: htmlLang[locale].replace("-", "_"),
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
