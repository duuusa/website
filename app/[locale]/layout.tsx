import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Inter, Newsreader, Noto_Sans_JP, Noto_Sans_SC } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import { htmlLang, isLocale, locales, type Locale } from "@/lib/i18n/config";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { buildPersonJsonLd } from "@/lib/seo/json-ld";
import { SplashIntro } from "@/components/splash-intro";
import "../globals.css";

// When the splash is skipped (repeat visit or no storage), reveal the content
// straight away. On a first visit the SplashIntro component adds `content-in`
// itself once the signature has settled.
const splashSkipScript = `try{if(sessionStorage.getItem('splash-shown'))document.documentElement.classList.add('splash-skip','content-in')}catch(e){document.documentElement.classList.add('content-in')}`;

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const newsreader = Newsreader({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-serif",
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
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0b0b0d" },
  ],
  colorScheme: "light dark",
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
    <html lang={htmlLang[typedLocale]} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: splashSkipScript }} />
        <noscript>
          {/* Without JS, never leave the content hidden. */}
          <style>{`.reveal-item{opacity:1!important;transform:none!important;filter:none!important}`}</style>
        </noscript>
      </head>
      <body
        className={`${inter.variable} ${newsreader.variable} ${notoJP.variable} ${notoSC.variable} ${fontClass} antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <SplashIntro />
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
