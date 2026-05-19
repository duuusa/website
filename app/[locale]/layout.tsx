import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Inter, Noto_Sans_JP, Noto_Sans_SC } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import { htmlLang, isLocale, locales, type Locale } from "@/lib/i18n/config";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { buildPersonJsonLd } from "@/lib/seo/json-ld";
import "../globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const notoJP = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--font-noto-jp",
});

const notoSC = Noto_Sans_SC({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--font-noto-sc",
});

type Params = { locale: string };

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return buildPageMetadata(locale, "/");
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
  colorScheme: "light",
};

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<Params>;
}>) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const typedLocale = locale as Locale;
  const jsonLd = buildPersonJsonLd(typedLocale);

  const fontClass =
    typedLocale === "ja"
      ? notoJP.className
      : typedLocale === "zh"
        ? notoSC.className
        : inter.className;

  return (
    <html lang={htmlLang[typedLocale]}>
      <body
        className={`${inter.variable} ${notoJP.variable} ${notoSC.variable} ${fontClass} antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
