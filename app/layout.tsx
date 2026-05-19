import type { Metadata } from "next";
import { Inter, Noto_Sans_JP, Noto_Sans_SC } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { htmlLang } from "@/lib/i18n/config";
import { getLocale } from "@/lib/i18n/get-locale";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { buildPersonJsonLd } from "@/lib/seo/json-ld";
import "./globals.css";

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

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  return buildPageMetadata(locale);
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const jsonLd = buildPersonJsonLd(locale);

  const fontClass =
    locale === "ja"
      ? notoJP.className
      : locale === "zh"
        ? notoSC.className
        : inter.className;

  return (
    <html lang={htmlLang[locale]}>
      <body
        className={`${inter.variable} ${notoJP.variable} ${notoSC.variable} ${fontClass} antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
